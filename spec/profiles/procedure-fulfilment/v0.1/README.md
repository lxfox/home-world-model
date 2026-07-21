# HWM Procedure Fulfilment Profile v0.1

- Status: Discussion Draft
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-015`](../../../../docs/05_decision/ADR-015-evaluate-procedure-fulfilment-before-authorization.md)

## Purpose and boundary

This optional Profile evaluates the Procedural Requirements produced by the [Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.md). It answers which requirements are fulfilled at one declared workflow stage and whether policy evaluation may continue. It does not create Permission, legal consent, physical safety, execution success, or outcome acceptance.

## Inputs

An evaluator consumes:

- a schema-valid Requirement Set with `mapped_for_declared_impacts` status;
- one exact Proposal identifier and revision;
- the verifier Authority Epoch, assessment time, and one stage;
- the Records currently available to the evaluator;
- separate content-digest-bound Evidence Standing Decisions covering every Record assertion the evaluator will consume;
- delivery, coverage, and other asserted values from the admitted raw Records.

The Requirement Set schema is [`requirement-set.schema.json`](requirement-set.schema.json). The output contract is [`fulfilment-assessment.schema.json`](fulfilment-assessment.schema.json).

## Stage model

| Assessment stage | Requirements evaluated |
| --- | --- |
| `pre_authorization` | `before_authorization` |
| `pre_dispatch` | `before_authorization`, `before_dispatch` |
| `post_execution` | all three timings |

A requirement outside the current stage is `not_due`. It is neither fulfilled nor waived. Execution gateways MUST reassess `before_dispatch` requirements before dispatch even when an earlier authorization-stage assessment was `satisfied`.

## Local statuses

| Status | Meaning |
| --- | --- |
| `fulfilled` | the declared, type-specific completion signal is established by admitted Records |
| `pending` | the requirement is due, its completion state is known, and completion may still occur |
| `negative` | an admitted negative signal with a declared effect exists |
| `unfulfilled` | the due time passed without the required completion signal |
| `indeterminate` | binding, access, standing, qualification, coverage, integrity, or record cardinality prevents safe evaluation |
| `not_due` | the requirement belongs to a later workflow stage or has not opened |

## Record-specific rules

| Requirement kind | Fulfilment signal | Must not be inferred |
| --- | --- | --- |
| `affirmative_response` | exactly bound, authorized, standing-admitted `confirm` | silence, abstention, legal consent, durable permission |
| `consultation_opportunity` | accessible opportunity delivered to the bound slot | participant answer, agreement, guardianship |
| `objection_window` | exact window expired; delivery and ledger coverage complete; no admitted blocking objection | affirmative acceptance, waiver, “no objection” from partial or inaccessible data |
| `notification` | notice delivered to the bound slot | read, understood, accepted, permitted |
| `qualified_review` | scoped review accepted; use and standing admitted; qualification current | universal expertise, truth, authorization, safety outside scope |
| `audit` | integrity-verifiable audit Record appended when due | retroactive authorization or mutation of history |

“Queued”, “sent”, and transport acceptance are not interchangeable with delivered. Deployments declare their delivery proof and accessibility procedure; this Profile only evaluates its recorded result. Conflicting current Records are `indeterminate` unless a separate, declared supersession policy resolves them.

Raw Records MUST NOT self-report `standing_status`, proof-verification, evidence-use, or qualification results as admission inputs. The evaluator consumes a separate [Evidence Standing Decision](../../evidence-standing/v0.1/evidence-standing-decision.schema.json), verifies its RFC 8785/SHA-256 Record binding, purpose, Epoch, time, cardinality, and `admitted_assertions`, and only then reads covered raw fields. A signature or receipt never widens its declared semantic scope.

## Aggregation and workflow gate

The assessment preserves every local status and then emits one aggregate `procedure_status` plus one Profile-local `authority_gate`:

| Procedure status | Gate | Meaning |
| --- | --- | --- |
| `satisfied` | `continue_policy_evaluation` | all requirements due now are fulfilled |
| `pending` | `confirmation_required` | only affirmative-response gates remain |
| `pending` | `requirements_pending` | another known procedure remains incomplete |
| `blocked` | `denied` | declared blocking negative or denial consequence |
| `indeterminate` | `indeterminate` | safe evaluation is impossible |
| `post_action_noncompliance` | `historical_noncompliance` | an after-execution duty was missed; history is unchanged |

The gate is not an Authorization Decision. `continue_policy_evaluation` means only that the next Authority step may run. `requirements_pending` is intentionally outside the Core Action Trace decision enum.

## Invariants

1. Requirement Set, Proposal revision, Authority Epoch, stage, and assessment time are exact bindings.
2. Every requirement appears in exactly one local-status partition.
3. Later-stage requirements are `not_due`, never fulfilled by omission.
4. Absence of an objection requires complete ledger coverage; unavailable or partial data is not silence.
5. Delivery does not imply reading or acceptance.
6. Evidence-use permission, Evidence Standing, qualification, fulfilment, authorization, safety, execution, and outcome acceptance remain separate.
7. A missed audit appends noncompliance and never rewrites the earlier decision context.
8. The party obligated to operate the procedure is the action-side service; a participant is not forced to answer.
9. Raw Record identity or self-asserted status cannot substitute for a separate, content-bound Standing Decision.
10. Admission of one Record field does not grant standing to every assertion in that Record.

## Conformance

Run the executable oracle:

```sh
node conformance/scenarios/procedure-fulfilment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Validate the candidate schemas:

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/procedure-fulfilment/v0.1/requirement-set.schema.json \
  -d conformance/scenarios/procedure-fulfilment-v0.1/requirement-set.json
```
