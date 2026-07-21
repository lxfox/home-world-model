# Contextual Applicability v0.1 Adversarial Scenario

## Question

When resident A is sleeping in bedroom A, may the household consider A's accepted sleeping-temperature Preference without treating the situation as a Need, the Preference as a household Intent, or a conflict as an automatic winner?

The fixture binds an accepted Preference Claim, an independently accepted Applicability Rule Claim, a purpose-bound World View, and the exact satisfied Situation Use Assessment from the Situational Context scenario. The result is `applicable`; conflict remains `not_evaluated`; no normative or action effect follows.

## Artifacts

- [`preference-claim.example.json`](preference-claim.example.json): subject-scoped target Claim;
- [`applicability-rule-claim.example.json`](applicability-rule-claim.example.json): separate `all_of` Rule Claim bound to the target identifier and exact situation query;
- [`applicability-world-view.example.json`](applicability-world-view.example.json): accepted target and Rule resolutions without an inferred Need;
- [`applicability-assessment.example.json`](applicability-assessment.example.json): exact View, Claim Body, Rule, query, Situation Assessment, purpose, time, and Epoch bindings;
- [`applicability-cases.json`](applicability-cases.json): 56 semantic cases and 20 model-boundary cases;
- [`validate.mjs`](validate.mjs): JavaScript evaluator and digest verifier;
- [`../../../spec/profiles/contextual-applicability/v0.1/README.md`](../../../spec/profiles/contextual-applicability/v0.1/README.md): normative Profile candidate.

## Run

```sh
node conformance/scenarios/contextual-applicability-v0.1/validate.mjs
```

Expected summary: `CONTEXTUAL APPLICABILITY OK 56 semantic cases 20 model-boundary cases 90 forbidden inferences`.

## What This Proves

The fixture shows that two readers can reproduce exact binding failure, three-valued `all_of` and `any_of`, decisive-subset privacy, explicit target-time non-applicability, subject alignment, independent conflict status, and the no-inferred-Need boundary.

It does not prove a production rule engine, preference-recognition accuracy, human intelligibility, fair conflict resolution, privacy safety, external implementation agreement, Intent adoption, or action authorization.
