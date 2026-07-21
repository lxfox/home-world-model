# ADR-041：用用途绑定、开放世界的 Snapshot 定向 Agent

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-041-orient-agents-with-purpose-bound-open-world-snapshots.md`](ADR-041-orient-agents-with-purpose-bound-open-world-snapshots.md)

## 背景

新 Agent 需要足够上下文才能正确推理，但完整历史导出违反最小化，也会暴露无关家庭数据。普通文字摘要虽然小，却容易制造虚假完整性、隐藏未决项，并被误认为事实或转移后的权限。

## 决定

采用可选 Agent Orientation Snapshot Profile。Snapshot 组合用途化 World View 和持久摘要，但仍与 RO-Crate 包及 Task Continuity Checkpoint 分离。每个必需领域声明 complete、partial、withheld、unavailable、not-applicable 或 indeterminate coverage。

使用前独立评估完整性、目标 Admission／Lease、Trust Root／Authority、purpose／scope、freshness、coverage、unresolved registry、source closure、disclosure 与 Change／Revalidation currency。合格只授予定向理解。

## 原因

这样“Agent 知道自己不知道什么”也能被移植。不同 Agent 可以从同一有限当前投影开始，而不接收全部历史，也不把遗漏、withholding、不可访问证据或摘要变成虚假事实和权限。
