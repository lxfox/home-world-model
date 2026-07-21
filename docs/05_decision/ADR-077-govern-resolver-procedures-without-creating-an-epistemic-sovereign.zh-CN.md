# ADR-077：治理 Resolver 程序，而不创造认知主权者

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-077-govern-resolver-procedures-without-creating-an-epistemic-sovereign.md`](ADR-077-govern-resolver-procedures-without-creating-an-epistemic-sovereign.md)

## 背景

ADR-076 保留多种合格解释，但允许已接受 Resolver procedure 生成一份用途化 World View。如果这个程序是厂商不透明默认值、由 Agent 自选、静默升级，或与其实现混为一体，它就会成为隐性认知权力。反过来，一套通用家庭真理算法也会抹平领域、用途和证据差异。

既有 Authority、Evidence Standing、conformance／capability、不可变 World View、receipt 与 revalidation 机制足以治理程序生命周期，不需要增加 Core policy 对象。

## 决定

1. Resolver procedure 是显式、不可变、版本化、用途／范围限定且由 Authority 治理的 policy artifact，声明可接纳输入角色、standing 依赖、evidence closure、缺失／冲突／abstention 行为、输出语义、披露、限制和 conformance case。
2. 分离程序 Proposal、所需 review、Authority acceptance、实现 conformance、部署 admission、activation、suspension、replacement／rollback 和逐 World View execution receipt。
3. Agent 可以提出程序，但不能接受、扩张、启用、自我豁免或静默升级；缺少适用的已接受程序时，resolution 为 indeterminate。
4. Authority acceptance 表示家庭允许在精确用途与范围内按该程序依赖结果；它不宣布命题为真、不冒充专业认证，也不授权行动。
5. 按用途要求语义／conformance、实证适用性、不确定性与 abstention、隐私、偏差／伤害、受影响 population 和领域／专业角色 review；单轴通过不代表其他轴通过。
6. acceptance 绑定精确内容与修订；实质语义变化创建新修订并要求新决定，Proposal 或发布不会更新 active procedure。
7. 实现 admission 绑定精确 contract／version、已证明角色能力、当前 Agent admission 与部署状态；conformance 不等于家庭 adoption 或 activation。
8. 多个 active successor head 是 governance contest 并关闭失败；时间戳、semver、厂商选择和部署新旧都不能选 head。
9. suspension 阻止新 View，同时保留历史 View 与 receipt；replacement 和 rollback 是当前 Authority 下的前瞻行动并触发有界 revalidation，都不改写历史。
10. 每份 World View 必须披露或可恢复解释结果所需的精确 Resolver procedure、实现／conformance 绑定、source closure 和 Authority epoch。
11. 家庭可以通过独立生效的 Authority artifact override 一个精确下游决定；它保留而不是修改 Resolver result 与 policy。
12. 监控阈值只触发 review、suspension 或新 Proposal，不自动选择或启用替代程序。

## 后果

- 家庭控制依赖规则，却不声称能够制造物理真相。
- Resolver 实现与其执行的 policy 相互独立，可替换、可测试。
- 跨 policy 替换、暂停和 rollback 的历史决定仍可解释。
- 30个可执行案例覆盖 Proposal 完整性、review 轴、acceptance、实现准入、生命周期 fork、receipt、override 与 monitoring。
