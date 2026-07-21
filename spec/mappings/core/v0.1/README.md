# HWM Core Term Mapping Audit v0.1

- Status: Mapping Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Machine-readable audit: [`term-mapping.json`](term-mapping.json)

## Question

Which parts of the Home World Model are genuinely HWM-owned interoperability contracts, and which parts are existing standards under new names?

This audit evaluates 41 concepts, wire fields, relations, and system roles against primary specifications. It does not treat a lexical mismatch as a semantic gap. A term remains HWM-owned only when the reviewed standards fail to preserve an observable distinction required by an executable fixture.

## Result

| Decision | Count | Consequence |
| --- | ---: | --- |
| External reuse | 11 | Remove the HWM vocabulary alias and use the external term in semantic bindings |
| HWM application profile | 15 | Keep only HWM constraints or cross-standard composition |
| HWM contract gap | 10 | Retain an exchange contract or wire field, pending external review |
| Internal role only | 3 | Keep architecture language; do not publish an ontology term |
| Provisional pending mapping | 0 | No Core domain term remains provisional |
| Do not standardize | 2 | Reject the candidate terms |

These counts are validated by `validate.mjs`; they are not a popularity score or proof of industry novelty.

## Vocabulary that HWM should not own

HWM should directly reuse existing identifiers or predicates for:

- entity identifiers: RDF/JSON-LD IRIs and `@id`;
- Space: BOT, Brick, or IFC terms selected by a Space Profile;
- Physical Asset: SAREF Device, BOT Element, Brick Equipment, or IFC classes;
- Feature of Interest and Observation: SOSA/SSN or SAREF;
- containment, adjacency, and location: BOT, Brick, or IFC relations;
- observation and actuation domain relations: SOSA/SSN and SAREF;
- generation, attribution, and derivation: PROV-O;
- replacement and supersession: DCMI `replaces` / `isReplacedBy`.

The conceptual kernel `H = (EntityRef, Claim, Record | Authority)` remains a useful decomposition, but it does not imply that HWM owns four new ontology classes. EntityRef is an external identifier; Claim, Record, and Authority are application profiles over existing models.

## Smallest currently defensible HWM-owned surface

### Claim Envelope

Verifiable Credentials can carry issuer, subject claims, validity, status, evidence, and proofs. PROV-O carries attribution and derivation; Web Annotation carries independently identified body-target associations. The remaining HWM behavior is narrower: one immutable proposition body retains identity while independently identified support, refutation, confirmation, and retraction links accumulate without mutating it.

This is a candidate exchange-contract gap, not a claim that HWM invented claims or credentials.

### World View

NGSI-LD provides context entities, queries, temporal representations, and property instances. Verifiable Presentations can disclose selected credentials; ODRL constrains purpose and use; OWL-Time describes instants and intervals. None of the reviewed specifications defines the complete HWM projection behavior:

- bound to requester, purpose, `as_of`, coverage, and Authority state;
- self-contained for the authorized coverage;
- zero-Candidate privacy behavior that does not leak hidden Claim identifiers or counts;
- independent availability, epistemic, freshness, temporal, and normative-applicability axes.

World View is therefore the strongest current HWM-specific contract.

### Accepted resolution, not a `Fact` class

SOSA/SSN can describe the visual Observation or active Actuation; PROV-O can preserve derivation and source lineage; Web Annotation can bind a question or reply to an exact target; VC can secure an attestation. None supplies a universal truth promotion operation. PROV-AQ states that a provenance record is not automatically authoritative or correct, while VC 2.0 states that verifiability does not imply the truth of its claims and leaves reliance to verifier policy.

HWM therefore keeps `accepted` as a purpose-bound World View result. The [Interactive Evidence Profile](../../../profiles/interactive-evidence/v0.1/README.md) owns exact-question binding, evidence-origin deduplication, scope ceilings, and correction behavior. The executable fixture also proves that one Candidate plus a refuting Record can be contested without fabricating a negated Claim.

### Action Trace

PROV-O, SOSA/SSN, WoT, and XACML can represent most of its component facts. The residual HWM behavior is their immutable, revisioned projection while keeping authorization, dispatch, acknowledgement, physical observation, effect consistency, goal satisfaction, resource assessment, forecast realization, and user acceptance independent.

This separation is executable in the three current action-bearing fixtures and remains HWM-owned pending an external counterexample.

## Concepts retained only as profiles

