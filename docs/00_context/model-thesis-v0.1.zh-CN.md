# Home World Model 论纲 v0.1

- 状态：解释性讨论论纲
- 日期：2026-07-19
- 英文规范文本：[`model-thesis-v0.1.md`](model-thesis-v0.1.md)
- 规范权威：无；以精确 Core、Profile 与 Conformance Set 文档为准

## 核心主张

家庭智能的公共基础不应是某个 Agent 的记忆，也不应只是设备连接图。它应该是一份由家庭控制、可移植、能被不同获授权 Agent 读取和质疑的知识历史：主张了什么、依据什么、对谁及何时适用、是否允许行动，以及行动后实际发生了什么。

我们把承载这份历史的最小架构称为 **Home World Model（HWM）**。

## 为什么连接还不够

Matter、KNX、Home Assistant 与 Web of Things 可以识别端点、暴露能力和传递命令；BIM、IFC、BOT、Brick 可以描述建筑与拓扑；SOSA／SSN 可以描述观察；PROV-O 可以描述来源。HWM 应复用它们，而不是替代它们。

问题出现在 Agent 跨越这些边界时：灯具可以报告 `on`，阅读面仍然太暗；产品可以宣称800流明，安装后的房间却有不同表现；视觉模型可以提出“某人进入空间”，却不能证明身份、意图或行动权限；设备应答可能到达，物理效果却没有出现；纠正也不能在更换 Agent 或平台后消失。

缺失的共同对象不是另一套通用设备协议，而是家庭知识与决定在设计、施工、调试、运行、替换和迁移中的可问责连续性。

## 正常形

HWM 的概念核是：

`H = (EntityRef, Claim, Record | Authority)`

- **EntityRef** 是稳定句柄，不证明身份同一。
- **Claim** 是带归属、作用域、时间与认知依据的不可变命题。
- **Record** 是对观察、行动、证明、授权、修订或删除的不可变描述，不是物理事件本身。
- **Authority** 是可见性、证据使用、解析与行动的治理上下文；它不是普通家庭数据，也不能由 Agent 自行创建。

三个行为契约让概念核可以在 Agent 间使用：Claim Envelope 交换 Claim 与后续 Evidence Link；World View 为一个 requester、purpose 与时间解析获授权知识；Action Trace 分开 authorization、dispatch、acknowledgement、observation、effect、goal、resource use 与家庭 acceptance。RO-Crate 提供 package binding。

七条规则维持模型：**referential humility**、**append-only history**、**typed non-transmutation**、**bounded resolution**、**separated action outcomes**、**exact optional composition** 与 **governed evolution**。换成直白语言：标识保持谦逊；历史只追加；派生不静默改变类型；解析受用途／时间／Authority 限定；行动结果分离；可选语义通过精确 Profile 组合进入；规范演化与证据、发布、采用分开。

## 家庭闭环

模型在不制造真相的情况下闭合：

`现实事件 → Record → 有界证据决定 → Claim 与 Evidence Link → World View → Proposal → Authorization → Attempt 与报告 → Action Trace → 追加的纠正或学习制品`

每个箭头可以过滤、聚合或派生；每个结果都是新的、有归属并带本层绑定与限制的制品。签名不等于真相；准入证据不等于证据充分；accepted View 不等于全局真相；Proposal 不等于 permission；permission 不等于物理安全；acknowledgement 不等于 observation；effect consistency 不等于 goal satisfaction；goal satisfaction 也不等于家庭接受。

这是核心互操作承诺：两个 Agent 内部可以用不同推理方式，但都不能抹掉这些可观察区别。

## 三维家庭与学习效果

三维表示很重要，但最初是一种 view 或 artifact，不是房屋本身。图纸、BIM、手机扫描、视觉定位和用户标注可以贡献绑定坐标系、registration、时间、procedure 与 uncertainty 的空间 Claim。Agent 可以提出有界互动问题确认可见关系；确认只增强被询问的精确命题，不证明全部坐标、对象身份或未来条件。

