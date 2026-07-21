# Electrical Design Boundary Audit v0.1

- Status: Mapping Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Decision: [`ADR-009`](../../../../docs/05_decision/ADR-009-split-electrical-load-and-capacity.md)
- Executable cases: [`boundary-cases.json`](boundary-cases.json)

## Outcome

`reservedLoad` is rejected as a target HWM predicate. The fixture's value is reclassified as a `planned_load_allocation` used only to screen Product Models inside a planning context.

The safe model is a set of separately typed quantity Claims plus Assessments over named inputs:

| Quantity role | Meaning | Must not imply |
| --- | --- | --- |
| `product_nameplate_power` | declared product or Product Model rating | actual demand or installation |
| `planned_load_allocation` | design budget assigned to a stated planning scope | circuit capacity or installed load |
| `installed_load` | installed-apparatus rating aggregate under a declared rule | simultaneous or maximum demand |
| `estimated_maximum_demand` | demand estimate with period, system level, and assumptions | installed load or supply authorization |
| `design_current` | circuit design input for normal operation | measured current or safe conductor selection by itself |
| `current_carrying_capacity` | continuous-current limit under specified conditions | protective-device rating or current demand |
| `protective_device_rated_current` | property or setting of the protection device | conductor capacity or coordination success |
| `authorized_maximum_demand` | supply capacity made available under an applicable agreement | downstream circuit adequacy |
| `derived_margin` | assessment over named capacity and demand/allocation inputs | intrinsic, timeless circuit property |

## Standards boundary

[IEC 60364-1:2025](https://webstore.iec.ch/en/publication/63699) covers fundamental safety requirements and assessment of general characteristics for low-voltage installations. [IEC 60364-4-43:2023](https://webstore.iec.ch/en/publication/28432) separately covers protection and coordination against overcurrent. [IEC 60364-5-52:2009+AMD1:2024](https://webstore.iec.ch/en/publication/1878) covers selection and erection of wiring systems, including installation-condition and voltage-drop concerns. [IEC 60364-6:2016](https://webstore.iec.ch/en/publication/24656) separately covers initial and periodic verification.

IEC Electropedia separately identifies [design current and current-carrying capacity](https://www.electropedia.org/iev/iev.nsf/index?openform=&part=826), and distinguishes [installed load, connected load, maximum demand, coincidence, diversity, and demand factor](https://www.electropedia.org/iev/iev.nsf/index?openform=&part=691). These are not synonyms.

[IFC 4.3.2.0 IfcDistributionCircuit](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcDistributionCircuit.htm) provides circuit identity and electrical-system properties such as Diversity, live-conductor count, voltage range, and maximum allowed voltage drop. The official page also notes that the entity is not part of a standardized schema subset or implementation level. IFC does not turn a single HWM reserve scalar into a safety verdict.

## Minimum assertion shape

Every electrical quantity Claim must carry:

- subject and explicit quantity role;
- numeric value, unit, and quantity kind;
- design context, revision, validity, and epistemic basis;
- source or calculation provenance;
- circuit/function-position/option scope;
- phase and topology where relevant;
- period, duty, coincidence, power factor, efficiency, environmental or installation assumptions where relevant;
- limitations and forbidden uses.

A `derived_margin` additionally identifies both input Claims, the limiting constraint selected, calculation method, and assessment status. If the inputs cannot be compared on the same topology and basis, the result is `indeterminate`.

## Source limitation

The public IEC pages establish scope and term separation but do not expose all normative equations or national deviations. This audit therefore defines fail-closed semantic boundaries, not a substitute electrical-design calculation or compliance engine.

## Validation

```sh
node spec/mappings/electrical-design/v0.1/validate.mjs
```

