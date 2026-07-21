# ADR-069：重新验证关系 Assessment，但不使历史失效

- 状态：作为非规范系统探索接受；排除在有界 Core candidate 之外
- 日期：2026-07-19
- 修订：ADR-068
- 英文规范文本：[`ADR-069-revalidate-relation-assessments-without-invalidating-history.md`](ADR-069-revalidate-relation-assessments-without-invalidating-history.md)

## 背景

Claim Use Relation Assessment 不可变并绑定精确 use，但家庭会变化：空间装修、房间拆分、Claim 纠正、证据撤回、策略变化和新观测都可能发生。可变 `current` flag 会抹掉历史决策基础；固定 TTL 会在没有证据时使稳定关系失效，又让已变化关系活到 timeout；每个 Record 后重算所有 Assessment 则造成无界 cascade。

既有 Change Impact Revalidation Profile 已经分离 change class、typed dependency closure、current-use status 与历史解释。proposal 应组合它，而不是另造 invalidation protocol。

## 决策

1. 为 proposal-local Claim Use Relation Assessment 候选增加类型化、内容绑定的 dependency bindings 和 dependency-closure status。
2. 历史解释、当前可用性和新的 relation evaluation 保持为三个不同制品／问题。
3. 每份旧 Assessment 对其精确输入与 `as_of` 永久保留。后续变化永不编辑它，也不让历史结果追溯性变假。
4. 通过新的逐 artifact Revalidation Assessment 判断复用；它绑定 Change Set、dependency snapshot、purpose 与后续 `as_of`。
5. complete declared closure 下没有适用 dependency path 可以支持 `current_reusable`；partial／indeterminate closure 下没有已知 path 不能证明复用。
6. 相关 Claim body、selector-relation identity、topology 或 dependency-validity 变化要求新的 Claim Use Relation Assessment；旧制品保留为历史。
7. evidence withdrawal 或当前 access denial 让旧结果不能用于当前 use，但不 refute 先前评价的物理／语义关系。
8. 新的支持或冲突证据要求 review 或新 Assessment；最新证据不自动获胜。
9. future-effective change 在生效前不影响复用；生效后，相关 dependency 要求重新求值。
10. 仅 wall-clock 经过不使 Assessment 失效；只有绑定的有效性语义或 admitted change 才产生影响。
11. 只有 Authority 变化时，描述性 relation 可以保持可复用，但当前 access／action permission 分别重评。relation reuse 永不提供当前 Authority。

## 后果

- currentness 成为 evidence-backed view，而不是 knowledge 的可变属性。
- change propagation 仅沿声明的 typed dependency 有界传播。
- 稳定家庭结构避免无意义重算，不完整 monitoring 则 fail closed。
- cache entry 可以替换，但规范 Assessment 与 Revalidation Assessment 保持 append-only。
- 16个可执行 reuse case 覆盖 renovation、split、correction、evidence／access change、future effect、TTL 与无关 observation。
