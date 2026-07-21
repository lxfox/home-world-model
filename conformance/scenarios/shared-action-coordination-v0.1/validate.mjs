import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const policy = read("coordination-policy.json");
const artifact = read("coordination-cases.json");
const external = read("coordination.external.jsonld");

function deepMerge(base, override) {
  if (Array.isArray(override)) return structuredClone(override);
  if (!override || typeof override !== "object") return override;
  const result = structuredClone(base ?? {});
  for (const [key, value] of Object.entries(override)) {
    result[key] = value && typeof value === "object" && !Array.isArray(value)
      ? deepMerge(result[key], value)
      : structuredClone(value);
  }
  return result;
}

function expandRequest(testCase) {
  const request = deepMerge(artifact.base_requests[testCase.base_request_id], testCase.overrides);
  request.responses = request.response_record_ids.map((id) => artifact.response_records[id]);
  request.delegations = request.delegation_ids.map((id) => artifact.delegations[id]);
  assert.ok(request.responses.every(Boolean), `${testCase.case_id}: unknown response fixture id`);
  assert.ok(request.delegations.every(Boolean), `${testCase.case_id}: unknown delegation fixture id`);
  return request;
}

function scopeMatches(selector, values) {
  return selector.mode === "all" || values.some((value) => selector.values.includes(value));
}

function ruleMatches(rule, request) {
  const proposal = request.proposal;
  const emergencyMatches = rule.emergency_requirement === "verified"
    ? proposal.emergency_status === "verified"
    : proposal.emergency_status === "none";
  return rule.action_types.includes(proposal.action_type)
    && rule.purposes.includes(proposal.purpose)
    && proposal.effect_domains.every((domain) => rule.effect_domains.includes(domain))
    && scopeMatches(rule.space_scope, proposal.space_ids)
    && rule.risk_levels.includes(proposal.risk_level)
    && emergencyMatches
    && rule.validity.from <= request.decision_time
    && request.decision_time < rule.validity.to;
}

function delegationMatches(response, rule, request) {
  if (!rule.delegation.allowed) return false;
  if (!response.actor_role_ids.some((role) => rule.delegation.delegate_role_ids.includes(role))) return false;
  return request.delegations.some((delegation) =>
    delegation.principal_subject_id === response.represented_subject_id
    && delegation.delegate_actor_id === response.actor_id
    && delegation.delegate_role_ids.some((role) => rule.delegation.delegate_role_ids.includes(role))
    && delegation.action_types.includes(request.proposal.action_type)
    && request.proposal.space_ids.some((space) => delegation.space_ids.includes(space))
    && delegation.not_before <= request.decision_time
    && request.decision_time < delegation.expires_at
    && delegation.authority_decision === "allowed");
}

function gateFor(status, safetyStatus) {
  let gate = {
    not_required: "continue_policy_evaluation",
    pending: "confirmation_required",
    satisfied: "continue_policy_evaluation",
    rejected: "denied",
    indeterminate: "indeterminate"
  }[status];
  let safetyReason = null;
  if (safetyStatus === "denied") {
    gate = "denied";
    safetyReason = "local_safety_denied";
  } else if (safetyStatus === "indeterminate") {
    gate = "indeterminate";
    safetyReason = "local_safety_indeterminate";
  }
  return {gate, safetyReason};
}

const unique = (values) => [...new Set(values)];

export function evaluateCoordination(request) {
  const simple = (status, reason, matchedRules = [], counted = [], duties = []) => ({
    coordination_status: status,
    authorization_gate: gateFor(status, request.local_safety_status).gate,
    matched_rule_ids: matchedRules.map((rule) => rule.rule_id).sort(),
    counted_response_record_ids: counted.map((response) => response.record_id).sort(),
    required_duty_ids: [...duties].sort(),
    reason_codes: [reason, gateFor(status, request.local_safety_status).safetyReason].filter(Boolean)
  });

  if (policy.proof.mode !== "unsigned_fixture") return simple("indeterminate", "unsupported_fixture_proof");
  if (policy.authority_epoch < request.verifier_epoch) return simple("indeterminate", "coordination_policy_epoch_stale");
  if (policy.authority_epoch > request.verifier_epoch) return simple("indeterminate", "verifier_authority_state_behind");

  const matchedRules = policy.coordination_rules.filter((rule) => ruleMatches(rule, request));
  if (matchedRules.length === 0) return simple("indeterminate", "no_applicable_coordination_rule");
  if (matchedRules.length > 1) return simple("indeterminate", "multiple_applicable_coordination_rules", matchedRules);
  const rule = matchedRules[0];
  if (rule.response_rule.mode === "none") {
    return simple("not_required", "coordination_not_required", [rule], [], rule.post_action_duties);
  }

  if (request.affected_subjects.status !== "complete") {
    const reason = request.affected_subjects.status === "contested"
      ? "affected_subject_set_contested"
      : "affected_subject_set_unavailable";
    return simple("indeterminate", reason, [rule]);
  }
  const affected = new Set(request.affected_subjects.subject_ids);
  if (affected.size === 0) return simple("indeterminate", "affected_subject_set_empty", [rule]);

  const ignored = [];
  const counted = [];
  for (const response of request.responses) {
    if (!response.authorized) {
      ignored.push("unauthorized_response_ignored");
      continue;
    }
    if (response.standing_status === "indeterminate") {
      return simple("indeterminate", "response_standing_indeterminate", [rule], counted);
    }
    if (response.standing_status !== "admitted") {
      ignored.push("response_standing_not_admitted");
      continue;
    }
    if (response.proposal_id !== request.proposal.proposal_id || response.proposal_revision !== request.proposal.revision) {
      ignored.push("response_wrong_revision_ignored");
      continue;
    }
    const ageSeconds = (Date.parse(request.decision_time) - Date.parse(response.issued_at)) / 1000;
    if (ageSeconds < 0 || ageSeconds > rule.response_rule.validity_seconds) {
      ignored.push("stale_response_ignored");
      continue;
    }
    if (!affected.has(response.represented_subject_id)) {
      ignored.push("unaffected_subject_response_ignored");
      continue;
    }
    if (response.actor_id !== response.represented_subject_id && !delegationMatches(response, rule, request)) {
      ignored.push("unauthorized_representation_ignored");
      continue;
    }
    counted.push(response);
  }

  const bySubject = new Map();
  for (const response of counted) {
    if (bySubject.has(response.represented_subject_id)) {
      return simple("indeterminate", "multiple_current_responses_for_subject", [rule], counted);
    }
    bySubject.set(response.represented_subject_id, response);
  }
  const responses = [...bySubject.values()];
  if (rule.response_rule.rejection_effect === "blocks" && responses.some((response) => response.meaning === "reject")) {
    const result = simple("rejected", "blocking_rejection", [rule], responses);
    result.reason_codes = [...unique(ignored), ...result.reason_codes];
    return result;
  }
  const confirmations = responses.filter((response) => response.meaning === "confirm");
  let satisfied;
  if (rule.response_rule.mode === "all") {
    satisfied = [...affected].every((subject) => bySubject.get(subject)?.meaning === "confirm");
  } else if (rule.response_rule.mode === "any") {
    satisfied = confirmations.length >= 1;
  } else {
    satisfied = confirmations.length >= rule.response_rule.count;
  }
  const result = simple(
    satisfied ? "satisfied" : "pending",
    satisfied ? "response_rule_satisfied" : "required_responses_missing",
    [rule],
    responses,
    rule.post_action_duties
  );
  result.reason_codes = [...unique(ignored), ...result.reason_codes];
  return result;
}

