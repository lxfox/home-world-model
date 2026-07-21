# HWM public conformance material

This public projection contains fixtures and scenarios needed to inspect the current discussion candidate.

- [`fixtures/`](fixtures/) contains the minimal reading-light package.
- [`scenarios/`](scenarios/) contains domain and boundary stress cases.

The project-maintained evaluator is intentionally kept outside this public repository so independent implementations are not coupled to an internal oracle.

Project-only audits, evaluator keys, hidden expected answers, and publication operations are not part of the public projection. Passing these fixtures proves only the behavior named by the exact fixture; it does not prove production safety, independent interoperability, consensus, or adoption.
