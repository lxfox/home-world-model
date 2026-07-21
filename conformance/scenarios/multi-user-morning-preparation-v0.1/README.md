# Multi-user Morning Preparation Scenario v0.1

- Status: Executable Adversarial Fixture
- Version: 0.1.0
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Question Under Test

Can HWM represent anticipatory household service when predictions are uncertain, source evidence is private, resident preferences conflict, one intent produces several actions and physical effects, and hindsight does not reduce the result to one success value?

## Initial Knowledge

The scenario uses durable Claims with illustrative Profile vocabulary:

| Claim | Epistemic basis | Content |
| --- | --- | --- |
| Aggregate morning-demand forecast | learned | On weekdays, probability of hot-water demand between 07:15 and 07:45 is 0.78 |
| Resident A bedroom preference | declared | 22–23 °C while occupied |
| Resident B bedroom preference | declared | 19–20 °C while occupied |
| Household preparation-energy constraint | declared | Morning preparation should consume no more than 1.5 kWh |
| Hot-water readiness requirement | declared | At the bathroom outlet, wait no more than 10 seconds and reach at least 40 °C |
| Pump wait-time effect | learned | Starting circulation predicts 5–9 seconds wait time |
| Pump temperature effect | learned | Starting circulation predicts 40–45 °C supply temperature |
| Pump energy effect | learned | Starting circulation predicts 0.15–0.25 kWh consumption |

The aggregate forecast is a purpose-specific derived Claim. Its raw routine Records and individual schedule Claims are not disclosed to the preparation Agent.

## Authority and Purpose Boundary

For purpose `morning_preparation`, the Agent may receive:

- the aggregate probability and its declared issuer;
- the readiness requirement, energy constraint, and effect Claims;
- both temperature preference values when needed to expose their conflict;
- the fact that exact person-level morning activity is access-denied.

It may not receive raw video, exact historical bathroom visits, individual inferred shower events, or identifiers of hidden source Claims. A World View must not require package lookup that bypasses these restrictions.

## Expected World View

The View is generated at 06:55 for a 07:15–07:45 planning horizon.

| Resolution | Availability | Epistemic | Freshness | Candidates | Applicability |
| --- | --- | --- | --- | --- | --- |
| Aggregate hot-water demand probability | `available` | `accepted` | `current` | 0.78 with the visible derived Claim | `applicable` |
| Exact identity of the future hot-water user | `access_denied` | `not_evaluated` | `not_applicable` | none | omitted |
| Resident A temperature preference | `available` | `accepted` | `current` | 22–23 °C | `conflicting` |
| Resident B temperature preference | `available` | `accepted` | `current` | 19–20 °C | `conflicting` |
| Morning energy constraint | `available` | `accepted` | `current` | ≤1.5 kWh | `applicable` |
| Hot-water readiness requirement | `available` | `accepted` | `current` | ≤10 s and ≥40 °C | `applicable` |

The two temperature results reference one visible conflict identifier. The View does not choose a compromise temperature and does not authorize an action.

The preferences remain subject-scoped and epistemically accepted; they are not two votes over which temperature is true. The later 21 °C HVAC value is only a Planner Proposal. The [Shared Action Coordination Profile](../../../spec/profiles/shared-action-coordination/v0.1/README.md) now supplies the previously missing boundary for affected-subject closure and exact-Proposal responses.

## Planner and Policy Outcomes

The Agent Planner may independently produce two proposals under one intent, `prepare-home-for-morning`:

1. start the circulation pump at 07:10;
2. set the shared bedroom HVAC to 21 °C.

HWM Core does not prescribe why those proposals were selected. The Policy Evaluator returns:

- pump proposal: `allowed`, subject to the energy constraint;
- HVAC proposal: `confirmation_required`, because the two accepted preferences remain applicability-conflicting.

Only the pump proposal is dispatched. The absence of an HVAC dispatch is an authorization outcome, not a device failure.

## Pump Action Trace

The pump acknowledges the command. Observations report:

- bathroom wait time: 8 seconds;
- outlet temperature: 41 °C;
- energy consumed: 0.18 kWh.

The expected trace revision records three separate effect assessments as `consistent`, two readiness goal evaluations as `satisfied`, the energy constraint as `satisfied`, and no user attestation. The effect Claims remain separate even though they share one action.

## Hindsight Event

No shower is observed during 07:15–07:45.

This does not make the pump effect inconsistent: the pump produced the predicted physical readiness. It does not make the readiness goal unsatisfied: hot water was ready. It also does not logically refute a probabilistic forecast of 0.78; it creates one realization Record for later forecast calibration. Resource cost remains 0.18 kWh and can support a later utility or user-acceptance assessment.

The model must therefore keep at least these dimensions distinct:

1. forecast realization and long-run calibration;
2. policy authorization;
3. device execution;
4. physical effect consistency;
5. readiness goal satisfaction;
6. resource cost;
7. user acceptance.

## Primitive Closure Result

The scenario does not require a new top-level HWM primitive:

- the anticipated shower is an Event EntityRef described by predicted Claims;
- resident preferences, energy constraints, requirements, and effect models are typed Claims;
- private observations and later non-occurrence evidence are Records;
- disclosure and action permission belong to Authority;
- applicability conflicts are World View resolution metadata;
- each dispatched action has its own Action Trace and may share an Intent identifier.

A multi-step Plan remains an Agent artifact unless a later interoperability case proves that it must be exchanged. Core should not add `PersonModel`, `Routine`, `Plan`, `Goal`, or `Event` as new top-level primitives merely because Profiles use those concepts.

## Gaps Exposed for Profiles

The Core remains closed, but optional Profiles still need to define:

- probability, forecast horizon, realization, and calibration semantics;
- preference context, cross-result conflict expressions, and affected-subject derivation;
- multi-output action-effect Claims and resource-cost units;
- privacy-preserving derivation and disclosure of aggregate Claims;
- mapping of action constraints and confirmation duties to ODRL or another policy vocabulary.
- household-specific coordination policies without implying a universal voting or welfare-aggregation rule.

These are Profile gaps, not evidence that HWM needs a larger Core ontology.

## Machine-readable Artifacts

- `manifest.json`: package, Profile, Authority epoch, resource digests, and round-trip extension;
- `claims.json`: ten forecast, preference, constraint, requirement, goal, and effect Claim Envelopes;
- `records.json`: declarations, authorization outcomes, dispatch, acknowledgement, observations, and forecast realization;
- `world-view.before.json`: purpose-limited planning View with visible preference conflict and zero-Candidate privacy denial;
- `pump-action-trace.expected.json`: dispatched multi-output action with separate goal and resource assessments;
- `hvac-action-trace.expected.json`: confirmation-required Proposal that was not dispatched;
- `oracle.expected.json`: normative fixture outcomes;
- `validate.mjs`: dependency-free semantic, integrity, privacy, temporal, and reference validator.
- `authority-profile.json`: fixture Trust Root binding, purpose, Permission, Prohibition, confirmation Duty, Epoch, Lease, and safety references; the binding is asserted by this fixture and does not replace out-of-band genesis verification;
- `authority-oracle.json`: eleven deterministic online/offline authorization cases;
- `authority-evaluator.mjs`: dependency-free baseline Authority evaluator.

Run from the repository root:

```sh
node conformance/scenarios/multi-user-morning-preparation-v0.1/validate.mjs
node conformance/scenarios/multi-user-morning-preparation-v0.1/authority-evaluator.mjs
```
