# 实体模型

> 本文定义业务世界中的概念职责，不直接映射数据库表。规范候选以 [`Home World Model Core v0.1`](../00_context/home-world-model-core-v0.1.md) 为准。

## 概念内核

`H = (E, C, R | A)`：数据平面由 EntityRef、Claim、Record 组成，Authority 作为治理平面约束其可见性、可信度与使用方式。

### EntityRef

稳定引用一个被讨论的对象。它可以引用空间、功能位置、物理资产、数字端点、人、宠物、测量区域、需求、行动或其他可识别对象。

EntityRef 只是句柄。同一性、等价、隶属、实现参与、替代、合并和拆分都必须通过显式 Claim 表达。

### Claim

不可变命题，最少包含：

- 唯一标识、发布者和创建 Record；
- subject、predicate、object／value；
- 有效时间和作用域；
- 认知依据；
- 使用的 Schema／Profile 版本；
- 零个或多个证据引用。

Claim 可以描述状态、关系、能力、转换、偏好、约束、预测和预期影响。Claim Body 不包含会随时间增加的证据集合；纠错不覆盖原 Claim，而是增加独立 Evidence Link，或发布表达取代关系的新 Claim。

### Record

对一次观测、行动、确认、修订、授权变化或删除的不可变记录。Record 保存声明来源和完整性方式；是否认证了来源、是否在特定用途下可信，由 Resolver 明确判断，不能仅凭 `attributed_to` 升格为事实。

### Authority

独立治理上下文，包含 Trust Root、主体、授权、禁止、职责、作用域、目的、租约、Authority Epoch 和解析规则。Agent 不得通过发布普通 Claim 自行取得更高权限。

Trust Root 是验证方带外固定并本地持久保存的 Authority-plane 制品。它以独立方法集和阈值分离离线根、运行时 Authority 文档与预承诺恢复角色。Root version 表达密码学 lineage 的连续更新，Authority Epoch 表达授权状态；两者不能合并。没有旧根或预承诺恢复路径证明连续性时，重新注册创建新 lineage，而不是改写旧 Authority。

Authority 还可以通过可选 Evidence Standing Profile 发布“哪类来源的哪类 Record，可以在什么命题、用途、空间、过程、时间与资质边界内参与解析”的 grant。它不是对人或设备的全局可信等级。

## 家庭世界对象

### Space

建筑或家庭中的空间、区域、边界及其拓扑关系。几何模型是 Space 的一种制品或视图，不能代替所有语义和证据。

### 功能位置角色（`Functional Slot` 迁移标签）

长期存在的家庭功能或安装角色，例如“卧室阅读灯”“主卧温控”“入户存在感应”。它承载需求、约束、安装位置和历史连续性，并由生命周期 Profile 绑定到声明的 IEC 81346 参考代号系统。它不是 HWM Core 本体类。

### Physical Asset

具体的灯、空调、传感器、热水循环泵或其他物理设备。Physical Asset 可以在显式有效时间内参与实现一个或多个功能位置；这种实现绑定不等于身份相同或需求已经满足。

### Digital Endpoint

由 Matter、Home Assistant、厂商 API 或其他运行时暴露的数字接口。端点标识变化不应自动改变 Physical Asset 或功能位置的身份。

### Feature of Interest / Measurement Zone

被观测或影响的现象、对象或物理区域，例如阅读桌面照度区、卧室空气体积或热水回水管段。它让“传感器读数”与真正关心的家庭效果连接起来。

### Household Subject

家庭中的人、宠物或角色引用。Core 允许引用和授权，但不要求生物识别、视频追踪或活动推断实现。

## 交换对象

### HWM RO-Crate Package Binding

知识包入口，复用 RO-Crate 1.3 声明包身份、作用域、版本、Profile、Authority 引用、带类型资源、许可证和完整性信息。Household Manifest v0.1 只作为迁移期兼容索引。

### Household Knowledge Package

包含 RO-Crate 元数据、持久 EntityRef、Claim、Record／证据索引和外部数据引用的可移植单元。高频实时数据可以留在外部授权系统；应用制品通过 Profile 类型保留精确语义。

### World View

Evidence Resolver 为特定请求者、目的和时间生成的不可变、自包含只读快照。每条解析结果物化获准披露的候选值及可见来源，并分别表达认知状态与可选的规范适用性；新证据产生新 View，不能改写旧 View。

