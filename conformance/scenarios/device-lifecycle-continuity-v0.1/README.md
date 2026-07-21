# Device Lifecycle Continuity v0.1

- Status: Executable Adversarial Fixture
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

This fixture asks whether household intent survives ordinary change. One IEC-bound reading-light function-position role keeps the same requirement while its Physical Asset and Digital Endpoint are replaced. The JSON retains `hwm:FunctionalSlot` and `hwm-lifecycle:fulfills` only as migration compatibility projections.

It verifies five failure-prone distinctions:

1. `replaces` does not imply identity or equivalence;
2. evidence freshness is independent of Claim temporal applicability;
3. `valid_time` uses an exact `at` or a half-open interval [`from`, `to`);
4. deleting a sensitive payload retains an authorized, non-sensitive tombstone and durable summary;
5. a physically earlier but late-known observation creates Action Trace revision 2 and never rewrites revision 1.

It also carries the first candidate HWM RO-Crate binding. `ro-crate-metadata.json` must project to the complete transitional `manifest.json` without losing household scope, Authority state, Profile requirements, resource integrity, or unknown extension values. RO-Crate relation arrays are treated as unordered.

`claim-id-collision.input.json` is deliberately semantically invalid: both envelopes are structurally valid, but reuse one Claim identifier for different immutable Claim Bodies. A conforming package reader must reject the collision as an integrity conflict.

Run:

```sh
node conformance/scenarios/device-lifecycle-continuity-v0.1/validate.mjs
node conformance/scenarios/device-lifecycle-continuity-v0.1/ro-crate-equivalence.mjs
```

The fixture uses unsigned Records and synthetic identifiers. It proves discussion semantics and one internal package projection, not production security, external implementation independence, full RO-Crate 1.3 validation, or an adopted standard.
