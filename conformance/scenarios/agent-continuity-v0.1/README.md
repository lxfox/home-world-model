# Agent Continuity v0.1 Scenario

This scenario tests whether a household task can survive Agent replacement without transferring Agent identity, private reasoning, source visibility, source Lease, authorship, evidence standing, or dispatch authority.

It contains a target-specific Checkpoint, separate Authority Continuity Decision, target PoP Lease, 40 executable continuity cases, and 10 model-boundary cases. The four modes are context sharing, planning succession, delegated acting, and exclusive cutover.

Run `node validate.mjs`. The independent Python path is `python3 ../../readers/python/reference_reader.py` from this directory.

Passing proves semantic behavior only. Fixture proofs do not provide production cryptography, immediate offline revocation, distributed mutual exclusion, or safe key custody.
