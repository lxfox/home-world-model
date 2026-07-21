# HWM 预期就绪规划 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)

## 目的

本 Profile 判断 Forecast 支持的家庭准备是否可以成为有边界的 Plan 候选，但不把预测活动变成未来事实、Need、Routine activation、Task 或设备动作。

模型分开三条时间线：家庭可能何时需要的 Forecast window；系统从当前状态达到就绪所需的 response window；就绪保持、衰减并最终变成浪费的 hold/decay window。Forecast 时间、Task occurrence、Proposal dispatch、物理效果、readiness evaluation 和真实活动发生时间均不同。

Readiness Objective 明确目标属性、measurement zone、时间窗口、容差、持续时间、资源和副作用；Preparation Window Plan 明确 earliest/latest start、检查点、re-forecast、停止条件、no-return point、资源预算、false-positive／false-negative 代价和 contingency。

Plan 中每一步仍只是 Proposal candidate，必须单独经过影响、协调、Authorization、安全和 Attempt。取消不等于回滚：停止加热不消除余热，关闭循环不收回耗水，停止充电不恢复原电量，关闭摄像头也不自动删除已披露信息。

Forecast 改变只影响未来规划，可支持另一个取消／补偿 Proposal，但不抹除既有 Forecast、Plan、Attempt、资源消耗或物理效果。准备目标可能已满足而预测活动没有发生；这属于 false-positive anticipation，不表示设备动作失败。活动发生也不证明准备成功。

HWM 不定义统一概率阈值或隐藏效用函数。家庭接受的 anticipation policy 决定概率／覆盖表达、代价、资源、可逆性、确认和复核节奏。规划资格不创建 Task、不通知、不 dispatch，也不授权行动。
