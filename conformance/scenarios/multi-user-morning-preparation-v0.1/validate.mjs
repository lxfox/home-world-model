import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fixtureDir = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtureDir, name), "utf8"));

const manifest = read("manifest.json");
const envelopes = read("claims.json");
const records = read("records.json");
const view = read("world-view.before.json");
const pumpTrace = read("pump-action-trace.expected.json");
const hvacTrace = read("hvac-action-trace.expected.json");
const oracle = read("oracle.expected.json");

const claims = envelopes.map((envelope) => envelope.claim);
const claimsById = new Map(claims.map((claim) => [claim.claim_id, claim]));
const recordsById = new Map(records.map((record) => [record.record_id, record]));
const resolutionsById = new Map(view.resolutions.map((resolution) => [resolution.resolution_id, resolution]));

assert.equal(claimsById.size, claims.length, "Claim identifiers must be unique");
assert.equal(recordsById.size, records.length, "Record identifiers must be unique");
assert.equal(resolutionsById.size, view.resolutions.length, "Resolution identifiers must be unique");
assert.equal(view.household_id, manifest.household_id, "World View household mismatch");
assert.equal(view.authority_epoch, manifest.authority.epoch, "World View Authority epoch mismatch");

for (const resource of manifest.resources) {
  const bytes = fs.readFileSync(path.join(fixtureDir, resource.id));
  const algorithm = resource.integrity.algorithm.replace("-", "");
  const actual = crypto.createHash(algorithm).update(bytes).digest("hex");
  assert.equal(actual, resource.integrity.digest, `Digest mismatch: ${resource.id}`);
}

const evidenceLinkIds = new Set();
for (const envelope of envelopes) {
  const { claim } = envelope;
  assert.equal(claim.scope.household_id, manifest.household_id, `Claim household mismatch: ${claim.claim_id}`);
  assert.ok(recordsById.has(claim.creation_record_id), `Missing creation Record: ${claim.creation_record_id}`);
  for (const link of envelope.evidence_links) {
    assert.ok(!evidenceLinkIds.has(link.link_id), `Duplicate Evidence Link: ${link.link_id}`);
    evidenceLinkIds.add(link.link_id);
    assert.ok(recordsById.has(link.record_id), `Missing Evidence Record: ${link.record_id}`);
  }
}

const candidateIds = new Set();
for (const resolution of view.resolutions) {
  if (resolution.availability_status !== "available") {
    assert.equal(resolution.candidates.length, 0, `${resolution.availability_status} must disclose no Candidate`);
    assert.equal(resolution.epistemic_status, "not_evaluated", "Unavailable result must not assert epistemic truth");
  } else {
    assert.notEqual(resolution.epistemic_status, "not_evaluated", "Available result must expose an epistemic judgment");
  }

  for (const candidate of resolution.candidates) {
    assert.ok(!candidateIds.has(candidate.candidate_id), `Duplicate Candidate: ${candidate.candidate_id}`);
    candidateIds.add(candidate.candidate_id);
    for (const claimId of candidate.claim_ids) {
      const claim = claimsById.get(claimId);
      assert.ok(claim, `Unknown Candidate Claim: ${claimId}`);
      assert.equal(resolution.subject, claim.proposition.subject, `Candidate subject mismatch: ${candidate.candidate_id}`);
      assert.equal(resolution.predicate, claim.proposition.predicate, `Candidate predicate mismatch: ${candidate.candidate_id}`);
    }
    if (candidate.claim_ids.length === 1) {
      assert.deepEqual(
        candidate.object,
        claimsById.get(candidate.claim_ids[0]).proposition.object,
        `Materialized Candidate mismatch: ${candidate.candidate_id}`,
      );
    }
    for (const recordId of candidate.evidence_record_ids) {
      assert.ok(recordsById.has(recordId), `Unknown Candidate Evidence Record: ${recordId}`);
    }
  }
}

const deniedIdentity = resolutionsById.get(oracle.privacy.resolution_id);
assert.ok(deniedIdentity, "Privacy oracle Resolution missing");
assert.equal(deniedIdentity.availability_status, oracle.privacy.availability_status);
assert.equal(deniedIdentity.epistemic_status, oracle.privacy.epistemic_status);
assert.equal(deniedIdentity.candidates.length, oracle.privacy.candidate_count);
assert.ok(
  !JSON.stringify(view).includes("individual-shower-event"),
  "World View leaked a hidden person-level source identifier",
);
console.log("PRIVACY OK", "person-level future activity denied with zero Candidates");

