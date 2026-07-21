# Home World Model Core v0.1

- Status: Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`home-world-model-core-v0.1.zh-CN.md`](home-world-model-core-v0.1.zh-CN.md)
- License: CC BY 4.0

## Purpose

Home World Model (HWM) is an open, compositional interoperability Profile for durable household knowledge. It lets different authorized Agents read the same household package, request purpose-bound world views, and exchange traceable claims and action outcomes across design, construction, commissioning, operation, replacement, and migration.

HWM is intended to preserve household digital continuity. It is not an Agent's private latent world model and does not prescribe how an Agent reasons.

## Positioning

Matter, Home Assistant, Web of Things, SAREF, SOSA/SSN, BOT, Brick, IFC, NGSI-LD, PROV-O, ODRL, JSON-LD, SHACL, and Verifiable Credentials already cover substantial parts of device interoperability, building semantics, observations, provenance, policy, and validation. HWM should compose and profile these standards instead of reproducing them.

HWM defines the minimum exchange and behavioral contracts needed at their household-Agent boundary. A new HWM term is added only when an implementation scenario demonstrates that existing vocabulary cannot express the required distinction without losing interoperability.

## Vocabulary Ownership

The term-by-term [Core Mapping Audit](../../spec/mappings/core/v0.1/README.md) is part of this candidate specification. The current ownership rule is:

- use RDF/JSON-LD identifiers directly for EntityRef;
- use BOT/Brick/IFC for spaces and building topology;
- use SAREF, SOSA/SSN, Brick, IFC, Matter, and WoT binding terms for assets, observations, features of interest, endpoints, capabilities, and actions;
- use PROV-O for generation, attribution, derivation, and activity provenance;
- use DCMI for replacement and supersession;
- use ODRL, XACML, ACE-OAuth, CWT, and VC for policy, authorization, constrained tokens, and trust material;
- use RO-Crate as the target packaging model.

HWM does not own aliases for these concepts. Its smallest currently defensible owned surface is the behavior of Claim Envelope, World View, and Action Trace plus Profile constraints that compose the external standards. Candidate and the World View status values are wire-contract fields, not household ontology classes.

The lifecycle distinction previously called Functional Slot is now an IEC 81346-bound **function-position Profile role**, not an HWM ontology class. The generic predicates `fulfills` and `equivalentTo` are rejected: asset realization, goal satisfaction, candidate consideration, exact identity, alternate representation, vocabulary mapping, replacement, and purpose-scoped substitutability require different narrowly defined relations. Exact IEC relation serialization still requires licensed clause review.

## Non-goals

HWM Core v0.1 does not define:

- a new device transport, command protocol, or replacement for Matter;
- a universal building, device, or household ontology;
- an Agent planner, recommendation algorithm, or foundation model;
- a mandatory database, graph engine, cloud, or home-automation runtime;
- biometric identity, person tracking, or activity recognition as Core features;
- a universal preference-conflict algorithm;
- execution of arbitrary learned effect models;
- a complete household constitution, multi-guardian recovery, or cross-household trust system.

## Conceptual Kernel

The minimal household knowledge model is:

`H = (E, C, R | A)`

where:

- **EntityRef (E)** is a stable handle for something discussed by the household. Identity and equivalence are themselves Claims; an EntityRef is not proof that two records describe the same thing.
- **Claim (C)** is an immutable proposition and issuance statement with validity time, scope, epistemic basis, profile versions, and creation provenance. Its declared issuer is not automatically an authenticated identity.
- **Record (R)** is an immutable record of an observation, action, attestation, revision, or deletion. It carries a declared source and an explicit integrity mode. Authentication and trust are resolution results: a Record alone proves neither who produced it nor whether its content is true.
- **Authority (A)** is the governance context: trust anchors, grants, constraints, resolution rules, and authority epoch. It controls who may see, assert, resolve, authorize, and act; it is not ordinary household data.

