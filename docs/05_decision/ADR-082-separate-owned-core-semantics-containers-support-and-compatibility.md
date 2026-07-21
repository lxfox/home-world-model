# ADR-082: Separate owned Core semantics, containers, support and compatibility

- Status: Accepted as convergence boundary; terminology clarified by ADR-089, no wire-schema removal
- Date: 2026-07-19
- Chinese mirror: [`ADR-082-separate-owned-core-semantics-containers-support-and-compatibility.zh-CN.md`](ADR-082-separate-owned-core-semantics-containers-support-and-compatibility.zh-CN.md)

## Context

Core remained at eight schemas while optional Profiles and composition rules grew. Counting files or placing every useful boundary under “Core Invariants” obscures the actual owned surface and weakens the claim of optionality.

## Decision

1. Claim Envelope, Record, World View and Action Trace are the four currently defensible owned semantic artifact schemas. Claim Envelope, World View and Action Trace are the three behavioral contracts; Record is a portable semantic artifact referenced by those behaviors, not a fourth independent behavior contract.
2. Claim Set and Record Set remain current Base Exchange v0.1 collection containers, not household ontology. Reconsideration requires versioned migration.
3. Common Schema is reference-closure support, not an independently exchanged semantic artifact.
4. Household Manifest is a compatibility deletion candidate. It remains checked in for current migration/round-trip compatibility, is absent from the Core Profile artifact list, and is not irreducible owned semantics. Removal requires a later versioned proposal and migration/degradation evidence.
5. Authority, RO-Crate and Profile Composition are named Conformance Set/Profile dependencies, not owned Core ontology.
6. All 45 Profile directories remain optional unless an exact Conformance Set includes them.
7. Core-document normative wire invariants are 1–17. Statements 18–35 are a non-Base Optional Profile Boundary Index, normative only through relevant Conformance Set inclusion.
8. Recent cognition/governance/lifecycle audits remain non-wire composition guidance; their success is evidence that no new Core primitive was needed.
9. The bounded empty-scope candidate remains outside Core until acceptance; eligibility is not adoption.
10. Internal oracle consistency is project evidence only, not independent interoperability.

## Consequences

- The project states a smaller owned semantic surface without breaking v0.1 bytes.
- A future deletion candidate is visible instead of treating every checked-in schema as permanent.
- Optional Profile boundaries no longer masquerade as Base requirements.
- Actual deletion, candidate acceptance and release migration remain separate governance actions.
