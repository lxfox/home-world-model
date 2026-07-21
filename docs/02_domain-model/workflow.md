# 业务流程

## 运行时核心流程

```text
Household Knowledge Package + raw live Records
                         │
                         ▼
 integrity/source/use checks + Evidence Standing evaluation
                         │
                         ▼
 content-, purpose-, Epoch-, time-, and assertion-bound
                Evidence Standing Decisions
                         │
                         ▼
                  Evidence Resolver
                         │
                         ▼
                     World View
                         │
                         ▼
                    Agent Planner
                         │
                         ▼
                  Action Proposal
                         │
                         ▼
         Bounded Impact Closure (optional Profile)
                         │
                         ▼
          Impact Procedure Mapping (Authority)
                         │
                         ▼
      Procedure Fulfilment / Shared Coordination
                         │
                         ▼
                  Policy Evaluator
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
         allowed      denied      confirmation /
            │                     indeterminate
            ▼
     execution gateway → device endpoint
            │
            ▼
  acknowledgement + physical observations
            │
            ▼
 effect assessment + goal evaluation + user attestation
            │
            ▼
      Action Trace → candidate durable Claims
```

### 规则

1. View 请求必须声明请求者、用途、`as_of`、所需新鲜度与 Profile。
2. Resolver 只解析可见证据；必须通过正交轴分别表达认知 `unknown`、可用性 `not_observed`／`source_unavailable`／`access_denied` 和新鲜度 `stale`，不能把它们虚构成否定事实。
   支持 Evidence Standing Profile 时，Resolver 还只能读取由独立 Standing Decision 对完整内容摘要、目标用途、Authority Epoch、决定时间与精确断言共同绑定后准入的字段。原始 Record 不能自报准入，字段级 `admitted` 本身也不等于证据充分或结果 `accepted`。
3. Planner 必须引用所依据的 World View，并显式声明目标、前提和预期影响。
4. Policy Evaluator 独立检查 Authority、作用域、风险、确认要求和 Epoch。
   对共享影响 Proposal，支持 Bounded Impact Closure Profile 时必须先取得绑定当前 revision 的声明通道覆盖评估，再由 Authority 把每个影响条目唯一映射为由系统承担的异质程序性要求；要求可以通过不透明 slot 路由。支持 Coordination Profile 时必须取得绑定当前 revision 的履行或 Coordination Assessment；`satisfied` 只解除相应程序前置条件。
5. 只有获准 Proposal 才能进入执行网关；授权不证明执行已经发生。
6. 设备应答之后仍需独立观测物理效果，并分别进行影响模型和目标评估。
7. 用户纠正产生新的 Record／Claim，不覆盖原历史。

## 新屋设计到运行的知识流程

1. **采集空间**：导入设计模型、平面图、三维扫描或人工标注，形成带来源的 Space 与几何 Claim。
2. **定义功能位置与需求**：描述阅读灯、温控、热水循环、存在感应等长期角色，把它们绑定到项目采用的 IEC 81346 参考代号系统，并记录照度、温度、等待时间、能耗和隐私约束。
3. **规划候选产品**：在 Design Option／ChooseAction 上下文中共同引用 Product Model 与功能位置，不把候选型号提前当成已安装资产或已证明兼容。
4. **方案模拟**：通过简单 effect Claim 或外部模拟制品预测不同安装方式的效果与不确定性。
5. **安装与端点发现**：记录实际 Physical Asset、Digital Endpoint、位置、连接与版本。
6. **调试验证**：按测量过程采集实际效果，对比预测、目标与用户体验；生成 Effect Assessment 和 Goal Evaluation。
7. **持续运行**：将高频遥测留在适当运行时，仅把关键变化、校准结果和证据索引写成持久知识。
8. **替换与迁移**：新资产通过带有效时间的资产—功能实现绑定接续功能位置，资产或端点替换使用各自的显式 `replaces` Claim；新 Agent 重新解析包而不是继承旧 Agent 的隐式记忆。

## Agent 交互确认流程

当视觉或传感证据不足时，Agent 可以降级为明确交互确认，例如：“我打开了卧室小夜灯，你看到了吗？”

- Agent 的指令和设备应答进入 Action Trace；
- 用户回答作为 User Attestation Record；
- 问题必须机器绑定到精确 Claim／命题、challenge episode 与回答含义；“它”无法无歧义解析时，回答不能成为确认；
- Resolver 可以按具名策略、Authority 和用途将完整 challenge 用于支持“该端点在这次卧室测试中对应可见输出”的狭窄 Claim；
- 用户拒绝或纠正时保留原观测与反驳 Record，并生成新的解析结果；
- 用户确认不自动验证照度数值、设备身份或其他未被提问的命题。
- 同一帧经多个模型产生的报告共享一个 evidence origin，不能伪装成多份独立证据；不同 challenge episode 也不能在要求同一 episode 的策略中拼接。
- 用户被允许回答，不代表回答对所有命题都适格。本人偏好、亲眼看到的变化、客观光度测量、安装检查和电气验收必须由不同 standing grant 明确覆盖。
- 多位用户偏好不一致时不得投票决定哪条偏好“为真”。Planner 可以提出折中 Proposal，但受影响主体集合、回答规则与委托必须由具名 coordination policy 独立求值。

