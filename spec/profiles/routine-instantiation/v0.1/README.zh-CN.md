# HWM Routine Instantiation Profile v0.1（中文镜像）

- 状态：Profile Discussion Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范：[`README.md`](README.md)

## 目的

这个可选 Profile 定义持续性家庭 Intent 与重复 Task 之间缺失的边界。Routine 是经 Authority 激活的 **Task 实例化策略**，不是观察到的习惯、日历条目、可执行设备自动化或权限。

规范链路是：

`合格模式或请求 → 候选 Routine Definition → Authority 激活 → trigger opportunity → 截止时点 eligibility → occurrence decision → 精确 Task → Plan → Proposal → Authorization → Attempt`

这里只标准化中间部分。Profile 不新增 Core primitive，也不定义通用规则语言、调度器、Planner 或自动化运行时。

## 模型边界

1. **Observed Pattern Claim** 描述从历史推断出的重复模式；它可以支持候选 Routine，但不能激活 Routine。
2. **Persistent Intent** 声明家庭已经采纳的结果。
3. **Routine Definition** 绑定一个 Intent lineage、用途、不可变 Task 范围、外部 trigger 与 eligibility 规范、occurrence 身份、迟到策略、重叠策略和 Task 模板。
4. **Routine Activation State** 记录 Authority 是否把精确 Definition 置为 `active`、`paused`、`retired` 或 `superseded`。
5. **Trigger evidence** 只产生一次求值机会；它不证明条件成立，也不授权行动。
6. **Instantiation Decision** 在声明时点求值一个 occurrence，只能物化一个 Task、记录 duplicate 或失败关闭。
7. **Task** 是一次有界工作血缘，之后仍需独立 Plan、Proposal、policy evaluation、Authorization 与 Attempt。

Agent 可以推断模式、编写候选 Routine 或求值已激活 Routine，但不能自行激活、扩张范围、制造 trigger evidence、把 unknown 当 false，或因 Task 已物化就下发行动。

## 制品

- [`routine-definition.schema.json`](routine-definition.schema.json)：Routine 身份、精确持续性 Intent、外部 trigger/eligibility 规范、occurrence policy、Task 模板、交付策略与受治理修订；
- [`routine-state.schema.json`](routine-state.schema.json)：精确 Definition 与 Authority Epoch 上的激活生命周期；
- [`instantiation-decision.schema.json`](instantiation-decision.schema.json)：一个 occurrence、证据、World View、条件评估、迟到／重叠结果、逻辑去重与最终精确 Task。

夹具摘要均为 RFC 8785 canonical JSON 上的 SHA-256；`unsigned_fixture` 不是生产 proof 模式。

## 身份与修订

Routine 是家庭控制的 policy lineage，其不可变身份基础为：

`家庭 + 目标 Intent lineage + 用途 + 不可变 Task 范围`

精确 Intent Definition revision、trigger specification、eligibility specification、Task exit criteria、迟到策略和重叠策略是可修订内容。只有精确上一版绑定、连续 revision 与 Authority continuity decision 同时存在时，才可保留同一 Routine。家庭、目标 Intent ID、用途或 Task 范围变化必须创建新 Routine ID。

Routine 修订只作用于用该 revision 执行的后续求值，不得改写旧 Instantiation Decision、重定向已有 Task、改变已经物化的 occurrence，或让新的补跑策略追溯生效。

## 激活不等于 Intent 或行动授权

`activation_status` 为 `proposed`、`active`、`paused`、`retired`、`superseded` 或 `indeterminate`。

- `active` 必须有针对精确 Routine Definition 的 Authority Decision；
- 暂停、退役、替代和重新激活使用追加式 Authority transition；替代还必须绑定新 Routine；
- 暂停或退役只停止新实例化，不会暂停／撤回目标 Intent、取消 Task、撤销 Proposal 或改变旧证据；
- 即使 Routine 仍 active，只要精确目标 persistent Intent 当前不是 `adopted`，实例化也必须被抑制。

本 Profile 明确要求 persistent Intent。重复规则不能把一次性请求变成持续家庭承诺。

## Trigger、Condition 与 Occurrence

Trigger 是求值机会；eligibility condition 是对用途化 World View 的截止时点评估：

- `not_matched` 或 `not_satisfied` 表示本 occurrence 不合格；
- 输入不可用、冲突、过期或未知时为 `indeterminate`，不能静默当成 false 或 true；
- Forecast 只有经合格、接纳的 assessment 才能参与，且仍是预测，不是已经观察到的未来事实。

HWM 绑定外部 trigger 语义，不发明新 DSL。可以组合 iCalendar/JSCalendar、CloudEvents、规则语言或实现专用 trigger artifact，但必须绑定精确内容和 semantics URI。

