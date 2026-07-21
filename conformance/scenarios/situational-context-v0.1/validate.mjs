import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const oracle = read("situation-cases.json");
const claim = read("sleep-episode-claim.example.json");
const view = read("sleep-world-view.example.json");
const query = read("situation-query.example.json");
const subjectSet = read("subject-set.example.json");
const assessment = read("situation-use-assessment.example.json");

const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
};
const digest = (value) => crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");

const answer = (representation, viewStatus, useStatus, reason) => ({
  representation,
  view_status: viewStatus,
  use_status: useStatus,
  reason,
});

const evaluateRepresentation = (facts) => {
  if (facts.artifact === "observation") return answer("observation_record", "not_evaluated", "not_evaluated", "observation_is_evidence_not_situation");
  if (facts.artifact === "control_mode") return answer("control_state_claim", "not_verified", "not_evaluated", "declared_mode_is_control_state_not_household_reality");
  if (facts.artifact === "policy") return answer("policy_artifact", "not_evaluated", "not_evaluated", "policy_window_is_not_activity_episode");
  if (facts.artifact === "forecast") return answer("prediction_claim", "not_verified", "not_evaluated", "forecast_is_not_current_activity");
  if (facts.artifact === "schedule") return answer("schedule_artifact", "not_evaluated", "not_evaluated", "schedule_is_not_activity_episode");
  if (facts.subject_scope === "missing") return answer("invalid", "not_evaluated", "not_evaluated", "situation_subject_scope_missing");
  if (facts.space_required && facts.space_scope === "missing") return answer("invalid", "not_evaluated", "not_evaluated", "required_situation_space_scope_missing");
  if (facts.phenomenon_time === "missing") return answer("indeterminate", "not_evaluated", "not_evaluated", "phenomenon_time_unavailable");
  if (facts.phenomenon_time === "result_time_substitution") return answer("invalid", "not_evaluated", "not_evaluated", "result_time_is_not_episode_time");
  if (facts.episode_identity === "delivery_id") return answer("invalid", "not_evaluated", "not_evaluated", "delivery_identity_is_not_episode_identity");
  if (facts.origin_diversity === "same_origin_counted_twice") return answer("indeterminate", "not_evaluated", "not_evaluated", "correlated_evidence_not_independent");
  if (facts.confidence_only) return answer("situation_claim", "not_verified", "not_evaluated", "model_confidence_does_not_accept_claim");
  return answer("situation_claim", "not_verified", "not_evaluated", "scoped_situation_candidate_requires_resolution");
};

const useBase = {
  source_kind: "situation_claim",
  query_kind: "situation",
  world_view_binding: "match",
  query_binding: "match",
  authority_epoch: "current",
  purpose: "match",
  subject_scope: "match",
  space_scope: "match",
  coverage: "complete",
  availability: "available",
  epistemic: "accepted",
  freshness: "current",
  temporal: "in_effect",
  qualification: "matched",
};

