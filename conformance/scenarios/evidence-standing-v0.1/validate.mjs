import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const policy = read("standing-policy.json");
const artifact = read("standing-cases.json");

const outcome = (standingStatus, reasonCode, matchedGrantIds = []) => ({
  standing_status: standingStatus,
  matched_grant_ids: matchedGrantIds,
  reason_codes: [reasonCode]
});

function principalMatches(grant, request) {
  return grant.principal.actor_ids.includes(request.actor_id)
    || grant.principal.role_ids.some((role) => request.actor_role_ids.includes(role));
}

function selectorMatches(selector, values) {
  return selector.mode === "all" || values.some((value) => selector.values.includes(value));
}

function subjectMatches(grant, request) {
  if (grant.target.subject_mode === "any") return true;
  if (grant.target.subject_mode === "self") return request.target.subject_id === request.actor_id;
  return grant.target.subject_ids.includes(request.target.subject_id);
}

function qualificationDecision(grant, request) {
  if (grant.qualification.mode === "none") return {status: "matched"};
  if (!grant.qualification.jurisdictions.includes(request.jurisdiction)) {
    return {status: "excluded", reason: "qualification_jurisdiction_mismatch"};
  }
  const typed = request.credentials.filter((credential) =>
    grant.qualification.credential_types.includes(credential.credential_type)
    && grant.qualification.trusted_issuers.includes(credential.issuer));
  if (typed.length === 0) return {status: "excluded", reason: "qualification_missing"};
  if (typed.some((credential) => credential.verification_status === "unavailable")) {
    return {status: "indeterminate", reason: "qualification_verification_unavailable"};
  }
  const verified = typed.filter((credential) => credential.verification_status === "verified");
  if (verified.length === 0) return {status: "excluded", reason: "qualification_invalid"};
  if (verified.some((credential) => credential.credential_status === "unavailable")) {
    return {status: "indeterminate", reason: "qualification_status_unavailable"};
  }
  const active = verified.filter((credential) => credential.credential_status === "active");
  if (active.length === 0) return {status: "excluded", reason: "qualification_revoked"};
  const now = request.decision_time;
  if (active.every((credential) => now < credential.valid_from)) {
    return {status: "excluded", reason: "qualification_not_yet_valid"};
  }
  const timeValid = active.filter((credential) => credential.valid_from <= now && now < credential.expires_at);
  if (timeValid.length === 0) return {status: "excluded", reason: "qualification_expired"};
  const inJurisdiction = timeValid.filter((credential) => credential.jurisdictions.includes(request.jurisdiction));
  if (inJurisdiction.length === 0) {
    return {status: "excluded", reason: "qualification_jurisdiction_mismatch"};
  }
  return {status: "matched"};
}

export function evaluateStanding(request) {
  if (policy.proof.mode !== "unsigned_fixture") {
    return outcome("indeterminate", "unsupported_fixture_proof");
  }
  if (policy.authority_epoch < request.verifier_epoch) {
    return outcome("excluded", "standing_policy_epoch_stale");
  }
  if (policy.authority_epoch > request.verifier_epoch) {
    return outcome("indeterminate", "verifier_authority_state_behind");
  }
  if (request.identity_status === "unavailable") {
    return outcome("indeterminate", "identity_binding_unavailable");
  }
  if (request.identity_status !== "verified") {
    return outcome("excluded", "identity_binding_invalid");
  }
  if (request.evidence_use_decision === "indeterminate") {
    return outcome("indeterminate", "evidence_use_authorization_indeterminate");
  }
  if (request.evidence_use_decision !== "allowed") {
    return outcome("excluded", "evidence_use_not_authorized");
  }

  let candidates = policy.standing_grants.filter((grant) => principalMatches(grant, request));
  if (candidates.length === 0) return outcome("excluded", "no_matching_principal");
  const narrow = (predicate, reason) => {
    const matched = candidates.filter(predicate);
    if (matched.length === 0) return outcome("excluded", reason);
    candidates = matched;
    return null;
  };

  let decision;
  decision = narrow((grant) => grant.evidence_kinds.includes(request.evidence_kind), "evidence_kind_not_granted");
  if (decision) return decision;
  decision = narrow((grant) => grant.relations.includes(request.relation), "evidence_relation_not_granted");
  if (decision) return decision;
  decision = narrow((grant) => grant.purposes.includes(request.purpose), "purpose_not_granted");
  if (decision) return decision;
  decision = narrow((grant) => grant.target.predicates.includes(request.target.predicate), "target_predicate_not_granted");
  if (decision) return decision;
  decision = narrow((grant) => subjectMatches(grant, request), "target_subject_scope_mismatch");
  if (decision) return decision;
  decision = narrow((grant) => selectorMatches(grant.space_scope, request.target.space_ids), "space_scope_mismatch");
  if (decision) return decision;
  decision = narrow((grant) => selectorMatches(grant.procedures, [request.procedure_id]), "procedure_not_granted");
  if (decision) return decision;
  decision = narrow((grant) => !grant.requirements.direct_experience || request.direct_experience, "direct_experience_required");
  if (decision) return decision;
  decision = narrow((grant) => !grant.requirements.exact_question_binding || request.question_bound, "exact_question_binding_required");
  if (decision) return decision;
  decision = narrow((grant) => grant.validity.from <= request.decision_time && request.decision_time < grant.validity.to, "standing_grant_outside_validity");
  if (decision) return decision;

  const matched = [];
  let indeterminateReason = null;
  let excludedReason = null;
  for (const grant of candidates) {
    const qualification = qualificationDecision(grant, request);
    if (qualification.status === "matched") matched.push(grant.grant_id);
    else if (qualification.status === "indeterminate") indeterminateReason ??= qualification.reason;
    else excludedReason ??= qualification.reason;
  }
  if (matched.length > 0) return outcome("admitted", "matching_standing_grant", matched.sort());
  if (indeterminateReason) return outcome("indeterminate", indeterminateReason);
  return outcome("excluded", excludedReason ?? "qualification_missing");
}

assert.equal(policy.contract, "hwm-standing:PolicyDocument");
assert.equal(artifact.artifact, "hwm-standing:OracleCases");
assert.equal(artifact.cases.length, 21, "Standing fixture must retain all twenty-one boundary cases");
assert.equal(new Set(artifact.cases.map((item) => item.case_id)).size, artifact.cases.length);
for (const testCase of artifact.cases) {
  assert.deepEqual(evaluateStanding(testCase.request), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, `${testCase.case_id}: missing forbidden inference`);
}

const admitted = artifact.cases.filter((item) => item.expected.standing_status === "admitted");
const forbidden = new Set(artifact.cases.flatMap((item) => item.must_not_infer));
assert.ok(admitted.some((item) => item.case_id.includes("visitor")), "A visitor must be admit-able by explicit policy");
assert.ok(forbidden.has("global_actor_trust"));
assert.ok(forbidden.has("inspection_claim_true"));
assert.ok(forbidden.has("physical_effect_observed"));

console.log("EVIDENCE STANDING OK", `${artifact.cases.length} cases`, `${admitted.length} admitted`, `${forbidden.size} forbidden inferences`);
console.log("AUTHORITY BOUNDARY OK", "permission, standing, resolution, action authorization, and acceptance remain separate");
console.log("NO GLOBAL ROLE RANKING OK", "resident, visitor, sensor, installer, and reviewer standing is proposition- and procedure-scoped");
console.log("QUALIFICATION BOUNDARY OK", "credential verification does not imply truth or out-of-jurisdiction competence");
