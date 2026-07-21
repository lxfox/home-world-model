# ADR-076: Preserve Agent interpretation divergence without voting on truth

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-076-preserve-agent-interpretation-divergence-without-voting-on-truth.zh-CN.md`](ADR-076-preserve-agent-interpretation-divergence-without-voting-on-truth.zh-CN.md)

## Context

ADR-075 allows independent Agents to reconstruct household recognition. They may still produce different results. Calling every difference “disagreement” and asking Agents to vote would mix different input disclosure, purposes, times, Authority states, Profile versions, Resolver policies, implementation defects, legitimate judgment latitude and actual epistemic contest. It would also let model count or confidence become household truth.

Core World View already preserves Candidates and conflicts. Evidence Standing qualifies inputs; Conformance Sets and capability negotiation fix executable roles; household Authority and action procedures close actions independently from epistemic resolution. A composition rule is sufficient.

## Decision

1. Before comparing outputs, content-bind household, proposition/scope, purpose, requester/audience, disclosed input closure, `as_of`, Authority epoch, Profile/Resolver versions, procedure configuration and output role.
2. Treat binding differences as distinct or incomparable Assessments, not votes on one answer.
3. Treat different accepted Resolver policies as attributed policy-relative results. An Agent cannot choose the household's policy.
4. Treat divergent outputs under one deterministic contract and exact inputs as a conformance/reproducibility discrepancy, not epistemic contest.
5. Where a qualified procedure permits judgment latitude or declared nondeterminism, preserve individual attributed runs and apply only its declared acceptance rule. Retries are not independent evidence.
6. Incompatible qualified evidence or candidate conclusions for one exact proposition remain `contested`, `unknown`, or otherwise Resolver-qualified. Do not force one answer.
7. Agent count, model size/recency, confidence, latency, eloquence and vendor reputation provide no truth-ranking rule or Evidence Standing.
8. An accepted exact Resolver may materialize a purpose-bound World View and receipt while preserving candidates, exclusions, conflicts and reason codes. Selection for one View is not global truth.
9. Authority may accept an exact uncertainty, choose a robust/reversible action path, or select an action under policy. This does not resolve the epistemic contest.
10. If unresolved interpretations have materially different downstream consequences and no accepted bounded action procedure applies, the next transition is indeterminate.
11. Any active probe remains subject to least-impact acquisition, household Authority and local safety. Disagreement grants no experiment power.
12. Non-overridable local safety defeats unanimous Agent recommendation. Conversely, safety cannot choose physical truth or household preference.
13. New evidence creates a new Assessment and preserves the historical basis of earlier decisions and Authorizations.

## Consequences

- Multiple Agents can provide genuine plurality without becoming an ungoverned voting chamber.
- Household action can sometimes proceed safely under declared uncertainty without pretending the knowledge dispute disappeared.
- Deterministic interoperability defects remain visible instead of being misreported as philosophical disagreement.
- Thirty executable cases cover binding normalization, policy differences, defects, judgment, contest, ranking proxies, action closure, safety and historical preservation.
