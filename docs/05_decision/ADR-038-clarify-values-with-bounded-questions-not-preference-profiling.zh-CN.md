# ADR-038：用有限问题澄清价值，而不是偏好画像

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-038-clarify-values-with-bounded-questions-not-preference-profiling.md`](ADR-038-clarify-values-with-bounded-questions-not-preference-profiling.md)

## 背景

非支配 tradeoff set 仍可能过大。Agent 可以通过提问降低不确定性，但不受约束的“偏好学习”容易造成无谓打断、诱导选择、隐私泄露、行为画像，并把一次情境回答扩大成永久家庭规则。

## 决定

采用可选 Value Clarification Dialogue Profile。每个 Question Proposal 声明比较绑定、未解决关系、回答含义及后果、不确定性披露、负担、注意力政策、隐私、中立性、opt-out、范围与期限。决策相关性不授权打断。

沉默、超时、关闭、点击和行为观察不成为明确价值回答。有效回答保留主体、情境、用途、有效期、来源与限制，最多产生仍需独立接受的 candidate Claim。更广或持久的规则需要显式澄清与接受。

## 原因

这样 Agent 可以把复杂决策缩小为人容易回答的问题，同时把注意力与价值都视为受治理的家庭资源；通过对话学习，却不静默构建心理画像或把互动变成权限。
