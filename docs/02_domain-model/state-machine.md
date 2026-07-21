# 状态机

> HWM 不把整个家庭压缩为一个全局状态机。本文件描述需要跨实现保持一致的生命周期与正交状态轴。

## Claim 生命周期

Claim 发布后不可原地修改。其生命周期事件为：

```text
issued
  ├─ supported / refuted / confirmed   # 增加 Evidence Link，不改变原 Claim
  ├─ retracted                         # 增加撤回 Record
  └─ superseded                        # 新 Claim 在限定作用域内取代它
```

`accepted` 不是 Claim 自身永久状态，而是某个 World View 在特定请求者、用途、时间和 Authority Epoch 下的解析结果。

因此，对话中所谓“把认识升为事实”不会产生 Claim 状态迁移。它产生一份新的 World View：如果具名 Resolver 策略认为已授权证据足够，则对应解析变为 `accepted`；原 Claim 与早先 View 都不修改。后续反驳或纠正再生成新 View。

Claim 的 `valid_time` 若为区间，统一解释为半开区间 [`from`, `to`)；精确时刻使用 `at`。因此在替换时刻，旧关系的 `to` 与新关系的 `from` 可以相等而不会重叠。

## World View 正交状态

可用性：

- `available`：Resolver 可以取得并按用途披露解析结果；
- `not_observed`：请求的观测窗口内没有有效观测；
- `source_unavailable`：已知数据源或能力当前故障／离线；
- `access_denied`：Authority 不允许披露请求内容。

认知状态：

- `accepted`：按所声明 Resolver Profile 可作为当前视图断言使用；
- `contested`：存在未解决的有效认知冲突；
- `unknown`：可用知识不足以判断；
- `not_verified`：存在可披露主张，但未满足所需验证过程；
- `not_evaluated`：由于不可用、未观测或无权访问，没有执行认知判断。

新鲜度：`current`、`stale`、`not_applicable` 或 `unknown`。

相对于 View `as_of` 的时间适用性：`in_effect`、`not_yet_in_effect`、`expired`、`unbounded`、`mixed` 或 `indeterminate`。它判断命题的 `valid_time`，不是证据多久以前被观测或同步。因而结果可以同时是 `current + expired`（刚同步到本地的已结束关系），也可以是 `stale + in_effect`（仍在有效期内但证据年龄超限）。

每条结果描述“某个 subject + predicate 的解析”，并包含零个或多个获准披露的 Candidate。因此访问被拒绝、没有观测、数据源故障、认知未知、证据陈旧和命题过期可以同时保持区别，而不必虚构或泄露 Claim。实现可以提供更细的原因码，但不得把它们都报告为 `false`。

`contested` 不要求一定存在两条 Candidate。一条 Candidate 同时拥有支持证据和反驳 Record 时已经构成认知争议；反驳不会自动创建否定 Claim。存在两条或多条不兼容 Candidate 时同样使用 `contested`，但两种争议形态必须能从冲突引用中区分。

偏好、要求和约束另有相互正交的适用性状态：`applicable`、`conflicting`、`out_of_scope` 与 `not_available`。例如两位居民的温度偏好都可以为“可用、认知上 `accepted`、新鲜”，同时在适用性上为 `conflicting`。适用性不是事实真假、数据新鲜度，也不是 Policy Evaluator 的授权决定。

偏好差异不产生认知 `contested`，除非某一条偏好 Claim 自身受到认知证据质疑。不同主体的偏好都可以 accepted；只有相对于某个共享 Action Proposal，它们才触发 coordination。

## Shared Action Coordination 状态

```text
not_required | pending | satisfied | rejected | indeterminate
       │           │          │           │             │
       ▼           ▼          ▼           ▼             ▼
 continue      confirmation  continue     denied     indeterminate
 policy eval    required    policy eval
```

coordination 状态绑定一个 Proposal revision，不属于 Claim 或个人偏好的生命周期。`pending` 表示声明参与规则尚未满足，不等于拒绝；`satisfied` 不等于授权；`rejected` 只阻断当前 Proposal；`indeterminate` 不得降级为无需协调。后续 Proposal revision 必须重新取得绑定回答，早先回答继续作为历史 Record。

## Impact Procedure Mapping 状态

```text
mapped_for_declared_impacts | indeterminate
             │                     │
             ▼                     ▼
  evaluate heterogeneous      do not infer no
  procedure fulfilment         requirements
```

