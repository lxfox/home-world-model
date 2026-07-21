# ADR-048: Compose environmental influences with explicit interaction models

- Status: Proposed
- Date: 2026-07-19

## Context

Household environmental targets are jointly affected by multiple systems, daylight/weather, people, openings, controllers, spatial pathways, and shared resources. Adding individually qualified device-effect models would silently assume linearity, independence, compatible timing and geometry, no saturation, and no feedback. Requiring every possible combination to be measured is also infeasible.

## Options

1. Add component predictions whenever units match.
2. Require one fully empirical model for every combination.
3. Bind an exact joint scenario and use an explicit, validated composition mode with visible interactions, baselines, domain, and uncertainty.

## Decision

Adopt option 3 as the Joint Environmental Influence Profile. Supported modes are direct joint model, validated superposition, main effects plus interaction residual, conservative envelope, scenario ensemble, or not composable. Component qualification never qualifies composition. Unknown interaction is never zero.

The joint Assessment checks baseline closure, spatial/temporal alignment, controller semantics, nonlinear domain, shared resources, uncertainty dependence, participant coverage, and joint validation. Aggregate results remain distinct from pointwise/zone/subject outcomes. Joint prediction does not allocate causal contribution.

## Reason

This gives Agents a scalable middle ground between naive arithmetic and exhaustive commissioning. Lighting, thermal, airflow, acoustic, and other domain solvers can remain external while exposing comparable composition assumptions and fitness.

## Consequences

- Joint scenarios require explicit participants, schedules, baselines, and interactions.
- Linear superposition becomes a testable domain claim.
- Conservative bounds and unresolved ensembles are valid outputs when precision is unsupported.
- Qualification remains separate from target fit, choice, compliance, safety, and action.

Chinese mirror: [`ADR-048-compose-environmental-influences-with-explicit-interaction-models.zh-CN.md`](ADR-048-compose-environmental-influences-with-explicit-interaction-models.zh-CN.md).
