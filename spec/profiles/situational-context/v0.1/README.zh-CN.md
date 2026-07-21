# HWM 情境上下文 Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 英文为规范文本：[`README.md`](README.md)
- 许可证：CC BY 4.0
- Profile 局部 JSON Schema：[`situation-use-assessment.schema.json`](situation-use-assessment.schema.json)

## 目的

本可选 Profile 规定：一个有时间边界的家庭情境，如何在不把传感器事件、模型标签、日历项、控制模式或策略时间窗误当成家庭现实的前提下，限定地满足某个下游条件。

规范链条是：

`Observation 或 attestation → Situation Claim → 用途化 World View → Situation Use Assessment → 精确 Routine eligibility condition`

本 Profile 不增加 `Situation`、`Activity`、`Presence` 或 `HouseholdMode` Core 原语。它复用 EntityRef、Claim、Record、Evidence Link、World View、Authority 与外部语义词表，只规范消费边界，不规范活动识别算法。

## 为什么不存在全局家庭模式

同一时刻完全可能同时成立：一位住户在睡觉、另一位住户清醒、有访客在场、宠物在移动、安静时段策略适用、报警系统被声明为离家模式。这些命题作用域不同而且互不矛盾。单一 `home | away | sleep | guest` 值会丢失主体、空间、时间、来源、不确定性、隐私与策略区别。

实现可以提供便利模式，但必须把它表示为以下之一：

- 声明式控制状态 Claim，例如报警系统的 `away` 状态；
- 针对用途、由已披露 Situation Claims 派生的投影；
- 明确标为非规范的应用界面标签。

该标签不能证明占用、身份、家庭成员关系、活动、Intent、Routine activation、Task materialization 或 Authorization。

## Situation Claim

“Situation Claim”只是 Profile 内对普通不可变 HWM Claim 的称呼：其命题描述具有时间作用域的活动、在场、占用、关系或聚合；它不是本体类。

可复用 Situation Claim 必须保留：

- 精确命题主体以及外部 predicate／type IRI；
- 适用时明确的人、宠物、不透明参与主体、空间或家庭作用域；
- 所声称的现象区间，并与观测、结果、摄取和签发时间分离；
- 认知依据和产生 Claim 的过程；
- 足以识别相关派生的证据 origin 与来源；
- 用途和家庭作用域；
- 当多条 Claim 需要共同相关句柄时使用 episode EntityRef。

活动类型应尽量复用合适的外部词表。夹具使用 SAREF4EHAW `Activity` 与 `hasActivity`；时间区间复用 OWL-Time 概念，同时 HWM 线格式保留半开区间；观测与动作证据复用 SOSA/SSN；派生和归属复用 PROV-O。

episode EntityRef 只是相关句柄。两个不同 body 复用同一标识，不能证明它们描述同一个现实事件。跨来源同一性、等价、纠正和取代仍由 Claim 表达并通过 World View 解析。

## 时间与 Episode 生命周期

SOSA/SSN 区分现象适用的时间与结果可用的时间。没有具名、可解释的过程时，Situation Claim 不得用 `resultTime`、事件投递时间、摄取时间或 `issued_at` 替代 episode 区间。

`valid_time.from = t` 且没有结束边界，只表示 issuer 声称 episode 从 `t` 起仍在进行，不表示永久成立。只有 World View 仍判定证据足够新鲜且 Claim 在时间上 `in_effect` 时，它才可用于当前条件。

episode 结束，或其类型、参与者、空间、时间边界被纠正时，实现创建新 Claim，并在适用时添加显式 supersession 关系；不得修改旧 Claim 或重写旧 World View。已闭合 Claim 仍可满足 `as_of` 落在其区间内的历史查询。

## World View 与 Use Assessment

[`Situation Use Assessment`](situation-use-assessment.schema.json) 绑定：

- 精确 World View 摘要、用途、`as_of` 与 Authority Epoch；
- 精确外部 query／condition specification 摘要；
- 输入 World View resolutions 及其正交状态轴；
- 显式 subject coverage 及其内容绑定依据；
- `satisfied`、`not_satisfied` 或 `indeterminate` 规范化结果。

本 Profile 不定义通用查询 DSL 或活动分类法。只有当绑定的 query 语义显式声明两个值不兼容，并且当前、accepted、in-effect Candidate 确立这种不兼容时，`qualification_status = contradicted` 才成立。仅仅标签不同或没有 Candidate 都是 `indeterminate`，不是 false。

必需输入只有同时满足可用、认知 accepted、足够新鲜、时间生效、用途兼容、主体和空间精确匹配时才能通过。`access_denied`、`not_observed`、`source_unavailable`、`unknown`、`not_verified`、`contested`、`stale`、`expired`、部分覆盖和未知人口闭包均失败关闭为 `indeterminate`。

## 主体覆盖与隐私

Assessment 区分：

