# 实体资产接入语义 oracle v0.1

本可执行讨论夹具测试[实体资产接入 Profile](../../../spec/profiles/physical-asset-onboarding/v0.1/README.zh-CN.md)，保持交易、履约、收到单元、Physical Asset、安装、功能位置、Digital Endpoint、commissioning 与运行准入边界。

```sh
node conformance/scenarios/physical-asset-onboarding-v0.1/validate.mjs
```

[`onboarding-cases.json`](onboarding-cases.json)包含正向、有限、未知和否定案例；禁止推断阻止支付、送达、扫码、安装报告、网络发现或 commissioning readiness 被提升成端到端事实或权限。
