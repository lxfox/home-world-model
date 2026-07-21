# ADR-054: Cluster interoperability evidence by design lineage

- Status: Accepted for Base Exchange v0.1 evidence governance
- Date: 2026-07-19
- Chinese mirror: [`ADR-054-cluster-interoperability-evidence-by-design-lineage.zh-CN.md`](ADR-054-cluster-interoperability-evidence-by-design-lineage.zh-CN.md)

## Context

The challenge can now admit one submission as project-owned, externally coordinated, independently implemented, excluded or indeterminate. It does not yet say how several admitted assessments bear on one proposition. Counting implementations is unsound: forks, translations, generated rewrites, shared reference code, one organization using several repositories, or several organizations following one material design path can repeat one failure mode without adding independent evidence. Conversely, organizational separation alone does not prove design independence.

## Decision

1. An Evidence Portfolio binds one exact, immutable proposition: the same Base Exchange version, challenge manifest digest, behavior scope and assessment policy.
2. The unit of input is a content-bound admitted Assessment, never a submitter's self-declared label or a raw pass count.
3. Assessments sharing material implementation ancestry, reference outputs, generated-code lineage, project design assistance or an unbroken derivation path belong to one `design_lineage_cluster`, even across languages, repositories or organizations.
4. Unknown lineage is not independent lineage. It remains unresolved and cannot satisfy an independence claim.
5. Organization, runtime, parser stack, operating environment and reviewer lineage are recorded as diversity dimensions. No single dimension is a proxy for the others, and no weighted diversity score is normative.
6. Project-owned and coordinated evidence may establish reproducibility within their disclosed lineage. Only admitted independent assessments from separately supported design lineages can establish `independently_reproduced_with_limits`.
7. A current admitted technical failure, integrity failure or unresolved contradiction for the exact proposition prevents a positive current summary. The Portfolio becomes `contested` or `indeterminate`; majority passage cannot erase negative evidence.
8. Every Portfolio has an `as_of` time and per-input applicability state. Superseded challenge versions, withdrawn evidence and expired reproduction windows remain historical records but do not count as current support.
9. Portfolio conclusions are monotonic only as history: new evidence appends a new revision and may strengthen, weaken or contest the current conclusion. It never rewrites prior assessments.
10. `independently_reproduced_with_limits` means empirical structural/preservation interoperability for the exact proposition. It does not mean community consensus, specification adoption, certification, production safety, market acceptance, trust, access or action authority.

## Consequences

- Ten renamed forks still count as one design lineage.
- Two independent implementations may provide stronger evidence than many correlated implementations, but the model does not set an arbitrary adoption threshold.
- A governance body may later define a separate adoption process; it must cite this empirical evidence without collapsing it into social consensus.
- The aggregation mechanism remains challenge governance, not a household Core primitive or optional household Profile.

## Rejected alternatives

- **Count repositories, organizations, languages or models:** each can conceal common design ancestry.
- **Use a composite diversity score:** weights would manufacture precision and allow strength on one axis to compensate for a failed boundary.
- **Let a majority override failures:** interoperability counterexamples are proposition-relevant evidence, not votes.
- **Call two passes consensus:** empirical replication and social adoption answer different questions.

