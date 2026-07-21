# HWM Agent 准入 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 英文为规范文本：[`README.md`](README.md)

## 目的

这个可选 Profile 让 Agent 与一个家庭建立有界会话，同时不把可解析、可信任、能证明实例密钥控制、获准访问和获准行动混成同一件事。它组合 HWM Core、Trust Root、Authority、Lease 和 World View，不增加 Core 原语。

入口序列是：

`不可信发现提示 → 能力声明与请求 → 已固定 Trust Root → 实例证明 → Authority 决定 → Authority 分配主体与 PoP Lease → 用途化 World View`

发现信息只用于路由。准入前不得泄露房间、人员、设备、Claim、Record、冲突或包清单。

## 五条独立轴

1. **语义兼容：**能处理要求的 Profile 精确版本、规范化方法和证明套件。

可选的 [Semantic Capability Negotiation Profile](../../semantic-capability-negotiation/v0.1/README.zh-CN.md)在用途需要时，把这一轴展开为解析、Schema validation、无损保留、semantic consume／produce／evaluate、domain adapter、evidence level 与当前 runtime availability。它的 Qualification Assessment 只输入 `compatibility`，不替代 trust、instance proof、authorization 或 admission。
2. **家庭信任：**决定可在验证方已独立接受的 Trust Root lineage 下验证。
3. **Agent 实例绑定：**请求方证明控制请求中命名的密钥或平台绑定。
4. **授权：**既有 Authority 对精确用途、动作、受众和时间返回 `allowed`、`denied`、`confirmation_required` 或 `indeterminate`。
5. **会话准入：**`allowed` 决定分配主体，并绑定精确、短期且持有证明约束的 Lease。

任何一条都不蕴含另一条。密钥控制不证明厂商身份、人类操作者、法律所有权或认知权威。

## 确定性流程

1. 通过独立登记通道获得家庭 Trust Root 摘要并持久化已接受 lineage。
2. 向单一 audience 发送短期 Admission Request。`agent_instance_handle` 只是由不可信请求方给出的关联信息，不是 Authority 主体。
3. Authority 声明的每个必需 Profile 都必须有精确支持版本；缺少可选 Profile 是显式能力限制，不是不兼容。
4. 协商一种规范化和证明套件，独立验证请求证明。
5. 用既有 Authority Profile 评估用途和动作。`resolve_view`、`propose_action`、`dispatch_action` 与 `submit_record` 彼此独立。
6. 决定绑定完整请求的 RFC 8785 规范化 SHA-256 摘要、已接受 Trust Root 与当前 Authority Epoch。
7. v0.1 只允许完整授予精确请求范围或完全不授予。缩小或扩大范围都要求重新请求。
8. `allowed` 时由 Authority 分配主体并签发短 Lease；Lease 的持有证明绑定必须与请求实例绑定完全一致。
9. 在生成用途化 World View 前验证 Lease 摘要、audience、Epoch、有效期与持有证明。

无效输入关闭式失败。证明材料不可用或出现验证方未知的新 Epoch 时是 `indeterminate`，不是 `denied`；等待用户登记是 `confirmation_required`，不是许可。

## 标准复用与边界

- [RFC 9200](https://www.rfc-editor.org/rfc/rfc9200.html) 提供受限环境的授权服务、资源服务、audience、scope 和持有证明模式。
- [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html) 展示发送方约束令牌与逐请求证明；部署可以映射到 DPoP。
- [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628.html) 提供在另一设备上完成用户授权的模式；验证码与轮询是传输和交互机制，不是 HWM 的 Authority 或事实语义。
- Matter commissioning 建立 Matter 节点运行凭据与 fabric 访问，不等于 HWM Agent 准入，不分配 HWM 主体，也不授权 World View。

## 不变量

1. 可解析不授予访问；访问不授予提案或执行。
2. Authority 响应不能自举用于验证自身的 Trust Root。
3. Agent 不能自命名 Authority 主体或权限。
4. Admission Decision 绑定完整请求内容，而不只绑定标识符。
5. Lease 受 audience、用途、动作、时间、Epoch 与持有证明共同约束。
6. 用户同意登记不让证据变真，也不是未来行动的永久许可。
7. World View 访问不等于原始家庭包访问，且不得侧漏隐藏清单。
8. Matter 设备 commissioning 与 HWM Agent admission 是独立仪式。

## Fixture 与验证

示例使用 `unsigned_fixture`，生产部署必须拒绝它。可运行：

```sh
node conformance/scenarios/agent-admission-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

oracle 覆盖 32 个握手案例、7 个模型边界案例和 77 个禁止推断。

准入后的 Agent 替换或协作由可选 [Agent Continuity Profile](../../agent-continuity/v0.1/README.zh-CN.md) 约束。Admission 不转移源 Agent 的任务上下文或 Lease。
