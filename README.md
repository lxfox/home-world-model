# Home World Model

> What must an Agent know before it can act responsibly in a home?

Home World Model (HWM) is an early open-source discussion project for portable, Agent-readable household knowledge. It explores how household facts, evidence, decisions, actions, and corrections can remain understandable across devices, platforms, and Agents.

- Status: Discussion Candidate
- Core version: 0.1.0
- Normative language: English
- Simplified Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

This repository is a curated public projection. It contains the material needed to understand, implement, test, and discuss HWM. Internal handoffs, product operations, website work, evaluator keys, unpublished candidates, and project-only checkpoints are intentionally excluded.

## Current thesis

HWM is not a replacement for Matter, Home Assistant, KNX, BIM, Brick, SOSA/SSN, Web of Things, or an Agent runtime. It is a small family of compositional application Profiles and conformance contracts over existing standards.

Its conceptual kernel is:

```text
H = (EntityRef, Claim, Record | Authority)
```

- `EntityRef` provides a stable handle without silently asserting identity.
- `Claim` is an immutable proposition and issuance statement.
- `Record` captures an observation, action, attestation, revision, or deletion.
- `Authority` governs visibility, resolution, authorization, and action.
- `World View` is an immutable, purpose-, time-, and Authority-bound resolution snapshot.

The smallest current HWM-owned behavioral surface is Claim Envelope, World View, and Action Trace, plus an HWM Profile over RO-Crate 1.3 for package exchange.

## Start here

1. [Model Thesis](docs/00_context/model-thesis-v0.1.md)
2. [模型论纲](docs/00_context/model-thesis-v0.1.zh-CN.md)
3. [Core discussion candidate](docs/00_context/home-world-model-core-v0.1.md)
4. [Glossary](docs/00_context/glossary.md)
5. [Domain model](docs/02_domain-model/README.md)
6. [Core JSON Schemas](spec/core/v0.1/schema/)
7. [Conformance scenarios](conformance/README.md)
8. [Base Exchange challenge](interop/challenges/base-exchange-v0.1/README.md)
9. [Specification governance](governance/v0.1/README.md)

## Participate

- Use [GitHub Discussions](https://github.com/lxfox/home-world-model/discussions) for questions, interpretations, use cases, and design objections.
- Use Issues only for reproducible defects in public artifacts.
- A Discussion, star, fork, or implementation does not by itself establish consensus or adoption.
- Do not submit household data, credentials, private prompts, biometric material, secrets, or proprietary telemetry.

The formal semantic-falsification intake is not open yet. General discussion must not be represented as a frozen trial submission.

## Repository boundary

[`PUBLIC-MANIFEST.json`](PUBLIC-MANIFEST.json) lists every exported file and digest. The public projection is generated from an internal workspace using an explicit allowlist and fails closed if internal or evaluator-side paths appear.

## License

- Software, tools, JSON Schemas, and reference implementations: [Apache License 2.0](LICENSE).
- Project-authored narrative, specifications, translations, diagrams, and synthetic fixtures: [CC BY 4.0](LICENSES/CC-BY-4.0.txt).
- Third-party material retains its original terms. Project names and logos are not licensed as trademarks.
