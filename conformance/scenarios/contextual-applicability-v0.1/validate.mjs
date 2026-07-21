import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const oracle = read("applicability-cases.json");
const preference = read("preference-claim.example.json");
const rule = read("applicability-rule-claim.example.json");
const view = read("applicability-world-view.example.json");
const assessment = read("applicability-assessment.example.json");
const situationDirectory = path.resolve(directory, "../situational-context-v0.1");
const situationQuery = JSON.parse(fs.readFileSync(path.join(situationDirectory, "situation-query.example.json"), "utf8"));
const situationAssessment = JSON.parse(fs.readFileSync(path.join(situationDirectory, "situation-use-assessment.example.json"), "utf8"));

const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
};
const digest = (value) => crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");
const answer = (result, conflictStatus, reason) => ({result, conflict_status: conflictStatus, normative_effect: "none", reason});

const base = {
  target_kind: "preference",
  world_view_binding: "match",
  target_binding: "match",
  rule_binding: "match",
  purpose: "match",
  as_of: "match",
  authority_epoch: "current",
  target_availability: "available",
  target_epistemic: "accepted",
  target_freshness: "current",
  target_temporal: "in_effect",
  rule_availability: "available",
  rule_epistemic: "accepted",
  rule_freshness: "current",
  rule_temporal: "in_effect",
  operator: "all_of",
  coverage: "complete",
  conditions: ["satisfied"],
  query_binding: "match",
  condition_binding: "match",
  subject_alignment: "match",
  conflict_status: "not_evaluated",
};

