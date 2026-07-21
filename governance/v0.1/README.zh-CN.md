# HWM 规范变更治理 v0.1

- 状态：Discussion Candidate
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- 决策：[`ADR-055`](../../docs/05_decision/ADR-055-separate-specification-decision-publication-and-adoption.zh-CN.md)
- Change Proposal Schema：[`change-proposal.schema.json`](change-proposal.schema.json)
- Review Set Schema：[`review-set.schema.json`](review-set.schema.json)
- Decision Record Schema：[`decision-record.schema.json`](decision-record.schema.json)
- Release Record Schema：[`release-record.schema.json`](release-record.schema.json)

本契约让 HWM 项目决策可检查，但不声称技术证据、维护者身份或票数可以制造真理与共识。它治理项目规范和 release，不属于家庭世界模型。

五类记录必须分开：Change Proposal 固定规范 delta；Review Record 保存带归属立场、理由、冲突披露、证据和异议；Decision Record 绑定 Proposal／Policy 摘要并逐项处置异议；Release Record 绑定接受后的精确发布内容和 gate；Adoption Declaration 由外部 adopter 针对精确 release、范围和日期明确作出。Evidence Portfolio 可以被引用，但不能自动接受 Proposal。

声明的五类记录现在都有机器契约：Change Proposal、Review Set、Decision Record 与 Release Record 在本目录定义；Adoption Declaration 是另行治理的 [`Adoption Evidence Schema`](../adoption/v0.1/adoption-evidence.schema.json) 中的 `adoption_declaration` kind。Schema 保持分离，因此一类记录不能仅靠增加字段就取得下一类记录的效果。

checked-in 的合成链按精确 SHA-256 逐段绑定 [`example-proposal.json`](example-proposal.json) → [`example-reviews.json`](example-reviews.json) → [`example-decision-record.json`](example-decision-record.json) → [`example-release-record.json`](example-release-record.json) → [`example-governance-chain-adoption-declaration.json`](example-governance-chain-adoption-declaration.json)。它只演示 record linkage；fixture 中的 actor、URI、signature 与发布回执全部是合成内容。

`proposer`、`editor`、`reviewer`、`decision_steward`、`publisher` 和 `adopter` 都只是程序角色。兼任必须由精确 Policy 允许并披露冲突；角色不自证技术正确、独立 standing、受影响群体代表性、家庭权限或外部采纳。

Review 立场是 `support | object | abstain | no_position`；沉默、缺失和 abstain 都不是支持。冻结 review set 中的每项异议必须恰好得到 `accepted`、`addressed`、`deferred_with_rationale`、`out_of_scope_with_rationale` 或 `unresolved`。Policy 决定哪些 unresolved 类别阻塞 `accept`；多数支持不能覆盖阻塞反例，非阻塞 dissent 也必须保留。

Decision 结论为：

- `accept`：程序闭合，精确内容可以进入独立 release 流程；
- `revise`：需要新 Proposal revision；
- `reject`：精确 Proposal 被有理由拒绝；
- `defer`：证据、参与、时间或依赖不足；
- `procedurally_invalid`：摘要、Policy、冲突披露、required-role coverage 或记录闭包损坏。

Quorum 是程序前提，不是真理阈值。`accept` 不等于发布；发布需要独立 Release Record。发布也不等于采纳；只有外部主体针对精确 release 作出的带归属 Adoption Declaration 才是采纳证据。下载、star、fork、实现、引用、参会和沉默都不是采纳。

有效 Release Record 至少按摘要绑定一份已接受 Decision Record、精确 content manifest、通过的 integrity／licensing／canonical-URI／release 检查、publisher 归因与冲突披露、对 release payload 的已验证签名，以及至少一份绑定相同 manifest 摘要的已观测 HTTPS 发布回执。计划 URL、上传意图、maintainer 身份或单独 signature reference 都不是发布。[`example-release-record.json`](example-release-record.json) 只是合成 Schema fixture，不声称真实 release。

所有记录追加保存。内容、Policy、review set、异议处置或证据变化都产生新 Decision Record；申诉开启新 revision，不改写旧结论或 dissent。

一个有效 Decision 只证明本项目为精确 Proposal 声明的程序已经闭合，不证明技术真理、完整代表性、社区共识、标准采纳、法律正当性、认证、市场接受、家庭信任、访问或行动权限。
