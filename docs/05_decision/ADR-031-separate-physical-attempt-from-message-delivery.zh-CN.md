# ADR-031：分离物理 Attempt 与消息投递

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-031-separate-physical-attempt-from-message-delivery.md`](ADR-031-separate-physical-attempt-from-message-delivery.md)

## 背景

Core Action Trace 把 dispatch 与 acknowledgement 压缩在一个 execution 对象中，无法安全表达投递歧义、重发、端点接受、长时执行、重复报告，以及设备完成报告与观察到的物理效果之间的差异。消息层 exactly-once 不会自然延伸到物理世界。

## 决定

采用可选 Action Attempt Profile。Attempt 是精确 Proposal 的一次预期物理执行机会，可以包含多次完全相同的 Transmission。只有已证明未投递，或经验证的端点命令去重窗口仍有效时，才允许同 Attempt 重发；否则投递歧义必须先 reconciliation，再考虑独立授权的新 Attempt。

Acknowledgement 按 transport、接受、开始、完成、失败和取消分层，并保留来源。Observation 与 Effect Assessment 位于 Attempt 状态之外。模型不声称端到端物理 exactly-once。

## 后果

- timeout 既不是失败，也不证明未投递；
- MQTT QoS、CloudEvents replay ID 与 transport ID 只是 adapter 证据；
- gateway 需要端点专用去重能力和有界保留期；
- 非幂等命令在歧义投递后可能需要观察或人的交互确认；
- Core 保持紧凑，需要安全重试的实现采用本 Profile。
