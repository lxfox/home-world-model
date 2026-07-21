# ADR-022: Treat Routine as an Authority-activated Task instantiation policy

- Status: Proposed
- Date: 2026-07-19
- Decision scope: HWM optional Profiles; no Core expansion
- Chinese mirror: [`ADR-022-treat-routine-as-authority-activated-task-instantiation-policy.zh-CN.md`](ADR-022-treat-routine-as-authority-activated-task-instantiation-policy.zh-CN.md)

## Context

Intent Commitment establishes what outcome the household has adopted, and Task Lineage establishes the identity of one bounded unit of work. The model still lacked an interoperable answer to when a persistent Intent should create another Task. Existing language called Routine a recurrence template, but did not distinguish an observed habit from an activated policy, a trigger from an eligibility condition, an event delivery ID from a logical occurrence, or a missed trigger from permission to catch up.

Collapsing these boundaries reproduces a common automation-runtime assumption: `trigger + current condition → action`. That is insufficient for a portable household model because it can duplicate Tasks across retries or Agent changes, run stale work after an outage, treat unknown conditions as false, let a learned pattern self-activate, or bypass Proposal-specific Authority.

## Decision

1. Define Routine as an optional, Authority-activated **Task instantiation policy**. Do not add a Core primitive.
2. Keep Observed Pattern Claim, persistent Intent, Routine Definition, Routine Activation State, trigger evidence, eligibility assessment, occurrence, Instantiation Decision, Task, Plan, Proposal, Authorization, and Attempt distinct.
3. A Routine Definition targets exactly one persistent Intent lineage and binds one immutable identity basis: household, target Intent ID, purpose, and Task scope.
4. Treat the exact Intent revision, external trigger and eligibility specifications, occurrence policy, Task exit criteria, late policy, and overlap policy as governed Routine revision content.
5. Require sequential exact-prior content and an Authority continuity decision for a same-Routine revision. Identity-basis change creates a new Routine.
6. Require a separate Authority Activation State. A candidate Definition, repeated behavior, accepted Pattern Claim, calendar entry, Agent suggestion, or persistent Intent does not make a Routine active.
7. Require the target Intent to be currently `adopted` and `persistent` for instantiation. Routine activation cannot override Intent suspension or create persistence from recurrence.
8. Bind external trigger semantics rather than defining a universal rule DSL. A trigger creates an evaluation opportunity; eligibility is separately assessed against a purpose-bound World View as of a stated time.
9. Preserve `not_matched`/`not_satisfied` versus `indeterminate`. Unknown, stale, conflicting, or unavailable input never silently becomes false or true.
10. Use original recurrence identity and time zone for temporal occurrences. Use an Authority-approved correlation policy for event-driven occurrences.
11. Treat CloudEvents `source + id` as delivery duplicate identity only. It cannot replace a logical occurrence key because one occurrence may create multiple events.
12. Require explicit, bounded late handling (`skip`, `latest_only`, or `bounded_each`) and overlap handling (`independent`, `suppress_while_active`, or `defer_while_active`). Reactivation has no implicit catch-up.
13. Define the lineage-scoped logical materialization key over household, Routine ID, and occurrence key. Same-key/same-Task replay is duplicate; same-key/different-Task is integrity conflict.
14. A Routine cannot cancel or supersede a prior Task through overlap handling. Task transition remains separate and Authority-bound.
15. A valid Instantiation Decision creates one exact Task Definition matching the Routine's Intent, occurrence, purpose, scope, and exit criteria. It creates no Plan, Proposal, command, Attempt, or Action Authorization.
16. Preserve all Routine Definitions, activation transitions, decisions, and Task bindings append-only. A later policy revision does not rewrite prior decisions or existing Tasks.

## Standards Basis

[RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html) fixes `RECURRENCE-ID` to the original instance time and keeps it stable after rescheduling. [RFC 8984](https://www.rfc-editor.org/rfc/rfc8984.html) provides JSON recurrence rules, exclusions, overrides, time zones, and recurring Tasks. These standards solve recurrence representation and identity, not household Authority or Task materialization.

[CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) requires `source + id` uniqueness per distinct event and permits reuse for retransmission, but also states that one occurrence may yield more than one event. Therefore delivery deduplication and HWM occurrence correlation must remain separate.

[W3C RIF-PRD](https://www.w3.org/TR/rif-prd/) formalizes production-rule condition/action and conflict-resolution behavior. [Home Assistant](https://www.home-assistant.io/docs/automation/basics/) independently demonstrates trigger/condition/action separation, while its [run modes](https://www.home-assistant.io/docs/automation/modes/) make repeated-trigger behavior explicit. HWM uses these as boundary evidence but keeps action firing behind Task, Proposal, and Authorization.

[W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies reusable policy and constraint concepts. It does not make Routine activation equivalent to an action Permission.

## Alternatives Rejected

### Treat learned behavior as a Routine automatically

Rejected because a descriptive pattern is neither household commitment nor permission. It also makes model errors physically consequential before Authority review.

### Encode direct device actions in Routine

Rejected because it collapses Intent, Task, Plan, Proposal, safety evaluation, coordination, and Authorization into a vendor automation script.

### Use schedule time or CloudEvent ID as Task identity

Rejected because rescheduling must preserve occurrence identity, retries must not duplicate Tasks, and several distinct events may describe one logical occurrence.

### Assume exactly-once delivery

Rejected because the underlying standards do not provide end-to-end exactly-once semantics. HWM instead uses append-only decisions and a logical materialization key.

### Always run missed occurrences after recovery

Rejected because stale household work may be unsafe, annoying, or wasteful. Catch-up must be explicit and bounded.

### Let a new occurrence supersede an active Task

Rejected because overlap policy cannot silently perform an Authority-controlled Task transition.

## Consequences

- Agents can exchange why and when work was generated without sharing a scheduler implementation.
- A household can switch Agent or automation runtime while preserving occurrence identity and avoiding duplicate Task creation.
- Learned routines remain useful as candidates while retaining a human/Authority boundary.
- Implementations must preserve more explicit state: exact policy revision, activation, evidence, as-of condition result, occurrence key, lateness, overlap, deduplication, and Task binding.
- The Profile deliberately supports fail-closed indeterminacy rather than maximizing automatic execution.
- Existing Home Assistant, Matter, cron, workflow, or event systems need adapters; their native automation identity is not automatically an HWM Routine or Task identity.

## Validation and Reversal Criteria

The decision is currently supported by the 55 semantic cases, 18 model-boundary cases, 74 forbidden inferences, exact cross-artifact digest chain, strict schemas, and independent Python reader in the Routine Instantiation fixture.

Reject or revise this decision if independent implementations show that:

1. external recurrence/event languages cannot round-trip while preserving original occurrence identity;
2. one logical materialization key cannot survive scheduler, Agent, and Definition-revision changes without false merging;
3. persistent Intent and Routine activation cannot be kept operationally distinct;
4. bounded catch-up and overlap behavior cannot be represented without embedding a complete workflow engine;
5. an adopted standard already provides equivalent household Authority, evidence, logical occurrence, Task lineage, and action-authorization boundaries; or
6. community use cases require one Routine to atomically materialize multiple unrelated Intents, in which case the one-Intent identity decision must be reconsidered rather than silently widened.
