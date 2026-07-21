# HWM Plan Materialization Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)

## 目的

本可选 Profile 判断 Agent 的方法何时必须成为家庭可携带 Plan，而不是停留在短暂私有推理中；同时定义最小结构化 Plan 边界，而不要求披露 prompt、hidden state 或 chain-of-thought。

规范链为：

`精确 realization + 已接受 Plan Materialization Policy Claim + 下游依赖 Assessment -> Materialization Assessment`

结果是 `plan_artifact_required`、`proposal_self_contained` 或 `indeterminate`。

## 三个不同对象

- **Private reasoning**：模型／runtime 局部计算，不是家庭证据、provenance、Authority 或 portable Plan。
- **Portable Plan**：有版本的决策结构，只保存对外有意义的输入、假设、备选、依赖、检查点、contingency 与 provenance。
- **Action Proposal**：一个精确行动候选与 policy 边界；即使绑定 Plan，也必须对 impact review 和 Authorization 自包含。

Plan 不得包含或要求 raw prompt、模型 hidden state、无限制对话历史、secret 或 chain-of-thought。生成的 rationale 是带归因摘要，不是模型真实内部推理的证明。

## 何时必须材料化

accepted policy 可以在下游依赖单一 Proposal 之外的方法结构时要求 Plan，包括：跨 Proposal 顺序／依赖、Agent／人员交接、家庭比较备选、Authority／专业 review／audit／procedure 依赖方法、跨时间或 World View 监测假设、跨 Proposal checkpoint／rollback／compensation／contingency、Task progress／exit criteria 依赖方法，以及 Proposal、Task、Decision 或后续 Plan 显式引用该 Plan。

`proposal_self_contained` 只表示该 realization 在精确 policy 下不需要外部 Plan；不禁止可选 Plan，也不授权 Proposal。policy 缺失或依赖未知绝不默认短暂私有推理。

## Portable Plan 与 Proposal

[`Portable Plan`](portable-plan.schema.json) 绑定稳定 Plan ID、顺序 revision 与上一版内容，家庭、用途、精确 Intent、可选 Task、Work Routing Assessment、源 World View、不可变 realization scope、decision input／assumption 摘要、步骤依赖与 outcome gate、结构化备选 disposition、checkpoint／contingency、作者、时间与 proof。

它记录决策相关结构，不记录完整思考。未列出的备选不能声称已经考虑；`not_selected` 不表示不可行或被禁止。预测与假设仍是拥有独立认知状态的 Claim／Assessment。

Plan revision 追加且不可变。方法、假设、依赖、selected alternative、scope 或 contingency 改变时，根据身份 policy 产生新 revision 或新 Plan。依赖 revision N 的 Proposal 永远绑定 N；N+1 不能追溯修改它的 Authorization。

Proposal 即使引用 Plan，也必须自包含精确 action/parameter、target resource/scope、precondition、intended effect/declared impact、pre-action World View、Intent、Task/direct-route、相关 Plan binding、proposal revision 与 Authority Epoch。授权所需信息如果只存在于私有 Plan 或 prompt 中，Proposal 必须 fail closed。Plan review、selection、acceptance 或 materialization 都不授权 Proposal。

## 不变量

1. 私有推理、rationale summary、portable Plan、Proposal 与 Authorization 分离。
2. HWM 不要求 chain-of-thought 或 hidden-state disclosure。
3. rationale 是归因内容，不证明内部因果忠实。
4. accepted policy 下游依赖方法结构时，必须绑定精确 portable Plan。
5. policy 缺失或未知为 indeterminate，不默认 ephemeral。
6. Plan 只记录已声明备选，遗漏不证明任何事。
7. Plan 假设和预测保持独立认知状态。
8. Plan revision 不静默重定向已有 Proposal 或 Task。
9. 即使绑定 Plan，Proposal 仍必须自包含。
10. 不可访问 Plan 不能隐藏动作参数、影响或前提。
11. Plan materialization／selection／acceptance 不授予 Intent adoption、Proposal Authorization、dispatch 或 outcome。
12. 敏感私有推理和 prompt 不是家庭审计日志。

## 标准、证据与非目标

[PROV-O](https://www.w3.org/TR/prov-o/) 把 Plan 定义为表示为实现目标而预期执行的动作／步骤的 Entity；[NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) 支持为透明、review、accountability、risk 与 impact 做文档化；[Turpin 等](https://proceedings.neurips.cc/paper_files/paper/2023/hash/ed3fea9033a80fea1376299fa7863f4a-Abstract-Conference.html) 表明生成式 chain-of-thought 解释可能不忠实；[Workflow Patterns](https://research.tue.nl/files/2053121/613310.pdf) 支持显式依赖与多工作项结构。HWM 因此交换可验证决策结构，不声称读取内部认知。

[Plan Materialization oracle](../../../../conformance/scenarios/plan-materialization-v0.1/README.zh-CN.md) 测试自包含原子 Proposal、跨 Proposal 依赖、交接、家庭选择、方法 review、私有 prompt 泄漏、Plan revision 与禁止授权推断。[`Materialization Assessment`](plan-materialization-assessment.schema.json) 和 [`Portable Plan`](portable-plan.schema.json) 固定交换边界。

本 Profile 不标准化模型认知、不要求 chain-of-thought、不定义通用 planner、不要求穷举备选、不证明预测准确，也不授权行动。
