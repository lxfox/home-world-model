# ADR-007 — Isolate Planning Branches with Explicit Contexts

- Status: Proposed
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`ADR-007-explicit-planning-contexts.zh-CN.md`](ADR-007-explicit-planning-contexts.zh-CN.md)
- Related Profile: [`HWM Renovation Planning Profile v0.1`](../../spec/profiles/renovation-planning/v0.1/README.md)

## Context

Epistemic basis distinguishes how a Claim is known; it does not identify the planning world in which the Claim applies. A single-option fixture could require a Design Option identifier but could not prove that two incompatible renovation alternatives remain isolated during simulation, comparison, recommendation, and household selection.

## Decision

1. Renovation-planning Claims use an explicit `designContext` with `context_id`, `context_kind`, and `revision`.
2. This Profile defines three context kinds: `base_design`, `design_option`, and `comparison`. They are Profile structures, not HWM Core entity classes.
3. Each option links to its shared base explicitly with `prov:wasDerivedFrom`.
4. Branch-local Claims may consume only Claims from the same option, the declared base, or context-free shared inputs such as requirements and catalog declarations.
5. Cross-branch inference is legal only in a `comparison` context that enumerates all `input_context_ids`.
6. Each option's requirement status is computed before cross-branch comparison.
7. A recommendation is not an Authorization Decision. A household selection is a planning Attestation, not purchase, installation, commissioning, or action dispatch.
8. Selection does not delete rejected alternatives; later changes append Claims or revision Records.
9. The target semantic projection types base and option contexts as `prov:Plan`, types comparison as `prov:Activity`, and uses `prov:used`, `generated`, and `wasDerivedFrom` for lineage. These external types do not replace the Profile's branch-closure rule.
10. Per-option requirement status uses EARL Assertion/TestResult outcomes in the target binding. Household selection uses Schema.org `ChooseAction`; `requirementStatus` and `selectedOption` remain compatibility projections only.
11. Schema.org `Recommendation` may represent advisory output, but it is not the sole normative binding while Schema.org marks it as a new term. The prohibition on promotion from recommendation to choice, purchase, authorization, installation, or dispatch remains an HWM Profile invariant.
12. Every Schema.org `ChooseAction` remains an immutable historical event. A later selection-state Claim uses `dcterms:replaces` rather than mutating the prior state. Current choice is resolved at `as_of` from the unreplaced head; forks, cycles, and unavailable targets remain visible as conflict or indeterminacy.
13. A comparison is a closed-input operation. A proposed recommendation is admitted only when every declared input has exactly one available, accepted, current, temporally in-effect or unbounded, applicable resolution and no undeclared input is present. Every other case emits zero recommendations.
14. The Profile owns recommendation admission, not ranking. The algorithm that proposes an option remains outside HWM.
15. Every Design Option has exactly one explicit base-design derivation. A missing or ambiguous link is structurally invalid; a known but unavailable dependency is indeterminate; an intact branch rooted in a non-current base is historical-only.
16. Preserving an immutable derived Claim is different from admitting it as current. Deletion, source failure, or denial of a dependency never rewrites the derived history, but it prevents current simulation, evaluation, and recommendation.
17. Base and option revisions use `prov:wasRevisionOf` when substantial content is retained. `prov:invalidatedAtTime` may mark when an older Plan stops being usable for subsequent derivation. Neither relation performs an implicit rebase.
18. Rebase creates a new option revision with a new explicit base derivation and regenerated downstream outputs. An output bound to the old option revision remains historical and cannot be carried into the new branch.
19. Every branch in one current comparison closes over the same current base root. Different layout alternatives must share an explicit higher-level base rather than bypassing dependency closure.

## Consequences

- Agents can compare counterfactual household designs without contaminating the current or future physical world.
- A resolver must be context-aware and fail closed when a required context or derivation link is absent.
- Comparison lineage remains inspectable, and rejected alternatives remain available for audit or reconsideration.
- A household may change from the recommended option to another option without rewriting either the recommendation or prior choice history.
- Incomplete evidence cannot silently become advice; malformed contexts and unavailable knowledge both fail closed, with different result states.
- A deleted or hidden base does not make old simulations false, but it makes their current use unprovable.
- Updating a floor plan cannot silently preserve lighting, electrical, or requirement-evaluation results computed against the previous revision.
- The model adds Profile constraints and provisional planning predicates but no Core primitive.
- Two provisional predicates are removed from the target semantic vocabulary, while source maturity remains explicit rather than hidden behind nominal reuse.

## Current Evidence

The renovation-planning package contains one base design, two mutually exclusive lighting options, separate simulations and requirement evaluations, one explicit comparison, and one homeowner selection. The separate branch-resolution oracle now contains 31 cases: five selection cases, eleven recommendation-admission cases, ten base-dependency cases, and five comparison-lineage cases. JavaScript and an independent Python reader distinguish malformed lineage, unavailable knowledge, and historical-only branches; prove that deleted or access-denied bases emit no current output; require explicit rebase and output regeneration; reject mixed-base current comparison; and preserve all old outputs. Neither path creates `BuyAction`, Authorization, installation, or dispatch.

## Validation Required Before Acceptance

1. ~~Add a later selection revision that supersedes rather than mutates the earlier selection.~~ Completed by the branch-resolution oracle on 2026-07-18.
2. ~~Test a comparison with more than two branches and one missing or stale input context.~~ Completed with a three-option case and closed-input failure cases on 2026-07-18.
3. ~~Define resolver behavior for deleted or unavailable base-design Claims.~~ Completed with dependency-closure and shared-root oracles on 2026-07-18.
4. ~~Map provisional comparison and selection predicates to established decision and provenance vocabularies.~~ Mapping candidate completed on 2026-07-18; external implementer review and source-maturity monitoring remain required.
