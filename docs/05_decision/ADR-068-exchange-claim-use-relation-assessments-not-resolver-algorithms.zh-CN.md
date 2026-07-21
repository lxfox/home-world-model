# ADR-068：交换 Claim Use Relation Assessment，而不是 resolver 算法

- 状态：作为非规范系统探索接受；排除在有界 Core candidate 之外
- 日期：2026-07-19
- 修订：ADR-067
- 英文规范文本：[`ADR-068-exchange-claim-use-relation-assessments-not-resolver-algorithms.md`](ADR-068-exchange-claim-use-relation-assessments-not-resolver-algorithms.md)

## 背景

ADR-067 分离了精确 selector membership 与空间／用途 relation resolution。剩余问题是 Agent 解析关系后应该交换什么。标准化图引擎、API 或推理算法会捕获实现与私有推理；只交换 `true`／`false` 又会丢失其他 Agent 审计或复现所需的精确 Claim、requested use、证据、时间与不确定性。

既有 Spatial Use Assessment 足以作为空间 registration 和 topology qualification 证据，但它本身不判断一个完整 Core Claim 是否包含一次 requested household use。Contextual Applicability 判断的是另一个问题：已接受的 directed Claim 在显式 Rule 下是否相关。两者都不应被重载。

## 决策

1. 定义 proposal-local `Claim Use Relation Assessment` 候选作为可互操作 resolver 输出；不标准化 resolver 算法、服务或数据库。
2. Assessment 绑定精确 Claim body digest，以及一次 requested household、可选 space、purpose 和 `as_of` time。
3. 分别报告 `space_ids` 与 `purposes` 的 declared state、comparison kind、三值 status、reason codes 和内容绑定的 relation evidence。
4. household equality 与 valid-time interval 作为不同类型 guard 分别报告。
5. overall relation 按类型化 conjunction 派生：已知 disjoint 吸收；否则任一必要比较 indeterminate 则整体 indeterminate；否则 use contained。
6. 没有绑定证据的 `resolved_relation` 为 indeterminate。缺失、withheld、stale、contested 或不可访问证据永不变成 satisfied 或 false。
7. Assessment 是关于一次 use 的不可变证据；不改写 Claim、不缓存 universal closure、不确立 canonical topology、不发布 truth、不授予 access，也不提供 action Authority。
8. 在必要性和形状经独立实现检验前，此 artifact 保留在 Core clarification proposal 内。它不属于当前五输入 external wire trial，也暂不增加 Core 或 optional Profile artifact。

## 后果

- 任何 Agent 都能读取、复现或质疑结果，无需共享 chain-of-thought 或采用同一个 resolver。
- Spatial、taxonomy 和未来 relation Profile 继续负责各自证据语义。
- 同一不可变 Claim 可以针对不同 use、time、evidence access 与 tolerance 产生不同且合理的 Assessment。
- 12个 lifecycle case 覆盖 exact、resolved、missing、withheld、stale、empty、mismatch 与 Authority 边界。
- 是否晋升为 optional Profile 仍是未来治理决策，不由本 ADR 自动推出。
