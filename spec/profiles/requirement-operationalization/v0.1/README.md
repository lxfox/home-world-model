# HWM Requirement Operationalization Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`operationalization-proposal.schema.json`](operationalization-proposal.schema.json), [`operationalization-review.schema.json`](operationalization-review.schema.json)

## Purpose

This optional Profile governs how a household target such as “comfortable,” “bright enough for the family,” or “quiet at night” may be translated into an explicit Evaluation Specification for planning and later verification.

Operationalization is a proposal about **how to test a target**, not a replacement for the target. An Agent may draft it, but cannot silently invent a numeric proxy, change who the target concerns, remove inconvenient dimensions, or accept the specification on behalf of the household or a qualified professional.

The normative chain is:

`accepted target Claim + source expression/evidence -> Operationalization Proposal -> purpose- and role-bound Review -> accepted Evaluation Specification Claim -> Target Fit`

## Why this layer exists

A scalar target is often incomplete. “Enough light” may involve work-plane illuminance, spatial minimum, uniformity, glare, color quality, time of use, energy constraints, and personal experience. “Comfortable temperature” may involve air temperature, radiant temperature, humidity, air speed, occupancy, duration, personal variation, and safety constraints.

The Profile does not standardize those domain criteria. It makes their selection, omission, provenance, authority, and intended use visible.

## Proposal identity and revision

One lineage fixes the exact target Claim body, household, subject population, feature/space scope, intended decision purposes, and lifecycle phases. Changing any of these creates a new `proposal_id`. Clarifying criteria, procedures, thresholds, coverage, or uncertainty rules creates an immutable sequential revision.

The proposal binds the source expression or elicitation Record. Paraphrase is not authority to narrow it. Unresolved ambiguity is recorded as an open issue rather than filled by an Agent default.

## Criterion dimensions

Each proposed criterion declares:

- `dimension_kind`: physical performance, spatial coverage, temporal/service condition, resource/cost, personal experience, accessibility, safety, compliance, reliability/resilience, or another declared dimension;
- the feature/property or exact attestation question;
- subject/population and spatial/temporal coverage;
- lifecycle phase: planning, installation acceptance, commissioning, or operation;
- evidence procedure and uncertainty-aware decision rule;
- whether it is required, sufficient, advisory, or separately governed;
- the authority/reviewer role required to accept it; and
- its provenance and limitations.

Safety and compliance criteria may be referenced, but ordinary household acceptance cannot impersonate jurisdictional or professional approval. Personal experience may be an exact-question attestation criterion; a sensor proxy cannot silently replace it. Population aggregates cannot prove every person is satisfied.

## Completeness and review

An Operationalization Review binds the exact proposal revision and purpose. It separately assesses:

- semantic fidelity to the target;
- subject, spatial, temporal, lifecycle, and dimension coverage;
- procedure and decision-rule fitness;
- reviewer-role and evidence authorization;
- unresolved ambiguity and declared omissions.

Its result is `eligible_for_acceptance`, `revision_required`, `not_eligible`, or `indeterminate`. Eligibility does not accept the Evaluation Specification; acceptance remains a distinct Authority-plane event. Review is purpose-specific: a specification sufficient for catalog screening may be insufficient for commissioning or continuing operation.

There is no universal completeness score. Declared omissions remain visible. A review may say the proposal is fit for one bounded purpose while explicitly excluding another.

## Relationship to planning and operation

The accepted Evaluation Specification can be applied to a qualified [Planning Prediction](../../planning-prediction-qualification/v0.1/README.md), producing projected—not observed—Target Fit. After installation, the same or a purpose-specific revised specification can be applied to observations or an [Installed Influence Model](../../installed-influence-model/v0.1/README.md). Planning pass, commissioning pass, ongoing fit, personal acceptance, safety, and compliance remain distinct results.

## Invariants

1. The target Claim and its operationalization remain distinct accepted Claims.
2. Agent-authored criteria are proposals, not household preferences or professional standards.
3. A numeric proxy cannot replace ambiguous or experiential meaning without explicit acceptance.
4. Mean, pointwise, population, spatial, and temporal coverage are not interchangeable.
5. Planning, commissioning, acceptance, and operation may require different specifications.
6. Safety/compliance reviewer roles cannot be synthesized from household acceptance.
7. Missing dimensions are declared omissions, not zero-weight criteria.
8. Review eligibility does not itself accept a specification.
9. Acceptance of a specification does not prove target satisfaction.
10. Satisfaction does not create Need, Intent, purchase, installation, or action authority.
11. Corrections append revisions and preserve the original expression and history.
12. No household-wide utility score is inferred from heterogeneous targets.

## Conformance

The [Requirement Operationalization oracle](../../../../conformance/scenarios/requirement-operationalization-v0.1/README.md) tests fidelity, coverage, reviewer roles, phase/purpose boundaries, experiential criteria, revision, and forbidden downstream inference.

```sh
node conformance/scenarios/requirement-operationalization-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
