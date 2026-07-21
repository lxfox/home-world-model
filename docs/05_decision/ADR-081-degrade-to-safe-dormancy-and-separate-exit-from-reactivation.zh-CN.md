# ADR-081：退化到安全休眠，并分离退出与重新激活

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-081-degrade-to-safe-dormancy-and-separate-exit-from-reactivation.md`](ADR-081-degrade-to-safe-dormancy-and-separate-exit-from-reactivation.md)

## 背景

家庭可能停止维护 Agent 系统、忽略治理请求、失去 Authority connectivity、暂停部署、离开厂商或放弃模型。让旧规则无限运行会把不注意变成 consent；全局 shutdown 也不安全，因为 essential heating、门锁、alarm、原生手动控制和本地 interlock 的物理依赖不同。

既有 Lease expiry、Routine eligibility、response／exit governance、work closure、disclosure lifecycle、local safety 与 staged restoration 足以表达 capability-specific dormancy，无需新增全局状态。

## 决定

1. 不定义全局 dormant／active household state；每个受治理 capability 声明 review／freshness、Lease、无人行为、in-flight handling、safe fallback、manual／native control、数据依赖、义务与 reactivation gate。
2. 区分 advisory reasoning、新 autonomous work、已授权有限工作、原生手动功能、本地 safety／interlock、共享 essential service 与 cloud／data service；不存在通用 fallback。
3. attention 或 Authority 缺失不产生 acceptance 或继续 permission；新的 disclosure、reasoning、Task materialization 和 dispatch 被拒绝、保持 indeterminate，或只使用精确预先接受的有限模式。
4. current offline Lease 只在精确范围／时间和更严格 local safety 下有效；到期阻止新 Lease-bound use，历史使用不续期。
5. 按精确预先接受的 abort／complete／reconcile policy 处理在途工作；发出 command 不证明 safe state，delivery unknown 在 reconciliation 前阻止 retry 与 closure。
6. 在独立可用时保留安全的设备原生手动控制；Agent dormancy 既不要求设备断电，也不证明原生功能安全。
7. 不可覆盖 local protection 独立保持 active；共享 essential service 使用领域专用 staged fallback 与 affected-subject coordination，一个人的 exit 不能盲目关停。
8. ordinary exit 是多轴过程：control／credential disablement、in-flight closure、manual fallback、scoped export、prospective-use revocation、retention／deletion、cloud dependency removal、device decommissioning 与 shared obligation。
9. app uninstall、logout 或 vendor account closure 不证明 credential revocation、device unpairing、data deletion、safe state 或 exit closure。
10. deletion／crypto-shredding receipt 声明 controlled boundary，不能证明 uncontrolled copy 擦除或逆转 model training；历史 provenance 按 retention policy 保留。
11. Dormancy 不是 retirement 或 deletion；vendor EOL 是 retirement preparation，不是 completion。
12. connectivity return、login、timer expiry 或 patch 不会 reactivation；需要 current Authority、admission／Lease、dependency revalidation、procedure、local safety 与 staged observed restoration。
13. 新 Agent 需要 fresh admission、orientation、disclosure 与 Authority；旧 Lease、private memory 和 execution permission 都不转移。

## 后果

- 不注意不再创造无限 autonomous continuation。
- 家庭无需保持 Agent 主权活跃，也能保留手动和保护功能。
- exit 按轴可验证，而不是卸载 app 后虚假完成。
- 30个可执行案例覆盖 attention／Authority loss、Lease、capability、在途工作、manual／safety function、shared essential、control／data／cloud／device exit、dormancy／retirement 与 reactivation。