const conflict = view.conflicts.find((item) => item.conflict_id === oracle.preference_conflict.conflict_id);
assert.ok(conflict, "Preference conflict missing");
const preferenceResolutionIds = [
  "urn:hwm:resolution:resident-a-temperature-preference",
  "urn:hwm:resolution:resident-b-temperature-preference",
];
const preferenceResolutions = preferenceResolutionIds.map((id) => resolutionsById.get(id));
assert.deepEqual(
  preferenceResolutions.map((result) => result.epistemic_status),
  oracle.preference_conflict.epistemic_statuses,
);
assert.deepEqual(
  preferenceResolutions.map((result) => result.applicability.status),
  oracle.preference_conflict.applicability_statuses,
);
for (const result of preferenceResolutions) {
  assert.ok(result.applicability.conflict_ids.includes(conflict.conflict_id), "Preference does not reference visible conflict");
}
const [rangeA, rangeB] = preferenceResolutions.map((result) => result.candidates[0].object.range);
assert.ok(rangeA.minimum > rangeB.maximum || rangeB.minimum > rangeA.maximum, "Fixture preferences unexpectedly overlap");
console.log("PREFERENCE OK", "both Claims accepted while applicability remains conflicting");

function assertTraceReferences(trace) {
  assert.equal(trace.household_id, manifest.household_id, `Trace household mismatch: ${trace.trace_id}`);
  assert.equal(trace.based_on_view_id, view.view_id, `Trace View mismatch: ${trace.trace_id}`);
  assert.equal(trace.authorization.authority_epoch, manifest.authority.epoch, `Trace epoch mismatch: ${trace.trace_id}`);
  assert.ok(Number.isInteger(trace.trace_revision) && trace.trace_revision >= 1, `Invalid Trace revision: ${trace.trace_id}`);
  assert.ok(new Date(trace.known_through) <= new Date(trace.generated_at), `Trace knows future Records: ${trace.trace_id}`);

  for (const claimId of [
    ...trace.intent.goal_claim_ids,
    ...trace.proposal.effect_claim_ids,
    ...trace.effect_assessments.map((item) => item.effect_claim_id),
    ...trace.goal_evaluations.map((item) => item.goal_claim_id),
    ...trace.resource_assessments.map((item) => item.resource_claim_id),
  ]) {
    assert.ok(claimsById.has(claimId), `Unknown Trace Claim: ${claimId}`);
  }

  const referencedRecordIds = [
    trace.authorization.record_id,
    ...(trace.execution.dispatch_record_id ? [trace.execution.dispatch_record_id] : []),
    ...(trace.execution.acknowledgement ? [trace.execution.acknowledgement.record_id] : []),
    ...trace.observation_record_ids,
    ...trace.effect_assessments.flatMap((item) => item.observation_record_ids),
    ...trace.goal_evaluations.flatMap((item) => item.observation_record_ids),
    ...trace.resource_assessments.flatMap((item) => item.observation_record_ids),
    ...trace.user_attestation_record_ids,
    ...trace.recovery_record_ids,
  ];
  for (const recordId of new Set(referencedRecordIds)) {
    const record = recordsById.get(recordId);
    assert.ok(record, `Unknown Trace Record: ${recordId}`);
    assert.ok(new Date(record.recorded_at) <= new Date(trace.known_through), `Trace includes late Record: ${recordId}`);
  }
}

assertTraceReferences(pumpTrace);
assertTraceReferences(hvacTrace);
assert.equal(pumpTrace.intent.intent_id, hvacTrace.intent.intent_id, "Two proposals must share the morning Intent");

assert.equal(pumpTrace.authorization.decision, oracle.pump.authorization);
assert.equal(pumpTrace.execution.status, oracle.pump.execution);
assert.equal(pumpTrace.execution.acknowledgement.status, oracle.pump.acknowledgement);
assert.deepEqual(pumpTrace.effect_assessments.map((item) => item.status), oracle.pump.effect_assessments);
assert.deepEqual(pumpTrace.goal_evaluations.map((item) => item.status), oracle.pump.goal_evaluations);
assert.deepEqual(pumpTrace.resource_assessments.map((item) => item.status), oracle.pump.resource_assessments);

