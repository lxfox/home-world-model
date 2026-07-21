# ADR-015 — Evaluate Procedure Fulfilment Before Authorization

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-015-evaluate-procedure-fulfilment-before-authorization.zh-CN.md`](ADR-015-evaluate-procedure-fulfilment-before-authorization.zh-CN.md)

## Context

ADR-014 produces heterogeneous, system-owned Procedural Requirements. It intentionally does not say which Records fulfil an affirmative response, consultation opportunity, objection window, notification, qualified review, or audit. Reusing one boolean `done`, or treating every incomplete procedure as `confirmation_required`, would collapse the distinctions ADR-014 introduced.

The model also needs to distinguish a requirement that is not yet due from one that is fulfilled, a known pending operation from missing evaluation input, and post-action noncompliance from retroactive revocation of a historical Authorization Decision.

## Decision

1. HWM adds the optional **Procedure Fulfilment Profile v0.1**. Core remains unchanged.
2. A fulfilment assessment binds one complete Requirement Set, exact Proposal identifier and revision, Authority Epoch, assessment time, and evaluation stage.
3. The three stages are `pre_authorization`, `pre_dispatch`, and `post_execution`. A later-stage requirement is `not_due`, never implicitly fulfilled or waived.
4. Every due requirement is evaluated independently as `fulfilled`, `pending`, `negative`, `unfulfilled`, or `indeterminate`; the assessment preserves all local statuses.
5. Record admission requires exact Proposal revision, Epoch, requirement, time, and privacy-safe participation-slot binding. Where a Record asserts a response or review result, evidence-use authorization and Evidence Standing remain separate prerequisites.
6. Completion rules remain type-specific:
   - affirmative response requires an admitted `confirm`; `reject` is negative and `abstain` remains pending;
   - consultation requires delivery of an accessible opportunity, not a participant answer;
   - an objection window requires expiry plus complete response-ledger coverage and no admitted blocking objection;
   - notification requires delivery, not queueing, reading, or acceptance;
   - qualified review requires an admitted, currently qualified, scoped review result;
   - audit requires an integrity-verifiable audit Record at the declared post-execution stage.
7. `access_denied`, partial coverage, unavailable status, conflicting current Records, and other missing evaluation inputs do not prove absence or completion. They produce `indeterminate` where the declared policy cannot decide safely.
8. Aggregate procedure status is `satisfied`, `pending`, `blocked`, `indeterminate`, or `post_action_noncompliance`.
9. The Profile emits a workflow `authority_gate`, not an Authorization Decision:
   - `continue_policy_evaluation` when every requirement due at the current stage is fulfilled;
   - `confirmation_required` only when every outstanding gate is an affirmative-response requirement with that declared failure effect;
   - `requirements_pending` for other known outstanding procedures;
   - `denied` for a declared blocking negative or denial consequence;
   - `indeterminate` when the gate cannot be evaluated safely;
   - `historical_noncompliance` for missed post-action duties.
10. `requirements_pending` is deliberately a workflow state, not a fifth Core Authorization Decision result. A service MUST NOT issue `allowed` while a current pre-authorization or pre-dispatch gate is pending.
11. `post_action_noncompliance` appends a new compliance assessment. It does not rewrite a historical authorization or Action Trace.
12. A `satisfied` assessment only permits the next policy-evaluation step. It does not imply permission, safety, legal consent, successful execution, or outcome acceptance.

## Why this boundary

[ODRL 2.2](https://www.w3.org/TR/odrl-model/) separates fulfilment of Duties from Permission and gives failure separate consequences. [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-cos01-en.html) preserves `Indeterminate` when matching obligation expressions cannot be evaluated. [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-vocabulary/) keeps delivery-adjacent and response activities such as `Accept`, `Reject`, `Read`, and `Arrive` semantically distinct. [PROV-O](https://www.w3.org/TR/prov-o/) supplies generation lineage for assessment Records. [Verifiable Credentials 2.0](https://www.w3.org/TR/vc-data-model-2.0/) explicitly warns that credential verification alone does not establish the truth of its claims. HWM composes these boundaries instead of defining a universal proof of delivery, consent, competence, or authorization.

## Rejected alternatives

### One boolean `done`

Rejected. It cannot distinguish queueing from delivery, silence from complete no-objection coverage, or review from authorization.

### Treat every outstanding procedure as confirmation

Rejected. A notification service, objection window, reviewer, and audit service are not a person being asked to confirm.

### Treat `not_due` as fulfilled

Rejected. This silently waives pre-dispatch and post-execution duties during earlier assessments.

### Revoke historical authorization when an audit is late

Rejected. This mutates history and confuses compliance after execution with the information available at decision time.

## Evidence

The executable scenario now contains 28 stage-, Record-, and admission-sensitive cases, eight model-boundary cases, 69 forbidden inferences, and independent JavaScript and Python evaluators. It covers exact content-bound Standing Decisions in addition to stale revisions, queued delivery, partial objection ledgers, conflicting reviews, post-action audit failure, and the difference between `confirmation_required` and `requirements_pending`.
