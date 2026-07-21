# ADR-066: Model Claim scope axes as top, finite set, or bottom

- Status: Accepted as candidate-solution revision; Core clarification not accepted
- Date: 2026-07-19
- Supersedes: the `minItems: 1` candidate solution in ADR-065, not ADR-065's reopen decision
- Chinese mirror: [`ADR-066-model-claim-scope-axes-as-top-finite-set-or-bottom.zh-CN.md`](ADR-066-model-claim-scope-axes-as-top-finite-set-or-bottom.zh-CN.md)

## Context

ADR-065 correctly reopened Core consideration because empty and omitted Claim scope axes lacked distinct meanings. Its first solution rejected empty arrays. Minimization review found that rejection was not the smallest compatible repair: it would invalidate previously relayable artifacts, create migration work, and remove a useful fail-closed representation.

## Decision

1. Retain ADR-065's bounded reopen and revise only its proposed solution.
2. Define each optional set-valued Claim scope axis as:
   - omitted = top, no restriction declared on this axis beyond other dimensions;
   - non-empty = a finite set of exact permitted identifiers;
   - empty = bottom, valid and preservable but containing no concrete use on that axis.
3. Compose constraints by typed intersection: top is identity and bottom is absorbing. Never union scopes to manufacture broader applicability.
4. A bottom Claim remains addressable and may be relayed, audited, refuted, retracted or corrected. It cannot govern an operative use requiring the bottom axis.
5. Make no Schema wire-structure change. Acceptance would clarify normative semantics and conformance behavior only.
6. If an issuer intended top but encoded bottom, preserve the old Claim and append correction plus a new omitted-axis Claim. Author intent cannot retroactively change canonical bytes.
7. External candidate implementations must preserve empty arrays and evaluate them as disjoint, not reject or normalize them.

## Consequences

- Existing bytes remain valid and losslessly relayable.
- The candidate is smaller and more consistent with open-world, append-only HWM behavior.
- Legacy readers treating empty as unrestricted remain incompatible and require update/adapter evidence.
- Core clarification is still not accepted; governance and external evidence remain required.
