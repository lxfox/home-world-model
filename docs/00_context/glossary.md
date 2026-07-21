# 术语表

英文术语与字段名以 [`Home World Model Core v0.1`](home-world-model-core-v0.1.md) 为规范文本。本表用于统一项目内部中文讨论，不单独扩张 Core 词汇。

| 术语 | 定义 | 关键边界 |
| --- | --- | --- |
| Home World Model（HWM） | 面向家庭持久知识的组合式互操作 Profile | 不是 Agent 内部模型，也不是设备协议 |
| Agent Capability Offer / Admission Request | Agent 声明所支持 Profile、规范化、证明套件、实例密钥绑定及所请求用途／动作的短期请求 | 是不可信输入；可解析不等于可信、可访问或可行动 |
| Agent Instance Handle | 请求方提供的会话关联标签 | 不是 Authority 分配主体，也不证明密钥、厂商或操作者身份 |
| Agent Admission Decision | Authority 对精确请求、兼容性、实例绑定与授权范围的内容绑定结果 | 不增加第五种授权结果；兼容性与授权是独立轴 |
| PoP Lease | 绑定 Authority 主体、audience、策略、Epoch、时间与实例密钥的短期凭据 | 不是 bearer token；View、提案与执行权限不得相互推导 |
| Continuity Checkpoint | 家庭为已独立准入的目标 Agent 重新物化的短期、目标用途任务投影 | 不是上下文窗口、私有记忆、授权或事实证明；只含持久、可归因且对目标可见的制品 |
| Continuity Decision | Authority 对精确 Checkpoint、源／目标准入、actor、责任主体、目标 Lease 与切换状态的内容绑定决定 | Checkpoint 不能自证可用；沿用四种 Authority 结果 |
| Current Actor / Responsible Subject | delegated acting 中实际执行者与其所代表的责任主体 | delegation 不是 impersonation；历史 actor 不形成权限并集 |
| Exclusive Cutover | 已知源 Lease 失效且目标 Lease 激活后，对指定执行路径建立的排他接力 | 不声称离线瞬时撤权；token exchange 本身不撤销源 token |
| Intent Definition | 把 Goal、Requirement 与 Constraint 绑定为声明式“要什么结果”的可修订候选制品 | 不表达如何实现；存在、accepted 或由 Agent 创建都不表示家庭已采纳 |
| Intent Commitment Status | Authority 是否对精确 Intent Definition 保持 `proposed`／`adopted`／`suspended`／`retracted`／`superseded` 承诺的追加式 Assessment 轴 | 与 fulfillment、Task、Proposal 和 Authorization 分离 |
| Intent Fulfillment Status | 依据 expectation evidence 对 Intent 当前结果的独立 assurance 轴 | persistent `fulfilled` 只是时点快照；不表示承诺结束或未来永久满足 |
| Observed Pattern Claim | 对家庭行为、时间或环境重复性的描述性／预测性 Claim | 可以支持候选 Routine，但不能自行形成 persistent Intent、Routine activation 或行动权限 |
| Routine Definition | 面向一个 persistent Intent lineage 的 Authority-governed Task 实例化 policy | 不是习惯、日历条目、Task、Plan 或设备 automation；只定义何时评估创建工作 |
| Routine Activation State | Authority 对精确 Routine Definition 的 `proposed`／`active`／`paused`／`retired`／`superseded` 状态 | 与 Intent commitment、Task State 和 Action Authorization 分离；resume 不隐含 catch-up |
| Routine Instantiation Decision | 对一个 occurrence 的 trigger、eligibility、lateness、overlap 与 logical deduplication 的追加式结果 | `materialized` 只创建一个精确 Task；event delivery ID 不是 occurrence key，也不表示 dispatch |
| Situation Claim | 对活动、在场、占用、关系或聚合的主体／空间／时间／用途限定 Claim | 是普通 Claim 的 Profile 用语，不是新 Core 类；传感器事件、模型标签、schedule、Forecast、policy 或 mode 不会自动成为现实情境 |
| Situation Use Assessment | 把精确 World View、外部 query、subject coverage 与正交状态绑定后得到的 `satisfied`／`not_satisfied`／`indeterminate` 结果 | 可输入精确 Routine condition；不激活 Routine、不创建 Task，也不授权行动 |
| Declared Control Mode | 报警器或自动化系统声明的 `home`／`away` 等控制状态 Claim | 不是实际 occupancy、activity、identity 或 household-wide truth；全局家庭模式被拒绝为规范模型 |
| Applicability Rule Claim | 说明一条 Preference／Goal／Requirement／Constraint Claim 在哪些精确条件下被考虑的普通不可变 Claim | 规则缺失不表示 unconditional；Agent 编写或学习到的规则不会自动获得 standing |
| Contextual Applicability Assessment | 绑定精确目标／Rule Claim Body、World View、条件 Assessment、用途、时间、Epoch 与覆盖后得到的 `applicable`／`not_applicable`／`indeterminate` 结果 | 与 satisfaction、conflict、priority、Need、Intent 和 Authorization 分离；旧 World View `conflicting` 只是有损兼容投影 |
| Operationalization Proposal | 把一条已接受目标及其原始表达映射为用途／阶段绑定的候选 criteria、过程、覆盖、角色、遗漏与开放问题 | 是可审阅提案，不是家庭原意、已接受 Evaluation Specification 或 fit 结果 |
| Operationalization Review | 对精确 Proposal revision 的语义忠实度、覆盖、过程、角色、许可、歧义与遗漏作目的化评估 | `eligible_for_acceptance` 不等于 Authority 已接受规范，也不等于目标满足 |
| Option Outcome Matrix | 在一个精确比较上下文中，把每个方案对每个适用目标的用途化 Assessment、认识论基础、覆盖、不确定性与比较规则绑定成矩阵 | 不把不同目标、人员或单位压成家庭总效用分 |
| Option Comparison Assessment | 在已接受硬约束和逐目标比较规则下，给出可行性、pairwise relation、非支配集合与不可比较状态 | 非支配不等于最佳、推荐、选择、公平或授权 |
| Clarification Question Proposal | 绑定当前 tradeoff、未解决关系、回答含义／后果、决策影响、负担、注意力、隐私、中立性、opt-out 与期限的提问提案 | 决策相关不等于允许打断或投递 |
| Value Response Interpretation | 对精确 Question／Response binding 的主体权限、准入、时效、范围与用途作评估 | 最多允许创建有限 candidate Value Claim；不自动接受、外推或授权 |
| Value Rule Definition | 把一条被明确接受的价值关系限定到主体、决策领域、关系类型、目标范围、用途、情境、例外、有效期与 review 的可复用规则定义 | 历史模式与 Agent 提案不能自激活；每个 Definition revision 独立激活 |
| Value Rule Use Assessment | 将精确 active Definition／State 与一次 comparison、当前情境、主体、用途、时间、冲突和例外绑定的三值适用性判断 | 只可抑制完全等价的问题；不产生 Recommendation、Selection 或 Authorization |
| Household Change Set | 把世界、设计、知识纠正、治理或证据可用性变化及其 effective／observed／record time、before／after 与 standing 组合成不可变集合 | 不是全局 home version，也不把 correction 当作物理变化 |
| Artifact Revalidation Assessment | 沿完整的显式 typed dependency closure，分别判断精确制品的 identity、assumption、evidence、governance、privacy 与 current-use impact | 当前失效不改写历史；结果只要求 follow-up，不执行或授权 follow-up |
| Agent Orientation Snapshot | 为精确 target Agent、audience、purpose、scope、`as_of` 与 Authority 生成的不可变最小化披露投影，逐领域声明 coverage、未决项和来源闭包 | 与 RO-Crate、World View、Task Checkpoint、私有记忆和 Authorization 分离；遗漏不表示不存在 |
| Orientation Use Assessment | 在读取 Snapshot 前评估完整性、Admission／Lease、Trust／Epoch、purpose、freshness、coverage、unresolved registry、source closure、disclosure 与 change currency | 合格只允许声明范围内的定向理解，不接受所有 Claim 或转移权限 |
| Agent Capability Offer | 绑定 implementation／build／environment 的 Profile-version-role、semantic invariant evidence、extension behavior、domain adapter、runtime status、期限与限制声明 | self-declared 不能自证 standing；parse／validate／consume／produce／evaluate／execute 分离 |
| Capability Qualification Assessment | 将精确 Offer 与用途化 Requirement Set 比较后，逐 capability 给出 qualified／limited／not-qualified／indeterminate 和显式 degradation | 只输入 Agent Admission compatibility，不建立 trust、identity、access、Lease 或 Authorization |
| Need（会话用语） | 人或应用对“当前值得关切之事”的自然语言简称；若进入交换层，必须落为有 issuer 和认知依据的具体 Preference／Goal／Requirement／Constraint 或候选 Intent Claim | 不是 Agent 可自行建立的特权事实，也不从 Situation 或 applicability 自动推出 |
| Task Definition | 推进精确 Intent Definition revision 的有界工作 lineage | Agent 与 Plan 可变；Intent 内容、occurrence 或不可变范围变化产生新 Task |
| Task State Assessment | 对精确 Task Definition、退出条件、Attempt 和证据的追加式生命周期判断 | Attempt 失败不等于 Task 失败；完成不授权行动 |
| Household Knowledge Package | HWM RO-Crate Profile 的讨论用简称 | 打包复用 RO-Crate；不要求包含全部高频遥测 |
| EntityRef | 指向某个讨论对象的 RDF／JSON-LD 标识 | 不是 HWM 本体类；不自动证明同一性或等价性 |
| 功能位置角色（`Functional Slot` 迁移标签） | 长期存在的家庭功能或安装角色 | 由生命周期 Profile 绑定 IEC 81346 参考代号系统；不是 HWM Core 类；与资产、产品型号和端点身份分离 |
| Physical Asset | 由 SAREF／BOT／Brick／IFC 等外部词汇表达的具体物理设备 | HWM 不建立别名；可替换、有自身生命周期 |
| Product Model | 直接复用 Schema.org `ProductModel` 等产品种类／数据表描述 | 商品候选不是已购买 Physical Asset，也不自动拥有 Digital Endpoint |
| Design Option | 装修规划 Profile 中把候选产品、功能位置、安装方式和模拟输入组合起来的 `prov:Plan` | Profile 约束其闭合成员与分支，不建立 HWM 本体类，也不表示已经安装 |
| Design Context | Claim 所属基础设计、方案分支或显式比较的线格式绑定 | 认知依据回答“如何知道”，Design Context 回答“在哪个规划世界”；不得隐式跨分支合并 |
| Dependency Closure | 解释或重新生成某规划结果所需的方案、基础设计与上游输入的传递闭包 | 链接完整不等于依赖当前可用；当前比较还要求分支共享同一个基础根 |
| Historical Only | 沿袭完整且历史可解释，但因依赖非当前而不得进入当前推导的 Profile 结果 | 不是删除、错误或 Core 时间状态；旧输出继续保留但不得自动继承 |
| Rebase | 创建新方案 revision，使其显式派生自新基础设计，并重新生成下游结果 | 不是修改旧方案，也不是把旧模拟结果换一个 revision 标签继续使用 |
| Requirement Evaluation | 某个方案针对声明要求的 EARL Assertion／TestResult outcome | 模拟 `passed` 不等于建成后的实测合规或 Goal Evaluation |
| Recommendation | 比较活动生成的建议性结果；外部投影可用 Schema.org `Recommendation` | 不等于家庭选择、购买、授权、安装或派发；该 Schema.org 类型当前仍属 `new` |
| Household Choice | 家庭成员通过 Schema.org `ChooseAction` 从显式 `actionOption` 中选择 `object` | Completed choice 不推出 `BuyAction`、所有权、安装或执行权限 |
| Selection State | 从不可变选择 Claim 的 `dcterms:replaces` 图按 View `as_of` 解析出的当前规划偏好 | `ChooseAction` 是历史事件；当前状态不是可覆写事件字段；分叉或环必须显式暴露 |
| Recommendation Admission | 装修规划 Profile 对外部候选推荐输入证据的封闭集合准入判断 | 只判断是否可接纳，不定义排序算法；任一输入不完备时产生零推荐 |
| Planned Load Allocation | 在某规划上下文中分配给功能位置或候选范围的商品目录初筛数量 | 不是安装负载、最大需量、回路容量、保护配合、验证或合规证明；`reservedLoad` 已被拒绝 |
| Electrical Design Assessment | 基于具名电气量、作用域、假设、方法与规范版本产生的设计判断 | 设计通过不等于安装验证或属地合规；输入缺失时必须保持不确定 |
| Digital Endpoint | 可通过网络观测或控制的接口 | 一个资产可有多个端点 |
| Feature of Interest / Measurement Zone | 直接复用 SOSA／SSN Feature of Interest，并可叠加 BOT／Brick 区域类型 | 例如阅读区照度，而非仅“传感器数值” |
| Claim | 不可变并带时空、声明来源与认知边界的命题 | 声明来源不等于已认证；接受与否由具体 World View 决定 |
| Accepted Fact（讨论用语） | 某 World View 在具名 Resolver 策略、用途、时间和 Authority 下认知状态为 `accepted` 的命题 | 不是 `Fact` 类或 Claim 永久状态；新证据产生新 View，不修改 Claim |
| Epistemic Basis | Claim 的认知依据 | 声明、观测、推断、预测、计划、模拟或学习 |
| Record | 对观测、行动、确认、修订或删除的不可变记录 | 携带声明来源和完整性方式，但不独自证明来源或内容为真 |
| Evidence Link | 独立标识的 Record—Claim 支持、反驳、确认或撤回关系 | 可追加，不属于不可变 Claim Body |
| Evidence Standing Decision | Authority-plane 对一条精确 Record 内容在具名用途下哪些断言字段可参与后续求值的准入决定 | 与原始 Record 分离；绑定内容摘要、Epoch、时间、proof／source／use 结果和 grant；不表示真实或充分 |
| Authority | 信任锚、授权、约束和解析规则组成的治理上下文 | Agent 不能自行提升权限 |
| Authority Trust Root | 验证方带外固定并在本地持久保存的 Authority 根 lineage 制品 | Genesis 不能自证；轮换需旧根与新根阈值；未预承诺恢复时重新注册产生新 lineage |
| Root Version | Trust Root lineage 内严格顺序递增的连续性版本 | 与 Authority Epoch 不同；不能用最高版本或最新时间自动解决分叉 |
| Authority Epoch | 用于表示授权版本并限制离线旧授权的纪元 | 可与有界租约配合 |
| Authority Profile | 对用途化披露、许可、禁止、确认 Duty、Epoch 和 Lease 的最小治理 Profile | 不定义家庭权力创世或完整宪法 |
| Lease | 把主体、audience、Policy 与有效期绑定的有界授权 | 到期限制离线过期授权暴露 |
| Confirmation Duty | 在允许下发前必须由指定主体或角色完成的确认职责 | 未满足时为 `confirmation_required`，不是设备失败 |
| Evidence Resolver | 把知识包和授权实时证据解析成 World View 的角色 | 不负责选择行动 |
| World View | 面向特定请求者、用途与时间的自包含家庭知识投影 | 只物化获准披露的候选值；默认不是建议或授权 |
| Candidate | World View 中获准披露的候选宾语／值及其可见来源 | 隐藏 Claim 不得通过 Candidate 泄露 |
| Availability Status | Resolver 能否取得或披露所需知识 | 区分可用、未观测、源不可用和无权访问 |
| Epistemic Status | Resolver 对可用知识的认知判断 | 区分接受、争议、未知、未验证和未评估 |
| Freshness Status | 结果对当前 View 时间要求的新鲜度 | 与真假、可用性和适用性分离 |
| Temporal Status | 解析命题依其 `valid_time` 在 View `as_of` 是否生效 | 与证据新鲜度分离；`current` 不推出 `in_effect` |
| Applicability Status | 偏好、要求或约束在当前上下文是否适用／冲突的判断 | 不代表事实真假、数据新鲜度或授权决定 |
| Agent Planner | 根据 World View 形成 Action Proposal 的角色 | 规划算法不属于 HWM Core |
| Action Proposal | Agent 提出的待评估行动 | 不代表已获授权 |
| Policy Evaluator | XACML Policy Decision Point 的项目内通俗名称 | 与 Planner 分离，不建立 HWM 本体类 |
| Authorization Decision | 允许、拒绝、需要确认或无法判定等结果 | 不代表设备已执行 |
| Action Trace | 从意图到恢复的可追溯行动链 | 不使用单一总体成功值 |
| Effect Assessment | 物理观测是否与影响模型相符的判断 | 与目标是否满足分离 |
| Goal Evaluation | 行动结果是否满足目标的判断 | 与用户是否接受分离 |
| Resource Assessment | 实际资源消耗是否满足资源约束的判断 | 与物理效果和家庭目标分离 |
| User Attestation | 用户对事实、结果或体验的确认／反驳记录 | 可支持新 Claim，但不是绝对真理 |
| Interaction Challenge | Agent 为收集狭窄证据而发起的具名确认 episode，可包含视觉展示或获准设备动作 | 必须绑定精确命题；设备应答、物理效果与用户回答彼此分离 |
| Evidence Origin | 多个 Record 共同派生自的原始证据来源标识 | 同一帧经多个模型处理仍是一个来源，不能伪装成独立证据 |
| Semantic Profile | 对特定领域词汇、约束和行为的版本化组合 | 例如空间、设备身份、简单行动—影响 |
| Durable Claim | 值得跨会话、设备或平台保存的 Claim | 不等同于实时状态流 |
| Live Telemetry | 高频、持续变化的运行数据 | 通常保留在外部授权数据源 |

