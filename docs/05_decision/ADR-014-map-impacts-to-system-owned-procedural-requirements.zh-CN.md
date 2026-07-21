# ADR-014——把影响映射为由系统承担的程序性要求

- 状态：提议
- 日期：2026-07-19
- 规范文本：英文
- 英文规范文本：[`ADR-014-map-impacts-to-system-owned-procedural-requirements.md`](ADR-014-map-impacts-to-system-owned-procedural-requirements.md)
- 相关 Profile：[`影响程序映射 Profile v0.1`](../../spec/profiles/impact-procedure-mapping/v0.1/README.zh-CN.md)

## 背景

ADR-013 已把描述性的受到影响与规范性的参与资格分开。下一步不能简单地把受影响实体复制进一个投票集合。同一 Proposal 可能对居民产生物理影响、可能影响宠物、处理远程人员的数据、占用共享资源并改变另一位居民的控制利益；这些影响可以触发完全不同的程序。

现有 Shared Action Coordination 夹具假设一个受影响主体集合共享一种回答规则。这可以作为简单投影，但无法同时表达肯定回答、咨询机会、异议窗口、通知、代表路由、专业复核和审计，否则会把不同程序偷换成投票。

还存在 Duty 方向问题：被询问的居民没有义务回答；试图取得行动许可的系统才有责任取得策略要求的回答，或承受缺少回答所声明的后果。

## 决策

1. HWM 把从影响到治理的规范桥梁表示为**影响程序映射**，而不是推断出的投票者或同意者名单。
2. 映射消费一个绑定精确 Proposal 与 revision、状态为 `complete_for_declared_channels` 的 Bounded Impact Closure Assessment。`partial` 或 `indeterminate` 闭包不能产生可行动映射。
3. 每个已披露影响条目必须唯一匹配一条当前 Authority 映射规则。零条或多条匹配都为 `indeterminate`；策略沉默不等于“无要求”。
4. 规则产生零个或多个类型化程序性要求：
   - `affirmative_response`：行动侧服务必须取得绑定 Proposal 的肯定回答；
   - `consultation_opportunity`：服务必须提供真实回答机会，但受影响者没有回答义务；
   - `objection_window`：服务必须投递通知并保持有界异议窗口；
   - `notification`：服务必须提供信息，但不得把送达当成接受；
   - `qualified_review`：服务必须取得单独授权且适格的复核结果；
   - `audit`：服务必须追加声明的审计 Record；
   - `none`：Authority 规则明确表示该影响不增加程序。
5. 每项要求声明完成信号、时机、失败效果和负面信号效果；它们由策略选择，不能从影响通道或实体种类自动推导。
6. 承担义务的是协调、执行、通知、复核或审计服务。受影响的人是参与者或受益者，不是被强制回答的 Party。
7. 参与者身份可以留在 Authority 内部。映射输出可以只公开 Proposal 作用域内的不透明参与槽位；回答和送达回执绑定槽位，协调求值器无需知道身份、家庭成员关系、在场或代表关系。
8. 代表路由由 Authority policy 解析。宠物、儿童、未来角色或不可取得的人，不能让 Agent 自动发明监护人或 delegate。代表路由缺失、歧义、拒绝或过期时为 `indeterminate`。
9. 参与槽位不是人员标识、成员断言、身份凭证、委托或持久角色。除非存在通过隐私审查的显式绑定，否则不得跨用途或 Proposal revision 复用。
10. 不同影响条目的要求保持分离，除非 Authority 有显式合并策略。受影响实体引用相等不足以自动合并，因为跨通道相等会泄露身份，而且程序可能不同。
11. `affirmative_response` 不是法律同意、家庭接受、安全证明或最终授权；通知送达不是同意；异议窗口无反对不是肯定接受或权利放弃；专业复核也不是通用许可。
12. 映射状态只有 `mapped_for_declared_impacts` 或 `indeterminate`。前者只表示已按声明闭包和映射策略处理所有已披露条目，不表示已知所有潜在影响或法律权利。
13. Shared Action Coordination v0.1 保留为单一同质直接回答组的兼容投影；通用协调器应消费异质程序性要求或其无损投影。
14. 映射策略属于 Authority plane，普通 Agent Claim 不能创建、扩张或选择它。
15. Core 不变。

## 组合关系

```text
Bounded Impact Closure Assessment
  + 精确 Proposal revision
  + Authority 影响程序映射策略
  + 隐私安全路由解析
  = 程序性要求集合

程序性要求集合
  + 回答、送达、复核和审计 Records
  = 程序履行评估

程序履行评估
  + Permission / Prohibition / 本地安全
  = Authorization Decision
```

## 关键边界

- 肯定回答不等于法律同意、持久偏好或授权；
- 咨询机会不产生回答义务，沉默不等于同意；
- 异议窗口到期不等于肯定接受或放弃权利；
- 通知送达不等于接受或允许披露身份；
- 专业复核不产生通用专业权威或最终许可；
- 显式 `none` 不表示该实体未受影响，也不取消其他策略或法律下的权利。

## 失败语义

- 声明通道闭包不完整：`indeterminate`；
- Proposal 或 revision 不匹配：`indeterminate`；
- Authority Epoch 过期或验证方落后：`indeterminate`；
- 某影响零条或多条映射规则：`indeterminate`；
- 必需路由缺失、不可取得、被拒绝、重复或歧义：`indeterminate`；
- 空的完整闭包：`mapped_for_declared_impacts`，要求集合为空；
- 显式 `none`：影响条目继续保留并被映射，但不产生要求。

## 标准边界

- ODRL 提供 Policy、Permission、Prohibition、Duty、Constraint 和 consequence 等语义，并要求 Duty 的义务 Party 具备履行动作的能力；因此 HWM 把 `obtainResponse` 放在行动侧服务，而不是强迫受影响人回答。
- XACML 区分不可忽略的 Obligation 与可以忽略的 Advice，并提供组合与 `Indeterminate` 语义。
- DPV 提供隐私权利、权利通知、权利行使、通知和与数据主体或其代表咨询的词汇，但不决定家庭策略或法律适用性。
- PROV-O 提供委托和来源；`actedOnBehalfOf` 记录声明的委托关系，不发现或授权监护人。
- ActivityStreams 可以投影问题、邀请、接受、拒绝与送达事件，但活动历史不求值要求。

HWM 保留的行为是：精确影响到规则的基数、Proposal 作用域不透明路由、异质类型化要求输出，以及与授权分离的失败关闭。

## 验收前验证

1. 独立实现复现混合要求、空闭包、显式 none、规则基数、路由隐私、Epoch、revision 和代表用例。
2. 隐私审查挑战槽位可链接性、数量、时间、原因文本、送达回执和跨 Proposal 复用。
3. 家庭治理审查挑战肯定回答、咨询、异议、通知、沉默与负面信号效果。
4. 专业与安全审查挑战复核路由，确认复核不会被静默转换为授权。

