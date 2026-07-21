# HWM 装修规划 Profile v0.1

- 状态：夹具候选稿
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 许可证：CC BY 4.0

## 目的

本可选 Profile 把家庭意图从装修前设计延续到采购、安装、调试与运行，同时避免把计划、商品目录或模拟结果表达成物理事实。

它是 HWM 内核上的应用 Profile。空间、Product Model、Design Option、电气设计和模拟制品都不是新的 Core 原语。

## 复用语义

- BOT 表达建筑、空间、区域、拓扑与几何制品引用。
- SOSA／SSN 标识真正关心其物理属性的 Feature of Interest／Measurement Zone。
- Schema.org `ProductModel` 表达厂商数据表或原型产品，不表示已购买的具体资产。
- HWM Simple Action–Effect Profile 表达预测物理结果与不确定性。
- RO-Crate 携带带类型及完整性元数据的设计、目录、电气与模拟制品。
- PROV-O `Plan`、`Activity`、`used`、`generated`、`wasDerivedFrom`、`wasRevisionOf` 与 invalidation 表达设计方案、依赖沿袭、显式修订与后续不可用。
- EARL `Assertion`、`TestResult` 与 `outcome` 表达方案是否满足声明要求。
- Schema.org `ChooseAction` 表达家庭选择，并与 `BuyAction` 保持区别。Schema.org `Recommendation` 可表达建议结果，但由于仍位于 Schema.org 的 `new` 区域，不能成为唯一规范绑定。
- 只有具体已安装或虚拟 Thing 暴露可控接口时，Matter 或 WoT Thing Description 才开始相关；商品目录中的 Product Model 不自动产生 Digital Endpoint。

## 必须保留的区别

