# ADR-059：通过分阶段、当前证据 gate 恢复

- 状态：恢复治理候选已接受
- 日期：2026-07-19
- 英文规范：[`ADR-059-restore-through-staged-current-evidence-gates.md`](ADR-059-restore-through-staged-current-evidence-gates.md)

## 背景

预防性暂停或紧急停止必须存在回到有用运行的路径，否则临时保护会变成无限期排除。但超时、代码修复、运营者信心或一次 canary 成功都不能证明原始风险已在完整部署中受控。现有 HWM 已分别表示 remediation obligation、evidence standing、target／effect assessment、Authority、procedure Duty、Action Attempt 和 closure；恢复必须组合它们而不能走捷径。

## 决定

1. 采用追加式链条：`response state -> remediation closure -> current risk reassessment -> scoped residual-risk disposition -> restoration Proposal/procedures -> Authority + local safety -> staged Attempt -> observation gate -> expand/hold/rollback decision -> closure`。
2. remediation completion 只表示声明的修复／containment 义务满足，不自证安全、因果充分、授权或恢复 readiness。修复者可以提供证据，但不能因作者身份自证独立 standing。
3. risk reassessment 绑定精确 stopped／proposed configuration、原始 signal、修复证据、受影响总体、hazard／impact channel、assumption、uncertainty、horizon 和 `as_of`；软件、设备、Policy、总体或环境变化都需要显式重验证。
4. residual-risk disposition 与技术 Assessment 分离，绑定精确 risk bearer／Authority、范围、期限、constraint 和理由。`accepted` 只表示该 policy／scope 下接受，不表示安全、公平、合法或所有受影响主体均接受。
5. 缺失／indeterminate 风险不能转成接受。Policy 可以允许更窄的 precautionary stage，但必须显式限定 uncertainty，不能把未知变成零风险。
6. 恢复需要新的 Proposal／预承诺 restoration mandate、已满足 pre-restoration Duty、当前 Authority Decision 与不可覆盖 local safety。旧授权和 hold expiry 都不是可复用权限。
7. 恢复按 `diagnostic`、`canary`、`limited_capability`、`bounded_population`、`full_scope` 等具名 stage 执行；每阶段绑定 target、capability、population、duration、observation criterion、stop／rollback rule 和累计 exposure budget。
8. stage success 只对该 stage 有效。canary 不证明未观察总体、能力、环境、更长 horizon 或全量 resource interaction；扩展必须产生新的当前阶段决定。
9. trigger breach、unexpected effect、safety denial、evidence loss、未解决 objection 或 observation coverage failure 都回到 hold／rollback Assessment。Rollback eligible 不证明已执行或恢复旧状态。
10. closure 要求最终预期范围已验证、全部 stage Attempt 已解析、观察窗闭合、post-restoration Duty 满足、剩余限制记录和 recurrence monitoring 有 owner；它不删除 incident、hold、harm 或 remediation 历史。
11. 历史 stop 不永久禁止恢复，商业压力、SLA 和 sunk cost 也不构成风险接受。
12. 恢复治理不授予法律权限、普遍安全、同意、公平、家庭信任、访问、继续运行或超出精确 Record 的行动权限。

该层不新增家庭 Core 或 action state。