### Action Proposal

Agent Planner 基于某一 World View 提出的候选行动，包括意图、参数、目标、前提、预期影响和所依据的视图标识。它不是授权，也不是已执行事实。

可选 Plan Materialization Profile 分离 private reasoning、portable Plan 与 Action Proposal。下游依赖跨 Proposal dependency、handoff、alternative selection、method review、long-lived assumption、contingency、Task method continuity 或显式 Plan reference 时，accepted policy 要求 versioned portable Plan。Plan 只保存结构化决策输入、假设、步骤依赖、备选 disposition、checkpoint 与 contingency，不要求 raw prompt、hidden state 或 chain-of-thought。Proposal 即使绑定 Plan，也必须对 action、parameter、precondition、impact、World View 和 Authorization 输入自包含。

### Intent Definition 与 Intent State Assessment

可选 Intent Commitment Profile 的 Definition 把 Goal、Requirement 与 Constraint Claim 组合成声明式结果，只表达“要什么”，不表达实现方法。Definition 的存在、作者身份或在 World View 中 accepted 都不代表家庭已采纳。State Assessment 分开保存 Authority commitment 与 evidence-based fulfillment 两条轴；Agent 可以提出候选，不能代表家庭自我采纳。

Intent lineage 的稳定身份基础包含家庭、用途、transient／persistent 生命周期、受益者与范围。expectations 可以在 Authority 批准、上一版内容绑定和 expectation lineage 完整时修订；Task 始终绑定精确 Definition revision，不能被后续 revision 静默重定向。

### Routine Definition、Activation State 与 Instantiation Decision

可选 Routine Instantiation Profile 把 Routine 定义为经 Authority 激活的 Task 实例化策略，而不是观察到的生活习惯、日历项或设备自动化。Definition 的身份基础绑定家庭、目标 persistent Intent lineage、用途与不可变 Task 范围；外部 trigger／eligibility 规范、occurrence policy、Task 模板、迟到和 overlap policy 是受治理的 revision 内容。Activation State 与 Intent commitment、Task State 和 Action Authorization 分离。

Instantiation Decision 针对一个 lineage-scoped occurrence key，绑定精确 Routine、当前 adopted persistent Intent、用途化 World View、trigger evidence、condition assessment、Authority Epoch、迟到／重叠／去重结果与精确 Task。CloudEvents delivery ID 不是逻辑 occurrence ID；同一 materialization key 只能接纳一个精确 Task。`materialized` 只表示创建 Task Definition，不表示已有 Plan、Proposal、dispatch、Attempt 或 Authorization。

### Situation Claim 与 Situation Use Assessment

可选 Situational Context Profile 不建立 `Situation` 或全局 `HouseholdMode` 实体。Situation Claim 只是对 activity、presence、occupancy、关系或 aggregate 的普通不可变 Claim，必须保留主体、空间、现象时间、用途、来源与认知依据，并使用外部 predicate／type 词表。episode EntityRef 只是相关句柄，不证明跨来源同一性。

Situation Use Assessment 绑定精确用途化 World View、外部 query、`as_of`、Authority Epoch、输入 resolutions 与 subject coverage，返回 `satisfied`、`not_satisfied` 或 `indeterminate`。一个人的 episode 不建立家庭情境；没有事件、访问拒绝、源不可用、stale、contested、expired 或覆盖不完整都不能解释为 false。声明式 away mode、quiet-hours policy 与 activity／occupancy Claim 分离。`satisfied` 可以输入 Routine eligibility，但不表示 activation、Task 或 Authorization。

### Applicability Rule Claim 与 Contextual Applicability Assessment

可选 Contextual Applicability Profile 不建立通用 `Need`、Preference、Requirement 或 Rule 实体。Preference／Goal／Requirement／Constraint 继续是普通、主体和作用域限定 Claim；Applicability Rule Claim 也是普通不可变 Claim，单独说明一条目标 Claim 在什么精确条件下被考虑。规则缺失不等于 unconditional，Agent 编写或学习到的规则在用途化解析前只是候选。

