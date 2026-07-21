# ADR-024：分离情境适用性、冲突、Need 推断与 Intent

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-024-separate-contextual-applicability-conflict-and-intent.md`](ADR-024-separate-contextual-applicability-conflict-and-intent.md)

## 背景

Situational Context 已经回答用途绑定的“正在发生什么”，但不回答某人的 Preference、家庭 Requirement 或安全 Constraint 是否应在该情境中被考虑。Core v0.1 有一个可选内联 `applicability.status`，但它把单目标相关性（`applicable`、`out_of_scope`、`not_available`）和跨目标冲突（`conflicting`）混在一起，也没有绑定精确 Rule、输入 Assessment、主体对齐、决定性覆盖或可复现三值判断。

把这个缺口折叠成推断的 `Need` 并不安全。“A 正在睡觉”“A 睡觉时偏好 19–21 °C”“房间当前 25 °C”“偏好未满足”“家庭应给房间降温”“这项制冷 Proposal 获准”是六个不同命题和决定。宠物福利、能源上限、无障碍、安静时段与共享空间舒适也存在同样区别。

Context 研究把相关性理解为具体交互关系，而不是全局状态。人机交互研究也指出，许多人的情境含义无法可靠感知，系统必须保持可理解并能让用户接管。ODRL 提供条件表达概念，但不会把 Preference 变成 permission。HWM 已有不可变 Claim、用途绑定 World View、分离认知状态、Authority、Intent Commitment、Coordination 与 Situation Use Assessment。

## 决定

1. HWM 不增加特权、通用的 `Need` 事实，也不从 context 推断家庭承诺。
2. Preference、Goal、Requirement 与 Constraint 保持为普通、主体和作用域限定 Claim。“Directed condition Claim”只是 Profile 简称，不是 Core 类。
3. 情境适用性要求独立、已接受的 Applicability Rule Claim。规则缺失或空规则知识不得表示无条件适用。
4. Rule Claim 绑定目标 Claim 标识、显式 `all_of`／`any_of`／`unconditional` 操作符、精确外部条件 query、预期结果与主体对齐语义，并拥有独立 issuer、证据、时间、作用域、接受与纠错历史。
5. Contextual Applicability Assessment 绑定精确 World View、目标 Claim Body、Rule Claim Body、条件 Assessment、用途、`as_of`、Authority Epoch 与覆盖内容。
6. 规范适用性采用三值：`applicable`、`not_applicable`、`indeterminate`。
7. `not_applicable` 需要明确目标时间排除或确定 Rule 为假。缺失、拒绝、不可用、过期、争议、未知、未验证、部分覆盖或绑定不符仍为 `indeterminate`。
8. `all_of` 与 `any_of` 使用失败关闭的三值聚合。决定性子集可以在不披露所有输入时证明布尔结果，但不能声称完整覆盖或泄漏隐藏输入。
9. 适用性与冲突正交。冲突在作用域重叠的适用目标间求值，不能让目标变得不适用、选择优先级、合并偏好或选择赢家。
10. Core v0.1 的组合内联状态仅保留为有损兼容投影；理解本 Profile 的消费者使用分离的适用性与冲突轴。
11. 适用性与目标满足／适配分离。适用不表示满足、违反、紧迫或必要。
12. 学习到的 Preference、推断的福利 Requirement 或 Agent 编写的 Rule 在精确用途接受前都是带归因候选。宠物行为不会发出人类式 Intent。
13. 目标适用不会授予家庭 Preference 合成、Intent adoption、Routine activation、Task、Plan、Proposal、Authorization、派发或物理结果。
14. 新行为保留在可选 Contextual Applicability Profile，不增加 Core 本体原语。

## 后果

- 兼容 Agent 可以解释究竟是哪条目标、Rule、context Assessment、时间、用途和 Authority 状态使知识相关；
- 家庭可以改变 Preference 的适用时机，而不重写 Preference 或历史 Assessment；
- 未知 context 失败关闭，决定性短路又可以减少隐私披露；
- 个人偏好可以同时适用并冲突，而不被合成为家庭效用函数；
- “Need”保持为会话用语或带归因领域 Claim，不成为系统拥有的真理捷径；
- 迁移期间已有 World View 内联适用性数据需要明确有损投影。

## 拒绝的替代方案

### 从活动或传感器状态直接推断 Need

拒绝，因为它混合描述、个人偏好、适配、承诺、优先级与权限，并隐藏推断作者和不确定性。

### 只把条件放进不透明 Preference object

拒绝，因为 Agent 无法独立绑定、修订、解析或解释 Rule 及其 Authority standing。

### 把缺失 Rule 当成无条件

拒绝，因为不披露、存储不可用、旧客户端与真正无条件目标将无法区分。

### 保留 `conflicting` 作为规范适用性值

拒绝，因为一条目标完全可以同时适用并与另一条目标冲突。冲突是关系判断，不是互斥的单目标相关性状态。

### 使用二值条件逻辑

拒绝，因为未知、拒绝、过期、争议与部分覆盖的家庭知识会被悄悄转换成真或假。

### 让 LLM 在适用目标中自行选择

拒绝，因为排序、家庭治理、协调、Intent adoption 与行动授权是不同下游过程。

## 接受前需要的验证

1. 外部实现复现 `all_of`、`any_of`、显式 unconditional、目标时间、决定性子集与绑定失败案例；
2. 家庭研究检验解释能否区分“相关”“当前不相关”“未知”“冲突”和“系统将行动”；
3. 隐私审查检验决定性子集、不透明条件 Assessment 与旧投影是否泄漏隐藏主体、数量、身份或来源；
4. Preference 与 Rule 修订测试保留不可变历史并拒绝 Claim ID／内容碰撞；
5. 多住户和宠物福利研究检验归因、主体对齐、照护者 Claim、冲突与非人类 Intent 边界；
6. Home Assistant 与另一 runtime 展示不把 context 不可用转成假，也不把目标适用转成自动化权限的 adapter；
7. 未来 Core revision 删除组合内联状态，或明确其有损投影且不把它作为规范模型。

## 参考

- [Dey《Understanding and Using Context》](https://doi.org/10.1007/s007790170019)
- [Bellotti 与 Edwards《Intelligibility and Accountability》](https://doi.org/10.1207/S15327051HCI16234_05)
- [ODRL Information Model 2.2](https://www.w3.org/TR/odrl-model/)
- [Adomavicius 与 Tuzhilin《Context-Aware Recommender Systems》](https://doi.org/10.1007/978-0-387-85820-3_7)
- [SimuHome](https://arxiv.org/abs/2509.24282)
- [SMH-Bench](https://arxiv.org/abs/2606.01912)
