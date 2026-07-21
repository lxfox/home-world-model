# HWM Agent 定向快照 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Schema：[`orientation-snapshot.schema.json`](orientation-snapshot.schema.json)、[`orientation-use-assessment.schema.json`](orientation-use-assessment.schema.json)

## 目的

本可选 Profile 向刚准入的 Agent 提供最小、用途绑定、隐私保护的家庭投影，使其无需下载全部历史就能开始理解家庭，同时不会把遗漏信息误认为完整世界模型。

Orientation Snapshot 是不可变披露制品，不是家庭本身、通用数字孪生、完整导出、Task continuity checkpoint、Agent 私有记忆、事实证明、Lease 或 Action Authorization。

规范链条是：

`目标 Agent Admission + purpose/scope request + 当前 Authority + 用途化 World View + disclosure/minimization policy → Orientation Snapshot → 独立 Use Assessment → 有边界的理解`

RO-Crate 是持久包边界；World View 为精确用途解析 Claim；Continuity Checkpoint 围绕具体 Task 接力；Orientation Snapshot 可以引用多个 View 和开放工作摘要，但不会授予 Task continuity 或 dispatch。

每个 Snapshot 固定 household、target Admission、audience、purpose、scope request、`as_of`、生成时间、Authority Epoch、Trust Root lineage、Profile versions、disclosure policy 与 minimization Assessment。任何内容或绑定变化都生成新 `snapshot_id`，不原地更新。

## 覆盖与开放世界

Scope policy 要求的每个领域必须声明 `complete_for_declared_scope`、`partial`、`withheld`、`unavailable`、`not_applicable` 或 `indeterminate`。领域条目绑定当前制品、未决 registry、来源闭包、freshness、temporal status 和非敏感 reason code。

`withheld` 不泄露隐藏身份、主体、数量或事实，只说明这个领域不能被当成完整。未出现的领域不等于 `not_applicable`；缺少制品不证明家庭里不存在对象、偏好、风险、冲突、义务或变化。

Snapshot 分开表达当前结构／状态 View、设计分支和选择、相关 Intent／Rule／Routine state、开放 Task／Proposal／程序义务、unresolved／contested／indeterminate／stale／inaccessible 项、尚未解决的 Change／Revalidation、解释当前 lineage 所需的历史摘要，以及受授权的深层 retrieval handle。

Summary 是带精确 source binding、derivation procedure、source closure、时间范围、遗漏、限制和完整性保护的 derived Record，不会因为被放进 Snapshot 就变成 accepted Claim。Retrieval handle 有 audience／purpose／期限，失败不代表不存在。

每个领域都有显式 unresolved registry；只有完整 closure 时，空 registry 才能表示在声明范围内没有未决项。Agent 可以说“在这个 Snapshot 声明完整的范围内，没有披露当前问题”，不能扩大成“家庭没有问题”。

Use Assessment 检查完整性、目标 Admission、当前 Lease／准入、Trust Root／Authority Epoch、audience、purpose／scope、freshness、有效时间、required-domain coverage、unresolved registry、source closure、disclosure authorization 与 change currency。结果只允许定向阅读／推理，不接受所有 Claim、不扩大 retrieval、不接管 Task、不采用 Intent、不选择方案也不授权动作。

[Agent Orientation Snapshot oracle](../../../../conformance/scenarios/agent-orientation-snapshot-v0.1/README.zh-CN.md)测试范围、最小化、覆盖、withholding、summary、unresolved registry、freshness、变化、目标绑定和禁止权限／完整性推断。
