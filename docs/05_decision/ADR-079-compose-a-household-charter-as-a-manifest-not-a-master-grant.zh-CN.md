# ADR-079：把家庭宪章组合为 manifest，而不是 master grant

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-079-compose-a-household-charter-as-a-manifest-not-a-master-grant.md`](ADR-079-compose-a-household-charter-as-a-manifest-not-a-master-grant.md)

## 背景

ADR-078 让每个 reliance decision 具有意义，但家庭不可能重复裁决所有相似用途。稳定默认值、delegation 和 batch review 可以减少负担；然而单体“家庭宪法”或 accept-all 开关会抹掉模型已经建立的精确主体、用途、程序、到期、例外与安全边界。

既有独立生效 Authority policy、Value Rule、Resolver procedure、disclosure rule、impact procedure、delegation 与 lifecycle state 可以组合成可读 current projection，而无需新增权力来源。

## 决定

1. Household Governance Charter 只是一份不可变、用途／audience 限定、引用精确独立生效制品的 manifest 与 projection；它不是 Authority、consent、ownership、membership 或通用 policy。
2. Charter Snapshot 绑定 household、精确 artifact digest 与 lifecycle head、声明治理 domain、coverage／unresolved registry、`as_of`、known-through time、Authority epoch、derivation、disclosure 和 limitation。
3. Charter 收录既不激活也不扩张 artifact；省略或移除既不撤销也不暂停。每种效果从其自己的 current artifact 与 Authority lineage 求值。
4. 稳定默认值只能是有作用域、已激活、可 review／到期并带精确 applicability／conflict 行为的 policy；产品默认、学习行为和重复选择只是 candidate。
5. 例外是精确 artifact，绑定 base rule、主体／资源／行动／用途、条件、区间、Authority 和 re-entry 行为；相似性不产生继承或 precedent。
6. 例外不能覆盖不可覆盖的本地安全条件，也不能授予其精确范围之外的权力。
7. policy interaction 只通过具名适用 combining／conflict procedure 解析；缺少组合规则或多个 active head 时为 indeterminate／contested，时间戳和文件顺序不建立 precedence。
8. 可以 batch 和 progressive disclosure 提高交互效率，但保留每项内容、所需参与者／程序和独立效果；batch receipt 不是 master consent，部分成功不接受其余项。
9. completeness 只针对声明治理 domain；omitted、withheld、unavailable 与 contested 保持分离，也不暴露隐藏身份或数量。
10. 实质变化只重新打开可由声明依赖到达的 artifact；闭包不完整时为 indeterminate。Authority 变化要求新 current projection 并保留历史。
11. owner、admin、adult、child 或 guest 等通用角色标签不产生万能权力、无能力推断、隐私放弃或安全例外；精确 Authority grant 与 procedure 才治理。
12. Agent 更换或 cache 丢失后从耐久 artifact 重物化 Charter；Agent 私有 policy cache 不是家庭治理。

## 后果

- 家庭可以查看和管理少量稳定治理主题，而不授予通用权限。
- default 减少重复问题，同时保持可检查、可暂停、可到期和逐次适用性判断。
- 例外与 conflict 可解释，不变成隐藏 UI 状态。
- 30个可执行案例检验 manifest／effect 分离、coverage、default、exception、conflict、batching、change、role、offline state 与 Agent replacement。
