# ADR-100：建立双语叙事事实源

- 状态：已接受
- 日期：2026-07-24
- 批准者：ProductOS 所有者，于 2026-07-24 项目对话中批准
- 英文规范文本：[`ADR-100-establish-the-bilingual-narrative-fact-source.md`](ADR-100-establish-the-bilingual-narrative-fact-source.md)

## 背景

公共网站需要英文规范叙事与版本匹配的简体中文镜像。仓库此前只有
`narrative-v0.1.md`，但无后缀文件的正文实际为中文。网站没有自行发明或
重新标记英文来源，而是正确地让内容门禁失败。

双语 Model Thesis 已经控制简明公共解释，但网站长篇叙事仍需要一对明确声明
语言、版本、日期、状态和许可证的事实源。

## 决定

1. 将现有中文叙事正文完整保留为 `narrative-v0.1.zh-CN.md`。
2. 在 `narrative-v0.1.md` 建立新的英文规范候选。
3. 两份文件统一使用 `v0.1`、日期 `2026-07-24`、状态
   `approval_candidate` 与 CC BY 4.0 元数据。
4. 两种语言必须具有相同的六个顶层章节和受控叙事锚点。
5. 精确 Core、Profile 与 Conformance Set 文档继续决定技术含义；长篇叙事
   只承担解释作用。
6. 只有状态为 `approved_public_source` 时才导出和发布这对文件。
7. 把两份文件加入公共白名单，要求网站内容门禁验证该状态，并通过审核 PR 发布。

## 影响

- 网站 `content:check` 可以对公开核心仓通过。
- 网站文案可以作为明确事实源的派生表达接受审核。
- 后续叙事变更必须协调修改双语版本，并通过 Narrative Surface Contract。
- 接受叙事不代表它成为技术规范、已完成标准、互操作证据或采用声明。
