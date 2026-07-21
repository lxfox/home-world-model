# ADR-072：沿影响最小且充分的路径获取家庭证据

- 状态：作为系统模型边界接受；无 Core 或 Profile 变化
- 日期：2026-07-19
- 英文规范文本：[`ADR-072-acquire-household-evidence-by-least-impact-sufficient-path.md`](ADR-072-acquire-household-evidence-by-least-impact-sufficient-path.md)

## 背景

完成 semantic feedback routing 后，Agent 仍需判断一个 indeterminate result 是否值得主动取证。固定的“先问人、再开摄像头、再设备挑战、再实验”升级阶梯是错误的：这些路径回答不同 proposition，并具有不可通约的 privacy、attention、disturbance、safety、affected-subject 与 authorization 边界。统一 expected-information-minus-cost 分数会隐藏 household policy，并允许 uncertainty 自行制造 capture／action power。

既有 Profile 已分别治理不同路径：Interactive Evidence 与 Value Clarification 约束 question；Purpose-Bound Disclosure 与 Authority 约束 capture／evidence use；Action governance 约束 device challenge；Household Commissioning Experiment 约束 deliberate perturbation。模型需要 routing invariant，而不是新的 acquisition primitive。

## 决策

1. 只有一个精确 knowledge gap 对已声明 downstream decision 具有 materiality，且可能证据结果能区分当前 viable branch 时，才考虑离开 `indeterminate`。
2. “改进模型”、curiosity、confidence gain、novelty 或未来便利不是充分 objective。
3. 寻求新证据前，优先复用充分、current 且 authorized 的 evidence。
4. 在当前 eligible 且 sufficient 的路径中，优先已接受政策下相关影响最小的 alternative；不把 privacy、human burden、disturbance、physical risk、resource 与 information value 压成一个 universal scalar。
5. human question 要求精确 proposition／answer binding、respondent competence、attention／delivery permission、cooldown／duplicate 检查与 opt-out；silence 仍不是 evidence。
6. passive sensor access 需要分别取得 capture／access 与 evidence-use authorization；一个 purpose 的 permission 不转移到另一个。
7. camera／microphone capture 需要 purpose、time、space、subject、retention 限定的 authorization，以及 affected-subject／privacy closure；requester consent 不覆盖 bystander。
8. active device challenge 是 Action Proposal，要求 impact closure、Authority、local safety gate、disturbance budget、reversibility／recovery 与精确 observation semantics；information value 永不授予 action。
9. device acknowledgement 保持 attempt-side evidence，不能完成 physical-effect question。
10. commissioning experiment 要求 decision-bound Objective、相对低影响 evidence 的必要性、identifiability、cumulative budget、stop／recovery rule 与逐 trial Proposal／Authorization；eligibility 不授权 execution。
11. adaptive policy 改变 next trial 时需要新的 Proposal 与 Authorization evaluation；不存在 blanket exploration Lease。
12. objection、stop event、safety failure、privacy change 或 cumulative-budget exhaustion 覆盖未来 information gain。
13. explicit user request 仍通过适用 capture／action governance。emergency capture／action 走显式 emergency Authority procedure；本 routing model 不创造 emergency power。
14. 所有 candidate path 都 insufficient、unauthorized、影响过大或 indeterminate 时，保持 knowledge gap 开放，并向下游传播 limitation。

## 后果

- active sensing 成为受治理 decision，而不是 Agent reflex。
- “不知道”成为有效、可互操作结果，而不是为 surveillance／perturbation 辩护的失败。
- human confirmation 只在语义上 competent 的地方使用，不作为 objective measurement 的廉价替代。
- 30个 executable case 组合既有 Profile，不增加 Core field、acquisition artifact 或 optional Profile。
