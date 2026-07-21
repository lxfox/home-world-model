# ADR-039: Reuse values only through activated, revocable rules

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-039-reuse-values-only-through-activated-revocable-rules.zh-CN.md`](ADR-039-reuse-values-only-through-activated-revocable-rules.zh-CN.md)

## Context

Asking the same value question repeatedly creates burden, but caching historical choices as permanent preferences creates profiling, scope creep, stale assumptions, and unclear revocation. HWM needs a reusable layer that remains household-controlled and does not become an automation or Intent.

## Options

1. Let each Agent maintain private learned preference weights.
2. Treat repeated responses as automatically active rules until contradicted.
3. Require an explicit Rule Definition, content-bound Authority activation, lifecycle state, review/expiry, and an exact-use applicability assessment.

## Decision

Adopt option 3 as the optional Reusable Value Rule Profile. Rule identity fixes household, represented subject scope, decision domain, value-relation kind, target scope, and purpose. Every Definition revision requires its own activation. Active, applicable rules may suppress only an equivalent clarification question for one exact comparison need.

Paused, retired, superseded, contested, expired, stale, unauthorized, context-mismatched, exception-bound, or conflicting rules do not govern silently. Drift signals trigger review rather than automatic rewrite. Offline revocation latency must be bounded and visible rather than claimed as zero.

## Reason

This provides convenience without turning memory into authority. A household can deliberately make a value relation reusable, inspect why it was used, narrow or pause it, revoke it, and preserve the historical decisions that depended on earlier states.
