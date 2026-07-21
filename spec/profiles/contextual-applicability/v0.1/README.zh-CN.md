# HWM 情境适用性 Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)

## 目的

该可选 Profile 判断一条已接受的 Preference、Goal、Requirement 或 Constraint Claim 在某个时间、某个精确家庭用途下是否相关。它把已解析的情境连接到带方向性的家庭知识，同时不把情境当成 Need、优先级、Intent 或权限。

规范链为：

`目标 Claim + 已接受的 Applicability Rule Claim + 用途绑定的条件 Assessment → Contextual Applicability Assessment`

Profile 不向 Core 增加 `Need`、Preference、Requirement、Rule 或 Context 原语。目标与规则都是普通不可变 Claim；条件语义留在声明的外部 Profile；Assessment 是 Profile 层交换制品。

## 为什么适用性必须单独判断

以下问题彼此不同：

1. **接受**：Resolver 是否可为当前请求者和用途依赖该 Claim；
2. **适用**：这条已接受 Claim 在当前精确情境中是否应被考虑；
3. **满足或适配**：当前世界是否满足偏好或要求；
4. **冲突**：多条适用目标是否作用域重叠且内容不兼容；
5. **优先级或协调**：用什么过程处理这些目标；
6. **Intent**：家庭是否承诺追求某个结果；
7. **授权**：某一精确 Proposal 是否可以执行。

例如，住户 A 的睡眠温度偏好 19–21 °C 可以在 A 睡觉时适用、在当前 20 °C 下已满足、与另一条适用偏好冲突，同时仍不产生家庭 Intent 或设备动作。

## 目标 Claim

Profile 可评估以下普通、主体限定的 Claim：

- Preference：主体倾向的条件；
- Goal：期望条件；
- Requirement：声明过程认为必须满足的阈值或结果；
- Constraint：对可能结果或方法的限制。

“Directed condition Claim”只是以上四种角色的解释性简称，不是本体类。Claim 被接受不表示它适用。学习到的模式、话语、传感器 Observation、Forecast、模型标签或 Agent 推断的 Need 都不会自动成为目标 Claim。

## Applicability Rule Claim

Applicability Rule Claim 是普通 HWM Claim，其 proposition subject 为目标 Claim 标识，predicate 为：

`https://homeworldmodel.org/spec/profiles/contextual-applicability/v0.1#qualifiedBy`

其 object 声明一个操作符与零个或多个条件：

- `all_of`：全部条件满足；
- `any_of`：至少一个条件满足；
- `unconditional`：显式无情境条件；不得从规则缺失或空输入推断。

每个条件绑定精确外部 query、预期 `satisfied` 结果以及目标与情境的主体对齐关系。v0.1 将否定表达在绑定 query 语义内部，而不是期待 `not_satisfied`，从而避免聚合器继承某个条件 Profile 的封闭世界假设。本 Profile 不定义通用 query DSL。夹具消费 [Situation Use Assessment](../../situational-context/v0.1/README.zh-CN.md)，其他声明 Profile 也可提供策略窗口、日历、环境、关系等条件 Assessment。

规则 Claim 有自己的 issuer、时间、作用域、认知依据、证据与 World View 解析。Agent 编写或学习到的规则不会仅因存在就获得治理地位。规则修正或变化创建新 Claim 与后续 Assessment，不修改历史。

## Assessment 契约

[`Applicability Assessment`](applicability-assessment.schema.json) 绑定：

- 精确目标 World View 摘要、用途、`as_of` 与 Authority Epoch；
- 目标与规则不可变 Claim Body 的精确摘要；
- 两者各自的 World View resolution 与正交状态；
- 规则操作符与求值覆盖；
- 每个披露的条件 query 与 Assessment 摘要；
- 一项适用性结果和独立的冲突状态；
- 原因码与证明材料。

目标和规则通常只有在可用、accepted、足够新鲜且 `in_effect` 或 `unbounded` 时才合格。已接受目标如果在 `as_of` 明确 `expired` 或 `not_yet_in_effect`，结果为 `not_applicable`。目标或规则缺失、拒绝访问、不可用、争议、未知、未验证、过期、混合或不确定时，结果为 `indeterminate`。

## 三值条件逻辑

适用性结果为：

- `applicable`：目标和规则合格，且显式布尔规则成立；
- `not_applicable`：目标时间明确排除当前 `as_of`，或规则被确定为假；
- `indeterminate`：缺少确定、内容绑定的依据。

对于 `all_of`，一个明确 `not_satisfied` 即可证明不适用；只有全部条件已知且 `satisfied` 才能证明适用。对于 `any_of`，一个 `satisfied` 即可证明适用；只有全部条件已知且 `not_satisfied` 才能证明不适用。其他情况均为不确定。

这是狭窄的 Kleene 式三值聚合边界，不是通用规则引擎。条件的 `not_satisfied` 必须已由其自身 Profile 证明。Claim 缺失、拒绝访问、不同标签或主体未知都不会在这里变成假。

## 决定性子集与隐私

Assessment 声明 `complete`、`decisive_subset` 或 `partial` 覆盖。一个 `all_of` 条件为假或一个 `any_of` 条件为真时，可以使用决定性子集停止求值。它不声称完整披露，也不能暴露请求者无权访问输入的值、身份、数量、来源乃至存在性。

