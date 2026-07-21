# HWM Adoption Evidence v0.1

- 状态：Discussion Candidate
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- 决策：[`ADR-056`](../../../docs/05_decision/ADR-056-report-adoption-as-scoped-evidence-not-one-number.zh-CN.md)
- Evidence Schema：[`adoption-evidence.schema.json`](adoption-evidence.schema.json)
- View Schema：[`adoption-view.schema.json`](adoption-view.schema.json)

本契约表示关于某个精确 HWM release 的真实 adoption 证据，不把组织声明、兼容实现、部署、依赖、持续运行和市场估算折叠成一个数字。

六种证据必须分开：`adoption_declaration` 只支持具名 adopter 的有范围组织选择；`implementation_assessment` 只支持绑定实现满足具名 conformance contract；`deployment_observation` 只支持定义部署单位在时间窗内被观察；`dependency_declaration` 只支持下游制品声明依赖；`longitudinal_operation` 只支持定义单位满足持续性 policy；`market_estimate` 只支持显式 population frame 和方法下的抽样／建模估计。

每项证据绑定精确 release SHA-256、主体、范围、issuer、证据时间、有效窗、方法、lineage、隐私类别和限制。签名不能把自报变成独立观测，第三方 observation 也不能替主体发言。

Adoption View 针对一个 release、population、用途和 `as_of` 时间分别报告：

```text
declared | implemented | deployed | depended_on | sustained | market_estimated
```

每轴为 `supported`、`not_supported`、`indeterminate`、`not_evaluated` 或 `withdrawn`，并引用精确证据摘要。各轴不能互相提升；不存在 `overall_adoption`、成熟度等级、排行榜分数或通用阈值。缺失、不可访问和过期证据通常是 `indeterminate`／`not_evaluated`，不是 false。

计数必须声明单位，并按绑定单位和 evidence lineage 去重。一个组织的十个仓库不是十个组织采纳，一台 controller 的一千条事件不是一千个部署。百分比还必须有定义明确的总体、匹配的分子／分母单位、分母来源与时间、采样／non-response／不确定性处理，以及隐私审查；分母未知禁止报告百分比，不同总体和时间窗不能静默相加。

证据追加保存。撤回、supersession、版本迁移、过期和 EOL 只改变当前适用性，不删除历史。当前证据冲突必须保留，并通常使相应轴成为 `indeterminate`。部署报告默认使用隐私保护 aggregate；家庭身份、精确地址、稳定设备标识和活动轨迹不属于生态统计的默认必要信息，aggregate 也不自动匿名。

即使六轴全部 `supported`，也不证明规范真理、完整符合性、用户满意、正向家庭结果、市场支配、社区共识、法律合规、认证、家庭信任、访问或行动权限。

