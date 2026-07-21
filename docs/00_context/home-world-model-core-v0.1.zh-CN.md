# Home World Model 核心模型 v0.1

- 状态：讨论候选稿（Discussion Candidate）
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`home-world-model-core-v0.1.md`](home-world-model-core-v0.1.md)
- 许可证：CC BY 4.0

## 目的

Home World Model（HWM）是一套面向家庭持久知识的开放、组合式互操作 Profile。它使不同的授权 Agent 能够读取同一个家庭知识包，取得受用途约束的世界视图，并在设计、装修、调试、运行、设备替换和系统迁移过程中交换可追溯的主张与行动结果。

HWM 的目标是维护家庭数字连续性。它不是 Agent 内部的潜在世界模型，也不规定 Agent 如何推理。

## 定位

Matter、Home Assistant、Web of Things、SAREF、SOSA/SSN、BOT、Brick、IFC、NGSI-LD、PROV-O、ODRL、JSON-LD、SHACL 和 Verifiable Credentials 已经覆盖设备互操作、建筑语义、观测、来源、策略与校验的大量问题。HWM 应组合并约束这些标准，而不是重新制造它们。

HWM 只定义家庭与 Agent 边界上所需的最小交换契约和行为契约。只有实现情景证明现有词汇无法表达一个必要区别、并会因此损害互操作性时，才增加 HWM 专有术语。

## 词汇所有权

逐术语的 [Core 映射审计](../../spec/mappings/core/v0.1/README.zh-CN.md) 是本候选规范的一部分。当前所有权规则为：

- EntityRef 直接使用 RDF／JSON-LD 标识；
- 空间与建筑拓扑直接使用 BOT／Brick／IFC；
- 资产、观测、Feature of Interest、端点、能力和行动使用 SAREF、SOSA／SSN、Brick、IFC、Matter 与 WoT 绑定术语；
- 生成、归属、派生与活动来源使用 PROV-O；
- 替换与取代使用 DCMI；
- 策略、授权、受限令牌和信任材料使用 ODRL、XACML、ACE-OAuth、CWT 与 VC；
- 打包目标模型使用 RO-Crate。

HWM 不拥有这些概念的别名。当前最小可辩护的自有表面是 Claim Envelope、World View 与 Action Trace 的行为，以及组合外部标准的 Profile 约束。Candidate 和 World View 状态值是线格式契约字段，不是家庭本体类。

原先称为 Functional Slot 的生命周期区别，现被定位为绑定 IEC 81346 的**功能位置 Profile 角色**，而不是 HWM 本体类。通用谓词 `fulfills` 与 `equivalentTo` 被拒绝：资产实现、目标满足、候选考虑、严格同一、替代表示、词汇映射、替换和用途限定可互换性需要不同且定义狭窄的关系。精确的 IEC 关系序列化仍需许可条款审查。

## 非目标

HWM Core v0.1 不定义：

- 新的设备传输或指令协议，也不替代 Matter；
- 通用的建筑、设备或家庭本体；
- Agent 规划器、推荐算法或基础模型；
- 强制数据库、图引擎、云平台或自动化运行时；
- 作为核心能力的生物识别、人员追踪或活动识别；
- 通用的偏好冲突算法；
- 任意学习型影响模型的执行标准；
- 完整的家庭宪法、多监护人恢复或跨家庭信任体系。

## 概念内核

最小家庭知识模型为：

`H = (E, C, R | A)`

其中：

- **EntityRef（E，实体引用）**：家庭讨论对象的稳定句柄。身份和等价性本身也必须是 Claim；EntityRef 不证明两条记录指向同一对象。
- **Claim（C，主张）**：不可变的命题与发布声明，包含有效时间、作用域、认知依据、Profile 版本和创建来源。声明的发布者不自动等于已认证身份。
- **Record（R，记录）**：关于观测、行动、确认、修订或删除的不可变记录，携带声明来源和明确的完整性方式。身份认证与信任属于解析结果；Record 本身既不证明由谁产生，也不证明内容为真。
- **Authority（A，权限治理上下文）**：信任锚、授权、约束、解析规则和权限纪元。它控制谁可以查看、主张、解析、授权和行动，不属于普通家庭数据。

