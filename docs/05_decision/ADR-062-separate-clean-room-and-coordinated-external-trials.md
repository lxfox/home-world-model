# ADR-062: Separate clean-room and coordinated external trials

- Status: Accepted
- Date: 2026-07-19
- Chinese mirror: [`ADR-062-separate-clean-room-and-coordinated-external-trials.zh-CN.md`](ADR-062-separate-clean-room-and-coordinated-external-trials.zh-CN.md)

## Context

The frozen Base Exchange challenge has a self-contained implementer kit, but that kit includes project executable validators, mutation logic, a reference submission and evidence assessments. Giving it to a participant is useful for adoption and coordinated reproduction, but contaminates a strict claim that the participant independently derived an implementation from normative inputs. Building a second project-owned implementation would reproduce the same lineage problem.

## Decision

1. Run external implementation work in two explicit tracks: Track A is a clean-room independence candidate; Track B is external but coordinated.
2. Track A receives an integrity-locked subset containing normative English documents, schemas, descriptors, the offline registry, frozen input packages, public expected behavior and licenses. It excludes project executable code, mutation fixtures, reference submissions/results, evidence assessments and material implementation advice.
3. Track B may use the complete implementer kit and project assistance, but its maximum evidence result is external coordinated evidence.
4. Track selection never self-establishes evidence standing. Relationship, exposure, source/build provenance, reproducibility and reviewer standing remain separately reviewed.
5. An implementation freezes immutable source, dependency lock, environment and instructions before a separate evaluator reveals or runs sealed mutations. A fix creates a new revision and run; history is append-only.
6. Failures are classified. Only reproducible specification ambiguity or missing normative input enters the Convergence Gate; it still must meet ADR-061 before Core consideration.
7. Protocol readiness is not external evidence. The current status remains `protocol_ready_no_external_participant_evidence` until a real external participant completes evidence review.
8. Registration records only facts available at registration. Input release, exposure, source freeze, sealed run, failure classification, review and withdrawal are digest-linked append-only events. One Trial Ledger binds one source revision; a fix creates a linked successor ledger. Later prohibited exposure downgrades evidence standing without erasing technical history.

## Consequences

- Independent evidence becomes harder to claim but more meaningful.
- Coordinated onboarding remains available without laundering it as independence.
- Hidden evaluator details test derivation from the normative contract after source freeze.
- Technical failures can improve the specification without automatically expanding Core.
