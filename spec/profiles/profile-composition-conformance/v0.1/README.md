# HWM Profile Composition and Conformance Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`profile-descriptor.schema.json`](profile-descriptor.schema.json), [`conformance-set.schema.json`](conformance-set.schema.json), [`composition-assessment.schema.json`](composition-assessment.schema.json)

## Purpose

This meta-Profile determines whether an exact set of HWM Core, packaging and optional Profile versions forms a closed, non-conflicting contract for one exchange purpose. It prevents “supports HWM” from meaning an unspecified selection of documents.

The normative chain is:

`immutable Profile Descriptors + purpose-bound Conformance Set + exact artifacts/roles/evidence -> dependency, version, conflict, artifact and degradation checks -> Composition Assessment -> Capability Requirement Set/package publication gate`

Composition conformance is not Agent capability, package truth, household trust, access, or action authority.

## HWM Base Exchange Set v0.1

The minimal named set for a portable household knowledge exchange is:

- HWM Core `v0.1` semantic contracts for EntityRef, Claim, Record, World View and Authority boundaries;
- HWM RO-Crate Profile `v0.1` for package identity, resources and integrity; and
- HWM Authority Profile `v0.1` for the referenced Authority state and purpose boundary.

This Base Exchange Set establishes only structural and semantic preservation of the kernel. It does not require planning, actions, devices, people, geometry, procurement, commissioning, inference, or any domain Profile. A package that contains an artifact governed by an optional Profile must add that exact Profile/version and its required dependency closure.

“HWM compatible” without a named Conformance Set, exact versions, roles and evidence level is an incomplete claim.

## Profile Descriptor

An immutable Descriptor binds:

- canonical Profile ID, exact semantic version, status, normative language and document digest;
- schema/context/shape/oracle identifiers and offline resolution resources;
- artifact types and semantic roles (`preserve`, `consume`, `produce`, `evaluate`, `procedure_adapter`);
- required, conditional and optional dependencies with exact version constraints and activation conditions;
- declared incompatibilities and supersession/compatibility mappings;
- required invariants, unknown-extension behavior, canonicalization and proof requirements;
- privacy/authority boundary notes; and
- issuer, issue time and proof.

A hyperlink or prose citation is not a dependency declaration. Required dependency cycles are invalid unless every member belongs to one explicitly versioned atomic bundle whose joint validation procedure is declared. v0.1 defines no such atomic bundle.

## Conformance Set

An immutable, purpose-bound Set names its own ID/revision, audience, exchange operation, Base Exchange Set version, exact Profile descriptors, required artifact kinds, required semantic roles, minimum evidence level, offline-resolution policy, unknown-extension policy, allowed explicit degradation, and validity window.

The Set contains a lock entry for every active required dependency. Optional dependencies do not silently activate. Conditional dependencies activate only when the declared condition is objectively true for the included artifact, requested role or exchange mode; an unknown condition makes closure indeterminate.

There is no global `latest`, caret/range resolution, or “newer is better” rule. Exact versions are normative. Direction-specific compatibility mappings may substitute a version only when the Set permits the mapping and exposes information loss, invariant coverage and role limits.

## Composition Assessment

The Assessment separately reports:

- descriptor integrity and offline resolvability;
- required and conditional dependency closure;
- exact version resolution and permitted mappings;
- duplicate Profile identity and lock consistency;
- declared incompatibility and required-cycle checks;
- artifact-to-Profile coverage;
- required semantic-role and invariant/test evidence;
- unknown-extension behavior; and
- permitted degradation mode.

Each item is `satisfied`, `satisfied_with_limits`, `not_satisfied`, or `indeterminate`. Overall composition is `conformant`, `conformant_with_limits`, `not_conformant`, or `indeterminate`.

`conformant` means the declared contract is internally closed for its exact purpose. It does not prove that an Agent implements it. The [Semantic Capability Negotiation Profile](../../semantic-capability-negotiation/v0.1/README.md) separately qualifies an implementation/build/environment for the required roles.

## Artifact and package rules

RO-Crate Root `conformsTo` lists exact required Profiles for that package, but list membership alone does not prove dependency closure, artifact validity or implementation support. Each typed application artifact binds its governing exact Profile. Unknown required semantics must be preserved opaquely or rejected according to the Set; they must never be discarded silently.

A reader conformant only to the Base Exchange Set may inventory, verify and preserve an unknown optional artifact without interpreting it, provided the Set explicitly permits `opaque_relay`. It must not expose derived semantic results from that artifact. `read_only_limited`, `opaque_relay`, `qualified_mediator_required`, and `refuse_unsupported_operation` retain the meanings defined by Semantic Capability Negotiation.

## Change and publication

Profile Descriptor, schema, context, invariant, dependency, compatibility mapping, Conformance Set purpose, required role, artifact set or evidence policy change creates a new immutable revision and Assessment. Published descriptors and all referenced schemas/contexts/oracles must be content-addressed or digest-bound and available in the declared offline registry.

A repository test run is implementation-owned evidence. Independent implementation evidence requires a separately developed producer or reader, exact suite/version binding and reproducible artifacts; it cannot be inferred from two languages maintained by one project.

## Invariants

1. Core, package binding, optional Profile, Conformance Set, package declaration and Agent capability remain distinct.
2. A Profile ID without an exact version is insufficient for normative composition.
3. “Latest”, version order and range satisfaction do not imply semantic compatibility.
4. Prose links do not establish dependency closure.
5. Every active required or conditional dependency is locked exactly once.
6. Unknown conditional activation makes composition indeterminate, not closed.
7. Required dependency cycles fail unless covered by an explicit atomic-bundle rule; none exists in v0.1.
8. Package `conformsTo` membership does not prove artifact validity or implementation support.
9. Schema validation does not prove semantic role conformance.
10. Optional Profile absence does not make a Base Exchange package nonconformant.
11. Unknown required semantics are preserved opaquely or rejected, never silently dropped.
12. Explicit degradation cannot produce semantics outside the supported role.
13. Project-owned tests do not count as independent implementation evidence.
14. Composition grants no trust, disclosure, Lease, purchase, installation or action authority.

## Conformance

The [Profile Composition oracle](../../../../conformance/scenarios/profile-composition-conformance-v0.1/README.md) tests base closure, exact versions, conditional dependencies, cycles, conflicts, mappings, artifact coverage, role evidence, offline resolution, degradation and forbidden authority inference.

The first concrete instantiation is the [HWM Base Exchange Set v0.1 release candidate](../../../conformance-sets/base-exchange/v0.1/README.md). It content-binds three exact descriptors, validates the local offline resource closure, and rejects lock, dependency, version and resource mutations while retaining the limitation that all current evidence is project-owned.

The accompanying [Base-only RO-Crate fixture](../../../../conformance/scenarios/base-only-package-v0.1/README.md) demonstrates that every domain Profile remains optional. Zero disclosed Claims/Records is valid and does not assert that the household has no knowledge. The minimum crate references Authority state without forcing disclosure of the full Authority document.

```sh
node conformance/scenarios/profile-composition-conformance-v0.1/validate.mjs
node spec/conformance-sets/base-exchange/v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define a package manager, dependency solver, global registry governance, semantic-version compatibility, schema language, Agent admission, code loading, remote execution, household policy, certification mark, or standards adoption process.
