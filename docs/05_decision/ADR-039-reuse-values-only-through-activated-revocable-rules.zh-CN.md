# ADR-039：只通过已激活、可撤销规则复用价值

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-039-reuse-values-only-through-activated-revocable-rules.md`](ADR-039-reuse-values-only-through-activated-revocable-rules.md)

## 背景

重复询问相同价值问题会造成负担，但把历史选择缓存为永久偏好，又会形成画像、范围扩张、过期假设和不清晰的撤销边界。HWM 需要一种仍由家庭控制、又不变成自动化或 Intent 的复用层。

## 决定

采用可选 Reusable Value Rule Profile。Rule identity 固定家庭、被代表主体范围、决策领域、价值关系类型、目标范围与用途。每个 Definition revision 必须独立激活。Active 且 applicable 的规则只能针对一次精确比较需要，抑制完全等价的澄清问题。

暂停、退役、替代、有争议、到期、状态过期、未授权、情境不符、例外适用或互相冲突的规则不能静默治理。Drift signal 触发 review，而不是自动改写。离线撤销延迟必须有界且可见，不能声称为零。

## 原因

这样既能减少重复问题，又不会把记忆变成权限。家庭可以明确让某条价值关系可复用，检查它为何被使用，收窄、暂停或撤销，并保留依赖旧状态的历史决定。
