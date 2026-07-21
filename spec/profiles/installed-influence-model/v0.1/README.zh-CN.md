# HWM Installed Influence Model Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：英文
- Schema：[`installed-influence-model.schema.json`](installed-influence-model.schema.json)、[`model-update-assessment.schema.json`](model-update-assessment.schema.json)

## 目的

本 Profile 把多次家庭动作／观察 episode 转化为一个有边界、可移植的模型：某个**已安装系统**在声明条件下怎样影响某个 feature 的 property。它不是产品能力、通用设备定律、Observation、已接纳事实或行动授权。

一个 model lineage 固定家庭、精确 installed endpoint、安装／空间几何、affected feature、property 与动作种类。设备替换、移动、重新安装、重大几何变化或目标 property 变化必须创建新 model ID。新样本、估计参数、不确定性和验证报告只能产生不可变的连续候选 revision。

`predictive_association` 只预测 action/context 条件下的 outcome；`causal_response` 才声称动作贡献，训练 episode 必须具备接纳的 Causal Contribution Assessment。单次成功只是 calibration sample；device ack 不是 outcome sample；realized 但因果未知的 episode 可以按 policy 更新 association，却不能更新 causal-response。

模型必须声明输入范围、外界光／天气、先前状态、时间、测量过程、空间或主体覆盖等 applicability domain。域外输入返回 `indeterminate_no_extrapolation`。训练拟合不等于 validation；validated 也仍需独立、用途化 acceptance，且不授予行动权限。

模型不存在一个万能 confidence：prediction uncertainty、calibration error、coverage、数据质量、因果方法不确定性和 acceptance 必须分开。simulation、制造商声明与家庭经验数据也保持不同 epistemic basis。

## 一致性

[Installed Influence Model oracle](../../../../conformance/scenarios/installed-influence-model-v0.1/README.zh-CN.md)覆盖身份、语义种类、证据准入、validation、privacy、drift、applicability、设备替换与禁止泛化。

```sh
node conformance/scenarios/installed-influence-model-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