- `exact_subjects`：内容绑定的已披露 EntityRef 集；
- `declared_population`：用于“所有相关住户都离家”等命题的受治理人口闭包；
- `opaque_aggregate`：隐藏身份与数量、但获准用于具名用途的聚合；
- `not_required`：无需主体人口要求的条件。

一个人的 episode 永远不能建立全家庭情境。没有 motion 或 presence event 也不能关闭主体集合。已登记住户、配对手机、已知人脸和已知设备都不自动代表全部占用者。

不透明聚合可以在不披露身份、数量、成员关系、跨 Assessment 相等性、相机存在或源 Claim ID 的情况下限定地满足条件。访客在场不建立家庭成员关系或参与权；宠物在场不建立人类占用或 Authority。

采集、生物识别、身份解析、Situation Claim 准入、聚合披露、Routine 使用和行动执行都需要各自适用的 Authority 与隐私决定。访问拒绝意味着不披露，不意味着缺席。

## Routine 边界

`satisfied` Situation Use Assessment 可以作为一个精确 Routine occurrence 的外部 condition assessment 绑定，但它不会：

- 触发或激活 Routine；
- 建立 persistent Intent；
- 创建 logical occurrence 或 Task；
- 选择 Plan 或 Proposal；
- 授予设备、相机或数据处理权限；
- 授权、派发或证明行动。

同一 Assessment 也可以输入可选 [Contextual Applicability Profile](../../contextual-applicability/v0.1/README.zh-CN.md)，由独立接受的 Rule 判断一条精确 Preference、Goal、Requirement 或 Constraint 是否相关。Situation satisfied 本身永远不会建立 Need，也不会自动让目标适用。

Routine Instantiation Profile 仍独立求值 activation、trigger evidence、condition binding、occurrence identity、lateness、overlap、deduplication 与精确 Task materialization。

## 标准定位

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) 提供 Observation、Feature of Interest、Property、procedure、`phenomenonTime` 与 `resultTime`。
- [OWL-Time](https://www.w3.org/TR/owl-time/) 提供区间、时刻、边界、时长与区间关系。
- [PROV-O](https://www.w3.org/TR/prov-o/) 提供生成、派生、归属、Activity 来源与起止时间投影。
- [SAREF4EHAW 2.1.1](https://saref.etsi.org/saref4ehaw/v2.1.1/) 提供领域化 HealthActor Activity 词汇，包括日间与夜间活动；适用时复用，但不把它当作通用家庭活动分类法。
- [Home Assistant Zone](https://www.home-assistant.io/integrations/zone/) 与 [device-tracker state](https://developers.home-assistant.io/docs/core/entity/device-tracker/) 展示了实用的人／区域投影；它们是运行时输入，不证明完整占用或身份。
- [TRACE](https://arxiv.org/abs/2605.02841) 是近期研究证据：稀疏局部传感器模式仍有歧义，需要更广时间、多源和用户化上下文。HWM 不规范其识别模型。

## 不变量

1. Observation、Situation Claim、World View acceptance、condition use、Routine activation、Task materialization 与 Action Authorization 分离。
2. 不存在规范性全局家庭模式。
3. Situation Claim 必须具有主体、空间、时间、用途、来源与 Authority 作用域。
4. 现象时间不是结果、投递、摄取、签发或处理时间。
5. 事件投递身份不是 episode 身份。
6. 模型 confidence 是 issuer 元数据，不是 World View acceptance。
7. 同一 evidence origin 的多次派生不会变成独立证据。
8. 开放 episode 受新鲜度约束，不建立永久性。
9. 纠正与闭合追加 Claim 和 View，不修改历史。
10. 一个主体不提供隐式家庭人口闭包。
11. 缺失、拒绝、陈旧、争议、过期或部分覆盖的知识不是 false。
12. 不同活动标签不自动矛盾，除非绑定语义明确声明不兼容。
13. 在场不建立身份；访客或宠物在场不建立成员关系、人类在场或 Authority。
14. satisfied Situation Use Assessment 不授予 Routine activation、Task、Proposal、数据访问或行动权限。

## 可执行证据

[Situational Context oracle](../../../../conformance/scenarios/situational-context-v0.1/README.zh-CN.md) 包含 56 个语义案例、20 个模型边界案例与 116 个禁止推断，并提供 Core-valid 睡眠 episode Claim、用途化 World View、内容绑定 subject set、外部 query 以及摘要验证的 Profile 局部 Use Assessment。

JavaScript 与 Python 独立复现决策表。这只是内部实现多样性，不是组织独立性，也不证明任何识别算法准确。

## 非目标

本 Profile 不定义通用活动本体、全局 context object、生物识别、person tracker、家庭人口 oracle、传感器融合算法、概率阈值、健康诊断、监控策略、日历系统、mode engine、Routine DSL、Planner 或 Authorization rule。
