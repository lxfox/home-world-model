# ADR-074：只判断一个决策边界的充分性，而不判断整个家庭是否完整

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-074-judge-sufficiency-for-one-decision-boundary-not-the-whole-home.md`](ADR-074-judge-sufficiency-for-one-decision-boundary-not-the-whole-home.md)

## 背景

ADR-073 允许家庭保留未知，而不建立全局知识债务。接下来的问题是 Agent 何时可以说已经知道得足够多。全局 completeness 或 readiness flag 会压平不同生命周期 gate，并让标量置信度、证据数量或表面覆盖补偿缺失的 Authority、安全、专业复核、当前性或必需证据。

既有 Profile 已表达用途化 World View、评价规范、预测资格、Target Fit、规划转换、采购资格、实体接纳、Authority、本地安全、Action Trace、结果关闭与 revalidation。缺少的是组合规则，而不是新的本体原语。

## 决定

1. 只对一个精确决策问题／修订或下一语义转换判断充分性；拒绝无界的“家庭模型是否完整”。
2. 判断绑定 household、用途、主体、时空范围、生命周期阶段、必需输入、已接受程序、源快照／闭包、Authority epoch、未解决缺口、accepted-unknown 决定、限制和 `as_of`。
3. 必需输入类别按合取处理；可选证据、置信度或数量不能补偿缺失的强制类别。
4. `sufficient_for_exact_next_transition`、`sufficient_with_declared_limits`、`insufficient` 与 `indeterminate/contested` 都只是情境化结论，不是真值或质量等级。
5. accepted unknown 只对其精确决策和命名降级路径有效；它不解决命题，也不能迁移到其他决策。
6. 分离起草、比较、选择、购买、收货、安装、commission、授权、安全检查、dispatch、效果观察、工作关闭和 Target Fit 重评。
7. 规划证据不证明安装或运行表现；commissioning readiness 不证明 commissioning 成功。
8. 家庭 Authorization 不替代当前本地安全检查；dispatch 或 acknowledgement 不证明物理效果；有限效果证据不证明持续目标满足。
9. 相关变化、鲜度过期、用途／修订／阶段改变、Authority epoch 前进或 Agent 更换，都要求验证当前绑定并重新判断；历史 Assessment 保持不可变。
10. 不计算通用 readiness score；安全、Authority、覆盖、证据与程序 gate 不跨轴补偿。

## 后果

- Agent 可以准确表达：“已披露证据足以针对这个卧室和规划修订比较两套照明方案，并带有这些限制。”
- 它不能把这句话缩写成“家庭模型已经就绪”，也不能把结果带入购买、安装或运行。
- 30个可执行案例检验转换局部性、强制输入、accepted unknown、生命周期边界、Authority／安全分离、效果证据与 revalidation。
