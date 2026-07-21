# ADR-082：分离自有 Core 语义、容器、支撑与兼容

- 状态：接受为收敛边界；术语由 ADR-089 澄清，不移除 wire schema
- 日期：2026-07-19
- 英文规范：[`ADR-082-separate-owned-core-semantics-containers-support-and-compatibility.md`](ADR-082-separate-owned-core-semantics-containers-support-and-compatibility.md)

## 背景

Core 保持8个 Schema，但可选 Profile 与组合规则持续增长。按文件计数，或把所有有用边界都放在“Core Invariants”下，会遮蔽真正自有 surface，并削弱可选性主张。

## 决定

1. Claim Envelope、Record、World View 与 Action Trace 是当前可辩护的4个自有语义制品 Schema。Claim Envelope、World View 与 Action Trace 是3个行为契约；Record 是被这些行为引用的可移植语义制品，不是第4个独立行为契约。
2. Claim Set 与 Record Set 作为当前集合容器保留在 Base Exchange v0.1，不增加家庭本体；重审需要版本化 migration。
3. Common Schema 是 reference-closure 支撑，不是独立交换的语义制品。
4. Household Manifest 是兼容删除候选；当前为 migration／round-trip 兼容而保留，不在 Core Profile artifact list 中，也不是不可约自有语义。删除需要后续版本化 Proposal 和 migration／degradation evidence。
5. Authority、RO-Crate 与 Profile Composition 是具名 Conformance Set／Profile dependency，不是自有 Core ontology。
6. 45个 Profile 目录保持可选，除非精确 Conformance Set 纳入。
7. Core 文档规范 wire invariant 为1–17；条目18–35是非 Base Optional Profile Boundary Index，只通过相关 Conformance Set 纳入而规范生效。
8. 最近认知／治理／生命周期 audit 保持非 wire composition guidance；其成功证明不需要新 Core primitive。
9. bounded empty-scope candidate 在接受前保持 Core 外；eligibility 不等于 adoption。
10. 内部 oracle 一致性只是项目证据，不是独立互操作。

## 后果

- 项目在不破坏 v0.1 bytes 的情况下声明更小的自有语义 surface。
- 明确未来删除候选，不再把每个已签入 Schema 当成永久 Core。
- 可选 Profile 边界不再伪装成 Base requirement。
- 实际删除、candidate 接受和 release migration 仍是独立治理行动。
