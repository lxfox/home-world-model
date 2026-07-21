# ADR-057：把部署结果评估为正交轴

- 状态：生态评估候选已接受
- 日期：2026-07-19
- 英文规范：[`ADR-057-evaluate-deployment-outcomes-as-orthogonal-axes.md`](ADR-057-evaluate-deployment-outcomes-as-orthogonal-axes.md)

## 背景

Adoption Evidence 已分离声明、实现、部署、依赖、持续运行和市场估算，但都不能证明部署帮助了家庭。HWM 已有 Target Fit、Effect Realization／Attribution、Outcome Assurance／Work Closure、影响闭包、披露和变更重验证 Profile；生态报告若重新定义这些语义会造成模型分叉。但只报告 uptime 或 retention 又会把使用误作价值，并掩盖副作用和分布差异。

## 决定

1. Deployment Outcome View 是对既有家庭 Assessment 与另行治理的研究／体验证据所做的用途化组合，不新增家庭 Claim 或 Core 状态。
2. 保持六轴正交：`usage`、`target_outcomes`、`experience`、`adverse_impacts`、`distribution` 和 `exit_reversibility`。
3. 每轴使用自己的结果词汇和证据要求；不定义总体成功分、加权 utility、成熟等级或跨轴补偿。
4. Usage 只描述 exposure／interaction。频率、retention 和持续运行不推出目标实现、满意、受益、同意或不存在替代方案。
5. Target outcome 引用精确 Target Fit、Effect Realization／Attribution 或 Intent Assurance，不把运营指标静默替代家庭目标，也不把相关性当因果贡献。
6. Experience 绑定主体、instrument、时间和上下文。沉默、持续使用、低投诉率和行为 proxy 都不是满意；家庭平均体验不证明每位成员体验。
7. Adverse impact 绑定声明通道、覆盖、severity procedure 和 observation horizon。`none_observed` 只表示有界程序没有观察到副作用，不表示不存在 harm。
8. Distribution 只在显式治理的群体或 opaque strata、覆盖和不确定性下报告差异。差异本身不证明不公平，无差异也不证明公平；规范性 fairness 需要独立接受的 criterion 和合格 procedure。
9. Exit／reversibility 分别评估控制停用、安全 fallback、数据导出／删除义务、依赖移除和恢复验证。卸载文档不等于退出已演示，rollback 也不抹除历史影响或外部副本。
10. 缺失轴保持 `not_evaluated`／`indeterminate`。有利轴不能补偿不利或未知轴；除非另有接受的决策规则，View 本身不推荐继续使用。
11. View 绑定精确 release／部署总体、baseline、评估窗、证据 policy、覆盖和限制；总体、目标、Policy、版本或环境改变需要重验证。
12. View 不证明普遍受益、用户同意、因果有效性、公平、安全、法律合规、继续运行权限、家庭信任、访问或行动权限。

该层引用而不复制既有家庭 Profile，属于生态评估治理。

