# ADR-027：让 Deliberation Closure 成为回执而非效果来源

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-027-make-deliberation-closure-a-receipt-not-an-effect-source.md`](ADR-027-make-deliberation-closure-a-receipt-not-an-effect-source.md)

## 背景

Deliberation Eligibility 控制 Agent 发现的缺口能否进入家庭队列。interaction 发生后，一个“是／否”、关闭、纠正或超时不能安全表达结果：它可能针对事实前提、candidate Intent、重访时间、提示 policy、当前容忍或精确 Action Proposal。现有 Profile 已分别负责 Claim correction、Intent 采纳／修订、evidence standing 与 authorization。

## 决策

1. 增加可选 Deliberation Closure Profile，不增加 Core conversation 实体。
2. Closure Assessment 是议题依据、interaction Records 与独立生效结果制品之上的回执。
3. 保留 Agent gap、用户明确请求、既有 Intent review 或手工家庭商议的来源。
4. 允许多项类型化效果：Intent 采纳、candidate 拒绝、tolerance Claim、deferral policy、raising-policy revision、target correction 与 Intent revision。
5. 每项效果保留自己的 Authority、资格、内容、scope、时间与 provenance；Closure 不能使其生效。
6. closure status 使用 `resolved`、`closed_without_decision`、`expired`、`superseded` 或 `indeterminate`。
7. `resolved` 要求完整效果覆盖且所有披露效果均已验证。
8. 沉默、超时、关闭、过期或 Agent 总结不产生同意、拒绝、容忍或抑制。
9. 拒绝 candidate 不拒绝 target；容忍不满足 fit；延期不永久抑制；抑制不撤回 target；纠正不改写历史。
10. 一项未知使汇总 closure 未知时，其他已验证效果仍独立有效；HWM 不声称跨系统原子回滚。
11. Closure 不授予 planning、Proposal、Authorization、dispatch 或行动。

## 后果

界面可以保持简单，但领域效果保持精确。住户可以纠正 Agent、容忍不匹配、延期讨论或修改提示 policy，而不会意外采纳或删除目标。多效果回答保持可审计，不完整 closure 也不能隐藏已经或尚未分别生效的效果。

## 拒绝的方案

- 单一 accepted/rejected：混淆不同命题和权力。
- 让 Closure 引发所有效果：绕过 Claim resolution 与 Authority Profile。
- 把关闭当作拒绝：从缺席中虚构含义。
- 原子回滚全部效果：无法跨独立存储与 Authority 保证。
- 纠正时覆盖旧 target：破坏 provenance 与早期 World View。

## 参考

- [Clark 与 Brennan](https://collablab.northwestern.edu/CollabolabDistro/nucmc/ClarkAndBrennan-GroundingInCommunication-1991.pdf)
- [Horvitz, Mixed-Initiative Interaction](https://www.microsoft.com/en-us/research/publication/mixed-initiative-interaction/)
- [RFC 9315](https://www.rfc-editor.org/info/rfc9315/)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
