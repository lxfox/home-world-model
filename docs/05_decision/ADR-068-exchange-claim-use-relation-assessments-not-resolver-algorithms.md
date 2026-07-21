# ADR-068: Exchange Claim Use Relation Assessments, not resolver algorithms

- Status: Accepted as non-normative system exploration; excluded from the bounded Core candidate
- Date: 2026-07-19
- Refines: ADR-067
- Chinese mirror: [`ADR-068-exchange-claim-use-relation-assessments-not-resolver-algorithms.zh-CN.md`](ADR-068-exchange-claim-use-relation-assessments-not-resolver-algorithms.zh-CN.md)

## Context

ADR-067 separated exact selector membership from spatial and purpose relation resolution. The remaining question was what an Agent should exchange after resolving a relation. Standardizing a graph engine, API or inference algorithm would capture implementation and private reasoning. Exchanging only `true` or `false` would lose the exact Claim, requested use, evidence, time and uncertainty needed for another Agent to audit or reproduce the result.

Existing Spatial Use Assessment is sufficient evidence for spatial registration and topology qualification, but it does not itself state whether one complete Core Claim contains one requested household use. Contextual Applicability evaluates a different question: whether an accepted directed Claim is relevant under an explicit Rule. Neither should be overloaded.

## Decision

1. Define a proposal-local `Claim Use Relation Assessment` candidate as the interoperable resolver output. Do not standardize the resolver algorithm, service or database.
2. Bind the Assessment to the exact Claim body digest and one requested household, optional space, purpose and `as_of` time.
3. Report `space_ids` and `purposes` separately with declared state, comparison kind, three-valued status, reason codes and content-bound relation evidence.
4. Report household equality and valid-time interval as separate typed guards.
5. Derive the overall relation by typed conjunction: known disjoint is absorbing; otherwise any indeterminate required comparison yields indeterminate; otherwise the use is contained.
6. A `resolved_relation` result without bound evidence is indeterminate. Missing, withheld, stale, contested or inaccessible evidence never becomes satisfied or false.
7. The Assessment is immutable evidence about one use. It does not rewrite the Claim, cache a universal closure, establish canonical topology, publish truth, grant access or supply action Authority.
8. Keep this artifact inside the Core-clarification proposal until its necessity and shape survive independent implementation. It is not part of the current five-input external wire trial and does not add a Core or optional Profile artifact yet.

## Consequences

- Any Agent can read, reproduce or contest a result without sharing chain-of-thought or adopting one resolver.
- Spatial, taxonomy and future relation Profiles remain responsible for their own evidence semantics.
- The same immutable Claim may have different legitimate Assessments for different uses, times, evidence access and tolerances.
- Twelve lifecycle cases cover exact, resolved, missing, withheld, stale, empty, mismatch and Authority boundaries.
- Promotion to an optional Profile remains a future governance decision, not an implication of this ADR.
