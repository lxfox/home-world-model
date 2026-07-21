# ADR-058：分离 harm signal、响应资格与执行

- 状态：部署响应治理候选已接受
- 日期：2026-07-19
- 英文规范：[`ADR-058-separate-harm-signals-response-eligibility-and-execution.md`](ADR-058-separate-harm-signals-response-eligibility-and-execution.md)

## 背景

Deployment Outcome View 可以暴露副作用、不良体验、结果差异或退出失败，但负面结果只是证据，不是自执行权限。允许任何 observer／Agent 停止家庭系统会造成新风险；每次保护都等待新共识又可能延长迫近 harm。现有 Authority、Impact Procedure、Procedure Fulfilment、Action Attempt 与 Outcome Closure 已分离 policy、Duty、dispatch、effect 和 follow-up。

## 决定

1. 保留追加式链条：`signal -> qualified response basis -> response proposal/mandate -> Authority and local-safety decision -> Attempt -> effect assessment -> obligation closure`。
2. 分离五类响应：`precautionary_hold`、`emergency_stop`、`ordinary_exit`、`remediation` 和 `retirement`；它们具有不同 trigger、scope、authorization、时间、fallback 与 closure。
3. harm、差异、不满意或异常 signal 不给 Agent stop、access、repair 或 retirement 权限，只能按精确 policy 触发 Assessment 或 Proposal。
4. precautionary hold 是证据不完整时对新增风险 dispatch 的有界、可逆限制，必须有预先承诺 policy、影响范围、安全 fallback、到期／复核时间和恢复规则；它不等于 harm 已成立，也不能静默变成无限期停用。
5. emergency stop 只能来自预授权 safety controller／interlock mandate，或具有已验证 trigger、有限 target、比例化 safe state 和事后 Duty 的精确 emergency Authority Policy；紧急范围不能扩展到无关设备、数据和未来行动。
6. 本地不可覆盖安全联锁可以在自身 mandate 下拒绝／终止 dispatch，即使家庭 Authority 曾允许该行动；actuation 与 effect 仍需记录和复核，联锁不会因此获得家庭治理权。
7. ordinary exit 由主体／adopter 在精确 exit right／contract 下行使，不能终止范围外共享 essential service。退出还要分别处理控制停用、安全 fallback、数据 portability／删除 Duty、依赖移除和恢复验证。
8. remediation 是调查、contain、repair、compensate、notify、audit 或 revalidate 的义务；义务承担者不因此获得家庭 access／action permission，每次侵入性 Attempt 仍需适用 Authority 与 safety check。
9. retirement 是精确 release／service／deployment population 的计划生命周期决定，需要依赖清单、migration／fallback、notice、data disposition、residual risk 与 closure evidence。EOL 公告不是已完成退役。
10. 临时响应必须有到期或续期决定。恢复是基于当前证据的新授权决定；到期不自动恢复不安全运行，历史 stop 也不永久禁止恢复。
11. 响应资格、授权、dispatch、物理 safe state、修复完成与 outcome acceptance 始终分开。
12. 本治理不建立法律义务、责任、普遍安全、同意、家庭信任、访问或超出精确 Policy／Record 的行动权限。

这是既有 HWM 语义的组合，不扩张家庭 Core。

