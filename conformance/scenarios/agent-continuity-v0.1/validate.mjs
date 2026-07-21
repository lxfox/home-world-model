import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const artifact = JSON.parse(fs.readFileSync(path.join(directory, "continuity-cases.json"), "utf8"));
const baseCheckpoint = JSON.parse(fs.readFileSync(path.join(directory, "continuity-checkpoint.example.json"), "utf8"));
const baseDecision = JSON.parse(fs.readFileSync(path.join(directory, "continuity-decision.example.json"), "utf8"));
const baseLease = JSON.parse(fs.readFileSync(path.join(directory, "target-lease.example.json"), "utf8"));
const taskDefinition = JSON.parse(fs.readFileSync(path.join(directory, "../task-lineage-v0.1/task-definition.example.json"), "utf8"));
const clone = (value) => structuredClone(value);

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

function digest(value) {
  return crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");
}

function result(checkpoint, admission, authorization, cutover, continuation, reason) {
  return {checkpoint_status: checkpoint, target_admission_status: admission, authority_decision: authorization, cutover_status: cutover, continuation_status: continuation, reason};
}

function setMode(checkpoint, decision, override) {
  const mode = override.mode ?? "successor";
  checkpoint.mode = mode;
  decision.mode = mode;
  decision.responsible_subject_id = null;
  decision.current_actor_subject_id = checkpoint.target_context.subject_id;
  decision.granted_actions = ["read_checkpoint", "continue_planning", "propose_revision"];
  decision.authorization_decision = "allowed";
  decision.cutover = {source_lease_binding: null, source_lease_status: "not_applicable", target_lease_status: "active", status: "not_applicable"};
  if (mode === "context_share") decision.granted_actions = ["read_checkpoint"];
  if (mode === "delegated_acting") {
    decision.responsible_subject_id = checkpoint.source_context.subject_id;
    decision.granted_actions = ["read_checkpoint", "continue_planning", "act_on_behalf"];
  }
  if (mode === "exclusive_cutover") {
    const source = override.source_lease_status ?? "revoked_by_known_epoch";
    const target = override.target_lease_status ?? "active";
    const cutover = source === "indeterminate" || target === "indeterminate" ? "indeterminate" : (["expired", "revoked_by_known_epoch"].includes(source) && target === "active" ? "ready" : "pending");
    decision.granted_actions = cutover === "ready" ? ["read_checkpoint", "dispatch_existing_proposal"] : [];
    decision.authorization_decision = cutover === "ready" ? "allowed" : (cutover === "pending" ? "confirmation_required" : "indeterminate");
    decision.current_actor_subject_id = cutover === "ready" ? checkpoint.target_context.subject_id : null;
    decision.target_lease_binding = cutover === "ready" ? clone(baseDecision.target_lease_binding) : null;
    decision.cutover = {
      source_lease_binding: {artifact_id: "urn:hwm:lease:agent-a-source-1", digest_algorithm: "sha-256", canonicalization: "RFC8785", digest: "8888888888888888888888888888888888888888888888888888888888888888"},
      source_lease_status: source,
      target_lease_status: target,
      status: cutover
    };
  }
}

