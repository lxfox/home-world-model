# ADR-025: Separate Target Fit, Experience, and Action

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-025-separate-target-fit-experience-and-action.zh-CN.md`](ADR-025-separate-target-fit-experience-and-action.zh-CN.md)

## Context

Contextual Applicability establishes whether a target matters now, but deliberately does not say whether the current world meets it. Existing Goal Evaluation is action-trace-bound, renovation Requirement Evaluation is simulated, and Intent fulfillment applies only after commitment. None supplies a reusable pre-action assessment of an applicable target against current household state.

A raw observation is insufficient. The same 25 °C value can refer to a different room, time, property, sensor procedure, uncertainty, or target scope. It can establish failure of a declared numeric preference without proving subjective discomfort. Conformity metrology likewise requires measurement uncertainty and a decision rule.

## Decision

1. Add an optional Target Fit Profile, not a Core primitive.
2. Require an independently accepted Evaluation Specification Claim that binds the target to criteria, procedures, uncertainty-aware decision rules, and aggregation.
3. Bind each Assessment to exact target, specification, applicability Assessment, World View, purpose, time, Authority Epoch, and evidence content.
4. Use `met | not_met | indeterminate` per criterion and `satisfied | partially_satisfied | not_satisfied | indeterminate` for the aggregate.
5. Keep `not_applicable` outside fit. Non-applicable or unknown applicability makes fit indeterminate.
6. Permit partial satisfaction only under an explicit multi-criterion aggregation rule.
7. Keep measured fit and personal experience attestation on separate axes unless the target explicitly makes attestation a criterion.
8. Keep current fit distinct from predicted fit, action Effect Assessment, post-action Goal Evaluation, Intent fulfillment, Need, priority, and authorization.
9. Treat missing, denied, stale, contested, mismatched, unit-incompatible, and boundary-ambiguous evidence as indeterminate.
10. Fit grants no Intent, Task, Proposal, Authorization, dispatch, or action.

## Consequences

Any compatible Agent can reproduce why a target was judged met or unmet without adopting the original model's hidden proxy. Households can revise how a vague preference is operationalized without rewriting the preference. Sensor evidence and lived experience can disagree without either being silently erased. The model gains an explicit bridge from world knowledge to goals while retaining governance boundaries.

## Alternatives Rejected

- **Compare raw values inside the Agent:** hides scope, procedure, uncertainty, and decision authority.
- **Put evaluation semantics only inside the target:** prevents independent revision and acceptance of the measurement method.
- **Treat near-threshold as partial satisfaction:** confuses deviation with multi-criterion aggregation.
- **Treat sensor fit as comfort:** mistakes an operational proxy for personal experience.
- **Reuse action success:** a target may already be satisfied before an action or remain unsatisfied despite correct execution.

## References

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [EARL 1.0](https://www.w3.org/TR/EARL10-Schema/)
- [SHACL](https://www.w3.org/TR/shacl/)
- [JCGM 106:2012](https://www.bipm.org/en/doi/10.59161/jcgm106-2012)
