import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const oracle = read("routine-cases.json");
const triggerSpec = read("trigger-spec.example.json");
const eligibilitySpec = read("eligibility-spec.example.json");
const occurrenceKeyPolicy = read("occurrence-key-policy.example.json");
const intentDefinition = read("persistent-intent-definition.example.json");
const intentState = read("persistent-intent-state.example.json");
const routineDefinition = read("routine-definition.example.json");
const routineState = read("routine-state.example.json");
const taskDefinition = read("task-definition.example.json");
const instantiationDecision = read("instantiation-decision.example.json");

const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
};
const digest = (value) => crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");

const definitionResult = (artifactStatus, relation, reason) => ({
  artifact_status: artifactStatus,
  identity_relation: relation,
  activation_status: "not_evaluated",
  decision_status: "not_evaluated",
  task_status: "not_evaluated",
  reason,
});

const evaluateDefinition = (facts) => {
  const relation = facts.same_id ? "same_routine" : "new_routine";
  if (facts.revision_delta === 0) {
    return definitionResult(facts.same_content ? "accepted" : "integrity_conflict", relation, facts.same_content ? "same_content_replay" : "duplicate_revision_different_content");
  }
  if (!facts.same_id && facts.revision === 1 && facts.same_basis) {
    if (!facts.trigger_spec) return definitionResult("invalid", "new_routine", "trigger_spec_missing");
    if (!facts.template_matches_basis) return definitionResult("invalid", "new_routine", "task_template_identity_mismatch");
    return definitionResult("accepted", "new_routine", "genesis_definition_candidate");
  }
  if (facts.same_id && !facts.same_basis) return definitionResult("invalid", "new_routine", "identity_basis_change_requires_new_routine");
  if ((facts.revision_delta ?? 0) > 1) return definitionResult("indeterminate", relation, "definition_revision_gap");
  if (facts.previous === "mismatch") return definitionResult("invalid", relation, "previous_definition_digest_mismatch");
  if (facts.previous === "unavailable") return definitionResult("indeterminate", relation, "previous_definition_unavailable");
  if (facts.continuity === "unavailable") return definitionResult("indeterminate", relation, "routine_continuity_decision_unavailable");
  if (facts.continuity !== "allowed") return definitionResult("invalid", "new_routine", "routine_continuity_not_authorized");
  if (!facts.trigger_spec) return definitionResult("invalid", relation, "trigger_spec_missing");
  if (!facts.template_matches_basis) return definitionResult("invalid", relation, "task_template_identity_mismatch");
  return definitionResult("accepted", relation, "authorized_routine_revision");
};

const activationResult = (activationStatus, reason) => ({
  artifact_status: "not_evaluated",
  identity_relation: "not_evaluated",
  activation_status: activationStatus,
  decision_status: "not_evaluated",
  task_status: "not_evaluated",
  reason,
});

const evaluateActivation = (facts) => {
  if (facts.definition_binding !== "match") return activationResult("indeterminate", "routine_definition_binding_mismatch");
  if (facts.authority_epoch === "stale") return activationResult("indeterminate", "activation_authority_epoch_stale");
  if (facts.authority_epoch === "ahead") return activationResult("indeterminate", "verifier_authority_state_behind");
  if (facts.activation === "proposed") return activationResult("proposed", facts.author === "agent" ? "agent_candidate_requires_authority" : "candidate_not_yet_activated");
  if (facts.activation === "active") {
    if (facts.decision === "confirmation_required") return activationResult("proposed", "routine_activation_confirmation_required");
    if (facts.decision !== "allowed") return activationResult("indeterminate", "activation_decision_missing");
    if (facts.prior_activation === "paused") {
      if (!facts.transition) return activationResult("indeterminate", "reactivation_transition_record_missing");
      return activationResult("active", "exact_definition_reactivated");
    }
    return activationResult("active", "exact_definition_activated");
  }
  if (["paused", "retired", "superseded"].includes(facts.activation)) {
    if (facts.decision !== "allowed") return activationResult("indeterminate", "activation_transition_not_authorized");
    if (!facts.transition) return activationResult("indeterminate", "activation_transition_record_missing");
    if (facts.activation === "superseded") {
      if ((facts.related_count ?? 0) < 1) return activationResult("indeterminate", "superseding_routine_binding_missing");
      return activationResult("superseded", "authorized_routine_supersession");
    }
    return activationResult(facts.activation, "authorized_activation_transition");
  }
  return activationResult("indeterminate", "unsupported_activation_state");
};

