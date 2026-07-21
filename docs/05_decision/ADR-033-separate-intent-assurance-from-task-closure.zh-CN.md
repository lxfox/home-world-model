# ADR-033：分离 Intent Assurance 与 Task closure

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-033-separate-intent-assurance-from-task-closure.md`](ADR-033-separate-intent-assurance-from-task-closure.md)

## 背景

现有 Intent 与 Task Profile 已要求 fulfillment 和 completion 需要证据，但行动管线还缺少明确整合 gate，容易把 realized Effect、satisfied Goal、fulfilled Intent、completed Task 或 successful Attempt 压成同一个 success。

## 决定

采用可选 Outcome Assurance and Work Closure Profile。一份追加式 receipt 独立报告 Intent Assurance 与 Work Closure Gate。persistent fulfillment 是有边界 compliance 快照；Task closure 取决于精确 exit criteria、已终结／已 reconciliation 的 Attempt，以及已解决的行动后义务，不直接取决于 Intent fulfillment。

receipt 不执行 Task 状态转换、不撤回 Intent、不撤销授权、不删除执行历史。direct realization 没有 Task closure state，也不能事后创建 Task。

## 后果

- 有界诊断 Task 可以完成，而上层 Intent 仍 ongoing 或 not fulfilled；
- Intent 可以 fulfilled，但 recovery、副作用、通知、audit 或验收工作仍使 Task 保持开放；
- persistent drift 追加新 assurance；
- Goal、Intent、Task 与执行界面可以展示不同但真实的状态，而非一个误导性的 success。
