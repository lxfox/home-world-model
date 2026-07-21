# ADR-019：在 Agent 变化时重新物化任务上下文

- 状态：提议
- 日期：2026-07-19
- 英文为规范文本：[`ADR-019-rematerialize-task-context-across-agent-change.md`](ADR-019-rematerialize-task-context-across-agent-change.md)

## 背景

HWM 声称家庭模型独立于任何 Agent。如果更换模型供应商、重启进程或替换 Agent 就丢失全部进行中任务，这个声称并不成立。但若连续性意味着复制上下文窗口、源 World View、bearer token、源身份或隐式权限，又会破坏家庭隐私和 Authority 不变量。

模型必须分离任务连续与身份连续、delegation 与 impersonation、来源与授权，以及规划接力与排他设备控制。

## 选项

1. 把源 Agent 的记忆、prompt、凭据与会话复制给目标。
2. 复用一个稳定 Agent 身份，让每个替代实例 impersonate 它。
3. 目标独立准入和授权后，由家庭重新物化目标专用的持久任务状态。

## 决定

选择方案 3。

Agent Continuity 是组合已有 Claim、Record、Plan、Proposal、World View、Admission Decision、Authority Decision、Lease、Assessment 与 Action Trace 的可选 Profile，不增加 Core 原语。

只有家庭持久保存、可归因的制品参与连续性。Chain-of-thought、模型私有记忆、prompt、embedding 和源专用数据都不是连续性要求。源 Agent 可以提交候选制品或接力请求，但不能生成权威目标 Checkpoint、替目标准入、分配主体、授予权限或宣告排他切换。

目标独立完成 Agent Admission 后，家庭 continuity resolver 对目标用途 World View 求值，生成包含精确制品绑定、开放工作和显式不确定性的短期 Checkpoint。目标只能取得依其用途与 Authority 状态可见的内容；源 View 的 accepted 与 evidence standing 必须重新求值。

独立 Authority Continuity Decision 绑定精确 Checkpoint、源／目标 Admission Decision、已接受 Trust Root、Authority Epoch、当前 actor、可选责任主体、授予动作、目标 PoP Lease 与切换状态。Checkpoint 本身不能授权自己的使用。

Profile 支持独立上下文共享、规划接力、delegated acting 和 exclusive cutover。代表行动把目标记录为当前 actor、把另一主体记录为 responsible；它不是 impersonation。历史 actor 只保留信息意义，不贡献权限。

规划接力不转移源 Proposal 的执行权。目标新输出保留源 derivation，同时记录目标归属；执行既有源 Proposal 需要精确显式 grant。

只有验证方已知源 Lease 到期或被已知 Authority Epoch 使其失效，并且目标 Lease 激活时，排他切换才 ready。Token exchange 或签发目标 token 本身不会撤销源 token；离线网关仍受有界过期 Authority 暴露限制。

## 结果

- 更换 Agent 不会摧毁持久家庭工作，但私有推理既不可移植，也不是必需输入。
- 目标可以继续同一任务，而不成为源 Agent 或改写其作者归属。
- Agent 之间直接传递的 handoff blob 在家庭重新物化和授权前仍是不可信输入。
- 即使 Authority 为替代进程分配同一服务主体，仍需要新的 Admission Decision、实例证明与 PoP Lease。
- 精确排他切换可能要求推进 Authority Epoch，并继承所有离线 Lease 撤权限制。

## 证据

- [`Agent Continuity Profile`](../../spec/profiles/agent-continuity/v0.1/README.zh-CN.md)
- [`Agent Continuity 场景`](../../conformance/scenarios/agent-continuity-v0.1/README.zh-CN.md)
- [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)
- [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html)
- [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
