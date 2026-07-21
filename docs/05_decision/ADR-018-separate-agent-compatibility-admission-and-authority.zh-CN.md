# ADR-018：分离 Agent 兼容、准入与 Authority

- 状态：提议
- 日期：2026-07-19
- 英文为规范文本：[`ADR-018-separate-agent-compatibility-admission-and-authority.md`](ADR-018-separate-agent-compatibility-admission-and-authority.md)

## 背景

HWM 希望任何符合规范的 Agent 都能读懂它。但如果不区分发现、语义兼容、家庭信任、Agent 实例证明、数据披露、提案许可与设备执行，这句话会让自声明身份自举信任，让解析能力变成访问权限，或让设备 commissioning 变成家庭 Authority。

## 选项

1. Agent 声明兼容后即可读取原始家庭包。
2. 新建一套 HWM 身份、登录和 commissioning 协议。
3. 在已有 Trust Root、Authority、Lease 与 World View 契约上组合可选准入 Profile。

## 决定

选择方案 3。

Agent Admission 分别报告五条轴：语义兼容、家庭 Trust Root 信任、Agent 实例绑定、Authority 授权和会话准入，不新增 Core 原语。

Admission Request 是不可信输入。实例 handle 只是关联标签，密钥绑定必须独立验证。家庭在授权前只公开最低限度的准入要求，不公开家庭清单。

兼容性要求所有必需 Profile 的精确版本，以及共同的规范化与证明套件。缺少可选 Profile 只报告能力限制。不兼容保持为独立轴，不增加第五种 Authority 结果。

验证方必须先通过独立通道固定 Trust Root，才能信任 Authority Decision。Decision 绑定完整规范化请求摘要、已接受 root lineage、Authority Epoch、兼容结果、已验证实例绑定、由 Authority 分配的主体、精确范围和精确 Lease 摘要。

v0.1 中授予范围必须与请求完全相等；缩小或扩大均重新请求。允许时签发短期 PoP Lease，在生成 World View 前验证密钥绑定、audience、用途、动作、有效期与 Epoch。

`resolve_view`、`propose_action`、`dispatch_action` 和 `submit_record` 是独立权限。World View 权限不暴露原始包。用户登记同意只约束当前请求，既不让证据变真，也不永久授权未来动作。

Matter commissioning 仍是设备/fabric 仪式。已 commissioning 的 Matter 节点不因此成为已准入 HWM Agent，Matter ACL 也不是 HWM 用途化 World View 决定。

## 结果

- “任何 Agent 都能读 HWM”指任何 Agent 都可以实现并协商公开契约，不代表匿名访问家庭状态。
- 实现可以复用 OAuth/ACE、DPoP/CWT、用户码登记与 Matter 传输，但不能把这些协议当作 HWM 语义权威。
- 无效输入关闭式失败；证明不可用或未知新 Epoch 保持 `indeterminate`；等待人类登记保持 `confirmation_required`。
- Agent 不能自命名 Authority 主体，也不能跨家庭、audience、密钥、用途或 Epoch 搬运 Lease。

## 证据

- [`Agent Admission Profile`](../../spec/profiles/agent-admission/v0.1/README.zh-CN.md)
- [`Agent Admission 场景`](../../conformance/scenarios/agent-admission-v0.1/README.zh-CN.md)
- [RFC 9200](https://www.rfc-editor.org/rfc/rfc9200.html)
- [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html)
- [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628.html)
- [Matter access-control guide](https://project-chip.github.io/connectedhomeip-doc/guides/access-control-guide.html)
