# HWM RO-Crate Profile v0.1

- Status: Binding Candidate
- Version: 0.1.0
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0

## Purpose

This Profile binds a portable HWM household package to RO-Crate 1.3. It replaces the generic packaging semantics previously carried by the candidate Household Manifest while preserving a lossless compatibility projection for Core v0.1 readers.

This is a package binding, not a fourth household-world primitive and not a new archive format. Claim Envelope, World View, and Action Trace remain HWM behavioral contracts.

## Base Profile

A conforming crate MUST conform to [RO-Crate 1.3](https://www.researchobject.org/ro-crate/specification/1.3/) and MUST declare this on `ro-crate-metadata.json`. The Root Data Entity MUST declare conformance to `https://homeworldmodel.org/spec/profiles/ro-crate/v0.1` and provide the corresponding contextual `Profile` entity.

The profile URI MUST resolve to a human-readable specification before public release. The local path in this repository is only a publication candidate.

## Required Binding

| HWM package meaning | RO-Crate representation |
| --- | --- |
| package identity | Root `Dataset.identifier` |
| package creation time | Root `datePublished` |
| package license | Root `license` reference |
| one household scope | Root `about` reference to a contextual household entity |
| Authority state | exactly one entity in Root `mentions` with `additionalType` `.../authority/v0.1#AuthorityState` |
| Authority epoch | `authorityEpoch`, mapped in the local JSON-LD context to `https://homeworldmodel.org/terms/authorityEpoch` |
| required HWM Profiles | Root `conformsTo`; every listed HWM Profile is required, so no separate `profileRequired` flag exists |
| Claims resource | Root `hasPart` File with `additionalType` `.../core/v0.1#ClaimEnvelopeSet` |
| Records resource | Root `hasPart` File with `additionalType` `.../core/v0.1#RecordSet` |
| resource media type | File `encodingFormat` |
| resource schema | File `conformsTo` reference to a contextual Profile entity |
| resource size | File `contentSize` |
| resource integrity | File `sha256` |
| unknown Manifest extension | a locally mapped JSON-LD term whose value is a JSON string typed as `.../ro-crate/v0.1#JsonValue` |

All entity relations MUST use flattened `{ "@id": "..." }` references. `conformsTo`, `hasPart`, and `mentions` are semantically unordered. A reader MUST NOT derive priority or meaning from array position.

For a purpose-specific multi-Profile exchange, the [Profile Composition and Conformance Profile](../../profile-composition-conformance/v0.1/README.md) may bind these exact `conformsTo` entries to a finite Conformance Set and verify dependency closure, versions, artifact coverage and degradation. Root membership alone does not prove any of those properties.

A package MUST contain exactly one Claim Envelope set and one Record set. Additional application artifacts MAY use Profile-specific `additionalType` and `conformsTo` values. Their meaning belongs to the application Profile, not this package binding.

Every HWM application artifact `additionalType` MUST use an absolute `Profile-ID#ArtifactType` URI whose Profile ID appears in the Root `conformsTo` set. The resource's own `conformsTo` MAY instead identify an external schema or vocabulary such as BOT; that does not replace the governing HWM Profile declaration. A reader MUST reject an HWM application artifact whose governing Profile is absent rather than silently project ungoverned semantics as `other`.

## Integrity Decision

Profile v0.1 intentionally fixes resource integrity to SHA-256 and Schema.org `sha256`. The old Manifest's generic algorithm field was untested generality. If a later scenario requires algorithm agility, the Profile should map to the SPDX Hash model rather than invent another HWM checksum structure.

The metadata descriptor does not hash itself, avoiding recursive digest semantics. A transport or archival profile MAY add a signed outer container, but that is outside this Profile.

## Extension Preservation

An unknown compatibility extension MUST have an absolute property URI mapped in the local `@context`. Its value MUST be serialized as valid JSON in a string whose coerced datatype is `https://homeworldmodel.org/spec/profiles/ro-crate/v0.1#JsonValue`. A reader that claims lossless compatibility MUST parse and preserve the JSON value. Byte-for-byte preservation of whitespace or object-key order is not required.

This escape hatch is for migration. New interoperable semantics SHOULD use an existing vocabulary or a versioned HWM application Profile rather than accumulate opaque extensions.

## Privacy Boundary

A crate is a durable package available only inside its own authorization boundary. Possession of a crate does not grant a requester access to every referenced resource. A narrower runtime disclosure MUST be delivered as a purpose-bound World View. Crate metadata may itself reveal household structure and MUST be protected accordingly.

## Compatibility Projection

During Core v0.1 migration, a reader MAY project this Profile to `hwm:HouseholdManifest` v0.1.0. The projection MUST preserve package ID, household ID, creation time, required Profiles, Authority ID and epoch, resource identity/media type/compatibility-role/integrity, and unknown extension JSON values. Array order is not part of the projection semantics. Claim and Record sets retain their old roles; non-Core application artifacts project to `other`, while their precise semantic types remain in RO-Crate.

Two structurally different HWM RO-Crates now demonstrate the projection internally. The simple Manifest becomes removable only after an externally developed reader reproduces it and the resolvable Profile is published.

## Publication and Offline Resolution

The Profile URI, schema `$id` values, and local context terms MUST resolve after publication. A release MUST also provide an offline schema registry or bundle so validation does not depend on network access. The current repository schemas can be validated with an explicit local registry; generic tools otherwise attempt to retrieve the not-yet-published `homeworldmodel.org` identifiers.

## Current Evidence

The lifecycle and renovation-planning fixtures are structurally different RO-Crates and both project through independent JavaScript and Python code paths. The second crate carries five typed application artifacts—including an explicit two-branch comparison—and multiple `mentions`, while preserving one Authority state and unordered relations. `roc-validator` 0.11.2 currently implements the RO-Crate 1.2 base profile: each candidate passes 64 of 65 required 1.2 checks, with the sole failure being the deliberate RO-Crate 1.3 context. This is compatibility evidence, not full external validation of RO-Crate 1.3 or of this HWM Profile.

Run:

```sh
node spec/profiles/ro-crate/v0.1/validate.mjs \
  conformance/scenarios/device-lifecycle-continuity-v0.1 \
  conformance/scenarios/renovation-planning-package-v0.1
python3 conformance/readers/python/reference_reader.py
```

Candidate serialization shape: [`hwm-ro-crate-profile.schema.json`](hwm-ro-crate-profile.schema.json).

## Non-goals

This Profile does not define runtime APIs, policy evaluation, encryption, key recovery, raw telemetry retention, database layout, Agent reasoning, or permission to dereference external resources.

## References

- [RO-Crate 1.3 specification](https://www.researchobject.org/ro-crate/specification/1.3/)
- [RO-Crate Profiles](https://www.researchobject.org/ro-crate/specification/1.3/profiles.html)
- [RO-Crate JSON-LD and extensions](https://www.researchobject.org/ro-crate/specification/1.3/appendix/jsonld.html)
- [Schema.org `sha256`](https://schema.org/sha256)
- [SPDX 3.0.1 Hash](https://spdx.github.io/spdx-spec/v3.0.1/model/Core/Classes/Hash/)
