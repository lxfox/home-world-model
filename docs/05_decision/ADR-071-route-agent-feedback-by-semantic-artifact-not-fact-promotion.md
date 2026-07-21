# ADR-071: Route Agent feedback by semantic artifact, not fact promotion

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-071-route-agent-feedback-by-semantic-artifact-not-fact-promotion.zh-CN.md`](ADR-071-route-agent-feedback-by-semantic-artifact-not-fact-promotion.zh-CN.md)

## Context

The original product intuition described visual or user-confirmed model content as being “promoted to fact” and later “demoted” when corrected. Existing HWM contracts show that a confidence or confirmation ladder would collapse several different products: private task reasoning, Observation, action acknowledgement, household attestation, candidate proposition, derived Assessment, contribution admission and purpose-bound World View acceptance.

The audit also found scope drift: downstream relation, reuse and View-selection exploration had entered the normative README of the bounded empty-selector Core candidate even though those artifacts were excluded from its Manifest and external trial. A self-consistent governance model must keep bounded proposals bounded.

## Decision

1. Route an output according to its semantic product, not model confidence or a generic promotion level.
2. Keep task-local hypotheses ephemeral. Do not persist chain-of-thought or private scratch reasoning as household knowledge.
3. Represent a visual or sensor event as an attributed Observation Record. A separately formulated durable proposition is a candidate immutable Claim with explicit derivation.
4. Represent a device acknowledgement as an Attempt／acknowledgement Record. It does not prove physical effect, causality, goal satisfaction or user acceptance.
5. Represent a household response as an exact-target Attestation Record with `confirms`, `refutes`, `corrects` or `cannot_tell` semantics. Natural-language agreement without recoverable binding is unusable for epistemic resolution.
6. Evaluate source binding, evidence-use permission and Evidence Standing separately. User confirmation is not universally competent evidence for objective measurement, another person's preference, exact pose or persistent causality.
7. Route derived qualification, relation, fit or applicability results to typed Assessments, not Claims.
8. Submit durable Agent artifacts through Model Contribution Admission. Receipt, admission and publication create candidate inputs only; none writes truth.
9. Assign `accepted`, `contested`, `unknown` or `not_verified` only in one exact World View under a named Resolver policy. The status never mutates the Claim.
10. A refuting Record does not mint a negated Claim. A correction creates a new response Record and candidate correcting Claim; qualified supersession affects a later View without deleting history.
11. Remove downstream relation／reuse／View-selection exploration from the normative empty-selector candidate README. Retain it only as explicitly non-normative system exploration until independent evidence justifies a separate proposal.

## Consequences

- “Promotion” becomes an observable pipeline of different immutable artifacts and decisions, not mutation of one knowledge cell.
- Users can confirm exactly what they experienced without accidentally certifying broader technical propositions.
- Agent output can return to the household model while preserving attribution, contestability and correction.
- Twenty-four executable routing cases compose existing Profiles and add no Core or optional Profile artifact.
- The bounded Core candidate again matches its five-input external trial and exact wire counterexample.
