# ADR-065: Reopen Core consideration for empty Claim scope axes

- Status: Accepted as a reopen decision; candidate wire change not accepted
- Date: 2026-07-19
- Chinese mirror: [`ADR-065-reopen-core-consideration-for-empty-claim-scope-axes.zh-CN.md`](ADR-065-reopen-core-consideration-for-empty-claim-scope-axes.zh-CN.md)

## Context

Core Claim `scope.space_ids` and `scope.purposes` are optional arrays without `minItems`. The contract permits omission, non-empty arrays and empty arrays, but defines no distinct business meaning for empty. “Unrestricted on this axis” and “applies to no member” are opposite, plausible interpretations of identical Base bytes. Existing cross-domain fixtures use omission and non-empty arrays but avoid empty arrays, so prior conformance did not expose the ambiguity.

## Decision

1. Reopen Core consideration for exactly `claim-scope-empty-array-semantics` under ADR-061. Do not reopen unrelated Core vocabulary.
2. Treat the candidate as internally proposal-eligible, not accepted. The checked-in Core Schema remains unchanged.
3. The minimal proposed delta rejects present empty `space_ids` and `purposes` with `minItems: 1`. Omission means no restriction is declared on that axis beyond other scope dimensions; it does not mean universal truth or grant any use/Authority.
4. Scope constraints compose by typed intersection. Known disjointness excludes the exact use; unknown comparison is indeterminate. Different dimensions cannot compensate for one another.
5. Existing omitted/non-empty Claims remain compatible. Empty-axis Claims require a new correction/migration artifact according to known intent; immutable Claims are never rewritten.
6. Acceptance requires Specification Change Governance, organizationally independent implementation evidence for omitted/non-empty/empty behavior, proportional privacy/security review and release/migration readiness.

## Consequences

- The convergence mechanism demonstrates that a freeze is falsifiable.
- Conceptual status becomes `reopened_for_bounded_core_clarification` while Core bytes remain frozen.
- No new primitive, field, enum or entity kind is proposed.
- A candidate-specific clean-room bundle is ready, but no external submission or independently admitted evidence exists yet.
