# ADR-046：对齐类型化实体，但不建立全局身份

- 状态：提议
- 日期：2026-07-19

扫描、图纸、Matter fabric、Home Assistant registry、商品目录、commissioning Record 和视觉 track 会以不同标识描述家庭。通用 `sameAs` 或全局设备 ID 会混淆物理资产、功能位置、产品型号、端点、表示、空间和主体，错误合并还会静默传播能力、历史、policy 和影响模型。

决定采用类型、用途和时间绑定的身份评估，结果为同一实体、不同实体、相关但非同一、未解析或完整性冲突。跨类型不能判定同一；替换、实现、暴露端点、型号实例、表示、拓扑和功能可替代都使用显式关系。标识保留 namespace 和时间作用域，证据按共同 origin 去重。

人和宠物不会由 observation track 或本 Profile 的生物识别推断。对齐结果经贡献准入追加，不静默合并索引，不改写历史引用，也不转移属性或权限。

英文规范：[`ADR-046-align-typed-entities-without-a-global-identity.md`](ADR-046-align-typed-entities-without-a-global-identity.md)。
