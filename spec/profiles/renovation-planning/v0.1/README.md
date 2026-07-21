# HWM Renovation Planning Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0

## Purpose

This optional Profile carries household intent from pre-renovation design into later procurement, installation, commissioning, and operation without presenting plans, catalog data, or simulations as physical facts.

It is an application Profile over the HWM kernel. Space, Product Model, Design Option, electrical design, and simulation artifacts are not new Core primitives.

## Reused Semantics

- BOT describes buildings, spaces, zones, topology, and links to geometry artifacts.
- SOSA/SSN identifies the Feature of Interest or Measurement Zone whose physical property matters.
- Schema.org `ProductModel` represents a vendor datasheet or prototypical product, not a purchased individual asset.
- HWM Simple Action–Effect Profile represents predicted physical outcomes and uncertainty.
- RO-Crate carries design, catalog, electrical, and simulation artifacts with typed resources and integrity metadata.
- PROV-O `Plan`, `Activity`, `used`, `generated`, `wasDerivedFrom`, `wasRevisionOf`, and invalidation represent design plans, dependency lineage, explicit revision, and loss of subsequent usability.
- EARL `Assertion`, `TestResult`, and `outcome` represent whether an option passes or fails a declared requirement.
- Schema.org `ChooseAction` represents household choice and remains distinct from `BuyAction`. Schema.org `Recommendation` is useful for advisory output but is not the sole normative binding because the term remains in Schema.org's `new` area.
- Matter or WoT Thing Description becomes relevant when a concrete installed or virtual Thing exposes a controllable interface; a catalog Product Model alone does not create a Digital Endpoint.

## Required Distinctions

