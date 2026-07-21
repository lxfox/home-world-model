# ADR-024: Separate Contextual Applicability, Conflict, Need Inference, and Intent

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-024-separate-contextual-applicability-conflict-and-intent.zh-CN.md`](ADR-024-separate-contextual-applicability-conflict-and-intent.zh-CN.md)

## Context

Situational Context now answers a purpose-bound version of “what is happening”. It does not answer whether one person's Preference, a household Requirement, or a safety Constraint should be considered in that situation. Core v0.1 includes an optional inline `applicability.status`, but its values combine per-target relevance (`applicable`, `out_of_scope`, `not_available`) with cross-target conflict (`conflicting`). It does not bind an exact Rule, input Assessments, subject alignment, decisive coverage, or a reproducible three-valued decision.

Collapsing this gap into an inferred `Need` is unsafe. “A is sleeping”, “A prefers 19–21 °C while sleeping”, “the room is 25 °C”, “the preference is not satisfied”, “the household should cool the room”, and “this cooling Proposal is allowed” are six different propositions and decisions. The same distinction applies to pet welfare, energy limits, accessibility, quiet hours, and shared-space comfort.

Context research treats relevance as interaction-specific rather than global. Human-computer interaction research also warns that many human aspects of context cannot be sensed reliably and must remain intelligible and deferrable. ODRL provides reusable conditional-expression concepts but does not turn a Preference into a permission. HWM already supplies immutable Claims, purpose-bound World Views, separate epistemic statuses, Authority, Intent Commitment, Coordination, and Situation Use Assessment.

## Decision

1. HWM MUST NOT add a privileged, generic `Need` fact or infer household commitment from context.
2. Preference, Goal, Requirement, and Constraint remain ordinary, subject- and scope-bound Claims. “Directed condition Claim” is Profile shorthand, not a Core class.
3. Contextual applicability requires a separate, accepted Applicability Rule Claim. Missing or empty Rule knowledge MUST NOT imply unconditional applicability.
4. A Rule Claim binds the target Claim identifier, an explicit `all_of`, `any_of`, or `unconditional` operator, exact external condition queries, expected results, and subject-alignment semantics. It has independent issuer, evidence, time, scope, acceptance, and correction history.
5. A Contextual Applicability Assessment binds exact World View, target Claim Body, Rule Claim Body, condition Assessment, purpose, `as_of`, Authority Epoch, and coverage contents.
6. Canonical applicability is three-valued: `applicable`, `not_applicable`, or `indeterminate`.
7. `not_applicable` requires explicit target-time exclusion or conclusive Rule falsity. Missing, denied, unavailable, stale, contested, unknown, not verified, partial, or binding-mismatched knowledge remains `indeterminate`.
8. `all_of` and `any_of` use fail-closed three-valued aggregation. A decisive subset MAY prove the boolean result without disclosing every input; it MUST NOT claim complete coverage or leak hidden inputs.
9. Applicability and conflict are orthogonal. Conflict is evaluated over overlapping applicable targets and cannot make a target non-applicable, choose priority, merge preferences, or select a winner.
10. Core v0.1's combined inline status remains a lossy compatibility projection only. Profile-aware consumers use separate applicability and conflict axes.
11. Applicability and target satisfaction/fit are separate. Applicable does not mean satisfied, violated, urgent, or necessary.
12. A learned Preference, inferred welfare Requirement, or Agent-authored Rule remains an attributed candidate until accepted for the exact use. Pet behavior does not issue a human-like Intent.
13. An applicable target grants no household Preference synthesis, Intent adoption, Routine activation, Task, Plan, Proposal, Authorization, dispatch, or physical outcome.
14. The new behavior remains in an optional Contextual Applicability Profile and does not add a Core ontology primitive.

## Consequences

- Any compatible Agent can explain exactly which target, Rule, context Assessment, time, purpose, and Authority state made knowledge relevant.
- A household can change when a Preference applies without rewriting the Preference or historical Assessments.
- Unknown context fails closed without being converted to false, while decisive short-circuiting can reduce privacy disclosure.
- Personal preferences can remain simultaneously applicable and conflicting without being merged into a household utility function.
- “Need” remains a conversational or attributed domain Claim rather than a system-owned truth shortcut.
- Existing inline World View applicability data requires a documented lossy projection during migration.

## Alternatives Rejected

### Infer a Need directly from activity or sensor state

Rejected because it collapses description, personal preference, fit, commitment, priority, and permission, while hiding the inference author and its uncertainty.

### Put conditions inside an opaque Preference object only

Rejected because an Agent could not independently bind, revise, resolve, or explain the Rule and its Authority standing.

### Treat a missing Rule as unconditional

Rejected because nondisclosure, unavailable storage, old clients, and genuinely unconditional targets would become indistinguishable.

### Keep `conflicting` as a canonical applicability value

Rejected because one target may be applicable and conflict with another at the same time. Conflict is relational, not a mutually exclusive per-target relevance state.

### Use binary condition logic

Rejected because unknown, denied, stale, contested, and partially covered household knowledge would be silently converted to false or true.

### Let the LLM choose among applicable targets

Rejected because ranking, household governance, coordination, Intent adoption, and action authorization are distinct downstream processes.

## Validation Required Before Acceptance

1. An external implementation reproduces `all_of`, `any_of`, explicit unconditional, target-time, decisive-subset, and binding-failure cases.
2. Household research tests whether explanations distinguish “relevant”, “not currently relevant”, “unknown”, “conflicting”, and “the system will act”.
3. Privacy review tests whether decisive subsets, opaque condition Assessments, and legacy projections leak hidden subject, count, identity, or source information.
4. Preference and Rule revision tests preserve immutable history and reject Claim ID/content collisions.
5. Multi-resident and pet-welfare studies test attribution, subject alignment, caregiver claims, conflict, and non-human Intent boundaries.
6. Home Assistant and another runtime demonstrate adapters that do not convert unavailable context into false or an applicable target into automation permission.
7. A future Core revision either removes the combined inline status or specifies the lossy projection without making it canonical.

## References

- [Dey, “Understanding and Using Context”](https://doi.org/10.1007/s007790170019)
- [Bellotti and Edwards, “Intelligibility and Accountability”](https://doi.org/10.1207/S15327051HCI16234_05)
- [ODRL Information Model 2.2](https://www.w3.org/TR/odrl-model/)
- [Adomavicius and Tuzhilin, “Context-Aware Recommender Systems”](https://doi.org/10.1007/978-0-387-85820-3_7)
- [SimuHome](https://arxiv.org/abs/2509.24282)
- [SMH-Bench](https://arxiv.org/abs/2606.01912)