export function evaluateModelBoundary(testCase) {
  if (testCase.kind === "descriptive_conflict") {
    const keys = new Set(testCase.inputs.map((item) => `${item.subject_id}|${item.predicate}`));
    const objects = new Set(testCase.inputs.map((item) => JSON.stringify(item.object)));
    assert.equal(keys.size, 1);
    assert.ok(objects.size > 1);
    return {epistemic_status: "contested", applicability_status: "not_applicable", synthetic_household_preference: false, coordination_required: false};
  }
  if (testCase.kind === "personal_preference_plurality") {
    assert.ok(new Set(testCase.inputs.map((item) => item.subject_id)).size > 1);
    return {epistemic_status: "accepted", applicability_status: "conflicting", synthetic_household_preference: false, coordination_required: true};
  }
  return {epistemic_status: "not_applicable", applicability_status: "candidate_only", synthetic_household_preference: false, coordination_required: true};
}

assert.equal(policy.contract, "hwm-coordination:PolicyDocument");
assert.equal(artifact.artifact, "hwm-coordination:OracleCases");
assert.equal(artifact.coordination_cases.length, 24);
assert.equal(artifact.model_boundary_cases.length, 3);
for (const testCase of artifact.coordination_cases) {
  assert.deepEqual(evaluateCoordination(expandRequest(testCase)), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0);
}
for (const testCase of artifact.model_boundary_cases) {
  assert.deepEqual(evaluateModelBoundary(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0);
}

const externalGraph = new Map(external["@graph"].map((item) => [item["@id"], item]));
assert.ok(externalGraph.get("urn:hwm:proposal:shared-bedroom-hvac-1")["@type"].includes("prov:Plan"));
assert.equal(externalGraph.get("urn:hwm:question:coordinate-hvac-1")["@type"], "as:Question");
assert.equal(externalGraph.get("urn:hwm:response:a-confirm")["@type"], "as:Accept");
assert.equal(externalGraph.get("urn:hwm:response:a-confirm")["as:target"]["@id"], "urn:hwm:proposal:shared-bedroom-hvac-1");
assert.equal(externalGraph.get("urn:hwm:delegation:b-to-c")["@type"], "prov:Delegation");
assert.equal(externalGraph.get("urn:hwm:assessment:coordinate-hvac-1")["prov:wasGeneratedBy"]["@id"], "urn:hwm:activity:coordinate-hvac-1");
assert.ok(!JSON.stringify(external).includes("hwm-coordination:"));

const forbidden = new Set([
  ...artifact.coordination_cases.flatMap((item) => item.must_not_infer),
  ...artifact.model_boundary_cases.flatMap((item) => item.must_not_infer)
]);
for (const guard of ["majority_location", "average_is_household_preference", "consent", "action_authorized", "safety_overridden", "agent_self_elevated"]) {
  assert.ok(forbidden.has(guard), `Missing coordination guard: ${guard}`);
}

console.log("SHARED ACTION COORDINATION OK", `${artifact.coordination_cases.length} coordination cases`, `${artifact.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("NO HOUSEHOLD TRUTH VOTE OK", "descriptive conflict remains epistemic and personal preferences remain subject-scoped");
console.log("PROPOSAL BINDING OK", "responses, validity, delegation, and revision are evaluated against one exact Proposal");
console.log("AUTHORIZATION BOUNDARY OK", "coordination satisfaction continues policy evaluation but never authorizes dispatch");
console.log("EXTERNAL COORDINATION PROJECTION OK", "PROV, ActivityStreams, Schema.org, and DCMI preserve interaction history without HWM coordination predicates");
