# ADR-015 — 在授权前评估程序履行状态

- 状态：提议
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`ADR-015-evaluate-procedure-fulfilment-before-authorization.md`](ADR-015-evaluate-procedure-fulfilment-before-authorization.md)

## 背景

ADR-014 产生异构且由系统负责的 Procedural Requirement，但有意没有规定哪些 Record 能分别履行明确答复、协商机会、异议窗口、通知、适格复核或审计。若复用一个 `done` 布尔值，或把所有未完成程序都叫作 `confirmation_required`，就会重新抹掉 ADR-014 建立的区别。

模型还必须区分尚未到期与已经履行、已知等待与求值输入缺失，以及行动后不合规与追溯撤销历史授权。

## 决策

1. HWM 增加可选的 **Procedure Fulfilment Profile v0.1**；Core 不变。
2. 一次履行评估绑定一份完整 Requirement Set、精确 Proposal ID 与 revision、Authority Epoch、评估时间和求值阶段。
3. 三个阶段为 `pre_authorization`、`pre_dispatch` 与 `post_execution`。后续阶段要求为 `not_due`，不能默认为已履行或已放弃。
4. 每项已到期要求独立求值为 `fulfilled`、`pending`、`negative`、`unfulfilled` 或 `indeterminate`；评估保留全部局部状态。
5. Record 准入要求精确匹配 Proposal revision、Epoch、requirement、时间与隐私安全的 participation slot。Record 若主张答复或复核结果，证据使用授权与 Evidence Standing 仍是独立前提。
6. 完成规则保持按类型区分：明确答复需要已准入的 `confirm`；协商需要交付可访问机会而非强迫回答；异议窗口需要到期、完整账本覆盖且没有已准入的阻断异议；通知需要已交付而非排队、已读或接受；适格复核需要作用域内、当前适格且已准入的结果；审计需要在声明的行动后阶段追加可校验完整性的 Record。
7. `access_denied`、部分覆盖、状态不可取得、冲突的当前 Record 等输入缺失不能证明不存在或已经完成；策略无法安全判断时保持 `indeterminate`。
8. 聚合程序状态为 `satisfied`、`pending`、`blocked`、`indeterminate` 或 `post_action_noncompliance`。
9. Profile 输出工作流 `authority_gate`，而不是 Authorization Decision：当前阶段全部履行时为 `continue_policy_evaluation`；只有全部待处理项都是声明了相应失败效果的明确答复时才为 `confirmation_required`；其他已知待处理程序为 `requirements_pending`；阻断性负面信号或拒绝后果为 `denied`；无法安全求值为 `indeterminate`；行动后 Duty 缺失为 `historical_noncompliance`。
10. `requirements_pending` 是工作流状态，不是第五种 Core Authorization Decision。当前授权前或派发前 gate 仍待处理时，服务不得发出 `allowed`。
11. `post_action_noncompliance` 追加新的合规评估，不能改写历史授权或 Action Trace。
12. `satisfied` 只允许进入下一步策略求值，不代表许可、安全、法律同意、成功执行或结果接受。

## 依据

[ODRL 2.2](https://www.w3.org/TR/odrl-model/) 区分 Duty 履行与 Permission；[XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-cos01-en.html) 在义务表达式无法求值时保留 `Indeterminate`；[ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-vocabulary/) 区分 `Accept`、`Reject`、`Read` 与 `Arrive` 等活动；[PROV-O](https://www.w3.org/TR/prov-o/) 提供评估 Record 的生成沿袭；[Verifiable Credentials 2.0](https://www.w3.org/TR/vc-data-model-2.0/) 明确指出凭证验真本身不保证其中主张为真。HWM 组合这些边界，而不发明通用的交付、同意、能力或授权证明。

## 证据

可执行场景现包含 28 个阶段、Record 与准入敏感用例、8 个模型边界用例、69 个禁止推断，以及相互独立的 JavaScript 与 Python 求值器；除既有边界外，还覆盖精确内容绑定的 Standing Decision。
