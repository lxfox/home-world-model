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
const before = read("world-view.before-replacement.json");
const after = read("world-view.after-replacement.json");
const trace1 = read("action-trace.revision-1.json");
const trace2 = read("action-trace.revision-2.json");
const collisionInput = read("claim-id-collision.input.json");

const claims = envelopes.map((envelope) => envelope.claim);
const claimsById = new Map(claims.map((claim) => [claim.claim_id, claim]));
const recordsById = new Map(records.map((record) => [record.record_id, record]));

assert.equal(claimsById.size, claims.length, "Canonical package contains duplicate Claim identifiers");
assert.equal(recordsById.size, records.length, "Canonical package contains duplicate Record identifiers");
assert.equal(before.household_id, manifest.household_id);
assert.equal(after.household_id, manifest.household_id);
assert.equal(before.authority_epoch, manifest.authority.epoch);
assert.equal(after.authority_epoch, manifest.authority.epoch);

for (const resource of manifest.resources) {
  const bytes = fs.readFileSync(path.join(fixtureDir, resource.id));
  const algorithm = resource.integrity.algorithm.replace("-", "");
  const actual = crypto.createHash(algorithm).update(bytes).digest("hex");
  assert.equal(actual, resource.integrity.digest, `Digest mismatch: ${resource.id}`);
}

const evidenceLinkIds = new Set();
for (const envelope of envelopes) {
  assert.equal(envelope.claim.scope.household_id, manifest.household_id);
  assert.ok(recordsById.has(envelope.claim.creation_record_id), `Missing creation Record: ${envelope.claim.claim_id}`);
  const time = envelope.claim.valid_time;
  if (time?.from && time?.to) {
    assert.ok(new Date(time.from) < new Date(time.to), `Invalid half-open interval: ${envelope.claim.claim_id}`);
  }
  if (time?.at) {
    assert.equal("from" in time || "to" in time, false, `Instant mixed with interval: ${envelope.claim.claim_id}`);
  }
  for (const link of envelope.evidence_links) {
    assert.ok(!evidenceLinkIds.has(link.link_id), `Duplicate Evidence Link: ${link.link_id}`);
    evidenceLinkIds.add(link.link_id);
    assert.ok(recordsById.has(link.record_id), `Missing Evidence Record: ${link.record_id}`);
  }
}

function expectedTemporalStatus(claim, asOfText) {
  if (!claim.valid_time) return "unbounded";
  const asOf = new Date(asOfText);
  const { at, from, to } = claim.valid_time;
  if (at) {
    const instant = new Date(at);
    if (asOf < instant) return "not_yet_in_effect";
    if (asOf > instant) return "expired";
    return "in_effect";
  }
  if (from && asOf < new Date(from)) return "not_yet_in_effect";
  if (to && asOf >= new Date(to)) return "expired";
  return "in_effect";
}

function assertView(view) {
  const candidateIds = new Set();
  for (const resolution of view.resolutions) {
    if (resolution.availability_status !== "available") {
      assert.equal(resolution.candidates.length, 0);
      assert.equal(resolution.epistemic_status, "not_evaluated");
      assert.equal(resolution.temporal_status, "indeterminate");
      continue;
    }
    const candidateTemporalStatuses = new Set();
    for (const candidate of resolution.candidates) {
      assert.ok(!candidateIds.has(candidate.candidate_id), `Duplicate Candidate: ${candidate.candidate_id}`);
      candidateIds.add(candidate.candidate_id);
      for (const claimId of candidate.claim_ids) {
        const claim = claimsById.get(claimId);
        assert.ok(claim, `Unknown Candidate Claim: ${claimId}`);
        assert.equal(claim.proposition.subject, resolution.subject);
        assert.equal(claim.proposition.predicate, resolution.predicate);
        candidateTemporalStatuses.add(expectedTemporalStatus(claim, view.as_of));
      }
      if (candidate.claim_ids.length === 1) {
        assert.deepEqual(candidate.object, claimsById.get(candidate.claim_ids[0]).proposition.object);
      }
      for (const recordId of candidate.evidence_record_ids) {
        assert.ok(recordsById.has(recordId), `Unknown Candidate Evidence Record: ${recordId}`);
      }
    }
    const expected = candidateTemporalStatuses.size > 1
      ? "mixed"
      : [...candidateTemporalStatuses][0];
    assert.equal(resolution.temporal_status, expected, `Temporal status mismatch: ${resolution.resolution_id}`);
  }
}

assertView(before);
assertView(after);

