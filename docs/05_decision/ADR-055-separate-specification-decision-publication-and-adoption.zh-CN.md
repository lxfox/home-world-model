# ADR-055：分离规范决策、发布与采纳

- 状态：项目治理候选已接受
- 日期：2026-07-19
- 英文规范：[`ADR-055-separate-specification-decision-publication-and-adoption.md`](ADR-055-separate-specification-decision-publication-and-adoption.md)

## 背景

HWM 已分离实现结果、证据接纳与按 lineage 聚合的经验复现。但这些都不能自行决定某项规范修改是否进入 release、release 是否发布，或外部主体是否采纳。维护者直接决定会自授合法性；简单多数会把不同性质的异议压成票数；要求全体一致又会让任何沉默者拥有事实上的否决权。

## 决定

1. 一个内容绑定的 Change Proposal 必须在一个版本化 Decision Policy 下治理；Proposal revision、review 输入和 policy 摘要都是 Decision Record 的不可变输入。
2. 分离 `proposer`、`editor`、`reviewer`、`decision_steward`、`publisher` 与 `adopter`。角色不自证正确、独立、代表受影响方，也不产生政策范围外权限。
3. Review 是带归属的 `support | object | abstain | no_position`，包含理由、范围、利益冲突披露和证据引用。沉默或缺席不构成支持。
4. 异议必须分类并逐项处置为 `accepted`、`addressed`、`deferred_with_rationale`、`out_of_scope_with_rationale` 或 `unresolved`。Policy 声明哪些异议类别阻塞哪些结论；票数不能覆盖阻塞中的 unresolved objection。
5. Decision Record 只能是 `accept`、`revise`、`reject`、`defer` 或 `procedurally_invalid`，必须保留 dissent 并说明证据、范围取舍和每项异议处置。它不宣称真理或共识。
6. 利益冲突与 required-role coverage 是分离程序轴。披露缺失、policy 不匹配、Proposal revision 过期、必要审查不足或异议未处置，必须得到 `procedurally_invalid` 或 `defer`，赞成票不能修复。
7. `accept` 只允许项目 publisher 为指定 release line 准备精确接受内容。发布必须在完整性、许可证和 release gate 后另建内容绑定 Release Record。
8. 采纳是外部 adopter 针对精确 release、范围和日期作出的带归属 Adoption Declaration。发布不等于采纳；下载、star、实现、参会或沉默也不等于采纳。
9. 新证据、申诉或需求变化产生新 Proposal／Decision revision，历史记录与 dissent 不被后续决定改写。
10. 治理合法性仍然有限：该程序只让项目决策可检查，不证明普遍代表性、法律权限、行业共识，也不产生治理家庭或外部实现者的权利。

这属于项目治理，不进入家庭 Core，也不建立家庭领域 Profile。

