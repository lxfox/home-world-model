# ADR-052: Admit physical assets by independent axes, not one onboarding flag

- Status: Proposed
- Date: 2026-07-19

## Context

Procurement qualification stops at shortlist, while the household model later needs a concrete Physical Asset, installation relation, function-position realization and Digital Endpoint. Payment, parcel delivery, barcode scans, installer reports and network commissioning each provide useful but differently scoped evidence. A single `installed` or `onboarded` flag would silently convert one stage into all others.

## Decision

Adopt the optional Physical Asset Onboarding Profile. Preserve acquisition events, household receipt and quantity, exact variant, unit identity, condition, installation state, function-position realization, endpoint association, commissioning readiness and operational admission as separate assessment axes. Create typed, time-bounded relation Claim candidates only from evidence appropriate to that relation.

Replacement creates a new Physical Asset even when Product Model, function position or endpoint label persists. Return, removal and correction append records and bound former relations rather than rewriting history. Onboarding grants no purchase, title, installation, network enrollment or control authority.

## Reason

This supplies the missing bridge from a planned or procured product to durable household knowledge while allowing different commerce, installer, Matter, Home Assistant and Agent implementations to contribute evidence without becoming the household source of truth.

Chinese mirror: [`ADR-052-admit-physical-assets-by-axis-not-one-onboarding-flag.zh-CN.md`](ADR-052-admit-physical-assets-by-axis-not-one-onboarding-flag.zh-CN.md).
