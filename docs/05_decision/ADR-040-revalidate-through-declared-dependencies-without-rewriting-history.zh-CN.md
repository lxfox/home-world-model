# ADR-040：沿声明依赖重新验证而不改写历史

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-040-revalidate-through-declared-dependencies-without-rewriting-history.md`](ADR-040-revalidate-through-declared-dependencies-without-rewriting-history.md)

## 背景

家庭持续变化：设备更换、房间用途改变、几何纠正、人员／宠物加入离开、设计演进、Authority policy 轮换。全局 home version 失效过于粗糙，永久有效又会让旧假设静默治理当前家庭。

## 决定

采用可选 Change Impact Revalidation Profile。它区分世界、设计、纠正、治理和证据可用性变化，保留 effective／observed／record time，并分别评价 identity、assumption、evidence、governance、privacy 和 current use。

只有完整声明闭包且没有依赖路径才能证明 `unaffected`。身份基础变化需要新 lineage，其他变化可能只需 review 或 revision。当前失效只让制品成为历史或对某用途不可用，不会改写／删除它。Revalidation 要求 follow-up，但不执行 follow-up。

## 原因

这样不同 Agent 可以对旧知识是否可用得出同样的有限结论，而不需要一个通用依赖图或可变的单体数字孪生。
