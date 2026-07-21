# ADR-017 — Terminate Authority Trust Recursion with a Pinned Root Lineage

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-017-terminate-authority-trust-recursion.zh-CN.md`](ADR-017-terminate-authority-trust-recursion.zh-CN.md)

## Context

The Minimal Authority Profile placed `trust_anchors` and the proof for an Authority Profile Document in the same artifact. That is useful after a verifier already trusts the household, but it cannot establish first contact: an untrusted document cannot make a key trusted merely by listing that key and presenting a matching self-signature.

ADR-016 made content-bound Standing Decisions terminate at an authenticated Authority trust anchor. This ADR specifies where that recursion ends, how continuity is preserved, and what cannot be recovered automatically.

## Decision

1. HWM adds no Core primitive. An optional Authority Profile artifact named **Trust Root** supplies the trust-bootstrap contract.
2. A Trust Root has a stable Authority `lineage_id`, household and Authority identifiers, a strictly increasing `root_version`, an `authority_epoch_floor`, validity interval, verification methods, root and Authority-document roles, an optional precommitted recovery role, and raw proofs over its canonical `signed` body.
3. A genesis Trust Root becomes trusted only through an exact out-of-band pin of its RFC 8785/SHA-256 `signed` digest. The artifact, its controller field, its self-signatures, an Agent Claim, a cloud account, or a household identifier cannot create that pin.
4. A normal N→N+1 rotation binds the exact prior signed root digest and requires both thresholds over distinct verification material, not merely distinct method identifiers:
   - the distinct-signer threshold declared by trusted root N; and
   - the distinct-signer threshold declared by candidate root N+1.
5. `root_version` must advance exactly by one. Lower or equal versions are rollback; a skipped version requires the missing intermediate root. The verifier persists the accepted root in non-volatile local state.
6. Every root transition advances `authority_epoch_floor`. Root version and Authority Epoch remain different axes: policies may advance Epoch without rotating root keys, while a root transition must invalidate older Authority state and cached Leases.
7. Recovery is valid only when root N precommitted an independent recovery method set and threshold. A recovery transition uses that old recovery threshold plus the new root threshold. Recovery keys do not authorize ordinary Authority documents or household actions.
8. If continuity credentials are lost and no recovery policy was precommitted, the system cannot prove continuation. Manual enrollment creates a new `lineage_id`; it must not overwrite or impersonate the old lineage.
9. Two different, independently valid N+1 successors are `contested`. Issuance time, transition kind, controller name, or a preference for recovery does not select a winner automatically.
10. An expired current root may authenticate a sequential update to a current successor. If no current successor can be obtained, expiry yields `indeterminate` and signals a possible freeze; it does not prove attack, compromise, revocation, or false content.
11. Root-role keys, Authority-document keys, and recovery keys are purpose- and verification-material-separated. Aliases of one key do not create a quorum. Production bindings use independent verification results over exact signed content; raw proof fields never self-report successful verification.
12. Acceptance of a Trust Root only enables verification of Authority-plane artifacts. It does not establish legal ownership, settle household disputes, authorize an action, prove physical safety, admit evidence, or establish proposition truth.
13. If an attacker controls the configured root threshold, a malicious but correctly signed successor is cryptographically indistinguishable within this protocol. Recovery then requires an independent precommitted path or out-of-band rebootstrap; the model does not claim otherwise.

## Standards Reuse and Boundary

- [The Update Framework Specification](https://theupdateframework.github.io/specification/latest/) supplies the established pattern of an out-of-band trusted initial root, exact sequential versions, distinct signer thresholds, and old-root plus new-root authorization. HWM reuses those security invariants, not TUF's software-repository roles or wire format.
- [RFC 5011](https://www.rfc-editor.org/rfc/rfc5011.html) demonstrates authenticated trust-anchor rollover, staged successors, revocation concerns, and the residual danger of compromised current keys. HWM does not reuse DNSSEC record formats or timers.
- [W3C DID Core 1.0](https://www.w3.org/TR/did-1.0/#did-recovery) describes recovery as method-specific, recommends key-purpose separation, and notes that no common recovery mechanism applies to every DID method. HWM therefore defines an explicit precommit boundary rather than a universal account-recovery claim.
- [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785.html) supplies JSON canonicalization for exact root-body digest binding.

## Rejected Alternatives

### Trust the keys listed in the Authority document itself

Rejected as circular bootstrap.

### Let the current root alone choose all future root keys

Rejected. Requiring the next root's own threshold detects incomplete or unintended successor configuration and follows the established two-sided continuity pattern.

### Recover from identity, email, cloud account, or household membership

Rejected. Those may be deployment-specific out-of-band enrollment signals, but HWM cannot infer that they continue the old cryptographic lineage or settle legal and social authority.

### Let the newest timestamp or highest root version win

Rejected. It enables fast-forward and fork selection attacks. Versions are accepted only sequentially, and multiple valid successors remain contested.

### Promise recovery after every possible key loss or compromise

Rejected as impossible without a previously trusted independent path. A new lineage is the honest result when continuity cannot be proved.

## Evidence

The executable fixture contains 22 genesis, rotation, key-material separation, recovery, rollback, expiry, unavailable-proof, and fork cases plus five model-boundary cases. It enforces 53 forbidden inferences in independent JavaScript and Python implementations. Passing proves deterministic semantic compatibility under fixture proof results; it does not prove production cryptography, secure key custody, legal ownership, usability, or independent security review.

## Consequences

- Evidence Standing and every Authority-plane Profile can terminate verification at a locally persisted, explicitly bootstrapped root instead of another ordinary Record.
- Household migration can preserve exact lineage when continuity is proven and must expose a lineage break when it is not.
- Production deployments still need a concrete cryptographic suite, secure local storage, enrollment UX, clock policy, key-custody procedures, and external security review.
