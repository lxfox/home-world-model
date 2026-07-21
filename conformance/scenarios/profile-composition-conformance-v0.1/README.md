# Profile Composition and Conformance semantic oracle v0.1

This executable discussion fixture tests the [Profile Composition and Conformance Profile](../../../spec/profiles/profile-composition-conformance/v0.1/README.md). It asks whether an exact purpose-bound Profile set is closed and internally compatible without confusing package declarations, schema validity, implementation capability, independent evidence or Authority.

```sh
node conformance/scenarios/profile-composition-conformance-v0.1/validate.mjs
```

[`composition-cases.json`](composition-cases.json) contains 36 base-set, dependency, version, conflict, cycle, artifact, role, offline-resolution and degradation cases.
