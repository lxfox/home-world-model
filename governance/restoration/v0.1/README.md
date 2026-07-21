# HWM Staged Restoration Governance v0.1

- Status: Discussion Candidate
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-059`](../../../docs/05_decision/ADR-059-restore-through-staged-current-evidence-gates.md)
- Restoration Gate schema: [`restoration-gate.schema.json`](restoration-gate.schema.json)

## Purpose

Provide a reviewable route from a bounded deployment hold/stop to restored operation without treating elapsed time, a patch, risk acceptance, authorization or one successful stage as full restoration.

This contract composes [Deployment Response Governance](../../responses/v0.1/README.md), HWM Authority, Procedure Fulfilment, Action Attempt, Effect Attribution, Outcome Closure and Change Revalidation. It defines governance routing results, not new Core action states.

## Restoration chain

```text
exact response state
→ remediation closure
→ current risk reassessment
→ residual-risk disposition
→ restoration Proposal + procedures
→ Authority + local safety
→ one bounded stage Attempt
→ stage observation gate
→ expand | hold | rollback assessment
→ final restoration closure
```

The repairer, risk assessor, risk acceptor, Authority decision maker and executor may overlap only under an explicit policy with conflicts disclosed. Their records remain logically independent even when the same person fills several roles.

## Gate inputs

### Remediation closure

Binds every declared containment, repair, compensation, notification, audit and revalidation obligation. `completed` does not mean the repair caused risk reduction or that restoration is authorized. Open or indeterminate mandatory obligations block restoration unless an exact policy permits a narrower diagnostic stage that cannot worsen the unresolved condition.

### Current risk reassessment

Binds stopped and proposed configurations, original signals, exact remediation evidence, population, impact channels, assumptions, uncertainty, environment, observation horizon and assessment time. Its results are `reduced_with_limits`, `not_reduced`, `indeterminate`, or `not_evaluated`. A repairer's claim is evidence input, not an independent assessment by default.

### Residual-risk disposition

Records `accepted`, `not_accepted`, `acceptance_required`, or `indeterminate` for one risk bearer/Authority, scope, time and constraint set. Acceptance is a governance decision, not a technical measurement and not consent from every affected subject. Unknown risk cannot be relabelled accepted.

### Restoration authorization

Requires an exact Proposal or precommitted mandate, current Authority Epoch, satisfied pre-restoration Duties and local-safety clearance. Previous permission, commercial urgency, hold expiry and operator ownership do not grant restoration authority.

## Staged execution

Named stage kinds are `diagnostic`, `canary`, `limited_capability`, `bounded_population`, and `full_scope`. A stage contract fixes:

- exact configuration and command/capability set;
- eligible population, spaces and exclusions;
- time window and cumulative exposure budget;
- expected and adverse observations;
- minimum observation coverage and data quality;
- automatic stop/rollback triggers;
- rollback target and verification procedure; and
- the next decision owner.

Stage results are `stage_not_started`, `stage_open`, `stage_passed_with_limits`, `stage_failed`, `stage_indeterminate`, or `stage_rolled_back`. Passing supports only a new expansion decision; it does not mutate the stage into full restoration.

## Routing results

The Gate emits one of:

- `not_eligible`
- `remediation_incomplete`
- `risk_reassessment_required`
- `risk_acceptance_required`
- `restoration_proposal_required`
- `procedures_pending`
- `authorized_for_stage`
- `stage_observation_required`
- `expand_stage_eligible`
- `hold_required`
- `rollback_required`
- `closure_eligible`
- `denied`
- `indeterminate`

These results never dispatch actions. `rollback_required` is an obligation/routing result, not proof that rollback occurred.

## Closure and recurrence

Final closure requires verified intended scope, all Attempts resolved, required observation horizons complete, post-restoration Duties satisfied, residual limitations preserved, monitoring owner and recurrence policy. Later recurrence appends a new signal and Response Basis; it does not retroactively invalidate or erase the restoration record.

## Hard boundary

This contract does not prove universal safety, zero residual risk, causality, consent, fairness, legal compliance, permanent recovery, household trust, access, continuation or action authority.

Run:

```sh
node governance/restoration/v0.1/validate.mjs
```

