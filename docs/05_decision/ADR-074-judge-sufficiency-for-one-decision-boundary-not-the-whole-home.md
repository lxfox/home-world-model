# ADR-074: Judge sufficiency for one decision boundary, not the whole home

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-074-judge-sufficiency-for-one-decision-boundary-not-the-whole-home.zh-CN.md`](ADR-074-judge-sufficiency-for-one-decision-boundary-not-the-whole-home.zh-CN.md)

## Context

ADR-073 permits a household to retain unknowns without creating a global knowledge-debt backlog. The next question is when an Agent may say it knows enough to proceed. A global completeness or readiness flag would collapse distinct lifecycle gates and invite scalar confidence, evidence volume, or apparent coverage to compensate for missing Authority, safety, professional review, currentness, or required evidence.

Existing Profiles already define purpose-bound World Views, evaluation specifications, prediction qualification, Target Fit, planning transitions, procurement qualification, physical onboarding, Authority, local safety, Action Trace, outcome closure and revalidation. The missing piece is a composition rule, not a new ontology primitive.

## Decision

1. Assess sufficiency only for one exact decision question/revision or next semantic transition. Reject “is the household model complete?” as an unbounded question.
2. Bind the assessment to household, purpose, subjects, spatial/temporal scope, lifecycle phase, required inputs, accepted procedure, source snapshot/closure, Authority epoch, unresolved gaps, accepted-unknown decisions, limitations and `as_of`.
3. Treat required input classes as conjunctive. Optional evidence, confidence or volume cannot compensate for a missing mandatory class.
4. Preserve `sufficient_for_exact_next_transition`, `sufficient_with_declared_limits`, `insufficient`, and `indeterminate/contested` as contextual conclusions, not truth or quality grades.
5. Permit an accepted unknown only for its exact decision and named degraded path. It neither resolves the proposition nor transfers to another decision.
6. Separate every transition: draft, compare, select, purchase, receive, install, commission, authorize, safety-check, dispatch, observe effect, close work and reassess target fit.
7. Planning evidence never proves installed or operational performance. Commissioning readiness never proves commissioning success.
8. Household Authorization never replaces current local safety checks. Dispatch or acknowledgement never proves physical effect; bounded effect evidence never proves continuing target satisfaction.
9. Relevant change, expired freshness, changed purpose/revision/phase, advanced Authority epoch or Agent replacement requires current-binding verification and reassessment. Historical assessments remain immutable.
10. Do not compute a universal readiness score. Independent safety, Authority, coverage, evidence and procedure gates do not compensate across axes.

## Consequences

- An Agent can make a precise and useful claim: “the disclosed evidence is sufficient to compare these two lighting plans for this bedroom and planning revision, with these limitations.”
- It cannot shorten that statement to “the home model is ready” or carry the result into purchase, installation or operation.
- Thirty executable cases verify transition locality, mandatory inputs, accepted unknowns, lifecycle boundaries, Authority/safety separation, effect evidence and revalidation.
