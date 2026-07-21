# ADR-037：返回取舍集合而非隐藏的家庭效用

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-037-return-tradeoff-sets-without-hidden-household-utility.md`](ADR-037-return-tradeoff-sets-without-hidden-household-utility.md)

## 背景

家庭方案经常在照明、眩光、能耗、成本、隐私、韧性和不同人的体验之间取舍。单一分数容易排名，却会隐藏单位转换、不确定性、主体归属、缺失证据和价值判断。现有 HWM Profile 保留了冲突与参与过程，但尚未在推荐／选择之前定义有边界的比较结果。

## 决定

采用可选 Multi-Target Option Comparison Profile。矩阵每个单元绑定精确目标、方案、Assessment、认识论基础、覆盖、不确定性与已接受比较规则。硬约束需要独立、用途化的治理关系。支配采用三值边界：未知或重要的不可比较维度会阻止确定结论。

权重、优先级、词典序、期望水平和 tie-break 保持为独立接受的价值 Claim。它们可以支持带归属的 Recommendation，但不会改变支配事实，也不会产生 Selection、购买、安装或行动权限。

## 原因

模型可以减少确定被支配的选择、展示真实取舍并提出更小的问题，同时不假装技术优化能够替家庭解决价值问题。