function expand(testCase) {
  const override = testCase.overrides ?? {};
  const checkpoint = clone(baseCheckpoint);
  const decision = clone(baseDecision);
  const lease = clone(baseLease);
  setMode(checkpoint, decision, override);

  if (override.checkpoint_target_subject) checkpoint.target_context.subject_id = override.checkpoint_target_subject;
  if (override.checkpoint_purpose) checkpoint.target_context.purpose = override.checkpoint_purpose;
  if (override.checkpoint_audience) checkpoint.target_context.audience = override.checkpoint_audience;
  if (override.checkpoint_valid_until) checkpoint.valid_until = override.checkpoint_valid_until;
  if (override.checkpoint_generated_at) checkpoint.generated_at = override.checkpoint_generated_at;
  if (override.checkpoint_authority_epoch !== undefined) checkpoint.authority_epoch = override.checkpoint_authority_epoch;
  if (override.add_hidden_artifact) checkpoint.durable_artifacts.push({artifact_id: "urn:hwm:hidden:bedroom-camera-frame", digest_algorithm: "sha-256", canonicalization: "RFC8785", digest: "9999999999999999999999999999999999999999999999999999999999999999", role: "fixture"});

  decision.checkpoint_binding.artifact_id = checkpoint.checkpoint_id;
  decision.checkpoint_binding.digest = digest(checkpoint);
  decision.source_admission_decision_binding = clone(checkpoint.source_context.admission_decision_binding);
  decision.target_admission_decision_binding = clone(checkpoint.target_context.admission_decision_binding);
  if (override.decision_checkpoint_digest) decision.checkpoint_binding.digest = override.decision_checkpoint_digest;
  if (override.decision_target_admission_digest) decision.target_admission_decision_binding.digest = override.decision_target_admission_digest;
  if (override.decision_source_admission_digest) decision.source_admission_decision_binding.digest = override.decision_source_admission_digest;
  if (override.decision_root_id) decision.trust_root_binding.root_id = override.decision_root_id;
  if (override.decision_authority_epoch !== undefined) decision.authority_epoch = override.decision_authority_epoch;

  if (override.lease_subject) lease.subject = override.lease_subject;
  if (override.lease_pop_value) lease.proof_of_possession.value = override.lease_pop_value;
  if (override.lease_audience) lease.audiences = [override.lease_audience];
  if (override.lease_expires_at) lease.expires_at = override.lease_expires_at;
  if (!override.preserve_lease_binding && decision.target_lease_binding) decision.target_lease_binding.digest = digest(lease);
  if (override.delegated_action) decision.granted_actions.push(override.delegated_action);
  if (override.use_prior_actor_right && !decision.granted_actions.includes("dispatch_existing_proposal")) decision.granted_actions.push("dispatch_existing_proposal");
  return {checkpoint, decision, lease, override};
}

