# HWM 部署响应治理 v0.1

- 状态：Discussion Candidate
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- 决策：[`ADR-058`](../../../docs/05_decision/ADR-058-separate-harm-signals-response-eligibility-and-execution.zh-CN.md)
- Response Basis Schema：[`response-basis.schema.json`](response-basis.schema.json)

本契约把部署 outcome／incident signal 路由到有界保护、退出、修复或退役过程，但不把证据变成 Agent 的自执行权力。它组合既有 Authority、Procedure Fulfilment、Action Attempt、Effect Attribution、Outcome Closure 与 Change Revalidation，不定义新的授权系统。

完整链条是：

```text
signal
→ response-basis assessment
→ 精确 Proposal 或预授权 mandate
→ Authority decision + 不可覆盖 local safety
→ Action Attempt
→ safe-state realization assessment
→ notification / audit / repair / restoration closure
```

每个箭头都必须显式。Signal 可以要求关注但未必使响应合格；eligible 不等于 authorized，authorized 不等于 dispatched，dispatched 不等于进入 safe state，safe state 也不等于事后 Duty 已闭合。

五类响应分别是：

- `precautionary_hold`：在重大不确定性调查期间限制新增风险 dispatch，必须绑定 policy、范围、证据阈值、最小干扰 fallback、起止时间、复核 owner 与恢复／续期规则；到期触发复核，不自动恢复或静默续期。
- `emergency_stop`：由预配置 local safety mandate，或匹配精确 Authority Policy 的 verified emergency state 快速进入有限 safe state；必须绑定 trigger、target、action、比例性、时间和事后 notification／audit Duty，不能扩展到无关设备、相机、历史数据或未来行动。
- `ordinary_exit`：具名主体／adopter 行使精确退出权；范围外共享 essential function 仍需独立协调和 fallback。退出闭包分离控制停用、数据导出、prospective-use revoke、删除 Duty、依赖移除与恢复。
- `remediation`：分配 investigate／contain／repair／compensate／notify／audit／revalidate／monitor 义务，但义务不授予物理或数据 access，每次侵入操作仍独立授权、检查、Attempt 和评估。
- `retirement`：针对精确 release／service／deployment population 的计划生命周期；依赖盘点、迁移／fallback、通知、支持窗口、数据处置与 residual risk 必须闭合，公告、归档和 EOL 日期都不是退役完成。

Response Basis 的 routing result 包括 `no_response_basis`、`assessment_required`、`proposal_required`、`precautionary_hold_eligible`、`emergency_stop_eligible`、`ordinary_exit_eligible`、`remediation_required`、`retirement_preparation_required`、`denied` 和 `indeterminate`。它们不是 Core authorization，也不是 execution state。

恢复需要新的当前 Authority／safety decision、当前证据、已满足的 pre-restoration Duty 和有界 Attempt。历史 stop 不是永久禁止；续期、升级、恢复与闭包全部追加记录。

本契约不确定法律义务／责任，不诊断普遍 harm，不证明安全，不授予紧急主权、同意、家庭 access、继续运行权限、家庭信任或行动权限。

