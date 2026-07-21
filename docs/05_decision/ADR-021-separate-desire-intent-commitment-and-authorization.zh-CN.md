# ADR-021：分离 desire、Intent commitment、履行与授权

- 状态：提议
- 日期：2026-07-19
- 英文为规范文本
- 英文规范：[`ADR-021-separate-desire-intent-commitment-and-authorization.md`](ADR-021-separate-desire-intent-commitment-and-authorization.md)

## 背景

Task Lineage 已把工作绑定到精确 Intent，但 HWM 过去只在 Action Trace 和 Task 中保存裸 Intent ID。因此无法互操作地证明：一个偏好、自然语言请求、推测 Routine、Agent 建议或 Goal Claim 是否已被家庭采纳，也没有修改和撤回规则。

## 选项

1. 把任何话语或 Agent 推测目标当成家庭 Intent；
2. 把 accepted Goal Claim 或 active Task 当成 Intent 证明；
3. 把 Intent 增加为通用 Core 心智状态原语；
4. 定义可选 Intent Commitment Profile，分离声明式 Definition、Authority 承诺、fulfillment assurance、Task 派生和行动授权。

## 决定

采用选项 4，作为 Profile 讨论候选。

Intent Definition 包含声明式 Goal、Requirement 和 Constraint 绑定。仅仅存在或被认知接纳，不表示已经采纳。Authority 独立地对精确定义进行采纳、暂停、撤回或替代；commitment 与 fulfillment 是独立状态轴。

Intent 身份是由家庭控制的 lineage，绑定家庭、用途、生命周期、受益者和范围。expectations 只有通过顺序、内容绑定、Authority 批准且带显式 expectation lineage 的修订才能在同一 lineage 内演化。全部替换 expectations 或改变身份基础会产生新 Intent。

Task 绑定精确 Intent Definition revision。Intent revision 不修改已有 Task；Intent 采纳不授权某个 Proposal；Intent 撤回也不静默取消 Task 或撤销既有 Authorization Decision。

## 理由

这补上了家庭知识与家庭定向工作之间的语义桥梁，同时保留既有 Authority、证据、隐私与行动边界。它遵循 RFC 9315 的“what, not how”和 assurance 原则，但不引入电信控制架构，也不声称读取人的私有心智状态。

## 后果

- 用户命令先成为可归属候选，再成为家庭承诺；
- Agent 可以提出 Definition，但不能自我采纳；
- 个人偏好保持个人作用域，不能被推断合成为家庭 Intent；
- persistent goal 可以跨 Agent 和 Task 更换持续存在，同时保留时点 fulfillment 证据；
- 实现需要追加式 Definition／State 历史与 Authority 决策绑定；
- 不引入通用优先级、投票、效用函数、Planner 或新 Core 原语。
