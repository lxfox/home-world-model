# HWM Planning Prediction Qualification Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`planning-prediction.schema.json`](planning-prediction.schema.json), [`prediction-qualification-assessment.schema.json`](prediction-qualification-assessment.schema.json)

## Purpose

This optional Profile lets an Agent compare renovation options before an installed system exists. It represents what a manufacturer declaration, design simulation, analogous installation, or declared combination predicts about one target design. It also records whether that prediction is qualified for a specific planning use.

A Planning Prediction is not an Observation, installed-system fact, guarantee, purchase, installation acceptance, code-compliance decision, professional sign-off, Action Authorization, or dispatch instruction.

## Standards basis

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) distinguishes observations, simulations, systems, properties, procedures, operating conditions, and results.
- [W3C PROV-O](https://www.w3.org/TR/prov-o/) supplies derivation and attribution for declarations, design inputs, simulation activities, analogous models, and prediction revisions.
- [JCGM 100:2008 GUM](https://www.bipm.org/en/committees/jc/jcgm/publications) motivates explicit models, input quantities, estimates, and uncertainty rather than a universal confidence scalar.
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) motivates fit-for-purpose evaluation, deployment-context limits, generalization documentation, and independent validation.

## Evidence bases

- `manufacturer_declaration` supports only the declared product property under its stated test conditions. It does not establish the installed outcome.
- `design_simulation` supports a model-conditioned estimate under content-bound geometry, material, boundary-condition, procedure, and software assumptions. It is not an Observation.
- `analogous_installation` may inform a prior or transfer estimate only after explicit source/target comparability assessment. Matching product models alone is insufficient.
- `composite_prediction` preserves every basis, disagreement, and uncertainty contribution. Combining sources must not average away incompatibility.

Source-household permission and epistemic transfer fitness are independent gates. Authorization to use an analogous model does not make it comparable; comparability does not grant permission.

## Identity and revision

One prediction lineage fixes the household design context, design option, planned function position, product model, target feature/property, and prediction purpose. A competing product, different function position, different property, or different purpose receives a new `prediction_id`.

Changed geometry, material, boundary condition, declaration, simulation, or analogous model creates a sequential immutable revision bound to its predecessor. It invalidates the previous qualification for current use; it does not retarget or rewrite history.

## Qualification ladder

A Qualification Assessment binds the exact prediction revision and exact decision use. Its result is `qualified`, `qualified_with_limits`, `not_qualified`, or `indeterminate`.

Planning-only evidence may be qualified for:

- `concept_exploration`
- `catalog_screening`
- `design_comparison`
- `procurement_shortlist`
- `professional_review_input`

It cannot by itself qualify `installation_acceptance`, `code_compliance`, or `operational_control`. Recommendation remains advisory; shortlist does not mean selection, purchase, installation, or authorization.

Comparability covers product equivalence, installation geometry, space geometry, materials, environmental/context domain, action range, procedure, and spatial/subject coverage. Missing required dimensions, unit incompatibility, out-of-range extrapolation, stale target bindings, unavailable evidence standing, or unresolved source disagreement produces a limited, negative, or indeterminate result according to declared policy.

## Handoff after installation

Target-household commissioning observations may produce an [Installed Influence Model](../../installed-influence-model/v0.1/README.md). That model can calibrate or replace planning use for the installed system, but does not convert the historical Planning Prediction into an Observation or erase forecast error.

## Invariants

1. Product declarations, simulations, analogous installed models, and target observations retain distinct provenance.
2. Same product model is not sufficient transfer evidence.
3. Simulation output is a Prediction, not an Observation or validation of the installed outcome.
4. Planning evidence never silently becomes installation acceptance or operational permission.
5. Qualification is purpose-specific and revision-specific.
6. Missing transfer dimensions or out-of-domain use cannot be hidden by a scalar confidence score.
7. Source disagreement remains visible.
8. Privacy authorization and transfer fitness remain separate.
9. Design changes require re-evaluation; prior predictions remain historical.
10. Target commissioning creates new empirical evidence rather than rewriting the plan.

## Conformance

The [Planning Prediction Qualification oracle](../../../../conformance/scenarios/planning-prediction-qualification-v0.1/README.md) tests source semantics, transfer fitness, uncertainty, revision, decision limits, and installed-model handoff.

```sh
node conformance/scenarios/planning-prediction-qualification-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
