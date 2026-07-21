# HWM Renovation Planning Term Mapping Audit v0.1

- Status: Mapping Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Machine-readable audit: [`planning-term-mapping.json`](planning-term-mapping.json)
- External semantic projection: [`examples/external-semantics.jsonld`](examples/external-semantics.jsonld)
- Base and option revision projection: [`base-revision.external.jsonld`](../../../../conformance/scenarios/planning-branch-resolution-v0.1/base-revision.external.jsonld)

## Question

Which renovation-planning terms must HWM own, which can be expressed with existing vocabularies, and which distinctions must remain Profile behavior even when every node and relation uses external terms?

The test is semantic preservation, not lexical similarity. A mapping is acceptable only if it preserves branch isolation, input lineage, planned-versus-installed identity, and the separation of recommendation, household choice, purchase, authorization, installation, and dispatch.

## Result

| Decision | Count | Terms or boundaries |
| --- | ---: | --- |
| External reuse | 2 | `requirementStatus`, `selectedOption` |
| HWM application Profile | 7 | Design Option composition, candidate consideration, mounting plan composition, recommendation, design context, closed comparison inputs, decision-category boundary |
| Do not standardize | 1 | reject `reservedLoad` and split its quantity roles |

This result removes two HWM predicates from the target semantic binding without adding an HWM ontology class. Seven other items are cross-standard constraints, not claims of new domain vocabulary. No Renovation Planning term remains provisional.

## Target semantic projection

The target projection uses:

- `prov:Plan` for the base design and each Design Option;
- `prov:wasDerivedFrom` for option-to-base lineage;
- `prov:wasRevisionOf` for revised base and option Plans, plus `prov:invalidatedAtTime` when an older Plan becomes unusable for subsequent derivation;
- EARL `Assertion`, `TestCriterion`, `TestResult`, and `outcome` for per-option requirement evaluation;
- a PROV `Activity` with `used` and `generated` for cross-option comparison lineage;
- Schema.org `Recommendation` plus `itemReviewed` for the advisory result;
- Schema.org `ChooseAction`, `agent`, `actionOption`, `object`, and `actionStatus` for the homeowner's completed choice;
- DCMI `replaces` from a later selection-state Claim to the state it supersedes, while every `ChooseAction` remains historical;
- ODRL/XACML only for authorization, which is absent from the planning package.

The executable external projection contains no `hwm-planning:` predicate. It is checked against the compatibility Claims so that option A maps to EARL `passed`, option B maps to `failed`, the comparison generates the recommendation for A, and the homeowner's `ChooseAction` selects A from both retained options.

The revision projection also contains no HWM planning predicate. It shows base r3 as a revision of r2, option A r2 as both a revision of option A r1 and a derivation from base r3, and a new simulation Activity that uses only the rebased option. The earlier simulation remains a separate historical entity.

## What HWM still constrains

### Design context

RDF Dataset named graphs provide grouping, but RDF does not assign application meaning to that grouping. `prov:Bundle` is specifically a named set of provenance descriptions, not a counterfactual household world. `prov:Plan` and `prov:Activity` type the contexts but do not prohibit a resolver from combining incompatible branches.

Therefore `designContext` remains a Claim-envelope wire binding owned by the Renovation Planning Profile. It is not an ontology predicate. The Profile requires closed branch membership and forbids implicit cross-branch resolution.

### Revision and dependency closure

PROV distinguishes derivation, revision, use, generation, and invalidation, but it does not decide whether a dependency graph is complete enough for current household planning. The Profile therefore requires each Design Option to derive from exactly one available base-design root. A missing link is invalid; a known but unavailable dependency is indeterminate; an intact branch rooted in a superseded base is historical-only.

A new base revision never updates options or simulation results by implication. Rebase requires a new option Plan linked with `prov:wasRevisionOf`, an explicit `prov:wasDerivedFrom` edge to the new base, and newly generated downstream outputs bound to the new option revision. Comparisons used for a current recommendation must close over the same current base root.

### Closed comparison input

PROV `used` and `generated` express actual lineage. Under open-world semantics they do not say that the stated inputs are exhaustive. A conforming HWM comparison must declare and validate a closed input set before it may consume multiple branches. `input_context_ids` remains a compatibility binding for that constraint; semantic projections should also emit PROV lineage.

### Recommendation boundary

Schema.org `Recommendation` describes suggesting a best option, but the term is currently in Schema.org's `new` area. It is useful in the external projection, but v0.1 must not depend on it as the only normative encoding. The HWM Profile continues to require that a recommendation is advisory and cannot be promoted into a household choice, BuyAction, Authorization Decision, installation, or dispatch.

## Terms removed from the target HWM vocabulary

### `requirementStatus`

EARL is explicitly designed to exchange results for a subject tested against criteria, including passed, failed, cannot-tell, inapplicable, and untested outcomes. Although EARL is a 2017 W3C Working Group Note rather than a Recommendation, it supplies the required result structure. HWM still carries epistemic basis and provenance so a simulated pass is not mistaken for observed conformance.

