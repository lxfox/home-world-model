# HWM 模型贡献准入 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)

## 目的

本 Profile 允许多个 Agent 向家庭持久包贡献制品，但不把输出验收、接收、发布、认知接受、治理采纳和事实混成一次“写回”。HWM 没有“写入事实”操作。

规范链是：

`有归属的 Agent 输出 -> 不可变贡献提交 -> 隔离接收／去重 -> 完整性、来源、语义与 policy 检查 -> 用途绑定贡献准入 -> 追加式发布回执 -> 新 World View 独立解析`

## 关键语义

- 同一 ID、同一摘要是 replay／duplicate；引用既有发布。
- 同一 ID、不同正文是 `integrity_conflict`，绝不是 update。
- 不同 ID 的相反命题可以同时追加，并在 World View 中成为 contested candidates。
- 纠正、替代、等价、合并和派生必须用新制品和显式关系表达，不删除历史。
- 到达顺序、时间戳、模型置信度、厂商声誉、签名数量或 last-writer-wins 不解决语义冲突。
- 工作槽输出验收只让它有资格提交，不自动发布。
- 发布只表示某些 resolver／purpose 可以把它作为候选输入，不表示 Claim accepted，更不表示治理采纳或行动授权。

离线和并发实现可以合并不可变集合、检测 ID／摘要冲突，但不能自动合并含义。部分复制、缺少依赖和未知 Profile 必须保持隔离或不确定。已有 World View 永不因新发布被原地修改。
