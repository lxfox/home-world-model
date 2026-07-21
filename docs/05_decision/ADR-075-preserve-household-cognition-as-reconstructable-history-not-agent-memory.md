# ADR-075: Preserve household cognition as reconstructable history, not Agent memory

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-075-preserve-household-cognition-as-reconstructable-history-not-agent-memory.zh-CN.md`](ADR-075-preserve-household-cognition-as-reconstructable-history-not-agent-memory.zh-CN.md)

## Context

ADR-074 makes sufficiency local to one decision boundary. Across many decisions, a household still needs continuity: a later Agent should understand prior knowledge, decisions and changes without inheriting opaque memory or blindly accumulating every earlier conclusion. Treating the latest snapshot, summary, revision number or Agent state as the household mind would create mutable truth, purpose leakage, fork ambiguity and vendor dependence.

HWM already has immutable Claims/Records/Assessments, World Views, provenance packages, state-history invariants, typed Change Sets, per-artifact revalidation, purpose-bound Orientation Snapshots and Task Checkpoints. These support a stronger definition of continuity without a new memory primitive.

## Decision

1. Define household cognitive continuity as the ability of an authorized independent consumer to reconstruct a bounded result and explain its lineage and differences from prior results.
2. Preserve immutable source artifacts, occurrence records, typed lineage, declared dependencies, accepted procedures/policies, Authority history and coverage/limitation metadata as the durable substrate.
3. Materialize current recognition anew for exact requester, purpose, scope, `as_of` and Authority state. A historical View is never a universal mutable head.
4. Require relevant admitted changes to propagate only through declared dependency closure and per-artifact revalidation. No global home version defines current truth.
5. Preserve old Assessments and Views at their compatible `as_of`. A corrected or changed current result does not rewrite history.
6. Treat forks and same-revision content conflicts as contested/integrity conflicts. Revision magnitude, timestamp, file order, semantic similarity or model confidence cannot choose a head.
7. Treat summaries, indexes and caches as replaceable derivatives. They need exact source/procedure/closure bindings and never become normative memory.
8. Do not require or exchange Agent chain-of-thought, private memory, credentials, Lease or model priors. Durable decision structure is sufficient; new outputs retain new attribution.
9. Report withheld, unavailable or deleted indispensable sources as bounded reconstruction limits. Never fill them from a language model prior.
10. Continuity does not require identical outputs after a declared change. It requires an attributable explanation of the delta. An unexplained delta means continuity has not been demonstrated.

## Consequences

- The household, rather than one Agent vendor, owns the durable basis of recognition.
- Agents may improve or disagree while remaining accountable to the same evidence and declared change history.
- Storage minimization remains possible: qualified derived Records may support bounded reconstruction without retaining or disclosing every raw observation.
- Thirty executable cases test Agent replacement, correction, change, cache loss, deletion, withholding, forks, snapshots, offline state, late evidence and explainable deltas.
