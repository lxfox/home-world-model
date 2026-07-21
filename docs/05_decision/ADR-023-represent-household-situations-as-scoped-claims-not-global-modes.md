# ADR-023: Represent Household Situations as Scoped Claims, Not Global Modes

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-023-represent-household-situations-as-scoped-claims-not-global-modes.zh-CN.md`](ADR-023-represent-household-situations-as-scoped-claims-not-global-modes.zh-CN.md)

## Context

Routine Instantiation now defines how an adopted persistent Intent can generate another bounded Task, but its eligibility input remains external. Household operation needs conditions such as “resident A is sleeping”, “all relevant occupants are away”, “a guest is present”, or “morning preparation is underway”. These are often collapsed into a mutable `home | away | sleep | guest` mode.

That collapse is lossy. One resident can sleep while another is awake; a guest and pet can be present while quiet-hours policy is active; an alarm can be set to away mode while a person remains inside. Observations, inferred activities, forecasts, policy windows, and declared control state also have different epistemic and Authority meanings.

SOSA/SSN already separates observations, observed properties, procedures, phenomenon time, and result time. OWL-Time represents overlapping intervals. SAREF4EHAW defines domain Activity vocabulary. PROV-O represents derivation and attribution. HWM already supplies immutable Claim, Record, Evidence Link, purpose-bound World View, orthogonal statuses, and Authority. The missing contract is not another world primitive but a fail-closed boundary for consuming resolved situation knowledge.

## Decision

1. HWM MUST NOT add a global `HouseholdMode`, mutable context object, or universal Activity primitive to Core.
2. A household activity, presence, occupancy, relation, or aggregate is represented as an ordinary immutable, scoped Claim using an external predicate/type vocabulary. “Situation Claim” is Profile terminology, not an HWM ontology class.
3. A Claim MUST distinguish phenomenon interval from observation, result, event delivery, ingestion, issuance, and processing times. Those times cannot be substituted implicitly.
4. An episode EntityRef is a correlation handle, not identity proof. Same-ID/different-body Claims, cross-source equivalence, correction, and supersession remain explicit epistemic questions.
5. Model confidence never establishes acceptance. Same-origin derivations do not satisfy independent-evidence requirements merely because different models produced them.
6. `accepted` remains a purpose-bound World View result. Current use additionally requires appropriate availability, freshness, temporal applicability, subject/space scope, Authority Epoch, and query binding.
7. A Profile-local Situation Use Assessment binds one exact World View and external query and returns `satisfied`, `not_satisfied`, or `indeterminate`. It does not define a universal query DSL, activity taxonomy, or recognition algorithm.
8. `not_satisfied` requires an accepted, current, in-effect Candidate that contradicts the query under explicitly bound incompatibility semantics. Missing, different, unavailable, denied, stale, expired, not verified, contested, or partially covered input is `indeterminate`.
9. Household-wide aggregates require declared subject coverage. Absence of sensor events, a set of registered residents, known devices, or recognized faces does not establish population closure.
10. Privacy-preserving opaque aggregates MAY satisfy a purpose-bound condition without disclosing identity, count, membership, equality, or source evidence. Access denial MUST NOT be interpreted as absence.
11. A declared mode, such as alarm `away`, is a control-state Claim. A policy window, such as quiet hours, is policy applicability. A Forecast is prediction. None establishes actual activity or occupancy.
12. Open-ended episode Claims remain freshness-bounded. Closure or correction creates a new Claim, explicit lineage where applicable, and a new World View; history is not mutated.
13. Guest presence, pet presence, person identity, household membership, participation entitlement, and Authority are separate propositions.
14. A satisfied Situation Use Assessment may feed an exact Routine condition but grants no Routine activation, occurrence, Task, Plan, Proposal, data access, device action, or Authorization.

## Consequences

- Different Agents can exchange a resolved “what is happening” input without exchanging private latent context or adopting one recognition model.
- Concurrent, nested, and apparently contradictory household episodes remain representable because their subjects and scopes stay explicit.
- Existing Home Assistant or openHAB modes can be projected without treating platform state as universal household truth.
- Routine eligibility gains a reproducible content-bound input and continues to fail closed under privacy or uncertainty.
- Activity recognition, sensor fusion, population inference, and UI mode design remain replaceable implementation concerns.
- Core remains unchanged; the new contract is an optional Profile-local Assessment.

## Alternatives Rejected

### One global household mode enum

Rejected because it cannot preserve concurrent residents, guests, pets, policy applicability, control state, uncertainty, or purpose-bound disclosure.

### Treat Home Assistant person/zone state as household truth

Rejected because a platform projection depends on configured trackers and zones and does not establish complete occupancy, identity, household membership, or Authority.

### Accept the highest-confidence activity label

Rejected because confidence is model-local metadata; evidence standing, correlation, purpose, freshness, contradiction, and Authority still require resolution.

### Infer absence from no events

Rejected under open-world and privacy semantics. No observation, unavailable source, denied access, and accepted absence must remain distinct.

### Put activity recognition into Routine

Rejected because Routine governs when to evaluate Task creation. Recognition produces descriptive Claims and must remain independently replaceable and auditable.

## Validation Required Before Acceptance

1. An external resolver reproduces the Situation Use Assessment cases without access to the fixture implementation.
2. Real SOSA/SSN adapters preserve phenomenon and result time independently.
3. Home Assistant and another runtime project modes, zones, and occupancy without losing the control-state/descriptive distinction.
4. Privacy review challenges subject-set closure, opaque aggregates, count and equality leakage, camera metadata, and access-denial behavior.
5. Household research tests whether scoped situations are understandable without exposing sensitive identity or making automation feel unpredictable.
6. Activity-recognition adapters test corrections, overlapping episodes, missing modalities, correlated evidence, and open interval freshness.

## References

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [OWL-Time](https://www.w3.org/TR/owl-time/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [SAREF4EHAW 2.1.1](https://saref.etsi.org/saref4ehaw/v2.1.1/)
- [Home Assistant Zone integration](https://www.home-assistant.io/integrations/zone/)
- [Home Assistant device-tracker entity](https://developers.home-assistant.io/docs/core/entity/device-tracker/)
- [TRACE: Temporal Reasoning over Context and Evidence for Activity Recognition in Smart Homes](https://arxiv.org/abs/2605.02841)

