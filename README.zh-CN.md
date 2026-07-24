# Home World Model

> 从连接设备到理解家庭

**一个真正理解家庭的 Agent，需要认识什么？**

Home World Model（HWM）是一项开放提议，希望建立由家庭控制、可移植，
并能被不同获授权 Agent 读取、质疑、纠正和使用的家庭知识，同时不让 Agent
静默获得对家庭的权力。

这是一项早期公开讨论，不是已完成标准或产品。

- [访问网站](https://iot-agent.paubeebar.com)
- [网站源码](https://github.com/lxfox/home-world-model-website)
- [English](README.md)
- [参与讨论](https://github.com/lxfox/home-world-model/discussions)

## 连接设备，不等于理解家庭

灯具报告 `on`，不代表阅读面足够明亮；检测到移动，不代表已经确认家庭成员、
访客或宠物；定时器触发，不代表今天的生活节律仍然适用；Agent 能调用设备，
也不代表它知道真实物理效果是否发生。

缺失的不是另一套设备协议，而是一份贯穿设计、施工、调试、日常生活、替换和
迁移，并且可问责、可修正的具体家庭认识。

## 家庭世界可能包含什么？

- **空间**——房间、门窗、家具、功能区域、距离、方向、遮挡与坐标关系。
- **设备与物理影响**——设备安装在哪里，以及光、热、空气、声音、能源或信号
  怎样改变环境。
- **人、宠物、访客与权限**——角色、状态、偏好、隐私和行动边界。
- **时间与生活节律**——时刻、生活阶段、习惯、例外、预测和即将发生的事情。
- **认识层级**——让观察、识别、事实、推断和预测保持清楚区别。
- **生命周期**——设计意图、施工结果、调试、运行、变化、维修与纠正。

## 我们坚持

- 家庭模型属于家庭。
- 家庭应比设备、平台和 AI 模型存在得更久。
- 事实、推断和预测必须保持区别。
- 主动服务需要权限、解释、验证和撤销能力。
- 隐私是基础结构，不是后加的设置。

HWM 不取代 Matter、KNX 或 Home Assistant。它应复用并映射 Matter、
Home Assistant、BIM、IFC、Brick、SOSA／SSN、W3C Web of Things、PROV-O
等既有工作，而不是重新创造它们。

## 技术桥梁

当前概念核为：

```text
H = (EntityRef, Claim, Record | Authority)
```

- `EntityRef` 是稳定句柄，不证明身份相同。
- `Claim` 是带归属、作用域、时间与认知依据的不可变命题。
- `Record` 描述观察、行动、证明、修订或删除，不是物理事件本身。
- `Authority` 治理可见性、证据使用、解析与行动，不能由 Agent 自行创建。
- `World View` 为一个 requester、purpose 与时间解析获授权知识。

Claim Envelope、World View 与 Action Trace 保留“主张了什么、使用了什么证据、
授权了什么、尝试了什么、后来发生了什么”之间的可观察边界；RO-Crate 提供
package binding。

## 阅读路径

1. [模型论纲](docs/00_context/model-thesis-v0.1.zh-CN.md)
2. [Core 中文讨论候选](docs/00_context/home-world-model-core-v0.1.zh-CN.md)
3. [叙事关系治理](docs/00_context/narrative-governance-v0.1.md)
4. [术语表](docs/00_context/glossary.md)
5. [领域模型](docs/02_domain-model/README.md)
6. [Core JSON Schema](spec/core/v0.1/schema/)
7. [Conformance 场景](conformance/README.md)
8. [规范治理](governance/v0.1/README.zh-CN.md)

## 参与

你不需要会写代码。可以贡献家庭案例、专业约束、标准映射、实现、反例，或者
指出这项提议为什么不对。**反对意见也是有价值的证据。**

- 在 [GitHub Discussions](https://github.com/lxfox/home-world-model/discussions)
  提出问题、解释、用例和设计异议。
- Issue 用于公共制品中可复现的缺陷。
- 不得提交家庭数据、凭证、私有 prompt、生物特征材料、秘密或专有遥测。
- Discussion、star、fork 或实现不代表共识、生产就绪或采用。

## 仓库与叙事边界

本仓库是经过筛选的公共投影。内部 handoff、产品运营、evaluator 材料、未发布
候选与项目内部检查点不会进入公共仓。

[`PUBLIC-MANIFEST.json`](PUBLIC-MANIFEST.json) 绑定每个导出文件与摘要；
[Narrative Surface Contract](docs/00_context/narrative-surface-contract-v0.1.json)
绑定 README 与网站必须共享的主张。叙事文档负责解释项目；精确 Core、Profile
与 Conformance Set 文档决定技术含义。

## 许可证

- 软件、工具、JSON Schema 与参考实现：[Apache License 2.0](LICENSE)。
- 项目原创叙事、规范、翻译、图表与合成 fixture：
  [CC BY 4.0](LICENSES/CC-BY-4.0.txt)。
- 第三方材料保留原条款；项目名称和 Logo 不随上述许可获得商标授权。
