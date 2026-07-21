# HWM Base Exchange 离线 Registry v0.1

- 状态：Registry Release Candidate
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- Registry：[`offline-registry.json`](offline-registry.json)
- Schema：[`offline-registry.schema.json`](offline-registry.schema.json)

本 registry 让 HWM Base Exchange v0.1 所需的规范文档、JSON Schemas、Profile Descriptors、Conformance Set 与 Composition Assessment 在无网络环境中可解析。

每项把一个绝对 canonical URI 绑定到仓库相对路径、media type、语义 role、字节数和 SHA-256。JSON Schema 的内嵌 `$id` 必须与 registry URI 相同。重复 URI、路径逃逸、摘要／media type／`$id` 不匹配都 fail closed。

URI fragment 不创建新项；先解析无 fragment 资源，再在内容中处理 JSON Pointer／anchor。相对 `$ref` 必须以 Schema `$id` 为基准按 URL 规则解析，不能依赖进程工作目录。

离线解析成功不表示 canonical HTTPS 已部署，也不表示规范采纳、Schema 有效、Agent 语义能力、包内事实、信任或 Authority。
