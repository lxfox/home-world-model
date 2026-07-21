# ADR-026：在不推断 Need 的情况下准入 Agent 主动商议

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-026-admit-agent-initiated-deliberation-without-inferred-need.md`](ADR-026-admit-agent-initiated-deliberation-without-inferred-need.md)

## 背景

Target Fit 可以证明适用目标没有达到；Intent Commitment 已允许 Agent 创建 candidate Definition，同时把采纳留给家庭 Authority。缺失边界是：Agent 发现的缺口是否值得主动提出。把每个缺口直接映射成 candidate Intent 或通知，会制造噪声、隐私泄露、重复工作与自动化偏差；把缺口叫作系统拥有的 Need，则错误加入优先级与规范性。

## 决策

1. 不增加通用 Opportunity 或 Need 实体。
2. 为 Agent 主动提出议题增加可选 Deliberation Eligibility Profile。
3. 要求针对精确目标、独立接受的 Deliberation Policy Claim。
4. 绑定精确 Target Fit、目标、policy、World View、条件、用途、时间、Authority Epoch、重复状态与既有 Intent 状态。
5. 使用 `eligible | not_eligible | indeterminate` 及 fail-closed 条件逻辑。
6. 开放商议、冷却、既有工作和精确目标已有 adopted Intent 时抑制重复，但不消除目标缺口。
7. 用户明确请求、既有 Intent drift、Routine occurrence 与紧急／安全义务走各自路径。
8. eligibility 可以支持 Agent 创建 candidate Intent Definition，但不产生采纳。
9. eligibility 不授予通知、披露、优先级、规划、Proposal、Authorization 或行动。

## 后果

家庭可以治理 Agent 何时提出问题，而不用假装每个不匹配都是 Need。候选生成变得可检查、可去重、隐私感知，并与打扰 UX 分离。商议可以选择容忍、延后、纠正、抑制或承诺。

## 拒绝的方案

- 每个未满足目标都变成 Need：混淆证据、价值判断、优先级与承诺。
- 每个缺口都变成 candidate Intent：制造未经请求的承诺与重复。
- 让 LLM 自己决定何时打扰：隐藏 policy、来源、隐私与冷却语义。
- 把 Opportunity 变成持久 Core 实体：把用途绑定 Assessment 实体化为通用真理。
- 对用户明确请求也要求该 gate：把用户能动性错误归因为 Agent 推断。

## 参考

- [RFC 9315](https://www.rfc-editor.org/rfc/rfc9315.html)
- [Cohen 与 Levesque](https://doi.org/10.1016/0004-3702(90)90055-5)
- [Rao 与 Georgeff](https://users.cs.utah.edu/~tch/notes/refs/Rao-Georgeff1995.pdf)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [AI 决策支持自动化偏差](https://pubmed.ncbi.nlm.nih.gov/39234734/)
