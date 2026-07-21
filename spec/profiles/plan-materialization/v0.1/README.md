# HWM Plan Materialization Profile v0.1

- Status: Fixture Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile determines when an Agent's method must become a portable household Plan artifact instead of remaining ephemeral private reasoning. It also defines the minimum structured Plan boundary without requiring prompts, hidden state, or chain-of-thought disclosure.

The normative chain is:

`exact realization + accepted Plan Materialization Policy Claim + downstream reliance assessment -> Materialization Assessment`

The result is `plan_artifact_required`, `proposal_self_contained`, or `indeterminate`.

## Private Reasoning, Plan, and Proposal

These are different:

- **Private reasoning** is model/runtime-local computation. It is not household evidence, provenance, Authority, or a portable Plan.
- **Portable Plan** is a versioned decision-structure artifact containing only externally meaningful inputs, assumptions, alternatives, dependencies, checkpoints, contingencies, and provenance.
- **Action Proposal** is one exact candidate action and policy boundary. It must be self-contained for impact review and Authorization even when it binds a Plan.

A Plan MUST NOT contain or require raw prompts, model hidden state, unrestricted conversation history, secrets, or chain-of-thought. A generated rationale is an attributed summary, not proof of the model's actual internal reasoning.

## When a Plan Artifact Is Required

An accepted policy may require materialization when any downstream consumer relies on method structure beyond one self-contained Proposal, including:

- ordering or dependency across multiple Proposals;
- cross-Agent or human handoff and continuity;
- household comparison or selection among alternatives;
- Authority, professional review, audit, or procedure reliance on the method;
- assumptions that must be monitored across time or World Views;
- checkpoints, rollback, compensation, or contingency spanning Proposals;
- Task progress or exit criteria that depend on the method; or
- a Proposal, Task, Decision, or later Plan explicitly referencing the Plan.

`proposal_self_contained` means no external Plan is required for this realization under the exact policy. It does not forbid an optional Plan and does not authorize the Proposal. Missing policy or indeterminate reliance never defaults to ephemeral reasoning.

## Portable Plan Contract

The [`Portable Plan`](portable-plan.schema.json) binds:

- stable Plan ID, sequential revision, and exact previous content;
- household, purpose, exact Intent, optional Task, Work Routing Assessment, and source World View;
- immutable realization scope;
- decision-input and assumption artifact digests;
- ordered/dependent step descriptors and outcome gates;
- structured alternative dispositions and reason codes;
- checkpoints and contingency bindings;
- author, creation time, and proof.

It records decision-relevant structure, not exhaustive thought. Omitted alternatives are not claimed to have been considered. `not_selected` does not mean infeasible or forbidden. Predictions and assumptions remain Claims/Assessments with their own epistemic status.

Plan revision is immutable and append-only. Changed method, assumptions, dependencies, selected alternative, scope, or contingency produces a new revision or Plan according to identity policy. A Proposal that relied on revision N remains bound to N; revision N+1 cannot retroactively change its Authorization.

## Proposal Self-Containment

A Proposal may cite a Plan, but Authorization must not require private or inaccessible Plan content to determine:

- exact action and parameters;
- target resources and scope;
- preconditions;
- intended effects and declared impacts;
- exact pre-action World View;
- Intent, Task/direct-route, and relevant Plan bindings; and
- proposal revision and Authority Epoch.

If required information exists only in a private Plan or prompt, the Proposal is incomplete and must fail closed. Plan review, selection, acceptance, or materialization never authorizes any Proposal.

## Invariants

1. Private reasoning, rationale summary, portable Plan, Proposal, and Authorization are separate.
2. HWM never requires chain-of-thought or hidden-state disclosure.
3. A rationale is attributed content, not proof of faithful internal causation.
4. Downstream reliance on method structure requires an exact portable Plan under accepted policy.
5. Missing or unknown materialization policy is indeterminate, not ephemeral-by-default.
6. A Plan records only declared alternatives; omission proves nothing.
7. Plan assumptions and predictions retain independent epistemic status.
8. Plan revision never retargets an existing Proposal or Task silently.
9. Proposal self-containment is mandatory even when a Plan is bound.
10. An inaccessible Plan cannot hide action parameters, impacts, or preconditions.
11. Plan materialization/selection/acceptance grants no Intent adoption, Proposal Authorization, dispatch, or outcome.
12. Sensitive private reasoning and prompts are not household audit logs.

## Standards and Research Boundary

- [PROV-O](https://www.w3.org/TR/prov-o/) defines a Plan as an Entity representing actions or steps intended to achieve goals and supplies provenance/association concepts.
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) motivates documentation for transparency, review, accountability, risks, and impacts; it does not require chain-of-thought.
- [Turpin et al.](https://proceedings.neurips.cc/paper_files/paper/2023/hash/ed3fea9033a80fea1376299fa7863f4a-Abstract-Conference.html) provides evidence that generated chain-of-thought explanations can be unfaithful. HWM therefore exchanges verifiable decision structure rather than claiming access to internal cognition.
- [Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf) motivates explicit dependencies and multiple-instance structure when methods span work items.

## Executable Evidence

The [Plan Materialization oracle](../../../../conformance/scenarios/plan-materialization-v0.1/README.md) tests self-contained atomic Proposals, cross-Proposal dependencies, handoff, household choice, method review, private prompt leakage, Plan revision, and forbidden authorization inferences. The [`Materialization Assessment`](plan-materialization-assessment.schema.json) and [`Portable Plan`](portable-plan.schema.json) schemas fix the exchange boundary.

## Non-goals

This Profile does not standardize model cognition, demand chain-of-thought, define a universal planner, require exhaustive alternatives, prove prediction accuracy, or authorize action.
