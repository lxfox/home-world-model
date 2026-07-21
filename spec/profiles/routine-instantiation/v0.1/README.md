# HWM Routine Instantiation Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile defines the missing boundary between a persistent household Intent and repeatable Tasks. It treats a Routine as an Authority-activated **Task instantiation policy**, not as an observed habit, calendar entry, executable device automation, or permission.

The normative chain is:

`qualified pattern or request → candidate Routine Definition → Authority activation → trigger opportunity → as-of eligibility → occurrence decision → exact Task → Plan → Proposal → Authorization → Attempt`

Only the middle portion is standardized here. The Profile adds no Core primitive and does not define a universal rule language, scheduler, planner, or automation runtime.

## Model Boundary

1. **Observed Pattern Claim** describes repetition inferred from history. It may support a candidate Routine but cannot activate one.
2. **Persistent Intent** states the declarative outcome the household has adopted.
3. **Routine Definition** binds one Intent lineage, purpose, immutable Task scope, external trigger and eligibility specifications, occurrence identity, late-delivery policy, overlap policy, and a Task template.
4. **Routine Activation State** records whether Authority has made the exact Definition `active`, `paused`, `retired`, or `superseded`.
5. **Trigger evidence** creates an evaluation opportunity. It does not prove the eligibility condition or authorize an action.
6. **Instantiation Decision** evaluates one occurrence as of a stated time and either materializes exactly one Task, records a duplicate, or fails closed.
7. **Task** is one bounded work lineage. It still needs its own Plan, Proposal, policy evaluation, Authorization, and Attempt.

An Agent may infer a pattern, author a candidate Routine, or evaluate an active Routine. It cannot activate the Routine, widen its scope, manufacture trigger evidence, treat unknown as false, or dispatch an action merely because a Task was materialized.

## Artifacts

- [`routine-definition.schema.json`](routine-definition.schema.json) binds Routine identity, the exact persistent Intent, external trigger and eligibility specifications, occurrence policy, Task template, delivery policy, and governed revision.
- [`routine-state.schema.json`](routine-state.schema.json) binds activation lifecycle to an exact Definition and Authority Epoch.
- [`instantiation-decision.schema.json`](instantiation-decision.schema.json) binds one occurrence, evidence, World View, condition assessment, late and overlap results, logical deduplication, and the resulting exact Task.

All fixture digests use SHA-256 over RFC 8785 canonical JSON. `unsigned_fixture` is not a production proof mode.

## Identity and Revision

A Routine is a household-controlled policy lineage with this immutable identity basis:

`household + target Intent lineage + purpose + immutable Task scope`

The exact Intent Definition revision, trigger specification, eligibility specification, Task exit criteria, late policy, and overlap policy are revisioned content. They may change within the same Routine only through a sequential exact-prior binding and an Authority continuity decision. A changed household, target Intent ID, purpose, or Task scope requires a new Routine ID.

A Routine revision affects only evaluations performed under that revision. It does not rewrite prior Instantiation Decisions, retarget existing Tasks, change an already materialized occurrence, or apply a new catch-up rule retroactively.

## Activation Is Not Intent or Action Authorization

`activation_status` is `proposed`, `active`, `paused`, `retired`, `superseded`, or `indeterminate`.

- `active` requires an Authority decision over the exact Routine Definition.
- `paused`, `retired`, `superseded`, and reactivation require append-only Authority transitions; supersession also binds the new Routine.
- Pausing or retiring a Routine stops new instantiation. It does not suspend or retract the target Intent, cancel Tasks, revoke Proposals, or alter prior evidence.
- An active Routine is still suppressed when the exact target persistent Intent is not currently `adopted`.

The Profile deliberately requires a persistent target Intent. A recurrence rule does not turn a transient request into a persistent household commitment.

## Trigger, Condition, and Occurrence

A trigger is an evaluation opportunity; an eligibility condition is a purpose-bound assessment of the current World View. The two are separate:

- `not_matched` or `not_satisfied` means the occurrence is not eligible;
- unavailable, conflicting, stale, or otherwise unknown input is `indeterminate`, never silently false or true;
- a Forecast may participate only through a qualified, admitted assessment. It remains a prediction and does not become an observed future fact.

HWM binds external trigger semantics rather than inventing a DSL. iCalendar/JSCalendar, CloudEvents, a rule language, or an implementation-specific trigger artifact can be used when its exact content and semantics URI are bound.

When eligibility depends on a household activity, presence, occupancy aggregate, guest or pet situation, a deployment MAY bind a [`Situational Context Profile`](../../situational-context/v0.1/README.md) Use Assessment. The assessment must use an exact purpose-bound World View and declared subject coverage. A platform `home`/`away` mode, absent event, Forecast, or single-person episode is not a shortcut to household-wide condition truth.

