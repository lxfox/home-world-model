# Epistemic Admission and Correction v0.1

- Status: Executable Adversarial Fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Cases: [`admission-cases.json`](admission-cases.json)
- Single-Candidate contested View: [`world-view.single-candidate-contested.json`](world-view.single-candidate-contested.json)
- External interaction projection: [`interaction.external.jsonld`](interaction.external.jsonld)
- Profile-local interaction binding: [`interaction-binding.json`](interaction-binding.json)

This fixture tests how a household model becomes usable as an accepted World View assertion and how later rejection or correction changes the current View without mutating Claims or erasing history.

## Core Question

The conversational phrase “promote the model to fact” is represented as:

```text
immutable Claim
  + authorized, scoped, provenance-aware evidence
  + named Resolver policy
  + purpose, time, freshness, and Authority epoch
  = a new World View resolution with epistemic_status accepted
```

The Claim itself never receives a global truth flag. A different purpose, later evidence, or different Authority state may legitimately produce another View result.

## Fifteen Boundaries

The oracle verifies that:

1. an imported or inferred model is `not_verified` rather than a physical fact;
2. visual observation alone remains insufficient when household policy requires confirmation;
3. independent visual evidence plus an exact household confirmation can admit the scoped spatial Claim;
4. visual support plus user refutation produces `contested` with one Candidate and one refuting Record;
5. denial alone does not mint a negated Claim or a correct alternative;
6. device acknowledgement alone proves no physical effect;
7. a coherent action challenge plus exact attestation can admit a narrow endpoint–zone association;
8. an ambiguous “yes, I saw it” is ignored when the target proposition is not bound;
9. evidence from different challenge episodes cannot be spliced together;
10. room-level confirmation cannot promote an exact-pose Claim;
11. two reports derived from one frame count as one evidence origin;
12. a qualified correction changes the current Candidate while retaining both Claims in history;
13. an unqualified correction cannot hide a previously qualified Claim;
14. two qualified unsuperseded locations remain contested rather than producing an arbitrary winner;
15. an unauthorized attestation cannot change the View.

The cases also retain 26 explicit forbidden inferences, including global truth, fabricated negation, physical effect from acknowledgement, exact pose from visible change, false evidence independence, and deletion of corrected history.

## Schema Correction

The fixture exposes a bounded Core Schema error. A Claim can have supporting visual evidence and a refuting household Record without any alternative Claim. Requiring two Candidates for every `contested` result would force an implementation to invent a negation or location that nobody asserted.

Core v0.1 therefore permits a contested resolution with one Candidate. Its conflict entry may identify one Claim plus one or more conflicting Evidence Records. Multiple incompatible Candidate Claims remain valid and are covered by a separate case.

## What This Does Not Prove

The baseline policy in this fixture is synthetic. It demonstrates deterministic evidence boundaries, not a universal confidence function, household governance rule, camera-quality standard, biometric identity system, or causal inference method. “Accepted” remains purpose-bound reliance, not metaphysical truth.

Run:

```sh
node conformance/scenarios/epistemic-admission-and-correction-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The JavaScript and Python implementations reproduce the same 15 outcomes through separate code paths. Independent external implementation is still required.
