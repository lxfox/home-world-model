# HWM Situational Context Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0
- Profile-local JSON Schema: [`situation-use-assessment.schema.json`](situation-use-assessment.schema.json)

## Purpose

This optional Profile specifies how a time-bounded household situation may qualify an exact downstream condition without turning a sensor event, model label, calendar entry, control mode, or policy window into household reality.

The normative chain is:

`Observation or attestation → Situation Claim → purpose-bound World View → Situation Use Assessment → exact Routine eligibility condition`

The Profile adds no `Situation`, `Activity`, `Presence`, or `HouseholdMode` Core primitive. It reuses EntityRef, Claim, Record, Evidence Link, World View, Authority, and external semantic vocabularies. It standardizes the consumption boundary, not activity recognition.

## Why There Is No Global Household Mode

At one instant, one resident may be sleeping, another may be awake, a guest may be present, a pet may be moving, quiet-hours policy may be applicable, and an alarm may be in declared away mode. These propositions are compatible and differently scoped. A single `home | away | sleep | guest` value discards subject, space, time, provenance, uncertainty, privacy, and policy distinctions.

An implementation MAY expose a convenience mode, but it MUST represent it as one of:

- a declared control-state Claim, such as an alarm's `away` state;
- a purpose-bound derived projection over disclosed Situation Claims; or
- an application UI label explicitly marked as non-normative.

It MUST NOT use the label as proof of occupancy, identity, household membership, activity, Intent, Routine activation, Task materialization, or Authorization.

## Situation Claims

“Situation Claim” is Profile terminology for an ordinary immutable HWM Claim whose proposition describes a time-scoped activity, presence, occupancy, relation, or aggregate. It is not an ontology class.

A reusable Situation Claim must preserve:

- an exact proposition subject and an external predicate or type IRI;
- explicit person, pet, opaque participant, space, or household scope as applicable;
- the claimed phenomenon interval, distinct from observation, result, ingestion, and issuance times;
- epistemic basis and the procedure that produced the Claim;
- evidence origin and provenance sufficient to detect correlated derivations;
- purpose and household scope;
- an episode EntityRef when multiple Claims need a shared correlation handle.

Activity types SHOULD reuse a suitable external vocabulary. The fixture uses SAREF4EHAW `Activity` and `hasActivity`; temporal intervals reuse OWL-Time concepts while the HWM wire contract preserves half-open intervals. Observation and actuation evidence reuse SOSA/SSN; derivation and attribution reuse PROV-O.

An episode EntityRef is only a correlation handle. Reusing an identifier across two bodies does not prove that they describe the same physical episode. Cross-source identity, equivalence, correction, and supersession remain Claims resolved through a World View.

## Time and Episode Lifecycle

SOSA/SSN distinguishes the time at which a phenomenon applies from the time at which a result becomes available. A Situation Claim MUST NOT substitute `resultTime`, event delivery time, ingestion time, or `issued_at` for the episode interval without an explicit, justified procedure.

An open-ended Claim such as `valid_time.from = t` means that the issuer claimed the episode was ongoing from `t`; it does not establish permanence. It may qualify current use only while the World View still reports the evidence sufficiently fresh and the Claim temporally `in_effect`.

When an episode ends or its type, participants, space, or boundary is corrected, the implementation creates a new Claim and, when appropriate, an explicit supersession relation. It does not mutate the earlier Claim or rewrite an earlier World View. A closed Claim can still satisfy a historical query whose `as_of` lies inside its interval.

## World View and Use Assessment

The [`Situation Use Assessment`](situation-use-assessment.schema.json) binds:

- one exact World View digest, purpose, `as_of`, and Authority Epoch;
- one exact external query or condition specification digest;
- the input World View resolutions and their orthogonal status axes;
- explicit subject coverage and its content-bound basis;
- a normalized result: `satisfied`, `not_satisfied`, or `indeterminate`.

The Profile does not define a universal query DSL or activity taxonomy. `qualification_status = contradicted` is valid only when the bound query semantics explicitly declares incompatibility and a current, accepted, in-effect Candidate establishes it. A merely different label or missing Candidate is `indeterminate`, not false.

For a required input to match, it must be available, epistemically accepted, sufficiently fresh, temporally in effect, purpose-compatible, and within exact subject and space scope. `access_denied`, `not_observed`, `source_unavailable`, `unknown`, `not_verified`, `contested`, `stale`, `expired`, partial coverage, and an unknown population closure fail closed as `indeterminate`.

## Subject Coverage and Privacy

The assessment distinguishes:

