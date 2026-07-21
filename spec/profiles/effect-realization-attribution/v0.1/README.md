# HWM Effect Realization and Attribution Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`effect-realization-assessment.schema.json`](effect-realization-assessment.schema.json), [`causal-contribution-assessment.schema.json`](causal-contribution-assessment.schema.json)

## Purpose

This optional Profile prevents a post-action observation from being silently promoted into a causal success claim. It separates:

1. whether the effect described by an exact Effect Claim is observed within its declared window (**Effect Realization**); and
2. whether an accepted causal procedure supports the exact Attempt as a contributor to that realized effect (**Causal Contribution**).

Either assessment may exist without the other. Realization can be `realized` while contribution remains `indeterminate`; contribution may be assessed against a non-realized or delayed outcome without changing the realization result.

## Standards basis

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) supplies Observation, Actuation, Feature of Interest, Property, Procedure, result quality, phenomenon time, and result time. HWM requires these bindings before comparing an observation to an effect criterion.
- [W3C PROV-O](https://www.w3.org/TR/prov-o/) supplies provenance, influence, generation, usage, and derivation relations. HWM does not interpret a PROV influence edge as sufficient causal proof.
- Pearl's [causal inference overview](https://projecteuclid.org/journals/statistics-surveys/volume-3/issue-none/Causal-inference-in-statistics-An-overview/10.1214/09-SS057.full) distinguishes observational association from intervention/counterfactual claims. HWM does not select one universal estimator; it content-binds the declared method and assumptions.

## Effect Realization

An Effect Claim must state an independently accepted evaluation specification: feature, property, unit or conversion, spatial/subject coverage, expected range or predicate, timing window, aggregation rule, and required observation quality. The assessment binds the exact Attempt only to identify the evaluated occurrence; the Attempt does not supply the result.

Criterion results are `met`, `not_met`, or `indeterminate`. Aggregate results are `realized`, `partially_realized`, `not_realized`, `indeterminate`, or `not_applicable`. `partially_realized` is allowed only for an explicit multi-criterion aggregation rule; proximity to a threshold is not partial realization.

An observed target state may have existed before the Attempt or arisen independently. Realization therefore says nothing by itself about causal contribution.

## Causal Contribution

A Causal Contribution Assessment binds the exact Attempt, exact Realization Assessment, a declared causal method, baseline/outcome evidence, competing factors, and assumptions. Its status is:

- `not_assessed`: no causal question was evaluated;
- `supported_contribution`: the accepted method supports the Attempt as one contributor within its stated scope;
- `not_supported`: the accepted method produces evidence against the claimed contribution;
- `contested`: admissible causal assessments or inputs conflict;
- `indeterminate`: required evidence, method standing, assumptions, coverage, or temporal alignment is unavailable or unresolved.

Temporal order, correlation, a device completion report, or a before/after difference alone cannot produce `supported_contribution`. “Contribution” does not mean sole, necessary, sufficient, dominant, or legally responsible cause. Those stronger claims require a separate domain Profile.

## Side effects and goals

Declared intended effects, declared impacts, newly observed side effects, Goal Evaluation, personal experience, resource use, and Intent fulfillment remain separate assessments. An unexpected state change becomes a candidate Claim with provenance; it is not retroactively inserted into the Proposal or treated as caused by the Attempt.

## Invariants

1. Realization and causal contribution are orthogonal.
2. Device acknowledgement is not an Observation of the target property.
3. Observation after Attempt is not causal proof.
4. PROV influence or derivation is not sufficient causal proof.
5. Missing causal evidence is `indeterminate` or `not_assessed`, never `not_supported`.
6. `not_supported` requires an accepted method that evaluates against contribution.
7. Competing factors and method assumptions remain explicit, content-bound inputs.
8. A realized effect does not imply Goal satisfaction, positive experience, Task completion, Intent fulfillment, safety, or authorization quality.
9. A non-realized effect does not prove no actuation occurred or no other effect occurred.
10. Late evidence creates a later assessment and does not rewrite history.
11. Side effects remain independent Claims and Assessments.
12. Aggregate or average evidence cannot prove pointwise or subject-complete effects without declared coverage.

## Conformance

The [Effect Realization and Attribution oracle](../../../../conformance/scenarios/effect-realization-attribution-v0.1/README.md) tests observation fitness, aggregation, temporal ambiguity, baselines, competing factors, causal methods, side effects, and forbidden success conflations.

```sh
node conformance/scenarios/effect-realization-attribution-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
