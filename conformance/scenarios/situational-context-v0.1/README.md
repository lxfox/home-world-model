# Situational Context v0.1 Scenario

This non-package oracle tests whether HWM needs a global household mode or a new activity primitive before a resolved household situation can participate in Routine eligibility.

The fixture follows one narrow path:

`presence evidence + exact resident attestation → inferred sleep episode Claim → accepted purpose-bound World View → satisfied Situation Use Assessment`

The final result is condition evidence only. It does not activate a Routine, establish an Intent, create a Task, authorize a camera, or dispatch a device action.

## Artifacts

- [`sleep-episode-claim.example.json`](sleep-episode-claim.example.json): a Core Claim Envelope using SAREF4EHAW activity semantics, an open claimed interval, two evidence origins, and one exact resident/space scope.
- [`sleep-world-view.example.json`](sleep-world-view.example.json): a current purpose-bound resolution for that exact Claim.
- [`situation-query.example.json`](situation-query.example.json): an external all-required condition specification; it is not a universal HWM query language.
- [`subject-set.example.json`](subject-set.example.json): exact subject coverage for this query only.
- [`situation-use-assessment.example.json`](situation-use-assessment.example.json): content-bound normalized condition result.
- [`situation-cases.json`](situation-cases.json): 56 semantic cases, 20 model-boundary cases, and 116 unique forbidden inferences.
- [`validate.mjs`](validate.mjs): dependency-free JavaScript evaluator and digest-chain validator.

## Adversarial Coverage

The oracle separates:

- Observation from Situation Claim and purpose-bound acceptance;
- phenomenon, result, issuance, ingestion, and delivery time;
- episode correlation handle from identity proof;
- activity, observed pattern, schedule, Forecast, policy window, and declared control mode;
- one person's episode from household population closure;
- guest, pet, presence, identity, membership, and Authority;
- open interval from permanent truth;
- model confidence from Resolver acceptance;
- absent, not observed, unavailable, denied, stale, expired, contested, and unknown;
- exact contradiction from a merely different label;
- Situation use from Routine activation, Task materialization, and Action Authorization.

## Run

```sh
node conformance/scenarios/situational-context-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The example Claim and World View also validate against the Core Schemas; the assessment validates against the Profile-local Schema under strict JSON Schema 2020-12 evaluation.

Passing proves only internal consistency of the boundary. It does not prove activity-recognition accuracy, complete occupancy, biometric identity, privacy compliance, population closure, production cryptography, or fair household automation.

