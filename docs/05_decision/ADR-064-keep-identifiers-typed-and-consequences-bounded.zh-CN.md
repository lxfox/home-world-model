# ADR-064：保持标识符类型化，并限制 identity 后果

- 状态：已接受
- 日期：2026-07-19
- 英文规范文本：[`ADR-064-keep-identifiers-typed-and-consequences-bounded.md`](ADR-064-keep-identifiers-typed-and-consequences-bounded.md)

## 背景

Entity Identity Alignment 已拒绝 global ID，但初版 Schema 仍允许任意 digest 字符串、字符串 Authority Epoch、任意 intended／allowed consequence，以及 `same_entity` 配合 cross-kind compatibility 等组合。文本禁止属性和 Authority 转移，wire shape 却仍能编码它。

## 决策

1. 标识符相等只是 lookup 事实，不是 identity proof。artifact、entity、lineage、representation、endpoint、subject、occurrence 与 idempotency identity 保持不同语义角色。
2. 用精确 SHA-256 内容绑定、非负整数 Authority Epoch、显式时间／用途和结构化 proof 加固 optional Identity Alignment Schema。
3. 封闭 consequence 词汇。identity evaluation 可以提出 typed relation Claim、为声明用途限定 reference，或触发 dependency revalidation；不能转移属性、历史、ownership、disclosure、trust、Standing、Lease、access 或 Authority。
4. 强制 result 自洽：`same_entity` 要求同 kind、充分证据且无非同一 relation；`related_not_identical` 必须有 relation；distinct／unresolved／conflict result 不携带正 relation。
5. 相同 artifact identity／revision 的不同内容仍是完整性冲突。相同内容的重复投递属于去重，不是独立佐证。
6. 不新增 universal Core identifier 或 entity registry。类型化外部 namespace 与既有 Profile 已足够。

## 后果

- identity exchange 不再能违反 Profile 自己的非转移边界。
- 有范围的标识符仍可使用，但不会变成 global identifier。
- 这只是 optional Profile hardening；冻结 Core 不变。
