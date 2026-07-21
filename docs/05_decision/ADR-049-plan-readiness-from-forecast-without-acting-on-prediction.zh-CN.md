# ADR-049：基于 Forecast 规划就绪，但不对预测直接行动

- 状态：提议
- 日期：2026-07-19

提前准备热水、温度、空气质量、充电或照明有价值，但 Forecast 驱动自动化会混淆预测活动、家庭承诺、就绪目标、启动时刻、取舍和行动权限；预测也可能在物理准备开始后变化或消失。

决定材料化 Readiness Objective 和有边界的 Preparation Window Plan，再由家庭接受的 anticipation policy 评估。需求预测、系统响应和保持／衰减窗口分开；Plan 明确 earliest/latest start、不确定性、检查点、停止／no-return 条件、误判代价、资源、可逆性、取消、补偿和到期。

结果只有规划资格。Forecast 变化只影响未来 Plan／Proposal，不抹除 Attempt 或残余效果。readiness success 与 activity realization 独立评估。这样可以保留预期智能，而不给预测隐式控制权，也不强加统一概率／效用阈值。

英文规范：[`ADR-049-plan-readiness-from-forecast-without-acting-on-prediction.md`](ADR-049-plan-readiness-from-forecast-without-acting-on-prediction.md)。
