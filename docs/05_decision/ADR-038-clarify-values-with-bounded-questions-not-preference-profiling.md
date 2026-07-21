# ADR-038: Clarify values with bounded questions, not preference profiling

- Status: Proposed
- Date: 2026-07-19
- Chinese mirror: [`ADR-038-clarify-values-with-bounded-questions-not-preference-profiling.zh-CN.md`](ADR-038-clarify-values-with-bounded-questions-not-preference-profiling.zh-CN.md)

## Context

A non-dominated tradeoff set may still be too large for useful planning. An Agent can reduce uncertainty by asking questions, but unrestricted “preference learning” risks unnecessary interruption, leading choices, privacy disclosure, behavioral profiling, and overgeneralizing one contextual answer into a permanent household rule.

## Options

1. Infer stable weights from behavior and ask only when model confidence is low.
2. Ask free-form questions and let the Agent interpret their long-term meaning.
3. Bind each question to one current tradeoff, prove bounded decision influence and minimality, authorize delivery separately, and interpret an exact answer into at most a scoped candidate Value Claim.

## Decision

Adopt option 3 as the optional Value Clarification Dialogue Profile. Every Question Proposal declares its comparison bindings, unresolved relation, answer meanings, consequences, uncertainty disclosure, burden, attention policy, privacy, neutrality, opt-out paths, scope, and expiry. Decision relevance does not authorize interruption.

Silence, timeout, dismissal, clicks, and observed behavior do not become explicit value responses. A valid answer retains subject, context, purpose, validity, provenance, and limitations. It creates at most a candidate Claim that requires separate acceptance before use. Broader or persistent rules require explicit clarification and acceptance.

## Reason

This lets Agents reduce a complex decision to smaller human choices while treating attention and values as governed household resources. It supports learning through dialogue without silently building a psychological profile or converting interaction into authority.
