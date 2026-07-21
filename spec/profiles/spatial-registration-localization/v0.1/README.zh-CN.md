# HWM 空间注册与定位 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)

## 目的

本 Profile 让 BIM／IFC、户型图、手机 AR、摄像头、机器人地图、设备局部坐标和家庭拓扑之间的位置／姿态可以交换和限定使用，而不要求一个绝对完美的全局数字孪生。

`Spatial Frame Definition` 定义原点、锚点、轴、手性、单位、尺度、维度、时间和来源；`Spatial Registration` 用控制点、实体对齐、变换类型、方向、适用域及误差连接两个 frame；`Spatial Use Assessment` 沿精确路径传播全部不确定性，并与用途容差比较。

## 关键边界

- 坐标必须绑定精确 frame revision、单位、轴、时间、实体、方法和不确定性。
- 数值相同不表示物理位置相同；frame 名称相同也不够。
- rigid、similarity、affine、non-rigid、topological 和 learned transform 语义不同；逆变换不能默认存在。
- 拟合 residual 小不证明控制点身份、尺度或手性正确。
- `inside bedroom`、靠近墙、三维点、bounding volume 和六自由度 pose 不能互换。
- 定位传感器不等于定位被观察的人、宠物或现象。
- 没有默认全局 canonical frame；变换图最短路径或最新路径也不自动最好。
- 多条路径构成的 cycle 不一致时保持不确定，不能静默平均。

用途决定资格：房间级规划可使用拓扑位置，照度仿真可能需要厘米级位置和方向，安装净距可能要求更严格测量。`qualified` 只表示精确时间和误差预算下满足声明用途，不代表绝对正确、合规、安全或授权。

摄像头移动、AR reset、传感器替换、BIM 原点变化、墙体改造和空间 split／merge 都追加新的 frame、registration、Claim 或 Assessment，不覆盖历史位置。
