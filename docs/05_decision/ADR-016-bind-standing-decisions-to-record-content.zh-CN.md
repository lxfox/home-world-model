# ADR-016 — 把 Standing Decision 绑定到 Record 内容

- 状态：提议
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`ADR-016-bind-standing-decisions-to-record-content.md`](ADR-016-bind-standing-decisions-to-record-content.md)
- 相关 Profile：[`Evidence Standing Profile v0.1`](../../spec/profiles/evidence-standing/v0.1/README.zh-CN.md)

## 背景

ADR-011 已把 Evidence Standing 定义成独立的 Authority-plane 决定，但首版 Procedure Fulfilment 夹具仍把 `standing_status`、`evidence_use_decision`、`qualification_status` 和 `integrity_status` 放在被验证的原始 Record 内，形成 Record 看似可以自证准入的循环。若只绑定 `record_id`，内容改变后还可能继承旧决定。

## 决策

1. 原始 Record 不得建立自身的证明验证、来源绑定、证据使用权限、Evidence Standing 或资质状态。
2. HWM 为现有可选 Evidence Standing Profile 增加机器可读的 **Evidence Standing Decision** 输出契约；Core 不变。
3. Standing Decision 使用 SHA-256 与 [RFC 8785 JSON Canonicalization Scheme](https://www.rfc-editor.org/info/rfc8785/) 绑定完整 Record Body，而不只绑定 ID。
4. Decision 同时绑定用途、Authority Epoch、决定时间、来源绑定、证明验证、证据使用决定、匹配 grant、资质证据、结果与原因码。
5. 准入限定到具体断言。`admitted_assertions` 指明下游可读取哪些字段；准入 `delivery_status` 不会自动准入同一 Record 的 `accessibility_status`、`coverage_status` 或其他字段。
6. `admitted` 要求来源与证明已验证、证据使用获准、至少一个匹配 grant 和至少一个获准断言；`excluded` 是已知不匹配或拒绝；`indeterminate` 是必要输入不可取得。后二者都不得提供获准断言。
7. Decision 缺失、来自未来、用途或 Epoch 错误、内容摘要不匹配、存在多个当前决定或缺少所需字段准入时，Procedure Fulfilment 必须拒绝使用或保持不确定。
8. 已知 `excluded` Record 不计入履行，但这不表示其内容为假；截止时间以前仍可由其他可准入 Record 满足要求。
9. 密码学验证只证明完整性与相关验证方法的控制关系，不证明内容真实或程序已完成。签名运输回执只具有其具名回执过程被授予的语义范围。
10. 信任递归终止于经过认证的 Authority-plane 策略与配置的信任锚。Standing Decision 本身需要生产证明，但不再用普通 Evidence Standing Decision 去授权 Authority 信任锚。
11. 历史 Decision 保持追加式；Record 内容、用途、Epoch 或 standing policy 改变时必须产生新 Decision。

## 标准边界

[HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421.html) 保护 HTTP 消息组件的完整性与真实性，但不定义应用陈述的真假。[AS2](https://www.rfc-editor.org/rfc/rfc4130.html) 把签名回执绑定到收到的消息摘要，并允许内容处理失败时仍返回回执，说明收到、处理与交易有效性不同。[VC Data Integrity](https://www.w3.org/TR/vc-data-integrity/) 定义 proof purpose、verification method、真实性与完整性；[RFC 8785](https://www.rfc-editor.org/info/rfc8785/) 为夹具提供确定性 JSON 规范化。

## 证据

Procedure Fulfilment oracle 现包含 28 个履行用例、8 个模型边界用例和 69 个禁止推断。新增七个用例证明自报 standing、摘要不匹配、错误用途、已排除证据、未获准字段、未来决定与重复当前决定均不能满足要求。
