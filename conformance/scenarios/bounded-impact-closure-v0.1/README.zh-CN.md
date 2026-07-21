# 受限影响闭包场景 v0.1

- 状态：可执行讨论夹具
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范文本：[`README.md`](README.md)
- 相关 Profile：[`受限影响闭包 Profile v0.1`](../../../spec/profiles/bounded-impact-closure/v0.1/README.zh-CN.md)

## 问题

对于一次主卧共享温度调整，实现能否证明家庭策略要求的所有影响通道都已评估，同时不声称所有潜在受影响实体或参与权都已知？

## 夹具

基线策略要求四个局部通道：由热影响过程产生的 `physical_exposure`、由隐私过程产生的 `privacy_data`、由资源依赖过程产生的 `shared_resource`，以及由 Authority 感知过程产生的 `control_interest`。

报告包含居民、宠物、不透明远程隐私主体、共享电路，以及同一居民在不同通道的两个独立影响。它们用于检验数据形状；通道名不是 HWM 通用词汇。

## Oracle 覆盖

[`impact-cases.json`](impact-cases.json)包含 20 个覆盖用例和 5 个模型边界用例，检查声明覆盖完整、通道缺失和不可取得、报告不完整、精确 Proposal revision、新鲜度、过程、决策时间、时间范围、重复报告、策略歧义、Authority Epoch、未声明通道、空完整通道、标识冲突、在场、宠物、未来角色和不透明句柄。

每个用例都有 `must_not_infer` 守卫，尤其保证：声明通道完整不等于全局完整；空的完整物理通道不等于无人受影响；影响不产生参与资格；在场既非必要也非充分；宠物影响不建立确认能力或监护关系；不透明句柄不披露身份或在场。

## 外部投影

[`impact.external.jsonld`](impact.external.jsonld)通过 SOSA/SSN、PROV-O、BOT、DPV、Schema.org 与 DCMI 投影可复用语义，不包含 HWM 影响谓词。HWM Profile 只保留这些词汇未规定的闭包行为。

## 运行

```sh
node conformance/scenarios/bounded-impact-closure-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

通过只表示夹具兼容，不证明外部过程正确、全局影响完整、法律有效、实现独立或社区共识。

