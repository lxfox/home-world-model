# ADR-062：分离 clean-room 与受协调的外部试验

- 状态：已接受
- 日期：2026-07-19
- 英文规范文本：[`ADR-062-separate-clean-room-and-coordinated-external-trials.md`](ADR-062-separate-clean-room-and-coordinated-external-trials.md)

## 背景

冻结的 Base Exchange challenge 已有自包含 implementer kit，但其中包含项目的可执行 validator、mutation 逻辑、参考提交和证据 assessment。把它交给参与者有利于采用和协调复现，却会污染“参与者仅从规范输入独立推导实现”的严格主张。由项目再写第二份实现仍属于同一 lineage。

## 决策

1. 外部实现采用两条显式轨道：Track A 是 clean-room 独立性候选；Track B 是外部但受协调。
2. Track A 只取得完整性锁定的规范英文文本、Schema、Descriptor、离线 Registry、冻结输入包、公开预期行为和许可证；排除项目可执行代码、mutation fixture、参考提交／结果、证据 assessment 和实质性实现指导。
3. Track B 可以使用完整 implementer kit 和项目协助，但其最高证据结论是外部协调证据。
4. 选择轨道不能自证证据地位。关系、接触、源码／构建来源、可复现性和 reviewer standing 仍要分开审查。
5. 实现必须在独立 evaluator 揭示或运行密封 mutation 前冻结不可变源码、依赖锁、环境和说明。修复形成新 revision 和新 run，历史只追加。
6. 对失败分类。只有可复现的规范歧义或规范输入缺失进入 Convergence Gate，而且仍须满足 ADR-061 才有资格审议 Core。
7. 协议就绪不等于外部证据。在真实外部参与者完成证据审查前，当前状态保持 `protocol_ready_no_external_participant_evidence`。
8. 注册只记录注册当时已存在的事实。输入释放、接触、源码冻结、密封运行、失败分类、审查和退出都作为摘要链接的追加事件。一个 Trial Ledger 绑定一个源码 revision；修复创建有关联的后继 ledger。后来披露的禁见接触会降低证据地位，但不会抹除技术历史。

## 后果

- 独立证据更难声称，但也更有意义。
- 仍可协调外部上手，而不把它包装为独立性。
- 密封 evaluator 在源码冻结后检验实现是否由规范契约推导。
- 技术失败可以改进规范，但不会自动扩张 Core。
