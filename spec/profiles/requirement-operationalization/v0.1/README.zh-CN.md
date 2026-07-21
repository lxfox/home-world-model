# HWM 需求操作化 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`operationalization-proposal.schema.json`](operationalization-proposal.schema.json)、[`operationalization-review.schema.json`](operationalization-review.schema.json)

## 目的

本可选 Profile 约束如何把“舒服”“全家都够亮”“夜间不刺眼”等家庭目标，翻译成可用于规划和后续验证的 Evaluation Specification。

操作化只是“怎样评价目标”的提案，不会替代原目标。Agent 可以起草，但不能偷偷发明数字代理、改变目标涉及的人、删掉不方便评价的维度，或代替家庭／专业角色接受规范。

规范链条是：

`已接受目标 Claim + 原始表达／证据 → Operationalization Proposal → 用途与角色绑定的 Review → 已接受 Evaluation Specification Claim → Target Fit`

## 关键边界

“够亮”可能同时涉及工作面照度、空间最低值、均匀度、眩光、色彩、使用时段、能耗和个人体验；“舒适温度”也可能涉及空气温度、辐射温度、湿度、风速、占用、持续时间、个体差异和安全约束。本 Profile 不替各专业领域规定阈值，而是让维度选择、遗漏、来源、权限和用途可见。

每个 criterion 声明物理性能、空间覆盖、时间／服务条件、资源成本、个人体验、无障碍、安全、合规、可靠性或其他维度；同时绑定对象／属性或精确提问、主体与时空覆盖、规划／验收／commissioning／运行阶段、证据过程、不确定性决策规则、准入角色、来源与限制。

安全与合规可以被引用，但家庭接受不能冒充专业或司法辖区批准。个人体验可以通过精确问题的 attestation 表达，传感器代理不能静默替代。群体平均也不能证明每个人都满意。

Review 分别检查目标忠实度、主体／空间／时间／阶段／维度覆盖、过程与决策规则、审阅角色、证据许可、未解决歧义与声明遗漏。结果为 `eligible_for_acceptance`、`revision_required`、`not_eligible` 或 `indeterminate`；eligible 不会自动接受规范。同一规范可适合目录筛选，却不足以用于 commissioning 或持续运行。

接受后的 Evaluation Specification 可应用于合格的 [Planning Prediction](../../planning-prediction-qualification/v0.1/README.zh-CN.md)，得到预测而非观测的 Target Fit；安装后可应用于 Observation 或 [Installed Influence Model](../../installed-influence-model/v0.1/README.zh-CN.md)。规划通过、commissioning 通过、持续符合、个人接受、安全与合规始终是不同结果。

[Requirement Operationalization oracle](../../../../conformance/scenarios/requirement-operationalization-v0.1/README.zh-CN.md)测试忠实度、覆盖、角色、阶段／用途、体验 criterion、修订与禁止下游推断。
