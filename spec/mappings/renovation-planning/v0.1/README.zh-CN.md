# HWM 装修规划术语映射审计 v0.1

- 状态：映射候选
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 机器可读审计：[`planning-term-mapping.json`](planning-term-mapping.json)
- 外部语义投影：[`examples/external-semantics.jsonld`](examples/external-semantics.jsonld)
- 基础与方案修订投影：[`base-revision.external.jsonld`](../../../../conformance/scenarios/planning-branch-resolution-v0.1/base-revision.external.jsonld)

## 问题

哪些装修规划术语必须由 HWM 保留，哪些可以用成熟词汇表达；即使节点和关系全部使用外部词汇，哪些区别仍必须由 Profile 行为保证？

判断标准是语义保真，不是词面相似。映射必须保留分支隔离、输入沿袭、计划与安装身份区别，以及推荐、家庭选择、购买、授权、安装和派发之间的分离。

## 结果

| 决定 | 数量 | 术语或边界 |
| --- | ---: | --- |
| 外部复用 | 2 | `requirementStatus`、`selectedOption` |
| HWM 应用 Profile | 7 | Design Option 组合、候选考虑、安装计划组合、推荐、设计上下文、闭合比较输入、决策类别边界 |
| 不予标准化 | 1 | 拒绝 `reservedLoad`，拆分其数量角色 |

该结论从目标语义绑定中移除两个 HWM 谓词，同时没有增加 HWM 本体类。其余七项是跨标准组合约束，不是新领域词汇声明。装修规划映射现在没有暂定术语。

## 目标语义投影

目标投影使用：

- `prov:Plan` 表达基础设计与每个 Design Option；
- `prov:wasDerivedFrom` 表达方案到基础设计的沿袭；
- `prov:wasRevisionOf` 表达基础与方案 Plan 的修订；旧 Plan 不再可供后续推导时使用 `prov:invalidatedAtTime`；
- EARL `Assertion`、`TestCriterion`、`TestResult` 与 `outcome` 表达各方案需求求值；
- 使用 `used` 与 `generated` 的 PROV `Activity` 表达跨方案比较沿袭；
- Schema.org `Recommendation` 与 `itemReviewed` 表达建议结果；
- Schema.org `ChooseAction`、`agent`、`actionOption`、`object` 与 `actionStatus` 表达业主已完成选择；
- DCMI `replaces` 从后续选择状态 Claim 指向被替代状态，同时保留每一次 `ChooseAction` 历史；
- ODRL／XACML 只用于授权，而规划包中不存在授权。

可执行外部投影不含任何 `hwm-planning:` 谓词。验证器会把它与兼容 Claim 对照：方案 A 映射为 EARL `passed`，方案 B 映射为 `failed`；比较生成推荐 A 的 Recommendation；业主的 `ChooseAction` 从两个仍被保留的方案中选择 A。

修订投影同样不含 HWM 规划谓词。它把基础 r3 表达为 r2 的 revision，把方案 A r2 同时表达为方案 A r1 的 revision 和基础 r3 的 derivation，并让新的模拟 Activity 只使用重建后的方案。早先模拟仍是独立历史实体。

## HWM 仍需约束什么

### 设计上下文

RDF Dataset named graph 提供分组，却不赋予这种分组应用语义。`prov:Bundle` 特指带名称的溯源描述集合，不是反事实家庭世界。`prov:Plan` 与 `prov:Activity` 可以给上下文定型，但不会禁止 Resolver 合并不兼容分支。

因此 `designContext` 仍是装修规划 Profile 拥有的 Claim Envelope 线格式绑定，不是本体谓词。Profile 要求闭合分支成员关系，并禁止隐式跨分支解析。

### 修订与依赖闭包

PROV 能区分 derivation、revision、use、generation 与 invalidation，却不判断一张依赖图是否足以支持当前家庭规划。因此 Profile 要求每个 Design Option 恰好派生自一个可用基础设计根。链接缺失属于结构无效；依赖已知但不可取得时结果不确定；完整但根植于已被替代基础的分支只能作为历史。

新的基础设计 revision 不会隐式更新方案或模拟结果。Rebase 必须创建用 `prov:wasRevisionOf` 连接的方案 Plan 新版本，显式以 `prov:wasDerivedFrom` 连接新基础，并重新生成绑定新方案 revision 的下游结果。用于当前推荐的各比较分支还必须闭合到同一个当前基础根。

### 闭合比较输入

PROV `used` 与 `generated` 表达实际沿袭，但在开放世界语义下不会说明所列输入已经穷尽。HWM 比较只有在声明并验证闭合输入集合后，才能消费多个分支。`input_context_ids` 继续作为该约束的兼容 JSON 绑定；语义投影还应发出 PROV 沿袭。

### 推荐边界

Schema.org `Recommendation` 表达建议某个最佳选项，但该类型目前仍位于 Schema.org 的 `new` 区域。它可用于外部投影，v0.1 却不能把它作为唯一规范编码。HWM Profile 继续要求推荐只是建议，不能自动升级为家庭选择、BuyAction、Authorization Decision、安装或派发。

## 从目标 HWM 词汇中移除的术语

### `requirementStatus`