1. A design geometry Claim MUST use epistemic basis `planned`, unless supported by a later observation or authorized attestation. Importing a drawing does not make the built space observed.
2. A catalog candidate MUST be represented as a Product Model or equivalent product-kind description. It MUST NOT be typed as a Physical Asset merely because it may be purchased.
3. `candidateFor` is a compatibility projection for considering a Product Model in a planning context that also identifies an IEC-bound function-position role. It MUST NOT be interpreted as asset–function realization, installation, ownership, or compatibility proof.
4. A `mountingPlan` belongs to a Design Option and records intended Product Model, function-position role, space, position, and orientation. It does not assert an installed location.
5. A simulation-derived effect Claim MUST use epistemic basis `simulated` and reference its input context and result artifact. It MUST NOT be emitted as an observation.
6. A `planned_load_allocation` is a planning-context quantity role used only for catalog screening. A Product Model within that allocation MUST NOT be treated as proof of installed load, maximum demand, design current, conductor capacity, protection coordination, voltage-drop performance, installation verification, code compliance, or permission to energize.
7. A design option may be predicted to meet a requirement while remaining unverified. Predicted satisfaction is not a Goal Evaluation over observed physical results.
8. Every plan-specific, simulation-specific, or branch-derived Claim MUST carry a `designContext` extension with `context_id`, `context_kind`, and `revision`. `context_kind` MUST be `base_design`, `design_option`, or `comparison` in this version. Epistemic basis is not a branch identifier.
9. Shared spatial and electrical design Claims MUST use a `base_design` context. Each mutually exclusive Design Option MUST use its own `design_option` context and MUST explicitly link to its base with `prov:wasDerivedFrom`; a Resolver MUST NOT infer that link from naming or time.
10. A Claim in one `design_option` context MUST NOT consume Claims from another option context. Shared requirements and catalog declarations without a design context MAY be evaluated within each branch. Cross-branch inference is permitted only in a `comparison` context whose `input_context_ids` explicitly enumerate every input branch.
11. Requirement satisfaction MUST be derived separately inside each Design Option before comparison. The target semantic binding MUST use an EARL Assertion and TestResult outcome; `hwm-planning:requirementStatus` is only a migration compatibility projection.
12. A comparison recommendation is advisory information. An external projection SHOULD use a Schema.org Recommendation with PROV input and generation lineage, but v0.1 MUST NOT rely on that still-new Schema.org type as its only normative encoding. A recommendation MUST NOT be interpreted as household choice, Authorization Decision, purchase, installation, commissioning, or action dispatch.
13. A household member's explicit selection MAY be recorded as an Attestation with planning-only effect. The target semantic binding MUST use a completed Schema.org `ChooseAction` with `agent`, selected `object`, and every considered `actionOption`; `hwm-planning:selectedOption` is only a migration compatibility projection. Choice MUST NOT imply `BuyAction`, delete an unselected option, or create ownership, installation, or execution authority. A later change requires a new Claim or revision Record rather than mutation of history.
14. Each `ChooseAction` MUST remain an immutable historical event. A later selection-state Claim MAY use `dcterms:replaces` to supersede an earlier selection state for current resolution. At View `as_of`, exactly one unreplaced selection head is accepted; multiple heads are conflicting; a cycle is an integrity conflict; an unavailable replacement target is indeterminate. None of these states creates purchase or execution authority.
15. A comparison context MUST declare a duplicate-free closed `input_context_ids` set. Before admitting a proposed recommendation, a Resolver MUST require exactly one resolution for every declared input, no undeclared input, and status `available`, `accepted`, `current`, temporally `in_effect` or `unbounded`, and `applicable` on every input. Otherwise it MUST emit no recommendation and return `indeterminate` or `invalid_context` as specified by the conformance oracle.
16. The recommendation algorithm is outside this Profile. The Profile gates whether an externally proposed recommendation has sufficient declared input evidence; it does not rank or select Design Options.
17. Each Design Option MUST have exactly one explicit `prov:wasDerivedFrom` edge to a `base_design` context. A missing or multiple base derivation is `invalid_context`; a Resolver MUST NOT infer or choose a base.
18. Dependency structure and dependency availability are distinct. When the base link exists but its resolution is missing, unavailable, access-denied, deleted, unaccepted, or not current, the option is `indeterminate` for current derivation and MUST emit no current simulation, evaluation, or recommendation. Existing immutable outputs MAY remain preserved as historical Records, subject to Authority, but MUST NOT be promoted into current Candidates.
19. An intact option rooted in a non-current base is `historical_only`. It remains interpretable at a compatible historical `as_of`, but MUST NOT generate or support a current recommendation.
20. A base revision MUST NOT implicitly update a Design Option. A rebase requires a new option revision, `prov:wasRevisionOf` lineage to the prior option when substantial content is retained, and a new explicit `prov:wasDerivedFrom` edge to the new base. Every downstream simulation and requirement evaluation used as current MUST be regenerated and bound to the new option revision.
21. All Design Options admitted to one current comparison MUST have `ready` dependency closures and the same current base-design root. Mixed base revisions, historical-only branches, or unresolved roots emit no recommendation. Comparing different layout alternatives requires modeling them as options under an explicitly shared higher-level base, not bypassing the shared-root rule.
22. `ready`, `historical_only`, `indeterminate`, `invalid_context`, and `integrity_conflict` in the dependency oracle are Profile conformance outcomes, not new HWM Core World View status values.
23. `reservedLoad` MUST NOT be emitted as a target HWM predicate. Electrical quantities MUST identify a role such as product nameplate power, planned load allocation, installed load, estimated maximum demand, design current, current-carrying capacity, protective-device rated current, authorized maximum demand, or derived margin; these roles are Profile-controlled classifications, not HWM ontology classes.
24. A derived electrical margin MUST name both the demand and capacity inputs, their compatible dimensions and scope, assumptions, provenance, and validity. If the inputs are missing or incomparable, the Assessment MUST remain indeterminate rather than manufacture a scalar margin.
25. Active power MUST NOT be converted into design current without the required voltage, phase/topology, power-factor, efficiency, duty, and allocation assumptions appropriate to the declared method.
26. Planned, installed, observed, inspected, verified, and jurisdictionally compliant states MUST remain distinct. Engineering arithmetic or a design Assessment MUST NOT create an installation-verification or code-compliance Claim.

