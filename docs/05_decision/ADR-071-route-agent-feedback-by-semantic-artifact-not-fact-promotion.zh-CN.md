# ADR-071：按语义 artifact 路由 Agent 回流，而不是升级为事实

- 状态：作为系统模型边界接受；无 Core 或 Profile 变化
- 日期：2026-07-19
- 英文规范文本：[`ADR-071-route-agent-feedback-by-semantic-artifact-not-fact-promotion.md`](ADR-071-route-agent-feedback-by-semantic-artifact-not-fact-promotion.md)

## 背景

最初产品直觉把经视觉或用户确认的模型内容描述为“升级为事实”，纠错时再“降级”。既有 HWM contract 表明，confidence／confirmation ladder 会混淆多种不同产物：private task reasoning、Observation、action acknowledgement、household attestation、candidate proposition、derived Assessment、contribution admission 和 purpose-bound World View acceptance。

审计还发现 scope drift：下游 relation、reuse 与 View-selection exploration 进入了有界 empty-selector Core candidate 的规范 README，尽管这些 artifact 被排除在 Manifest 与 external trial 之外。自洽的 governance model 必须让有界 proposal 保持有界。

## 决策

1. 按 output 的 semantic product 路由，不按模型 confidence 或通用 promotion level 路由。
2. task-local hypothesis 保持 ephemeral；不把 chain-of-thought 或 private scratch reasoning 持久化为 household knowledge。
3. 视觉／sensor event 表达为 attributed Observation Record；另行形成的 durable proposition 是带显式 derivation 的 candidate immutable Claim。
4. device acknowledgement 表达为 Attempt／acknowledgement Record，不证明 physical effect、causality、goal satisfaction 或 user acceptance。
5. household response 表达为 exact-target Attestation Record，具有 `confirms`、`refutes`、`corrects` 或 `cannot_tell` 语义。无法恢复精确 binding 的自然语言同意不能进入 epistemic resolution。
6. source binding、evidence-use permission 和 Evidence Standing 分别评价。用户确认不是 objective measurement、他人 preference、exact pose 或 persistent causality 的通用合格证据。
7. derived qualification、relation、fit 或 applicability result 路由为 typed Assessment，不是 Claim。
8. durable Agent artifact 通过 Model Contribution Admission 提交。receipt、admission、publication 都只创建 candidate input，不写 truth。
9. `accepted`、`contested`、`unknown`、`not_verified` 只在 named Resolver policy 下的精确 World View 中取得；status 永不修改 Claim。
10. refuting Record 不生成 negated Claim。correction 产生新 response Record 与 candidate correcting Claim；qualified supersession 只影响后续 View，不删除历史。
11. 从 empty-selector candidate 规范 README 移除下游 relation／reuse／View-selection exploration；在独立证据支持单独 proposal 前，只保留为显式非规范系统探索。

## 后果

- “升级”变成由不同 immutable artifact 和 decision 组成的可观察 pipeline，而不是一个 knowledge cell 的 mutation。
- 用户可以确认自己实际体验的精确内容，而不会意外认证更宽的技术 proposition。
- Agent output 可以回流 household model，同时保留 attribution、contestability 与 correction。
- 24个 executable routing case 组合既有 Profile，不增加 Core 或 optional Profile artifact。
- 有界 Core candidate 重新与其五输入 external trial 和精确 wire counterexample 一致。