export function evaluateContinuity({checkpoint, decision, lease, override}) {
  const authority = artifact.authority;
  const now = artifact.assessment_time;
  if (override.target_admission_status === "not_admitted") return result("not_evaluated", "not_admitted", "not_evaluated", "not_applicable", "not_available", "target_agent_not_admitted");
  if (override.target_admission_status === "unavailable") return result("not_evaluated", "indeterminate", "not_evaluated", "not_applicable", "indeterminate", "target_admission_state_unavailable");
  if (override.source_admission_status === "invalid") return result("invalid", "admitted", "not_evaluated", "not_applicable", "not_available", "source_attribution_not_authenticated");
  if (override.checkpoint_proof_status === "invalid") return result("invalid", "admitted", "not_evaluated", "not_applicable", "not_available", "checkpoint_proof_invalid");
  if (override.checkpoint_proof_status === "unavailable") return result("indeterminate", "admitted", "not_evaluated", "not_applicable", "indeterminate", "checkpoint_proof_unavailable");
  if (checkpoint.valid_until <= now) return result("invalid", "admitted", "denied", "not_applicable", "not_available", "checkpoint_expired");
  if (checkpoint.generated_at > now) return result("indeterminate", "admitted", "indeterminate", "not_applicable", "indeterminate", "checkpoint_from_future");
  if (checkpoint.authority_epoch < authority.authority_epoch) return result("invalid", "admitted", "denied", "not_applicable", "not_available", "checkpoint_authority_epoch_stale");
  if (checkpoint.authority_epoch > authority.authority_epoch) return result("indeterminate", "admitted", "indeterminate", "not_applicable", "indeterminate", "verifier_behind_checkpoint_epoch");
  if (checkpoint.target_context.subject_id !== baseCheckpoint.target_context.subject_id) return result("invalid", "admitted", "denied", "not_applicable", "not_available", "checkpoint_target_subject_mismatch");
  if (checkpoint.target_context.purpose !== authority.purpose) return result("invalid", "admitted", "denied", "not_applicable", "not_available", "continuity_purpose_not_authorized");
  if (checkpoint.target_context.audience !== authority.audience) return result("invalid", "admitted", "denied", "not_applicable", "not_available", "continuity_audience_mismatch");
  const visible = new Set(artifact.visible_artifact_ids);
  const disclosed = [...checkpoint.durable_artifacts.map((item) => item.artifact_id), ...checkpoint.open_work.flatMap((item) => item.artifact_bindings.map((binding) => binding.artifact_id))];
  if (disclosed.some((id) => !visible.has(id))) return result("invalid", "admitted", "denied", "not_applicable", "not_available", "checkpoint_contains_unauthorized_artifact");
  if (override.required_artifact_status === "unavailable") return result("indeterminate", "admitted", "indeterminate", "not_applicable", "indeterminate", "required_continuity_artifact_unavailable");
  if (override.decision_proof_status === "invalid") return result("valid", "admitted", "not_evaluated", "not_applicable", "not_available", "continuity_decision_proof_invalid");
  if (override.decision_proof_status === "unavailable") return result("valid", "admitted", "not_evaluated", "not_applicable", "indeterminate", "continuity_decision_proof_unavailable");
  if (decision.checkpoint_binding.digest !== digest(checkpoint)) return result("valid", "admitted", "not_evaluated", "not_applicable", "not_available", "checkpoint_digest_mismatch");
  if (decision.target_admission_decision_binding.digest !== checkpoint.target_context.admission_decision_binding.digest) return result("valid", "admitted", "not_evaluated", "not_applicable", "not_available", "target_admission_binding_mismatch");
  if (decision.source_admission_decision_binding.digest !== checkpoint.source_context.admission_decision_binding.digest) return result("valid", "admitted", "not_evaluated", "not_applicable", "not_available", "source_admission_binding_mismatch");
  const root = authority.trust_root_binding;
  if (decision.trust_root_binding.lineage_id !== root.lineage_id || decision.trust_root_binding.root_id !== root.root_id || decision.trust_root_binding.root_version !== root.root_version) return result("valid", "admitted", "not_evaluated", "not_applicable", "not_available", "continuity_decision_wrong_root");
  if (decision.authority_epoch < authority.authority_epoch) return result("valid", "admitted", "not_evaluated", "not_applicable", "not_available", "continuity_decision_epoch_stale");
  if (decision.authority_epoch > authority.authority_epoch) return result("valid", "admitted", "not_evaluated", "not_applicable", "indeterminate", "verifier_behind_continuity_decision_epoch");

  if (checkpoint.mode === "delegated_acting") {
    if (override.use_prior_actor_right) return result("valid", "admitted", "denied", "not_applicable", "not_available", "prior_actor_history_not_authorization");
    const substantive = decision.granted_actions.filter((action) => !["read_checkpoint", "act_on_behalf"].includes(action));
    if (substantive.some((action) => !authority.source_delegable_actions.includes(action))) return result("valid", "admitted", "denied", "not_applicable", "not_available", "delegated_scope_exceeds_responsible_subject");
  }
  if (override.requested_action && !decision.granted_actions.includes(override.requested_action)) return result("valid", "admitted", "denied", "not_applicable", "not_available", "continuity_action_not_granted");
  if (checkpoint.mode === "exclusive_cutover") {
    const cutover = decision.cutover.status;
    if (cutover === "indeterminate") return result("valid", "admitted", "indeterminate", "indeterminate", "indeterminate", "exclusive_cutover_source_status_unknown");
    if (cutover === "pending") {
      const reason = decision.cutover.source_lease_status === "still_active" ? "exclusive_cutover_source_still_active" : "exclusive_cutover_target_not_active";
      return result("valid", "admitted", "confirmation_required", "pending", "pending", reason);
    }
  }

  if (!decision.target_lease_binding || decision.target_lease_binding.digest !== digest(lease)) return result("valid", "admitted", "not_evaluated", decision.cutover.status, "not_available", "target_lease_digest_mismatch");
  if (lease.subject !== checkpoint.target_context.subject_id) return result("valid", "admitted", "allowed", decision.cutover.status, "not_available", "target_lease_subject_mismatch");
  if (lease.proof_of_possession.binding_type !== authority.target_instance_binding.binding_type || lease.proof_of_possession.value !== authority.target_instance_binding.value) return result("valid", "admitted", "allowed", decision.cutover.status, "not_available", "target_lease_pop_mismatch");
  if (lease.audiences.length !== 1 || lease.audiences[0] !== checkpoint.target_context.audience) return result("valid", "admitted", "allowed", decision.cutover.status, "not_available", "target_lease_audience_mismatch");
  if (lease.expires_at <= now) return result("valid", "admitted", "allowed", decision.cutover.status, "not_available", "target_lease_expired");

  if (override.source_reports_unverified_completion) return result("valid", "admitted", "allowed", decision.cutover.status, "available", "available_with_unverified_completion_preserved");
  if (override.source_artifact_purpose_mismatch) return result("valid", "admitted", "allowed", decision.cutover.status, "available", "available_with_target_purpose_reevaluation");
  if (checkpoint.mode === "context_share") return result("valid", "admitted", "allowed", "not_applicable", "available", "context_share_available");
  if (checkpoint.mode === "delegated_acting") return result("valid", "admitted", "allowed", "not_applicable", "available", "delegated_acting_available");
  if (checkpoint.mode === "exclusive_cutover") return result("valid", "admitted", "allowed", "ready", "available", "exclusive_cutover_ready");
  return result("valid", "admitted", "allowed", "not_applicable", "available", "successor_checkpoint_available");
}

