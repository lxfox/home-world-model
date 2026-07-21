# 认知准入与纠错 v0.1

- 状态：可执行对抗夹具
- 日期：2026-07-19
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)
- 用例：[`admission-cases.json`](admission-cases.json)
- 单 Candidate 争议 View：[`world-view.single-candidate-contested.json`](world-view.single-candidate-contested.json)
- 外部交互投影：[`interaction.external.jsonld`](interaction.external.jsonld)
- Profile 局部交互绑定：[`interaction-binding.json`](interaction-binding.json)

本夹具测试家庭模型如何成为可依赖的 World View 接纳断言，以及后续拒绝或纠正如何改变当前 View，而不修改 Claim 或删除历史。

## 核心问题

对话中的“把模型提升为事实”被表达为：

```text
不可变 Claim
  + 已授权、作用域明确、带溯源的证据
  + 具名 Resolver 策略
  + 用途、时间、新鲜度与 Authority epoch
  = 一份新的、epistemic_status 为 accepted 的 World View 解析
```

Claim 自身不会获得全局真值标志。不同用途、后续证据或不同 Authority 状态完全可能产生另一份合法 View 结果。

## 十五条边界

Oracle 验证：

1. 导入或推断模型是 `not_verified`，不是物理事实；
2. 家庭策略要求确认时，只有视觉观测仍不充分；
3. 独立视觉证据加精确家庭确认可以接纳作用域内的空间 Claim；
4. 视觉支持加用户反驳会形成“一条 Candidate 加一条反驳 Record”的 `contested`；
5. 否定回答本身不创建否定 Claim 或正确替代；
6. 设备应答本身不证明物理效果；
7. 完整动作挑战加精确 Attestation 可以接纳狭窄的端点—区域关联；
8. 没有绑定目标命题时，“是的，我看到了”被忽略；
9. 不同挑战 episode 的证据不能拼接；
10. 房间级确认不能提升精确位姿 Claim；
11. 同一帧派生的两份报告只算一个证据来源；
12. 合格纠正会改变当前 Candidate，同时在历史中保留两条 Claim；
13. 不合格纠正不能隐藏先前已经合格的 Claim；
14. 两个合格但未互相替代的位置保持争议，不由 Resolver 随意选胜者；
15. 未授权 Attestation 不能改变 View。

这些用例还保留 26 条显式禁止推断，包括全局真值、虚构否定、从应答推断物理效果、从可见变化推断精确位姿、虚假证据独立性和删除纠错历史。

## Schema 修正

本夹具揭示了一处有界 Core Schema 错误：一条 Claim 可以同时拥有视觉支持与家庭反驳 Record，却不存在替代 Claim。若每个 `contested` 都强制要求两条 Candidate，实现就必须虚构无人声明的否定或位置。

因此 Core v0.1 允许争议解析只有一条 Candidate；其 conflict 项可以标识一条 Claim 与一条或多条冲突 Evidence Record。多个不兼容 Candidate Claim 仍然合法，并由另一用例覆盖。

## 本夹具没有证明什么

夹具中的基线策略是合成策略。它证明确定性的证据边界，不是通用置信函数、家庭治理规则、摄像质量标准、生物识别系统或因果推断方法。`accepted` 仍表示用途限定的可依赖性，不是形而上的真理。

运行：

```sh
node conformance/scenarios/epistemic-admission-and-correction-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

JavaScript 与 Python 通过不同代码路径复现相同 15 个结果；仍需外部独立实现。