Contextual Applicability Assessment 绑定精确目标与 Rule Claim Body、World View、外部条件 Assessment、用途、`as_of`、Authority Epoch 和求值覆盖，使用三值结果 `applicable`、`not_applicable` 或 `indeterminate`。目标满足与冲突另行评估；`applicable` 不建立 Need、优先级、家庭 Intent、Routine activation、Task、Proposal 或 Authorization。Core v0.1 内联 `conflicting` 只作为“适用且参与冲突”的有损兼容投影。

### Target Fit 与 Deliberation Eligibility Assessment

可选 Target Fit Profile 以独立接受的 Evaluation Specification Claim，把一条适用目标绑定到精确对象、属性、过程、单位、现象时间、空间覆盖、不确定性决策规则与聚合；结果与个人体验、Need、Intent 和行动结果分离。Agent 发现 `not_satisfied` 后仍不能直接提出家庭 Need。可选 Deliberation Eligibility Profile 还需要一条独立接受的 Deliberation Policy Claim，才判断该缺口能否进入家庭商议队列。`eligible` 不允许通知、披露、采纳 Intent、规划或行动。用户明确请求、既有 Intent drift、Routine occurrence 与安全义务走各自路径。

可选 Requirement Operationalization Profile 位于目标 Claim 与 Evaluation Specification Claim 之间。它保存原始表达，并把 Agent／人提出的 criterion、主体／时空覆盖、生命周期阶段、证据过程、决策规则、审阅角色、声明遗漏与开放歧义物化为不可变 Proposal revision。独立 Review 只判断该 revision 对某个用途是否可进入接受；它不能代理 Authority 接受，也不能把数值或传感器代理提升为家庭原意。

可选 Multi-Target Option Comparison Profile 把多个方案对多个独立目标的用途化 Assessment 组织为 Option Outcome Matrix。只有独立治理为硬约束的目标才参与可行性过滤；只有逐目标比较规则、覆盖与认识论基础一致时才能形成支配关系。输出保留非支配集合和不可比较项，不合成家庭总效用。权重／优先级必须来自独立接受的价值 Claim，且 Comparison、Recommendation、Selection、purchase 与 Authorization 分离。

可选 Value Clarification Dialogue Profile 允许 Agent 针对当前 tradeoff 提出决策相关、最小负担且可拒答的问题。Question Proposal 的决策影响、queue eligibility、delivery permission、privacy 和 neutrality 分别评估。精确回答最多形成带主体／情境／用途／期限的 candidate Value Claim，仍需独立接受；沉默、超时、点击、行为模式和一次回答都不能自动外推为永久偏好或家庭共识。

可选 Reusable Value Rule Profile 把已经明确接受的局部价值关系包装为有 identity、revision、Authority activation、pause／retirement／supersession、validity、review、context 与 exception 的可复用规则。每次 comparison 仍需 Use Assessment；只有精确 active、current、in-effect 且 applicable 的规则才能抑制完全等价的问题。模式不会自激活，个人规则不会扩大成家庭共识，冲突规则不会按时间／频率／置信度自动选赢家，复用结果也不产生 Selection 或 Authorization。

可选 Change Impact Revalidation Profile 把 world／design／knowledge-correction／governance／evidence-availability change 组成带时间的 Household Change Set，并仅沿制品声明的 identity、applicability、model input、geometry/material、subject/population、evidence、evaluation、Authority、privacy 与 lifecycle dependency 做有限闭包。逐制品 Assessment 区分 unaffected、仍有效、需 review／revision、新 identity、historical-only、not-usable 与 indeterminate；它不采用全局 home version，不改写历史，也不自行执行 follow-up。

可选 Agent Orientation Snapshot Profile 为一个已准入 target Agent 按 audience／purpose／scope／`as_of`／Authority 生成不可变最小化披露。它组合 World View、当前相关制品、开放工作、Change／Revalidation、历史 summary 和 retrieval handle，并为每个必需 domain 声明 complete／partial／withheld／unavailable／not-applicable／indeterminate coverage 与 unresolved registry。Snapshot 与 RO-Crate、Task Checkpoint、私有记忆、Lease 和 Authorization 分离；缺失／隐藏不能推断不存在，Use Assessment 合格也只允许定向理解。