function evaluateBoundary(testCase) {
  const values = {
    "identity-boundary": {task_lineage: "continuous", agent_instance_identity: "not_transferred", authority_subject: "re_evaluated"},
    "memory-boundary": {chain_of_thought: "not_exchanged", durable_attributed_artifacts: "exchangeable"},
    "attribution-boundary": {plan_source_attribution: "preserved", target_new_outputs: "attributed_to_target"},
    "truth-boundary": {completion_claim: "requires_evidence_resolution", physical_outcome: "not_inferred"},
    "delegation-boundary": {current_actor: "target", responsible_subject: "source", impersonation: false},
    "actor-history-boundary": {current_actor_used_for_policy: true, prior_actor_rights_used_for_policy: false, history_preserved: true},
    "token-exchange-boundary": {target_token: "independent", source_token_revoked: "not_inferred"},
    "context-boundary": {target_specific_context: true, source_lease_transfer: false, raw_source_view_transfer: false},
    "proposal-boundary": {proposal_revision_allowed: true, source_proposal_dispatch_allowed: false},
    "offline-boundary": {instantaneous_exclusivity: "not_claimed", stale_exposure: "bounded_by_known_epoch_or_lease_expiry"}
  };
  return values[testCase.case_id];
}

assert.equal(artifact.cases.length, 40);
assert.equal(artifact.model_boundary_cases.length, 10);
assert.equal(baseCheckpoint.task_definition_binding.task_id, baseCheckpoint.task_id);
assert.equal(baseCheckpoint.task_definition_binding.definition_revision, baseCheckpoint.task_revision);
assert.equal(baseCheckpoint.task_definition_binding.digest, digest(taskDefinition));
assert.equal(digest(baseCheckpoint), "1afec1ed044eb5eeb81a6769d44789f743ed3ef4b6cd428ef0ed7c2481ff00a4");
assert.equal(baseDecision.checkpoint_binding.artifact_id, baseCheckpoint.checkpoint_id);
assert.equal(baseDecision.checkpoint_binding.digest, digest(baseCheckpoint));
assert.equal(digest(baseLease), "204d4dc9028a8b68bec0a5f552b17fa7d80f48d4b342eec7c15b3e864896e7b2");
for (const testCase of artifact.cases) {
  assert.deepEqual(evaluateContinuity(expand(testCase)), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
for (const testCase of artifact.model_boundary_cases) {
  assert.deepEqual(evaluateBoundary(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
const forbidden = new Set([...artifact.cases, ...artifact.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of ["task_continuity_is_agent_identity_continuity", "private_memory_is_household_knowledge", "continuation_transfers_authorship", "handoff_checkpoint_makes_claim_true", "delegation_is_impersonation", "nested_actor_history_grants_rights", "token_exchange_revokes_source_token", "source_lease_transfers_to_target", "successor_planning_implies_dispatch", "exclusive_cutover_is_instant_offline_revocation"]) assert.ok(forbidden.has(guard), `Missing Agent Continuity guard: ${guard}`);

console.log("AGENT CONTINUITY OK", `${artifact.cases.length} continuity cases`, `${artifact.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("MEDIATION OK", "the household rematerializes target-specific durable task state; agents do not transfer sessions or private reasoning");
console.log("DELEGATION OK", "current actor, responsible subject, prior actor history, and authorization scope remain distinct");
console.log("CUTOVER BOUNDARY OK", "exclusive dispatch requires known source invalidation and an active target Lease; offline exposure remains Lease-bounded");
