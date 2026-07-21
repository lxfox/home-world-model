# Action Attempt v0.1 oracle

This oracle tests the [Action Attempt Profile](../../../spec/profiles/action-attempt/v0.1/README.md) with 32 semantic cases and 34 forbidden inferences. It separates Attempt, Transmission, Acknowledgement, Observation, and Effect Assessment, and fails closed on ambiguous non-deduplicated delivery.

Run `node conformance/scenarios/action-attempt-v0.1/validate.mjs`.
