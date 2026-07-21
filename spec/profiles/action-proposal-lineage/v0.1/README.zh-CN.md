# HWM Action Proposal Lineage Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：英文
- Schema：[`action-proposal.schema.json`](action-proposal.schema.json)、[`proposal-state-assessment.schema.json`](proposal-state-assessment.schema.json)

## 目的

本可选 Profile 把 Action Proposal 定义为不可变、内容绑定的候选行动，而不是可原地改写的命令名称。它规定何时仍是同一 lineage 的修订、何时必须创建新 Proposal，以及回答、影响工作、授权和 dispatch 为什么不能在修订间自动迁移。

Core v0.1 保留紧凑的内嵌 Proposal 投影；需要修订安全或跨系统交换时使用这里的独立制品。

## 身份与修订边界

Proposal lineage 固定六项身份基础：家庭、精确 Intent Definition、精确 Task 或 direct realization 身份、用途、语义动作种类、目标资源／作用域集合。任一项改变都必须创建新 `proposal_id`。需要并存的竞争方案也必须使用不同 ID，即使身份基础相同。

参数、前置条件、预期效果、声明影响、有效期、World View 或 Plan 绑定改变，可以形成同一 lineage 的下一个连续修订。每个修订都是新的不可变制品，`n+1` 必须绑定 `n` 的精确 RFC 8785/SHA-256 规范投影；该投影排除 `proposal_digest` 与 `proof`，避免自摘要，同时绑定全部语义内容。规范制品之外的展示或翻译变化不产生修订。

同一精确前驱产生两个有效后继就是 contested fork，不能按时间、到达顺序、Agent 信心或“看起来更安全”选择。状态评估以追加方式表达 `current`、`superseded`、`withdrawn`、`contested` 或 `indeterminate`。它不会删除历史授权或已经发生的执行。

## 精确下游绑定

回答、影响报告、覆盖评估、程序映射、履行评估、Authorization Decision 与 Dispatch Record 都必须绑定 `(proposal_id, proposal_revision, proposal_digest)`。新修订必须重跑所有适用 gate；即使设置更低、范围更窄或描述为等价／更安全，也不得继承旧结果。修订 `n` 的授权对 `n+1` 不授予任何权限。

Dispatch 同时要求精确且仍有效的授权，以及当前 Authority 状态下为 `current` 的 Proposal State Assessment。supersede 或 withdraw 不会撤销已 dispatch 的 Attempt；取消、补偿和 Authority 撤销属于独立行动。

## 不变量

1. Proposal 规范正文不可变。
2. 同一 `(id, revision)` 出现不同正文是完整性冲突。
3. 修订必须连续并绑定精确前驱摘要。
4. 身份基础变化或并存方案必须创建新 ID。
5. fork 是 contested，不使用 last-writer-wins。
6. Plan 或 World View 新修订不会重定向旧 Proposal。
7. 下游判断绑定精确 Proposal 摘要，绝不隐式继承。
8. currentness、authorization、execution 与物理效果是不同坐标轴。
9. 内容不变的重试在 policy 允许时是新 Attempt；参数变化是 Proposal 修订。

## 一致性

[Action Proposal Lineage oracle](../../../../conformance/scenarios/action-proposal-lineage-v0.1/README.zh-CN.md)覆盖连续性、新身份边界、分叉、状态、重试和下游不继承。

```sh
node conformance/scenarios/action-proposal-lineage-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
