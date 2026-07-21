# HWM Action Attempt Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`action-attempt.schema.json`](action-attempt.schema.json), [`attempt-state-assessment.schema.json`](attempt-state-assessment.schema.json)

## Purpose

This optional Profile separates one intended physical execution occurrence (**Attempt**) from network sends (**Transmissions**), protocol or device reports (**Acknowledgements**), observations, and assessed effects. It permits bounded retry without claiming end-to-end exactly-once physical action.

## Standards basis

- [MQTT 5.0](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html) distinguishes retransmitted packets, at-most-once, at-least-once, and QoS 2 exactly-once Application Message delivery. HWM does not extend those guarantees to device actuation or physical effects.
- [W3C WoT Thing Description 1.1](https://www.w3.org/TR/wot-thing-description/) models Action invocation, while the [WoT Profile](https://www.w3.org/TR/wot-profile/) provides synchronous and asynchronous ActionStatus patterns. HWM treats these as interface reports, not independent physical observations.
- [CloudEvents 1.0](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md) allows duplicate events to retain the same `source` plus `id`; it also notes that one occurrence may produce multiple events. HWM uses event identity for replay detection, not occurrence proof.

## Artifact boundary

- **Proposal**: exact authorized candidate action content.
- **Attempt**: one intended opportunity for that exact Proposal to cause its physical action.
- **Transmission**: one transport send belonging to an Attempt. Retransmission does not create a new Attempt.
- **Acknowledgement**: a source-attributed report about receipt, acceptance, start, completion, rejection, failure, or cancellation.
- **Observation**: evidence about world state, evaluated separately through standing and resolution policy.
- **Effect Assessment**: comparison of observed state against an expected effect. It is not an Acknowledgement.

An Attempt binds an exact Proposal digest, exact Authorization Decision, current Proposal State Assessment, gateway, and endpoint description. A new Attempt requires independent policy coverage for another possible physical occurrence. It is never inferred merely from a timeout.

## Retransmission decision

An endpoint command-deduplication contract must state its key, scope, retention deadline, and evidence. The same key may be retransmitted only with identical canonical payload and while that verified retention window remains open. Reusing a key with different content is an integrity conflict.

Transport-only deduplication—including MQTT packet/session behavior—does not establish endpoint command deduplication. When delivery is unknown and endpoint deduplication is absent, expired, inaccessible, or contested, the result is `reconciliation_required`: observe the world, query device action status, or ask for interaction evidence before any new Attempt. Non-idempotent physical actions fail closed.

## State semantics

Attempt state is an append-only assessment over available Records. `endpoint_accepted`, `execution_reported_started`, and `execution_reported_completed` retain the word “reported” in their semantics. They do not prove mechanical movement, target-state attainment, human experience, or intended effect.

Conflicting credible reports yield `contested`. Missing delivery evidence after a send yields `delivery_unknown`, not failure and not success. A late report updates a later assessment but does not rewrite the earlier assessment.

## Invariants

1. One Attempt binds one exact Proposal revision and digest.
2. A Transmission belongs to exactly one Attempt and has a unique sequence within it.
3. Same-attempt retransmission preserves the exact payload and command-deduplication key.
4. A timeout does not prove delivery failure, execution failure, or absence of effect.
5. Protocol acknowledgement does not prove endpoint acceptance.
6. Endpoint acceptance does not prove execution start.
7. Reported completion does not prove physical or intended effect.
8. MQTT QoS 2, CloudEvents identity, or an idempotency key alone does not prove physical exactly-once.
9. A new Attempt is a new possible physical occurrence and requires applicable authorization/retry policy.
10. Cancellation acknowledgement does not prove rollback or restoration.
11. Changed action content requires a Proposal revision, never an Attempt-local override.
12. Attempt state, Task state, Proposal currentness, Authorization, and Effect Assessment remain separate.

## Conformance

The [Action Attempt oracle](../../../../conformance/scenarios/action-attempt-v0.1/README.md) covers layered acknowledgement, uncertain delivery, safe retransmission, duplicate reports, late evidence, and physical-effect boundaries.

```sh
node conformance/scenarios/action-attempt-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