EARL 用于交换“某个 subject 针对 criterion 的测试结果”，并提供 passed、failed、cannot-tell、inapplicable 与 untested。虽然 EARL 是 2017 年 W3C Working Group Note 而不是 Recommendation，它已经提供所需结果结构。HWM 继续携带认知依据与溯源，避免把模拟通过误解为实测合规。

### `selectedOption`

Schema.org `ChooseAction` 直接表达从一组方案中作出偏好选择：`object` 是已选方案，`actionOption` 是所有候选，`agent` 是选择者。这比 HWM 自建二元谓词更好，因为 Schema.org 另有独立 `BuyAction`；完成选择不会推出已经购买。

家庭改变选择时，后续 `ChooseAction` 仍是新的历史事件，后续选择状态 Claim 使用 `dcterms:replaces` 标识被替代状态。DCMI 把该关系定义为描述资源替代或取代另一个资源。`as_of` 解析、分叉、成环与替代目标不可用的行为由装修规划 Profile 定义，而不是由 DCMI 定义。

## 带作用域的组合：`candidateFor`

Product Model 与绑定 IEC 的功能位置角色是规划上下文的输入。这是一条组合规则，不是可全局复用的二元谓词。目标投影在 `prov:Plan` 或带作用域的 Schema.org `ChooseAction` 中表达考虑关系；`hwm-planning:candidateFor` 只作为兼容投影。不得把它解释为实现、兼容证明、所有权、安装或家庭选择。

## 被拒绝的术语

### `reservedLoad`

这个标量不安全，因为它混淆商品铭牌功率、计划负载分配、安装负载、估计最大需量、设计电流、导体载流量、保护器额定电流、许可最大需量、派生余量与已验证合规。因此 HWM 拒绝把它作为目标谓词。

回路身份应复用 IFC 或 IEC 81346 参考代号，数值则复用 SAREF／QUDT，并显式给出数量角色、主体、依据、假设、生命周期状态与溯源。夹具原来的 100 W 数值现被重新归类为仅用于商品目录初筛的 `planned_load_allocation`；它不能证明回路容量、保护配合、电压降表现、安装验证或属地法规合规。参见 [ADR-009](../../../../docs/05_decision/ADR-009-split-electrical-load-and-capacity.zh-CN.md) 与[电气设计边界审计](../../electrical-design/v0.1/README.zh-CN.md)。

## 来源成熟度

- PROV-O 与 RDF 1.1 是 W3C Recommendation。
- DCMI `replaces` 提供外部替代关系；当前头部解析行为仍由 HWM Profile 负责。
- SAREF 4.1.1 是 ETSI Technical Specification。
- IFC 4.3.2.0 是 buildingSMART 官方规范；其 `IfcDistributionCircuit` 页面注明该实体不属于标准化 schema subset 或 implementation level。
- ISO 81346-10:2022 是电力供应系统结构的 International Standard，ISO 当前标记其将修订；ISO/TS 81346-101:2025 是实现指导，不是负载容量或电气规范合规模型。
- IEC 60364 分开处理安装基本要求、过电流保护、布线系统选择和验证；公开 Electropedia 定义同样区分安装负载、最大需量、设计电流与载流量。
- EARL 是 W3C Working Group Note，并明确因为实现不足而未升为 Recommendation。
- Schema.org 是社区词汇；`Recommendation` 当前标记为新术语。

成熟度本身就是映射结果的一部分。语义上有用，不等于足以成为唯一规范线格式依赖。

## 验证

```sh
node spec/mappings/renovation-planning/v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

JavaScript 验证器与独立 Python reader 检查来源决定、分支派生与修订、依赖闭包、EARL 结果、PROV 比较沿袭、Schema.org 推荐和选择、没有 `BuyAction`、没有 Authorization／Action Record，以及与可执行夹具的语义等价。它们提供项目内部实现多样性，不等于组织独立性。

## 参考资料

- [PROV-O](https://www.w3.org/TR/prov-o/)
- [RDF 1.1 Datasets](https://www.w3.org/TR/rdf11-concepts/#section-dataset)
- [Schema.org ChooseAction](https://schema.org/ChooseAction)
- [Schema.org Recommendation](https://schema.org/Recommendation)
- [Schema.org BuyAction](https://schema.org/BuyAction)
- [DCMI `replaces`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/replaces/)
- [EARL 1.0 Schema](https://www.w3.org/TR/EARL10-Schema/)
- [SAREF Core 4.1.1](https://saref.etsi.org/core/v4.1.1/)
- [IFC IfcLocalPlacement](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcLocalPlacement.htm)
- [IFC IfcDistributionCircuit](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcDistributionCircuit.htm)
- [IEC 60364-1:2025](https://webstore.iec.ch/en/publication/63699)
- [IEC 60364-4-43:2023](https://webstore.iec.ch/en/publication/28432)
- [IEC 60364-5-52 合并版](https://webstore.iec.ch/en/publication/1878)
- [IEC 60364-6:2016](https://webstore.iec.ch/en/publication/24656)
- [IEC Electropedia：安装负载](https://www.electropedia.org/iev/iev.nsf/display?ievref=691-02-03&openform=)
- [IEC Electropedia：载流量](https://www.electropedia.org/iev/iev.nsf/display?ievref=826-11-13&openform=)
