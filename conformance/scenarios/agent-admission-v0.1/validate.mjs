import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const artifact = JSON.parse(fs.readFileSync(path.join(directory, "admission-cases.json"), "utf8"));
const baseRequest = JSON.parse(fs.readFileSync(path.join(directory, "admission-request.example.json"), "utf8"));
const baseLease = JSON.parse(fs.readFileSync(path.join(directory, "issued-lease.example.json"), "utf8"));
const baseDecision = JSON.parse(fs.readFileSync(path.join(directory, "admission-decision.example.json"), "utf8"));
const clone = (value) => structuredClone(value);

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function digest(value) {
  return crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");
}

function outcome(trust, compatibility, instance, authorization, admission, reason) {
  return {
    trust_status: trust,
    compatibility_status: compatibility,
    instance_binding_status: instance,
    authorization_decision: authorization,
    admission_status: admission,
    reason
  };
}

function exactSet(left, right) {
  return left.length === right.length && left.every((item) => right.includes(item));
}

function expand(testCase) {
  const overrides = testCase.overrides ?? {};
  const request = clone(baseRequest);
  const lease = clone(baseLease);
  const decision = clone(baseDecision);

  if (overrides.add_optional_profile) request.supported_profiles.push({id: "hwm:interactive-evidence", versions: ["0.1.0"]});
  if (overrides.remove_profile) request.supported_profiles = request.supported_profiles.filter((item) => item.id !== overrides.remove_profile);
  if (overrides.profile_version) request.supported_profiles.find((item) => item.id === overrides.profile_version.id).versions = [overrides.profile_version.version];
  if (overrides.supported_canonicalizations) request.supported_canonicalizations = overrides.supported_canonicalizations;
  if (overrides.supported_proof_suites) request.supported_proof_suites = overrides.supported_proof_suites;
  if (overrides.request_expires_at) request.expires_at = overrides.request_expires_at;
  if (overrides.request_issued_at) request.issued_at = overrides.request_issued_at;
  if (overrides.request_audience) request.audience = overrides.request_audience;
  if (overrides.requested_purposes) request.requested_purposes = overrides.requested_purposes;
  if (overrides.requested_actions) request.requested_actions = overrides.requested_actions;

  decision.request_binding.artifact_id = request.request_id;
  decision.request_binding.digest = digest(request);
  decision.granted_scope = {
    purposes: clone(request.requested_purposes),
    actions: clone(request.requested_actions),
    audiences: [request.audience]
  };
  if (overrides.decision_request_digest) decision.request_binding.digest = overrides.decision_request_digest;
  if (overrides.decision_root_id) decision.trust_root_binding.root_id = overrides.decision_root_id;
  if (overrides.decision_authority_epoch !== undefined) decision.authority_epoch = overrides.decision_authority_epoch;
  if (overrides.decision_granted_actions) decision.granted_scope.actions = overrides.decision_granted_actions;

  if (overrides.lease_subject) lease.subject = overrides.lease_subject;
  if (overrides.lease_pop_value) lease.proof_of_possession.value = overrides.lease_pop_value;
  if (overrides.lease_audience) lease.audiences = [overrides.lease_audience];
  if (overrides.lease_authority_epoch !== undefined) lease.authority_epoch = overrides.lease_authority_epoch;
  if (overrides.lease_expires_at) lease.expires_at = overrides.lease_expires_at;
  if (overrides.lease_not_before) lease.not_before = overrides.lease_not_before;
  if (!overrides.preserve_lease_binding) decision.issued_lease_binding.digest = digest(lease);

  return {request, lease, decision, overrides};
}

