# HWM Deliberation Closure Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)

## 目的

本可选 Profile 关闭一次有界家庭商议，但 Closure 制品自身不是 Claim 纠正、容忍、延期、抑制、Intent 采纳或拒绝的权力来源。

规范模式是：

`议题依据 + interaction Records + 分别生效的结果制品 -> Deliberation Closure Assessment`

Assessment 是回执与一致性检查，不增加 Core Conversation、Decision 或 Deliberation 原语。

## 为什么 Closure 只是回执

界面上的一个“否”可能表示拒绝某个 candidate Intent、拒绝某个 Action Proposal、反驳 Agent 的事实前提、容忍当前不匹配、延期讨论，或者要求不要再提示。这些回答的 subject、scope、期限、Authority 与效果完全不同。

因此 Closure 不携带一个具有魔法效力的 `accepted/rejected`。它绑定零个或多个已经通过各自机制生效的结果制品，并报告商议是否一致关闭。

## 来源与结果效果

每次商议绑定一个开启依据并保留来源：

- `agent_detected_gap`：Deliberation Eligibility Assessment；
- `explicit_user_request`：命题绑定的用户 Record；
- `existing_intent_review`：Intent State Assessment 或 review request；
- `manual_household_deliberation`：Authority 认可的家庭 Record。

直接用户请求绝不重写为 Agent 推断的 Need；既有 Intent review 也不暗中创建新 Opportunity。

Closure 可以绑定多个效果：

- `intent_adoption`：精确 Intent Definition、State 与 Authority Decision；
- `candidate_rejection`：精确 candidate 与 Authority Decision，不拒绝底层 target Claim；
- `tolerance_claim`：已接受、有 scope 和期限的容忍 Claim，Target Fit 不改变；
- `deferral_policy`：已接受的重访时间／触发 policy，不等于拒绝或永久抑制；
- `raising_policy_revision`：已接受的 Deliberation Policy 修订，不撤回 target；
- `target_correction`：带显式 `supersedes` 血缘的新 Claim，历史保留；
- `intent_revision`：带 expectation lineage、经 Authority 批准的 Intent 修订。

每项效果有自己的内容绑定、资格证据、Authority scope、有效期与隐私规则。Closure 只记录其绑定是 `verified`、`not_effective` 或 `indeterminate`。

## Closure 状态

- `resolved`：至少一项效果且所有披露效果均为 `verified`；
- `closed_without_decision`：interaction 结束但没有规范效果；
- `expired`：有界商议窗口结束且没有效果；
- `superseded`：新商议通过显式关系替代该 thread；
- `indeterminate`：无法确定议题身份、interaction、覆盖、Authority、效果 standing 或内容绑定。

`closed_without_decision` 与 `expired` 的 effects 必须为空。沉默、超时、关闭界面或 Agent 总结不会变成拒绝、容忍、同意或抑制。

一次商议可以同时纠正目标并修改 Agent 何时可再次提出；它们仍是两项效果。如果一项生效、另一项未知，Closure 为 `indeterminate`，已验证效果仍通过自己的制品独立生效，不回滚。HWM 不声称跨系统事务原子性。只有 `complete` 效果覆盖才能产生 `resolved`。

## 不变量

1. interaction 回答、closure 与规范效果分离。
2. Closure 是回执，不是 Authority 来源。
3. 拒绝 candidate 不拒绝 target Claim 或未来 candidate。
4. 容忍不使 Target Fit 满足，也不撤回 target。
5. 延期不等于拒绝或永久抑制。
6. 抑制再次提出不消除 target、证据或 gap。
7. 纠正生成新 Claim 与显式血缘，历史不可变。
8. Intent 采纳／修订使用 Intent Profile 与精确 Authority Decision。
9. 多项效果分别绑定和验证。
10. 沉默、超时、过期、关闭 UI 与缺失证据不产生同意或拒绝。
11. 即使 Closure 汇总未知，已验证效果仍独立有效。
12. Closure 不授予通知、规划、Proposal、Authorization、dispatch 或行动。

## 标准、证据与非目标

[Clark 与 Brennan 的 grounding 研究](https://collablab.northwestern.edu/CollabolabDistro/nucmc/ClarkAndBrennan-GroundingInCommunication-1991.pdf) 支持显式理解证据和 repair；[Horvitz 的 mixed-initiative 原则](https://www.microsoft.com/en-us/research/publication/mixed-initiative-interaction/) 强调不确定性、注意力与用户控制；[RFC 9315](https://www.rfc-editor.org/info/rfc9315/) 分离用户表达、Intent 生命周期、fulfillment、assurance 与 reporting；[PROV-O](https://www.w3.org/TR/prov-o/) 提供 revision、derivation、generation 与 invalidation 来源语义。

[Deliberation Closure oracle](../../../../conformance/scenarios/deliberation-closure-v0.1/README.zh-CN.md) 测试七类效果、多效果 closure、局部覆盖、沉默、超时、纠正历史与禁止混淆。[`Closure Assessment schema`](deliberation-closure-assessment.schema.json) 固定交换边界。

本 Profile 不标准化 dialogue act、不推断内心、不规定 UI、不选择家庭治理、不声称效果事务原子性，也不授权行动。
