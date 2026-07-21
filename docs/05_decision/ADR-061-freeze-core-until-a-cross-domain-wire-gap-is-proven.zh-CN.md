# ADR-061：冻结 Core，直到跨领域 wire gap 被证明

- 状态：Core v0.1 收敛已接受
- 日期：2026-07-19
- 英文规范：[`ADR-061-freeze-core-until-a-cross-domain-wire-gap-is-proven.md`](ADR-061-freeze-core-until-a-cross-domain-wire-gap-is-proven.md)

## 背景

HWM 已有小型 Core、多个可选领域 Profile、具名 Conformance Set、可执行 semantic oracle 和生态治理组合。最近关于证据、adoption、outcome、response、restoration 与 learning 的问题都通过组合现有 Claim／Record／Authority／Profile 结果闭合。若只因还能提出新问题就继续添加概念，收敛将永远不可能；但无条件冻结也可能掩盖真实 wire interoperability gap。

## 决定

1. 冻结 Core v0.1 owned surface。新概念默认进入 external vocabulary、optional Profile、composition／governance contract、runtime adapter、empirical study 或 implementation concern。
2. Core proposal 只有同时证明以下条件，才有资格进入实质治理：
   - 精确 distinction 无法由 EntityRef、Claim、Record、Authority、现有 Core contract、外部标准或 optional Profile 无损表达；
   - distinction 至少在两个独立 domain class 中重复出现，而不是同一产品 workflow 的两个例子；
   - 留在 optional 层会使两个 conforming Base Exchange 实现对同一 bytes 得到实质不兼容 meaning／preservation；
   - 已明确穷尽 adjacent standard／mapping，并给出 reuse／rejection 理由；
   - 最小 wire semantic、identity、time、provenance、privacy 与 Authority boundary 已定义；
   - positive、negative、unknown、conflict、version 与 round-trip case 可执行；
   - migration 和 backward-compatible degradation 已规定；
   - proposal 没有把 algorithm、policy、宽本体、runtime service 或治理合法性塞入 Core。
3. Proposal eligible 不等于接受。接受还需要内容绑定的规范治理、精确变更行为的外部独立实现证据、相称安全／隐私审查与 release／migration readiness。
4. 能表达但缺 adapter 是 implementation gap；确定规则缺真实有效性是 empirical gap；决策缺代表性／合法性是 governance gap；canonical URI 未部署是 release gap。增加 Core vocabulary 不能修复这些缺口。
5. Optional Profile 只有被具名 Conformance Set 纳入才扩展 Base Exchange，因此 Profile 数量不是 Core 增长。
6. 重复 composition 应先考虑 reusable composition contract／Profile descriptor，而不是 Core。
7. 收敛审计按 revision 保存。未来 candidate 必须指出失败的既有表达路径，并给出本 gate 无法归入其他类别的反例。
8. 当前判断：清单中没有 gap 满足 Core proposal eligibility。Core v0.1 在概念上冻结，但不宣称普遍完整、已采纳、安全、production-ready 或已有独立互操作共识。

后续重点转向外部实现、adapter、field evidence、安全／隐私／用户研究与 release operation；若出现可反驳的跨领域 wire counterexample，Core 仍可改变。

