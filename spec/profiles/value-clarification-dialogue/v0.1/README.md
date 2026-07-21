# HWM Value Clarification Dialogue Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`clarification-question-proposal.schema.json`](clarification-question-proposal.schema.json), [`value-response-interpretation.schema.json`](value-response-interpretation.schema.json)

## Purpose

This optional Profile lets an Agent ask a minimal, decision-relevant question when a [Multi-Target Option Comparison](../../multi-target-option-comparison/v0.1/README.md) leaves multiple non-dominated or incomparable options. It constrains how the answer may become a scoped candidate Value Claim without treating one response, click, or observed behavior as a permanent preference.

It is value **clarification**, not unrestricted preference learning, psychological profiling, social choice, notification permission, household commitment, product selection, or action authorization.

The normative chain is:

`tradeoff Assessment + unresolved relation + accepted dialogue/attention policy -> Question Proposal -> separately authorized delivery -> exact Response Record -> Interpretation Assessment -> candidate Value Claim -> separate acceptance -> revised comparison`

## Question eligibility

A Question Proposal binds the exact comparison matrix and assessment revisions, unresolved options/targets, intended responder or role, purpose, expiry, and Authority Epoch. It declares:

- the exact value relation it seeks to clarify;
- an influence assessment showing which possible answers could change the non-dominated set, Recommendation eligibility, or next planning step;
- answer meanings and their bounded consequences;
- disclosed option differences and material uncertainty;
- burden, cooldown, duplication, accessibility, privacy, and disclosure status;
- neutral wording and order/anchoring controls; and
- explicit `defer`, `cannot_tell`, and `reject_premise` paths.

A question that cannot change any declared downstream decision is `not_decision_relevant`. That does not make it valueless in every human conversation; it only makes it ineligible for this decision-clarification mechanism.

Decision relevance does not grant interruption or delivery permission. An accepted attention/interaction policy separately governs when, where, and to whom the question may be surfaced. The Agent must not reveal another person's private target merely to explain a tradeoff.

## Minimal clarification

The Profile does not require a universal information-gain metric. A proposer must show that the question distinguishes at least two currently viable downstream states and that no accepted lower-burden available question distinguishes the same states for the declared purpose. This is a reviewable claim, not proof of psychologically optimal questioning.

Questions should compare concrete consequences under explicit assumptions. They must not use an unexplained synthetic score, false binary, leading default, hidden option, or forced answer. If uncertainty is material, the question presents it rather than collapsing it into certainty.

## Response meanings

Closed meanings include:

- `prefer_left_for_scope`
- `prefer_right_for_scope`
- `indifferent_for_scope`
- `accept_declared_tradeoff_rule`
- `defer`
- `cannot_tell`
- `reject_premise`
- `correct_scope_or_options`

Natural language may be used, but a conclusive interpretation requires an exact recoverable question/answer binding. Silence, timeout, dismissal, channel failure, or inaccessible response is not indifference, rejection, or preference.

## Interpretation boundary

A Value Response Interpretation binds the exact Question Proposal revision and Response Record. It verifies respondent/representation authority, evidence standing, response time, question currency, meaning recovery, scope, purpose, and disclosure authorization.

Its result is:

- `candidate_value_claim_eligible`: an exact scoped candidate Claim may be authored;
- `no_value_claim`: the response defers, cannot tell, or provides no value ordering;
- `question_revision_required`: the premise, options, or scope was corrected;
- `not_eligible`: the response is unauthorized, expired, coerced/invalid under policy, or out of scope; or
- `indeterminate`: binding or evidence is inconclusive.

The candidate Claim retains respondent attribution, target/options, relation, context, purpose, validity interval, question/response provenance, and limitations. It is not accepted merely because the respondent answered. Existing Authority and Resolver rules decide whether it governs a later comparison.

## Learning and correction

Repeated scoped answers may support an attributed pattern or a proposal for a broader rule. They do not automatically prove a stable preference, universal weight, identity trait, or permission to profile. A broader rule requires an explicit question and separate acceptance. Contradictory answers at different times or contexts may both be valid; they do not require last-writer-wins.

Correction creates a new Claim or question revision and preserves history. A later accepted value rule can change a Recommendation result but does not rewrite the earlier tradeoff Assessment.

## Invariants

1. Decision relevance, queue eligibility, delivery permission, response validity, interpretation, Claim creation, Claim acceptance, and use remain separate.
2. A question binds exact matrix/assessment contents and unresolved relation.
3. Every answer meaning has declared bounded consequences and an opt-out path.
4. Silence, timeout, dismissal, or delivery failure is not a preference.
5. One scoped answer is not a permanent or global preference.
6. Behavior and clicks are not explicit value attestations.
7. Repeated answers may propose, but do not automatically accept, a broader rule.
8. Different contexts may legitimately yield different value relations.
9. Personal answers do not synthesize household consensus.
10. Hidden private targets are not disclosed to justify a question.
11. A candidate or accepted value rule does not itself select, purchase, install, or authorize an option.
12. Earlier matrices and responses remain historical after clarification.

## Conformance

The [Value Clarification Dialogue oracle](../../../../conformance/scenarios/value-clarification-dialogue-v0.1/README.md) tests decision relevance, burden, privacy, exact response binding, opt-out meanings, scope, time, authority, broader-rule inference, correction, and downstream boundaries.

```sh
node conformance/scenarios/value-clarification-dialogue-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