const instantiationBase = {
  definition_binding: "match",
  routine_state_binding: "match",
  authority_epoch: "current",
  activation: "active",
  target_binding: "match",
  target_lifecycle: "persistent",
  commitment: "adopted",
  event_integrity: "valid",
  trigger_evidence: "admitted",
  trigger: "matched",
  condition: "satisfied",
  occurrence_key: true,
  materialization_key: "valid",
  lateness: "on_time",
  late_policy: "latest_only",
  is_latest: true,
  catch_up_within_limit: true,
  overlap: "clear",
  overlap_policy: "suppress_while_active",
  dedupe: "new",
  same_task: true,
  task_binding: true,
  task_template: "match",
  task_intent: "match",
  task_routine: "match",
  task_occurrence: "match",
};

const instantiationResult = (activation, decision, task, reason) => ({
  artifact_status: "not_evaluated",
  identity_relation: "not_evaluated",
  activation_status: activation,
  decision_status: decision,
  task_status: task,
  reason,
});

const evaluateInstantiation = (overrides) => {
  const facts = {...instantiationBase, ...overrides};
  if (facts.definition_binding !== "match") return instantiationResult(facts.activation, "invalid", "not_created", "routine_definition_binding_mismatch");
  if (facts.routine_state_binding !== "match") return instantiationResult(facts.activation, "indeterminate", "indeterminate", "routine_state_binding_mismatch");
  if (facts.authority_epoch !== "current") return instantiationResult(facts.activation, "indeterminate", "indeterminate", facts.authority_epoch === "stale" ? "instantiation_authority_epoch_stale" : "verifier_authority_state_behind");
  if (facts.activation !== "active") return instantiationResult(facts.activation, "suppressed", "not_created", "routine_not_active");
  if (facts.target_binding !== "match") return instantiationResult("active", "invalid", "not_created", "target_intent_binding_mismatch");
  if (facts.target_lifecycle !== "persistent") return instantiationResult("active", "invalid", "not_created", "routine_requires_persistent_intent");
  if (facts.commitment === "unavailable" || facts.commitment === "indeterminate") return instantiationResult("active", "indeterminate", "indeterminate", "target_intent_state_unavailable");
  if (facts.commitment !== "adopted") return instantiationResult("active", "suppressed", "not_created", "target_intent_not_adopted");
  if (facts.event_integrity === "same_source_id_different_content") return instantiationResult("active", "integrity_conflict", "indeterminate", "event_identity_content_conflict");
  if (facts.trigger_evidence === "unavailable") return instantiationResult("active", "indeterminate", "indeterminate", "trigger_evidence_unavailable");
  if (facts.trigger_evidence !== "admitted") return instantiationResult("active", "indeterminate", "not_created", "trigger_evidence_not_admitted");
  if (facts.trigger === "indeterminate") return instantiationResult("active", "indeterminate", "indeterminate", "trigger_match_indeterminate");
  if (facts.trigger !== "matched") return instantiationResult("active", "not_eligible", "not_created", "trigger_not_matched");
  if (facts.condition === "indeterminate") return instantiationResult("active", "indeterminate", "indeterminate", "eligibility_condition_indeterminate");
  if (!new Set(["satisfied", "not_required"]).has(facts.condition)) return instantiationResult("active", "not_eligible", "not_created", "eligibility_condition_not_satisfied");
  if (!facts.occurrence_key) return instantiationResult("active", "invalid", "not_created", "occurrence_key_missing");
  if (facts.materialization_key !== "valid") return instantiationResult("active", "invalid", "not_created", "materialization_key_invalid");
  if (facts.lateness === "expired") return instantiationResult("active", "expired", "not_created", "occurrence_outside_lateness_policy");
  if (facts.lateness === "accepted_late" && facts.late_policy === "latest_only" && !facts.is_latest) return instantiationResult("active", "expired", "not_created", "not_latest_catch_up_occurrence");
  if (facts.lateness === "accepted_late" && facts.late_policy === "bounded_each" && !facts.catch_up_within_limit) return instantiationResult("active", "expired", "not_created", "catch_up_bound_exceeded");
  if (facts.overlap === "prior_active") {
    if (facts.overlap_policy === "suppress_while_active") return instantiationResult("active", "suppressed", "not_created", "active_predecessor_suppresses_occurrence");
    if (facts.overlap_policy === "defer_while_active") return instantiationResult("active", "deferred", "not_created", "active_predecessor_defers_occurrence");
    if (facts.overlap_policy === "supersede_previous") return instantiationResult("active", "invalid", "not_created", "prior_task_transition_required_separately");
  }
  if (facts.dedupe === "replay") return facts.same_task
    ? instantiationResult("active", "duplicate", "existing", "same_materialization_replay")
    : instantiationResult("active", "integrity_conflict", "indeterminate", "materialization_key_task_conflict");
  if (facts.dedupe === "conflict") return instantiationResult("active", "integrity_conflict", "indeterminate", "materialization_key_task_conflict");
  if (!facts.task_binding) return instantiationResult("active", "invalid", "not_created", "materialized_task_binding_missing");
  if (facts.task_template !== "match") return instantiationResult("active", "invalid", "not_created", "materialized_task_template_mismatch");
  if (facts.task_intent !== "match") return instantiationResult("active", "invalid", "not_created", "materialized_task_intent_mismatch");
  if (facts.task_routine !== "match") return instantiationResult("active", "invalid", "not_created", "materialized_task_routine_mismatch");
  if (facts.task_occurrence !== "match") return instantiationResult("active", "invalid", "not_created", "materialized_task_occurrence_mismatch");
  return instantiationResult("active", "materialized", "created", facts.authorization_requested ? "task_created_authorization_separate" : "active_routine_materialized_exact_occurrence");
};

