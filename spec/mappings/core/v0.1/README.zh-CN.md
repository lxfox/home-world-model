# HWM Core 逐术语映射审计 v0.1

- 状态：映射候选稿
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 机器可读审计：[`term-mapping.json`](term-mapping.json)

## 问题

Home World Model 的哪些部分确实是 HWM 自有的互操作契约，哪些只是给现有标准换了名字？

本审计针对 41 个概念、线格式字段、关系和系统角色逐项比对一手规范。词面不同不算语义缺口。只有可执行夹具要求保留的可观察区别无法由现有标准保持时，才暂时保留为 HWM 自有内容。

## 结果

| 判断 | 数量 | 后果 |
| --- | ---: | --- |
| 直接复用外部标准 | 11 | 删除 HWM 词汇别名，在语义绑定中使用外部术语 |
| HWM 应用 Profile | 15 | 只保留 HWM 约束或跨标准组合规则 |
| HWM 契约缺口 | 10 | 暂时保留交换契约或线格式字段，等待外部审查 |
| 仅内部角色 | 3 | 保留架构语言，不发布成本体术语 |
| 待完成映射 | 0 | Core 不再保留临时领域术语 |
| 不应标准化 | 2 | 拒绝候选术语 |

这些数字由 `validate.mjs` 校验，但不是流行度评分，也不能证明行业原创性。

## HWM 不应拥有的词汇

以下内容应直接复用现有标识或谓词：

- 实体标识：RDF／JSON-LD IRI 与 `@id`；
- Space：由 Space Profile 选择 BOT、Brick 或 IFC；
- Physical Asset：SAREF Device、BOT Element、Brick Equipment 或 IFC 类；
- Feature of Interest 与 Observation：SOSA／SSN 或 SAREF；
- 包含、相邻与位置：BOT、Brick 或 IFC 关系；
- 观测与执行领域关系：SOSA／SSN 和 SAREF；
- 生成、归属与派生：PROV-O；
- 替换与取代：DCMI `replaces`／`isReplacedBy`。

概念内核 `H = (EntityRef, Claim, Record | Authority)` 仍然是有用的分解方式，但不表示 HWM 拥有四个新本体类。EntityRef 是外部标识；Claim、Record 与 Authority 是现有模型上的应用 Profile。

## 当前最小可辩护的 HWM 自有表面

### Claim Envelope

Verifiable Credentials 已经可以表达发布者、主体主张、有效期、状态、证据和证明；PROV-O 表达归属与派生；Web Annotation 表达带独立标识的 body-target 关联。HWM 剩余的行为更窄：一个不可变命题正文保持身份不变，同时可以追加具有独立标识的支持、反驳、确认和撤回关系，而不修改正文。

这是候选交换契约缺口，不表示 HWM 发明了 Claim 或 Credential。

### World View

NGSI-LD 提供上下文实体、查询、时间表达与 Property 实例；Verifiable Presentation 可以选择性披露 Credential；ODRL 约束目的与使用；OWL-Time 表达时刻和区间。但已审查规范没有定义完整的 HWM 投影行为：

- 绑定请求者、用途、`as_of`、覆盖范围与 Authority 状态；
- 在授权覆盖范围内自包含；
- 零 Candidate 的隐私行为，不泄露隐藏 Claim 标识或数量；
- 可用性、认知、新鲜度、时间适用性和规范适用性相互独立。

因此 World View 是目前最强的 HWM 专有契约候选。

### 接受解析，不创建 `Fact` 类

SOSA／SSN 可以描述视觉 Observation 或主动 Actuation；PROV-O 可以保留派生与来源沿袭；Web Annotation 可以把问题或回复绑定到精确目标；VC 可以保护 Attestation。它们都没有提供通用真值提升操作。PROV-AQ 指出 provenance record 不会自动具备权威性或正确性；VC 2.0 则说明可验证性不表示 Claim 为真，是否依赖仍由 Verifier 策略决定。

因此 HWM 把 `accepted` 保持为用途限定的 World View 结果。[交互证据 Profile](../../../profiles/interactive-evidence/v0.1/README.zh-CN.md)负责精确问题绑定、证据来源去重、作用域上限与纠错行为。可执行夹具还证明，一条 Candidate 加一条反驳 Record 可以形成争议，不必虚构否定 Claim。

### Action Trace

PROV-O、SOSA／SSN、WoT 与 XACML 可以表达大部分组成事实。HWM 剩余的行为是把它们组织为不可变、带修订的投影，同时保持授权、下发、应答、物理观测、影响一致性、目标满足、资源评估、预测实现和用户接受相互独立。

