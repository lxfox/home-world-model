# ADR-020：把 Task 身份绑定到 Intent、发生实例和范围

- 状态：提议
- 日期：2026-07-19
- 英文为规范文本
- 英文规范：[`ADR-020-bind-task-identity-to-intent-occurrence-and-scope.md`](ADR-020-bind-task-identity-to-intent-occurrence-and-scope.md)

## 背景

Agent Continuity 已携带 `task_id` 和 `task_revision`，但这两个字段不能证明 Agent 变化前后的工作为什么还是同一个 Task。若把 Plan、Proposal、Agent 会话、周期模板或一次执行 Attempt 当成 Task，身份会被运行时绑定，完成和失败也会被错误传播。

## 选项

1. 让每个 Agent 或工作流引擎自行定义 Task 身份；
2. 用当前 Plan 或执行 Agent 标识 Task；
3. 把 Task 增加为通用 Core 原语；
4. 定义可选 Profile，把身份基础绑定到家庭、精确 Intent、用途、发生实例和不可变范围。

## 决定

采用选项 4，作为 Profile 讨论候选。

Task Definition 使用稳定身份基础和追加式内容修订。Plan 和 Agent 可在同一血缘中变化；Intent、用途、发生实例、家庭或不可变范围变化时必须使用新 Task ID。周期发生实例相互独立；重排时间仍保留原发生实例身份。

拆分产生新子 ID，合并产生新结果 ID，范围变化的替代任务产生新 superseding ID。Task State 是单独的内容绑定 Assessment。完成要求所有强制退出条件有证据且已满足，并且没有开放 Attempt。终态转换和重开都追加记录，并在适用时绑定旧状态和 Authority 决策。

## 理由

这是在不把 HWM 变成工作流引擎的前提下，让 Agent 独立连续性可以被证伪的最小模型。它复用 iCalendar 的身份行为、RFC 9253 的关系和 PROV 派生，同时保留 HWM 的证据与 Authority 边界。

## 后果

- Continuity checkpoint 可以绑定精确 Task Definition，而不是信任裸 ID；
- 单次派发失败不再自动使 Task 失败；
- “已完成”成为某时点的有证据判断，而非可覆盖的全局真理；
- 拆分、合并、替代、周期和重开都可审计；
- 实现需要维护内容摘要和追加式历史；
- Task Lineage 仍不是 Core 必选原语。
