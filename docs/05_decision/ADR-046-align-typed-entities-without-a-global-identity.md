# ADR-046: Align typed entities without a global identity

- Status: Proposed
- Date: 2026-07-19

## Context

Agents and platforms describe the same household through scans, drawings, Matter fabrics, Home Assistant registries, product catalogs, commissioning records, and visual tracks. A universal `sameAs` or one global device ID would collapse physical assets, function positions, product models, endpoints, representations, spaces, and subjects. Wrong merges would silently transfer capabilities, history, policy, and physical models.

## Options

1. Normalize every identifier into one canonical entity table.
2. Let probabilistic similarity or the latest Agent choose merges.
3. Evaluate typed, purpose- and time-bound identity; preserve non-identity relations explicitly; append alignment Claims without rewriting references.

## Decision

Adopt option 3 as the Entity Identity Alignment Profile. Results are `same_entity`, `distinct_entities`, `related_not_identical`, `unresolved`, or `integrity_conflict`. Cross-kind inputs cannot be identical. Replacement, realization, endpoint exposure, model instance, representation, topology, and substitutability use explicit relations.

Identifiers remain namespace- and time-scoped. Evidence origins are deduplicated. Human and pet subjects are not inferred from observation tracks or standardized biometrics. Alignment enters the model through Contribution Admission and does not silently merge indexes or transfer properties and Authority.

## Reason

Typed relations preserve lifecycle continuity without confusing the old lamp with the new lamp, the lamp with its function, or a camera track with a person. The model remains federated and correctable without depending on one vendor's identity registry.

## Consequences

- Applications must retain more EntityRefs and explicit relations.
- Identity-sensitive operations require stronger, purpose-specific evidence.
- Unresolved identity remains visible instead of being hidden by deduplication.
- Downstream Profiles must state which exact relations permit which property reuse.

Chinese mirror: [`ADR-046-align-typed-entities-without-a-global-identity.zh-CN.md`](ADR-046-align-typed-entities-without-a-global-identity.zh-CN.md).
