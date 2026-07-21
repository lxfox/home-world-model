# HWM Specification Change Governance v0.1

- Status: Discussion Candidate
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-055`](../../docs/05_decision/ADR-055-separate-specification-decision-publication-and-adoption.md)
- Change Proposal schema: [`change-proposal.schema.json`](change-proposal.schema.json)
- Review Set schema: [`review-set.schema.json`](review-set.schema.json)
- Decision Record schema: [`decision-record.schema.json`](decision-record.schema.json)
- Release Record schema: [`release-record.schema.json`](release-record.schema.json)

## Purpose

This contract makes HWM project decisions inspectable without claiming that technical evidence, maintainership or vote counts manufacture truth or consensus. It governs project specifications and releases; it is not part of the household model.

## Five distinct records

1. **Change Proposal** — exact proposed normative delta, revision, affected artifacts, compatibility claim and known trade-offs.
2. **Review Record** — attributed position, rationale, scope, conflict disclosure, evidence references and typed objections.
3. **Decision Record** — exact Proposal and Decision Policy digests, required-role coverage, objection dispositions, preserved dissent, conclusion and rationale.
4. **Release Record** — exact accepted content, integrity/licensing checks, release line and publisher attribution.
5. **Adoption Declaration** — an external adopter's attributed declaration for one exact release, scope, date and limitations.

An Evidence Assessment or Portfolio may be cited by a review or decision. It never automatically accepts a proposal.

All five declared record classes now have a machine contract: Change Proposal, Review Set, Decision Record and Release Record are defined here; an Adoption Declaration is the `adoption_declaration` kind of the separately governed [`Adoption Evidence schema`](../adoption/v0.1/adoption-evidence.schema.json). The schemas remain separate so one record cannot acquire the effect of the next record merely by adding fields.

The checked-in synthetic chain binds [`example-proposal.json`](example-proposal.json) → [`example-reviews.json`](example-reviews.json) → [`example-decision-record.json`](example-decision-record.json) → [`example-release-record.json`](example-release-record.json) → [`example-governance-chain-adoption-declaration.json`](example-governance-chain-adoption-declaration.json) by exact SHA-256 at every transition. It demonstrates record linkage only; every actor, URI, signature and publication receipt in the fixture is synthetic.

## Roles and non-authority

`proposer`, `editor`, `reviewer`, `decision_steward`, `publisher` and `adopter` are process roles. A person may hold several roles only when the exact Decision Policy permits it and conflicts are disclosed. A role does not establish technical correctness, independent standing, affected-community representation, household authority or external adoption.

## Review and objection semantics

A Review position is `support`, `object`, `abstain` or `no_position`. Silence, missing review and abstention are not support. Objections have a policy-defined class such as interoperability counterexample, security/privacy risk, rights/governance concern, scope error, editorial defect or alternative design.

Every objection cited by the frozen review set must have exactly one disposition:

- `accepted`: the Proposal must be revised;
- `addressed`: the exact Proposal revision contains a reviewable response;
- `deferred_with_rationale`: moved to an identified follow-up without pretending resolution;
- `out_of_scope_with_rationale`: excluded under the bound scope and policy; or
- `unresolved`: still open.

The Decision Policy declares which unresolved classes block `accept`. A support majority cannot override a blocking counterexample. Non-blocking dissent remains visible and may justify `accept_with_recorded_dissent` in prose, but the machine conclusion remains `accept`.

## Decision state

The conclusion is one of:

| Conclusion | Meaning |
|---|---|
| `accept` | Procedure closes and exact content may proceed to a separate release process. |
| `revise` | A new Proposal revision is required. |
| `reject` | The exact Proposal is declined with reasons; resubmission requires a new revision. |
| `defer` | Evidence, participation, time or dependency is insufficient for a substantive decision. |
| `procedurally_invalid` | Digest, policy, conflict disclosure, required-role coverage or record closure is broken. |

Quorum is a procedure precondition, not a truth threshold. Unanimity is neither required nor inferred.

## Publication and adoption boundary

`accept` is not publication. Publication requires a separate content-bound Release Record after integrity, licensing, canonical URI and release checks. Publication is not adoption. Only an attributed Adoption Declaration counts as evidence that its named adopter adopted the exact release for its declared scope. Downloads, stars, forks, implementations, citations, conference attendance and silence do not count.

A valid Release Record binds at least one accepted Decision Record by digest, an exact content manifest, passed integrity/licensing/canonical-URI/release checks, publisher attribution and conflict disclosure, a verified signature over the release payload, and at least one observed HTTPS publication receipt bound to the same manifest digest. A planned URL, upload intent, maintainer role or signature reference alone is not publication. [`example-release-record.json`](example-release-record.json) is a synthetic schema fixture and does not assert a real release.

## Revision and appeal

Records are append-only. Changed Proposal content, Decision Policy, review set, objection disposition or evidence produces a new Decision Record. An appeal identifies a procedural error or new evidence and opens a new revision; it does not mutate the earlier outcome or erase dissent.

## Hard boundary

A valid decision proves only that this project's declared procedure closed for the exact Proposal. It does not prove technical truth, full representation, community consensus, standard adoption, legal legitimacy, certification, market acceptance, household trust, access or action authority.

Run:

```sh
node governance/v0.1/validate.mjs
```