Claim 可以表达状态、关系、能力、转换、偏好、约束、预测或预期影响；其认知依据可以是声明、观测、推断、预测、计划、模拟或学习。证据不会修改 Claim；独立 Evidence Link 可以在之后支持、反驳、确认或撤回它。取代是显式的 Claim 间关系，不是嵌入旧 Claim 的证据。

Claim 的有效时间使用精确时刻 `at`，或半开区间 [`from`, `to`)；缺少一侧边界表示向该方向开放。实现必须拒绝或标记 `from` 不早于 `to` 的区间，不得自行发明端点约定。

授权删除或脱敏可以移除敏感载荷，但知识包应保留可审计墓碑，除非法律或策略明确禁止。

## 家庭角色

HWM Profile 区分长期家庭角色与可替换实现：

- **功能位置角色**：持久的家庭或安装角色，例如“卧室阅读灯”，并绑定到声明的 IEC 81346 参考代号系统。`Functional Slot` 只作为迁移标签。
- **Physical Asset（物理资产）**：在显式时间区间内参与实现某个功能位置的具体设备。
- **Digital Endpoint（数字端点）**：可通过网络观测或控制的接口。
- **Feature of Interest / Measurement Zone（关注特征／测量区域）**：被测量或影响的物理现象或区域。

更换灯具可以改变物理资产和数字端点，同时保留功能位置身份、需求、调试历史和家庭意图。实现绑定不推出需求满足、兼容证明、调试成功或身份等价。

## 知识包与运行时边界

可移植家庭包以候选 [HWM RO-Crate Profile v0.1](../../spec/profiles/ro-crate/v0.1/README.zh-CN.md) 为目标，其中保存持久标识、Claim、Record／证据索引、Authority 引用、Profile 声明和外部数据引用。当前 Household Manifest 是迁移期间的兼容投影，不代表 HWM 发明新的通用打包模型。高频遥测通常留在授权平台或时序数据库中；HWM 记录相关时间窗、测量过程、摘要或由其推导出的持久 Claim。

运行时流程为：

1. **Evidence Resolver（证据解析器）**把知识包与授权实时数据组合成 **World View（世界视图）**。
2. **Agent Planner（Agent 规划器）**可以据此形成 **Action Proposal（行动提案）**。
3. **Policy Evaluator（策略评估器）**独立作出授权决定。
4. 执行网关下发已获准指令。
5. 观测和评估进入 **Action Trace（行动轨迹）**，并可能支持新的持久 Claim。

即使同一产品实现以上全部能力，它们仍是相互分离的语义角色。Core v0.1 记录这些边界，但不定义其实时传输 API；实时接口属于运行时绑定和可选 Profile。

## 三个行为契约与一个包绑定

### 包绑定：HWM RO-Crate Profile

使用 RO-Crate 1.3 声明知识包身份、家庭作用域、Profile 版本、Authority 引用、证据资源、许可证、完整性信息和兼容性要求。`hwm:HouseholdManifest` v0.1.0 在迁移期间保留为无损兼容投影，不是独立的家庭世界概念。RO-Crate 关系数组在语义上无序。

### 1. Claim Envelope（主张信封）

刻意分成两个部分：

- 不可变的 **Claim Body**，包含 Claim 标识、声明发布者、命题、有效时间、作用域、认知依据、Profile 版本、创建 Record 和 Claim 扩展；
- 追加式的 **Evidence Link 投影**，包含从 Record 指向该 Claim、具有独立标识的关系。

加入后续证据会改变交换时的 Envelope 投影，但永远不改变 Claim Body 或 Claim 标识。无损往返时必须保留两个部分的未知扩展。

### 2. World View（世界视图）

面向一个授权请求者、受用途和时间约束的投影，至少包含：

- 请求者和用途；
- `generated_at`、`as_of`、`known_through` 与新鲜度；
- 覆盖范围与局限；
- Authority 纪元和 Profile 版本；
- 分别表达可用性、认知状态、新鲜度和时间适用性的解析结果；
- 面向偏好、要求和约束的可选适用性结果；
- 证据引用和未解决冲突。

World View 的每条结果先标识被解析的主语与谓词，再物化零个或多个可披露 **Candidate（候选值）**。每个 Candidate 携带当前用途允许披露的宾语／值，以及可披露的 Claim 与证据引用。结果使用四条相互正交的状态轴：

