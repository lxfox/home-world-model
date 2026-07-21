# HWM Outcome Assurance and Work Closure Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：英文
- Schema：[`outcome-work-closure-assessment.schema.json`](outcome-work-closure-assessment.schema.json)

## 目的

本 Profile 在一份 closure receipt 中表达两个独立坐标轴：

1. **Intent Assurance**：精确已采纳 Intent 的强制 expectation 在声明窗口内是否满足；
2. **Work Closure Gate**：精确 Task 是否满足自身退出条件，并且没有未解决的执行或后续义务。

receipt 不创建 Intent 或 Task 状态；独立治理的追加式状态转换只能把它作为证据。

`fulfilled` 表示本窗口内所有适用强制 expectation 在要求的完整覆盖下满足。对 transient Intent，它可能支持生命周期完成；对 persistent Intent，它只是当前 compliance，未来 drift 必须追加 `degraded` 或 `not_fulfilled`。

Task 只有在所有强制 exit criteria 满足、没有开放或投递未知的 Attempt，并且没有 recovery、compensation、副作用复核、notification、audit 或专业验收义务时，才是 `task_close_eligible`。这仍不会自动关闭 Task。

## 正交示例

- Task 可关闭 + Intent ongoing：Task 只完成了较大 Intent 的一个步骤；
- Intent fulfilled + Task remediation required：目标状态已出现，但副作用或恢复义务仍开放；
- Intent not fulfilled + Task 可关闭：诊断或实验 Task 已结束，但没有满足上层 Intent；
- persistent Intent fulfilled + Task 可关闭：关闭本 Task，Intent 仍 adopted，继续监测 drift。

缺失或不可取得证据是 `indeterminate`，不是失败。Attempt failure 不会自动使 Task failed；direct realization 也不会在事后创建 Task。

## 一致性

[Outcome Assurance and Work Closure oracle](../../../../conformance/scenarios/outcome-work-closure-v0.1/README.zh-CN.md)覆盖双轴、persistent drift、direct realization、退出条件、歧义 Attempt 与后续义务。

```sh
node conformance/scenarios/outcome-work-closure-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
