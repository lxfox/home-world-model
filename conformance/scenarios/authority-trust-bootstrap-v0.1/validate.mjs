import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const artifact = JSON.parse(fs.readFileSync(path.join(directory, "trust-cases.json"), "utf8"));
const clone = (value) => structuredClone(value);

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function signedDigest(root) {
  return crypto.createHash("sha256").update(canonicalJson(root.signed)).digest("hex");
}

function setPath(object, dottedPath, value) {
  const parts = dottedPath.split(".");
  let cursor = object;
  for (const part of parts.slice(0, -1)) cursor = cursor[part];
  cursor[parts.at(-1)] = value;
}

function baseRoot(name) {
  if (name === "genesis") return clone(artifact.genesis_root);
  if (name === "rotation") return clone(artifact.rotation_root);
  if (name === "recovery") return clone(artifact.recovery_root);
  throw new Error(`Unknown root fixture: ${name}`);
}

function expandCandidate(name, testCase, trusted) {
  const root = baseRoot(name);
  if (trusted && root.signed.previous_root_binding) {
    root.signed.previous_root_binding.root_id = trusted.signed.root_id;
    root.signed.previous_root_binding.root_version = trusted.signed.root_version;
    root.signed.previous_root_binding.signed_digest = signedDigest(trusted);
  }
  const overrides = testCase.overrides ?? {};
  for (const [key, value] of Object.entries(overrides)) {
    if (key.startsWith("signed.")) setPath(root, key, value);
  }
  if (overrides.proofs) {
    const byId = new Map(root.proofs.map((proof) => [proof.proof_id, proof]));
    root.proofs = overrides.proofs.map((id) => clone(byId.get(id)));
  }
  if (overrides.remove_proof) root.proofs = root.proofs.filter((proof) => proof.proof_id !== overrides.remove_proof);
  if (overrides.duplicate_proof) {
    const original = root.proofs.find((proof) => proof.proof_id === overrides.duplicate_proof);
    root.proofs.push({...clone(original), proof_id: `${original.proof_id}-duplicate`, value: `${original.value}-duplicate`});
  }
  for (const [methodId, materialRef] of Object.entries(overrides.method_material ?? {})) {
    root.signed.verification_methods.find((method) => method.method_id === methodId).verification_material_ref = materialRef;
  }
  const statusOverrides = overrides.proof_status ?? {};
  const proofResults = Object.fromEntries(root.proofs.map((proof) => [proof.proof_id, {
    status: statusOverrides[proof.proof_id] ?? "verified",
    signed_digest: signedDigest(root),
    signer_method_id: proof.signer_method_id
  }]));
  return {root, proofResults};
}

function expand(testCase) {
  if (testCase.mode === "genesis") {
    const {root, proofResults} = expandCandidate(testCase.candidate, testCase, null);
    return {testCase, trusted: null, candidates: [{root, proofResults}]};
  }
  const trusted = baseRoot(testCase.trusted);
  if (testCase.overrides?.trusted_expires_at) trusted.signed.expires_at = testCase.overrides.trusted_expires_at;
  if (testCase.overrides?.trusted_recovery_none) trusted.signed.recovery_policy = {mode: "none", method_ids: []};
  const names = testCase.mode === "fork" ? testCase.candidates : [testCase.candidate];
  return {testCase, trusted, candidates: names.map((name) => expandCandidate(name, testCase, trusted))};
}

function roleMethods(root, roleName) {
  return new Set(root.signed.roles[roleName].method_ids);
}

