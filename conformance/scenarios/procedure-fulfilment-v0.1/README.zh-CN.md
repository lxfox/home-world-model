# Procedure Fulfilment v0.1 场景

- 状态：讨论夹具
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- Profile：[`spec/profiles/procedure-fulfilment/v0.1/`](../../../spec/profiles/procedure-fulfilment/v0.1/README.zh-CN.md)

场景让同一份共享卧室 HVAC Proposal 依次经过授权前、派发前和执行后评估。七项要求覆盖明确答复、协商机会、异议窗口、两项通知、适格复核与审计六种类型。

[`fulfilment-cases.json`](fulfilment-cases.json) 包含 28 个可执行用例与 8 个模型边界用例。原始 Record 只携带程序陈述，[`admission-decisions.json`](admission-decisions.json) 则保存独立、RFC 8785/SHA-256 内容绑定的 Evidence Standing Decision。用例验证自报准入无效、摘要与用途绑定、字段级准入、交付与排队、完整异议账本、冲突 Record、按阶段的 `not_due` 和行动后不合规。69 个禁止推断阻止准入或履行被解释为真理、同意、授权、安全、强制参与或改写历史。

```sh
node conformance/scenarios/procedure-fulfilment-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
