# HWM Shared Action Coordination Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0
- Schema: [`coordination-policy.schema.json`](coordination-policy.schema.json)

## Purpose

This optional Profile evaluates one homogeneous group of human response requirements for one exact Action Proposal that may materially affect multiple household subjects. It is a compatibility subset of the heterogeneous [Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.md): it cannot losslessly represent consultation opportunities, objection windows, notification-only, qualified review, audit, or mixed failure effects. It does not aggregate truth, invent a household preference, choose an action, or grant final authorization.

The Profile exists because these are different operations:

- an Evidence Resolver evaluates descriptive Claims and Records;
- a preference View preserves each subject's accepted preference;
- an Agent Planner may generate compromise Proposals;
- a Coordination Evaluator determines whether the Proposal has the responses required by a named household policy;
- a Policy Evaluator still decides final action authorization;
- an execution gateway still applies non-overridable local safety.

## Inputs

A coordination request binds:

- Proposal identifier, immutable revision, action type, purpose, parameters, and decision time;
- Authority Epoch and the exact coordination Policy identifier;
- declared impact domains, spaces, risk level, and emergency state;
- an affected-subject set plus the status and procedure that produced it;
- response Records bound to the Proposal revision;
- any explicit, scoped, time-bounded delegation material;
- local safety status as a separate authorization input.

The affected-subject set is not inferred merely from household membership or observed presence. A deployment MUST identify the impact procedure and Authority procedural mapping that made a response slot relevant to this Proposal. When the Bounded Impact Closure and Impact Procedure Mapping Profiles are used, only a lossless homogeneous direct-response projection may populate this v0.1 set. If the projection is unavailable, contested, or contains heterogeneous requirements, coordination is `indeterminate` or requires a more capable fulfilment Profile.

## Policy Rule

Each rule declares:

- action types, purposes, impact domains, spatial scope, risk levels, and emergency requirement;
- response mode: `none`, `all`, `any`, or `count`;
- the count when required;
- whether an explicit rejection blocks the Proposal or only participates in threshold evaluation;
- response validity duration;
- whether delegation is allowed and which opaque delegate roles are eligible;
- post-action Duties, such as emergency audit or notification;
- half-open validity interval [`from`, `to`).

The baseline uses `only_one_applicable`. Zero or multiple matching rules are `indeterminate`. Rule labels have no universal governance meaning; the household Authority explicitly chooses every rule.

## Responses and Delegation

A response Record carries an actor, represented subject, `confirm`, `reject`, or `abstain` meaning, exact Proposal identifier and revision, issue time, authorization result, and Evidence Standing result for the narrow self-response proposition.

A response counts only when:

1. identity, use authorization, and standing are satisfied;
2. it targets the current Proposal revision;
3. it is within the policy response-validity window;
4. the represented subject is in the affected-subject set;
5. the actor equals that subject, or a matching Authority delegation permits representation for the action, space, role, and time.

An Agent cannot count its own answer for another subject without explicit delegation. An unaffected subject's response is retained as history but does not satisfy the rule.

## Results and Authorization Projection

| Coordination status | Meaning | Authorization gate projection |
| --- | --- | --- |
| `not_required` | one matched rule requires no response | continue policy evaluation |
| `pending` | required responses are missing | `confirmation_required` |
| `satisfied` | exact response rule is met | continue policy evaluation |
| `rejected` | a blocking rejection applies | `denied` |
| `indeterminate` | policy, impact, delegation, or response state is unavailable or ambiguous | `indeterminate` |

After this projection, a local safety denial still returns action `denied`. `continue policy evaluation` is not `allowed` and never authorizes dispatch by itself.

## Epistemic and Preference Boundaries

1. Multiple admitted Records about one descriptive proposition remain an epistemic Resolver problem. Human response thresholds do not resolve it.
2. Preferences whose subjects differ remain separate accepted Claims. Conflict is contextual applicability metadata, not a false preference.
3. A coordination result is about one Proposal revision. It does not create a durable general preference, waive future participation, or prove outcome acceptance.
4. A response to revision 1 does not carry to revision 2 unless a policy explicitly obtains a new bound response. The fixture baseline never carries it forward.
5. `count` is an available policy mechanism, not a recommended or fair universal rule. The Profile preserves who was affected, what rule was declared, and which responses counted.

## Emergency and Safety

An emergency rule matches only when the request has a verified emergency state and all other action, purpose, scope, risk, time, and Authority constraints match. Response mode `none` means ordinary coordination is not required for that exact emergency Proposal. It does not imply action permission. Required emergency audit and notification Duties remain visible.

Unanimous confirmation cannot override a non-overridable local safety denial. A passing safety check cannot satisfy missing coordination responses.

## Standards Reuse

- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies Permission Duties and Policy conflict strategies. Its conflicts are policy-rule conflicts, not household preference aggregation.
- [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-cos01-en.html) supplies decision-combining patterns. The fixture uses only-one-applicable semantics to fail closed on ambiguous coordination policy.
- [ActivityStreams Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) supplies `Question`, `Accept`, `Reject`, and `Undo` projections. Activity history does not itself evaluate a household rule.
- [PROV-O](https://www.w3.org/TR/prov-o/) supplies Activity, Agent, Plan, attribution, generation, revision, and delegation provenance.
- [Bounded Impact Closure Profile](../../bounded-impact-closure/v0.1/README.md) supplies exact-Proposal declared-channel coverage while leaving participation entitlement to Authority.

## Executable Evidence

The [Shared Action Coordination scenario](../../../../conformance/scenarios/shared-action-coordination-v0.1/README.md) covers descriptive evidence conflict, subject-scoped preferences, all/any/count/none policies, blocking rejection, missing and stale responses, unaffected responses, Proposal revision, valid and invalid delegation, Agent self-confirmation, ambiguous rules, incomplete affected-subject sets, emergency scope, and local safety override.

JavaScript and Python independently reproduce the fixture. This is internal implementation diversity, not external household-governance consensus.

## Non-goals

This Profile does not define household membership, room ownership, legal capacity, guardianship, fairness, social choice, welfare optimization, negotiation strategy, biometric presence, universal majority rule, or legal consent.

It also does not evaluate notification delivery, consultation opportunity, objection-window expiry, qualified review, audit completion, or heterogeneous combinations of those procedures.

## Validation

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/shared-action-coordination/v0.1/coordination-policy.schema.json \
  -d conformance/scenarios/shared-action-coordination-v0.1/coordination-policy.json

node conformance/scenarios/shared-action-coordination-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
