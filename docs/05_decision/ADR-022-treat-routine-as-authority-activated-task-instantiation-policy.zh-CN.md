# ADR-022：把 Routine 定义为 Authority 激活的 Task 实例化策略（中文镜像）

- 状态：Proposed
- 日期：2026-07-19
- 决策范围：HWM 可选 Profile；不扩张 Core
- 英文规范：[`ADR-022-treat-routine-as-authority-activated-task-instantiation-policy.md`](ADR-022-treat-routine-as-authority-activated-task-instantiation-policy.md)

## 背景

Intent Commitment 已回答家庭采纳什么结果，Task Lineage 已回答一次有界工作的身份，但模型仍未回答 persistent Intent 何时应创建下一次 Task。旧文本只把 Routine 称为 recurrence template，没有区分观察到的习惯与已激活 policy、trigger 与 eligibility condition、事件投递 ID 与逻辑 occurrence，也没有说明错过 trigger 是否允许补跑。

如果把这些合并，就会退回常见自动化运行时的假设：`trigger + current condition → action`。对可移植家庭模型而言，这会在重试或 Agent 更换时重复建 Task、断线恢复后执行过期工作、把 unknown 当 false、让学习模式自行激活，或绕过 Proposal-specific Authority。

## 决策

1. 把 Routine 定义为可选、经 Authority 激活的 **Task 实例化策略**，不新增 Core primitive。
2. 分开 Observed Pattern Claim、persistent Intent、Routine Definition、Routine Activation State、trigger evidence、eligibility assessment、occurrence、Instantiation Decision、Task、Plan、Proposal、Authorization 与 Attempt。
3. 一个 Routine Definition 只面向一个 persistent Intent lineage，并绑定家庭、目标 Intent ID、用途和 Task 范围组成的不可变身份基础。
4. 精确 Intent revision、外部 trigger/eligibility 规范、occurrence policy、Task exit criteria、迟到 policy 与 overlap policy 是受治理的 Routine revision 内容。
5. 同一 Routine 修订必须有连续 revision、精确上一版内容和 Authority continuity decision；身份基础变化创建新 Routine。
6. 激活使用独立 Authority Activation State。候选 Definition、重复行为、accepted Pattern Claim、日历条目、Agent 建议或 persistent Intent 都不会自动让 Routine active。
7. 实例化时目标 Intent 必须当前为 `adopted` 且 `persistent`。Routine activation 不能覆盖 Intent suspension，也不能用 recurrence 制造 persistence。
8. 绑定外部 trigger 语义，不定义通用 rule DSL。Trigger 只产生求值机会；eligibility 在声明时点针对用途化 World View 独立评估。
9. 保留 `not_matched`／`not_satisfied` 与 `indeterminate`。未知、过期、冲突或不可用输入不能静默变成 false 或 true。
10. 时间 occurrence 使用原始 recurrence identity 与时区；事件驱动 occurrence 使用 Authority 认可的 correlation policy。
11. CloudEvents `source + id` 只表示投递 duplicate identity。一个 occurrence 可以产生多个事件，因此它不能代替逻辑 occurrence key。
12. 迟到必须显式且有界（`skip`、`latest_only`、`bounded_each`）；重叠必须显式（`independent`、`suppress_while_active`、`defer_while_active`）。重新激活不隐含补跑。
13. 逻辑 materialization key 由家庭、Routine ID 与 occurrence key 组成，并跨同一 lineage 的 revision 生效。同 key／同 Task 是 duplicate；同 key／不同 Task 是 integrity conflict。
14. Routine 不能通过 overlap handling 取消或替代旧 Task；Task transition 仍独立并受 Authority 约束。
15. 合法 Instantiation Decision 只创建一个 Intent、occurrence、用途、范围与 exit criteria 均匹配的精确 Task Definition，不创建 Plan、Proposal、命令、Attempt 或 Action Authorization。
16. Routine Definition、activation transition、Decision 与 Task binding 全部追加保存；后续 policy 修订不改写旧 Decision 或已有 Task。

## 标准依据

[RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html) 把 `RECURRENCE-ID` 固定为原实例时间，改期后仍保持稳定；[RFC 8984](https://www.rfc-editor.org/rfc/rfc8984.html) 提供 JSON recurrence rule、排除、override、时区与 recurring Task。它们解决 recurrence 表示与身份，不解决家庭 Authority 或 Task 物化。

[CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) 要求每个 distinct event 的 `source + id` 唯一，并允许重投复用，同时明确一个 occurrence 可以产生多个事件。因此投递去重与 HWM occurrence correlation 必须分开。

[W3C RIF-PRD](https://www.w3.org/TR/rif-prd/) 形式化 production-rule condition/action 与冲突消解；[Home Assistant](https://www.home-assistant.io/docs/automation/basics/) 从实践上分开 trigger/condition/action，其 [run modes](https://www.home-assistant.io/docs/automation/modes/) 也明确重复 trigger 行为。HWM 把它们作为边界证据，但将 action firing 保留在 Task、Proposal 与 Authorization 之后。

[W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) 提供 policy 与 constraint 等可复用语义，但不会让 Routine activation 等同 Action Permission。

## 拒绝的替代方案

- **学习到行为就自动创建 Routine：**描述性模式既不是家庭承诺，也不是权限；模型误差会在 Authority 复核前产生物理后果。
- **在 Routine 内直接编码设备动作：**会把 Intent、Task、Plan、Proposal、安全、协调与 Authorization 压成厂商脚本。
- **用 schedule time 或 CloudEvent ID 当 Task identity：**改期必须保留 occurrence，重试不能重复建 Task，多个事件也可能描述一个逻辑 occurrence。
- **假定 exactly-once：**底层标准不提供端到端 exactly-once；HWM 改用追加式 Decision 与逻辑 materialization key。
- **恢复后总是补跑：**过期家庭工作可能不安全、打扰或浪费；catch-up 必须显式且有界。
- **让新 occurrence 替代 active Task：**overlap policy 不能静默执行 Authority-controlled Task transition。

## 后果

- Agent 可以交换工作为何、何时产生，而无需共享调度器实现；
- 家庭更换 Agent 或自动化运行时时可以保留 occurrence identity，并避免重复 Task；
- 学习到的 Routine 仍可作为候选，但保留人／Authority 边界；
- 实现需保存更多显式状态：精确 policy revision、activation、evidence、as-of condition、occurrence key、lateness、overlap、deduplication 与 Task binding；
- Profile 有意选择 fail-closed indeterminacy，而不是最大化自动执行；
- Home Assistant、Matter、cron、workflow 或 event 系统需要 adapter；其原生 automation identity 不自动等于 HWM Routine 或 Task identity。

## 验证与撤销条件

当前证据包括 Routine Instantiation 夹具的 55 个语义案例、18 个模型边界案例、74 个禁止推断、精确跨制品摘要链、strict schema 与独立 Python reader。

若独立实现证明以下任一项，应拒绝或修订本决策：外部 recurrence/event language 无法保留 occurrence identity；逻辑 materialization key 无法跨 scheduler、Agent 与 Definition revision 避免错误合并；persistent Intent 与 Routine activation 无法操作性分离；有界 catch-up/overlap 必须嵌入完整 workflow engine；已有标准提供等价的家庭 Authority、evidence、logical occurrence、Task lineage 与 Action Authorization 边界；或社区用例要求一个 Routine 原子地产生多个无关 Intent，此时必须重新讨论 one-Intent identity，而不能静默扩张。
