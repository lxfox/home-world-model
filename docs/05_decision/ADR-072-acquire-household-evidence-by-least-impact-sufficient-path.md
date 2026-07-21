# ADR-072: Acquire household evidence by the least-impact sufficient path

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-072-acquire-household-evidence-by-least-impact-sufficient-path.zh-CN.md`](ADR-072-acquire-household-evidence-by-least-impact-sufficient-path.zh-CN.md)

## Context

After semantic feedback routing, an Agent still needs to decide whether an indeterminate result deserves active evidence acquisition. A fixed escalation ladder—ask, then camera, then device challenge, then experiment—would be wrong. These paths answer different propositions and have incommensurable privacy, attention, disturbance, safety, affected-subject and authorization boundaries. A universal expected-information-minus-cost score would hide household policy choices and allow uncertainty to manufacture capture or action power.

Existing Profiles already govern the distinct paths: Interactive Evidence and Value Clarification constrain questions; Purpose-Bound Disclosure and Authority constrain capture and evidence use; Action governance constrains device challenges; Household Commissioning Experiment constrains deliberate perturbation. The model needs a routing invariant, not another acquisition primitive.

## Decision

1. Preserve `indeterminate` unless one exact knowledge gap is material to a declared downstream decision and possible evidence results distinguish currently viable branches.
2. “Improve the model”, curiosity, confidence gain, novelty or future convenience is not a sufficient objective.
3. Reuse sufficient, current and authorized evidence before seeking new evidence.
4. Among currently eligible sufficient paths, prefer an accepted alternative with the least relevant impact. Do not collapse privacy, human burden, disturbance, physical risk, resources and information value into one universal scalar.
5. A human question requires exact proposition/answer binding, respondent competence, attention/delivery permission, cooldown/duplicate checks and opt-out. Silence remains no evidence.
6. Passive sensor access requires separate capture/access and evidence-use authorization. Permission for one purpose does not transfer to another.
7. Camera or microphone capture requires purpose-, time-, space-, subject- and retention-bounded authorization plus affected-subject/privacy closure. Requester consent does not cover bystanders.
8. An active device challenge is an Action Proposal. It requires impact closure, Authority, local safety gates, disturbance budget, reversibility/recovery and exact observation semantics. Information value never grants action.
9. Device acknowledgement remains attempt-side evidence and cannot complete the physical-effect question.
10. A commissioning experiment requires a decision-bound Objective, necessity over lower-impact evidence, identifiability, cumulative budgets, stop/recovery rules and per-trial Proposal／Authorization. Eligibility never authorizes execution.
11. Adaptive selection of a changed next trial requires a new Proposal and Authorization evaluation. There is no blanket exploration Lease.
12. Objection, stop event, safety failure, privacy change or cumulative-budget exhaustion overrides prospective information gain.
13. Explicit user requests still pass the applicable capture/action governance. Emergency capture or action follows an explicit emergency Authority procedure; this routing model creates no emergency power.
14. When every candidate path is insufficient, unauthorized, too impactful or indeterminate, keep the knowledge gap open and propagate its limitation downstream.

## Consequences

- Active sensing becomes a governed decision rather than an Agent reflex.
- “Do not know” is a valid, interoperable result instead of a failure that justifies surveillance or perturbation.
- Human confirmation is used where semantically competent, not as a cheap substitute for objective measurement.
- Thirty executable cases compose existing Profiles and add no Core field, acquisition artifact or optional Profile.
