# HWM Effect Realization and Attribution Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：英文
- Schema：[`effect-realization-assessment.schema.json`](effect-realization-assessment.schema.json)、[`causal-contribution-assessment.schema.json`](causal-contribution-assessment.schema.json)

## 目的

本 Profile 防止系统把“动作后观察到某状态”直接提升为“这个动作造成了成功”。它把两个问题拆开：

1. 精确 Effect Claim 描述的效果是否在声明窗口内出现（Effect Realization）；
2. 经接纳的因果过程是否支持精确 Attempt 对该效果有贡献（Causal Contribution）。

效果可以是 `realized`，而因果贡献仍为 `indeterminate`。Realization 使用独立评价规范，绑定 feature、property、单位、覆盖范围、时间窗口、聚合规则和观测质量。`partially_realized` 只来自显式多 criterion 聚合，接近阈值不算部分实现。

因果评估绑定 Attempt、Realization、方法、baseline/outcome、竞争因素与假设。状态为 `not_assessed | supported_contribution | not_supported | contested | indeterminate`。时间先后、相关性、设备完成报告或简单 before/after 差异都不足以产生 `supported_contribution`。

这里的 contribution 不意味着唯一、必要、充分、主导或法律责任原因。PROV influence 也只是溯源关系，不自动成为因果证明。

## 边界

- 缺少因果证据是 `indeterminate` 或 `not_assessed`，不是 `not_supported`；
- realized 不等于 Goal satisfied、体验良好、Task completed、Intent fulfilled 或安全；
- not_realized 不证明未发生 actuation，也不证明没有其他效果；
- 新发现副作用是独立候选 Claim，不能回填旧 Proposal；
- 迟到证据产生新 assessment，不改写历史；
- 平均值不能在未声明覆盖规则时证明逐点或全主体效果。

## 一致性

[Effect Realization and Attribution oracle](../../../../conformance/scenarios/effect-realization-attribution-v0.1/README.zh-CN.md)覆盖观测适格、聚合、时间歧义、baseline、竞争因素、因果方法、副作用与禁止成功混淆。

```sh
node conformance/scenarios/effect-realization-attribution-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