Claims may describe state, relation, capability, transition, preference, constraint, prediction, or expected effect. Their epistemic basis may be declared, observed, inferred, predicted, planned, simulated, or learned. Evidence never mutates a Claim: independent Evidence Links may later support, refute, confirm, or retract it. Supersession is an explicit Claim-to-Claim relation, not evidence embedded in the old Claim.

Claim valid time uses either an exact instant (`at`) or a half-open interval [`from`, `to`). An omitted interval bound is open-ended. Implementations must reject or flag an interval whose `from` is not earlier than its `to`; they must not invent local endpoint conventions.

Authorized deletion or redaction may remove sensitive payloads, but the package must retain an auditable tombstone unless law or policy explicitly forbids it.

## Household Roles

HWM Profiles distinguish long-lived household roles from replaceable implementations:

- **Function-position role**: a persistent household or installation role, such as “bedroom reading light”, bound to a declared IEC 81346 reference designation system. `Functional Slot` is a migration label only.
- **Physical Asset**: a particular manufactured object participating in the realization of a function position during an explicit interval.
- **Digital Endpoint**: a network-visible control or observation interface.
- **Feature of Interest / Measurement Zone**: the physical phenomenon or region being measured or affected.

Replacing a lamp may change the Physical Asset and Digital Endpoint while preserving the function-position identity, requirements, commissioning history, and household intent. A realization binding does not imply requirement satisfaction, compatibility proof, commissioning success, or identity equivalence.

## Package and Runtime Boundary

The portable household package targets the candidate [HWM RO-Crate Profile v0.1](../../spec/profiles/ro-crate/v0.1/README.md), containing durable identifiers, Claims, a Record/evidence index, Authority references, Profile declarations, and references to external data. The current Household Manifest is a compatibility projection during migration, not a new generic packaging model. High-frequency telemetry normally stays in an authorized platform or time-series store; HWM records the relevant window, procedure, digest, or derived durable Claim.

At runtime:

1. An **Evidence Resolver** combines a package with authorized live data and produces a **World View**.
2. An **Agent Planner** may use that view to form an **Action Proposal**.
3. A **Policy Evaluator** independently returns an authorization decision.
4. An execution gateway dispatches the approved command.
5. Observations and assessments are captured in an **Action Trace** and may justify new durable Claims.

The Evidence Resolver, Agent Planner, Policy Evaluator, and execution gateway are separate semantic roles even when one product implements all four. Core v0.1 records their boundaries but does not define their live transport APIs; those belong to runtime bindings and optional Profiles.

## Three Behavioral Contracts and One Package Binding

### Package Binding: HWM RO-Crate Profile

Declares package identity, household scope, Profile versions, Authority references, evidence resources, license, integrity information, and compatibility requirements using RO-Crate 1.3. `hwm:HouseholdManifest` v0.1.0 remains a lossless compatibility projection until migration evidence permits its removal; it is not an independent household-world concept. RO-Crate relation arrays are semantically unordered.

### 1. Claim Envelope

Carries two deliberately separate parts:

- an immutable **Claim Body** containing the Claim identifier, declared issuer, proposition, valid time, scope, epistemic basis, profile versions, creation Record, and Claim extensions;
- an append-oriented **Evidence Link projection** containing independently identified relations from Records to the Claim.

Adding later evidence changes the exchanged Envelope projection but never the Claim Body or Claim identifier. Unknown extensions in either part must be preserved during a lossless round trip.

### 2. World View

A purpose- and time-bound projection for one authorized requester. It includes at least:

- requester and purpose;
- `generated_at`, `as_of`, `known_through`, and freshness;
- coverage and limitations;
- Authority epoch and profile versions;
- resolution results with separate availability, epistemic, freshness, and temporal status;
- optional applicability results for preferences, requirements, and constraints;
- evidence references and unresolved conflicts.

A World View result identifies the subject and predicate that were resolved, then materializes zero or more disclosable **Candidates**. Each Candidate carries the disclosed object/value together with the Claim and evidence references that may be revealed for this purpose. The result uses four orthogonal status axes:

