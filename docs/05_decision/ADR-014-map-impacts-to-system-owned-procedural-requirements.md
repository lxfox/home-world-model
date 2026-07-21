# ADR-014 — Map Impacts to System-owned Procedural Requirements

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-014-map-impacts-to-system-owned-procedural-requirements.zh-CN.md`](ADR-014-map-impacts-to-system-owned-procedural-requirements.zh-CN.md)
- Related Profile: [`Impact Procedure Mapping Profile v0.1`](../../spec/profiles/impact-procedure-mapping/v0.1/README.md)

## Context

ADR-013 separates descriptive impactedness from normative participation entitlement. The next boundary is not solved by copying affected entities into one voting set. One Proposal may physically affect a resident, possibly affect a pet, process data about a remote person, consume a shared resource, and alter another resident's control interest. Those impacts may legitimately trigger different procedures.

The existing Shared Action Coordination fixture assumes one homogeneous response rule over one affected-subject set. That is useful as a simple projection, but it cannot express mixed requirements such as affirmative response, consultation opportunity, objection window, notification, representative routing, qualified review, and audit without silently treating unlike procedures as votes.

There is also a direction-of-duty problem. A resident who is asked for a response is not obligated to answer. The system seeking permission to act is responsible for obtaining the required response or respecting the declared consequence of its absence.

## Decision

1. HWM represents the normative bridge from impact to governance as an **Impact Procedure Mapping**, not an inferred list of voters or consenters.
2. The mapping consumes one `complete_for_declared_channels` Bounded Impact Closure Assessment bound to the exact Proposal identifier and revision. A `partial` or `indeterminate` closure cannot produce an actionable mapping.
3. Every disclosed impact entry MUST match exactly one current Authority mapping rule. Zero or multiple matches are `indeterminate`. Silence is not an implicit “no requirement” rule.
4. Each rule emits zero or more typed **Procedural Requirements**. The baseline kinds are:
   - `affirmative_response`: the action-side service must obtain a Proposal-bound affirmative response;
   - `consultation_opportunity`: the service must deliver a real opportunity to respond, but the affected party is not required to answer;
   - `objection_window`: the service must deliver notice and keep a bounded opportunity for objection open;
   - `notification`: the service must deliver information without treating delivery as acceptance;
   - `qualified_review`: the service must obtain a result from a separately authorized and qualified review procedure;
   - `audit`: the service must append a declared audit Record;
   - `none`: the Authority rule explicitly creates no additional procedure for that impact.
5. A requirement declares its completion signal, timing, failure effect, and negative-signal effect. These are policy choices, not semantics inferred from the impact channel or entity kind.
6. The obligated performer is the coordination, execution, notification, review, or audit service. An affected person is a participant or beneficiary, not a Party forced to answer.
7. Participant identity need not leave Authority. The mapping output MAY expose only a Proposal-scoped opaque participation slot. Responses and delivery receipts bind to that slot; the coordination evaluator need not know the person's identity, household membership, presence, or representative relationship.
8. Representative routing is resolved by Authority policy. A pet, child, future role, or unavailable person MUST NOT cause the Agent to invent a guardian or delegate. Missing, ambiguous, denied, or stale representative routing is `indeterminate`.
9. A participation slot is not a person identifier, membership assertion, identity credential, delegation, or durable role. It MUST NOT be reused across purposes or Proposal revisions unless an explicit privacy-reviewed binding permits that use.
10. Requirements from different impact entries remain distinct unless an explicit Authority coalescing policy merges them. Equality of affected entity references is not enough, because cross-channel equality can leak identity and the procedures may differ.
11. `affirmative_response` is not legal consent, household acceptance, safety proof, or final authorization. `notification` delivery is not agreement. Expiry without objection is not affirmative acceptance or waiver. A qualified review result is not a universal permission.
12. Mapping status is `mapped_for_declared_impacts` or `indeterminate`. The former means all disclosed entries were handled under the declared coverage and mapping policies; it does not mean all possible impacts or legal rights are known.
13. Shared Action Coordination v0.1 remains a compatibility projection for one homogeneous direct-response group. A general coordinator SHOULD consume heterogeneous Procedural Requirements or an explicitly lossless projection of them.
14. Mapping policies are Authority-plane artifacts and cannot be created, widened, or selected by an ordinary Agent Claim.
15. Core remains unchanged.

## Composition

```text
Bounded Impact Closure Assessment
  + exact Proposal revision
  + Authority Impact Procedure Mapping policy
  + privacy-safe route resolution
  = Procedural Requirement Set