const beforeById = new Map(before.resolutions.map((item) => [item.resolution_id, item]));
const afterById = new Map(after.resolutions.map((item) => [item.resolution_id, item]));
const slotBefore = beforeById.get("urn:hwm:resolution:lifecycle-slot-before");
const slotAfter = afterById.get("urn:hwm:resolution:lifecycle-slot-after");
const requirementBefore = beforeById.get("urn:hwm:resolution:lifecycle-requirement-before");
const requirementAfter = afterById.get("urn:hwm:resolution:lifecycle-requirement-after");
assert.deepEqual(slotBefore.candidates[0].claim_ids, slotAfter.candidates[0].claim_ids, "Functional Slot identity changed");
assert.deepEqual(requirementBefore.candidates[0], { ...requirementAfter.candidates[0], candidate_id: requirementBefore.candidates[0].candidate_id }, "Requirement did not survive replacement");
assert.equal(beforeById.get("urn:hwm:resolution:old-fulfillment-before").temporal_status, "in_effect");
assert.equal(afterById.get("urn:hwm:resolution:old-fulfillment-after").freshness_status, "current");
assert.equal(afterById.get("urn:hwm:resolution:old-fulfillment-after").temporal_status, "expired");
assert.equal(afterById.get("urn:hwm:resolution:lifecycle-slot-after").freshness_status, "stale");
assert.equal(afterById.get("urn:hwm:resolution:lifecycle-slot-after").temporal_status, "unbounded");
assert.ok(!claims.some((claim) => claim.proposition.predicate.includes("equivalent")), "Replacement was incorrectly modeled as equivalence");
console.log("CONTINUITY OK", "stable slot and requirement, replaceable asset and endpoint");
console.log("TIME AXES OK", "current+expired and stale+unbounded remain distinguishable");

const tombstone = recordsById.get("urn:hwm:record:raw-calibration-tombstone");
const deletedRecordId = tombstone.payload.target_record_id;
assert.ok(!recordsById.has(deletedRecordId), "Deleted sensitive payload is still present");
assert.ok(recordsById.has(tombstone.payload.authorized_by_record_id), "Tombstone lacks authorization Record");
assert.ok(!/(image|sample_values|pixels)/i.test(JSON.stringify(tombstone.payload)), "Tombstone leaks deleted payload details");
const deletedResolution = afterById.get("urn:hwm:resolution:raw-calibration-payload-after");
assert.equal(deletedResolution.availability_status, "source_unavailable");
assert.ok(deletedResolution.reason_codes.includes("tombstone_retained"));
console.log("TOMBSTONE OK", "raw payload absent, authorization and non-sensitive tombstone retained");

const collisionBodies = new Map();
let collisionDetected = false;
for (const envelope of collisionInput) {
  const body = JSON.stringify(envelope.claim);
  const previous = collisionBodies.get(envelope.claim.claim_id);
  if (previous !== undefined && previous !== body) collisionDetected = true;
  collisionBodies.set(envelope.claim.claim_id, body);
}
assert.equal(collisionDetected, true, "Adversarial Claim identifier collision was not detected");
assert.equal(claimsById.get("urn:hwm:claim:new-asset-fulfills-slot").proposition.object, "urn:hwm:slot:lifecycle-reading-light", "Collision mutated canonical Claim");
console.log("COLLISION OK", "same Claim ID with different body rejected as integrity conflict");

assert.equal(trace1.trace_id, trace2.trace_id);
assert.equal(trace1.trace_revision, 1);
assert.equal(trace2.trace_revision, 2);
assert.deepEqual(trace1.intent, trace2.intent);
assert.deepEqual(trace1.proposal, trace2.proposal);
assert.deepEqual(trace1.authorization, trace2.authorization);
assert.deepEqual(trace1.execution, trace2.execution);
assert.deepEqual(trace1.observation_record_ids, []);
assert.equal(trace1.effect_assessments[0].status, "insufficient_evidence");
assert.equal(trace1.goal_evaluations[0].status, "indeterminate");

const lateObservation = recordsById.get("urn:hwm:record:lifecycle-late-observation");
assert.ok(new Date(lateObservation.observed_at) < new Date(trace1.generated_at), "Observation event was not physically earlier");
assert.ok(new Date(lateObservation.recorded_at) > new Date(trace1.known_through), "Observation was not late to revision 1");
assert.deepEqual(trace2.observation_record_ids, [lateObservation.record_id]);
assert.equal(trace2.effect_assessments[0].status, "consistent");
assert.equal(trace2.goal_evaluations[0].status, "satisfied");
const effect = claimsById.get("urn:hwm:claim:new-endpoint-effect").proposition.object.expected_range;
const result = lateObservation.payload.result;
assert.ok(result.value >= effect.minimum && result.value <= effect.maximum);
assert.ok(result.value >= claimsById.get("urn:hwm:claim:lifecycle-reading-requirement").proposition.object.threshold.value);
console.log("LATE REVISION OK", "revision 1 preserved; revision 2 incorporates late-known observation");

console.log("LIFECYCLE FIXTURE OK", `${claims.length} Claims, ${records.length} Records, 2 Views, 2 Trace revisions`);
