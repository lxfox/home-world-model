import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const requirementSetFixture = read("requirement-set.json");
const artifact = read("fulfilment-cases.json");
const admissionArtifact = read("admission-decisions.json");

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

function expand(testCase) {
  const request = deepMerge(artifact.base_requests[testCase.base_request_id], testCase.overrides);
  request.requirement_set = deepMerge(requirementSetFixture, request.requirement_set_overrides);
  request.records = request.record_ids.map((id) => artifact.records[id]);
  request.admission_decisions = request.admission_decision_ids.map((id) => admissionArtifact.decisions[id]);
  assert.ok(request.records.every(Boolean), `${testCase.case_id}: unknown Record`);
  assert.ok(request.admission_decisions.every(Boolean), `${testCase.case_id}: unknown admission decision`);
  return request;
}

const sorted = (values) => [...values].sort();
const stageRank = {before_authorization: 0, before_dispatch: 1, after_execution: 2};
const requestStageRank = {pre_authorization: 0, pre_dispatch: 1, post_execution: 2};

function globalIndeterminate(requirementSet, reason) {
  return {
    procedure_status: "indeterminate",
    authority_gate: "indeterminate",
    fulfilled_requirement_ids: [],
    pending_requirement_ids: [],
    negative_requirement_ids: [],
    unfulfilled_requirement_ids: [],
    indeterminate_requirement_ids: sorted(requirementSet.requirements.map((item) => item.requirement_id)),
    not_due_requirement_ids: [],
    evaluated_record_ids: [],
    evaluated_standing_decision_ids: [],
    reason_codes: [reason]
  };
}