function structuralError(root) {
  const signed = root.signed;
  const methods = new Map(signed.verification_methods.map((method) => [method.method_id, method]));
  if (methods.size !== signed.verification_methods.length) return "duplicate_verification_method_id";
  if (new Set(root.proofs.map((proof) => proof.proof_id)).size !== root.proofs.length) return "duplicate_proof_id";
  if (!(signed.issued_at < signed.expires_at)) return "invalid_root_validity_interval";
  for (const [roleName, role] of Object.entries(signed.roles)) {
    if (role.threshold > new Set(role.method_ids).size) return `${roleName}_threshold_exceeds_methods`;
    for (const id of role.method_ids) {
      if (!methods.has(id) || !methods.get(id).purposes.includes(roleName === "root" ? "root" : "authority_document")) {
        return `${roleName}_method_not_declared`;
      }
    }
  }
  const rootMethods = roleMethods(root, "root");
  const rootMaterials = new Set([...rootMethods].map((id) => methods.get(id).verification_material_ref));
  if (rootMaterials.size !== rootMethods.size) return "duplicate_verification_material_in_root_role";
  if ([...roleMethods(root, "authority_document")].some((id) => rootMethods.has(id))) return "root_and_online_authority_keys_not_separated";
  if ([...roleMethods(root, "authority_document")].some((id) => rootMaterials.has(methods.get(id).verification_material_ref))) return "root_and_online_authority_material_not_separated";
  const recovery = signed.recovery_policy;
  if (recovery.mode === "precommitted") {
    if (recovery.threshold > new Set(recovery.method_ids).size) return "recovery_threshold_exceeds_methods";
    for (const id of recovery.method_ids) {
      if (!methods.has(id) || !methods.get(id).purposes.includes("recovery")) return "recovery_method_not_declared";
      if (rootMethods.has(id)) return "root_and_recovery_keys_not_separated";
      if (rootMaterials.has(methods.get(id).verification_material_ref)) return "root_and_recovery_material_not_separated";
    }
  }
  return null;
}

function proofCount(candidate, proofResults, authorizationRole, authorizedMethods) {
  const verified = new Set();
  let unavailable = false;
  for (const proof of candidate.proofs.filter((item) => item.authorization_role === authorizationRole && authorizedMethods.has(item.signer_method_id))) {
    const result = proofResults[proof.proof_id];
    if (!result || result.signed_digest !== signedDigest(candidate) || result.signer_method_id !== proof.signer_method_id) continue;
    if (result.status === "unavailable") unavailable = true;
    if (result.status === "verified") verified.add(proof.signer_method_id);
  }
  return {count: verified.size, unavailable};
}

function evaluateCandidate(trusted, candidate, proofResults, assessmentTime) {
  const structure = structuralError(candidate);
  if (structure) return {result: "rejected", reason: structure};
  const current = trusted.signed;
  const next = candidate.signed;
  if (next.lineage_id !== current.lineage_id || next.authority_id !== current.authority_id || next.household_id !== current.household_id) {
    return {result: "rejected", reason: "authority_lineage_mismatch"};
  }
  const binding = next.previous_root_binding;
  if (!binding || binding.root_id !== current.root_id || binding.root_version !== current.root_version || binding.signed_digest !== signedDigest(trusted)) {
    return {result: "rejected", reason: "previous_root_digest_mismatch"};
  }
  if (next.root_version <= current.root_version) return {result: "rejected", reason: "root_version_not_newer"};
  if (next.root_version !== current.root_version + 1) return {result: "indeterminate", reason: "sequential_root_update_required"};
  if (next.authority_epoch_floor <= current.authority_epoch_floor) return {result: "rejected", reason: "authority_epoch_floor_not_advanced"};
  if (next.issued_at > assessmentTime) return {result: "indeterminate", reason: "candidate_root_from_future"};

  const nextThreshold = next.roles.root.threshold;
  const nextProofs = proofCount(candidate, proofResults, "next_root", roleMethods(candidate, "root"));
  if (nextProofs.unavailable && nextProofs.count < nextThreshold) return {result: "indeterminate", reason: "root_proof_verification_unavailable"};

  if (next.transition_kind === "rotation") {
    const currentThreshold = current.roles.root.threshold;
    const currentProofs = proofCount(candidate, proofResults, "current_root", roleMethods(trusted, "root"));
    if (currentProofs.unavailable && currentProofs.count < currentThreshold) return {result: "indeterminate", reason: "root_proof_verification_unavailable"};
    if (currentProofs.count < currentThreshold) return {result: "rejected", reason: "current_root_threshold_not_met"};
  } else if (next.transition_kind === "recovery") {
    const recovery = current.recovery_policy;
    if (recovery.mode !== "precommitted") return {result: "rebootstrap_required", reason: "recovery_not_precommitted"};
    const recoveryProofs = proofCount(candidate, proofResults, "recovery", new Set(recovery.method_ids));
    if (recoveryProofs.unavailable && recoveryProofs.count < recovery.threshold) return {result: "indeterminate", reason: "root_proof_verification_unavailable"};
    if (recoveryProofs.count < recovery.threshold) return {result: "rejected", reason: "recovery_threshold_not_met"};
  } else {
    return {result: "rejected", reason: "genesis_cannot_be_in_band_successor"};
  }
  if (nextProofs.count < nextThreshold) return {result: "rejected", reason: "next_root_threshold_not_met"};
  if (next.expires_at <= assessmentTime) return {result: "indeterminate", reason: "candidate_root_expired_or_freeze_possible"};
  return {
    result: "accepted",
    reason: next.transition_kind === "rotation" ? "sequential_rotation_accepted" : "precommitted_recovery_accepted",
    accepted_root_id: next.root_id
  };
}

