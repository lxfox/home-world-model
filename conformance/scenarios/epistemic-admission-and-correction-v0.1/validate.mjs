import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));

const attestationKinds = new Set(["household_attestation", "interaction_attestation"]);

function unique(values) {
  return [...new Set(values)];
}

function stableObjectKey(value) {
  return JSON.stringify(value, Object.keys(value ?? {}).sort());
}

function pathSatisfied(pathRule, evidence) {
  const episodeIds = pathRule.same_episode
    ? unique(evidence.map((item) => item.episode_id).filter(Boolean))
    : [null];
  return episodeIds.some((episodeId) => {
    const scoped = episodeId ? evidence.filter((item) => item.episode_id === episodeId) : evidence;
    const requirementEvidence = [];
    for (const requirement of pathRule.requirements) {
      const matching = scoped.filter((item) => item.evidence_kind === requirement.kind);
      const distinctOrigins = unique(matching.map((item) => item.origin_id));
      if (distinctOrigins.length < requirement.minimum_distinct_origins) return false;
      requirementEvidence.push(...matching);
    }
    return unique(requirementEvidence.map((item) => item.origin_id)).length >= pathRule.minimum_total_distinct_origins;
  });
}

export function resolveAdmission(testCase) {
  const claims = testCase.claims
    .filter((item) => item.issued_at <= testCase.as_of)
    .sort((left, right) => left.claim_id.localeCompare(right.claim_id));
  assert.equal(new Set(claims.map((item) => item.claim_id)).size, claims.length, `${testCase.case_id}: duplicate Claim identifier`);
  const historyClaimIds = claims.map((item) => item.claim_id);
  const ignoredReasons = [];
  const eligibleEvidence = testCase.evidence.filter((item) => {
    if (!item.authorized) {
      ignoredReasons.push("unauthorized_evidence_ignored");
      return false;
    }
    if (!item.valid) {
      ignoredReasons.push("invalid_evidence_ignored");
      return false;
    }
    if (!item.scope_match) {
      ignoredReasons.push("evidence_scope_mismatch");
      return false;
    }
    if (attestationKinds.has(item.evidence_kind) && item.question_bound !== true) {
      ignoredReasons.push("unbound_attestation_ignored");
      return false;
    }
    return true;
  });

  const evidenceFor = (claimId) => eligibleEvidence.filter((item) => item.target_claim_id === claimId);
  const positiveFor = (claimId) => evidenceFor(claimId).filter((item) => ["supports", "confirms"].includes(item.relation));
  const refutingFor = (claimId) => evidenceFor(claimId).filter((item) => item.relation === "refutes");
  const retracted = new Set(eligibleEvidence.filter((item) => item.relation === "retracts").map((item) => item.target_claim_id));
  const qualified = claims.filter((claim) => !retracted.has(claim.claim_id) && testCase.policy.accepted_paths.some((pathRule) => pathSatisfied(pathRule, positiveFor(claim.claim_id))));
  const qualifiedIds = new Set(qualified.map((item) => item.claim_id));
  const superseded = new Set(qualified.flatMap((item) => item.supersedes_claim_id ? [item.supersedes_claim_id] : []));
  const activeClaims = claims.filter((item) => !retracted.has(item.claim_id) && !superseded.has(item.claim_id));
  const activeQualified = activeClaims.filter((item) => qualifiedIds.has(item.claim_id));
  const challenged = activeClaims.filter((item) => positiveFor(item.claim_id).length > 0 && refutingFor(item.claim_id).length > 0);
  const qualifiedObjectKeys = unique(activeQualified.map((item) => stableObjectKey(item.object)));

  let epistemicStatus;
  let currentClaims;
  let reasonCodes;
  if (challenged.length > 0) {
    epistemicStatus = "contested";
    currentClaims = unique([...activeQualified, ...challenged].map((item) => item.claim_id)).map((id) => activeClaims.find((item) => item.claim_id === id));
    reasonCodes = ["positive_and_refuting_evidence"];
  } else if (qualifiedObjectKeys.length > 1) {
    epistemicStatus = "contested";
    currentClaims = activeQualified;
    reasonCodes = ["multiple_qualified_objects"];
  } else if (activeQualified.length > 0) {
    epistemicStatus = "accepted";
    currentClaims = activeQualified;
    reasonCodes = [superseded.size > 0 ? "qualified_superseding_claim" : "admission_path_satisfied"];
  } else {
    const refuted = activeClaims.filter((item) => refutingFor(item.claim_id).length > 0);
    epistemicStatus = refuted.length > 0 ? "unknown" : "not_verified";
    currentClaims = activeClaims;
    reasonCodes = [refuted.length > 0 ? "refutation_without_alternative" : "admission_path_incomplete"];
  }

  currentClaims.sort((left, right) => left.claim_id.localeCompare(right.claim_id));
  const currentIds = new Set(currentClaims.map((item) => item.claim_id));
  const evidenceRecordIds = eligibleEvidence
    .filter((item) => currentIds.has(item.target_claim_id))
    .map((item) => item.record_id)
    .sort();
  return {
    epistemic_status: epistemicStatus,
    current_claim_ids: currentClaims.map((item) => item.claim_id),
    current_objects: currentClaims.map((item) => item.object),
    history_claim_ids: historyClaimIds,
    evidence_record_ids: evidenceRecordIds,
    reason_codes: [...unique(ignoredReasons), ...reasonCodes]
  };
}

