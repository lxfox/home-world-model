# HWM Shared Action Coordination Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- 许可证：CC BY 4.0
- Schema：[`coordination-policy.schema.json`](coordination-policy.schema.json)

## 目的

本可选 Profile 为一个可能实质影响多个家庭主体的精确 Action Proposal，求值一个同质人的回答要求组。它是异质 [Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.zh-CN.md)的兼容子集，不能无损表示咨询机会、异议窗口、仅通知、专业复核、审计或混合失败效果。它不聚合真理、不发明家庭偏好、不选择行动，也不授予最终授权。

以下操作彼此不同：

- Evidence Resolver 求值描述性 Claim 与 Record；
- preference View 保留每个主体的 accepted 偏好；
- Agent Planner 可以生成折中 Proposal；
- Coordination Evaluator 判断 Proposal 是否取得具名家庭 policy 要求的回答；
- Policy Evaluator 继续决定最终行动授权；
- execution gateway 继续执行不可覆盖的本地安全。

## 输入

coordination 请求绑定：

- Proposal 标识、不可变 revision、action type、用途、参数与决定时间；
- Authority Epoch 与精确 coordination Policy 标识；
- 声明的影响领域、空间、风险等级与紧急状态；
- 受影响主体集合，以及生成该集合的状态和过程；
- 与 Proposal revision 绑定的回答 Record；
- 显式、受作用域和时间限制的委托材料；
- 作为独立授权输入的本地安全状态。

不能只依家庭成员身份或观测到场推导受影响主体集合。部署必须标识哪个影响过程以及哪项 Authority 程序映射使一个回答 slot 与本 Proposal 相关。使用 Bounded Impact Closure 与 Impact Procedure Mapping Profiles 时，只有无损的同质直接回答投影才能填充 v0.1 集合。投影不可取得、存在争议或包含异质要求时，coordination 为 `indeterminate`，或必须使用能力更完整的履行 Profile。

## Policy Rule

每条规则声明：

- action type、用途、影响领域、空间作用域、风险等级与紧急要求；
- 回答模式：`none`、`all`、`any` 或 `count`；
- 需要时的数量；
- 显式拒绝是阻断 Proposal，还是只参与阈值求值；
- 回答有效时长；
- 是否允许委托，以及哪些不透明 delegate role 可以使用；
- 事后 Duty，例如紧急审计或通知；
- 半开有效区间 [`from`, `to`)。

基线使用 `only_one_applicable`。零条或多条规则匹配都为 `indeterminate`。规则标签没有通用治理含义；每条规则都由家庭 Authority 明确选择。

## 回答与委托

回答 Record 包含 actor、被代表 subject、`confirm`／`reject`／`abstain` 含义、精确 Proposal 标识与 revision、发布时间、授权结果，以及针对狭窄本人回答命题的 Evidence Standing 结果。

一条回答只有同时满足以下条件才计数：

1. 身份、使用授权与 standing 均满足；
2. 目标是当前 Proposal revision；
3. 位于 policy 回答有效时间窗；
4. 被代表主体属于受影响主体集合；
5. actor 等于该主体，或匹配的 Authority 委托允许其在行动、空间、角色与时间范围内代表该主体。

Agent 没有显式委托时不能替其他主体回答。未受影响主体的回答保留为历史，但不能满足规则。

## 结果与授权投影

| Coordination 状态 | 含义 | 授权闸门投影 |
| --- | --- | --- |
| `not_required` | 唯一匹配规则不要求回答 | 继续策略求值 |
| `pending` | 缺少必需回答 | `confirmation_required` |
| `satisfied` | 精确回答规则已满足 | 继续策略求值 |
| `rejected` | 存在适用的阻断性拒绝 | `denied` |
| `indeterminate` | 策略、影响、委托或回答状态不可取得或存在歧义 | `indeterminate` |

完成投影后，本地安全拒绝仍返回行动 `denied`。“继续策略求值”不是 `allowed`，永远不会自行授权下发。

## 认知与偏好边界

1. 关于同一个描述性命题的多条适格 Record 仍是认知 Resolver 问题，人的回答阈值不能解决它。
2. subject 不同的偏好仍是彼此分离的 accepted Claim；冲突是上下文化适用性元数据，不是某条偏好为假。
3. coordination 结果只关于一个 Proposal revision，不创建持久通用偏好、不放弃未来参与权，也不证明结果被接受。
4. revision 1 的回答不能转移到 revision 2，除非策略显式取得新的绑定回答；夹具基线从不继承。
5. `count` 是可用策略机制，不是推荐或公平的通用规则。Profile 保留谁受影响、声明了什么规则以及哪些回答被计数。

## 紧急与安全

紧急规则只在请求具有已验证紧急状态，并且其他 action、purpose、scope、risk、time 与 Authority 约束全部匹配时适用。回答模式 `none` 表示该精确紧急 Proposal 不需要普通 coordination，并不表示行动获准。必需的紧急审计与通知 Duty 继续可见。

全体确认不能覆盖不可覆盖的本地安全拒绝；安全检查通过也不能满足缺失的 coordination 回答。

## 标准复用

- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) 提供 Permission Duty 与 Policy conflict strategy；其冲突属于策略规则冲突，不是家庭偏好聚合。
- [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-cos01-en.html) 提供决定组合模式；夹具使用 only-one-applicable 语义，对歧义 coordination policy 失败关闭。
- [ActivityStreams Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) 提供 `Question`、`Accept`、`Reject` 与 `Undo` 投影；活动历史不会自行求值家庭规则。
- [PROV-O](https://www.w3.org/TR/prov-o/) 提供 Activity、Agent、Plan、attribution、generation、revision 与 delegation provenance。
- [Bounded Impact Closure Profile](../../bounded-impact-closure/v0.1/README.zh-CN.md)提供精确 Proposal 的声明通道覆盖，并把参与资格留给 Authority。

## 可执行证据

[Shared Action Coordination 场景](../../../../conformance/scenarios/shared-action-coordination-v0.1/README.zh-CN.md)覆盖描述性证据冲突、主体限定偏好、all／any／count／none 策略、阻断性拒绝、回答缺失与过期、未受影响回答、Proposal revision、有效与无效委托、Agent 自我确认、规则歧义、不完整受影响主体集合、紧急范围和本地安全覆盖。

JavaScript 与 Python 可独立复现夹具。这是项目内部实现多样性，不是外部家庭治理共识。

## 非目标

本 Profile 不定义家庭成员身份、房间所有权、法律行为能力、监护、公平、社会选择、福利优化、协商策略、生物识别在场、通用多数规则或法律同意。

本 Profile 也不求值通知送达、咨询机会、异议窗口到期、专业复核、审计完成或这些程序的异质组合。

## 验证

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/shared-action-coordination/v0.1/coordination-policy.schema.json \
  -d conformance/scenarios/shared-action-coordination-v0.1/coordination-policy.json

node conformance/scenarios/shared-action-coordination-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
