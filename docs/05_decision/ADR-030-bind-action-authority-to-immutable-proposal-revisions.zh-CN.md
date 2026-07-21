# ADR-030：把行动权限绑定到不可变 Proposal 修订

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-030-bind-action-authority-to-immutable-proposal-revisions.md`](ADR-030-bind-action-authority-to-immutable-proposal-revisions.md)

## 背景

Core v0.1 的内嵌 Action Proposal 有 ID 却没有 revision。后续 Profile 已引用精确修订，但多数兼容 Schema 只绑定 ID 与 revision，无法发现原地改写，也容易让确认、影响工作或授权在内容变化后被误用。

## 决定

采用可选 Action Proposal Lineage Profile。每个修订都是新的不可变制品，并以 RFC 8785/SHA-256 绑定内容。家庭、精确 Intent、realization 身份、用途、语义动作种类与目标集合构成 lineage 身份基础；这些字段变化或创建并存方案时必须使用新 Proposal ID。

参数、前置条件、效果、影响、有效期、World View 与 Plan 只能通过绑定精确前驱摘要的连续修订改变。同一前驱存在多个后继即为 contested。所有下游判断绑定精确 Proposal 摘要并逐修订重算。Proposal currentness、Authority 授权、执行与效果保持为不同状态轴。

## 后果

- 现有只含 ID/revision 的字段成为兼容投影，后续应迁移到摘要绑定。
- 看起来风险更低的新修订也不能继承授权。
- supersede 与 withdraw 阻止新 dispatch，但不删除历史或撤销物理执行。
- 在独立实现证明 Profile 边界不足前，不扩张 Core。
