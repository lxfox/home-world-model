# 关系模型

> 关系以 Claim 表达，并由 Profile 映射到现有标准词汇。下列英文名是讨论用语，不自动成为新的 HWM Core 词汇。

## 空间与生命周期关系

| 关系 | 含义 | 约束 |
| --- | --- | --- |
| `locatedIn` | 对象位于某空间或区域 | 不建立 HWM 别名；按 Profile 使用 Brick `hasLocation`、BOT containment 或 IFC 空间包含关系，并保留有效时间 |
| `adjacentTo` / `contains` | 空间拓扑关系 | 直接使用 BOT／IFC 等现有词汇 |
| `fulfills`（拒绝） | 该通用候选关系不进入目标 Core | 它混合资产—功能实现、需求满足、候选兼容与身份；现有谓词只作为迁移兼容投影 |
| 资产—功能实现绑定（Profile 角色） | 物理资产在某时段参与实现 IEC 81346 绑定的功能位置 | 必须带有效时间和来源；允许多对多；精确 IEC 关系编码等待许可条款审查；不推出需求满足或兼容证明 |
| `exposes` | Physical Asset 暴露 Digital Endpoint | 端点重建不代表资产替换 |
| DCMI `replaces` / `isReplacedBy` | 新对象替代旧对象 | 直接复用 DCMI；不自动推出两者等价 |
| 通用 `equivalentTo`（拒绝） | 该候选关系不进入 Core | 严格同一、替代表示、词汇映射和用途限定可互换性必须使用不同的窄关系 |
| `affects` | 行动或设备影响 Feature of Interest | 应连接影响属性与上下文 |
| `observes` | 传感器／过程观测 Feature of Interest | 需要测量过程、单位和时间 |

## 证据与来源关系

| 关系 | 含义 |
| --- | --- |
| `supports` | Record 增强某 Claim 在给定作用域内的可信度 |
| `refutes` | Record 提供与某 Claim 相反的证据 |
| `confirms` | 授权主体对 Claim 或结果作出确认 |
| `retracts` | 发布者或授权主体撤回 Claim |
| PROV-O `wasGeneratedBy` | Record 由某过程、设备、Agent 或人生成 |
| PROV-O `wasAttributedTo` | Claim／Record 归属于某发布者或责任主体 |
| PROV-O `wasDerivedFrom` | Claim 或制品从其他证据推导而来 |

`supports`、`refutes`、`confirms` 和 `retracts` 是具有自身标识、来源和创建时间的 Evidence Link，不属于不可变 Claim Body。`supersedes` 则是新 Claim 指向旧 Claim 的显式 Claim 间关系。

来源关系不直接等于真实性。Resolver 必须结合 Authority、时间、Profile 和冲突规则生成 World View 状态。

在使用可选 Evidence Standing Profile 时，来源认证、证据使用权限、Evidence Link 关系和 standing grant 必须分别求值。`attestedBy`、角色标签、家庭 admin 权限或已验证职业凭证都不会单独推出 Record 适格，更不会推出 Claim 为真。

## 规划、授权与行动关系