const evaluate = (overrides) => {
  const facts = {...base, ...overrides};
  if (facts.target_kind === "utterance") return answer("indeterminate", "not_evaluated", "utterance_not_resolved_directed_condition_claim");
  if (facts.target_kind === "observation") return answer("indeterminate", "not_evaluated", "observation_not_directed_condition_claim");
  if (facts.target_kind === "forecast") return answer("indeterminate", "not_evaluated", "forecast_not_preference_requirement_constraint_or_goal");
  if (facts.target_kind === "inferred_need") return answer("indeterminate", "not_evaluated", "inferred_need_not_privileged_target");
  if (facts.world_view_binding !== "match") return answer("indeterminate", "not_evaluated", "world_view_binding_mismatch");
  if (facts.target_binding !== "match") return answer("indeterminate", "not_evaluated", "target_claim_binding_mismatch");
  if (facts.rule_binding !== "match") return answer("indeterminate", "not_evaluated", "rule_claim_binding_mismatch");
  if (facts.purpose !== "match") return answer("indeterminate", "not_evaluated", "assessment_purpose_mismatch");
  if (facts.as_of !== "match") return answer("indeterminate", "not_evaluated", "assessment_time_mismatch");
  if (facts.authority_epoch === "stale") return answer("indeterminate", "not_evaluated", "assessment_authority_epoch_stale");
  if (facts.authority_epoch === "ahead") return answer("indeterminate", "not_evaluated", "verifier_authority_state_behind");
  if (facts.target_availability !== "available") return answer("indeterminate", "not_evaluated", `target_${facts.target_availability}`);
  if (facts.target_epistemic !== "accepted") return answer("indeterminate", "not_evaluated", `target_claim_${facts.target_epistemic}`);
  if (!["current", "not_applicable"].includes(facts.target_freshness)) return answer("indeterminate", "not_evaluated", "target_claim_not_fresh_enough");
  if (facts.target_temporal === "expired") return answer("not_applicable", "not_evaluated", "target_claim_expired_at_as_of");
  if (facts.target_temporal === "not_yet_in_effect") return answer("not_applicable", "not_evaluated", "target_claim_not_yet_in_effect_at_as_of");
  if (!["in_effect", "unbounded"].includes(facts.target_temporal)) return answer("indeterminate", "not_evaluated", "target_temporal_status_not_conclusive");
  if (facts.rule_availability !== "available") return answer("indeterminate", "not_evaluated", `rule_${facts.rule_availability}`);
  if (facts.rule_epistemic !== "accepted") return answer("indeterminate", "not_evaluated", `applicability_rule_${facts.rule_epistemic}`);
  if (!["current", "not_applicable"].includes(facts.rule_freshness)) return answer("indeterminate", "not_evaluated", "applicability_rule_not_fresh_enough");
  if (!["in_effect", "unbounded"].includes(facts.rule_temporal)) return answer("indeterminate", "not_evaluated", "applicability_rule_not_current");
  if (!["all_of", "any_of", "unconditional"].includes(facts.operator)) return answer("indeterminate", "not_evaluated", "unsupported_rule_operator");
  if (facts.query_binding !== "match") return answer("indeterminate", "not_evaluated", "condition_query_binding_mismatch");
  if (facts.condition_binding !== "match") return answer("indeterminate", "not_evaluated", "condition_assessment_binding_mismatch");
  if (facts.subject_alignment === "mismatch") return answer("not_applicable", "not_evaluated", "target_and_context_subjects_explicitly_mismatch");
  if (facts.subject_alignment !== "match") return answer("indeterminate", "not_evaluated", "target_and_context_subject_alignment_unknown");
  if (facts.operator === "unconditional") {
    if (facts.conditions.length !== 0 || facts.coverage !== "complete") return answer("indeterminate", "not_evaluated", "invalid_unconditional_rule_projection");
    return answer("applicable", facts.conflict_status, "explicit_unconditional_rule");
  }
  if (facts.conditions.length === 0) return answer("indeterminate", "not_evaluated", "non_unconditional_rule_has_no_conditions");
  if (facts.operator === "all_of") {
    if (facts.conditions.includes("not_satisfied")) return answer("not_applicable", "not_evaluated", "required_condition_explicitly_not_satisfied");
    if (facts.coverage === "complete" && facts.conditions.every((item) => item === "satisfied")) return answer("applicable", facts.conflict_status, "all_required_conditions_satisfied");
    return answer("indeterminate", "not_evaluated", "all_of_condition_not_conclusive");
  }
  if (facts.conditions.includes("satisfied")) return answer("applicable", facts.conflict_status, "one_alternative_condition_satisfied");
  if (facts.coverage === "complete" && facts.conditions.every((item) => item === "not_satisfied")) return answer("not_applicable", "not_evaluated", "all_alternative_conditions_explicitly_not_satisfied");
  return answer("indeterminate", "not_evaluated", "any_of_condition_not_conclusive");
};

assert.equal(oracle.cases.length, 56);
assert.equal(oracle.model_boundary_cases.length, 20);
for (const testCase of oracle.cases) assert.deepEqual(evaluate(testCase.facts), testCase.expected, testCase.case_id);

