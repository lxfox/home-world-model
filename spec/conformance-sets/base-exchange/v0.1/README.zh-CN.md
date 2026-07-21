# HWM Base Exchange Set v0.1 发布候选

- 状态：Release Candidate
- Set revision：1
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- 组合 Profile：[`../../../profiles/profile-composition-conformance/v0.1/README.zh-CN.md`](../../../profiles/profile-composition-conformance/v0.1/README.zh-CN.md)

本目录是 HWM Base Exchange Set v0.1 的首个机器可读实例。它锁定精确 Core、RO-Crate 与 Authority 文档，而不是把某个仓库分支或 `latest` URL 当作规范。

三份 Profile Descriptor 绑定规范摘要与离线资源；`conformance-set.json` 绑定用途、版本、artifact、role 与降级；`composition-assessment.json` 保存当前项目自有的组合结果；`validate.mjs` 检查依赖、摘要、资源、role、篡改反例与权限边界。

验证通过只证明 checked-in 发布候选内部闭合且内容绑定，不证明独立实现互操作、密码学发布、Agent capability、家庭信任、包内事实、披露或行动权限。

最低包携带 `AuthorityStateReference`，不强制携带完整 Authority Profile Document。否则会违背用途限定披露；只有具体交换用途需要且另行获准时才交付完整文档。

[Base-only 包夹具](../../../../conformance/scenarios/base-only-package-v0.1/README.zh-CN.md)用空 Claim／Record set、零 application artifact 和零领域 Profile 实例化该契约，并测试未知可选 artifact 的显式 opaque-relay 边界。

[Base Exchange 离线 Registry](../../../registry/base-exchange/v0.1/README.zh-CN.md)对无网络解析所需的 24 项 canonical 文档、Schemas、descriptors、Set 与 Assessment 做内容绑定。离线成功不表示 canonical HTTPS 已部署。

[独立实现挑战](../../../../interop/challenges/base-exchange-v0.1/README.zh-CN.md)将该包与 lifecycle、renovation 包一起冻结，声明可观察输出与拒绝变异，并接受外部归属提交，但不把自报独立性等同于证据 standing。
