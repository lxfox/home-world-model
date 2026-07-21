# HWM Impact Procedure Mapping Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0
- Schema: [`mapping-policy.schema.json`](mapping-policy.schema.json)

## Purpose

This optional Profile maps every disclosed entry in one Bounded Impact Closure Assessment to explicit, heterogeneous procedural requirements under one Authority policy. It replaces the unsafe shortcut “affected entity therefore voter” with auditable requirements owned by the system seeking to act.

It does not evaluate whether the requirements have been fulfilled and does not authorize an action.

## Required Input Boundary

A mapping request binds:

- exact Proposal identifier, immutable revision, action type, and purpose;
- one Bounded Impact Closure Assessment identifier, status, Proposal binding, and Authority Epoch;
- all impact entries disclosed to this evaluator;
- current decision time and verifier Authority Epoch;
- zero or more privacy-safe route bindings.

The closure status MUST be `complete_for_declared_channels`. This does not mean global completeness; it only prevents the mapper from treating a visibly incomplete channel set as a complete governance input.

## Mapping Policy

The policy uses `only_one_applicable_per_impact`. A rule matches Proposal action and purpose plus impact channel, entity kind, impact status, and rule validity. Every disclosed impact entry must match exactly one rule.

Each rule contains one or more requirement templates. Multiple templates in one rule are intentional and all are emitted. A `none` template is an explicit disposition and emits no requirement instance.

The baseline requirement kinds are:

| Kind | Completion signal |
| --- | --- |
| `affirmative_response` | a Proposal-bound affirmative response is admitted |
| `consultation_opportunity` | the opportunity was actually delivered |
| `objection_window` | the delivered window expired without a blocking objection |
| `notification` | notice delivery was recorded |
| `qualified_review` | a scoped review returned the policy-required result |
| `audit` | the required audit Record was appended |
| `none` | no requirement instance; the impact remains explicitly mapped |

The mapping rule also declares timing, failure effect, negative-signal effect, and routing mode. Those declarations are local policy, not universal meaning attached to an impact channel.

## System-owned Obligation Direction

The obligated performer is the service that wants to proceed:

- a coordinator must obtain a required response;
- a notification service must deliver notice;
- an Authority service must resolve a representative route;
- a review service must obtain the qualified result;
- an audit service must append the Record.

The affected party is not obligated to respond. A missing response may keep the Proposal pending or block it under policy, but it is not a violation by the person.

## Privacy-safe Routing

For `affected_subject`, `authority_resolved_representative`, and `authority_role` routing, the request supplies exactly one current route binding for the impact and template. A resolved binding exposes a Proposal-scoped `participation_slot_id`, not an identity.

The mapper returns requirement identifiers and slot identifiers but no person identifier, membership, presence, representative identity, credential, or delivery endpoint. The service that owns the slot performs delivery and admits returned Records. It must not reveal hidden equality by reusing one slot across requirements without explicit Authority policy and privacy review.

Missing, unavailable, denied, duplicated, or ambiguous routes make the whole mapping `indeterminate`; the implementation cannot silently drop the requirement.

## Evaluation

The baseline evaluator:

1. verifies supported proof mode and Authority Epoch direction;
2. requires the closure to be `complete_for_declared_channels` and bound to the exact Proposal revision;
3. finds exactly one current rule for every disclosed impact;
4. resolves exactly one required route for every non-internal, non-`none` template;
5. creates one immutable requirement instance per non-`none` template;
6. preserves each mapped impact identifier even when the rule emits `none`;
7. returns `mapped_for_declared_impacts` only when all entries pass.

Requirement identifiers are deterministic within the fixture, but production identifiers must not encode hidden personal data.

## Results

| Status | Meaning |
| --- | --- |
| `mapped_for_declared_impacts` | every disclosed impact entry matched exactly one rule and every required opaque route resolved |
| `indeterminate` | closure, Proposal binding, Authority, rule cardinality, or routing prevents a unique safe mapping |

The output is a Profile-typed Record. It is not a Permission, Prohibition, Coordination Assessment, fulfilment result, legal-right determination, or Authorization Decision.

The optional [Procedure Fulfilment Profile](../../procedure-fulfilment/v0.1/README.md) evaluates the resulting requirements without merging their Record semantics.

## Composition and Compatibility

```text
Impact Procedure Mapping
  → heterogeneous Procedural Requirement Set
  → fulfilment evaluator
  → Authority Policy Evaluator
  → execution gateway and local safety
```

The [Shared Action Coordination Profile v0.1](../../shared-action-coordination/v0.1/README.md) can represent a compatibility subset in which all relevant requirements are direct affirmative responses governed by one homogeneous response rule. It is not a lossless projection for consultation, objection, notification, review, audit, or mixed failure effects.

## Standards Reuse

- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies Duties, Parties, actions, constraints, consequences, and policy conflict semantics.
- [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-cos01-en.html) supplies Obligations, Advice, combining, and `Indeterminate` behavior.
- [DPV Rights](https://www.w3.org/community/reports/dpvcg/CG-FINAL-dpv-20240801/modules/rights.html) supplies rights notices and exercise records; [DPV core](https://www.w3.org/community/reports/dpvcg/CG-FINAL-dpv-20240801/) supplies consultation and representative concepts. DPV is a Community Group Final Report.
- [PROV-O](https://www.w3.org/TR/prov-o/) supplies delegation and provenance without determining authority.
- [ActivityStreams](https://www.w3.org/TR/activitystreams-vocabulary/) supplies interaction event projections without evaluating procedures.

## Invariants

1. Impactedness does not select a universal procedure.
2. Every disclosed impact has exactly one explicit mapping disposition.
3. The system owns the procedural obligation; a person is not forced to answer.
4. A slot is not identity, presence, membership, guardianship, or durable delegation.
5. Notification is not acceptance; silence is not affirmative agreement or waiver.
6. Affirmative response is not legal consent or authorization.
7. Review is not universal competence or final permission.
8. `none` is not “unaffected” and cannot erase the impact entry.
9. Cross-channel requirements do not merge merely because their underlying entity is equal.
10. Mapping success remains bounded to declared impacts and does not prove global completeness.

## Executable Evidence

The [Impact Procedure Mapping scenario](../../../../conformance/scenarios/impact-procedure-mapping-v0.1/README.md) covers mixed requirement kinds, empty closure, explicit `none`, partial closure, exact revision, Epoch, zero and multiple rules, representative and opaque routes, denied or duplicate routing, action mismatch, cross-channel non-merging, and privacy guards.

JavaScript and Python independently reproduce the fixture. They are implementations from one project process, not independent governance consensus.

## Validation

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/impact-procedure-mapping/v0.1/mapping-policy.schema.json \
  -d conformance/scenarios/impact-procedure-mapping-v0.1/mapping-policy.json

node conformance/scenarios/impact-procedure-mapping-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