## Agent 准入流程

```text
最低限度发现提示
  → Agent 声明 Profile／证明能力与请求范围
  → 验证方检查带外固定的家庭 Trust Root
  → 精确版本兼容与 Agent 实例持有证明
  → 既有 Authority 求值
      ├─ denied → 不签发 Lease
      ├─ confirmation_required → 等待当前请求的用户确认
      ├─ indeterminate → 不把不可用输入解释成拒绝或许可
      └─ allowed → Authority 分配 Subject 并签发 PoP Lease
  → 验证 Lease 后只生成用途化 World View
```

原始包访问、`resolve_view`、`propose_action`、`dispatch_action` 与 `submit_record` 分别授权。Matter 节点 commissioning 不替代此流程。

## Agent 连续性流程

```text
源 Agent 将 Claim／Record／Plan／Proposal／Trace 持久化到家庭
  → 目标 Agent 独立完成 Admission
  → Resolver 为目标用途生成新的 World View
  → 家庭 continuity resolver 绑定精确 Task Definition，生成目标专用 Checkpoint
  → Authority 对精确 Checkpoint 与接力模式求值
      ├─ context_share → 两个独立 Agent 共享各自可见上下文
      ├─ successor → 目标产生带新归属的后续 revision／Proposal
      ├─ delegated_acting → 分离 current actor 与 responsible subject
      └─ exclusive_cutover → 已知源失效 + 目标 Lease active 后才 ready
  → 目标用自己的 PoP Lease 继续任务
```

源 Agent 只能提交候选持久制品或接力请求，不能替目标准入、生成 Authority Decision、转移 Lease 或宣布排他切换。私有记忆与 chain-of-thought 不进入此流程。

## Task Lineage 流程

```text
精确 Intent + 用途 + occurrence + 不可变范围
  → 创建 Task Definition revision 1
  → 计划与 Agent 可追加变化，身份基础保持不变
  → 一个或多个 Execution Attempt
  → 以精确定义、退出条件与证据生成 Task State Assessment
      ├─ mandatory criteria 未满足／不可判定 → active / waiting / blocked / indeterminate
      ├─ 全满足且无开放 Attempt → completed
      └─ Authority 转换 → cancelled / superseded / split / merged
  → 新证据或授权重开只能追加 State；身份基础变化则创建新 Task
```

Routine 是 Authority 激活的实例化 policy。每个已接纳 occurrence 创建独立 Task；时间 occurrence 改期时保留原 occurrence key 与原计划时间，事件 occurrence 使用 Authority 认可的 correlation key。拆分和合并产生新 Task ID，来源只作为血缘绑定。

## Intent Commitment 流程

```text
话语／Preference／Goal／Agent 推测
  → 生成可归属的候选 Intent Definition（what，不含 how）
  → Authority 对精确 Definition 求值
      ├─ denied → 保持候选历史，不形成家庭承诺
      ├─ confirmation_required → proposed
      ├─ indeterminate → commitment indeterminate
      └─ allowed → adopted
  → fulfillment resolver 独立求值 mandatory expectations
      ├─ not_started / ongoing / degraded
      ├─ fulfilled（时点证据快照）
      └─ indeterminate / not_fulfilled
  → Task 绑定精确 adopted Intent Definition revision
  → Plan／Proposal／Authorization 继续分别求值
```

同一 Intent 的 expectation refinement 需要精确上一版绑定、稳定 identity basis、Authority continuity decision 与完整 expectation lineage。新 revision 不修改已有 Task。暂停、撤回或替代 Intent 也只追加 commitment state；Task 取消与 Action Authorization 撤销必须分别执行。

## Routine Instantiation 流程

```text
Observed Pattern／日历／event／Forecast
  → 只能形成 trigger evidence 或候选 Routine Definition
  → Authority 对精确 Routine Definition 求值
      ├─ proposed / indeterminate → 不实例化
      ├─ paused / retired / superseded → 抑制新 occurrence
      └─ active → 继续
  → 验证精确目标 Intent 当前为 adopted + persistent
  → 在用途化 World View 上分别求值 trigger 与 eligibility
      ├─ not_matched / not_satisfied → not_eligible
      └─ unavailable / stale / conflict → indeterminate
  → 依据原 recurrence identity 或 Authority correlation policy 生成 occurrence key
  → 显式求值 bounded late policy、overlap policy 与 lineage-scoped materialization key
      ├─ expired / suppressed / deferred / duplicate / integrity_conflict
      └─ materialized → 创建一个匹配精确 Intent／Routine／occurrence／用途／范围的 Task Definition
  → Plan／Proposal／Authorization／Attempt 继续独立求值
```

恢复 active 不自动补跑暂停区间；同一 occurrence 在 delivery retry、Agent 更换或 Routine revision 后仍使用同一 materialization key。Routine 不通过 overlap policy 取消旧 Task，也不把 `materialized` 当成 dispatch。

## Situational Context 流程

