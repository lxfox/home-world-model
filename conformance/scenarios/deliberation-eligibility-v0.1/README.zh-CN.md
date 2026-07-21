# Deliberation Eligibility v0.1 一致性情景

本 oracle 测试 [Deliberation Eligibility Profile](../../../spec/profiles/deliberation-eligibility/v0.1/README.zh-CN.md)，包含 23 个语义案例和 17 个禁止推断。它分离 Agent 发现的缺口、用户明确请求、既有 Intent drift、Routine occurrence 与安全义务，并测试 policy standing、隐私、重复、冷却和未知证据。

运行 `node conformance/scenarios/deliberation-eligibility-v0.1/validate.mjs`。

通过不证明家庭 policy 公平、不证明通知适当、不证明缺口重要，也不授权任何行动。