for (const assessment of pumpTrace.effect_assessments) {
  const effect = claimsById.get(assessment.effect_claim_id).proposition.object;
  const observation = recordsById.get(assessment.observation_record_ids[0]).payload;
  assert.equal(observation.property, effect.property, `Effect property mismatch: ${assessment.effect_claim_id}`);
  assert.equal(observation.result.unit, effect.expected_range.unit, `Effect unit mismatch: ${assessment.effect_claim_id}`);
  assert.ok(
    observation.result.value >= effect.expected_range.minimum && observation.result.value <= effect.expected_range.maximum,
    `Effect observation outside predicted range: ${assessment.effect_claim_id}`,
  );
}

for (const evaluation of pumpTrace.goal_evaluations) {
  const requirement = claimsById.get(evaluation.goal_claim_id).proposition.object;
  const observation = recordsById.get(evaluation.observation_record_ids[0]).payload.result;
  const satisfied = requirement.comparator === ">="
    ? observation.value >= requirement.threshold.value
    : observation.value <= requirement.threshold.value;
  assert.ok(satisfied, `Goal not actually satisfied: ${evaluation.goal_claim_id}`);
}

const resourceAssessment = pumpTrace.resource_assessments[0];
const resourceConstraint = claimsById.get(resourceAssessment.resource_claim_id).proposition.object;
const resourceObservation = recordsById.get(resourceAssessment.observation_record_ids[0]).payload.result;
assert.equal(resourceObservation.unit, resourceConstraint.maximum.unit, "Resource unit mismatch");
assert.ok(resourceObservation.value <= resourceConstraint.maximum.value, "Resource constraint exceeded");
assert.deepEqual(resourceObservation, oracle.hindsight.resource_cost);
console.log("PUMP OK", "three effects consistent, two goals satisfied, energy within limit");

assert.equal(hvacTrace.authorization.decision, oracle.hvac.authorization);
assert.equal(hvacTrace.execution.status, oracle.hvac.execution);
assert.equal("dispatch_record_id" in hvacTrace.execution, false, "Undispatched HVAC Trace contains a dispatch Record");
assert.equal("acknowledgement" in hvacTrace.execution, false, "Undispatched HVAC Trace contains device acknowledgement");
assert.equal("device_failure" in hvacTrace, oracle.hvac.device_failure, "Authorization outcome was mislabeled as device failure");
assert.deepEqual(hvacTrace.goal_evaluations.map((item) => item.status), oracle.hvac.goal_evaluations);
console.log("HVAC OK", "confirmation required, not dispatched, no device failure");

const forecastClaim = claimsById.get("urn:hwm:claim:morning-hot-water-demand-forecast");
const realizationRecord = recordsById.get("urn:hwm:record:no-shower-observed");
assert.equal(forecastClaim.proposition.object.probability, oracle.hindsight.forecast_probability);
assert.equal(realizationRecord.payload.realization, oracle.hindsight.realization);
assert.equal(realizationRecord.payload.semantic_relation, oracle.hindsight.forecast_relation);
const forecastEnvelope = envelopes.find((envelope) => envelope.claim.claim_id === forecastClaim.claim_id);
assert.ok(!forecastEnvelope.evidence_links.some((link) => link.relation === "refutes"), "One probabilistic realization must not refute the forecast");
assert.deepEqual(pumpTrace.effect_assessments.map((item) => item.status), oracle.hindsight.pump_effect_assessments_remain);
assert.deepEqual(pumpTrace.goal_evaluations.map((item) => item.status), oracle.hindsight.pump_goal_evaluations_remain);
assert.ok(new Date(realizationRecord.recorded_at) > new Date(pumpTrace.generated_at), "Hindsight Record must arrive after pump Trace revision");
console.log("HINDSIGHT OK", "non-occurrence retained as calibration sample, not action failure");

assert.deepEqual(JSON.parse(JSON.stringify(manifest)).extensions, manifest.extensions, "Manifest extensions were not preserved");
console.log(
  "MORNING FIXTURE OK",
  `${claims.length} Claims, ${records.length} Records, ${view.resolutions.length} Resolutions, 2 Action Traces`,
);
