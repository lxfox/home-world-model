# ADR-009 — 拆分电气负载、容量、分配与验证

- 状态：提议
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`ADR-009-split-electrical-load-and-capacity.md`](ADR-009-split-electrical-load-and-capacity.md)
- 映射证据：[`电气设计边界审计 v0.1`](../../spec/mappings/electrical-design/v0.1/README.zh-CN.md)

## 背景

装修夹具曾使用一个 100 W 的 `reservedLoad`，并检查每个候选 Product Model 声明的最大功率是否低于该值。这对商品目录初筛有用，但术语和断言结构暗示了远超证据范围的结论。

电气设计需要区分安装负载、预期需量、回路设计电流、导体载流量、保护器额定电流、供电限制、电压降和验证。功率换算为电流还依赖系统拓扑，以及电压、相数、功率因数、效率、工作制和同时使用等假设。一个名为“预留负载”的标量会掩盖这些区别，并可能产生错误的安全结论。

## 决定

1. HWM 拒绝把 `reservedLoad` 作为目标 Core 或装修规划谓词。现有 `hwm-planning:reservedLoad` 数据只作为商品初筛兼容投影。
2. 电气设计 Profile 必须给每个电气量 Claim 指定明确角色。初始角色集为：
   - `product_nameplate_power`；
   - `planned_load_allocation`；
   - `installed_load`；
   - `estimated_maximum_demand`；
   - `design_current`；
   - `current_carrying_capacity`；
   - `protective_device_rated_current`；
   - `authorized_maximum_demand`；
   - `derived_margin`。
3. 数量角色是 Profile 管理值，不是 HWM 本体类。回路身份应使用 IFC 或 IEC 81346 参考代号；数量和单位应使用 SAREF／QUDT 或等价的声明绑定。
4. 每个电气量 Claim 必须标识主体、值与单位、设计上下文与 revision、认知依据、来源、有效期以及适用拓扑或作用域。解释该数量所需的假设必须显式给出。
5. `planned_load_allocation` 是分配给功能位置或 Design Option 等声明作用域的设计预算。它不是安装负载、预期需量、回路容量、保护协调、验收结果或送电许可。
6. `derived_margin` 是基于具名输入的 Assessment，不是回路固有属性。它必须标识限制容量依据、需量或分配依据、计算方法、兼容单位与拓扑，以及所有假设。输入缺失或不可比较时产生 `indeterminate`，不得产生数值余量。
7. Product Model 落在计划分配内，只能证明一项商品初筛约束通过。它不得证明回路、导体、保护器、电压降、故障保护或上级供电足够。
8. 除非绑定提供所需电压、相数／拓扑和其他适用因子，不得把有功功率换算为回路电流。三相总值不得当作每相限制。
9. 计划、安装、观测、验证和辖区合规状态必须分开。IEC 60364-6 验证或适用的本地流程需要自己的 Record 与证据；设计声明不能生成验证或合规结果。
10. 合规评估必须引用辖区、规范或标准版本、评估方法、合格发布者、作用域和证据。HWM 不定义通用电气规范结论。
11. 运行需量测量和预测继续作为 Observation 或 Prediction Claim。它们可以校准后续规划，但不能修改原设计依据。
12. 本 Profile 不复述 IEC 保护协调公式和各国差异。宣称符合 IEC 或本地规范的绑定必须固定其合法取得并实现的规范条款。

## 后果

- 商品初筛仍然可执行，但不会与电气安全混淆。
- Agent 可以说明哪个数量或假设阻止结论，而不是返回错误的二元适配结果。
- 新屋设计、后续安装、调试和持续测量可以并存，互不覆盖。
- IFC／IEC 标识和 SAREF／QUDT 数量继续复用；HWM 只增加生命周期与证据约束。
- 本决定后，装修规划映射不再留下临时术语。

## 接受前仍需验证

1. 请合格低压电气设计人员审查十个边界用例和初始数量角色集。
2. 增加一个合法取得规范文本、固定适用条款且不复制受保护正文的 IEC 60364 绑定。
3. 增加至少一个辖区专用合规适配器，并证明其结论不会泄漏到其他辖区。
4. 增加三相不平衡与无功负载用例，并由独立计算复现预期结果。