设备影响同理。厂商声明、仿真、相似安装与 commissioning measurement 是不同证据基础。安装响应模型可以描述灯光、窗帘、HVAC 或热水循环在记录条件下如何影响一个有界 feature。多设备需要显式 interaction model，不能默认效果线性相加。学习得到的局部模型仍然版本化、按用途限定并可修订。

因此项目不是在 digital twin 和 lived evidence 中二选一，而是允许多个表示共存，并记录每个表示何时适合某项决定。

## 人、宠物与时间

人、宠物、活动、presence 与 routine 不是赋予 Agent 家庭画像权力的通用 Core class。它们可以由外部词汇、EntityRef、作用域 Claim 和可选 Profile 表达。视觉 track 不是人；检测到一个 subject 不代表关闭家庭 occupancy；pattern 不是 Intent；Forecast 不是 trigger；Routine 是 Authority 激活的 Task 实例化 policy，不是学到后自行行动的习惯。

这仍允许有用的预备智能。Agent 可以根据 qualified Forecast、响应延迟、衰减、资源约束和误判 policy，为热水循环、HVAC 或照明形成有界 Plan。Plan 保持可取消并需另行授权；预测不会获得隐式控制权。

## 装修与采购

施工前，模型可以连接家庭目标与设计方案而不假装确定。“足够亮”仍是家庭目标；operationalization proposal 把测量标准、遗漏、procedure 与 reviewer 显式化。产品声明和仿真成为 qualified prediction，不是安装事实。方案可以被比较为 feasible、dominated、non-dominated 或 incomparable，而不制造隐藏家庭总效用分数。

商业 Offer 是时间、区域、variant 与 bundle 限定的快照。Product Model、Offer、订单、交付 Physical Asset、安装资产、Endpoint 与 commissioned function position 是不同身份。购物 Agent 可以展示候选，但选择、购买、安装验收和行动授权仍然分开。

## 开放的究竟是什么

HWM 不是单体 ontology，而是小型 Base Exchange 与可选、精确版本化的 Profile。Package 或 Agent 必须声明支持的 Conformance Set、版本、语义角色和证据。未知可选语义只能按 Set 规则 opaque preserve 或拒绝，不能静默丢弃或假装理解。

正常形给可选工作8个挂接位置：refer／align、capture／admit、resolve／project、deliberate／plan、authorize／coordinate、attempt／assess、package／negotiate、evolve／revalidate。成功的 Profile 可以永久保持可选；流行度、实现数量或采用不会把它晋升为 Core。

## 什么会推翻或改变这份论纲

若一个精确、反复出现的区别无法通过外部标准、`EntityRef + Claim + Record + Authority`、现有契约、可选 Profile、composition、adapter、empirical validation 或 governance 表达，并且省略它会让符合 Base 的实现对相同 bytes 得出实质不兼容的含义，论纲就必须改变。

即便如此，反例也只产生 Core candidate；接受、发布、独立实现证据和外部采用仍然分开。反过来，若新场景无法归入7条规则或8个扩展位置，它会重开解释正常形，不能为了维持漂亮数字而强行归槽。

当前测试由项目自己维护，只证明内部可执行一致性，不证明社区共识、生产安全、真实家庭有效性或独立互操作。外部异议是需要保留和分类的证据，不是一场必须赢得的考试。

## 建议的共同基础

我们提议的共识小于对某个 Agent、ontology、数据库、自动化平台或完美 digital twin 的共同选择：

1. 家庭知识应在设备、平台和 Agent 更换后继续存在。
2. Claim、evidence、resolution、authorization 与 outcome 应保持可区分和可归属。
3. 已有标准能够提供领域含义时，应直接复用。
4. 家庭披露与行动始终受 purpose 与 Authority 限定。
5. Model 与 prediction 只有在 applicability 与 uncertainty 可见时才有用。
6. 可选创新应可组合，而不静默扩大共享 Base。
7. 规范应可证伪、可做减法、可纠正且不重写历史。

如果不同生态能同意这个基础，就不需要同意 LLM 内部如何推理；只需共同保存家庭以后能够检查、迁移、质疑和纠正的内容。
