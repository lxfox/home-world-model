# HWM Work Realization Routing Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile determines whether one bounded realization of an Authority-adopted Intent needs a durable Task lineage or may proceed directly to one exact Action Proposal candidate.

The normative chain is:

`adopted Intent + accepted Work Routing Policy Claim + exact realization description -> Work Routing Assessment`

The Profile adds no Core Work, Job, or Project primitive. It structures downstream artifacts; it never authorizes action.

## The Boundary Is Durable Work Identity

“Small” and “large” are not interoperable semantics. The decisive question is whether work identity must survive beyond one Proposal and its Action Trace.

- `direct_proposal_eligible`: one exact Proposal can represent the complete bounded realization, and policy requires no durable progress, retry, wait, handoff, recurrence, or independent exit-criteria identity.
- `task_required`: policy requires a durable lineage across one or more Plans, Proposals, Attempts, Agents, waits, retries, handoffs, or independently assessed exit criteria.
- `indeterminate`: the exact Intent, realization scope, policy, work structure, or evidence is inconclusive.

Eligibility for a direct Proposal is not permission to create effects. It only permits omitting a Task Definition for this realization.

## Work Routing Policy Claim

A Work Routing Policy Claim has the exact Intent Definition identifier as proposition subject and this predicate:

`https://homeworldmodel.org/spec/profiles/work-realization-routing/v0.1#realizedUnder`

Its object declares exact routing conditions, including whether durable identity is required for:

- Routine occurrence or scheduled/event correlation;
- multiple independently authorized Proposals;
- retry, resume, catch-up, compensation, or recovery;
- asynchronous wait or external dependency;
- Agent/actor handoff or delegated responsibility;
- progress, cancellation, reopening, split, or merge;
- exit criteria that outlive one Action Trace; or
- policy-required audit or professional workflow.

These are declared policy inputs, not a universal complexity score. Missing policy never defaults to direct routing. An Agent cannot label its own work “atomic” to avoid Task lineage.

## Exact Realization Description

Routing applies to one proposed realization scope, not to the Intent forever. A persistent Intent may use a direct corrective Proposal for one atomic adjustment and Tasks for other work. A transient Intent may still require a Task when it involves delivery, waiting, retries, or handoff.

The description binds household, exact Intent Definition and adopted State, purpose, scope, occurrence, expected work-shape assessments, World View, time, and Authority Epoch. A changed scope or newly discovered durable-work condition requires a new Assessment. It does not mutate an earlier Proposal or Task.

## Mandatory Path Rules

- Every admitted Routine occurrence remains `task_required`, consistent with Routine Instantiation.
- Existing open Task work for the exact realization cannot be bypassed with a direct Proposal; the Proposal binds that Task.
- A direct route covers at most one exact Proposal lineage/revision at a time. Proposal revision remains the same policy boundary only under existing Proposal identity rules.
- A rejected, denied, timed-out, or failed direct realization does not create an automatic retry, Task, or Intent failure.
- If retry/resume/handoff becomes necessary, a new routing Assessment may require a new Task whose lineage binds the earlier evidence where appropriate.

## No Governance Shortcut

Both routes still require the same applicable downstream gates: exact World View, declared impacts, closure, coordination/procedures, Authority evaluation, local safety, dispatch rules, physical observation, Target Fit/Goal Evaluation, and user attestation. `direct_proposal_eligible` bypasses only Task materialization, never Plan reasoning, Proposal scrutiny, Authorization, or safety.

The optional [Plan Materialization Profile](../../plan-materialization/v0.1/README.md) separately determines whether the realization's method must become portable. Direct routing does not imply private-only planning, and Task routing does not imply that a Plan already exists.

`task_required` creates no Task by itself. A separately content-bound Task Definition must be materialized. Task creation creates no Plan, Proposal, Authorization, or Attempt.

## Invariants

1. Intent adoption, routing, Task materialization, Proposal creation, Authorization, and dispatch are separate.
2. Routing is per exact realization, not a permanent Intent property.
3. “Simple”, “small”, model confidence, latency, or token count is not a routing rule.
4. Missing or unknown policy is indeterminate, never direct.
5. Routine occurrences require Task lineage.
6. Retry, resume, wait, handoff, multiple Proposal, or independent exit-criteria identity requires Task when the accepted policy says so.
7. An existing exact open Task cannot be bypassed by direct routing.
8. Direct route covers one bounded Proposal and creates no automatic retry.
9. Newly discovered work shape causes a new Assessment; history is immutable.
10. Both routes preserve all impact, coordination, Authority, safety, and outcome gates.
11. Task-required does not materialize a Task; direct-eligible does not create a Proposal.
12. No routing result authorizes notification, action, dispatch, or outcome.

## Standards and Research Boundary

- [RFC 5545 VTODO](https://www.rfc-editor.org/rfc/rfc5545.html) supplies durable work UID, revision, recurrence, and completion concepts used by the existing Task Profile.
- [PROV-O](https://www.w3.org/TR/prov-o/) separates Plan, Activity, Agent responsibility, and provenance; a Plan does not itself require an HWM Task.
- [Erol, Hendler, and Nau](https://www.cs.umd.edu/~nau/papers/erol1996complexity.pdf) shows that hierarchical task decomposition has distinct planning semantics and complexity. HWM does not infer decomposition from an LLM's intuition.
- [Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf) motivates explicit handling of multiple instances, synchronization, and workflow structure; HWM uses only the durable-lineage boundary.

## Executable Evidence

The [Work Routing oracle](../../../../conformance/scenarios/work-realization-routing-v0.1/README.md) tests atomic direct work, waiting, retry, handoff, recurrence, existing Task bypass, changing work shape, and downstream governance invariants. The [`Work Routing Assessment schema`](work-routing-assessment.schema.json) fixes the exchange boundary.

## Non-goals

This Profile does not define a universal complexity metric, project-management method, planner, workflow engine, Task decomposition algorithm, Proposal identity model, or action policy.
