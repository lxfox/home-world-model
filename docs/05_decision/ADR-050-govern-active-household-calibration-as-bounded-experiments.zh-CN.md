# ADR-050：把主动家庭校准治理为有边界实验

- 状态：提议
- 日期：2026-07-19

Installed Model 需要校准，但主动选择设备动作会扰动人员、消耗资源、采集敏感证据并遭遇异常响应。模型不确定性和 information gain 不是家庭权限。

决定使用 Experiment Objective、Commissioning Experiment Plan 和 Experiment Run Assessment。设计必须证明决策相关性、必要性、可辨识性、低影响替代、累计预算、隐私、受影响主体程序、恢复和停止规则。每个固定或自适应 trial 都独立经过完整 Proposal／Authorization／Attempt 链。

停止规则优先于信息价值；跑完、数据集适格、模型更新资格、验证、commissioning 验收和运行权限保持分离。

英文规范：[`ADR-050-govern-active-household-calibration-as-bounded-experiments.md`](ADR-050-govern-active-household-calibration-as-bounded-experiments.md)。
