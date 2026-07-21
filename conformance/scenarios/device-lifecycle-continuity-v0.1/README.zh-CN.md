# 设备生命周期连续性 v0.1

- 状态：可执行对抗性夹具
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)

本夹具检验家庭意图能否承受日常变化：同一个绑定 IEC 的阅读灯功能位置角色及其照度要求保持不变，而 Physical Asset 与 Digital Endpoint 被替换。JSON 中的 `hwm:FunctionalSlot` 与 `hwm-lifecycle:fulfills` 只作为迁移兼容投影保留。

它验证五个容易混淆的区别：

1. `replaces` 不推出身份相同或等价；
2. 证据新鲜度与 Claim 的时间适用性相互独立；
3. `valid_time` 使用精确 `at`，或半开区间 [`from`, `to`)；
4. 敏感载荷删除后保留经过授权的非敏感墓碑和持久摘要；
5. 物理发生较早但较晚获知的观测生成 Action Trace 修订 2，绝不改写修订 1。

它还携带第一份候选 HWM RO-Crate 绑定。`ro-crate-metadata.json` 必须无损投影为完整的迁移期 `manifest.json`，保留家庭作用域、Authority 状态、Profile 要求、资源完整性和未知扩展值。RO-Crate 关系数组按无序处理。

`claim-id-collision.input.json` 被刻意设计为语义非法：两个 Envelope 在结构上都合法，却用同一个 Claim 标识表示不同的不可变 Claim Body。兼容的知识包读取器必须把它拒绝为完整性冲突。

运行：

```sh
node conformance/scenarios/device-lifecycle-continuity-v0.1/validate.mjs
node conformance/scenarios/device-lifecycle-continuity-v0.1/ro-crate-equivalence.mjs
```

本夹具使用未签名 Record 和合成标识，只证明讨论语义与一条项目内部包投影，不代表生产安全、外部实现独立性、完整 RO-Crate 1.3 验证或已经采用的标准。
