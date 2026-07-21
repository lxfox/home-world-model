import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyPackage } from "../../../spec/profiles/ro-crate/v0.1/validate.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));

const packageResult = verifyPackage(directory);
const envelopes = read("claims.json");
const records = read("records.json");
const crate = read("ro-crate-metadata.json");
const spatial = read("design/spatial-model.jsonld");
const electrical = read("design/electrical-plan.json");
const catalog = read("catalog/candidate-products.jsonld");
const comparison = read("comparison/options.json");
const simulationRows = fs.readFileSync(path.join(directory, "simulation/lighting.csv"), "utf8").trim().split("\n").slice(1);

const claims = envelopes.map((item) => item.claim);
const claimsById = new Map(claims.map((item) => [item.claim_id, item]));
const recordsById = new Map(records.map((item) => [item.record_id, item]));
const designContextTerm = "https://homeworldmodel.org/spec/profiles/renovation-planning/v0.1#designContext";
assert.equal(claimsById.size, claims.length, "Duplicate Claim identifier");
assert.equal(recordsById.size, records.length, "Duplicate Record identifier");

for (const envelope of envelopes) {
  assert.equal(envelope.contract, "hwm:ClaimEnvelope");
  assert.equal(envelope.claim.scope.household_id, "urn:hwm:household:fixture-004");
  assert.ok(recordsById.has(envelope.claim.creation_record_id), `Missing creation Record: ${envelope.claim.claim_id}`);
  for (const link of envelope.evidence_links) {
    assert.ok(recordsById.has(link.record_id), `Missing Evidence Record: ${link.record_id}`);
  }
}

const plannedSpaceClaims = [
  "urn:hwm:claim:planned-building-type",
  "urn:hwm:claim:planned-bedroom-type",
  "urn:hwm:claim:building-has-planned-bedroom",
  "urn:hwm:claim:planned-reading-zone-type",
  "urn:hwm:claim:planned-reading-slot-type"
].map((id) => claimsById.get(id));
assert.ok(plannedSpaceClaims.every((claim) => claim.epistemic_basis.mode === "planned"));
assert.ok(!claims.some((claim) => claim.epistemic_basis.mode === "observed"), "Pre-installation package contains an observed Claim");
const contextualClaims = claims.filter((claim) =>
  ["planned", "simulated"].includes(claim.epistemic_basis.mode) ||
  ["hwm-planning:requirementStatus", "hwm-planning:recommends"].includes(claim.proposition.predicate)
);
assert.ok(contextualClaims.every((claim) => claim.extensions[designContextTerm]?.context_id), "Plan-specific Claim lacks explicit context");
const contextsByKind = new Map();
for (const claim of contextualClaims) {
  const kind = claim.extensions[designContextTerm].context_kind;
  contextsByKind.set(kind, [...(contextsByKind.get(kind) ?? []), claim]);
}
assert.deepEqual(
  new Set(contextsByKind.get("base_design").map((claim) => claim.extensions[designContextTerm].context_id)),
  new Set(["urn:hwm:design-context:renovation-base-r2"])
);
assert.deepEqual(
  new Set(contextsByKind.get("design_option").map((claim) => claim.extensions[designContextTerm].context_id)),
  new Set(["urn:hwm:design-option:reading-light-a", "urn:hwm:design-option:reading-light-b"])
);
const comparisonContext = contextsByKind.get("comparison")[0].extensions[designContextTerm];
assert.deepEqual(new Set(comparisonContext.input_context_ids), new Set([
  "urn:hwm:design-option:reading-light-a",
  "urn:hwm:design-option:reading-light-b"
]));
for (const option of ["a", "b"]) {
  const derivation = claimsById.get(`urn:hwm:claim:option-${option}-derived-from-base`);
  assert.equal(derivation.proposition.predicate, "prov:wasDerivedFrom");
  assert.equal(derivation.proposition.object, "urn:hwm:design-context:renovation-base-r2");
}

