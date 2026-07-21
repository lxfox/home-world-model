# HWM 最小 Authority Profile v0.1

- 状态：Profile 讨论候选稿
- 版本：0.1.0
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- Schema：[`authority-profile.schema.json`](authority-profile.schema.json)、[`authority-trust-root.schema.json`](authority-trust-root.schema.json)、[`authority-lease.schema.json`](authority-lease.schema.json)

## 目的

本 Profile 定义本地优先家庭中生成用途限制 World View，以及区分允许、拒绝、需要确认和无法判定 Action Proposal 所需的最小 Authority 语义。

它不是完整家庭宪法。它定义技术信任连续性，不定义所有权争议、监护、继承、跨家庭委托、法律身份或通用恢复服务。

## 复用标准

- [W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) 提供 Policy、Permission、Prohibition、Duty、Constraint、assigner、assignee、target 和 action 概念。HWM 在其上定义紧凑 JSON Profile 与确定性的家庭评估规则。
- [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/) 可以用 issuer、credential subject、有效期、credential status、evidence 和加密证明保护授权。VC 校验不会替家庭决定信任哪个 issuer；这由 HWM 信任锚配置决定。
- [IETF ACE-OAuth，RFC 9200](https://www.rfc-editor.org/rfc/rfc9200.html) 可以把运行时授权绑定到受限 Client 与 Resource Server，包括本地验证和持有证明。
- [CBOR Web Token，RFC 8392](https://www.rfc-editor.org/rfc/rfc8392.html) 可以用 issuer、subject、audience、expiration、not-before、issued-at 和 token identifier 编码受限设备租约。

HWM Core 不要求某一种安全信封。部署绑定必须声明采用的证明套件、密钥生命周期、令牌 audience、安全通道和 verifier 行为。

## Profile 制品

### Authority Trust Root

可选 Trust Root 终止 Authority 验证递归。其规范化 `signed` Body 分离离线根角色方法、运行时 Authority 文档方法和可选的独立恢复方法，并包含稳定 lineage、顺序 root version、Authority Epoch 下限、有效期、角色阈值、精确前一根绑定和原始 proofs。

Genesis root 只有被验证方通过带外精确摘要固定并持久保存后才可信。正常轮换需要当前根与新根双方的不同签名者阈值；恢复需要当前根预承诺的恢复阈值加新根阈值。缺少连续性时建立新 lineage，不能表示为旧 lineage 的恢复。参见 [ADR-017](../../../../docs/05_decision/ADR-017-terminate-authority-trust-recursion.zh-CN.md)。

### Authority Profile Document

Profile 文档包含：

- 家庭与 Authority 标识；
- 当前 `authority_epoch`；
- 用来认证本文档的已接受 Trust Root lineage、根标识、版本与 Epoch floor；
- 本文档声称采用的运行时验证方法引用；
- ODRL 形态的 permission、prohibition、constraint 和 duty；
- 颁发给 Agent 或运行组件的有界租约；
- 不可覆盖的本地安全策略引用；
- 证明与扩展元数据。

该文档属于 Authority 平面输入，不是普通 Claim；Agent 不能通过家庭数据平面创建或提升它。文档自身的 `trust_anchors` 与 proof 不能启动信任：生产验证方只能通过已接受 Trust Root 和独立 proof 验证结果接纳文档签名者。

### Lease

Lease 在有限时间内把一个主体绑定到一个或多个 audience 和 Policy 标识，并包含颁发时的 Authority Epoch。它可以是 Authority 文档内嵌快照，也可以采用独立的 [`authority-lease.schema.json`](authority-lease.schema.json) 投影。生产 Lease 必须有完整性保护；[Agent Admission Profile](../../agent-admission/v0.1/README.zh-CN.md) 在 v0.1 中强制持有证明绑定，使 Lease 不能成为可搬运的 bearer credential。

Epoch 与 Lease 解决不同问题：

- verifier 得知新 Authority 状态后，Epoch 使旧授权状态失效；
- Lease 到期限制离线 verifier 使用缓存授权的最长时间。

离线 verifier 无法知道断网期间家庭已经推进 Epoch。因此 HWM 不宣称可以瞬时离线撤权。过期授权的最大暴露窗口由剩余 Lease 时间和更严格的本地安全策略共同限制。

### Authorization Decision Record

每次披露或行动决定至少记录：

- 请求与主体标识；
- 用途及目标行动／资源；
- 决策时间；
- verifier 使用的 Authority Epoch；
- 已接受 Trust Root 标识与版本；
- 匹配的 Policy 与 Lease 标识；
- 已应用约束与未满足 Duty；
- 结果和原因码。

决定结果为：`allowed`、`denied`、`confirmation_required` 或 `indeterminate`。

这些仍是 Core-facing 决定结果。可选的 [Procedure Fulfilment Profile](../../procedure-fulfilment/v0.1/README.zh-CN.md) 为已知仍待完成的协商、交付、异议窗口、复核或审计增加授权决定前的 `requirements_pending` 工作流 gate；它不是第五种 Authorization Decision。`confirmation_required` 保持为等待明确答复 Duty 的更窄投影。

## 确定性评估顺序

基线评估器按以下顺序执行：

1. **加载已接受 Trust Root。**验证精确 lineage、当前根状态、Authority 文档签名角色、proof 阈值以及 `authority_epoch >= authority_epoch_floor`。当前根状态缺失或不可取得时为 `indeterminate`；自行呈现的未信任根永不接纳。
2. **认证 Authority 输入。**证明无效返回 `denied`；验证密钥或 Authority 状态无法取得时返回 `indeterminate`。
3. **检查家庭、主体、audience 与 target。**不匹配返回 `denied`。
4. **检查时间。**早于 `not_before` 或不早于 `expires_at` 时返回 `denied`。
5. **检查 Epoch。**Lease Epoch 小于 verifier Epoch 时按已撤权／过期返回 `denied`；Lease Epoch 大于 verifier Epoch 表示 verifier 落后，返回 `indeterminate`。
6. **匹配规则和约束。**封闭式授权下，没有匹配 Permission 返回 `denied`；约束输入未知返回 `indeterminate`。
7. **应用 Prohibition。**匹配的 Prohibition 覆盖 Permission。
8. **评估 Duty。**缺少确认 Duty 返回 `confirmation_required`；其他强制 Duty 未满足时返回 `denied`，除非相应 Profile 明确定义了先行工作流 gate 或不同结果。Procedure Fulfilment 的 `requirements_pending` 会在产生最终决定前停止求值。
9. **应用本地安全策略。**Agent grant 与家庭 Policy 不能覆盖不可覆盖的本地安全拒绝。
10. **允许。**只有存在匹配 Permission，并且约束和 Duty 全部满足时才返回 `allowed`。

评估器不能把缺失数据解释成许可。

## 用途限制 World View

Resolver 在物化 Candidate 前逐项评估请求目标：

- 目标被允许且未被禁止：只解析并披露获准 Candidate 内容；
- 目标被禁止或用途不匹配：`availability_status = access_denied`、`epistemic_status = not_evaluated`，零 Candidate；
- Authority 服务不可用：`availability_status = source_unavailable`，零 Candidate；
- 策略输入未知：不披露，并生成 `indeterminate` Authority Decision Record。

View 可以披露面向用途的汇总 Claim，同时隐藏源 Claim 与 Record。不得通过 Claim 标识、数量、冲突、原因文本或强制回查知识包泄露隐藏身份。

## 确认 Duty

确认 Duty 标识：

- 被确认的行动或 Proposal；
- 有权确认的主体或角色；
- 阈值（`all`、`any` 或数量）；
- 有效时间窗；
- 触发确认的条件；
- 用来满足 Duty 的确认 Record。

回答涉及共享影响 Proposal 时，confirmation 必须绑定精确 Proposal revision。部署可以使用可选 [Bounded Impact Closure Profile](../../bounded-impact-closure/v0.1/README.zh-CN.md)与 [Impact Procedure Mapping Profile](../../impact-procedure-mapping/v0.1/README.zh-CN.md)产生异质、由系统承担的要求和隐私安全 slots；[Shared Action Coordination Profile](../../shared-action-coordination/v0.1/README.zh-CN.md)在本 Authority Profile 返回最终行动决定以前求值其中同质直接回答兼容子集。

除非 Policy 明确把 Agent 列为有权确认者，Agent 不能自行确认自己的 Proposal。

## Evidence Standing 边界

允许采集、披露、回答或确认行动，不会使由此产生的所有 Record 对所有命题都具有认知适格性。需要这一层区别的部署使用可选 [Evidence Standing Profile](../../evidence-standing/v0.1/README.zh-CN.md)。行动确认 Duty 与 Evidence Standing 仍是不同决定：前者约束是否允许行动，后者约束一条 Record 能否参与具名 Resolver policy。

## 本地安全

执行网关保留不可覆盖的本地安全检查，例如电气限制、防烫限制、机械联锁与紧急停机。Authority `allowed` 只表示“经过评估的家庭 Policy 允许”，不表示所有运行条件下物理安全。

如果本地安全拒绝下发，Action Trace 记录授权 `allowed`，同时执行为 `not_dispatched` 并带安全原因。两个决定保持分离。

## 不变量

1. 普通 Claim 不能创建信任锚、推进 Authority Epoch 或授予权限。
2. 每个决定都受用途、主体、audience、target、时间和 Epoch 约束。
3. Prohibition 与本地安全拒绝覆盖 Permission。
4. 缺少 Permission 是拒绝；缺少评估输入是无法判定。
5. 要求确认既不是许可，也不是设备失败。
6. 离线撤权暴露不能表示为零，只能由 Lease 到期限制。
7. 新 Epoch 永远不改写历史决定或 Action Trace。
8. 隐藏数据不表示为假，也不得间接披露。
9. 生产证明绑定必须拒绝未签名 Authority 文档与 Lease。
10. 家庭角色或行动确认权限不得解释为全局认知 Authority。
11. coordination `satisfied` 只是 Duty 输入，不是最终 Permission，也不能覆盖本地安全。
12. 希望行动的系统承担回答、咨询、通知、复核和审计 Duty；受影响的人没有回答义务。
13. participation slot 不是身份、在场、成员、监护或持久委托。
14. Trust Root 不能启动自身；genesis 信任要求带外精确 pin。
15. 根轮换必须顺序连续，并以不同验证材料而不只是不同 method ID 满足当前根与新根双方阈值。
16. 恢复要求与根材料故障域独立且预承诺的阈值；不存在时重新注册必须建立新 lineage。
17. Root version 与 Authority Epoch 是不同轴；每次根转换都推进 Epoch floor。
18. 多份有效后继根保持争议，不能按时间或转换类型自动选择。
19. 根接纳不推出法律所有权、证据真实、行动授权或物理安全。
20. Lease 主体由 Authority 分配；Agent 对自报 handle 或密钥的控制证明不能让它自命名主体或权限。
21. 语义兼容、Agent 准入、World View 披露、提案许可和执行授权是独立评估。

## 夹具安全限制

讨论夹具使用 `unsigned_fixture` 证明模式，以保持示例无依赖。兼容生产部署不得接受该模式。通过夹具只证明语义兼容，不证明密码学安全。

## 验证

```sh
npx --yes -p ajv-cli -p ajv-formats ajv validate \
  --strict=true --spec=draft2020 -c ajv-formats \
  -s spec/profiles/authority/v0.1/authority-trust-root.schema.json \
  -d conformance/scenarios/authority-trust-bootstrap-v0.1/trust-root.example.json

node conformance/scenarios/authority-trust-bootstrap-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```