const evaluateUse = (overrides) => {
  const facts = {...useBase, ...overrides};
  if (facts.source_kind === "observation") return answer("not_evaluated", "not_evaluated", "indeterminate", "observation_not_resolved_situation_claim");
  if (facts.source_kind === "control_mode" && facts.query_kind === "actual_presence") return answer("not_evaluated", "accepted", "indeterminate", "control_mode_not_actual_occupancy");
  if (facts.source_kind === "policy" && facts.query_kind === "activity") return answer("not_evaluated", "not_evaluated", "indeterminate", "policy_applicability_not_activity_truth");
  if (facts.source_kind === "prediction" && facts.query_kind === "current_activity") return answer("not_evaluated", "accepted", "indeterminate", "prediction_not_current_episode");
  if (facts.source_kind === "schedule" && facts.query_kind === "current_activity") return answer("not_evaluated", "not_evaluated", "indeterminate", "schedule_not_activity_episode");
  if (facts.world_view_binding !== "match") return answer("not_evaluated", "not_evaluated", "indeterminate", "world_view_binding_mismatch");
  if (facts.query_binding !== "match") return answer("not_evaluated", "not_evaluated", "indeterminate", "situation_query_binding_mismatch");
  if (facts.authority_epoch === "stale") return answer("not_evaluated", "not_evaluated", "indeterminate", "assessment_authority_epoch_stale");
  if (facts.authority_epoch === "ahead") return answer("not_evaluated", "not_evaluated", "indeterminate", "verifier_authority_state_behind");
  if (facts.purpose !== "match") return answer("not_evaluated", "not_evaluated", "indeterminate", "world_view_purpose_mismatch");
  if (facts.subject_scope !== "match") return answer("not_evaluated", "not_evaluated", "indeterminate", "situation_subject_scope_mismatch");
  if (facts.space_scope !== "match") return answer("not_evaluated", "not_evaluated", "indeterminate", "situation_space_scope_mismatch");
  if (facts.coverage === "partial") return answer("not_evaluated", "unknown", "indeterminate", "subject_coverage_incomplete");
  if (facts.coverage === "indeterminate") return answer("not_evaluated", "unknown", "indeterminate", "subject_coverage_indeterminate");
  if (facts.availability !== "available") return answer("not_evaluated", "not_evaluated", "indeterminate", `${facts.availability}_does_not_establish_situation`);
  if (facts.epistemic === "contested") return answer("not_evaluated", "contested", "indeterminate", "situation_claim_contested");
  if (facts.epistemic === "unknown") return answer("not_evaluated", "unknown", "indeterminate", "situation_claim_unknown");
  if (facts.epistemic === "not_verified") return answer("not_evaluated", "not_verified", "indeterminate", "situation_claim_not_verified");
  if (facts.epistemic !== "accepted") return answer("not_evaluated", "not_evaluated", "indeterminate", "situation_claim_not_evaluated");
  if (facts.freshness !== "current") return answer("not_evaluated", "accepted", "indeterminate", "situation_evidence_not_current");
  if (facts.temporal !== "in_effect") return answer("not_evaluated", "accepted", "indeterminate", "situation_not_in_effect_at_query_time");
  if (facts.qualification === "contradicted") return answer("not_evaluated", "accepted", "not_satisfied", "accepted_current_claim_explicitly_contradicts_query");
  if (facts.qualification !== "matched") return answer("not_evaluated", "accepted", "indeterminate", "candidate_difference_not_declared_contradiction");
  if (facts.identity_requested && facts.identity_evidence !== "qualified") return answer("not_evaluated", "accepted", "indeterminate", "presence_does_not_establish_identity");
  if (facts.historical_query) return answer("not_evaluated", "accepted", "satisfied", "historical_as_of_query_matches_closed_episode");
  if (facts.corrected_claim) return answer("not_evaluated", "accepted", "satisfied", "qualified_correction_changes_new_view_not_history");
  if (facts.source_kind === "control_mode") return answer("not_evaluated", "accepted", "satisfied", "exact_declared_control_state_matched");
  if (facts.opaque_aggregate) return answer("not_evaluated", "accepted", "satisfied", "authorized_opaque_aggregate_matched_without_identity_disclosure");
  if (facts.guest_presence) return answer("not_evaluated", "accepted", "satisfied", "guest_presence_matched_membership_separate");
  if (facts.pet_presence) return answer("not_evaluated", "accepted", "satisfied", "pet_presence_matched_human_occupancy_separate");
  if (facts.routine_activation_requested) return answer("not_evaluated", "accepted", "satisfied", "situation_qualified_routine_activation_separate");
  if (facts.task_creation_requested) return answer("not_evaluated", "accepted", "satisfied", "situation_qualified_task_materialization_separate");
  if (facts.authorization_requested) return answer("not_evaluated", "accepted", "satisfied", "situation_qualified_action_authorization_separate");
  if (facts.routine_condition) return answer("not_evaluated", "accepted", "satisfied", "situation_assessment_may_feed_exact_routine_condition");
  return answer("not_evaluated", "accepted", "satisfied", "accepted_current_in_effect_situation_matches_query");
};

assert.equal(oracle.cases.length, 56);
assert.equal(oracle.model_boundary_cases.length, 20);
for (const testCase of oracle.cases) {
  const actual = testCase.phase === "representation" ? evaluateRepresentation(testCase.facts) : evaluateUse(testCase.facts);
  assert.deepEqual(actual, testCase.expected, testCase.case_id);
}