- 可用性：`available`、`not_observed`、`source_unavailable` 或 `access_denied`；
- 认知：`accepted`、`contested`、`unknown`、`not_verified` 或 `not_evaluated`；
- 新鲜度：`current`、`stale`、`not_applicable` 或 `unknown`。
- 相对于 `as_of` 的时间适用性：`in_effect`、`not_yet_in_effect`、`expired`、`unbounded`、`mixed` 或 `indeterminate`。

新鲜度表示可用证据是否满足 View 的年龄要求；时间适用性表示解析出的命题依其 `valid_time` 是否在 `as_of` 生效。一条刚同步到本地的替换记录可以描述已经结束的旧关系；一条较旧但无时间边界的结构 Claim 仍可生效。实现不得合并这两种状态。

`accepted` 表示声明的 Resolver Profile 允许当前 View 的请求者在其用途、时间与 Authority epoch 下依赖已披露命题。它不是全局真值标志，也不会修改源 Claim。后续观测、家庭确认、纠正、策略修订或 Authority 变化会产生新 View。`contested` 解析可以包含多条不兼容 Candidate Claim，也可以只包含一条 Candidate，而它的支持证据受到反驳 Record 质疑；实现不得为了表达后一种情况而虚构否定 Claim 或替代 Claim。

Core v0.1 保留一个可选的组合适用性兼容投影：`applicable`、`conflicting`、`out_of_scope` 或 `not_available`。[Contextual Applicability Profile](../../spec/profiles/contextual-applicability/v0.1/README.zh-CN.md) 将规范模型定义为每条目标的三值结果（`applicable`、`not_applicable`、`indeterminate`）加独立冲突状态。因此旧 `conflicting` 只投影“适用且参与冲突”，不是规范、互斥的适用性状态。`not_observed`、`source_unavailable` 和 `access_denied` 使用零 Candidate，认知状态为 `not_evaluated`，不能虚构或泄露 Claim 标识。World View 必须在声明的覆盖范围内自包含；支持它的 Claim Envelope 与 Assessment 可以随 View 一同交付，但不能迫使请求者读取权限更宽的知识包。它默认只描述世界，不能暗中变成推荐或授权。

### 3. Action Trace（行动轨迹）

提供一个不可变、带版本的快照，覆盖连接意图、提案、授权、执行处置、设备应答、物理观测、影响评估、目标评估、资源评估、用户确认和恢复的 Records。执行处置区分 `dispatched` 与 `not_dispatched`；需要确认或被拒绝的 Proposal 不是设备失败。同一个稳定 Trace 标识可以在新 Record 到达后产生后续修订，但旧修订永远不被改写。不得把这些维度折叠为单一 `success` 字段。

影响评估值为 `consistent`、`inconsistent`、`insufficient_evidence`、`context_mismatch` 或 `not_applicable`；目标评估值为 `satisfied`、`partially_satisfied`、`not_satisfied` 或 `indeterminate`；资源评估值为 `within_limit`、`exceeded`、`indeterminate` 或 `not_applicable`。用户接受与否是独立确认。

## 简单行动—影响 Profile

Core v0.1 支持一个刻意缩小的影响模型：

`行动 × 上下文 → 预期结果、副作用、资源成本、延迟、持续／衰减和不确定性`

可移植的最小内容包括行动参数、受影响特征／属性、预期范围和单位、相关上下文、观测窗口、测量过程、容差、不确定性和模型版本。复杂模拟或学习模型可以作为外部制品引用；兼容读取器不必执行它们。

## 核心不变量

