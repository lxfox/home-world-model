import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const oracle = JSON.parse(fs.readFileSync(path.join(directory, "task-lineage-cases.json"), "utf8"));
const definition = JSON.parse(fs.readFileSync(path.join(directory, "task-definition.example.json"), "utf8"));
const state = JSON.parse(fs.readFileSync(path.join(directory, "task-state.example.json"), "utf8"));
const intentDefinition = JSON.parse(fs.readFileSync(path.join(directory, "../intent-commitment-v0.1/intent-definition.example.json"), "utf8"));

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

function digest(value) {
  return crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");
}

const definitionResult = (status, relation, reason) => ({definition_status: status, identity_relation: relation, state_status: "not_evaluated", lifecycle_status: "not_evaluated", reason});
const stateResult = (status, lifecycle, reason, relation = "not_evaluated") => ({definition_status: "not_evaluated", identity_relation: relation, state_status: status, lifecycle_status: lifecycle, reason});

export function evaluateDefinition(facts) {
  const relation = facts.same_id ? "same_task" : (facts.same_basis && (facts.lineage ?? "genesis") === "genesis" ? "unrelated" : "new_task");
  if (facts.cycle) return definitionResult("invalid", relation, "task_lineage_cycle");
  if (facts.source_status === "unavailable") return definitionResult("indeterminate", relation, "lineage_source_unavailable");
  if (facts.lineage === "merge_result" && facts.source_count < 2) return definitionResult("invalid", relation, "merge_requires_multiple_sources");
  if (["split_child", "merge_result", "superseding"].includes(facts.lineage) && facts.same_id) return definitionResult("invalid", "new_task", "lineage_result_must_use_new_task_id");
  if (facts.revision_delta === 0) return facts.same_content ? definitionResult("accepted", relation, "same_content_replay") : definitionResult("integrity_conflict", relation, "duplicate_revision_different_content");
  if (facts.same_id && !facts.same_basis) return definitionResult("invalid", "new_task", "identity_basis_change_requires_new_task_id");
  if (facts.revision_delta > 1) return definitionResult("indeterminate", relation, "definition_revision_gap");
  if (facts.previous === "mismatch") return definitionResult("invalid", relation, "previous_definition_digest_mismatch");
  if (facts.previous === "unavailable") return definitionResult("indeterminate", relation, "previous_definition_unavailable");
  if (facts.change === "scheduled_time" && facts.original_occurrence_preserved) return definitionResult("accepted", relation, "reschedule_preserves_original_occurrence_identity");
  if (facts.lineage === "split_child") return definitionResult("accepted", "new_task", "split_child_has_new_identity");
  if (facts.lineage === "merge_result") return definitionResult("accepted", "new_task", "merge_result_has_new_identity");
  if (facts.lineage === "superseding") return definitionResult("accepted", "new_task", "superseding_task_has_new_identity");
  if (!facts.same_id && facts.same_basis) return definitionResult("accepted", "unrelated", "new_genesis_id_is_unrelated_task");
  if (!facts.same_id && facts.basis_change === "occurrence") return definitionResult("accepted", "new_task", "new_occurrence_new_task");
  return definitionResult("accepted", relation, "sequential_revision_same_identity_basis");
}

