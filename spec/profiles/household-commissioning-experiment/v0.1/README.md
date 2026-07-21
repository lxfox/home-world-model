# HWM Household Commissioning Experiment Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`experiment-objective.schema.json`](experiment-objective.schema.json), [`commissioning-experiment-plan.schema.json`](commissioning-experiment-plan.schema.json), [`experiment-run-assessment.schema.json`](experiment-run-assessment.schema.json)

## Purpose

This optional Profile lets a household deliberately collect bounded calibration evidence while preventing model uncertainty or information gain from becoming self-granted permission to perturb the home.

The normative chain is:

`declared model/knowledge gap -> Experiment Objective -> candidate design -> identifiability, risk, disturbance, privacy, resource and governance assessment -> Commissioning Experiment Plan -> independently governed trial Proposals/Attempts/Observations -> Experiment Run Assessment -> dataset/model Contribution candidates`

Experiment eligibility is never trial Authorization.

## Experiment Objective

An immutable Objective binds household, purpose, target model/property/parameter and exact model gap, intended downstream use, hypotheses or estimand, required spatial/temporal/subject coverage, decision-relevant uncertainty reduction, acceptance criteria, maximum total disturbance/risk/resource/privacy budgets, expiry, and Authority state.

“Improve the model” is insufficient. Information gain, confidence reduction, dataset size, novelty, and model performance are not household benefits by themselves. The Objective explains which future decision could change and the least evidence needed.

## Commissioning Experiment Plan

The Plan binds exact World View, Objective, baseline and current state, participant devices/endpoints, measurement zones and [spatial qualifications](../../spatial-registration-localization/v0.1/README.md), sensors/procedures/calibration, confounders, trial sequence or adaptive policy, action ranges, randomization/blocking where used, washout/recovery periods, stopping rules, cumulative budgets, data minimization/retention, affected subjects and procedures, expected identifiability, analysis/validation procedure, contingencies, and expiry.

Every trial declares its own proposed action content, preconditions, measurement window, expected effect/side effects, risk and disturbance class, resource cost, privacy capture, idempotency, restoration/compensation, and downstream governance requirements. A trial is executed only through an exact Action Proposal, impact closure, coordination/procedure fulfilment, Authorization, local safety gate, Attempt, and observation chain.

Adaptive design may select the next candidate from admitted results, but a changed action, range, participant, time, space, capture, or impact creates a new Proposal and Authorization evaluation. Prior trial permission never becomes an exploration budget or blanket Lease.

## Design qualification

A design is `eligible_to_propose`, `clarification_required`, `not_eligible`, or `indeterminate`. The assessment checks objective relevance, existing-evidence sufficiency, least-perturbing alternative, identifiability, excitation/range, baseline, confounders, sensor fitness/calibration, spatial/temporal coverage, sample/replication plan, interaction model, disturbance/risk/resource/privacy budgets, affected-subject procedures, reversible recovery, stop rules, data handling, analysis validity, and downstream governance.

Passive observation, simulation, manufacturer evidence, or a previously admitted dataset is preferred when it satisfies the Objective with lower accepted impact. “Cheapest” or “most informative” alone does not select a design. HWM defines no universal information-value or acceptable-risk scalar.

## Stop and recovery

Stop rules have priority over information gain. New objection, denied procedure, unsafe/local interlock state, unexpected response, sensor failure, confounder, domain departure, privacy boundary change, resource/disturbance exhaustion, or invalid restoration suppresses future trials and may require separately authorized cancellation/compensation.

Stopping commands, acknowledgements, cessation of input, physical stabilization, restoration, compensation, and verified safe state are distinct. An irreversible effect cannot be described as recovered. Historical Attempts and observations remain immutable.

## Run Assessment and learning

The Run Assessment binds exact Plan revision and every proposed/authorized/attempted/skipped/aborted trial. Per trial it separates Authorization, dispatch/delivery, action state, physical Observation, protocol deviation, evidence standing, data quality, safety/stop event, restoration, and inclusion eligibility.

Overall results include `completed_as_planned`, `completed_with_deviations`, `stopped`, `aborted`, `failed`, or `indeterminate`, plus dataset fitness and model-update eligibility. Successful execution does not establish identifiability, causal contribution, model validity, requirement fit, or commissioning acceptance. A conforming dataset/model is submitted through [Model Contribution Admission](../../model-contribution-admission/v0.1/README.md); an [Installed Influence Model](../../installed-influence-model/v0.1/README.md) still passes its own lineage, semantic-kind, validation, privacy, and update gates.

## Invariants

1. Model gap, experiment value, design fitness, Plan, trial Proposal, Authorization, Attempt, Observation, dataset fitness, model update, and commissioning acceptance remain distinct.
2. Information gain, uncertainty, novelty, or active-learning policy grants no action or capture permission.
3. Every trial has exact content-bound governance; authorization never transfers across adaptive trials.
4. Existing lower-impact sufficient evidence defeats unnecessary perturbation under accepted policy.
5. Identifiability, sensor fitness, baseline, confounders, interaction, and coverage are explicit.
6. Cumulative risk/disturbance/resource/privacy budgets are not replaced by per-trial limits.
7. Stop rules override information value and suppress prospective trials only.
8. Stop, cancellation, stabilization, restoration, compensation, and safe-state verification remain distinct.
9. Device acknowledgement is not an Observation or usable calibration sample.
10. Run completion does not prove causal semantics, model validation, requirement fit, or acceptance.
11. Raw capture minimization/deletion does not improve evidence quality or erase provenance.
12. Experiment results grant no persistent Routine, broader Lease, safety approval, or operational action authority.

## Conformance

The [Household Commissioning Experiment oracle](../../../../conformance/scenarios/household-commissioning-experiment-v0.1/README.md) tests necessity, identifiability, adaptive authorization, cumulative disturbance, privacy, stop/recovery, trial evidence, dataset/model gates, and forbidden exploration authority.

```sh
node conformance/scenarios/household-commissioning-experiment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define experimental design algorithms, active-learning acquisition functions, causal estimators, safety limits, professional commissioning standards, sensor calibration procedures, device protocols, or universal acceptable disturbance.