1. Claim 和 Record 以追加为主，纠错通过新 Record 和新 Claim 完成。
2. 身份合并、等价和设备替换必须显式表达为 Claim。
3. 每个解析后断言都必须可归属，并受用途、时间、覆盖范围和 Authority 纪元约束。
4. 缺失、过期、有争议、被拒绝访问和未观测是不同状态。
5. Agent 不能自行提升权限。只有 verifier 得知更新的 Authority 状态后，Epoch 才能使旧授权失效；有界 Lease 到期时间限制离线过期授权暴露。
6. 设备应答、物理结果、影响模型一致性、目标满足和用户接受必须相互分离。
7. 持久知识可以移植，而不要求迁移全部原始遥测。
8. 必须提供 JSON 表达；目标包绑定是扁平、紧凑的 RO-Crate JSON-LD，但不要求 RDF 引擎或图数据库。
9. 读取器必须保留必需扩展和未知扩展数据，否则应报告不兼容。
10. World View 是不可变的时间快照。Proposal 必须引用实际使用的行动前 View；后续证据只能生成新 View，不能追溯性地插入被引用的旧 View。
11. 在同一家庭作用域内，同一个 Claim 标识始终指向完全一致的 Claim Body。不同内容复用同一标识属于完整性冲突，绝不是更新。
12. 认知接受与情境适用性相互正交。真实偏好或要求可以被接受，但当前仍可能不适用、不确定、与另一条适用目标冲突，或被后续 Authority 决定覆盖。
13. World View 只披露当前请求者和用途获准看到的 Candidate；隐藏源 Claim 不得通过标识、数量或强制回查知识包被间接暴露。
14. Action Trace 修订是对追加式 Records 的不可变投影。迟到的观测、用户确认或恢复信息产生后续修订，并保留旧修订。
15. 预测是否实现、行动影响一致性、目标满足、资源成本和用户接受是不同评估。准备就绪目标可以满足，即使预测的家庭活动后来没有发生。
16. 证据新鲜度与命题时间适用性是不同概念。`stale` 不等于 `expired`，刚收到的证据也不会让超出有效期的 Claim 重新成为当前事实。
17. 认知依据不标识计划、模拟或反事实分支。必需 Profile 必须把分支专用 Claim 绑定到显式上下文；Resolver 不得隐式组合不同上下文。

## 可选 Profile 边界索引（非 Base）

以下编号条目汇总由可选 Profile 定义并测试的边界。它们在 Core 文档中仅用于发现；只有具名 Conformance Set 纳入相应 Profile 时才成为规范要求。它们**不是**额外 HWM Base Exchange requirement，也不扩张 Core wire contract。

