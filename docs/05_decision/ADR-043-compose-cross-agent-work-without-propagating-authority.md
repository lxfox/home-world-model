# ADR-043: Compose cross-Agent work without propagating authority

- Status: Proposed
- Date: 2026-07-19

## Context

Household planning may require specialized Agents for requirements, simulation, catalog search, integration, and later control. A generic “sub-agent delegation” abstraction conflates data dependency, semantic capability, household disclosure, responsibility, and action authority. It also encourages full-context sharing and makes worker self-reports look like accepted results.

## Options

1. Give one orchestrator a transitive identity, memory, and permission envelope.
2. Treat all collaboration as delegated acting.
3. Exchange immutable work-slot contracts, independently gate every assignment, and release dependencies only after output acceptance.

## Decision

Adopt option 3 as an optional Profile. A Work Composition Plan defines a typed DAG and minimum disclosure per slot. Each Work Slot Assignment independently binds capability qualification, Admission, disclosure, actor, responsible subject, exact inputs, and any necessary Authority. A Work Composition Assessment distinguishes submission, validation, dependency release, and integration.

Computational subcontract, mediation, opaque relay, and delegated acting remain distinct. Dependency edges never propagate identity, trust, Lease, Authority, or responsibility. Device work produces governed Proposal candidates rather than direct dispatch. Private chain-of-thought is not exchanged.

## Reason

This design permits an open ecosystem of specialized Agents while keeping every security and epistemic boundary locally checkable. It also lets a household replace one worker without rewriting the Plan or erasing provenance.

## Consequences

- Collaboration requires more explicit artifacts and validators.
- Minimum disclosure and responsibility become auditable per slot.
- Reassignment, retry, failure, and cancellation preserve history.
- Slot success cannot be presented as Task completion, Intent fulfillment, physical truth, or permission.

Chinese mirror: [`ADR-043-compose-cross-agent-work-without-propagating-authority.zh-CN.md`](ADR-043-compose-cross-agent-work-without-propagating-authority.zh-CN.md).