- `exact_subjects`: a content-bound set of disclosed EntityRefs;
- `declared_population`: a governed population closure for claims such as “all relevant occupants are away”;
- `opaque_aggregate`: a purpose-authorized aggregate that withholds identities and counts;
- `not_required`: a condition that has no subject-population requirement.

One person's episode never establishes a household-wide situation. Absence of motion or presence events never closes the subject population. Registered residents, paired phones, known faces, and known devices are not automatically the complete set of occupants.

An opaque aggregate may qualify a condition without disclosing identity, count, household membership, equality across assessments, camera existence, or source Claim identifiers. Guest presence does not establish membership or participation rights. Pet presence does not establish human occupancy or Authority.

Capture, biometric recognition, identity resolution, Situation Claim admission, aggregate disclosure, Routine use, and action execution require their own applicable Authority and privacy decisions. Access denial is nondisclosure, not absence.

## Routine Boundary

A `satisfied` Situation Use Assessment may be bound as the external condition assessment of one exact Routine occurrence. It does not:

- trigger or activate a Routine;
- establish a persistent Intent;
- create a logical occurrence or Task;
- select a Plan or Proposal;
- grant device, camera, or data-processing permission;
- authorize, dispatch, or prove an action.

The same Assessment may also feed the optional [Contextual Applicability Profile](../../contextual-applicability/v0.1/README.md), where an independently accepted Rule determines whether one exact Preference, Goal, Requirement, or Constraint is relevant. Situation satisfaction alone never establishes a Need or makes a target applicable.

The Routine Instantiation Profile independently evaluates activation, trigger evidence, condition binding, occurrence identity, lateness, overlap, deduplication, and exact Task materialization.

## Standards Position

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) supplies Observation, Feature of Interest, Property, procedure, `phenomenonTime`, and `resultTime` semantics.
- [OWL-Time](https://www.w3.org/TR/owl-time/) supplies intervals, instants, boundaries, duration, and interval relations.
- [PROV-O](https://www.w3.org/TR/prov-o/) supplies generation, derivation, attribution, Activity provenance, and start/end time projections.
- [SAREF4EHAW 2.1.1](https://saref.etsi.org/saref4ehaw/v2.1.1/) supplies domain-specific health-actor Activity vocabulary, including daily and nocturnal activities. It is reused where suitable, not adopted as a universal household activity taxonomy.
- [Home Assistant zones](https://www.home-assistant.io/integrations/zone/) and [device-tracker state](https://developers.home-assistant.io/docs/core/entity/device-tracker/) demonstrate practical person/zone projections. They are runtime inputs, not proof of complete occupancy or identity.
- [TRACE](https://arxiv.org/abs/2605.02841) is recent research evidence that sparse local sensor patterns remain ambiguous and benefit from broader temporal, multi-source, and user-specific context. HWM does not standardize its recognition model.

## Invariants

1. Observation, Situation Claim, World View acceptance, condition use, Routine activation, Task materialization, and Action Authorization remain separate.
2. There is no normative global household mode.
3. Situation Claims are subject-, space-, time-, purpose-, provenance-, and Authority-scoped.
4. Phenomenon time is not result, delivery, ingestion, issuance, or processing time.
5. Event delivery identity is not episode identity.
6. Model confidence is issuer metadata, not World View acceptance.
7. Multiple derivations from one evidence origin do not become independent evidence.
8. An open episode is freshness-bounded and does not establish permanence.
9. Correction and closure append Claims and Views; they do not mutate history.
10. One subject never supplies implicit household population closure.
11. Missing, denied, stale, contested, expired, or partially covered knowledge is not false.
12. A different activity label is not a contradiction unless bound semantics declares it incompatible.
13. Presence does not establish identity; guest or pet presence does not establish membership, human presence, or Authority.
14. A satisfied Situation Use Assessment grants no Routine activation, Task, Proposal, data access, or action permission.

## Executable Evidence

The [Situational Context oracle](../../../../conformance/scenarios/situational-context-v0.1/README.md) contains 56 semantic cases, 20 model-boundary cases, and 116 forbidden inferences. It includes a Core-valid sleep episode Claim, a purpose-bound World View, a content-bound subject set, an external query, and a Profile-local Use Assessment with verified digests.

JavaScript and Python independently reproduce the decision table. This is internal implementation diversity, not organizational independence or proof that any recognition algorithm is accurate.

## Non-goals

This Profile does not define a universal activity ontology, global context object, biometric identity, person tracker, household population oracle, sensor-fusion algorithm, probability threshold, wellness diagnosis, surveillance policy, calendar system, mode engine, Routine DSL, planner, or Authorization rule.
