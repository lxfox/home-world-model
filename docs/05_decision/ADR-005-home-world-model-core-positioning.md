# ADR-005 — Home World Model Core Positioning and Interoperability Profile

- Status: Proposed
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`ADR-005-home-world-model-core-positioning.zh-CN.md`](ADR-005-home-world-model-core-positioning.zh-CN.md)
- Related specification: [`Home World Model Core v0.1`](../00_context/home-world-model-core-v0.1.md)

## Context

The project began with a broad idea: an Agent needs a durable understanding of household space, devices, people, time, expected physical effects, and user corrections. Research and standards review show that much of the required vocabulary already exists across Matter, Web of Things, SAREF, SOSA/SSN, BOT, Brick, IFC, NGSI-LD, PROV-O, ODRL, JSON-LD, SHACL, and related standards.

The project must therefore decide whether to create a new comprehensive ontology, extend one runtime, or define the missing interoperability boundary between durable household knowledge and any authorized Agent.

## Decision

1. HWM is a compositional interoperability Profile, not a new universal ontology, home-automation runtime, device protocol, or Agent architecture.
2. Existing standards are reused by mapping or profiling them. HWM-specific vocabulary is introduced only after a tested scenario demonstrates a real semantic gap.
3. The conceptual kernel is `H = (EntityRef, Claim, Record | Authority)`. Authority is a governance plane, not ordinary household data.
4. The portable unit is a Household Knowledge Package. An Evidence Resolver combines the package with authorized live evidence to produce a purpose- and time-bound World View.
5. Evidence resolution, Agent planning, policy evaluation, and execution are separate roles and contracts.
6. Core v0.1 defines four exchange contracts: Household Manifest, Claim Envelope, World View, and Action Trace, plus conformance fixtures.
7. World View keeps availability, epistemic status, evidence freshness, Claim temporal applicability, and normative applicability as independent dimensions. Valid-time intervals are half-open [`from`, `to`); exact instants use `at`.
8. Action results are multidimensional. Device acknowledgement, physical observation, effect-model consistency, goal satisfaction, and user acceptance must not be collapsed into one success value.
9. Core requires a simple JSON representation and extension preservation. JSON-LD mappings are permitted, but an RDF engine or graph database is not required.
10. Biometrics, person tracking, activity inference, preference-coordination algorithms, arbitrary learned-model execution, full Authority genesis/recovery, and cross-household trust are deferred from Core v0.1.
11. The specification remains a Discussion Candidate until at least two independent readers/resolvers pass the same conformance scenarios.

## Alternatives Considered

### Create a comprehensive HWM ontology

Rejected for Core. It would duplicate mature vocabularies, increase adoption cost, and make semantic consensus depend on one project owning every household concept.

### Build HWM as a Home Assistant-specific extension

Rejected as the normative boundary. Home Assistant is a valuable first adapter and reference runtime, but a household package must survive replacement of that runtime.

### Extend Matter only

Rejected as insufficient. Matter increasingly carries device capabilities, context, preferences, explanations, and history, but HWM also spans design intent, building space, evidence provenance, durable lifecycle identity, external observations, and Agent-independent governance.

### Define only a narrative and no testable contract

Rejected. A narrative can attract discussion but cannot establish interoperability or reveal semantic ambiguity.

## Consequences

- The project can stay small by defining boundaries and tests rather than reimplementing every adjacent standard.
- Implementers may use relational, graph, document, file-based, local, or cloud storage if observable contracts conform.
- HWM must maintain explicit mappings and version negotiation for reused profiles.
- The first credible milestone is not a consumer product; it is one portable reference package read compatibly by two independent implementations.
- Privacy-sensitive features may later become optional profiles without contaminating the minimum Core.

## Risks and Mitigations

- **Profile ambiguity:** different implementations may resolve conflicts differently. Mitigation: define output contracts and a baseline resolver for fixtures without claiming one universal algorithm.
- **Standards drift:** reused standards evolve. Mitigation: pin profile versions and expose negotiation and unsupported requirements in the Manifest.
- **Vocabulary creep:** every scenario may propose a new term. Mitigation: require a gap analysis and conformance case before accepting Core vocabulary.
- **False certainty:** provenance may be mistaken for truth. Mitigation: separate Claim, Record, evidence relation, and view-specific resolution status.
- **Authorization lag offline:** revoked Agents may retain stale grants. Mitigation: Authority epochs and bounded leases.

## Validation Required Before Acceptance

1. Two independently developed readers round-trip one reference package without losing required or unknown extension data.
2. With the same baseline profile and input, both produce compatible World Views and action assessments.
3. The reference package survives replacement of a device endpoint and an Agent while preserving the IEC-bound function-position role and relevant history.
4. Every HWM-specific Core term has a documented gap against existing standards.
