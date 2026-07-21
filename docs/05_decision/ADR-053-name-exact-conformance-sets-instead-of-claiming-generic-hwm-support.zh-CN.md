# ADR-053：声明精确 Conformance Set，而不是笼统宣称支持 HWM

- 状态：Proposed
- 日期：2026-07-19

HWM 具有小 Core 与大量可选 Profiles。决定采用 Profile Composition and Conformance meta-Profile，并把 HWM Base Exchange Set v0.1 限定为精确 Core v0.1、RO-Crate v0.1 与 Authority v0.1。每个用途化 Conformance Set 必须锁定精确版本、已激活依赖闭包、artifact／role、证据等级、offline／unknown-extension policy 和显式降级。

不推断全局 latest 或 semver-range 兼容；包声明、组合闭包、artifact 有效、实现能力、独立证据、信任与 Authority 保持独立。

英文规范：[`ADR-053-name-exact-conformance-sets-instead-of-claiming-generic-hwm-support.md`](ADR-053-name-exact-conformance-sets-instead-of-claiming-generic-hwm-support.md)。
