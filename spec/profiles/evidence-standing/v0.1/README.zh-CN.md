# HWM Evidence Standing Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- 许可证：CC BY 4.0
- Schema：[`evidence-standing-policy.schema.json`](evidence-standing-policy.schema.json)、[`evidence-standing-decision.schema.json`](evidence-standing-decision.schema.json)、[`evidence-standing-decision-set.schema.json`](evidence-standing-decision-set.schema.json)

## 目的

本可选 Profile 判断一条 Record 是否**适合参与**某个声明用途下一个目标命题的解析。它补上运行授权与认知解析之间的缺口。

适格性取决于上下文，不是来源的全局信誉。同一住户可以有资格报告自己的偏好与看到的灯光变化，却没有资格据此确认客观照度值；同一专业人员可以在一个司法辖区和检查过程内确认某个属性，却不能确认无关家庭偏好或已经过期的工作。

## 六个独立问题

实现不得合并以下决定：

1. **来源绑定：**声明的 actor、sensor 或 issuer 绑定能否验证？
2. **证据使用授权：**是否允许为此用途使用这条 Record？
3. **证据适格性：**Authority 平面的 grant 是否匹配来源、Record 类型、关系、命题、作用域、方法、时间和资质？
4. **认知充分性：**具名 Resolver policy 是否拥有足够的已接纳证据，从而返回 `accepted`、`contested`、`unknown` 或 `not_verified`？
5. **行动授权：**提议行动是否可以下发，是否需要先满足 Duty？
6. **接受或认证：**家庭主体是否接受结果，或者适用专业过程是否认证了结果？

`admitted` 只回答第 3 个问题。

## Decision Record

Standing 结果必须与原始 Record 分开表示。原始 Record 可以陈述回答为 `confirm`、回执报告 `delivered` 或复核结果为 `accepted`，但不得建立自身的来源验证、证据使用权限、standing 或资质。

[`evidence-standing-decision.schema.json`](evidence-standing-decision.schema.json) 使用 RFC 8785 规范化 JSON 的 SHA-256 摘要绑定完整 Record Body，并同时绑定用途、时间、Authority Epoch、来源与证明验证结果、独立证据使用决定、匹配 grant、资质证据，以及下游获准读取的具体字段。

准入限定到断言字段。准入 `delivery_status` 不自动准入可访问性、已读、接受、账本覆盖或同一 Record 的其他字段。Decision 缺失、来自未来、存在歧义、用途／Epoch 错误或内容摘要不匹配时均不构成准入。

## Policy 文档

Evidence Standing Policy Document 是经过认证的 Authority 平面输入，包含 household、Authority、Epoch、grant、proof 绑定与扩展。每条 grant 至少受以下边界约束：

- 不透明 actor 标识和／或 Authority 定义的 role 标识；
- 允许的 Record evidence kind 与 Evidence Link relation；
- 声明用途；
- 目标命题谓词与 subject 作用域（`self`、`listed` 或 `any`）；
- 空间作用域与允许过程；
- 精确问题绑定与直接体验要求；
- 有效时间；
- 可选的凭证类型、可信颁发者、司法辖区、凭证状态和凭证有效期约束。

角色标识在 HWM 中没有全局含义。部署可以定义 installer、resident、visitor、child、guardian 或 licensed reviewer 等角色，但必须明确表达实际 grant，不能从标签推导通用等级。

## 基线决定

结果为：

- `admitted`：存在一条完整匹配的 grant，Record 可以进入具名 Resolver policy；
- `excluded`：明确拒绝、不匹配、过期、撤销或封闭世界下缺失 grant，阻止使用；
- `indeterminate`：必需的身份、凭证状态、证据使用或 Authority 输入不可取得。

基线夹具的规范求值顺序为：

1. 验证 standing Policy，并比较 Policy Epoch 与 verifier Epoch；
2. 验证来源身份绑定；
3. 要求独立的 `allowed` 证据使用决定；
4. 匹配 principal、证据类型、关系、用途、谓词与命题 subject 作用域；
5. 匹配空间作用域与过程；
6. 执行精确问题与直接体验约束；
7. 验证必需的凭证类型、颁发者、状态、有效期和司法辖区；
8. 要求 grant 处于半开有效区间 [`from`, `to`)。

