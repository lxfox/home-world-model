# ADR-035：迁移前先限定规划预测资格

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-035-qualify-planning-predictions-before-transfer.md`](ADR-035-qualify-planning-predictions-before-transfer.md)

## 背景

装修规划需要在目标家庭尚无观测时给出估计。产品声明、仿真与其他安装环境中学习的模型都有价值，但它们在不同条件下回答不同问题。把其中任何一个直接当作目标家庭事实，会让模型方便却不自洽。

## 决定

采用可选的 Planning Prediction Qualification Profile。Prediction 绑定精确的目标设计假设、来源、结果表达和不确定性预算；独立 Assessment 绑定精确修订、决策用途、可比性维度、许可、证据准入、来源分歧和目标时效性。

纯规划证据可支持探索、筛选、比较、候选清单或专业复核输入，但不能独立建立安装验收、法规符合性、购买、运行控制或 Action Authorization。目标 commissioning 产生新的经验性证据，可以形成 Installed Influence Model，但不会改写历史预测。

## 原因

这样既能在安装前提供有用建议，也保留 HWM 的总体规则：Agent 可以跨异质证据推理，但所有下游结论都必须明确什么被测量、建模、迁移、假设和授权。
