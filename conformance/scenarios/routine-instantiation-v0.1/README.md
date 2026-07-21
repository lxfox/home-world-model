# Routine Instantiation Scenario v0.1

- Status: Conformance discussion fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Profile: [`../../../spec/profiles/routine-instantiation/v0.1/README.md`](../../../spec/profiles/routine-instantiation/v0.1/README.md)

## Question Under Test

When may a recurring or event-driven opportunity create one household Task toward a persistent Intent, without treating a learned habit, schedule tick, raw event, forecast, or active automation as permission to act?

The fixture models a weekday morning hot-water Routine. A resident-authored persistent Intent is adopted; a separate exact Routine is activated; a JSCalendar recurrence, qualified eligibility assessment, occurrence-key policy, late/overlap policy, and Task template are bound; one temporal occurrence materializes one Task. The Task has no Plan and the decision has no Proposal or Action Authorization.

## Artifacts

- [`persistent-intent-definition.example.json`](persistent-intent-definition.example.json) and [`persistent-intent-state.example.json`](persistent-intent-state.example.json): adopted outcome commitment;
- [`trigger-spec.example.json`](trigger-spec.example.json): JSCalendar-shaped recurrence input;
- [`eligibility-spec.example.json`](eligibility-spec.example.json): fixture-local conditions;
- [`occurrence-key-policy.example.json`](occurrence-key-policy.example.json): temporal and event correlation boundary;
- [`routine-definition.example.json`](routine-definition.example.json) and [`routine-state.example.json`](routine-state.example.json): governed instantiation policy and activation;
- [`instantiation-decision.example.json`](instantiation-decision.example.json): one append-only occurrence result;
- [`task-definition.example.json`](task-definition.example.json): exact materialized Task;
- [`routine-cases.json`](routine-cases.json): 55 semantic cases, 18 model-boundary cases, and 74 forbidden inferences;
- [`validate.mjs`](validate.mjs): native JavaScript oracle and cross-artifact digest verifier.

## Run

```sh
node conformance/scenarios/routine-instantiation-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Passing demonstrates that the fixture separates observed patterns, Intent, Routine activation, trigger evidence, eligibility, occurrence identity, lateness, overlap, materialization, Task, and Authorization. It does not prove production exactly-once delivery, scheduler availability, rule-language equivalence, policy fairness, secure signatures, or community consensus.