1. 设计几何 Claim 必须使用 `planned` 认知依据，除非后续观测或授权确认提供证据。导入图纸不等于观测到建成空间。
2. 商品候选必须表达为 Product Model 或等价产品种类描述。不能仅因可能购买就把它标成 Physical Asset。
3. `candidateFor` 是一项兼容投影，表示某 Product Model 正在一个同时标识绑定 IEC 功能位置角色的规划上下文中被考虑；不得解释为资产—功能实现、已经安装、已经拥有或已经证明兼容。
4. `mountingPlan` 属于 Design Option，记录预期 Product Model、功能位置角色、空间、位置和朝向，不断言已经安装的位置。
5. 模拟产生的影响 Claim 必须使用 `simulated` 认知依据，并引用输入上下文与结果制品；不得作为 Observation 发布。
6. `planned_load_allocation` 是只用于商品目录初筛的规划上下文数量角色。Product Model 落在该分配内，不得被视为安装负载、最大需量、设计电流、导体容量、保护配合、电压降表现、安装验证、规范合规或通电许可的证据。
7. 设计方案可以被预测为满足要求，但仍未验证。预测满足不等于针对实测物理结果的 Goal Evaluation。
8. 每条计划专用、模拟专用或分支推导 Claim 都必须携带包含 `context_id`、`context_kind` 与 `revision` 的 `designContext` 扩展。本版本的 `context_kind` 必须是 `base_design`、`design_option` 或 `comparison`。认知依据不是分支标识。
9. 共享空间与电气设计 Claim 必须使用 `base_design` 上下文。每个互斥 Design Option 必须使用独立 `design_option` 上下文，并通过 `prov:wasDerivedFrom` 显式连接基础设计；Resolver 不得从名称或时间中猜测该连接。
10. 一个 `design_option` 上下文中的 Claim 不得消费另一个方案上下文中的 Claim。没有设计上下文的共享要求与商品目录声明可以分别进入各方案求值。跨分支推导只能发生在 `comparison` 上下文中，并由 `input_context_ids` 显式列全所有输入分支。
11. 需求满足状态必须先在每个 Design Option 内分别推导，再进入比较。目标语义绑定必须使用 EARL Assertion 与 TestResult outcome；`hwm-planning:requirementStatus` 只作为迁移兼容投影。
12. 比较推荐只是建议性信息。外部投影应使用带 PROV 输入与生成沿袭的 Schema.org Recommendation，但 v0.1 不得把这个仍属新术语的类型作为唯一规范编码。推荐不得解释为家庭选择、Authorization Decision、购买、安装、调试或动作派发。
13. 家庭成员的显式选择可以记录为仅影响规划的 Attestation。目标语义绑定必须使用包含 `agent`、已选 `object` 与全部 `actionOption` 的已完成 Schema.org `ChooseAction`；`hwm-planning:selectedOption` 只作为迁移兼容投影。选择不得推出 `BuyAction`、删除未选方案，或产生所有权、安装与执行权限。后续改变选择必须新增 Claim 或 revision Record，不得改写历史。
14. 每个 `ChooseAction` 必须作为不可变历史事件保留。后续选择状态 Claim 可以使用 `dcterms:replaces` 覆盖早先选择状态，供当前解析使用。在 View 的 `as_of` 时刻，恰有一个未被替代的选择头部时为已接受；多个头部表示冲突；成环表示完整性冲突；替代目标不可用时结果不确定。任一状态都不产生购买或执行权限。
15. 比较上下文必须声明无重复的封闭 `input_context_ids` 集合。接纳候选推荐以前，Resolver 必须要求每个已声明输入恰有一个解析结果、不存在未声明输入，并且每个输入都是 `available`、`accepted`、`current`，时间上为 `in_effect` 或 `unbounded`，且为 `applicable`。否则必须不产生推荐，并依一致性 oracle 返回 `indeterminate` 或 `invalid_context`。
16. 推荐算法不属于本 Profile。Profile 只判断外部提出的推荐是否拥有充分、已声明的输入证据，不负责排序或选择 Design Option。
17. 每个 Design Option 必须恰有一条显式 `prov:wasDerivedFrom` 边指向 `base_design` 上下文。基础派生缺失或多于一个时为 `invalid_context`；Resolver 不得猜测或代选基础。
18. 依赖结构与依赖可用性彼此独立。基础链接存在，但解析结果缺失、不可用、无权访问、载荷已删除、未被接受或不是当前状态时，该方案对当前推导为 `indeterminate`，不得产生当前模拟、求值或推荐。已有不可变输出可以依 Authority 作为历史 Record 保留，但不得提升为当前 Candidate。
19. 完整但根植于非当前基础的方案为 `historical_only`。它可以在兼容的历史 `as_of` 时刻解释，但不得生成或支持当前推荐。
20. 基础设计修订不得隐式更新 Design Option。Rebase 必须创建方案新 revision；保留大量原内容时以 `prov:wasRevisionOf` 连接旧方案，并以新的显式 `prov:wasDerivedFrom` 连接新基础。所有作为当前结果使用的下游模拟与需求求值都必须重新生成并绑定新方案 revision。
21. 进入同一次当前比较的所有 Design Option 必须具有 `ready` 依赖闭包，并共享同一个当前基础设计根。混合基础 revision、仅历史分支或无法解析的根都不得产生推荐。比较不同布局时，应把布局建模成同一个更高层基础下的方案，而不是绕过共享根规则。
22. 依赖 oracle 中的 `ready`、`historical_only`、`indeterminate`、`invalid_context` 与 `integrity_conflict` 是 Profile 一致性结果，不是新的 HWM Core World View 状态值。
23. 不得把 `reservedLoad` 作为目标 HWM 谓词发出。电气量必须标识商品铭牌功率、计划负载分配、安装负载、估计最大需量、设计电流、载流量、保护器额定电流、许可最大需量或派生余量等角色；这些角色是 Profile 管理的分类，不是 HWM 本体类。
24. 派生电气余量必须列明需量输入与容量输入、兼容的量纲和作用域、假设、溯源与有效期。输入缺失或不可比较时，Assessment 必须保持不确定，不能制造一个标量余量。
25. 缺少所声明方法所需的电压、相数／拓扑、功率因数、效率、工作制与分配假设时，不得把有功功率换算为设计电流。
26. 计划、安装、观测、检查、验证与属地规范合规状态必须保持分离。工程算术或设计 Assessment 不得生成安装验证或规范合规 Claim。