18. 认知准入以命题为作用域。视觉确认、动作应答、家庭 Attestation、反驳与纠正是不同证据事件；任何一项都不能扩大到未被询问的属性，也不能转化成全局事实标志。
19. 描述性证据冲突、绑定主体的偏好多样性、共享行动 coordination、最终授权、本地安全与结果接受彼此不同。折中 Proposal 或回答阈值不得合成全局家庭偏好或真理。
20. 影响完整性必须限制在精确 Proposal revision、已声明通道、过程、时间范围、时间点和 Authority 状态内。`complete_for_declared_channels` 不得推出全局影响完整、参与资格、同意或授权。
21. 影响到治理的映射产生显式、可能异质且由系统承担的程序性要求。受影响实体不得自动成为投票者或被强制回答；肯定回答、咨询、异议、通知、复核、审计、履行与授权彼此不同。
22. 程序履行受工作流阶段约束并先于最终授权。`not_due` 既不是已履行也不是已放弃；已知 `requirements_pending` 不是输入缺失；要求已履行只允许继续策略求值；行动后不合规不能改写历史决定。
23. Record 不能建立自身的证据准入。Standing Decision 是独立 Authority-plane Record，绑定精确 Record 内容、用途、Epoch、时间与获准断言；证明验证、回执、语义完成、真实性与授权保持分离。
24. Authority 信任递归终止于本地持久保存、带外固定的 Trust Root lineage。根轮换要求精确顺序连续以及当前根加新根阈值覆盖不同验证材料；恢复要求预承诺的独立故障域；否则重新注册产生新 lineage。根接纳不等于法律所有权、真理、安全或行动授权。
25. Agent 解析兼容、家庭 Trust Root 接纳、实例证明、World View 访问、提案许可与执行授权彼此独立。Agent 不能自命名 Authority 主体；准入需要 Authority 分配主体和有界持有证明 Lease。
26. Agent 变化只能通过持久、可归因制品和面向目标的重新解析保持任务 lineage；它不转移私有推理、实例身份、源归属、源可见性或 Lease。委托保留当前 actor 与责任主体；排他执行切换受已知 Authority 状态和 Lease 到期约束。
27. Task 身份绑定精确 Intent、用途、发生实例、家庭和不可变范围，不绑定 Agent、Plan、Proposal 或执行 Attempt。身份基础变化产生新 Task，拆分和合并结果使用新身份。Task State 是追加式、证据绑定 Assessment：Attempt 失败不推出 Task 失败，完成要求所有强制退出条件满足且没有开放 Attempt，任何 Task State 都不授予行动授权。
28. 话语、主体限定 Preference、Goal／Requirement／Constraint Claim、候选 Intent Definition、Authority 采纳、fulfillment assurance、Task、Plan、Proposal 与 Action Authorization 彼此独立。Intent 只声明“what, not how”，Agent 不能自我采纳。commitment 与 fulfillment 是正交追加轴；同一 Intent 修订需要精确上一版内容、稳定的家庭／用途／生命周期／受益者／范围身份、Authority continuity 与 expectation lineage，且不得静默重定向 Task。
29. Observed Pattern、persistent Intent、Routine Definition、Authority activation、trigger evidence、eligibility、逻辑 occurrence、Instantiation Decision、Task 与 Action Authorization 彼此独立。Routine 是经 Authority 激活的 Task 实例化策略，不是学习到的习惯或可执行动作。Trigger／condition 的不确定性失败关闭；recurrence／event 投递身份不能代替 lineage-scoped occurrence key；catch-up 与 overlap 必须显式且有界；一个 materialization key 最多接纳一个精确 Task，且永不推出 dispatch。
30. Observation、Situation Claim、用途化 World View acceptance、Situation Use Assessment、Routine eligibility／activation、Task materialization 与 Action Authorization 彼此独立。HWM 不存在规范性全局家庭模式：activity、presence、occupancy、访客／宠物情境、declared control mode、policy window 与 Forecast 各自保留作用域。phenomenon time 不是 result 或 delivery time；一个主体不能关闭家庭人口集合；被拒绝、缺失、陈旧、争议、过期或覆盖不完整的情境知识是 `indeterminate`，不是 false。
31. Preference／Goal／Requirement／Constraint Claim、已接受 Applicability Rule Claim、Contextual Applicability Assessment、目标满足、冲突、优先级、推断 Need、Intent 与 Action Authorization 彼此独立。适用性使用精确内容绑定与三值逻辑；规则或 context 缺失绝不表示无条件或 false；冲突与适用性正交；`applicable` 不授予承诺或行动。
32. Target Fit、个人体验、Agent 主动商议准入、用户明确请求、既有 Intent drift、Routine occurrence、安全义务、candidate Intent、通知权限与行动彼此独立。未满足目标不是 Need；主动商议需要已接受 policy，eligibility 不授予打扰、采纳、规划或行动。
33. Deliberation Closure 是 interaction 与独立生效制品之上的回执，不是 Authority 来源。candidate rejection、tolerance、deferral、raising-policy revision、target correction、Intent adoption 与 Intent revision 是分别生效的效果；沉默和关闭不产生任何效果，汇总未知也不回滚已验证效果。
34. adopted Intent 的一次 realization 依 accepted policy，按持久工作身份是否必须跨一个 Proposal 与 Action Trace 存续进行 routing。direct route 只省略 Task materialization；Task route 本身不创建 Task。两者都不跳过 impact、coordination、Authority、safety、dispatch 或 outcome evaluation。
35. 模型私有推理、带归因 rationale、portable Plan、Action Proposal 与 Authorization 彼此独立。被下游依赖的方法结构依 accepted policy 材料化，但 raw prompt、hidden state 与 chain-of-thought 不是家庭审计要求。Proposal 保持授权自包含，并绑定实际使用的精确 Plan revision。

## 初始 Profile 与绑定

第一组验证对象为：空间与生命周期 Profile、设备身份绑定 Profile、简单行动—影响 Profile、装修规划 Profile、交互证据 Profile、Evidence Standing Profile、Bounded Impact Closure Profile、Impact Procedure Mapping Profile、Agent Admission Profile、Agent Continuity Profile、Task Lineage Profile、Intent Commitment Profile、Routine Instantiation Profile、Situational Context Profile、Contextual Applicability Profile、Shared Action Coordination Profile、平台权限适配 Profile、Matter 绑定和 Home Assistant 绑定。

