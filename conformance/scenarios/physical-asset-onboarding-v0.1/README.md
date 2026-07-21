# Physical Asset Onboarding semantic oracle v0.1

This executable discussion fixture tests the [Physical Asset Onboarding Profile](../../../spec/profiles/physical-asset-onboarding/v0.1/README.md). Its cases preserve transaction, fulfilment, received-unit, Physical Asset, installation, function-position, Digital Endpoint, commissioning and operational-admission boundaries.

```sh
node conformance/scenarios/physical-asset-onboarding-v0.1/validate.mjs
```

[`onboarding-cases.json`](onboarding-cases.json) contains positive, limited, indeterminate and negative cases. The validator also requires forbidden inferences that prevent payment, delivery, scanning, installation reports, network discovery or commissioning readiness from becoming end-to-end truth or authority.
