# HWM 变化影响与重新验证 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`household-change-set.schema.json`](household-change-set.schema.json)、[`artifact-revalidation-assessment.schema.json`](artifact-revalidation-assessment.schema.json)

## 目的

本可选 Profile 判断房屋、安装、家庭构成、设计、知识或治理变化后，哪些制品必须重新验证。它既保留历史解释，也防止过期的模型、目标、规则和权限静默治理当前家庭。

规范链条是：

`已准入变化证据 → 不可变 Household Change Set → 声明依赖闭包 → 逐制品 Revalidation Assessment → 当前使用决定和有限 follow-up`

Change Set 区分 `world_change`、`knowledge_correction`、`design_change`、`governance_change` 和 `evidence_availability_change`，并保留 effective time、观察／决定时间、Record time、来源、standing 和 before／after binding。后来发现的旧情况不等于在发现时世界发生变化；未来生效变化也不影响更早的 `as_of`。

影响只沿声明的 `identity_basis`、`applicability_condition`、`model_input`、`geometry_or_material`、`subject_or_population_scope`、`evidence_source`、`evaluation_specification`、`authority_or_governance`、`privacy_or_disclosure` 或 `lifecycle_realization` 依赖传播。名称相似、图中靠近、同一文件或 Agent 直觉不能建立依赖。

闭包为 `complete_for_declared_dependencies`、`partial` 或 `indeterminate`。只有完整闭包且没有路径才能证明 unaffected；不完整闭包下没有路径仍是 indeterminate。循环、缺失节点、边语义不明、访问受限或多个当前 head 都 fail closed。

每个 Assessment 分别判断 identity、assumption、evidence、governance、privacy 与 current-use impact，总结果可以是 `unaffected`、`remains_valid`、`review_required`、`new_revision_required`、`new_identity_required`、`historical_only`、`not_usable` 或 `indeterminate`。

设备／endpoint 更换、移动或重装会要求新的 Installed Influence Model identity，但不必改变 IEC function-position、目标要求或历史 commissioning。房间用途变化可以保留几何，却要求 review applicability、Evaluation Specification、Planning Prediction 和 Value Rule。家庭成员／宠物加入不会推翻已有个人 Claim，但可能使 population coverage、privacy、impact closure 和 coordination 不完整。Authority Epoch 变化不会让物理 Observation 变假，却要求刷新当前权限、rule state、Lease 和 disclosure。

Revalidation 只要求 re-observe、re-simulate、re-commission、re-resolve、review、refresh 或新 identity 等 follow-up，不会自行执行它们。当前不可用也不删除历史。

[Change Impact Revalidation oracle](../../../../conformance/scenarios/change-impact-revalidation-v0.1/README.zh-CN.md)测试时间、依赖闭包、身份／假设／治理影响、设备／空间、成员、纠正、历史和禁止级联。
