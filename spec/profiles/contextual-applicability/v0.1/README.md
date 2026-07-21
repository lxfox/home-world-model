# HWM Contextual Applicability Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile determines whether one accepted Preference, Goal, Requirement, or Constraint Claim is relevant to one exact household use at one time. It connects resolved situational context to directed household knowledge without treating context as a Need, priority, Intent, or permission.

The normative chain is:

`target Claim + accepted Applicability Rule Claim + purpose-bound condition Assessments → Contextual Applicability Assessment`

The Profile adds no Core `Need`, Preference, Requirement, Rule, or Context primitive. Target and Rule are ordinary immutable Claims; condition semantics remain in declared external Profiles; the Assessment is a Profile-local exchange artifact.

## Why Applicability Is Its Own Decision

These questions are different:

1. **Acceptance:** may the resolver rely on this Claim for this requester and purpose?
2. **Applicability:** should the accepted Claim be considered in this exact context?
3. **Satisfaction or fit:** does the current world meet the preferred or required condition?
4. **Conflict:** do two or more applicable targets overlap and have incompatible content?
5. **Priority or coordination:** what process decides among them?
6. **Intent:** has the household committed to pursuing an outcome?
7. **Authorization:** may one exact Proposal be executed?

For example, resident A's accepted 19–21 °C sleeping preference can be applicable while A is sleeping, currently satisfied at 20 °C, conflicting with another applicable preference, and still produce no household Intent or device action.

## Target Claims

The Profile may evaluate an ordinary Claim whose content is a subject-scoped:

- Preference: a condition the subject tends to favor;
- Goal: a desired condition;
- Requirement: a threshold or outcome that a declared process treats as required; or
- Constraint: a limit on an otherwise possible outcome or method.

“Directed condition Claim” is explanatory shorthand for those four roles, not an ontology class. Claim acceptance does not establish applicability. A learned pattern, utterance, sensor Observation, Forecast, model label, or Agent-inferred Need is not automatically a target Claim.

## Applicability Rule Claims

An Applicability Rule Claim is an ordinary HWM Claim whose proposition subject is the target Claim identifier and whose predicate is:

`https://homeworldmodel.org/spec/profiles/contextual-applicability/v0.1#qualifiedBy`

Its object declares one operator and zero or more conditions:

- `all_of`: every condition must be satisfied;
- `any_of`: at least one condition must be satisfied;
- `unconditional`: explicitly no context condition; it is never inferred from a missing rule or empty input.

Each condition binds an exact external query, an expected `satisfied` result, and any target-to-context subject alignment. v0.1 expresses negation inside the bound query semantics rather than by expecting `not_satisfied`; this keeps aggregation independent of a condition Profile's false-world assumptions. The Profile does not define a universal query DSL. The fixture consumes a [Situation Use Assessment](../../situational-context/v0.1/README.md), but another declared Profile may supply a policy-window, calendar, environmental, relationship, or other condition Assessment.

A Rule Claim has its own issuer, time, scope, epistemic basis, evidence, and World View resolution. An Agent-authored or learned Rule cannot govern merely because it exists. Rule correction or change creates a new Claim and later Assessment; it does not mutate earlier history.

## Assessment Contract

The [`Applicability Assessment`](applicability-assessment.schema.json) binds:

- one exact target World View digest, purpose, `as_of`, and Authority Epoch;
- the exact immutable Claim Body digests of the target and Rule;
- their separate World View resolution identifiers and orthogonal statuses;
- the Rule operator and evaluation coverage;
- each disclosed condition query and Assessment digest;
- one applicability result and one separate conflict status;
- reason codes and proof material.

Target and Rule normally qualify only when available, accepted, fresh enough, and `in_effect` or `unbounded`. An accepted target that is explicitly `expired` or `not_yet_in_effect` is `not_applicable` at that `as_of`. Missing, denied, unavailable, contested, unknown, not verified, stale, mixed, or indeterminate target or Rule knowledge is `indeterminate`.

## Three-Valued Condition Logic

The applicability result is:

- `applicable`: the target and Rule qualify and the explicit boolean rule is satisfied;
- `not_applicable`: target time explicitly excludes `as_of`, or the rule is conclusively false;
- `indeterminate`: the evaluator lacks a conclusive, content-bound basis.

For `all_of`, one explicit `not_satisfied` condition proves `not_applicable`; all conditions must be known and `satisfied` to prove `applicable`. For `any_of`, one `satisfied` condition proves `applicable`; every condition must be known and `not_satisfied` to prove `not_applicable`. Otherwise the result is `indeterminate`.

This is a narrow Kleene-style three-valued aggregation boundary, not a general rule engine. A condition's `not_satisfied` result must already be justified under its own Profile. Absence of a Claim, access denial, a different label, or an unknown subject never becomes false here.

## Decisive Subsets and Privacy

The Assessment declares `complete`, `decisive_subset`, or `partial` evaluation coverage. A decisive subset may stop evaluation when one `all_of` condition is false or one `any_of` condition is true. It does not claim complete disclosure and must not expose the value, identity, count, source, or even existence of inputs that the requester may not access.