When eligibility also asks whether a Preference, Goal, Requirement, or Constraint is relevant in that situation, a deployment MAY bind a [`Contextual Applicability Profile`](../../contextual-applicability/v0.1/README.md) Assessment. `applicable` is only an eligibility input; it does not mean the target is unsatisfied or create the target Intent, Routine activation, Task, or permission.

For temporal recurrence, the occurrence key preserves the original local recurrence identity and time zone even after rescheduling. For event-driven routines, the occurrence key comes from an Authority-approved correlation policy. A CloudEvents `source + id` pair detects delivery replay; it does not by itself identify the household's logical occurrence. One real-world occurrence may produce several distinct events.

## Late Delivery, Overlap, and Deduplication

No implicit catch-up or concurrency default is interoperable. Each Routine declares:

- `skip`, `latest_only`, or bounded `bounded_each` late handling, with a maximum lateness and catch-up count;
- `independent`, `suppress_while_active`, or `defer_while_active` overlap handling.

Reactivation does not replay the pause interval unless the exact active Definition explicitly admits those occurrences under its bounded late policy. A Routine cannot cancel or supersede a prior Task as an overlap shortcut; that requires the Task's own Authority-bound transition.

The logical materialization key is computed over:

`household + Routine ID + occurrence key`

It is lineage-scoped rather than Definition-revision-scoped, so a retry or a new Routine revision cannot create a second Task for an already materialized occurrence. Same-key/same-Task replay is `duplicate`; same-key/different-Task content is an integrity conflict, not last-writer-wins.

## Task Materialization

A valid `materialized` Decision requires all of the following:

- exact active Routine Definition and current Authority state;
- exact adopted persistent Intent state;
- admitted trigger evidence and a matched trigger;
- satisfied or explicitly unnecessary eligibility;
- admitted late and overlap results;
- a new logical materialization key; and
- a Task whose Intent, Routine, occurrence, purpose, scope, and exit criteria match the exact Definition.

Materialization creates a Task Definition only. It creates no Plan, Proposal, device command, execution Attempt, safety result, or Action Authorization.

## Standards Reuse and Boundaries

- [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html) supplies stable recurring-instance identity: `RECURRENCE-ID` remains the original instance time even when the instance is rescheduled.
- [RFC 8984](https://www.rfc-editor.org/rfc/rfc8984.html) supplies JSON recurrence rules, exclusions, overrides, time zones, and recurring Task representation.
- [CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) supplies transport-neutral event context and delivery-duplicate detection through `source + id`. It explicitly allows one occurrence to produce more than one event, so HWM adds a separate logical occurrence policy.
- [W3C RIF-PRD](https://www.w3.org/TR/rif-prd/) supplies interoperable production-rule condition/action concepts and explicit conflict-resolution semantics. HWM does not adopt its action firing as household authorization.
- [Home Assistant automation documentation](https://www.home-assistant.io/docs/automation/basics/) demonstrates the practical separation of trigger, condition, and action; its [automation modes](https://www.home-assistant.io/docs/automation/modes/) demonstrate that repeat triggers need explicit single/restart/queue/parallel behavior. These are implementation references, not normative HWM vocabulary.
- [W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies policy, party, permission, prohibition, duty, and constraint semantics for Authority projection. Routine activation and Action permission remain distinct.

The Profile does not standardize family habits, human intention recognition, a universal event-correlation algorithm, exactly-once distributed delivery, cron syntax, rule evaluation, device commands, or legal authority.

## Invariants

1. Observed repetition never self-activates a Routine.
2. Persistent Intent, Routine activation, trigger match, eligibility, Task creation, and Action Authorization remain separate.
3. A Routine targets one adopted persistent Intent lineage and one immutable purpose/scope basis.
4. Routine revision is exact, sequential, Authority-controlled, prospective, and append-only.
5. Trigger presence does not establish condition truth; unknown fails closed as `indeterminate`.
6. Event delivery identity is not logical occurrence identity.
7. Temporal rescheduling preserves original recurrence identity.
8. Catch-up and overlap behavior are explicit and bounded; reactivation has no implicit replay.
9. One lineage-scoped materialization key admits at most one exact Task; conflict is never last-writer-wins.
10. Routine pause, retirement, revision, or overlap never silently transitions an existing Task or target Intent.
11. Task materialization creates no Plan, Proposal, dispatch, Attempt, or Authorization.

## Fixture and Validation

```sh
node conformance/scenarios/routine-instantiation-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The oracle is an adversarial semantic fixture. It demonstrates falsifiable boundaries, not community adoption, production scheduling reliability, secure proof handling, or fairness of a household policy.
