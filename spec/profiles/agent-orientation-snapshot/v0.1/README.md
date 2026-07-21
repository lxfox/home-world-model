# HWM Agent Orientation Snapshot Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`orientation-snapshot.schema.json`](orientation-snapshot.schema.json), [`orientation-use-assessment.schema.json`](orientation-use-assessment.schema.json)

## Purpose

This optional Profile gives a newly admitted Agent the smallest purpose-bound, privacy-preserving projection needed to orient itself in a household without downloading all history or mistaking omitted information for a complete world model.

An Orientation Snapshot is an immutable disclosure artifact. Its disclosure policy and minimization assessment may conform to the [Purpose-Bound Disclosure Profile](../../purpose-bound-disclosure/v0.1/README.md). It is not the household, a universal digital twin, a full export, a Task continuity checkpoint, private Agent memory, proof of truth, a Lease, or Action Authorization.

The normative chain is:

`target Agent Admission + purpose/scope request + current Authority + purpose-bound World Views + disclosure/minimization policy -> Orientation Snapshot -> independent Use Assessment -> bounded orientation`

## Relationship to existing artifacts

- An HWM RO-Crate is the durable package boundary. Possession does not grant access to all resources.
- A World View resolves Claims for one purpose, time, requester, and Authority state.
- An Agent Continuity Checkpoint is target- and Task-specific and supports an independently governed handoff.
- An Orientation Snapshot may reference several World Views and open-work summaries, but grants no task continuity or dispatch right.

The Snapshot composes these artifacts rather than replacing them.

## Scope and identity

Every Snapshot binds one household, target Agent Admission Decision, requester/audience, purpose, scope request, `as_of`, generation time, Authority Epoch, Trust Root lineage, required Profile versions, disclosure policy, and minimization assessment. It receives a new `snapshot_id` whenever content or binding changes; Snapshots are never updated in place.

The purpose determines relevant domains. “Plan bedroom lighting” may require current spatial structure, design context, target requirements, evaluation specifications, product candidates, prediction qualifications, value rules, open tradeoffs, and relevant Authority constraints. It need not disclose unrelated health, media, finances, identities, raw camera evidence, or other Tasks.

Minimal does not mean terse. Every dependency needed to interpret a disclosed artifact, every material uncertainty, and every omission status required to avoid false completeness remains included.

## Domain coverage

For every domain required by the accepted scope policy, the Snapshot declares one status:

- `complete_for_declared_scope`
- `partial`
- `withheld`
- `unavailable`
- `not_applicable`
- `indeterminate`

Each domain entry binds disclosed current artifacts, unresolved-item registries, source closure/derivation, freshness, temporal status, and non-sensitive reason codes. `withheld` need not reveal hidden identifiers, subjects, counts, or facts. It must reveal only that the Agent cannot treat the domain as complete for the declared use.

An omitted domain is not `not_applicable`. Absence of an artifact is not evidence that the represented entity, preference, risk, conflict, obligation, or change does not exist.

## Snapshot sections

A Snapshot separates:

- accepted current structural and state World View projections;
- current design/planning branches and exact selection state;
- active, paused, contested, or review-due Intent/Rule/Routine states relevant to purpose;
- open Tasks, Proposals, procedural obligations, and pending follow-up relevant to purpose;
- unresolved, contested, indeterminate, stale, and inaccessible items;
- Change Sets and Artifact Revalidation results not yet resolved;
- historical summaries needed to explain current lineage; and
- authorized retrieval handles for deeper evidence.

The status labels in each referenced artifact retain their original Profile semantics. A Snapshot section never merges `unknown`, `contested`, `withheld`, `not_applicable`, `historical_only`, and `none`.

## Summaries and retrieval

A summary is a derived Record with exact source bindings, derivation procedure, source-closure status, time horizon, omissions, limitations, and integrity protection. It is not an accepted Claim merely because it appears in the Snapshot. A summary with partial or unavailable source closure cannot establish completeness.

Retrieval handles are audience- and purpose-bound, may expire independently, and disclose no hidden count. Failure to dereference is `unavailable` or `indeterminate`, never proof of absence. The Snapshot need not contain raw evidence when a bounded derived Record is sufficient and authorized.

## Open-world orientation

The Snapshot contains an explicit unresolved registry for every included or required domain. A registry may truthfully be empty only when its declared closure is complete for the scope. Otherwise its status remains partial, withheld, unavailable, or indeterminate without exposing hidden entries.

The Agent must propagate these limits into its language and decisions. It may say “no disclosed current issue under this snapshot's declared complete scope”; it must not say “there is no issue in the household” unless a separately accepted closed-world procedure supports that exact proposition.

## Use assessment

Before use, an Assessment verifies exact content integrity, target Agent Admission, current Lease/admission state, Trust Root/Authority Epoch direction, requester/audience, purpose/scope match, freshness, effective time, required domain coverage, unresolved registries, source closure, disclosure authorization, and change/revalidation currency.

The result is:

- `qualified_for_orientation`
- `qualified_with_declared_limits`
- `not_qualified`
- `indeterminate`

Qualification allows only the declared read/reasoning use. It does not accept every referenced Claim, authorize retrieval beyond each handle, continue a Task, adopt an Intent, select an option, or authorize action.

After a relevant Change Set, Authority transition, revocation, World View revision, or scope change, the Snapshot remains historical. A new Snapshot or validated delta is generated; the old Snapshot is not mutated.

## Invariants

1. Durable package, World View, Orientation Snapshot, Task Checkpoint, private memory, and authorization remain separate.
2. Snapshot identity binds target, audience, purpose, scope, time, Authority, and exact content.
3. Every required domain exposes coverage status; omission never implies absence.
4. Withholding reveals neither hidden identity nor count.
5. Unknown, contested, withheld, unavailable, stale, historical, and not-applicable states remain distinct.
6. Summaries retain derivation, source closure, omissions, and limitations and are not promoted to truth.
7. Minimality cannot remove dependencies or uncertainty needed for correct interpretation.
8. Empty unresolved registry is meaningful only under complete declared closure.
9. Snapshot qualification grants orientation only.
10. Source-Agent visibility, authority, Lease, credentials, private reasoning, and chain-of-thought never transfer.
11. Relevant change or Authority transition requires new qualification/snapshot, not in-place mutation.
12. Historical Snapshots remain auditable and cannot govern current use merely because they are available.

## Conformance

The [Agent Orientation Snapshot oracle](../../../../conformance/scenarios/agent-orientation-snapshot-v0.1/README.md) tests scope, minimization, coverage, withholding, summaries, unresolved registries, freshness, change, target binding, and forbidden authority/completeness inference.

```sh
node conformance/scenarios/agent-orientation-snapshot-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
