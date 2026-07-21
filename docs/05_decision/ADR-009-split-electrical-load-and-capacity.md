# ADR-009 — Split Electrical Load, Capacity, Allocation, and Verification

- Status: Proposed
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`ADR-009-split-electrical-load-and-capacity.zh-CN.md`](ADR-009-split-electrical-load-and-capacity.zh-CN.md)
- Mapping evidence: [`Electrical Design Boundary Audit v0.1`](../../spec/mappings/electrical-design/v0.1/README.md)

## Context

The renovation fixture used one `reservedLoad` value of 100 W and checked whether each candidate Product Model declared a lower maximum power. That check is useful for catalog screening, but the term and assertion shape suggest much more than the evidence proves.

Electrical design distinguishes installed load, expected demand, circuit design current, conductor current-carrying capacity, protective-device rating, supply limits, voltage drop, and verification. Power-to-current conversion also depends on system topology and assumptions such as voltage, phase, power factor, efficiency, duty, and coincidence. A single scalar named “reserved load” hides these distinctions and can create a false safety conclusion.

## Decision

1. HWM rejects `reservedLoad` as a target Core or Renovation Planning predicate. Existing `hwm-planning:reservedLoad` data is a compatibility projection for catalog screening only.
2. An Electrical Design Profile MUST represent each electrical quantity Claim with an explicit role. The initial role set is:
   - `product_nameplate_power`;
   - `planned_load_allocation`;
   - `installed_load`;
   - `estimated_maximum_demand`;
   - `design_current`;
   - `current_carrying_capacity`;
   - `protective_device_rated_current`;
   - `authorized_maximum_demand`;
   - `derived_margin`.
3. Quantity roles are Profile-controlled values, not HWM ontology classes. Circuit identity SHOULD use IFC or an IEC 81346 reference designation; quantities and units SHOULD use SAREF/QUDT or an equivalent declared binding.
4. Every electrical quantity Claim MUST identify its subject, value and unit, design context and revision, epistemic basis, provenance, validity, and applicable topology or scope. Assumptions required to interpret the quantity MUST be explicit.
5. A `planned_load_allocation` is a design budget assigned to a declared scope, such as a function position or Design Option. It is not installed load, expected demand, circuit capacity, protection coordination, acceptance, or permission to energize.
6. `derived_margin` is an Assessment over named inputs, not an intrinsic circuit property. It MUST identify the limiting-capacity basis, demand or allocation basis, calculation method, compatible units and topology, and every assumption. Missing or incomparable inputs produce `indeterminate`, not a numeric margin.
7. A Product Model being within a planned allocation proves only that one catalog-screening constraint passed. It MUST NOT prove that the circuit, conductor, protective device, voltage drop, fault protection, or upstream supply is adequate.
8. Active power MUST NOT be converted to circuit current unless the binding supplies the required voltage, phase/topology, and other applicable factors. A total three-phase value MUST NOT be treated as a per-phase limit.
9. Planned, installed, observed, verified, and jurisdictionally compliant states remain separate. IEC 60364-6 verification or an applicable local process requires its own Record and evidence. A design declaration cannot mint a verification or compliance result.
10. A compliance assessment MUST cite the jurisdiction, code or standard edition, assessment method, qualified issuer, scope, and evidence. HWM does not define a universal electrical-code verdict.
11. Runtime demand measurements and forecasts remain observation or prediction Claims. They may calibrate later planning, but do not mutate the original design basis.
12. Exact IEC protection-coordination equations and national deviations are not reproduced in this Profile. A binding claiming IEC or local-code conformance MUST pin the legitimately obtained normative clauses it implements.

## Consequences

- Catalog screening remains possible without being confused with electrical safety.
- Agents can explain which quantity or assumption prevents a conclusion instead of returning a false binary fit result.
- New construction, later installation, commissioning, and ongoing measurement can coexist without overwriting one another.
- IFC/IEC identifiers and SAREF/QUDT quantities remain reusable; HWM adds only lifecycle and evidence constraints.
- The Renovation Planning mapping has no provisional term left after this decision.

## Validation Required Before Acceptance

1. Have a qualified low-voltage designer review the ten boundary cases and the initial quantity-role set.
2. Add a licensed IEC 60364 binding that pins the applicable clauses without copying protected normative text.
3. Add at least one jurisdiction-specific compliance adapter and prove that its verdict does not leak into other jurisdictions.
4. Add a three-phase imbalance case and a reactive-load case with independently calculated expected results.

