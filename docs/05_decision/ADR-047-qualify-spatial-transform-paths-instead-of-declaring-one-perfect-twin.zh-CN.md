# ADR-047：限定空间变换路径，不宣称一个完美数字孪生

- 状态：提议
- 日期：2026-07-19

家庭几何来自 BIM、图纸、手机、摄像头、机器人、设备和拓扑模型。没有 frame 语义与不确定性的坐标无法安全合并；强制一个全局 canonical frame 又会隐藏 revision、校准漂移、局部精度、改造和只需要拓扑的用途。

决定交换不可变 Spatial Frame Definition 和带证据的 Spatial Registration，再由 Spatial Use Assessment 沿精确路径传播误差，并与用途容差比较。每个 metric location／pose 绑定 frame revision、轴、单位、尺度、时间、实体、方法和不确定性；Registration 声明方向、变换类型、控制点、适用域、有效期、residual 和误差。

不存在默认全局 frame，也不以最短或最新路径自动胜出。拓扑与 metric assertion 分开；cycle 不一致失败关闭；移动、AR reset、改造和 frame 身份变化都追加新制品，不覆盖历史 pose。

这允许家庭空间模型逐步生长：早期房间拓扑可用于规划，后续校准位置可用于仿真和安装，而不要求不同 Agent 共享一个几何引擎。

英文规范：[`ADR-047-qualify-spatial-transform-paths-instead-of-declaring-one-perfect-twin.md`](ADR-047-qualify-spatial-transform-paths-instead-of-declaring-one-perfect-twin.md)。
