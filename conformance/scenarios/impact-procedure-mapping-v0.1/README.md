# Impact Procedure Mapping Scenario v0.1

- Status: Executable Discussion Fixture
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Related Profile: [`Impact Procedure Mapping Profile v0.1`](../../../spec/profiles/impact-procedure-mapping/v0.1/README.md)

## Question

Can one complete-for-declared-channels impact assessment be converted into mixed household procedures without forcing every affected entity into one voting set, disclosing hidden identity, or authorizing the action?

## Fixture

One temperature Proposal produces six disclosed impacts:

- a material thermal impact on one resident;
- a possible thermal impact on a pet;
- a privacy impact routed through an opaque subject handle;
- a possible shared-circuit impact;
- two control-interest impacts, including a second impact on the first resident.

The household's fixture policy maps them respectively to affirmative response, representative-routed consultation opportunity, objection window, qualified review, and two notifications. These are local policy examples, not universal procedures for those impact kinds.

The output contains Proposal-scoped participation slots. It does not contain resident, pet, privacy-subject, representative, credential, presence, membership, or delivery-endpoint identity.

## Oracle Coverage

[`mapping-cases.json`](mapping-cases.json) contains 17 mapping cases and nine model-boundary cases. They cover:

- mixed requirement kinds and cross-channel non-merging;
- partial and indeterminate closure;
- exact Proposal revision and Authority Epoch;
- no mapping rule and multiple mapping rules;
- missing, unavailable, denied, duplicate, and stale representative routes;
- empty complete closure and explicit `none`;
- action mismatch;
- obligation direction, silence, notification, review, opaque slots, and representative boundaries.

Every case carries `must_not_infer` guards. In particular, the fixture forbids legal-consent inference, forced response, silence-as-agreement, notification-as-acceptance, review-as-authorization, automatic guardianship, slot identity, and action authorization.

## External Projection

[`mapping.external.jsonld`](mapping.external.jsonld) projects reusable structure through ODRL, DPV, PROV-O, ActivityStreams, Schema.org, and DCMI. Local action identifiers are resources, not new predicates. The projection contains no HWM procedure predicate.

## Run

```sh
node conformance/scenarios/impact-procedure-mapping-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Passing demonstrates fixture compatibility only. It does not prove that the household policy is fair, legally valid, accessible, privacy-preserving in production, correctly fulfilled, or sufficient for authorization.