const productType = claimsById.get("urn:hwm:claim:candidate-product-model-type");
assert.equal(productType.proposition.object, "schema:ProductModel");
assert.equal(claimsById.get("urn:hwm:claim:candidate-product-model-b-type").proposition.object, "schema:ProductModel");
const claimText = JSON.stringify(claims.map((claim) => claim.proposition));
assert.ok(!claimText.includes("PhysicalAsset"), "Product model was promoted to a Physical Asset");
assert.ok(!claimText.includes("DigitalEndpoint"), "Uninstalled design contains a Digital Endpoint");
assert.ok(!claims.some((claim) => /exposes|fulfills/.test(claim.proposition.predicate)), "Candidate was modeled as installed");
assert.ok(!claimText.includes("functional_slot_id"), "Deprecated Functional Slot field remains in compatibility Claims");

const requirement = claimsById.get("urn:hwm:claim:planned-reading-requirement");
const effect = claimsById.get("urn:hwm:claim:planned-option-simulated-effect");
const effectB = claimsById.get("urn:hwm:claim:planned-option-b-simulated-effect");
assert.equal(requirement.epistemic_basis.mode, "declared");
assert.equal(effect.epistemic_basis.mode, "simulated");
assert.ok(effect.proposition.object.expected_range.minimum >= requirement.proposition.object.threshold.value);
assert.ok(effectB.proposition.object.expected_range.maximum < requirement.proposition.object.threshold.value);
assert.equal(claimsById.get("urn:hwm:claim:option-a-requirement-status").proposition.object.status, "satisfied");
assert.equal(claimsById.get("urn:hwm:claim:option-b-requirement-status").proposition.object.status, "not_satisfied");
assert.ok(!records.some((record) => ["observation", "action", "authorization"].includes(record.record_type)));

const productPower = claimsById.get("urn:hwm:claim:candidate-product-maximum-power").proposition.object;
const productBPower = claimsById.get("urn:hwm:claim:candidate-product-b-maximum-power").proposition.object;
const allocationProjection = claimsById.get("urn:hwm:claim:planned-circuit-reserved-load").proposition.object;
const plannedAllocation = allocationProjection.quantity;
assert.equal(allocationProjection.compatibility_projection, "planned_load_allocation");
assert.equal(allocationProjection.quantity_role, "planned_load_allocation");
assert.equal(allocationProjection.assessment_use, "catalog_screening_only");
assert.equal(productPower.unit, plannedAllocation.unit);
assert.ok(productPower.value <= plannedAllocation.value, "Candidate maximum power exceeds planned catalog allocation");
assert.ok(productBPower.value <= plannedAllocation.value, "Candidate B maximum power exceeds planned catalog allocation");
for (const forbiddenConclusion of [
  "installed_load",
  "current_carrying_capacity",
  "installation_verification",
  "jurisdictional_compliance"
]) {
  assert.ok(allocationProjection.not_evidence_of.includes(forbiddenConclusion), `Allocation lacks boundary: ${forbiddenConclusion}`);
}

const recommendation = claimsById.get("urn:hwm:claim:comparison-recommends-option-a");
assert.equal(recommendation.proposition.object, "urn:hwm:design-option:reading-light-a");
assert.equal(recommendation.extensions[designContextTerm].context_kind, "comparison");
assert.equal(recordsById.get(recommendation.creation_record_id).payload.status, "advisory_not_authorization");
const selection = claimsById.get("urn:hwm:claim:homeowner-selects-option-a");
assert.equal(selection.proposition.object.effect, "planning_preference_only");
assert.equal(recordsById.get(selection.creation_record_id).record_type, "attestation");
assert.equal(recordsById.get(selection.creation_record_id).payload.status, "selected_not_purchased_not_installed");
assert.ok(claimsById.has("urn:hwm:claim:option-b-requirement-status"), "Unselected option B history was deleted");
assert.equal(comparison.status, "advisory_not_authorization");
assert.deepEqual(new Set(comparison.input_context_ids), new Set(comparisonContext.input_context_ids));
assert.equal(simulationRows.length, 2, "Simulation artifact must retain both design branches");

