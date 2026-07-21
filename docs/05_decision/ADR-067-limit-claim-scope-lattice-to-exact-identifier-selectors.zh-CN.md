# ADR-067：把 Claim scope 格限制在精确标识符 selector

- 状态：作为候选边界修订接受；Core 澄清尚未接受
- 日期：2026-07-19
- 修订：ADR-066
- 英文规范文本：[`ADR-067-limit-claim-scope-lattice-to-exact-identifier-selectors.md`](ADR-067-limit-claim-scope-lattice-to-exact-identifier-selectors.md)

## 背景

ADR-066 把 Claim scope 描述为 top／finite-set／bottom 代数。对抗复审发现，把所有 constraint 都称为 axis 过宽。Core Claim scope 有两个可选数组，但完整 Claim 还有必填 household 边界与可选有效时间区间；空间层级属于外部拓扑词汇。它们既不共享同一个 carrier set，也不共享同一种比较运算。

## 决策

1. top／finite-set／bottom 格只适用于可选精确标识符 selector：`scope.space_ids` 和 `scope.purposes`。
2. 必填 `scope.household_id` 是精确标识符相等 guard，不是 set selector；不相等即 disjoint。
3. `claim.valid_time` 是区间 predicate，不是 selector member；区间外为 disjoint，必要比较的时间未知则为 indeterminate。
4. 精确 selector membership 不执行传递闭包、包含、别名或 taxonomy 推理。列出楼层不会仅凭 ID 形状或标签包含房间，列出用途也不会自动包含 subpurpose。
5. 独立治理的 relation resolver 可以用已声明拓扑或 taxonomy 证据限定 requested identifier。输出受 purpose、time 与 evidence 约束，不改写 Claim，也不扩张其 canonical selector 字节。
6. 类型化 constraint 用 conjunction 组合：一个已知 disjoint 结果具有吸收性；必要比较未解析则为 indeterminate；只有全部满足才得到 contained。匹配维度永不补偿 mismatch。
7. `contained` 仍只是一种 use relation，不授予 disclosure、evidence standing、applicability、trust 或 action Authority。

## 后果

- 候选不再假装 identity、time 与 topology 都是同一集合代数的实例。
- 空数组修复保持兼容，无 wire structure 变化。
- 层级便利必须有显式 resolver evidence，不能依靠隐藏 wildcard 语义。
- 对外提出的五输入空数组 trial 仍足以检验其 wire 反例；31 个内部案例保护更宽的 evaluation 边界。
- Core 规范澄清仍待治理与独立证据，尚未接受。
