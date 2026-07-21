# ADR-055: Separate specification decision, publication and adoption

- Status: Accepted as project-governance candidate
- Date: 2026-07-19
- Chinese mirror: [`ADR-055-separate-specification-decision-publication-and-adoption.zh-CN.md`](ADR-055-separate-specification-decision-publication-and-adoption.zh-CN.md)

## Context

HWM now separates implementation results, evidence admission and lineage-aware empirical replication. None of those determines whether a proposed normative change should enter a release, whether a release should be published, or whether another party adopts it. A maintainer decree would self-grant legitimacy; a raw majority would collapse heterogeneous objections into votes; requiring unanimity would let any participant silently veto progress.

## Decision

1. Govern one content-bound Change Proposal under one versioned Decision Policy. Proposal revision, review inputs and the policy digest are immutable inputs to a Decision Record.
2. Separate the roles `proposer`, `editor`, `reviewer`, `decision_steward`, `publisher` and `adopter`. Holding a role does not establish correctness, independence, affected-party representation or authority outside its declared policy scope.
3. Reviews are attributed positions (`support`, `object`, `abstain`, `no_position`) with rationale, scope, conflict disclosure and evidence references. Silence and absence never become support.
4. Objections are typed and individually disposed as `accepted`, `addressed`, `deferred_with_rationale`, `out_of_scope_with_rationale` or `unresolved`. A policy declares which objection classes block which decision outcomes. Vote totals cannot erase a blocking unresolved objection.
5. The Decision Record may conclude `accept`, `revise`, `reject`, `defer` or `procedurally_invalid`. It preserves dissent and explains evidence use, scope trade-offs and every objection disposition. It does not declare truth or consensus.
6. Conflict-of-interest and required-role coverage are procedural axes. Missing disclosure, policy mismatch, stale proposal revision, insufficient required review or an undisposed objection yields `procedurally_invalid` or `defer`; favorable counts cannot cure it.
7. `accept` authorizes the project publisher to prepare the exact accepted content for a named release line only. Publication is a separate signed/content-bound Release Record after integrity, licensing and release checks.
8. Adoption is an external, attributed Adoption Declaration made by a named adopter for an exact release, scope and date. Publication is not adoption; download, star, implementation, event attendance or silence is not adoption.
9. New evidence, appeal or changed requirements produce a new Proposal/Decision revision. Prior records remain immutable; later decisions do not retroactively erase dissent.
10. Governance legitimacy remains scoped and empirical: this procedure makes project decisions inspectable. It does not prove universal representation, legal authority, industry consensus or the right to govern households or external implementers.

## Consequences

- The project can progress without pretending unanimity, while unresolved policy-defined safety, interoperability or rights objections remain blocking.
- Minority reports and rejected alternatives remain first-class history.
- Evidence Portfolios inform decisions but cannot make them automatically.
- Releases and adoption can be measured by explicit attributed records rather than social-media proxies.
- This is project governance, not an HWM household Core primitive or Profile.

## Rejected alternatives

- **Maintainer discretion without a Decision Record:** expedient but non-auditable and self-legitimating.
- **Simple majority:** treats reasons, standing, conflicts and blocking counterexamples as interchangeable votes.
- **Unanimity:** turns non-response and strategic veto into implicit authority.
- **Automatic acceptance after independent replication:** confuses descriptive interoperability evidence with a normative project choice.

