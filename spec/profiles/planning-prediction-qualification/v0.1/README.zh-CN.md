# HWM 规划预测资格 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`planning-prediction.schema.json`](planning-prediction.schema.json)、[`prediction-qualification-assessment.schema.json`](prediction-qualification-assessment.schema.json)

## 目的

本可选 Profile 让 Agent 在已安装系统尚不存在时比较装修方案。它表达制造商声明、设计仿真、相似安装案例或它们的显式组合，对某个目标设计作出了什么预测；同时记录该预测是否适合某个特定规划用途。

Planning Prediction 不是 Observation、已安装系统事实、保证、购买、安装验收、法规符合性决定、专业签字、Action Authorization 或下发指令。

## 四类证据基础

- `manufacturer_declaration` 只支持声明测试条件下的产品属性，不能证明实际安装效果。
- `design_simulation` 只支持绑定几何、材料、边界条件、过程与软件假设下的模型条件预测；它不是 Observation。
- `analogous_installation` 只有经过明确的源／目标可比性评估，才能作为先验或迁移依据；产品型号相同并不充分。
- `composite_prediction` 必须保留全部来源、分歧与不确定性，不能用平均值消除不兼容。

来源家庭的数据许可与认识论上的迁移适格性是两个独立 gate。

## 身份、修订与用途

同一预测 lineage 固定家庭设计上下文、设计方案、计划功能位置、产品型号、目标 feature/property 与预测目的。竞争产品、不同功能位置、不同属性或不同目的使用新的 `prediction_id`。几何、材料、边界条件、声明、仿真或相似模型变化时产生绑定前序的不可变修订，并重新评估资格。

资格结果为 `qualified`、`qualified_with_limits`、`not_qualified` 或 `indeterminate`。纯规划证据可用于概念探索、目录筛选、设计比较、采购候选清单与专业复核输入；它不能单独完成安装验收、法规符合性判断或运行控制。推荐仍是建议，候选清单不等于选择、购买、安装或授权。

可比性至少检查产品等价性、安装几何、空间几何、材料、环境／情境域、动作范围、过程以及空间／对象覆盖。缺失维度、单位不兼容、域外外推、目标绑定过期、证据准入不明或来源分歧，必须按政策产生受限、否定或不确定结果，而不能藏进一个置信度数字。

## 安装后的衔接

目标家庭 commissioning 后的观测可以产生 [Installed Influence Model](../../installed-influence-model/v0.1/README.zh-CN.md)。它可以校准或替代已安装系统的规划用途，但不会把历史 Planning Prediction 变成 Observation，也不会抹除预测误差。

[Planning Prediction Qualification oracle](../../../../conformance/scenarios/planning-prediction-qualification-v0.1/README.zh-CN.md)测试来源语义、迁移适格性、不确定性、修订、决策边界与安装后衔接。