- availability: `available`, `not_observed`, `source_unavailable`, or `access_denied`;
- epistemic: `accepted`, `contested`, `unknown`, `not_verified`, or `not_evaluated`;
- freshness: `current`, `stale`, `not_applicable`, or `unknown`.
- temporal applicability at `as_of`: `in_effect`, `not_yet_in_effect`, `expired`, `unbounded`, `mixed`, or `indeterminate`.

Freshness describes whether the available evidence meets the View's age requirement. Temporal applicability describes whether the resolved proposition applies at `as_of` according to its `valid_time`. A freshly synchronized replacement record can describe a relation that has already expired; an old but unbounded structural Claim can remain in effect. Implementations must not collapse these conditions.

`accepted` means that the declared Resolver Profile permits reliance on the disclosed proposition for this View's requester, purpose, time, and Authority epoch. It is not a global truth flag and never mutates the source Claim. A later observation, household attestation, correction, policy revision, or Authority change produces a new View. A `contested` resolution may contain multiple incompatible Candidate Claims, or one Candidate whose supporting evidence is challenged by a refuting Record; implementations MUST NOT fabricate a negated or alternative Claim merely to represent the latter case.

Core v0.1 retains an optional combined applicability compatibility projection: `applicable`, `conflicting`, `out_of_scope`, or `not_available`. The [Contextual Applicability Profile](../../spec/profiles/contextual-applicability/v0.1/README.md) defines the canonical model as a three-valued per-target result (`applicable`, `not_applicable`, or `indeterminate`) plus a separate conflict status. Legacy `conflicting` therefore projects “applicable and participates in a conflict”; it is not a canonical mutually exclusive applicability state. `not_observed`, `source_unavailable`, and `access_denied` use no Candidate and an epistemic status of `not_evaluated`, without inventing or disclosing a Claim identifier. A World View is operationally self-contained for its declared coverage; supporting Claim Envelopes and Assessments may be delivered with it, but the requester must not need a less restricted package. It is descriptive by default and must not silently become a recommendation or authorization.

### 3. Action Trace

Provides an immutable, versioned snapshot over the Records that link intent, proposal, authorization, execution disposition, device acknowledgement, physical observations, effect assessments, goal evaluations, resource assessments, user attestations, and recovery. Execution disposition distinguishes `dispatched` from `not_dispatched`; confirmation-required or denied proposals are not device failures. A stable Trace identifier may have later revisions as new Records arrive; old revisions are never rewritten. It must not collapse these dimensions into a single `success` field.

Effect assessment values are `consistent`, `inconsistent`, `insufficient_evidence`, `context_mismatch`, or `not_applicable`. Goal evaluation values are `satisfied`, `partially_satisfied`, `not_satisfied`, or `indeterminate`. Resource assessment values are `within_limit`, `exceeded`, `indeterminate`, or `not_applicable`. User acceptance is a separate attestation.

## Simple Action–Effect Profile

Core v0.1 supports a deliberately small effect profile:

`Action × Context → expected outcomes, side effects, resource costs, latency, duration/decay, and uncertainty`

The portable minimum is action parameters, affected feature/property, expected range and unit, relevant context, observation window, measurement procedure, tolerance, uncertainty, and model version. Complex simulation or learned models may be referenced as external artifacts; conforming readers are not required to execute them.

## Core Invariants

