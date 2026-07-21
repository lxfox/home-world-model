# Task Lineage v0.1 对抗场景

- 状态：讨论夹具
- 日期：2026-07-19
- 英文为规范文本
- 英文规范：[`README.md`](README.md)

该场景检验两个定义是否仍是同一个 Task，以及生命周期 Assessment 是否有语义支持。覆盖计划和 Agent 变化、周期发生实例、修订断档、摘要冲突、拆分、合并、替代、失败 Attempt、错误完成、终态转换、纠错和重开。

主要文件包括 Task Definition 示例、Task State 示例、对抗 oracle 和 JavaScript evaluator；规范和 Schema 位于 [`Task Lineage Profile`](../../../spec/profiles/task-lineage/v0.1/README.zh-CN.md)。

运行：

```sh
node conformance/scenarios/task-lineage-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

预期看到 `TASK LINEAGE OK`。Python reader 使用标准库独立实现同一判定规则，但两条路径仍由同一项目形成，不代表组织独立性。
