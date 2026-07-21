# ADR-034: Learn bounded installed influence models

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-034-learn-bounded-installed-influence-models.zh-CN.md`](ADR-034-learn-bounded-installed-influence-models.zh-CN.md)

## Context

The original household narrative requires an Agent to estimate how an installed lamp, HVAC unit, pump, blind, or appliance changes its surrounding space. Existing fixtures contain learned effect Claims, but do not define when episodes may update a model, what fixes model identity, or how to prevent household-local calibration from becoming universal device truth.

## Decision

Adopt the optional Installed Influence Model Profile. Model identity binds an exact installed endpoint, installation/space geometry, affected feature and property, action kind, and household. Material identity changes create a new model. Same-identity learning creates an immutable candidate revision with exact dataset, procedure, validation, applicability, uncertainty, and limitation bindings.

Predictive association and causal response are separate semantic kinds. Causal-response training requires admitted Causal Contribution Assessments. Every candidate requires independent validation and purpose-specific acceptance; out-of-domain use is indeterminate and model acceptance grants no action authority.

## Consequences

- Commissioning experiments can produce portable local response surfaces without claiming universal capability.
- Device replacement, relocation, or room geometry changes explicitly invalidate lineage reuse.
- Simulation and manufacturer data can serve as declared priors but remain distinct from household observations.
- Online updates become reviewable candidate revisions rather than silent mutation.
