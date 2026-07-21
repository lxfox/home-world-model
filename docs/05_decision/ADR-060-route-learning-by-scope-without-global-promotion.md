# ADR-060: Route learning by scope without global promotion

- Status: Accepted as learning-governance candidate
- Date: 2026-07-19
- Chinese mirror: [`ADR-060-route-learning-by-scope-without-global-promotion.zh-CN.md`](ADR-060-route-learning-by-scope-without-global-promotion.zh-CN.md)

## Context

Household deployments generate observations, corrections, target results, experience reports, incidents and restoration evidence. Some can improve one household model; some may motivate a product-default experiment, population study or specification proposal. Treating them as one “learning pipeline” risks exporting private data, generalizing one household, encoding operator metrics as preferences, and silently replacing previously accepted household facts or policies. Existing HWM Profiles govern contribution admission, reusable value rules, purpose-bound disclosure and revalidation; project governance controls specification change.

## Decision

1. Treat learning as scoped candidate routing, not automatic promotion. Four destination classes remain distinct: `household_instance_candidate`, `product_default_candidate`, `population_hypothesis`, and `specification_change_proposal`.
2. Every routing Assessment binds exact source evidence digests, source population/scope, destination proposition, intended purpose/audience, method, disclosure/training authorization, lineage, uncertainty, applicability conditions, exclusions and `as_of`.
3. Household evidence may create a candidate contribution for the same household when provenance, standing, purpose and Authority permit. Admission/publication still follows Model Contribution Admission; changing a Value Rule or policy requires a new candidate revision and Authority activation. New evidence never rewrites historical Claims, Records, Decisions or rule states.
4. A product default is a prospective, overridable candidate configuration for a declared eligible population. It is not a household fact, preference, policy or authorization. It requires transport/applicability evidence, holdout or external validation as policy requires, harm/distribution review, rollback and monitoring. Each household still receives a candidate/default under its own disclosure and Authority boundary.
5. A population hypothesis requires a declared sampling frame, unit, inclusion/exclusion, denominator/coverage, missingness, dependence/lineage, subgroup/privacy analysis, uncertainty and confounder limits. Repetition within one household, controller, product fleet or correlated lineage does not establish population support.
6. A specification proposal requires evidence that a semantic/interoperability problem concerns the normative contract, not merely implementation frequency or product preference. It binds affected text/artifacts, counterexamples, alternatives, compatibility impact and evidence limits, then enters Specification Change Governance. Empirical prevalence does not automatically define normative meaning.
7. Movement between destinations is not a maturity ladder. A household candidate need not become a product default; a population result need not change the specification; a specification clarification need not encode a product default. Each destination performs a new Assessment from exact sources.
8. Disclosure permission for inference does not imply permission for logging, retention, model training, model-weight release or onward use. Federated/local updates, embeddings, gradients and derived statistics remain outputs subject to inference/linkage and disclosure review.
9. De-identification, aggregation or differential-privacy claims do not by themselves prove non-identifiability, representativeness, fairness or destination eligibility. Privacy qualification and scientific/generalization qualification are separate axes.
10. Withdrawal or deletion is prospective under its policy and does not prove removal from uncontrolled copies or trained model weights. Affected derived artifacts require lineage-based revalidation, not historical erasure.
11. A new global/product model version cannot mutate a household's accepted World View, rules, Authority, active model artifacts or decisions. Adoption is an explicit, version-bound local transition with rollback and outcome monitoring.
12. Routing eligibility grants no truth, product deployment, specification acceptance, household trust, access, training permission or action authority.

## Consequences

- The project can learn locally without assuming global generality.
- Product improvement remains reversible and household-overridable.
- Population research exposes denominator, correlation and privacy limits.
- Standards evolution consumes evidence but remains a normative governance decision.
- No new household Core primitive or automatic online-learning channel is introduced.

