# HWM Base-only package fixture v0.1

This fixture proves that the [HWM Base Exchange Set v0.1 release candidate](../../../spec/conformance-sets/base-exchange/v0.1/README.md) can carry a valid household-scoped package with no domain Claims, Records or application artifacts.

The crate contains exactly:

- one RO-Crate Root and descriptor;
- one empty Claim Envelope set and one empty Record set;
- one household scope reference;
- one Authority state reference; and
- exact Core, RO-Crate and Authority Profile declarations.

It contains no Space, device, person, pet, geometry, plan, action, procurement, installation, commissioning or other optional Profile semantics. Empty Claim and Record sets mean “this package discloses no Claims or Records”, not “the household has no facts”.

The validator also tests the Base reader boundary for unknown optional artifacts. An artifact without a governing exact Profile is rejected. A content-bound artifact governed by an unsupported optional Profile may be byte-preserved only when `opaque_relay` is explicitly allowed; the reader emits no semantic interpretation, derived Claim, validation success or Authority result.

```sh
node conformance/scenarios/base-only-package-v0.1/validate.mjs
```

Passing this fixture is implementation-owned evidence, not independent interoperability or permission to access a real household package.
