# ADR-050: Govern active household calibration as bounded experiments

- Status: Proposed
- Date: 2026-07-19

## Context

Installed models need calibration, but an Agent that actively selects device actions can disturb people, consume resources, collect sensitive evidence, and encounter unsafe or unexpected responses. Model uncertainty and information gain are not household authority.

## Decision

Use an Experiment Objective, Commissioning Experiment Plan, and Experiment Run Assessment. Designs must show decision relevance, necessity, identifiability, least-impact alternatives, cumulative budgets, privacy, affected-subject procedures, restoration, and stop rules. Every fixed or adaptively selected trial passes the complete Proposal/Authorization/Attempt chain independently.

Stop rules override information value. Run completion, dataset fitness, model-update eligibility, validation, commissioning acceptance, and operational permission remain separate.

## Reason

This allows evidence-driven household commissioning without creating an autonomous exploration privilege.

Chinese mirror: [`ADR-050-govern-active-household-calibration-as-bounded-experiments.zh-CN.md`](ADR-050-govern-active-household-calibration-as-bounded-experiments.zh-CN.md).