Procedural Requirement Set
  + response, delivery, review, and audit Records
  = Procedure Fulfilment Assessment

Procedure Fulfilment Assessment
  + Permission / Prohibition / local safety
  = Authorization Decision
```

## Requirement Semantics

| Kind | System-owned obligation | Must not infer |
| --- | --- | --- |
| `affirmative_response` | obtain a bound affirmative response before the declared gate | legal consent, durable preference, authorization |
| `consultation_opportunity` | deliver an accessible response opportunity | duty to answer, silence as agreement |
| `objection_window` | deliver notice and preserve the window | silence as affirmative acceptance or waiver |
| `notification` | deliver a notice and retain a receipt where allowed | acceptance, identity disclosure |
| `qualified_review` | obtain a scoped review result | universal professional authority, final permission |
| `audit` | append the required audit Record | retroactive authorization |
| `none` | explicitly emit no added procedure for this impact | the entity is unaffected or has no rights outside this policy |

## Failure Semantics

- closure not complete for its declared channels: `indeterminate`;
- Proposal or revision mismatch: `indeterminate`;
- stale or future Authority Epoch: `indeterminate`;
- no or multiple mapping rules for one impact: `indeterminate`;
- required route absent, unavailable, denied, duplicated, or ambiguous: `indeterminate`;
- empty complete closure: `mapped_for_declared_impacts` with no requirements and an explicit empty result;
- explicit `none` rule: impact remains preserved and mapped, with no emitted requirement.

## Standards Boundary

- ODRL supplies Policy, Permission, Prohibition, Duty, Constraint, assigner, assignee, target, action, consequence, and conflict semantics. It requires the Party obligated by a Duty to be able to perform the Duty; HWM therefore places `obtainResponse` on the action-side service rather than forcing the affected person to answer.
- XACML supplies Obligations, Advice, decision combining, and fail-closed `Indeterminate` behavior. HWM Procedural Requirements are obligations, not ignorable advice, when they gate action.
- DPV supplies privacy rights, rights notices, rights exercise, notification, consultation with a data subject or representative, and rule vocabulary. It does not determine household policy or legal applicability.
- PROV-O supplies delegation and provenance. `actedOnBehalfOf` records a declared delegation relation; it does not discover or authorize a guardian.
- ActivityStreams may project Question, Offer, Accept, Reject, and delivery events. Event history does not evaluate the requirement.

The residual HWM behavior is exact impact-to-rule cardinality, Proposal-scoped opaque routing, typed heterogeneous requirement output, and fail-closed separation from authorization.

## Alternatives Considered

### Copy every affected entity into one coordination set

Rejected. It turns resources, pets, privacy subjects, and control interests into one homogeneous voting population and cannot express notification-only or review requirements.

### Treat the affected person as obligated to respond

Rejected. A household system may be obligated to ask or wait; the person remains free not to answer.

### Infer guardian or representative from household role labels

Rejected. Representation requires explicit Authority material and may depend on purpose, action, time, jurisdiction, and capacity.

### Merge requirements whenever the affected entity is equal

Rejected. It leaks cross-channel linkability and can erase distinct physical, privacy, control, and review procedures.

## Validation Required Before Acceptance

1. Independent implementations reproduce mixed requirement, empty closure, explicit-none, rule cardinality, route privacy, Epoch, revision, and representation cases.
2. Privacy review challenges slot linkability, counts, timing, reason text, delivery receipts, and cross-Proposal reuse.
3. Household governance review challenges affirmative response, consultation, objection, notification, silence, and negative-signal effects.
4. Professional and safety review challenges qualified-review routing and confirms that review is not silently converted to authorization.