已知无效输入为 `excluded`，不可取得的输入为 `indeterminate`。没有匹配 grant 时按封闭世界接纳返回 `excluded`。

## 不变量

1. `admitted` 不表示真实、已接受、充分、独立、永久有效、具有法律结论力或可以安全行动。
2. 认证、权限、适格性、充分性、行动授权与用户接受仍是彼此独立的 Record 或决定。
3. `self` subject 作用域只允许来源确认 subject 等于其自身标识的命题。
4. 第一手体验不能扩大为客观测量，除非另一条 grant 明确覆盖测量谓词与过程。
5. 已验证凭证不能扩大其类型、颁发者、辖区、有效期或过程范围。
6. 设备受到指令信任，不会让设备应答自动具备物理观测适格性。
7. 多条不兼容但均适格的 Record 仍是多份输入；standing evaluator 不投票或选出赢家。
8. Agent 不能通过普通家庭 Claim 创建、扩大或自行分配 standing grant。
9. 后续 Epoch 或 policy 修订只影响后续 View，不改写历史决定。
10. 原因披露仍受 Authority 约束，不得泄露隐藏来源身份、凭证细节或证据数量。
11. Record 不能自报 standing；只有 ID 相同而内容摘要不同，不能把旧 Decision 带到新内容。
12. Authority 信任锚终止准入递归；生产 Standing Decision 自身仍需要经过认证的 Authority 证明。

## 标准复用

- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) 提供 assignee、action、target、constraint、permission、prohibition 与 Duty 的策略模式。HWM 的紧凑夹具绑定把 `use as evidence` 作为 Profile action，并使用封闭世界接纳。
- [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-cos01-en.html) 展示 subject、resource、action 与 environment 属性类别以及四路策略决定。HWM 将面向家庭的 standing 结果与行动授权分别投影。
- [Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/) 可以保护 actor 或专业资质声明。VC 验证不等于真实性，特定用途下是否信任 issuer 仍由 verifier policy 决定。
- [VC Data Integrity 1.0](https://www.w3.org/TR/vc-data-integrity/) 提供 proof purpose、verification method、真实性与完整性语义。
- [HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html) 与 [AS2 签名回执](https://www.rfc-editor.org/rfc/rfc4130.html) 表明消息完整性、收到、内容处理与应用接受彼此不同。
- [RFC 8785](https://www.rfc-editor.org/info/rfc8785/) 为 Decision 到 Record 的摘要绑定提供确定性 JSON 规范化。
- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) 提供 Observation、Procedure、Feature of Interest 与 Property 语义；standing 只增加家庭接纳边界。

## 可执行证据

[Evidence Standing 场景](../../../../conformance/scenarios/evidence-standing-v0.1/README.zh-CN.md)包含第一手观察、自身偏好、他人偏好、角色越权、显式访客适格性、客观测量、设备应答、安装过程作用域、专业凭证有效性与司法辖区、证据使用拒绝、未知身份、Epoch 漂移和封闭世界失败等对抗用例。

JavaScript 与 Python 可独立复现夹具。这是同一项目内的实现多样性，不是外部共识。

## 非目标

本 Profile 不定义通用家庭等级、法律行为能力、儿童安全策略、生物识别、全局信任分数、投票算法、专业人员登记系统、司法辖区法律、概率传感器融合或真理算法。

## 验证

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/evidence-standing/v0.1/evidence-standing-policy.schema.json \
  -d conformance/scenarios/evidence-standing-v0.1/standing-policy.json

npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/evidence-standing/v0.1/evidence-standing-decision.schema.json \
  -d conformance/scenarios/evidence-standing-v0.1/standing-decision.example.json

npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -r spec/profiles/evidence-standing/v0.1/evidence-standing-decision.schema.json \
  -s spec/profiles/evidence-standing/v0.1/evidence-standing-decision-set.schema.json \
  -d conformance/scenarios/procedure-fulfilment-v0.1/admission-decisions.json

node conformance/scenarios/evidence-standing-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
