# 影响程序映射场景 v0.1

- 状态：可执行讨论夹具
- 版本：0.1.0-fixture
- 日期：2026-07-19
- 规范文本：英文
- 英文规范文本：[`README.md`](README.md)
- 相关 Profile：[`影响程序映射 Profile v0.1`](../../../spec/profiles/impact-procedure-mapping/v0.1/README.zh-CN.md)

## 问题

一份“声明通道完整”的影响评估，能否被转换为混合家庭程序，同时不把所有受影响实体塞进一个投票集合、不披露隐藏身份，也不授权行动？

## 夹具

一次温度 Proposal 产生六个已披露影响：一位居民的实质热影响、宠物的可能热影响、通过不透明主体句柄路由的隐私影响、共享电路可能影响，以及两个控制利益影响，其中一个与第一位居民底层相同。

夹具策略分别把它们映射为肯定回答、经代表路由的咨询机会、异议窗口、专业复核和两项通知。这些只是局部策略示例，不是这些影响种类的通用程序。

输出只包含 Proposal 作用域参与槽位，不包含居民、宠物、隐私主体、代表、凭证、在场、成员关系或投递端点身份。

## Oracle 覆盖

[`mapping-cases.json`](mapping-cases.json)包含 17 个映射用例和 9 个模型边界用例，覆盖混合要求、跨通道不合并、不完整闭包、精确 Proposal revision、Authority Epoch、零条与多条规则、缺失／不可取得／拒绝／重复／过期代表路由、空完整闭包、显式 `none`、action 不匹配，以及义务方向、沉默、通知、复核、不透明槽位和代表边界。

每个用例都有 `must_not_infer` 守卫，禁止推断法律同意、强制回答、沉默同意、通知接受、复核授权、自动监护、槽位身份和行动授权。

## 外部投影

[`mapping.external.jsonld`](mapping.external.jsonld)通过 ODRL、DPV、PROV-O、ActivityStreams、Schema.org 与 DCMI 投影可复用结构。局部 action 标识是资源而非新谓词；投影不包含 HWM 程序谓词。

## 运行

```sh
node conformance/scenarios/impact-procedure-mapping-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

通过只表示夹具兼容，不证明家庭策略公平、法律有效、生产隐私安全、已经正确履行或足以授权。

