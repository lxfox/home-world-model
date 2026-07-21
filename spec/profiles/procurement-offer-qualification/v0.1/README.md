# HWM Procurement Offer Qualification Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`commercial-offer-snapshot.schema.json`](commercial-offer-snapshot.schema.json), [`procurement-bundle-requirement.schema.json`](procurement-bundle-requirement.schema.json), [`procurement-candidate-assessment.schema.json`](procurement-candidate-assessment.schema.json)

## Purpose

This optional Profile qualifies a time- and region-bound commercial offer for a selected or compared household design without confusing Product Model, regional variant/SKU, seller listing, Offer, purchased item, Physical Asset, or Digital Endpoint.

The normative chain is:

`qualified Design Option/Product Model -> typed variant/SKU alignment -> Commercial Offer Snapshot + Bundle Requirement -> identity, specification, certification, regional, compatibility, completeness, availability, delivery and total-cost checks -> Procurement Candidate Assessment -> shortlist/Household Choice -> separate BuyAction/payment/fulfilment`

Qualification is not purchase authority.

## Identity layers

- **Product Model** describes a product family or datasheet.
- **Variant/SKU** fixes relevant regional/version attributes such as voltage/frequency, radio region, firmware channel, plug, language, color, package, certification, and included components.
- **Seller Listing** is a source page or API record and may be inaccurate, duplicated, or stale.
- **Commercial Offer Snapshot** is an immutable observation/attestation of seller terms at one time.
- **Purchased Item / Physical Asset** exists only through separate transaction, receipt, delivery, identity, and installation evidence.

Names, images, manufacturer family, marketplace grouping, shared GTIN without issuer/packaging scope, “Matter compatible”, or seller text do not by themselves establish exact variant identity. Alignment may use the [Entity Identity Alignment Profile](../../entity-identity-alignment/v0.1/README.md).

## Commercial Offer Snapshot

The Snapshot binds seller/merchant identity and standing, platform/listing ID and URL, exact offered variant identifiers, condition, quantity, included items, price/currency, tax/VAT, shipping, duties, discounts and conditions, availability semantics, region/ship-to, delivery estimate and uncertainty, reservation/backorder/preorder state, warranty, return policy, installer/service terms, observed time, valid-through/expiry, source capture digest, and proof.

`in_stock` is a seller claim at observation time, not reservation, allocation, delivery, authenticity, or future availability. A displayed price is not total landed cost. Dynamic price or inventory changes create new Snapshots and Assessments; historical comparisons remain unchanged.

## Procurement Bundle Requirement

The Requirement binds exact Design Option/functional positions, quantities, acceptable variants/substitutions, electrical and physical installation constraints, required hubs/bridges/controllers, mounting/trim/power supplies/cables, licenses/subscriptions/cloud dependencies, tools/services, spares, certification/jurisdiction requirements, interoperability Profiles, commissioning obligations, delivery deadline, budget basis, lifecycle/maintenance expectations, and acceptance/return contingencies.

Bundle closure is typed. An included bridge does not prove it can serve the planned topology; a protocol logo does not prove Profile/version/role support; a product candidate does not prove electrician work, circuit capacity, code compliance, or installation feasibility.

## Assessment

The Assessment separately checks:

- Offer integrity, source standing, freshness, seller/listing/variant alignment, and duplicate/counterfeit risk;
- exact specification, regional/electrical/radio/firmware and certification fit;
- HWM planning prediction and requirement-evaluation bindings;
- interoperability capability/profile/version/role evidence;
- complete bundle quantities and dependencies;
- availability/reservation, delivery-window fit, return/warranty/service terms;
- item, tax, shipping, duty, subscription, installation, accessory, operating and maintenance cost basis; and
- disclosure, seller-account, shopping-cart, payment and purchase-authority boundaries.

Its result is `qualified_for_shortlist`, `qualified_with_limits`, `clarification_required`, `not_qualified`, or `indeterminate`. Price ranking is not part of qualification. Multiple qualified offers remain candidates for the existing multi-target comparison and Household Choice processes.

## Shopping Agent boundary

A shopping CLI/Agent may retrieve offers as a [cross-Agent work slot](../../cross-agent-work-composition/v0.1/README.md), receiving only the minimum Product Model/variant/region/bundle query. Its login session, addresses, purchase history, cart, payment instrument, and order permissions remain separate purpose-bound disclosures and Authority scopes. A search worker cannot checkout, and a planning Agent cannot inherit the shopping Agent's seller session or payment authority.

Cart creation, reservation, BuyAction, payment authorization, seller acceptance, shipment, delivery, receipt, ownership, asset identity, installation, commissioning, and return/refund are distinct events. This Profile stops at candidate qualification.

After a separately authorized acquisition, the [Physical Asset Onboarding Profile](../../physical-asset-onboarding/v0.1/README.md) may carry fulfilment and unit evidence into a candidate Physical Asset, installation relation, function-position realization and endpoint association. Procurement qualification itself supplies none of those facts.

## Change and substitution

Offer expiry, stock/price/terms change, listing correction, variant change, firmware/certification change, design revision, delivery need, bundle dependency, or policy change requires a new Assessment. Seller substitution is never silent: even “equivalent replacement” receives exact identity, prediction, compatibility, bundle, and tradeoff re-evaluation.

## Invariants

1. Product Model, variant/SKU, listing, Offer Snapshot, cart line, order, delivered item, Physical Asset, and Endpoint remain distinct.
2. Name/image/listing equality does not establish exact variant identity.
3. Offer is seller-, condition-, region-, quantity-, time-, currency-, and terms-bound.
4. Display price is not total landed/lifecycle cost.
5. Stock claim is not reservation, fulfilment, authenticity, or delivery.
6. Protocol/logo claims do not establish semantic capability, certification, or household compatibility.
7. Bundle closure includes quantities, dependencies, accessories, services, subscriptions, commissioning, and contingencies.
8. Qualified Product Model prediction does not qualify every Offer/variant.
9. Offer changes append Snapshots and never rewrite historical comparison/choice.
10. Substitution requires explicit re-evaluation and never inherits selection silently.
11. Search access, cart access, purchase authority, payment, fulfilment, ownership, installation, and commissioning remain separate.
12. Procurement qualification grants no BuyAction, payment, ownership, installation, compliance, safety, or operational action authority.

## Conformance

The [Procurement Offer Qualification oracle](../../../../conformance/scenarios/procurement-offer-qualification-v0.1/README.md) tests identity layers, regional variants, seller claims, offer expiry, bundle closure, total cost, shopping Agent authority, substitutions, and forbidden purchase/installation inference.

```sh
node conformance/scenarios/procurement-offer-qualification-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define marketplace search/ranking, seller trust scoring, price prediction, payments, tax/legal advice, order/return APIs, counterfeit detection, logistics, product certification, electrical/building compliance, or installer selection.