const boundaries = {
  "observation-situation-boundary": {observation: "time_bound_evidence_record", situation: "claim_resolved_for_a_purpose"},
  "phenomenon-result-time-boundary": {phenomenon_time: "when_property_applies", result_time: "when_result_became_available"},
  "episode-identity-boundary": {episode_ref: "correlation_handle", identity: "separately_resolved_claim"},
  "activity-habit-boundary": {activity_episode: "bounded_occurrence", observed_pattern: "descriptive_repetition_claim"},
  "activity-mode-boundary": {activity: "descriptive_situation", mode: "declared_control_state"},
  "mode-occupancy-boundary": {away_mode: "system_state", all_away: "coverage_bound_descriptive_claim"},
  "policy-situation-boundary": {quiet_hours: "applicable_policy_window", sleeping: "activity_claim"},
  "forecast-current-boundary": {forecast: "prediction_claim", current_episode: "as_of_descriptive_resolution"},
  "person-household-boundary": {person_episode: "subject_scoped", household_situation: "requires_declared_coverage"},
  "presence-identity-boundary": {presence: "spatial_or_occupancy_claim", identity: "separate_evidence_and_authority"},
  "guest-membership-boundary": {guest_presence: "temporary_situation", household_membership: "separate_relation"},
  "pet-person-boundary": {pet_presence: "animal_situation", human_occupancy: "not_inferred"},
  "open-interval-boundary": {open_end: "episode_currently_asserted_ongoing", permanence: "not_established"},
  "confidence-acceptance-boundary": {model_confidence: "issuer_metadata", accepted: "resolver_result"},
  "same-origin-boundary": {multiple_derivations: "correlated_evidence", independent_origins: "policy_evaluated"},
  "context-routine-boundary": {situation_use: "eligibility_input", routine_activation: "separate_authority_state"},
  "context-task-boundary": {situation_use: "condition_assessment", task: "separate_materialization_decision"},
  "context-authorization-boundary": {situation_match: "descriptive_qualification", authorization: "exact_proposal_permission"},
  "privacy-absence-boundary": {access_denied: "undisclosed", absent: "not_inferred"},
  "global-mode-boundary": {household_context: "coexisting_scoped_claims", global_mode_enum: "rejected_lossy_projection"},
};
for (const testCase of oracle.model_boundary_cases) assert.deepEqual(boundaries[testCase.case_id], testCase.expected, testCase.case_id);

assert.equal(claim.claim.proposition.object.episode_ref, view.resolutions[0].candidates[0].object.episode_ref);
assert.deepEqual(claim.claim.proposition.object, view.resolutions[0].candidates[0].object);
assert.equal(claim.claim.valid_time.from, "2026-07-19T22:12:00Z");
assert.ok(!("to" in claim.claim.valid_time), "An open episode projection remains bounded by freshness, not a fabricated end");
assert.equal(assessment.world_view_binding.digest, digest(view));
assert.equal(assessment.query_binding.digest, digest(query));
assert.equal(assessment.subject_coverage.basis_binding.digest, digest(subjectSet));
assert.equal(assessment.input_resolutions[0].resolution_id, view.resolutions[0].resolution_id);
assert.equal(assessment.input_resolutions[0].candidate_claim_ids[0], claim.claim.claim_id);
assert.equal(assessment.as_of, view.as_of);
assert.equal(assessment.purpose, view.purpose);
assert.equal(assessment.authority_epoch, view.authority_epoch);
assert.equal(assessment.result, "satisfied");

const forbidden = new Set([...oracle.cases, ...oracle.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of [
  "sensor_event_is_activity",
  "model_confidence_is_acceptance",
  "result_time_is_episode_start",
  "delivery_id_is_episode_identity",
  "away_mode_proves_empty_home",
  "one_sleeping_person_means_household_sleeping",
  "no_presence_event_means_absent",
  "guest_presence_means_membership",
  "pet_presence_means_human_presence",
  "access_denied_means_false",
  "open_episode_is_permanent",
  "situation_match_activates_routine",
  "situation_match_creates_task",
  "situation_match_authorizes_action"
]) assert.ok(forbidden.has(guard), `Missing forbidden inference ${guard}`);

console.log("SITUATIONAL CONTEXT OK", oracle.cases.length, "semantic cases", oracle.model_boundary_cases.length, "model-boundary cases", forbidden.size, "forbidden inferences");
console.log("NO GLOBAL MODE OK", "person, pet, guest, space, policy, prediction, and control state remain independently scoped");
console.log("ROUTINE INPUT OK", "accepted current in-effect Situation Claims may qualify an exact condition without activating a Routine, creating a Task, or authorizing action");
