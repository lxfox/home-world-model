# HWM Deployment Response Governance v0.1

- Status: Discussion Candidate
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-058`](../../../docs/05_decision/ADR-058-separate-harm-signals-response-eligibility-and-execution.md)
- Response Basis schema: [`response-basis.schema.json`](response-basis.schema.json)

## Purpose

Route deployment outcome signals into bounded protective, exit, remediation or retirement processes without turning evidence into self-executing Agent power.

This contract composes existing HWM Authority, Procedure Fulfilment, Action Attempt, Effect Attribution, Outcome Closure and Change Revalidation semantics. It does not define a new action authorization system.

## Required chain

```text
Outcome / incident signal
  → response-basis assessment
  → exact Proposal or pre-authorized mandate
  → Authority decision + non-overridable local safety
  → Action Attempt
  → realized safe-state assessment
  → notification / audit / repair / restoration closure
```

No arrow is implicit. A signal can require attention without qualifying a response. Eligibility does not authorize, authorization does not prove dispatch, dispatch does not prove safe state, and safe state does not close post-response obligations.

## Five response classes

### Precautionary hold

A time-bounded restriction on new risky dispatch while material uncertainty is investigated. It requires an accepted policy, exact affected scope, evidence threshold, least-disruptive safe fallback, start/expiry, review owner and restoration/renewal rule. It is not a final harm finding. Expiry triggers review; it does not automatically restore operation or silently extend the hold.

### Emergency stop

A rapid transition to a bounded safe state under either:

- a preconfigured, non-overridable local safety-controller/interlock mandate; or
- a verified emergency state matched to an exact household Authority policy.

Both paths bind trigger, target, action, safe state, proportionality, time and post-event notification/audit Duties. An emergency for one circuit does not authorize access to cameras, unrelated rooms, historical data or future dispatch.

### Ordinary exit

A named subject or adopter exercises an exact contractual/Authority exit right. The exit scope may be personal, product, service or deployment-specific. Shared essential functions outside that right require their own coordination and fallback. Exit closure separately assesses control disablement, data export, prospective-use revocation, deletion obligations, dependency removal and restoration; deletion receipts do not prove erasure of uncontrolled copies.

### Remediation

A policy or Decision assigns one or more obligations: investigate, contain, repair, compensate, notify, audit, revalidate or monitor. Obligation assignment does not grant physical or data access. Each invasive action remains separately authorized, safety-checked, attempted and assessed. Target realization does not close open remediation.

### Retirement

A planned lifecycle process for an exact release, service or deployment population. Preparation inventories dependents and affected deployments; execution supplies migration/fallback, notice, support windows, data disposition and residual-risk handling; closure verifies the declared population. Announcement, repository archival or vendor EOL date alone is not retirement completion.

## Eligibility results

The Response Basis assessment may return:

- `no_response_basis`
- `assessment_required`
- `proposal_required`
- `precautionary_hold_eligible`
- `emergency_stop_eligible`
- `ordinary_exit_eligible`
- `remediation_required`
- `retirement_preparation_required`
- `denied`
- `indeterminate`

These are routing results, not Core Action Trace authorization values and not execution states.

## Restoration and recurrence

Restoration requires a new current Authority/safety decision, current evidence, satisfied pre-restoration Duties and a bounded Attempt. A prior stop is historical evidence, not permanent prohibition. Recurrence criteria may re-enter a precommitted hold/stop process but cannot create broader authority. Every renewal, escalation, restoration and closure is append-only.

## Hard boundary

This contract does not determine legal duty or liability, diagnose universal harm, prove safety, grant emergency sovereignty, establish consent, compel household access, authorize continuation, or create household trust, access or action authority.

Run:

```sh
node governance/responses/v0.1/validate.mjs
```

