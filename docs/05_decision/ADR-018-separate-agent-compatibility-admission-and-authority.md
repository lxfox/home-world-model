# ADR-018: Separate Agent Compatibility, Admission, and Authority

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-018-separate-agent-compatibility-admission-and-authority.zh-CN.md`](ADR-018-separate-agent-compatibility-admission-and-authority.zh-CN.md)

## Context

HWM intends to be readable by any conforming Agent. That statement is ambiguous unless it separates syntactic discovery, semantic compatibility, household trust, Agent instance proof, data disclosure, proposal permission, and device dispatch. Treating these as one “connection” operation would let a self-declared Agent identity bootstrap trust, turn parser capability into access, or turn device commissioning into household authority.

## Options

1. Let every Agent read the raw household package after it declares compatible capabilities.
2. Build a new HWM identity, login, and commissioning protocol.
3. Define an optional admission composition over existing Trust Root, Authority, Lease, and World View contracts.

## Decision

Choose option 3.

HWM Agent Admission has five independently reported axes: semantic compatibility, household Trust Root trust, Agent instance binding, Authority authorization, and session admission. It introduces no Core primitive.

An Admission Request is untrusted input. Its instance handle is a correlation label, while its key binding is subject to independent proof verification. The household publishes only minimal admission requirements before authorization and does not disclose household inventory.

Compatibility requires exact versions of all required Profiles plus a common canonicalization and proof suite. Missing optional Profiles are reported as limitations. Incompatibility remains a separate axis and does not add a fifth Authority result.

The verifier pins the Trust Root through an independent channel before trusting an Authority Decision. The Decision binds the complete canonical request digest, accepted root lineage, Authority Epoch, compatibility result, verified instance binding, Authority-assigned subject, exact scope, and exact Lease digest.

For v0.1, the granted scope must equal the request. The Authority must require a new request to narrow or expand it. An allowed decision issues a short proof-of-possession Lease whose key binding, audience, purpose, actions, validity, and Epoch are verified before materializing a World View.

`resolve_view`, `propose_action`, `dispatch_action`, and `submit_record` are distinct permissions. World View permission does not expose the raw package. User enrollment approval is scoped to the request; it does not make evidence true or permanently authorize later actions.

Matter commissioning remains a device/fabric ceremony. A commissioned Matter node is not thereby an admitted HWM Agent, and a Matter ACL is not an HWM purpose-bound World View decision.

## Consequences

- “Any Agent can read HWM” means any Agent may implement and negotiate the public contracts; it does not mean anonymous access to household state.
- Implementations can reuse OAuth/ACE, DPoP/CWT, user-code enrollment, and Matter transports without assigning those protocols HWM semantic authority.
- Failure remains diagnosable: invalid input fails closed, unavailable proof or unknown newer Authority state remains indeterminate, and pending human enrollment remains confirmation-required.
- Agents cannot name their own Authority subjects or carry a Lease across households, audiences, keys, purposes, or Epochs.
- The additional ceremony is justified at the household boundary; already-admitted local components can reuse a valid Lease until expiry or known Epoch invalidation.

## Evidence

- [`Agent Admission Profile`](../../spec/profiles/agent-admission/v0.1/README.md)
- [`Agent Admission scenario`](../../conformance/scenarios/agent-admission-v0.1/README.md)
- [RFC 9200](https://www.rfc-editor.org/rfc/rfc9200.html)
- [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html)
- [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628.html)
- [Matter access-control guide](https://project-chip.github.io/connectedhomeip-doc/guides/access-control-guide.html)
