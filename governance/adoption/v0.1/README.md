# HWM Adoption Evidence v0.1

- Status: Discussion Candidate
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-056`](../../../docs/05_decision/ADR-056-report-adoption-as-scoped-evidence-not-one-number.md)
- Evidence schema: [`adoption-evidence.schema.json`](adoption-evidence.schema.json)
- View schema: [`adoption-view.schema.json`](adoption-view.schema.json)

## Purpose

Represent what is actually known about adoption of one exact HWM release without collapsing declarations, compatible implementations, deployments, dependencies, sustained operation and market estimates into one number.

## Evidence kinds

| Kind | Supports | Does not by itself support |
|---|---|---|
| `adoption_declaration` | A named adopter declared a scoped organizational choice. | Conformance, deployment, active use or market coverage. |
| `implementation_assessment` | A bound implementation satisfied a named conformance contract. | Organizational commitment, deployment or user adoption. |
| `deployment_observation` | A defined deployment unit was observed in a bounded window. | Adopter intent, continuing use, unique households or satisfaction. |
| `dependency_declaration` | A named downstream artifact declares a bound dependency. | Runtime use, compatibility beyond the declaration or market reach. |
| `longitudinal_operation` | A defined unit met a declared continuity policy over a time window. | Beneficial outcomes, permanence or future operation. |
| `market_estimate` | A sampled/modelled estimate under an explicit population frame and method. | Census truth, individual adoption or causality. |

Every item binds the exact release SHA-256, subject, scope, issuer, evidence time, validity window, method, evidence lineage, privacy class and limitations. A self-report remains self-report even when signed. A third-party observation does not speak on behalf of its subject.

## Adoption View

A View answers one declared question over one release, population and `as_of` time. It reports six independent axes:

```text
declared | implemented | deployed | depended_on | sustained | market_estimated
```

Each axis is `supported`, `not_supported`, `indeterminate`, `not_evaluated` or `withdrawn` and cites exact evidence digests. No axis promotes another. The View has no `overall_adoption`, maturity level, leaderboard score or universal threshold.

`not_supported` requires applicable negative evidence under the declared evidence policy; missing, inaccessible or out-of-window evidence is normally `indeterminate` or `not_evaluated`, not false.

## Counting and de-duplication

Counts identify their unit, such as organization, product release, implementation lineage, deployment controller, site aggregate or downstream package. Evidence sharing the same bound unit or lineage is de-duplicated for that question. One organization with ten repositories is not ten organizational declarations; one controller reporting one thousand events is not one thousand deployments.

A percentage or market share additionally requires:

- a defined target population and eligibility rule;
- numerator and denominator units that match;
- denominator source, time and coverage;
- sampling/non-response treatment and uncertainty; and
- privacy and anti-reidentification review.

Unknown denominator forbids a percentage. Different populations or time windows cannot be summed silently.

## Time, conflict and privacy

Evidence is append-only. Withdrawal, supersession, release migration, expiry and product end-of-life change current applicability without deleting history. Conflicting current evidence is preserved and normally makes the affected axis `indeterminate` pending a declared resolution procedure.

Deployment reporting SHOULD use privacy-preserving aggregates. Household identity, precise address, stable device identifier and activity trace are out of scope unless a separate lawful, purpose-bound disclosure contract makes them necessary. Aggregation is not automatically anonymous.

## Hard boundary

Even a View with all six axes `supported` does not establish specification truth, complete conformance, user satisfaction, beneficial household outcomes, market dominance, community consensus, legal compliance, certification, household trust, access or action authority.

Run:

```sh
node governance/adoption/v0.1/validate.mjs
```

