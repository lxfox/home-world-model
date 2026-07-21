# ADR-029: Materialize Decision Structure, Not Chain-of-Thought

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-029-materialize-decision-structure-not-chain-of-thought.zh-CN.md`](ADR-029-materialize-decision-structure-not-chain-of-thought.zh-CN.md)

## Context

HWM distinguishes Task, Plan, Proposal, and Authorization, but Core does not say when a Plan must become portable. Persisting every private reasoning trace creates privacy, fidelity, portability, and volume problems. Persisting none lets decisions that span Proposals, Agents, household choice, review, assumptions, and contingencies disappear inside one model session. Generated chain-of-thought may also be an unfaithful explanation of actual model causation.

## Decision

1. Add an optional Plan Materialization Profile, not a Core cognition model.
2. Output `plan_artifact_required`, `proposal_self_contained`, or `indeterminate` under an accepted policy.
3. Require a portable Plan when downstream actors rely on cross-Proposal dependencies, handoff/continuity, alternative selection, method review, long-lived assumptions, cross-Proposal contingency, Task method continuity, explicit Plan reference, or policy audit.
4. Define Portable Plan as a versioned structured decision artifact, not raw prompt, hidden state, unrestricted conversation, secret, or chain-of-thought.
5. Bind exact Intent, optional Task, routing/materialization Assessments, source World View, scope, inputs, assumptions, steps, alternatives, checkpoints, contingencies, author, and proof.
6. Treat rationale summaries as attributed content, not proof of faithful internal reasoning.
7. Record only declared alternatives; omission proves neither consideration nor rejection.
8. Preserve Plan revision immutability. A Proposal remains bound to the exact revision it used.
9. Require every Proposal to be self-contained for Authorization even when it cites a Plan; inaccessible Plan content cannot hide actions, parameters, preconditions, or impacts.
10. Plan materialization, review, selection, or acceptance grants no Intent adoption, Proposal Authorization, dispatch, or outcome.

## Consequences

Agents may keep ephemeral computation private while households retain the method structure needed for handoff, comparison, audit, and reproducibility. Proposal authorization never depends on an opaque model context, and Plan history remains portable without pretending to expose model cognition.

## Alternatives Rejected

- **Persist all chain-of-thought:** privacy-invasive, model-specific, and not necessarily faithful.
- **Persist no Plan:** loses cross-session and cross-Agent decision structure.
- **Let Proposal reference an opaque Plan:** defeats impact and Authority review.
- **Require exhaustive alternatives:** impossible to prove and encourages fabricated completeness.
- **Treat selected Plan as authorized action:** collapses method choice and Proposal permission.

## References

- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [Turpin et al., “Language Models Don't Always Say What They Think”](https://proceedings.neurips.cc/paper_files/paper/2023/hash/ed3fea9033a80fea1376299fa7863f4a-Abstract-Conference.html)
- [Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf)
