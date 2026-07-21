# Deliberation Eligibility v0.1 Conformance Scenario

This oracle tests the [Deliberation Eligibility Profile](../../../spec/profiles/deliberation-eligibility/v0.1/README.md) with 23 semantic cases and 17 forbidden inferences. It distinguishes Agent-detected gaps from explicit requests, existing Intent drift, Routine occurrences, and safety duties, while testing policy standing, privacy, duplicates, cooldown, and unknown evidence.

Run `node conformance/scenarios/deliberation-eligibility-v0.1/validate.mjs`.

Passing does not prove that a household policy is fair, a notification is appropriate, a gap matters, or any action is authorized.
