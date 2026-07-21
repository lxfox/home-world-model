# ADR-070: Receipt World View selection without making cache authoritative

- Status: Accepted as non-normative system exploration; excluded from the bounded Core candidate
- Date: 2026-07-19
- Refines: ADR-069
- Chinese mirror: [`ADR-070-receipt-world-view-selection-without-making-cache-authoritative.zh-CN.md`](ADR-070-receipt-world-view-selection-without-making-cache-authoritative.zh-CN.md)

## Context

Core World View already expresses a requester-, purpose-, time-, Authority- and coverage-bound result. Purpose-Bound Disclosure governs release, while Agent Orientation Snapshot composes several Views for bounded orientation. They do not, however, expose a portable per-candidate lineage showing which Claim Use Relation and Revalidation Assessments justified selection. An implementation may otherwise cache only final JSON and silently turn an opaque materialization into the effective truth selector.

A new World View would duplicate Core. Listing every excluded Claim would violate minimization and leak hidden identities or counts. Requiring an imaginary standalone epistemic-resolution artifact would create a circular or nonexistent dependency because Core resolutions are inline.

## Decision

1. Keep Core World View as the final projection. Add only a proposal-local `World View Selection Receipt` candidate.
2. Bind the Receipt to the exact household, requester, purpose, `as_of`, `known_through`, Authority Epoch, coverage request, source snapshot, construction procedure, disclosure assessment and final World View content.
3. For every visible candidate considered, bind the Claim body, Claim Use Relation Assessment, Revalidation Assessment, inline epistemic status and actual Standing／evidence basis, plus the inclusion／exclusion decision and reason codes.
4. Do not create a separate epistemic-resolution primitive. The Receipt explains construction of the inline Core resolution.
5. Report coverage and unresolved registry state for every declared scope handle. Complete empty selection is meaningful only under complete closure.
6. Withheld or unavailable scope is reported opaquely. The Receipt never lists hidden candidate identifiers, values or counts merely to explain exclusion.
7. Contested candidates remain contested and bind their visible basis. Selection does not resolve conflict or pick a winner.
8. A cache hit is valid only for exact content, requester, purpose, time, Authority, coverage and source bindings. Mismatch rejects the cache entry.
9. The cache is non-normative and replaceable. The source artifacts, Assessments, Receipt and resulting World View form the reproducible lineage.
10. A Change Set after `known_through` requires revalidation or a newer source snapshot; a later `generated_at` alone does not prove currentness.
11. Keep the Receipt inside this proposal until independent implementation demonstrates that it is necessary and sufficient. Do not add it to Core, an optional Profile or the five-input external wire trial yet.

## Consequences

- Another Agent can audit why disclosed Claims entered a View without receiving private reasoning or hidden candidates.
- Empty, withheld, partial, unavailable and complete selection remain distinct.
- Implementations may cache aggressively without granting the cache semantic authority.
- Sixteen executable cases cover inclusion, exclusion, contest, opacity, coverage, empty results, cache keys and post-snapshot change.