可选 Semantic Capability Negotiation Profile 把 Agent compatibility 展开为 implementation／build／environment 绑定的 Profile-version-role 资格：transport parse、schema validate、round-trip preserve、semantic consume／produce／evaluate、procedure adapter 与 runtime execute 分别判断。Requirement Set 指定用途所需 roles、invariants、最低 evidence、extension／proof／offline policy 和允许降级；Assessment 逐项输出 qualified／limited／not-qualified／indeterminate。Opaque relay、mediator 和 refusal 必须显式，结果只输入 Agent Admission compatibility，不产生 trust、access、Lease 或权限。

可选 Deliberation Closure Profile 把一次有界商议的议题依据、interaction Records 与分别生效的结果制品组合成 Closure Assessment。它是回执，不是 Authority 来源。Intent adoption／revision、candidate rejection、time-bounded tolerance Claim、deferral policy、raising-policy revision 与 target correction 分别保留自己的内容、权限、时间和血缘；一次商议可以有多项效果。`closed_without_decision`、`expired`、沉默或关闭 UI 不产生同意、拒绝或容忍。汇总 closure 未知不回滚已经通过自身机制生效的效果。

### Authorization Decision

Policy Evaluator 对 Action Proposal 作出的允许、拒绝、需要确认或无法判定结果，并带有适用约束和 Authority Epoch。

### Evidence Standing Decision

在 Record 进入 Resolver 前产生的 Profile 局部决定：`admitted`、`excluded` 或 `indeterminate`。它绑定来源、证据使用权限、目标命题、用途、过程、时间与可选资质，只回答“能否参与解析”，不回答“命题是否真实或充分”，也不授权行动。

该决定必须与原始 Record 分开，并以 RFC 8785/SHA-256 摘要绑定完整 Record Body。`admitted_assertions` 只开放具名字段；一条 Record 自报 `standing_status`、proof 验证或资质状态不能产生准入，只有 Record ID 相同也不能把旧决定带到变化后的内容。

### Coordination Assessment

可选 Shared Action Coordination Profile 对一个精确 Action Proposal revision 产生的类型化 Record。它绑定经 Authority 从影响条目映射出的协调主体与 Duties、回答、委托、用途、时间、policy 与 Authority Epoch，结果为 `not_required`、`pending`、`satisfied`、`rejected` 或 `indeterminate`。`satisfied` 只表示 Proposal 可以继续进入 Policy Evaluator，不等于 `allowed`。

### Bounded Impact Closure Assessment

可选 Bounded Impact Closure Profile 对一个精确 Action Proposal revision 产生的类型化 Record。它验证具名 coverage policy 要求的影响通道，是否分别由正确过程、当前报告和足够时间范围覆盖。结果为 `complete_for_declared_channels`、`partial` 或 `indeterminate`。它保留物理、隐私、资源、控制利益等通道中的影响条目，但不生成参与权、同意或授权。

### Procedural Requirement Set

可选 Impact Procedure Mapping Profile 把一份声明通道完整的影响闭包，映射成由行动侧系统承担的异质程序性要求集合。要求可以是取得肯定回答、提供咨询机会、开放异议窗口、投递通知、取得限定专业复核、追加审计或显式 `none`。参与者可以只由 Proposal 作用域不透明 slot 表示；slot 不是身份、成员关系、在场、监护或持久委托。映射完成不等于要求已经履行，也不等于授权。

### Procedure Fulfilment Assessment

可选 Procedure Fulfilment Profile 对一份精确 Requirement Set、Proposal revision、Authority Epoch、时间与工作流阶段求值。它保留每项要求的 `fulfilled`、`pending`、`negative`、`unfulfilled`、`indeterminate` 或 `not_due` 状态，并只输出进入 Authority 的先行 gate。`requirements_pending` 不是 Authorization Decision；全部已到期要求履行也只表示可以继续策略求值。

### Action Trace

连接意图、提案、授权、下发、应答、物理观测、影响评估、目标评估、用户确认和恢复记录的版本化不可变聚合视图。迟到 Record 产生新修订；底层事实仍由不可变 Claim 和 Record 支撑。

## 建模约束

### Agent Admission 组合对象

Agent Admission 不扩张概念内核。Admission Request、Admission Decision 与 PoP Lease 是交换／Authority 投影：Request 中的 Agent Instance Handle 是不可信关联标签；Decision 中的 Subject 由 Authority 分配；Lease 把该 Subject 绑定到精确 audience、Policy、Epoch、有效期和实例密钥。能力声明、主体、密钥绑定、厂商身份与人类操作者不得合并。

