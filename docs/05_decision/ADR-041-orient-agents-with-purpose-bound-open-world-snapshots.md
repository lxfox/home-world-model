# ADR-041: Orient Agents with purpose-bound, open-world Snapshots

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-041-orient-agents-with-purpose-bound-open-world-snapshots.zh-CN.md`](ADR-041-orient-agents-with-purpose-bound-open-world-snapshots.zh-CN.md)

## Context

A new Agent needs enough context to reason correctly, but full-history export violates minimization and can reveal unrelated household data. An ordinary summary is smaller but encourages false completeness, hides unresolved items, and can be mistaken for accepted truth or transferred authority.

## Options

1. Give every admitted Agent the complete household RO-Crate.
2. Generate a prose summary and rely on the Agent to ask when uncertain.
3. Generate an immutable target/purpose-bound Snapshot whose required domains, coverage limits, unresolved registries, derivation closure, freshness, and retrieval boundaries are machine-visible.

## Decision

Adopt option 3 as the optional Agent Orientation Snapshot Profile. A Snapshot composes purpose-bound World Views and durable summaries while remaining distinct from the RO-Crate package and Task Continuity Checkpoint. Every required domain declares complete, partial, withheld, unavailable, not-applicable, or indeterminate coverage.

Use requires a separate Assessment of integrity, target Admission/Lease, Trust Root/Authority state, purpose/scope, freshness, coverage, unresolved registries, source closure, disclosure, and Change/Revalidation currency. Qualification grants orientation only.

## Reason

This makes “what the Agent knows it does not know” portable. Independent Agents can begin from the same bounded current projection without receiving all household history or converting omission, withholding, inaccessible evidence, or derived summaries into false facts and permissions.
