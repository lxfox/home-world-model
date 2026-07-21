# ADR-081: Degrade to safe dormancy and separate exit from reactivation

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-081-degrade-to-safe-dormancy-and-separate-exit-from-reactivation.zh-CN.md`](ADR-081-degrade-to-safe-dormancy-and-separate-exit-from-reactivation.zh-CN.md)

## Context

A household may stop maintaining its Agent system, ignore governance requests, lose Authority connectivity, pause a deployment, leave a vendor or abandon the model. Letting old rules run indefinitely turns inattention into consent. A global shutdown is also unsafe: essential heating, locks, alarms, native manual controls and local interlocks have different physical dependencies.

Existing Lease expiry, Routine eligibility, response/exit governance, work closure, disclosure lifecycle, local safety and staged restoration can express capability-specific dormancy without a new global state.

## Decision

1. Do not define one global dormant/active household state. Each governed capability declares review/freshness, Lease bounds, unattended behavior, in-flight handling, safe fallback, manual/native control, data dependencies, obligations and reactivation gates.
2. Distinguish advisory reasoning, new autonomous work, already-authorized bounded work, native manual function, local safety/interlock, shared essential service and cloud/data service. No universal fallback applies.
3. Missing attention or Authority creates no acceptance or continuing permission. New disclosure, reasoning, Task materialization and dispatch deny, become indeterminate or use only an exact preaccepted limited mode.
4. A current offline Lease remains valid only within its exact scope/time and stricter local safety. Expiry blocks new Lease-bound use; historical use does not renew it.
5. Handle in-flight work under an exact preaccepted abort/complete/reconcile policy. Command issue never proves safe state; unknown delivery blocks retry and closure until reconciled.
6. Preserve safe device-native manual controls where independently available. Agent dormancy neither requires device power-off nor proves native function safe.
7. Keep non-overridable local protection active independently. Shared essential services use domain-specific staged fallback and affected-subject coordination; one person's exit cannot blindly shut them down.
8. Treat ordinary exit as a multi-axis process: control/credential disablement, in-flight closure, manual fallback, scoped export, prospective-use revocation, retention/deletion, cloud dependency removal, device decommissioning and shared obligations.
9. App uninstall, logout or vendor account closure does not prove credential revocation, device unpairing, data deletion, safe state or exit closure.
10. Deletion/crypto-shredding receipts declare controlled boundaries and cannot prove erasure of uncontrolled copies or reversal of model training. Historical provenance remains under retention policy.
11. Dormancy is not retirement or deletion. Vendor EOL is retirement preparation, not completion.
12. Connectivity return, login, timer expiry or a patch does not reactivate. Require current Authority, admission/Lease, dependency revalidation, procedures, local safety and staged observed restoration.
13. A new Agent receives fresh admission, orientation, disclosure and Authority; no old Lease, private memory or execution permission transfers.

## Consequences

- Inattention stops creating unlimited autonomous continuation.
- Households retain manual and protective functions without keeping an Agent sovereignly active.
- Exit becomes verifiable by axis rather than falsely complete after uninstalling an app.
- Thirty executable cases cover attention/Authority loss, Leases, capabilities, in-flight work, manual/safety functions, shared essentials, control/data/cloud/device exit, dormancy/retirement and reactivation.
