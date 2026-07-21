# ADR-008 — Bind Household Function Positions to IEC 81346 and Reject Generic `fulfills`

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-008-iec-bound-function-position.zh-CN.md`](ADR-008-iec-bound-function-position.zh-CN.md)
- Mapping evidence: [`IEC 81346 Boundary Audit v0.1`](../../spec/mappings/iec81346/v0.1/README.md)

## Context

HWM fixtures require a long-lived identity for “bedroom reading light” while a lamp, network endpoint, or Agent can be replaced. The early model called this identity `Functional Slot` and linked an asset to it with `fulfills`.

That wording creates two risks. First, IEC 81346 already structures system objects and reference designations across lifecycle and implementation. Second, `fulfills` can be read as requirement satisfaction, candidate suitability, installed realization, or identity. HWM must preserve those as different claims.

The official public abstract of IEC 81346-1:2022 states that a reference designation identifies a system object and, where realized, its corresponding component. It also says the 2022 edition adds information models and a method for designating relations between objects. ISO 81346-12:2018 applies this family to construction works and building services, while explicitly excluding inventory or serial designations and product types. These public materials establish the ownership boundary, but not the exact clause-level relation encoding.

## Decision

1. HWM does not publish `FunctionalSlot` as a Core ontology class.
2. A lifecycle Profile MAY expose a **function-position role**: a household-stable EntityRef bound to a declared IEC 81346 reference designation system and its function-oriented structure. `Functional Slot` remains only a migration label.
3. The binding MUST identify the standard and edition, reference designation system or context, reference designation, household EntityRef, and applicable lifecycle interval. Exact aspect and relation encoding MUST be pinned only after legitimate access to the normative clauses.
4. A function-position identity, a manufactured Physical Asset identity, a Product Model, and a Digital Endpoint identity MUST remain distinct. An IEC reference designation MUST NOT be used as an inventory number, serial number, or product-model identifier.
5. HWM rejects generic `fulfills` as a target Core predicate. Existing `hwm-lifecycle:fulfills` data is a compatibility projection only.
6. An implementation MUST distinguish at least:
   - a time-bounded **asset–function realization binding**;
   - requirement or goal evaluation;
   - Product Model consideration inside a planning context;
   - installation or spatial placement;
   - exact identity, alternate representation, and replacement.
7. A realization binding does not prove requirement satisfaction, compatibility, ownership, commissioning, or endpoint reachability. Conversely, a failed requirement evaluation does not imply that the asset is not currently realizing the function position.
8. More than one asset MAY contribute to one function position, and one asset MAY contribute to more than one function position, when the Profile and evidence make the scope and valid time explicit.
9. `candidateFor` remains a scoped planning compatibility projection. Product consideration belongs inside a `prov:Plan` or a scoped `schema:ChooseAction`; it does not become a global binary relation.
10. The exact IEC 81346 relation designator, aspect metadata, and serialization remain blocked on licensed clause review. Until then, Profiles MUST label the binding as provisional and MUST NOT claim IEC conformance.

## Consequences

- The lifecycle distinction survives, but HWM stops competing with IEC 81346 for domain vocabulary.
- Replacing a lamp or endpoint does not replace the household function-position identity.
- Goal Evaluation cannot be accidentally inferred from asset installation.
- Product search, planning, installation, commissioning, and operation remain different epistemic stages.
- Existing fixtures stay readable through compatibility aliases while target semantic bindings migrate.
- The remaining uncertainty is narrow and auditable: exact IEC wire encoding, not whether HWM owns the concept.

## Validation Required Before Acceptance

1. Obtain legitimate access to IEC 81346-1:2022 and ISO 81346-12:2018 and record exact clause identifiers for function-oriented structures, object relations, and reference designation sets.
2. Have an IEC 81346 practitioner challenge the eight boundary cases in the mapping audit.
3. Add one external semantic projection that carries a real reference designation without `hwm:FunctionalSlot` or `hwm:fulfills`.
4. Prove a two-asset contribution case and a one-asset/two-function case in an independent implementation.

