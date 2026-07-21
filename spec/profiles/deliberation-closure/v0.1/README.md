# HWM Deliberation Closure Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile closes a bounded household deliberation without making the closure artifact itself the source of a Claim correction, tolerance, deferral, suppression, Intent adoption, or rejection.

The normative pattern is:

`issue basis + interaction Records + separately effective outcome artifacts -> Deliberation Closure Assessment`

The Assessment is a receipt and consistency check. It adds no Core Conversation, Decision, or Deliberation primitive.

## Why Closure Is a Receipt

A single UI answer such as “no” is ambiguous. It might reject one candidate Intent, deny one Action Proposal, refute the Agent's factual premise, tolerate the current mismatch, defer discussion, or request no further prompting. These have different subjects, scopes, durations, Authority, and downstream effects.

The closure artifact therefore never carries a magical `accepted` or `rejected` effect. It binds zero or more independently effective outcome artifacts and reports whether the deliberation is closed consistently.

## Issue Origins

A deliberation binds exactly one opening basis and declares its origin:

- `agent_detected_gap`: a Deliberation Eligibility Assessment;
- `explicit_user_request`: a proposition-bound user Record;
- `existing_intent_review`: an Intent State Assessment or review request;
- `manual_household_deliberation`: an Authority-recognized household Record.

The origin is preserved. A direct user request is never rewritten as an Agent-inferred Need. Existing Intent review does not create a new opportunity by implication.

## Outcome Effects

A closure may bind multiple typed effects:

- `intent_adoption`: exact Intent Definition, Intent State, and Authority Decision;
- `candidate_rejection`: exact candidate and Authority Decision; it does not reject its target Claim;
- `tolerance_claim`: an accepted, scoped, time-bounded Claim that the mismatch is intentionally tolerated; Target Fit remains unchanged;
- `deferral_policy`: an accepted revisit time/trigger policy; deferral is not rejection or indefinite suppression;
- `raising_policy_revision`: an accepted Deliberation Policy revision; it does not retract the target;
- `target_correction`: a qualified new Claim with explicit `supersedes` lineage; history is retained;
- `intent_revision`: an Authority-approved Intent revision with expectation lineage.

Each effect has its own content binding, qualification evidence, Authority scope, valid time, and privacy rules. The closure only records `verified`, `not_effective`, or `indeterminate` for that binding.

## Closure Status

- `resolved`: at least one disclosed outcome effect is `verified`, and every disclosed effect is verified;
- `closed_without_decision`: the interaction ended with no normative outcome effect;
- `expired`: the bounded deliberation window ended with no outcome effect;
- `superseded`: a newly bound deliberation replaces this thread for the same issue under an explicit relation;
- `indeterminate`: issue identity, interaction, coverage, Authority, effect standing, or content binding cannot be established.

`closed_without_decision` and `expired` require an empty effects list. Silence, timeout, a closed UI, or an Agent summary never becomes rejection, tolerance, consent, or suppression.

## Multiple Effects and Atomicity

A deliberation may correct a target and also revise when the Agent may raise it. These remain two effects. If one is effective and the other is indeterminate, the closure is `indeterminate`; the verified effect remains effective through its own artifact and is not rolled back. HWM does not claim cross-system transactional atomicity.

The receipt declares effect coverage as `complete` or `partial`. Only complete disclosed coverage can yield `resolved`. Privacy-safe opaque bindings may prove an effect without exposing its content, but cannot leak participant identity or hidden alternatives.

## Invariants

1. Interaction answer, closure, and normative effect are separate.
2. Closure is a receipt, not an Authority source.
3. Candidate rejection does not reject the target Claim or future candidates.
4. Tolerance does not make Target Fit satisfied or retract the target.
5. Deferral does not mean rejection or indefinite suppression.
6. Raising suppression does not erase the target, evidence, or gap.
7. Target correction creates a new Claim and explicit lineage; history is immutable.
8. Intent adoption/revision uses the Intent Profile and exact Authority Decision.
9. Multiple effects remain separately bound and qualified.
10. Silence, timeout, expiry, UI dismissal, and missing evidence produce no consent or rejection.
11. A verified effect remains independently effective even if aggregate closure is indeterminate.
12. Closure grants no notification, planning, Proposal, Authorization, dispatch, or action.

## Standards and Research Boundary

- [Clark and Brennan's grounding work](https://collablab.northwestern.edu/CollabolabDistro/nucmc/ClarkAndBrennan-GroundingInCommunication-1991.pdf) motivates explicit evidence of understanding and repair rather than assuming that an utterance has one effect.
- [Horvitz's mixed-initiative principles](https://www.microsoft.com/en-us/research/publication/mixed-initiative-interaction/) motivate uncertainty-, attention-, and user-control-aware interaction.
- [RFC 9315](https://www.rfc-editor.org/info/rfc9315/) separates user articulation, intent lifecycle, fulfillment, assurance, and reporting.
- [PROV-O](https://www.w3.org/TR/prov-o/) supplies revision, derivation, generation, and invalidation provenance; HWM retains its narrower Claim and Authority rules.

## Executable Evidence

The [Deliberation Closure oracle](../../../../conformance/scenarios/deliberation-closure-v0.1/README.md) tests the seven effect kinds, multi-effect closure, partial coverage, silence, timeout, correction history, and forbidden conflations. The [`Closure Assessment schema`](deliberation-closure-assessment.schema.json) fixes the exchange boundary.

## Non-goals

This Profile does not standardize dialogue acts, infer mental state, prescribe UI, select household governance, make effects transactionally atomic, or authorize action.
