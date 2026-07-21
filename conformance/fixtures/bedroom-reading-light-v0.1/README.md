# Bedroom Reading Light Fixture v0.1

- Status: Executable Discussion Fixture
- Version: 0.1.0
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Question Under Test

Can the current HWM kernel represent one complete household action without confusing transport success, physical observation, model consistency, goal satisfaction, or user acceptance?

## Scenario

A persistent IEC-bound function-position role represents the bedroom reading light. A specific lamp asset has a time-bounded realization binding to it and exposes a Matter endpoint. The household requirement is at least 300 lux in the reading zone. A commissioning-derived effect Claim predicts that `MoveToLevel(60%)` produces 285–335 lux within ten seconds under the recorded procedure. `hwm:FunctionalSlot` and `hwm-lifecycle:fulfills` in this fixture are migration compatibility projections, not target HWM vocabulary.

The action is authorized and acknowledged. The reading-zone observation is 295 lux. A resident says the result is too dim.

The expected interpretation is:

- execution: `acknowledged`;
- observation: accepted at 295 lux;
- effect assessment: `consistent`;
- goal evaluation: `not_satisfied`;
- user attestation: retained separately as `rejected`.

An implementation fails the semantic oracle if it replaces these values with one overall success or failure.

## Files

- `manifest.json`: package identity, profiles, Authority epoch, resources, and an opaque round-trip extension;
- `claims.json`: lifecycle, requirement, predicted-effect, and observation Claims;
- `records.json`: declarations, authorization, dispatch, acknowledgement, observation, and user attestation;
- `world-view.before.json`: the descriptive view used by the Planner;
- `world-view.after.expected.json`: the post-observation view used for assessment;
- `action-trace.expected.json`: the expected multidimensional action result;
- `oracle-cases.json`: four boundary cases for effect and goal evaluation.

## Conformance Levels Exercised

1. **Syntax:** every contract validates against the candidate JSON Schemas.
2. **Reference integrity:** every Claim and Record reference resolves; timestamps and Authority epochs are compatible.
3. **Semantic oracle:** all four boundary cases produce the expected independent assessments.
4. **Lossless round trip:** unknown members under `extensions` survive byte-value-equivalent parsing and serialization.

Run the dependency-free semantic and integrity validator from the repository root:

```sh
node conformance/fixtures/bedroom-reading-light-v0.1/validate.mjs
```

This fixture does not prove production trust. The Manifest anchors SHA-256 digests for the resource files, but individual Records deliberately carry only declared, unsigned attribution; the World Views expose that limitation. It also does not standardize the fixture-only `hwm-lifecycle` and `hwm-effect` vocabularies; those terms are candidates whose mappings and necessity still require review.

## Conceptual Finding

The pre-action and post-action World Views are different artifacts. The Action Proposal must cite the pre-action view; later evidence cannot be retroactively inserted into the view that justified the proposal. This temporal separation is required for auditability and should become an explicit Core invariant if independent implementations confirm it.
