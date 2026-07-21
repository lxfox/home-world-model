# ADR-066：把 Claim scope 轴建模为 top、finite set 或 bottom

- 状态：候选解法修订已接受；Core 澄清尚未接受
- 日期：2026-07-19
- 替代：ADR-065 的 `minItems: 1` 候选解法，不替代 ADR-065 的重开决定
- 英文规范文本：[`ADR-066-model-claim-scope-axes-as-top-finite-set-or-bottom.md`](ADR-066-model-claim-scope-axes-as-top-finite-set-or-bottom.md)

## 背景

ADR-065 因空轴与省略轴没有不同含义而正确重开 Core 审议，但首版解法选择拒绝空数组。最小性复审发现拒绝不是最小兼容修复：它会让此前可 relay 的制品失效、制造迁移，并删除一种有用的 fail-closed 表示。

## 决策

1. 保留 ADR-065 的有界重开，只修订候选解法。
2. 每个可选 set-valued Claim scope axis 定义为：
   - 省略 = top，除其他维度外，该轴不声明限制；
   - 非空 = 精确允许标识符的 finite set；
   - 空 = bottom，合法且可保存，但该轴不包含任何具体用途。
3. constraint 按类型化 intersection 组合：top 是 identity，bottom 是 absorbing。绝不 union scope 制造更宽 applicability。
4. bottom Claim 仍可寻址、relay、审计、refute、retract 或纠正，但不能治理需要该 bottom 轴的 operative use。
5. 不改变 Schema wire structure。若接受，只澄清规范语义和 conformance 行为。
6. issuer 若本意是 top 却编码为 bottom，保留旧 Claim，追加 correction 和省略轴的新 Claim。作者原意不能追溯改变 canonical bytes。
7. 外部候选实现必须保留空数组并评价为 disjoint，不能拒绝或 normalize。

## 后果

- 既有 bytes 保持 valid 并可无损 relay。
- 候选更小，也更符合 HWM 的 open-world、append-only 行为。
- 把空解释为 unrestricted 的 legacy reader 仍不兼容，需要更新／adapter 证据。
- Core 澄清仍未接受；仍需治理与外部证据。
