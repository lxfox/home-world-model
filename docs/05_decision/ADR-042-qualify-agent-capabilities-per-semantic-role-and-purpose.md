# ADR-042: Qualify Agent capabilities per semantic role and purpose

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-042-qualify-agent-capabilities-per-semantic-role-and-purpose.zh-CN.md`](ADR-042-qualify-agent-capabilities-per-semantic-role-and-purpose.zh-CN.md)

## Context

Agent Admission currently checks exact Profile/version support, canonicalization, and proof suites, but a single compatibility result cannot distinguish parsing from semantic evaluation, project-owned tests from independent evidence, or an implemented adapter from one available in the current runtime. A vendor `compatible=true` claim is insufficient for safe interoperability.

## Options

1. Keep compatibility as a Boolean self-declaration.
2. Use one general Agent benchmark score.
3. Qualify exact Profile/version/role capabilities against a purpose-bound requirement set with evidence, extension, adapter, runtime, and degradation checks.

## Decision

Adopt option 3 as the optional Semantic Capability Negotiation Profile. Roles distinguish parse, validate, preserve, consume, produce, evaluate, procedure adapter, and current runtime execution. Required capability is evaluated independently; optional limits remain visible. Version compatibility requires an accepted directional mapping.

Qualification may explicitly degrade to read-only, opaque relay, separately qualified mediator, or refusal. It feeds only the Agent Admission compatibility axis and never establishes Trust Root acceptance, instance identity, access, Lease, or action permission.

## Reason

This makes “any Agent can read the home model” falsifiable. An Agent can state exactly what it understands, what it merely preserves, what evidence supports that claim, which runtime pieces are presently usable, and where another component or refusal is required.
