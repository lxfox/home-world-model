# HWM Semantic Capability Negotiation Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`capability-offer.schema.json`](capability-offer.schema.json), [`capability-requirement-set.schema.json`](capability-requirement-set.schema.json), [`capability-qualification-assessment.schema.json`](capability-qualification-assessment.schema.json)

## Purpose

This optional Profile determines whether an Agent implementation has the semantic and runtime capabilities required for one household purpose. It expands the coarse compatibility axis in [Agent Admission](../../agent-admission/v0.1/README.md) without treating parsing, schema validation, self-declaration, conformance evidence, runtime availability, household trust, access, or action authority as the same thing.

The normative chain is:

`purpose-bound Capability Requirement Set + content-bound Agent Capability Offer + evidence/standing/runtime checks -> Capability Qualification Assessment -> Agent Admission compatibility input`

## Capability is multidimensional

For each exact Profile/version and declared role, an Offer distinguishes:

- `transport_parse`: decode the envelope and media type;
- `schema_validate`: apply the declared structural schema;
- `round_trip_preserve`: retain required and unknown extension content without semantic loss;
- `semantic_consume`: interpret the Profile's normative states and boundaries;
- `semantic_produce`: emit conforming artifacts;
- `semantic_evaluate`: reproduce the declared decision semantics from inputs;
- `procedure_adapter`: invoke a named external domain procedure with declared inputs/outputs;
- `runtime_execute`: make that adapter available in the current execution environment.

Supporting one role never implies another. A relay may preserve opaque data without understanding it. A validator may reject malformed content without evaluating household semantics. A planner may consume a Prediction without being qualified to produce or validate the simulation behind it.

## Capability Offer

An immutable, short-lived Offer binds the implementation/vendor-neutral software identity, build/version, instance/environment class, supported canonicalization and proof suites, exact Profile versions, semantic roles, invariant/test-suite identifiers, unknown-extension behavior, domain procedures/adapters, limits, evidence bindings, evidence level, observed runtime status, issued/expiry time, and proof.

Evidence level is one of:

- `self_declared`
- `implementation_tested`
- `independent_implementation_tested`
- `production_observed_for_declared_scope`

These labels describe provenance, not universal quality. A Requirement Set names the minimum acceptable level and evidence policy. Passing HWM's project-owned fixtures is `implementation_tested`, not independent consensus or production safety.

An Offer cannot self-certify its evidence standing. Evidence bindings are separately checked for integrity, issuer/runner, suite content, implementation/build identity, environment, time, result, coverage, and accepted standing.

## Requirement Set

The household or purpose owner publishes a content-bound Requirement Set that declares:

- purpose, audience, requested semantic operation, and time;
- exact required and optional Profile/version/role combinations;
- required invariant or oracle-suite bindings and minimum evidence level;
- canonicalization, proof, unit/vocabulary mapping, extension preservation, privacy, and offline-resolution requirements;
- named domain procedures and runtime adapters where necessary;
- acceptable explicit degradation paths; and
- fail-closed behavior for missing, unsupported, stale, or indeterminate capability.

The exact Profile/version/role requirements may be derived from a conformant [Profile Composition Conformance Set](../../profile-composition-conformance/v0.1/README.md). Composition closure says what the exchange contract requires; this Profile still determines whether this implementation/build/environment can perform those roles.

Profile ID equality does not establish version compatibility. Newer versions are not automatically backward compatible. A non-exact version qualifies only through an accepted, direction-specific compatibility mapping with declared information-loss and semantic limits.

## Qualification

Each required capability receives:

- `qualified`
- `qualified_with_limits`
- `not_qualified`
- `indeterminate`

The overall result uses the same four states. Required capability failure cannot be hidden by unrelated optional capabilities. Missing optional capability remains an explicit limitation.

Qualification checks exact offer/request content, freshness, implementation/build binding, version mapping, role, invariant coverage, evidence standing/level, extension behavior, proof/canonicalization, domain procedure, current adapter/runtime status, and declared limits.

Schema validation alone never qualifies semantic consumption or evaluation. A single scalar benchmark score cannot replace per-capability evidence. Model-family reputation, vendor name, parameter count, general intelligence, or natural-language explanation is not conformance evidence.

## Explicit degradation

If the Requirement Set permits it, qualification may return one of these content-bound modes:

- `read_only_limited`: consume only a declared subset and produce no governed artifacts;
- `opaque_relay`: preserve and forward content without semantic interpretation;
- `qualified_mediator_required`: route named operations to a separately qualified component;
- `refuse_unsupported_operation`.

Degradation is never silent. Opaque relay cannot make semantic decisions. A mediator's capability, trust, access, attribution, and authorization are independently evaluated; the requesting Agent cannot inherit them.

## Runtime and change

Capability is time- and environment-bound. A tested adapter that is not installed, configured, reachable, licensed, or healthy is not currently executable. Conversely, runtime reachability does not prove semantic qualification.

Agent software/build, adapter, Profile, test suite, compatibility mapping, evidence, or environment changes create a new Offer and Assessment. Existing Admission/Lease does not silently expand. [Change Impact Revalidation](../../change-impact-revalidation/v0.1/README.md) may require compatibility refresh for current use.

## Relationship to trust and authority

Capability Qualification is an input to the Agent Admission compatibility axis. It does not establish Trust Root acceptance, instance proof, vendor identity, evidence truth, household subject, World View access, raw package access, proposal permission, dispatch permission, safety, or outcome quality.

An incapable Agent may still be trusted as an identity; a capable Agent may remain untrusted or unauthorized. Admission and every downstream action retain their own gates.

## Invariants

1. Parse, validate, preserve, consume, produce, evaluate, adapt, and execute are separate capabilities.
2. Capability is Profile-, version-, role-, purpose-, implementation-, environment-, and time-bound.
3. Self-declaration cannot establish evidence standing.
4. Project-owned fixture success is not independent or production evidence.
5. Newer version is not automatically compatible; mapping direction and loss are explicit.
6. Unknown required semantics must be preserved opaquely or rejected, never silently discarded.
7. Opaque relay cannot interpret or decide.
8. Runtime availability and semantic qualification are independent.
9. Optional limitations remain machine-visible.
10. Required failures cannot be averaged away by a capability score.
11. Mediator capability and authority do not transfer to the requesting Agent.
12. Capability grants no trust, access, identity, Lease, permission, safety, or action.

## Conformance

The [Semantic Capability Negotiation oracle](../../../../conformance/scenarios/semantic-capability-negotiation-v0.1/README.md) tests role separation, versions, evidence levels/standing, extensions, adapters, runtime, degradation, mediation, refresh, and forbidden authority inference.

```sh
node conformance/scenarios/semantic-capability-negotiation-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
