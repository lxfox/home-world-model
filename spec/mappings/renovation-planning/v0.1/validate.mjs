import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(directory, "../../../..");
const read = (name) => JSON.parse(fs.readFileSync(path.resolve(directory, name), "utf8"));
const readRepo = (name) => JSON.parse(fs.readFileSync(path.resolve(repo, name), "utf8"));
const ids = (value) => (Array.isArray(value) ? value : [value]).map((item) => item["@id"]);

const audit = read("planning-term-mapping.json");
const projection = read("examples/external-semantics.jsonld");
const revisionProjection = readRepo("conformance/scenarios/planning-branch-resolution-v0.1/base-revision.external.jsonld");
const envelopes = readRepo("conformance/scenarios/renovation-planning-package-v0.1/claims.json");
const records = readRepo("conformance/scenarios/renovation-planning-package-v0.1/records.json");
const claims = new Map(envelopes.map((item) => [item.claim.claim_id, item.claim]));
const graph = new Map(projection["@graph"].map((item) => [item["@id"], item]));
const revisionGraph = new Map(revisionProjection["@graph"].map((item) => [item["@id"], item]));

assert.equal(audit.artifact, "hwm:RenovationPlanningTermMappingAudit");
assert.equal(new Set(audit.sources.map((item) => item.source_id)).size, audit.sources.length, "Duplicate source identifier");
assert.equal(new Set(audit.terms.map((item) => item.term_id)).size, audit.terms.length, "Duplicate mapped term");
const sourceIds = new Set(audit.sources.map((item) => item.source_id));
for (const term of audit.terms) {
  assert.ok(term.external_terms.every((item) => sourceIds.has(item.source_id)), `Unknown source in ${term.term_id}`);
  if (term.decision === "external_reuse") {
    assert.equal(term.normative_action, "remove_hwm_vocabulary", `External reuse must remove alias: ${term.term_id}`);
    assert.ok(term.external_terms.some((item) => ["exact", "strong_partial"].includes(item.coverage)));
  }
}

const requiredTerms = new Set([
  "hwm-planning:DesignOption",
  "hwm-planning:candidateFor",
  "hwm-planning:mountingPlan",
  "hwm-planning:reservedLoad",
  "hwm-planning:requirementStatus",
  "hwm-planning:recommends",
  "hwm-planning:selectedOption",
  "hwm-planning:designContext",
  "hwm-planning:input_context_ids",
  "hwm-planning:recommendation-selection-authorization-boundary"
]);
assert.deepEqual(new Set(audit.terms.map((item) => item.term_id)), requiredTerms);
const counts = {};
for (const term of audit.terms) counts[term.decision] = (counts[term.decision] ?? 0) + 1;
assert.deepEqual(counts, { external_reuse: 2, hwm_application_profile: 7, do_not_standardize: 1 });
assert.equal(audit.terms.find((item) => item.term_id === "hwm-planning:candidateFor").decision, "hwm_application_profile", "candidateFor must be a scoped planning composition, not a global predicate");
assert.equal(audit.terms.find((item) => item.term_id === "hwm-planning:reservedLoad").decision, "do_not_standardize", "reservedLoad must not collapse distinct electrical quantities or compliance states");

const recommendationMapping = audit.terms.find((item) => item.term_id === "hwm-planning:recommends");
assert.equal(recommendationMapping.decision, "hwm_application_profile", "Unstable Schema.org Recommendation must not be sole normative encoding");
assert.ok(audit.sources.find((item) => item.source_id === "schema30").maturity.includes("new area"));
assert.equal(audit.terms.find((item) => item.term_id === "hwm-planning:requirementStatus").confidence, "medium", "EARL Note maturity must remain visible");

const base = "urn:hwm:design-context:renovation-base-r2";
for (const option of ["a", "b"]) {
  const optionId = `urn:hwm:design-option:reading-light-${option}`;
  assert.ok(graph.get(optionId)["@type"].includes("prov:Plan"));
  assert.equal(graph.get(optionId)["prov:wasDerivedFrom"]["@id"], base);
  assert.equal(claims.get(`urn:hwm:claim:option-${option}-derived-from-base`).proposition.object, base);
}

