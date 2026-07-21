# ADR-065：为 Claim scope 空轴重开 Core 审议

- 状态：重开决定已接受；候选 wire 变化尚未接受
- 日期：2026-07-19
- 英文规范文本：[`ADR-065-reopen-core-consideration-for-empty-claim-scope-axes.md`](ADR-065-reopen-core-consideration-for-empty-claim-scope-axes.md)

## 背景

Core Claim 的 `scope.space_ids` 和 `scope.purposes` 是没有 `minItems` 的可选数组。契约允许省略、非空与空数组，却没有为空数组定义不同业务含义。“该轴不限制”与“该轴没有任何适用成员”是同一 Base 字节的两种相反且合理解释。跨领域 fixture 使用省略和非空数组，但避开了空数组，因此此前 conformance 没有暴露歧义。

## 决策

1. 按 ADR-061 只为 `claim-scope-empty-array-semantics` 重开 Core 审议，不重开其他 Core vocabulary。
2. 候选在内部具备 proposal eligibility，但尚未接受；checked-in Core Schema 保持不变。
3. 最小候选变化用 `minItems: 1` 拒绝出现但为空的 `space_ids`／`purposes`。省略表示除其他 scope 维度外，该轴没有声明限制；不表示 universal truth，也不授予任何用途／Authority。
4. scope constraint 按类型化 intersection 组合。已知不相交排除精确用途；比较未知保持 indeterminate；不同维度不能互相补偿。
5. 既有省略／非空 Claim 保持兼容。空轴 Claim 必须按已知原意产生新的纠正／迁移制品；不可变 Claim 永不改写。
6. 接受需要 Specification Change Governance、针对省略／非空／空行为的组织独立实现证据、相称的隐私／安全审查和 release／migration readiness。

## 后果

- convergence 机制证明 freeze 确实可被反驳。
- 在 Core bytes 继续冻结时，概念状态变为 `reopened_for_bounded_core_clarification`。
- 不提议新增 primitive、field、enum 或 entity kind。
- 候选专用 clean-room bundle 已就绪，但仍没有外部 submission 或独立接纳证据。
