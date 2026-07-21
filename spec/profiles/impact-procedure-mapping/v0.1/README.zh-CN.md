# HWM 影响程序映射 Profile v0.1

- 状态：夹具候选
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范文本：[`README.md`](README.md)
- 许可证：CC BY 4.0
- Schema：[`mapping-policy.schema.json`](mapping-policy.schema.json)

## 目的

本可选 Profile 在一个 Authority policy 下，把一份 Bounded Impact Closure Assessment 中每个已披露影响条目映射为显式、异质的程序性要求。它用可审计且由行动侧系统承担的要求，替代“受影响实体因此成为投票者”的不安全捷径。

本 Profile 不求值要求是否履行，也不授权行动。

## 输入边界

映射请求绑定精确 Proposal 标识与不可变 revision、action type、用途，一份影响闭包评估及其状态、Proposal 绑定和 Authority Epoch，全部向本求值器披露的影响条目，当前决策时间、验证方 Epoch，以及零个或多个隐私安全路由绑定。

闭包状态必须为 `complete_for_declared_channels`。这不表示全局完整，只避免映射器把明确不完整的通道集合当成完整治理输入。

## 映射策略

策略采用 `only_one_applicable_per_impact`。规则根据 Proposal action、用途、影响通道、实体种类、影响状态和有效期匹配。每个已披露影响条目必须唯一匹配一条规则。

每条规则包含一个或多个要求模板，同一规则内多个模板全部产生。`none` 是显式处置，不生成要求实例。

基线要求种类包括：

| 种类 | 完成信号 |
| --- | --- |
| `affirmative_response` | 接纳绑定 Proposal 的肯定回答 |
| `consultation_opportunity` | 确实送达了回答机会 |
| `objection_window` | 已送达的窗口在没有阻断性异议时到期 |
| `notification` | 通知送达被记录 |
| `qualified_review` | 作用域限定复核返回策略要求的结果 |
| `audit` | 必需审计 Record 已追加 |
| `none` | 不生成要求实例，但影响被显式映射 |

规则还声明时机、失败效果、负面信号效果和路由模式。这些都是局部策略，不能从影响通道自动推出。

## 义务方向

承担义务的是希望继续行动的服务：协调器取得回答，通知服务投递通知，Authority 服务解析代表路由，复核服务取得适格结果，审计服务追加 Record。

受影响者没有回答义务。缺少回答可以让 Proposal 等待或被策略阻断，但不是该人的违规。

## 隐私安全路由

对于 `affected_subject`、`authority_resolved_representative` 和 `authority_role` 路由，请求必须为影响与模板提供唯一当前路由绑定。已解析绑定只公开 Proposal 作用域的 `participation_slot_id`，不公开身份。

映射器返回要求标识与槽位标识，不返回人员标识、成员关系、在场、代表身份、凭证或投递端点。槽位所属服务负责送达并接纳返回 Record。没有显式 Authority policy 与隐私审查时，不得通过跨要求复用槽位泄露隐藏的身份相等性。

路由缺失、不可取得、被拒绝、重复或歧义时，整个映射为 `indeterminate`，不能静默删除要求。

## 求值与结果

基线求值器检查 proof 与 Epoch，要求闭包绑定精确 Proposal revision，为每个影响唯一匹配当前规则，为每个非内部且非 `none` 模板解析唯一路由，并为每个非 `none` 模板建立不可变要求实例。即使规则输出 `none`，影响标识仍被保留。

| 状态 | 含义 |
| --- | --- |
| `mapped_for_declared_impacts` | 每个已披露影响唯一匹配规则，且每条必需不透明路由都已解析 |
| `indeterminate` | 闭包、Proposal 绑定、Authority、规则基数或路由使安全映射无法唯一确定 |

输出是 Profile 类型化 Record，不是 Permission、Prohibition、Coordination Assessment、履行结果、法律权利判断或 Authorization Decision。

可选的 [Procedure Fulfilment Profile](../../procedure-fulfilment/v0.1/README.zh-CN.md) 对这些要求求值，同时不合并不同 Record 的语义。

## 组合与兼容

```text
影响程序映射
  → 异质程序性要求集合
  → 履行求值器
  → Authority Policy Evaluator
  → 执行网关与本地安全
```

[Shared Action Coordination Profile v0.1](../../shared-action-coordination/v0.1/README.zh-CN.md)只能表达所有相关要求都是直接肯定回答且共享一种回答规则的兼容子集；它无法无损投影咨询、异议、通知、复核、审计或混合失败效果。

## 核心不变量

1. 受到影响不会自动选择通用程序。
2. 每个已披露影响都有且仅有一个显式映射处置。
3. 系统承担程序性义务，不能强迫人回答。
4. 槽位不是身份、在场、成员、监护或持久委托。
5. 通知不是接受；沉默不是肯定同意或权利放弃。
6. 肯定回答不是法律同意或授权。
7. 复核不是通用胜任能力或最终许可。
8. `none` 不等于“未受影响”，也不能删除影响条目。
9. 即使底层实体相等，跨通道要求也不自动合并。
10. 映射成功仍限制在声明影响内，不证明全局完整。

## 可执行证据

[`影响程序映射场景`](../../../../conformance/scenarios/impact-procedure-mapping-v0.1/README.zh-CN.md)覆盖混合要求、空闭包、显式 `none`、不完整闭包、精确 revision、Epoch、零条与多条规则、代表与不透明路由、拒绝或重复路由、action 不匹配、跨通道不合并和隐私守卫。

JavaScript 与 Python 独立复现夹具，但都来自同一项目过程，不代表独立治理共识。
