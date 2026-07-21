# HWM Work Realization Routing Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)

## 目的

本可选 Profile 判断一项 Authority-adopted Intent 的有界 realization 是否需要持久 Task lineage，或者可以直接进入一个精确 Action Proposal candidate。

规范链是：

`adopted Intent + 已接受 Work Routing Policy Claim + 精确 realization 描述 -> Work Routing Assessment`

Profile 不增加 Core Work、Job 或 Project 原语。它只组织下游制品，绝不授权行动。

## 边界是持久工作身份

“小事／大事”不是可互操作语义。真正问题是：工作身份是否需要跨越一个 Proposal 及其 Action Trace。

- `direct_proposal_eligible`：一个精确 Proposal 足以表达完整的有界 realization，且 policy 不要求持久进度、重试、等待、交接、复发或独立退出条件身份。
- `task_required`：policy 要求 lineage 跨一个或多个 Plan、Proposal、Attempt、Agent、等待、重试、交接或独立评价退出条件。
- `indeterminate`：精确 Intent、realization scope、policy、工作结构或证据不确定。

direct eligibility 只允许该 realization 省略 Task Definition，不是产生效果的权限。

## Work Routing Policy Claim

其 proposition subject 是精确 Intent Definition 标识，predicate 为：

`https://homeworldmodel.org/spec/profiles/work-realization-routing/v0.1#realizedUnder`

object 声明什么情况下需要持久身份，包括 Routine occurrence、多个独立授权 Proposal、retry/resume/catch-up/compensation/recovery、异步等待、外部依赖、Agent／actor 交接、delegated responsibility、progress/cancellation/reopen/split/merge、超出一个 Action Trace 的退出条件，以及 policy 要求的审计或专业流程。

这些是声明的 policy 输入，不是通用复杂度分数。缺少 policy 绝不默认 direct；Agent 不能自称工作“原子化”来绕开 Task lineage。

## realization 与路径规则

Routing 针对一次精确 realization scope，不永久附着在 Intent 上。persistent Intent 的某次原子纠偏可以 direct，其他工作可以用 Task；transient Intent 如果涉及交付、等待、重试或交接，同样可能需要 Task。

描述绑定家庭、精确 Intent Definition 与 adopted State、用途、scope、occurrence、工作形态 Assessment、World View、时间和 Authority Epoch。scope 或工作形态变化产生新 Assessment，不改写旧 Proposal 或 Task。

- 每个 admitted Routine occurrence 必须 `task_required`。
- 精确 realization 已有开放 Task 时不能用 direct Proposal 绕过，Proposal 应绑定该 Task。
- direct route 一次最多覆盖一个有界 Proposal lineage/revision。
- direct realization 被拒绝、denied、timeout 或失败，不自动创建 retry、Task 或 Intent failure。
- 后来需要 retry/resume/handoff 时，新的 routing Assessment 可以要求新 Task。

## 不得绕过治理

两条路径都继续经过精确 World View、影响声明与 closure、coordination/procedure、Authority、local safety、dispatch、物理观察、Target Fit／Goal Evaluation 与用户 attestation。`direct_proposal_eligible` 只省略 Task materialization，不跳过 Plan reasoning、Proposal 审查、Authorization 或 safety。

可选 [Plan Materialization Profile](../../plan-materialization/v0.1/README.zh-CN.md) 独立判断该 realization 的方法是否必须可携带。direct routing 不表示 planning 只能私有；Task routing 也不表示 Plan 已经存在。

`task_required` 本身不创建 Task；必须另行物化内容绑定的 Task Definition。创建 Task 也不创建 Plan、Proposal、Authorization 或 Attempt。

## 不变量

1. Intent adoption、routing、Task materialization、Proposal、Authorization 与 dispatch 分离。
2. routing 针对精确 realization，不是永久 Intent 属性。
3. “简单”“小”、模型置信度、延迟或 token 数不是 routing rule。
4. policy 缺失或未知为 indeterminate，绝不 direct。
5. Routine occurrence 必须有 Task lineage。
6. accepted policy 要求时，retry、resume、wait、handoff、多 Proposal 或独立 exit criteria 必须 Task。
7. 已有精确开放 Task 不能被 direct routing 绕过。
8. direct route 只覆盖一个有界 Proposal，不自动重试。
9. 新发现工作形态产生新 Assessment，历史不可变。
10. 两条路径均保留影响、coordination、Authority、safety 与 outcome gate。
11. task-required 不物化 Task；direct-eligible 不创建 Proposal。
12. routing 不授权通知、行动、dispatch 或 outcome。

## 标准、证据与非目标

[RFC 5545 VTODO](https://www.rfc-editor.org/rfc/rfc5545.html) 提供持久工作 UID、revision、recurrence 与 completion；[PROV-O](https://www.w3.org/TR/prov-o/) 分离 Plan、Activity、Agent responsibility 与 provenance；[Erol、Hendler、Nau](https://www.cs.umd.edu/~nau/papers/erol1996complexity.pdf) 表明 HTN decomposition 有独立规划语义与复杂度；[Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf) 支持显式表达多实例、同步和工作流结构。HWM 只采用持久 lineage 边界，不让 LLM 凭感觉分解。

[Work Routing oracle](../../../../conformance/scenarios/work-realization-routing-v0.1/README.zh-CN.md) 测试原子 direct、等待、重试、交接、recurrence、绕过既有 Task、工作形态变化与下游治理不变量。[`Work Routing Assessment schema`](work-routing-assessment.schema.json) 固定交换边界。

本 Profile 不定义通用复杂度指标、项目管理方法、planner、workflow engine、Task decomposition 算法、Proposal identity 或行动 policy。
