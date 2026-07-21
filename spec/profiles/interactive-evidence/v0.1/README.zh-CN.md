# HWM 交互证据 Profile v0.1

- 状态：夹具候选稿
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 许可证：CC BY 4.0
- Profile 局部 JSON Schema：[`interactive-evidence-binding.schema.json`](interactive-evidence-binding.schema.json)

## 目的

当被动视觉或传感证据不足时，本可选 Profile 允许 Agent 请求作用域狭窄的家庭确认，并约束视觉报告、动作挑战、回答、反驳与纠正如何影响 World View。

它不创建 `Fact` 类，也不定义通用真理算法；它把外部观测、溯源、标注与确认语义绑定到既有 HWM Claim、Record、Evidence Link、World View 与 Action Trace 契约。

## 复用语义

- SOSA／SSN 表达 Observation、Actuation、Feature of Interest、被观测或操作的 Property、过程、结果与时间。
- PROV-O 表达 Activity、Entity、归属、生成、派生与来源沿袭。
- Web Annotation 把问题或回复 Body 绑定到精确 Target，并提供 questioning 与 replying 动机。
- ActivityStreams `Question`、`Accept` 与 `Reject` 可以表达交互事件，但本身不代表命题已经在认知上被接纳或反驳。
- Verifiable Credentials 可以保护 Attestation 或标识 evidence；Credential 验证证明完整性与发布者绑定，不证明 Claim 为真或适合所有用途。

## 必需交互绑定

确认挑战必须直接或通过 Profile 扩展保留：

- `challenge_id` 与 `episode_id`；
- 精确目标 Claim 标识与命题摘要；
- 请求者、预期回答者或授权角色、用途与 Authority epoch；
- 结构化问题，以及 `confirms`、`refutes`、`corrects`、`cannot_tell` 等封闭回答含义；
- 问题 Record、回答 Attestation Record 及其时间；
- 用于控制相关性的证据 `origin_id`；
- 问题源自视觉报告或主动设备挑战时，对应 Observation 或 Action Trace 标识；
- 回答有能力覆盖的命题作用域。

自然语言显示文本可以转述命题，但机器绑定必须保持精确。无法无歧义恢复目标的回答，不得产生 `confirms` 或 `refutes` Evidence Link。

## 解析规则

1. 模型导入、推断、学习或视觉 Claim 始终是 Claim；证据不修改它。
2. 由 Authority 管理的具名、版本化 Resolver 策略决定哪些证据路径足以支持声明用途。World View 必须显示或可恢复策略标识与 Authority epoch。
3. `accepted` 是 World View 认知状态，不是 Claim 属性。后续 View 可以得出不同结果，而不改写早先 View。
4. 策略要求独立来源时，同一原始来源派生的证据只能计为一个来源。对同一帧运行两个模型不会创造两次观测。
5. 策略要求单一完整 episode 时，不得拼接不同挑战 episode 的证据。
6. 设备应答只是执行证据，不得解释为物理观测、影响一致、目标满足或用户接受。
7. 家庭回答只适用于精确绑定命题。确认看到可见变化，不得扩大为精确位姿、资产身份、光度值、需求满足或持久因果性。
8. `refutes` 链接质疑目标，却不会创建否定 Claim。因此 `contested` 可以只包含一条 Candidate 与一条冲突 Evidence Record。
9. 纠正必须使用新 Claim。只有纠正 Claim 满足声明的准入策略后，显式 supersession 才影响当前 View；两条 Claim 与证据都保留在历史中。
10. 未知、未绑定、越界、无效、未授权或不可访问的证据必须失败关闭，并在 Authority 允许时暴露非敏感原因码。

在应用这些规则前，支持 [Evidence Standing Profile](../../evidence-standing/v0.1/README.zh-CN.md) 的实现必须独立判断每条 Record 对目标命题和用途是否 `admitted`。证据使用授权与 Evidence Standing 不能互换。v0.1 admission 夹具中的 `authorized` 布尔值是证据使用权限的兼容简写；独立 standing oracle 进一步拆开来源绑定、权限、适格性与资质。

## 隐私与 Authority

本 Profile 不授权摄像头使用、人员识别、证据披露或设备动作。采集、挑战派发、Attestation 使用、保留与披露分别需要适用的 Authority 决定。足以满足目的时，实现应保留摘要、过程、受限片段或派生 Record，而不是原始媒体。

未授权回答不能改变当前 View。访问拒绝时，不得泄露隐藏证据是否存在、多少人回答或他们支持了哪个替代对象。

## 当前可执行证据

[认知准入与纠错夹具](../../../../conformance/scenarios/epistemic-admission-and-correction-v0.1/README.zh-CN.md)包含 15 个对抗用例，覆盖：

- 只有模型与只有视觉时的 `not_verified`；
- 视觉加精确家庭确认；
- 一条反驳 Record 造成的单 Candidate 争议；
- 否定回答不虚构否定 Claim；
- 动作应答不证明物理效果；
- 完整与不完整的交互 episode；
- 歧义、作用域错配、相关和未授权证据；
- 合格与不合格纠正；
- 两条合格但未替代的候选。

JavaScript 与 Python 独立复现预期结果。这是项目内部实现多样性，不是组织独立性。

## 验证

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/interactive-evidence/v0.1/interactive-evidence-binding.schema.json \
  -d conformance/scenarios/epistemic-admission-and-correction-v0.1/interaction-binding.json

node conformance/scenarios/epistemic-admission-and-correction-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## 非目标

本 Profile 不定义生物识别、人员追踪、通用家庭投票规则、概率传感融合、全局置信数字、全局 actor 信任等级或谁拥有最终家庭权力，也不证明某动作在观测挑战上下文之外造成了效果。

## 参考资料

- [SOSA／SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [PROV-AQ](https://www.w3.org/TR/prov-aq/)
- [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)
- [ActivityStreams Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/)
- [Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/)
