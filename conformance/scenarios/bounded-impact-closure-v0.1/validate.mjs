import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const policy = read("coverage-policy.json");
const artifact = read("impact-cases.json");
const external = read("impact.external.jsonld");

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
  request.reports = request.report_record_ids.map((id) => artifact.report_records[id]);
  assert.ok(request.reports.every(Boolean), `${testCase.case_id}: unknown report fixture id`);
  return request;
}

const unique = (values) => [...new Set(values)];
const sorted = (values) => [...values].sort();

function ruleMatches(rule, request) {
  const proposal = request.proposal;
  const scopeMatches = rule.space_scope.mode === "all"
    || proposal.space_ids.some((space) => rule.space_scope.values.includes(space));
  return rule.action_types.includes(proposal.action_type)
    && rule.purposes.includes(proposal.purpose)
    && proposal.effect_domains.every((domain) => rule.effect_domains.includes(domain))
    && scopeMatches
    && rule.risk_levels.includes(proposal.risk_level)
    && rule.validity.from <= request.decision_time
    && request.decision_time < rule.validity.to;
}

function empty(status, reason, matched = []) {
  return {
    coverage_status: status,
    matched_rule_ids: sorted(matched.map((rule) => rule.rule_id)),
    covered_channel_ids: [],
    missing_channel_ids: [],
    impact_entry_ids: [],
    reason_codes: [reason]
  };
}

export function evaluateImpactCoverage(request) {
  if (policy.proof.mode !== "unsigned_fixture") return empty("indeterminate", "unsupported_fixture_proof");
  if (policy.authority_epoch < request.verifier_epoch) return empty("indeterminate", "coverage_policy_epoch_stale");
  if (policy.authority_epoch > request.verifier_epoch) return empty("indeterminate", "verifier_authority_state_behind");

  const matched = policy.coverage_rules.filter((rule) => ruleMatches(rule, request));
  if (matched.length === 0) return empty("indeterminate", "no_applicable_coverage_rule");
  if (matched.length > 1) return empty("indeterminate", "multiple_applicable_coverage_rules", matched);
  const rule = matched[0];
  const channelIds = rule.required_channels.map((channel) => channel.channel_id);
  const horizonSeconds = (Date.parse(request.proposal.horizon.to) - Date.parse(request.proposal.horizon.from)) / 1000;
  if (horizonSeconds <= 0 || horizonSeconds > rule.maximum_horizon_seconds) {
    return {
      coverage_status: "partial",
      matched_rule_ids: [rule.rule_id],
      covered_channel_ids: [],
      missing_channel_ids: sorted(channelIds),
      impact_entry_ids: [],
      reason_codes: ["proposal_horizon_exceeds_rule"]
    };
  }

  const reasons = [];
  if (request.reports.some((report) => !channelIds.includes(report.channel_id))) {
    reasons.push("undeclared_channel_report_ignored");
  }
  const acceptedReports = [];
  const covered = [];
  const missing = [];
  for (const channel of rule.required_channels) {
    const candidates = [];
    for (const report of request.reports.filter((item) => item.channel_id === channel.channel_id)) {
      if (report.proposal_id !== request.proposal.proposal_id || report.proposal_revision !== request.proposal.revision) {
        reasons.push("wrong_revision_report_ignored");
        continue;
      }
      if (report.procedure_id !== channel.procedure_id) {
        reasons.push("wrong_procedure_report_ignored");
        continue;
      }
      const ageSeconds = (Date.parse(request.decision_time) - Date.parse(report.assessed_at)) / 1000;
      if (ageSeconds < 0) {
        reasons.push("future_report_ignored");
        continue;
      }
      if (ageSeconds > channel.maximum_report_age_seconds) {
        reasons.push("stale_report_ignored");
        continue;
      }
      if (report.horizon.from > request.proposal.horizon.from || report.horizon.to < request.proposal.horizon.to) {
        reasons.push("insufficient_horizon_report_ignored");
        continue;
      }
      candidates.push(report);
    }
    if (candidates.length > 1) return empty("indeterminate", "multiple_current_reports_for_channel", [rule]);
    if (candidates.length === 0) {
      missing.push(channel.channel_id);
      continue;
    }
    const report = candidates[0];
    acceptedReports.push(report);
    if (report.coverage_status === "complete_for_channel") {
      covered.push(channel.channel_id);
    } else {
      missing.push(channel.channel_id);
      reasons.push(report.coverage_status === "unavailable" ? "channel_report_unavailable" : "channel_report_partial");
    }
  }

  const impacts = acceptedReports.flatMap((report) => report.impact_entries);
  const byId = new Map();
  for (const impact of impacts) {
    const previous = byId.get(impact.impact_id);
    if (previous && JSON.stringify(previous) !== JSON.stringify(impact)) {
      return empty("indeterminate", "conflicting_impact_identifier", [rule]);
    }
    byId.set(impact.impact_id, impact);
  }

  if (missing.length > 0) reasons.push("required_channel_not_covered");
  else reasons.push("declared_channels_complete");
  return {
    coverage_status: missing.length > 0 ? "partial" : "complete_for_declared_channels",
    matched_rule_ids: [rule.rule_id],
    covered_channel_ids: sorted(covered),
    missing_channel_ids: sorted(missing),
    impact_entry_ids: sorted(byId.keys()),
    reason_codes: unique(reasons)
  };
}