这一区别已在当前三套包含行动的夹具中可执行验证；在出现外部反例前暂时保留为 HWM 自有契约。

## 只作为 Profile 保留的概念

- Household Manifest 与 Household Knowledge Package 现已有候选 **HWM RO-Crate Profile**。RO-Crate 已经定义 attached／detached package、metadata descriptor、root dataset、data entity、contextual entity 和 `conformsTo`。现有小型 Manifest 在迁移期间只保留为兼容投影；HWM 不宣称发明新的通用打包模型。
- Authorization Decision 应映射 XACML 的 `Permit`、`Deny`、`Indeterminate` 与 `NotApplicable`，把确认表达成 ODRL Duty 或 XACML Obligation。`confirmation_required` 可以保留为稳定的家庭界面投影。
- Authority 应保持为 ODRL、XACML、ACE-OAuth、CWT 与 VC 信任材料上的 Profile；Epoch 和离线 Lease 是其家庭约束。
- Digital Endpoint 是 Matter Endpoint、WoT Thing／Interaction Affordance 或 Brick hosted Point 上的协议中立绑定角色，不应形成竞争性的设备接口本体。
- Freshness、Temporal Status 与 Applicability 是基于 NGSI-LD 时间元数据、OWL-Time／有效期以及 ODRL／XACML 评估而物化的 Resolver 结果。
- 交互确认保持为 SOSA／SSN、PROV-O、Web Annotation、ActivityStreams 与 VC 上的 Profile；HWM 只拥有准入与禁止过度推断边界，不创造新的观测或对话本体。

## 绑定 IEC 的功能位置，而不是 HWM 类

原先称为 Functional Slot 的持久、承载要求的角色继续作为生命周期区别保留，但不再成为 HWM 词汇。生命周期 Profile 把家庭稳定的功能位置 EntityRef 绑定到声明的 IEC 81346 参考代号系统，并与具体制造资产、Product Model 和 Digital Endpoint 保持分离。

该所有权判断由 [IEC 81346-1:2022](https://www.iso.org/standard/82229.html) 与 [ISO 81346-12:2018](https://www.iso.org/standard/63886.html) 的公开范围支持：前者覆盖系统对象的参考代号以及对象实现后的对应部件；后者适用于建筑工程与建筑服务，同时排除库存号、序列号和产品类型。公开资料仍不足以选择精确的关系编码。

因此：

- 从目标 HWM 本体中删除 `FunctionalSlot`，只保留为迁移标签；
- 把生命周期区别保留为绑定 IEC 的 Profile 角色；
- 分开家庭 EntityRef、IEC 参考代号、具体制造资产身份、Product Model 和端点身份；
- 在许可条款审查完成前，不宣称符合 IEC，也不固定关系元数据；
- 验证 [IEC 81346 边界审计](../../iec81346/v0.1/README.zh-CN.md)中的八个反例。

## 已拒绝：通用 `fulfills`

`fulfills` 不得成为 Core 谓词。它混合了资产—功能实现、需求满足、候选考虑、兼容证明和身份。生命周期 Profile 可以携带有时间边界的实现绑定，但该绑定不得推出其他四种命题。现有 `hwm-lifecycle:fulfills` 夹具数据只作为兼容投影。

## 已拒绝：通用等价关系

`hwm:equivalentTo` 不应成为 Core 谓词。严格同一、替代表示、特化、词汇映射、替换和特定用途下的可互换性是不同关系。实现必须选择定义狭窄的外部关系，或带显式作用域与 Authority 的 Profile 专用关系。

## 来源边界

审计使用 `term-mapping.json` 中登记的一手规范，并结合 PROV-AQ 与交互证据边界审查，包括 PROV-O、PROV-AQ、Web Annotation、ActivityStreams Vocabulary、VC Data Model 2.0、SOSA／SSN 2023、WoT Thing Description 1.1、SAREF 4.1.1、BOT、Brick、NGSI-LD、ODRL 2.2、XACML 3.0、OWL-Time、RO-Crate、DCMI Terms、Matter SDK 文档、IEC 81346-1:2022 与 ISO 81346-12:2018 的公开范围。

部分规范是应用中立模型，部分是绑定专用模型。`strong_partial` 不等于语义等价。剩余缺口仍需经实现者审查和独立实现验证。精确 IEC 方面与对象关系编码仍受合法规范条款访问限制，但这不再留下临时 HWM Core 术语。

## 验证

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/mappings/core/v0.1/term-mapping.schema.json \
  -d spec/mappings/core/v0.1/term-mapping.json

node spec/mappings/core/v0.1/validate.mjs
node conformance/scenarios/epistemic-admission-and-correction-v0.1/validate.mjs
```
