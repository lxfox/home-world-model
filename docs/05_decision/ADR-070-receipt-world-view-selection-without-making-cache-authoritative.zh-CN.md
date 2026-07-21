# ADR-070：为 World View 选择出具 Receipt，但不让 cache 成为权威

- 状态：作为非规范系统探索接受；排除在有界 Core candidate 之外
- 日期：2026-07-19
- 修订：ADR-069
- 英文规范文本：[`ADR-070-receipt-world-view-selection-without-making-cache-authoritative.md`](ADR-070-receipt-world-view-selection-without-making-cache-authoritative.md)

## 背景

Core World View 已表达 requester、purpose、time、Authority 与 coverage 限定的结果；Purpose-Bound Disclosure 治理 release，Agent Orientation Snapshot 为有限 orientation 组合多份 View。但它们没有提供可移植的逐 candidate lineage，说明哪些 Claim Use Relation 与 Revalidation Assessment 支持了选择。实现否则可能只缓存最终 JSON，并静默把 opaque materialization 变成实际 truth selector。

新增 World View 会重复 Core。列出所有被排除 Claim 会违反 minimization，并泄露隐藏 identity／count。要求虚构的 standalone epistemic-resolution artifact 会产生循环或不存在的依赖，因为 Core resolution 是内联的。

## 决策

1. Core World View 保持最终 projection；只增加 proposal-local `World View Selection Receipt` 候选。
2. Receipt 绑定精确 household、requester、purpose、`as_of`、`known_through`、Authority Epoch、coverage request、source snapshot、construction procedure、disclosure assessment 与最终 World View content。
3. 对每个可见的已考虑 candidate，绑定 Claim body、Claim Use Relation Assessment、Revalidation Assessment、内联 epistemic status、实际 Standing／evidence basis，以及 inclusion／exclusion decision 和 reason codes。
4. 不创建独立 epistemic-resolution primitive；Receipt 解释内联 Core resolution 的构造。
5. 对每个 declared scope handle 报告 coverage 与 unresolved registry state；空选择只有在 complete closure 下才有意义。
6. withheld／unavailable scope 采用 opaque reporting；Receipt 不为解释 exclusion 而列出隐藏 candidate ID、value 或 count。
7. contested candidate 保持 contested，并绑定可见 basis；selection 不解决冲突，也不选 winner。
8. cache hit 只有在 content、requester、purpose、time、Authority、coverage 与 source binding 全部精确时才有效；任一 mismatch 拒绝 cache entry。
9. cache 非规范且可替换；source artifacts、Assessments、Receipt 与结果 World View 构成可复现 lineage。
10. `known_through` 后出现 Change Set 时必须 revalidation 或使用更晚 source snapshot；仅较晚 `generated_at` 不证明 currentness。
11. 在独立实现证明其必要且充分前，Receipt 保留在 proposal 中；暂不加入 Core、optional Profile 或五输入 external wire trial。

## 后果

- 其他 Agent 无需获得私有推理或隐藏 candidate，也能审计已披露 Claim 为什么进入 View。
- empty、withheld、partial、unavailable 与 complete selection 保持不同。
- 实现可以积极 cache，但不赋予 cache 语义权威。
- 16个可执行 case 覆盖 inclusion、exclusion、contest、opacity、coverage、empty result、cache key 与 snapshot 后变化。