export function evaluateModelBoundary(testCase) {
  if (testCase.kind === "presence_relation") {
    return {impacted: testCase.inputs.impact_path, participation_entitlement: "not_evaluated"};
  }
  if (testCase.kind === "nonhuman_subject") {
    return {impacted: testCase.inputs.impact_path, can_confirm: "not_inferred", guardian: "not_inferred"};
  }
  if (testCase.kind === "future_role") {
    return {impacted: testCase.inputs.impact_path, current_identity: "not_inferred", participation_entitlement: "not_evaluated"};
  }
  return {impacted: testCase.inputs.impact_path, identity: "withheld", participation_entitlement: "not_evaluated"};
}

assert.equal(policy.contract, "hwm-impact:CoveragePolicyDocument");
assert.equal(artifact.artifact, "hwm-impact:OracleCases");
assert.equal(artifact.cases.length, 20);
assert.equal(artifact.model_boundary_cases.length, 5);
for (const testCase of artifact.cases) {
  assert.deepEqual(evaluateImpactCoverage(expandRequest(testCase)), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0);
}
for (const testCase of artifact.model_boundary_cases) {
  assert.deepEqual(evaluateModelBoundary(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0);
}

const graph = new Map(external["@graph"].map((item) => [item["@id"], item]));
assert.ok(graph.get("urn:hwm:proposal:shared-bedroom-hvac-1")["@type"].includes("prov:Plan"));
assert.equal(graph.get("urn:hwm:feature:shared-bedroom-air")["@type"], "sosa:FeatureOfInterest");
assert.equal(graph.get("urn:hwm:property:shared-bedroom-air-temperature")["@type"], "sosa:Property");
assert.ok(graph.get("urn:hwm:impact-report:privacy-current")["@type"].includes("dpv:ImpactAssessment"));
assert.equal(graph.get("urn:hwm:space:shared-bedroom")["@type"], "bot:Space");
assert.equal(graph.get("urn:hwm:assessment:impact-coverage-1")["prov:wasGeneratedBy"]["@id"], "urn:hwm:activity:evaluate-impact-coverage-1");
assert.ok(!JSON.stringify(external).includes("hwm-impact:"));

const forbidden = new Set([
  ...artifact.cases.flatMap((item) => item.must_not_infer),
  ...artifact.model_boundary_cases.flatMap((item) => item.must_not_infer)
]);
for (const guard of ["globally_complete", "participation_entitlement", "action_authorized", "presence_means_affected", "absence_means_unaffected", "pet_can_confirm", "identity_of_opaque_subject"]) {
  assert.ok(forbidden.has(guard), `Missing impact-closure guard: ${guard}`);
}

console.log("BOUNDED IMPACT CLOSURE OK", `${artifact.cases.length} coverage cases`, `${artifact.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("DECLARED COVERAGE ONLY OK", "complete_for_declared_channels never means globally complete or impact-free");
console.log("AUTHORITY BOUNDARY OK", "impact entries do not create participation entitlement or authorization");
console.log("PRIVACY BOUNDARY OK", "opaque handles and unavailable reports never collapse to nobody affected");
console.log("EXTERNAL IMPACT PROJECTION OK", "SOSA/SSN, PROV-O, BOT, DPV, Schema.org, and DCMI preserve reusable semantics without HWM impact predicates");

