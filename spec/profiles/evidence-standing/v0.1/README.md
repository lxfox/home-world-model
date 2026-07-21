# HWM Evidence Standing Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0
- Schemas: [`evidence-standing-policy.schema.json`](evidence-standing-policy.schema.json), [`evidence-standing-decision.schema.json`](evidence-standing-decision.schema.json), [`evidence-standing-decision-set.schema.json`](evidence-standing-decision-set.schema.json)

## Purpose

This optional Profile decides whether one Record has **standing to participate** in resolution of one target proposition for one declared purpose. It fills the gap between operational authorization and epistemic resolution.

Standing is contextual, not a global source reputation. The same resident may have standing to report their own preference and a visible light change, but not to attest an objective illuminance value. The same professional may have standing for one inspected property in one jurisdiction and procedure, but not for unrelated household preferences or expired work.

## Six Separate Questions

An implementation MUST NOT collapse these decisions:

1. **Source binding:** can the declared actor, sensor, or issuer binding be verified?
2. **Evidence-use authorization:** may this Record be used for this purpose?
3. **Evidence standing:** does an Authority-plane grant match this source, Record kind, relation, proposition, scope, method, time, and qualification?
4. **Epistemic sufficiency:** does a named Resolver policy have enough admitted evidence to return `accepted`, `contested`, `unknown`, or `not_verified`?
5. **Action authorization:** may a proposed action be dispatched, possibly after Duties?
6. **Acceptance or certification:** did a household subject accept an outcome, or did an applicable professional process certify it?

An `admitted` standing result answers only question 3.

## Decision Record

The standing result MUST be represented separately from the raw Record. A raw Record can state that a response was `confirm`, a receipt reported `delivered`, or a reviewer reported `accepted`; it MUST NOT establish its own source verification, evidence-use permission, standing, or qualification.

[`evidence-standing-decision.schema.json`](evidence-standing-decision.schema.json) binds a Decision to the complete Record body through SHA-256 over RFC 8785 canonical JSON; purpose, time, and Authority Epoch; source and proof verification; the separate evidence-use Decision; matched grants and qualification evidence; and the exact Record assertion fields admitted downstream.

Admission is assertion-scoped. A Decision admitting `delivery_status` does not admit accessibility, reading, acceptance, ledger coverage, or other fields merely because they occur in the same Record. Missing, future, ambiguous, wrong-purpose, wrong-Epoch, or digest-mismatched Decisions are not admission.

## Policy Document

An Evidence Standing Policy Document is authenticated Authority-plane input. It identifies the household, Authority, Epoch, grants, proof binding, and extensions. Each grant is bounded by:

- opaque actor identifiers and/or Authority-defined role identifiers;
- permitted Record evidence kinds and Evidence Link relations;
- declared purposes;
- target proposition predicates and subject scope (`self`, `listed`, or `any`);
- spatial scope and permitted procedures;
- exact-question and direct-experience requirements;
- validity interval;
- optional credential type, trusted issuer, jurisdiction, credential status, and credential validity constraints.

Role identifiers do not have global HWM meaning. A deployment MAY define roles such as installer, resident, visitor, child, guardian, or licensed reviewer, but MUST express their actual grants rather than infer a universal hierarchy from their labels.

## Baseline Decision

The result is:

- `admitted`: one complete grant matches; the Record may enter the named Resolver policy;
- `excluded`: a known denial, mismatch, expiry, revocation, or closed-world absence prevents use;
- `indeterminate`: a required identity, credential-status, evidence-use, or Authority input is unavailable.

Evaluation order is normative for the baseline fixture:

1. verify the standing Policy and compare its Epoch with the verifier Epoch;
2. verify source identity binding;
3. require a separate `allowed` evidence-use decision;
4. match principal, evidence kind, relation, purpose, predicate, and proposition subject scope;
5. match spatial scope and procedure;
6. enforce exact-question and direct-experience requirements;
7. verify any required credential type, issuer, status, validity, and jurisdiction;
8. require the grant to be in its half-open validity interval [`from`, `to`).

