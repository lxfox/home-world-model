# HWM Deliberation Eligibility Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile determines whether an Agent-detected target gap may enter a household deliberation queue. It governs proactive issue-raising without turning an unsatisfied target into a Need, household commitment, interruption, recommendation, or action.

The normative chain is:

`Target Fit Assessment + accepted Deliberation Policy Claim + purpose-bound condition Assessments -> Deliberation Eligibility Assessment`

The Profile adds no Core Opportunity, Need, or Deliberation primitive. Policy is an ordinary immutable Claim; the Assessment is a Profile-local artifact.

## Why This Layer Exists

An applicable target can be unsatisfied without deserving an Agent interruption. The gap may be transient, trivial under household policy, already raised, intentionally tolerated, private to another person, covered by an existing adopted Intent, or unsafe to disclose. Conversely, a user may explicitly ask for change even when no current gap exists.

Target Fit therefore cannot create a candidate household commitment by itself. Deliberation Eligibility records why one proactive issue may be considered while preserving household control and attention.

## Deliberation Policy Claim

A Deliberation Policy Claim has the target Claim identifier as proposition subject and this predicate:

`https://homeworldmodel.org/spec/profiles/deliberation-eligibility/v0.1#mayRaiseForDeliberationWhen`

Its object declares:

- accepted Target Fit results, normally `not_satisfied` and optionally `partially_satisfied`;
- `all_of`, `any_of`, or explicit `unconditional_after_gap` condition logic;
- exact external condition queries and expected results;
- deduplication/cooldown scope;
- requester, beneficiary, disclosure, and purpose constraints; and
- whether an existing Intent or open deliberation suppresses a duplicate.

Materiality, persistence, cost sensitivity, user availability, accessibility, or other criteria remain in declared external Assessments. HWM defines no universal annoyance, urgency, value, or utility score. Missing policy never means unconditional eligibility.

## Result

The result is:

- `eligible`: the exact target gap and accepted policy qualify, and the declared conditions conclusively pass;
- `not_eligible`: the fit result is explicitly outside policy, a condition conclusively fails, or an exact duplicate/cooldown rule suppresses it;
- `indeterminate`: bindings, standing, access, freshness, coverage, identity, time, or condition evidence are inconclusive.

`eligible` means only “may enter an authorized deliberation queue for this purpose.” It does not authorize a notification, reveal private evidence, create or adopt an Intent, choose a Plan, make an Action Proposal, or dispatch a command. A separate interaction/notification policy governs whether, when, where, and to whom anything is surfaced.

## Path Boundaries

- **Explicit user request:** may directly author a candidate Intent Definition; it does not need proactive-gap eligibility, but adoption and action authorization remain separate.
- **Agent-detected gap:** uses this Profile before proactive issue-raising.
- **Existing adopted Intent drift:** updates fulfillment assurance and existing work; it is not silently reclassified as a new opportunity.
- **Routine occurrence:** follows Routine Instantiation against an already adopted persistent Intent.
- **Emergency or mandatory safety duty:** follows an explicit Authority/safety procedure; this Profile neither creates nor blocks that duty.

An eligible Assessment may be included in an Agent-authored candidate Intent Definition's `basis_bindings`. The candidate remains `proposed`; Authority must separately adopt it. A deliberation may also end with “tolerate”, “defer”, “do not ask again”, a corrected target, or no Intent.

The optional [Deliberation Closure Profile](../../deliberation-closure/v0.1/README.md) records those endings as a receipt over independently effective artifacts. Eligibility is not consumed or rewritten by closure.

## Invariants

1. Target gap, Need attribution, deliberation eligibility, candidate Intent, adoption, notification, and action are separate.
2. `not_satisfied` alone never means `eligible`.
3. Missing, denied, stale, contested, partial, or mismatched inputs are indeterminate, not eligible.
4. A policy is independently accepted and content-bound.
5. Eligibility is purpose-, subject-, time-, World View-, and Authority-bound.
6. Deduplication suppresses repeated raising without erasing the underlying gap.
7. Eligibility never discloses hidden evidence or participant identity.
8. Eligibility does not establish feasibility, benefit, priority, urgency, or a preferred method.
9. An explicit user request is not retroactively described as an Agent-detected Need.
10. Existing Intent drift and new proactive deliberation remain distinct.
11. No result grants notification, Intent adoption, Task, Proposal, Authorization, or action.

## Research and Standards Boundary

- [RFC 9315](https://www.rfc-editor.org/rfc/rfc9315.html) separates declarative intent from its handling and lifecycle; HWM adds a household-specific pre-adoption boundary.
- [Cohen and Levesque](https://doi.org/10.1016/0004-3702(90)90055-5) and [Rao and Georgeff](https://users.cs.utah.edu/~tch/notes/refs/Rao-Georgeff1995.pdf) motivate separating goals/desires, deliberation, and committed intentions.
- [PROV-O](https://www.w3.org/TR/prov-o/) supports attributed derivation and agent association; provenance does not confer household Authority.
- Empirical work on [automation bias in AI decision support](https://pubmed.ncbi.nlm.nih.gov/39234734/) motivates keeping machine-raised issues inspectable and non-self-adopting; it does not define this contract.

## Executable Evidence

The [Deliberation Eligibility oracle](../../../../conformance/scenarios/deliberation-eligibility-v0.1/README.md) tests proactive gaps, explicit requests, duplicates, existing Intent drift, privacy, missing policy, fit uncertainty, safety routing, and forbidden downstream inferences. The [`Assessment schema`](deliberation-eligibility-assessment.schema.json) fixes the minimum exchange boundary.

## Non-goals

This Profile does not infer human mental state, rank household members, calculate universal utility, prescribe notification UX, decide emergency duties, recommend a device, plan work, or authorize action.
