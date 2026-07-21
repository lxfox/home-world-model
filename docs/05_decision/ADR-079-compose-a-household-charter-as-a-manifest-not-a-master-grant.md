# ADR-079: Compose a household charter as a manifest, not a master grant

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-079-compose-a-household-charter-as-a-manifest-not-a-master-grant.zh-CN.md`](ADR-079-compose-a-household-charter-as-a-manifest-not-a-master-grant.zh-CN.md)

## Context

ADR-078 makes each reliance decision meaningful, but households cannot repeatedly adjudicate every similar use. Stable defaults, delegation and batched review can reduce burden. A monolithic “household constitution” or accept-all switch, however, would erase the exact subjects, purposes, procedures, expiry, exceptions and safety boundaries established by the model.

Existing independently effective Authority policies, Value Rules, Resolver procedures, disclosure rules, impact procedures, delegations and lifecycle states can be composed into a readable current projection without a new source of power.

## Decision

1. Define a Household Governance Charter only as an immutable, purpose-/audience-bound manifest and projection over exact independently effective artifacts. It is not Authority, consent, ownership, membership or one universal policy.
2. Bind a Charter Snapshot to household, exact artifact digests and lifecycle heads, declared governance domains, coverage/unresolved registries, `as_of`, known-through time, Authority epoch, derivation, disclosure and limitations.
3. Inclusion in the Charter neither activates nor widens an artifact. Omission or removal neither revokes nor suspends one. Every effect is evaluated from its own current artifact and Authority lineage.
4. Permit explicit stable defaults only as scoped, activated, reviewable/expiring policies with exact applicability and conflict behavior. Product defaults, learned behavior and repeated choices are candidates, not household defaults.
5. Model exceptions as exact artifacts binding their base rule, subject/resource/action/purpose, condition, interval, Authority and re-entry behavior. Similarity creates no inheritance or precedent.
6. An exception cannot override a non-overridable local safety condition or grant power outside its exact scope.
7. Resolve policy interaction only through a named applicable combining/conflict procedure. Missing combination or multiple active heads is indeterminate/contested; timestamp and file order do not establish precedence.
8. Permit batching and progressive disclosure for interaction efficiency, while preserving each item's content, required participants/procedure and independently effective result. A batch receipt is not master consent; partial success never accepts the remainder.
9. Report completeness only for declared governance domains. Omitted, withheld, unavailable and contested domains remain distinct and do not expose hidden identities or counts.
10. Material change reopens only artifacts reachable through declared dependencies; incomplete closure is indeterminate. Authority change requires a new current projection and preserves history.
11. Generic role labels such as owner, admin, adult, child or guest create no universal power, incapacity, privacy waiver or safety exception. Exact Authority grants and procedures govern.
12. Rematerialize the Charter from durable artifacts after Agent replacement or cache loss. An Agent's private policy cache is not household governance.

## Consequences

- A household can see and manage a small stable set of governance themes without granting one universal permission.
- Defaults reduce repetitive questions while remaining inspectable, pausable, expiring and exact-use assessed.
- Exceptions and conflicts remain explainable instead of becoming hidden UI state.
- Thirty executable cases test manifest/effect separation, coverage, defaults, exceptions, conflict, batching, change, roles, offline state and Agent replacement.
