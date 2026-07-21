# ADR-011 — Separate Evidence Standing from Household Authority

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-011-separate-evidence-standing-from-household-authority.zh-CN.md`](ADR-011-separate-evidence-standing-from-household-authority.zh-CN.md)
- Related Profile: [`Evidence Standing Profile v0.1`](../../spec/profiles/evidence-standing/v0.1/README.md)

## Context

The Interactive Evidence Profile allows a household member to answer a proposition-bound question. The Minimal Authority Profile can authorize capture, disclosure, action, and confirmation duties. Neither contract answers a different question: **is this particular Record fit to participate in resolving this kind of proposition for this purpose?**

A generic `admin`, `owner`, or `trusted user` role is unsafe here. A household administrator may authorize camera access without being qualified to certify electrical installation. A resident may report their own comfort or a visible change without measuring illuminance. A licensed professional may attest an inspection within a credential, procedure, time, and jurisdiction, but cannot define another resident's preference. A device acknowledgement proves neither physical effect nor user acceptance.

## Decision

1. HWM defines **Evidence Standing** as a Profile-local admission decision over one Record, one target proposition, one purpose, one time, and one Authority state.
2. Evidence Standing is not a property or rank of a person, device, role, or credential. It can differ for the same source across predicates, spaces, procedures, purposes, and times.
3. The decision chain keeps these questions separate:
   - did a source produce the Record and can that binding be verified;
   - may the Record be captured, retained, disclosed, and used;
   - does a named standing grant cover its source, evidence kind, relation, proposition, scope, procedure, purpose, time, and optional qualification;
   - does the Resolver policy consider the admitted evidence sufficient or conflicting;
   - is an action authorized and are its confirmation Duties satisfied;
   - is a professional or jurisdictional acceptance separately required.
4. Standing results are `admitted`, `excluded`, or `indeterminate`. `admitted` only permits participation in resolution. It does not mean the Record is true, sufficient, independent, legally conclusive, or accepted by the household.
5. A standing grant is Authority-plane policy. An Agent cannot create or widen one through ordinary Claims or by asking a broader natural-language question.
6. Grants use opaque actor and role identifiers. Core does not define a universal household hierarchy, age rule, voting rule, or professional registry.
7. Self-experience and self-preference MAY be granted narrowly. A statement about one's own experience does not become an objective measurement or another subject's preference.
8. Professional standing, when required, is bounded by credential type, trusted issuer, status, validity time, jurisdiction, procedure, target property, and scope. Credential verification proves integrity and issuer binding, not proposition truth or universal qualification.
9. Missing standing fails closed. Unavailable identity, credential status, or newer Authority state is `indeterminate`; known mismatch, expiry, revocation, or missing grant is `excluded`.
10. Multiple incompatible admitted Records remain available to the Resolver. Standing does not implement majority voting, source scoring, or conflict erasure.
11. Core remains unchanged. Evidence Standing composes the existing Authority, Record, Evidence Link, Resolver, and World View contracts.

## Evaluation Order

The baseline Profile evaluates:

1. authenticated Authority input and Authority Epoch;
2. source identity binding;
3. separate permission to use the Record as evidence;
4. source or opaque role selector;
5. evidence kind, Evidence Link relation, purpose, proposition predicate and subject scope;
6. spatial scope, exact-question binding, direct-experience and procedure constraints;
7. optional professional qualification and jurisdiction;
8. grant validity time.

Known denial takes precedence over epistemic admission. Missing information never becomes a grant.

## Consequences

- Household governance can be expressive without assigning anyone global truth authority.
- Interactive confirmation can safely admit narrow firsthand evidence while blocking scope inflation.
- Professional verification and resident acceptance remain independently representable.
- Implementations need one more policy decision before evidence-path resolution, but do not need a new Core entity or a universal trust score.
- Historical Records remain preserved, subject to privacy policy, even when a later View excludes them under a changed standing policy.

## Alternatives Considered

### Treat every authorized household response as competent evidence

Rejected. Permission to answer or disclose does not establish fitness for every proposition.

### Add a global trust or confidence score to every actor

Rejected. It hides predicate, method, purpose, time, and jurisdiction dependencies and creates unsafe cross-domain inference.

### Reuse action confirmation duties

Rejected. An ODRL Duty or XACML Obligation governs what must happen before permission is exercised. It does not decide whether an attestation is epistemically fit for a different proposition.

### Put professional roles into Core

Rejected. Role meaning, licensure, scope, and jurisdiction vary and belong in deployment Profiles and trust configuration.

## Standards Boundary

- ODRL supplies permission, prohibition, assignee, target, action, constraint, and Duty structure.
- XACML supplies attribute-based authorization inputs and `Permit`, `Deny`, `Indeterminate`, and `NotApplicable` semantics.
- Verifiable Credentials can secure identity or qualification assertions but explicitly do not establish the truth of embedded claims or decide issuer trust for every purpose.
- SOSA/SSN supplies observation, procedure, feature-of-interest, and observed-property semantics. It does not decide whether a household Resolver should rely on an observation.

The HWM residual behavior is the deterministic composition of these mechanisms at the evidence-to-resolution boundary.

## Validation Required Before Acceptance

1. Two independent implementations reproduce the standing oracle without a global actor score.
2. A privacy review confirms that exclusion reasons do not reveal hidden identities, credentials, or Records.
3. A security review validates production proof, credential-status, Epoch, and policy-distribution behavior.
4. At least one household installer and one licensed-domain reviewer challenge the professional-scope cases.
