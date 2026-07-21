# Contextual Applicability v0.1 对抗场景

## 问题

住户 A 在卧室 A 睡觉时，家庭能否考虑 A 已接受的睡眠温度 Preference，同时不把情境当成 Need、不把 Preference 当成家庭 Intent，也不让冲突自动选择赢家？

夹具绑定一条已接受 Preference Claim、一条独立接受的 Applicability Rule Claim、用途绑定 World View，以及 Situational Context 场景中精确的 `satisfied` Situation Use Assessment。结果是 `applicable`；冲突仍为 `not_evaluated`；不产生规范或行动效果。

## 制品

- [`preference-claim.example.json`](preference-claim.example.json)：主体限定目标 Claim；
- [`applicability-rule-claim.example.json`](applicability-rule-claim.example.json)：绑定目标标识与精确情境 query 的独立 `all_of` Rule Claim；
- [`applicability-world-view.example.json`](applicability-world-view.example.json)：目标与规则均 accepted，且不推断 Need；
- [`applicability-assessment.example.json`](applicability-assessment.example.json)：精确绑定 View、Claim Body、Rule、query、Situation Assessment、用途、时间与 Epoch；
- [`applicability-cases.json`](applicability-cases.json)：56 个语义案例与 20 个模型边界案例；
- [`validate.mjs`](validate.mjs)：JavaScript evaluator 与摘要验证；
- [`../../../spec/profiles/contextual-applicability/v0.1/README.zh-CN.md`](../../../spec/profiles/contextual-applicability/v0.1/README.zh-CN.md)：规范 Profile 候选。

## 运行

```sh
node conformance/scenarios/contextual-applicability-v0.1/validate.mjs
```

预期摘要：`CONTEXTUAL APPLICABILITY OK 56 semantic cases 20 model-boundary cases 90 forbidden inferences`。

## 证明范围

夹具表明两个读取器可以复现精确绑定失败、三值 `all_of`／`any_of`、决定性子集隐私、明确目标时间不适用、主体对齐、独立冲突状态与禁止推断 Need 的边界。

它不证明生产规则引擎、偏好识别准确率、人的可理解性、公平冲突处理、隐私安全、外部实现一致、Intent 采纳或行动授权。
