# Target Fit v0.1 Conformance Scenario

This oracle tests the [Target Fit Profile](../../../spec/profiles/target-fit/v0.1/README.md) with 23 semantic cases, nine aggregation cases, and 13 forbidden inferences. It stresses uncertainty at a threshold, wrong room/property/unit/procedure, stale or inaccessible observations, spatial-average misuse, simulation/current-state confusion, and disagreement between measured fit and personal experience.

Run:

```sh
node conformance/scenarios/target-fit-v0.1/validate.mjs
```

Passing proves only the declared fixture semantics. It does not validate a real sensor, comfort model, legal test procedure, calibration chain, or household decision.