### Agent Continuity 组合对象

Continuity Checkpoint 与 Continuity Decision 同样不扩张概念内核。Checkpoint 是由家庭从 Claim、Record、Plan、Proposal、World View、Assessment 与 Action Trace 重新物化的目标专用投影；Decision 是独立 Authority 制品。Task ID／revision 表示工作 lineage，不表示 Agent 身份。Delegated acting 分别记录 current actor 与 responsible subject，历史 actor 只保留来源意义。

### Task Lineage 组合对象

Task Definition 与 Task State Assessment 是可选 Profile 制品，不是新 Core 实体。Task Definition 的身份基础绑定家庭、精确 Intent、用途、发生实例和不可变范围；Agent 与 Plan 可在同一血缘中变化。Routine 是实例化 policy，每个已接纳 occurrence 是独立 Task；时间 occurrence 保留原 recurrence identity，事件 occurrence 使用 Authority 认可的 correlation key。拆分子项、合并结果和范围变化的 superseding 工作使用新 Task ID。Task State 绑定精确定义、上一状态、证据和 Authority Epoch；它不等于 Proposal、Attempt、物理结果或授权。

可选 Work Realization Routing Profile 对 adopted Intent 的一次精确 realization 输出 `direct_proposal_eligible`、`task_required` 或 `indeterminate`。边界不是工作大小或 Intent persistence，而是 accepted policy 是否要求工作身份跨 Proposal／Action Trace 存续。Routine occurrence、既有精确开放 Task、retry/resume、wait/dependency、handoff、多个 Proposal、durable progress 或独立退出条件按 policy 路由到 Task。direct route 只省略 Task materialization，不省略 Plan reasoning、Proposal、impact、coordination、Authority、safety 或 outcome gate。

1. 物理资产、产品型号、数字端点和功能位置不得使用一个实体混合表示。
2. 三维几何、照片、设计图和模型输出作为制品、观测或 Claim 来源，不天然拥有最高权威。
3. 偏好、预测和计划必须带认知依据，不能伪装成观测事实。
4. 原始敏感证据可以依法或依策略删除／加密销毁，但应留下可审计墓碑。
5. 数据库表、类和 API 可以合并实现概念，但对外契约必须保留这些语义区别。
6. 不得把不同主体的 accepted 偏好合成为隐式 `HouseholdPreference`；折中值只能作为带来源的候选 Proposal 或显式家庭选择 Claim。
7. 不得把在场、成员身份、房间归属或影响条目直接当成协调参与资格；影响覆盖与 Authority 程序映射必须分开。
8. 程序性义务由希望行动的系统承担，不能把被询问者建模为必须回答；通知、沉默、复核和肯定回答也不能互相替代。
9. Agent 接力不得复制私有推理、源 World View 或源 Lease；目标必须独立准入、按自身用途重新解析，并对新输出承担独立归属。
10. 不得用 Agent、Plan、Proposal 或 Attempt 标识 Task；不得从单次 Attempt 失败推出 Task 失败，也不得从 Task 完成推出永久真理或新的行动权限。
11. 不得把话语、个人 Preference、accepted Goal Claim、Routine 模式或 Agent 推测直接提升为家庭 Intent；Intent 采纳、履行、Task 派生和 Proposal 授权必须分别求值。
12. 不得把 observed pattern、schedule tick、原始 event、Forecast、Routine activation 或 Task materialization 直接提升为行动权限；trigger 与 condition、delivery ID 与 occurrence key、false 与 unknown、catch-up 与 resume 必须分别表示。
13. 不得把 activity、presence、occupancy、访客、宠物、policy、Forecast 与 declared control mode 压成一个全局家庭 mode；Situation Claim acceptance、subject coverage、condition use、Routine activation、Task 与 Authorization 必须分别求值。
14. 不得把 accepted 目标、情境适用、当前满足、冲突、优先级、Need、Intent 与 Authorization 合并；规则或 context 缺失不表示 unconditional 或 false，个人适用性也不能合成家庭 Preference。

## Cross-Agent work composition

