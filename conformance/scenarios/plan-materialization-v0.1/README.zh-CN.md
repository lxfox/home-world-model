# Plan Materialization v0.1 一致性情景

本 oracle 测试 [Plan Materialization Profile](../../../spec/profiles/plan-materialization/v0.1/README.zh-CN.md)，包含 24 个语义案例与 20 个禁止推断。它分离短暂私有推理、结构化 portable Plan 与自包含 Action Proposal，且不要求披露 chain-of-thought。

运行 `node conformance/scenarios/plan-materialization-v0.1/validate.mjs`。

通过不证明 rationale 忠实、Plan 质量、预测准确、备选穷举或行动获权。
