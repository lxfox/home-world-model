# ADR-010: Resolve Facts Without Promoting Claims

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-010-resolve-facts-without-promoting-claims.zh-CN.md`](ADR-010-resolve-facts-without-promoting-claims.zh-CN.md)

## Context

A household model may begin with imported geometry, a phone scan, an Agent inference, or a device association hypothesis. Later, a camera observation, household confirmation, or an active interaction such as “I turned on the bedroom night light; did you see it?” may justify relying on part of that model. A resident may also reject or correct the Agent's understanding.

Calling this “promoting a view into a fact” is useful conversationally but unsafe as a data operation. It can imply mutation of the original Claim, a universal truth flag, or acceptance beyond the exact proposition, purpose, time, and Authority that evaluated the evidence.

External standards preserve important parts of the process but not the whole decision. SOSA/SSN describes observations, actuations, procedures, results, and Features of Interest. PROV-O describes generation, derivation, attribution, and invalidation, while PROV-AQ explicitly separates trust in provenance from trust in the described resource. Web Annotation can bind a question or reply to an exact target. Verifiable Credentials can protect issuer statements and attach evidence, but verifiability does not make their claims true; the verifier still applies its own policy.

## Decision

1. HWM MUST NOT add a global `Fact` class, mutable `fact_status`, or “promote Claim” operation.
2. “Accepted fact” is conversational shorthand for a World View resolution that is `available`, epistemically `accepted`, temporally applicable, sufficiently fresh for its declared purpose, and produced under a named Resolver Profile and Authority epoch.
3. Evidence never changes a Claim Body. New evidence creates an append-oriented Evidence Link and a new immutable World View. Earlier Views remain valid historical snapshots of what was known then.
4. Visual evidence MUST identify the exact target Claim or proposition scope, Feature of Interest, observed property, procedure, phenomenon/result time, source artifact or digest, and evidence origin. A vision-model report derived from one frame is not independent of another report derived from the same frame.
5. A household confirmation MUST bind to an exact question and target proposition. An unbound answer such as “yes, I saw it” is not a `confirms` relation when “it” cannot be resolved without ambiguity.
6. Evidence has a scope ceiling. Confirmation that an endpoint produced a visible change in one bedroom challenge MAY support that narrow endpoint–zone association under the named policy. It MUST NOT confirm exact pose, manufactured-asset identity, illuminance, requirement satisfaction, or repeatable causality in other contexts.
7. When an action is used as a challenge, authorization, dispatch, acknowledgement, physical observation, effect assessment, and household attestation remain separate Action Trace dimensions. Device acknowledgement alone proves no physical effect.
8. A negative answer or `refutes` Evidence Link contests the target Claim but does not create its logical negation or an alternative location Claim. A World View MUST be able to represent one Candidate challenged by a refuting Record.
9. A correction creates a new Claim and explicit supersession or replacement relation, plus evidence supporting the correction and, where applicable, refuting or retracting the earlier Claim. The new Claim changes the current View only when it satisfies the declared admission policy; an unverified correction cannot hide a previously qualified Claim.
10. Resolver admission policy is explicit, versioned, purpose-bound, and governed by Authority. HWM standardizes the evidence and result boundaries, not one universal confidence score or truth algorithm.
11. Evidence-use permission does not itself establish epistemic fitness. The optional Evidence Standing Profile separately decides whether a Record may enter resolution for the target proposition and purpose.
12. Biometric recognition, covert person tracking, and universal household-authority rules remain outside Core. The Interactive Evidence Profile MUST minimize captured media and disclose only evidence authorized for the View purpose.

## Consequences

- Different Agents can reproduce why a household proposition was accepted without inheriting another Agent's private confidence state.
- Residents can correct the model while preserving an auditable history of earlier Claims and Views.
- Active interaction becomes a legitimate fallback evidence path, but only for the proposition actually tested.
- The World View schema must allow `contested` with one Candidate plus a refuting Record; requiring a fabricated second Claim is rejected.
- No new top-level world primitive is introduced.

## Validation Required Before Acceptance

- Two independent resolvers must reproduce all admission and correction cases.
- The single-Candidate contested World View must validate against the published Core Schema.
- An external implementer must challenge the exact-question, evidence-origin, scope-ceiling, and qualified-supersession rules.
- Privacy review must cover camera artifacts, household attestations, access denial, retention, and deletion.

## References

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [PROV-AQ trust boundary](https://www.w3.org/TR/prov-aq/)
- [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)
- [Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/)
