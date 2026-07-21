# Renovation Planning Package v0.1

- Status: Executable Adversarial Fixture
- Date: 2026-07-18
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)

This fixture asks whether the HWM kernel and RO-Crate binding can carry a household from pre-renovation design toward procurement without inventing installed facts.

It verifies:

1. imported spaces and geometry remain `planned`, not observed;
2. a catalog candidate is a Schema.org Product Model, not a Physical Asset or Digital Endpoint;
3. `candidateFor` is a scoped planning compatibility projection, not asset–function realization or installation;
4. a simulated effect remains `simulated`, even when its predicted range meets the household requirement;
5. shared base-design Claims, option A Claims, option B Claims, and comparison Claims use distinct explicit contexts;
6. both mutually exclusive options derive explicitly from the same base with `prov:wasDerivedFrom`, while branch-local evaluation never consumes the other branch;
7. only an explicit comparison context can consume both branch results, and its recommendation remains advisory;
8. homeowner selection is an Attestation with planning-only effect, not purchase, installation, action, or authorization, and the unselected branch remains in history;
9. both declared product maximum powers can be screened against a planned load allocation, while circuit capacity, protection, verification, and compliance remain explicitly indeterminate;
10. one crate can carry Claim, Record, BOT JSON-LD, electrical-plan JSON, product-catalog JSON-LD, CSV simulation, and JSON comparison resources;
11. `hasPart`, `conformsTo`, and `mentions` order is irrelevant, while multiple mentioned participants still yield exactly one Authority state;
12. all five application artifacts retain precise RO-Crate types even though the transitional Manifest projects their broad role as `other`.

Run:

```sh
node conformance/scenarios/renovation-planning-package-v0.1/validate.mjs
node spec/profiles/ro-crate/v0.1/validate.mjs \
  conformance/scenarios/device-lifecycle-continuity-v0.1 \
  conformance/scenarios/renovation-planning-package-v0.1
python3 conformance/readers/python/reference_reader.py
```

The fixture contains synthetic product, electrical, geometry, simulation, comparison, and selection data. Option A predicts 320–380 lux and satisfies the declared 300-lux requirement; option B predicts 245–285 lux and does not. It demonstrates model distinctions and package generality, not building-code compliance, product fitness, purchase advice, simulation accuracy, or installation authorization.
