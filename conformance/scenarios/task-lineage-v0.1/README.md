# Task Lineage v0.1 Adversarial Scenario

- Status: Discussion fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

This scenario tests whether two definitions are the same Task and whether a lifecycle assessment is semantically supportable. It targets plan changes, Agent changes, recurring occurrences, revision gaps, digest conflicts, split, merge, supersession, failed Attempts, false completion, terminal transitions, correction, and reopen.

Artifacts:

- [`task-definition.example.json`](task-definition.example.json): genesis Task Definition.
- [`task-state.example.json`](task-state.example.json): active Task State Assessment.
- [`task-lineage-cases.json`](task-lineage-cases.json): semantic and model-boundary oracle.
- [`validate.mjs`](validate.mjs): JavaScript evaluator.
- [`../../../spec/profiles/task-lineage/v0.1/README.md`](../../../spec/profiles/task-lineage/v0.1/README.md): Profile semantics and schemas.

Run:

```sh
node conformance/scenarios/task-lineage-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Expected summary: `TASK LINEAGE OK`. The Python reader independently implements the same decision rules with the standard library. These paths were produced in the same project effort and do not count as organizationally independent implementations.
