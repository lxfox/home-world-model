# ADR-063：把状态视为历史绑定的 Assessment 或 Transition

- 状态：已接受
- 日期：2026-07-19
- 英文规范文本：[`ADR-063-treat-state-as-history-bound-assessment-or-transition.md`](ADR-063-treat-state-as-history-bound-assessment-or-transition.md)

## 背景

HWM 使用很多名为 `state`、`status`、`current` 与 `active` 的字段。如果把它们解释成可变真值格，迟到证据和并发写者就可能抹除历史或静默选择赢家。多数既有制品已有时间、证据、revision 或 predecessor 边界；Reusable Value Rule State 声称由 Authority 管理迁移，却缺少 state revision、前态绑定和 `as_of`。Action Trace 有 revision 数字，但没有 Core predecessor 字段。

## 决策

1. 带状态的 HWM 制品是已标识 source artifact 与 occurrence Record 上的不可变 Assessment、View 或 Transition State。可变 index/cache 只是非规范投影。
2. `current` 与 `active` 受精确契约的 `as_of`、用途、证据闭包、Authority Epoch、applicability 与 freshness 限定，不是无时间真值。
3. 相同身份／revision 的不同 canonical content 是完整性冲突。多个 successor 是 contested；没有获接受 policy 时，最大 revision、最新时间、最高 confidence 或 last writer 都不能选择赢家。
4. 在 Core 外加固 Reusable Value Rule State，加入 `state_revision`、`previous_state_binding`、`as_of`、内容绑定的 Authority transition，并要求 `superseded` 绑定 successor。
5. 不扩张 Core Action Trace。其 revision 是不可变 snapshot，内容身份由 package integrity 提供；revision／derivation 可使用既有 W3C PROV／RO-Crate relation。fork detection 属于 conformance／integrity，而非缺失的家庭原语。
6. supersession、withdrawal、revocation 与授权删除通过旧制品、transition Record、tombstone 或 receipt 保留历史可寻址性，也不会反转物理效果。

## 后果

- 状态词汇仍由领域定义，但历史语义保持一致。
- 修复一个 optional Profile gap，而不重开冻结 Core。
- 实现即使覆盖 cache，也必须保留或能够重算规范历史。
