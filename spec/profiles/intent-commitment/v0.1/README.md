# HWM Intent Commitment Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile distinguishes a desired outcome from a household commitment to pursue it. It lets an Agent exchange a declarative Intent without treating a preference, request, inferred need, Plan, Task, or permission as that Intent.

An HWM Intent is an Authority-mediated, revisioned household commitment around a declarative set of expectations. The household retains the commitment when an Agent changes. The Profile adds no Core primitive.

## Model Boundary

1. **Observation or utterance** records what occurred or was said. “It is cold” does not state an Intent.
2. **Preference** states what one subject tends to favor. It remains subject-scoped.
3. **Goal, Requirement, or Constraint Claim** declares a desired condition, threshold, or limit. It is content, not commitment.
4. **Intent Definition** packages declarative expectations: what outcome should be pursued, never the implementation method.
5. **Intent Commitment State** records whether Authority has adopted, suspended, retracted, or superseded the exact Definition.
6. **Fulfillment State** independently assesses current outcome evidence.
7. **Task** is bounded work derived for one exact Intent Definition revision.
8. **Plan** is a method; **Proposal** is an exact action candidate; **Authorization** determines whether that Proposal may proceed.

An Agent may author or infer a candidate Definition. It cannot adopt its own candidate on behalf of the household. World View acceptance, user identity, key control, a recurring pattern, and a natural-language imperative do not replace the Authority decision.

After adoption, the optional [Work Realization Routing Profile](../../work-realization-routing/v0.1/README.md) decides whether one exact realization needs durable Task lineage or may proceed to one bounded Proposal candidate. Adoption itself selects neither route.

The optional [Contextual Applicability Profile](../../contextual-applicability/v0.1/README.md) may establish that an accepted Preference, Goal, Requirement, or Constraint should be considered in one exact situation. `applicable` still does not create a candidate Definition or adopt an Intent; applicability, target satisfaction, conflict, and commitment remain separate.

For an Agent-detected target gap, the optional [Deliberation Eligibility Profile](../../deliberation-eligibility/v0.1/README.md) may establish that the issue may enter a governed deliberation queue. It is optional basis for proactive candidate authorship, not adoption or notification permission. An explicit user request uses the direct candidate path and is not reclassified as an Agent-inferred Need.

## Artifacts

- [`intent-definition.schema.json`](intent-definition.schema.json) binds Intent lineage, stable identity basis, declarative expectations, evidence/context basis, and explicit expectation lineage across revisions.
- [`intent-state.schema.json`](intent-state.schema.json) keeps commitment status and fulfillment status as orthogonal axes, bound to an exact Definition, Authority decision, evidence, tasks, time, and Epoch.

## Identity and Definition Revision

Intent identity is a household-controlled lineage. Its immutable identity basis is:

`household + purpose + transient/persistent lifecycle + beneficiaries + scope`

Expectations may be refined, relaxed, corrected, or restated within that lineage only when:

- the revision is sequential and binds the exact prior Definition;
- the identity basis is unchanged;
- an Authority continuity decision binds the old and new content;
- expectation lineage covers the old and new expectations; and
- at least one expectation is preserved, refined, relaxed, or corrected.

Replacing every prior expectation with unrelated new expectations is a new Intent, even if an actor reuses the old identifier. A changed household, purpose, lifecycle kind, beneficiary set, or scope also creates a new Intent.

A new Definition revision does not silently retarget existing Tasks. Each Task binds an exact Intent Definition digest. Work for changed expectations requires a new Task or an explicit Task transition.

## Commitment and Fulfillment

The two state axes MUST remain separate:

- `commitment_status`: `proposed`, `adopted`, `suspended`, `retracted`, `superseded`, or `indeterminate`;
- `fulfillment_status`: `not_evaluated`, `not_started`, `ongoing`, `fulfilled`, `not_fulfilled`, `degraded`, or `indeterminate`.

`adopted` requires an Authority decision over the exact Definition. `suspended`, `retracted`, and `superseded` require a content-bound Authority transition and Record. Supersession also binds a new Intent.

`fulfilled` requires evidence that every mandatory expectation is satisfied. For a persistent Intent, fulfillment is a current compliance snapshot; drift can produce a later `degraded` or `not_fulfilled` assessment without rewriting the earlier result. Retraction does not prove failure, erase evidence, cancel Tasks, or revoke Action Authorizations by implication.

## Multiple People and Conflict

Personal preferences, candidate Intent Definitions, and adopted household Intents may coexist. Conflict is preserved as a separate assessment. HWM defines no universal priority score, majority vote, preference merge, or utility function. Authority and the relevant coordination Profile decide what process applies; an Agent cannot synthesize a household Intent from several people’s preferences.

A pet’s observed behavior or inferred need is not represented as the pet issuing a human-like Intent. A caretaker may issue a welfare Goal or Requirement with explicit attribution and Authority.

## Recurrence

A Routine is an Authority-activated Task instantiation policy, not automatically a persistent Intent. A persistent Intent can be advanced by many Tasks while it remains adopted. A Routine may propose candidate Intent content, but it cannot instantiate or adopt an Intent. It may materialize a Task only through the explicit [Routine Instantiation Profile](../../routine-instantiation/v0.1/README.md); observed repetition alone creates neither commitment nor activation.

## Standards Reuse and Boundaries

- [RFC 9315](https://www.rfc-editor.org/rfc/rfc9315.html) supplies the declarative “what, not how” boundary, fulfillment/assurance split, and an Intent lifecycle with refinement and retraction.
- [RFC 9316](https://www.rfc-editor.org/rfc/rfc9316.html) supplies scope, conflict awareness, and transient versus persistent classification.
- [TM Forum TMF921](https://www.tmforum.org/open-digital-architecture/open-apis/intent-management-api-TMF921/v5.0) supplies the owner/handler interaction and separate Intent reporting concept. HWM does not adopt its telecommunications ontology as household vocabulary.
- [W3C PROV-O](https://www.w3.org/TR/prov-o/) supplies revision, derivation, generation, invalidation, and Plan provenance.
- [W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies policy, permission, prohibition, duty, party, and constraint semantics for Authority mappings. Intent adoption remains distinct from Action permission.
- Cohen and Levesque’s [“Intention Is Choice with Commitment”](https://doi.org/10.1016/0004-3702(90)90055-5) motivates the distinction between a desire and a persistent chosen commitment; it is research rationale, not a wire format.

The Profile does not standardize human psychology, infer private mental state, prescribe a planner, define universal household governance, or replace a workflow or policy engine.

## Invariants

1. Utterance, Preference, Goal Claim, candidate Definition, adopted Intent, fulfillment, Task, Plan, Proposal, and Authorization remain distinct.
2. Intent is declarative and does not encode the method or device command.
3. An Agent can propose but cannot self-adopt a household Intent.
4. Adoption and fulfillment are orthogonal and append-only.
5. Definition revision requires exact prior-content, Authority, identity-basis, and expectation-lineage continuity.
6. An unrelated expectation replacement or identity-basis change creates a new Intent.
7. Definition revision never silently retargets Tasks.
8. Conflict does not synthesize priority, voting, merged preference, or permission.
9. Persistent fulfillment is time-bound assurance, not permanent success.
10. Suspension, retraction, supersession, and fulfillment do not implicitly cancel Tasks or revoke/issue Action Authorization.

## Fixture and Validation

```sh
node conformance/scenarios/intent-commitment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The fixture uses simulated Authority and proof results. It demonstrates falsifiable boundaries, not community adoption or production security.