### Work Composition Plan（工作组合计划）

绑定精确工作依据、用途、不可变修订、类型化 work slots、最小披露、无环数据依赖和集成条件的可移植制品。依赖图不传播身份、信任、Lease 或权限。

### Work Slot Assignment（工作槽分派）

把一个精确计划修订中的 slot 绑定到 Agent 实例、能力资格、准入、披露决定、输入摘要和必要权限决定的制品。分派不等于委托行动，也不等于接受输出。

### Work Composition Assessment（工作组合评估）

逐槽记录提交、验证、证据适格性、依赖释放和失败分类，并独立给出整体集成状态的制品。slot 成功不等于 Task 完成或 Intent 达成。

### Disclosure Requirement Set（披露需求集）

由精确消费方、用途、语义操作、输出契约、数据精度／粒度／新鲜度和保留／转发／训练／日志限制组成的内容绑定请求。请求者声明不证明必要性或 Authority 许可。

### Disclosure Package Manifest（披露包清单）

逐项绑定来源、变换、语义损失、剩余精度、必要性依据，并声明整包推断／联结风险、覆盖、到期和输出限制的不可变制品。

### Disclosure Minimization Assessment（披露最小化评估）

在精确用途、policy、候选变换集、时间和辅助信息下判断披露包是否充分、逐项必要，且是否不存在已知的更低风险合格候选；不表示绝对最小，也不授权访问或行动。