export function evaluateState(facts) {
  if (facts.revision_delta > 1) return stateResult("indeterminate", "indeterminate", "state_revision_gap");
  if (facts.previous === "mismatch") return stateResult("invalid", "indeterminate", "previous_state_digest_mismatch");
  if (facts.prior_terminal) {
    if (!facts.same_basis) return stateResult("invalid", "indeterminate", "identity_change_requires_new_task_not_reopen", "new_task");
    if (!facts.reopen_binding) return stateResult("invalid", "indeterminate", "prior_terminal_state_binding_missing");
    if (!facts.authority) return stateResult("invalid", "indeterminate", "reopen_authority_missing");
    if (facts.status === "indeterminate") return stateResult("valid", "indeterminate", "later_assessment_preserves_prior_terminal_history");
    return stateResult("valid", facts.status, "authorized_reopen_same_identity");
  }
  if (facts.status === "completed") {
    if (facts.terminal !== "completed") return stateResult("invalid", "indeterminate", "terminal_kind_status_mismatch");
    if (!facts.evidence) return stateResult("indeterminate", "indeterminate", "mandatory_completion_evidence_unavailable");
    if (facts.criteria !== "satisfied") return stateResult("invalid", "indeterminate", "mandatory_criterion_not_satisfied");
    if (facts.open_attempts > 0) return stateResult("invalid", "indeterminate", "completion_has_open_attempt");
    return stateResult("valid", "completed", "all_mandatory_criteria_satisfied");
  }
  const authorityTerminal = ["cancelled", "superseded", "split", "merged"];
  const lineageTerminal = ["superseded", "split", "merged"];
  if (facts.terminal !== "not_applicable") {
    if (facts.terminal !== facts.status) return stateResult("invalid", "indeterminate", "terminal_kind_status_mismatch");
    if (!facts.transition) return stateResult("invalid", "indeterminate", "terminal_transition_record_missing");
    if (authorityTerminal.includes(facts.status) && !facts.authority) return stateResult("invalid", "indeterminate", "terminal_authority_decision_missing");
    if (lineageTerminal.includes(facts.status) && (facts.related_count ?? 0) < 1) return stateResult("invalid", "indeterminate", "related_task_binding_missing");
    return stateResult("valid", facts.status, lineageTerminal.includes(facts.status) ? "authorized_lineage_terminal_transition" : (facts.status === "cancelled" ? "authorized_terminal_transition" : "terminal_transition_supported"));
  }
  if (facts.attempt_failed) return stateResult("valid", facts.status, "attempt_failure_does_not_fail_task");
  if (facts.authorization_requested) return stateResult("valid", facts.status, "state_valid_but_authorization_separate");
  return stateResult("valid", facts.status, "nonterminal_state_supported");
}

const boundaries = {
  "intent-task-boundary": {intent: "desired_state_and_reason", task: "bounded_work_lineage"},
  "routine-occurrence-boundary": {routine: "authority_activated_instantiation_policy", occurrence: "distinct_task_identity"},
  "task-plan-boundary": {task: "stable_identity_basis", plan: "changeable_method"},
  "task-proposal-boundary": {task: "work_lineage", proposal: "exact_policy_boundary"},
  "task-attempt-boundary": {task: "may_have_multiple_attempts", attempt: "one_dispatch_or_execution"},
  "attempt-failure-boundary": {attempt: "failed", task: "not_failed_without_task_assessment"},
  "completion-truth-boundary": {completion: "time_bound_evidence_assessment", global_truth: "not_established"},
  "cancellation-evidence-boundary": {cancellation: "authorized_work_stop", evidence_refutation: "not_inferred"},
  "split-identity-boundary": {parent: "terminal_split", children: "new_task_identities"},
  "merge-identity-boundary": {parents: "terminal_merged", result: "new_task_identity"},
  "reschedule-boundary": {scheduled_time: "may_change", original_occurrence_identity: "preserved"},
  "agent-task-boundary": {agent: "may_change", task_identity: "unchanged_if_basis_unchanged"},
  "state-authority-boundary": {task_state: "descriptive_assessment", action_authority: "separate_decision"}
};

assert.equal(definition.identity_basis_digest, digest(definition.identity_basis));
assert.equal(state.task_definition_binding.digest, digest(definition));
assert.equal(state.task_id, definition.task_id);
assert.equal(state.task_definition_binding.task_id, definition.task_id);
assert.equal(state.task_definition_binding.definition_revision, definition.definition_revision);
assert.equal(definition.identity_basis.intent_binding.intent_id, intentDefinition.intent_id);
assert.equal(definition.identity_basis.intent_binding.definition_revision, intentDefinition.definition_revision);
assert.equal(definition.identity_basis.intent_binding.digest, digest(intentDefinition));
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
for (const guard of ["agent_identity_is_task_identity", "plan_identity_is_task_identity", "next_occurrence_is_same_task", "split_child_is_parent_task", "merge_selects_parent_identity", "attempt_failure_is_task_failure", "completion_is_permanent_global_truth", "task_state_grants_action_authority"]) assert.ok(forbidden.has(guard), `Missing Task Lineage guard: ${guard}`);

console.log("TASK LINEAGE OK", `${oracle.cases.length} semantic cases`, `${oracle.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("IDENTITY OK", "Task identity binds exact Intent, purpose, occurrence, household, and immutable scope; Agent and Plan may change");
console.log("LIFECYCLE OK", "Attempts, evidence-bound Task State, terminal transitions, and authorized reopen remain separate and append-only");