这些 Profile 可以复用 IFC／BOT／Brick 表达空间和资产，SOSA／SSN 表达观测与执行，PROV-O 表达来源，ODRL 表达策略，NGSI-LD／JSON-LD 表达上下文和关联数据映射。

## 一致性验证方向

Core v0.1 必须由至少两个独立读取器／解析器验证。一致性以可观察的输入输出行为为准，而不约束内部架构。项目为测试夹具提供基线解析器，但不把某一种冲突解析算法规定为普遍标准。

第一个判定样例是卧室阅读灯：需求 Claim 规定阅读区域至少 300 lux；影响 Claim 预测在已记录上下文中执行 `SetLevel(60%)` 将产生 285–335 lux。若设备应答成功且有效观测为 295 lux，兼容结果应为：

- 指令下发得到应答；
- 接受物理观测：295 lux；
- 影响模型一致；
- 目标未满足；
- 用户所说“太暗”作为独立确认保留。

任何兼容实现都不能从这些证据得出一个未分维度的“总体成功”。

## 待验证问题

- 两个独立实现能否无语义损失地往返读写两份结构不同的 HWM RO-Crate，且社区 RO-Crate 1.3 验证器能否接受它们？
- 使用相同基线解析 Profile 和输入时，它们能否产生兼容的 World View 与 Action Trace 评估？
- 替换设备和 Agent 后，绑定 IEC 的功能位置角色与相关家庭知识能否保持连续？
- 当前十个契约缺口候选能否通过外部实现者审查，以及许可 IEC 81346 审查能否提供精确开放序列化，同时不把 `FunctionalSlot` 或 `fulfills` 重新引入 HWM 词汇？
- 支持本地优先运行和撤权的最小 Authority Profile 是什么？
- 独立 Resolver 能否在不采用统一置信算法的情况下复现单 Candidate 争议、精确问题绑定、证据来源去重、作用域上限与合格纠正？
- 独立实现能否在不采用通用家庭投票规则的情况下保留 accepted 个人偏好，并复现精确 Proposal coordination、委托、紧急、授权与安全边界？
- 独立 Agent 能否重现 Target Fit 与主动 Deliberation Eligibility，同时保留测量不确定性、注意力 policy、隐私、去重、用户直接能动性、既有 Intent drift 及无通知／无行动边界？
- 独立交互系统能否重现多效果 Deliberation Closure，而不把通用 yes/no、沉默、关闭或 Agent 总结变成 Authority，并保留分别生效的纠正与决定？
- 独立 Agent 能否从精确 accepted work-shape policy 重现 direct／Task realization routing，而不使用模型局部复杂度、不绕过开放 Task，也不削弱下游 Proposal 治理？
- 独立 planner 能否跨 Agent 交换 portable 决策结构而不暴露 chain-of-thought，同时让每个 Proposal 对授权自包含且不被后续 Plan revision 改写？
- 独立的物理、隐私、资源和控制利益过程能否复现声明通道影响闭包，而不声称全局完整或静默创建参与权？
- 独立 Authority 与协调实现能否复现异质、Proposal 作用域程序，同时不暴露参与者身份、不强制回答，也不混淆通知、沉默、复核与授权？
- 独立实现能否保留从话语与个人 Preference 到 Authority 采纳 Intent 的边界，复现 expectation-lineage 修订，并分离 commitment、fulfillment、Task 绑定与 Action Authorization？
- 独立 scheduler 与事件运行时能否在不定义统一 rule language、也不假设 exactly-once 的情况下，保留 Routine activation、trigger／condition 分离、原始 recurrence 或相关 event occurrence identity、有界 catch-up／overlap 与单 Task 物化？
- 独立 activity／presence resolver 能否在不定义全局家庭模式或统一识别算法的情况下，保留 phenomenon／result time、重叠且主体限定的 episode、人口覆盖、不透明 aggregate、control-mode／policy 边界与失败关闭的 Routine condition use？
- 独立 applicability evaluator 能否在不采用统一 context language 或 Planner 的情况下，复现精确目标／Rule 绑定、`all_of`／`any_of` 三值逻辑、决定性子集隐私、分离冲突状态和禁止推断 Need 的边界？

这些问题在实现中得到验证前，本文档只是讨论候选稿，不是已经采用的标准。
