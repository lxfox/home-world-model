# ADR-023：把家庭情境表示为有作用域 Claim，而不是全局模式

- 状态：Proposed
- 日期：2026-07-19
- 英文为规范文本：[`ADR-023-represent-household-situations-as-scoped-claims-not-global-modes.md`](ADR-023-represent-household-situations-as-scoped-claims-not-global-modes.md)

## 背景

Routine Instantiation 已定义 adopted persistent Intent 如何生成另一个有界 Task，但 eligibility 输入仍在外部。家庭运行需要“住户 A 正在睡觉”“所有相关占用者都已离家”“有访客在场”“晨间准备正在进行”等条件。它们常被压缩成可覆写的 `home | away | sleep | guest` 模式。

这种压缩会丢失语义。一位住户可以睡觉而另一位清醒；访客和宠物可以同时在场，安静时段策略也可以同时适用；报警器可以被设置成离家模式，而屋内仍有人。Observation、推断活动、Forecast、策略窗口和声明控制状态也具有不同的认知与 Authority 含义。

SOSA/SSN 已区分 observation、observed property、procedure、phenomenon time 与 result time；OWL-Time 表示重叠区间；SAREF4EHAW 提供领域 Activity 词汇；PROV-O 表示派生与归属。HWM 已有不可变 Claim、Record、Evidence Link、用途化 World View、正交状态和 Authority。真正缺少的不是新世界原语，而是失败关闭地消费已解析情境知识的边界。

## 决定

1. HWM 不得在 Core 增加全局 `HouseholdMode`、可变 context object 或通用 Activity 原语。
2. 家庭活动、在场、占用、关系或聚合用普通不可变、有作用域 Claim 表达，并使用外部 predicate／type 词表。“Situation Claim”只是 Profile 术语，不是 HWM 本体类。
3. Claim 必须把现象区间与观测、结果、事件投递、摄取、签发和处理时间分开；不得隐式替代。
4. episode EntityRef 是相关句柄，不是同一性证明。相同 ID／不同 body、跨来源等价、纠正与 supersession 仍是显式认知问题。
5. 模型 confidence 不建立 acceptance。同一 origin 的派生不会因来自不同模型就满足独立证据要求。
6. `accepted` 仍是用途化 World View 结果。当前使用还必须满足可用性、新鲜度、时间适用、主体／空间作用域、Authority Epoch 与 query binding。
7. Profile 局部 Situation Use Assessment 绑定精确 World View 与外部 query，返回 `satisfied`、`not_satisfied` 或 `indeterminate`；不定义通用查询 DSL、活动分类法或识别算法。
8. `not_satisfied` 只有在 accepted、current、in-effect Candidate 依据显式绑定的不兼容语义反驳 query 时才成立。缺失、不同、不可用、拒绝、陈旧、过期、未验证、争议或覆盖不完整的输入都是 `indeterminate`。
9. 全家庭聚合需要声明的主体覆盖。没有传感器事件、已登记住户集、已知设备或已识别人脸都不能建立人口闭包。
10. 隐私保护的不透明聚合可以满足用途化条件，但不披露身份、数量、成员关系、相等性或源证据。访问拒绝不得解释为缺席。
11. 报警器 `away` 等声明模式是控制状态 Claim；quiet hours 等时间窗是策略适用性；Forecast 是预测。它们都不建立现实活动或占用。
12. 开放 episode Claim 仍受新鲜度约束。闭合或纠正创建新 Claim、适用时创建显式 lineage，并生成新 World View；不得修改历史。
13. 访客在场、宠物在场、人员身份、家庭成员关系、参与资格和 Authority 是不同命题。
14. satisfied Situation Use Assessment 可以输入精确 Routine condition，但不授予 Routine activation、occurrence、Task、Plan、Proposal、数据访问、设备行动或 Authorization。

## 后果

- 不同 Agent 可以交换已解析的“正在发生什么”，而无需交换私有 latent context 或共同采用同一识别模型。
- 并发、嵌套和表面矛盾的家庭 episode 因主体与作用域显式而能够共存。
- 现有 Home Assistant 或 openHAB mode 可以投影，但不会被当成通用家庭真相。
- Routine eligibility 获得可复现、内容绑定的输入，并在隐私或不确定性下继续失败关闭。
- 活动识别、传感器融合、人口推断和 UI mode 设计仍是可替换实现问题。
- Core 不变；新增契约只是可选 Profile 局部 Assessment。

## 拒绝的替代方案

### 单一全局家庭模式枚举

拒绝，因为它不能保留并发住户、访客、宠物、策略适用、控制状态、不确定性和用途化披露。

### 把 Home Assistant person／zone state 当成家庭真相

拒绝，因为平台投影依赖已配置 tracker 与 zone，不建立完整占用、身份、家庭成员关系或 Authority。

### 接受最高 confidence 的活动标签

拒绝，因为 confidence 是模型局部元数据；证据 standing、相关性、用途、新鲜度、冲突与 Authority 仍需解析。

### 从没有事件推断缺席

依 open-world 与隐私语义拒绝。无观测、源不可用、访问拒绝和 accepted absence 必须分开。

### 把活动识别放进 Routine

拒绝，因为 Routine 只治理何时求值 Task 创建；识别产生描述性 Claim，必须可独立替换和审计。

## 接受前验证

1. 外部 resolver 在看不到夹具实现的情况下复现 Situation Use Assessment 案例。
2. 真实 SOSA/SSN adapter 独立保留 phenomenon time 与 result time。
3. Home Assistant 与另一运行时投影 mode、zone、occupancy 时不丢失控制状态／描述性事实边界。
4. 隐私审查挑战 subject-set closure、不透明 aggregate、数量与相等性泄漏、相机元数据和 access-denial 行为。
5. 家庭研究验证有作用域情境是否易懂，并且不会暴露敏感身份或令自动化行为不可预测。
6. 活动识别 adapter 测试纠正、重叠 episode、模态缺失、相关证据和开放区间新鲜度。

## 参考

- [SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/)
- [OWL-Time](https://www.w3.org/TR/owl-time/)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [SAREF4EHAW 2.1.1](https://saref.etsi.org/saref4ehaw/v2.1.1/)
- [Home Assistant Zone integration](https://www.home-assistant.io/integrations/zone/)
- [Home Assistant device-tracker entity](https://developers.home-assistant.io/docs/core/entity/device-tracker/)
- [TRACE](https://arxiv.org/abs/2605.02841)

