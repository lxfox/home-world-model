# Authority Trust Bootstrap 场景 v0.1

- 状态：Executable Profile Fixture
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`README.md`](README.md)
- Trust Root 示例：[`trust-root.example.json`](trust-root.example.json)
- 用例：[`trust-cases.json`](trust-cases.json)

## 被测试的问题

一个新 Agent 怎样知道应该信任哪份家庭 Authority 材料，同时又不允许 Authority 文档自行认证它列出的信任锚？

答案是本地持久保存的根 lineage。Genesis 要求带外精确固定；轮换要求当前根和新根的不同签名者阈值共同覆盖一个精确、顺序连续的后继；恢复要求当前根预先承诺的独立路径加新根阈值。如果这些连续性路径都不存在，人工重新注册必须创建新 lineage。

## 可执行边界

二十二个转换用例覆盖：

- 精确 genesis pin、缺少 pin 与错误 pin；
- 双向顺序轮换和不同签名者阈值计数；
- 拒绝验证材料别名以及根／恢复故障域复用；
- 前一根完整内容绑定、回滚、跳号、lineage、时间和 Authority Epoch 下限；
- 候选过期与 proof 验证不可取得；
- 预承诺恢复与恢复 quorum 缺失；
- 未预承诺的恢复；
- 两份有效后继根；
- 从已过期当前根更新到当前有效后继。

五个模型边界用例保留阈值密钥泄露、未预承诺恢复、过期、行动授权和法律所有权的上限。两组共 53 个禁止推断，防止技术控制被扩大为真理、安全、行动许可、法律权属或必然可恢复。

## 信任链

```text
带外精确固定 genesis
  → 本地持久 Trust Root N
  → 精确 N+1 signed Body
  → Root N 阈值 + Root N+1 阈值
  → 持久保存 Trust Root N+1
  → 验证不低于其 Epoch floor 的 Authority Profile 文档
```

只有 Root N 已经声明独立恢复方法与阈值时，才存在恢复边。原始 proof 不携带自身验证结果；夹具 proof adapter 提供与候选 signed 摘要绑定的独立验证结果。

## 运行

```sh
node conformance/scenarios/authority-trust-bootstrap-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

Schema 验证见 [Authority Profile](../../../spec/profiles/authority/v0.1/README.zh-CN.md)。