1. Claims and Records are append-oriented; corrections use new Records and Claims.
2. Identity merge, equivalence, and replacement are explicit Claims.
3. Every resolved assertion is attributable and bounded by purpose, time, coverage, and Authority epoch.
4. Missing, stale, contested, denied, and not-observed are distinct conditions.
5. Authority cannot be self-elevated by an Agent. Epoch invalidates stale grants only after a verifier learns the newer Authority state; bounded Lease expiry limits offline stale-authority exposure.
6. Device acknowledgement, physical outcome, effect-model consistency, goal satisfaction, and user acceptance remain distinct.
7. Durable knowledge is portable without requiring transfer of all raw telemetry.
8. A JSON representation is required. The target package binding is flattened, compacted RO-Crate JSON-LD; an RDF engine or graph database is not required.
9. Readers preserve required and unknown extension data or report a loss of conformance.
10. World Views are immutable temporal snapshots. A Proposal cites the exact pre-action View it used; later evidence produces a new View and cannot be inserted retroactively into the cited View.
11. Within one household scope, the same Claim identifier always denotes one identical Claim Body. Reuse with different content is an integrity conflict, never an update.
12. Epistemic acceptance and contextual applicability are orthogonal. A genuine preference or requirement may be accepted yet currently not applicable, indeterminate, conflicting with another applicable target, or overridden by a later Authority decision.
13. A World View discloses only the Candidates authorized for its requester and purpose. Hidden source Claims are not indirectly exposed by identifier, count, or required package lookup.
14. Action Trace revisions are immutable projections over append-oriented Records. Late observation, attestation, or recovery creates a later revision and preserves the earlier one.
15. Forecast realization, action-effect consistency, goal satisfaction, resource cost, and user acceptance are distinct assessments. A readiness goal may be satisfied even when the predicted household activity never occurs.
16. Evidence freshness and proposition temporal applicability are distinct. `stale` never means `expired`, and freshly received evidence does not make an out-of-period Claim current.
17. Epistemic basis does not identify a planning, simulation, or counterfactual branch. A required Profile must bind branch-specific Claims to an explicit context, and a Resolver must not combine different contexts implicitly.

## Optional Profile Boundary Index (Non-Base)

The following numbered statements summarize boundaries defined and tested by optional Profiles. They are informative for discovery in this Core document and become normative only when a named Conformance Set includes the referenced Profile. They are **not** additional HWM Base Exchange requirements and do not expand the Core wire contract.

