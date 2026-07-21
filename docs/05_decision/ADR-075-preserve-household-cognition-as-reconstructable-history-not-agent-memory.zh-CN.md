# ADR-075：把家庭认知保存为可重建历史，而不是 Agent 记忆

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-075-preserve-household-cognition-as-reconstructable-history-not-agent-memory.md`](ADR-075-preserve-household-cognition-as-reconstructable-history-not-agent-memory.md)

## 背景

ADR-074 把充分性限制在一个决策边界。跨越多次决策，家庭仍然需要连续性：后来的 Agent 应理解此前知识、决定与变化，却不继承不透明记忆，也不盲目累加所有旧结论。把最新快照、摘要、修订号或 Agent 状态当成家庭心智，会制造可变真值、用途泄漏、fork 歧义与供应商依赖。

HWM 已有不可变 Claim／Record／Assessment、World View、来源包、state-history invariant、类型化 Change Set、逐制品 revalidation、用途化 Orientation Snapshot 与 Task Checkpoint。它们足以支持更强的连续性定义，而无需新增 memory 原语。

## 决定

1. 把家庭认知连续性定义为：获准的独立消费者能够重建有界结果，并解释其 lineage 及其与旧结果的差异。
2. 以不可变源制品、发生记录、类型化 lineage、声明依赖、已接受程序／policy、Authority 历史及 coverage／limitation 元数据作为耐久底座。
3. 针对精确 requester、用途、范围、`as_of` 与 Authority 状态重新物化当前认识；历史 View 永远不是通用可变 head。
4. 相关已接纳变化只通过声明依赖闭包和逐制品 revalidation 传播；不存在定义当前真值的全局 home version。
5. 在兼容 `as_of` 下保留旧 Assessment 与 View；纠正或变化后的当前结果不改写历史。
6. fork 与同修订不同内容被视为争议／完整性冲突；修订号大小、时间戳、文件顺序、语义相似度或模型置信度都不能选择 head。
7. 摘要、索引与 cache 是可替换派生物；它们需要精确来源／程序／闭包绑定，永远不成为规范记忆。
8. 不要求或交换 Agent chain-of-thought、私有记忆、凭证、Lease 或模型先验；耐久决策结构已经足够，新输出保留新 attribution。
9. 对 withheld、unavailable 或已删除的关键来源，如实报告有界重建限制，不能用大模型先验填补。
10. 声明变化后的连续性不要求输出完全一致，而要求差异具有可归因解释；无法解释的差异表示连续性尚未得到证明。

## 后果

- 家庭而不是单一 Agent 供应商拥有认知的耐久基础。
- Agent 可以改进或产生分歧，同时仍对同一证据与声明变化历史负责。
- 仍可进行存储最小化：合格派生 Record 可以支持有界重建，而不保留或披露每条原始观察。
- 30个可执行案例检验 Agent 更换、纠正、变化、cache 丢失、删除、withholding、fork、snapshot、离线状态、迟到证据和可解释差异。
