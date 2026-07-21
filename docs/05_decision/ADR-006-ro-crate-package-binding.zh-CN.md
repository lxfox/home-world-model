# ADR-006 — 把家庭知识包绑定到 RO-Crate 1.3

- 状态：提议
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`ADR-006-ro-crate-package-binding.md`](ADR-006-ro-crate-package-binding.md)
- 相关 Profile：[`HWM RO-Crate Profile v0.1`](../../spec/profiles/ro-crate/v0.1/README.zh-CN.md)

## 背景

ADR-005 把 Household Manifest、Claim Envelope、World View 与 Action Trace 视为四个交换契约，同时要求尽量复用成熟标准。逐术语映射审计没有找到 HWM 拥有通用打包模型的充分理由。RO-Crate 已经定义了 HWM 所需的元数据描述文件、根数据集、数据与上下文实体、Profile 声明、关联资源、JSON-LD 扩展机制、许可证和打包惯例。

剩余问题是：当前 Manifest 是否包含无法在 RO-Crate 绑定中保留的家庭特有语义。

## 决策

1. HWM 家庭知识包以 RO-Crate 1.3 上的 HWM 应用 Profile 为目标。
2. Core 包含三个 HWM 行为契约——Claim Envelope、World View、Action Trace——以及一个包绑定契约。包绑定不是新的世界模型原语。
3. `hwm:HouseholdManifest` v0.1.0 在迁移期间保留为兼容投影，不再作为独立通用包模型。
4. 投影把 Profile 和资源数组视为无序集合，保留 JSON 扩展值，不保留无意义的序列化细节。
5. Root `conformsTo` 声明的 Profile 全部为必需；RO-Crate 绑定删除冗余 `profileRequired` 字段。
6. Core 资源角色通过 Profile 专用类型表达，不定义通用 HWM `resourceRole` 属性。
7. v0.1 把完整性固定为 SHA-256。算法敏捷性推迟到夹具提出真实需求以后；未来版本应复用 SPDX Hash。
8. 持有知识包与运行时披露仍是不同权限边界；窄范围披露仍必须使用用途化 World View。

## 考虑过的方案

### 保留 Household Manifest 作为规范包模型

不作为目标方向。它会重复成熟的包／Profile 生态，并让 HWM 承担与家庭语义无关的归档、元数据、词汇扩展和工具惯例。

### 只把 RO-Crate 作为可选导出

拒绝。两套规范包模型会形成永久映射歧义，并使往返损失难以发现。

### 立即采用 SPDX Hash

推迟。当确实需要多算法或更丰富的完整性方法时，SPDX 是更好的路径；但当前全部夹具只需要 SHA-256。现在引入完整模型属于未经测试的复杂度。

## 影响

- 最小可辩护 HWM 自有表面缩小为三个行为契约加应用 Profile 约束。
- 在 RO-Crate 1.3 工具支持允许时，现有 RO-Crate 工具可直接检查知识包。
- HWM 必须发布可解析的 Profile URI 与本地 context 术语定义。
- 只有迁移证据被独立复现后，才能删除简单 Manifest。
- 虽然复用了包结构，元数据隐私与授权仍是 HWM 部署问题。

## 当前证据

设备生命周期与装修规划夹具已通过独立 JavaScript 与 Python 路径，把两份结构不同的 RO-Crate 投影为完整简单 Manifest。规划包增加五种带类型应用制品、显式双分支比较、打乱顺序的关系数组和多位被提及参与者，同时没有新增 Core 原语。两份知识包均通过 `roc-validator` 0.11.2 的全部 RO-Crate 1.2 必需检查，唯一例外是选择 RO-Crate 1.3 后预期出现的 context 版本检查；该验证器目前尚未附带 1.3 Profile。

## 接受前所需验证

1. ~~增加第二份结构不同的 HWM RO-Crate 夹具。~~ 已由装修规划夹具于 2026-07-18 满足。
2. 通过社区 RO-Crate 1.3 验证器或等价 JSON-LD／基础 Profile 验证。
3. 由外部开发读取器在不依赖 HWM 实现代码的情况下复现兼容投影。
4. 发布 Profile URI、术语定义与可离线解析的 Schema bundle。
5. 确认 Authority 引用与扩展处理不会越过更窄的 World View 边界泄露信息。
