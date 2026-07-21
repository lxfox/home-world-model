# ADR-064: Keep identifiers typed and identity consequences bounded

- Status: Accepted
- Date: 2026-07-19
- Chinese mirror: [`ADR-064-keep-identifiers-typed-and-consequences-bounded.zh-CN.md`](ADR-064-keep-identifiers-typed-and-consequences-bounded.zh-CN.md)

## Context

Entity Identity Alignment already rejected a global ID, but its initial Schemas permitted arbitrary digest strings, a string Authority Epoch, arbitrary intended/allowed consequences and combinations such as `same_entity` with cross-kind compatibility. The prose prohibited property and Authority transfer while the wire shape could still encode it.

## Decision

1. Identifier equality is a lookup fact, not identity proof. Artifact, entity, lineage, representation, endpoint, subject, occurrence and idempotency identities remain distinct semantic roles.
2. Harden the optional Identity Alignment Schemas with exact SHA-256 content binding, non-negative integer Authority Epoch, explicit time/purpose and structured proof.
3. Close consequence vocabularies. Identity evaluation may propose typed relation Claims, qualify a reference for the declared use or trigger dependency revalidation; it cannot transfer properties, history, ownership, disclosure, trust, Standing, Lease, access or Authority.
4. Enforce result coherence: `same_entity` requires same kind and sufficient evidence with no non-identity relation; `related_not_identical` requires a relation; distinct/unresolved/conflict results carry no positive relation.
5. Same artifact identity/revision with different content remains an integrity conflict. Repeated identical delivery is deduplication, not independent corroboration.
6. Do not add a universal Core identifier or entity registry. Typed external namespaces and the existing Profile are sufficient.

## Consequences

- Identity exchange can no longer contradict the Profile's own non-transfer boundary.
- Scoped identifiers remain usable without becoming global identifiers.
- This is optional Profile hardening; the frozen Core stays unchanged.
