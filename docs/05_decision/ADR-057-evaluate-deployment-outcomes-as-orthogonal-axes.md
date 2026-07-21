# ADR-057: Evaluate deployment outcomes as orthogonal axes

- Status: Accepted as ecosystem-evaluation candidate
- Date: 2026-07-19
- Chinese mirror: [`ADR-057-evaluate-deployment-outcomes-as-orthogonal-axes.zh-CN.md`](ADR-057-evaluate-deployment-outcomes-as-orthogonal-axes.zh-CN.md)

## Context

Adoption evidence distinguishes declaration, implementation, deployment, dependency, sustained operation and market estimation. None establishes that a deployment helped a household. HWM already has household Profiles for Target Fit, Effect Realization and Attribution, Outcome Assurance and Work Closure, impact closure, disclosure and change revalidation. Recreating those semantics in ecosystem reporting would fork the model. Yet reporting only uptime or retention would confuse use with value and conceal adverse or uneven outcomes.

## Decision

1. Define a Deployment Outcome View as a purpose-bound composition of existing household Assessments and separately governed research/experience evidence. It introduces no new household Claim or Core status.
2. Keep six axes orthogonal: `usage`, `target_outcomes`, `experience`, `adverse_impacts`, `distribution`, and `exit_reversibility`.
3. Each axis has its own result vocabulary and evidence requirements. There is no normative overall success score, weighted utility, maturity level or cross-axis compensation.
4. Usage evidence describes exposure or interaction only. Frequency, retention and sustained operation do not imply target realization, satisfaction, benefit, consent or lack of alternatives.
5. Target outcome evidence cites exact Target Fit, Effect Realization/Attribution or Intent Assurance assessments. It does not silently replace household-specific targets with operator metrics, nor treat correlation as causal contribution.
6. Experience evidence is attributed to the subject and instrument/time/context. Silence, continued use, low complaint rate or proxy behavior is not satisfaction. Household-average experience does not establish each member's experience.
7. Adverse-impact evidence binds declared channels, coverage, severity procedure and observation horizon. `none_observed` means no adverse impact was observed under that bounded procedure; it never means no harm exists.
8. Distribution evidence reports outcome differences over explicitly governed groups or opaque strata with coverage and uncertainty. A difference does not by itself prove unfairness or discrimination; no measured difference does not prove fairness. Normative fairness requires a separate accepted criterion and qualified procedure.
9. Exit/reversibility separately evaluates control disablement, safe fallback, data export/deletion obligations, dependency removal and restoration verification. A documented uninstall path is not demonstrated exit; successful rollback does not erase historical effects or external copies.
10. Missing axes remain `not_evaluated` or `indeterminate`. A favorable axis cannot compensate for an unfavorable or unknown axis unless a separate, accepted decision rule explicitly permits that use; the View itself never recommends continuation.
11. Views bind exact release/deployment population, baseline, evaluation window, evidence policy, coverage and limitations. Changed population, targets, policy, system version or environment requires revalidation.
12. The View does not establish universal benefit, user consent, causal efficacy, fairness, safety, legal compliance, continuation authority, household trust, access or action authority.

## Consequences

- A frequently used system may still show unrealized targets, unfavorable experience, adverse impacts or failed exit.
- A low-use system may still realize a narrow target for a small eligible population; interpretation remains scoped.
- Operators cannot hide subgroup or exit failures inside an average success score.
- Existing household Profiles remain authoritative for their own propositions; ecosystem evaluation cites rather than duplicates them.

