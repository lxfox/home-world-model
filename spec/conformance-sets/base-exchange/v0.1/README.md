# HWM Base Exchange Set v0.1 release candidate

- Status: Release Candidate
- Set revision: 1
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Composition Profile: [`../../../profiles/profile-composition-conformance/v0.1/README.md`](../../../profiles/profile-composition-conformance/v0.1/README.md)

This directory is the first machine-readable instantiation of HWM Base Exchange Set v0.1. It locks exact Core, RO-Crate and Authority documents rather than treating a repository branch or `latest` URL as normative.

Files:

- [`core.profile.json`](core.profile.json), [`ro-crate.profile.json`](ro-crate.profile.json), and [`authority.profile.json`](authority.profile.json): content-bound Profile Descriptors;
- [`conformance-set.json`](conformance-set.json): purpose, versions, descriptor locks, artifacts, roles and degradation policy;
- [`composition-assessment.json`](composition-assessment.json): current repository-owned composition result; and
- [`validate.mjs`](validate.mjs): dependency, digest, resource, role, mutation and boundary validator.

Run:

```sh
node spec/conformance-sets/base-exchange/v0.1/validate.mjs
```

Passing this validator proves that the checked-in release candidate is internally closed and content-bound. It does not prove independent implementation interoperability, cryptographic publication, Agent capability, household trust, package truth, disclosure permission or action authority.

The minimum package carries an `AuthorityStateReference`, not necessarily the full Authority Profile Document. Requiring the raw Authority document in every portable crate would contradict purpose-bound disclosure; a separately authorized exchange may include it when its exact operation requires it.

The [Base-only package fixture](../../../../conformance/scenarios/base-only-package-v0.1/README.md) instantiates this contract with empty Claim and Record sets, no application artifact, and no domain Profile. It also tests the explicit opaque-relay boundary for unsupported optional artifacts.

The [Base Exchange Offline Registry](../../../registry/base-exchange/v0.1/README.md) content-binds the 24 canonical documents, Schemas, descriptors, Set and Assessment needed for network-independent resolution. Offline success is not a claim that the canonical HTTPS surface is deployed.

The [Independent Implementation Challenge](../../../../interop/challenges/base-exchange-v0.1/README.md) freezes this package together with lifecycle and renovation packages, defines observable outputs and rejection mutations, and accepts externally attributable submissions without conflating self-declared independence with evidence standing.
