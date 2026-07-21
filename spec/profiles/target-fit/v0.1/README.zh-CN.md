# HWM Target Fit Profile v0.1

- 状态：Fixture Candidate
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)

## 目的

本可选 Profile 判断一条当前适用的 Preference、Goal、Requirement 或 Constraint，在一个用途绑定的家庭视图中是否被满足。它不推断舒适、福祉、Need、Intent、行动成功或权限。

规范链是：

`适用的目标 Claim + 已接受的 Evaluation Specification Claim + 用途绑定的状态 World View -> Target Fit Assessment`

Target Fit 不增加 Core 原语。目标及其评价规范是不可变 Claim；Assessment 是 Profile 局部制品。

## 必须分开的提问

1. **适用性：**现在是否应考虑该目标？
2. **符合度：**在已接受的评价规范下，声明的当前状态是否达到目标？
3. **体验：**当事人是否报告舒适、满意或接受？
4. **冲突与优先级：**多个适用目标如何互动？
5. **Intent 与 Authority：**家庭是否承诺改变，某动作是否可执行？

卧室 25 °C 可以在声明的传感器规则下不符合一条适用的 19–21 °C 偏好。但这本身不证明住户不舒服、不证明需要制冷，也不允许 Agent 启动空调。

## Evaluation Specification Claim

可选的 [Requirement Operationalization Profile](../../requirement-operationalization/v0.1/README.zh-CN.md)约束人或 Agent 起草的提案如何在 Authority 独立接受之前取得适格性。Target Fit 不会因为某个代理容易测量，就把 Agent 的选择当作已接受规范。

其 proposition subject 是目标 Claim 标识，predicate 为：

`https://homeworldmodel.org/spec/profiles/target-fit/v0.1#evaluatedBy`

object 声明一个或多个 criterion 与聚合规则。每项 criterion 绑定精确的被测对象或测量区域、属性、目标条件与单位、观测或证言过程类别、新鲜度与现象时间要求、不确定性感知的决策规则，以及它是否必需。

评价规范有独立的签发者、证据、有效期、范围、接受与纠正历史。“温馨”等模糊目标在被已接受规范操作化之前保持 `indeterminate`；操作化可以要求本人证言，不必强行使用传感器。Agent 不得自造数值代理。

## Criterion 与聚合结果

单项结果为 `met`、`not_met` 或 `indeterminate`。缺失、拒绝访问、陈旧、争议、对象错误、属性错误、单位不兼容、过程不兼容或时间不匹配，都产生 `indeterminate`，而不是 `not_met`。

Fixture 的区间规则规定：不确定区间完全位于目标区间内为 `met`；二者不相交为 `not_met`；在边界重叠为 `indeterminate`。这只是声明的规则，不是通用测量定律。其他符合性用途可以绑定 guard band、非对称风险规则、合格测试程序或人工判断。

Assessment 总结果为 `satisfied`、`partially_satisfied`、`not_satisfied` 或 `indeterminate`：

- `all_required`：全部必需项满足才是 `satisfied`；任一必需项不满足即 `not_satisfied`；其余为 `indeterminate`。
- `any_sufficient`：任一充分项满足即 `satisfied`；全部不满足为 `not_satisfied`；其余为 `indeterminate`。
- `report_partial`：全部满足为 `satisfied`，全部不满足为 `not_satisfied`，确定的混合结果为 `partially_satisfied`；任何必需未知使结果为 `indeterminate`。

仅仅接近阈值不能产生 `partially_satisfied`。接近程度、余量和偏差是测量值；部分满足必须来自显式多 criterion 聚合规则。

适用性是前置输入，因此 `not_applicable` 不是 Target Fit 结果。适用性不是 `applicable` 时，fit 为 `indeterminate` 并记录前置条件失败。

## 体验与行动边界

测量结果与个人体验证言是两条独立证据通道。目标可显式把证言定义为 criterion；否则体验在独立轴上报告 `not_evaluated`、`accepted`、`rejected` 或 `indeterminate`。传感器符合不能暗中变成主观舒适。

当前 fit 不是预测 fit、反事实收益、Action Effect Assessment 或 Action Trace Goal Evaluation。规划可以对模拟状态复用同一目标和评价规范，但必须标明其认知基础。行动后的 Goal Evaluation 可以绑定 Target Fit Assessment，但行动成功与目标符合仍是两件事。

## 不变量

1. 适用不等于满足；不满足不等于需要。
2. 目标内容与评价方法是分别接受的 Claim。
3. 没有已接受的 Evaluation Specification，就没有确定 fit。
4. 结果绑定精确目标、规范、适用性 Assessment、World View、用途、时间、Authority Epoch 与证据内容。
5. 对象、属性、过程、单位、时间与新鲜度必须对齐。
6. 测量不确定性由声明的决策规则处理，不能丢弃。
7. 除非规范如此声明，平均值不能证明逐点最小值。
8. 传感器值不证明主观舒适或福祉。
9. `partially_satisfied` 来自声明的聚合，而非接近阈值。
10. 缺失或不可访问证据是未知，不是失败。
11. 每个目标独立评价，不合成家庭效用函数。
12. fit 不创建优先级、Intent、Task、Proposal、Authorization、dispatch 或行动。

## 标准边界与非目标

[SOSA/SSN 2023](https://www.w3.org/TR/vocab-ssn-2023/) 分离被观测对象、属性、过程、结果、现象时间与结果时间；[EARL 1.0](https://www.w3.org/TR/EARL10-Schema/) 分离通过、失败、无法判断、不适用与未测试；[SHACL](https://www.w3.org/TR/shacl/) 展示显式输入对约束与逐项结果；[JCGM 106:2012](https://www.bipm.org/en/doi/10.59161/jcgm106-2012) 说明符合性决策依赖测量不确定性与声明的决策规则。HWM 不把这些词汇直接等同于物理或体验真相。

本 Profile 不标准化舒适科学，不定义通用阈值，不诊断健康或福祉，不给住户排序，不指定设备，不在缺少合格程序时判断法规合规，也不授权行动。

## 可执行证据

[Target Fit oracle](../../../../conformance/scenarios/target-fit-v0.1/README.zh-CN.md) 包含 23 个语义案例、9 个聚合案例与 13 个禁止推断。JavaScript 与 Python 独立重现决策表。[`Target Fit Assessment schema`](target-fit-assessment.schema.json) 固定最小交换边界；通过 fixture 不验证真实测量准确性或人的体验。
