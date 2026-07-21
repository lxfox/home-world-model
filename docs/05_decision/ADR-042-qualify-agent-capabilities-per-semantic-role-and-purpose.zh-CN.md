# ADR-042：按语义角色和用途限定 Agent 能力

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-042-qualify-agent-capabilities-per-semantic-role-and-purpose.md`](ADR-042-qualify-agent-capabilities-per-semantic-role-and-purpose.md)

## 背景

Agent Admission 已检查精确 Profile／version、canonicalization 和 proof suite，但单一 compatibility 结果不能区分解析与语义评价、项目自有测试与独立证据，也不能区分“实现了 adapter”和“当前 runtime 可用”。厂商自报 `compatible=true` 不足以支持安全互操作。

## 决定

采用可选 Semantic Capability Negotiation Profile。能力角色区分 parse、validate、preserve、consume、produce、evaluate、procedure adapter 与当前 runtime execution。必需能力逐项评价，可选限制持续可见；版本兼容需要已接受、有方向的 mapping。

Qualification 可以显式降级为 read-only、opaque relay、独立合格 mediator 或拒绝。它只输入 Agent Admission compatibility 轴，不建立 Trust Root、实例身份、访问、Lease 或行动权限。

## 原因

这样“任何 Agent 都能读懂家庭模型”成为可证伪主张：Agent 必须明确自己理解什么、只保留什么、证据是什么、当前哪些 runtime 可用，以及哪里需要 mediator 或拒绝。
