import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));

export function resolveSelection(testCase) {
  const eligible = testCase.selections
    .filter((item) => item.issued_at <= testCase.as_of)
    .sort((left, right) => left.issued_at.localeCompare(right.issued_at) || left.claim_id.localeCompare(right.claim_id));
  const history = eligible.map((item) => item.claim_id);
  const byId = new Map(eligible.map((item) => [item.claim_id, item]));

  if (byId.size !== eligible.length) {
    return {status: "integrity_conflict", current_claim_ids: [], current_option_ids: [], history_claim_ids: history, reason_codes: ["duplicate_selection_claim_id"]};
  }
  if (eligible.some((item) => item.replaces_claim_id && !byId.has(item.replaces_claim_id))) {
    return {status: "indeterminate", current_claim_ids: [], current_option_ids: [], history_claim_ids: history, reason_codes: ["replacement_target_unavailable"]};
  }

  for (const start of eligible) {
    const seen = new Set();
    let cursor = start;
    while (cursor?.replaces_claim_id) {
      if (seen.has(cursor.claim_id)) {
        return {status: "integrity_conflict", current_claim_ids: [], current_option_ids: [], history_claim_ids: history, reason_codes: ["replacement_cycle"]};
      }
      seen.add(cursor.claim_id);
      cursor = byId.get(cursor.replaces_claim_id);
    }
  }

  const replaced = new Set(eligible.flatMap((item) => item.replaces_claim_id ? [item.replaces_claim_id] : []));
  const heads = eligible.filter((item) => !replaced.has(item.claim_id));
  const currentClaimIds = heads.map((item) => item.claim_id).sort();
  const currentOptionIds = heads.map((item) => item.chosen_option_id).sort();
  if (heads.length === 1) {
    return {status: "accepted", current_claim_ids: currentClaimIds, current_option_ids: currentOptionIds, history_claim_ids: history, reason_codes: []};
  }
  if (heads.length > 1) {
    return {status: "conflicting", current_claim_ids: currentClaimIds, current_option_ids: currentOptionIds, history_claim_ids: history, reason_codes: ["multiple_unreplaced_selection_heads"]};
  }
  return {status: "indeterminate", current_claim_ids: [], current_option_ids: [], history_claim_ids: history, reason_codes: ["no_current_selection"]};
}

export function admitRecommendation(testCase) {
  const empty = (status, reason) => ({status, emitted_recommendation_ids: [], reason_codes: [reason]});
  if (testCase.context_kind !== "comparison") return empty("invalid_context", "cross_branch_use_outside_comparison");
  if (new Set(testCase.input_context_ids).size !== testCase.input_context_ids.length) return empty("invalid_context", "duplicate_declared_input");

  const resolutionIds = testCase.input_resolutions.map((item) => item.context_id);
  if (new Set(resolutionIds).size !== resolutionIds.length) return empty("invalid_context", "duplicate_input_resolution");
  const declared = new Set(testCase.input_context_ids);
  if (resolutionIds.some((id) => !declared.has(id))) return empty("invalid_context", "undeclared_input_present");
  if (testCase.input_context_ids.some((id) => !resolutionIds.includes(id))) return empty("indeterminate", "declared_input_missing");

  const checks = [
    ["availability_status", ["available"], "input_not_available"],
    ["epistemic_status", ["accepted"], "input_not_accepted"],
    ["freshness_status", ["current"], "input_not_current"],
    ["temporal_status", ["in_effect", "unbounded"], "input_not_in_effect"],
    ["applicability_status", ["applicable"], "input_not_applicable"]
  ];
  for (const [field, accepted, reason] of checks) {
    if (testCase.input_resolutions.some((item) => !accepted.includes(item[field]))) return empty("indeterminate", reason);
  }
  return {status: "ready", emitted_recommendation_ids: [testCase.proposed_recommendation_id], reason_codes: []};
}