## 夹具术语

[装修规划术语映射审计](../../../mappings/renovation-planning/v0.1/README.zh-CN.md)把夹具术语分为：

- `requirementStatus` 与 `selectedOption` 从目标 HWM 词汇中移除，分别改用 EARL 与 Schema.org `ChooseAction`；
- Design Option、`mountingPlan`、`recommends`、`designContext`、闭合比较输入，以及推荐—选择—授权边界保留为应用 Profile 组合规则，不成为 HWM 本体类；
- `candidateFor` 只保留为带作用域的规划兼容投影；`reservedLoad` 被拒绝，其原数值只投影为用于目录初筛的已定型 `planned_load_allocation`；
- 沿袭直接使用 `prov:wasDerivedFrom`、`used` 与 `generated`。

可执行夹具仍保留若干 `hwm-planning:` 谓词作为迁移兼容投影，以便无损验证外部映射。不得把它们表达为已接受的 HWM Core 词汇。

## 知识包规则

兼容知识包必须使用 HWM RO-Crate Profile，并包含恰好一个 Claim Envelope 集与一个 Record 集。它可以包含带类型的空间、电气、商品目录、模拟、BIM、图片或报告制品。每个包含的 File 必须携带媒体类型、内容大小、SHA-256、语义 `additionalType` 和 `conformsTo` 引用。

迁移期 Manifest 把非 Core 应用制品投影为 `other`。它们的精确含义保留在 RO-Crate `additionalType` 与 `conformsTo` 中；因此 Manifest 是兼容索引，不是完整语义包。

## 当前夹具

[`renovation-planning-package-v0.1`](../../../../conformance/scenarios/renovation-planning-package-v0.1/README.zh-CN.md) 包含：

- 计划卧室与阅读区的 BOT 空间模型；
- 家庭明确声明的 300-lux 要求；
- 从同一个基础设计派生的两个互斥 Design Option，分别包含 Schema.org Product Model 候选；
- 100 W 目录初筛分配、12 W 与 8 W 两个候选最大功率声明，以及显式“不完整”的电气设计 Assessment；
- 方案 A 的 320–380 lux 与方案 B 的 245–285 lux 模拟影响；
- 各方案独立需求求值、显式推荐 A 的比较，以及业主选择 A 的 Attestation；
- 未选方案 B 仍保留；
- 不包含 Physical Asset、Digital Endpoint、Observation、Action、Authorization、购买或安装 Claim。

该夹具在现有 HWM 内核中闭合，不支持新增 Core 原语。

独立的 [`planning-branch-resolution-v0.1`](../../../../conformance/scenarios/planning-branch-resolution-v0.1/README.zh-CN.md) oracle 增加了按时刻选择修订、分叉、成环、替代目标缺失、封闭输入失败、输入过期或争议、有效三方案比较、十个基础依赖用例与五个共享根比较用例。JavaScript 与 Python 得出相同结果。

## 非目标

本 Profile 不标准化 BIM 创作、电气规范合规、采购、价格比较、安装审批、模拟算法或自主购买，也不授权 Agent 购买、安装、通电或控制设备。

## 参考资料

- [Building Topology Ontology](https://w3c-lbd-cg.github.io/bot/)
- [SOSA／SSN 2023 Edition](https://www.w3.org/TR/vocab-ssn-2023/)
- [Schema.org ProductModel](https://schema.org/ProductModel)
- [Schema.org ChooseAction](https://schema.org/ChooseAction)
- [DCMI `replaces`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/replaces/)
- [EARL 1.0 Schema](https://www.w3.org/TR/EARL10-Schema/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [Web of Things Thing Description 1.1](https://www.w3.org/TR/wot-thing-description11/)
- [装修规划术语映射审计](../../../mappings/renovation-planning/v0.1/README.zh-CN.md)
- [电气设计边界审计](../../../mappings/electrical-design/v0.1/README.zh-CN.md)
- [HWM RO-Crate Profile](../../ro-crate/v0.1/README.zh-CN.md)
