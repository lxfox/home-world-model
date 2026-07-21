# HWM Change Impact Revalidation Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`household-change-set.schema.json`](household-change-set.schema.json), [`artifact-revalidation-assessment.schema.json`](artifact-revalidation-assessment.schema.json)

## Purpose

This optional Profile determines what must be revalidated when the home, installation, household composition, design, knowledge, or governance changes. It preserves historical interpretation while preventing stale models, targets, rules, and permissions from silently governing the current household.

It does not define one global home version, delete old knowledge, infer that every artifact is affected, or treat every edit as a physical-world change.

The normative chain is:

`admitted change evidence -> immutable Household Change Set -> declared dependency closure -> per-artifact Revalidation Assessment -> current-use decision and bounded follow-up`

## Change semantics

A Change Set contains one or more content-bound changes with effective time, observation/decision time, provenance, evidence standing, and before/after bindings when available. Each change declares one semantic class:

- `world_change`: something in the household or installation changed;
- `knowledge_correction`: the represented world may be unchanged, but an earlier Claim/Record was corrected;
- `design_change`: a planned context or assumption changed;
- `governance_change`: Authority, policy, role, disclosure, or permission changed; or
- `evidence_availability_change`: evidence became available, unavailable, minimized, or access-restricted.

Change kinds are declared vocabulary terms, not a closed universal taxonomy. Common kinds include asset replacement, endpoint replacement, relocation/remounting, geometry/material change, space-use change, household/pet membership change, role/capacity change, design revision, policy/Authority transition, and evidence withdrawal.

A newly discovered old condition is not automatically a world change at discovery time. Correction time, phenomenon/effective time, and Record time remain distinct. A future-effective change does not affect a current `as_of` View.

## Declared dependencies

Artifacts expose or are accompanied by content-bound dependencies with one of these roles:

- `identity_basis`
- `applicability_condition`
- `model_input`
- `geometry_or_material`
- `subject_or_population_scope`
- `evidence_source`
- `evaluation_specification`
- `authority_or_governance`
- `privacy_or_disclosure`
- `lifecycle_realization`
- `declared_other`

Impact propagation follows only declared, purpose-understood edges and a named closure policy. Identifier similarity, graph proximity, shared labels, file co-location, or Agent intuition cannot create a dependency.

Closure is `complete_for_declared_dependencies`, `partial`, or `indeterminate`. No path plus complete closure may establish `unaffected`; no path with incomplete closure is `indeterminate`. Cycles, missing nodes, ambiguous edge semantics, inaccessible dependencies, or conflicting current heads fail closed.

## Revalidation dimensions

Each Assessment binds one exact artifact revision, Change Set, dependency snapshot, purpose, `as_of`, Authority Epoch, and closure result. It separately evaluates:

- `identity_impact`: unchanged, new identity required, or indeterminate;
- `assumption_impact`: still satisfied, invalidated, review required, or indeterminate;
- `evidence_impact`: retained, unavailable, standing changed, review required, or indeterminate;
- `governance_impact`: unaffected, refresh required, use denied, or indeterminate;
- `privacy_impact`: unaffected, disclosure review required, use denied, or indeterminate; and
- `current_use_status`: current, review required, historical only, not usable, or indeterminate.

The overall result is:

- `unaffected`
- `remains_valid`
- `review_required`
- `new_revision_required`
- `new_identity_required`
- `historical_only`
- `not_usable`
- `indeterminate`

These are revalidation outcomes, not Core World View status values.

## Domain examples

- Replacing an installed endpoint or relocating/remounting a device requires a new Installed Influence Model identity; the old model remains historical.
- Replacing a lamp need not change its IEC-bound function-position identity, target requirements, or prior commissioning history.
- Changing room use may preserve geometry while requiring review of applicability Rules, Evaluation Specifications, Planning Predictions, and Value Rules.
- A new household member or pet does not falsify existing personal Claims. It may make population coverage, privacy disclosure, impact closure, or coordination sets incomplete.
- A person leaving does not erase their historical Records; current access, participation, representation, and retention are governed separately.
- An Authority Epoch change does not make physical observations false. It requires refresh of current-use authorization, active policy/rule state, leases, and disclosure decisions.
- A design-base revision makes dependent option outputs historical until explicit rebase and recomputation; it does not rewrite the earlier comparison.
- Correction of a room dimension may invalidate geometry-dependent predictions without asserting that the wall physically moved.

## Follow-up and non-cascade

A Revalidation Assessment may require bounded follow-up such as re-observe, re-simulate, re-commission, re-resolve a World View, review a target/specification/rule, refresh Authority state, or open a new identity lineage. It never performs those transitions itself.

One artifact's `new_revision_required` does not automatically create the revision. One model's `new_identity_required` does not replace it. One privacy review does not disclose hidden subjects. Cascaded follow-up produces new artifacts and a new closure snapshot rather than mutating the prior assessment.

## Invariants

1. World change, design change, knowledge correction, governance change, and evidence availability change remain distinct.
2. Effective time, observation/decision time, and Record time remain distinct.
3. Propagation follows explicit typed dependencies and a bounded closure policy.
4. Incomplete closure cannot prove unaffectedness.
5. Historical artifacts are immutable and remain interpretable at compatible `as_of` times.
6. Identity-basis changes require new identity; assumption changes may require only revision/review.
7. Asset replacement need not replace function-position or requirements.
8. Membership change does not synthesize or erase personal truth, authority, consent, or preference.
9. Authority change does not rewrite physical facts.
10. Correction does not imply the physical world changed at correction time.
11. Revalidation outcome does not execute follow-up or grant action authority.
12. Current-use invalidation does not delete provenance or history.

## Conformance

The [Change Impact Revalidation oracle](../../../../conformance/scenarios/change-impact-revalidation-v0.1/README.md) tests time semantics, dependency closure, identity/assumption/governance impacts, device and space changes, membership, correction, history, and forbidden cascades.

```sh
node conformance/scenarios/change-impact-revalidation-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
