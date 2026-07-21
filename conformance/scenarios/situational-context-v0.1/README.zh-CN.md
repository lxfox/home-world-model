# 情境上下文 v0.1 场景

本非知识包 oracle 检验：在已解析家庭情境参与 Routine eligibility 之前，HWM 是否需要全局家庭模式或新 Activity 原语。

夹具只走一条狭窄链路：

`presence evidence + 精确住户 attestation → 推断睡眠 episode Claim → 用途化 accepted World View → satisfied Situation Use Assessment`

最终结果只是条件证据。它不激活 Routine、不建立 Intent、不创建 Task、不授权相机，也不派发设备行动。

## 制品

- [`sleep-episode-claim.example.json`](sleep-episode-claim.example.json)：使用 SAREF4EHAW activity 语义、开放声称区间、两个证据 origin 与精确住户／空间作用域的 Core Claim Envelope。
- [`sleep-world-view.example.json`](sleep-world-view.example.json)：该精确 Claim 的当前用途化解析。
- [`situation-query.example.json`](situation-query.example.json)：外部 all-required condition specification；不是通用 HWM 查询语言。
- [`subject-set.example.json`](subject-set.example.json)：仅对本 query 有效的精确主体覆盖。
- [`situation-use-assessment.example.json`](situation-use-assessment.example.json)：内容绑定的规范化条件结果。
- [`situation-cases.json`](situation-cases.json)：56 个语义案例、20 个模型边界案例与 116 个唯一禁止推断。
- [`validate.mjs`](validate.mjs)：无依赖 JavaScript evaluator 与摘要链验证器。

## 对抗覆盖

oracle 区分：

- Observation、Situation Claim 与用途化 acceptance；
- phenomenon、result、issuance、ingestion 与 delivery time；
- episode 相关句柄与同一性证明；
- activity、observed pattern、schedule、Forecast、policy window 与 declared control mode；
- 一个人的 episode 与家庭人口闭包；
- 访客、宠物、在场、身份、成员关系与 Authority；
- 开放区间与永久真理；
- 模型 confidence 与 Resolver acceptance；
- absent、not observed、unavailable、denied、stale、expired、contested 与 unknown；
- 精确反驳与仅仅标签不同；
- Situation use、Routine activation、Task materialization 与 Action Authorization。

## 运行

```sh
node conformance/scenarios/situational-context-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

示例 Claim 与 World View 也应通过 Core Schema；assessment 应在严格 JSON Schema 2020-12 求值下通过 Profile 局部 Schema。

通过只证明边界内部一致，不证明活动识别准确、占用完整、生物身份、隐私合规、人口闭包、生产密码学或家庭自动化公平。

