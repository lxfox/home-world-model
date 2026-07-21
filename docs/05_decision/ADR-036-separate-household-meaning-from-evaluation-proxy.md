# ADR-036: Separate household meaning from evaluation proxy

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-036-separate-household-meaning-from-evaluation-proxy.zh-CN.md`](ADR-036-separate-household-meaning-from-evaluation-proxy.zh-CN.md)

## Context

Target Fit can evaluate an accepted specification, but it does not explain how an ambiguous household expression becomes that specification. If an Agent maps “comfortable” or “bright enough” directly to a convenient sensor threshold, the system may be testable while no longer representing what the household meant.

## Options

1. Let each Agent choose domain defaults and expose a confidence score.
2. Store only the final numeric criteria after household confirmation.
3. Preserve the source target and govern operationalization as a separately reviewed, purpose-specific proposal.

## Decision

Adopt option 3 as the optional Requirement Operationalization Profile. The proposal binds the exact target, source expression, affected subjects/spaces, purposes, lifecycle phases, criteria, procedures, decision rules, reviewer roles, declared omissions, and open ambiguity. A separate review decides only whether the proposal is eligible for acceptance for one purpose. Authority acceptance of the resulting Evaluation Specification remains a distinct event.

Planning, installation acceptance, commissioning, and operation may use different accepted specifications. Physical performance, personal experience, safety, compliance, resource use, accessibility, reliability, and coverage remain separate dimensions unless an accepted specification explicitly relates them.

## Reason

This keeps the model self-consistent at the point where LLM flexibility is most dangerous: translation from human language into machine-testable criteria. Agents may help articulate and compare meanings without silently becoming the source of household preference, professional judgement, or regulatory authority.
