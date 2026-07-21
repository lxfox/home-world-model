# HWM Deliberation Eligibility Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)

## 目的

本可选 Profile 判断 Agent 发现的一项目标缺口是否可以进入家庭商议队列。它治理主动提出问题的行为，但不把未满足目标变成 Need、家庭承诺、打扰、推荐或行动。

规范链是：

`Target Fit Assessment + 已接受 Deliberation Policy Claim + 用途绑定的条件 Assessment -> Deliberation Eligibility Assessment`

Profile 不增加 Core Opportunity、Need 或 Deliberation 原语。Policy 是普通不可变 Claim；Assessment 是 Profile 局部制品。

## 为什么需要这一层

一条适用目标未满足，并不表示值得打扰家庭。缺口可能很短暂、按家庭 policy 不重要、已经提出过、被有意容忍、属于他人隐私、已有 adopted Intent 处理，或者不应向当前请求者披露。反过来，用户也可能在没有当前缺口时明确要求改变。

因此 Target Fit 本身不能创建候选家庭承诺。Deliberation Eligibility 记录为什么某个主动议题可以被考虑，同时保留家庭注意力与控制权。

## Policy 与结果

Deliberation Policy Claim 的 proposition subject 是目标 Claim 标识，predicate 为：

`https://homeworldmodel.org/spec/profiles/deliberation-eligibility/v0.1#mayRaiseForDeliberationWhen`

object 声明可接受的 fit 结果、条件逻辑、精确外部条件 query、去重／冷却范围、请求者／受益者／披露／用途约束，以及既有 Intent 或开放商议是否抑制重复。重要性、持续性、成本敏感度、用户可用性等仍由声明的外部 Assessment 提供。HWM 不定义通用烦扰度、紧迫度、价值或效用分数；缺少 policy 绝不等于无条件准入。

结果为：

- `eligible`：精确目标缺口、已接受 policy 与声明条件都确定通过；
- `not_eligible`：fit 明确不在 policy 范围、条件明确失败，或精确去重／冷却规则抑制；
- `indeterminate`：绑定、standing、访问、新鲜度、覆盖、身份、时间或条件证据不确定。

`eligible` 只表示“可为该用途进入经治理的商议队列”。它不允许通知、不披露私密证据、不创建或采纳 Intent、不选择 Plan、不形成 Action Proposal，也不派发命令。独立交互／通知 policy 决定是否、何时、通过何处、向谁展示。

## 路径边界

- 用户明确请求可以直接形成 candidate Intent Definition；不需要主动缺口准入，但仍需分别采纳和授权。
- Agent 发现缺口后，在主动提出议题前使用本 Profile。
- 已有 adopted Intent 漂移更新 fulfillment assurance 与既有工作，不暗中变成新 Opportunity。
- Routine occurrence 按既有 adopted persistent Intent 的 Routine Instantiation 处理。
- 紧急或强制安全义务走显式 Authority／safety 程序；本 Profile 不创建也不阻断该义务。

eligible Assessment 可进入 Agent 创建的 candidate Intent Definition `basis_bindings`，但 candidate 仍是 `proposed`，必须由 Authority 另行采纳。商议也可以以“容忍、延后、不要再问、纠正目标”或不形成 Intent 结束。

可选 [Deliberation Closure Profile](../../deliberation-closure/v0.1/README.zh-CN.md) 把这些结束方式记录为独立生效制品之上的回执。eligibility 不会被 closure 消耗或改写。

## 不变量

1. 目标缺口、Need 归因、商议准入、候选 Intent、采纳、通知与行动彼此分离。
2. `not_satisfied` 单独绝不推出 `eligible`。
3. 缺失、拒绝访问、陈旧、争议、局部或绑定不匹配输入均为未知。
4. policy 独立接受并绑定内容。
5. eligibility 绑定用途、主体、时间、World View 与 Authority。
6. 去重抑制重复提出，但不消除底层缺口。
7. eligibility 不泄露隐藏证据或参与者身份。
8. eligibility 不建立可行性、收益、优先级、紧迫度或首选方法。
9. 用户明确请求不被追溯描述为 Agent 发现的 Need。
10. 既有 Intent drift 与新主动商议分离。
11. 任何结果都不授予通知、Intent 采纳、Task、Proposal、Authorization 或行动。

## 研究、证据与非目标

[RFC 9315](https://www.rfc-editor.org/rfc/rfc9315.html) 分离声明式 Intent、处理与生命周期；[Cohen 与 Levesque](https://doi.org/10.1016/0004-3702(90)90055-5) 及 [Rao 与 Georgeff](https://users.cs.utah.edu/~tch/notes/refs/Rao-Georgeff1995.pdf) 支持分离目标、商议与承诺；[PROV-O](https://www.w3.org/TR/prov-o/) 支持有归因的派生；[AI 决策支持自动化偏差研究](https://pubmed.ncbi.nlm.nih.gov/39234734/) 支持让机器提出的问题可检查且不能自我采纳。

[Deliberation Eligibility oracle](../../../../conformance/scenarios/deliberation-eligibility-v0.1/README.zh-CN.md) 测试主动缺口、明确请求、重复、Intent drift、隐私、缺失 policy、fit 未知、安全路由与禁止下游推断。[`Assessment schema`](deliberation-eligibility-assessment.schema.json) 固定最小交换边界。

本 Profile 不推断人的内心、不排序家庭成员、不计算通用效用、不规定通知 UX、不决定紧急义务、不推荐设备、不规划工作，也不授权行动。
