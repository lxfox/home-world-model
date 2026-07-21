# Routine Instantiation 场景 v0.1（中文镜像）

- 状态：Conformance discussion fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范：[`README.md`](README.md)
- Profile：[`../../../spec/profiles/routine-instantiation/v0.1/README.md`](../../../spec/profiles/routine-instantiation/v0.1/README.md)

## 被检验的问题

一个重复或事件驱动机会何时可以为 persistent Intent 创建一个家庭 Task，同时又不把学习到的习惯、schedule tick、原始事件、forecast 或 active automation 当成行动权限？

夹具描述工作日早晨热水 Routine：住户编写的 persistent Intent 先被采纳，独立的精确 Routine 再被激活；JSCalendar recurrence、合格 eligibility assessment、occurrence-key policy、迟到／重叠 policy 和 Task 模板分别绑定；一个时间 occurrence 只物化一个 Task。Task 没有 Plan，Decision 也没有 Proposal 或 Action Authorization。

## 制品

- [`persistent-intent-definition.example.json`](persistent-intent-definition.example.json) 与 [`persistent-intent-state.example.json`](persistent-intent-state.example.json)：已采纳结果承诺；
- [`trigger-spec.example.json`](trigger-spec.example.json)：JSCalendar 形态的 recurrence 输入；
- [`eligibility-spec.example.json`](eligibility-spec.example.json)：夹具本地条件；
- [`occurrence-key-policy.example.json`](occurrence-key-policy.example.json)：时间与事件关联边界；
- [`routine-definition.example.json`](routine-definition.example.json) 与 [`routine-state.example.json`](routine-state.example.json)：受治理实例化 policy 与激活；
- [`instantiation-decision.example.json`](instantiation-decision.example.json)：一个追加式 occurrence 结果；
- [`task-definition.example.json`](task-definition.example.json)：精确物化 Task；
- [`routine-cases.json`](routine-cases.json)：55 个语义案例、18 个模型边界案例和 74 个禁止推断；
- [`validate.mjs`](validate.mjs)：原生 JavaScript oracle 与跨制品摘要验证器。

## 运行

```sh
node conformance/scenarios/routine-instantiation-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

通过只证明该夹具分开了 observed pattern、Intent、Routine activation、trigger evidence、eligibility、occurrence identity、lateness、overlap、materialization、Task 与 Authorization；不证明生产 exactly-once、调度器可用性、规则语言等价性、policy 公平性、安全签名或社区共识。
