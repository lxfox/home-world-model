# Work Realization Routing v0.1 一致性情景

本 oracle 测试 [Work Realization Routing Profile](../../../spec/profiles/work-realization-routing/v0.1/README.zh-CN.md)，包含 26 个语义案例与 20 个禁止推断。它分离一个有界 direct Proposal 与必须跨 recurrence、retry、wait、handoff、多 Proposal、progress 和 exit criteria 保持身份的工作。

运行 `node conformance/scenarios/work-realization-routing-v0.1/validate.mjs`。

通过不证明规划质量、工作简单、所有家庭 policy 下都需要 Task，也不授权行动。
