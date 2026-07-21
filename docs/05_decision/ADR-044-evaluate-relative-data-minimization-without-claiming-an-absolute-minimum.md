# ADR-044: Evaluate relative data minimization without claiming an absolute minimum

- Status: Proposed
- Date: 2026-07-19

## Context

World Views and Agent Orientation already require purpose-bound disclosure, and cross-Agent composition requires minimum input packages. However, “minimum” is not reproducible unless purpose, output contract, semantic dependencies, precision, candidate transformations, linkage risk, retention, and known auxiliary information are explicit. In an open world, an implementation cannot prove that no present or future transformation could use less information.

## Options

1. Trust the requesting Agent to declare its minimum.
2. Use a scalar privacy score or `minimal: true` flag.
3. Evaluate sufficiency and per-item necessity against an exact contract, and compare known candidate packages under a bound risk policy.

## Decision

Adopt option 3 as the Purpose-Bound Disclosure Profile. A Requirement Set states exact semantic needs and output/use constraints. A Package Manifest records sources, transformations, losses, precision, coverage, and package-level inference/linkage risk. An independent Assessment determines whether the package is sufficient, each item is justified, and no known lower-risk qualifying candidate exists in the content-bound candidate set.

The result is relative, time-bound, and non-authorizing. Combining packages, changing auxiliary context, or changing output use requires reassessment. Input minimization does not qualify output, logs, training, retention, or onward disclosure.

## Reason

This is falsifiable across implementations while avoiding a dishonest global-minimum claim. It also makes privacy part of the interoperable Agent contract rather than an informal promise by one model vendor.

## Consequences

- Resolvers must expose transformations, loss, and known alternatives.
- Package-level linkage may reject fields that looked safe in isolation.
- Local compute and result-only release become first-class alternatives.
- Qualification remains separate from Authority, evidence standing, correctness, and action.

Chinese mirror: [`ADR-044-evaluate-relative-data-minimization-without-claiming-an-absolute-minimum.zh-CN.md`](ADR-044-evaluate-relative-data-minimization-without-claiming-an-absolute-minimum.zh-CN.md).
