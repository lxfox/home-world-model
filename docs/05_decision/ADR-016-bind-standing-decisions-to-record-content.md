# ADR-016 — Bind Standing Decisions to Record Content

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-016-bind-standing-decisions-to-record-content.zh-CN.md`](ADR-016-bind-standing-decisions-to-record-content.zh-CN.md)
- Related Profile: [`Evidence Standing Profile v0.1`](../../spec/profiles/evidence-standing/v0.1/README.md)

## Context

ADR-011 defined Evidence Standing as a separate Authority-plane decision. The first Procedure Fulfilment fixture nevertheless placed `standing_status`, `evidence_use_decision`, `qualification_status`, and `integrity_status` directly inside the same raw Records whose assertions they were meant to validate. A Record could therefore appear to certify its own admission. Binding only by `record_id` would also let changed content inherit an old decision.

Delivery receipts expose the same distinction. A valid signature can bind a receipt to a sender and message; a receipt can establish delivery to a declared endpoint; neither alone proves presentation to a person, accessibility, reading, understanding, acceptance, or legal effect.

## Decision

1. A raw Record MUST NOT establish its own proof verification, source binding, evidence-use permission, Evidence Standing, or qualification status.
2. HWM adds a machine-readable **Evidence Standing Decision** output contract to the existing optional Evidence Standing Profile. Core remains unchanged.
3. A Standing Decision binds the complete raw Record body using SHA-256 over [RFC 8785 JSON Canonicalization Scheme](https://www.rfc-editor.org/info/rfc8785/), not only the Record identifier.
4. The Decision also binds purpose, Authority Epoch, decision time, source-binding result, proof-verification result, evidence-use decision, matched standing grants, qualification evidence, result, and reason codes.
5. Admission is assertion-scoped. `admitted_assertions` names the Record fields the downstream procedure may consume. Admission of `delivery_status` does not automatically admit `accessibility_status`, `coverage_status`, `response_meaning`, or any other field in the same Record.
6. Results remain `admitted`, `excluded`, or `indeterminate`:
   - `admitted` requires verified source and proof binding, allowed evidence use, at least one matching grant, and at least one admitted assertion;
   - `excluded` is a known mismatch or denial and supplies no admitted assertions;
   - `indeterminate` is unavailable required input and supplies no admitted assertions.
7. Procedure Fulfilment MUST reject or hold indeterminate a Record when its Decision is missing, future-dated, wrong-purpose, wrong-Epoch, content-digest mismatched, ambiguous, or missing a required admitted assertion.
8. A known `excluded` Record does not count. It is not thereby false; another admissible Record may still satisfy the requirement before its deadline.
9. Cryptographic verification proves integrity and control of the relevant verification method, not truth or semantic completion. A signed transport receipt has only the completion scope granted to its receipt procedure.
10. Trust recursion terminates at authenticated Authority-plane policy and configured trust anchors. A Standing Decision itself requires production proof verification, but does not require another ordinary Evidence Standing Decision to authorize the Authority trust anchor.
11. Historical Decisions are append-oriented. A changed Record body, purpose, Epoch, or standing policy requires a new Decision and does not rewrite the old one.

## Standards boundary

[HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html) protects selected HTTP message components for integrity and authenticity; it does not define the truth of application assertions. [AS2](https://www.rfc-editor.org/rfc/rfc4130.html) binds signed receipts to received message integrity and can return a receipt even when content processing fails, demonstrating that receipt, processing, and transaction validity differ. [VC Data Integrity](https://www.w3.org/TR/vc-data-integrity/) defines proof purpose, verification methods, authenticity, and integrity while leaving claim reliance to verifier policy. [RFC 8785](https://www.rfc-editor.org/info/rfc8785/) supplies deterministic JSON canonicalization for the fixture digest binding.

## Rejected alternatives

### Trust status fields embedded in a raw Record

Rejected because the evidence would certify itself.

### Bind admission only to `record_id`

Rejected because a reused identifier could transfer admission to different content.

### Admit the whole Record once any one field has standing

Rejected because delivery, accessibility, coverage, outcome, qualification, and acceptance have different sources and semantic ceilings.

### Add a universal receipt authority

Rejected because endpoint delivery, user presentation, accessibility, reading, and legal notice are deployment- and procedure-specific.

## Evidence

The Procedure Fulfilment oracle now contains 28 fulfilment cases and eight model-boundary cases. Seven new cases prove that self-asserted standing, digest mismatch, wrong purpose, excluded evidence, unadmitted fields, future decisions, and duplicate current decisions cannot satisfy a requirement. JavaScript and Python independently reproduce all results and 69 forbidden inferences.