## Fixture Terms

The [Renovation Planning Term Mapping Audit](../../../mappings/renovation-planning/v0.1/README.md) classifies the fixture terms:

- `requirementStatus` and `selectedOption` are removed from the target HWM vocabulary in favor of EARL and Schema.org `ChooseAction` respectively;
- Design Option, `mountingPlan`, `recommends`, `designContext`, closed comparison input, and the recommendation–choice–authorization boundary remain application-Profile composition rules, not HWM ontology classes;
- `candidateFor` is retained only as a scoped planning compatibility projection; `reservedLoad` is rejected and its former value is projected only as a typed `planned_load_allocation` for catalog screening;
- `prov:wasDerivedFrom`, `used`, and `generated` are used directly for lineage.

The executable fixture retains several `hwm-planning:` predicates as migration compatibility projections so the external mapping can be checked losslessly. They MUST NOT be presented as accepted HWM Core vocabulary.

## Package Rules

A conforming package MUST use the HWM RO-Crate Profile and contain exactly one Claim Envelope set and one Record set. It MAY contain typed spatial, electrical, catalog, simulation, BIM, image, or report artifacts. Each included File MUST carry media type, content size, SHA-256, semantic `additionalType`, and a `conformsTo` reference.

The transitional Manifest projects non-Core application artifacts to role `other`. Their precise meaning remains in RO-Crate `additionalType` and `conformsTo`; therefore the Manifest is a compatibility index, not the full semantic package.

## Current Fixture

[`renovation-planning-package-v0.1`](../../../../conformance/scenarios/renovation-planning-package-v0.1/README.md) contains:

- a BOT spatial model for a planned bedroom and reading zone;
- a declared 300-lux household requirement;
- two Schema.org Product Model candidates in mutually exclusive Design Options derived from one base design;
- a planned 100-W catalog-screening allocation, declared 12-W and 8-W candidate maxima, and an explicit incomplete electrical-design Assessment;
- simulated effects of 320–380 lux for option A and 245–285 lux for option B;
- separate per-option requirement evaluations, an explicit comparison recommending A, and a homeowner Attestation selecting A;
- retention of unselected option B;
- no Physical Asset, Digital Endpoint, observation, action, authorization, purchase, or installation Claim.

The fixture closes over the existing HWM kernel. It does not justify a new Core primitive.

The separate [`planning-branch-resolution-v0.1`](../../../../conformance/scenarios/planning-branch-resolution-v0.1/README.md) oracle adds as-of selection revision, fork, cycle, missing replacement target, closed-input failure, stale and contested input, a valid three-option comparison, ten base-dependency cases, and five shared-root comparison cases. JavaScript and Python reproduce the same results.

## Non-goals

This Profile does not standardize BIM authoring, electrical-code compliance, procurement, price comparison, installation approval, simulation algorithms, or autonomous purchasing. It does not authorize an Agent to buy, install, energize, or control equipment.

## References

- [Building Topology Ontology](https://w3c-lbd-cg.github.io/bot/)
- [SOSA/SSN 2023 Edition](https://www.w3.org/TR/vocab-ssn-2023/)
- [Schema.org ProductModel](https://schema.org/ProductModel)
- [Schema.org ChooseAction](https://schema.org/ChooseAction)
- [DCMI `replaces`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/replaces/)
- [EARL 1.0 Schema](https://www.w3.org/TR/EARL10-Schema/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [Web of Things Thing Description 1.1](https://www.w3.org/TR/wot-thing-description11/)
- [Renovation Planning Term Mapping Audit](../../../mappings/renovation-planning/v0.1/README.md)
- [Electrical Design Boundary Audit](../../../mappings/electrical-design/v0.1/README.md)
- [HWM RO-Crate Profile](../../ro-crate/v0.1/README.md)
