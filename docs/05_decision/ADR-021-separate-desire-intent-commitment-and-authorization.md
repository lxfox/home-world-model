# ADR-021: Separate desire, Intent commitment, fulfillment, and authorization

- Status: Proposed
- Date: 2026-07-19
- English normative text
- Chinese mirror: [`ADR-021-separate-desire-intent-commitment-and-authorization.zh-CN.md`](ADR-021-separate-desire-intent-commitment-and-authorization.zh-CN.md)

## Context

Task Lineage binds work to an exact Intent, but HWM previously represented Intent only as a naked identifier inside Action Traces and Task bindings. That leaves no interoperable proof that a preference, natural-language request, inferred routine, Agent suggestion, or Goal Claim was adopted by the household, nor any rule for changing or withdrawing it.

## Options

1. Treat any utterance or Agent-inferred goal as household Intent.
2. Treat an accepted Goal Claim or active Task as proof of Intent.
3. Add Intent as a universal Core mental-state primitive.
4. Define an optional Intent Commitment Profile that separates declarative Definition, Authority commitment, fulfillment assurance, Task derivation, and Action Authorization.

## Decision

Adopt option 4 as a Profile discussion candidate.

An Intent Definition contains declarative Goal, Requirement, and Constraint bindings. It is not adopted merely because it exists or is epistemically accepted. Authority separately adopts, suspends, retracts, or supersedes the exact Definition. Commitment and fulfillment are independent state axes.

Intent identity is a household-controlled lineage bound to household, purpose, lifecycle kind, beneficiaries, and scope. Expectations may evolve within the lineage only through a sequential, content-bound, Authority-approved revision with explicit expectation lineage. Replacing all expectations or changing the identity basis creates a new Intent.

Tasks bind an exact Intent Definition revision. Intent revision never mutates existing Tasks. Intent adoption never authorizes a particular Proposal, and Intent retraction never silently cancels Tasks or revokes existing Authorization Decisions.

## Reason

This supplies the missing semantic bridge between household knowledge and household-directed work while preserving HWM’s existing Authority, evidence, privacy, and action boundaries. It follows the “what, not how” and assurance principles in RFC 9315 without importing a telecommunications control architecture or claiming access to private human mental state.

## Consequences

- A user command becomes an attributable candidate before it becomes household commitment.
- Agents may propose Intent Definitions but cannot self-adopt them.
- Personal preferences remain personal and cannot be merged into a household Intent by inference.
- Persistent goals can survive Agent and Task replacement while retaining time-bound fulfillment evidence.
- Implementations need append-only Definition and State histories plus Authority decision bindings.
- No universal priority, vote, utility function, planner, or new Core primitive is introduced.

## Rejection conditions

Reject or revise this decision if external implementations cannot distinguish ordinary expectation refinement from unrelated replacement, if household users cannot understand the candidate/adopted boundary, or if an adopted open standard provides equivalent household-scoped commitment, evidence, revision, and Authority semantics.
