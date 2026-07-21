# IEC 81346 Function-Position Boundary Audit v0.1

- Status: Mapping Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-008`](../../../../docs/05_decision/ADR-008-iec-bound-function-position.md)
- Executable cases: [`boundary-cases.json`](boundary-cases.json)

## Outcome

The lifecycle distinction formerly called `Functional Slot` is retained, but it is not an HWM Core class. A lifecycle Profile binds a household-stable function-position EntityRef to a declared IEC 81346 reference designation system. The exact IEC aspect and relation serialization remains pending licensed clause review.

The generic predicate `fulfills` is rejected. It merges five independent propositions:

1. an asset currently participates in realizing a function position;
2. an observed result satisfies a requirement;
3. a Product Model is being considered in a plan;
4. a product is compatible with constraints;
5. two identifiers denote the same object.

No conforming target binding may infer one from another.

## Publicly verifiable boundary

[IEC 81346-1:2022](https://www.iso.org/standard/82229.html) publicly states that reference designations identify system objects and, where realized, corresponding components. Its official change summary says the 2022 edition adds information models and a method for designating relations between objects.

[ISO 81346-12:2018](https://www.iso.org/standard/63886.html), confirmed current in 2024, applies system structuring and reference designations to construction works and building services. Its public scope excludes manufacturer or system-related designations of individuals such as inventory or serial numbers, and excludes product types such as article or part numbers.

[IEC 81346-2:2019](https://webstore.iec.ch/en/publication/29181) supplies classification schemes for objects and spaces. [ISO 81346-10:2022](https://www.iso.org/standard/75471.html) and [ISO/TS 81346-101:2025](https://www.iso.org/standard/81285.html) show that power-supply structuring and modelling are separate sector-specific work.

These official public materials establish scope and identity boundaries. They do not expose enough normative detail to select an exact relation designator or claim IEC conformance. HWM therefore records the binding requirement and the blocked clause review separately.

## Minimum binding fields

A future lifecycle binding must carry at least:

- household function-position EntityRef;
- standard identifier and edition;
- reference designation system or declared RDS context;
- reference designation;
- lifecycle validity interval;
- Authority and creation provenance;
- realization participant identities without collapsing them into the function-position identity.

The exact names and allowed values for aspect and object-relation metadata remain deliberately unspecified until licensed review.

## Validation

```sh
node spec/mappings/iec81346/v0.1/validate.mjs
```

