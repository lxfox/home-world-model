# Evidence Standing Scenario v0.1

- Status: Executable Profile Fixture
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Policy: [`standing-policy.json`](standing-policy.json)
- Cases: [`standing-cases.json`](standing-cases.json)
- Decision example: [`standing-decision.example.json`](standing-decision.example.json)

## Question Under Test

Who, or what, has standing to provide evidence about which household proposition?

The fixture rejects a universal answer. It tests a contextual policy whose output controls only whether a Record may enter an Evidence Resolver. The output is a separate, content-bound Evidence Standing Decision: it binds the complete Record digest, purpose, Authority Epoch, decision time, and the exact assertions admitted. It does not decide whether the Record is true or sufficient and does not authorize an action.

## Boundary Cases

Twenty-one cases test:

- a resident and an explicitly granted visitor reporting a firsthand visible change;
- the same report being insufficient for an objective lux value;
- a resident reporting their own preference but not another resident's preference;
- household-admin permission not implying electrical inspection standing;
- a lux sensor bounded by property, measurement zone, procedure, and purpose;
- device acknowledgement admitted for execution tracing but excluded as physical observation;
- an installer bounded to a position-check procedure;
- an electrical reviewer bounded by credential type, trusted issuer, status, time, procedure, and Shenzhen jurisdiction;
- expired, wrong-jurisdiction, and status-unavailable credentials;
- evidence-use denial and unavailable identity;
- stale and future Authority Epoch views;
- closed-world denial of Agent self-elevation.

Every case includes forbidden inferences. In particular, `admitted` never implies proposition truth, global source trust, action authorization, goal satisfaction, professional acceptance outside scope, or user acceptance.

## Result Composition

```text
authenticated source
  + evidence-use authorization
  + matching standing grant
  + exact Record digest, purpose, Epoch, time, and assertion scope
  = content-bound Standing Decision

assertions admitted by current Standing Decisions
  + named Resolver policy
  = purpose-bound World View result
```

The first equation does not imply the second result is `accepted`. A raw Record cannot admit itself, and admission of one field does not admit all its fields. Two incompatible admitted Records can yield `contested`.

## Run

```sh
node conformance/scenarios/evidence-standing-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Schema validation is documented in the [Profile](../../../spec/profiles/evidence-standing/v0.1/README.md).
