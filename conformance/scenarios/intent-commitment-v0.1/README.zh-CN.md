# Intent Commitment v0.1 对抗场景

- 状态：讨论夹具
- 日期：2026-07-19
- 英文为规范文本
- 英文规范：[`README.md`](README.md)

该场景检验话语或偏好如何到达 Authority 采纳的家庭 Intent。它攻击 Definition 身份、expectation revision、候选作者、承诺转换、履行 assurance、persistent drift、冲突、Routine 推测、Task 绑定与 Action Authorization。

夹具包含 Intent Definition 示例、已采纳且进行中的 State 示例、49 个语义案例、15 个模型边界案例和 JavaScript evaluator。Profile 与 Schema 见 [`Intent Commitment Profile`](../../../spec/profiles/intent-commitment/v0.1/README.zh-CN.md)。

```sh
node conformance/scenarios/intent-commitment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

预期看到 `INTENT COMMITMENT OK`。两条 evaluator 均由本项目形成，不代表组织独立的一致性实现。
