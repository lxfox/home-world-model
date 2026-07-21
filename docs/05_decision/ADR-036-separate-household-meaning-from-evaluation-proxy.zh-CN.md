# ADR-036：分离家庭含义与评价代理

- 状态：Proposed
- 日期：2026-07-19
- 英文规范：[`ADR-036-separate-household-meaning-from-evaluation-proxy.md`](ADR-036-separate-household-meaning-from-evaluation-proxy.md)

## 背景

Target Fit 能评价已接受规范，却没有解释含糊的家庭表达如何成为该规范。如果 Agent 把“舒服”或“够亮”直接映射到方便读取的传感器阈值，系统虽然可测试，却可能已经不再表达家庭原意。

## 决定

采用可选的 Requirement Operationalization Profile。Proposal 绑定精确目标、原始表达、相关主体／空间、用途、生命周期阶段、criteria、过程、决策规则、审阅角色、声明遗漏与开放歧义。独立 Review 只判断它对某一用途是否有资格进入接受；对 Evaluation Specification 的 Authority acceptance 仍是另一事件。

规划、安装验收、commissioning 与运行可以采用不同的已接受规范。物理性能、个人体验、安全、合规、资源、无障碍、可靠性与覆盖保持不同维度，除非已接受规范明确建立关系。

## 原因

这保护了 LLM 最容易越界的地方：从人的语言翻译成机器可测试标准。Agent 可以帮助家庭阐明和比较含义，但不会静默成为家庭偏好、专业判断或监管权力的来源。
