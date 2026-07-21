# ADR-034：学习有边界的 Installed Influence Model

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-034-learn-bounded-installed-influence-models.md`](ADR-034-learn-bounded-installed-influence-models.md)

## 背景

最初的家庭叙事要求 Agent 估计已安装灯具、HVAC、循环泵、窗帘或电器怎样改变周围空间。现有 fixture 有 learned effect Claim，但没有规定 episode 何时可以更新模型、什么固定模型身份，以及怎样避免家庭局部 calibration 被提升为通用设备真理。

## 决定

采用可选 Installed Influence Model Profile。模型身份绑定精确 installed endpoint、安装／空间几何、affected feature/property、action kind 与家庭。实质身份变化创建新模型；同身份学习只能形成绑定 dataset、procedure、validation、applicability、不确定性和限制的不可变候选 revision。

Predictive association 与 causal response 是不同语义。causal-response 训练需要已准入 Causal Contribution Assessment。每个候选都需要独立 validation 与用途化 acceptance；域外使用是 indeterminate，模型 acceptance 不授予行动权限。

## 后果

- commissioning 实验可以形成可移植的局部响应面，而不声称通用 capability；
- 设备替换、移动或房间几何变化会明确阻止 lineage 复用；
- simulation 和制造商数据可作为声明 prior，但仍不同于家庭 Observation；
- online update 成为可复核候选 revision，而非静默修改。
