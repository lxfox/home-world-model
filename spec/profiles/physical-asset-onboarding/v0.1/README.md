# HWM Physical Asset Onboarding Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`acquisition-event-record.schema.json`](acquisition-event-record.schema.json), [`asset-onboarding-bundle.schema.json`](asset-onboarding-bundle.schema.json), [`asset-onboarding-assessment.schema.json`](asset-onboarding-assessment.schema.json)

## Purpose

This optional Profile carries one procured or otherwise acquired physical unit across delivery, instance identification, household admission, installation, function-position realization, endpoint association, and commissioning readiness without collapsing those stages.

The normative chain is:

`Commercial Offer/other acquisition basis -> transaction and fulfilment events -> received unit candidate -> Physical Asset identity -> installation evidence -> function-position realization candidate -> Digital Endpoint association -> commissioning readiness -> separate operational admission`

No single receipt, scan, installer report, network discovery, or user confirmation proves the whole chain.

## Event and object boundaries

An immutable Acquisition Event Record describes exactly one asserted event such as order placement, seller acceptance, payment authorization/capture, shipment, delivery, physical receipt, inspection, return, refund, or disposal. These events remain distinct. Their transaction, order, parcel, line, quantity, actor, unit and time identifiers are scoped to their issuers and systems.

An ordered quantity does not enumerate physical units. A delivered parcel does not prove all line items were received. A signed carrier delivery does not establish inspection, exact variant, authenticity, title, condition, installation, or commissioning. Payment does not establish seller acceptance, delivery, ownership, or asset identity.

The Profile may also onboard a gift, existing appliance, builder-supplied unit, rental, loan, or recovered asset. Commercial provenance may therefore be `not_applicable`; unknown provenance is `indeterminate`, not automatically illicit or unusable.

## Asset Onboarding Bundle

The Bundle binds one candidate Physical Asset EntityRef to the exact household and purpose, source Product Model and variant candidates, Commercial Offer Snapshot or other acquisition basis, event Records, unit-level identifiers and issuer namespaces, packaging and included-component observations, condition inspection, physical-presence challenge, photographs or scans, installation location and method evidence, intended function position, endpoint discovery and commissioning Records, source origins, Standing Decisions, disclosure constraints, and validity times.

Evidence from one barcode, photograph, marketplace listing, installer form, commissioning session, or database shares an origin and is not independent corroboration. Package serial, chassis serial, controller serial, Matter discriminator, fabric-scoped node ID, MAC/IP address, Home Assistant entity ID, and seller line ID are different identifiers unless a typed mapping is evidenced.

The Bundle is evidence input, not a mutable asset passport and not an ownership registry.

## Axis-preserving Assessment

The immutable Assessment reports each axis separately:

- `acquisition_trace`: `supported | not_applicable | conflicted | indeterminate`;
- `receipt_and_quantity`: `matched | partial | excess | rejected | indeterminate`;
- `variant_alignment`: `matched | mismatch | limited | indeterminate`;
- `physical_asset_identity`: `established | conflict | insufficient | indeterminate`;
- `condition_acceptance`: `accepted | rejected | limited | not_assessed | indeterminate`;
- `installation_state`: `not_installed | placed | mechanically_installed | electrically_connected | installer_reported_complete | independently_verified | indeterminate`;
- `function_position_binding`: `supported | unsupported | not_assessed | indeterminate`;
- `endpoint_association`: `supported | conflict | absent | not_assessed | indeterminate`;
- `commissioning_readiness`: `ready_for_governed_commissioning | blocked | not_required | not_assessed | indeterminate`; and
- `operational_admission`: `not_evaluated | admitted_by_separate_process | rejected_by_separate_process | indeterminate`.

The overall disposition is `onboarding_complete_for_declared_scope`, `onboarding_partial`, `quarantine_or_return`, `not_applicable`, or `indeterminate`. Completion means only that every axis required by the declared scope met its own policy. It does not turn one axis into proof of another.

## Realization and endpoint rules

A Physical Asset may realize a persistent IEC-bound function position only through a typed, time-bounded relation candidate. Exact asset identity, installation evidence, intended position, relevant geometry and the applicable planning revision remain available. The binding does not establish requirement satisfaction, installed performance, safety, code compliance, commissioning success, or product/asset identity equivalence.

A Digital Endpoint association is another typed, time-bounded relation. Discovery near the asset, a matching display name, common network address, or appearance during one commissioning session is insufficient by itself. One asset may expose several endpoints; one logical endpoint may front several assets; bridge/controller endpoints require declared topology. Endpoint reset or replacement need not replace the chassis or function position.

## Commissioning boundary

`ready_for_governed_commissioning` means the declared prerequisites for a later commissioning process are present. Matter fabric admission, Home Assistant entity creation, vendor-cloud enrollment, credential issuance, operational control testing, installed influence calibration, safety acceptance, and household action authority remain separate.

Commissioning observations may later support [Entity Identity Alignment](../../entity-identity-alignment/v0.1/README.md), an [Installed Influence Model](../../installed-influence-model/v0.1/README.md), or a [Household Commissioning Experiment](../../household-commissioning-experiment/v0.1/README.md). They do not retroactively prove delivery, ownership, installation quality, or purchase correctness.

## Change, replacement, return and removal

Return, refund, exchange, replacement, relocation, remounting, rewiring, endpoint reset, controller migration, function-position reassignment, damage, disposal, or evidence correction appends new Records and Assessments. A replacement unit receives a new Physical Asset identity even when it preserves the function position, Product Model, warranty case, household Intent, or endpoint name. Returned or removed assets are not erased; their former relations receive bounded validity.

## Invariants

1. Offer, order line, parcel, received unit, Physical Asset, function position, and Digital Endpoint remain distinct.
2. Payment, seller acceptance, shipment, carrier delivery, household receipt, inspection, title and return are distinct events or claims.
3. Quantity-level fulfilment never creates unit identity without unit evidence.
4. Package, chassis, component, controller and endpoint identifiers are typed and issuer-scoped.
5. Evidence sharing one origin is not independent corroboration.
6. Commercial provenance may be not applicable; missing provenance remains unknown.
7. Asset identity does not establish ownership, authorization, condition, installation, compliance or endpoint association.
8. Installation reports do not self-establish professional standing or independent verification.
9. Function-position realization does not establish requirement satisfaction or installed performance.
10. Endpoint discovery or commissioning does not establish chassis identity, installation quality or control authority.
11. Commissioning readiness is not commissioning success or operational admission.
12. Replacement preserves no asset identity merely because a role, model, name, order or endpoint label is reused.
13. Return, removal and correction append history and bound former relations; they do not rewrite receipt or installation history.
14. Onboarding completion grants no purchase, payment, ownership, installation, energization, network enrollment or operational control authority.

## Conformance

The [Physical Asset Onboarding oracle](../../../../conformance/scenarios/physical-asset-onboarding-v0.1/README.md) tests transaction/event separation, quantity and unit identity, identifier scopes, non-commercial acquisition, installation states, function-position and endpoint relations, commissioning boundaries, replacement and return.

```sh
node conformance/scenarios/physical-asset-onboarding-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define payment, ordering, logistics, title or property law, counterfeit detection, inventory accounting, warranty adjudication, electrical/building inspection, installer licensing, Matter commissioning, device control, asset management, or disposal regulation.
