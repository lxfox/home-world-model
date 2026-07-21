# HWM Procedure Fulfilment Profile v0.1

- 状态：讨论草案
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 决策：[`ADR-015`](../../../../docs/05_decision/ADR-015-evaluate-procedure-fulfilment-before-authorization.zh-CN.md)

## 目的与边界

本可选 Profile 对 [Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.zh-CN.md) 产生的 Procedural Requirement 求值。它回答当前工作流阶段有哪些要求已履行，以及能否继续策略求值；它不产生 Permission、法律同意、物理安全、执行成功或结果接受。

输入必须精确绑定完整 Requirement Set、Proposal ID 与 revision、Authority Epoch、评估时间、阶段、当前可取得的原始 Record，以及覆盖下游所读每个字段的独立、内容摘要绑定 Evidence Standing Decision。结构见 [`requirement-set.schema.json`](requirement-set.schema.json) 与 [`fulfilment-assessment.schema.json`](fulfilment-assessment.schema.json)。

## 阶段与局部状态

`pre_authorization` 只求值 `before_authorization`；`pre_dispatch` 同时求值授权前与派发前要求；`post_execution` 求值全部要求。后续阶段要求为 `not_due`，不能解释为已履行或已放弃。

每项要求独立处于 `fulfilled`、`pending`、`negative`、`unfulfilled`、`indeterminate` 或 `not_due`。明确答复、协商机会、异议窗口、通知、适格复核和审计分别使用自己的完成规则，不能压成一个通用 `done`。

## 类型边界

- 明确答复需要精确绑定且 standing 已准入的 `confirm`；`reject` 为负面，`abstain` 仍待处理。
- 协商需要交付可访问机会，不要求参与者回答。
- 异议窗口需要到期、交付与账本覆盖完整，且没有已准入的阻断异议；部分或不可访问账本不能证明“无异议”。
- 通知需要已交付；排队、发送、已读和接受不是同一件事。
- 适格复核需要作用域内、当前适格且已准入的结果；凭证验真不自动证明主张为真，也不产生授权。
- 审计需要在到期阶段追加可校验完整性的 Record；缺失只追加行动后不合规，不改写历史授权。

原始 Record 不得把自报的 `standing_status`、证明验证、证据使用或资质结果作为准入输入。求值器必须先验证独立 [Evidence Standing Decision](../../evidence-standing/v0.1/evidence-standing-decision.schema.json) 对 Record 内容摘要、用途、Epoch、时间、基数和 `admitted_assertions` 的绑定，再读取获准字段。签名或回执不能扩大自身声明的语义范围。

## 聚合与工作流 gate

`satisfied → continue_policy_evaluation`；仅等待明确答复时 `pending → confirmation_required`；等待其他已知程序时 `pending → requirements_pending`；阻断时 `blocked → denied`；无法安全求值时保持 `indeterminate`；行动后 Duty 缺失时为 `post_action_noncompliance → historical_noncompliance`。

`authority_gate` 不是 Authorization Decision。`continue_policy_evaluation` 只允许进入下一步 Authority 求值；`requirements_pending` 有意不加入 Core Action Trace 的 decision 枚举。

## 一致性

JavaScript 与独立 Python 求值器覆盖 28 个履行用例、8 个模型边界用例与 69 个禁止推断：

```sh
node conformance/scenarios/procedure-fulfilment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