assert.equal(oracle.cases.length, 55);
assert.equal(oracle.model_boundary_cases.length, 18);

for (const testCase of oracle.cases) {
  const actual = testCase.phase === "definition"
    ? evaluateDefinition(testCase.facts)
    : testCase.phase === "activation"
      ? evaluateActivation(testCase.facts)
      : evaluateInstantiation(testCase.facts);
  assert.deepEqual(actual, testCase.expected, testCase.case_id);
}

const boundaries = {
  "pattern-routine-boundary": {observed_pattern: "descriptive_claim", routine: "authority_activated_instantiation_policy"},
  "intent-routine-boundary": {intent: "declarative_household_commitment", routine: "when_to_evaluate_task_creation"},
  "schedule-routine-boundary": {schedule: "recurrence_specification", routine: "governed_wrapper_with_task_and_delivery_semantics"},
  "trigger-condition-boundary": {trigger: "evaluation_opportunity", condition: "as_of_eligibility_assessment"},
  "false-unknown-boundary": {false: "not_eligible", unknown: "indeterminate"},
  "event-occurrence-boundary": {event: "record_about_an_occurrence", occurrence_key: "policy_correlated_task_generation_slot"},
  "routine-task-boundary": {routine: "repeatable_instantiation_policy", task: "one_bounded_work_lineage"},
  "materialization-execution-boundary": {materialization: "task_definition_created", execution: "separate_plan_proposal_attempt_chain"},
  "activation-authorization-boundary": {routine_activation: "may_generate_tasks", action_authorization: "exact_proposal_permission"},
  "pause-intent-boundary": {routine_pause: "stop_new_instantiation", intent_commitment: "unchanged_without_own_transition"},
  "retire-task-boundary": {routine_retirement: "stop_future_instantiation", existing_task: "requires_separate_transition"},
  "event-dedup-boundary": {source_plus_id: "delivery_duplicate_key", materialization_key: "logical_occurrence_dedup_key"},
  "reschedule-identity-boundary": {actual_fire_time: "delivery_context", original_recurrence_identity: "stable_occurrence_basis"},
  "late-policy-boundary": {missed_occurrence: "historical_generation_opportunity", catch_up: "explicit_bounded_policy_only"},
  "overlap-transition-boundary": {overlap_policy: "new_occurrence_gate", prior_task_transition: "separate_authority_and_state_operation"},
  "forecast-fact-boundary": {forecast: "qualified_prediction_claim", future_fact: "not_established"},
  "decision-history-boundary": {instantiation_decision: "append_only_as_of_record", current_policy: "does_not_rewrite_prior_decision"},
  "external-language-boundary": {external_rule_language: "trigger_and_condition_expression", hwm_profile: "identity_authority_evidence_and_output_boundary"},
};
for (const testCase of oracle.model_boundary_cases) assert.deepEqual(boundaries[testCase.case_id], testCase.expected, testCase.case_id);

