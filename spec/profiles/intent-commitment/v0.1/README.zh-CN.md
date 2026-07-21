# HWM Intent Commitment Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范：[`README.md`](README.md)

## 目的

该可选 Profile 区分“希望某个结果”与“家庭决定持续推进这个结果”。它让 Agent 可以交换声明式 Intent，同时不把偏好、请求、推测需求、Plan、Task 或权限误当成 Intent。

HWM Intent 是围绕声明式 expectations、由 Authority 中介并可修订的家庭承诺。Agent 更换时，承诺仍由家庭持有。它不新增 Core 原语。

## 必须分开的对象

1. **观测或话语**记录发生了什么或说了什么；“有点冷”不是 Intent；
2. **Preference** 表达某个主体通常偏好什么，仍然绑定该主体；
3. **Goal、Requirement、Constraint Claim** 声明期望状态、阈值或限制，是内容而非承诺；
4. **Intent Definition** 打包声明式 expectations，只说要什么结果，不说如何实现；
5. **Intent Commitment State** 记录 Authority 是否采纳、暂停、撤回或替代精确定义；
6. **Fulfillment State** 独立用当前证据评估结果；
7. **Task** 是针对某个精确 Intent revision 的有界工作；
8. **Plan** 是方法，**Proposal** 是精确行动候选，**Authorization** 决定该行动能否继续。

Agent 可以生成候选 Definition，却不能代表家庭自我采纳。World View 接纳、用户身份、密钥控制、重复行为和自然语言祈使句都不能替代 Authority 决策。

采纳之后，可选 [Work Realization Routing Profile](../../work-realization-routing/v0.1/README.zh-CN.md) 判断一次精确 realization 是否需要持久 Task lineage，或可以进入一个有界 Proposal candidate。采纳本身不选择任一路径。

可选 [Contextual Applicability Profile](../../contextual-applicability/v0.1/README.zh-CN.md) 可以判断一条已接受 Preference、Goal、Requirement 或 Constraint 是否应在某个精确情境中被考虑。`applicable` 仍不会创建候选 Definition 或采纳 Intent；适用性、目标满足、冲突与承诺继续分离。

对于 Agent 发现的目标缺口，可选 [Deliberation Eligibility Profile](../../deliberation-eligibility/v0.1/README.zh-CN.md) 可以判断该议题能否进入经治理的商议队列。它只是主动创建候选内容的可选依据，不是采纳或通知权限。用户明确请求走直接候选路径，不能被重分类成 Agent 推断的 Need。

## 身份与修订

Intent 是由家庭控制的 lineage，其不可变身份基础是：

`家庭 + 用途 + transient/persistent 生命周期 + 受益者 + 范围`

expectations 只有在顺序绑定上一版、身份基础不变、Authority continuity decision 绑定新旧内容、expectation lineage 覆盖新旧 expectations，且至少保留一条语义连续关系时，才能在同一 Intent 中被 refined、relaxed、corrected 或 restated。

若全部旧 expectation 都被删除并换成无关内容，就是新 Intent。家庭、用途、生命周期、受益者或范围变化也产生新 Intent。

Intent revision 不会静默重定向已有 Task；Task 始终绑定精确 Intent Definition 摘要。变化后的工作需要新 Task 或显式 Task 转换。

## 承诺与履行

两条状态轴必须分离：

- `commitment_status`：`proposed`、`adopted`、`suspended`、`retracted`、`superseded`、`indeterminate`；
- `fulfillment_status`：`not_evaluated`、`not_started`、`ongoing`、`fulfilled`、`not_fulfilled`、`degraded`、`indeterminate`。

`adopted` 需要精确 Definition 上的 Authority 决策。暂停、撤回和替代需要绑定内容的 Authority 转换及 Record；替代还要绑定新 Intent。

`fulfilled` 要求所有强制 expectation 都有证据且满足。对 persistent Intent，它只是当前 compliance 快照；以后发生 drift 时追加 `degraded` 或 `not_fulfilled`，不能改写旧结果。撤回不证明失败，不删除证据，也不自动取消 Task 或撤销行动授权。

## 多人、冲突与周期

个人偏好、候选 Intent 和已采纳家庭 Intent 可以同时存在。冲突是独立 Assessment。HWM 不定义通用优先分、投票、偏好合并或效用函数；Authority 与相关 coordination Profile 决定过程，Agent 不得从多个人的偏好合成家庭 Intent。

宠物行为或推测需求不能被伪装成宠物发布的人类式 Intent；照护者可以明确归属地发布 welfare Goal 或 Requirement。

Routine 是经 Authority 激活的 Task 实例化策略，不自动等于 persistent Intent。只要 persistent Intent 保持 adopted，它可以由多个 Task 推进。Routine 可以提出候选 Intent 内容，但不能实例化或采纳 Intent；只有通过显式 [Routine Instantiation Profile](../../routine-instantiation/v0.1/README.zh-CN.md) 才可物化 Task。仅观察到重复模式既不会形成 commitment，也不会形成 activation。

## 标准复用

- [RFC 9315](https://www.rfc-editor.org/rfc/rfc9315.html)：复用声明式“what, not how”、fulfillment／assurance 分离及 Intent 修订／撤回生命周期；
- [RFC 9316](https://www.rfc-editor.org/rfc/rfc9316.html)：复用 scope、冲突意识和 transient／persistent 分类；
- [TM Forum TMF921](https://www.tmforum.org/open-digital-architecture/open-apis/intent-management-api-TMF921/v5.0)：参考 owner／handler 交互与独立报告，但不把电信本体引入家庭词汇；
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)：复用修订、派生、生成、失效与 Plan 来源；
- [W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/)：复用 Authority 映射中的策略、许可、禁止、Duty、Party 与 constraint；Intent 采纳仍不同于行动许可；
- Cohen 与 Levesque 的 [“Intention Is Choice with Commitment”](https://doi.org/10.1016/0004-3702(90)90055-5)：为 desire 与持续承诺的区别提供研究依据，不是线格式。

该 Profile 不标准化人类心理、不推断私有心智状态、不规定 Planner、不定义通用家庭治理，也不替代工作流或策略引擎。

## 不变量

1. 话语、Preference、Goal Claim、候选 Definition、已采纳 Intent、fulfillment、Task、Plan、Proposal 与 Authorization 必须分开；
2. Intent 是声明式结果，不能编码方法或设备命令；
3. Agent 可以提议，但不能自我采纳家庭 Intent；
4. 采纳与履行是正交、追加式状态；
5. 修订需要上一版内容、Authority、身份基础与 expectation lineage 连续；
6. 无关 expectation 替换或身份基础变化产生新 Intent；
7. Intent revision 不能静默重定向 Task；
8. 冲突不合成优先级、投票、偏好或权限；
9. persistent fulfillment 是时点 assurance，不是永久成功；
10. 暂停、撤回、替代或 fulfilled 都不隐式取消 Task，也不签发／撤销行动授权。

验证命令见英文规范。夹具只证明边界可被证伪，不代表社区采纳或生产安全。
