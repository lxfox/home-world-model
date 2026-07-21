# ADR-037: Return tradeoff sets without hidden household utility

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-037-return-tradeoff-sets-without-hidden-household-utility.zh-CN.md`](ADR-037-return-tradeoff-sets-without-hidden-household-utility.zh-CN.md)

## Context

Household options often trade illumination, glare, energy, cost, privacy, resilience, and different people's experience. A single score is easy to rank but conceals unit conversion, uncertainty, subject attribution, missing evidence, and value judgements. Existing HWM Profiles preserve conflict and participation but do not define a bounded comparison result before recommendation or selection.

## Options

1. Require a weighted utility score for every option.
2. Let each Agent choose its own ranking strategy and explain it afterward.
3. Preserve a purpose-bound outcome matrix, filter only accepted hard constraints, compute qualified pairwise dominance, and return a non-dominated/incomparable tradeoff set unless an accepted value rule exists.

## Decision

Adopt option 3 as the optional Multi-Target Option Comparison Profile. Every matrix cell binds exact target, option, assessment, epistemic basis, coverage, uncertainty, and accepted comparison rule. Hard constraints require independent purpose-specific governance. Dominance uses a three-valued boundary: unknown or materially incomparable dimensions block a conclusive claim.

Weights, priorities, lexicographic rules, aspiration levels, and tie-breaks remain independently accepted value Claims. They may support an attributed Recommendation but do not alter dominance facts or create Selection, purchase, installation, or action authority.

## Reason

The model remains useful without pretending that technical optimization can resolve household values. Agents can reduce dominated choices, expose the real tradeoffs, and ask smaller questions while keeping every value judgement attributable and revisable.
