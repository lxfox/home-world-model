# HWM 可复用价值规则 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`value-rule-definition.schema.json`](value-rule-definition.schema.json)、[`value-rule-state.schema.json`](value-rule-state.schema.json)、[`value-rule-use-assessment.schema.json`](value-rule-use-assessment.schema.json)

## 目的

本可选 Profile 让家庭复用一条明确接受的价值关系，使 Agent 不必在每个相同决策中重复 [Value Clarification Dialogue](../../value-clarification-dialogue/v0.1/README.zh-CN.md)。规则仍然有范围、可审阅、可暂停、可撤销且用途化。

Reusable Value Rule 不是观察到的习惯、心理特征、通用权重、家庭共识、Intent、Routine、产品 Selection 或 Action Authorization。

规范链条是：

`有限且已接受的 Value Claim／明确请求 → candidate Rule Definition → Authority activation → 精确 Use Assessment → 比较输入或重新澄清`

## 边界

一次回答／选择／点击／行为只是 occurrence；有范围的 Value Claim 表达某人在声明条件下的一次价值关系；重复模式只是规则提案的证据；Definition 才声明可复用关系、情境、用途、领域、review／expiry 与例外；State 记录 Authority 是否让精确 Definition `active`、`paused`、`retired`、`superseded`、`contested` 或 `indeterminate`；每次使用仍需独立 Assessment。

规则 identity 固定家庭、被代表主体／Authority 范围、决策领域、关系类型、目标／方案范围与用途。改变其中任何一项都需要新 `rule_id`。阈值、情境条件、例外、有效期、review 计划或证据改变可以形成不可变顺序 revision，但每个 revision 都必须单独激活。

个人规则不能扩大成家庭规则；照明设计规则不能静默治理空调运行；目录筛选规则不能静默治理购买或自动化。重复次数、模型置信度、点击频率或没人反对都不能激活规则。

每次 Use Assessment 绑定精确 Definition／State、当前 comparison、情境、用途、主体、时间、Authority Epoch、披露政策与证据访问。适用性是 `applicable`、`not_applicable` 或 `indeterminate`；复用决定可以允许使用并抑制完全等价的问题、要求重新澄清、明确禁止使用或保持不确定。

未知情境不是 false，也不是 applicable。互相矛盾的 active rules 是 indeterminate；没有已接受冲突政策时，时间更新、频率更高、revision 更大或模型更有信心都不能选赢家。问题抑制只针对精确比较需要，不能删除参与权、周期 review、纠正或政策要求的披露。

异常回答可能表示情境差异、例外或 drift，不会立即改写规则。Review 可以建议保留、收窄、暂停、替代、退役或重新澄清，真正状态转换仍由 Authority 完成。离线撤销不能声称瞬时生效，必须暴露 state freshness 和有界 stale-use 风险。

每个 State 都是不可变 revision。Revision 1 没有 predecessor；后续 State 绑定精确前态 digest、自身 `as_of` 以及导致迁移的 Authority decision。相同身份／revision 的不同 canonical State 是完整性冲突。竞争 successor 是 contested，revision 数字或记录时间本身不能选择赢家。

[Reusable Value Rule oracle](../../../../conformance/scenarios/reusable-value-rule-v0.1/README.zh-CN.md)测试身份、激活、情境、到期、review、例外、冲突、drift、问题抑制范围与下游边界。
