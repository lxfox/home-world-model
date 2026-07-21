# Profile 组合与 Conformance 语义 oracle v0.1

本可执行讨论夹具测试 [Profile 组合与 Conformance Profile](../../../spec/profiles/profile-composition-conformance/v0.1/README.zh-CN.md)，判断精确、用途化 Profile 集合是否闭合且内部兼容，同时保持包声明、schema validity、实现能力、独立证据与 Authority 分离。

```sh
node conformance/scenarios/profile-composition-conformance-v0.1/validate.mjs
```

[`composition-cases.json`](composition-cases.json)包含 36 个 Base Set、依赖、版本、冲突、cycle、artifact、role、离线解析与降级案例。
