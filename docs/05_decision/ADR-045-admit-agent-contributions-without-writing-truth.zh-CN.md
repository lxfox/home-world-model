# ADR-045：准入 Agent 贡献，但不写入真相

- 状态：提议
- 日期：2026-07-19

Agent 已能获得最小化 View、组合专长工作并生成验收输出，但模型仍需与厂商无关的持久化边界。若把成功输出直接视为数据库更新，会混淆存储、来源、认知接受、冲突解析与治理，也会迫使并发／离线写者采用 last-writer-wins。

决定采用不可变 Contribution Submission，经独立隔离、验证和用途绑定准入后追加发布，再由后续 World View 解析。接收、schema、签名、准入、发布、accepted 和治理采纳相互分开。同 ID 同摘要是 replay；同 ID 不同正文是完整性冲突；不同 ID 的替代命题共存；纠正和替代使用新制品和显式关系。

同步层可以合并不可变集合并报告冲突，但不能决定含义。发布不会修改旧 World View，也不会授权行动。这样家庭知识可以多 Agent、离线优先和跨副本演进，而不指定某个模型为真相所有者。

英文规范：[`ADR-045-admit-agent-contributions-without-writing-truth.md`](ADR-045-admit-agent-contributions-without-writing-truth.md)。
