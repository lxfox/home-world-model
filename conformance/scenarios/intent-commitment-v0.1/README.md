# Intent Commitment v0.1 Adversarial Scenario

- Status: Discussion fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

This scenario tests the boundary from an utterance or preference to an Authority-adopted household Intent. It attacks Definition identity, expectation revision, candidate authorship, commitment transitions, fulfillment assurance, persistent drift, conflict, Routine inference, Task binding, and Action Authorization.

Artifacts:

- [`intent-definition.example.json`](intent-definition.example.json): declarative candidate Definition.
- [`intent-state.example.json`](intent-state.example.json): adopted, ongoing commitment and fulfillment assessment.
- [`intent-cases.json`](intent-cases.json): 49 semantic cases and 15 model-boundary cases.
- [`validate.mjs`](validate.mjs): JavaScript evaluator.
- [`../../../spec/profiles/intent-commitment/v0.1/README.md`](../../../spec/profiles/intent-commitment/v0.1/README.md): Profile semantics and Schemas.

Run:

```sh
node conformance/scenarios/intent-commitment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Expected summary: `INTENT COMMITMENT OK`. Both evaluators were produced within this project and do not establish organizationally independent conformance.
