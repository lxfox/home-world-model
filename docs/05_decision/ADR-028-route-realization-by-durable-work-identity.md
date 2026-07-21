# ADR-028: Route Intent Realization by Durable Work Identity

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-028-route-realization-by-durable-work-identity.zh-CN.md`](ADR-028-route-realization-by-durable-work-identity.zh-CN.md)

## Context

An adopted Intent may lead to one atomic device adjustment or to work that spans time, Plans, Proposals, Attempts, Agents, waits, retries, and exit criteria. Requiring a Task for every adjustment over-projectizes household life. Allowing every Agent to go directly to a Proposal lets it bypass durable work identity, recurrence deduplication, progress, handoff, cancellation, and completion evidence.

## Decision

1. Add an optional Work Realization Routing Profile, not a Core Work/Project entity.
2. Route one exact realization of an adopted Intent as `direct_proposal_eligible`, `task_required`, or `indeterminate`.
3. Base routing on an independently accepted Work Routing Policy Claim and exact work-shape evidence, never an LLM complexity score.
4. Define the boundary as whether work identity must survive beyond one exact Proposal and Action Trace.
5. Require Task lineage when accepted policy requires recurrence identity, multiple Proposals, retry/resume, wait/dependency, handoff/delegation, durable progress, independent exit criteria, split/merge/reopen, or task-level audit.
6. Every admitted Routine occurrence remains Task-required.
7. An existing open Task for the exact realization cannot be bypassed by direct routing.
8. Direct routing is per realization, not a permanent Intent property; persistent Intent can use atomic direct corrections and Tasks for other work.
9. A failed/denied/rejected/timed-out direct realization creates no automatic retry, Task, or Intent failure.
10. Newly discovered work shape requires a new Assessment and may route future work into a Task without rewriting history.
11. Direct routing skips only Task materialization. All Proposal impact, coordination, Authority, safety, dispatch, and outcome gates remain.
12. Task-required does not create a Task, and direct-eligible does not create or authorize a Proposal.

## Consequences

Simple household adjustments remain lightweight, while work that must persist across time or actors receives stable lineage. Agents cannot avoid Task governance by calling work atomic, and the model avoids turning every light adjustment into project management.

## Alternatives Rejected

- **Task for every adopted Intent:** confuses commitment with bounded work and creates needless lifecycle state.
- **Never use Tasks for device actions:** loses retry, handoff, occurrence, and completion identity.
- **Route by transient/persistent Intent alone:** persistence describes commitment, not the shape of one realization.
- **Route by estimated complexity or duration:** model-local, manipulable, and not interoperable.
- **Let direct routing skip authorization:** routing is structure, not permission.

## References

- [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [Erol, Hendler, and Nau, HTN complexity](https://www.cs.umd.edu/~nau/papers/erol1996complexity.pdf)
- [Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf)
