# ADR-010：解析事实，不提升 Claim

- 状态：提议
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`ADR-010-resolve-facts-without-promoting-claims.md`](ADR-010-resolve-facts-without-promoting-claims.md)

## 背景

家庭模型可以从导入几何、手机扫描、Agent 推断或设备关联假设开始。之后的摄像头观测、家庭确认，或“我打开了卧室小夜灯，你看到了吗？”这样的主动交互，可能足以让系统依赖模型中的某一部分。住户也可能拒绝或纠正 Agent 的认识。

在对话中称之为“把视图提升为事实”很直观，但作为数据操作并不安全：它容易暗示修改原 Claim、设置全局真值标志，或把接纳范围扩大到证据没有覆盖的命题、用途、时间和 Authority。

外部标准覆盖了重要环节，却没有提供完整决定。SOSA／SSN 描述观测、执行、过程、结果与 Feature of Interest；PROV-O 描述生成、派生、归属与失效，而 PROV-AQ 明确把对 provenance 的信任和对被描述资源的信任分开；Web Annotation 可以把问题或回复绑定到精确目标；Verifiable Credentials 可以保护发布者声明并附加 evidence，但可验证性不等于 Claim 为真，Verifier 仍须执行自己的策略。

## 决定

1. HWM 不得增加全局 `Fact` 类、可变 `fact_status` 或“提升 Claim”操作。
2. “已接受事实”只是对 World View 解析结果的通俗简称：它必须可用、认知上 `accepted`、时间上适用、对声明用途足够新鲜，并由具名 Resolver Profile 和 Authority epoch 产生。
3. Evidence 不改变 Claim Body。新证据只追加 Evidence Link 并生成新的不可变 World View；早先 View 继续作为当时已知状态的历史快照。
4. 视觉证据必须标识精确目标 Claim 或命题作用域、Feature of Interest、被观测属性、过程、现象／结果时间、源制品或摘要，以及证据来源。同一帧派生的两份视觉模型报告不算两个独立来源。
5. 家庭确认必须绑定精确问题与目标命题。“是的，我看到了”中的“它”无法无歧义解析时，该回答不能成为 `confirms` 关系。
6. 证据具有作用域上限。某次卧室挑战中确认端点产生可见变化，可以依具名策略支持狭窄的端点—区域关联；不得据此确认精确位姿、制造资产身份、照度、需求满足或其他上下文中的可重复因果性。
7. 使用动作进行挑战时，授权、派发、应答、物理观测、影响评估与家庭确认仍是 Action Trace 的独立维度。设备应答本身不证明物理效果。
8. 否定回答或 `refutes` Evidence Link 会质疑目标 Claim，却不会创建其逻辑否定或另一个位置 Claim。World View 必须能表达“一条 Candidate 被一条反驳 Record 质疑”。
9. 纠正会创建新 Claim、显式 supersession／replacement 关系，以及支持纠正并在适用时反驳或撤回旧 Claim 的证据。只有新 Claim 满足声明的准入策略后，当前 View 才改变；未经验证的纠正不能隐藏已经合格的 Claim。
10. Resolver 准入策略必须显式、版本化、用途限定并受 Authority 管理。HWM 标准化证据与结果边界，不规定一个通用置信分数或真理算法。
11. 允许使用证据本身不建立认知适格性。可选 Evidence Standing Profile 独立判断一条 Record 能否为目标命题和用途进入解析。
12. 生物识别、隐蔽人员追踪与通用家庭权力规则继续位于 Core 之外。交互证据 Profile 必须最小化媒体采集，并只披露当前 View 用途获准看到的证据。

## 后果

- 不同 Agent 可以复现家庭命题为什么被接纳，不必继承另一个 Agent 的私有置信状态。
- 住户可以纠正模型，同时保留早先 Claim 与 View 的可审计历史。
- 主动交互成为合法降级证据路径，但只覆盖实际被测试的命题。
- World View Schema 必须允许“一条 Candidate 加一条反驳 Record”形成 `contested`；禁止为满足格式而虚构第二条 Claim。
- 不增加新的顶层世界原语。

## 接受前验证

- 两个独立 Resolver 必须复现所有准入与纠错用例。
- 单 Candidate 争议 World View 必须通过已发布 Core Schema。
- 外部实现者必须挑战精确问题绑定、证据来源、作用域上限与合格 supersession 规则。
- 隐私审查必须覆盖摄像制品、家庭确认、访问拒绝、保留与删除。

## 参考资料

- [SOSA／SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [PROV-AQ 信任边界](https://www.w3.org/TR/prov-aq/)
- [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)
- [Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/)
