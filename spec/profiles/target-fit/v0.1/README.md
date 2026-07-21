# HWM Target Fit Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile determines whether one currently applicable Preference, Goal, Requirement, or Constraint is met by one purpose-bound view of the household. It does not infer comfort, welfare, Need, Intent, action success, or permission.

The normative chain is:

`applicable target Claim + accepted Evaluation Specification Claim + purpose-bound state World View -> Target Fit Assessment`

Target Fit adds no Core primitive. The target and its evaluation specification are immutable Claims; the Assessment is a Profile-local artifact.

## Separate Questions

1. **Applicability:** should this target be considered now?
2. **Fit:** does the declared current state meet it under an accepted evaluation specification?
3. **Experience:** does a person report comfort, satisfaction, or acceptance?
4. **Conflict and priority:** how do multiple applicable targets interact?
5. **Intent and authority:** will the household pursue a change, and may an action run?

A bedroom temperature of 25 °C may fail an applicable 19–21 °C preference under a declared sensor rule. It does not by itself prove that the resident feels uncomfortable, that cooling is needed, or that an Agent may start the air conditioner.

## Evaluation Specification Claims

An Evaluation Specification Claim has the target Claim identifier as subject and this predicate:

The optional [Requirement Operationalization Profile](../../requirement-operationalization/v0.1/README.md) governs how a human or Agent-authored proposal may become eligible for separate Authority acceptance as such a Claim. Target Fit does not treat an Agent-selected proxy as accepted merely because it is measurable.

`https://homeworldmodel.org/spec/profiles/target-fit/v0.1#evaluatedBy`

Its object declares one or more criteria and an aggregation rule. Every criterion binds:

- the exact feature of interest or measurement zone;
- the property being evaluated;
- the target condition, comparator, and unit;
- an observation or attestation procedure class;
- freshness and phenomenon-time requirements;
- an uncertainty-aware decision rule; and
- whether the criterion is required.

The specification has independent issuer, evidence, valid time, scope, acceptance, and correction history. A vague target such as “cozy” remains `indeterminate` until an accepted specification operationalizes it, possibly through personal attestation rather than a sensor. The Agent MUST NOT invent a numeric proxy.

## Criterion Results

Each criterion produces `met`, `not_met`, or `indeterminate`. Missing, denied, stale, contested, wrong-feature, wrong-property, unit-incompatible, procedure-incompatible, or time-mismatched input is `indeterminate`, not `not_met`.

For the fixture's interval rule:

- an uncertainty interval fully inside the accepted target interval is `met`;
- an uncertainty interval disjoint from the target interval is `not_met`; and
- an overlapping boundary interval is `indeterminate`.

This is one declared rule, not a universal law of measurement. A different conformity use may bind a guard band, asymmetric risk rule, qualified test procedure, or human judgement. Unit conversion is allowed only through an exact bound conversion specification.

## Aggregate Result

The Assessment result is `satisfied`, `partially_satisfied`, `not_satisfied`, or `indeterminate`.

- `all_required`: all required criteria `met` means `satisfied`; any required `not_met` means `not_satisfied`; otherwise `indeterminate`.
- `any_sufficient`: any sufficient criterion `met` means `satisfied`; all are `not_met` means `not_satisfied`; otherwise `indeterminate`.
- `report_partial`: all conclusive criteria `met` means `satisfied`; all `not_met` means `not_satisfied`; a conclusive mixture means `partially_satisfied`; any required unknown means `indeterminate`.

`partially_satisfied` is never inferred merely because a scalar is near a threshold. Nearness, margin, and deviation are measurements; partial satisfaction requires an explicit multi-criterion aggregation rule.

Applicability is an input precondition, so `not_applicable` is not a Target Fit result. If applicability is anything other than `applicable`, fit is `indeterminate` and records that precondition failure.

## Experience and Action Boundaries

A measured target result and a person's experience attestation are independent evidence channels. A target may explicitly make attestation a criterion; otherwise the Assessment reports experience as `not_evaluated`, `accepted`, `rejected`, or `indeterminate` on a separate axis. Sensor fit never silently becomes subjective comfort.

Current fit is not predicted fit, counterfactual benefit, action Effect Assessment, or Action Trace Goal Evaluation. Planning may project the same target and specification over a simulated state, but must label that epistemic basis. A post-action Goal Evaluation may bind a Target Fit Assessment, while action success and target fit remain distinct.

## Invariants

1. Applicable does not mean satisfied; unsatisfied does not mean needed.
2. Target content and evaluation method are independently accepted Claims.
3. No accepted Evaluation Specification means no conclusive fit result.
4. Every result binds exact target, specification, applicability Assessment, World View, purpose, time, Authority Epoch, and evidence content.
5. Feature, property, procedure, unit, time, and freshness must align.
6. Measurement uncertainty is handled by the declared decision rule, not discarded.
7. An average cannot prove a pointwise minimum unless the specification says so.
8. A sensor value does not prove subjective comfort or welfare.
9. `partially_satisfied` requires declared aggregation, not threshold proximity.
10. Missing or inaccessible evidence is indeterminate, not failure.
11. Each target is assessed separately; no household utility function is synthesized.
12. Fit creates no priority, Intent, Task, Proposal, Authorization, dispatch, or action.

## Standards Boundary

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) separates feature of interest, observed property, procedure, result, phenomenon time, and result time.
- [EARL 1.0](https://www.w3.org/TR/EARL10-Schema/) separates pass, fail, cannot tell, inapplicable, and untested outcomes; HWM keeps applicability outside fit rather than copying EARL's test vocabulary directly.
- [SHACL](https://www.w3.org/TR/shacl/) demonstrates explicit input-versus-shape validation and per-result evidence, but SHACL data-graph conformance is not proof of a physical or experiential household truth.
- [JCGM 106:2012](https://www.bipm.org/en/doi/10.59161/jcgm106-2012) establishes that conformity decisions depend on measurement uncertainty and a declared decision rule.

## Non-goals

This Profile does not standardize comfort science, define universal thresholds, diagnose health or welfare, rank residents, prescribe devices, evaluate legal compliance without a qualified procedure, or authorize action.

## Executable Evidence

The [Target Fit oracle](../../../../conformance/scenarios/target-fit-v0.1/README.md) contains 23 semantic cases, nine aggregation cases, and 13 forbidden inferences. JavaScript and Python independently reproduce the decision table. The [`Target Fit Assessment schema`](target-fit-assessment.schema.json) fixes the minimum exchange boundary; passing the fixture does not validate real measurement accuracy or human experience.