export function evaluateTrustBootstrap(request) {
  const {testCase, trusted, candidates} = request;
  if (testCase.mode === "genesis") {
    const candidate = candidates[0].root;
    const structure = structuralError(candidate);
    if (structure) return {result: "rejected", reason: structure};
    if (candidate.signed.transition_kind !== "genesis" || candidate.signed.root_version !== 1 || candidate.signed.previous_root_binding !== null) {
      return {result: "rejected", reason: "invalid_genesis_shape"};
    }
    if (!testCase.pin_digest) return {result: "rebootstrap_required", reason: "trusted_genesis_pin_missing"};
    if (testCase.pin_digest !== signedDigest(candidate)) return {result: "rejected", reason: "genesis_pin_digest_mismatch"};
    return {result: "accepted", reason: "out_of_band_pin_matched", accepted_root_id: candidate.signed.root_id};
  }
  const results = candidates.map(({root, proofResults}) => evaluateCandidate(trusted, root, proofResults, artifact.assessment_time));
  const accepted = results.filter((result) => result.result === "accepted");
  if (accepted.length > 1) return {result: "contested", reason: "multiple_valid_successor_roots"};
  if (accepted.length === 1) return accepted[0];
  return results[0];
}

function evaluateBoundary(testCase) {
  switch (testCase.input) {
    case "attacker_controls_threshold_of_current_root_keys": return {protocol_result: "cryptographically_indistinguishable", required_response: "out_of_band_recovery_or_rebootstrap"};
    case "all_continuity_credentials_lost_without_recovery_policy": return {continuity: "not_provable", next_state: "new_lineage"};
    case "trusted_root_expired_without_reachable_successor": return {status: "indeterminate", inference: "freeze_possible_not_proven"};
    case "trust_root_accepted": return {authority_documents_may_be_verified: true, action_authorized: false};
    default: return {technical_control: true, legal_ownership: "not_inferred"};
  }
}

assert.equal(artifact.cases.length, 22);
assert.equal(artifact.model_boundary_cases.length, 5);
assert.equal(signedDigest(artifact.genesis_root), "c5e196c467143d199d886297711b3a8e4226dab81203a0f1b75ff362c3b431ea");
for (const testCase of artifact.cases) {
  const actual = evaluateTrustBootstrap(expand(testCase));
  assert.equal(actual.result, testCase.expected.result, testCase.case_id);
  assert.equal(actual.reason, testCase.expected.reason, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
for (const testCase of artifact.model_boundary_cases) {
  assert.deepEqual(evaluateBoundary(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, testCase.case_id);
}
const forbidden = new Set([...artifact.cases, ...artifact.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of ["artifact_can_pin_itself", "duplicate_signature_counts_twice", "different_method_ids_are_independent_keys", "highest_version_always_wins", "new_root_continues_old_lineage_without_proof", "threshold_security_is_infallible", "root_acceptance_is_action_authorization", "key_control_proves_legal_ownership"]) {
  assert.ok(forbidden.has(guard), `Missing trust-bootstrap guard: ${guard}`);
}

console.log("AUTHORITY TRUST BOOTSTRAP OK", `${artifact.cases.length} transition cases`, `${artifact.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("GENESIS BOUNDARY OK", "a Trust Root becomes trusted only through an exact out-of-band pin");
console.log("CONTINUITY OK", "rotation requires current-root and next-root thresholds over one exact sequential successor");
console.log("RECOVERY BOUNDARY OK", "recovery requires a precommitted independent threshold; otherwise a new lineage is required");
console.log("AUTHORIZATION BOUNDARY OK", "accepted root material may verify Authority documents but never authorizes an action by itself");