const boundaries = {
  "situation-applicability-boundary": {situation: "descriptive_context_claim", applicability: "target_claim_relevance_for_exact_use"},
  "claim-rule-boundary": {target_claim: "desired_condition_or_limit", rule_claim: "when_target_is_considered"},
  "acceptance-applicability-boundary": {accepted: "resolver_may_rely_on_claim", applicable: "accepted_claim_is_relevant_now"},
  "applicability-satisfaction-boundary": {applicable: "condition_should_be_considered", satisfaction: "world_state_meets_target"},
  "applicability-conflict-boundary": {applicability: "three_valued_per_target", conflict: "orthogonal_overlap_and_incompatibility_assessment"},
  "conflict-priority-boundary": {conflict: "incompatible_applicable_targets", priority: "authority_or_coordination_policy_output"},
  "preference-need-boundary": {preference: "subject_scoped_favored_condition", need: "no_privileged_system_fact"},
  "need-intent-boundary": {inferred_need: "attributed_candidate_claim", intent: "authority_mediated_commitment"},
  "applicability-intent-boundary": {applicability: "relevance_assessment", intent: "household_commitment"},
  "applicability-routine-boundary": {applicability: "possible_eligibility_input", routine: "authority_activated_instantiation_policy"},
  "applicability-task-boundary": {applicability: "contextual_qualification", task: "bounded_work_on_exact_intent"},
  "applicability-proposal-boundary": {applicability: "descriptive_normative_relevance", proposal: "planner_authored_action_candidate"},
  "applicability-authorization-boundary": {applicability: "not_permission", authorization: "exact_proposal_policy_decision"},
  "applicability-action-boundary": {assessment: "immutable_decision_artifact", action: "separately_authorized_execution"},
  "subject-household-boundary": {personal_target: "subject_scoped", household_target: "requires_explicit_authority_and_scope"},
  "pet-welfare-boundary": {pet_behavior: "descriptive_observation_or_situation", welfare_requirement: "attributed_caretaker_or_model_claim"},
  "rule-authority-boundary": {authorship: "who_issued_rule", standing: "whether_rule_may_govern_exact_use"},
  "missing-false-boundary": {missing_or_denied: "indeterminate", explicit_contradiction: "may_establish_not_applicable"},
  "declared-learned-preference-boundary": {declared_preference: "issuer_attributed_claim", learned_pattern: "candidate_until_resolved"},
  "legacy-projection-boundary": {legacy_status: "lossy_compatibility_projection", canonical_result: "separate_applicability_and_conflict_axes"},
};
for (const testCase of oracle.model_boundary_cases) assert.deepEqual(boundaries[testCase.case_id], testCase.expected, testCase.case_id);

assert.deepEqual(preference.claim.proposition.object, view.resolutions[0].candidates[0].object);
assert.deepEqual(rule.claim.proposition.object, view.resolutions[1].candidates[0].object);
assert.equal(rule.claim.proposition.subject, preference.claim.claim_id);
assert.equal(rule.claim.proposition.object.conditions[0].query_binding.digest, digest(situationQuery));
assert.equal(assessment.world_view_binding.digest, digest(view));
assert.equal(assessment.target_claim_binding.digest, digest(preference.claim));
assert.equal(assessment.rule_claim_binding.digest, digest(rule.claim));
assert.equal(assessment.condition_results[0].basis_binding.digest, digest(situationAssessment));
assert.equal(assessment.condition_results[0].query_binding.digest, digest(situationQuery));
assert.equal(rule.claim.proposition.object.conditions[0].expected_result, assessment.condition_results[0].observed_result);
assert.equal(assessment.condition_results[0].observed_result, situationAssessment.result);
assert.equal(assessment.as_of, situationAssessment.as_of);
assert.equal(assessment.purpose, situationAssessment.purpose);
assert.equal(assessment.authority_epoch, situationAssessment.authority_epoch);
assert.equal(assessment.result, "applicable");
assert.equal(assessment.conflict_status, "not_evaluated");

const forbidden = new Set([...oracle.cases, ...oracle.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of [
  "accepted_means_applicable",
  "applicable_means_satisfied",
  "applicable_means_needed",
  "conflict_makes_claim_not_applicable",
  "conflict_selects_winner",
  "unknown_condition_is_false",
  "missing_context_is_false",
  "agent_inference_is_household_need",
  "applicability_creates_intent",
  "applicability_creates_task",
  "applicability_authorizes_action",
  "personal_preference_is_household_preference",
  "pet_issues_human_like_intent",
  "legacy_conflicting_is_canonical_applicability"
]) assert.ok(forbidden.has(guard), `Missing forbidden inference ${guard}`);

console.log("CONTEXTUAL APPLICABILITY OK", oracle.cases.length, "semantic cases", oracle.model_boundary_cases.length, "model-boundary cases", forbidden.size, "forbidden inferences");
console.log("THREE-VALUED USE OK", "applicable, not_applicable, and indeterminate remain distinct under exact bindings and decisive-subset privacy");
console.log("NO INFERRED NEED OK", "applicability and conflict grant no Need, priority, Intent, Task, Proposal, Authorization, or action");
