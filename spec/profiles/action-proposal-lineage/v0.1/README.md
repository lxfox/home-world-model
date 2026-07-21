# HWM Action Proposal Lineage Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`action-proposal.schema.json`](action-proposal.schema.json), [`proposal-state-assessment.schema.json`](proposal-state-assessment.schema.json)

## Purpose

This optional Profile makes an Action Proposal an immutable, content-bound candidate rather than a mutable command name. It defines when a change is a revision in one lineage, when it requires a new Proposal identity, and why responses, impact work, authorization, and dispatch never migrate implicitly between revisions.

Core v0.1 retains its compact inline Proposal projection. A Profile implementation uses the standalone artifact here whenever revision safety or cross-system exchange matters.

## Standards basis

- [W3C PROV-O](https://www.w3.org/TR/prov-o/) supplies revision, derivation, generation, and invalidation relations. A revision is a new Entity derived from a prior Entity, not an in-place mutation.
- [W3C PROV Constraints](https://www.w3.org/TR/prov-constraints/) requires multiple Entities when relevant aspects of a changing thing are not fixed.
- [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) uses strong validators and conditional requests to prevent lost updates. HWM applies the same exact-predecessor principle without making Proposal exchange an HTTP protocol.
- [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785.html) supplies deterministic JSON canonicalization before SHA-256 digesting.
- [W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) and [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html) reinforce that authorization is bounded by action, target/resource, constraints, and detailed parameters rather than by a reusable label alone.

## Identity and revision boundary

One Proposal lineage fixes this identity basis:

1. household;
2. exact Intent Definition binding;
3. realization identity: the exact Task identity or exact direct realization assessment;
4. purpose;
5. semantic action kind;
6. target resource/scope set.

A changed identity-basis field requires a new `proposal_id`. A competing alternative that must coexist also receives a new identifier, even if its identity basis matches. Identity-basis equality is therefore necessary but not sufficient for revision continuity.

Within one lineage, changes to parameters, preconditions, expected effects, declared impacts, validity, World View binding, or Plan binding create the next sequential revision. Every revision is a newly generated immutable artifact. Revision `n+1` binds the exact RFC 8785/SHA-256 canonical projection of revision `n`. That projection omits `proposal_digest` and `proof`, avoiding a self-hash while keeping all semantic content bound. A presentation or translation outside the canonical artifact does not create a revision.

## Forks and currentness

Two valid successors of the same exact predecessor are a contested fork. There is no last-writer-wins rule based on timestamp, arrival order, proposer confidence, or apparent safety. A resolver must issue separate Proposal identifiers or an explicit, independently authorized resolution before either branch can become current.

A state assessment is append-only and reports `current`, `superseded`, `withdrawn`, `contested`, or `indeterminate` as of one time and Authority Epoch. Creating a successor does not erase the predecessor, its authorization record, or any physical execution. It only changes whether that candidate remains eligible for a new dispatch.

## Exact downstream binding

Every response, impact report, coverage result, procedure mapping, fulfilment result, Authorization Decision, and Dispatch Record MUST bind `(proposal_id, proposal_revision, proposal_digest)`. Identifier and revision without digest are an incomplete compatibility projection.

A new revision MUST rerun every applicable downstream gate. No artifact carries forward automatically because the change appears equivalent, narrows scope, lowers a setting, updates only a World View, or is described as safer. Authorization of revision `n` grants nothing to revision `n+1`.

Dispatch requires both an exact, still-valid Authorization Decision and a current Proposal State Assessment under the gateway's current Authority state. Supersession or withdrawal does not undo an already dispatched Attempt; cancellation, compensation, or Authority revocation are separate actions.

## Invariants

1. Canonical Proposal content is immutable.
2. Same `(proposal_id, proposal_revision)` with different content is an integrity conflict.
3. Revisions are sequential and bind the exact predecessor digest.
4. Identity-basis change or coexisting alternative creates a new Proposal identity.
5. A fork is contested, never selected by last writer wins.
6. Every material canonical change creates a revision; localization remains external.
7. Plan or World View revisions never retarget an existing Proposal.
8. Downstream decisions bind the exact Proposal digest and never inherit implicitly.
9. Proposal currentness, authorization validity, execution, and physical effect are separate axes.
10. A retry with unchanged Proposal content is a distinct Attempt if policy permits it; changed action parameters require a Proposal revision.

## Conformance

The [Action Proposal Lineage oracle](../../../../conformance/scenarios/action-proposal-lineage-v0.1/README.md) tests continuity, new-identity boundaries, forks, state, retry, and downstream non-inheritance.

```sh
node conformance/scenarios/action-proposal-lineage-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
