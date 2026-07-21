import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fixtureDir = path.dirname(fileURLToPath(import.meta.url));
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(fixtureDir, name), "utf8"));

const manifest = read("manifest.json");
const envelopes = read("claims.json");
const records = read("records.json");
const before = read("world-view.before.json");
const after = read("world-view.after.expected.json");
const trace = read("action-trace.expected.json");
const oracleCases = read("oracle-cases.json");

const claims = envelopes.map((envelope) => envelope.claim);
const claimsById = new Map(claims.map((claim) => [claim.claim_id, claim]));
const recordsById = new Map(records.map((record) => [record.record_id, record]));
const candidateIds = new Set();

assert.equal(claimsById.size, claims.length, "Claim identifiers must be unique");
assert.equal(recordsById.size, records.length, "Record identifiers must be unique");

for (const resource of manifest.resources) {
  const bytes = fs.readFileSync(path.join(fixtureDir, resource.id));
  const algorithm = resource.integrity.algorithm.replace("-", "");
  const actual = crypto.createHash(algorithm).update(bytes).digest("hex");
  assert.equal(actual, resource.integrity.digest, `Digest mismatch: ${resource.id}`);
}

const evidenceLinkIds = new Set();
for (const envelope of envelopes) {
  const { claim } = envelope;
  assert.ok(
    recordsById.has(claim.creation_record_id),
    `Missing creation Record: ${claim.creation_record_id}`,
  );
  assert.equal(
    claim.scope.household_id,
    manifest.household_id,
    `Household mismatch: ${claim.claim_id}`,
  );

  for (const link of envelope.evidence_links) {
    assert.ok(!evidenceLinkIds.has(link.link_id), `Duplicate Evidence Link: ${link.link_id}`);
    evidenceLinkIds.add(link.link_id);
    assert.ok(recordsById.has(link.record_id), `Missing evidence Record: ${link.record_id}`);
  }
}

for (const view of [before, after]) {
  assert.equal(view.household_id, manifest.household_id, `Household mismatch: ${view.view_id}`);
  assert.equal(view.authority_epoch, manifest.authority.epoch, `Authority epoch mismatch: ${view.view_id}`);

  for (const result of view.resolutions) {
    for (const candidate of result.candidates) {
      assert.ok(!candidateIds.has(candidate.candidate_id), `Duplicate Candidate: ${candidate.candidate_id}`);
      candidateIds.add(candidate.candidate_id);

      for (const claimId of candidate.claim_ids) {
        const claim = claimsById.get(claimId);
        assert.ok(claim, `Unknown Claim in View: ${claimId}`);
        assert.equal(result.subject, claim.proposition.subject, `Subject mismatch: ${result.resolution_id}`);
        assert.equal(result.predicate, claim.proposition.predicate, `Predicate mismatch: ${result.resolution_id}`);
      }
      if (candidate.claim_ids.length === 1) {
        const claim = claimsById.get(candidate.claim_ids[0]);
        assert.deepEqual(candidate.object, claim.proposition.object, `Materialized value mismatch: ${candidate.candidate_id}`);
      }
      for (const recordId of candidate.evidence_record_ids) {
        assert.ok(recordsById.has(recordId), `Unknown Record in View: ${recordId}`);
      }
    }

    if (result.availability_status !== "available") {
      assert.equal(
        result.candidates.length,
        0,
        `${result.availability_status} must not invent or disclose a Candidate`,
      );
      assert.equal(result.epistemic_status, "not_evaluated", "Unavailable knowledge must not claim an epistemic judgment");
    } else {
      assert.notEqual(result.epistemic_status, "not_evaluated", "Available knowledge must expose its epistemic judgment");
    }
  }
}

assert.equal(trace.household_id, manifest.household_id, "Action Trace household mismatch");
assert.ok(Number.isInteger(trace.trace_revision) && trace.trace_revision >= 1, "Invalid Action Trace revision");
assert.equal(trace.based_on_view_id, before.view_id, "Action Trace must cite the pre-action View");
assert.equal(trace.execution.status, "dispatched", "Lighting fixture must dispatch the authorized action");
assert.equal(
  trace.authorization.authority_epoch,
  manifest.authority.epoch,
  "Authorization epoch mismatch",
);

const dispatch = recordsById.get(trace.execution.dispatch_record_id);
const observation = recordsById.get("urn:hwm:record:observation-295-lux");
assert.ok(dispatch, "Dispatch Record is missing");
assert.ok(observation, "Observation Record is missing");
assert.ok(new Date(before.generated_at) < new Date(dispatch.recorded_at), "Pre-action View must precede dispatch");
assert.ok(new Date(after.generated_at) > new Date(observation.observed_at), "Post-action View must follow observation");
assert.ok(new Date(trace.known_through) <= new Date(trace.generated_at), "Trace cannot know Records from its future");

for (const claimId of trace.intent.goal_claim_ids) {
  assert.ok(claimsById.has(claimId), `Unknown goal Claim: ${claimId}`);
}
for (const claimId of trace.proposal.effect_claim_ids) {
  assert.ok(claimsById.has(claimId), `Unknown effect Claim: ${claimId}`);
}
for (const assessment of trace.resource_assessments) {
  assert.ok(claimsById.has(assessment.resource_claim_id), `Unknown resource Claim: ${assessment.resource_claim_id}`);
  for (const recordId of assessment.observation_record_ids) {
    assert.ok(recordsById.has(recordId), `Unknown resource observation Record: ${recordId}`);
  }
}
for (const recordId of [
  trace.authorization.record_id,
  trace.execution.dispatch_record_id,
  trace.execution.acknowledgement.record_id,
  ...trace.observation_record_ids,
  ...trace.user_attestation_record_ids,
  ...trace.recovery_record_ids,
]) {
  assert.ok(recordsById.has(recordId), `Unknown Action Trace Record: ${recordId}`);
  assert.ok(
    new Date(recordsById.get(recordId).recorded_at) <= new Date(trace.known_through),
    `Action Trace includes a Record after known_through: ${recordId}`,
  );
}

const effectRange = claimsById.get("urn:hwm:claim:set-level-60-effect").proposition.object.expected_range;
const requirement = claimsById.get("urn:hwm:claim:reading-zone-requirement").proposition.object.threshold;

for (const oracleCase of oracleCases) {
  const observed = oracleCase.observation?.value;
  const effectStatus =
    observed === undefined
      ? "insufficient_evidence"
      : observed >= effectRange.minimum && observed <= effectRange.maximum
        ? "consistent"
        : "inconsistent";
  const goalStatus =
    observed === undefined
      ? "indeterminate"
      : observed >= requirement.value
        ? "satisfied"
        : "not_satisfied";

  assert.equal(effectStatus, oracleCase.expected_effect_assessment, `${oracleCase.case_id}: effect`);
  assert.equal(goalStatus, oracleCase.expected_goal_evaluation, `${oracleCase.case_id}: goal`);
  console.log("ORACLE OK", oracleCase.case_id, effectStatus, goalStatus);
}

assert.deepEqual(
  JSON.parse(JSON.stringify(manifest)).extensions,
  manifest.extensions,
  "Manifest extensions were not preserved",
);
assert.deepEqual(
  JSON.parse(JSON.stringify(trace)).extensions,
  trace.extensions,
  "Action Trace extensions were not preserved",
);

console.log(
  "FIXTURE OK",
  `${claims.length} Claims, ${evidenceLinkIds.size} Evidence Links, ${records.length} Records, ${candidateIds.size} disclosed Candidates, 2 immutable World Views`,
);
