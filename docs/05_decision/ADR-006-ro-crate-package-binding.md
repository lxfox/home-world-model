# ADR-006 — Bind Household Packages to RO-Crate 1.3

- Status: Proposed
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`ADR-006-ro-crate-package-binding.zh-CN.md`](ADR-006-ro-crate-package-binding.zh-CN.md)
- Related Profile: [`HWM RO-Crate Profile v0.1`](../../spec/profiles/ro-crate/v0.1/README.md)

## Context

ADR-005 treated Household Manifest, Claim Envelope, World View, and Action Trace as four exchange contracts while also requiring reuse of established standards. The term mapping audit found no defensible reason for HWM to own a generic packaging model. RO-Crate already defines the metadata descriptor, root dataset, data and contextual entities, Profile declaration, linked resources, JSON-LD extension mechanism, licensing, and packaging conventions that HWM needs.

The remaining question is whether the current Manifest contains household-specific semantics that cannot survive an RO-Crate binding.

## Decision

1. HWM household packages target an HWM application Profile over RO-Crate 1.3.
2. Core has three HWM behavioral contracts—Claim Envelope, World View, and Action Trace—and one package binding contract. The package binding is not a new world-model primitive.
3. `hwm:HouseholdManifest` v0.1.0 remains a compatibility projection during migration, not an independent generic package model.
4. The projection treats Profile and resource arrays as unordered sets and preserves JSON extension values, not insignificant serialization details.
5. Every Profile declared with Root `conformsTo` is required. The redundant `profileRequired` field is removed from the RO-Crate binding.
6. Core resource roles are expressed by Profile-specific types, not a generic HWM `resourceRole` property.
7. Integrity is fixed to SHA-256 in v0.1. Algorithm agility is deferred until a fixture requires it; a future version should reuse SPDX Hash.
8. Crate possession and runtime disclosure remain separate authorization boundaries. A purpose-bound World View is still required for narrow disclosure.

## Alternatives Considered

### Keep Household Manifest as the normative package model

Rejected as the target direction. It duplicates an established package/profile ecosystem and leaves HWM responsible for archive, metadata, vocabulary-extension, and tooling conventions unrelated to household semantics.

### Use RO-Crate only as an optional export

Rejected. Two normative package models would create permanent mapping ambiguity and make round-trip loss difficult to detect.

### Adopt SPDX Hash immediately

Deferred. SPDX is the better route when multiple algorithms or richer integrity methods are required, but SHA-256 is sufficient for every current fixture. Adding its full model now would be untested complexity.

## Consequences

- The smallest defensible HWM-owned surface is reduced to three behavioral contracts plus application Profile constraints.
- Existing RO-Crate tools can inspect the package, subject to RO-Crate 1.3 tool support.
- HWM must publish a resolvable Profile URI and local context term definitions.
- The simple Manifest may be deleted only after migration evidence is independently reproduced.
- Metadata privacy and authorization remain HWM deployment concerns even though package structure is reused.

## Current Evidence

The device-lifecycle and renovation-planning fixtures project two structurally different RO-Crates to their complete simple Manifests through separate JavaScript and Python paths. The planning crate adds five typed application artifacts, explicit two-branch comparison, shuffled relation arrays, and multiple mentioned participants without adding a Core primitive. Each crate passes all RO-Crate 1.2 required checks in `roc-validator` 0.11.2 except the expected context-version check caused by selecting RO-Crate 1.3; that validator does not yet ship a 1.3 profile.

## Validation Required Before Acceptance

1. ~~Add a second, structurally different HWM RO-Crate fixture.~~ Satisfied by the renovation-planning fixture on 2026-07-18.
2. Pass a community RO-Crate 1.3 validator or equivalent JSON-LD/base-profile validation.
3. Have an externally developed reader reproduce the compatibility projection without relying on HWM implementation code.
4. Publish the Profile URI, term definitions, and an offline-resolvable schema bundle.
5. Confirm that Authority references and extension handling do not leak data across a narrower World View boundary.