`partial` 可见输入不能证明全部 `all_of` 条件满足，也不能证明全部 `any_of` 备选为假。获准的不透明条件 Assessment 可以成为决定性依据而不披露底层主体。

## 冲突与适用性正交

适用性按单条目标求值。冲突则在作用域、主体、属性、用途和时间重叠的多条适用目标之间独立评估。不同值不会自动冲突：主体可能不同、作用域可能不重叠，或多个结果可以同时满足。

Assessment 将 `conflict_status = not_evaluated | none | present | indeterminate` 与 `result` 分开。`present` 绑定独立冲突 Assessment。冲突不会让 Claim 变得不适用、选择赢家、发明优先级、合并偏好或授权折中方案。所需过程由 Shared Action Coordination 与 Authority 规则决定。

Core v0.1 的 World View 内联 `applicability.status` 仅作为有损兼容投影：

| Profile 规范结果 | 冲突状态 | 旧投影 |
|---|---|---|
| `applicable` | `none` 或 `not_evaluated` | `applicable` |
| `applicable` | `present` | `conflicting` |
| `not_applicable` | 任意 | `out_of_scope` |
| `indeterminate` | 任意 | `not_available` |

实现本 Profile 的消费者必须使用分离轴，不得把旧 `conflicting` 当作规范适用性值。

## 不建立特权 Need 推断

HWM 不增加通用 `Need` 事实。“住户 A 需要供暖”可能隐藏至少三件事：A 偏好更暖范围、当前温度不适配该范围、家庭承诺改变它。本 Profile 只建立第一条 Claim 的当前相关性。

Agent 可以签发带归因的推断 Claim 或候选 Intent Definition，但不能让自身推断变成家庭事实或承诺。宠物行为同样保持为描述性证据；照护者或模型可签发带归因的福利 Goal／Requirement，并接受正常的认知与 Authority 解析。

`applicable` 不建立紧迫性、优先级、不满足、福利必要性、家庭偏好、Intent、Routine activation、Task、Plan、Proposal、权限、派发或结果。

## 标准与研究边界

- [Dey《Understanding and Using Context》](https://doi.org/10.1007/s007790170019) 支持把 context 理解为与实体—应用交互相关的信息，而不是全局状态；
- [Bellotti 与 Edwards《Intelligibility and Accountability》](https://doi.org/10.1207/S15327051HCI16234_05) 说明感知 context 不能替代人的情境含义，系统需要可理解的解释与让用户接管的机制；
- [ODRL 2.2](https://www.w3.org/TR/odrl-model/) 提供可复用布尔／逻辑 Constraint 概念，并要求处理器理解声明的 constraint 语义；HWM 不把家庭 Preference 解释成 ODRL permission；
- [Context-Aware Recommender Systems](https://doi.org/10.1007/978-0-387-85820-3_7) 把 context 作为偏好敏感推荐的输入；推荐在本模型中仍是下游且无权威性；
- [SimuHome](https://arxiv.org/abs/2509.24282) 与 [SMH-Bench](https://arxiv.org/abs/2606.01912) 表明智能家居 LLM Agent 在潜在意图、歧义、时间状态与个性化推理方面仍有明显困难；它们支持显式边界，但不定义本线格式契约。

## 不变量

1. accepted 与 applicable 分离；
2. applicable、satisfied、conflicting、prioritized、adopted 与 authorized 分离；
3. 目标和规则是不可变且独立接受的 Claim；
4. 规则缺失不表示无条件适用；
5. 适用性绑定精确目标、规则、View、条件、用途、时间与 Authority 内容；
6. `not_applicable` 需要明确时间排除或确定规则为假；
7. 缺失、拒绝、过期、争议、未知、部分覆盖或绑定不符都不是假；
8. `all_of` 与 `any_of` 使用失败关闭的三值语义；
9. 决定性子集只证明结果，不证明完整输入披露；
10. 主体对齐必须显式；一个人的情境不会激活另一个人的目标；
11. 冲突与适用性正交，不产生优先级或赢家；
12. 学习到的 Preference 或 Rule 在精确用途解析前只是候选；
13. 个人适用性不合成家庭 Preference 或 Intent；
14. 不存在特权 Agent 推断 Need 事实；
15. 适用性不授予 Routine activation、Task、Proposal、Authorization、动作或结果。

## 可执行证据

[Contextual Applicability oracle](../../../../conformance/scenarios/contextual-applicability-v0.1/README.zh-CN.md) 包含 56 个语义案例、20 个模型边界案例和 90 个禁止推断。它提供 Core 合法的目标与规则 Claim、用途绑定 World View、一项绑定的 Situation Use Assessment，以及摘要可验证、符合 Schema 的 Applicability Assessment。

JavaScript 与 Python 独立复现判定表。这只是项目内部实现多样性，不是组织独立性、用户验证，也不证明上游识别或偏好模型准确。

## 非目标

本 Profile 不标准化人类心理、不推断私有心智状态、不定义通用 context／preference 词汇、不规定 Planner、不排序目标、不解决家庭冲突、不建立家庭福利函数，也不授权行动。