const artifact = read("admission-cases.json");
const contestedView = read("world-view.single-candidate-contested.json");
const external = read("interaction.external.jsonld");
const interactionBinding = read("interaction-binding.json");
assert.equal(artifact.artifact, "hwm:EpistemicAdmissionAndCorrectionCases");
assert.equal(artifact.cases.length, 15, "The admission fixture must retain all fifteen boundary cases");
assert.equal(new Set(artifact.cases.map((item) => item.case_id)).size, artifact.cases.length, "Duplicate admission case identifier");
for (const testCase of artifact.cases) {
  assert.deepEqual(resolveAdmission(testCase), testCase.expected, testCase.case_id);
  assert.ok(testCase.must_not_infer.length > 0, `${testCase.case_id}: no forbidden inference`);
}

const oneCandidateContest = artifact.cases.find((item) => item.case_id === "visual-support-plus-user-refutation-is-contested-with-one-candidate");
assert.equal(resolveAdmission(oneCandidateContest).current_claim_ids.length, 1);
assert.equal(contestedView.resolutions[0].epistemic_status, "contested");
assert.equal(contestedView.resolutions[0].candidates.length, 1);
assert.equal(contestedView.conflicts[0].claim_ids.length, 1);
assert.equal(contestedView.conflicts[0].evidence_record_ids.length, 1);

const externalGraph = new Map(external["@graph"].map((item) => [item["@id"], item]));
assert.ok(externalGraph.get("urn:record:camera-frame-1")["@type"].includes("sosa:Observation"));
assert.ok(externalGraph.get("urn:record:night-light-actuation-1")["@type"].includes("sosa:Actuation"));
assert.equal(externalGraph.get("urn:question:night-light-challenge-1")["@type"], "as:Question");
assert.equal(externalGraph.get("urn:record:resident-saw-light-1")["as:target"]["@id"], "urn:claim:endpoint-affects-bedroom-light");
assert.equal(externalGraph.get("urn:annotation:resident-reply-1")["oa:hasTarget"]["@id"], "urn:claim:endpoint-affects-bedroom-light");
assert.ok(!JSON.stringify(external).includes("hwm-interactive:"));
assert.equal(interactionBinding.contract, "hwm:InteractiveEvidenceBinding");
assert.equal(interactionBinding.target.claim_id, "urn:claim:endpoint-affects-bedroom-light");
assert.match(interactionBinding.target.proposition_digest, /^sha256:[0-9a-f]{64}$/);
assert.equal(interactionBinding.response.meaning, interactionBinding.question.response_options.find((item) => item.value === interactionBinding.response.selected_value).meaning);
assert.equal(new Set(interactionBinding.evidence.origin_ids).size, interactionBinding.evidence.origin_ids.length);

const interaction = artifact.cases.find((item) => item.case_id === "bound-interaction-confirmation-admits-narrow-effect-association");
assert.equal(resolveAdmission(interaction).epistemic_status, "accepted");
assert.ok(interaction.must_not_infer.includes("illuminance_requirement_satisfied"));
const correction = resolveAdmission(artifact.cases.find((item) => item.case_id === "qualified-correction-supersedes-current-view-without-erasing-history"));
assert.deepEqual(correction.current_claim_ids, ["urn:claim:night-light-in-corridor"]);
assert.equal(correction.history_claim_ids.length, 2);

const forbidden = new Set(artifact.cases.flatMap((item) => item.must_not_infer));
for (const inference of ["global_fact", "night_light_not_in_bedroom", "physical_effect_observed", "exact_luminaire_pose", "two_independent_observations", "old_claim_deleted"]) {
  assert.ok(forbidden.has(inference), `Missing epistemic guard: ${inference}`);
}

console.log("EPISTEMIC ADMISSION OK", `${artifact.cases.length} cases`, `${forbidden.size} forbidden inferences`);
console.log("SINGLE-CANDIDATE CONTEST OK", "one Claim plus refuting Record remains contested without inventing a negation Claim");
console.log("INTERACTION BOUNDARY OK", "acknowledgement plus exact scoped attestation admits only the asked proposition");
console.log("CORRECTION HISTORY OK", "qualified supersession changes the current View while both Claims remain historical");
console.log("EXTERNAL INTERACTION PROJECTION OK", "SOSA, PROV, Web Annotation, and ActivityStreams carry observation, actuation, question, and reply structure");
