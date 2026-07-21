# HWM Reusable Value Rule Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`value-rule-definition.schema.json`](value-rule-definition.schema.json), [`value-rule-state.schema.json`](value-rule-state.schema.json), [`value-rule-use-assessment.schema.json`](value-rule-use-assessment.schema.json)

## Purpose

This optional Profile lets a household reuse an explicitly accepted value relation so an Agent need not repeat the same [Value Clarification Dialogue](../../value-clarification-dialogue/v0.1/README.md) in every matching decision. The rule remains scoped, reviewable, pausable, revocable, and purpose-specific.

A Reusable Value Rule is not an observed habit, psychological trait, universal weight, household consensus, Intent, Routine, product Selection, or Action Authorization.

The normative chain is:

`scoped accepted Value Claims and/or explicit request -> candidate Rule Definition -> Authority activation -> exact-use Assessment -> comparison input or clarification required`

## Model boundary

1. A response, choice, click, or behavior Record describes one occurrence.
2. A scoped Value Claim states one attributed relation under declared conditions.
3. A pattern may summarize repeated Claims but remains evidence for a proposal.
4. A Value Rule Definition declares a reusable relation, context, purpose, decision domain, review/expiry policy, and exceptions.
5. Value Rule State records whether Authority has made the exact Definition `active`, `paused`, `retired`, `superseded`, `contested`, or `indeterminate`.
6. A Value Rule Use Assessment determines whether that exact active Definition applies to one exact comparison.
7. The comparison may then use the rule as an attributed value input; it still does not select or authorize anything.

## Identity and revision

One rule lineage fixes:

`household + represented subject/Authority scope + decision domain + value-relation kind + target/option scope + purpose`

Changing any identity-basis element requires a new `rule_id`. Refining thresholds, context conditions, exception sets, validity, review schedule, explanation, or evidence provenance creates a sequential immutable Definition revision bound to its exact predecessor. A revision is not active until its own Authority transition is recorded; activation of revision 1 never carries silently to revision 2.

A personal rule cannot be widened into a household rule. A lighting-design rule cannot silently govern climate operation. A catalog-screening rule cannot silently govern purchase or automation.

## Definition

A Definition binds:

- exact subject/representation scope;
- decision domain, purpose, and value relation;
- target, option, property, or comparison-rule scope;
- an external contextual applicability specification;
- explicit exceptions and override paths;
- valid interval, review deadline/frequency, and expiry behavior;
- source Value Claims, dialogue responses, requests, or other provenance;
- disclosure, minimization, and explanation requirements; and
- limitations and downstream effects.

An Agent-generated generalization must remain marked `proposed`. Repetition count, prediction confidence, model fit, click frequency, or absence of objection cannot activate it.

## Lifecycle

- `active` requires a content-bound Authority decision over the exact Definition revision.
- `paused` stops new use without deleting the Definition or source Claims.
- `retired` permanently stops new use in that lineage.
- `superseded` stops new use and binds the successor Definition/rule.
- `contested` stops silent use until the declared governance process resolves it.
- reactivation requires a new Authority transition and does not retroactively validate decisions made while paused.

Every State is an immutable revision. Revision 1 has no predecessor; each later State binds the exact predecessor digest, its own `as_of`, and the Authority decision that caused the transition. Two different canonical States with the same identity/revision are an integrity conflict. Competing successors are contested; revision number or recording time never selects a winner by itself.

Revocation propagation may not be instantaneous for offline Agents. A deployment must expose state freshness and bound stale-use risk by lease/validity policy; it must not claim zero revocation latency.

## Exact-use assessment

Every use binds the exact Rule Definition and State, current comparison matrix/assessment, contextual condition Assessments, purpose, subject, time, Authority Epoch, disclosure policy, and evidence access.

The applicability result is `applicable`, `not_applicable`, or `indeterminate`. The reuse decision is:

- `may_use_and_suppress_equivalent_question`: the rule conclusively applies and resolves the same value relation;
- `clarification_required`: no current rule conclusively resolves it, or a declared exception requires fresh input;
- `must_not_use`: state, authorization, purpose, subject, or policy conclusively excludes use; or
- `indeterminate`: missing, stale, conflicting, inaccessible, or uncertain inputs prevent a safe result.

Unknown context is not false and not applicable. Multiple active rules that prescribe incompatible relations are `indeterminate`; timestamps, confidence, revision number, or frequency do not choose a winner unless an accepted conflict policy explicitly does so.

Suppressing an equivalent question is local to the exact comparison need. It does not suppress unrelated questions, disclosures required by policy, periodic review, correction, or an affected person's right to participate.

## Drift, review, and correction

A surprising new response or choice is evidence of possible context change, exception, or drift. It does not immediately rewrite or revoke the rule. A Drift/Review Assessment may recommend `retain`, `narrow`, `pause`, `supersede`, `retire`, or `clarify`; Authority performs the actual transition.

Review overdue or expired rules do not continue silently. Historical uses remain auditable. Deleting raw interaction data under policy does not strengthen the rule and may make future review indeterminate if necessary provenance is unavailable.

## Invariants

1. Occurrence, Value Claim, pattern, Rule Definition, activation, applicability, and use remain separate.
2. Repetition never self-activates or broadens a rule.
3. Rule identity fixes subject, domain, relation, target scope, and purpose.
4. Each Definition revision requires its own activation.
5. Personal rules never become household consensus implicitly.
6. Active does not mean applicable to every context.
7. Unknown, stale, conflicted, or inaccessible inputs do not permit silent reuse.
8. Paused, retired, superseded, contested, expired, or unauthorized rules cannot govern new use.
9. One exception does not rewrite history or prove universal drift.
10. Conflict is not resolved by recency, frequency, or model confidence by default.
11. Question suppression is exact and does not remove participation or review rights.
12. Rule use creates no Selection, purchase, installation, Intent, Task, or Action Authorization.

## Conformance

The [Reusable Value Rule oracle](../../../../conformance/scenarios/reusable-value-rule-v0.1/README.md) tests identity, activation, context, expiry, review, exceptions, conflicting rules, drift, suppression scope, and downstream boundaries.

```sh
node conformance/scenarios/reusable-value-rule-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
