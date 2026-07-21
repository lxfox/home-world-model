# HWM Agent Admission Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

## Purpose

This optional Profile lets an Agent establish a bounded session with one household without treating parsing, trust, key control, authorization, or action dispatch as the same fact. It composes the HWM Core, Trust Root, Authority, Lease, and World View contracts; it adds no Core primitive.

The entry sequence is:

`untrusted discovery hint → capability offer and request → pinned Trust Root → instance proof → Authority decision → Authority-assigned subject and PoP Lease → purpose-bound World View`

Discovery metadata is routing information only. Before admission, it must not disclose room, person, device, Claim, Record, conflict, or package inventory.

## Artifacts

- [`agent-admission-request.schema.json`](agent-admission-request.schema.json): an untrusted Agent capability offer, requested scope, audience, freshness nonce, and instance-key binding.
- [`agent-admission-decision.schema.json`](agent-admission-decision.schema.json): an Authority result bound to the exact request, accepted Trust Root, Authority Epoch, compatibility result, verified instance binding, assigned subject, exact granted scope, and issued Lease.
- [`../../authority/v0.1/authority-lease.schema.json`](../../authority/v0.1/authority-lease.schema.json): a standalone projection of the Authority Lease.

## Separate Axes

1. **Semantic compatibility:** required Profile identifiers and exact versions, canonicalization, and proof suite can be processed.

The optional [Semantic Capability Negotiation Profile](../../semantic-capability-negotiation/v0.1/README.md) expands this axis when a purpose must distinguish parsing, schema validation, lossless preservation, semantic consumption/production/evaluation, domain adapters, evidence level, and current runtime availability. Its Qualification Assessment feeds `compatibility`; it does not replace trust, instance proof, authorization, or admission.
2. **Household trust:** the decision authenticates under the verifier's independently accepted Trust Root lineage.
3. **Agent instance binding:** the requester proves control of the key or platform binding named in the request.
4. **Authorization:** the existing Authority evaluator returns `allowed`, `denied`, `confirmation_required`, or `indeterminate` for exact purpose, action, audience, and time.
5. **Session admission:** an `allowed` decision assigns the subject and binds an exact, short-lived, proof-of-possession Lease.

None of these axes implies another. Key control does not establish a vendor, human operator, legal owner, or epistemic authority.

## Deterministic Flow

1. Obtain the expected household Trust Root digest through an independent enrollment channel and persist the accepted lineage.
2. Send a short-lived Admission Request to one audience. `agent_instance_handle` is correlation data supplied by an untrusted requester, not an Authority subject.
3. Require every Authority-declared required Profile at an exact supported version. Missing optional Profiles are explicit limitations, not incompatibility.
4. Negotiate one canonicalization and proof suite and verify the request proof independently.
5. Evaluate the requested purposes and actions using the existing Authority Profile. `resolve_view`, `propose_action`, `dispatch_action`, and `submit_record` are distinct actions.
6. Bind the decision to the RFC 8785 canonical SHA-256 digest of the exact request, the accepted Trust Root, and current Authority Epoch.
7. For v0.1, grant either the exact requested scope or none. A narrower or wider scope requires a new request; silent partial grants and expansion are rejected.
8. On `allowed`, the Authority assigns a subject and issues a short Lease whose proof-of-possession binding exactly matches the request instance binding.
9. Verify the Lease digest, audience, Epoch, time window, and proof-of-possession before materializing a purpose-bound World View.

Invalid input fails closed. Unavailable verification material or newer unknown Authority state is `indeterminate`, not `denied`. Pending user enrollment is `confirmation_required`, not permission.

## Standards Reuse and Boundaries

- [RFC 9200](https://www.rfc-editor.org/rfc/rfc9200.html) supplies the authorization-server/resource-server, audience, scope, and proof-of-possession pattern for constrained environments.
- [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html) demonstrates sender-constrained tokens and per-request proof; deployments may bind equivalent semantics to DPoP.
- [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628.html) supplies a pattern for user authorization on a separate device. Its codes and polling are transport UX, not HWM authority or truth semantics.
- Matter commissioning establishes a Matter node's operational credentials and fabric access. It does not admit an HWM Agent, assign an HWM subject, or authorize a World View.

HWM does not invent another OAuth grant, device commissioning protocol, universal identity, or vendor attestation scheme. A deployment binding chooses the concrete transport and proof envelope.

## Invariants

1. Parsing does not grant access; access does not grant proposal or dispatch permission.
2. An Authority response cannot bootstrap the Trust Root used to authenticate that response.
3. An Agent cannot assign its own Authority subject or privileges.
4. An Admission Decision binds the complete request content, not only its identifier.
5. A Lease is audience-, purpose-, action-, time-, Epoch-, and proof-of-possession-bound.
6. User enrollment approval does not make evidence true and is not permanent permission for future actions.
7. World View access does not imply raw package access and must not leak hidden inventory.
8. Matter device commissioning and HWM Agent admission remain independent ceremonies.

## Fixture and Validation

The examples use `unsigned_fixture`; production deployments must reject that proof mode. Run:

```sh
node conformance/scenarios/agent-admission-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

The oracle covers 32 handshake cases, 7 model-boundary cases, and 77 forbidden inferences.

Agent replacement or collaboration after admission is governed by the optional [Agent Continuity Profile](../../agent-continuity/v0.1/README.md). Admission never transfers a source Agent's task context or Lease.
