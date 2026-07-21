# HWM Minimal Authority Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`authority-profile.schema.json`](authority-profile.schema.json), [`authority-trust-root.schema.json`](authority-trust-root.schema.json), [`authority-lease.schema.json`](authority-lease.schema.json)

## Purpose

This Profile defines the smallest Authority semantics needed to produce a purpose-limited World View and to distinguish allowed, denied, confirmation-required, and indeterminate Action Proposals in a local-first household.

It is not a complete household constitution. It defines technical trust continuity, not ownership disputes, guardianship, inheritance, cross-household delegation, legal identity, or a universal recovery service.

## Reused Standards

- [W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) supplies the Policy, Permission, Prohibition, Duty, Constraint, assigner, assignee, target, and action concepts. HWM defines a compact JSON Profile and deterministic household evaluation rules over that model.
- [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/) may secure grants using issuer, credential subject, validity period, credential status, evidence, and cryptographic proof. VC verification does not decide which issuer a household trusts; the HWM trust-anchor configuration does.
- [IETF ACE-OAuth, RFC 9200](https://www.rfc-editor.org/rfc/rfc9200.html) may bind runtime authorization to constrained clients and resource servers, including local validation and proof-of-possession.
- [CBOR Web Token, RFC 8392](https://www.rfc-editor.org/rfc/rfc8392.html) may encode constrained leases using issuer, subject, audience, expiration, not-before, issued-at, and token identifier claims.

HWM does not require any one security envelope in Core. A deployment binding must identify the proof suite, key lifecycle, token audience, secure channel, and verifier behavior it uses.

## Profile Artifacts

### Authority Trust Root

An optional Trust Root terminates Authority verification recursion. Its canonical `signed` body separates offline root-role methods, operational Authority-document methods, and optional independent recovery methods. It carries a stable lineage, sequential root version, Authority Epoch floor, validity interval, role thresholds, an exact previous-root binding, and raw proofs.

The genesis root becomes trusted only through an exact out-of-band digest pin persisted by the verifier. Normal rotation requires distinct-signer thresholds from both the current and next roots. Recovery requires the current root's precommitted recovery threshold plus the next-root threshold. Missing continuity creates a new lineage; it cannot be represented as recovery of the old one. See [ADR-017](../../../../docs/05_decision/ADR-017-terminate-authority-trust-recursion.md).

### Authority Profile Document

A Profile document contains:

- household and Authority identifiers;
- current `authority_epoch`;
- the accepted Trust Root lineage, root identifier, version, and Epoch floor used to authenticate the document;
- operational verification-method references asserted by this document;
- ODRL-shaped permissions, prohibitions, constraints, and duties;
- bounded leases issued to Agents or runtime components;
- non-overridable local safety-policy references;
- proof and extension metadata.

This document is an Authority-plane input. It is not an ordinary Claim and cannot be created or elevated by an Agent through the household data plane. Its own `trust_anchors` and proof cannot bootstrap trust: a production verifier accepts document signers only through its already accepted Trust Root and independently verified proof results.

### Lease

A Lease binds one subject to one or more audiences and Policy identifiers for a bounded interval. It includes the Authority epoch at issuance and may appear as an embedded Authority snapshot or as the standalone [`authority-lease.schema.json`](authority-lease.schema.json) projection. Production Leases must be integrity-protected. The [Agent Admission Profile](../../agent-admission/v0.1/README.md) requires a proof-of-possession binding in v0.1 so the Lease is not a portable bearer credential.

An Epoch and a Lease solve different problems:

- Epoch invalidates older authorization state once a verifier learns the new Authority state.
- Lease expiration bounds how long an offline verifier may continue using cached authorization.

An offline verifier cannot know that the household advanced the Epoch while disconnected. HWM therefore makes no claim of instantaneous offline revocation. The maximum stale-authority exposure is bounded by the remaining Lease lifetime and stricter local safety policy.

### Authorization Decision Record

Every disclosure or action decision records at least:

- request and subject identifiers;
- purpose and target action/resource;
- decision time;
- verifier Authority epoch;
- accepted Trust Root identifier and version;
- matched Policy and Lease identifiers;
- applied constraints and unsatisfied duties;
- result and reason codes.

The decision result is one of:

- `allowed`;
- `denied`;
- `confirmation_required`;
- `indeterminate`.

These remain the Core-facing decision results. The optional [Procedure Fulfilment Profile](../../procedure-fulfilment/v0.1/README.md) adds a pre-decision workflow gate named `requirements_pending` for known outstanding consultation, delivery, objection-window, review, or audit work. That gate is not a fifth Authorization Decision result. `confirmation_required` remains the narrower projection for an outstanding affirmative-response Duty.

## Deterministic Evaluation

The baseline evaluator performs these checks in order:

1. **Load accepted Trust Root.** Verify exact lineage, current root state, Authority-document signer role, proof threshold, and `authority_epoch >= authority_epoch_floor`. Missing or unavailable current root state is `indeterminate`; an untrusted self-presented root is never accepted.
2. **Authenticate Authority input.** Invalid proof is `denied`; an unavailable verification key or unavailable Authority state is `indeterminate`.
3. **Check household, subject, audience, and target.** A mismatch is `denied`.
4. **Check time.** Before `not_before` or at/after `expires_at` is `denied`.
5. **Check Epoch.** A Lease Epoch lower than the verifier Epoch is `denied` as revoked/stale. A Lease Epoch higher than the verifier Epoch is `indeterminate` because the verifier is behind.
6. **Match rules and constraints.** No matching Permission is `denied` under closed-world authorization. Unknown constraint input is `indeterminate`.
7. **Apply Prohibitions.** Matching Prohibition overrides Permission.
8. **Evaluate Duties.** A missing confirmation Duty returns `confirmation_required`; another unsatisfied mandatory Duty returns `denied` unless its Profile explicitly defines a prior workflow gate or a different result. Procedure Fulfilment `requirements_pending` stops evaluation before a final decision is issued.
9. **Apply local safety policy.** Agent grants and household Policies cannot override a non-overridable local safety denial.
10. **Allow.** Only a matching Permission with satisfied constraints and duties returns `allowed`.

The evaluator must not interpret missing data as permission.

## Purpose-limited World Views

A Resolver evaluates each requested resolution target before materializing Candidates:

- permitted and non-prohibited target: resolve and disclose only authorized Candidate content;
- prohibited or purpose-mismatched target: `availability_status = access_denied`, `epistemic_status = not_evaluated`, zero Candidates;
- Authority service unavailable: `availability_status = source_unavailable`, zero Candidates;
- unknown policy input: no disclosure and an `indeterminate` Authority Decision Record.

The View may disclose a purpose-specific aggregate Claim while withholding source Claims and Records. It must not leak hidden identities through Claim identifiers, counts, conflicts, reason text, or required package lookup.

## Confirmation Duties

A confirmation Duty identifies:

- the action or Proposal being confirmed;
- authorized confirmer subjects or roles;
- threshold (`all`, `any`, or a count);
- validity window;
- the condition that triggered confirmation;
- confirmation Records used to satisfy the Duty.

When a response concerns a shared-impact Proposal, the confirmation MUST bind the exact Proposal revision. Deployments may use the optional [Bounded Impact Closure Profile](../../bounded-impact-closure/v0.1/README.md) and [Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.md) to produce heterogeneous system-owned requirements and privacy-safe slots. The [Shared Action Coordination Profile](../../shared-action-coordination/v0.1/README.md) evaluates the homogeneous direct-response compatibility subset before this Authority Profile returns a final action decision.

An Agent cannot satisfy a Duty by confirming its own Proposal unless an explicit Policy names that Agent as an authorized confirmer.

## Evidence Standing Boundary

Permission to capture, disclose, answer, or confirm an action does not make every resulting Record epistemically fit for every proposition. Deployments that need this distinction use the optional [Evidence Standing Profile](../../evidence-standing/v0.1/README.md). Action confirmation Duties and Evidence Standing remain separate decisions: the former gates permission to act; the latter gates whether one Record may participate in a named Resolver policy.

## Local Safety

Execution gateways retain non-overridable local safety checks, such as electrical limits, anti-scald limits, mechanical interlocks, and emergency shutdown. Authority `allowed` means “permitted by the evaluated household Policy,” not “physically safe under every runtime condition.”

If local safety denies dispatch, Action Trace records authorization `allowed` and execution `not_dispatched` with the safety reason. The two decisions remain separate.

## Invariants

1. Ordinary Claims cannot create trust anchors, advance Authority Epoch, or grant permission.
2. Every decision is purpose-, subject-, audience-, target-, time-, and Epoch-bound.
3. Prohibition and local safety denial override Permission.
4. Missing permission is denial; missing evaluation input is indeterminate.
5. Required confirmation is neither permission nor device failure.
6. Offline revocation exposure is never represented as zero; it is bounded by Lease expiry.
7. A newer Epoch never rewrites historical decisions or Action Traces.
8. Hidden data is not represented as false and is not indirectly disclosed.
9. Production proof bindings must reject unsigned Authority documents and Leases.
10. A household role or action-confirmation permission must not be interpreted as global epistemic authority.
11. Satisfied coordination is a Duty input, not final permission and not a local-safety override.
12. The system seeking to act owns response, consultation, notification, review, and audit Duties; an affected person is not obligated to answer.
13. A participation slot is not identity, presence, membership, guardianship, or durable delegation.
14. A Trust Root cannot bootstrap itself; genesis trust requires an exact out-of-band pin.
15. Root rotation is sequential and requires unique verification material—not merely unique method IDs—from both current and next root thresholds.
16. Recovery requires a precommitted threshold with a failure domain independent from root material; without it, re-enrollment creates a new lineage.
17. Root version and Authority Epoch are separate axes; every root transition advances the Epoch floor.
18. Multiple valid successor roots are contested and cannot be selected by timestamp or transition type.
19. Root acceptance does not imply legal ownership, evidence truth, action authorization, or physical safety.
20. A Lease subject is assigned by Authority; proof of control over an Agent-provided handle or key does not let the Agent name its own subject or privilege.
21. Semantic compatibility, Agent admission, World View disclosure, proposal permission, and dispatch authorization are separate evaluations.

## Fixture-only Security

The discussion fixtures use `unsigned_fixture` proof mode so that examples remain dependency-free. Conforming production deployments must not accept that mode. Passing the fixture proves semantic compatibility, not cryptographic security.

## Validation

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/authority/v0.1/authority-trust-root.schema.json \
  -d conformance/scenarios/authority-trust-bootstrap-v0.1/trust-root.example.json

node conformance/scenarios/authority-trust-bootstrap-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
