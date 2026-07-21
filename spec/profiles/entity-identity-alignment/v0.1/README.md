# HWM Entity Identity Alignment Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`identity-alignment-request.schema.json`](identity-alignment-request.schema.json), [`identity-evidence-bundle.schema.json`](identity-evidence-bundle.schema.json), [`identity-alignment-assessment.schema.json`](identity-alignment-assessment.schema.json)

## Purpose

This optional Profile determines whether two EntityRefs denote the same entity for one declared type, time, household, and purpose without collapsing physical assets, function positions, product models, digital endpoints, representations, spaces, people, pets, or observation tracks.

The normative chain is:

`typed EntityRefs + purpose/time-bound Alignment Request + admitted Identity Evidence Bundle + identity policy -> Identity Alignment Assessment -> explicit identity or non-identity relation Claim candidate -> Contribution Admission -> later World View`

An EntityRef is a handle, not proof of identity.

## Typed request

The Request binds two exact EntityRefs, expected entity kind, household, purpose, comparison time/interval, required identity strength, accepted identifier namespaces, policy, Authority epoch, and intended consequences. Entity kinds include `physical_asset`, `function_position`, `product_model`, `digital_endpoint`, `space`, `spatial_representation`, `authority_subject`, `pet_subject`, and `observation_track`.

Cross-kind inputs cannot produce `same_entity`. They may produce a typed relation such as:

- `asset_realizes_function_position`;
- `asset_exposes_endpoint`;
- `asset_instance_of_product_model`;
- `representation_depicts_space`;
- `asset_replaces_asset`;
- `endpoint_supersedes_endpoint`;
- `part_of`, `co_located_with`, or `functionally_substitutable_for`.

These relations never imply identity.

## Evidence Bundle

The immutable Bundle binds exact evidence, source origins, Standing Decisions, validity intervals, identifier namespaces and issuers, collision/reassignment properties, physical-presence challenge, commissioning/installation/replacement Records, cryptographic attestations, user attestations, topology, and declared negative evidence.

Evidence strength is policy-specific. A serial number needs manufacturer/namespace and collision handling. A Matter node/fabric identifier is fabric-scoped; a Home Assistant entity ID, IP/MAC address, room label, display name, visual resemblance, position, or product model is not a universal physical-asset identity. Cryptographic key continuity may identify an endpoint credential lineage, not the chassis, function position, owner, or person.

Independent observations derived from the same image, scan, database, or commissioning event share one Evidence Origin and are not counted as independent corroboration.

## Assessment

The result is:

- `same_entity`: exact typed identity is sufficiently supported for the declared purpose/time;
- `distinct_entities`: admitted evidence establishes non-identity;
- `related_not_identical`: one explicit typed relation is supported while identity is rejected or inapplicable;
- `unresolved`: evidence is missing, stale, conflicting, inaccessible, or below policy threshold; or
- `integrity_conflict`: one supposedly unique stable identifier is bound to incompatible entities/content.

The Assessment records per-evidence standing, temporal applicability, namespace scope, collision risk, independence, type compatibility, relation result, confidence/limitations where policy permits, and consequences allowed. A scalar similarity score cannot establish identity by itself.

Request, Evidence Bundle, and Assessment are content-bound with exact SHA-256 digests. Authority Epoch is a non-negative integer. Intended and allowed consequences use a closed vocabulary limited to identity evaluation, typed relation Claim proposals, declared-use reference qualification, and dependency revalidation. The wire contract cannot encode property, ownership, access, Lease, or Authority transfer as an alignment consequence. `same_entity` requires same-kind inputs and sufficient evidence; `related_not_identical` requires the exact supported relation.

## Lifecycle and time

Identity is temporal where identifiers can be reassigned. Same network address at different times may denote different endpoints; changed address may still belong to one endpoint. Asset replacement creates a new Physical Asset even when the function position and household Intent persist. Endpoint replacement need not replace the asset. A geometry revision may represent the same Space when its identity basis persists; a spatial split or merge creates new space identities and explicit lineage.

An accepted alignment is immutable and time-bound. New collision evidence, replacement, identifier reassignment, Authority transition, or correction creates a new Assessment and may trigger [Change Impact Revalidation](../../change-impact-revalidation/v0.1/README.md). Spatial representations and their frames are separately registered through the [Spatial Registration and Localization Profile](../../spatial-registration-localization/v0.1/README.md). Identity alignment never rewrites earlier Claims or retargets their subjects.

## People, pets, and tracks

This Profile does not standardize biometric recognition. An `observation_track` cannot be promoted to an `authority_subject` or `pet_subject` by facial, voice, gait, location, or behavioral similarity alone. Household Authority may issue a subject handle and admit an exact, consent-appropriate binding under a separate identity procedure. Refusal or unavailable biometric data remains unresolved, not evidence of absence or a different person.

## Contribution and use

An Assessment may generate an explicit relation Claim candidate through [Model Contribution Admission](../../model-contribution-admission/v0.1/README.md). It does not silently merge identifier indexes. Downstream artifacts may inherit properties only when their Profile explicitly permits it for the exact relation, type, time, purpose, and dependency closure. `same_entity` itself does not transfer ownership, access, Authority, capabilities, requirements, installed influence models, or action authorization.

## Invariants

1. EntityRef equality, identifier equality, exact identity, equivalence, representation, replacement, realization, instance-of, topology, and substitutability remain distinct.
2. Identity is entity-kind-, household-, namespace-, purpose-, time-, policy-, and evidence-bound.
3. Cross-kind pairs cannot be `same_entity`.
4. Display name, label, location, appearance, product model, or network address alone is insufficient.
5. Scoped identifiers never become universal identifiers.
6. Evidence sharing one origin is not independent corroboration.
7. Replacement never implies identity or equivalence.
8. Function position continuity never makes old and new assets identical.
9. Identifier reassignment and collision remain explicit integrity risks.
10. Human/pet subject identity is not inferred from observation tracks or biometrics by this Profile.
11. Alignment appends explicit Claims and never silently rewrites EntityRefs or historical subjects.
12. Identity alignment grants no ownership, trust, disclosure, capability, responsibility, standing, or action authority.

## Conformance

The [Entity Identity Alignment oracle](../../../../conformance/scenarios/entity-identity-alignment-v0.1/README.md) tests type boundaries, scoped identifiers, replacement, endpoint/asset/function position separation, representations, origin deduplication, temporal reassignment, subject privacy, and forbidden property/authority transfer.

```sh
node conformance/scenarios/entity-identity-alignment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define a universal ID, biometric system, global entity-resolution model, probabilistic fusion algorithm, ownership registry, Matter commissioning replacement, person tracker, graph merge operation, or universal identity confidence threshold.
