# ADR-033: Separate Intent Assurance from Task closure

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-033-separate-intent-assurance-from-task-closure.zh-CN.md`](ADR-033-separate-intent-assurance-from-task-closure.zh-CN.md)

## Context

Existing Intent and Task Profiles already state that fulfillment and completion require evidence, but the action pipeline lacks an explicit integration gate. Implementations may otherwise treat a realized effect, satisfied Goal, fulfilled Intent, completed Task, or successful Attempt as the same terminal success.

## Decision

Adopt the optional Outcome Assurance and Work Closure Profile. One append-only receipt reports Intent Assurance and Work Closure Gate as independent axes. Persistent fulfillment is a bounded compliance snapshot. Task closure depends on exact exit criteria, terminal/reconciled Attempts, and resolved post-action obligations—not directly on Intent fulfillment.

The receipt never performs the Task state transition, retracts Intent, revokes authorization, or erases execution history. Direct realization has no Task closure state and cannot create a Task retroactively.

## Consequences

- A bounded diagnostic Task may complete while its parent Intent remains ongoing or not fulfilled.
- An Intent may be fulfilled while recovery, side-effect, notification, audit, or acceptance work keeps the Task open.
- Persistent drift appends a new assurance result.
- Goal, Intent, Task, and execution dashboards can report different truthful states rather than one misleading success badge.
