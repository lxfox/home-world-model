# ADR-056：把 adoption 报告为有作用域证据，而不是一个数字

- 状态：生态证据候选已接受
- 日期：2026-07-19
- 英文规范：[`ADR-056-report-adoption-as-scoped-evidence-not-one-number.md`](ADR-056-report-adoption-as-scoped-evidence-not-one-number.md)

## 背景

规范治理已要求带归属 Adoption Declaration，而不是从发布推断采纳。但 Declaration 只回答具名主体声称采纳了什么，不证明实现符合性、部署、活跃使用、下游依赖、持续时间或市场覆盖。反过来，流量和通过测试的实现也不能代表组织承诺。单一“adoption 数量”会混合主体、范围、时间、分母和隐私风险完全不同的 Claim。

## 决定

1. 每项 Adoption Evidence 绑定精确 release 摘要、证据种类、主体／adopter、范围、适用的产品或部署总体、观察时间、issuer、方法和限制。
2. 分离六类证据：`adoption_declaration`、`implementation_assessment`、`deployment_observation`、`dependency_declaration`、`longitudinal_operation` 和 `market_estimate`。
3. Adoption View 分轴报告 `declared`、`implemented`、`deployed`、`depended_on`、`sustained` 与 `market_estimated`；每轴只能为 `supported`、`not_supported`、`indeterminate`、`not_evaluated` 或 `withdrawn`，各轴不能互相提升。
4. 不定义规范化总分、成熟度阶梯或通用阈值。消费者必须为自己的问题声明必要轴、证据政策、总体和时间窗。
5. 按绑定主体／产品／部署单位和证据 lineage 去重。重复声明、镜像、遥测事件、仓库、同一控制器下安装，或同一样本总体不能被数成独立 adopter。
6. 数量必须声明单位、population frame、coverage 和分母来源。分母未知时只能报告 count 或 sample result，不能报告百分比和市场份额。
7. 部署证据默认使用隐私保护 aggregate；生态报告不需要家庭身份、地址、设备标识与活动轨迹，aggregate 仍需反重识别审查。
8. 撤销、withdrawal、版本迁移、产品 EOL 与观察窗过期都追加新证据并改变当前 View，不改写历史。
9. Declaration 是带归属自报；第三方观察没有代 adopter 发言的权限。冲突证据继续保留，并可使某一轴 `indeterminate`。
10. Adoption View 不证明技术真理、完整符合性、用户满意、正向结果、市场支配、社区共识、法律合规、家庭信任、访问或行动权限。

这属于生态治理，不进入家庭 Core，也不建立家庭领域 Profile。

