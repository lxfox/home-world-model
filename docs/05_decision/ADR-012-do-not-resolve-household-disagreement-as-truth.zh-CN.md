# ADR-012 — 不把家庭分歧解析成真理

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-012-do-not-resolve-household-disagreement-as-truth.md`](ADR-012-do-not-resolve-household-disagreement-as-truth.md)
- 相关 Profile：[`Shared Action Coordination Profile v0.1`](../../spec/profiles/shared-action-coordination/v0.1/README.zh-CN.md)

## 背景

Evidence Standing 回答一条 Record 能否参与命题解析，却没有回答多条已接纳输入相互不一致时应该怎么办。

三种不同情况很容易被混在一起：

1. 两条适格 Record 对同一个描述性命题支持互不兼容的答案；
2. 两位住户真实表达了不同的个人偏好；
3. 一项提议行动会实质影响多个主体，需要家庭决策程序。

对三者统一投票并不自洽。多数人不能把冲突物理证据变成真理；一位住户的偏好不会因为另一位偏好不同而变假；共享行动可能依明确家庭策略分别需要同意、委托、阈值、安全否决或根本无需确认。

## 决定

1. **认知冲突仍属于认知。**关于同一命题的不兼容适格证据产生 `contested`、`unknown` 或其他 Resolver 定义的认知结果。除非领域测量 Profile 明确定义统计上有效的聚合过程，回答数量不能变成真理。
2. **个人偏好继续绑定主体。**不同 subject 的两条 accepted 偏好可以同时真实。它们只在某个共享决策上下文中出现适用性冲突；HWM 不得隐式合成 `HouseholdPreference`。
3. **共享行动分歧属于 coordination，而不是 resolution。**实质影响多个主体的 Action Proposal，在最终行动授权前必须依具名 Shared Action Coordination policy 求值。
4. coordination 求值绑定一个 Proposal 标识与 revision、用途、影响作用域、受影响主体集合、时间和 Authority Epoch。它表示为 Profile 类型化 Record，不是新的 Core 原语。
5. 受影响主体集合必须显式给出，或由声明且可审计的影响过程推导。家庭成员身份、摄像头检测到场、房间所有权标签或 Agent 猜测都不能暗中建立参与权。
6. policy 必须显式声明回答规则（`none`、`all`、`any` 或 `count`）、拒绝效果、回答有效期、委托规则、适用行动、影响领域、风险等级和可选紧急条件。HWM 不定义默认家庭投票规则。
7. 回答必须绑定 actor、被代表主体、精确 Proposal revision、含义、时间、Authority 状态和授权。`Accept` 或 `Reject` 事件是一次历史回答，不是全局偏好或永久放弃权利。
8. 缺少必需回答时 coordination 为 `pending`，映射到行动 `confirmation_required`；阻断性拒绝产生 `rejected`，映射到行动 `denied`；受影响主体未知、策略歧义、委托不可用或回答状态不可访问时为 `indeterminate`。
9. coordination `satisfied` 或 `not_required` 只允许 Proposal 继续进入授权，不会自行授权下发、证明安全、消除偏好差异或预测结果会被接受。
10. 不可覆盖的本地安全拒绝覆盖全体确认；反过来，安全检查通过也不能制造家庭同意。
11. 紧急绕过不是隐式规则。它需要单独匹配、范围受限的 policy condition、已验证紧急输入以及声明的审计或通知 Duty；不会改写个人偏好，也不会产生可复用的通用权限。
12. 委托是显式、受作用域和时间限制的 Authority 材料。Agent 没有此类 grant 时不能代表受影响主体。
13. 历史回答、偏好 Claim、coordination 求值与 Authorization Decision 都保持追加式。后续回答或 Proposal revision 不删除较早决策上下文。
14. Core 不变。

## Coordination 结果

- `not_required`：唯一适用规则声明不需要人的回答；
- `pending`：完整受影响主体集合已知，但声明的回答规则尚未满足；
- `satisfied`：此精确 Proposal revision 满足声明回答规则；
- `rejected`：声明的拒绝规则阻断此 Proposal；
- `indeterminate`：必需策略、影响、身份、委托或回答信息不可取得或存在歧义。

这些是 Profile 局部 coordination 结果，不能替代 World View 认知状态或 Authorization Decision 结果。

## 组合方式

```text
accepted 且绑定主体的偏好
  + 显式 Action Proposal 与影响分析
  + 受影响主体集合
  + 精确回答 Record 与委托
  + 具名 coordination policy
  = Coordination Assessment Record

Coordination Assessment
  + 行动 Permission／Prohibition／Duty
  + 本地安全
  = Authorization Decision
```

## 标准边界

- ODRL Permission Duty 可以要求前置条件，conflict strategy 可以合并 Permission 与 Prohibition，但不定义人与人之间的偏好聚合。
- XACML combining algorithm 合并规则或策略决定，不合并描述性证据或人的福利。
- ActivityStreams `Accept`、`Reject`、`Question` 与 `Undo` 可以投影交互历史；`Accept` 和 `Reject` 是不同事件，一方不会暗中否定另一方。
- PROV-O 可以表达 coordination Activity、Plan、回答 Entity、委托与生成的 assessment；provenance 不决定策略结果。

HWM 剩余行为是精确 Proposal 绑定、由 Authority 把受限影响条目映射为系统承担的程序性要求、失败关闭的回答求值，以及与真理和最终授权分离。声明通道影响闭包由 ADR-013 规定，异质程序映射由 ADR-014 规定。

## 备选方案

### 把多数票定义为家庭默认规则

拒绝。它没有通用正当性，可能覆盖主体边界，对描述性证据也没有意义。

### 让 Agent 优化折中方案并把它当成同意

拒绝。优化可以提出选项，却不能创建参与权、同意或授权。

### 把所有偏好差异都当作认知 `contested`

拒绝。不同人可以拥有不同的 accepted 偏好，而任何一条 Claim 都没有受到认知质疑。

### 把 coordination 放进 Action Planner 内部

拒绝将其作为互操作边界。Planner 可以生成折中方案，但家庭必须保留对精确 Proposal 的 Agent 独立、可审计策略决定。

## 接受前验证

1. 独立实现复现认知、偏好、coordination、revision、委托、安全与紧急边界用例。
2. 隐私审查确认受影响主体与回答披露不会暴露隐藏的家庭在场或身份。
3. 家庭治理审查挑战 `all`、`any`、`count`、拒绝、委托和紧急用例，而不把它们当成通用默认值。
4. 生产 Authority 绑定保护 policy、回答、委托、Epoch 与审计 Record。
