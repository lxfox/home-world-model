# Action Attempt v0.1 oracle

本 oracle 测试 [Action Attempt Profile](../../../spec/profiles/action-attempt/v0.1/README.zh-CN.md)，包含 32 个语义案例与 34 个禁止推断。它分离 Attempt、Transmission、Acknowledgement、Observation 与 Effect Assessment，并在无端点去重的投递歧义下失败关闭。

运行 `node conformance/scenarios/action-attempt-v0.1/validate.mjs`。
