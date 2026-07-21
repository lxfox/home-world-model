# HWM 家庭 Commissioning 实验 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)

本 Profile 允许家庭主动收集有限校准证据，但禁止 Agent 把模型不确定性或 information gain 变成自行扰动家庭的权限。

链条为：`模型缺口 → Experiment Objective → 候选设计 → 可辨识性／风险／扰动／隐私／资源评估 → Experiment Plan → 每个 trial 独立 Proposal／Authorization／Attempt／Observation → Run Assessment → 数据集／模型贡献候选`。

“改进模型”不是充分目标；必须说明哪项未来决策可能改变、最少需要什么证据。若被动观测、仿真、制造商证据或既有数据已经以更低影响满足目标，就不能仅为了更多数据而主动扰动。

每个 trial 独立声明动作、范围、时间、空间、测量、影响、隐私、恢复和治理。自适应算法改变下一步动作时必须生成新 Proposal，不能继承上一 trial 的授权。

停止条件优先于信息价值：异议、安全联锁、异常响应、传感器失效、confounder、域外状态、隐私变化或累计预算耗尽都会抑制后续 trial。停止、取消、物理稳定、恢复、补偿和安全状态验证彼此不同。

实验跑完不表示可辨识、因果成立、模型有效、需求满足或 commissioning 验收。数据集和 Installed Influence Model 仍分别经过贡献准入、语义、验证、隐私和更新 gate。
