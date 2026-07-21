# ADR-077: Govern Resolver procedures without creating an epistemic sovereign

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-077-govern-resolver-procedures-without-creating-an-epistemic-sovereign.zh-CN.md`](ADR-077-govern-resolver-procedures-without-creating-an-epistemic-sovereign.zh-CN.md)

## Context

ADR-076 preserves multiple qualified interpretations but permits an accepted Resolver procedure to materialize one purpose-bound World View. If that procedure is an opaque vendor default, self-selected by an Agent, silently updated, or confused with its implementation, it becomes a hidden epistemic authority. Conversely, requiring one universal household truth algorithm would erase domain, purpose and evidence differences.

Existing Authority, Evidence Standing, conformance/capability, immutable World View, receipt and revalidation mechanisms can govern the procedure lifecycle without adding a Core policy object.

## Decision

1. Represent a Resolver procedure as an explicit, immutable, versioned and purpose-/scope-bound Authority-governed policy artifact. It specifies admissible input roles, standing dependencies, evidence closure, missing/conflict/abstention behavior, output semantics, disclosure, limitations and conformance cases.
2. Separate procedure proposal, required reviews, Authority acceptance, implementation conformance, deployment admission, activation, suspension, replacement/rollback and individual World View execution receipts.
3. An Agent may propose a procedure but cannot accept, widen, activate, self-exempt or silently update it. Absence of an accepted applicable procedure yields indeterminate resolution.
4. Authority acceptance means the household permits reliance under the named procedure for an exact purpose and scope. It does not declare propositions true, certify professional compliance or authorize action.
5. Require review axes proportionate to use: semantic/conformance, empirical fitness, uncertainty and abstention, privacy, bias/harm, affected populations and domain/professional roles. Passing one axis never implies the others.
6. Bind acceptance to exact content and revision. Material semantic changes create a new revision and require a new decision; proposal or publication does not update an active procedure.
7. Bind implementation admission to exact contract/version, demonstrated role capability, current Agent admission and deployment state. Conformance is not household adoption or activation.
8. Multiple active successor heads are a governance contest and fail closed. Timestamp, semver, vendor choice and deployment recency cannot select one.
9. Suspension blocks new governed Views while preserving historical Views and receipts. Replacement and rollback are prospective current-Authority actions and trigger bounded revalidation; neither rewrites history.
10. Every World View must expose or make recoverable the exact Resolver procedure, implementation/conformance binding, source closure and Authority epoch needed to explain the result.
11. A household may override one exact downstream decision through a separately effective Authority artifact. That preserves, rather than mutates, the Resolver result and policy.
12. Monitoring thresholds trigger review, suspension or a new proposal only. They do not automatically select or activate a replacement.

## Consequences

- The household controls rules of reliance without claiming power to manufacture physical truth.
- Resolver implementations remain replaceable and testable independently from the policies they execute.
- Historical decisions remain explainable across policy replacement, suspension and rollback.
- Thirty executable cases cover proposal completeness, review axes, acceptance, implementation admission, lifecycle forks, receipts, overrides and monitoring.
