# HWM 多目标方案比较 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`option-outcome-matrix.schema.json`](option-outcome-matrix.schema.json)、[`option-comparison-assessment.schema.json`](option-comparison-assessment.schema.json)

## 目的

本可选 Profile 在多个独立接受的家庭目标之间比较装修或运行方案，但不合成通用“家庭总效用分”。它可以识别不可行、被支配、非支配、相同和当前不可比较的方案；不能替家庭选择价值、解决成员分歧、用隐藏权重推荐、选择产品、创建交易或授权行动。

规范链条是：

`精确方案 + 适用目标 + 已接受评价规范 + 用途一致的 Target Fit／Prediction 输入 + 已接受比较规则 → Option Outcome Matrix → Comparison Assessment`

## 比较方法

矩阵固定家庭、设计／比较上下文、方案集、目标集、用途、时间与 Authority Epoch。每个单元绑定精确评价，并保留认识论基础、不确定性、覆盖及每个目标自己的比较规则。缺失、过期、有争议、用途不符、单位／过程不兼容或作用域不同的单元是 `indeterminate`，不是零分或失败。

目标只有通过独立接受、用途绑定的治理关系才能成为硬约束。“requirement”“safety”或“must”等词本身不能建立专业或法律效力。全部硬约束确定通过才是 `feasible`；一项确定失败是 `infeasible`；必要证据未知则是 `indeterminate`。这仍不等于法规符合、专业批准、兼容性证明或行动安全授权。

在可行集合内，只有 A 在全部纳入且可比较的目标上都不差于 B，并至少一项严格更好，才能说 A 支配 B。重要维度未知或不可比较时，不能下支配结论。非支配只表示在这个精确矩阵中尚未被证明支配，不表示“最佳”、公平、推荐或已选择；不支配也不表示两个方案等价。

权重、优先级、词典序、期望水平与 tie-break 规则必须是带主体、范围、用途、时间、来源与 Authority 的独立已接受 Claim。Agent 可以提出或询问，但不能从点击、价格、模型置信度、家庭成员身份、多数票或自身优化目标中自动制造。没有被接受的价值规则时，输出保持为 tradeoff set。

不同成员的目标继续保留归属。下游精确 Proposal 所需的参与过程由 [Shared Action Coordination Profile](../../shared-action-coordination/v0.1/README.zh-CN.md)或更完整的程序 Profile 判断；方案比较不是通用社会选择算法。

Comparison 可以支持带归属的 Recommendation；Recommendation 不等于 Selection，Selection 不等于购买、安装、Action Authorization、dispatch 或结果接受。

采购资格合格的 Commercial Offer Snapshot 只有在保留精确 variant、商家、区域、数量、观测时间、有效期、套装覆盖、交付依据和总成本依据时，才可作为比较选项。`qualified_for_shortlist` 只建立比较资格，不建立优越性；展示价格、库存或购物 Agent 可用性不得成为隐含排序规则或购买决定。参见[采购报价资格 Profile](../../procurement-offer-qualification/v0.1/README.zh-CN.md)。

[Multi-Target Option Comparison oracle](../../../../conformance/scenarios/multi-target-option-comparison-v0.1/README.zh-CN.md)测试可行性、三值支配、不可比较维度、已接受价值规则、方案集修订与下游边界。
