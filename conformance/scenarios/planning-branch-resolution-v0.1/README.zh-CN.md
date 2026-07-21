# 规划分支解析 v0.1

- 状态：可执行对抗夹具
- 日期：2026-07-18
- 规范语言：英文
- 英文规范文本：[`README.md`](README.md)

本夹具测试装修规划 Profile 的四种行为，但不定义推荐算法。

## 选择修订

每个已完成的 Schema.org `ChooseAction` 都作为不可变历史事件保留。该动作生成或支持一个选择状态 Claim。后续选择状态 Claim 可以使用 `dcterms:replaces` 覆盖早先状态，供当前解析使用；它不会删除早先 Claim 或动作。

[`selection-revision.external.jsonld`](selection-revision.external.jsonld) 使用 Schema.org、PROV-O 与 DCMI 术语把该外部绑定变成可执行样例，且不含 `hwm-planning:` 谓词。

在请求的 `as_of` 时刻，Resolver 只考虑在该时刻或之前签发的选择 Claim。一个未被替代的头部表示当前选择已接受；多个未被替代的头部表示冲突；替代环是完整性冲突；替代目标缺失时结果不确定，不得静默接受。

夹具故意把家庭选择从方案 A 改成方案 B，即便包中的建议比较推荐 A，而且 B 未通过模拟需求。这证明推荐、需求求值和家庭选择是彼此独立的断言。任一选择都不推出购买、授权、安装或派发。

## 推荐准入

Profile 不判断哪个方案最好。外部比较器提供 `proposed_recommendation_id`；本 oracle 只判断该输出能否被接纳。

只有同时满足以下条件，比较才处于 `ready`：

1. `context_kind` 为 `comparison`；
2. `input_context_ids` 是无重复的封闭集合；
3. 每个已声明输入恰有一个解析结果，且不存在未声明输入；
4. 每个输入都是 `available`、`accepted`、`current`、时间上为 `in_effect` 或 `unbounded`，并且 `applicable`。

输入缺失、不可用、过期、存在争议、超出有效期或适用性冲突时，结果为 `indeterminate` 且不产生推荐。格式错误或在非比较上下文中跨分支使用输入时，结果为 `invalid_context`，同样不产生推荐。夹具包含一个有效的三方案比较，证明该规则不依赖固定分支数量。

这些是装修规划 Profile 规则，不是新的 HWM Core 状态。`input_resolutions` 是兼容 World View 解析结果的紧凑准入摘要，不是独立 World View。Oracle 直接复用现有各轴并保持语义正交；尤其是 `unbounded` 可以通过时间准入，不能与 `indeterminate` 混淆。

## 基础依赖闭包

只有恰好存在一条显式 `prov:wasDerivedFrom` 边指向基础设计上下文，Design Option 才符合要求。依赖 oracle 区分：

- `invalid_context`：链接缺失、存在歧义、指向错误类型，或 revision 沿袭结构无效；
- `indeterminate`：链接存在，但基础缺失、源不可用、无权访问、载荷已删除、未被接受或不是当前状态；
- `historical_only`：方案闭包完整，但仍根植于可取得的非当前基础；
- `ready`：方案及其唯一当前基础根都可进入当前推导。

所有候选输出继续作为不可变历史保留在 `package_preserved_output_ids` 中。这是知识包保留断言，绝不是 World View 披露列表。只有精确绑定当前方案 revision 的输出才能进入 `admitted_current_output_ids`；即便如此，具体标识或值能否披露仍由 Authority 决定。

## 修订与共享根

[`base-revision.external.jsonld`](base-revision.external.jsonld) 只使用 PROV-O 术语：基础 r3 是基础 r2 的 `prov:wasRevisionOf`；方案 A r2 既是方案 A r1 的 revision，也是从基础 r3 重新建立的 derivation。新的模拟 Activity 使用重建方案并生成新结果，旧结果不会自动继承。

用于当前推荐时，每个比较分支必须具有 `ready` 依赖闭包，并共享同一个当前基础根。比较根植于不同基础 revision 的分支属于 `invalid_context`；闭包缺失、仅历史或不确定时都不产生推荐。布局备选仍可表达，但必须放在一个显式共享的更高层基础之下。

运行：

```sh
node conformance/scenarios/planning-branch-resolution-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

夹具目前包含 5 个选择用例、11 个状态准入用例、10 个基础依赖用例和 5 个比较沿袭用例。它使用合成标识与结果，证明确定性的边界行为，不证明产品适用性或排序算法。
