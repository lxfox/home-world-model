# HWM Deployment Outcome Evaluation v0.1

- Status: Discussion Candidate
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-057`](../../../docs/05_decision/ADR-057-evaluate-deployment-outcomes-as-orthogonal-axes.md)
- View schema: [`deployment-outcome-view.schema.json`](deployment-outcome-view.schema.json)

## Purpose

Compose bounded evidence about what happened after an HWM-related deployment without treating use as benefit or creating a second household outcome ontology.

Household propositions remain governed by their existing Profiles:

- [Target Fit](../../../spec/profiles/target-fit/v0.1/README.md) evaluates exact accepted targets;
- [Effect Realization and Attribution](../../../spec/profiles/effect-realization-attribution/v0.1/README.md) separates observed effect from causal contribution;
- [Outcome Assurance and Work Closure](../../../spec/profiles/outcome-work-closure/v0.1/README.md) separates Intent assurance from Task closure;
- [Bounded Impact Closure](../../../spec/profiles/bounded-impact-closure/v0.1/README.md) constrains declared impact-channel coverage; and
- [Change Impact Revalidation](../../../spec/profiles/change-impact-revalidation/v0.1/README.md) governs later invalidation.

This View cites those Assessments plus separately governed experience, distribution and exit evidence. It does not replace them.

## Six axes

| Axis | Results | Boundary |
|---|---|---|
| `usage` | `observed`, `not_observed`, `mixed`, `indeterminate`, `not_evaluated` | Interaction/exposure is not benefit, consent or satisfaction. |
| `target_outcomes` | `realized`, `partially_realized`, `not_realized`, `mixed`, `indeterminate`, `not_evaluated` | Requires exact household target/effect/assurance references; operator KPI is not a household target. |
| `experience` | `favorable`, `unfavorable`, `mixed`, `indeterminate`, `not_evaluated` | Must be attributed or governed aggregate; silence and continued use are not favorable experience. |
| `adverse_impacts` | `none_observed`, `observed`, `mixed`, `indeterminate`, `not_evaluated` | `none_observed` is bounded by channels, coverage and horizon; it is not “no harm.” |
| `distribution` | `no_material_difference_observed`, `material_difference_observed`, `mixed`, `indeterminate`, `not_evaluated` | Difference is not automatically unfairness; no difference is not fairness. |
| `exit_reversibility` | `demonstrated`, `partially_demonstrated`, `not_demonstrated`, `indeterminate`, `not_evaluated` | Documentation is not demonstration; rollback does not erase history or external copies. |

Every axis cites content digests, coverage, method and limitations. Missing or inaccessible evidence never becomes a favorable result.

## Population and time

The View binds an exact release/deployment configuration, eligible population, baseline, evaluation window, evidence policy and `as_of` time. Subject coverage and attrition are reported separately. Household averages cannot establish subject-complete outcomes. Different populations, target definitions, system versions and windows require separate Views or an explicit alignment procedure.

Experience and distribution reporting SHOULD use minimum necessary, purpose-bound evidence. Opaque strata may support a disparity test without disclosing identities, but small cells, membership inference and linkage remain privacy risks. Access denial is not a favorable outcome.

## No compensating score

There is no `overall_success`, net-benefit score or automatic continue/stop recommendation. High usage cannot compensate for harm; favorable average experience cannot compensate for an unevaluated subgroup; realized targets cannot compensate for failed exit. A household or governance body may apply a separately accepted decision rule, but it must preserve the six input results and cannot obtain action authority from this View.

## Hard boundary

The View does not prove universal benefit, causal efficacy, consent, fairness, safety, legal compliance, product quality, continuation authority, household trust, access or action authority.

Run:

```sh
node governance/outcomes/v0.1/validate.mjs
```