`mapped_for_declared_impacts` 只表示当前声明通道闭包中每个已披露影响，唯一匹配了 Authority 程序规则，并解析了必需不透明路由；它不表示要求已履行、所有潜在影响已知或行动获准。`indeterminate` 可以来自闭包不完整、Proposal revision／Epoch 不匹配、零条或多条规则、代表或投递路由不可取得。显式 `none` 与策略沉默不同。

程序要求随后按阶段求值：

`not_due | fulfilled | pending | negative | unfulfilled | indeterminate`

聚合结果先产生工作流 gate：`continue_policy_evaluation | confirmation_required | requirements_pending | denied | indeterminate | historical_noncompliance`。其中 `requirements_pending` 不是 Authorization Decision；授权前或派发前 gate 未打开时，不得产生 `allowed` 或派发。行动后审计缺失只追加 `historical_noncompliance`，不改写历史授权。

## Action Trace 正交状态轴

行动不具有单一 `success` 状态，至少保留以下相互独立的轴：

### 执行／传输

`proposed → allowed | denied | confirmation_required | indeterminate → dispatched | not_dispatched`

只有 `dispatched` 才继续进入 `acknowledged | rejected | timed_out`。`not_dispatched` 必须带原因，例如权限拒绝、等待确认或安全前提未满足；它不是设备执行失败。

### 物理观测

`not_observed | observed | observation_invalid | observation_stale | observation_unavailable`

### 影响模型评估

`consistent | inconsistent | insufficient_evidence | context_mismatch | not_applicable`

### 目标评估

`satisfied | partially_satisfied | not_satisfied | indeterminate`

### 资源评估

`within_limit | exceeded | indeterminate | not_applicable`

### 用户确认

`accepted | rejected | corrected | no_attestation`

例如设备应答成功、实测 295 lux、模型预测 285–335 lux、目标要求至少 300 lux时，状态必须同时表达：`acknowledged + observed + consistent + not_satisfied`。它不能被简化为成功或失败。

## Authority 生命周期

Trust Root 的技术连续性先于 Authority Epoch 求值：

```text
untrusted genesis
  → out-of-band pinned root N
  → candidate N+1
      ├─ old-root threshold + new-root threshold → accepted N+1
      ├─ precommitted recovery threshold + new-root threshold → recovered N+1
      ├─ multiple valid successors → contested
      └─ no continuity path → rebootstrap as a new lineage
```

Root version 必须顺序增加；较低／相同版本为回滚，跳号要求补齐中间根。当前根过期后仍可以验证顺序连续的新根；若无法取得当前后继，则为可能 freeze 的 `indeterminate`，不自动视为撤销或攻击。每次根转换都提高 `authority_epoch_floor`，但策略更新可以只推进 Authority Epoch 而不轮换根。

授权变化产生新的 Authority Epoch。View 和 Authorization Decision 记录生成时的 Epoch；离线授权必须有到期时间或 Lease。Epoch 与 Lease 作用不同：verifier 取得新 Epoch 后立即拒绝旧 Lease，而断网期间只能由 Lease 到期时间约束风险窗口。发现 Epoch 过期时：

- 不再据此生成新授权；
- 已发生的 Action Trace 保留原 Epoch 作为历史事实；
- 是否中止在途行动由明确的安全策略决定，不由 Agent 自行猜测。

Lease Epoch 高于 verifier 已知 Epoch 时，verifier 自身落后，返回 `indeterminate`；不能把未知的新 Authority 状态当成许可。Lease 到期后即使 verifier 仍处于相同 Epoch，也必须拒绝。

## Agent Admission 状态

准入状态只投影握手结果，不替代兼容性、信任、实例证明或授权轴：

```text
untrusted request
  → not_admitted   (不兼容、无效证明、拒绝、内容／Lease 绑定错误)
  → pending        (confirmation_required)
  → indeterminate  (根、证明或新 Authority 状态不可取得)
  → admitted       (精确 allowed 决定 + 当前 PoP Lease)
```

`admitted` 不是永久状态。Lease 到期、已知 Epoch 推进、audience／密钥不匹配或用途变化，都要求停止当前会话或重新准入；历史 Decision 不被改写。

## Agent Continuity 状态

连续性保留五条轴：Checkpoint 有效性、目标准入、Authority Decision、cutover 与最终可用性。典型投影为：

```text
durable source state
  → target not admitted                         → not_available
  → target-specific checkpoint unavailable      → indeterminate
  → allowed context_share / successor / delegate → available
  → exclusive source still active               → pending
  → exclusive source invalid + target active     → ready / available
```

