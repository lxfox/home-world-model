import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const oracle = JSON.parse(fs.readFileSync(path.join(directory, "intent-cases.json"), "utf8"));
const definition = JSON.parse(fs.readFileSync(path.join(directory, "intent-definition.example.json"), "utf8"));
const state = JSON.parse(fs.readFileSync(path.join(directory, "intent-state.example.json"), "utf8"));
const taskDefinition = JSON.parse(fs.readFileSync(path.join(directory, "../task-lineage-v0.1/task-definition.example.json"), "utf8"));

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

function digest(value) {
  return crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");
}

const definitionResult = (status, relation, reason) => ({definition_status: status, identity_relation: relation, state_status: "not_evaluated", commitment_status: "not_evaluated", fulfillment_status: "not_evaluated", reason});
const stateResult = (status, commitment, fulfillment, reason) => ({definition_status: "not_evaluated", identity_relation: "not_evaluated", state_status: status, commitment_status: commitment, fulfillment_status: fulfillment, reason});

export function evaluateDefinition(facts) {
  const relation = facts.same_id ? "same_intent" : "new_intent";
  if (facts.revision_delta === 0) return facts.same_content ? definitionResult("accepted", relation, "same_content_replay") : definitionResult("integrity_conflict", relation, "duplicate_revision_different_content");
  if (!facts.same_id && facts.revision === 1 && facts.same_basis) return definitionResult("accepted", "new_intent", "genesis_definition_candidate");
  if (!facts.same_id && facts.superseding_source) return definitionResult("accepted", "new_intent", "new_intent_with_explicit_derivation");
  if (facts.same_id && !facts.same_basis) return definitionResult("invalid", "new_intent", "identity_basis_change_requires_new_intent");
  if (facts.revision_delta > 1) return definitionResult("indeterminate", relation, "definition_revision_gap");
  if (facts.previous === "mismatch") return definitionResult("invalid", relation, "previous_definition_digest_mismatch");
  if (facts.previous === "unavailable") return definitionResult("indeterminate", relation, "previous_definition_unavailable");
  if (facts.continuity === "unavailable") return definitionResult("indeterminate", relation, "intent_continuity_decision_unavailable");
  if (facts.continuity !== "allowed") return definitionResult("invalid", "new_intent", "same_intent_continuity_not_authorized");
  if (!facts.coverage) return definitionResult("invalid", relation, "expectation_lineage_incomplete");
  if ((facts.semantic_links ?? 0) < 1) return definitionResult("invalid", "new_intent", "no_semantic_expectation_continuity");
  return definitionResult("accepted", relation, "authorized_expectation_revision");
}

export function evaluateState(facts) {
  if (facts.revision_delta > 1) return stateResult("indeterminate", "indeterminate", "indeterminate", "state_revision_gap");
  if (facts.previous === "mismatch") return stateResult("invalid", "indeterminate", "indeterminate", "previous_state_digest_mismatch");
  if (facts.definition_binding === "mismatch") return stateResult("invalid", "indeterminate", "indeterminate", "intent_definition_binding_mismatch");
  if (facts.commitment === "proposed") {
    if (facts.author === "agent") return stateResult("valid", "proposed", facts.fulfillment, "agent_candidate_requires_authority");
    if (facts.routine_observed) return stateResult("valid", "proposed", facts.fulfillment, "routine_observation_not_commitment");
    if (facts.goal_world_view === "accepted") return stateResult("valid", "proposed", facts.fulfillment, "epistemic_acceptance_not_commitment");
    return stateResult("valid", "proposed", facts.fulfillment, "candidate_not_yet_adopted");
  }
  if (facts.commitment === "adopted" && facts.decision !== "allowed") {
    if (facts.decision === "confirmation_required") return stateResult("invalid", "proposed", facts.fulfillment, "intent_adoption_confirmation_required");
    if (facts.decision === "indeterminate" || facts.decision === "unavailable") return stateResult("indeterminate", "indeterminate", facts.fulfillment, "intent_adoption_indeterminate");
    return stateResult("invalid", "indeterminate", facts.fulfillment, "commitment_decision_missing");
  }
  if (["suspended", "retracted", "superseded"].includes(facts.commitment)) {
    if (facts.decision !== "allowed") return stateResult("invalid", "indeterminate", facts.fulfillment, "commitment_transition_not_authorized");
    if (!facts.transition) return stateResult("invalid", "indeterminate", facts.fulfillment, "commitment_transition_record_missing");
    if (facts.commitment === "superseded") {
      if ((facts.related_count ?? 0) < 1) return stateResult("invalid", "indeterminate", facts.fulfillment, "superseding_intent_binding_missing");
      return stateResult("valid", "superseded", facts.fulfillment, "authorized_intent_supersession");
    }
    if (facts.commitment === "retracted" && facts.fulfillment === "fulfilled") return stateResult("valid", "retracted", "fulfilled", "retraction_and_fulfillment_orthogonal");
    if (facts.commitment === "retracted" && (facts.active_tasks ?? 0) > 0) return stateResult("valid", "retracted", facts.fulfillment, "task_transition_required_separately");
    return stateResult("valid", facts.commitment, facts.fulfillment, "authorized_commitment_transition");
  }
  if (facts.fulfillment === "fulfilled") {
    if (!facts.evidence) return stateResult("indeterminate", facts.commitment, "indeterminate", "mandatory_fulfillment_evidence_unavailable");
    if (facts.results !== "satisfied") return stateResult("invalid", facts.commitment, "indeterminate", "mandatory_expectation_not_satisfied");
    return stateResult("valid", facts.commitment, "fulfilled", "all_mandatory_expectations_satisfied");
  }
  if (facts.lifecycle === "persistent" && facts.prior_fulfilled && facts.fulfillment === "degraded") return stateResult("valid", facts.commitment, "degraded", "persistent_intent_drift_appended");
  if (facts.conflict === "known" && facts.priority === "unavailable") return stateResult("valid", facts.commitment, facts.fulfillment, "no_universal_priority_inferred");
  if (facts.conflict === "known") return stateResult("valid", facts.commitment, facts.fulfillment, "conflict_preserved_separately");
  if (facts.new_definition && facts.task_binding === "prior_definition") return stateResult("valid", facts.commitment, facts.fulfillment, "existing_task_remains_bound_to_prior_definition");
  if (facts.authorization_requested) return stateResult("valid", facts.commitment, facts.fulfillment, "commitment_valid_authorization_separate");
  if (facts.commitment === "adopted" && facts.fulfillment === "not_started") return stateResult("valid", "adopted", "not_started", "exact_definition_adopted");
  return stateResult("valid", facts.commitment, facts.fulfillment, "ongoing_assurance_supported");
}

