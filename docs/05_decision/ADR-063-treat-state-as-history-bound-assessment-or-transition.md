# ADR-063: Treat state as a history-bound assessment or transition

- Status: Accepted
- Date: 2026-07-19
- Chinese mirror: [`ADR-063-treat-state-as-history-bound-assessment-or-transition.zh-CN.md`](ADR-063-treat-state-as-history-bound-assessment-or-transition.zh-CN.md)

## Context

HWM uses many fields named `state`, `status`, `current`, and `active`. If interpreted as mutable truth cells, late evidence and concurrent writers can erase history or silently select a winner. Most existing artifacts already carry time, evidence, revision or predecessor boundaries. Reusable Value Rule State claimed Authority-governed transitions but lacked state revision, predecessor binding and `as_of`. Action Trace has a revision number but no Core predecessor field.

## Decision

1. State-bearing HWM artifacts are immutable Assessments, Views or Transition States over identified source artifacts and occurrence Records. Mutable indexes and caches are non-normative projections.
2. `current` and `active` are bounded by the exact contract's `as_of`, purpose, evidence closure, Authority Epoch, applicability and freshness; they are not timeless truth.
3. Same identity/revision with different canonical content is an integrity conflict. Multiple successors are contested; largest revision, newest timestamp, highest confidence or last writer does not select a winner without accepted policy.
4. Reusable Value Rule State is hardened outside Core with `state_revision`, `previous_state_binding`, `as_of`, content-bound Authority transition and mandatory successor binding for `superseded`.
5. Core Action Trace is not expanded. Its revisions are immutable snapshots whose content identity is supplied by package integrity; revision/derivation may use existing W3C PROV/RO-Crate relations. Fork detection is conformance/integrity work, not a missing household primitive.
6. Supersession, withdrawal, revocation and authorized deletion preserve historical addressability through prior artifacts, transition Records, tombstones or receipts. They do not reverse physical effects.

## Consequences

- State vocabulary remains domain-specific while history semantics are consistent.
- One optional-Profile gap is fixed without reopening frozen Core.
- Implementations must retain or reproduce normative history even if they overwrite a cache.