### `selectedOption`

Schema.org `ChooseAction` directly represents expressing a preference among options. The chosen option is `object`; all considered options are `actionOption`; the chooser is `agent`. This is materially better than an HWM-specific binary predicate because Schema.org separately defines `BuyAction`. A completed choice therefore does not imply a purchase.

When a household changes its choice, the later `ChooseAction` remains a new event and the later selection-state Claim uses `dcterms:replaces` to identify the superseded state. DCMI defines this relation for a resource supplanted or superseded by the described resource. The Renovation Planning Profile—not DCMI—defines as-of resolution, fork, cycle, and unavailable-target behavior.

## Scoped composition: `candidateFor`

A Product Model and an IEC-bound function-position role are inputs to a planning context. This is a composition rule, not a reusable global binary predicate. The target projection represents consideration inside a `prov:Plan` or scoped Schema.org `ChooseAction`; `hwm-planning:candidateFor` remains only a compatibility projection. It must not be interpreted as realization, compatibility proof, ownership, installation, or household selection.

## Rejected term

### `reservedLoad`

The scalar is unsafe because it conflates product nameplate power, planned load allocation, installed load, estimated maximum demand, design current, conductor current-carrying capacity, protective-device rated current, authorized maximum demand, derived margin, and verified compliance. HWM therefore rejects it as a target predicate.

Circuit identity should reuse IFC or an IEC 81346 reference designation, while values reuse SAREF/QUDT with an explicit quantity role, subject, basis, assumptions, lifecycle state, and provenance. The fixture's former 100-W value is now a `planned_load_allocation` for catalog screening only. It does not establish circuit capacity, protection coordination, voltage-drop performance, installation verification, or jurisdictional compliance. See [ADR-009](../../../../docs/05_decision/ADR-009-split-electrical-load-and-capacity.md) and the [Electrical Design Boundary Audit](../../electrical-design/v0.1/README.md).

## Source maturity

- PROV-O and RDF 1.1 are W3C Recommendations.
- DCMI `replaces` supplies the external replacement relation; the HWM Profile still owns current-head resolution behavior.
- SAREF 4.1.1 is an ETSI Technical Specification.
- IFC 4.3.2.0 is the official buildingSMART specification; its `IfcDistributionCircuit` page notes that the entity is not part of a standardized schema subset or implementation level.
- ISO 81346-10:2022 is an International Standard for power-supply-system structuring and is currently marked by ISO as due to be revised; ISO/TS 81346-101:2025 is implementation guidance, not a load-capacity or code-compliance model.
- IEC 60364 separates fundamental installation requirements, overcurrent protection, wiring-system selection, and verification; public Electropedia definitions likewise distinguish installed load, maximum demand, design current, and current-carrying capacity.
- EARL is a W3C Working Group Note and explicitly lacked sufficient implementations to advance to Recommendation.
- Schema.org is a community vocabulary; `Recommendation` is currently marked as a new term.

Maturity is part of the mapping result. A semantically useful term is not automatically stable enough to become the sole normative wire dependency.

## Validation

```sh
node spec/mappings/renovation-planning/v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The JavaScript validator and separate Python reader check source decisions, branch derivation and revision, dependency closure, EARL outcomes, PROV comparison lineage, Schema.org recommendation and choice, absence of `BuyAction`, absence of Authorization and Action Records, and semantic equivalence with the executable fixtures. They provide implementation diversity inside this project, not organizational independence.

## References

- [PROV-O](https://www.w3.org/TR/prov-o/)
- [RDF 1.1 Datasets](https://www.w3.org/TR/rdf11-concepts/#section-dataset)
- [Schema.org ChooseAction](https://schema.org/ChooseAction)
- [Schema.org Recommendation](https://schema.org/Recommendation)
- [Schema.org BuyAction](https://schema.org/BuyAction)
- [DCMI `replaces`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/replaces/)
- [EARL 1.0 Schema](https://www.w3.org/TR/EARL10-Schema/)
- [SAREF Core 4.1.1](https://saref.etsi.org/core/v4.1.1/)
- [IFC IfcLocalPlacement](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcLocalPlacement.htm)
- [IFC IfcDistributionCircuit](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcDistributionCircuit.htm)
- [IEC 60364-1:2025](https://webstore.iec.ch/en/publication/63699)
- [IEC 60364-4-43:2023](https://webstore.iec.ch/en/publication/28432)
- [IEC 60364-5-52 consolidated edition](https://webstore.iec.ch/en/publication/1878)
- [IEC 60364-6:2016](https://webstore.iec.ch/en/publication/24656)
- [IEC Electropedia: installed load](https://www.electropedia.org/iev/iev.nsf/display?ievref=691-02-03&openform=)
- [IEC Electropedia: current-carrying capacity](https://www.electropedia.org/iev/iev.nsf/display?ievref=826-11-13&openform=)
