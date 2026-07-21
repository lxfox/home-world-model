# ADR-059: Restore through staged, current-evidence gates

- Status: Accepted as restoration-governance candidate
- Date: 2026-07-19
- Chinese mirror: [`ADR-059-restore-through-staged-current-evidence-gates.zh-CN.md`](ADR-059-restore-through-staged-current-evidence-gates.zh-CN.md)

## Context

A precautionary hold or emergency stop needs a path back to useful operation; otherwise temporary protection can become indefinite exclusion. Yet timeout, code repair, operator confidence or one successful canary cannot prove that the original risk is controlled for the full deployment. Existing HWM semantics separately represent remediation obligations, evidence standing, target/effect assessment, Authority, procedural Duties, Action Attempts and closure. Restoration must compose those results without creating a shortcut.

## Decision

1. Use an append-only restoration chain: `response state -> remediation closure -> current risk reassessment -> scoped residual-risk disposition -> restoration Proposal/procedures -> Authority + local safety -> staged Attempt -> observation gate -> expand/hold/rollback decision -> closure`.
2. Remediation completion states what declared repair/containment obligations were satisfied. It does not self-prove safety, causal adequacy, authorization or restoration readiness. The implementer/repairer may supply evidence but cannot establish independent standing merely by authorship.
3. Risk reassessment binds the exact stopped configuration, proposed restored configuration, original signals, remediation evidence, affected population, hazard/impact channels, assumptions, uncertainty, horizon and `as_of`. Changed software, device, policy, population or environment invalidates transfer without explicit revalidation.
4. Residual-risk disposition is separate from technical assessment. It identifies the exact risk bearer/Authority, scope, duration, constraints and rationale. `accepted` means accepted under that policy for that scope; it does not mean safe, fair, legally compliant or accepted by every affected subject.
5. Missing or indeterminate risk evidence cannot be converted to acceptance. Policy may instead permit a narrower precautionary stage with explicit uncertainty limits; uncertainty never silently becomes zero risk.
6. Restoration requires a new Proposal or precommitted restoration mandate, satisfied pre-restoration Duties, a current Authority decision and non-overridable local-safety checks. Previous authorization and hold expiry are not reusable permission.
7. Restoration executes in named stages such as `diagnostic`, `canary`, `limited_capability`, `bounded_population`, or `full_scope`. Each stage binds targets, capabilities, population, duration, observation criteria, stop/rollback rules and cumulative exposure budget.
8. Stage success is local to that stage. A canary does not prove unobserved populations, capabilities, environments, longer horizons or full-scale resource interactions. Expansion requires a new stage decision using current evidence.
9. Any stage trigger breach, unexpected effect, safety denial, evidence loss, unresolved objection or observation-coverage failure routes to hold/rollback assessment. Rollback eligibility does not prove rollback execution or restored prior state.
10. Restoration closure requires the final intended scope to be verified, all stage Attempts resolved, required observation windows closed, post-restoration Duties satisfied, residual limitations recorded and recurrence monitoring assigned. It does not erase the incident, hold, harm or remediation history.
11. A prior stop does not permanently prohibit restoration, and commercial pressure, service-level targets or sunk cost do not establish risk acceptance.
12. Restoration governance does not grant legal authority, universal safety, consent, fairness, household trust, access, continuation or action authority beyond exact cited records.

## Consequences

- Temporary controls gain an auditable exit without automatic timeout recovery.
- Canary evidence supports only bounded expansion decisions.
- Risk acceptance remains accountable and scoped rather than hidden inside engineering sign-off.
- Recurrence sends the system back through response governance without erasing the attempted restoration.
- No new household Core or action state is introduced.

