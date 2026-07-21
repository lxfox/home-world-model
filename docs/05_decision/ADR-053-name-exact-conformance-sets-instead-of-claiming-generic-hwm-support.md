# ADR-053: Name exact Conformance Sets instead of claiming generic HWM support

- Status: Proposed
- Date: 2026-07-19

## Context

HWM has a small Core and many optional Profiles. RO-Crate can list package conformance and Semantic Capability Negotiation can qualify an Agent role, but neither alone states whether one selected Profile set has complete dependencies, compatible exact versions, artifact coverage and an allowed degradation path. A generic “HWM compatible” claim becomes less meaningful as optional Profiles grow.

## Decision

Adopt the optional Profile Composition and Conformance meta-Profile. Define HWM Base Exchange Set v0.1 as exact Core v0.1, RO-Crate v0.1 and Authority v0.1 contracts. Every purpose-specific Conformance Set locks exact Profile Descriptor versions and active dependency closure, declares artifact and role requirements, evidence level, offline and unknown-extension policy, and explicit degradation.

No global latest-version or semver-range compatibility is inferred. Package declaration, composition closure, artifact validity, implementation capability, independent evidence, trust and Authority remain separate.

## Reason

This gives the growing Profile ecosystem a convergence mechanism: domain semantics may remain optional while every concrete exchange contract becomes finite, testable and unambiguous.

Chinese mirror: [`ADR-053-name-exact-conformance-sets-instead-of-claiming-generic-hwm-support.zh-CN.md`](ADR-053-name-exact-conformance-sets-instead-of-claiming-generic-hwm-support.zh-CN.md).
