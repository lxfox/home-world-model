import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
const manifest = read("manifest.json");
const crate = read("ro-crate-metadata.json");
const contexts = [crate["@context"]].flat();
assert.ok(contexts.includes("https://w3id.org/ro/crate/1.3/context"));
const localContext = Object.assign({}, ...contexts.filter((item) => typeof item === "object"));

const graph = new Map(crate["@graph"].map((entity) => [entity["@id"], entity]));
assert.equal(graph.size, crate["@graph"].length, "Duplicate RO-Crate entity @id");

const descriptor = graph.get("ro-crate-metadata.json");
const root = graph.get("./");
assert.ok(descriptor && root, "RO-Crate descriptor or Root Data Entity missing");
assert.equal(descriptor.about["@id"], root["@id"]);
assert.equal(descriptor.conformsTo["@id"], "https://w3id.org/ro/crate/1.3");
assert.equal(root.license["@id"], "https://creativecommons.org/licenses/by/4.0/");

const profileRefs = root.conformsTo.map((item) => item["@id"]);
const crateProfile = "https://homeworldmodel.org/spec/profiles/ro-crate/v0.1";
assert.ok(profileRefs.includes(crateProfile), "HWM RO-Crate Profile declaration missing");
const profiles = profileRefs.filter((profileId) => profileId !== crateProfile).map((profileId) => {
  const profile = graph.get(profileId);
  assert.ok(profile, `Missing Profile contextual entity: ${profileId}`);
  assert.ok([profile["@type"]].flat().includes("Profile"), `Contextual entity is not a Profile: ${profileId}`);
  return {
    id: profile.identifier,
    version: profile.version,
    required: true
  };
});

const roleByType = new Map([
  ["https://homeworldmodel.org/spec/core/v0.1#ClaimEnvelopeSet", "claims"],
  ["https://homeworldmodel.org/spec/core/v0.1#RecordSet", "records"]
]);
const resources = root.hasPart.map((part) => {
  const id = part["@id"];
  const file = graph.get(id);
  assert.ok(file, `Missing File Data Entity: ${id}`);
  assert.ok([file["@type"]].flat().includes("File"), `hasPart entity is not a File: ${id}`);
  const bytes = fs.readFileSync(path.join(directory, id));
  const digest = crypto.createHash("sha256").update(bytes).digest("hex");
  assert.equal(Number(file.contentSize), bytes.length, `RO-Crate contentSize mismatch: ${id}`);
  assert.equal(file.sha256, digest, `RO-Crate sha256 mismatch: ${id}`);
  assert.match(file.encodingFormat, /^application\//, `Core HWM resource lacks an application media type: ${id}`);
  assert.ok(file.conformsTo?.["@id"], `Core HWM resource lacks a Schema Profile: ${id}`);
  assert.ok(graph.has(file.conformsTo["@id"]), `File Schema Profile lacks contextual entity: ${id}`);
  assert.ok(roleByType.has(file.additionalType), `Unknown HWM Core resource type: ${id}`);
  return {
    id,
    media_type: file.encodingFormat,
    role: roleByType.get(file.additionalType),
    integrity: { algorithm: "sha-256", digest }
  };
});

const householdId = root.about["@id"];
const authorityRefs = root.mentions.map((item) => graph.get(item["@id"]));
const authorities = authorityRefs.filter(
  (entity) => entity?.additionalType === "https://homeworldmodel.org/spec/profiles/authority/v0.1#AuthorityState"
);
assert.equal(authorities.length, 1, "Exactly one HWM Authority state must be mentioned");
const authorityId = authorities[0]["@id"];
const household = graph.get(householdId);
const authority = graph.get(authorityId);
assert.ok(household, "Household contextual entity missing");
assert.ok(authority, "Authority contextual entity missing");

const extensions = {};
for (const [term, definition] of Object.entries(localContext)) {
  if (
    typeof definition !== "object"
    || definition["@type"] !== "https://homeworldmodel.org/spec/profiles/ro-crate/v0.1#JsonValue"
    || !(term in root)
  ) continue;
  assert.match(definition["@id"], /^https?:\/\//, `Extension term lacks an absolute URI: ${term}`);
  extensions[definition["@id"]] = JSON.parse(root[term]);
}

const projectedManifest = {
  contract: "hwm:HouseholdManifest",
  contract_version: "0.1.0",
  package_id: root.identifier,
  household_id: householdId,
  created_at: root.datePublished,
  profiles,
  authority: {
    authority_id: authorityId,
    epoch: authority.authorityEpoch
  },
  resources,
  extensions
};

function normalizeManifest(value) {
  const normalized = structuredClone(value);
  normalized.profiles.sort((left, right) => left.id.localeCompare(right.id));
  normalized.resources.sort((left, right) => left.id.localeCompare(right.id));
  return normalized;
}

assert.deepEqual(
  normalizeManifest(projectedManifest),
  normalizeManifest(manifest),
  "RO-Crate projection is not losslessly equivalent to the simple HWM Manifest"
);
assert.deepEqual(JSON.parse(JSON.stringify(crate)), crate, "RO-Crate unknown JSON members did not survive round trip");

console.log(
  "RO-CRATE EQUIVALENCE OK",
  `${resources.length} resources, ${profiles.length} HWM Profiles, household and Authority preserved, extensions lossless`
);
