# ADR-067: Limit the Claim scope lattice to exact-identifier selectors

- Status: Accepted as candidate-boundary refinement; Core clarification not accepted
- Date: 2026-07-19
- Refines: ADR-066
- Chinese mirror: [`ADR-067-limit-claim-scope-lattice-to-exact-identifier-selectors.zh-CN.md`](ADR-067-limit-claim-scope-lattice-to-exact-identifier-selectors.zh-CN.md)

## Context

ADR-066 described Claim scope as a top／finite-set／bottom algebra. Adversarial review found that calling every constraint an axis was too broad. Core Claim scope contains two optional arrays, but the complete Claim also has a required household boundary and optional validity interval. Space hierarchy belongs to external topology vocabularies. These constraints do not share one carrier set or one comparison operation.

## Decision

1. Apply the top／finite-set／bottom lattice only to the optional exact-identifier selectors `scope.space_ids` and `scope.purposes`.
2. Treat required `scope.household_id` as an exact identifier equality guard, not a set selector. A mismatch is disjoint.
3. Treat `claim.valid_time` as an interval predicate, not a selector member. Outside the interval is disjoint; a required comparison with unknown time is indeterminate.
4. Exact selector membership performs no transitive closure, containment, aliasing or taxonomy inference. A listed floor does not contain a room and a listed purpose does not include a subpurpose merely by identifier shape or label.
5. A separately governed relation resolver may qualify a requested identifier using declared topology or taxonomy evidence. Its output is purpose-, time- and evidence-bound and does not rewrite the Claim or expand its canonical selector bytes.
6. Compose the typed constraints by conjunction: one known disjoint result is absorbing; unresolved required comparison is indeterminate; only all satisfied constraints yield contained. Matching dimensions never compensate for a mismatch.
7. `contained` remains a use-relation result only. It grants no disclosure, evidence standing, applicability, trust or action Authority.

## Consequences

- The candidate no longer pretends identity, time and topology are instances of one set algebra.
- The empty-array repair remains compatible and requires no wire-structure change.
- Hierarchical convenience requires explicit resolver evidence rather than hidden wildcard semantics.
- The externally proposed five-input empty-array trial remains sufficient for its wire counterexample; thirty-one internal cases now protect the wider evaluation boundary.
- Core normative clarification remains unaccepted pending governance and independent evidence.
