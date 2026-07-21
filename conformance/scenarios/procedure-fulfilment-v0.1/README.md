# Procedure Fulfilment v0.1 Scenario

- Status: Discussion Fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Profile: [`spec/profiles/procedure-fulfilment/v0.1/`](../../../spec/profiles/procedure-fulfilment/v0.1/README.md)

The fixture follows one shared-bedroom HVAC Proposal through pre-authorization, pre-dispatch, and post-execution assessments. Seven requirements exercise all six kinds: affirmative response, consultation opportunity, objection window, two notifications, qualified review, and audit.

[`fulfilment-cases.json`](fulfilment-cases.json) contains 28 executable cases and eight model-boundary cases. Raw Records contain procedural assertions, while [`admission-decisions.json`](admission-decisions.json) contains separate RFC 8785/SHA-256-bound Evidence Standing Decisions. The cases test exact revision and Epoch binding, self-assertion rejection, digest and purpose mismatch, assertion-scoped admission, delivery versus queueing, complete objection-ledger coverage, conflicting current Records, stage-sensitive `not_due`, and post-action noncompliance. The 69 forbidden inferences prevent admission or fulfilment from becoming truth, consent, authorization, safety, forced participation, or rewritten history.

Run:

```sh
node conformance/scenarios/procedure-fulfilment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

[`fulfilment.external.jsonld`](fulfilment.external.jsonld) demonstrates a reusable ODRL, PROV-O, ActivityStreams, Schema.org, and DCMI projection without making HWM procedure predicates part of the external exchange.
