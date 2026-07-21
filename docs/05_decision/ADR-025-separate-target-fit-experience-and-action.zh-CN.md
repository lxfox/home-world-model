# ADR-025：分离目标符合度、个人体验与行动

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-025-separate-target-fit-experience-and-action.md`](ADR-025-separate-target-fit-experience-and-action.md)

## 背景

Contextual Applicability 判断目标现在是否相关，但刻意不判断当前世界是否达到目标。现有 Goal Evaluation 绑定 Action Trace，装修 Requirement Evaluation 面向模拟结果，Intent fulfillment 只适用于承诺之后。它们都不能复用来评价行动前的当前家庭状态。

一个原始观测值并不足够。同一个 25 °C 可能属于不同房间、时间、属性、传感过程、不确定性或目标范围；它可以证明某项声明的数值偏好未满足，却不能证明主观不适。符合性计量同样要求测量不确定性与决策规则。

## 决策

1. 新增可选 Target Fit Profile，不增加 Core 原语。
2. 必须有分别接受的 Evaluation Specification Claim，把目标绑定到 criterion、过程、不确定性感知决策规则与聚合。
3. Assessment 绑定精确目标、规范、适用性 Assessment、World View、用途、时间、Authority Epoch 与证据内容。
4. 单 criterion 使用 `met | not_met | indeterminate`；聚合使用 `satisfied | partially_satisfied | not_satisfied | indeterminate`。
5. `not_applicable` 留在 fit 之外；不适用或适用性未知时，fit 为 `indeterminate`。
6. 只有显式多 criterion 聚合规则才能产生部分满足。
7. 测量 fit 与个人体验证言保持独立，除非目标显式把证言设为 criterion。
8. 当前 fit 与预测 fit、Effect Assessment、行动后 Goal Evaluation、Intent fulfillment、Need、优先级和授权分开。
9. 缺失、拒绝访问、陈旧、争议、绑定不匹配、单位不兼容及边界模糊证据均为未知。
10. fit 不授予 Intent、Task、Proposal、Authorization、dispatch 或行动。

## 后果

任何兼容 Agent 都能重现为何目标被判断为满足或未满足，而不必继承原模型隐藏的代理指标。家庭可修改模糊偏好的操作化方法而不重写偏好。传感证据与生活体验可以不一致，且不会互相覆盖。模型由此获得从世界知识到目标的显式桥梁，同时保留治理边界。

## 拒绝的方案

- 在 Agent 内直接比较原始值：隐藏范围、过程、不确定性与决策权。
- 只把评价语义写在目标内：无法独立修订与接受测量方法。
- 把接近阈值当作部分满足：混淆偏差和多 criterion 聚合。
- 把传感器符合当作舒适：把操作代理误作个人体验。
- 复用行动成功：目标可能在行动前已经满足，也可能在正确执行后仍未满足。

## 参考

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [EARL 1.0](https://www.w3.org/TR/EARL10-Schema/)
- [SHACL](https://www.w3.org/TR/shacl/)
- [JCGM 106:2012](https://www.bipm.org/en/doi/10.59161/jcgm106-2012)
