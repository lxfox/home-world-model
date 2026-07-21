# HWM Task Lineage Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile gives a household task a portable identity independent of an Agent, Plan, Proposal, or execution runtime. A Task is a bounded lineage of work for one immutable identity basis:

`household + exact Intent binding + purpose + occurrence + immutable scope`

The Profile does not add a Core primitive. It composes content-bound definitions and state assessments from existing HWM Claims, Records, World Views, Plans, Proposals, Authority decisions, and evidence.

Not every adopted Intent realization requires a Task. The optional [Work Realization Routing Profile](../../work-realization-routing/v0.1/README.md) may establish that one exact realization can proceed to a single bounded Proposal without durable Task identity. Work needing recurrence, retry/resume, wait, handoff, multiple Proposals, durable progress, or independent exit criteria remains Task-required under accepted policy. Direct routing grants no action permission.

## Model Boundary

1. **Intent Commitment** binds an Authority-adopted declarative outcome. It can be advanced by several Tasks; a preference or Goal Claim alone is not that commitment.
2. **Routine Definition** is an Authority-activated instantiation policy. Each admitted occurrence is a separate Task.
3. **Task Definition** identifies one bounded lineage and its exit criteria.
4. **Plan** describes a method. Plans may change while the Task remains the same.
5. **Action Proposal** is an exact policy and coordination boundary. It is not the Task.
6. **Execution Attempt** is one dispatch or attempt. One failed Attempt does not fail the Task.
7. **Task State Assessment** evaluates the Task against its exact definition and evidence at a stated time. It does not rewrite history or authorize another action.

## Artifacts

- [`task-definition.schema.json`](task-definition.schema.json) binds Task identity, definition revision, lineage relation, Plans, and exit criteria.
- [`task-state.schema.json`](task-state.schema.json) binds a lifecycle assessment to an exact Task Definition, prior State Assessment, evidence, Authority Epoch, and terminal or reopen records.

All digest bindings use SHA-256 over RFC 8785 canonical JSON in the fixture. `unsigned_fixture` is not a production proof mode.

The optional [Plan Materialization Profile](../../plan-materialization/v0.1/README.md) determines when method structure relied on across Plans, Proposals, Agents, reviews, assumptions, or contingencies must become a portable Plan. A Task may exist before a Plan, and a Plan may change without changing Task identity; private chain-of-thought is never a Task audit requirement.

## Identity and Revision Rules

- A definition revision is the same Task only when `task_id`, `identity_basis_digest`, and the complete identity basis are unchanged, the revision is sequential, and `previous_definition_binding` matches the exact prior content.
- Changing an Agent, Plan, presentation, or non-semantic extension does not by itself create a new Task.
- Changing the exact bound [Intent Definition](../../intent-commitment/v0.1/README.md), purpose, occurrence identity, household, or immutable scope creates a new Task. A later revision of the same Intent lineage is still new Task work because its content changed.
- Duplicate `(task_id, definition_revision)` values with different content are an integrity conflict.
- Missing source artifacts, unavailable proof, or a revision gap is `indeterminate`; it is not silently accepted or denied.

## Recurrence and Rescheduling

A Routine Definition is an instantiation policy, not a Task occurrence. A temporal occurrence uses a stable occurrence key and its original scheduled time. Rescheduling preserves both, following iCalendar `RECURRENCE-ID`. An event-driven occurrence uses an Authority-approved correlation key and may have no scheduled time. The next logical occurrence receives a new Task identity. The [Routine Instantiation Profile](../../routine-instantiation/v0.1/README.md) binds activation, evidence, eligibility, late/overlap policy, logical deduplication, and the exact materialized Task.

## Split, Merge, and Supersession

- A split creates new child Task IDs. The parent receives an append-only `split` state and is not identical to any child.
- A merge creates a new result Task ID. No parent identity is selected as the merged identity.
- A changed-scope or changed-intent replacement creates a new superseding Task with an exact source binding.
- Lineage relationships preserve derivation; they do not copy completion, authorization, authorship, or evidence standing.

## State and Completion

Task status is an evidence-bound assessment, not a mutable field on the Task Definition. A valid `completed` assessment requires every mandatory exit criterion to be satisfied by bound evidence and no open execution Attempt. `cancelled`, `failed`, `superseded`, `split`, and `merged` are distinct terminal meanings and require a bound transition record; Authority-controlled transitions additionally require an Authority decision.

A later correction never edits an earlier terminal state. It appends a new assessment. Reopening the same Task requires the same identity basis, an exact binding to the prior terminal state, and an Authority decision. If the identity basis changed, the work is a new Task instead.

## Standards Reuse and Boundaries

- [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html) supplies `VTODO`, stable `UID`, revision `SEQUENCE`, and recurring occurrence identity through `RECURRENCE-ID`. HWM adds content bindings, household scope, evidence, and Authority semantics.
- [RFC 9253](https://www.rfc-editor.org/rfc/rfc9253.html) supplies parent, child, sibling, first, next, and dependency relations. Those relations are informational and do not automatically propagate identity or status.
- [W3C PROV-O](https://www.w3.org/TR/prov-o/) supplies Plan, revision, derivation, generation, and invalidation relations. HWM constrains how they participate in Task identity and append-only assessments.
- [Schema.org ActionStatusType](https://schema.org/ActionStatusType) may be used as a lossy presentation projection. Its coarse states are not normative HWM lifecycle semantics.

The Profile does not define a universal project-management protocol, scheduler, workflow engine, planner, legal acceptance rule, or distributed transaction.

## Invariants

1. Task identity is independent of Agent identity and Plan identity.
2. Intent, occurrence, and immutable scope changes cannot be hidden as an in-place Task revision.
3. Routine identity is not occurrence identity.
4. Split and merge preserve lineage but never preserve one input Task as the output identity.
5. Attempt failure does not imply Task failure.
6. Completion requires evidence for all mandatory exit criteria and no open Attempt.
7. Terminal states and later corrections are append-only.
8. Reopening requires an authorized binding to the prior terminal state and cannot conceal an identity-basis change.
9. Task state does not establish global truth, permanent goal satisfaction, or action authorization.
10. Routine activation and occurrence admission do not establish Plan, Proposal, dispatch, or action authorization.

## Fixture and Validation

```sh
node conformance/scenarios/task-lineage-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The oracle is an adversarial semantic fixture, not evidence of community adoption.
