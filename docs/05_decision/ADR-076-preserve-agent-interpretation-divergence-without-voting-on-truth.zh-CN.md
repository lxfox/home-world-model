# ADR-076：保留 Agent 解释分歧，而不对真相投票

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-076-preserve-agent-interpretation-divergence-without-voting-on-truth.md`](ADR-076-preserve-agent-interpretation-divergence-without-voting-on-truth.md)

## 背景

ADR-075 允许独立 Agent 重建家庭认识，但它们仍可能输出不同结果。把每个差异都叫作“分歧”并让 Agent 投票，会混淆不同输入披露、用途、时间、Authority 状态、Profile 版本、Resolver policy、实现缺陷、合法裁量和真正 epistemic contest，也会让模型数量或置信度变成家庭真相。

Core World View 已保留 Candidate 与 conflict；Evidence Standing 限定输入；Conformance Set 与 capability negotiation 固定可执行角色；家庭 Authority 和行动程序独立于 epistemic resolution 关闭行动。因此只需要组合规则。

## 决定

1. 比较输出前，内容绑定 household、命题／范围、用途、requester／audience、已披露输入闭包、`as_of`、Authority epoch、Profile／Resolver 版本、程序配置与输出角色。
2. 绑定不同的结果是不同或不可比 Assessment，不是对一个答案的投票。
3. 不同已接受 Resolver policy 形成带 attribution 的 policy-relative result；Agent 不能替家庭选择 policy。
4. 同一确定性契约和精确输入下输出不同，是 conformance／可复现性缺陷，不是 epistemic contest。
5. 合格程序允许裁量或声明 nondeterminism 时，保留各次有 attribution 的运行，并只应用其声明 acceptance rule；retry 不是独立证据。
6. 对一个精确命题，不兼容的合格证据或候选结论保持 `contested`、`unknown` 或其他 Resolver 限定结果，不强制产生单一答案。
7. Agent 数量、模型大小／新旧、置信度、速度、表达和厂商声誉都不提供真相排名或 Evidence Standing。
8. 已接受的精确 Resolver 可以生成用途化 World View 与 receipt，同时保留 candidate、exclusion、conflict 和 reason code；为一份 View 选择不等于全局真相。
9. Authority 可以接受精确不确定性、选择 robust／可逆行动路径，或按 policy 选择行动；这不会解决 epistemic contest。
10. 如果未解决解释会产生实质不同的下游后果，且没有已接受有限行动程序，下一转换为 indeterminate。
11. 任何主动 probe 仍受 least-impact acquisition、家庭 Authority 与本地安全约束；分歧不授予实验权。
12. 不可覆盖的本地安全可以否决全体 Agent 推荐；反之，安全检查不能选择物理真相或家庭偏好。
13. 新证据产生新 Assessment，并保留旧决定与 Authorization 的历史基础。

## 后果

- 多 Agent 可以提供真正的解释多样性，而不变成无治理投票室。
- 家庭有时可以在声明不确定性下安全推进，而不假装知识争议已经消失。
- 确定性互操作缺陷保持可见，不被误报为哲学分歧。
- 30个可执行案例覆盖绑定归一、policy 差异、缺陷、裁量、争议、排名代理、行动关闭、安全与历史保留。