- Household Manifest and Household Knowledge Package now have a candidate **HWM RO-Crate Profile**. RO-Crate already defines attached/detached packages, a metadata descriptor, root dataset, data entities, contextual entities, and `conformsTo`. The existing small Manifest remains only a compatibility projection during migration; HWM does not claim a new generic packaging model.
- Authorization Decision should map to XACML `Permit`, `Deny`, `Indeterminate`, and `NotApplicable`, with confirmation represented as an ODRL Duty or XACML Obligation. `confirmation_required` can remain a stable household-facing projection.
- Authority should remain a Profile over ODRL, XACML, ACE-OAuth, CWT, and VC trust material. Epoch and offline Lease are household constraints over those mechanisms.
- Digital Endpoint is a protocol-neutral binding role over a Matter Endpoint, WoT Thing/Interaction Affordance, or Brick-hosted Point. It should not become a competing device-interface ontology.
- Freshness, temporal status, and applicability are materialized resolver results over NGSI-LD time metadata, OWL-Time/validity, and ODRL/XACML evaluation.
- Interactive confirmation remains a Profile over SOSA/SSN, PROV-O, Web Annotation, ActivityStreams, and VC; HWM owns only the admission and over-inference boundaries, not a new observation or dialogue ontology.

## IEC-bound function position, not an HWM class

The persistent requirement-bearing role formerly called Functional Slot is retained as a lifecycle distinction, but not as HWM vocabulary. A lifecycle Profile binds a household-stable function-position EntityRef to a declared IEC 81346 reference designation system and keeps it distinct from manufactured assets, Product Models, and Digital Endpoints.

The ownership decision is supported by the public scopes of [IEC 81346-1:2022](https://www.iso.org/standard/82229.html) and [ISO 81346-12:2018](https://www.iso.org/standard/63886.html). The first covers reference designations for system objects and their corresponding component where realized; the second applies to construction works and building services while excluding inventory or serial designations and product types. Public material still does not expose enough normative detail to select an exact relation encoding.

Therefore:

- remove `FunctionalSlot` from the target HWM ontology and retain it only as a migration label;
- retain the lifecycle distinction as an IEC-bound Profile role;
- keep the household EntityRef, IEC reference designation, manufactured-asset identity, Product Model, and endpoint identity separate;
- complete licensed clause review before claiming IEC conformance or fixing relation metadata;
- validate the eight falsification cases in the [IEC 81346 Boundary Audit](../../iec81346/v0.1/README.md).

## Rejected: generic `fulfills`

`fulfills` must not become a Core predicate. It is semantically overloaded across asset–function realization, requirement satisfaction, candidate consideration, compatibility proof, and identity. The lifecycle Profile may carry a time-bounded realization binding, but that binding must not imply any of the other four propositions. Existing `hwm-lifecycle:fulfills` fixture data is a compatibility projection only.

## Rejected: generic equivalence

`hwm:equivalentTo` should not become a Core predicate. Exact identity, alternate representations, specializations, vocabulary mappings, replacement, and purpose-scoped operational substitutability are different relations. Implementations must select a narrowly defined external relation or a Profile-specific relation with explicit scope and Authority.

## Source boundary

The audit relies on the official specifications catalogued in `term-mapping.json`, including [PROV-O](https://www.w3.org/TR/prov-o/), [Web Annotation](https://www.w3.org/TR/annotation-model/), [VC Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/), [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/), [WoT Thing Description 1.1](https://www.w3.org/TR/wot-thing-description11/), [SAREF 4.1.1](https://www.etsi.org/deliver/etsi_ts/103200_103299/103264/04.01.01_60/ts_103264v040101p.pdf), [BOT](https://w3c-lbd-cg.github.io/bot/), [Brick](https://docs.brickschema.org/), [NGSI-LD](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.08.01_60/gs_cim009v010801p.pdf), [ODRL 2.2](https://www.w3.org/TR/odrl-model/), [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-en.html), [OWL-Time](https://www.w3.org/TR/owl-time/), [RO-Crate](https://www.researchobject.org/ro-crate/specification.html), [DCMI Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/), Matter SDK documentation, [IEC 81346-1:2022](https://www.iso.org/standard/82229.html), and [ISO 81346-12:2018](https://www.iso.org/standard/63886.html). The interactive-evidence review additionally uses the official [PROV-AQ](https://www.w3.org/TR/prov-aq/) trust boundary and [ActivityStreams Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) interaction semantics.

Some reviewed standards are application-neutral and some are binding-specific. `strong_partial` does not mean semantic equivalence. The remaining gaps must still survive implementer review and an independent implementation. Exact IEC aspect and object-relation encoding remains blocked on legitimate access to the normative clauses, but this no longer leaves a provisional HWM Core term.

## Validation

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/mappings/core/v0.1/term-mapping.schema.json \
  -d spec/mappings/core/v0.1/term-mapping.json

node spec/mappings/core/v0.1/validate.mjs
node conformance/scenarios/epistemic-admission-and-correction-v0.1/validate.mjs
```