当 eligibility 依赖家庭 activity、presence、occupancy aggregate、访客或宠物情境时，部署可以绑定 [`Situational Context Profile`](../../situational-context/v0.1/README.zh-CN.md) Use Assessment。assessment 必须使用精确用途化 World View 与声明的 subject coverage。平台 `home`／`away` mode、没有 event、Forecast 或单人 episode 都不能作为全家庭 condition truth 的捷径。

当 eligibility 还要判断一条 Preference、Goal、Requirement 或 Constraint 在该情境中是否相关时，部署可以绑定 [`Contextual Applicability Profile`](../../contextual-applicability/v0.1/README.zh-CN.md) Assessment。`applicable` 只是 eligibility 输入；它不表示目标未满足，也不创建目标 Intent、Routine activation、Task 或权限。

时间 recurrence 的 occurrence key 即使改期也保留原始本地 recurrence identity 与时区；事件驱动 Routine 的 key 来自 Authority 认可的 correlation policy。CloudEvents `source + id` 只能识别事件投递重放，不能单独标识家庭逻辑 occurrence；一个现实 occurrence 可能产生多个不同事件。

## 迟到、重叠与去重

不存在可互操作的隐式补跑或并发默认。每个 Routine 声明：

- `skip`、`latest_only` 或有界 `bounded_each`，以及最大迟到时间与补跑数量；
- `independent`、`suppress_while_active` 或 `defer_while_active`。

重新激活不会自动回放暂停区间，除非当前精确 Definition 的有界 late policy 明确接纳。Routine 也不能以 overlap shortcut 取消或替代旧 Task；旧 Task 必须经过自己的 Authority-bound transition。

逻辑 materialization key 由以下内容计算：

`家庭 + Routine ID + occurrence key`

它跨同一 Routine lineage 的 Definition revision 生效，因此重试或修订不会为已经物化的 occurrence 再建 Task。同 key／同 Task 是 `duplicate`；同 key／不同 Task 是 integrity conflict，而不是 last-writer-wins。

## Task 物化

合法 `materialized` Decision 需要：精确 active Routine、当前 Authority、精确 adopted persistent Intent、已接纳且匹配的 trigger evidence、已满足或明确不需要的 eligibility、符合策略的迟到／重叠结果、新逻辑 materialization key，以及 Intent、Routine、occurrence、用途、范围与 exit criteria 全部匹配的 Task。

物化只创建 Task Definition，不创建 Plan、Proposal、设备命令、Attempt、安全结果或 Action Authorization。

## 标准复用与边界

- [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html) 提供稳定 recurrence instance identity；改期后 `RECURRENCE-ID` 仍保持原实例时间；
- [RFC 8984](https://www.rfc-editor.org/rfc/rfc8984.html) 提供 JSON recurrence rule、排除、override、时区与 recurring Task；
- [CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) 提供事件上下文和 `source + id` 投递去重；它允许一个 occurrence 产生多个事件，因此 HWM 另加逻辑 occurrence policy；
- [W3C RIF-PRD](https://www.w3.org/TR/rif-prd/) 提供 production rule 的 condition/action 与冲突消解语义；HWM 不把 rule firing 当成家庭授权；
- [Home Assistant automation 文档](https://www.home-assistant.io/docs/automation/basics/) 展示 trigger、condition、action 的实践分离，其 [automation modes](https://www.home-assistant.io/docs/automation/modes/) 展示重复 trigger 的并发语义必须显式化；它们是实现参考，不是 HWM 规范词汇；
- [W3C ODRL 2.2](https://www.w3.org/TR/odrl-model/) 提供 policy、party、permission、prohibition、duty 与 constraint；Routine activation 与 Action permission 仍然分离。

Profile 不标准化家庭习惯、心理意图识别、通用事件关联算法、分布式 exactly-once、cron 语法、规则求值、设备命令或法律权限。

## 不变量

1. 观察到重复模式不能自行激活 Routine。
2. Persistent Intent、Routine 激活、trigger match、eligibility、Task 创建与 Action Authorization 彼此分离。
3. Routine 只面向一个 adopted persistent Intent lineage 与一个不可变用途／范围基础。
4. Routine 修订必须精确、连续、Authority-controlled、面向未来且追加式。
5. Trigger 存在不证明 condition 为真；unknown 必须失败关闭为 `indeterminate`。
6. 事件投递身份不等于逻辑 occurrence 身份。
7. 时间改期保留原始 recurrence identity。
8. catch-up 与 overlap 显式且有界；重新激活没有隐式 replay。
9. 一个 lineage-scoped materialization key 最多接纳一个精确 Task；冲突不能 last-writer-wins。
10. Routine 暂停、退役、修订或重叠不得静默转换已有 Task 或目标 Intent。
11. Task 物化不产生 Plan、Proposal、dispatch、Attempt 或 Authorization。

## 夹具与验证

```sh
node conformance/scenarios/routine-instantiation-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

oracle 是对抗性语义夹具，只证明边界可证伪，不证明社区采纳、生产调度可靠性、安全 proof 处理或家庭 policy 公平性。
