# HWM Bounded Impact Closure Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- License: CC BY 4.0
- Schema: [`coverage-policy.schema.json`](coverage-policy.schema.json)

## Purpose

This optional Profile checks whether one exact Action Proposal revision has the impact reports required by a named Authority policy. It returns bounded coverage, not a universal list of everyone or everything affected.

The Profile deliberately separates two operations:

1. impact procedures report descriptive paths from a proposed action to entities, resources, properties, or privacy-preserving handles;
2. Authority policy determines whether an impact creates confirmation, rejection, notification, representation, safety, or other Duties.

An Agent Planner may consume the result but cannot generate its own participation entitlement.

## Inputs

A coverage request binds:

- Proposal identifier and immutable revision, action type, purpose, effect domains, spaces, risk level, and predicted horizon;
- decision time and verifier Authority Epoch;
- exact coverage policy identifier;
- zero or more channel reports.

Each report binds:

- report identifier, Proposal identifier and revision, channel, and declared procedure;
- assessment time and the half-open horizon it covers;
- coverage status: `complete_for_channel`, `partial`, or `unavailable`;
- zero or more impact entries with a stable identifier, entity kind, impact status, optional entity reference or opaque subject handle, and basis references;
- limitations and Profile extensions.

The fixture evaluator accepts one current report for each required channel. A production binding MUST also authenticate report provenance, integrity, authorization, and disclosure.

## Coverage Policy

The policy uses `only_one_applicable`. Each rule declares Proposal selectors, maximum proposal horizon, required channel identifiers, one approved procedure per channel, maximum report age, validity, and extensions.

Channel identifiers are policy-local. Their labels do not form a universal ontology and do not imply rights. Procedures may reuse SOSA/SSN, BOT, Brick, DPV, PROV-O, domain simulation artifacts, or local models.

## Evaluation

For the one applicable rule, the evaluator:

1. verifies Authority Epoch direction and policy proof support;
2. rejects a Proposal horizon exceeding the rule maximum as `partial`;
3. selects reports bound to the exact Proposal revision, required channel, approved procedure, current decision time, freshness limit, and a horizon that contains the Proposal horizon;
4. returns `partial` if any required channel lacks a conforming `complete_for_channel` report;
5. returns `indeterminate` for policy ambiguity, duplicate current reports for one channel, or conflicting reuse of one impact identifier;
6. otherwise returns `complete_for_declared_channels` and preserves the channel-specific impact entries.

Wrong-revision, wrong-procedure, stale, future, and horizon-insufficient reports are retained as historical inputs but do not satisfy coverage.

## Results

| Status | Meaning |
| --- | --- |
| `complete_for_declared_channels` | every channel declared by the applicable rule has one conforming complete report |
| `partial` | one or more declared channels or horizons are missing, unavailable, incomplete, stale, or otherwise not covered |
| `indeterminate` | policy, Authority, or report integrity prevents unique evaluation |

The result exposes matched rules, covered and missing channels, retained impact entry identifiers, and reason codes. It intentionally has no `participant_ids`, `consent`, `vote`, or `authorization` field.

## Privacy

An impact entry MAY disclose an Authority-scoped opaque handle instead of a person identifier. The handle can later be resolved inside an authorized Authority service that emits only the opaque procedural slots needed by downstream evaluators.

An unavailable privacy report, redacted subject, hidden count, or denied identity lookup is incomplete coverage, never proof that no privacy subject exists. Even counts may reveal household presence and therefore remain Authority-governed disclosure.

## Composition with Coordination

```text
Bounded Impact Closure Assessment
  + Authority Impact Procedure Mapping
  = heterogeneous Procedural Requirements and opaque slots

Procedural Requirements and opaque slots
  + Proposal-bound response, delivery, review, and audit Records
  + Shared Action Coordination policy
  = Coordination Assessment
```

Shared Action Coordination MUST NOT copy impact entries directly into its affected-subject set without the Authority mapping step. The [Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.md) defines that step; Shared Action Coordination v0.1 preserves only its homogeneous direct-response compatibility subset.

## Standards Reuse and Maturity

- [SOSA/SSN 2023 Edition](https://www.w3.org/TR/vocab-ssn-2023/) supplies Actuation, Feature of Interest, Property, Procedure, and Execution semantics. The 2023 edition is currently a W3C Working Draft; deployments requiring Recommendation stability may use the 2017 Recommendation subset.
- [PROV-O](https://www.w3.org/TR/prov-o/) supplies Entity, Activity, Agent, Plan, generation, use, revision, influence, and attribution provenance.
- [BOT](https://w3c-lbd-cg.github.io/bot/) supplies lightweight building zones, spaces, elements, containment, adjacency, and intersection. It is a W3C Community Group product.
- [Brick](https://docs.brickschema.org/brick/relationships.html) supplies building assets, locations, points, systems, and operational relationships.
- [DPV](https://www.w3.org/community/reports/dpvcg/CG-FINAL-dpv-20240801/) supplies privacy processing, data-subject, impact-assessment, risk, and rights vocabulary. It is a W3C Community Group Final Report, not a W3C Recommendation.

None of these sources defines household participation entitlement or proves global impact completeness.

## Non-goals

This Profile does not define a universal impact graph, fixed channel taxonomy, physical simulator, legal analysis, biometric presence, household membership, guardianship, fairness, consent, voting, risk acceptance, or final authorization.

## Executable Evidence

The [Bounded Impact Closure scenario](../../../../conformance/scenarios/bounded-impact-closure-v0.1/README.md) covers missing channels, unavailable and partial reports, exact Proposal revision, procedure binding, report freshness, horizon coverage, policy ambiguity, Authority Epoch, duplicate reports, identifier conflicts, pets, remote privacy subjects, opaque handles, presence, and empty complete channels.

JavaScript and Python independently reproduce the fixture. They are two implementations produced by this project, not independent community consensus.

## Validation

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/bounded-impact-closure/v0.1/coverage-policy.schema.json \
  -d conformance/scenarios/bounded-impact-closure-v0.1/coverage-policy.json

node conformance/scenarios/bounded-impact-closure-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