任务 revision 连续不表示 Agent 实例连续。目标新输出追加新归属；源制品、历史 actor 与旧 Decision 不被改写。离线网关不能得知新 Epoch 时，排他性只能由旧 Lease 到期来界定风险窗口。

## Task Lineage 状态

Task Definition 本身没有可覆盖的状态字段。Task State Assessment 追加投影为：

```text
not_started → active ↔ waiting / blocked / indeterminate
                          ├─ completed
                          ├─ failed
                          ├─ cancelled
                          ├─ superseded
                          ├─ split
                          └─ merged
terminal state → authorized reopen → active / indeterminate
```

一次 Attempt 失败不触发 `failed`。`completed` 要求全部强制退出条件有证据且满足，并且没有开放 Attempt。终态之后的新证据或重开产生新 revision，旧终态保持可审计；身份基础变化不能通过 reopen 隐藏，必须创建新 Task。Task State 不产生 Action Authorization。

## Intent Commitment 状态

Intent 使用两条正交轴，而不是单一综合状态：

```text
commitment: proposed → adopted ↔ suspended → retracted / superseded
                    ↘ indeterminate

fulfillment: not_evaluated → not_started → ongoing
                                      ├─ fulfilled
                                      ├─ degraded / not_fulfilled
                                      └─ indeterminate
```

`adopted` 必须绑定精确 Definition 上的 Authority Decision。`fulfilled` 必须由全部 mandatory expectations 的证据支持。persistent Intent 的 `fulfilled` 只是时点快照，后来 drift 追加 `degraded`，不覆盖旧 Assessment。`retracted` 可以与历史 `fulfilled` 同时成立；它不自动取消 Task 或撤销 Proposal Authorization。

## Routine Instantiation 状态

Routine activation 与每次 occurrence 的 Instantiation Decision 是两条分离轴：

```text
activation: proposed → active ↔ paused → retired / superseded
                    ↘ indeterminate

occurrence: trigger opportunity
  → not_eligible | suppressed | deferred | expired
  → duplicate | integrity_conflict | indeterminate
  → materialized (one exact Task Definition)
```

`active` 必须绑定精确 Routine Definition 上的 Authority Decision。Trigger matched 不推出 eligibility satisfied；unknown 为 `indeterminate`。恢复 active 不改变旧 occurrence，也不隐含 catch-up。`duplicate` 保留既有同一 Task binding，`integrity_conflict` 不使用 last-writer-wins。`materialized` 不表示 Task 已开始、Plan 已存在、Proposal 已获准或设备已派发。

## Situational Context 状态

Situation Claim 没有可覆写的 `current mode` 状态。Claim 依旧不可变；其用途化消费沿用 World View 正交轴，再产生独立 Use Assessment：

```text
Observation／inference／attestation
  → Situation Claim candidate
  → World View: available + accepted + current + in_effect
      ├─ exact query match + subject coverage complete → satisfied
      ├─ accepted explicit incompatibility             → not_satisfied
      └─ denied / missing / unavailable / stale /
         contested / expired / partial coverage        → indeterminate
```

开放结束边界只表示 Claim 声称 episode 仍在进行；证据 stale 后仍为 `indeterminate`，不能借开放区间维持永久 current。episode 闭合或纠正追加新 Claim、supersession 与新 View。Declared control mode、policy applicability、prediction 与 actual situation 各有自身状态，不聚合成一个全局家庭状态机。

## Contextual Applicability 状态

适用性与冲突使用两条正交轴；目标满足、Intent 与 Authorization 继续在各自状态机中：

```text
target + accepted Rule + exact condition Assessments
  → applicability: applicable | not_applicable | indeterminate
  → conflict:      not_evaluated | none | present | indeterminate
```

`all_of` 中一项明确 false 或 `any_of` 中一项明确 true 可以形成 `decisive_subset`；需要证明全部 true／全部 false 时必须有 `complete` 覆盖。目标时间明确 expired／not-yet 可产生 `not_applicable`，但规则、context、访问或身份缺失只能产生 `indeterminate`。旧 World View `conflicting` 仅表示 `applicable + conflict present` 的有损投影，不是规范单轴状态。任何 applicability／conflict 组合都不产生 Need、priority、Intent、Task 或 Action Authorization。

## 数据保留与删除

敏感 Record 的载荷可以在授权流程下经历 `active → redacted | deleted | crypto_shredded`。相应墓碑至少记录对象标识、发生时间、授权依据和删除类别；墓碑不得泄露已删除敏感内容。
