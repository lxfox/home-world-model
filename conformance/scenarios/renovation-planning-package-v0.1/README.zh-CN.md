# 装修规划知识包 v0.1

- 状态：可执行对抗性夹具
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)

本夹具检验 HWM 内核与 RO-Crate 绑定能否把家庭从装修前设计带向采购，同时不虚构已经安装的事实。

它验证：

1. 导入空间与几何仍是 `planned`，不是 observed；
2. 商品候选是 Schema.org Product Model，不是 Physical Asset 或 Digital Endpoint；
3. `candidateFor` 是带作用域的规划兼容投影，不等于资产—功能实现或安装；
4. 即使预测范围满足家庭要求，模拟影响仍保持 `simulated`；
5. 共享基础设计、方案 A、方案 B 与比较 Claim 分别使用独立显式上下文；
6. 两个互斥方案都通过 `prov:wasDerivedFrom` 显式派生自同一基础设计，而分支内求值不会消费另一分支；
7. 只有显式比较上下文可以消费两个分支的结果，且其推荐仍只是建议；
8. 业主选择是仅影响规划的 Attestation，不等于购买、安装、动作或授权，未选分支仍保留在历史中；
9. 可以用计划负载分配初筛两个商品的声明最大功率，但回路容量、保护、验证与合规仍显式保持不确定；
10. 一个知识包可以同时携带 Claim、Record、BOT JSON-LD、电气方案 JSON、商品目录 JSON-LD、CSV 模拟与 JSON 比较资源；
11. `hasPart`、`conformsTo` 与 `mentions` 顺序没有语义，多位被提及参与者中仍恰好识别一个 Authority 状态；
12. 五种应用制品在 RO-Crate 中保留精确类型，即使迁移期 Manifest 只能把它们的宽泛角色投影为 `other`。

运行：

```sh
node conformance/scenarios/renovation-planning-package-v0.1/validate.mjs
node spec/profiles/ro-crate/v0.1/validate.mjs \
  conformance/scenarios/device-lifecycle-continuity-v0.1 \
  conformance/scenarios/renovation-planning-package-v0.1
python3 conformance/readers/python/reference_reader.py
```

夹具使用合成商品、电气、几何、模拟、比较与选择数据。方案 A 预测 320–380 lux，满足声明的 300 lux 要求；方案 B 预测 245–285 lux，不满足。它证明模型区别和包通用性，不证明建筑规范合规、商品适用性、购买建议、模拟准确性或安装授权。
