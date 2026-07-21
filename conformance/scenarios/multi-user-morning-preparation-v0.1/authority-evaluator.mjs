import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fixtureDir = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureDir, name), "utf8"));

const authority = read("authority-profile.json");
const claims = new Map(read("claims.json").map((envelope) => [envelope.claim.claim_id, envelope.claim]));
const cases = read("authority-oracle.json");
const policies = new Map(authority.policies.map((policy) => [policy.policy_id, policy]));

assert.ok(authority.trust_root_binding.lineage_id);
assert.ok(authority.trust_root_binding.root_id);
assert.ok(authority.trust_root_binding.root_version >= 1);
assert.ok(authority.authority_epoch >= authority.trust_root_binding.authority_epoch_floor);
assert.ok(authority.leases.every((lease) => lease.proof_of_possession?.value));

function selectorMatches(selector, requestTarget) {
  if (selector.selector_type === "all") return true;
  return selector.selector_type === requestTarget.selector_type && selector.values.includes(requestTarget.value);
}

function ruleMatches(rule, request) {
  return rule.assignees.includes(request.subject)
    && rule.action === request.action
    && rule.targets.every((selector) => selectorMatches(selector, request.target));
}

function evaluateConstraint(constraint, request, leaseActive) {
  let left;
  switch (constraint.left_operand) {
    case "purpose":
      left = request.purpose;
      break;
    case "authority_epoch":
      left = request.verifier_epoch;
      break;
    case "audience":
      left = request.audience;
      break;
    case "lease_status":
      left = leaseActive ? "active" : "expired";
      break;
    case "applicability_status":
      left = request.constraint_inputs?.applicability_status;
      break;
    case "resource_observation": {
      const observed = request.constraint_inputs?.resource_observation;
      if (observed === undefined) return "unknown";
      const constraintClaim = claims.get(constraint.right_operand.claim_id);
      if (!constraintClaim) return "unknown";
      const maximum = constraintClaim.proposition.object.maximum;
      if (observed.unit !== maximum.unit) return false;
      return observed.value <= maximum.value;
    }
    default:
      return "unknown";
  }
  if (left === undefined) return "unknown";
  switch (constraint.operator) {
    case "eq": return left === constraint.right_operand;
    case "neq": return left !== constraint.right_operand;
    case "in": return Array.isArray(constraint.right_operand) && constraint.right_operand.includes(left);
    default: return "unknown";
  }
}

function dutyTriggered(duty, request) {
  if (duty.condition.condition_type !== "applicability_conflict") return "unknown";
  const applicability = request.constraint_inputs?.applicability_status;
  if (applicability === undefined) return "unknown";
  return applicability === "conflicting";
}

function dutySatisfied(duty, confirmations) {
  const confirmed = new Set(confirmations);
  const count = duty.assignees.filter((subject) => confirmed.has(subject)).length;
  if (duty.threshold.mode === "all") return count === duty.assignees.length;
  if (duty.threshold.mode === "any") return count >= 1;
  return count >= duty.threshold.count;
}

function evaluate(request) {
  if (authority.proof.mode !== "unsigned_fixture") {
    return {decision: "indeterminate", reason_code: "unsupported_fixture_proof"};
  }

  const lease = authority.leases.find((item) =>
    item.subject === request.subject && item.audiences.includes(request.audience));
  if (!lease) return {decision: "denied", reason_code: "no_subject_audience_lease"};

  const now = new Date(request.decision_time);
  const notBefore = new Date(lease.not_before);
  const expiresAt = new Date(lease.expires_at);
  if (now < notBefore) return {decision: "denied", reason_code: "lease_not_yet_valid"};
  if (now >= expiresAt) return {decision: "denied", reason_code: "lease_expired"};

  if (lease.authority_epoch < request.verifier_epoch) {
    return {decision: "denied", reason_code: "lease_epoch_stale"};
  }
  if (lease.authority_epoch > request.verifier_epoch) {
    return {decision: "indeterminate", reason_code: "verifier_authority_state_behind"};
  }

  const activePolicies = lease.policy_ids.map((id) => policies.get(id)).filter(Boolean);
  const leaseActive = true;

  for (const policy of activePolicies) {
    for (const rule of policy.prohibitions) {
      if (!ruleMatches(rule, request)) continue;
      const outcomes = rule.constraints.map((constraint) => evaluateConstraint(constraint, request, leaseActive));
      if (outcomes.includes("unknown")) return {decision: "indeterminate", reason_code: "constraint_input_unknown"};
      if (outcomes.every(Boolean)) return {decision: "denied", reason_code: "matching_prohibition"};
    }
  }

  const matchingPermissions = [];
  for (const policy of activePolicies) {
    for (const rule of policy.permissions) {
      if (!ruleMatches(rule, request)) continue;
      const outcomes = rule.constraints.map((constraint) => evaluateConstraint(constraint, request, leaseActive));
      if (outcomes.includes("unknown")) return {decision: "indeterminate", reason_code: "constraint_input_unknown"};
      if (outcomes.every(Boolean)) matchingPermissions.push({policy, rule});
    }
  }
  if (matchingPermissions.length === 0) return {decision: "denied", reason_code: "no_matching_permission"};

  for (const {rule} of matchingPermissions) {
    for (const duty of rule.duties) {
      const triggered = dutyTriggered(duty, request);
      if (triggered === "unknown") return {decision: "indeterminate", reason_code: "duty_condition_unknown"};
      if (triggered && !dutySatisfied(duty, request.confirmations)) {
        return {decision: "confirmation_required", reason_code: "unsatisfied_confirmation_duty"};
      }
    }
  }

  if (request.local_safety_status === "denied") {
    return {decision: "denied", reason_code: "local_safety_denied"};
  }

  const hadDuty = matchingPermissions.some(({rule}) => rule.duties.length > 0);
  if (hadDuty) return {decision: "allowed", reason_code: "matching_permission_duties_satisfied"};
  if (request.authority_online === false) {
    return {decision: "allowed", reason_code: "matching_permission_offline_lease"};
  }
  return {decision: "allowed", reason_code: "matching_permission"};
}

for (const testCase of cases) {
  const actual = evaluate(testCase.request);
  assert.deepEqual(actual, testCase.expected, `${testCase.case_id}: Authority decision mismatch`);
  console.log("AUTHORITY OK", testCase.case_id, actual.decision, actual.reason_code);
}

const pumpRecord = read("records.json").find((item) => item.record_id === "urn:hwm:record:pump-authorization");
const hvacRecord = read("records.json").find((item) => item.record_id === "urn:hwm:record:hvac-authorization");
assert.equal(pumpRecord.payload.lease_id, authority.leases[0].lease_id);
assert.equal(hvacRecord.payload.lease_id, authority.leases[0].lease_id);
assert.equal(pumpRecord.payload.decision, "allowed");
assert.equal(hvacRecord.payload.decision, "confirmation_required");

console.log(
  "AUTHORITY PROFILE OK",
  `${cases.length} decisions, epoch ${authority.authority_epoch}, lease expires ${authority.leases[0].expires_at}`,
);
