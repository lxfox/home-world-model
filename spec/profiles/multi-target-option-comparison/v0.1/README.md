# HWM Multi-Target Option Comparison Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`option-outcome-matrix.schema.json`](option-outcome-matrix.schema.json), [`option-comparison-assessment.schema.json`](option-comparison-assessment.schema.json)

## Purpose

This optional Profile compares renovation or operational options across multiple independently accepted household targets without synthesizing a universal household utility score. It can identify infeasible, dominated, non-dominated, tied, and currently incomparable options. It does not choose household values, resolve interpersonal disagreement, recommend by hidden weights, select a product, create a transaction, or authorize action.

The normative chain is:

`exact options + applicable targets + accepted Evaluation Specifications + purpose-aligned Target Fit/Prediction inputs + accepted comparison rules -> Option Outcome Matrix -> Comparison Assessment`

## Separate questions

1. Is each target accepted and applicable?
2. Is each option's outcome evidence qualified for the comparison purpose?
3. Does an option violate an explicitly governed hard constraint?
4. Is one option no worse on every comparable dimension and strictly better on at least one?
5. Which options remain non-dominated or incomparable?
6. Has the household accepted any priority, weighting, lexicographic, aspiration-level, or tie-break rule?
7. Has anyone recommended, selected, purchased, installed, or authorized an option?

These questions remain distinct.

## Outcome matrix

The matrix fixes one household, design/comparison context, option set, target set, purpose, time, and Authority Epoch. Every cell binds an exact Target Fit, Planning Prediction qualification, or another declared assessment; it records epistemic basis, result, uncertainty/coverage status, and the accepted per-target comparison rule.

Missing, stale, contested, purpose-mismatched, unit/procedure-incompatible, or differently scoped cells are `indeterminate`, not losses or zero values. Planning predictions and installed observations may not be compared as if they had the same epistemic basis unless an accepted rule explicitly qualifies that comparison.

## Constraint filtering

A target is a hard constraint only through an independently accepted governance binding for this purpose. Words such as “requirement,” “safety,” or “must” do not by themselves establish the relevant decision authority or legal effect.

An option is:

- `feasible` when every applicable hard constraint conclusively passes;
- `infeasible` when at least one applicable hard constraint conclusively fails; or
- `indeterminate` when required constraint evidence is missing or inconclusive.

Household constraint filtering is not code compliance, professional approval, product compatibility proof, or action safety authorization.

## Dominance and incomparability

Within the feasible set, option A dominates B only when the accepted per-target order establishes A as no worse on every included comparable target and strictly better on at least one. Any material indeterminate or incomparable dimension blocks a conclusive dominance claim.

Equal scalar scores do not imply equivalent options. Different subjects, coverage, uncertainty, lifecycle phases, or evidence bases may make two cells incomparable. Absence of dominance does not mean equality, optimality, fairness, or compromise.

The Assessment returns exact pairwise relations and a non-dominated set. A non-dominated option is only one for which no included option has been proven to dominate it under this exact matrix. It is not “best.” Adding an option, target, accepted rule, or new evidence requires a new matrix and assessment; prior results remain historical.

## Value-sensitive ordering

Weights, priorities, lexicographic orders, aspiration levels, and tie-break rules are optional accepted Claims with explicit subject, scope, purpose, time, provenance, and Authority. An Agent may propose or elicit them but cannot infer them from click behavior, prices, model confidence, household membership, majority, or its own optimization objective.

If no accepted value rule selects among non-dominated options, the result remains a tradeoff set. The Agent may present bounded differences or ask an authorized, non-coercive question. It must not manufacture a winner.

Different household members' targets remain attributed. The [Shared Action Coordination Profile](../../shared-action-coordination/v0.1/README.md) or a more capable procedural Profile decides required participation for an exact downstream Proposal; option comparison does not implement social choice.

## Downstream boundary

Comparison may support an attributed Recommendation. Recommendation does not establish household Selection. Selection does not create purchase, installation, Action Authorization, dispatch, or outcome acceptance. A later choice preserves unselected alternatives and the exact evidence available at decision time.

A procurement-qualified Commercial Offer Snapshot may be represented as an option only with its exact variant, seller, region, quantity, observed time, validity window, bundle coverage, delivery basis, and total-cost basis preserved. `qualified_for_shortlist` establishes eligibility for comparison, not superiority; displayed price, stock, or shopping-Agent availability must not become an implicit ranking rule or purchase decision. See the [Procurement Offer Qualification Profile](../../procurement-offer-qualification/v0.1/README.md).

## Invariants

1. Each target retains its own subject, applicability, specification, result, and uncertainty.
2. No hidden conversion produces a household-wide utility score.
3. Hard-constraint status requires an accepted purpose-specific governance binding.
4. Missing or incomparable evidence cannot be scored as zero or worst.
5. Dominance requires no-worse on all included comparable targets and better on at least one.
6. Indeterminate dimensions block conclusive dominance when material.
7. Non-dominated does not mean best, recommended, fair, accepted, or selected.
8. Absence of dominance does not mean equivalence.
9. Priorities and weights are explicit accepted Claims, never Agent defaults.
10. Personal targets are not merged into a household preference.
11. Comparison-context changes produce a new assessment and preserve history.
12. Recommendation, selection, purchase, installation, authorization, dispatch, and outcome remain separate.

## Conformance

The [Multi-Target Option Comparison oracle](../../../../conformance/scenarios/multi-target-option-comparison-v0.1/README.md) tests feasibility, three-valued dominance, incomparable dimensions, accepted value rules, option-set revision, and downstream boundaries.

```sh
node conformance/scenarios/multi-target-option-comparison-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
