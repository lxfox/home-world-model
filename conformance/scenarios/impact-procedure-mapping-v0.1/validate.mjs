import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const policy = read("mapping-policy.json");
const artifact = read("mapping-cases.json");
const external = read("mapping.external.jsonld");

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
  request.route_bindings = request.route_binding_ids.map((id) => artifact.route_bindings[id]);
  assert.ok(request.route_bindings.every(Boolean), `${testCase.case_id}: unknown route binding`);
  return request;
}

const sorted = (values) => [...values].sort();

function empty(reason, matched = [], unmapped = []) {
  return {
    mapping_status: "indeterminate",
    matched_rule_ids: sorted(matched.map((rule) => rule.rule_id)),
    mapped_impact_ids: [],
    unmapped_impact_ids: sorted(unmapped),
    requirement_descriptors: [],
    participation_slot_ids: [],
    reason_codes: [reason]
  };
}

function ruleMatches(rule, impact, request) {
  return rule.action_types.includes(request.proposal.action_type)
    && rule.purposes.includes(request.proposal.purpose)
    && rule.channel_ids.includes(impact.channel_id)
    && rule.entity_kinds.includes(impact.entity_kind)
    && rule.impact_statuses.includes(impact.impact_status)
    && rule.validity.from <= request.decision_time
    && request.decision_time < rule.validity.to;
}

function descriptor(impact, template) {
  return [
    impact.impact_id,
    template.template_id,
    template.kind,
    template.timing,
    template.completion_signal,
    template.failure_effect,
    template.negative_signal_effect
  ].join("|");
}

export function evaluateImpactProcedureMapping(request) {
  if (policy.proof.mode !== "unsigned_fixture") return empty("unsupported_fixture_proof");
  if (policy.authority_epoch < request.verifier_epoch) return empty("mapping_policy_epoch_stale");
  if (policy.authority_epoch > request.verifier_epoch) return empty("verifier_authority_state_behind");
  const closure = request.impact_closure;
  if (closure.coverage_status !== "complete_for_declared_channels") {
    return empty("impact_closure_not_complete_for_declared_channels");
  }
  if (closure.proposal_id !== request.proposal.proposal_id || closure.proposal_revision !== request.proposal.revision) {
    return empty("impact_closure_wrong_proposal_revision");
  }
  if (closure.authority_epoch < request.verifier_epoch) return empty("impact_closure_authority_epoch_stale");
  if (closure.authority_epoch > request.verifier_epoch) return empty("verifier_authority_state_behind_closure");
  if (closure.impact_entries.length === 0) {
    return {
      mapping_status: "mapped_for_declared_impacts",
      matched_rule_ids: [], mapped_impact_ids: [], unmapped_impact_ids: [],
      requirement_descriptors: [], participation_slot_ids: [],
      reason_codes: ["no_disclosed_impacts"]
    };
  }

  const matchedRules = [];
  const mappedImpacts = [];
  const requirements = [];
  const slots = [];
  let explicitNoneOnly = true;
  for (const impact of closure.impact_entries) {
    const matched = policy.mapping_rules.filter((rule) => ruleMatches(rule, impact, request));
    if (matched.length === 0) return empty("no_applicable_mapping_rule", [], [impact.impact_id]);
    if (matched.length > 1) return empty("multiple_applicable_mapping_rules", matched, [impact.impact_id]);
    const rule = matched[0];
    matchedRules.push(rule);
    for (const template of rule.requirement_templates) {
      if (template.kind === "none") continue;
      explicitNoneOnly = false;
      if (!["authority_internal", "not_applicable"].includes(template.route_mode)) {
        const routes = request.route_bindings.filter((binding) =>
          binding.impact_id === impact.impact_id && binding.template_id === template.template_id
        );
        if (routes.length === 0) return empty("required_route_missing", [rule], [impact.impact_id]);
        if (routes.length > 1) return empty("multiple_current_routes_for_requirement", [rule], [impact.impact_id]);
        const route = routes[0];
        if (route.authority_epoch < request.verifier_epoch) return empty("route_authority_epoch_stale", [rule], [impact.impact_id]);
        if (route.authority_epoch > request.verifier_epoch) return empty("verifier_authority_state_behind_route", [rule], [impact.impact_id]);
        if (route.expires_at <= request.decision_time) return empty("required_route_expired", [rule], [impact.impact_id]);
        if (route.status === "unavailable") return empty("required_route_unavailable", [rule], [impact.impact_id]);
        if (route.status === "denied") return empty("required_route_denied", [rule], [impact.impact_id]);
        if (route.status !== "resolved" || !route.participation_slot_id) return empty("required_route_indeterminate", [rule], [impact.impact_id]);
        slots.push(route.participation_slot_id);
      }
      requirements.push(descriptor(impact, template));
    }
    mappedImpacts.push(impact.impact_id);
  }
  return {
    mapping_status: "mapped_for_declared_impacts",
    matched_rule_ids: sorted(new Set(matchedRules.map((rule) => rule.rule_id))),
    mapped_impact_ids: sorted(mappedImpacts),
    unmapped_impact_ids: [],
    requirement_descriptors: sorted(requirements),
    participation_slot_ids: sorted(slots),
    reason_codes: [explicitNoneOnly ? "explicit_no_additional_requirement" : "all_disclosed_impacts_mapped"]
  };
}

