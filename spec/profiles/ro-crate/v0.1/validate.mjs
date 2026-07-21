import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const BASE_CONTEXT = "https://w3id.org/ro/crate/1.3/context";
const BASE_PROFILE = "https://w3id.org/ro/crate/1.3";
const HWM_CRATE_PROFILE = "https://homeworldmodel.org/spec/profiles/ro-crate/v0.1";
const AUTHORITY_TYPE = "https://homeworldmodel.org/spec/profiles/authority/v0.1#AuthorityState";
const AUTHORITY_EPOCH = "https://homeworldmodel.org/terms/authorityEpoch";
const JSON_VALUE_TYPE = `${HWM_CRATE_PROFILE}#JsonValue`;
const CLAIM_SET_TYPE = "https://homeworldmodel.org/spec/core/v0.1#ClaimEnvelopeSet";
const RECORD_SET_TYPE = "https://homeworldmodel.org/spec/core/v0.1#RecordSet";

function oneOrMany(value) {
  return value === undefined ? [] : [value].flat();
}

function types(entity) {
  return oneOrMany(entity?.["@type"]);
}

function normalizeManifest(value) {
  const normalized = structuredClone(value);
  normalized.profiles.sort((left, right) => left.id.localeCompare(right.id));
  normalized.resources.sort((left, right) => left.id.localeCompare(right.id));
  return normalized;
}

function assertNodeReferences(entity, property, graph, allowUnlisted = false) {
  for (const reference of oneOrMany(entity[property])) {
    assert.deepEqual(Object.keys(reference), ["@id"], `${entity["@id"]}.${property} must use a flattened node reference`);
    assert.ok(allowUnlisted || graph.has(reference["@id"]), `Missing contextual entity: ${reference["@id"]}`);
  }
}

function manifestRole(file) {
  if (file.additionalType === CLAIM_SET_TYPE) return "claims";
  if (file.additionalType === RECORD_SET_TYPE) return "records";
  return "other";
}