const spatialGraph = new Map(spatial["@graph"].map((item) => [item["@id"], item]));
assert.equal(spatialGraph.get("urn:hwm:building:renovation-fixture")["bot:hasSpace"]["@id"], "urn:hwm:space:planned-bedroom");
assert.ok(spatialGraph.get("urn:hwm:zone:planned-reading")["@type"].includes("sosa:FeatureOfInterest"));
assert.equal(electrical.status, "planned_not_installed");
assert.equal(electrical.circuits[0].controlled_points[0].function_position_id, "urn:hwm:slot:planned-reading-light");
assert.deepEqual(electrical.circuits[0].planned_load_allocation.quantity, plannedAllocation);
assert.equal(electrical.circuits[0].planned_load_allocation.assessment_use, "catalog_screening_only");
assert.equal(electrical.circuits[0].electrical_design_assessment.status, "incomplete_catalog_screening_only");
for (const missingInput of [
  "design_current",
  "protective_device_rated_current",
  "current_carrying_capacity",
  "verification_record",
  "jurisdiction_and_code_edition"
]) {
  assert.ok(electrical.circuits[0].electrical_design_assessment.missing_inputs.includes(missingInput), `Missing electrical fail-closed input: ${missingInput}`);
}
assert.ok(!JSON.stringify(electrical).includes('"reserved_load"'), "Rejected reserved_load field remains in the design artifact");
assert.ok(!JSON.stringify(electrical).includes('"functional_slot_id"'), "Deprecated functional_slot_id remains in the design artifact");
const electricalRecord = recordsById.get("urn:hwm:record:renovation-electrical-plan");
assert.equal(electricalRecord.payload.status, "incomplete_catalog_screening_only");
assert.equal(electricalRecord.payload.not_verified, true);
assert.equal(electricalRecord.payload.compliance_status, "not_evaluated");
assert.equal(catalog["@graph"].filter((item) => item["@type"] === "ProductModel").length, 2);

const crateGraph = new Map(crate["@graph"].map((item) => [item["@id"], item]));
const root = crateGraph.get("./");
assert.equal(root.mentions.length, 3, "Fixture must test multiple mentions");
assert.notDeepEqual(root.hasPart.map((item) => item["@id"]), [...root.hasPart].map((item) => item["@id"]).sort(), "Fixture must test unordered hasPart");
for (const id of [
  "design/spatial-model.jsonld",
  "design/electrical-plan.json",
  "catalog/candidate-products.jsonld",
  "simulation/lighting.csv",
  "comparison/options.json"
]) {
  assert.notEqual(crateGraph.get(id).additionalType, undefined, `Application artifact lacks semantic type: ${id}`);
}

console.log("PLANNING EPISTEMICS OK", "base, option A, option B, and comparison contexts are explicit and isolated");
console.log("CANDIDATE IDENTITY OK", "ProductModel is neither Physical Asset nor Digital Endpoint and is not installed");
console.log("BRANCH COMPARISON OK", "A satisfies the requirement, B does not, and only the comparison context recommends A");
console.log("SELECTION BOUNDARY OK", "recommendation and homeowner selection create neither authorization nor installed fact; B is retained");
console.log("ELECTRICAL BOUNDARY OK", "planned allocation supports catalog screening only; capacity, verification, and compliance remain indeterminate");
console.log("PACKAGE GENERALITY OK", `${packageResult.resource_count} resources, ${packageResult.application_resource_count} typed application artifacts, unordered relations preserved`);
console.log("RENOVATION FIXTURE OK", `${claims.length} Claims, ${records.length} Records, no new Core primitive`);
