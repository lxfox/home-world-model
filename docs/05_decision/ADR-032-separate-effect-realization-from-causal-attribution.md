# ADR-032: Separate Effect Realization from causal attribution

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-032-separate-effect-realization-from-causal-attribution.zh-CN.md`](ADR-032-separate-effect-realization-from-causal-attribution.zh-CN.md)

## Context

Core Effect Assessment compares observations with expected effects, but its compact status can be misread as proof that an Attempt caused the observed state. In a household, sunlight, human action, other devices, thermal inertia, delayed observations, and pre-existing state routinely create the same before/after pattern.

## Decision

Adopt the optional Effect Realization and Attribution Profile. Effect Realization evaluates an exact Effect Claim using an independently accepted specification and fit-for-purpose observations. Causal Contribution separately evaluates the exact Attempt using a declared method, baseline, competing factors, assumptions, and outcome evidence.

Realization and contribution are orthogonal. Temporal order, correlation, device acknowledgement, simple before/after change, and PROV influence are insufficient for supported contribution. `not_supported` requires evidence against contribution under an accepted method; absence of evidence remains `indeterminate` or `not_assessed`.

## Consequences

- Existing Core `consistent` remains a compact realization projection, not causal attribution.
- Agents can learn effect models without overstating why a state changed.
- Stronger necessary, sufficient, sole, dominant, or legally responsible cause claims are out of scope.
- Side effects, goals, experience, Task completion, Intent fulfillment, safety, and authorization remain separate assessments.
