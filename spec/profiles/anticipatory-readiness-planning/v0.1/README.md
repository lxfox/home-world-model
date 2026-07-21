# HWM Anticipatory Readiness Planning Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`readiness-objective-specification.schema.json`](readiness-objective-specification.schema.json), [`preparation-window-plan.schema.json`](preparation-window-plan.schema.json), [`readiness-planning-assessment.schema.json`](readiness-planning-assessment.schema.json)

## Purpose

This optional Profile determines whether a Forecast-supported household preparation may become a bounded Plan candidate, without turning predicted activity into a future fact, Need, Routine activation, Task, or device action.

The normative chain is:

`adopted Intent/accepted target + qualified Forecast window + current World View + response/decay models + accepted anticipation policy -> Readiness Objective Specification -> Preparation Window Plan -> Readiness Planning Assessment -> Plan/Proposal candidates -> ordinary Authorization and Attempt chain`

The Profile plans readiness; it does not execute it.

## Readiness Objective Specification

An immutable Specification binds household, exact Intent/target and Authority state, beneficiaries/subject coverage, desired feature/property and units, spatial coverage, target time interval or event-relative window, tolerance, required duration, uncertainty policy, acceptable early/late bounds, readiness evaluation procedure, resource ceilings, side-effect constraints, and expiry.

“Be comfortable before arrival” is not operational until arrival semantics, subject scope, property, measurement zone, interval, tolerance, and evaluation method are explicit. Readiness for hot-water circulation, temperature, air quality, lighting, charging, or appliance preheating remains a target condition—not an action or device command.

## Three time lines

Planning keeps three distinct time structures:

1. **demand/Forecast window**: distribution or bounded possibilities for when the household condition may be wanted;
2. **response window**: time and uncertainty for the system to move from current state to readiness under context and resource constraints; and
3. **hold/decay window**: how long readiness persists, how it degrades, and when continued preparation becomes waste or an adverse side effect.

Forecast event time, Task occurrence time, Proposal dispatch time, physical effect time, readiness evaluation time, and eventual activity realization time are different. Time zone, daylight-saving transitions, clock source, and half-open interval semantics are explicit.

## Preparation Window Plan

The immutable Plan binds exact source View, Forecast and qualification, Readiness Objective, current-state evidence, [joint influence/response models](../../joint-environmental-influence/v0.1/README.md), resource and conflict assessments, actions as Proposal candidates, dependencies, earliest and latest start distributions/bounds, checkpoints, re-forecast/re-observation points, no-return points, stop conditions, expiry, and contingency branches.

Each candidate step declares:

- expected response latency, duration, decay, uncertainty, and spatial coverage;
- reversible, compensable, or irreversible classification;
- energy/water/wear/noise/privacy and shared-resource impact;
- false-positive cost if demand does not occur and false-negative/late cost if preparation is withheld;
- cancellation request, compensation, safe shutdown, and residual-effect semantics; and
- exact downstream Proposal/Authorization requirements.

Cancellation is not rollback. Turning off heating may stop further input while retained heat, circulated water, battery charge, noise, or privacy exposure persists.

## Anticipation policy and assessment

An accepted anticipation policy declares which Forecast qualification, probability/coverage representation, consequence classes, cost/resource ceilings, beneficiary scope, reversibility, confirmation, notification, and re-evaluation cadence permit a Plan candidate. HWM defines no universal probability threshold or utility function.

The Assessment checks exact bindings, target adoption/applicability, Forecast qualification/freshness/domain, current state, model qualification, time-zone/calendar semantics, response and decay uncertainty, feasible start window, shared-resource/coordination closure, side effects, false-positive/negative policy, reversibility/compensation, checkpoints, expiry, and downstream governance.

Its result is `eligible_to_propose`, `clarification_required`, `not_eligible`, or `indeterminate`. Eligibility may create or update a portable Plan and self-contained Proposal candidates only through their own Profiles. It creates no Task unless an active Routine or other authorized work path separately materializes one.

## Forecast change and realization

A changed, narrowed, delayed, cancelled, stale, or contradicted Forecast creates a new Assessment. It may suppress future Proposal creation or support separately governed cancellation/compensation Proposals. It does not erase the earlier Forecast, Plan, Authorization, Attempt, consumed resources, or realized effects.

Forecast realization is assessed independently after the event window. A preparation can achieve its readiness objective even if the predicted activity never occurs; that is a false-positive anticipation outcome, not proof the action failed. Conversely, the activity may occur while readiness was not achieved. Forecast quality, preparation effect, target readiness, resource use, user acceptance, and activity realization remain separate axes.

## Routine boundary

An active [Routine](../../routine-instantiation/v0.1/README.md) may use a qualified Forecast Assessment as trigger/eligibility input and materialize one exact Task occurrence. This Profile can supply that Task's bounded preparation Plan. A learned pattern alone activates neither Routine nor preparation. A repeated anticipatory choice never becomes a persistent policy without explicit Authority activation.

## Invariants

1. Pattern, Forecast, Forecast qualification, readiness target, Intent, Routine, occurrence, Task, Plan, Proposal, Authorization, Attempt, effect, readiness, and activity realization remain distinct.
2. Predicted activity is not a future fact, Need, consent, or action permission.
3. Demand, response, hold/decay, dispatch, effect, and realization times remain distinct.
4. Earliest/latest start includes state, response uncertainty, decay, resources, and target tolerance—not only mean warm-up time.
5. False-positive and false-negative consequences are policy inputs, not a hidden Agent utility.
6. Unknown or stale Forecast/model/context fails closed; missing demand is not false.
7. Cancellation request, device acknowledgement, stopped input, compensation, rollback, and restored state are distinct.
8. Irreversible or high-impact preparation requires its declared governance and cannot rely on Forecast confidence alone.
9. Forecast revision affects prospective planning and never rewrites prior Attempts or effects.
10. Readiness success does not prove Forecast realization; realization does not prove readiness.
11. Repetition does not self-activate anticipation policy or Routine.
12. Planning eligibility grants no Task creation, notification, dispatch, safety, or action authority.

## Conformance

The [Anticipatory Readiness Planning oracle](../../../../conformance/scenarios/anticipatory-readiness-planning-v0.1/README.md) tests time windows, Forecast change, response/decay uncertainty, resources, reversibility, false-positive/negative policy, cancellation, Routine boundary, and forbidden action inference.

```sh
node conformance/scenarios/anticipatory-readiness-planning-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define activity forecasting, a universal comfort objective, probability threshold, utility function, scheduler, MPC/controller, tariff optimizer, calendar service, notification policy, device protocol, or emergency/safety rule.
