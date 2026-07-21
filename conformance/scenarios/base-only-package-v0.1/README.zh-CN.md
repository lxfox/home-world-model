# HWM Base-only 包夹具 v0.1

本夹具证明 [HWM Base Exchange Set v0.1 发布候选](../../../spec/conformance-sets/base-exchange/v0.1/README.zh-CN.md)可以承载一个不含任何领域 Claim、Record 或 application artifact 的合法家庭范围包。

crate 只有 RO-Crate Root／descriptor、一个空 Claim Envelope set、一个空 Record set、一个家庭范围引用、一个 Authority state 引用，以及精确 Core、RO-Crate 与 Authority Profile 声明。它不包含 Space、设备、人、宠物、几何、Plan、Action、采购、安装、commissioning 或其他可选 Profile 语义。

空集合表示“这个包没有披露 Claim／Record”，不是“家庭没有事实”。未知 artifact 如果没有精确治理 Profile 必须拒绝；有精确 Profile 且显式允许 `opaque_relay` 时，只能逐字节保存，不能输出解释、派生 Claim、validation success 或 Authority 结果。
