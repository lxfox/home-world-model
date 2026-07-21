# Home World Model

> Agent 在家庭中负责任地行动之前，必须知道什么？

Home World Model（HWM）是一个早期开源讨论项目，探索如何表达可移植、Agent 可读的家庭知识，使事实、证据、决定、行动与纠正能够跨设备、平台和 Agent 被理解。

- 状态：Discussion Candidate
- Core 版本：0.1.0
- 英文为规范文本
- 英文入口：[`README.md`](README.md)

本仓库是经过筛选的公共投影，只包含理解、实现、测试和讨论 HWM 所需的材料。内部 handoff、产品运营、网站工作、evaluator key、未发布候选和项目内部检查点不会进入公共仓。

## 当前论纲

HWM 不替代 Matter、Home Assistant、KNX、BIM、Brick、SOSA/SSN、Web of Things 或 Agent runtime。它是在既有标准之上的一小组可组合应用 Profile 与 conformance contract。

概念核为：

```text
H = (EntityRef, Claim, Record | Authority)
```

- `EntityRef` 提供稳定引用，但不静默断言身份相同。
- `Claim` 是不可变命题与签发声明。
- `Record` 保存观察、行动、证明、修订或删除。
- `Authority` 治理可见性、解析、授权与行动。
- `World View` 是绑定用途、时间与 Authority 的不可变解析快照。

当前最小 HWM 自有行为表面是 Claim Envelope、World View 与 Action Trace，另以 HWM RO-Crate 1.3 Profile 进行 package exchange。

## 阅读路径

1. [模型论纲](docs/00_context/model-thesis-v0.1.zh-CN.md)
2. [英文 Model Thesis](docs/00_context/model-thesis-v0.1.md)
3. [Core 中文讨论候选](docs/00_context/home-world-model-core-v0.1.zh-CN.md)
4. [术语表](docs/00_context/glossary.md)
5. [领域模型](docs/02_domain-model/README.md)
6. [Core JSON Schema](spec/core/v0.1/schema/)
7. [Conformance 场景](conformance/README.md)
8. [Base Exchange challenge](interop/challenges/base-exchange-v0.1/README.zh-CN.md)
9. [规范治理](governance/v0.1/README.zh-CN.md)

## 参与讨论

- 在 [GitHub Discussions](https://github.com/lxfox/home-world-model/discussions) 提出问题、解释、用例和设计异议。
- Issue 只用于公共制品中可复现的缺陷。
- Discussion、star、fork 或实现本身都不能建立共识或采纳。
- 不得提交家庭数据、凭证、私有 prompt、生物特征材料、秘密或专有遥测。

正式语义反证 intake 尚未开放；普通讨论不得表示成已冻结的 trial submission。

## 仓库边界

[`PUBLIC-MANIFEST.json`](PUBLIC-MANIFEST.json) 列出每个导出文件及摘要。公共投影由内部工作区通过显式 allowlist 生成；一旦出现内部路径或 evaluator-side 材料就会失败关闭。

## 许可证

- 软件、工具、JSON Schema 与参考实现：[Apache License 2.0](LICENSE)。
- 项目原创叙事、规范、翻译、图表与合成 fixture：[CC BY 4.0](LICENSES/CC-BY-4.0.txt)。
- 第三方材料保留原条款；项目名称和 Logo 不随上述许可获得商标授权。
