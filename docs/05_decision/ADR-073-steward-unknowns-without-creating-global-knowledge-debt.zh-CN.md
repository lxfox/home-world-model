# ADR-073：治理未知，但不创造全局知识债务

- 状态：作为系统模型边界接受；无 Core 或 Profile 变化
- 日期：2026-07-19
- 英文规范文本：[`ADR-073-steward-unknowns-without-creating-global-knowledge-debt.md`](ADR-073-steward-unknowns-without-creating-global-knowledge-debt.md)

## 背景

开放世界 household model 永远会存在 unavailable、withheld、stale、contested、not-observed 等 indeterminate knowledge。把它们统称为“knowledge debt”会暗示全局 backlog、完整性目标和 Agent 降低 uncertainty 的职责，进而重新制造 ADR-072 否定的 acquisition power：gap count／age 可能成为反复提问、持续感知或与当前家庭 decision 无关实验的理由。

Agent Orientation Snapshot 已支持 purpose-bound domain coverage 与 unresolved registry；World View 声明 scope／limitation；Deliberation／interaction policy 支持 cooldown／suppression；Change Impact Revalidation 支持后续 reassessment。不需要 global Gap primitive 或 debt score。

## 决策

1. 把 unknown 视为 purpose-bound limitation，不是全局 owned task／debt item。
2. stewarded gap identity 绑定精确 unresolved proposition／question、household scope、purpose、依赖 decision／operation、time horizon 与 source-closure basis。改变 proposition／purpose 会产生不同 gap。
3. 不因 unknown 存在或未来也许有用就为某 scope 登记；要求 accepted current decision dependency 或显式 policy reason。
4. blocking 与 non-blocking gap 分别报告。blocking gap 传播 `indeterminate` 或 declared degradation，不授权 evidence acquisition。
5. 允许 dormant-until-trigger、interaction-suppressed、capture-withheld、source-unavailable 与 historical 状态，但不假装 proposition 已回答。
6. household 可以为一次精确 decision 明确接受 unknown；这关闭 decision dependency，不在全局解决 epistemic gap。
7. decision withdrawal／purpose end 可以让 gap obsolete／historical，而无需 resolve。
8. trigger、cooldown expiry 或 new evidence 只触发 reassessment，不授权 question／capture，也不自动 resolve。
9. 只有 sufficient qualified evidence 与 named procedure 支持时，才对精确 scope resolve；conflicting evidence 保持 contested。
10. 只对 exact content-bound gap identity 去重；similar wording、embedding proximity 或共享 label 不证明 identity。
11. 不从 gap age、count、recurrence 推断 priority、urgency 或 model quality。safety-labeled unknown 走显式 safety procedure，不自行获得 emergency power。
12. withheld registry 不泄露隐藏 gap identity／count。partial coverage 的空 registry 不表示 complete；complete coverage 的空 registry 只表示 declared scope 内没有 known gap。
13. Agent replacement 时从 durable artifact／coverage policy 重新物化 unresolved registry，不使用 source-Agent private memory。
14. evidence deletion／policy change 后保留 historical resolved result，current use 另行 reassess。

## 后果

- household model 可以诚实保持不完整，而不产生无限 prompt 或 surveillance pressure。
- unknown handling 成为 scoped governance／view 问题，而不是新 ontology／task subsystem。
- 30个 executable case 覆盖 relevance、blocking、degradation、deferral、suppression、denial、accepted unknown、trigger、evidence、identity、coverage 与 Agent change。