### Contribution Submission（贡献提交）

把 Agent、actor、责任主体、工作输出、用途、制品摘要、依赖、来源、认知依据和期望发布关系绑定起来的不可变追加请求；接收不等于准入。

### Contribution Admission Assessment（贡献准入评估）

判断精确提交能否作为声明 resolver／purpose 的候选输入；与 schema、签名、证据适格性、World View accepted、治理采纳和行动授权分离。

### Contribution Publication Receipt（贡献发布回执）

证明精确摘要已追加到具名包 revision 和可见用途范围的回执；不表示全部副本已有内容，也不修改既有 World View。

### Identity Alignment Request（身份对齐请求）

把两个 EntityRef、各自实体类型、家庭、用途、时间、所需强度、标识 namespace、policy 和预期后果绑定起来的比较请求。

### Identity Evidence Bundle（身份证据包）

汇集带 Standing、时间、namespace、冲突／重分配风险与 Evidence Origin 的标识、物理挑战、commissioning、替换、密码学及声明证据；共同来源不得重复计权。

### Identity Alignment Assessment（身份对齐评估）

输出 `same_entity`、`distinct_entities`、`related_not_identical`、`unresolved` 或 `integrity_conflict` 的类型化、用途化、时间化判断；不静默合并引用或转移属性和权限。

