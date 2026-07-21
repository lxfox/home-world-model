# ADR-054：按设计 lineage 聚类互操作证据

- 状态：Base Exchange v0.1 证据治理已接受
- 日期：2026-07-19
- 英文规范：[`ADR-054-cluster-interoperability-evidence-by-design-lineage.md`](ADR-054-cluster-interoperability-evidence-by-design-lineage.md)

## 背景

单份提交已经可以被接纳为项目自有、外部协作、独立实现、排除或不确定，但多份 Assessment 怎样共同支持一个命题仍未定义。直接数实现并不可靠：fork、翻译、生成式改写、共享参考代码、同一组织的多个仓库，乃至多个组织沿用同一实质设计，都可能重复同一种失败模式。反过来，组织分离本身也不证明设计独立。

## 决定

1. Evidence Portfolio 只绑定一个精确且不可变的命题：相同 Base Exchange 版本、challenge manifest 摘要、行为范围和审查策略。
2. 输入单位是内容绑定且已接纳的 Assessment，不是提交者自报标签或原始通过数量。
3. 只要共享实质实现祖先、参考输出、生成代码 lineage、项目设计协助或连续派生路径，就属于同一 `design_lineage_cluster`，语言、仓库或组织不同也不能拆开。
4. lineage 未知不等于 lineage 独立；它保持 unresolved，不能满足独立性结论。
5. 组织、runtime、parser stack、运行环境和 reviewer lineage 分轴记录；任何单轴都不能代理其他轴，也不定义加权总分。
6. 项目自有和协作证据可以证明其披露 lineage 内的复现。只有来自分别成立设计 lineage 的已接纳独立 Assessment，才能形成 `independently_reproduced_with_limits`。
7. 对精确命题存在当前技术失败、完整性失败或未解决矛盾时，当前 Portfolio 必须成为 `contested` 或 `indeterminate`；多数通过不能抹除反证。
8. Portfolio 具有 `as_of` 时间，每项输入具有适用状态。旧 challenge、已撤回证据和超过复现窗口的证据保留历史，但不作为当前支持。
9. 聚合只在历史上单调追加；新 revision 可以加强、削弱或争议当前结论，不能改写旧 Assessment。
10. `independently_reproduced_with_limits` 只表示精确命题下结构与保存互操作的经验复现，不表示社区共识、标准采纳、认证、生产安全、市场接受、信任、访问或行动权限。

## 结果

- 十个改名 fork 仍只算一个设计 lineage。
- 两个真正独立的实现可能比许多相关实现提供更强证据，但本模型不虚构采纳阈值。
- 后续治理组织可以另行定义采纳程序；它可以引用经验结果，但不能把经验复现折叠为社会共识。
- 聚合机制属于 challenge 治理，不进入家庭 Core，也不建立家庭领域 Profile。

