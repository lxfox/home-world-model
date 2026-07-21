# Bounded Impact Closure Scenario v0.1

- Status: Executable Discussion Fixture
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Related Profile: [`Bounded Impact Closure Profile v0.1`](../../../spec/profiles/bounded-impact-closure/v0.1/README.md)

## Question

For one proposed shared-bedroom temperature change, can an implementation prove that all impact channels required by the household policy have been assessed without claiming that every possible affected entity or participation right is known?

## Fixture

The baseline policy requires four local channels:

- `physical_exposure`, produced by a thermal procedure;
- `privacy_data`, produced by a privacy procedure;
- `shared_resource`, produced by a resource-dependency procedure;
- `control_interest`, produced by an Authority-aware control-interest procedure.

The reports include a resident, pet, opaque remote privacy subject, shared circuit, and two distinct impacts on the same resident. These examples exercise the data shape; the channel names are not universal HWM vocabulary.

## Oracle Coverage

[`impact-cases.json`](impact-cases.json) contains 20 coverage cases and five model-boundary cases. They test complete declared coverage, missing and unavailable channels, partial reports, exact Proposal revision, freshness, procedure, decision time, horizon, duplicate reports, policy ambiguity, Authority Epoch, undeclared channels, empty complete channels, identifier conflicts, presence, pets, future roles, and opaque handles.

Every case carries `must_not_infer` guards. In particular:

- `complete_for_declared_channels` does not mean globally complete;
- an empty complete physical channel does not mean nobody is affected;
- impact does not create participation entitlement;
- presence is neither necessary nor sufficient;
- a pet impact does not establish confirmation capacity or guardianship;
- an opaque handle does not disclose identity or presence.

## External Projection

[`impact.external.jsonld`](impact.external.jsonld) projects reusable semantics through SOSA/SSN, PROV-O, BOT, DPV, Schema.org, and DCMI. It contains no HWM impact predicate. The HWM Profile owns only the residual closure behavior that those vocabularies do not specify.

## Run

```sh
node conformance/scenarios/bounded-impact-closure-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Expected JavaScript summary:

```text
BOUNDED IMPACT CLOSURE OK 20 coverage cases 5 model-boundary cases
DECLARED COVERAGE ONLY OK complete_for_declared_channels never means globally complete or impact-free
AUTHORITY BOUNDARY OK impact entries do not create participation entitlement or authorization
PRIVACY BOUNDARY OK opaque handles and unavailable reports never collapse to nobody affected
```

Passing shows fixture compatibility, not correctness of the external procedures, global impact completeness, legal validity, independent implementation, or community consensus.

