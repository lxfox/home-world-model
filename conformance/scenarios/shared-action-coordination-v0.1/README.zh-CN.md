# Shared Action Coordination 场景 v0.1

- 状态：Executable Profile Fixture
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Policy：[`coordination-policy.json`](coordination-policy.json)
- 用例：[`coordination-cases.json`](coordination-cases.json)
- 外部投影：[`coordination.external.jsonld`](coordination.external.jsonld)

## 被测试的问题

1. 多条适格证据对一个描述性命题发生冲突时怎么办？
2. 不同人拥有不同的 accepted 偏好时怎么办？
3. 一个影响共享环境的 Action Proposal 在进入最终授权前必须满足什么？

夹具给出三种不同答案：描述性冲突继续是认知 `contested`；个人偏好继续为 accepted 且绑定主体；只有第三个问题使用声明的 coordination policy。

## 可执行边界

二十四个 coordination 用例覆盖：

- `all`、`count` 与无需回答的策略，同时不声明任何一个为通用默认；
- 缺失、过期、未授权、standing 排除、未受影响和错误 revision 的回答；
- 显式拒绝与只参与阈值的拒绝；
- Agent 自我确认、有效作用域委托与错误角色委托；
- 受影响主体闭包不可用、策略缺失与多策略同时适用；
- 保留审计和通知 Duty 的已验证紧急规则；
- 全体协调满足后仍被本地安全拒绝；
- Authority Epoch 漂移。

三个模型边界用例证明：

- 不兼容位置 Claim 不能通过投票解决；
- 住户 A 与住户 B 的偏好可以同时在认知上 accepted；
- Planner 提出的 21 °C 折中只是 Proposal，不是同意、授权或合成家庭偏好。

## 关键输出边界

```text
satisfied coordination
  != action allowed
  != physically safe
  != preferences reconciled
  != outcome accepted
```

夹具输出 `continue_policy_evaluation`，刻意不使用 `allowed`。

外部 JSON-LD 投影使用 PROV-O、ActivityStreams、Schema.org 与 DCMI 承载 Proposal、Question、Accept 事件、委托 provenance、coordination Activity 与生成的 assessment，不引入 HWM coordination 谓词。精确 revision、受影响主体、回答有效期与策略求值行为仍由本 Profile 负责。

## 运行

```sh
node conformance/scenarios/shared-action-coordination-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Schema 验证见 [Profile](../../../spec/profiles/shared-action-coordination/v0.1/README.zh-CN.md)。
