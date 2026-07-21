# ADR-058: Separate harm signals, response eligibility and execution

- Status: Accepted as deployment-response governance candidate
- Date: 2026-07-19
- Chinese mirror: [`ADR-058-separate-harm-signals-response-eligibility-and-execution.zh-CN.md`](ADR-058-separate-harm-signals-response-eligibility-and-execution.zh-CN.md)

## Context

Deployment Outcome Views can expose adverse impacts, unfavorable experience, unequal outcomes or failed exit. A negative result is evidence, not self-executing authority. Letting any observer or Agent stop a household system would be unsafe; requiring fresh consensus before every protective response could also prolong imminent harm. Existing HWM Authority, Impact Procedure, Procedure Fulfilment, Action Attempt and Outcome Closure semantics already separate policy, duties, dispatch, effect and follow-up.

## Decision

1. Preserve an append-only chain: `signal -> qualified response basis -> response proposal/mandate -> Authority and local-safety decision -> Attempt -> effect assessment -> obligation closure`.
2. Keep five response classes distinct: `precautionary_hold`, `emergency_stop`, `ordinary_exit`, `remediation`, and `retirement`. They differ in trigger, scope, authorization, time, fallback and closure requirements.
3. A harm, disparity, dissatisfaction or anomaly signal never grants an Agent stop, access, repair or retirement authority. It may require assessment or create a Proposal under an exact policy.
4. A precautionary hold is a bounded, reversible restriction on new risky dispatch while evidence is incomplete. It requires a precommitted policy, affected scope, safe fallback, expiry/review time and restoration rule. It is not a finding of harm and cannot silently become indefinite suspension.
5. An emergency stop is eligible only through a pre-authorized safety-controller/interlock mandate or an exact emergency Authority policy with verified trigger, bounded target, proportional safe state and post-event Duties. Emergency scope cannot be generalized to unrelated devices, data or future actions.
6. Local non-overridable safety interlocks may deny or terminate dispatch under their configured mandate even when household Authority previously allowed an action. Their actuation and effect remain recorded and reviewable; the interlock does not gain household governance power.
7. Ordinary exit is exercised by a subject/adopter under an exact exit right or contract. It cannot terminate shared essential service outside that scope. Exit execution separately covers control disablement, safe fallback, data portability/deletion obligations, dependency removal and restoration verification.
8. Remediation is an obligation to investigate, contain, repair, compensate, notify, audit or revalidate. An obligation owner does not thereby receive household access or action permission; each invasive Attempt still requires applicable Authority and safety checks.
9. Retirement is a planned lifecycle decision for an exact release/service/deployment population. It requires dependency inventory, migration/fallback, notice, data disposition, residual-risk handling and closure evidence. End-of-life announcement is not completed retirement.
10. Every temporary response has an expiry or renewal decision. Restoration is a new authorized decision based on current evidence; expiry does not automatically restore unsafe operation, and a prior stop does not permanently prohibit restoration.
11. Response eligibility, authorization, dispatch, physical safe state, remediation completion and outcome acceptance remain separate. Failure or uncertainty at one stage cannot be hidden by success at another.
12. This governance does not establish legal duty, liability, universal safety, consent, household trust, access or action authority beyond the exact cited policies and records.

## Consequences

- The model permits prompt bounded protection without granting general emergency power to Agents.
- “Pause while investigating” cannot become an unreviewed permanent ban.
- Operators cannot treat a repair obligation as authorization to enter a home or control devices.
- Exit and retirement are verifiable processes rather than UI buttons or announcements.
- This is a composition of existing HWM semantics, not a household Core expansion.

