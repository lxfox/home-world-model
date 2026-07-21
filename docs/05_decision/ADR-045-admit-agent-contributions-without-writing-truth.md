# ADR-045: Admit Agent contributions without writing truth

- Status: Proposed
- Date: 2026-07-19

## Context

Agents can now receive minimized views, compose specialized work, and produce validated outputs. The model still needs a vendor-neutral way to retain those outputs. Treating successful output as a database update would collapse storage, provenance, epistemic acceptance, conflict resolution, and governance, and would make concurrent/offline writers depend on last-writer-wins.

## Options

1. Let an orchestrator update current household facts.
2. Publish any schema-valid signed Agent output.
3. Submit immutable contributions, independently admit them for bounded candidate use, append them, and let later World Views resolve them.

## Decision

Adopt option 3 as the Model Contribution Admission Profile. Submission, quarantine/receipt, validation, Admission, publication, World View acceptance, and governance adoption remain separate. Same ID/same digest is replay; same ID/different content is integrity conflict. Alternative claims coexist. Corrections and replacements append new artifacts and explicit relations.

Admission is resolver-purpose-bound and only makes content eligible as candidate input. Publication never mutates prior World Views or authorizes action. Sync transports may merge immutable sets and report conflicts but cannot choose semantic winners.

## Reason

This supports multi-Agent, offline-first, replicated household knowledge without appointing one model as truth owner. It preserves the original HWM principle that acceptance belongs to a purpose-bound World View rather than to mutable Claim state.

## Consequences

- Storage can be append-oriented and replicated.
- Resolver policies, not database arrival order, determine current reliance.
- Quarantine and provenance become explicit operational responsibilities.
- More artifacts may coexist, so compaction and retention need privacy-safe provenance indexes.

Chinese mirror: [`ADR-045-admit-agent-contributions-without-writing-truth.zh-CN.md`](ADR-045-admit-agent-contributions-without-writing-truth.zh-CN.md).
