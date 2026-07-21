# 多用户晨间准备情景 v0.1

- 状态：可执行对抗性夹具
- 版本：0.1.0
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)

## 要验证的问题

当预测存在不确定性、源证据受隐私保护、居民偏好冲突、一个意图产生多个行动与物理影响，并且事后结果不能归结成单一成功值时，HWM 能否表达主动家庭服务？

## 初始知识

情景使用以下持久 Claim，具体谓词属于示意 Profile：

| Claim | 认知依据 | 内容 |
| --- | --- | --- |
| 汇总晨间需求预测 | 学习 | 工作日 07:15–07:45 出现热水需求的概率为 0.78 |
| 居民 A 卧室偏好 | 声明 | 有人在房时希望 22–23 °C |
| 居民 B 卧室偏好 | 声明 | 有人在房时希望 19–20 °C |
| 家庭准备能耗约束 | 声明 | 晨间准备消耗不超过 1.5 kWh |
| 热水就绪要求 | 声明 | 浴室出水等待不超过 10 秒且温度至少 40 °C |
| 循环泵等待时间影响 | 学习 | 启动循环后预测等待 5–9 秒 |
| 循环泵温度影响 | 学习 | 启动循环后预测出水温度 40–45 °C |
| 循环泵能耗影响 | 学习 | 启动循环后预测消耗 0.15–0.25 kWh |

汇总预测是面向特定用途的派生 Claim。原始习惯 Record 和个人日程 Claim 不向晨间准备 Agent 披露。

## Authority 与用途边界

对于 `morning_preparation` 用途，Agent 可以取得：

- 汇总概率及其声明发布者；
- 就绪要求、能耗约束和影响 Claim；
- 在需要暴露冲突时取得两位居民的温度偏好值；
- “无权取得具体晨间活动者身份”这一解析结果。

它不能取得原始视频、精确历史浴室访问、个人推断洗浴事件或隐藏源 Claim 的标识。World View 不得要求 Agent 回查权限更宽的知识包。

## 预期 World View

View 于 06:55 生成，规划时间窗为 07:15–07:45。

| 解析问题 | 可用性 | 认知 | 新鲜度 | Candidate | 适用性 |
| --- | --- | --- | --- | --- | --- |
| 汇总热水需求概率 | `available` | `accepted` | `current` | 0.78 与可见派生 Claim | `applicable` |
| 未来热水使用者的具体身份 | `access_denied` | `not_evaluated` | `not_applicable` | 无 | 省略 |
| 居民 A 温度偏好 | `available` | `accepted` | `current` | 22–23 °C | `conflicting` |
| 居民 B 温度偏好 | `available` | `accepted` | `current` | 19–20 °C | `conflicting` |
| 晨间能耗约束 | `available` | `accepted` | `current` | ≤1.5 kWh | `applicable` |
| 热水就绪要求 | `available` | `accepted` | `current` | ≤10 秒且 ≥40 °C | `applicable` |

两个温度结果引用同一个可见冲突标识。View 不选择折中温度，也不授权行动。

两条偏好继续绑定各自主体并在认知上 accepted；它们不是对“哪个温度为真”的两张票。后续 21 °C HVAC 值只是 Planner Proposal。[Shared Action Coordination Profile](../../../spec/profiles/shared-action-coordination/v0.1/README.zh-CN.md)现在补上受影响主体闭包与精确 Proposal 回答的缺失边界。

## Planner 与 Policy 结果

Agent Planner 可以在同一个 `prepare-home-for-morning` 意图下独立生成两个 Proposal：

1. 07:10 启动热水循环泵；
2. 把共享卧室 HVAC 设置为 21 °C。

HWM Core 不规定 Planner 为什么选择这些 Proposal。Policy Evaluator 返回：

- 循环泵 Proposal：`allowed`，并受能耗约束；
- HVAC Proposal：`confirmation_required`，因为两个已接受偏好的适用性仍然冲突。

