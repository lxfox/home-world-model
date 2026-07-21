# Agent 准入 v0.1 场景

本场景验证“能解析 HWM 的 Agent”与“可以获得用途化 World View 或提出行动的 Agent”之间的边界。

场景包含带能力声明的 Admission Request、由 Authority 分配身份的 Decision、持有证明约束 Lease、32 个可执行握手案例和 7 个模型边界案例。它覆盖 Trust Root 固定、精确 Profile 兼容、证明可用性、nonce 与时间、用户确认、内容摘要绑定、Authority Epoch 方向、精确范围、Lease audience、持有证明以及 Matter 边界。

运行 `node validate.mjs`；独立 Python 路径为 `python3 ../../readers/python/reference_reader.py`（从本目录执行）。通过 fixture 只证明语义行为，不证明生产密码学安全。
