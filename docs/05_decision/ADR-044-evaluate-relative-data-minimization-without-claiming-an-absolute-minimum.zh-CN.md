# ADR-044：评估相对数据最小化，不宣称绝对最小

- 状态：提议
- 日期：2026-07-19

## 背景与决定

World View、Agent Orientation 和跨 Agent 工作组合都依赖“最小披露”，但如果用途、输出契约、语义依赖、精度、候选变换、联结风险、保留期限和辅助信息不明确，`minimal` 就不可复现。开放世界也无法证明不存在更少数据的未来算法。

因此建立用途绑定披露 Profile：需求集声明精确语义需要和使用／输出限制；披露包记录来源、变换、损失、精度、覆盖及整包推断风险；独立评估判断包是否充分、每项是否必要，以及在绑定候选集合中是否存在已知的更低风险合格方案。

结果是相对、限时且不授权的。合并数据包、辅助信息变化或输出用途变化均需重新评估。输入最小化不自动覆盖输出、日志、训练、保留和转发。

这使隐私成为不同 Agent 实现可反驳、可比较的协议边界，而不是某个模型厂商的口头承诺。

英文规范：[`ADR-044-evaluate-relative-data-minimization-without-claiming-an-absolute-minimum.md`](ADR-044-evaluate-relative-data-minimization-without-claiming-an-absolute-minimum.md)。
