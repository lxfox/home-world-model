# ADR-069: Revalidate relation Assessments without invalidating history

- Status: Accepted as non-normative system exploration; excluded from the bounded Core candidate
- Date: 2026-07-19
- Refines: ADR-068
- Chinese mirror: [`ADR-069-revalidate-relation-assessments-without-invalidating-history.zh-CN.md`](ADR-069-revalidate-relation-assessments-without-invalidating-history.zh-CN.md)

## Context

A Claim Use Relation Assessment is immutable and exact-use bound, but households change. Geometry is renovated, spaces split, Claims are corrected, evidence is withdrawn, policies change and new observations arrive. A mutable `current` flag would erase the basis of past decisions. A fixed TTL would invalidate stable relations without evidence and keep changed relations alive until timeout. Re-evaluating every Assessment after every Record would create an unbounded cascade.

The existing Change Impact Revalidation Profile already separates change classes, typed dependency closure, current-use status and historical interpretation. The proposal should compose it rather than invent another invalidation protocol.

## Decision

1. Add typed, content-bound dependency bindings and dependency-closure status to the proposal-local Claim Use Relation Assessment candidate.
2. Keep historical interpretation, current usability and new relation evaluation as three distinct artifacts/questions.
3. Preserve every prior Assessment for its exact inputs and `as_of`. Later change never edits or makes that historical result retroactively false.
4. Determine reuse through a new per-artifact Revalidation Assessment bound to a Change Set, dependency snapshot, purpose and later `as_of`.
5. Under complete declared closure, no applicable dependency path may support `current_reusable`. Under partial or indeterminate closure, absence of a known path cannot prove reuse.
6. Relevant Claim-body, selector-relation identity, topology or dependency-validity changes require a new Claim Use Relation Assessment. The old one remains historical.
7. Evidence withdrawal or current access denial makes the old result not currently usable; it does not refute the physical or semantic relation previously assessed.
8. New supporting or conflicting evidence requires review or a new Assessment. Newest evidence does not automatically win.
9. Future-effective change does not affect a reuse time before effect. After effect, relevant dependencies require re-evaluation.
10. Wall-clock passage alone does not invalidate an Assessment. Only bound validity semantics or admitted changes do so.
11. An Authority-only change may leave the descriptive relation reusable while current access or action permission is separately re-evaluated. Relation reuse never supplies current Authority.

## Consequences

- Currentness becomes an evidence-backed view, not a mutable property of knowledge.
- Change propagation remains bounded to declared typed dependencies.
- Stable household structure avoids needless recomputation, while incomplete monitoring fails closed.
- Cache entries may be replaced, but normative Assessments and Revalidation Assessments remain append-only.
- Sixteen executable reuse cases cover renovation, splitting, correction, evidence/access changes, future effect, TTL and unrelated observations.
