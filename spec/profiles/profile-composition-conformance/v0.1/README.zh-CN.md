# HWM Profile 组合与 Conformance Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：[英文版](README.md)
- Schemas：[`profile-descriptor.schema.json`](profile-descriptor.schema.json)、[`conformance-set.schema.json`](conformance-set.schema.json)、[`composition-assessment.schema.json`](composition-assessment.schema.json)

## 目的

本 meta-Profile 判断一组精确的 HWM Core、打包与可选 Profile 版本，能否为一个交换用途形成依赖闭合、无冲突、可明确降级的契约。它阻止“支持 HWM”退化成未说明采用哪些文档。

规范链条是：

`不可变 Profile Descriptors + 用途化 Conformance Set + 精确 artifacts／roles／evidence -> 依赖、版本、冲突、artifact 与降级检查 -> Composition Assessment -> Capability Requirement Set／包发布 gate`

组合符合性不是 Agent 能力、包内事实、家庭信任、访问权或行动权限。

## HWM Base Exchange Set v0.1

最小可移植家庭知识交换集合只包含：

- HWM Core `v0.1` 的 EntityRef、Claim、Record、World View 与 Authority 边界；
- HWM RO-Crate Profile `v0.1` 的包身份、资源与完整性；
- HWM Authority Profile `v0.1` 的 Authority state 与用途边界。

它只保证 kernel 的结构与语义保留，不要求规划、行动、设备、人、几何、采购、commissioning、推理或任何领域 Profile。包里只要含有某可选 Profile 管辖的 artifact，就必须加入其精确版本与所需依赖闭包。

没有具名 Conformance Set、精确版本、角色和证据等级的“HWM compatible”是不完整声明。

## 三类制品

Profile Descriptor 固定 Profile ID／版本、规范摘要、schemas／contexts／oracles、artifact types、语义 roles、required／conditional／optional dependencies、冲突／兼容映射、不变量、扩展行为、发行者和 proof。普通超链接或文字引用不是依赖声明。

Conformance Set 绑定精确用途、audience、exchange operation、Base Set 版本、Profile descriptors、artifact kinds、roles、最低证据等级、offline／extension policy、允许的显式降级与有效期。每个已激活依赖必须精确 lock；条件未知时结果为 indeterminate。

Composition Assessment 分别判断 descriptor 完整性、离线解析、依赖闭包、版本、冲突／cycle、artifact 覆盖、role／invariant 证据、扩展与降级，总体为 `conformant`、`conformant_with_limits`、`not_conformant` 或 `indeterminate`。

不存在全局 `latest`、caret/range 或“版本越新越兼容”的规范规则。只有方向明确、被 Set 允许并公开信息损失／角色限制的 compatibility mapping 才能替换版本。

## 包、Agent 与降级边界

RO-Crate Root `conformsTo` 列出包要求的精确 Profiles，但成员关系不证明依赖闭包、artifact 有效或实现支持。Base-only reader 可以在 Set 允许 `opaque_relay` 时盘点、校验完整性并原样保留未知 artifact，但不得解释或输出其派生语义。Agent 是否会 consume／produce／evaluate 由 [Semantic Capability Negotiation](../../semantic-capability-negotiation/v0.1/README.zh-CN.md)另行判断。

Descriptor、schema、context、invariant、依赖、mapping、用途、role、artifact 或 evidence policy 改变，都创建新 revision 与 Assessment。项目自己维护的双语言 reader 仍是 implementation-owned evidence，不是独立实现共识。

## 不变量

1. Core、包绑定、可选 Profile、Conformance Set、包声明和 Agent capability 保持独立。
2. 没有精确版本的 Profile ID 不足以形成规范组合。
3. `latest`、版本顺序和 range 不证明语义兼容。
4. 文字链接不建立依赖闭包。
5. 每个激活的 required／conditional dependency 必须且只能 lock 一次。
6. 条件是否激活未知时，组合是 indeterminate。
7. required dependency cycle 默认失败；v0.1 没有 atomic bundle 例外。
8. `conformsTo` 成员关系不证明 artifact 有效或实现支持。
9. schema validation 不证明 semantic role conformance。
10. 缺少可选 Profile 不会让 Base Exchange 包失败。
11. 未知 required semantics 只能 opaque preserve 或拒绝，不能静默丢弃。
12. 降级不能输出超出支持 role 的语义。
13. 项目自有测试不是 independent implementation evidence。
14. 组合符合性不授予信任、披露、Lease、购买、安装或行动权限。

## Conformance 与非目标

[Profile Composition oracle](../../../../conformance/scenarios/profile-composition-conformance-v0.1/README.zh-CN.md)覆盖 Base 闭包、精确版本、条件依赖、cycle、冲突、mapping、artifact／role evidence、离线解析、降级和权限边界。

第一个真实实例是 [HWM Base Exchange Set v0.1 发布候选](../../../conformance-sets/base-exchange/v0.1/README.zh-CN.md)：它对三份精确 descriptor 做内容绑定，验证本地离线资源闭包，并拒绝 lock、依赖、版本和资源篡改，同时保留“当前证据全部由项目自身维护”的限制。

配套 [Base-only RO-Crate 夹具](../../../../conformance/scenarios/base-only-package-v0.1/README.zh-CN.md)证明所有领域 Profile 都可选。零披露 Claim／Record 合法，但不表示家庭没有知识；最低 crate 只引用 Authority state，不强迫披露完整 Authority 文档。

本 Profile 不定义包管理器、依赖求解器、全局 registry 治理、semver 兼容性、schema language、Agent admission、代码加载、远程执行、家庭政策、认证标志或标准采纳过程。