只有循环泵 Proposal 被下发。HVAC 没有下发属于授权结果，而非设备失败。

## 循环泵 Action Trace

循环泵应答指令，观测得到：

- 浴室等待时间：8 秒；
- 出水温度：41 °C；
- 能耗：0.18 kWh。

预期 Trace 修订分别记录三个 `consistent` 影响评估、两个 `satisfied` 就绪目标评估、一个 `satisfied` 能耗约束评估，并且没有用户确认。即使多个影响来自同一行动，各 Effect Claim 仍然相互独立。

## 事后事件

07:15–07:45 期间没有观测到洗浴活动。

这不会使循环泵影响变成不一致，因为它确实产生了预测的物理就绪状态；也不会使就绪目标变成未满足，因为热水已经准备好；更不能在逻辑上反驳概率为 0.78 的预测，它只形成一次用于以后校准预测的实现 Record。资源成本仍是 0.18 kWh，并可以支持后续效用或用户接受评估。

因此模型至少必须分离：

1. 预测实现与长期校准；
2. 策略授权；
3. 设备执行；
4. 物理影响一致性；
5. 就绪目标满足；
6. 资源成本；
7. 用户接受。

## 顶层原语闭包结果

该情景不需要新的 HWM 顶层原语：

- 预期洗浴是一个 Event EntityRef，由预测 Claim 描述；
- 居民偏好、能耗约束、要求和影响模型都是带类型的 Claim；
- 私密观测与后续未发生证据属于 Record；
- 披露和行动许可属于 Authority；
- 适用性冲突属于 World View 解析元数据；
- 每个已下发行动拥有自己的 Action Trace，并可共享同一个 Intent 标识。

多步骤 Plan 仍是 Agent 制品，除非后续互操作情景证明它必须交换。不能仅因为 Profile 使用了 `PersonModel`、`Routine`、`Plan`、`Goal` 或 `Event` 概念，就把它们增加为 Core 顶层原语。

## 暴露出的 Profile 缺口

Core 保持闭合，但可选 Profile 仍需定义：

- 概率、预测时间窗、实现与校准语义；
- 偏好上下文、跨结果冲突表达与受影响主体推导；
- 多输出行动影响 Claim 与资源成本单位；
- 汇总 Claim 的隐私保护派生与披露；
- 行动约束和确认职责到 ODRL 或其他策略词汇的映射。
- 不暗示通用投票或福利聚合规则的家庭特定 coordination policy。

这些属于 Profile 缺口，不代表 HWM 需要更大的 Core 本体。

## 机器可读制品

- `manifest.json`：知识包、Profile、Authority 纪元、资源摘要与往返扩展；
- `claims.json`：十个预测、偏好、约束、要求、目标和影响 Claim Envelope；
- `records.json`：声明、授权结果、下发、应答、物理观测和预测实现；
- `world-view.before.json`：包含可见偏好冲突与零 Candidate 隐私拒绝的用途化规划 View；
- `pump-action-trace.expected.json`：已下发的多输出行动，并分别评估目标与资源；
- `hvac-action-trace.expected.json`：需要确认且未下发的 Proposal；
- `oracle.expected.json`：规范夹具结果；
- `validate.mjs`：不依赖第三方包的语义、完整性、隐私、时间与引用校验器。
- `authority-profile.json`：夹具 Trust Root 绑定、用途、Permission、Prohibition、确认 Duty、Epoch、Lease 和安全策略引用；该绑定是夹具声明，不代替带外 genesis 验证；
- `authority-oracle.json`：十一个确定性的在线／离线授权用例；
- `authority-evaluator.mjs`：不依赖第三方包的基线 Authority 评估器。

在仓库根目录运行：

```sh
node conformance/scenarios/multi-user-morning-preparation-v0.1/validate.mjs
node conformance/scenarios/multi-user-morning-preparation-v0.1/authority-evaluator.mjs
```