export function verifyPackage(directoryInput) {
  const directory = path.resolve(directoryInput);
  const read = (name) => JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
  const crate = read("ro-crate-metadata.json");
  const manifest = read("manifest.json");
  const contexts = oneOrMany(crate["@context"]);
  assert.ok(contexts.includes(BASE_CONTEXT), "RO-Crate 1.3 context missing");
  const localContext = Object.assign({}, ...contexts.filter((item) => typeof item === "object"));

  const graph = new Map(crate["@graph"].map((entity) => [entity["@id"], entity]));
  assert.equal(graph.size, crate["@graph"].length, "Duplicate RO-Crate entity @id");
  for (const entity of crate["@graph"]) {
    assert.ok(entity["@id"] && entity["@type"], "Every RO-Crate entity needs @id and @type");
  }

  const descriptor = graph.get("ro-crate-metadata.json");
  const root = graph.get("./");
  assert.ok(descriptor && root, "RO-Crate descriptor or Root Data Entity missing");
  assert.deepEqual(descriptor.about, { "@id": "./" });
  assert.deepEqual(descriptor.conformsTo, { "@id": BASE_PROFILE });
  assert.equal(root["@type"], "Dataset");

  for (const property of ["about", "license", "mentions", "conformsTo", "hasPart"]) {
    assertNodeReferences(root, property, graph);
  }

  const profileRefs = root.conformsTo.map((item) => item["@id"]);
  assert.ok(profileRefs.includes(HWM_CRATE_PROFILE), "HWM RO-Crate Profile declaration missing");
  const profiles = profileRefs.filter((profileId) => profileId !== HWM_CRATE_PROFILE).map((profileId) => {
    const profile = graph.get(profileId);
    assert.ok(types(profile).includes("Profile"), `Contextual entity is not a Profile: ${profileId}`);
    assert.ok(profile.identifier && profile.version, `HWM Profile lacks identifier or version: ${profileId}`);
    return { id: profile.identifier, version: profile.version, required: true };
  });

  const authorityEpochTerm = Object.entries(localContext).find(([, definition]) => definition === AUTHORITY_EPOCH)?.[0];
  assert.ok(authorityEpochTerm, "Local context does not map authorityEpoch");
  const mentioned = root.mentions.map((item) => graph.get(item["@id"]));
  const authorities = mentioned.filter((entity) => entity?.additionalType === AUTHORITY_TYPE);
  assert.equal(authorities.length, 1, "Exactly one HWM Authority state must be mentioned");
  const authority = authorities[0];
  assert.ok(Number.isInteger(authority[authorityEpochTerm]) && authority[authorityEpochTerm] >= 0, "Invalid Authority epoch");

  const coreResourceCounts = new Map([[CLAIM_SET_TYPE, 0], [RECORD_SET_TYPE, 0]]);
  const resources = root.hasPart.map((part) => {
    const id = part["@id"];
    const file = graph.get(id);
    assert.ok(types(file).includes("File"), `Root hasPart is not a File: ${id}`);
    assertNodeReferences(file, "conformsTo", graph);
    const resolved = path.resolve(directory, id);
    assert.ok(resolved.startsWith(`${directory}${path.sep}`), `Resource escapes crate directory: ${id}`);
    const bytes = fs.readFileSync(resolved);
    const digest = crypto.createHash("sha256").update(bytes).digest("hex");
    assert.equal(Number(file.contentSize), bytes.length, `contentSize mismatch: ${id}`);
    assert.equal(file.sha256, digest, `sha256 mismatch: ${id}`);
    assert.ok(typeof file.encodingFormat === "string" && file.encodingFormat.includes("/"), `Invalid media type: ${id}`);
    if (coreResourceCounts.has(file.additionalType)) {
      coreResourceCounts.set(file.additionalType, coreResourceCounts.get(file.additionalType) + 1);
    } else if (typeof file.additionalType === "string" && file.additionalType.startsWith("https://homeworldmodel.org/spec/")) {
      const separator = file.additionalType.lastIndexOf("#");
      assert.ok(separator > 0, `HWM application artifact type lacks Profile namespace: ${id}`);
      const governingProfile = file.additionalType.slice(0, separator);
      assert.ok(profileRefs.includes(governingProfile), `HWM application artifact governing Profile is not declared by Root: ${id}`);
    }
    return {
      id,
      media_type: file.encodingFormat,
      role: manifestRole(file),
      integrity: { algorithm: "sha-256", digest }
    };
  });
  assert.equal(coreResourceCounts.get(CLAIM_SET_TYPE), 1, "Package must contain exactly one Claim Envelope set");
  assert.equal(coreResourceCounts.get(RECORD_SET_TYPE), 1, "Package must contain exactly one Record set");

  const extensions = {};
  for (const [term, definition] of Object.entries(localContext)) {
    if (typeof definition !== "object" || definition["@type"] !== JSON_VALUE_TYPE || !(term in root)) continue;
    assert.match(definition["@id"], /^https?:\/\//, `Extension term lacks an absolute URI: ${term}`);
    extensions[definition["@id"]] = JSON.parse(root[term]);
  }

  const projected = {
    contract: "hwm:HouseholdManifest",
    contract_version: "0.1.0",
    package_id: root.identifier,
    household_id: root.about["@id"],
    created_at: root.datePublished,
    profiles,
    authority: {
      authority_id: authority["@id"],
      epoch: authority[authorityEpochTerm]
    },
    resources,
    extensions
  };
  assert.deepEqual(
    normalizeManifest(projected),
    normalizeManifest(manifest),
    "RO-Crate compatibility projection differs from Manifest"
  );
  assert.deepEqual(JSON.parse(JSON.stringify(crate)), crate, "RO-Crate JSON value did not survive parse/serialize round trip");

  return {
    directory,
    resource_count: resources.length,
    application_resource_count: resources.filter((item) => item.role === "other").length,
    profile_count: profiles.length,
    mention_count: mentioned.length,
    extension_count: Object.keys(extensions).length
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const directories = process.argv.slice(2);
  assert.ok(directories.length > 0, "Usage: node validate.mjs <crate-directory> [...]");
  for (const directory of directories) {
    const result = verifyPackage(directory);
    console.log(
      "HWM RO-CRATE OK",
      path.relative(process.cwd(), result.directory),
      `${result.resource_count} resources (${result.application_resource_count} application),`,
      `${result.profile_count} HWM Profiles, ${result.mention_count} mentions, ${result.extension_count} extension`
    );
  }
}
