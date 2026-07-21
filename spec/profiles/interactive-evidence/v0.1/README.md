# HWM Interactive Evidence Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0
- Profile-local JSON Schema: [`interactive-evidence-binding.schema.json`](interactive-evidence-binding.schema.json)

## Purpose

This optional Profile lets an Agent request a narrowly scoped household confirmation when passive visual or sensor evidence is insufficient. It also constrains how visual reports, action challenges, answers, refutations, and corrections may affect a World View.

It does not create a `Fact` class or define a universal truth algorithm. It binds external observation, provenance, annotation, and attestation semantics to existing HWM Claim, Record, Evidence Link, World View, and Action Trace contracts.

## Reused Semantics

- SOSA/SSN represents Observation, Actuation, Feature of Interest, observed or acted-on Property, procedure, result, and time.
- PROV-O represents Activities, Entities, attribution, generation, derivation, and source lineage.
- Web Annotation represents a question or response Body attached to an exact Target, including questioning and replying motivations.
- ActivityStreams `Question`, `Accept`, and `Reject` MAY represent interaction events, but they do not by themselves mean that a proposition is epistemically accepted or refuted.
- Verifiable Credentials MAY secure an attestation or identify evidence. Credential verification proves integrity and issuer binding, not claim truth or fitness for every purpose.

## Required Interaction Binding

A confirmation challenge MUST preserve, directly or through Profile extensions:

- `challenge_id` and `episode_id`;
- exact target Claim identifier and proposition digest;
- requester, intended responder or authorized role, purpose, and Authority epoch;
- structured question and closed response meanings such as `confirms`, `refutes`, `corrects`, and `cannot_tell`;
- question Record, response Attestation Record, and their times;
- evidence `origin_id` for correlation control;
- observation or Action Trace identifiers when the question follows a visual report or active device challenge;
- the proposition scope that the answer is competent to address.

Natural-language display text MAY paraphrase the proposition, but the machine binding MUST remain exact. An answer whose target cannot be recovered unambiguously MUST NOT produce a `confirms` or `refutes` Evidence Link.

## Resolution Rules

1. A model-import, inferred, learned, or visual Claim remains a Claim; evidence never mutates it.
2. A named, versioned Resolver policy owned by Authority determines which evidence paths are sufficient for the declared purpose. The policy identifier and Authority epoch MUST be visible in or recoverable from the World View.
3. `accepted` is a World View epistemic status, not a Claim property. A later View MAY reach a different result without rewriting the earlier View.
4. Evidence derived from the same raw origin MUST be counted as one origin when a policy requires independent sources. Running two models over one frame does not create two observations.
5. Evidence from different challenge episodes MUST NOT be joined when the policy requires one coherent episode.
6. A device acknowledgement is execution evidence only. It MUST NOT be treated as physical observation, effect consistency, goal satisfaction, or user acceptance.
7. A household answer applies only to the exact bound proposition. Confirmation of visible change MUST NOT be widened to exact pose, asset identity, photometric value, requirement satisfaction, or persistent causality.
8. A `refutes` link challenges its target but does not mint a negated Claim. `contested` MAY therefore contain one Candidate plus a conflicting Evidence Record.
9. A correction MUST use a new Claim. Explicit supersession affects the current View only after the correcting Claim satisfies the declared admission policy. Both Claims and their evidence remain in history.
10. Unknown, unbound, out-of-scope, invalid, unauthorized, or inaccessible evidence fails closed and MUST expose a non-sensitive reason code when Authority permits.

Before applying these rules, an implementation supporting the [Evidence Standing Profile](../../evidence-standing/v0.1/README.md) MUST separately decide whether each Record is admitted for the target proposition and purpose. Evidence-use authorization and Evidence Standing are not interchangeable. The v0.1 admission fixture's `authorized` Boolean is a compatibility shorthand for evidence-use permission; the separate standing oracle decomposes source binding, permission, standing, and qualification.

## Privacy and Authority

The Profile does not authorize camera use, person recognition, evidence disclosure, or device action. Capture, challenge dispatch, attestation use, retention, and disclosure each require the applicable Authority decision. Implementations SHOULD retain a digest, procedure, bounded excerpt, or derived Record instead of raw media when that is sufficient.

An unauthorized response cannot change the current View. Access denial MUST not reveal whether hidden evidence exists, how many people responded, or which alternative object they supported.

## Current Executable Evidence

The [Epistemic Admission and Correction fixture](../../../../conformance/scenarios/epistemic-admission-and-correction-v0.1/README.md) contains 15 adversarial cases covering:

- model-only and visual-only `not_verified` states;
- visual plus exact household confirmation;
- one-Candidate contest from a refuting Record;
- denial without fabricated negation;
- action acknowledgement without physical proof;
- coherent and incoherent interaction episodes;
- ambiguous, scope-mismatched, correlated, and unauthorized evidence;
- qualified and unqualified correction;
- two qualified unsuperseded alternatives.

JavaScript and Python independently reproduce the expected results. This is internal implementation diversity, not organizational independence.

## Validation

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/interactive-evidence/v0.1/interactive-evidence-binding.schema.json \
  -d conformance/scenarios/epistemic-admission-and-correction-v0.1/interaction-binding.json

node conformance/scenarios/epistemic-admission-and-correction-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define biometric identity, person tracking, a universal household voting rule, probabilistic sensor fusion, a global confidence number, a global actor trust rank, or which resident has final authority. It does not prove that an action caused an effect outside the observed challenge context.

## References

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [PROV-AQ](https://www.w3.org/TR/prov-aq/)
- [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)
- [ActivityStreams Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/)
- [Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/)
