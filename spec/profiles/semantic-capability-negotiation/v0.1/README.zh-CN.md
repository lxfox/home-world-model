# HWM 语义能力协商 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`capability-offer.schema.json`](capability-offer.schema.json)、[`capability-requirement-set.schema.json`](capability-requirement-set.schema.json)、[`capability-qualification-assessment.schema.json`](capability-qualification-assessment.schema.json)

## 目的

本可选 Profile 判断一个 Agent implementation 是否具备某个家庭用途所需的语义与运行能力。它扩展 [Agent Admission](../../agent-admission/v0.1/README.zh-CN.md)较粗的 compatibility 轴，但不把解析、Schema validation、自我声明、conformance evidence、runtime availability、家庭信任、访问或行动权限合并。

规范链条是：

`用途化 Capability Requirement Set + content-bound Agent Capability Offer + evidence／standing／runtime checks → Capability Qualification Assessment → Agent Admission compatibility input`

每个精确 Profile／version／role 区分 `transport_parse`、`schema_validate`、`round_trip_preserve`、`semantic_consume`、`semantic_produce`、`semantic_evaluate`、`procedure_adapter` 与 `runtime_execute`。支持其中一项不推出其他项。Relay 可以保留 opaque data 却不理解；validator 可以拒绝错误结构却不会评价家庭语义；planner 可以消费 Prediction，却不一定能生产或验证仿真。

Offer 绑定 implementation／build／environment、canonicalization／proof suite、Profile versions、roles、invariant／test-suite、未知 extension 行为、domain procedure／adapter、limits、evidence、runtime status、期限与 proof。Evidence level 区分 `self_declared`、`implementation_tested`、`independent_implementation_tested` 和 `production_observed_for_declared_scope`；项目自有 fixture 通过只属于 implementation-tested，不是社区独立验证或生产安全。

Requirement Set 明确 purpose、audience、operation、required／optional Profile-version-role、最低 evidence level、extension preservation、unit／vocabulary mapping、proof、offline resolution、domain adapter、可接受降级和 fail-closed 行为。Profile ID 相同不表示 version compatible；更高版本也不会自动向后兼容，非 exact 使用需要有方向、有损失声明的已接受 compatibility mapping。

每项与总体结果都是 `qualified`、`qualified_with_limits`、`not_qualified` 或 `indeterminate`。必需能力失败不能被其他能力分数平均掉；可选能力缺失仍是机器可见限制。Schema validation 不等于 semantic consume／evaluate，厂商名称、模型规模、通用 benchmark 或自然语言解释不是 conformance evidence。

显式降级可以是 read-only limited、opaque relay、qualified mediator required 或 refuse。Opaque relay 不能作语义决定；mediator 的 capability、trust、access、attribution 与 authority 独立求值，不能被请求 Agent 继承。

Capability 绑定时间与环境。测试过但未安装、未配置、不可达、许可不可用或不健康的 adapter 不是当前可执行；runtime 可达也不证明语义合格。Build／adapter／Profile／suite／mapping／evidence／environment 变化时生成新 Offer 与 Assessment，不会静默扩张既有 Admission／Lease。

[Semantic Capability Negotiation oracle](../../../../conformance/scenarios/semantic-capability-negotiation-v0.1/README.zh-CN.md)测试角色分离、版本、证据、extension、adapter、runtime、降级、mediator、refresh 与禁止权限推断。
