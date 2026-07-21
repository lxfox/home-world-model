# HWM Cross-Agent Work Composition Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`work-composition-plan.schema.json`](work-composition-plan.schema.json), [`work-slot-assignment.schema.json`](work-slot-assignment.schema.json), [`work-composition-assessment.schema.json`](work-composition-assessment.schema.json)

## Purpose

This optional Profile lets independently implemented Agents compose bounded work without inventing a privileged orchestrator or propagating household authority along a dependency graph.

The normative chain is:

`Task/direct-realization basis + portable Plan need -> Work Composition Plan -> qualified, admitted, disclosed and, where applicable, authorized Work Slot Assignment -> attributed slot output -> independent acceptance -> dependency release -> Work Composition Assessment`

Composition creates no Intent, Task, Plan acceptance, Action Proposal, Authorization, Attempt, household fact, or outcome.

## Work Composition Plan

An immutable revision binds household, exact Task or direct-realization basis, purpose, Authority epoch, source World Views, typed work slots, a directed acyclic dependency graph, integration criteria, and exit criteria. A changed slot contract, dependency, or integration rule requires a new revision; existing assignments and outputs are never retargeted.

Each slot declares (with minimum disclosure evaluated through the [Purpose-Bound Disclosure Profile](../../purpose-bound-disclosure/v0.1/README.md)):

- semantic operation and purpose;
- content-bound input artifacts and minimum disclosure package;
- output Profile/schema, evidence, provenance, validation, and acceptance contract;
- a [Capability Requirement Set](../../semantic-capability-negotiation/v0.1/README.md);
- execution mode: `artifact_subcontract`, `qualified_mediator_call`, `opaque_relay`, `delegated_acting`, or `local_processing`;
- current actor and responsible subject as separate roles;
- exact Authority requirement, if any;
- timeout, cancellation, retry, idempotency, deduplication, fallback, retention, and deletion policy; and
- whether failure is required, optional, or blocks integration.

The graph carries data dependencies only. It does not carry identity, trust, Admission, Lease, Authority, responsibility, or permission.

## Assignment

A Work Slot Assignment binds one exact plan revision and slot to one Agent implementation/instance, its capability qualification, Admission, disclosure decision, exact input digest set, and any separately required Authority decision. Its status is `eligible`, `not_eligible`, `confirmation_required`, or `indeterminate`.

Computational subcontracting is not impersonation or delegated acting. `delegated_acting` requires an exact Authority basis for the assigned actor and action scope. Neither requester nor worker inherits the other's subject, capabilities, access, Lease, or Authority. A mediator and an opaque relay are independently qualified; an opaque relay cannot interpret content.

## Output acceptance and integration

An Assessment preserves per-slot states: `pending`, `running_reported`, `output_submitted`, `accepted_for_dependency`, `rejected`, `failed`, `cancelled`, or `indeterminate`. Only `accepted_for_dependency` releases declared dependents. Transport success, worker self-report, schema validity, and output submission are insufficient.

Acceptance checks integrity, exact input and contract binding, semantic validation, evidence standing, provenance/attribution, disclosure compliance, and retention policy. It makes an output eligible for a separate [Model Contribution Submission](../../model-contribution-admission/v0.1/README.md), not automatically part of the household package. Failure attribution keeps transport failure, worker failure, invalid input, capability mismatch, validator failure, and integration conflict distinct.

Overall state is `ready_for_integration`, `partially_ready`, `blocked`, `failed`, `cancelled`, or `indeterminate`. Slot success is not integration success; integration success is not Task completion; Task completion is not Intent fulfillment.

## Action boundary

A device-control slot does not dispatch directly. It may produce an Action Proposal candidate, which still passes Proposal lineage, impact, procedure, Authorization, local safety, dispatch, Attempt, observation, and outcome gates. Network idempotency never proves physical exactly-once. Retry policy must prevent accidental repeated effects.

## Invariants

1. Capability, Admission, disclosure, Authority, assignment, execution, validation, dependency release, and integration remain separate.
2. Dependency edges carry data requirements, never permission.
3. Every slot receives the minimum declared package, not the caller's full Snapshot or private memory.
4. Actor and responsible subject remain distinct and prior actors add provenance, not permission.
5. Computational subcontract, mediation, opaque relay, and delegated acting have different semantics.
6. Parent and worker never inherit each other's capability, identity, Lease, access, or Authority.
7. Submitted output releases no dependency until independently accepted.
8. Output acceptance proves contract fitness only; real-world truth requires applicable evidence and standing.
9. Retry, fallback, and reassignment are explicit and preserve history.
10. Plan revisions never retarget prior assignments or outputs.
11. Chain-of-thought and shared private memory are neither required nor household artifacts.
12. Composition grants no action authority and proves no Task or Intent completion.

## Conformance

The [Cross-Agent Work Composition oracle](../../../../conformance/scenarios/cross-agent-work-composition-v0.1/README.md) tests DAG integrity, qualification, minimization, non-transfer of authority, output acceptance, retries, reassignment, cancellation, and action boundaries.

```sh
node conformance/scenarios/cross-agent-work-composition-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define an Agent framework, central scheduler, chain-of-thought format, shared memory, marketplace, payment protocol, universal planner, device-control API, or global delegation authority.
