# HWM 价值澄清对话 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`clarification-question-proposal.schema.json`](clarification-question-proposal.schema.json)、[`value-response-interpretation.schema.json`](value-response-interpretation.schema.json)

## 目的

当 [Multi-Target Option Comparison](../../multi-target-option-comparison/v0.1/README.zh-CN.md)仍留下多个非支配或不可比较方案时，本可选 Profile 允许 Agent 提出一个最小且与当前决策相关的问题。回答只能形成有范围的 candidate Value Claim，不能把一次回答、点击或行为观察当成永久偏好。

规范链条是：

`tradeoff Assessment + 未解决关系 + 已接受对话／注意力政策 → Question Proposal → 独立授权的投递 → 精确 Response Record → Interpretation Assessment → candidate Value Claim → 独立接受 → 新一轮比较`

## 问题边界

Question Proposal 绑定精确矩阵／Assessment revision、未解决方案／目标、回答者、用途、到期时间与 Authority Epoch。它说明问题要澄清什么价值关系、哪些可能回答会改变非支配集合／Recommendation／下一规划步骤、每种回答的有限后果、已披露差异与不确定性、负担／冷却／重复／无障碍／隐私状态，以及中性措辞控制。

问题必须允许 `defer`、`cannot_tell` 和 `reject_premise`。不能改变声明下游状态的问题对本机制而言不具决策相关性。决策相关性仍不等于打断或投递许可；另一条注意力／交互政策决定何时、何渠道、向谁展示，也不能为了说明取舍而泄露他人的私密目标。

本 Profile 不规定通用信息增益公式。提案只需证明问题能区分至少两个当前可行的下游状态，并且没有已知、已接受、负担更低且能区分同样状态的问题。这是可审阅主张，不是心理最优证明。

## 回答边界

回答可以表示局部偏向左／右、局部无差异、接受某条显式 tradeoff rule、延后、无法判断、拒绝问题前提或纠正范围／选项。自然语言可以使用，但确定解释必须恢复精确问题与回答绑定。沉默、超时、关闭、渠道失败或无法访问，不代表无差异、拒绝或偏好。

Interpretation 检查回答者／代理权限、Evidence Standing、时间、问题时效、意义恢复、范围、用途与披露许可。结果可以允许创建有归属、有场景、有用途、有有效期和限制的 candidate Value Claim，但回答本身不会自动让 Claim 被接受。

重复回答可以支持一个更广规则的提案，却不能自动证明稳定偏好、通用权重、身份特征或画像许可。不同时间和情境的矛盾回答可以同时有效，不必 last-writer-wins。

[Value Clarification Dialogue oracle](../../../../conformance/scenarios/value-clarification-dialogue-v0.1/README.zh-CN.md)测试决策相关性、负担、隐私、精确绑定、opt-out、范围、时间、权限、广义规则推断、纠正与下游边界。
