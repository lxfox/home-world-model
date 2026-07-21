# Agent 连续性 v0.1 场景

本场景检验家庭任务能否在 Agent 替换后保持连续，同时不转移 Agent 身份、私有推理、源可见性、源 Lease、作者归属、证据适格性或执行权。

场景包含目标专用 Checkpoint、独立 Authority Continuity Decision、目标 PoP Lease、40 个可执行连续性案例和 10 个模型边界案例。四种模式为上下文共享、规划接力、代表行动和排他切换。

运行 `node validate.mjs`；独立 Python 路径为 `python3 ../../readers/python/reference_reader.py`（从本目录执行）。通过只证明语义行为，不证明生产密码学、离线瞬时撤权、分布式互斥或安全密钥保管。
