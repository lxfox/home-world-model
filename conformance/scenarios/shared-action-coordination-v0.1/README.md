# Shared Action Coordination Scenario v0.1

- Status: Executable Profile Fixture
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Policy: [`coordination-policy.json`](coordination-policy.json)
- Cases: [`coordination-cases.json`](coordination-cases.json)
- External projection: [`coordination.external.jsonld`](coordination.external.jsonld)

## Questions Under Test

1. What happens when admitted evidence conflicts about one descriptive proposition?
2. What happens when different people have different accepted preferences?
3. What must happen before one shared-impact Action Proposal may continue to final authorization?

The fixture gives different answers. Descriptive conflict remains epistemic `contested`. Personal preferences remain accepted and subject-scoped. Only the third question uses a declared coordination policy.

## Executable Boundaries

Twenty-four coordination cases cover:

- `all`, `count`, and response-free policy rules without declaring one universal default;
- missing, stale, unauthorized, standing-excluded, unaffected, and wrong-revision responses;
- explicit rejection and threshold-only rejection;
- Agent self-confirmation, valid scoped delegation, and wrong-role delegation;
- unavailable affected-subject closure, missing policy, and multiple applicable policies;
- a verified emergency rule with retained audit and notification Duties;
- unanimous coordination followed by local safety denial;
- Authority Epoch drift.

Three model-boundary cases prove that:

- incompatible location Claims are not resolved by vote;
- resident A's and resident B's preferences can both be epistemically accepted;
- a Planner's 21 °C compromise is only a Proposal, not consent, authorization, or a synthesized household preference.

## Critical Output Boundary

```text
satisfied coordination
  != action allowed
  != physically safe
  != preferences reconciled
  != outcome accepted
```

The fixture output `continue_policy_evaluation` is deliberately not `allowed`.

The external JSON-LD projection uses PROV-O, ActivityStreams, Schema.org, and DCMI to carry the Proposal, Question, Accept events, delegation provenance, coordination Activity, and generated assessment without an HWM coordination predicate. The Profile still owns exact-revision, affected-subject, response-validity, and policy-evaluation behavior.

## Run

```sh
node conformance/scenarios/shared-action-coordination-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Schema validation is documented in the [Profile](../../../spec/profiles/shared-action-coordination/v0.1/README.md).
