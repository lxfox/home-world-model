# Authority Trust Bootstrap Scenario v0.1

- Status: Executable Profile Fixture
- Version: 0.1.0-fixture
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Trust Root example: [`trust-root.example.json`](trust-root.example.json)
- Cases: [`trust-cases.json`](trust-cases.json)

## Question Under Test

How can a new Agent know which household Authority material to trust without allowing an Authority document to certify its own trust anchor?

The answer is a locally persisted root lineage. Genesis requires an exact out-of-band pin. Rotation requires the current and next distinct-signer thresholds over one exact sequential successor. Recovery requires an independent path precommitted by the current root plus the next-root threshold. If none of those continuity paths exists, manual enrollment creates a new lineage.

## Executable Boundaries

Twenty-two transition cases test:

- exact genesis pin, missing pin, and wrong pin;
- two-sided sequential rotation and unique-signer threshold counting;
- rejection of aliased verification material and root/recovery failure-domain reuse;
- exact previous-root content binding, rollback, skipped versions, lineage, time, and Authority Epoch floor;
- candidate expiry and unavailable proof verification;
- precommitted recovery and missing recovery quorum;
- recovery without precommit;
- two valid successor roots;
- updating from an expired current root to a current successor.

Five model-boundary cases preserve the limits of threshold compromise, non-precommitted recovery, expiry, action authorization, and legal ownership. Across both sets, 53 forbidden inferences prevent technical control from becoming truth, safety, action permission, legal title, or guaranteed recoverability.

## Trust Chain

```text
exact out-of-band genesis pin
  → locally persisted Trust Root N
  → exact N+1 signed body
  → threshold of Root N + threshold of Root N+1
  → persist Trust Root N+1
  → verify Authority Profile documents at or above its Epoch floor
```

The alternative recovery edge is available only if Root N already declared independent recovery methods and a threshold. A raw proof never carries its own verification result; the fixture proof adapter supplies independent results bound to the candidate signed digest.

## Run

```sh
node conformance/scenarios/authority-trust-bootstrap-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Schema validation is documented in the [Authority Profile](../../../spec/profiles/authority/v0.1/README.md).
