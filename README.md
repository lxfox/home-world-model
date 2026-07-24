# Home World Model

> From connected devices to a home understood

**What must an Agent know to truly understand a home?**

Home World Model (HWM) is an open proposal for household-controlled, portable
knowledge that different authorized Agents can read, question, correct, and use
without silently gaining authority over the home.

This is an early public discussion, not a finished standard or product.

- [Visit the website](https://iot-agent.global.paubeebar.com)
- [Website source](https://github.com/lxfox/home-world-model-website)
- [Simplified Chinese](README.zh-CN.md)
- [Join the discussion](https://github.com/lxfox/home-world-model/discussions)

## Connected does not mean understood

A light can report `on` while the reading surface remains too dark. Motion can
be detected without identifying a family member, visitor, or pet. A timer can
fire without knowing whether today's routine applies. An Agent can call a device
without knowing whether the intended physical effect occurred.

The missing layer is not another device protocol. It is an accountable,
correctable understanding of a particular home across design, construction,
commissioning, daily life, replacement, and migration.

## What might a home world contain?

- **Space** — rooms, openings, furniture, functional zones, distance, direction,
  obstruction, and coordinate relationships.
- **Physical effects** — where a device is installed and how light, heat, air,
  sound, energy, or signal changes the environment.
- **People and permission** — family members, pets, visitors, roles, states,
  preferences, privacy, and action boundaries.
- **Time and rhythm** — moments, life stages, habits, exceptions, forecasts, and
  events that may be about to happen.
- **Evidence** — observation, identification, fact, inference, and prediction
  kept visibly distinct.
- **Lifecycle** — design intent, construction reality, commissioning, operation,
  change, repair, and correction.

## What we hold

- The home model belongs to the household.
- A home should outlast devices, platforms, and AI models.
- Facts, inferences, and predictions must remain distinguishable.
- Proactive service requires permission, explanation, validation, and reversal.
- Privacy is part of the structure, not a later setting.

HWM boundary: Not a replacement for Matter, KNX, or Home Assistant. It should reuse
and map to Matter, Home Assistant, BIM, IFC, Brick, SOSA/SSN, W3C Web of Things,
PROV-O, and other existing work—not recreate them.

## Technical bridge

The current conceptual kernel is:

```text
H = (EntityRef, Claim, Record | Authority)
```

- `EntityRef` is a stable handle, not proof of identity.
- `Claim` is an immutable, attributed proposition with scope, time, and
  epistemic basis.
- `Record` describes an observation, action, attestation, revision, or deletion;
  it is not the physical occurrence itself.
- `Authority` governs visibility, evidence use, resolution, and action. It cannot
  be self-created by an Agent.
- `World View` resolves authorized knowledge for one requester, purpose, and time.

Claim Envelope, World View, and Action Trace preserve the observable boundaries
between what was claimed, what evidence was used, what was authorized, what was
attempted, and what happened afterward. RO-Crate provides the package binding.

## Start here

1. [Model Thesis](docs/00_context/model-thesis-v0.1.md)
2. [Core discussion candidate](docs/00_context/home-world-model-core-v0.1.md)
3. [Narrative relationship governance](docs/00_context/narrative-governance-v0.1.md)
4. [Glossary](docs/00_context/glossary.md)
5. [Domain model](docs/02_domain-model/README.md)
6. [Core JSON Schemas](spec/core/v0.1/schema/)
7. [Conformance scenarios](conformance/README.md)
8. [Specification governance](governance/v0.1/README.md)

## Participate

You do not need to write code. Contribute a household story, professional
constraint, standards mapping, implementation, counterexample, or a reason this
proposal is wrong. **Disagreement is useful evidence.**

- Use [GitHub Discussions](https://github.com/lxfox/home-world-model/discussions)
  for questions, interpretations, use cases, and design objections.
- Use Issues for reproducible defects in public artifacts.
- Do not submit household data, credentials, private prompts, biometric
  material, secrets, or proprietary telemetry.
- A Discussion, star, fork, or implementation does not establish consensus,
  production readiness, or adoption.

## Repository and narrative boundaries

This repository is a curated public projection. Internal handoffs, product
operations, evaluator material, unpublished candidates, and project-only
checkpoints are excluded.

[`PUBLIC-MANIFEST.json`](PUBLIC-MANIFEST.json) binds every exported file and
digest. The [Narrative Surface Contract](docs/00_context/narrative-surface-contract-v0.1.json)
binds the claims shared by this README and the website. Narrative documents
explain the project; exact Core, Profile, and Conformance Set documents control
technical meaning.

## License

- Software, tools, JSON Schemas, and reference implementations:
  [Apache License 2.0](LICENSE).
- Project-authored narrative, specifications, translations, diagrams, and
  synthetic fixtures: [CC BY 4.0](LICENSES/CC-BY-4.0.txt).
- Third-party material retains its original terms. Project names and logos are
  not licensed as trademarks.