18. Epistemic admission is proposition-scoped. Visual confirmation, action acknowledgement, household attestation, refutation, and correction remain distinct evidence events; none may be widened to an unasked property or converted into a global fact flag.
19. Descriptive evidence conflict, subject-scoped preference plurality, shared-action coordination, final authorization, local safety, and outcome acceptance are distinct. A compromise Proposal or response threshold MUST NOT synthesize a global household preference or truth.
20. Impact completeness is always bounded by an exact Proposal revision, declared channels, procedures, horizon, time, and Authority state. `complete_for_declared_channels` MUST NOT imply global impact completeness, participation entitlement, consent, or authorization.
21. Impact-to-governance mapping produces explicit, potentially heterogeneous system-owned Procedural Requirements. An affected entity MUST NOT automatically become a voter or be obligated to answer; affirmative response, consultation, objection, notification, review, audit, fulfilment, and authorization remain distinct.
22. Procedure fulfilment is stage-bound and precedes final authorization. `not_due` is neither fulfilled nor waived; known `requirements_pending` is not missing input; fulfilled requirements only permit policy evaluation to continue; post-action noncompliance does not rewrite historical decisions.
23. A Record cannot establish its own evidence admission. Standing Decisions are separate Authority-plane Records bound to exact Record content, purpose, Epoch, time, and admitted assertions; proof verification, receipt, semantic completion, truth, and authorization remain distinct.
24. Authority trust recursion terminates at a locally persisted, out-of-band-pinned Trust Root lineage. Root rotation requires exact sequential continuity and current-plus-next thresholds over distinct verification material; recovery requires a precommitted independent failure domain; otherwise re-enrollment creates a new lineage. Root acceptance is not legal ownership, truth, safety, or action authorization.
25. Agent parsing compatibility, household Trust Root acceptance, instance proof, World View access, proposal permission, and dispatch authorization are distinct. An Agent cannot name its own Authority subject; admission requires an Authority-assigned subject and a bounded proof-of-possession Lease.
26. Agent change preserves task lineage only through durable, attributable artifacts and target-specific re-resolution. It never transfers private reasoning, instance identity, source attribution, source visibility, or a Lease. Delegation preserves current actor and responsible subject; exclusive dispatch cutover is bounded by known Authority state and Lease expiry.
27. Task identity is bound to an exact Intent, purpose, occurrence, household, and immutable scope, not to an Agent, Plan, Proposal, or execution Attempt. Identity-basis changes create new Tasks; split and merge outputs use new identities. Task State is an append-only, evidence-bound assessment: Attempt failure does not imply Task failure, completion requires all mandatory exit criteria and no open Attempt, and no Task State grants action authorization.
28. Utterance, subject-scoped Preference, Goal/Requirement/Constraint Claim, candidate Intent Definition, Authority adoption, fulfillment assurance, Task, Plan, Proposal, and Action Authorization are distinct. Intent is declarative “what, not how”; an Agent cannot self-adopt it. Commitment and fulfillment are orthogonal append-only axes. Same-Intent revision requires exact prior content, stable household/purpose/lifecycle/beneficiary/scope identity, Authority continuity, and expectation lineage; revision never silently retargets Tasks.
29. Observed Pattern, persistent Intent, Routine Definition, Authority activation, trigger evidence, eligibility, logical occurrence, Instantiation Decision, Task, and Action Authorization are distinct. A Routine is an Authority-activated Task instantiation policy, not a learned habit or executable action. Trigger and condition uncertainty fail closed; recurrence/event delivery identity does not replace a lineage-scoped occurrence key; catch-up and overlap are explicit and bounded; one materialization key admits at most one exact Task and never implies dispatch.
30. Observation, Situation Claim, purpose-bound World View acceptance, Situation Use Assessment, Routine eligibility, activation, Task materialization, and Action Authorization are distinct. HWM has no normative global household mode: activity, presence, occupancy, guest or pet situation, declared control mode, policy window, and Forecast remain separately scoped. Phenomenon time is not result or delivery time; one subject does not close a household population; denied, missing, stale, contested, expired, or partially covered situation knowledge is `indeterminate`, not false.
31. Preference/Goal/Requirement/Constraint Claim, accepted Applicability Rule Claim, Contextual Applicability Assessment, target satisfaction, conflict, priority, inferred Need, Intent, and Action Authorization are distinct. Applicability uses exact content bindings and three-valued logic; missing Rule or context is never unconditional or false; conflict is orthogonal; `applicable` grants no commitment or action.
32. Target Fit, personal experience, Agent-initiated deliberation eligibility, explicit user request, existing Intent drift, Routine occurrence, safety duty, candidate Intent, notification permission, and action remain distinct. An unsatisfied target is not a Need. Proactive deliberation requires an accepted policy; eligibility grants no interruption, adoption, planning, or action.
33. A Deliberation Closure is a receipt over interaction and independently effective artifacts, not an Authority source. Candidate rejection, tolerance, deferral, raising-policy revision, target correction, Intent adoption, and Intent revision remain separate effects. Silence and dismissal create none; aggregate uncertainty does not roll back an otherwise verified effect.
34. One adopted Intent realization is routed by accepted policy according to whether durable work identity must survive beyond one Proposal and Action Trace. Direct routing omits only Task materialization; Task routing creates no Task by itself. Neither route skips impact, coordination, Authority, safety, dispatch, or outcome evaluation.
35. Private model reasoning, attributed rationale, portable Plan, Action Proposal, and Authorization are distinct. Method structure relied on downstream is materialized under accepted policy, but raw prompts, hidden state, and chain-of-thought are not household audit requirements. A Proposal remains self-contained and bound to the exact Plan revision it actually used.

## Initial Profiles and Bindings

The first validation set consists of:

- Space & Lifecycle Profile;
- Device Identity Binding Profile;
- Simple Action–Effect Profile;
- Renovation Planning Profile;
- Interactive Evidence Profile;
- Evidence Standing Profile;
- Shared Action Coordination Profile;
- Bounded Impact Closure Profile;
- Impact Procedure Mapping Profile;
- Agent Admission Profile;
- Agent Continuity Profile;
- Task Lineage Profile;
- Intent Commitment Profile;
- Routine Instantiation Profile;
- Situational Context Profile;
- Contextual Applicability Profile;
- Platform Authority Adapter Profile;
- Matter binding;
- Home Assistant binding.

