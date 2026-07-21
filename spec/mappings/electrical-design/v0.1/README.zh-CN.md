# 电气设计边界审计 v0.1

- 状态：映射候选稿
- 版本：0.1.0
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 决策：[`ADR-009`](../../../../docs/05_decision/ADR-009-split-electrical-load-and-capacity.zh-CN.md)
- 可执行用例：[`boundary-cases.json`](boundary-cases.json)

## 结论

`reservedLoad` 被拒绝成为目标 HWM 谓词。夹具中的数值被重新分类为 `planned_load_allocation`，只用于规划上下文中的 Product Model 初筛。

安全模型是一组类型明确的数量 Claim，以及基于具名输入的 Assessment：

| 数量角色 | 含义 | 不得推出 |
| --- | --- | --- |
| `product_nameplate_power` | 产品或 Product Model 声明额定值 | 实际需量或已经安装 |
| `planned_load_allocation` | 分配给声明规划作用域的设计预算 | 回路容量或安装负载 |
| `installed_load` | 按声明规则汇总的已安装设备额定值 | 同时需量或最大需量 |
| `estimated_maximum_demand` | 带时间段、系统层级与假设的需量估计 | 安装负载或供电授权 |
| `design_current` | 正常运行条件下的回路设计输入 | 实测电流或单独证明导体选择安全 |
| `current_carrying_capacity` | 规定条件下的连续载流限制 | 保护器额定值或电流需量 |
| `protective_device_rated_current` | 保护器属性或整定值 | 导体容量或协调成功 |
| `authorized_maximum_demand` | 适用协议下可用的供电容量 | 下游回路足够 |
| `derived_margin` | 基于具名容量与需量／分配输入的评估 | 回路固有、永恒属性 |

## 标准边界

[IEC 60364-1:2025](https://webstore.iec.ch/en/publication/63699) 覆盖低压电气装置基本安全要求和一般特性评估。[IEC 60364-4-43:2023](https://webstore.iec.ch/en/publication/28432) 单独覆盖过电流保护与协调。[IEC 60364-5-52:2009+AMD1:2024](https://webstore.iec.ch/en/publication/1878) 覆盖布线系统选择和安装，包括安装条件与电压降问题。[IEC 60364-6:2016](https://webstore.iec.ch/en/publication/24656) 单独覆盖初始与周期验证。

IEC Electropedia 分别标识[设计电流与载流量](https://www.electropedia.org/iev/iev.nsf/index?openform=&part=826)，也区分[安装负载、网供负荷、最大需量、同时率、分散率与需量因数](https://www.electropedia.org/iev/iev.nsf/index?openform=&part=691)。它们不是同义词。

[IFC 4.3.2.0 IfcDistributionCircuit](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcDistributionCircuit.htm) 提供回路身份，以及 Diversity、带电导体数量、电压范围和最大允许电压降等电气系统属性。官方页面同时注明该实体不属于标准化 schema subset 或 implementation level。IFC 不会把一个 HWM 预留标量变成安全结论。

## 最小断言结构

每个电气量 Claim 必须携带：

- 主体与明确数量角色；
- 数值、单位和数量种类；
- 设计上下文、revision、有效期与认知依据；
- 来源或计算溯源；
- 回路／功能位置／方案作用域；
- 适用时的相别与拓扑；
- 适用时的时间段、工作制、同时使用、功率因数、效率、环境或安装假设；
- 局限与禁止用途。

`derived_margin` 还必须标识两个输入 Claim、选中的限制约束、计算方法和评估状态。如果输入不能在同一拓扑与依据上比较，结果为 `indeterminate`。

## 来源限制

IEC 公开页面足以证明适用范围与术语分离，但没有公开全部规范公式或各国差异。因此本审计定义的是关闭失败的语义边界，不是电气设计计算或合规引擎的替代品。

## 验证

```sh
node spec/mappings/electrical-design/v0.1/validate.mjs
```

