# ADR-013 — Bound Impact Closure to Declared Channels

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-013-bound-impact-closure-to-declared-channels.zh-CN.md`](ADR-013-bound-impact-closure-to-declared-channels.zh-CN.md)
- Related Profile: [`Bounded Impact Closure Profile v0.1`](../../spec/profiles/bounded-impact-closure/v0.1/README.md)

## Context

Before coordinating or authorizing an Action Proposal, a household needs to know what may be affected. That question cannot be answered by one camera frame, household membership, room ownership, or a universal graph traversal. A person may be absent yet affected through thermal dependency, privacy processing, cost, or control rights. A visitor may be present yet outside the material effect path. Pets, future occupant roles, shared resources, and privacy data subjects may be relevant without being able to answer a confirmation request.

The phrase “complete affected-subject set” is therefore unsafe unless its boundary is explicit. No implementation can prove that it found every possible physical, social, legal, economic, privacy, or future impact.

## Decision

1. HWM distinguishes **descriptive impactedness** from **normative participation entitlement**. An impact report may identify an entity or opaque handle on an effect path. Only Authority policy may turn that entry into confirmation, rejection, notification, representation, safety, or other Duties.
2. An impact closure assessment is bound to one immutable Action Proposal identifier and revision, purpose, declared effect domains and spaces, decision time, Authority Epoch, and proposal horizon.
3. A named coverage policy selects exactly one applicable rule. The rule declares required impact channels, an approved procedure for each channel, report freshness, and the horizon that must be covered.
4. Impact channels are Profile-local policy identifiers, not a universal HWM taxonomy. Deployments may use channels such as physical exposure, privacy data, shared resource, control interest, cost allocation, or safety dependency, but the labels alone grant no rights.
5. Channel reports are produced by declared external procedures. HWM validates their binding and coverage; it does not prescribe the simulation, sensing, graph, legal analysis, or model that generated them.
6. `complete_for_declared_channels` means only that every required channel has one current, procedure-conforming report covering the declared horizon. It MUST NOT be shortened semantically to “complete”, “globally impact-free”, or “all affected entities known”.
7. A required report that is missing, stale, unavailable, partial, bound to another Proposal revision, produced by the wrong procedure, or unable to cover the horizon makes coverage `partial`. It MUST NOT be interpreted as an empty impact result.
8. Zero or multiple applicable coverage rules, stale or unavailable Authority state, multiple current reports for one required channel, or conflicting reuse of one impact identifier makes coverage `indeterminate`.
9. A complete channel report may contain zero impact entries. That means the procedure reported no material or possible impacts for that channel and horizon; it does not establish that nobody is affected through another channel or outside the horizon.
10. Presence, household membership, room ownership, and device ownership are inputs a declared procedure may use. None is independently necessary or sufficient for impactedness or participation entitlement.
11. Impact entries preserve their channel and basis. Entries from different channels are not collapsed merely because they refer to the same entity.
12. A report may use an opaque participant handle when identity disclosure is not authorized. `access_denied`, redaction, or inability to disclose a count MUST NOT become “no affected subject”.
13. An Action Proposal revision invalidates previous closure for action use. Reports remain historical Records but must be recomputed or explicitly regenerated for the new revision.
14. Pets, future occupant roles, resources, and opaque subjects may appear in impact reports. Their inclusion MUST NOT imply legal capacity, ability to confirm, household membership, or a specific guardian.
15. The assessment is a Profile-typed Record. Core remains unchanged.

## Composition

```text
exact Action Proposal revision
  + predicted Effect Claims on features and properties
  + declared impact-channel policy and horizon
  + procedure-bound channel reports
  = Bounded Impact Closure Assessment

impact entries
  + Authority Impact Procedure Mapping
  = heterogeneous Procedural Requirements and opaque slots

Procedural Requirements
  + response, delivery, review, and audit Records
  = Procedure Fulfilment Assessment
```

## Result Semantics

- `complete_for_declared_channels`: all and only the declared coverage obligation has been met;
- `partial`: at least one required channel cannot currently establish declared coverage;
- `indeterminate`: policy, Authority, or report integrity prevents a unique evaluation.

These are coverage results, not epistemic truth, action authorization, risk acceptance, legal consent, or a participation decision.

## Standards Boundary

- SOSA/SSN describes Actuations, Features of Interest, Properties, Procedures, and Executions. It does not define household impact closure.
- PROV-O describes how reports and assessments were generated, used, revised, influenced, and attributed. Provenance does not prove completeness.
- BOT and Brick may supply spatial, containment, location, equipment, point, and system topology used by a procedure. Spatial adjacency does not establish material impact or rights.
- DPV may describe personal-data processing, data subjects, impact assessments, risks, and rights. DPV is a W3C Community Group Report rather than a W3C Recommendation, and its vocabulary does not determine HWM Authority policy.

The residual HWM behavior is exact Proposal binding, declared-channel coverage, fail-closed incompleteness, privacy-preserving references, and separation from participation entitlement.

## Alternatives Considered

### Traverse the whole home graph until no new entity is found

Rejected. Closure depends on an undeclared edge vocabulary and can neither bound indirect effects nor prove global completeness.

### Treat everyone present in the affected room as the affected-subject set

Rejected. Presence is neither necessary nor sufficient and excludes remote privacy subjects, pets, shared-resource users, and future roles.

### Let the Planner infer both affected entities and participation rights

Rejected. This lets one replaceable Agent silently expand its own social authority and prevents independent audit.

### Put a fixed impact-channel taxonomy in Core

Rejected. Domains evolve, households differ, and physical, privacy, economic, legal, and safety procedures have different maturity and disclosure needs.

## Validation Required Before Acceptance

1. Independent implementations reproduce revision, procedure, freshness, horizon, missing-channel, duplicate-report, privacy, and identifier-integrity cases.
2. Privacy review challenges identity, presence, count, and opaque-handle disclosure.
3. Domain experts independently define and test at least physical-effect and privacy-impact procedures.
4. Authority review proves that impact entries do not automatically become voting or consent rights.
