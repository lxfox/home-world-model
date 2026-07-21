# ADR-030: Bind action authority to immutable Proposal revisions

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-030-bind-action-authority-to-immutable-proposal-revisions.zh-CN.md`](ADR-030-bind-action-authority-to-immutable-proposal-revisions.zh-CN.md)

## Context

Core v0.1 contains an inline Action Proposal with an identifier but no revision. Later Profiles already refer to an exact Proposal revision, yet most compatibility schemas bind only identifier and revision. This permits undetectable in-place mutation and accidental reuse of confirmation, impact work, or authorization after material action content changes.

## Decision

Adopt the optional Action Proposal Lineage Profile. Each revision is a new immutable, RFC 8785/SHA-256-bound artifact. Household, exact Intent binding, realization identity, purpose, semantic action kind, and target set form the lineage identity basis. Changing that basis, or creating a coexisting alternative, requires a new Proposal identifier.

Parameters, preconditions, effects, impacts, validity, World View, and Plan bindings may change only through the next sequential revision bound to the exact predecessor digest. Multiple successors of one predecessor are contested. Every downstream decision binds the exact Proposal digest and is recomputed for each revision. Proposal currentness, Authority authorization, execution, and effect remain separate state axes.

## Consequences

- Existing identifier/revision-only fields remain compatibility projections and should migrate to digest-bearing bindings.
- A lower-risk-looking revision does not inherit authorization.
- Supersession and withdrawal stop new dispatch but do not erase history or undo physical execution.
- Core is not expanded until independent implementations show that the Profile boundary is insufficient.
