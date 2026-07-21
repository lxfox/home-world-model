# ADR-056: Report adoption as scoped evidence, not one number

- Status: Accepted as ecosystem-evidence candidate
- Date: 2026-07-19
- Chinese mirror: [`ADR-056-report-adoption-as-scoped-evidence-not-one-number.zh-CN.md`](ADR-056-report-adoption-as-scoped-evidence-not-one-number.zh-CN.md)

## Context

Specification governance now requires an attributed Adoption Declaration rather than inferring adoption from publication. A declaration still answers only one question: what a named actor says it has adopted. It does not prove implementation conformance, deployment, active use, downstream reliance, duration or market coverage. Conversely, observed traffic or a conforming implementation does not reveal organizational commitment. A single “adoption count” would mix claims with different subjects, scopes, time windows, denominators and privacy risks.

## Decision

1. Bind every Adoption Evidence item to an exact release digest, evidence kind, subject/adopter, scope, product or deployment population where applicable, observation time, issuer, method and limitations.
2. Keep six evidence kinds distinct: `adoption_declaration`, `implementation_assessment`, `deployment_observation`, `dependency_declaration`, `longitudinal_operation`, and `market_estimate`.
3. Build a purpose-bound Adoption View with separate axes `declared`, `implemented`, `deployed`, `depended_on`, `sustained`, and `market_estimated`. An axis may be `supported`, `not_supported`, `indeterminate`, `not_evaluated`, or `withdrawn`; axes do not promote one another.
4. Do not define a normative scalar adoption score, maturity ladder or universal threshold. A consumer names required axes, evidence policy, population and time window for its own question.
5. De-duplicate by the bound subject/product/deployment unit and evidence lineage. Repeated declarations, mirrors, telemetry events, repositories, installations behind one controller, or the same sampled population cannot be counted as independent adopters.
6. Counts require an explicit unit, population frame, coverage and denominator provenance. Unknown denominator yields a count or sample result, never a percentage or market share.
7. Deployment evidence should default to privacy-preserving aggregates. Household identities, addresses, device identifiers and activity traces are not required for ecosystem reporting; aggregate evidence still needs anti-reidentification review.
8. Revocation, withdrawal, release migration, product end-of-life and observation-window expiry append new evidence and change the current View without rewriting historical evidence.
9. A declaration is attributed self-report; a third-party observation is not authority to speak for the adopter. Conflicting evidence remains visible and may make an axis indeterminate.
10. No Adoption View establishes technical truth, full conformance, user satisfaction, beneficial outcomes, market dominance, community consensus, legal compliance, household trust, access or action authority.

## Consequences

- The project can say precisely “one organization declared adoption,” “two implementations passed,” or “a bounded deployment population was observed,” rather than claiming “five adopters.”
- Ecosystem growth becomes a set of inspectable claims and observations, not a vanity metric.
- Public dashboards must expose scope, denominator and freshness instead of ranking by a composite score.
- This is ecosystem governance, not a household Core primitive or Profile.

