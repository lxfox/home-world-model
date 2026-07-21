# Evidence Standing 场景 v0.1

- 状态：Executable Profile Fixture
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Policy：[`standing-policy.json`](standing-policy.json)
- 用例：[`standing-cases.json`](standing-cases.json)
- 决定示例：[`standing-decision.example.json`](standing-decision.example.json)

## 被测试的问题

谁、或者什么设备，适合为哪一种家庭命题提供证据？

本夹具拒绝一个通用答案。它测试一套上下文化策略，输出是一份独立且内容绑定的 Evidence Standing Decision：绑定完整 Record 摘要、用途、Authority Epoch、决定时间和获准采用的精确断言。它只控制哪些断言能进入 Evidence Resolver；不决定 Record 是否真实或充分，也不授权行动。

## 边界用例

二十一个用例覆盖：

- 住户与获得明确 grant 的访客报告亲眼看到的变化；
- 同一报告不能证明客观照度值；
- 住户可以报告自身偏好，但不能定义另一住户的偏好；
- 家庭 admin 权限不推出电气检查适格性；
- lux sensor 受属性、测量区域、过程与用途约束；
- 设备应答可用于执行追踪，但不能作为物理观测；
- installer 只在位置检查过程内适格；
- electrical reviewer 受凭证类型、可信颁发者、状态、时间、过程和深圳辖区约束；
- 过期、错误辖区与状态不可取得的凭证；
- 证据使用被拒绝以及身份不可取得；
- 过期与超前的 Authority Epoch 视图；
- 封闭世界下拒绝 Agent 自我提权。

每个用例都包含禁止推断。特别是，`admitted` 永远不推出命题真实、来源全局可信、行动获准、目标满足、超出作用域的专业验收或用户接受。

## 结果组合

```text
已认证来源
  + 证据使用授权
  + 匹配的 standing grant
  + 精确 Record 摘要、用途、Epoch、时间与断言范围
  = 内容绑定的 Standing Decision

被当前 Standing Decision 准入的断言
  + 具名 Resolver policy
  = 用途限定 World View 结果
```

第一个等式不保证第二个结果是 `accepted`。原始 Record 不能准入自身，准入一个字段也不准入全部字段。两条互不兼容但均适格的 Record 可以产生 `contested`。

## 运行

```sh
node conformance/scenarios/evidence-standing-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Schema 验证见 [Profile](../../../spec/profiles/evidence-standing/v0.1/README.zh-CN.md)。