export function resolveDependencyClosure(testCase) {
  const preserved = testCase.output_candidates.map((item) => item.output_id).sort();
  const result = (contextStatus, rootBaseContextId, admitted, reasonCodes) => ({
    context_status: contextStatus,
    root_base_context_id: rootBaseContextId,
    admitted_current_output_ids: admitted.sort(),
    package_preserved_output_ids: preserved,
    reason_codes: reasonCodes
  });
  const contextsById = new Map(testCase.contexts.map((item) => [item.context_id, item]));
  if (contextsById.size !== testCase.contexts.length) return result("integrity_conflict", null, [], ["duplicate_context_id"]);

  const revisionEdges = testCase.lineage_edges.filter((item) => item.predicate === "prov:wasRevisionOf");
  const revisionParent = new Map();
  for (const edge of revisionEdges) {
    if (revisionParent.has(edge.derived_context_id)) return result("invalid_context", null, [], ["multiple_revision_parents"]);
    revisionParent.set(edge.derived_context_id, edge.source_context_id);
  }
  for (const contextId of contextsById.keys()) {
    const seen = new Set();
    let cursor = contextId;
    while (revisionParent.has(cursor)) {
      if (seen.has(cursor)) return result("integrity_conflict", null, [], ["revision_cycle"]);
      seen.add(cursor);
      cursor = revisionParent.get(cursor);
    }
  }

  const target = contextsById.get(testCase.target_context_id);
  if (!target || target.context_kind !== "design_option") return result("invalid_context", null, [], ["target_design_option_missing"]);
  const baseEdges = testCase.lineage_edges.filter((item) =>
    item.predicate === "prov:wasDerivedFrom" && item.derived_context_id === testCase.target_context_id
  );
  if (baseEdges.length === 0) return result("invalid_context", null, [], ["missing_base_derivation"]);
  if (baseEdges.length > 1) return result("invalid_context", null, [], ["multiple_base_derivations"]);

  const rootBaseId = baseEdges[0].source_context_id;
  const base = contextsById.get(rootBaseId);
  if (!base) return result("indeterminate", rootBaseId, [], ["base_context_unavailable"]);
  if (base.context_kind !== "base_design") return result("invalid_context", null, [], ["derivation_source_not_base_design"]);

  const unavailableReason = (context, label) => {
    const resolution = context.resolution;
    if (!resolution) return `${label}_resolution_missing`;
    if (resolution.availability_status === "access_denied") return `${label}_access_denied`;
    if (resolution.availability_status === "source_unavailable") {
      if (resolution.reason_codes.includes("source_payload_deleted")) return `${label}_payload_deleted`;
      return `${label}_source_unavailable`;
    }
    if (resolution.availability_status !== "available") return `${label}_not_available`;
    if (resolution.epistemic_status !== "accepted") return `${label}_not_accepted`;
    return null;
  };
  const baseUnavailable = unavailableReason(base, "base");
  if (baseUnavailable) return result("indeterminate", rootBaseId, [], [baseUnavailable]);
  const targetUnavailable = unavailableReason(target, "target");
  if (targetUnavailable) return result("indeterminate", rootBaseId, [], [targetUnavailable]);

  if (rootBaseId !== testCase.current_base_context_id) {
    return result("historical_only", rootBaseId, [], ["derived_from_noncurrent_base"]);
  }

  const isCurrent = (context) => {
    const resolution = context.resolution;
    return resolution.freshness_status === "current"
      && ["in_effect", "unbounded"].includes(resolution.temporal_status)
      && resolution.applicability_status === "applicable";
  };
  if (!isCurrent(base)) return result("indeterminate", rootBaseId, [], ["base_dependency_not_current"]);
  if (!isCurrent(target)) return result("indeterminate", rootBaseId, [], ["target_context_not_current"]);

  const admitted = testCase.output_candidates.filter((output) =>
    output.input_context_bindings.some((binding) =>
      binding.context_id === target.context_id && binding.revision === target.revision
    )
  ).map((item) => item.output_id);
  const reasonCodes = admitted.length < testCase.output_candidates.length ? ["historical_output_not_carried_forward"] : [];
  return result("ready", rootBaseId, admitted, reasonCodes);
}

export function admitComparisonLineage(testCase) {
  const empty = (status, reason) => ({status, root_base_context_id: null, emitted_recommendation_ids: [], reason_codes: [reason]});
  const declared = testCase.input_context_ids;
  if (new Set(declared).size !== declared.length) return empty("invalid_context", "duplicate_declared_input");
  const closureIds = testCase.branch_closures.map((item) => item.context_id);
  if (new Set(closureIds).size !== closureIds.length) return empty("invalid_context", "duplicate_branch_closure");
  if (closureIds.some((id) => !declared.includes(id))) return empty("invalid_context", "undeclared_branch_closure");
  if (declared.some((id) => !closureIds.includes(id))) return empty("indeterminate", "branch_closure_missing");
  if (testCase.branch_closures.some((item) => ["invalid_context", "integrity_conflict"].includes(item.context_status))) {
    return empty("invalid_context", "branch_context_invalid");
  }
  if (testCase.branch_closures.some((item) => item.context_status === "historical_only")) return empty("indeterminate", "branch_not_current");
  if (testCase.branch_closures.some((item) => item.context_status !== "ready")) return empty("indeterminate", "branch_dependency_indeterminate");
  if (testCase.branch_closures.some((item) => !item.root_base_context_id)) return empty("indeterminate", "branch_root_missing");
  const roots = new Set(testCase.branch_closures.map((item) => item.root_base_context_id));
  if (roots.size !== 1) return empty("invalid_context", "comparison_inputs_do_not_share_base");
  const [root] = roots;
  return {status: "ready", root_base_context_id: root, emitted_recommendation_ids: [testCase.proposed_recommendation_id], reason_codes: []};
}

