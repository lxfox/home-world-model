# ADR-099：把公共叙事治理为派生界面

- 状态：已接受
- 日期：2026-07-24
- 英文规范文本：[`ADR-099-govern-public-narrative-as-derived-surfaces.md`](ADR-099-govern-public-narrative-as-derived-surfaces.md)

## 背景

网站与 GitHub README 面向不同读者，但当前在阅读节奏、强调重点和运行状态上出现偏差。把网站逐字复制进 README 会降低仓库可用性；让两者独立演化则会造成叙事漂移。项目还存在一份未配对的历史叙事草稿，不能安全充当双语事实源。

## 决定

1. 精确 Core、Profile 与 Conformance Set 文档继续决定技术含义。
2. 双语 Model Thesis 是公共解释的主事实源，但没有规范权威。
3. 新增机器可读 Narrative Surface Contract，固定网站首页与 GitHub README 必须共享的公共锚点。
4. 网站与 README 是派生界面：共享身份与主张，采用不同阅读结构。
5. 英文与简体中文必须协调变更。
6. 必需锚点、成熟度、生态边界或参与表述发生漂移时，校验失败。
7. `narrative-v0.1.md` 在规范英文与版本匹配中文镜像被明确接受前，只保留为历史草稿。

## 影响

- 读者从任一入口都会认识同一个项目。
- README 保持实现者入口作用，不会退化成网页转录。
- 公共传播不能静默创造技术含义或成熟度。
- 叙事变更开始接受关系感知审核和可执行检查。
