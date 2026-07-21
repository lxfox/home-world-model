# ADR-048：用显式交互模型组合环境影响

- 状态：提议
- 日期：2026-07-19

家庭环境目标通常由多个系统、日光／天气、人员、门窗、控制器、空间路径和共享资源共同决定。直接相加单设备模型会隐含线性、独立、时空兼容、无饱和和无反馈；要求每种组合全部实测又不可扩展。

决定建立精确联合场景，并显式选择 direct joint model、有验证域的 superposition、主效应加交互残差、保守 envelope、scenario ensemble 或 not composable。组件合格不代表组合合格，未知交互绝不等于零。

联合评估检查 baseline closure、空间／时间、控制器、非线性域、共享资源、不确定性依赖、参与者覆盖和联合验证。聚合结果不等于点位／区域／主体结果，联合预测也不分配因果贡献。

这样可在幼稚相加和穷举 commissioning 之间形成可扩展中间层，同时保留外部照明、热工、气流等专业 solver。

英文规范：[`ADR-048-compose-environmental-influences-with-explicit-interaction-models.md`](ADR-048-compose-environmental-influences-with-explicit-interaction-models.md)。
