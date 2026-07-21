# ADR-020: Bind Task identity to Intent, occurrence, and scope

- Status: Proposed
- Date: 2026-07-19
- English normative text
- Chinese mirror: [`ADR-020-bind-task-identity-to-intent-occurrence-and-scope.zh-CN.md`](ADR-020-bind-task-identity-to-intent-occurrence-and-scope.zh-CN.md)

## Context

Agent Continuity already carries `task_id` and `task_revision`, but those fields do not prove why work before and after an Agent change is the same Task. Treating a Plan, Proposal, Agent session, recurring Routine, or execution Attempt as the Task would make identity vendor-specific and allow completion or failure to propagate incorrectly.

## Options

1. Let each Agent or workflow engine define Task identity.
2. Identify a Task by its current Plan or executing Agent.
3. Add Task as a universal Core primitive.
4. Define an optional Profile whose identity basis binds the household, exact Intent, purpose, occurrence, and immutable scope.

## Decision

Adopt option 4 as a Profile discussion candidate.

A Task Definition has a stable identity basis and append-only content revisions. Plans and Agents may change within the lineage. Intent, purpose, occurrence, household, or immutable-scope changes require a new Task ID. Recurring occurrences are distinct Tasks; rescheduling preserves the original occurrence identity.

Splits create new child IDs, merges create a new result ID, and changed-scope replacements create a new superseding ID. Task State is a separate content-bound assessment. Completion requires evidence for all mandatory exit criteria and no open Attempt. Terminal transitions and reopen operations are appended and bound to exact prior state and Authority decisions where applicable.

## Reason

This is the smallest model that makes Agent-independent continuity falsifiable without turning HWM into a workflow engine. It preserves the useful identity behavior of iCalendar, the relationship vocabulary of RFC 9253, and PROV derivation while retaining HWM's evidence and Authority boundaries.

## Consequences

- Agent Continuity checkpoints can bind an exact Task Definition instead of trusting a naked identifier.
- One failed dispatch no longer silently fails the Task.
- “Completed” becomes an evidence claim at a time, not a mutable global truth.
- Splits, merges, supersession, recurrence, and reopen operations remain auditable.
- Implementations must maintain content digests and append-only history.
- This does not establish a universal task manager or require Task Lineage in Core.

## Rejection conditions

Reject or revise this decision if independent fixtures show that the identity basis cannot distinguish ordinary plan revision from changed work, if recurrence cannot round-trip through iCalendar identity, or if an existing adopted standard supplies equivalent evidence- and Authority-bound semantics without HWM additions.
