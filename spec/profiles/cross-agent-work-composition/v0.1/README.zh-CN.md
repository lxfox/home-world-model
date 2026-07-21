# HWM 跨 Agent 工作组合 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：英文 [`README.md`](README.md)

## 目的

本 Profile 让不同实现的 Agent 组合有边界的工作，但不创造特权“总控 Agent”，也不让家庭权限沿依赖图传播。

规范链为：

`Task／直接 realization 依据 + 可移植 Plan 需要 -> 工作组合计划 -> 逐 slot 的能力、准入、披露及必要权限检查 -> 有归属的输出 -> 独立验收 -> 依赖释放 -> 组合评估`

工作组合不会创建 Intent、Task、Plan 接受、行动提案、授权、Attempt、家庭事实或结果。

## 三个制品

**工作组合计划**是不可变修订，绑定家庭、工作依据、用途、Authority epoch、World Views、工作槽、无环依赖图、集成和退出条件。每个槽声明最小输入披露、输出契约、能力要求、执行模式、actor 与责任主体、必要权限、重试／幂等／取消／保留策略。依赖边只传数据要求，不传身份、信任、Lease 或权限。

**工作槽分派**把精确计划修订和槽绑定到 Agent 实例、能力资格、准入、披露决定、输入摘要，以及必要时独立的权限决定。计算分包不是 impersonation，也不是委托行动；请求者和工作者互不继承主体、能力、访问、Lease 或权限。

**工作组合评估**分别保存槽状态和整体状态。只有 `accepted_for_dependency` 才释放下游依赖；传输成功、工作者自报完成、schema 有效和提交输出都不够。验收检查内容绑定、语义验证、证据适格性、来源、最小披露与保留策略。

## 关键边界

- slot 成功不等于集成成功；集成成功不等于 Task 完成；Task 完成不等于 Intent 达成。
- 控制设备的 slot 只能产出 Action Proposal 候选，不能绕过授权、安全、Attempt、观测和结果链。
- 网络 exactly-once 不等于物理 exactly-once；重试、fallback 和重新分派必须显式且保留历史。
- 不要求共享 chain-of-thought 或私有记忆。

## 可执行证据

见[跨 Agent 工作组合 oracle](../../../../conformance/scenarios/cross-agent-work-composition-v0.1/README.zh-CN.md)。英文规范中的十二条不变量均为失败关闭边界。
