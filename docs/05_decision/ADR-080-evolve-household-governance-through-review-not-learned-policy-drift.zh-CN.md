# ADR-080：通过 review 演化家庭治理，而不是学习式 policy drift

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-080-evolve-household-governance-through-review-not-learned-policy-drift.md`](ADR-080-evolve-household-governance-through-review-not-learned-policy-drift.md)

## 背景

ADR-079 为家庭提供稳定 Charter projection，但家庭会演化：人和宠物加入或离开、年龄增长、照护与租住改变、空间产生新用途、安装变化、incident 发生，外部要求也会变化。Agent 还会观察到偏离当前规则的行为。把这些 signal 当成自动 policy learning 会静默改写治理；冻结所有规则又会让模型陈旧。

Change Impact Revalidation、可复用 rule lifecycle、learning routing 与 Authority transition 已提供 append-only 中间路径。

## 决定

1. 家庭演化证据与 policy drift signal 只作为 review 输入，永不直接成为 governance transition。
2. 使用：已接纳证据 → 类型化不可变 Change Set → 声明依赖 impact／Revalidation → candidate revision 或 no-change finding → 所需 review／participation → 内容绑定 Authority transition → 新 Charter projection。
3. world、knowledge-correction、design、governance 与 evidence-availability change 保持分离，包括 effective、observation 和 record time。
4. 重复、推断 habit、未反对、模型置信度、drift score 和重复 exception／override 只能提议 review，不能激活、扩张、暂停、retire 或替换 rule。
5. 新成员触发有界 population、privacy、impact 与 participation revalidation；不授予继承 access、representation、preference、delegation 或 consent。成员离开时分别评估当前 access、retention 与历史 Record。
6. 年龄／时间流逝、caregiver／adult／child 标签或行为推断不决定 capacity、guardianship 或 representation；使用精确 Authority 与适用的外部法律／专业程序。
7. 房产出售、租住、死亡、incapacity 和 succession 不自动转移家庭历史、credential、Trust Root 或 Authority lineage；需要外部 transfer／succession 程序和新 admission decision。
8. 空间、设备、incident 与外部要求变化只重新打开声明依赖 artifact；完整 no-path closure 可证明范围内 unaffected，闭包不完整为 indeterminate。
9. review result 是 advisory，除非精确 preaccepted protective trigger 已授权有界 pause；pause 保留历史且不选择 replacement。
10. 每个实质 policy revision 都需要自己的 Authority transition；household／subject／purpose／domain identity-basis change 可能要求新 rule 或 Authority lineage，而非 revision。
11. transition 前瞻且 append-only；旧 View、use、decision 与 Charter Snapshot 在原始绑定下继续可解释。
12. drift review 不授权新 monitoring；额外 evidence acquisition 遵守 least-impact sufficiency、privacy、affected-subject procedure 与 Authority。
13. Agent 更换后从耐久 Change Set、review、candidate 与 transition 恢复，而不是私有 drift model 或 memory。

## 后果

- 家庭可以成长并修改治理，而不让 adaptive system 成为静默立法者。
- 意外行为成为 review 问题，而不是 preference 或 capacity 诊断。
- 生命阶段和居住变化可被表达，同时不把通用家庭或法律假设写入 Core。
- 30个可执行案例覆盖行为 signal、membership、年龄／照护、空间／设备／incident、房产／租住／succession、review state、closure、monitoring 与 Agent replacement。
