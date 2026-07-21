# HWM Agent Continuity Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile preserves a household task when the Agent process, model, provider, or instance changes. It does not transfer an Agent session. The household rematerializes durable, attributable task state for an independently admitted target Agent.

The continuity sequence is:

`source outputs durable artifacts → target Agent independently admitted → target-purpose World View → household-generated Checkpoint → Authority Continuity Decision → target PoP Lease → target continues with preserved provenance`

Task continuity, Agent instance identity, Authority subject, evidence standing, authorship, authorization, and execution exclusivity remain separate. The Profile composes existing HWM artifacts and adds no Core primitive.

## Artifacts

- [`continuity-checkpoint.schema.json`](continuity-checkpoint.schema.json): a short-lived, target-specific projection of durable task artifacts, open work, and explicit uncertainty.
- [`continuity-decision.schema.json`](continuity-decision.schema.json): an Authority-plane decision bound to the exact Checkpoint, source and target Admission Decisions, Trust Root, Epoch, current actor, responsible subject, granted actions, target Lease, and any exclusive cutover state.
- the existing Agent Admission Decision, Authority Lease, purpose-bound World View, Claims, Records, Plans, Proposals, Assessments, and Action Traces.

The Checkpoint is content, not authority. Its proof authenticates the continuity resolver output; the separate Continuity Decision determines whether and how the target may use it.

## Four Modes

1. **`context_share`:** two independently admitted Agents receive target-specific context. It creates no delegation or shared identity.
2. **`successor`:** the target continues planning from durable state. Source authorship remains; new outputs are attributed to the target. Source Proposal dispatch does not transfer.
3. **`delegated_acting`:** the target is the current actor and acts on behalf of a separately identified responsible subject. It is not impersonation. Delegated scope cannot exceed the responsible subject's delegable scope.
4. **`exclusive_cutover`:** only the target may continue the named dispatch path. It is ready only when the verifier knows the source Lease is expired or invalidated by a known Authority Epoch and the target Lease is active.

If a gateway is offline, HWM cannot claim instantaneous exclusive cutover. Exposure remains bounded by the source Lease expiry and the point at which the gateway learns the new Authority Epoch.

## Deterministic Flow

1. The source Agent writes attributable Claims, Records, Plans, Proposals, and Traces to household-controlled storage. Private memory, hidden prompts, embeddings, and chain-of-thought are not continuity artifacts.
2. The target Agent completes Agent Admission. A source Agent cannot admit the target or assign its Authority subject.
3. A Resolver evaluates the target's purpose and World View independently. Acceptance or visibility in the source View does not carry into the target View.
4. The household continuity resolver creates a target-specific Checkpoint from artifacts visible to the target. Hidden identifiers, counts, source-only View content, and raw evidence are not copied.
   Reason codes are machine identifiers from a privacy-reviewed deployment registry, not free-text summaries of hidden household state.
5. The Checkpoint binds an exact [Task Lineage Definition](../../task-lineage/v0.1/README.md), source and target Admission Decisions, source and target World Views, Authority Epoch, time, and each disclosed artifact digest. A naked Task identifier or revision number is insufficient.
6. Completed, open, blocked, indeterminate, unknown, and contested work remain distinct. A source statement that work is complete is not a physical outcome or accepted fact.
7. Authority evaluates the exact Checkpoint and requested mode. It identifies the current actor and, for delegation, the responsible subject; prior actors remain provenance only.
8. The target presents its own PoP Lease. A source Lease, token, key, or subject label cannot be copied to the target.
9. The target creates revisions or new Proposals with preserved derivation and new attribution. Dispatch of a source Proposal requires an explicit, exact grant.

Invalid bindings fail closed. Unavailable proof, required artifacts, admission state, or newer Authority state is `indeterminate`, not denial or permission. Pending exclusive cutover remains `confirmation_required` and cannot dispatch.

## Standards Reuse and Boundaries

- [W3C PROV-O](https://www.w3.org/TR/prov-o/) supplies Activity, Agent, attribution, derivation, communication, revision, and qualified delegation relations. HWM adds target-purpose, privacy, and Authority constraints around their use.
- [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html) distinguishes delegation from impersonation and defines current/prior actor chains. Prior actors are provenance, not a union of permissions. Token exchange is a one-time event and does not inherently revoke or mutate the source token.
- [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html) supplies structured, resource-specific authorization details and warns that sensitive authorization details require privacy protection.
- [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html) supplies online token revocation while acknowledging propagation delay and the trade-off between server state, communication, and short token lifetimes.

The Profile is compatible with these deployment mechanisms but does not define a new OAuth grant, token format, universal Agent identity, or distributed lock protocol.

## Invariants

1. Task lineage continuity does not transfer Agent instance identity or Authority subject.
2. Only durable, attributable artifacts cross the continuity boundary; private reasoning is neither required nor represented as household knowledge.
3. Source authorship and evidence provenance remain unchanged; target outputs receive target attribution.
4. A Checkpoint cannot establish truth, evidence standing, admission, authorization, or physical outcome.
5. Target disclosure is re-resolved for target purpose and Authority state; source visibility never transfers wholesale.
6. Delegation preserves current actor and responsible subject and is never represented as impersonation.
7. Prior actor history is informational and cannot add permissions to the current actor.
8. A new or exchanged target token does not imply source-token revocation.
9. Planning succession does not imply source-Proposal dispatch permission.
10. Exclusive cutover requires known source invalidation plus an active target Lease and cannot promise instantaneous offline revocation.

## Fixture and Validation

The fixture uses simulated proof results and `unsigned_fixture`; production deployments must reject that proof mode.

```sh
node conformance/scenarios/agent-continuity-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The oracle covers 40 continuity cases, 10 model-boundary cases, and 92 forbidden inferences.
