# HWM Learning Promotion Governance v0.1

- Status: Discussion Candidate
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-060`](../../../docs/05_decision/ADR-060-route-learning-by-scope-without-global-promotion.md)
- Routing Assessment schema: [`learning-routing-assessment.schema.json`](learning-routing-assessment.schema.json)

## Purpose

Decide the maximum candidate scope justified by exact deployment evidence without automatically changing a household, product, population claim or specification.

This governance composes HWM Model Contribution Admission, Reusable Value Rule, Purpose-Bound Disclosure, Change Impact Revalidation, deployment outcome governance and Specification Change Governance. It is not a model-training protocol.

## Four destinations, not a ladder

### `household_instance_candidate`

An attributed candidate contribution for the same household and purpose. It may propose a Claim, correction, model artifact, Evaluation Specification, Value Rule revision or other Profile-governed artifact. The routing result does not publish it, admit it as fact, activate a rule, change Authority or deploy a model. Each downstream transition remains explicit and append-only.

### `product_default_candidate`

A prospective, overridable default for an exact product/version and declared eligible population. Required evidence includes source/destination applicability, lineage/dependence, transport limits, independent/holdout validation according to policy, target and adverse outcome axes, distribution review, privacy qualification, rollback and monitoring. Product-default application creates a new product artifact; it cannot overwrite local accepted state.

### `population_hypothesis`

A testable proposition over a declared population. It requires sampling frame, unit, inclusion/exclusion, denominator and coverage, missingness/non-response, household/controller/product/lineage dependence, subgroup/privacy treatment, uncertainty and confounder limits. A dashboard count or fleet telemetry aggregate without a denominator is not population support.

### `specification_change_proposal`

A candidate normative issue with exact affected contract text/artifacts, reproducible counterexample or ambiguity, alternatives, compatibility impact and evidence limits. It enters [Specification Change Governance](../../v0.1/README.md). Usage frequency, vendor preference, one implementation limitation or widespread workaround does not automatically define normative meaning.

These destinations are siblings. Evidence can be separately assessed for several destinations, but no earlier result silently promotes to a later one.

## Privacy and training

The Assessment separately records permission for source use, boundary crossing, logging, retention, model training, release of weights/updates and onward disclosure. Permission for household inference does not imply any of the others. Local/federated gradients, embeddings, statistics, prompts, labels and model deltas are derived outputs; they may leak membership or source attributes and require purpose-bound disclosure review.

Aggregation, pseudonymization, de-identification or differential-privacy mechanisms are methods with declared parameters and residual risks, not automatic eligibility. Scientific transport, privacy qualification, fairness/distribution review and Authority are independent.

## Local adoption and revalidation

A product/global model revision is not active in a household until an explicit local process identifies the exact artifact/version, intended purpose, semantic capabilities, evidence policy, privacy impact, rollback, monitoring and Authority decision. The old artifact and all historical World Views remain addressable. New defaults are candidates, not household facts or preferences.

Withdrawal or deletion prohibits prospective use according to policy but does not prove erasure from uncontrolled replicas or trained weights. Lineage identifies affected derived artifacts for revalidation, quarantine, retirement or replacement.

## Routing results

- `household_candidate_eligible`
- `product_experiment_candidate_eligible`
- `population_study_candidate_eligible`
- `specification_proposal_candidate_eligible`
- `disclosure_required`
- `validation_required`
- `not_eligible`
- `quarantined`
- `indeterminate`

Eligibility means only that the exact candidate may enter the destination's own governance.

## Hard boundary

This contract does not establish truth, representativeness, causality, fairness, training permission, product deployment, specification acceptance, local adoption, household trust, access or action authority.

Run:

```sh
node governance/learning/v0.1/validate.mjs
```

