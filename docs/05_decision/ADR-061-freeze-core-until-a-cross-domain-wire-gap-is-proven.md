# ADR-061: Freeze Core until a cross-domain wire gap is proven

- Status: Accepted for Core v0.1 convergence
- Date: 2026-07-19
- Chinese mirror: [`ADR-061-freeze-core-until-a-cross-domain-wire-gap-is-proven.zh-CN.md`](ADR-061-freeze-core-until-a-cross-domain-wire-gap-is-proven.zh-CN.md)

## Context

HWM now has a small Core, many optional domain Profiles, named Conformance Sets, executable semantic oracles and ecosystem-governance compositions. Recent questions about evidence, adoption, outcomes, response, restoration and learning all closed by composing existing Claim/Record/Authority and Profile results. Continuing to add concepts merely because new questions can be asked would make convergence impossible. Conversely, a blanket freeze could hide a real wire-level interoperability gap.

## Decision

1. Freeze the Core v0.1 owned surface. New concepts default to external vocabulary, optional Profile, composition/governance contract, runtime adapter, empirical study or implementation concern.
2. A Core proposal is eligible for substantive governance only when all of these are evidenced:
   - an exact distinction cannot be represented losslessly by EntityRef, Claim, Record, Authority, existing Core contracts, external standards or an optional Profile;
   - the distinction recurs across at least two independent domain classes, not merely two examples of one product workflow;
   - leaving it optional would cause two conforming Base Exchange implementations to exchange the same bytes with materially incompatible meaning or preservation behavior;
   - adjacent standards and mappings have been explicitly exhausted, with reuse/rejection reasons;
   - the smallest wire semantics, identity, time, provenance, privacy and Authority boundaries are defined;
   - positive, negative, unknown, conflict, version and round-trip cases are executable;
   - migration and backward-compatible degradation are specified; and
   - the proposal does not smuggle algorithm, policy, ontology breadth, runtime service or governance legitimacy into Core.
3. Core proposal eligibility is not Core acceptance. Acceptance additionally requires content-bound specification governance, external independent implementation evidence for the exact changed wire behavior, security/privacy review proportional to the change and release/migration readiness.
4. A gap that can be expressed but lacks an adapter is an implementation gap. A deterministic rule lacking real-world validity is an empirical gap. A decision lacking representation/legitimacy is a governance gap. A canonical URI not deployed is a release gap. None is repaired by adding Core vocabulary.
5. Optional Profiles do not expand Base Exchange unless a named Conformance Set includes them. A Profile count is therefore not Core growth.
6. Repeated use of the same composition may justify a reusable composition contract or Profile descriptor before it can justify Core.
7. The convergence audit is revisioned. Any future candidate must name the failed existing expression path and supply a counterexample that the gate validator cannot classify elsewhere.
8. Current judgment: no inventoried gap satisfies Core proposal eligibility. Core v0.1 is conceptually frozen, not declared universally complete, adopted, secure, production-ready or interoperable by independent consensus.

## Consequences

- Further progress prioritizes external implementations, adapters, field evidence, security/privacy/user research and release operations.
- Core can still change if a falsifiable cross-domain wire counterexample appears.
- The project gains a stopping rule without claiming final truth.
- Governance compositions remain outside household packages unless explicitly referenced.