const boundaries = {
  "utterance-boundary": {utterance: "attributable_record", intent_commitment: "not_inferred"},
  "preference-boundary": {preference: "subject_scoped_desire", household_intent: "not_synthesized"},
  "goal-boundary": {goal: "desired_condition_claim", intent: "authority_mediated_commitment"},
  "definition-boundary": {definition: "candidate_declarative_content", adoption: "separate_authority_state"},
  "what-how-boundary": {intent: "what_outcome", plan: "how_to_pursue"},
  "intent-task-boundary": {intent: "potentially_long_lived_commitment", task: "bounded_work_on_exact_revision"},
  "adoption-authorization-boundary": {adoption: "eligible_for_household_pursuit", action_authorization: "separate_exact_proposal_decision"},
  "commitment-fulfillment-boundary": {commitment: "normative_pursuit_state", fulfillment: "evidence_based_outcome_state"},
  "persistent-assurance-boundary": {fulfilled: "time_bound_snapshot", future_compliance: "not_guaranteed"},
  "revision-task-boundary": {new_intent_definition: "new_exact_content", existing_task: "retains_old_binding"},
  "conflict-boundary": {conflict: "preserved_for_governance", priority_or_merge: "not_inferred"},
  "routine-boundary": {routine: "authority_activated_task_instantiation_policy", intent_commitment: "independently_adopted_persistent_outcome"},
  "pet-boundary": {pet_behavior: "observation_or_inferred_need", welfare_intent: "caretaker_attributed_goal"},
  "retraction-boundary": {retraction: "commitment_transition", task_and_authorization: "separate_transitions"},
  "agent-boundary": {agent: "may_propose_or_handle", household: "retains_and_authorizes_commitment"}
};

assert.equal(oracle.cases.length, 49);
assert.equal(oracle.model_boundary_cases.length, 15);
assert.equal(definition.identity_basis_digest, digest(definition.identity_basis));
assert.equal(state.intent_definition_binding.digest, digest(definition));
assert.equal(state.intent_id, definition.intent_id);
assert.equal(state.intent_definition_binding.intent_id, definition.intent_id);
assert.equal(state.intent_definition_binding.definition_revision, definition.definition_revision);
assert.equal(taskDefinition.identity_basis.intent_binding.intent_id, definition.intent_id);
assert.equal(taskDefinition.identity_basis.intent_binding.definition_revision, definition.definition_revision);
assert.equal(taskDefinition.identity_basis.intent_binding.digest, digest(definition));
assert.equal(state.active_task_bindings[0].digest, digest(taskDefinition));
for (const testCase of oracle.cases) {
  const actual = testCase.phase === "definition" ? evaluateDefinition(testCase.facts) : evaluateState(testCase.facts);
  assert.deepEqual(actual, testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
for (const testCase of oracle.model_boundary_cases) {
  assert.deepEqual(boundaries[testCase.case_id], testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
const forbidden = new Set([...oracle.cases, ...oracle.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of ["agent_can_self_adopt_intent", "preference_is_household_intent", "goal_claim_is_commitment", "plan_is_intent", "adopted_means_fulfilled", "intent_adoption_authorizes_proposal", "intent_revision_retargets_existing_task", "agent_invents_priority", "intent_retraction_cancels_tasks"]) assert.ok(forbidden.has(guard), `Missing Intent guard: ${guard}`);

console.log("INTENT COMMITMENT OK", `${oracle.cases.length} semantic cases`, `${oracle.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("COMMITMENT BOUNDARY OK", "preference, candidate Definition, Authority adoption, fulfillment, Task, and Authorization remain distinct");
console.log("REVISION BOUNDARY OK", "same-Intent revision requires identity, prior-content, Authority, and expectation-lineage continuity");
console.log("ASSURANCE OK", "persistent fulfillment is a time-bound assessment; drift appends state and never rewrites history");