```text
SOSA Observation／attestation／外部事件
  → 只作为带 phenomenon time 与 evidence origin 的 Record
  → recognition procedure 生成主体／空间／时间限定 Situation Claim
  → Evidence Standing + Resolver 生成用途化 World View
      ├─ accepted + current + in_effect + coverage complete → 可继续 query qualification
      ├─ accepted 且显式不兼容 → not_satisfied
      └─ denied／missing／unavailable／stale／contested／expired／partial → indeterminate
  → Situation Use Assessment 绑定精确 View + 外部 query + subject set
  → 可作为一个精确 Routine eligibility condition 输入
  → Routine activation／occurrence／Task／Authorization 继续独立求值
```

同一时刻可存在多条不同主体与空间的 episode；不得压成一个规范性全局 `home／away／sleep／guest` 值。声明式 away mode 是控制状态，quiet-hours 是 policy applicability，Forecast 是预测，都不是实际 activity／occupancy。episode 开放结束边界仍受 freshness 约束；结束或纠正追加新 Claim 与 View，不修改历史。

## Contextual Applicability 流程

```text
Preference／Goal／Requirement／Constraint Claim
  + 独立 Applicability Rule Claim
  → Resolver 分别解析目标与 Rule
      ├─ available + accepted + current + in_effect／unbounded → 继续
      ├─ 目标明确 expired／not_yet_in_effect → not_applicable
      └─ denied／missing／stale／contested／unknown → indeterminate
  → 绑定 Situation Use 或其他外部条件 Assessment
  → 三值规则聚合
      ├─ all_of 全 satisfied／any_of 至少一项 satisfied → applicable
      ├─ all_of 至少一项明确 not_satisfied／any_of 全部明确 not_satisfied → not_applicable
      └─ 其余／partial 非决定性覆盖 → indeterminate
  → 独立评估 satisfaction 与 conflict
  → priority／Intent／Routine／Task／Proposal／Authorization 继续分别求值
```

决定性子集允许在 `all_of` 已有一项假、或 `any_of` 已有一项真时停止披露，但不声称完整覆盖，也不泄露隐藏输入。Rule 缺失不能被当作 unconditional；不同主体的条件不能隐式激活个人目标。`applicable` 只表示当前应考虑该目标，不表示它未满足、必要、紧迫或应立即行动。

## 失败语义

- 缺少必需 Profile：拒绝兼容读取并列出缺失能力；
- 未知可选扩展：保留并继续，不能静默丢弃；
- 证据冲突：World View 返回 `contested` 与冲突集合；
- Authority 无法确认：授权返回 `indeterminate`；明确拒绝披露时 View 的可用性为 `access_denied`，数据源故障时为 `source_unavailable`，不得默认放行；
- Evidence Standing 缺少匹配 grant 时返回 `excluded`；必需身份、凭证状态或更新 Authority 状态不可取得时返回 `indeterminate`，不能用通用“可信用户”兜底；
- Standing Decision 缺失、重复、超前、用途或 Epoch 不符、内容摘要不符，或者没有准入当前求值所需字段时返回 `indeterminate`；`excluded` 只表示该 Record 不计入当前用途，不表示内容为假；
- Coordination policy 缺失、存在多条适用规则、受影响主体集合不完整或委托状态未知时返回 `indeterminate`；缺少必需回答为 `pending → confirmation_required`，不能默认放行；
- Bounded Impact coverage policy 缺失或歧义、Authority Epoch 不可用、同一通道报告冲突时返回 `indeterminate`；必需通道报告缺失、不可取得、不完整、过期、过程错误、revision 错误或时间范围不足时返回 `partial`，不得解释为无人受影响；
- Impact Procedure Mapping 对任一影响没有规则、多条规则、路由缺失／拒绝／不可取得／歧义、Proposal revision 或 Authority Epoch 不匹配时返回 `indeterminate`；不得把策略沉默解释为无需程序，也不得让 Agent 自动发明代表。
- Contextual Applicability 的目标／Rule／View／条件摘要、用途、时间、Epoch 或主体对齐不符时返回 `indeterminate`；规则缺失不表示 unconditional，条件未知不表示 false，冲突不能改变 applicability 或自动选择优先级。
- 设备无应答：记录超时，不推断物理结果；
- 没有有效物理观测：Effect Assessment 为 `insufficient_evidence`，Goal Evaluation 通常为 `indeterminate`；
- 上下文不匹配：不得用旧影响模型直接宣称失败，应返回 `context_mismatch`。

## 第一组一致性夹具

卧室阅读区域目标为至少 300 lux，`SetLevel(60%)` 的 effect Claim 预测 285–335 lux：

| 有效观测 | 影响评估 | 目标评估 |
| --- | --- | --- |
| 312 lux | `consistent` | `satisfied` |
| 295 lux | `consistent` | `not_satisfied` |
| 120 lux | `inconsistent` | `not_satisfied` |
| 无有效观测 | `insufficient_evidence` | `indeterminate` |

该夹具用于检查不同实现是否保留关键语义区别，不用于规定 Agent 应选择何种行动。