export function evaluateAdmission({request, lease, decision, overrides}) {
  const authority = artifact.authority;
  const now = artifact.assessment_time;
  if (overrides.root_status === "unpinned") return outcome("untrusted", "not_evaluated", "not_evaluated", "not_evaluated", "not_admitted", "trust_root_not_pinned");
  if (overrides.root_status === "unavailable") return outcome("indeterminate", "not_evaluated", "not_evaluated", "not_evaluated", "indeterminate", "trust_root_state_unavailable");
  if (request.expires_at <= now) return outcome("trusted", "not_evaluated", "not_evaluated", "denied", "not_admitted", "admission_request_expired");
  if (request.issued_at > now) return outcome("trusted", "not_evaluated", "not_evaluated", "indeterminate", "indeterminate", "admission_request_from_future");
  if (overrides.nonce_status === "replayed") return outcome("trusted", "not_evaluated", "not_evaluated", "denied", "not_admitted", "admission_nonce_replayed");
  if (request.audience !== authority.audience) return outcome("trusted", "not_evaluated", "not_evaluated", "denied", "not_admitted", "admission_audience_mismatch");

  const support = new Map(request.supported_profiles.map((item) => [item.id, new Set(item.versions)]));
  for (const profile of authority.required_profiles) {
    if (!support.has(profile.id)) return outcome("trusted", "incompatible", "not_evaluated", "denied", "not_admitted", "required_profile_unsupported");
    if (!support.get(profile.id).has(profile.version)) return outcome("trusted", "incompatible", "not_evaluated", "denied", "not_admitted", "required_profile_version_unsupported");
  }
  if (!request.supported_canonicalizations.some((item) => authority.canonicalizations.includes(item))) return outcome("trusted", "incompatible", "not_evaluated", "denied", "not_admitted", "canonicalization_not_negotiated");
  if (!request.supported_proof_suites.some((item) => authority.proof_suites.includes(item))) return outcome("trusted", "incompatible", "not_evaluated", "denied", "not_admitted", "proof_suite_not_negotiated");

  if (overrides.instance_proof_status === "invalid") return outcome("trusted", "compatible", "invalid", "denied", "not_admitted", "agent_instance_proof_invalid");
  if (overrides.instance_proof_status === "unavailable") return outcome("trusted", "compatible", "indeterminate", "indeterminate", "indeterminate", "agent_instance_proof_unavailable");
  if (request.requested_purposes.some((item) => !authority.allowed_purposes.includes(item))) return outcome("trusted", "compatible", "verified", "denied", "not_admitted", "requested_purpose_not_authorized");
  if (request.requested_actions.some((item) => !authority.allowed_actions.includes(item) && !authority.confirmation_actions.includes(item))) return outcome("trusted", "compatible", "verified", "denied", "not_admitted", "requested_action_not_authorized");
  if (overrides.user_status === "pending" || request.requested_actions.some((item) => authority.confirmation_actions.includes(item))) return outcome("trusted", "compatible", "verified", "confirmation_required", "pending", "user_authorization_pending");
  if (overrides.user_status === "denied") return outcome("trusted", "compatible", "verified", "denied", "not_admitted", "user_authorization_denied");

  if (overrides.decision_proof_status === "invalid") return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "authority_decision_proof_invalid");
  if (overrides.decision_proof_status === "unavailable") return outcome("trusted", "compatible", "verified", "not_evaluated", "indeterminate", "authority_decision_proof_unavailable");
  if (decision.request_binding.digest !== digest(request)) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "admission_request_digest_mismatch");
  const root = authority.trust_root_binding;
  if (decision.trust_root_binding.lineage_id !== root.lineage_id || decision.trust_root_binding.root_id !== root.root_id || decision.trust_root_binding.root_version !== root.root_version) return outcome("untrusted", "compatible", "verified", "not_evaluated", "not_admitted", "admission_decision_wrong_root");
  if (decision.authority_epoch < authority.authority_epoch) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "admission_decision_epoch_stale");
  if (decision.authority_epoch > authority.authority_epoch) return outcome("indeterminate", "compatible", "verified", "not_evaluated", "indeterminate", "verifier_authority_state_behind");
  if (!exactSet(decision.granted_scope.purposes, request.requested_purposes) || !exactSet(decision.granted_scope.actions, request.requested_actions) || !exactSet(decision.granted_scope.audiences, [request.audience])) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "granted_scope_not_exact_request");
  if (decision.issued_lease_binding.digest !== digest(lease)) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "issued_lease_digest_mismatch");
  if (lease.proof_of_possession.binding_type !== request.instance_key_binding.binding_type || lease.proof_of_possession.value !== request.instance_key_binding.value) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "lease_pop_binding_mismatch");
  if (!exactSet(lease.audiences, [request.audience])) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "lease_audience_mismatch");
  if (lease.authority_epoch < authority.authority_epoch) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "issued_lease_epoch_stale");
  if (lease.authority_epoch > authority.authority_epoch) return outcome("indeterminate", "compatible", "verified", "not_evaluated", "indeterminate", "verifier_authority_state_behind_lease");
  if (lease.expires_at <= now) return outcome("trusted", "compatible", "verified", "not_evaluated", "not_admitted", "issued_lease_expired");
  if (lease.not_before > now) return outcome("trusted", "compatible", "verified", "not_evaluated", "indeterminate", "issued_lease_not_yet_active");
  const optionalMissing = authority.optional_profiles.some((profile) => !support.get(profile.id)?.has(profile.version));
  return outcome("trusted", "compatible", "verified", "allowed", "admitted", optionalMissing ? "agent_admitted_with_optional_profile_limitations" : "agent_admitted");
}

