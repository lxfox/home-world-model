# ADR-078: Layer technical assurance and household reliance choice

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-078-layer-technical-assurance-and-household-reliance-choice.zh-CN.md`](ADR-078-layer-technical-assurance-and-household-reliance-choice.zh-CN.md)

## Context

ADR-077 places Resolver procedures under household governance, but most household members cannot audit algorithms, validation datasets, privacy proofs or professional standards. Requiring technical comprehension would make governance inaccessible; reducing it to a vendor summary and checkbox would make it fictional. Letting experts decide everything would merely relocate the hidden authority.

Existing Authority, Evidence Standing, disclosure, procedure-fulfilment, deliberation and content-binding rules support layered assurance without a new comprehension or consent primitive.

## Decision

1. Separate technical assurance from household reliance choice. Reviewers establish only scoped findings; authorized household subjects decide whether to rely on the exact procedure for named purposes.
2. Require review coverage proportionate to intended use across semantics/conformance, empirical fitness, uncertainty/abstention, privacy, bias/harm, affected populations, security and any domain/professional axes. Missing axes remain visible.
3. Bind every review to exact procedure content, method, evidence, scope, population, time, reviewer standing, limitations and material conflicts. Credentials or vendor identity do not create universal authority or independence.
4. Permit scoped delegation of technical review. It does not transfer the household reliance decision unless a separate exact Authority grant says so.
5. Provide a household-facing, audience-accessible brief bound to the exact procedure and review-set digests. It explains purpose, concrete consequences, data/people affected, false-positive/false-negative/abstention behavior, material unknowns and dissent, alternatives including non-activation, duration, cost/obligations, suspension/exit/rollback and deeper-evidence/question routes.
6. Treat the brief as a derived projection, not the normative policy or proof of technical fidelity. Digest mismatch, material omission or inaccurate simplification makes it ineligible for the decision.
7. Delivery, opening, scrolling, checkbox response, silence, timeout and continued use establish neither reading, understanding, acceptance nor consent.
8. Optional exact-question clarification or teach-back may detect a mismatch and trigger repair/defer. It is not a mental-state proof, capacity test or coercive examination; refusal is not incapacity.
9. A content-bound household decision accepts reliance only for the exact scope, time and limitations. It does not certify the algorithm, evidence, professional compliance, truth or action safety.
10. Material procedure/review/consequence change requires a new brief and decision. Accessibility-only presentation correction may create a new projection while retaining the same exact policy binding.
11. Bounded emergency suspension may use a lower-burden protective path than activation. It blocks new use and preserves historical receipts.
12. Apply interaction cooldown, batching and prioritization policies to governance requests. Repetition or fatigue cannot manufacture acceptance.

## Consequences

- Household control becomes consequence-centered rather than dependent on algorithm literacy.
- Expert review remains valuable but bounded, inspectable and non-sovereign.
- Interfaces can support progressive disclosure without turning summaries into authority or clicks into comprehension.
- Thirty executable cases test layered review, delegation, brief fidelity/accessibility, interaction evidence, teach-back, change and suspension.