const selectionCases = read("selection-cases.json").cases;
const comparisonCases = read("comparison-cases.json").cases;
const dependencyCases = read("dependency-cases.json").cases;
const comparisonLineageCases = read("comparison-lineage-cases.json").cases;
const externalSelection = read("selection-revision.external.jsonld");
const externalBaseRevision = read("base-revision.external.jsonld");
for (const testCase of selectionCases) assert.deepEqual(resolveSelection(testCase), testCase.expected, testCase.case_id);
for (const testCase of comparisonCases) assert.deepEqual(admitRecommendation(testCase), testCase.expected, testCase.case_id);
for (const testCase of dependencyCases) assert.deepEqual(resolveDependencyClosure(testCase), testCase.expected, testCase.case_id);
for (const testCase of comparisonLineageCases) assert.deepEqual(admitComparisonLineage(testCase), testCase.expected, testCase.case_id);

const before = resolveSelection(selectionCases.find((item) => item.case_id === "selection-before-revision"));
const after = resolveSelection(selectionCases.find((item) => item.case_id === "selection-after-revision"));
assert.equal(before.current_option_ids[0], "urn:hwm:design-option:reading-light-a");
assert.equal(after.current_option_ids[0], "urn:hwm:design-option:reading-light-b");
assert.ok(after.history_claim_ids.includes("urn:hwm:claim:homeowner-selects-option-a"), "Revision erased prior choice history");
assert.ok(comparisonCases.filter((item) => item.expected.status !== "ready").every((item) => item.expected.emitted_recommendation_ids.length === 0));

const externalGraph = new Map(externalSelection["@graph"].map((item) => [item["@id"], item]));
const laterState = externalGraph.get("urn:hwm:claim:homeowner-selects-option-b-revision-1");
assert.equal(laterState["dcterms:replaces"]["@id"], "urn:hwm:claim:homeowner-selects-option-a");
assert.equal(externalGraph.get("urn:hwm:choice:homeowner-reading-light-1")["schema:object"]["@id"], "urn:hwm:design-option:reading-light-a");
assert.equal(externalGraph.get("urn:hwm:choice:homeowner-reading-light-2")["schema:object"]["@id"], "urn:hwm:design-option:reading-light-b");
const externalText = JSON.stringify(externalSelection);
assert.ok(!externalText.includes("hwm-planning:"));
assert.ok(!externalText.includes("BuyAction"));

const baseRevisionGraph = new Map(externalBaseRevision["@graph"].map((item) => [item["@id"], item]));
assert.equal(baseRevisionGraph.get("urn:hwm:base:r3")["prov:wasRevisionOf"]["@id"], "urn:hwm:base:r2");
assert.equal(baseRevisionGraph.get("urn:hwm:design-option:a-r2")["prov:wasRevisionOf"]["@id"], "urn:hwm:design-option:a-r1");
assert.equal(baseRevisionGraph.get("urn:hwm:design-option:a-r2")["prov:wasDerivedFrom"]["@id"], "urn:hwm:base:r3");
assert.equal(baseRevisionGraph.get("urn:hwm:simulation-activity:a-r2")["prov:used"]["@id"], "urn:hwm:design-option:a-r2");
assert.ok(!JSON.stringify(externalBaseRevision).includes("hwm-planning:"));

console.log("SELECTION REVISION OK", `${selectionCases.length} as-of, fork, cycle, and unavailable-target cases`);
console.log("COMPARISON FAIL-CLOSED OK", `${comparisonCases.length} closed-input cases, including a complete three-branch comparison`);
console.log("DEPENDENCY CLOSURE OK", `${dependencyCases.length} base availability, deletion, revision, rebase, and lineage-integrity cases`);
console.log("COMPARISON LINEAGE OK", `${comparisonLineageCases.length} shared-root and mixed-base cases`);
console.log("PLANNING BRANCH RESOLUTION OK", "profile gates admission but does not choose the recommended option");
