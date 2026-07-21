# ADR-035: Qualify planning predictions before transfer

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-035-qualify-planning-predictions-before-transfer.zh-CN.md`](ADR-035-qualify-planning-predictions-before-transfer.zh-CN.md)

## Context

Renovation planning needs estimates before target-household observations exist. Product declarations, simulations, and models learned in other installations are useful, but each answers a different question under different conditions. Treating any of them as a target-household fact would make the model convenient but epistemically unsound.

## Options

1. Store one confidence score on every recommendation.
2. Treat same-model products or high-fidelity simulations as installed facts.
3. Preserve each evidence basis and require a purpose-specific source/target qualification assessment.

## Decision

Adopt option 3 as the optional Planning Prediction Qualification Profile. A prediction binds exact target design assumptions, sources, result representation, and uncertainty budget. A separate assessment binds its exact revision, decision use, comparability dimensions, authorization, evidence standing, disagreement, and target currency.

Planning-only evidence may support exploration, screening, comparison, shortlist, or professional review input. It never independently establishes installation acceptance, code compliance, purchase, operational control, or Action Authorization. Target commissioning produces new empirical evidence and may lead to an Installed Influence Model without rewriting the historical prediction.

## Reason

This makes useful pre-installation advice possible while preserving the larger HWM rule: Agents may reason across heterogeneous evidence, but every downstream claim must remain explicit about what was measured, modeled, transferred, assumed, and authorized.
