# HWM Outcome Assurance and Work Closure Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schema: [`outcome-work-closure-assessment.schema.json`](outcome-work-closure-assessment.schema.json)

## Purpose

This optional Profile produces a closure receipt with two independent axes:

1. **Intent Assurance** — whether the exact adopted Intent's mandatory expectations are satisfied over a declared window; and
2. **Work Closure Gate** — whether one exact Task has satisfied its own exit criteria and has no unresolved execution or follow-up obligations.

The receipt creates neither Intent state nor Task state. An independently governed state transition consumes it as evidence.

## Standards basis

- [RFC 9315](https://www.rfc-editor.org/rfc/rfc9315.html) separates Intent Fulfillment functions that pursue realization from Intent Assurance functions that monitor compliance and drift.
- [RFC 9316](https://www.rfc-editor.org/rfc/rfc9316.html) distinguishes transient and persistent Intent life cycles. HWM treats persistent fulfillment as a time-bounded assurance snapshot, not permanent success.
- [W3C PROV-O](https://www.w3.org/TR/prov-o/) preserves the activities and evidence used by an assessment but does not make activity end equivalent to outcome success.

## Intent Assurance

Every mandatory expectation in the exact Intent Definition is evaluated through its declared specification. The assessment binds the commitment state, realization occurrence, purpose-bound World View, assurance window, evidence, and Authority context inherited through those exact artifacts.

`fulfilled` means all applicable mandatory expectations are satisfied with complete required coverage for this window. For a transient Intent, that may support lifecycle completion when the Definition's completion window is closed. For a persistent Intent, it is only current compliance; later drift appends `degraded` or `not_fulfilled` without rewriting history.

Optional expectations may inform quality but cannot turn mandatory failure into fulfillment. `not_fulfilled` requires admitted evidence that a mandatory expectation is not satisfied. Missing, inaccessible, stale, contested, partially covered, or temporally mismatched evidence is `indeterminate`, not failure.

## Work Closure Gate

A Task is `task_close_eligible` only when:

- every mandatory Task exit criterion is satisfied;
- no Attempt is open, delivery-unknown, contested, or awaiting reconciliation;
- no declared recovery, compensation, side-effect review, notification, audit, or professional-acceptance obligation remains open or indeterminate; and
- the Task definition, evidence, and assessment bindings are exact and current for the closure decision.

The gate does not close the Task. A separate append-only Task State transition does that. An Attempt failure may yield `task_continue_required` or `task_remediation_required` according to the Task's exit policy; it never fails the Task automatically.

Direct realization has no Task closure axis and may be reported as `direct_realization_closed` only when its bounded post-action obligations are resolved. This does not create a Task retroactively.

## Orthogonality examples

- Task close eligible + Intent ongoing: the Task completed one bounded step of a larger Intent.
- Intent fulfilled + Task remediation required: the desired condition is present, but a side effect or recovery obligation remains.
- Intent not fulfilled + Task close eligible: the Task's bounded experiment or diagnostic work ended without satisfying the higher-level Intent.
- Persistent Intent fulfilled + Task close eligible: close this Task, keep the Intent adopted and continue assurance for future drift.

## Invariants

1. Effect Realization, Goal/expectation satisfaction, Intent Assurance, and Task closure are separate results.
2. Task closure eligibility neither closes the Task nor retracts the Intent.
3. Intent fulfillment neither completes nor cancels a Task.
4. Task completion neither proves Intent fulfillment nor permanent success.
5. Persistent fulfillment is a bounded assurance snapshot.
6. Missing evidence is indeterminate, not negative evidence.
7. Optional expectation success cannot mask mandatory failure.
8. Open or delivery-unknown Attempts prevent Task closure.
9. Side-effect, recovery, compensation, notification, audit, and acceptance obligations remain first-class closure blockers.
10. A cancelled or failed Task does not refute its Intent or underlying Claims.
11. Direct realization does not create a Task after the fact.
12. Closure receipts and later drift are append-only.

## Conformance

The [Outcome Assurance and Work Closure oracle](../../../../conformance/scenarios/outcome-work-closure-v0.1/README.md) tests the two independent axes, persistent drift, direct realization, exit criteria, ambiguous Attempts, and post-action obligations.

```sh
node conformance/scenarios/outcome-work-closure-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
