# ADR-012 — Do Not Resolve Household Disagreement as Truth

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-012-do-not-resolve-household-disagreement-as-truth.zh-CN.md`](ADR-012-do-not-resolve-household-disagreement-as-truth.zh-CN.md)
- Related Profile: [`Shared Action Coordination Profile v0.1`](../../spec/profiles/shared-action-coordination/v0.1/README.md)

## Context

Evidence Standing answers whether a Record may participate in resolving a proposition. It does not answer what should happen when admitted inputs disagree.

Three different situations are easily collapsed:

1. two admitted Records support incompatible answers to one descriptive proposition;
2. two residents truthfully state different personal preferences;
3. one proposed action materially affects several subjects and requires a household decision procedure.

Voting over all three would be incoherent. A majority cannot turn conflicting physical evidence into truth. One resident's preference does not become false because another resident prefers something else. A shared action may require consent, delegation, a threshold, a safety veto, or no confirmation at all, depending on an explicit household policy.

## Decision

1. **Epistemic conflict remains epistemic.** Incompatible admitted evidence about one proposition produces `contested`, `unknown`, or another Resolver-defined epistemic result. Response counts do not become truth unless a domain-specific measurement Profile explicitly defines a statistically valid aggregation procedure.
2. **Personal preferences remain subject-scoped.** Two accepted preferences with different subjects may both be true. They become applicability-conflicting only relative to a shared decision context; HWM MUST NOT synthesize an implicit `HouseholdPreference`.
3. **Shared action disagreement is coordination, not resolution.** A proposed action that affects multiple subjects is evaluated under a named Shared Action Coordination policy before final action authorization.
4. A coordination evaluation is bound to one Proposal identifier and revision, purpose, impact scope, affected-subject set, time, and Authority Epoch. It is represented as a Profile-typed Record, not a new Core primitive.
5. The affected-subject set MUST be explicit or derived by a declared, auditable impact procedure. Household membership, camera presence, room ownership labels, or an Agent's guess MUST NOT silently establish participation entitlement.
6. A policy explicitly declares its response rule (`none`, `all`, `any`, or `count`), rejection effect, response validity, delegation rules, applicable actions, impact domains, risk level, and optional emergency condition. HWM defines no default household voting rule.
7. A response binds its actor, represented subject, exact Proposal revision, meaning, time, Authority state, and authorization. An `Accept` or `Reject` event is historical evidence of a response, not a global preference or permanent waiver.
8. Missing required responses produce coordination `pending`, projected as action `confirmation_required`. A blocking rejection produces coordination `rejected`, projected as action `denied`. Unknown affected subjects, ambiguous policy, unavailable delegation, or inaccessible response state produce `indeterminate`.
9. Coordination `satisfied` or `not_required` only allows the Proposal to continue through authorization. It does not itself authorize dispatch, prove safety, resolve preference differences, or predict acceptance of the outcome.
10. Non-overridable local safety denial overrides unanimous confirmation. Conversely, a safety check passing does not manufacture household consent.
11. Emergency bypass is not implicit. It requires a separately matched, bounded policy condition, verified emergency input, and declared audit or notification Duties. It does not rewrite personal preferences or create a reusable general permission.
12. Delegation is explicit, scoped, time-bounded Authority material. An Agent cannot represent an affected subject without such a grant.
13. Historical responses, preference Claims, coordination evaluations, and Authorization Decisions remain append-oriented. A later response or Proposal revision does not erase the earlier decision context.
14. Core remains unchanged.

## Coordination Results

- `not_required`: the one applicable rule declares no human response requirement;
- `pending`: a complete affected-subject set is known, but the declared response rule is not yet satisfied;
- `satisfied`: the declared response rule is satisfied for this exact Proposal revision;
- `rejected`: the declared rejection rule blocks this Proposal;
- `indeterminate`: required policy, impact, identity, delegation, or response information is unavailable or ambiguous.

These are Profile-local coordination results. They do not replace World View epistemic status or Authorization Decision results.

## Composition

```text
accepted subject-scoped preferences
  + explicit Action Proposal and impact analysis
  + affected-subject set
  + exact response Records and delegations
  + named coordination policy
  = Coordination Assessment Record

Coordination Assessment
  + action Permission/Prohibition/Duties
  + local safety
  = Authorization Decision
```

## Standards Boundary

- ODRL Permission Duties can require preconditions and its conflict strategy can combine Permissions and Prohibitions. It does not define interpersonal preference aggregation.
- XACML combining algorithms combine rule or policy decisions, not descriptive evidence or human welfare.
- ActivityStreams `Accept`, `Reject`, `Question`, and `Undo` can project interaction history. `Accept` and `Reject` are distinct events; one does not silently negate the other.
- PROV-O can attribute the coordination Activity, Plan, response Entity, delegation, and generated assessment. Provenance does not decide the policy result.

The residual HWM behavior is exact Proposal binding, Authority mapping from bounded impact entries to system-owned Procedural Requirements, fail-closed response evaluation, and separation from truth and final authorization. Declared-channel impact closure is specified by ADR-013 and heterogeneous procedure mapping by ADR-014.

## Alternatives Considered

### Define majority vote as the household default

Rejected. It has no universal legitimacy, can override subject-specific boundaries, and is meaningless for descriptive evidence.

### Let the Agent optimize a compromise and treat it as consent

Rejected. Optimization may propose an option but cannot create participation entitlement, consent, or authorization.

### Treat all preference conflict as epistemic `contested`

Rejected. Different people can have different accepted preferences without either Claim being epistemically disputed.

### Put coordination inside the Action Planner

Rejected as the interoperable boundary. A Planner may generate compromises, but the household must retain an Agent-independent, auditable policy decision over the exact Proposal.

## Validation Required Before Acceptance

1. Independent implementations reproduce epistemic, preference, coordination, revision, delegation, safety, and emergency boundary cases.
2. Privacy review confirms that affected-subject and response disclosure does not reveal hidden household presence or identity.
3. Household governance review challenges `all`, `any`, `count`, rejection, delegation, and emergency cases without treating them as universal defaults.
4. Production Authority bindings secure policy, response, delegation, Epoch, and audit Records.