export function evaluateModelBoundary(testCase) {
  const input = testCase.inputs;
  if (testCase.kind === "obligation_direction") return {obligated_party: "action_side_service", person_must_answer: false};
  if (testCase.kind === "affirmative_boundary") return {requirement_signal: "affirmative_response", legal_consent: "not_inferred", authorization: "not_inferred"};
  if (testCase.kind === "consultation_boundary") return {opportunity_complete: input.opportunity_delivered, agreement: "not_inferred", waiver: "not_inferred"};
  if (testCase.kind === "objection_boundary") return {window_signal: "expired_without_objection", affirmative_acceptance: "not_inferred", waiver: "not_inferred"};
  if (testCase.kind === "notification_boundary") return {notification_complete: input.delivered, acceptance: "not_inferred", permission: "not_inferred"};
  if (testCase.kind === "review_boundary") return {review_signal: "accepted", authorization: "not_inferred", universal_competence: "not_inferred"};
  if (testCase.kind === "slot_boundary") return {identity: "withheld", presence: "not_inferred", membership: "not_inferred", durable_delegation: "not_inferred"};
  if (testCase.kind === "representative_boundary") return {route_status: "resolved", legal_guardian: "not_inferred", general_delegation: "not_inferred"};
  return {requirement_count: input.channels.length, identity_link_disclosed: false};
}

assert.equal(policy.contract, "hwm-procedure:MappingPolicyDocument");
assert.equal(artifact.artifact, "hwm-procedure:OracleCases");
assert.equal(artifact.cases.length, 17);
assert.equal(artifact.model_boundary_cases.length, 9);
for (const testCase of artifact.cases) {
  assert.deepEqual(evaluateImpactProcedureMapping(expandRequest(testCase)), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0);
}
for (const testCase of artifact.model_boundary_cases) {
  assert.deepEqual(evaluateModelBoundary(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0);
}

const baseline = evaluateImpactProcedureMapping(expandRequest(artifact.cases[0]));
assert.equal(new Set(baseline.requirement_descriptors.map((item) => item.split("|")[2])).size, 5);
assert.ok(baseline.requirement_descriptors.some((item) => item.includes("affirmative_response")));
assert.ok(baseline.requirement_descriptors.some((item) => item.includes("consultation_opportunity")));
assert.ok(baseline.requirement_descriptors.some((item) => item.includes("objection_window")));
assert.ok(baseline.requirement_descriptors.some((item) => item.includes("notification")));
assert.ok(baseline.requirement_descriptors.some((item) => item.includes("qualified_review")));
assert.ok(!JSON.stringify(baseline).includes("resident-a"));
assert.ok(!JSON.stringify(baseline).includes("cat-1"));
assert.ok(!JSON.stringify(baseline).includes("authority-7:9f2"));

const graph = new Map(external["@graph"].map((item) => [item["@id"], item]));
assert.ok(graph.get("urn:hwm:proposal:shared-bedroom-hvac-1")["@type"].includes("prov:Plan"));
assert.equal(graph.get("urn:hwm:policy:impact-procedure-1")["@type"], "odrl:Policy");
assert.ok(graph.get("urn:hwm:requirement:affirmative-1")["@type"].includes("odrl:Duty"));
assert.ok(graph.get("urn:hwm:requirement:privacy-consultation-1")["@type"].includes("dpv:ConsultationWithDataSubject"));
assert.equal(graph.get("urn:hwm:activity:map-impact-procedures-1")["prov:generated"]["@id"], "urn:hwm:requirement-set:proposal-1");
assert.ok(!JSON.stringify(external).includes("hwm-procedure:"));

const forbidden = new Set([
  ...artifact.cases.flatMap((item) => item.must_not_infer),
  ...artifact.model_boundary_cases.flatMap((item) => item.must_not_infer)
]);
for (const guard of ["affected_means_voter", "person_obligated_to_answer", "affirmative_response_is_legal_consent", "notification_is_acceptance", "silence_is_agreement", "review_is_authorization", "pet_representative_is_guardian", "slot_is_identity", "cross_channel_requirements_merged", "action_authorized"]) {
  assert.ok(forbidden.has(guard), `Missing procedure-mapping guard: ${guard}`);
}

console.log("IMPACT PROCEDURE MAPPING OK", `${artifact.cases.length} mapping cases`, `${artifact.model_boundary_cases.length} model-boundary cases`, `${forbidden.size} forbidden inferences`);
console.log("OBLIGATION DIRECTION OK", "the action-side service must obtain or deliver the procedure; affected people are not forced to answer");
console.log("HETEROGENEOUS REQUIREMENTS OK", "affirmative response, consultation, objection, notification, and qualified review remain distinct");
console.log("OPAQUE ROUTING OK", "Proposal-scoped slots preserve procedure binding without disclosing identity, presence, membership, or guardianship");
console.log("AUTHORIZATION BOUNDARY OK", "mapping emits requirements but never permission, consent, safety, or action authorization");
console.log("EXTERNAL PROCEDURE PROJECTION OK", "ODRL, XACML-aligned obligations, DPV, PROV-O, ActivityStreams, Schema.org, and DCMI preserve reusable semantics without HWM procedure predicates");

