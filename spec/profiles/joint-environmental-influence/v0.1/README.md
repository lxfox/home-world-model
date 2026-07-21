# HWM Joint Environmental Influence Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`joint-influence-scenario.schema.json`](joint-influence-scenario.schema.json), [`composition-model-specification.schema.json`](composition-model-specification.schema.json), [`joint-prediction-assessment.schema.json`](joint-prediction-assessment.schema.json)

## Purpose

This optional Profile qualifies predictions in which multiple installed or planned systems, environmental sources, spatial pathways, and controllers jointly affect one or more household properties. It prevents Agents from silently adding independent device effects.

The normative chain is:

`exact joint scenario + qualified component models/predictions + spatial use assessments + explicit interaction/composition model + validation and uncertainty -> Joint Prediction Assessment -> bounded Prediction candidate`

A joint prediction is not an Observation, causal attribution, requirement evaluation, selection, authorization, or guarantee.

## Joint Influence Scenario

An immutable Scenario binds household/design context, purpose, target features/properties, units and spatial/subject coverage, exact participating physical assets/endpoints or product options, action schedules and parameter trajectories, controller/feedback modes, initial state, time horizon and resolution, spatial assessments, exogenous baseline sources, boundary conditions, shared resources, expected interactions, excluded factors, and source World View.

Exogenous light, weather, occupancy heat, open doors/windows, cooking emissions, neighboring spaces, and existing background systems remain baseline/context unless the exact scenario treats them as controlled participants. “All lights on” is insufficient without identities, poses, spectra/output ranges, control levels, timing, and baseline.

## Composition Model Specification

The Specification declares one composition mode:

- `direct_joint_model`: a model trained/simulated and validated for the declared participant combination;
- `validated_superposition`: component outputs may be added only inside a validated linear/additive domain;
- `residual_interaction_model`: main component effects plus explicit interaction residuals;
- `conservative_envelope`: a policy-approved bound when precise interaction is unavailable;
- `scenario_ensemble`: multiple incompatible joint hypotheses remain visible; or
- `not_composable`: evidence does not support a joint estimate.

It binds component model/prediction revisions, semantic kinds, operators, units, coordinate/temporal alignment, interaction graph/order, controller coupling, saturation/clipping, occlusion/shadowing, thermal/airflow mixing, shared-resource constraints, covariance/dependence, uncertainty propagation, applicability domain, validation, and limitations.

Superposition is an empirical/model assumption, not a default arithmetic rule. Unit compatibility is necessary but insufficient. Pairwise independence does not prove higher-order independence. A feedback controller makes actions endogenous and cannot be replaced by independent fixed commands without a declared approximation.

## Joint Prediction Assessment

The Assessment checks exact scenario and source bindings, identity, spatial/temporal alignment, baseline closure, component qualification, semantic-kind compatibility, unit/property mappings, interaction coverage, composition-mode evidence, nonlinear/saturation domain, shared-resource feasibility, controller semantics, uncertainty/dependence budget, validation/transfer fitness, and target coverage.

Its result is `qualified`, `qualified_with_limits`, `not_qualified`, or `indeterminate`. The Assessment preserves component contributions only as model terms. It may not claim causal or responsibility allocation unless a separate [Causal Contribution Assessment](../../effect-realization-attribution/v0.1/README.md) supports it.

For planning, the result remains a [Planning Prediction](../../planning-prediction-qualification/v0.1/README.md). For an installed household, component or joint empirical models remain bounded [Installed Influence Models](../../installed-influence-model/v0.1/README.md). A joint model has its own identity basis; adding/removing participants, changing interaction topology, target property, installation geometry, controller architecture, or composition mode may require a new model identity.

## Spatial fields and aggregation

Point values, spatial fields/surfaces, zone averages, minima/maxima, distributions, and subject exposure are different results. A room-average illuminance does not prove reading-plane minimum; average temperature does not prove occupied-zone comfort; total air exchange does not prove contaminant removal at a source.

Spatial composition binds exact [Spatial Use Assessments](../../spatial-registration-localization/v0.1/README.md). Interpolation, mesh/zone aggregation, occlusion, boundary transfer, and measurement-zone definitions are explicit. Aggregation cannot hide local threshold violations or uncertainty unless the target specification explicitly accepts that aggregate.

## Change and validation

Component revision, position/orientation, material/geometry, baseline, participant set, action schedule, controller, shared capacity, validation data, or interaction evidence change triggers a new Assessment and potentially a new prediction/model revision or identity. Historical predictions remain unchanged.

Validation is joint and context-stratified. Accurate component models do not validate their composition. Validation on two devices does not automatically generalize to three, other schedules, or a different room. Unknown interaction returns limited/indeterminate/not-composable according to policy, never zero interaction.

## Invariants

1. Component effect, exogenous baseline, interaction term, shared-resource effect, joint prediction, realized outcome, and causal contribution remain distinct.
2. Addition/superposition is never the default composition rule.
3. Component qualification does not qualify composition.
4. Unit compatibility does not establish semantic or physical composability.
5. Spatial, temporal, participant, controller, and operating domains bind every joint prediction.
6. Unknown interaction is not zero interaction.
7. Pairwise evidence does not prove higher-order composition.
8. Dependence/covariance and shared uncertainty are not treated as independent.
9. Aggregates do not prove pointwise, zone-minimum, or subject-level outcomes.
10. Joint prediction does not allocate causal contribution or responsibility.
11. Scenario/model changes append revisions or new identities and preserve history.
12. Qualification grants no target satisfaction, selection, purchase, compliance, safety, or action authority.

## Conformance

The [Joint Environmental Influence oracle](../../../../conformance/scenarios/joint-environmental-influence-v0.1/README.md) tests superposition, interactions, baselines, controllers, shared resources, uncertainty dependence, spatial aggregation, validation transfer, identity, and forbidden causal/authority inference.

```sh
node conformance/scenarios/joint-environmental-influence-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define a lighting, thermal, airflow, acoustic, electrical, or contaminant solver; a universal interaction ontology; model selection; controller synthesis; optimization; causal allocation; or safety/compliance procedure.
