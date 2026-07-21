# HWM Action Attempt Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：英文
- Schema：[`action-attempt.schema.json`](action-attempt.schema.json)、[`attempt-state-assessment.schema.json`](attempt-state-assessment.schema.json)

## 目的

本 Profile 分离一次预期物理执行机会（**Attempt**）、网络发送（**Transmission**）、协议或设备报告（**Acknowledgement**）、Observation 与 Effect Assessment，从而支持有边界的重试，却不声称端到端物理 exactly-once。

Attempt 绑定精确 Proposal 摘要、Authorization Decision、当前 Proposal State Assessment、gateway 和 endpoint。Transmission 是 Attempt 下的一次发送；同一 Attempt 的重发不是新 Attempt。Acknowledgement 只是具名来源对接收、接受、开始、完成、拒绝、失败或取消的报告。

## 安全重发

端点命令去重契约必须声明 key、作用域、保留截止时间与证据。只有规范 payload 完全相同且经验证的去重窗口仍有效时，才能用同一 key 重发。不同内容复用 key 是完整性冲突。

MQTT packet/session 等 transport-only 去重不等于端点命令去重。当投递结果未知，而端点去重不存在、过期、不可取得或有争议时，必须进入 `reconciliation_required`：先观察世界、查询 action status 或进行交互确认，再考虑新 Attempt。超时本身绝不创建重试权。

## 语义边界

- transport ack 不证明 endpoint 接受；
- endpoint 接受不证明执行开始；
- reported completion 不证明物理效果或目标效果；
- cancellation ack 不证明回滚；
- MQTT QoS 2、CloudEvents ID 或 idempotency key 都不单独证明物理 exactly-once；
- 改变动作内容必须创建 Proposal revision，不能在 Attempt 内覆盖参数。

Attempt 状态、Task 状态、Proposal currentness、Authorization 与 Effect Assessment 始终分离。迟到证据只能产生后续评估，不能改写历史评估。

## 一致性

[Action Attempt oracle](../../../../conformance/scenarios/action-attempt-v0.1/README.zh-CN.md)覆盖分层 acknowledgement、不确定投递、安全重发、重复报告、迟到证据与物理效果边界。

```sh
node conformance/scenarios/action-attempt-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