assert.equal(intentDefinition.identity_basis_digest, digest(intentDefinition.identity_basis));
assert.equal(intentDefinition.identity_basis.lifecycle_kind, "persistent");
assert.equal(routineDefinition.identity_basis_digest, digest(routineDefinition.identity_basis));
assert.equal(routineDefinition.target_intent_binding.digest, digest(intentDefinition));
assert.equal(routineDefinition.target_intent_binding.intent_id, intentDefinition.intent_id);
assert.equal(routineDefinition.identity_basis.target_intent_id, intentDefinition.intent_id);
assert.equal(routineDefinition.trigger_contract.trigger_spec_binding.digest, digest(triggerSpec));
assert.equal(routineDefinition.trigger_contract.eligibility_spec_binding.digest, digest(eligibilitySpec));
assert.equal(routineDefinition.trigger_contract.occurrence_key_policy_binding.digest, digest(occurrenceKeyPolicy));
assert.equal(routineState.routine_definition_binding.digest, digest(routineDefinition));
assert.equal(routineState.routine_id, routineDefinition.routine_id);
assert.equal(routineState.activation_status, "active");

assert.equal(taskDefinition.identity_basis_digest, digest(taskDefinition.identity_basis));
assert.equal(taskDefinition.identity_basis.intent_binding.digest, digest(intentDefinition));
assert.equal(taskDefinition.identity_basis.occurrence.routine_binding.digest, digest(routineDefinition));
assert.equal(taskDefinition.identity_basis.occurrence.routine_binding.routine_id, routineDefinition.routine_id);
assert.equal(taskDefinition.identity_basis.purpose, routineDefinition.task_template.purpose);
assert.deepEqual(taskDefinition.identity_basis.scope_refs, routineDefinition.task_template.scope_refs);
assert.deepEqual(taskDefinition.exit_criteria, routineDefinition.task_template.exit_criteria);

assert.equal(intentState.intent_definition_binding.digest, digest(intentDefinition));
assert.equal(intentState.commitment_status, "adopted");
assert.equal(intentState.active_task_bindings.length, 0, "Pre-materialization Intent State cannot reference the future Task");
assert.equal(instantiationDecision.routine_definition_binding.digest, digest(routineDefinition));
assert.equal(instantiationDecision.routine_state_binding.digest, digest(routineState));
assert.equal(instantiationDecision.target_intent_state_binding.digest, digest(intentState));
assert.equal(instantiationDecision.task_definition_binding.digest, digest(taskDefinition));
assert.ok(intentState.assessed_at < taskDefinition.created_at, "Instantiation must use a pre-materialization Intent State");
assert.equal(instantiationDecision.occurrence.occurrence_key, taskDefinition.identity_basis.occurrence.occurrence_key);
assert.equal(instantiationDecision.occurrence.nominal_instant, taskDefinition.identity_basis.occurrence.original_scheduled_time);
assert.equal(instantiationDecision.materialization_key_digest, digest({
  household_id: routineDefinition.identity_basis.household_id,
  routine_id: routineDefinition.routine_id,
  occurrence_key: instantiationDecision.occurrence.occurrence_key,
}));
assert.equal(instantiationDecision.decision_status, "materialized");
assert.equal(taskDefinition.plan_bindings.length, 0, "Routine materialization must not invent a Plan");

const forbidden = new Set([...oracle.cases, ...oracle.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of [
  "repeated_behavior_is_active_routine",
  "agent_can_self_activate_routine",
  "persistent_intent_implies_active_routine",
  "raw_event_is_qualified_trigger",
  "unknown_condition_is_false",
  "cloud_event_id_is_logical_occurrence_id",
  "delivery_retry_creates_second_task",
  "missed_occurrence_always_catches_up",
  "routine_trigger_cancels_prior_task",
  "routine_activation_is_action_authorization",
  "task_materialization_is_action_dispatch",
]) assert.ok(forbidden.has(guard), `Missing forbidden inference ${guard}`);

console.log("ROUTINE INSTANTIATION OK", oracle.cases.length, "semantic cases", oracle.model_boundary_cases.length, "model-boundary cases", forbidden.size, "forbidden inferences");
console.log("GENERATION BOUNDARY OK", "pattern, Intent, Routine activation, trigger, condition, occurrence, Task, and Authorization remain distinct");
console.log("DELIVERY BOUNDARY OK", "late, overlap, replay, event identity, and logical occurrence identity are explicit and fail closed");
console.log("TASK CHAIN OK", "one active Routine occurrence materializes one exact Task without a Plan, Proposal, dispatch, or authorization");
