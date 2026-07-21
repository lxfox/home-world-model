# ADR-028：按持久工作身份路由 Intent realization

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-028-route-realization-by-durable-work-identity.md`](ADR-028-route-realization-by-durable-work-identity.md)

## 背景

adopted Intent 可能只产生一次原子设备调整，也可能跨越时间、Plan、Proposal、Attempt、Agent、等待、重试和退出条件。每次调整都创建 Task 会把家庭生活过度项目化；让 Agent 全部直接进入 Proposal，又会绕过持久工作身份、recurrence 去重、进度、交接、取消与完成证据。

## 决策

1. 增加可选 Work Realization Routing Profile，不增加 Core Work／Project 实体。
2. 对 adopted Intent 的一次精确 realization 输出 `direct_proposal_eligible`、`task_required` 或 `indeterminate`。
3. 使用独立接受的 Work Routing Policy Claim 与精确工作形态证据，不使用 LLM 复杂度分数。
4. 边界是工作身份是否必须跨越一个精确 Proposal 与 Action Trace。
5. accepted policy 要求 recurrence identity、多 Proposal、retry/resume、wait/dependency、handoff/delegation、durable progress、独立 exit criteria、split/merge/reopen 或 Task 级审计时，必须 Task lineage。
6. 每个 admitted Routine occurrence 必须 Task。
7. 精确 realization 已有开放 Task 时不能用 direct route 绕过。
8. routing 针对 realization，不永久附着 Intent；persistent Intent 可对原子纠偏 direct，对其他工作使用 Task。
9. direct realization 的 failure/denial/rejection/timeout 不自动创建 retry、Task 或 Intent failure。
10. 新发现工作形态产生新 Assessment，可以把后续工作路由进 Task，但不改写历史。
11. direct route 只省略 Task materialization；所有 Proposal impact、coordination、Authority、safety、dispatch 与 outcome gate 保留。
12. task-required 不创建 Task，direct-eligible 不创建或授权 Proposal。

## 后果

简单家庭调整保持轻量；必须跨时间或 actor 保持的工作获得稳定 lineage。Agent 不能靠声称“原子化”逃避 Task 治理，模型也不会把每次灯光调整变成项目管理。

## 拒绝的方案

- 每个 adopted Intent 都创建 Task：混淆承诺与有界工作。
- 设备动作永远不用 Task：丢失 retry、handoff、occurrence 与 completion identity。
- 只按 transient/persistent Intent 路由：persistence 描述承诺，不描述某次 realization。
- 按估计复杂度或时长路由：模型局部、可操纵、不可互操作。
- 让 direct routing 跳过 authorization：routing 是结构，不是权限。

## 参考

- [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [Erol、Hendler、Nau](https://www.cs.umd.edu/~nau/papers/erol1996complexity.pdf)
- [Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf)