### Spatial Frame Definition（空间框架定义）

绑定 frame 身份／revision、原点、锚点、轴、手性、单位、尺度、维度、有效时间和来源的不可变制品；frame 不是 Space 本身。

### Spatial Registration（空间注册）

以明确方向、变换类型、控制实体、适用域、有效时间、residual 和不确定性连接两个精确 frame revision 的证据化制品。

### Spatial Use Assessment（空间使用评估）

沿显式 registration path 传播源位置与每条变换的不确定性，并对照精确用途、时间和容差输出 qualified／limited／not-qualified／indeterminate；不证明身份、性能、安全或权限。

### Joint Influence Scenario（联合影响场景）

绑定参与设备／选项、动作与控制轨迹、目标、时间、空间、初态、外界 baseline、边界条件、共享资源和交互 registry 的不可变场景。

### Composition Model Specification（组合模型规范）

声明 direct joint model、validated superposition、interaction residual、conservative envelope、scenario ensemble 或 not-composable，并绑定组件、交互、控制、资源、协方差、适用域和联合验证。

### Joint Prediction Assessment（联合预测评估）

判断精确组合场景的预测是否满足用途；组件合格不推出组合合格，联合预测也不分配因果贡献或授权行动。

### Readiness Objective Specification（就绪目标规范）

