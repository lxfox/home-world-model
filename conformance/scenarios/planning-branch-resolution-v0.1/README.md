# Planning Branch Resolution v0.1

- Status: Executable Adversarial Fixture
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

This fixture tests four Renovation Planning Profile behaviors without defining a recommendation algorithm.

## Selection Revision

Each completed Schema.org `ChooseAction` remains an immutable historical event. The action generates or supports a selection-state Claim. A later selection-state Claim MAY use `dcterms:replaces` to supersede the earlier state for current resolution; it does not erase the earlier Claim or action.

[`selection-revision.external.jsonld`](selection-revision.external.jsonld) makes this external binding executable with Schema.org, PROV-O, and DCMI terms and contains no `hwm-planning:` predicate.

At a requested `as_of`, the resolver considers only issued selection Claims at or before that time. A single unreplaced head is accepted as current. Multiple unreplaced heads are conflicting. A replacement cycle is an integrity conflict. A missing replacement target is indeterminate rather than silently accepted.

The fixture deliberately changes the household choice from option A to option B even though the package's advisory comparison preferred A and option B failed the simulated requirement. This proves that recommendation, requirement evaluation, and household choice are independent assertions. Neither choice implies purchase, authorization, installation, or dispatch.

## Recommendation Admission

The Profile does not decide which option is best. An external comparator supplies `proposed_recommendation_id`; this oracle only determines whether that output may be admitted.

A comparison is ready only when:

1. `context_kind` is `comparison`;
2. `input_context_ids` is a duplicate-free closed set;
3. every declared input has exactly one resolution and no undeclared input is present;
4. every input is `available`, `accepted`, `current`, temporally `in_effect` or `unbounded`, and `applicable`.

Missing, unavailable, stale, contested, expired, or conflicting input makes the result `indeterminate` and emits no recommendation. A malformed or cross-branch context is `invalid_context` and also emits no recommendation. The cases include a valid three-option comparison, demonstrating that the rule is cardinality-independent.

These are Renovation Planning Profile rules, not new HWM Core statuses. `input_resolutions` are compact admission summaries of conforming World View resolutions, not standalone World Views. The oracle reuses the existing axes and keeps their meanings orthogonal; in particular, `unbounded` is temporally admissible and must not be confused with `indeterminate`.

## Base Dependency Closure

A Design Option is conforming only when it has exactly one explicit `prov:wasDerivedFrom` edge to a base-design context. The dependency oracle distinguishes:

- `invalid_context`: the link is missing, ambiguous, points to the wrong kind, or revision lineage is structurally invalid;
- `indeterminate`: the link exists but the base is missing, source-unavailable, access-denied, payload-deleted, unaccepted, or not current;
- `historical_only`: the intact option still closes over an available but non-current base;
- `ready`: the option and its single current base root are admissible for current derivation.

All candidate outputs remain preserved as immutable history in `package_preserved_output_ids`. This is a package-retention assertion, never a World View disclosure list. Only outputs bound to the exact current option revision may enter `admitted_current_output_ids`; Authority still determines whether even those identifiers or values may be disclosed.

## Revision and Shared Root

[`base-revision.external.jsonld`](base-revision.external.jsonld) uses only PROV-O terms. Base r3 is a `prov:wasRevisionOf` base r2; option A r2 is both a revision of option A r1 and a fresh derivation from base r3. A new simulation Activity uses the rebased option and generates a new result. The old result is not carried forward.

For a current recommendation, every comparison branch must have a `ready` dependency closure and the same current base root. Comparing branches rooted in different base revisions is `invalid_context`; a missing, historical-only, or indeterminate closure emits no recommendation. Layout alternatives remain expressible by placing them beneath an explicitly shared higher-level base.

Run:

```sh
node conformance/scenarios/planning-branch-resolution-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The fixture currently contains 5 selection cases, 11 status-admission cases, 10 base-dependency cases, and 5 comparison-lineage cases. It uses synthetic identifiers and outcomes and demonstrates deterministic boundary behavior, not product fitness or a ranking algorithm.
