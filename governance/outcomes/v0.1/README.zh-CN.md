# HWM 部署结果评估 v0.1

- 状态：Discussion Candidate
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- 决策：[`ADR-057`](../../../docs/05_decision/ADR-057-evaluate-deployment-outcomes-as-orthogonal-axes.zh-CN.md)
- View Schema：[`deployment-outcome-view.schema.json`](deployment-outcome-view.schema.json)

本契约组合 HWM 相关部署之后发生了什么的有界证据，但不把使用当成受益，也不建立第二套家庭 outcome 本体。家庭命题仍由既有 [Target Fit](../../../spec/profiles/target-fit/v0.1/README.md)、[Effect Realization and Attribution](../../../spec/profiles/effect-realization-attribution/v0.1/README.md)、[Outcome Assurance and Work Closure](../../../spec/profiles/outcome-work-closure/v0.1/README.md)、[Bounded Impact Closure](../../../spec/profiles/bounded-impact-closure/v0.1/README.md) 和 [Change Impact Revalidation](../../../spec/profiles/change-impact-revalidation/v0.1/README.md) 治理；本 View 只引用它们，并组合另行治理的体验、分布与退出证据。

六个轴分别是：

- `usage`：是否观察到 interaction／exposure；不推出受益、同意或满意。
- `target_outcomes`：是否实现精确家庭 target／effect／assurance；运营 KPI 不是家庭目标。
- `experience`：主体陈述或受治理 aggregate 的体验；沉默和继续使用不是 favorable。
- `adverse_impacts`：有界通道、覆盖和 horizon 内的副作用；`none_observed` 不是“无 harm”。
- `distribution`：显式 strata 间结果差异；差异不自动证明不公平，无差异也不证明公平。
- `exit_reversibility`：停用、fallback、导出／删除义务、依赖移除与恢复是否演示；文档不是演示，rollback 不删除历史。

每轴都有自己的结果词汇，并引用内容摘要、覆盖、方法和限制。缺失／不可访问证据不能变成有利结果。View 绑定精确 release／部署配置、eligible population、baseline、评估窗、evidence policy 和 `as_of`；家庭平均不证明每个主体，不同总体、目标、版本和时间窗不得静默合并。

体验和分布报告应使用最小必要、用途化证据。Opaque strata 可以支持 disparity test 而不披露身份，但 small cell、membership inference 和 linkage 仍有隐私风险；access denial 不是有利结果。

不存在 `overall_success`、net-benefit score 或自动继续／停止建议。高 usage 不能补偿 harm，平均 favorable 不能补偿未评估 subgroup，target realized 不能补偿 exit 失败。另行接受的决策规则可以消费六轴，但必须保留输入，也不能从 View 获得行动权限。