Profiles may reuse IFC/BOT/Brick for space and assets, SOSA/SSN for observations and actuations, PROV-O for provenance, ODRL for policy expressions, and NGSI-LD/JSON-LD for contextual and linked-data mappings.

## Conformance Direction

Core v0.1 must be testable by at least two independent readers/resolvers. Conformance is based on observable input/output behavior, not internal architecture. The project supplies a baseline resolver for fixtures but does not make one conflict-resolution algorithm universally normative.

The first oracle is a bedroom reading-light scenario. A requirement Claim says the reading zone needs at least 300 lux. An effect Claim predicts that `SetLevel(60%)` produces 285–335 lux under the recorded context. If the device acknowledges the command and a valid observation reports 295 lux, a conforming result is:

- dispatch acknowledged;
- physical observation accepted: 295 lux;
- effect model consistent;
- goal not satisfied;
- any user “too dim” statement retained as a separate attestation.

No conforming implementation may report an undifferentiated overall success from this evidence.

## Deferred Validation Questions

- Can two independent implementations round-trip two structurally different HWM RO-Crates without semantic loss, and can a community RO-Crate 1.3 validator accept them?
- With the same baseline resolver profile and inputs, do they produce compatible World Views and Action Trace assessments?
- Can a device and an Agent be replaced while the IEC-bound function-position role and relevant household knowledge remain continuous?
- Do the ten current contract-gap candidates survive external implementer review, and can licensed IEC 81346 review supply an exact open serialization without reintroducing `FunctionalSlot` or `fulfills` as HWM vocabulary?
- What is the smallest practical Authority profile that supports local-first operation and revocation?
- Can independent resolvers reproduce single-Candidate contest, exact-question binding, evidence-origin deduplication, scope ceilings, and qualified correction without adopting one universal confidence algorithm?
- Can independent implementations preserve accepted personal preferences while reproducing exact-Proposal coordination, delegation, emergency, authorization, and safety boundaries without adopting one universal household voting rule?
- Can independent physical, privacy, resource, and control-interest procedures reproduce declared-channel impact closure without claiming global completeness or silently creating participation rights?
- Can independent Authority and coordination implementations reproduce heterogeneous Proposal-scoped procedures without exposing participant identity, coercing responses, or collapsing notification, silence, review, and authorization?
- Can independent implementations preserve the boundary from utterance and personal Preference to Authority-adopted Intent, reproduce expectation-lineage revision, and keep commitment, fulfillment, Task binding, and Action Authorization separate?
- Can independent schedulers and event runtimes preserve Routine activation, trigger/condition separation, original recurrence or correlated event occurrence identity, bounded catch-up/overlap, and one-Task materialization without defining one universal rule language or assuming exactly-once delivery?
- Can independent activity/presence resolvers preserve phenomenon/result time, overlapping subject-scoped episodes, population coverage, opaque aggregates, control-mode and policy boundaries, and fail-closed Routine condition use without defining one global household mode or one recognition algorithm?
- Can an independent applicability evaluator reproduce exact target/Rule binding, `all_of`/`any_of` three-valued logic, decisive-subset privacy, separate conflict status, and the no-inferred-Need boundary without adopting one universal context language or planner?
- Can independent Agents reproduce Target Fit and proactive Deliberation Eligibility while preserving measurement uncertainty, attention policy, privacy, deduplication, direct user agency, existing Intent drift, and the no-notification/no-action boundary?
- Can independent interaction systems reproduce multi-effect Deliberation Closure without turning a generic yes/no, silence, dismissal, or Agent summary into Authority, while preserving independently effective corrections and decisions?
- Can independent Agents reproduce direct-versus-Task realization routing from exact accepted work-shape policy without using model-local complexity, bypassing an open Task, or weakening downstream Proposal governance?
- Can independent planners exchange portable decision structure across Agents without exposing chain-of-thought, while keeping every Proposal authorization-self-contained and immutable against later Plan revision?

Until these questions are tested, this document is a discussion candidate, not an adopted standard.