`partial` visible inputs never prove that all `all_of` conditions are satisfied or all `any_of` alternatives are false. An opaque, authorized condition Assessment may be decisive without revealing its underlying subjects.

## Conflict Is Orthogonal

Applicability is evaluated per target. Conflict is a separate assessment over overlapping applicable targets, their subjects, properties, scopes, purposes, and times. Different values are not automatically conflicting: the subjects may differ, the scopes may not overlap, or both outcomes may be jointly satisfiable.

The Assessment carries `conflict_status = not_evaluated | none | present | indeterminate` separately from `result`. `present` binds an independent conflict Assessment. Conflict does not make a Claim non-applicable, select a winner, invent priority, merge preferences, or authorize compromise. Existing Shared Action Coordination and Authority rules determine any required process.

Core v0.1's inline World View `applicability.status` remains a lossy compatibility projection:

| Canonical Profile result | Conflict status | Legacy projection |
|---|---|---|
| `applicable` | `none` or `not_evaluated` | `applicable` |
| `applicable` | `present` | `conflicting` |
| `not_applicable` | any | `out_of_scope` |
| `indeterminate` | any | `not_available` |

Consumers implementing this Profile MUST use the separate axes and MUST NOT interpret legacy `conflicting` as a canonical applicability value.

## No Privileged Need Inference

HWM does not add a generic `Need` fact. “Resident A needs heat” can hide at least three different claims: A favors a warmer range, the current temperature does not fit that range, and the household has committed to changing it. This Profile establishes only the first Claim's contextual relevance.

An Agent may issue an attributed inferred Claim or candidate Intent Definition. It cannot make its inference a household fact or commitment. A pet's behavior likewise remains descriptive evidence; a caretaker or model may issue an attributed welfare Goal or Requirement, subject to normal acceptance and Authority.

An `applicable` result does not establish urgency, priority, dissatisfaction, welfare necessity, household preference, Intent, Routine activation, Task, Plan, Proposal, permission, dispatch, or outcome.

## Standards and Research Boundary

- [Dey, “Understanding and Using Context”](https://doi.org/10.1007/s007790170019) motivates treating context as information relevant to an entity–application interaction, not as a single global state.
- [Bellotti and Edwards, “Intelligibility and Accountability”](https://doi.org/10.1207/S15327051HCI16234_05) shows why sensed context alone cannot safely stand in for human aspects of a situation and why systems need intelligible deferral.
- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies reusable boolean/logical Constraint concepts and the rule that declared constraint semantics must be understood. HWM does not reinterpret a household Preference as an ODRL permission.
- [Context-Aware Recommender Systems](https://doi.org/10.1007/978-0-387-85820-3_7) treats context as an input to preference-sensitive recommendation; recommendation remains downstream and non-authoritative here.
- [SimuHome](https://arxiv.org/abs/2509.24282) and [SMH-Bench](https://arxiv.org/abs/2606.01912) provide recent evidence that smart-home LLM Agents still struggle with latent intent, ambiguity, temporal state, and personalized reasoning. Their benchmarks motivate explicit boundaries but do not define this wire contract.

## Invariants

1. Accepted and applicable are separate.
2. Applicable, satisfied, conflicting, prioritized, adopted, and authorized are separate.
3. Target and Rule are immutable, independently accepted Claims.
4. A missing Rule never means unconditional applicability.
5. Applicability binds exact target, Rule, View, condition, purpose, time, and Authority contents.
6. `not_applicable` requires explicit target time exclusion or conclusive rule falsity.
7. Missing, denied, stale, contested, unknown, partially covered, or mismatched evidence is not false.
8. `all_of` and `any_of` use three-valued, fail-closed semantics.
9. A decisive subset proves only the result, not complete input disclosure.
10. Subject alignment is explicit; one person's situation does not activate another person's target.
11. Conflict is orthogonal to applicability and creates no priority or winner.
12. A learned Preference or Rule is a candidate until resolved for the exact use.
13. Personal applicability does not synthesize a household Preference or Intent.
14. There is no privileged Agent-inferred Need fact.
15. Applicability grants no Routine activation, Task, Proposal, Authorization, action, or outcome.

## Executable Evidence

The [Contextual Applicability oracle](../../../../conformance/scenarios/contextual-applicability-v0.1/README.md) contains 56 semantic cases, 20 model-boundary cases, and 90 forbidden inferences. It includes Core-valid target and Rule Claims, a purpose-bound World View, one bound Situation Use Assessment, and a schema-valid Applicability Assessment with verified digests.

JavaScript and Python independently reproduce the decision table. This is internal implementation diversity, not organizational independence, user validation, or proof that an upstream recognition or preference model is accurate.

## Non-goals

This Profile does not standardize human psychology, infer private mental state, define a universal context or preference vocabulary, prescribe a planner, rank goals, resolve household conflict, create a household welfare function, or authorize actions.
