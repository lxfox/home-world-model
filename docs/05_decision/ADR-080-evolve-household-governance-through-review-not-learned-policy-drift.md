# ADR-080: Evolve household governance through review, not learned policy drift

- Status: Accepted as system-model boundary; no Core or Profile change
- Date: 2026-07-19
- Chinese mirror: [`ADR-080-evolve-household-governance-through-review-not-learned-policy-drift.zh-CN.md`](ADR-080-evolve-household-governance-through-review-not-learned-policy-drift.zh-CN.md)

## Context

ADR-079 gives a household a stable Charter projection, but households evolve: people and pets join or leave, people age, caregiving and tenancy change, rooms gain new uses, installations change, incidents occur and external requirements evolve. Agents also observe behavior that differs from current rules. Treating these signals as automatic policy learning would silently rewrite governance; freezing every rule would make the model stale.

Change Impact Revalidation, reusable rule lifecycle, learning routing and Authority transitions already provide an append-only middle path.

## Decision

1. Treat household evolution evidence and policy drift signals as inputs to review, never direct governance transitions.
2. Use the chain: admitted evidence → typed immutable Change Set → declared dependency impact/Revalidation → candidate revision or no-change finding → required review/participation → content-bound Authority transition → new Charter projection.
3. Keep world, knowledge-correction, design, governance and evidence-availability changes distinct, including their effective, observation and record times.
4. Repetition, inferred habit, absence of objection, model confidence, drift score and repeated exception/override can propose review only. They cannot activate, broaden, pause, retire or replace a rule.
5. A joining member triggers bounded population, privacy, impact and participation revalidation; it grants no inherited access, representation, preference, delegation or consent. Departure separately evaluates current access, retention and historical records.
6. Age/time passage, caregiver/adult/child labels or behavioral inference do not determine capacity, guardianship or representation. Use exact Authority and any applicable external legal/professional procedure.
7. Property sale, tenancy, death, incapacity and succession do not automatically transfer household history, credentials, Trust Root or Authority lineage. External transfer/succession procedures and new admission decisions are required.
8. Space, device, incident and external-requirement changes reopen only declared dependent artifacts. Complete no-path closure can establish unaffectedness for scope; incomplete closure is indeterminate.
9. A review result is advisory unless an exact preaccepted protective trigger already authorizes a bounded pause. Pause preserves history and selects no replacement.
10. Each material policy revision needs its own Authority transition. An identity-basis change in household/subject/purpose/domain may require a new rule or Authority lineage rather than revision.
11. All transitions are prospective and append-only. Earlier Views, uses, decisions and Charter Snapshots remain interpretable under their original bindings.
12. Drift review does not authorize new monitoring. Any additional evidence acquisition follows least-impact sufficiency, privacy, affected-subject procedures and Authority.
13. Agent replacement resumes from durable Change Sets, reviews, candidates and transitions—not private drift models or memory.

## Consequences

- The household can grow and revise governance without allowing adaptive systems to become silent lawmakers.
- A surprising behavior becomes a question for review, not a diagnosis of preference or capacity.
- Life-stage and occupancy changes remain expressible without embedding universal family or legal assumptions in Core.
- Thirty executable cases cover behavior signals, membership, age/caregiving, space/device/incident changes, property/tenancy/succession, review states, closure, monitoring and Agent replacement.