const outcomes = {
  "urn:hwm:claim:option-a-requirement-status": "http://www.w3.org/ns/earl#passed",
  "urn:hwm:claim:option-b-requirement-status": "http://www.w3.org/ns/earl#failed"
};
for (const [claimId, expectedOutcome] of Object.entries(outcomes)) {
  const option = claimId.includes("option-a") ? "a" : "b";
  const result = graph.get(`urn:hwm:test-result:option-${option}-reading-requirement`);
  assert.ok(result["@type"].includes("earl:TestResult"));
  assert.equal(result["earl:outcome"]["@id"], expectedOutcome);
  const compatibilityStatus = claims.get(claimId).proposition.object.status;
  assert.equal(compatibilityStatus, option === "a" ? "satisfied" : "not_satisfied");
}

const comparison = graph.get("urn:hwm:comparison:reading-light-a-vs-b-1");
assert.deepEqual(new Set(ids(comparison["prov:used"])), new Set([
  "urn:hwm:evaluation:option-a-reading-requirement",
  "urn:hwm:evaluation:option-b-reading-requirement"
]));
const recommendationId = comparison["prov:generated"]["@id"];
const recommendation = graph.get(recommendationId);
assert.ok(recommendation["@type"].includes("schema:Recommendation"));
assert.equal(recommendation["schema:itemReviewed"]["@id"], claims.get("urn:hwm:claim:comparison-recommends-option-a").proposition.object);
assert.equal(recommendation["prov:wasGeneratedBy"]["@id"], comparison["@id"]);

const choice = graph.get("urn:hwm:choice:homeowner-reading-light-1");
const selection = claims.get("urn:hwm:claim:homeowner-selects-option-a");
assert.ok(choice["@type"].includes("schema:ChooseAction"));
assert.equal(choice["schema:agent"]["@id"], selection.proposition.subject);
assert.equal(choice["schema:object"]["@id"], selection.proposition.object.design_option_id);
assert.deepEqual(new Set(ids(choice["schema:actionOption"])), new Set([
  "urn:hwm:design-option:reading-light-a",
  "urn:hwm:design-option:reading-light-b"
]));
assert.equal(choice["schema:actionStatus"]["@id"], "https://schema.org/CompletedActionStatus");
assert.ok(!projection["@graph"].some((item) => (Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]]).includes("schema:BuyAction")));
assert.ok(!records.some((item) => ["authorization", "action"].includes(item.record_type)));

const semanticTerms = JSON.stringify(projection);
assert.ok(!semanticTerms.includes("hwm-planning:"), "External projection leaked compatibility predicates");
assert.ok(semanticTerms.includes("schema:ChooseAction") && semanticTerms.includes("earl:outcome") && semanticTerms.includes("prov:used"));

assert.equal(revisionGraph.get("urn:hwm:base:r3")["prov:wasRevisionOf"]["@id"], "urn:hwm:base:r2");
assert.equal(revisionGraph.get("urn:hwm:design-option:a-r2")["prov:wasRevisionOf"]["@id"], "urn:hwm:design-option:a-r1");
assert.equal(revisionGraph.get("urn:hwm:design-option:a-r2")["prov:wasDerivedFrom"]["@id"], "urn:hwm:base:r3");
assert.ok(revisionGraph.get("urn:hwm:base:r2")["prov:invalidatedAtTime"]);
assert.ok(!JSON.stringify(revisionProjection).includes("hwm-planning:"));

console.log("PLANNING TERM MAPPING OK", `${audit.terms.length} terms/boundaries`, JSON.stringify(counts));
console.log("EXTERNAL PROJECTION OK", "PROV plans, revisions and lineage; EARL outcomes; Schema.org choice; no HWM planning predicate, BuyAction or Authorization");
