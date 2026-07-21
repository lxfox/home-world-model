# ADR-040: Revalidate through declared dependencies without rewriting history

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-040-revalidate-through-declared-dependencies-without-rewriting-history.zh-CN.md`](ADR-040-revalidate-through-declared-dependencies-without-rewriting-history.zh-CN.md)

## Context

Homes change continuously: devices are replaced, rooms change use, geometry is corrected, people and pets join or leave, designs evolve, and Authority policies rotate. A global home-version invalidation is too coarse, while permanent validity silently applies stale assumptions. HWM needs bounded propagation that preserves historical interpretation.

## Options

1. Increment one home version and invalidate every dependent artifact.
2. Let each Agent infer impact from names and graph proximity.
3. Represent an immutable typed Change Set, traverse only declared dependency roles under a closure policy, and issue per-artifact revalidation outcomes.

## Decision

Adopt option 3 as the optional Change Impact Revalidation Profile. It distinguishes world, design, correction, governance, and evidence-availability changes; preserves effective/observed/record time; and assesses identity, assumptions, evidence, governance, privacy, and current use separately.

Only complete declared closure with no dependency path proves `unaffected`. Identity-basis changes require a new lineage; other changes may require review or revision. Current invalidation makes an artifact historical or unusable for a purpose but never rewrites or deletes it. Revalidation requests follow-up without executing it.

## Reason

This lets independent Agents reach the same bounded answer about stale knowledge without requiring a universal dependency graph or one mutable digital twin. The household can explain exactly why an artifact remains current, needs review, requires a new identity, or is available only for historical reconstruction.
