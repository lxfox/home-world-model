# ADR-031: Separate physical Attempt from message delivery

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-031-separate-physical-attempt-from-message-delivery.zh-CN.md`](ADR-031-separate-physical-attempt-from-message-delivery.zh-CN.md)

## Context

The Core Action Trace compresses dispatch and acknowledgement into one execution object. This cannot safely represent ambiguous delivery, retransmission, endpoint acceptance, long-running execution, duplicate reports, or the difference between a device completion report and observed physical effect. Messaging-level exactly-once claims do not extend automatically into the physical world.

## Decision

Adopt the optional Action Attempt Profile. An Attempt is one intended physical execution occurrence for an exact Proposal. It may contain multiple identical Transmissions. Same-attempt retransmission is allowed only when non-delivery is proven or a verified endpoint command-deduplication window remains open. Otherwise ambiguous delivery requires reconciliation before a separately authorized new Attempt.

Acknowledgements remain source-attributed reports at distinct transport, acceptance, started, completed, failed, and cancellation layers. Observation and Effect Assessment remain outside Attempt state. The model makes no end-to-end physical exactly-once claim.

## Consequences

- Timeout is neither failure nor proof of non-delivery.
- MQTT QoS, CloudEvents replay identity, and transport IDs are adapter evidence, not physical occurrence truth.
- Gateways need endpoint-specific deduplication capability metadata and bounded retention.
- Non-idempotent commands may require observation or human interaction after ambiguous delivery.
- Core stays compact; implementations needing safe retries use the Profile.
