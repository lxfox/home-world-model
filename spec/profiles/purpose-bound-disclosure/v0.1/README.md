# HWM Purpose-Bound Disclosure Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`disclosure-requirement-set.schema.json`](disclosure-requirement-set.schema.json), [`disclosure-package-manifest.schema.json`](disclosure-package-manifest.schema.json), [`disclosure-minimization-assessment.schema.json`](disclosure-minimization-assessment.schema.json)

## Purpose

This optional Profile makes household-to-Agent disclosure reproducible without claiming that an open-world system can prove an absolute global minimum.

The normative chain is:

`purpose + exact consumer/output contract -> Disclosure Requirement Set + current Authority/disclosure policy -> transformed Disclosure Package Manifest -> independent Disclosure Minimization Assessment -> bounded release/use decision`

The Profile evaluates minimization; it does not grant access, establish truth, accept evidence, authorize action, or prove safety.

## Requirement Set

A consumer declares the semantic operations it must perform and, for each requested element, required meaning, precision, spatial/temporal resolution, freshness, coverage, uncertainty, provenance, and failure behavior. It also declares audience, purpose, output contract, retention, onward-disclosure, training, logging, deletion, and derived-output constraints.

“Useful context”, “everything relevant”, model preference, token budget, convenience, and speculative future use are not requirements. The producer independently evaluates the request; consumer self-declaration is not necessity or permission.

## Disclosure Package

An immutable Manifest binds exact source World Views/artifacts and lists each released item, transformation, semantic loss, residual precision, audience, purpose, expiry, retention/deletion obligation, and output-use restriction. Permitted transformations include omission, aggregation, generalization, pseudonymization, clipping, feature extraction, bounded summary, opaque handle, and local-compute/result-only release.

The package declares coverage and unresolved/withheld states without leaking hidden identities or counts. A derived value may be more sensitive than any input. The Manifest therefore declares inference and linkage classes for the package as a whole, not only per field. Pseudonyms are not anonymous when stable linkage, household topology, time series, or auxiliary data permits re-identification.

## Minimization Assessment

An independent Assessment checks exact bindings, Authority/disclosure-policy result, purpose and audience alignment, per-item necessity, contract sufficiency, dependency closure, precision proportionality, freshness, inference/linkage risk, retention, onward use, output leakage, and available lower-risk alternatives.

Its result is:

- `qualified`: sufficient, every released item is justified, and no known lower-risk qualifying candidate exists under the accepted candidate set and policy;
- `qualified_with_limits`: usable only with declared limitations or confirmation;
- `not_qualified`: unauthorized, insufficient, unjustified, excessive, or policy-incompatible; or
- `indeterminate`: evidence, coverage, risk, or alternative comparison is unresolved.

`qualified` is relative to the content-bound Requirement Set, policy, candidate transformation set, time, and known auxiliary context. It is never proof of an absolute or future-proof global minimum.

## Composition and output boundary

Each [Work Slot Assignment](../../cross-agent-work-composition/v0.1/README.md) binds its own Requirement Set, Package Manifest, and Assessment. A parent Agent's view is not a worker's disclosure basis. Combining individually qualified packages requires a new package-level linkage assessment.

Outputs are governed too. A worker may reconstruct or reveal withheld inputs through free text, coordinates, embeddings, traces, logs, cache, model training, or downstream tool calls. The output contract declares allowed semantic fields and provenance; output inspection is separate from input minimization. Private chain-of-thought is neither required nor an acceptable disclosure channel.

## Change, expiry, and deletion

Purpose, audience, output contract, source content, Authority epoch, disclosure policy, auxiliary context, transformation, retention, or risk-registry change creates a new Assessment. Revocation and expiry prohibit prospective use but do not erase historical provenance. Deletion/crypto-shredding produces a privacy-safe receipt or tombstone where policy permits; it does not prove copies outside the controlled boundary were deleted.

## Invariants

1. Requested, necessary, authorized, disclosed, sufficient, minimized, and safe are distinct.
2. Consumer self-declaration proves neither necessity nor permission.
3. Minimization is relative to an exact purpose, contract, policy, candidate set, time, and known auxiliary context.
4. Every disclosed item has a semantic necessity rationale; convenience is insufficient.
5. Sufficiency includes interpretive dependencies, uncertainty, limitations, and coverage—not only payload fields.
6. Precision and resolution are minimized independently of field inclusion.
7. Package-level inference/linkage risk is evaluated after composition.
8. Pseudonymization is not anonymity and aggregation is not automatically private.
9. Withholding leaks no hidden identifier, count, or truth value.
10. Input qualification does not qualify worker output, logging, training, retention, or onward disclosure.
11. Revocation is prospective and deletion receipts do not prove deletion outside the governed boundary.
12. Disclosure qualification grants no evidence standing, household fact, responsibility, Lease, or action authority.

## Conformance

The [Purpose-Bound Disclosure oracle](../../../../conformance/scenarios/purpose-bound-disclosure-v0.1/README.md) tests purpose binding, field and precision necessity, dependency sufficiency, linkage, transformations, worker composition, output leakage, expiry, and forbidden authority inference.

```sh
node conformance/scenarios/purpose-bound-disclosure-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define universal privacy preferences, legal compliance, differential-privacy parameters, identity proofing, access-control syntax, confidential computing, model training policy, or a mathematical proof of globally minimal information.