绑定精确 Intent／target、受益范围、属性、空间、目标窗口、容差、持续时间、资源、副作用和评价方法的操作化准备目标。

### Preparation Window Plan（准备窗口计划）

把 Forecast demand window、系统 response window 与 hold／decay window 组合成 earliest/latest start、检查点、停止、no-return、误判代价、取消和补偿分支的 Plan 候选。

### Readiness Planning Assessment（就绪规划评估）

判断准备 Plan 是否可进入 Proposal 阶段；结果不创建 Task、不 dispatch，也不授权行动。

### Experiment Objective（实验目标）

绑定决策相关模型缺口、estimand／hypothesis、覆盖、所需不确定性降低、接受标准和累计风险／扰动／资源／隐私预算。

### Commissioning Experiment Plan（Commissioning 实验计划）

声明 baseline、参与设备、测量、confounder、trial／自适应策略、washout、停止、累计预算、数据政策和逐 trial 治理的不可变计划。

### Experiment Run Assessment（实验运行评估）

逐 trial 分离授权、Attempt、Observation、偏差、standing、数据质量、停止和恢复，并独立判断数据集与模型更新资格。

### Commercial Offer Snapshot（商业报价快照）

绑定商家、listing、精确 variant、成色、数量、包含物、价格／税费／物流、库存、区域、交期、保修退货和有效期的不可变市场观测。

