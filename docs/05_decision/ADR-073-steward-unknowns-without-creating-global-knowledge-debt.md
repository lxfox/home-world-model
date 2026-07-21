# ADR-073: Steward unknowns without creating global knowledge debt

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-073-steward-unknowns-without-creating-global-knowledge-debt.zh-CN.md`](ADR-073-steward-unknowns-without-creating-global-knowledge-debt.zh-CN.md)

## Context

An open-world household model will always contain unavailable, withheld, stale, contested, not-observed and otherwise indeterminate knowledge. Calling all of it “knowledge debt” suggests a global backlog, completeness target and Agent duty to reduce uncertainty. That would recreate the acquisition power ADR-072 denied: gap count or age could become justification for repeated questions, continuous sensing or experiments unrelated to a current household decision.

Agent Orientation Snapshot already supports purpose-bound domain coverage and unresolved registries. World Views declare scope and limitations; Deliberation and interaction policies support cooldown and suppression; Change Impact Revalidation supports later reassessment. No global Gap primitive or debt score is needed.

## Decision

1. Treat an unknown as a purpose-bound limitation, not a globally owned task or debt item.
2. A stewarded gap identity binds an exact unresolved proposition/question, household scope, purpose, dependent decision/operation, time horizon and source-closure basis. Changing proposition or purpose creates a distinct gap.
3. Do not register an unknown for a scope merely because it exists or might be useful someday. Require an accepted current decision dependency or explicit policy reason.
4. Report blocking and non-blocking gaps separately. A blocking gap propagates `indeterminate` or declared degradation; it does not authorize evidence acquisition.
5. Permit dormant-until-trigger, interaction-suppressed, capture-withheld, source-unavailable and historical states without pretending the proposition was answered.
6. A household may proceed with an explicitly accepted unknown for one exact decision. This closes the decision dependency, not the epistemic gap universally.
7. Decision withdrawal or purpose end may make a gap obsolete/historical without resolving it.
8. Trigger occurrence, cooldown expiry or new evidence causes reassessment only. It does not authorize questioning/capture or automatically resolve the gap.
9. Resolve only for the exact scope when sufficient qualified evidence and the named procedure support it. Conflicting evidence keeps the gap contested.
10. Deduplicate only exact content-bound gap identities. Similar wording, embedding proximity or shared labels do not prove identity.
11. Do not infer priority, urgency or model quality from gap age, count or recurrence. Safety-labeled unknowns route to explicit safety procedures rather than self-granted emergency power.
12. Withheld registries reveal no hidden gap identity or count. Empty partial coverage is not completeness; empty complete coverage means only no known gap for the declared scope.
13. On Agent replacement, rematerialize unresolved registries from durable artifacts and coverage policy, never from source-Agent private memory.
14. Preserve historical resolved results after evidence deletion or policy change; reassess current use separately.

## Consequences

- The household model can remain honestly incomplete without generating endless prompts or surveillance pressure.
- Unknown handling becomes a scoped governance/view concern rather than a new ontology or task subsystem.
- Thirty executable cases cover relevance, blocking, degradation, deferral, suppression, denial, accepted unknown, triggers, evidence, identity, coverage and Agent change.
