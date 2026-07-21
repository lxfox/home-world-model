# ADR-032：分离 Effect Realization 与因果归因

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-032-separate-effect-realization-from-causal-attribution.md`](ADR-032-separate-effect-realization-from-causal-attribution.md)

## 背景

Core Effect Assessment 会比较观测与预期效果，但紧凑状态容易被误读为 Attempt 导致了该状态。家庭中的阳光、人的动作、其他设备、热惯性、迟到观测和原有状态都可能形成同样的 before/after 图样。

## 决定

采用可选 Effect Realization and Attribution Profile。Effect Realization 使用独立评价规范和用途适格 Observation 评价精确 Effect Claim；Causal Contribution 使用声明的方法、baseline、竞争因素、假设和 outcome 证据独立评价精确 Attempt。

二者正交。时间顺序、相关性、设备 acknowledgement、简单前后变化与 PROV influence 都不足以支持因果贡献。`not_supported` 需要接纳方法下反对贡献的证据；缺证据保持为 `indeterminate` 或 `not_assessed`。

## 后果

- Core `consistent` 只是紧凑 realization 投影，不是因果归因；
- Agent 可以学习效果模型而不夸大变化原因；
- 必要、充分、唯一、主导或法律责任原因不在本 Profile 范围；
- 副作用、Goal、体验、Task completion、Intent fulfillment、安全与授权继续独立评价。
