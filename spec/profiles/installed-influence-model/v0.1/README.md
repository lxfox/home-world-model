# HWM Installed Influence Model Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`installed-influence-model.schema.json`](installed-influence-model.schema.json), [`model-update-assessment.schema.json`](model-update-assessment.schema.json)

## Purpose

This optional Profile turns repeated household action/observation episodes into a portable, bounded model of how one **installed system** influences one property of one feature under declared conditions. It is not a vendor product capability, universal device law, Observation, accepted fact, or action authorization.

## Standards basis

- [SOSA/SSN 2023 System Capabilities](https://www.w3.org/TR/vocab-ssn-2023/) supplies systems, actuators, properties, operating conditions, validity context, and capability descriptions.
- [W3C PROV-O](https://www.w3.org/TR/prov-o/) supplies derivation and attribution for datasets, procedures, model revisions, and validation activities.
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) emphasizes documented datasets, metrics, deployment-like evaluation conditions, generalization limits, validation, monitoring, drift, and change management.
- [Model Cards](https://research.google/pubs/model-cards-for-model-reporting/) and [Datasheets for Datasets](https://arxiv.org/abs/1803.09010) motivate explicit intended use, evaluation context, performance, limitations, collection process, and recommended uses.

## Installed-system identity

One model lineage fixes household, exact installed endpoint lineage, installation/space geometry, affected feature, affected property, and semantic action kind. Endpoint replacement, relocation, remounting, material geometry change, different feature/property, or different action kind requires a new `model_id`.

New samples, estimator parameters, uncertainty bounds, validation reports, or a narrowed applicability domain may create a sequential candidate revision bound to the exact predecessor. A model is immutable after publication. Online learning never mutates an accepted revision in place.

Product-model declarations, simulation models, pre-installation estimates, and installed empirical models remain different artifacts. They may be compared or used as priors but never merged without provenance. Multiple systems are composed only through the separate [Joint Environmental Influence Profile](../../joint-environmental-influence/v0.1/README.md); component validation does not establish additivity.

## Semantic kinds

- `predictive_association` predicts an outcome conditional on action and context. It may use fit-for-purpose observational episodes but makes no causal claim.
- `causal_response` claims estimated contribution of the action. Its training episodes require accepted Causal Contribution Assessments and a declared causal method.

A single successful episode is a calibration sample, not automatic model promotion. Device acknowledgement is not an outcome sample. Active evidence collection may use the [Household Commissioning Experiment Profile](../../household-commissioning-experiment/v0.1/README.md); experiment design never grants trial authority. Realization without supported causal contribution may update an association model under policy, but not a causal-response model.

## Applicability and validation

The model declares action parameter ranges, prior state, external light/weather, occupancy or interaction mode when used, time context, measurement procedure, spatial/subject coverage, and other operating conditions. Missing or out-of-domain context returns `indeterminate_no_extrapolation`.

Validation uses a content-bound report with declared split or resampling method, metrics, uncertainty, context-stratified performance, sample coverage, and acceptance thresholds. Training fit is not validation. Passing validation makes a candidate `validated`; an independent purpose-specific acceptance decision is still required before a Resolver uses it.

There is no universal confidence scalar. Prediction uncertainty, calibration error, coverage, data quality, causal-method uncertainty, and model acceptance remain separate.

## Update gate

An Update Assessment verifies exact lineage, episode/data provenance, evidence standing, semantic-kind requirements, dataset authorization and minimization, validation, drift policy, and model identity. Its result is `candidate_revision_eligible`, `new_model_required`, `not_eligible`, or `indeterminate`.

Raw images or video may be deleted under retention policy after an authorized, provenance-preserving summary is created. Deletion does not upgrade the summary's evidence quality, and an unavailable summary dependency may make later validation indeterminate.

## Invariants

1. Installed influence model is not product capability or universal device truth.
2. Model output is a Prediction Claim, never an Observation.
3. One episode does not silently promote or replace a model.
4. Association and causal-response semantics never collapse.
5. Realization alone cannot train causal-response semantics.
6. Identity-basis change creates a new model ID.
7. Accepted revisions are immutable and prior revisions remain historical.
8. Training performance is not independent validation.
9. Out-of-domain use is indeterminate, not extrapolated certainty.
10. Average error does not guarantee pointwise, spatial, temporal, or person-level performance.
11. Model acceptance is purpose-specific and grants no action permission.
12. Drift appends evidence and candidate revisions; it does not rewrite historical predictions.
13. Privacy authorization and epistemic fitness are separate gates.
14. Simulation, manufacturer declaration, and household empirical evidence retain their bases.

## Conformance

The [Installed Influence Model oracle](../../../../conformance/scenarios/installed-influence-model-v0.1/README.md) tests model identity, semantic kinds, evidence admission, validation, privacy, drift, applicability, replacement, and forbidden generalization.

```sh
node conformance/scenarios/installed-influence-model-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
