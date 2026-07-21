import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const audit = JSON.parse(fs.readFileSync(path.join(directory, "term-mapping.json"), "utf8"));

const sourceIds = new Set(audit.sources.map((source) => source.source_id));
const termIds = new Set(audit.terms.map((term) => term.term_id));
assert.equal(sourceIds.size, audit.sources.length, "Duplicate source identifier");
assert.equal(termIds.size, audit.terms.length, "Duplicate term identifier");

const requiredTerms = [
  "hwm:EntityRef",
  "hwm:Claim",
  "hwm:Record",
  "hwm:Authority",
  "hwm:HouseholdManifest",
  "hwm:HouseholdKnowledgePackage",
  "hwm:ClaimEnvelope",
  "hwm:EvidenceLink",
  "hwm:WorldView",
  "hwm:Candidate",
  "hwm:FunctionalSlot",
  "hwm:PhysicalAsset",
  "hwm:DigitalEndpoint",
  "sosa:FeatureOfInterest",
  "hwm:Space",
  "hwm:Observation",
  "hwm:ActionProposal",
  "hwm:AuthorizationDecision",
  "hwm:ActionTrace",
  "hwm:AvailabilityStatus",
  "hwm:EpistemicStatus",
  "hwm:FreshnessStatus",
  "hwm:TemporalStatus",
  "hwm:ApplicabilityStatus",
  "hwm:EffectAssessment",
  "hwm:GoalEvaluation",
  "hwm:ResourceAssessment",
  "hwm:AuthorityEpochAndLease",
  "hwm:locatedIn",
  "hwm:containsAndAdjacentTo",
  "hwm:fulfills",
  "hwm:exposes",
  "hwm:replacesAndSupersedes",
  "hwm:equivalentTo",
  "hwm:affectsAndObserves",
  "hwm:generatedByAttributedToDerivedFrom",
  "hwm:basedOnViewAndAssessmentRelations",
  "hwm:EvidenceResolver",
  "hwm:AgentPlanner",
  "hwm:PolicyEvaluator",
  "hwm:ExecutionGateway"
];

for (const termId of requiredTerms) {
  assert.ok(termIds.has(termId), `Required Core term or relation not audited: ${termId}`);
}

for (const term of audit.terms) {
  for (const external of term.external_terms) {
    assert.ok(sourceIds.has(external.source_id), `Unknown source ${external.source_id} on ${term.term_id}`);
  }
  if (term.decision === "external_reuse") {
    assert.ok(term.external_terms.length > 0, `External reuse lacks external term: ${term.term_id}`);
    assert.ok(["remove_hwm_vocabulary", "reject_term"].includes(term.normative_action), `External reuse still claims HWM vocabulary: ${term.term_id}`);
  }
  if (term.decision === "hwm_contract_gap") {
    assert.ok(["retain_exchange_contract", "retain_wire_only"].includes(term.normative_action), `Contract gap has incompatible action: ${term.term_id}`);
    assert.ok(term.residual_gap.length > 40, `Contract gap lacks a falsifiable residual explanation: ${term.term_id}`);
  }
  if (term.decision === "internal_role_only") {
    assert.equal(term.normative_action, "retain_internal_documentation", `Internal role leaked into vocabulary: ${term.term_id}`);
  }
  if (term.decision === "provisional_pending_mapping") {
    assert.equal(term.normative_action, "defer_claim_of_novelty", `Provisional term claims novelty: ${term.term_id}`);
  }
}

const counts = Object.fromEntries(
  [...new Set(audit.terms.map((term) => term.decision))]
    .sort()
    .map((decision) => [decision, audit.terms.filter((term) => term.decision === decision).length])
);

assert.ok(counts.external_reuse >= 8, "Audit did not remove enough duplicated vocabulary to be credible");
assert.ok(counts.hwm_contract_gap >= 5, "Audit did not identify the remaining behavioral contract surface");
assert.equal(counts.provisional_pending_mapping ?? 0, 0, "Core still claims a provisional IEC-owned domain term");
assert.equal(audit.terms.find((term) => term.term_id === "hwm:FunctionalSlot").decision, "hwm_application_profile", "Functional position must remain an IEC-bound Profile role, not an HWM class");
assert.equal(audit.terms.find((term) => term.term_id === "hwm:fulfills").decision, "do_not_standardize", "Generic fulfills must not conflate realization and goal satisfaction");

console.log("TERM MAPPING OK", `${audit.terms.length} terms/relations`, JSON.stringify(counts));
