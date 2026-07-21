# ADR-019: Rematerialize Task Context Across Agent Change

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-019-rematerialize-task-context-across-agent-change.zh-CN.md`](ADR-019-rematerialize-task-context-across-agent-change.zh-CN.md)

## Context

HWM claims that the household model is independent of any Agent. A model cannot satisfy that claim if changing a model provider, restarting a process, or replacing an Agent loses every active task. It also cannot satisfy household privacy and authority invariants if continuity means copying a context window, source World View, bearer token, source identity, or implicit permission to the next Agent.

The model must distinguish task continuity from identity continuity, delegation from impersonation, provenance from authorization, and planning succession from exclusive device control.

## Options

1. Copy the source Agent's memory, prompt, credentials, and session to the target.
2. Reuse one stable Agent identity and let every replacement impersonate it.
3. Let the household rematerialize target-specific durable task state after independent target admission and authorization.

## Decision

Choose option 3.

Agent Continuity is an optional Profile over existing Claims, Records, Plans, Proposals, World Views, Admission Decisions, Authority Decisions, Leases, Assessments, and Action Traces. It adds no Core primitive.

Only household-persisted, attributable artifacts participate. Chain-of-thought, private model memory, prompts, embeddings, and source-only data are not continuity requirements. A source Agent may submit candidate artifacts or a request to continue work, but cannot create the authoritative target Checkpoint, admit the target, assign its subject, grant permissions, or declare exclusive cutover.

After the target independently completes Agent Admission, a household continuity resolver evaluates a target-purpose World View and produces a short-lived Checkpoint containing exact artifact bindings, open work, and explicit uncertainty. The target receives only content visible under its own purpose and Authority state. Source View acceptance and evidence standing are re-evaluated rather than inherited.

A separate Authority Continuity Decision binds the exact Checkpoint, source and target Admission Decisions, accepted Trust Root, Authority Epoch, current actor, optional responsible subject, granted actions, target PoP Lease, and cutover state. The Checkpoint itself cannot authorize its use.

The Profile supports four modes: independent context sharing, planning succession, delegated acting, and exclusive cutover. Delegated acting records the target as current actor and another subject as responsible; it is not impersonation. Prior actor history remains informational and does not contribute permissions.

Planning succession does not transfer dispatch of the source Proposal. New target outputs preserve source derivation while recording target attribution. Exact dispatch of an existing source Proposal requires an explicit grant.

Exclusive cutover is ready only when the verifier knows that the source Lease expired or was invalidated by a known Authority Epoch and the target Lease is active. Token exchange or target-token issuance alone does not revoke the source. Offline gateways remain subject to bounded stale-authority exposure.

## Consequences

- Changing an Agent does not destroy durable household work, but private reasoning is neither portable nor required.
- A target may continue the same task without becoming the source Agent or rewriting its authorship.
- Direct Agent-to-Agent handoff blobs remain untrusted inputs until rematerialized and authorized by the household.
- Same-subject process replacement still requires a new Admission Decision, instance proof, and PoP Lease so the runtime instance remains attributable.
- Exact exclusive cutover may require an Authority Epoch change and has the same offline limits as other Lease revocation.
- Implementations may bind RFC 8693 token exchange, RFC 9396 authorization details, RFC 7009 revocation, and PROV-O relations without making any of them the HWM semantic authority.

## Evidence

- [`Agent Continuity Profile`](../../spec/profiles/agent-continuity/v0.1/README.md)
- [`Agent Continuity scenario`](../../conformance/scenarios/agent-continuity-v0.1/README.md)
- [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)
- [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html)
- [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
