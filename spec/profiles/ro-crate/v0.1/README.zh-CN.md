# HWM RO-Crate Profile v0.1

- 状态：绑定候选稿
- 版本：0.1.0
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 许可证：CC BY 4.0

## 目的

本 Profile 把可移植 HWM 家庭知识包绑定到 RO-Crate 1.3。它取代候选 Household Manifest 承担的通用打包语义，同时为 Core v0.1 读取器保留无损兼容投影。

这是包绑定，不是第四种家庭世界原语，也不是新的归档格式。Claim Envelope、World View 与 Action Trace 仍是 HWM 行为契约。

## 基础 Profile

兼容知识包必须符合 [RO-Crate 1.3](https://www.researchobject.org/ro-crate/specification/1.3/)，并在 `ro-crate-metadata.json` 上声明。Root Data Entity 必须声明符合 `https://homeworldmodel.org/spec/profiles/ro-crate/v0.1`，并提供对应的 `Profile` 上下文实体。

公开发布前，Profile URI 必须解析到人类可读规范。本仓库路径目前只是发布候选。

## 必需绑定

| HWM 包含义 | RO-Crate 表达 |
| --- | --- |
| 包身份 | Root `Dataset.identifier` |
| 包创建时间 | Root `datePublished` |
| 包许可证 | Root `license` 引用 |
| 单一家庭作用域 | Root `about` 指向家庭上下文实体 |
| Authority 状态 | Root `mentions` 中恰好一个实体的 `additionalType` 为 `.../authority/v0.1#AuthorityState` |
| Authority 纪元 | `authorityEpoch`，在本地 JSON-LD context 中映射到 `https://homeworldmodel.org/terms/authorityEpoch` |
| 必需 HWM Profile | Root `conformsTo`；列出的 HWM Profile 全部为必需，不再设置 `profileRequired` |
| Claim 资源 | Root `hasPart` 中 `additionalType` 为 `.../core/v0.1#ClaimEnvelopeSet` 的 File |
| Record 资源 | Root `hasPart` 中 `additionalType` 为 `.../core/v0.1#RecordSet` 的 File |
| 资源媒体类型 | File `encodingFormat` |
| 资源 Schema | File `conformsTo` 指向 Profile 上下文实体 |
| 资源大小 | File `contentSize` |
| 资源完整性 | File `sha256` |
| 未知 Manifest 扩展 | 本地映射的 JSON-LD 术语；值为类型化为 `.../ro-crate/v0.1#JsonValue` 的 JSON 字符串 |

所有实体关系必须使用扁平的 `{ "@id": "..." }` 引用。`conformsTo`、`hasPart` 与 `mentions` 在语义上无序；读取器不得从数组位置推导优先级或含义。

知识包必须包含恰好一个 Claim Envelope 集与一个 Record 集。其他应用制品可以使用 Profile 专用的 `additionalType` 与 `conformsTo`；其含义属于应用 Profile，不属于本包绑定。

每个 HWM application artifact 的 `additionalType` 必须是绝对 `Profile-ID#ArtifactType` URI，且该 Profile ID 必须出现在 Root `conformsTo` 中。资源自己的 `conformsTo` 可以指向 BOT 等外部 schema／词表，但不能替代治理该 HWM artifact 类型的 Profile 声明。治理 Profile 缺失时必须拒绝，不能静默投影成无语义的 `other`。

## 完整性决策

Profile v0.1 有意把资源完整性固定为 SHA-256 和 Schema.org `sha256`。旧 Manifest 的通用算法字段属于未经测试的泛化。若后续情景确实需要算法敏捷性，应映射 SPDX Hash 模型，而不是再发明 HWM 校验和结构。

元数据描述文件不对自身计算摘要，以避免递归摘要。传输或归档 Profile 可以增加签名外层容器，但不属于本 Profile。

## 扩展保留

未知兼容扩展必须使用绝对属性 URI，并映射到本地 `@context`。其值必须序列化为有效 JSON 字符串，强制数据类型为 `https://homeworldmodel.org/spec/profiles/ro-crate/v0.1#JsonValue`。声称无损兼容的读取器必须解析并保留 JSON 值；不要求逐字节保留空白或对象键顺序。

这是迁移逃生口。新的互操作语义应优先使用现有词汇或版本化 HWM 应用 Profile，不应持续堆积不透明扩展。

## 隐私边界

知识包只在自身权限边界内可用。持有知识包不自动授予对所有引用资源的访问权。更窄的运行时披露必须通过用途化 World View 交付。知识包元数据本身可能泄露家庭结构，因此也必须受到保护。

## 兼容投影

在 Core v0.1 迁移期间，读取器可以把本 Profile 投影为 `hwm:HouseholdManifest` v0.1.0。投影必须保留包 ID、家庭 ID、创建时间、必需 Profile、Authority ID 与纪元、资源身份／媒体类型／兼容角色／完整性以及未知扩展 JSON 值。数组顺序不属于投影语义。Claim 与 Record 集保留旧角色；非 Core 应用制品投影为 `other`，其精确语义类型继续保留在 RO-Crate 中。

目前已有两份结构不同的 HWM RO-Crate 在项目内部完成投影。只有外部开发读取器复现结果并发布可解析 Profile 后，才能移除简单 Manifest。

## 发布与离线解析

Profile URI、Schema `$id` 与本地 context 术语在发布后必须可以解析。发行版还必须提供离线 Schema registry 或 bundle，避免校验依赖网络。当前仓库 Schema 可以通过显式本地 registry 验证；否则通用工具会尝试获取尚未上线的 `homeworldmodel.org` 标识。

## 当前证据

生命周期与装修规划夹具是两份结构不同的 RO-Crate，均已由独立 JavaScript 与 Python 代码路径完成投影。第二份知识包携带五种带类型应用制品（包括显式双分支比较）和多个 `mentions`，同时保留唯一 Authority 状态与无序关系。`roc-validator` 0.11.2 当前只实现 RO-Crate 1.2 基础 Profile：两份候选各自通过 65 项 1.2 必需检查中的 64 项，唯一失败项是有意使用 RO-Crate 1.3 context。这是兼容性证据，不是对 RO-Crate 1.3 或本 HWM Profile 的完整外部验证。

运行：

```sh
node spec/profiles/ro-crate/v0.1/validate.mjs \
  conformance/scenarios/device-lifecycle-continuity-v0.1 \
  conformance/scenarios/renovation-planning-package-v0.1
python3 conformance/readers/python/reference_reader.py
```

候选序列化形状：[`hwm-ro-crate-profile.schema.json`](hwm-ro-crate-profile.schema.json)。

## 非目标

本 Profile 不定义运行时 API、策略求值、加密、密钥恢复、原始遥测保留、数据库布局、Agent 推理，也不授予外部资源解引用权限。

## 参考资料

- [RO-Crate 1.3 规范](https://www.researchobject.org/ro-crate/specification/1.3/)
- [RO-Crate Profiles](https://www.researchobject.org/ro-crate/specification/1.3/profiles.html)
- [RO-Crate JSON-LD 与扩展](https://www.researchobject.org/ro-crate/specification/1.3/appendix/jsonld.html)
- [Schema.org `sha256`](https://schema.org/sha256)
- [SPDX 3.0.1 Hash](https://spdx.github.io/spdx-spec/v3.0.1/model/Core/Classes/Hash/)
