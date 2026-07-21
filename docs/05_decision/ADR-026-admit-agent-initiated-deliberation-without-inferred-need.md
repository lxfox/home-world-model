# ADR-026: Admit Agent-Initiated Deliberation Without an Inferred Need

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-026-admit-agent-initiated-deliberation-without-inferred-need.zh-CN.md`](ADR-026-admit-agent-initiated-deliberation-without-inferred-need.zh-CN.md)

## Context

Target Fit can establish that an applicable target is not met. Intent Commitment already lets an Agent author a candidate Definition while reserving adoption to household Authority. The missing boundary is whether an Agent-detected gap should be proactively raised at all. Directly mapping every gap to a candidate Intent or notification creates noise, privacy leakage, duplicate work, and automation bias. Calling the gap a system-owned Need incorrectly adds priority and normativity.

## Decision

1. Do not add a generic Opportunity or Need entity.
2. Add an optional Deliberation Eligibility Profile for Agent-initiated issue-raising.
3. Require an independently accepted Deliberation Policy Claim over the exact target.
4. Bind exact Target Fit, target, policy, World View, conditions, purpose, time, Authority Epoch, duplicate state, and existing Intent state.
5. Use `eligible | not_eligible | indeterminate` with fail-closed condition logic.
6. Treat duplicate/open deliberation, cooldown, existing work, and an adopted Intent for the exact target as suppression without erasing the target gap.
7. Keep explicit user requests, existing Intent drift, Routine occurrences, and emergency/safety duties on their own paths.
8. Eligibility may support an Agent-authored candidate Intent Definition but creates no adoption.
9. Eligibility grants no notification, disclosure, priority, planning, Proposal, Authorization, or action.

## Consequences

The household can govern when an Agent raises issues without pretending that every mismatch is a Need. Candidate generation becomes inspectable, deduplicated, privacy-aware, and separable from interruption UX. A household may deliberate and choose tolerance, deferral, correction, suppression, or commitment.

## Alternatives Rejected

- **Every unsatisfied target becomes a Need:** collapses evidence, value judgement, priority, and commitment.
- **Every gap becomes a candidate Intent:** creates unsolicited commitments and duplicates.
- **Let the LLM decide when to interrupt:** hides policy, provenance, privacy, and cooldown semantics.
- **Make Opportunity a durable Core entity:** reifies a purpose-bound assessment as universal household truth.
- **Require this gate for explicit user requests:** misattributes user agency to an Agent inference.

## References

- [RFC 9315](https://www.rfc-editor.org/rfc/rfc9315.html)
- [Cohen and Levesque, “Intention Is Choice with Commitment”](https://doi.org/10.1016/0004-3702(90)90055-5)
- [Rao and Georgeff, “BDI Agents”](https://users.cs.utah.edu/~tch/notes/refs/Rao-Georgeff1995.pdf)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [Automation Bias in AI-Decision Support](https://pubmed.ncbi.nlm.nih.gov/39234734/)
