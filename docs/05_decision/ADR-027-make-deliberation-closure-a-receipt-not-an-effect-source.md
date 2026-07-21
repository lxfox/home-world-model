# ADR-027: Make Deliberation Closure a Receipt, Not an Effect Source

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-027-make-deliberation-closure-a-receipt-not-an-effect-source.zh-CN.md`](ADR-027-make-deliberation-closure-a-receipt-not-an-effect-source.zh-CN.md)

## Context

Deliberation Eligibility controls whether an Agent-detected gap may enter a household queue. Once interaction occurs, a single “yes”, “no”, dismissal, correction, or timeout cannot safely encode the outcome. It may concern a factual premise, candidate Intent, revisit time, prompting policy, current tolerance, or exact Action Proposal. Existing Profiles already own Claim correction, Intent adoption/revision, evidence standing, and authorization.

## Decision

1. Add an optional Deliberation Closure Profile, not a Core conversation entity.
2. Treat Closure Assessment as a receipt over issue basis, interaction Records, and independently effective outcome artifacts.
3. Preserve issue origin: Agent gap, explicit user request, existing Intent review, or manual household deliberation.
4. Permit multiple typed effects: Intent adoption, candidate rejection, tolerance Claim, deferral policy, raising-policy revision, target correction, and Intent revision.
5. Require each effect to retain its own Authority, qualification, content, scope, time, and provenance. Closure cannot make it effective.
6. Use `resolved`, `closed_without_decision`, `expired`, `superseded`, or `indeterminate` for closure status.
7. Require complete effect coverage and all disclosed effects verified for `resolved`.
8. Silence, timeout, dismissal, expiry, or an Agent summary creates no consent, rejection, tolerance, or suppression.
9. Candidate rejection does not reject the target; tolerance does not satisfy fit; deferral does not indefinitely suppress; suppression does not retract the target; correction does not mutate history.
10. Verified effects remain independently effective when another disclosed effect makes aggregate closure indeterminate; HWM claims no cross-system atomic rollback.
11. Closure grants no planning, Proposal, Authorization, dispatch, or action.

## Consequences

Interfaces may remain simple while their domain effects stay precise. Residents can correct the Agent, tolerate a mismatch, defer discussion, or change prompting policy without accidentally adopting or erasing a goal. Multi-effect responses remain auditable, and incomplete closure cannot hide effects that did or did not separately take effect.

## Alternatives Rejected

- **One accepted/rejected outcome:** collapses different propositions and powers.
- **Let the Closure artifact cause every effect:** bypasses Claim resolution and Authority Profiles.
- **Treat dismissal as rejection:** invents meaning from absence.
- **Atomically roll back all effects:** cannot be guaranteed across independent stores and authorities.
- **Overwrite the old target on correction:** destroys provenance and earlier World Views.

## References

- [Clark and Brennan, “Grounding in Communication”](https://collablab.northwestern.edu/CollabolabDistro/nucmc/ClarkAndBrennan-GroundingInCommunication-1991.pdf)
- [Horvitz, “Mixed-Initiative Interaction”](https://www.microsoft.com/en-us/research/publication/mixed-initiative-interaction/)
- [RFC 9315](https://www.rfc-editor.org/info/rfc9315/)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
