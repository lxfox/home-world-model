# ADR-029：材料化决策结构，而不是 chain-of-thought

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-029-materialize-decision-structure-not-chain-of-thought.md`](ADR-029-materialize-decision-structure-not-chain-of-thought.md)

## 背景

HWM 已分离 Task、Plan、Proposal 与 Authorization，但没有说明 Plan 何时必须可携带。保存全部私有推理会产生隐私、忠实度、可移植性和体量问题；完全不保存，又会让跨 Proposal、Agent、家庭选择、review、假设和 contingency 的依据消失在单次模型会话中。生成式 chain-of-thought 也可能不是模型实际因果过程的忠实解释。

## 决策

1. 增加可选 Plan Materialization Profile，不增加 Core cognition model。
2. 在 accepted policy 下输出 `plan_artifact_required`、`proposal_self_contained` 或 `indeterminate`。
3. 下游依赖跨 Proposal dependency、handoff/continuity、alternative selection、method review、long-lived assumption、cross-Proposal contingency、Task method continuity、显式 Plan reference 或 policy audit 时，必须 portable Plan。
4. Portable Plan 是有版本的结构化决策制品，不是 raw prompt、hidden state、无限制 conversation、secret 或 chain-of-thought。
5. 绑定精确 Intent、可选 Task、routing/materialization Assessment、源 World View、scope、input、assumption、step、alternative、checkpoint、contingency、author 与 proof。
6. rationale summary 是带归因内容，不证明内部推理忠实。
7. 只记录已声明 alternative；遗漏不证明考虑或拒绝。
8. Plan revision 不可变；Proposal 永远绑定实际使用的精确 revision。
9. 即使引用 Plan，Proposal 也必须对 Authorization 自包含；不可访问 Plan 不能隐藏 action、parameter、precondition 或 impact。
10. Plan materialization、review、selection 或 acceptance 不授予 Intent adoption、Proposal Authorization、dispatch 或 outcome。

## 后果

Agent 可以让短暂计算保持私有，同时家庭保留交接、比较、审计与复现所需的方法结构。Proposal Authorization 不依赖不透明模型 context，Plan 历史可携带，同时不假装暴露模型认知。

## 拒绝的方案

- 保存全部 chain-of-thought：侵入隐私、依赖模型且未必忠实。
- 完全不保存 Plan：丢失跨 session／Agent 的决策结构。
- Proposal 引用不透明 Plan：破坏 impact 与 Authority review。
- 要求穷举 alternative：无法证明且诱导虚构完整性。
- 把 selected Plan 当成 action authorization：混淆方法选择和 Proposal 权限。

## 参考

- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [Turpin 等](https://proceedings.neurips.cc/paper_files/paper/2023/hash/ed3fea9033a80fea1376299fa7863f4a-Abstract-Conference.html)
- [Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf)