| 关系 | 含义 |
| --- | --- |
| `basedOnView` | Action Proposal 基于哪个 World View |
| `reliesOnPlanRevision`（Profile 角色） | Proposal／Task／Decision 实际依赖哪个精确 portable Plan revision；不得引用私有 prompt 或让后续 Plan revision 追溯改写旧 Proposal |
| `proposes` | Planner／Agent 提出 Action Proposal |
| `evaluatedUnder` | Proposal 在哪个 Authority Epoch 与策略下评估 |
| `authorizedBy` | Dispatch 依据哪个 Authorization Decision |
| `dispatchesTo` | 指令发往哪个 Digital Endpoint |
| `acknowledges` | 设备或网关确认收到／执行指令 |
| `assessesEffectAgainst` | 物理观测与哪个 effect Claim 比较 |
| `evaluatesGoalAgainst` | 实际结果与哪个 requirement／goal Claim 比较 |
| `attestedBy` | 用户对事实或体验作出确认、拒绝或修正 |
| `affectedSubject`（Profile 角色） | 声明某主体会受到精确 Proposal 的某类实质影响；必须来自显式或可审计影响过程，不能只按家庭成员或在场推断 |
| `mapsImpactToProcedure`（Profile 角色） | Authority policy 把某个影响条目映射为系统承担的程序性要求或显式 `none`；不表示要求已履行或行动已获准 |
| `routesViaSlot`（Profile 角色） | 程序要求通过 Proposal 作用域不透明 slot 送达或接收 Record；不表示身份、成员、在场、监护或持久委托 |
| `coordinatesUnder`（Profile 角色） | Proposal revision 依哪个 coordination policy 求值；不表示偏好已被合并或行动已获准 |
| `adoptsIntentDefinition`（Profile 角色） | Authority Decision 采纳哪个精确 Intent Definition；不表示 expectation 已满足或任一 Proposal 已授权 |
| `advancesIntentDefinition`（Profile 角色） | Task Definition 推进哪个精确 Intent Definition revision；后续 Intent revision 不重定向已有 Task |
| `activatesRoutineDefinition`（Profile 角色） | Authority Decision 激活哪个精确 Routine Definition；不表示目标 Intent 已采纳之外的状态，也不授权设备行动 |
| `evaluatesRoutineOccurrence`（Profile 角色） | Instantiation Decision 针对哪个 Routine lineage occurrence key 求值；event delivery ID 不能代替逻辑 occurrence key |
| `materializesTaskDefinition`（Profile 角色） | Instantiation Decision 物化哪个精确 Task Definition；同一 materialization key 只能绑定一个 Task，且不推出 Plan、Proposal 或 dispatch |
| `routesIntentRealization`（Profile 角色） | Work Routing Assessment 把 adopted Intent 的一次精确 realization 路由为 direct Proposal eligible 或 Task required；只决定是否需要持久工作身份，不创建 Task／Proposal 或权限 |
| `qualifiesSituationForUse`（Profile 角色） | Situation Use Assessment 把精确 World View resolution 与外部 query／subject coverage 绑定为条件结果；不推出 Routine activation、Task 或 Authorization |
| `qualifiedBy`（Contextual Applicability Profile 角色） | Applicability Rule Claim 把目标 Preference／Goal／Requirement／Constraint Claim 与显式 `all_of`／`any_of`／`unconditional` 条件规则关联 | Rule 自身必须独立接受；规则缺失不表示 unconditional；不推出 Need、Intent 或权限 |
| `assessesContextualApplicability`（Profile 角色） | Applicability Assessment 把精确目标／Rule Claim Body、World View 与条件 Assessment 绑定为三值相关性结果 | satisfaction 与 conflict 分开；`applicable` 不推出优先级、家庭承诺、Proposal 或 action |
| PROV-O `wasRevisionOf` | 新 Intent Definition 与上一版保持来源连续；是否仍属同一 Intent 还需 HWM identity basis、Authority 与 expectation lineage 约束 |

## 业务不变量

1. 通用 `fulfills` 不得成为目标谓词；资产—功能实现、Goal Evaluation、候选考虑、安装位置和身份关系必须分开。
2. Digital Endpoint 的应答不能推出物理效果已经发生。
3. 物理结果符合预测范围不能推出家庭目标已经满足。
4. 目标满足不能推出用户接受，用户接受也不能修改测量结果。
5. Evidence Link 必须指向不可变 Claim 与 Record，并保留自身来源；`supersedes` 必须显式识别新旧 Claim。
6. `basedOnView` 必须能追溯到 View 的用途、时间、覆盖范围和 Authority Epoch。
7. 未知关系或扩展在往返读写中必须保留；不能理解时应报告能力缺口。
8. 不得用通用 `equivalentTo` 混合表达严格同一、替换、替代表示、词汇映射或特定用途下的可互换性。
9. Evidence Standing 不得建模为 actor 的全局分数；同一主体对自身偏好、第一手体验、客观测量和专业验收可以分别得到不同结果。
10. `Accept`／`Reject` 回答必须绑定精确 Proposal revision；coordination `satisfied` 不得推出 Authorization `allowed`、安全通过或结果接受。
11. 受影响实体不得直接推出投票或回答义务；程序 Duty 由希望行动的系统承担，且通知、咨询、异议、复核与肯定回答不得互相替代。
12. Preference、Goal Claim 与 Intent Commitment 不得合并；Intent adoption 不等于 fulfillment，二者也都不推出 Task 完成或 Proposal 授权。
13. Observed Pattern、Routine activation、trigger evidence、eligibility、occurrence admission 与 Task materialization 不得合并；Routine revision／pause／retirement 不得改写旧 Decision、取消已有 Task 或产生 Action Authorization。
14. Observation、Situation Claim、declared control mode、policy window、Forecast、用途化 acceptance 与 condition qualification 不得合并；单个主体、没有事件或访问拒绝不能推出家庭整体 mode、absence 或行动权限。
15. 目标 Claim acceptance、Applicability Rule standing、context condition、三值 applicability、satisfaction、conflict、priority、Need、Intent 与 Authorization 不得合并；`conflicting` 只能作为旧有损投影，不能作为规范单轴状态。
