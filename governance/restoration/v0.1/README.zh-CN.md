# HWM 分阶段恢复治理 v0.1

- 状态：Discussion Candidate
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- 决策：[`ADR-059`](../../../docs/05_decision/ADR-059-restore-through-staged-current-evidence-gates.zh-CN.md)
- Restoration Gate Schema：[`restoration-gate.schema.json`](restoration-gate.schema.json)

本契约提供从有界 hold／stop 回到运行的可审查路径，但不把时间经过、patch、风险接受、授权或一次 stage 成功当成完整恢复。它组合 [Deployment Response Governance](../../responses/v0.1/README.zh-CN.md)、Authority、Procedure Fulfilment、Action Attempt、Effect Attribution、Outcome Closure 和 Change Revalidation，只定义治理 routing result，不新增 Core action state。

链条为：

```text
exact response state
→ remediation closure
→ current risk reassessment
→ residual-risk disposition
→ restoration Proposal + procedures
→ Authority + local safety
→ bounded stage Attempt
→ stage observation gate
→ expand | hold | rollback assessment
→ final closure
```

修复者、风险评估者、风险接受者、Authority 决策者和执行者只有在 Policy 明确允许且披露 conflict 时才可兼任；即使是同一人，各 Record 仍逻辑独立。

Remediation closure 绑定全部 contain、repair、compensate、notify、audit 与 revalidation obligation；`completed` 不证明修复导致风险下降或允许恢复。Risk reassessment 绑定 stopped／proposed configuration、原始 signal、修复证据、总体、impact channel、assumption、uncertainty、环境、horizon 与时间，结果为 `reduced_with_limits | not_reduced | indeterminate | not_evaluated`。修复者自报不是默认独立 Assessment。

Residual-risk disposition 针对一个 risk bearer／Authority、范围、时间和 constraint 记录 `accepted | not_accepted | acceptance_required | indeterminate`。它是治理决定，不是技术测量，也不是每个受影响主体的同意；未知风险不能改名为 accepted。

恢复授权要求精确 Proposal／预承诺 mandate、当前 Authority Epoch、满足 pre-restoration Duty 和 local-safety clearance。旧 permission、商业紧迫、hold 到期与 operator ownership 都不产生恢复权限。

Stage 为 `diagnostic | canary | limited_capability | bounded_population | full_scope`，绑定配置、capability、总体、空间、时间、累计 exposure budget、预期／不利 observation、coverage／quality、自动 stop／rollback trigger、rollback target／verification 与下一决策 owner。`stage_passed_with_limits` 只支持新扩展决定，不能静默变成 full restoration。

Gate routing result 包括 `not_eligible`、`remediation_incomplete`、`risk_reassessment_required`、`risk_acceptance_required`、`restoration_proposal_required`、`procedures_pending`、`authorized_for_stage`、`stage_observation_required`、`expand_stage_eligible`、`hold_required`、`rollback_required`、`closure_eligible`、`denied` 与 `indeterminate`。它们都不 dispatch；`rollback_required` 也不证明 rollback 已执行。

最终 closure 需要预期 scope 已验证、Attempt 已解析、观察 horizon 闭合、post-restoration Duty 满足、限制保留、monitoring owner 和 recurrence policy。复发追加新 signal／Response Basis，不改写旧恢复记录。

本契约不证明普遍安全、零 residual risk、因果、同意、公平、法律合规、永久恢复、家庭信任、访问、继续运行或行动权限。