Known invalid input is `excluded`; unavailable input is `indeterminate`. No matching grant is `excluded` under closed-world admission.

## Invariants

1. `admitted` does not mean true, accepted, sufficient, independent, current forever, legally conclusive, or safe to act upon.
2. Authentication, permission, standing, sufficiency, action authorization, and user acceptance remain separate Records or decisions.
3. `self` subject scope permits a source to attest only a proposition whose subject equals that source identifier.
4. A direct-experience attestation cannot be widened to an objective measurement unless a separate grant covers the measurement predicate and procedure.
5. A verified credential does not expand its declared type, issuer, jurisdiction, validity interval, or procedure scope.
6. Device acknowledgement has no standing as physical observation merely because the device is trusted to receive commands.
7. Multiple incompatible admitted Records remain multiple inputs; the standing evaluator neither votes nor chooses a winner.
8. An Agent cannot mint, widen, or self-assign a standing grant through ordinary household Claims.
9. A later Epoch or policy revision affects later Views and does not rewrite historical decisions.
10. Reason disclosure remains subject to Authority and MUST NOT reveal hidden source identity, credential details, or evidence counts.
11. A Record cannot self-assert standing. Record identity without content-digest equality cannot carry an old Decision to changed content.
12. The Authority trust anchor terminates admission recursion; production Standing Decisions themselves require authenticated Authority proof.

## Standards Reuse

- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies the policy pattern of assignee, action, target, constraints, permissions, prohibitions, and Duties. HWM's compact fixture binding treats `use as evidence` as a Profile action and uses closed-world admission.
- [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-cos01-en.html) demonstrates subject, resource, action, and environment attribute categories and four-way policy decisions. HWM projects its household-facing standing result separately from action authorization.
- [Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/) can secure actor or professional qualification assertions. VC verification does not imply truth, and issuer trust for a purpose remains verifier policy.
- [VC Data Integrity 1.0](https://www.w3.org/TR/vc-data-integrity/) supplies proof-purpose, verification-method, authenticity, and integrity semantics.
- [HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html) and [AS2 signed receipts](https://www.rfc-editor.org/rfc/rfc4130.html) demonstrate that message integrity, receipt, content processing, and application acceptance are distinct.
- [RFC 8785](https://www.rfc-editor.org/info/rfc8785/) supplies deterministic JSON canonicalization for Decision-to-Record digest binding.
- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) supplies Observation, Procedure, Feature of Interest, and Property semantics. Standing adds only the household admission boundary.

## Executable Evidence

The [Evidence Standing scenario](../../../../conformance/scenarios/evidence-standing-v0.1/README.md) contains adversarial cases for firsthand observation, self-preference, another person's preference, role overreach, explicit visitor standing, objective measurement, device acknowledgement, installer procedure scope, professional credential validity and jurisdiction, evidence-use denial, unknown identity, Epoch drift, and closed-world failure.

JavaScript and Python independently reproduce the fixture. This is implementation diversity within one project, not external consensus.

## Non-goals

This Profile does not define a universal household hierarchy, legal capacity, child-safety policy, biometric identity, global trust score, voting algorithm, professional registry, jurisdictional law, probabilistic sensor fusion, or truth algorithm.

## Validation

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/evidence-standing/v0.1/evidence-standing-policy.schema.json \
  -d conformance/scenarios/evidence-standing-v0.1/standing-policy.json

npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/evidence-standing/v0.1/evidence-standing-decision.schema.json \
  -d conformance/scenarios/evidence-standing-v0.1/standing-decision.example.json

npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -r spec/profiles/evidence-standing/v0.1/evidence-standing-decision.schema.json \
  -s spec/profiles/evidence-standing/v0.1/evidence-standing-decision-set.schema.json \
  -d conformance/scenarios/procedure-fulfilment-v0.1/admission-decisions.json

node conformance/scenarios/evidence-standing-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