### Procurement Bundle Requirement（采购套装需求）

绑定 Design Option 的数量、可接受 variant、安装约束、附件／hub／服务／订阅／认证／commissioning、交期和 lifecycle contingency。

### Procurement Candidate Assessment（采购候选评估）

判断精确 Offer 是否可进入 shortlist；不执行排名、选择、加购、付款、履约、安装或授权。

### Acquisition Event Record（取得事件记录）

对下单、支付、发货、送达、家庭接收、验收、退货、退款或处置中的一个精确事件所作的不可变断言；每种事件保持独立。

### Asset Onboarding Bundle（资产接入证据包）

把一个候选 Physical Asset 与取得依据、单元标识、状态、安装、功能位置、端点及来源／standing 证据绑定的用途化输入；不是产权登记或可变资产护照。

### Asset Onboarding Assessment（资产接入评估）

分别评价取得、收货数量、variant、单元身份、状态、安装、功能位置、端点、commissioning readiness 和运行准入的不可变回执；任一轴不能替其他轴作证。

### Profile Descriptor（Profile 描述符）

内容绑定一个精确 Profile 版本、artifact／semantic roles、依赖、冲突、schemas／oracles、不变量、扩展行为与发布证据的不可变规范元数据。

### Conformance Set（符合性集合）

为一个用途、audience 与 exchange operation 锁定 Base Exchange Set、精确 Profiles、激活依赖、artifact／role、证据等级、offline／extension policy 和显式降级的不可变契约。

### Composition Assessment（组合评估）

判断一个 Conformance Set 的 descriptor、依赖、版本、冲突、artifact、role evidence、offline resolution 与降级是否闭合；不证明 Agent 能力、包内事实、信任或权限。
