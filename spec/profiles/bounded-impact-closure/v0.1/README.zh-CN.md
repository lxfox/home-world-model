# HWM 受限影响闭包 Profile v0.1

- 状态：夹具候选
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范文本：[`README.md`](README.md)
- 许可证：CC BY 4.0
- Schema：[`coverage-policy.schema.json`](coverage-policy.schema.json)

## 目的

本可选 Profile 检查一个精确 Action Proposal revision 是否取得具名 Authority policy 要求的影响报告。它返回有边界的覆盖结果，不声称列出所有受到影响的人或物。

Profile 刻意拆开两步：

1. 影响过程报告候选行动到实体、资源、属性或隐私保护句柄的描述性路径；
2. Authority policy 判断该影响是否产生确认、拒绝、通知、代表、安全或其他 Duty。

Agent Planner 可以消费结果，但不能自行生成参与资格。

## 输入

覆盖请求绑定 Proposal 标识和不可变 revision、行动类型、用途、影响领域、空间、风险等级、预测时间范围、决策时间、验证方 Authority Epoch、精确覆盖策略标识，以及零份或多份通道报告。

每份报告绑定报告标识、Proposal 与 revision、通道、声明过程、评估时间、覆盖的半开时间区间、覆盖状态，以及零个或多个影响条目。影响条目带稳定标识、实体种类、影响状态、可选实体引用或不透明主体句柄、依据引用、限制和扩展。

夹具求值器为每个必需通道接受一份当前报告。生产绑定还必须认证报告来源、完整性、授权与披露。

## 覆盖策略与求值

策略采用 `only_one_applicable`。每条规则声明 Proposal 选择器、最大提案时间范围、必需通道、各通道认可过程、最大报告年龄、有效期和扩展。

对唯一适用规则，求值器检查 Authority Epoch、Proposal revision、通道、过程、决策时间、新鲜度和时间范围。任一必需通道没有符合的 `complete_for_channel` 报告时返回 `partial`；策略歧义、同通道多份当前报告或影响标识冲突时返回 `indeterminate`；否则返回 `complete_for_declared_channels`。

错误 revision、错误过程、过期、来自未来或时间范围不足的报告作为历史输入保留，但不能满足覆盖。

## 结果

| 状态 | 含义 |
| --- | --- |
| `complete_for_declared_channels` | 适用规则声明的每个通道都有一份符合且完整的报告 |
| `partial` | 一个或多个声明通道或时间范围缺失、不可取得、不完整、过期或未覆盖 |
| `indeterminate` | 策略、Authority 或报告完整性使求值无法唯一确定 |

结果公开匹配规则、已覆盖与缺失通道、保留的影响条目标识和原因码。它刻意没有 `participant_ids`、`consent`、`vote` 或 `authorization` 字段。

## 隐私与协调组合

影响条目可以只披露 Authority 作用域内的不透明句柄。该句柄可在获准的 Authority 服务内部解析，服务只向下游求值器输出所需不透明程序 slots。

隐私报告不可取得、主体被脱敏、数量隐藏或身份查询被拒绝，都表示覆盖不完整，绝不证明没有隐私主体。数量本身也可能泄露家庭在场信息，因此同样受 Authority 管理。

```text
受限影响闭包评估
  + Authority 影响程序映射
  = 异质程序性要求与不透明 slots

程序性要求与不透明 slots
  + Proposal 绑定回答、送达、复核与审计 Records
  + Shared Action Coordination policy
  = Coordination Assessment
```

Shared Action Coordination 不得跳过 Authority 映射，直接把影响条目复制成受影响主体集合。[Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.zh-CN.md)定义该步骤；Shared Action Coordination v0.1 只保留其同质直接回答兼容子集。

## 标准复用与成熟度

- [SOSA/SSN 2023 Edition](https://www.w3.org/TR/vocab-ssn-2023/) 提供 Actuation、Feature of Interest、Property、Procedure 与 Execution 语义；当前 2023 版是 W3C Working Draft，需要 Recommendation 稳定性的部署可采用 2017 Recommendation 子集。
- [PROV-O](https://www.w3.org/TR/prov-o/) 提供来源语义。
- [BOT](https://w3c-lbd-cg.github.io/bot/) 提供轻量建筑空间拓扑，是 W3C Community Group 成果。
- [Brick](https://docs.brickschema.org/brick/relationships.html) 提供建筑资产、位置、点位、系统与运行关系。
- [DPV](https://www.w3.org/community/reports/dpvcg/CG-FINAL-dpv-20240801/) 提供隐私处理、数据主体、影响评估、风险和权利词汇，是 W3C Community Group Final Report，不是 W3C Recommendation。

这些来源都不定义家庭参与资格，也不证明全局影响完整。

## 非目标

本 Profile 不定义通用影响图、固定通道分类法、物理仿真器、法律分析、生物识别在场、家庭成员、监护、公平、同意、投票、风险接受或最终授权。

## 可执行证据

[`受限影响闭包场景`](../../../../conformance/scenarios/bounded-impact-closure-v0.1/README.zh-CN.md)覆盖缺失通道、不可取得和不完整报告、精确 Proposal revision、过程绑定、新鲜度、时间范围、策略歧义、Authority Epoch、重复报告、标识冲突、宠物、远程隐私主体、不透明句柄、在场和空完整通道。

JavaScript 与 Python 独立复现夹具，但它们都由本项目产生，不代表独立社区共识。