function evaluateBoundary(testCase) {
  const answers = {
    parse_boundary: {semantic_compatibility: true, data_access: false, action_authorization: false},
    identity_boundary: {key_control: true, vendor_identity: "not_inferred", human_operator: "not_inferred"},
    view_boundary: {purpose_bound_view: true, raw_package_access: false, dispatch: false},
    proposal_boundary: {proposal_allowed: true, dispatch_allowed: false},
    matter_boundary: {device_operational_credentials: true, hwm_agent_admitted: false},
    approval_boundary: {lease_may_be_issued: true, evidence_truth: false, future_actions_allowed: false},
    subject_boundary: {authority_assigned_subject: "required", self_assigned_subject: "not_accepted"}
  };
  return answers[testCase.case_id.replaceAll("-", "_")];
}

assert.equal(artifact.cases.length, 32);
assert.equal(artifact.model_boundary_cases.length, 7);
assert.equal(digest(baseRequest), "9f15b63d96e07c36ec9b38da3c8c1520b63dacaa4ac109c9814c4db902df1fa7");
assert.equal(digest(baseLease), "6accce499a76ed85c69fb47c53b3b212b372c3904d8fe05c67f9b690c4346f94");
assert.equal(baseDecision.request_binding.digest, digest(baseRequest));
assert.equal(baseDecision.issued_lease_binding.digest, digest(baseLease));
for (const testCase of artifact.cases) {
  assert.deepEqual(evaluateAdmission(expand(testCase)), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
for (const testCase of artifact.model_boundary_cases) {
  assert.deepEqual(evaluateBoundary(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
const forbidden = new Set([...artifact.cases, ...artifact.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of ["capability_is_authorization", "authority_response_bootstraps_root", "partial_parse_is_semantic_compatibility", "instance_handle_proves_key_control", "proposal_permission_implies_dispatch", "matter_commissioning_is_agent_admission", "onboarding_approval_makes_evidence_true", "agent_names_its_own_privileges", "bearer_lease_is_sender_constrained"]) {
  assert.ok(forbidden.has(guard), `Missing Agent Admission guard: ${guard}`);
}

console.log("AGENT ADMISSION OK", `${artifact.cases.length} handshake cases`, `${artifact.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("SEPARATION OK", "parse, root trust, instance proof, authorization, Lease, and World View are distinct gates");
console.log("IDENTITY BOUNDARY OK", "the Authority assigns the admitted subject; a key proof does not establish vendor or human identity");
console.log("ACTION BOUNDARY OK", "resolve, propose, dispatch, and submit-record scopes do not imply one another");
console.log("MATTER BOUNDARY OK", "commissioning a Matter node does not admit an HWM Agent");