When portable work is fulfilled by multiple Agents, HWM models a `Work Composition Plan`, content-bound `Work Slot Assignment` artifacts, and a `Work Composition Assessment`. These are optional coordination artifacts rather than Core entities. Data dependency, Agent capability, Admission, disclosure, responsibility, Authority, output acceptance, Plan integration, Task closure, and Intent fulfillment remain independent. No dependency edge transfers a caller's identity, Lease, access, or permission.

Purpose-bound disclosure is represented by a `Disclosure Requirement Set`, `Disclosure Package Manifest`, and `Disclosure Minimization Assessment`. They are optional privacy contract artifacts, not Core household entities. “Minimized” is relative to an exact purpose, output contract, policy, candidate transformation set, time, and known auxiliary context; it is not a global Boolean property of data.

Agent write-back is modeled as immutable `Contribution Submission`, purpose-bound `Contribution Admission Assessment`, and append-oriented `Contribution Publication Receipt`. They do not create mutable facts. Publication exposes an artifact as a possible resolver input; a later World View independently determines epistemic reliance. Concurrent transports merge immutable artifact sets and surface identifier/digest conflicts rather than resolving semantic conflict by arrival order.

Entity identity is evaluated through a typed `Identity Alignment Request`, admitted `Identity Evidence Bundle`, and `Identity Alignment Assessment`. EntityRef equality is not identity proof. Physical assets, function positions, product models, endpoints, spaces, representations, Authority subjects, pet subjects, and observation tracks retain distinct kinds; replacement, realization, representation, instance-of, topology, and substitutability remain non-identity relations.

Multi-source geometry uses immutable `Spatial Frame Definition`, evidence-bound directional `Spatial Registration`, and purpose-specific `Spatial Use Assessment`. Coordinates and geometry are assertions in a frame, not the Space itself. Transform paths are qualified by exact revisions, axes, units, scale, time, domain, correspondences, calibration, cycle consistency, and propagated uncertainty; HWM defines no universal canonical household frame.

Multiple system effects are evaluated through a `Joint Influence Scenario`, `Composition Model Specification`, and `Joint Prediction Assessment`. Exogenous baseline, component main effects, interactions, controller coupling, shared-resource effects, aggregate joint prediction, realized outcome, and causal attribution remain separate. Superposition is a validated domain claim, never a default operation.

Forecast-supported preparation uses a `Readiness Objective Specification`, `Preparation Window Plan`, and `Readiness Planning Assessment`. Demand, system response, and readiness hold/decay windows remain separate from Task occurrence, Proposal dispatch, physical effect, and later activity realization. Eligibility produces Plan/Proposal candidates only and grants no action authority.

Active calibration uses an `Experiment Objective`, `Commissioning Experiment Plan`, and `Experiment Run Assessment`. Information value, design fitness, per-trial Proposal/Authorization, Attempt, Observation, dataset fitness, model update, validation, and commissioning acceptance remain separate; adaptive design never inherits prior trial authority.

Procurement uses an immutable `Commercial Offer Snapshot`, `Procurement Bundle Requirement`, and `Procurement Candidate Assessment`. Product Model, regional variant/SKU, seller listing, Offer, cart, order, delivered item, Physical Asset, and Digital Endpoint remain distinct. Qualification ends at shortlist and transfers no shopping session, payment, fulfilment, ownership, or installation authority.

可选 Physical Asset Onboarding Profile 继续把交易／履约事件、家庭接收与数量、精确 variant、单元身份、状态验收、安装阶段、功能位置实现、Digital Endpoint 关联、commissioning readiness 和运行准入分轴保存。Assessment 可以形成带有效时间的 typed relation Claim candidate，但接入完成不证明产权、合规、需求满足、commissioning 成功或控制权限；替换产生新 Physical Asset，退货与移除只终止旧关系而不改写历史。

可选 Profile Composition and Conformance meta-Profile 不扩张家庭世界本体。Profile Descriptor、Conformance Set 与 Composition Assessment 描述规范自身：Base Exchange Set 只含 Core、RO-Crate 与 Authority 的精确 v0.1 契约；用途化 Set 再锁定领域 Profile、依赖、artifact、semantic role、证据与降级。组合闭包、包声明、Agent capability、独立实现证据、trust 和 Authority 分离。
