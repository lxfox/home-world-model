# HWM 任务血缘 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范：[`README.md`](README.md)

## 目的

该可选 Profile 让家庭任务拥有独立于 Agent、计划、Proposal 和执行运行时的可移植身份。一个 Task 是围绕以下不可变身份基础形成的有界工作血缘：

`家庭 + 精确 Intent 绑定 + 用途 + 发生实例 + 不可变作用范围`

它不新增 Core 原语，而是组合现有 Claim、Record、World View、Plan、Proposal、Authority 决策和证据。

并非每次 adopted Intent realization 都需要 Task。可选 [Work Realization Routing Profile](../../work-realization-routing/v0.1/README.zh-CN.md) 可以判断某次精确 realization 是否可在没有持久 Task 身份时进入单一有界 Proposal。accepted policy 要求 recurrence、retry/resume、wait、handoff、多 Proposal、durable progress 或独立 exit criteria 时仍必须 Task。direct routing 不授予行动权限。

## 必须分开的对象

1. **Intent Commitment** 绑定由 Authority 采纳的声明式结果，一个 Intent 可由多个 Task 推进；Preference 或 Goal Claim 本身不是该承诺；
2. **Routine Definition** 是经 Authority 激活的实例化策略，每个已接纳 occurrence 都是独立 Task；
3. **Task Definition** 标识一条有界血缘及其退出条件；
4. **Plan** 表达方法，换计划不必换 Task；
5. **Action Proposal** 是精确的策略和协调边界，不是 Task；
6. **Execution Attempt** 是一次派发或尝试，一次失败不等于 Task 失败；
7. **Task State Assessment** 在明确时间以证据求值，不修改历史，也不授权下一次行动。

可选 [Plan Materialization Profile](../../plan-materialization/v0.1/README.zh-CN.md) 判断跨 Plan、Proposal、Agent、review、assumption 或 contingency 被依赖的方法结构何时必须成为 portable Plan。Task 可以先于 Plan 存在，Plan 变化也不改变 Task identity；私有 chain-of-thought 永远不是 Task 审计要求。

## 身份规则

- 同一 Task 的修订必须保持 `task_id`、完整身份基础及其摘要不变，并顺序绑定上一版内容。
- 更换 Agent、Plan、展示形式或非语义扩展本身不产生新 Task。
- 改变精确绑定的 [Intent Definition](../../intent-commitment/v0.1/README.zh-CN.md)、用途、发生实例、家庭或不可变范围时必须产生新 Task；同一 Intent lineage 的后续 definition revision 内容已变化，也需要新的 Task 工作。
- 相同 `(task_id, definition_revision)` 对应不同内容是完整性冲突。
- 缺少来源、证明不可用或修订断档时是 `indeterminate`。

Routine Definition 是实例化策略，不是 Task occurrence。时间 occurrence 使用稳定 occurrence key 与原始计划时间；改期时二者都保留，遵循 iCalendar `RECURRENCE-ID`。事件驱动 occurrence 使用 Authority 认可的 correlation key，也可以没有计划时间。下一次逻辑 occurrence 获取新 Task identity。[Routine Instantiation Profile](../../routine-instantiation/v0.1/README.zh-CN.md) 绑定 activation、evidence、eligibility、迟到／重叠 policy、逻辑去重与精确物化 Task。

## 拆分、合并和替代

- 拆分产生新的子 Task ID，父 Task 追加 `split` 状态；任何子项都不是原 Task 本身。
- 合并产生新的结果 Task ID，不能挑一个父 Task 冒充结果身份。
- 范围或 Intent 已变化的替代工作，创建新的 superseding Task 并精确绑定来源。
- 血缘只保留派生关系，不传播完成、授权、作者身份或证据适格性。

## 状态与完成

状态是绑定精确定义和证据的 Assessment，不是 Task 上可覆盖的字段。`completed` 要求所有强制退出条件都有证据且已满足，并且没有开放的执行 Attempt。`cancelled`、`failed`、`superseded`、`split` 和 `merged` 含义不同，必须绑定转换记录；由 Authority 控制的转换还要绑定 Authority 决策。

后来的纠错只能追加新状态。重开同一 Task 必须保持身份基础不变，精确引用旧终态并取得 Authority 决策；若身份基础已变，则是新 Task。

## 标准复用

- [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html)：复用 `VTODO`、`UID`、`SEQUENCE` 和 `RECURRENCE-ID` 的身份行为；
- [RFC 9253](https://www.rfc-editor.org/rfc/rfc9253.html)：复用父子、兄弟、先后和依赖关系，但不自动传播身份或状态；
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)：复用 Plan、修订、派生、生成和失效关系；
- [Schema.org ActionStatusType](https://schema.org/ActionStatusType)：只能作为有损展示映射，不是规范生命周期。

该 Profile 不定义通用项目管理协议、调度器、工作流引擎、规划器、法律验收规则或分布式事务。

## 不变量

1. Task 身份独立于 Agent 和 Plan 身份；
2. Intent、发生实例和不可变范围变化不能伪装成原 Task 的就地修订；
3. Routine 身份不等于 occurrence 身份；
4. 拆分和合并保留血缘，但结果不继承任一输入 Task 的身份；
5. Attempt 失败不推出 Task 失败；
6. 完成要求所有强制退出条件满足且没有开放 Attempt；
7. 终态和纠错都追加保存；
8. 重开要绑定旧终态并获得授权，不能掩盖身份基础变化；
9. Task 状态不建立全局真理、永久目标满足或行动授权。
10. Routine activation 与 occurrence admission 不建立 Plan、Proposal、dispatch 或行动授权。

验证命令见英文规范。该 oracle 是对抗性语义夹具，不代表社区已经采纳。
