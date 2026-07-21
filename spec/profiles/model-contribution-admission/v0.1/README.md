# HWM Model Contribution Admission Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`contribution-submission.schema.json`](contribution-submission.schema.json), [`contribution-admission-assessment.schema.json`](contribution-admission-assessment.schema.json), [`contribution-publication-receipt.schema.json`](contribution-publication-receipt.schema.json)

## Purpose

This optional Profile lets multiple Agents contribute durable artifacts to a household package without treating output validation, storage, publication, epistemic acceptance, governance adoption, or truth as the same event.

The normative chain is:

`attributed Agent output -> immutable Contribution Submission -> quarantine receipt/deduplication -> integrity, provenance, semantic and policy checks -> purpose-bound Contribution Admission Assessment -> append-oriented Publication Receipt -> new World View independently resolves candidates`

There is no “write fact” operation.

## Contribution Submission

A Submission binds household, submitting Agent/actor, responsible subject, Admission and Lease where required, originating work slot/output, purpose, intended audience/resolver use, exact artifact media/Profile/schema versions, canonical content digests, dependencies, provenance, epistemic basis, creation Records, requested publication relations, and proof.

Submission is an attributed proposal to append content. Receipt proves only that bytes or references were received. Schema validity, signature validity, worker-output acceptance, and source authentication remain separate.

## Admission Assessment

An Assessment evaluates one exact Submission against a content-bound contribution policy and Authority epoch. It separately records:

- content integrity, canonicalization, identifier uniqueness, and replay status;
- Profile/schema and semantic-role conformance;
- submitter Admission/Lease, authorship, actor, responsible subject, and provenance;
- dependency availability and exact digest binding;
- epistemic-basis and Claim/Record creation correctness;
- evidence-standing inputs where a Record is to support a purpose;
- disclosure, retention, licensing, malware/active-content, and package-boundary policy;
- conflict/replacement/equivalence relation validity, optionally using the [Entity Identity Alignment Profile](../../entity-identity-alignment/v0.1/README.md); and
- eligible resolver purposes and limitations.

The result is `admitted_for_candidate_use`, `quarantined`, `rejected`, `duplicate`, `integrity_conflict`, or `indeterminate`.

Admission means the artifact may participate as a candidate input for the declared purposes. It does not make a Claim `accepted`, choose between conflicting Claims, activate a Rule, adopt an Intent, select a Plan, authorize action, or prove an outcome.

## Publication

A Publication Receipt binds the Assessment, exact artifact digests, package/repository revision, append index, publication time, visible resolver-purpose scopes, retained quarantine references, and proof. It does not mutate the submitted artifacts.

- Same identifier and same canonical digest is a replay/duplicate and references the prior publication.
- Same identifier and different canonical content is `integrity_conflict`, never an update.
- A semantically incompatible proposition with a different identifier may coexist and later appear as a contested World View.
- Correction, replacement, equivalence, merge, and derivation are explicit content-bound relations; none erases history.
- Governance artifacts whose state changes require their own Authority transition. Contribution Admission cannot self-adopt them.

## Concurrent and offline writers

Conforming implementations may append concurrently. Ordering, arrival time, model confidence, vendor reputation, revision number, or signature count does not resolve semantic conflict unless an accepted domain policy explicitly says so. A sync transport may merge immutable sets and detect identifier/digest conflicts; it cannot merge meanings or silently retarget references.

Publication can be local, replicated, or delayed. A remote receipt does not prove all replicas contain the artifact. Partial replication and unavailable dependencies remain explicit. Package compaction may move payloads, but stable identifiers, digests, provenance, and privacy-safe tombstones remain resolvable under declared retention policy.

## Relationship to work composition and disclosure

An accepted [Work Slot output](../../cross-agent-work-composition/v0.1/README.md) is eligible to be submitted, not automatically published. A [Disclosure Assessment](../../purpose-bound-disclosure/v0.1/README.md) governs what may leave or enter a boundary; it does not establish contribution semantics. Publication creates a new possible input for later World Views and [Change Impact Revalidation](../../change-impact-revalidation/v0.1/README.md), not an in-place change to an earlier View.

## Invariants

1. Output acceptance, byte receipt, quarantine, structural validation, provenance validation, Admission, publication, World View acceptance, and governance adoption remain separate.
2. A Submission is immutable and content-bound; the submitter cannot choose its own standing or result.
3. Same ID/same digest is replay; same ID/different content is integrity conflict.
4. Publication is append-oriented and never overwrites history.
5. Alternative Claims may coexist; arrival order and last-writer-wins do not resolve semantics.
6. Corrections and replacements use new artifacts and explicit relations.
7. Agent capability, Admission, Lease, authorship, responsibility, evidence standing, and truth are independent.
8. A valid signature proves control of verification material, not semantic correctness or household acceptance.
9. Missing dependencies, unknown Profiles, partial replication, or ambiguous policy remain quarantined/indeterminate, not silently accepted.
10. Admission is purpose/resolver-bound; it is not global package trust.
11. Publication into storage does not revise any immutable World View.
12. No contribution result adopts Intent, activates policy, authorizes action, or proves physical outcome.

## Conformance

The [Model Contribution Admission oracle](../../../../conformance/scenarios/model-contribution-admission-v0.1/README.md) tests replay, identifier conflict, provenance, semantic roles, standing, coexistence, corrections, concurrent writers, publication, replication, and forbidden truth/authority inference.

```sh
node conformance/scenarios/model-contribution-admission-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define a database transaction protocol, CRDT for semantic truth, universal conflict resolver, package hosting service, moderation policy, legal authorship, model training, billing, or a global artifact trust score.
