# HWM Agent 连续性 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 英文为规范文本：[`README.md`](README.md)

## 目的

这个可选 Profile 在 Agent 进程、模型、供应商或实例变化时保持家庭任务连续，但不转移 Agent 会话。家庭根据持久、可归因的任务状态，为独立准入的目标 Agent 重新物化上下文。

连续性序列是：

`源 Agent 产生持久制品 → 目标 Agent 独立准入 → 目标用途 World View → 家庭生成 Checkpoint → Authority Continuity Decision → 目标 PoP Lease → 保留来源地继续任务`

任务连续、Agent 实例身份、Authority 主体、证据适格性、作者归属、授权与执行排他性保持分离。本 Profile 组合既有 HWM 制品，不增加 Core 原语。

## 四种模式

1. **`context_share`：**两个独立准入 Agent 获得各自用途化上下文，不产生委托或共享身份。
2. **`successor`：**目标从持久状态继续规划。源作者归属保留，新输出归属于目标；源 Proposal 的执行权不转移。
3. **`delegated_acting`：**目标是当前 actor，代表另一个明确的 responsible subject 行动；这不是 impersonation，且委托范围不能超过责任主体可委托范围。
4. **`exclusive_cutover`：**只有目标可以继续指定执行路径。验证方必须已知源 Lease 到期或被已知 Authority Epoch 使其失效，并确认目标 Lease 已激活，才能进入 ready。

网关离线时，HWM 不声称瞬时排他切换；风险窗口由源 Lease 到期和网关获知新 Epoch 的时间共同限制。

## 确定性流程

1. 源 Agent 把可归因的 Claim、Record、Plan、Proposal 与 Trace 写入家庭控制存储。私有记忆、隐藏 prompt、embedding 与 chain-of-thought 不是连续性制品。
2. 目标 Agent 独立完成 Agent Admission；源 Agent 不能替目标准入或分配 Authority 主体。
3. Resolver 按目标用途重新求值 World View。源 View 中的 accepted 或可见状态不会自动传入目标 View。
4. 家庭 continuity resolver 只从目标可见制品生成目标专用 Checkpoint，不复制隐藏标识、数量、源专用 View 内容或原始证据。
   原因码必须来自经过隐私审查的部署注册表，是机器标识而不是隐藏家庭状态的自由文本摘要。
5. Checkpoint 绑定精确的 [Task Lineage Definition](../../task-lineage/v0.1/README.zh-CN.md)、源／目标 Admission Decision、源／目标 World View、Authority Epoch、时间与每个披露制品摘要；裸 Task ID 或 revision 并不足够。
6. 完成、开放、阻塞、无法判定、未知和争议保持不同。源 Agent 声称完成不等于物理结果或 accepted 事实。
7. Authority 对精确 Checkpoint 与模式求值；委托时分别记录当前 actor 与责任主体，历史 actor 只保留来源意义。
8. 目标使用自己的 PoP Lease；源 Lease、token、密钥或主体标签不能复制给目标。
9. 目标产生的新 revision／Proposal 保留 derivation，并获得新的目标归属；执行源 Proposal 需要明确且精确的 grant。

无效绑定关闭式失败；proof、必需制品、准入状态或更新 Authority 状态不可取得时为 `indeterminate`。排他切换仍等待时为 `confirmation_required`，不得执行。

## 标准复用与边界

- [W3C PROV-O](https://www.w3.org/TR/prov-o/) 提供 Activity、Agent、attribution、derivation、communication、revision 与 qualified delegation。
- [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html) 分离 delegation 与 impersonation，并表达当前／历史 actor 链；历史 actor 不是权限并集，令牌交换也不会天然撤销源令牌。
- [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html) 提供结构化、资源限定授权详情及其隐私约束。
- [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html) 提供在线撤销，同时承认传播延迟与短期令牌、服务状态和通信成本之间的取舍。

## 不变量

1. 任务 lineage 连续不转移 Agent 实例身份或 Authority 主体。
2. 只有持久、可归因制品跨越连续性边界；私有推理既非必需，也不是家庭知识。
3. 源作者归属和证据来源不变；目标新输出归属于目标。
4. Checkpoint 不能建立真理、evidence standing、准入、授权或物理结果。
5. 目标披露按目标用途与 Authority 状态重新解析，源可见性不得整体转移。
6. 委托保留当前 actor 与责任主体，不能表示成 impersonation。
7. 历史 actor 只用于信息和审计，不能增加当前 actor 权限。
8. 新目标 token 或 token exchange 不推出源 token 已撤销。
9. 规划接力不推出源 Proposal 执行权。
10. 排他切换要求已知源失效和有效目标 Lease，且不能承诺离线瞬时撤权。

## Fixture 与验证

Fixture 使用模拟证明结果和 `unsigned_fixture`，生产部署必须拒绝该模式。

```sh
node conformance/scenarios/agent-continuity-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

oracle 覆盖 40 个连续性案例、10 个模型边界案例与 92 个禁止推断。
