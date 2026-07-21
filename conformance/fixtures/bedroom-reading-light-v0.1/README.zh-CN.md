# 卧室阅读灯测试夹具 v0.1

- 状态：可执行讨论夹具
- 版本：0.1.0
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)

## 要验证的问题

当前 HWM 内核能否表达一次完整家庭行动，同时不混淆传输成功、物理观测、模型一致性、目标满足和用户接受？

## 情景

一个持久、绑定 IEC 的功能位置角色表示卧室阅读灯。当前具体灯具资产通过带时间边界的实现绑定参与该功能，并暴露 Matter 端点。家庭要求阅读区域至少达到 300 lux；调试形成的影响 Claim 预测，在记录的测量过程中执行 `MoveToLevel(60%)` 后十秒内将达到 285–335 lux。本夹具中的 `hwm:FunctionalSlot` 与 `hwm-lifecycle:fulfills` 是迁移兼容投影，不是目标 HWM 词汇。

行动获得授权且设备已经应答。阅读区域实测为 295 lux，居民表示结果太暗。

预期解释为：

- 执行：`acknowledged`；
- 观测：接受 295 lux；
- 影响评估：`consistent`；
- 目标评估：`not_satisfied`；
- 用户确认：作为 `rejected` 独立保留。

若实现用一个总体成功或失败取代这些值，就没有通过语义判定。

## 文件

- `manifest.json`：知识包身份、Profile、Authority 纪元、资源和不透明往返扩展；
- `claims.json`：生命周期、要求、预测影响和观测 Claim；
- `records.json`：声明、授权、下发、应答、观测和用户确认；
- `world-view.before.json`：Planner 使用的行动前描述视图；
- `world-view.after.expected.json`：用于评估的观测后视图；
- `action-trace.expected.json`：预期多维行动结果；
- `oracle-cases.json`：影响评估与目标评估的四个边界用例。

## 所覆盖的一致性层级

1. **语法：**每个契约通过候选 JSON Schema 校验。
2. **引用完整性：**全部 Claim 与 Record 引用可解析，时间和 Authority 纪元兼容。
3. **语义判定：**四个边界用例分别产生预期的独立评估。
4. **无损往返：**`extensions` 中未知成员经过解析和序列化后保持值等价。

在仓库根目录运行不依赖第三方包的语义与完整性校验器：

```sh
node conformance/fixtures/bedroom-reading-light-v0.1/validate.mjs
```

该夹具不能证明生产信任。Manifest 用 SHA-256 摘要锚定资源文件，但各条 Record 仍被刻意设置为只有声明来源、没有签名认证；World View 明确暴露这一局限。它也没有把夹具专用的 `hwm-lifecycle` 和 `hwm-effect` 词汇正式标准化；这些候选词仍需验证其现有标准映射和必要性。

## 概念发现

行动前和行动后的 World View 是不同制品。Action Proposal 必须引用行动前视图，后续证据不能被追溯性地塞回曾经支持该提案的视图。为了审计，这种时间分离是必要的；若独立实现确认，应把它提升为 Core 显式不变量。