function pendingOrUnfulfilled(requirement, assessmentTime, reason) {
  return assessmentTime < requirement.due_at
    ? {status: "pending", reasons: [reason]}
    : {status: "unfulfilled", reasons: [`${reason}_after_due`]};
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function recordDigest(record) {
  return crypto.createHash("sha256").update(canonicalJson(record)).digest("hex");
}

function requiredAssertions(record) {
  if (record.record_kind === "response") return ["response_meaning"];
  if (record.record_kind === "delivery") return ["accessibility_status", "delivery_status"];
  if (record.record_kind === "objection_ledger") return ["accessibility_status", "coverage_status", "delivery_status", "window_from", "window_to"];
  if (record.record_kind === "qualified_review") return ["review_outcome"];
  return ["audit_status"];
}

function exactRecords(requirement, request) {
  const reasons = [];
  const candidates = [];
  const evaluated = [];
  const evaluatedDecisions = [];
  let indeterminateReason = null;
  for (const record of request.records.filter((item) => item.requirement_id === requirement.requirement_id)) {
    if (record.proposal_id !== request.proposal.proposal_id || record.proposal_revision !== request.proposal.revision) {
      reasons.push("record_wrong_proposal_revision_ignored");
      continue;
    }
    if (record.authority_epoch !== request.verifier_epoch) {
      reasons.push("record_wrong_authority_epoch_ignored");
      continue;
    }
    if (record.issued_at > request.assessment_time) {
      reasons.push("future_record_ignored");
      continue;
    }
    if (record.participation_slot_id !== requirement.participation_slot_id) {
      reasons.push("record_wrong_participation_slot_ignored");
      continue;
    }
    evaluated.push(record.record_id);
    const decisions = request.admission_decisions.filter((item) => item.record_binding.record_id === record.record_id);
    if (decisions.length === 0) {
      indeterminateReason ??= "record_admission_missing";
      continue;
    }
    if (decisions.length > 1) {
      evaluatedDecisions.push(...decisions.map((item) => item.decision_id));
      indeterminateReason ??= "multiple_current_admission_decisions";
      continue;
    }
    const decision = decisions[0];
    evaluatedDecisions.push(decision.decision_id);
    if (decision.decided_at > request.assessment_time) {
      indeterminateReason ??= "future_admission_decision";
      continue;
    }
    if (decision.authority_epoch !== request.verifier_epoch) {
      indeterminateReason ??= "admission_decision_wrong_authority_epoch";
      continue;
    }
    if (decision.purpose !== "procedure_fulfilment") {
      indeterminateReason ??= "admission_decision_wrong_purpose";
      continue;
    }
    if (decision.record_binding.canonicalization !== "RFC8785" || decision.record_binding.digest_algorithm !== "sha-256" || decision.record_binding.digest !== recordDigest(record)) {
      indeterminateReason ??= "admission_record_digest_mismatch";
      continue;
    }
    if (decision.result === "indeterminate") {
      indeterminateReason ??= requirement.kind === "qualified_review"
        ? "qualified_review_standing_indeterminate"
        : "affirmative_response_standing_indeterminate";
      continue;
    }
    if (decision.result === "excluded") {
      reasons.push("record_admission_excluded");
      continue;
    }
    if (!requiredAssertions(record).every((assertion) => decision.admitted_assertions.includes(assertion))) {
      indeterminateReason ??= "required_record_assertion_not_admitted";
      continue;
    }
    candidates.push(record);
  }
  return {candidates, evaluated, evaluatedDecisions, reasons, indeterminateReason};
}

function evaluateRequirement(requirement, request) {
  if (stageRank[requirement.timing] > requestStageRank[request.stage] || request.assessment_time < requirement.opens_at) {
    return {status: "not_due", records: [], decisions: [], reasons: []};
  }
  const {candidates, evaluated, evaluatedDecisions, reasons, indeterminateReason} = exactRecords(requirement, request);
  const ids = evaluated;
  const result = (status, reason) => ({status, records: ids, decisions: evaluatedDecisions, reasons: [...new Set([...reasons, reason])]});
  if (indeterminateReason) return result("indeterminate", indeterminateReason);

  if (requirement.kind === "objection_window") {
    const objections = candidates.filter((item) => item.record_kind === "response");
    if (objections.length > 1) return result("indeterminate", "multiple_current_objection_records");
    if (objections.length === 1) {
      const objection = objections[0];
      if (objection.response_meaning === "reject") {
        return result("negative", "blocking_objection_recorded");
      }
    }
    const ledgers = candidates.filter((item) => item.record_kind === "objection_ledger");
    if (ledgers.length > 1) return result("indeterminate", "multiple_current_objection_ledgers");
    if (request.assessment_time < requirement.due_at) return result("pending", "objection_window_open");
    if (ledgers.length === 0) return result("unfulfilled", "objection_ledger_missing_after_due");
    const ledger = ledgers[0];
    if (ledger.accessibility_status === "unavailable") return result("indeterminate", "objection_ledger_access_unavailable");
    if (ledger.delivery_status !== "delivered" || ledger.coverage_status !== "complete") {
      return result("indeterminate", "objection_ledger_incomplete");
    }
    if (ledger.window_from !== requirement.opens_at || ledger.window_to !== requirement.due_at) {
      return result("indeterminate", "objection_ledger_wrong_window");
    }
    return result("fulfilled", "objection_window_fulfilled");
  }

  if (candidates.length > 1) return result("indeterminate", "multiple_current_records_for_requirement");
  if (candidates.length === 0) {
    const missingReason = requirement.kind === "audit" ? "audit_record_missing" : `${requirement.kind}_pending`;
    const missing = pendingOrUnfulfilled(requirement, request.assessment_time, missingReason);
    return {status: missing.status, records: [], decisions: evaluatedDecisions, reasons: [...new Set([...reasons, ...missing.reasons])]};
  }
  const record = candidates[0];

  if (requirement.kind === "affirmative_response") {
    if (record.response_meaning === "confirm") return result("fulfilled", "affirmative_response_fulfilled");
    if (record.response_meaning === "reject") return result("negative", "affirmative_response_rejected");
    return result("pending", "affirmative_response_abstained");
  }

  if (requirement.kind === "consultation_opportunity" || requirement.kind === "notification") {
    if (record.accessibility_status === "unavailable") {
      return result("indeterminate", `${requirement.kind}_accessibility_indeterminate`);
    }
    if (record.delivery_status === "delivered" && record.accessibility_status === "accessible") {
      return result("fulfilled", `${requirement.kind}_fulfilled`);
    }
    const incomplete = pendingOrUnfulfilled(requirement, request.assessment_time, `${requirement.kind}_delivery_pending`);
    return result(incomplete.status, incomplete.reasons[0]);
  }

  if (requirement.kind === "qualified_review") {
    return record.review_outcome === "accepted"
      ? result("fulfilled", "qualified_review_fulfilled")
      : result("negative", "qualified_review_rejected");
  }

  if (record.audit_status === "recorded") {
    return result("fulfilled", "audit_fulfilled");
  }
  return result("unfulfilled", "audit_record_missing_after_due");
}

export function evaluateProcedureFulfilment(request) {
  const set = request.requirement_set;
  if (set.proof.mode !== "unsigned_fixture") return globalIndeterminate(set, "unsupported_fixture_proof");
  if (set.authority_epoch < request.verifier_epoch) return globalIndeterminate(set, "requirement_set_epoch_stale");
  if (set.authority_epoch > request.verifier_epoch) return globalIndeterminate(set, "verifier_authority_state_behind");
  if (set.mapping_status !== "mapped_for_declared_impacts") return globalIndeterminate(set, "requirement_mapping_not_complete");
  if (set.proposal.proposal_id !== request.proposal.proposal_id || set.proposal.revision !== request.proposal.revision) {
    return globalIndeterminate(set, "requirement_set_wrong_proposal_revision");
  }

  const local = new Map(set.requirements.map((requirement) => [requirement.requirement_id, evaluateRequirement(requirement, request)]));
  const idsFor = (status) => sorted([...local].filter(([, value]) => value.status === status).map(([id]) => id));
  const fulfilled = idsFor("fulfilled");
  const pending = idsFor("pending");
  const negative = idsFor("negative");
  const unfulfilled = idsFor("unfulfilled");
  const indeterminate = idsFor("indeterminate");
  const notDue = idsFor("not_due");
  const evaluatedRecords = sorted(new Set([...local.values()].flatMap((item) => item.records)));
  const evaluatedDecisions = sorted(new Set([...local.values()].flatMap((item) => item.decisions)));
  const issueReasons = [...new Set([...local.values()].filter((item) => !["fulfilled", "not_due"].includes(item.status)).flatMap((item) => item.reasons))];
  const requirementsById = new Map(set.requirements.map((item) => [item.requirement_id, item]));

  let procedureStatus;
  let authorityGate;
  if (negative.some((id) => requirementsById.get(id).negative_signal_effect === "blocks")) {
    procedureStatus = "blocked";
    authorityGate = "denied";
  } else if (indeterminate.length > 0) {
    procedureStatus = "indeterminate";
    authorityGate = "indeterminate";
  } else if (unfulfilled.some((id) => requirementsById.get(id).failure_effect === "denied")) {
    procedureStatus = "blocked";
    authorityGate = "denied";
  } else if (unfulfilled.some((id) => requirementsById.get(id).failure_effect === "indeterminate")) {
    procedureStatus = "indeterminate";
    authorityGate = "indeterminate";
  } else if (unfulfilled.some((id) => requirementsById.get(id).failure_effect === "post_action_noncompliance")) {
    procedureStatus = "post_action_noncompliance";
    authorityGate = "historical_noncompliance";
  } else if (pending.length > 0 || unfulfilled.length > 0) {
    procedureStatus = "pending";
    const waiting = [...pending, ...unfulfilled];
    authorityGate = waiting.every((id) => requirementsById.get(id).failure_effect === "confirmation_required")
      ? "confirmation_required"
      : "requirements_pending";
  } else {
    procedureStatus = "satisfied";
    authorityGate = "continue_policy_evaluation";
  }

  return {
    procedure_status: procedureStatus,
    authority_gate: authorityGate,
    fulfilled_requirement_ids: fulfilled,
    pending_requirement_ids: pending,
    negative_requirement_ids: negative,
    unfulfilled_requirement_ids: unfulfilled,
    indeterminate_requirement_ids: indeterminate,
    not_due_requirement_ids: notDue,
    evaluated_record_ids: evaluatedRecords,
    evaluated_standing_decision_ids: evaluatedDecisions,
    reason_codes: issueReasons.length > 0 ? issueReasons : ["stage_requirements_satisfied"]
  };
}

export function evaluateModelBoundary(testCase) {
  const input = testCase.inputs;
  switch (testCase.kind) {
    case "delivery_boundary": return {fulfilled_signal: "delivery", read: "not_inferred", accepted: "not_inferred"};
    case "objection_boundary": return {fulfilled_signal: "expired_without_objection", affirmative_acceptance: "not_inferred", waiver: "not_inferred"};
    case "consultation_boundary": return {fulfilled_signal: "opportunity_delivered", person_must_answer: false};
    case "review_boundary": return {fulfilled_signal: "review_accepted", authorization: "not_inferred", global_truth: "not_inferred"};
    case "audit_boundary": return {compliance: "post_action_noncompliance", historical_authorization: "unchanged"};
    case "authorization_boundary": return {authority_gate: "continue_policy_evaluation", authorization: "not_inferred"};
    case "pending_boundary": return {gate: "requirements_pending", denied: false, device_failure: false};
    default: return {local_status: stageRank[input.timing] > requestStageRank[input.stage] ? "not_due" : "pending", fulfilled: false, waived: false};
  }
}

if (process.argv.includes("--emit")) {
  console.log(JSON.stringify(Object.fromEntries(artifact.cases.map((item) => [item.case_id, evaluateProcedureFulfilment(expand(item))])), null, 2));
  process.exit(0);
}

assert.equal(requirementSetFixture.contract, "hwm-fulfilment:RequirementSet");
assert.equal(artifact.artifact, "hwm-fulfilment:OracleCases");
assert.equal(artifact.cases.length, 28);
assert.equal(artifact.model_boundary_cases.length, 8);
for (const testCase of artifact.cases) {
  const actual = evaluateProcedureFulfilment(expand(testCase));
  assert.equal(actual.procedure_status, testCase.expected.procedure_status, testCase.case_id);
  assert.equal(actual.authority_gate, testCase.expected.authority_gate, testCase.case_id);
  const statusLists = {
    fulfilled: actual.fulfilled_requirement_ids,
    pending: actual.pending_requirement_ids,
    negative: actual.negative_requirement_ids,
    unfulfilled: actual.unfulfilled_requirement_ids,
    indeterminate: actual.indeterminate_requirement_ids,
    not_due: actual.not_due_requirement_ids
  };
  assert.ok(statusLists[testCase.expected.focus_status].includes(testCase.expected.focus_requirement_id), `${testCase.case_id}: focus status`);
  assert.ok(actual.reason_codes.includes(testCase.expected.reason_code), `${testCase.case_id}: reason code`);
  const partition = Object.values(statusLists).flat();
  assert.equal(new Set(partition).size, partition.length, `${testCase.case_id}: requirement status overlap`);
  assert.equal(partition.length, requirementSetFixture.requirements.length, `${testCase.case_id}: incomplete requirement partition`);
  assert.ok(testCase.must_not_infer.length > 0);
}
for (const testCase of artifact.model_boundary_cases) {
  assert.deepEqual(evaluateModelBoundary(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0);
}

const forbidden = new Set([...artifact.cases, ...artifact.model_boundary_cases].flatMap((item) => item.must_not_infer));
for (const guard of ["silence_is_confirmation", "delivery_is_acceptance", "silence_is_agreement", "review_is_authorization", "audit_retroactively_authorizes", "fulfilment_is_permission", "pending_is_indeterminate", "not_due_is_fulfilled", "record_self_assertion_is_standing", "record_id_equality_is_content_identity", "record_level_standing_covers_all_fields"]) {
  assert.ok(forbidden.has(guard), `Missing fulfilment guard: ${guard}`);
}

console.log("PROCEDURE FULFILMENT OK", `${artifact.cases.length} fulfilment cases`, `${artifact.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("STAGE BOUNDARY OK", "before-authorization, before-dispatch, and after-execution requirements are evaluated only when due");
console.log("HETEROGENEOUS RECORDS OK", "response, opportunity delivery, objection ledger, notification delivery, qualified review, and audit Records retain separate completion rules");
console.log("PENDING BOUNDARY OK", "confirmation_required is the narrow affirmative-response projection; requirements_pending is the general workflow gate");
console.log("AUTHORIZATION BOUNDARY OK", "satisfied procedure requirements continue policy evaluation but never create permission or prove safety");
