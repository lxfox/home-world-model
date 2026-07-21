# Agent Admission v0.1 Scenario

This scenario tests the boundary between an Agent that can parse HWM and an Agent that may receive a purpose-bound World View or propose an action.

Artifacts include a capability-bearing Admission Request, an Authority-assigned Decision, a proof-of-possession Lease, 32 executable handshake cases, and 7 model-boundary cases. The fixture covers Trust Root pinning, exact Profile compatibility, proof availability, nonce and time handling, user confirmation, content digest binding, Authority Epoch direction, exact scope, Lease audience, proof-of-possession, and Matter separation.

Run `node validate.mjs`. The independent Python path is `python3 ../../readers/python/reference_reader.py` from this directory.

Passing this fixture proves semantic behavior only. The fixture proof suite is not production cryptography.
