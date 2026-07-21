# ADR-078：分层技术保证与家庭依赖选择

- 状态：接受为系统模型边界；不改变 Core 或 Profile
- 日期：2026-07-19
- 英文规范：[`ADR-078-layer-technical-assurance-and-household-reliance-choice.md`](ADR-078-layer-technical-assurance-and-household-reliance-choice.md)

## 背景

ADR-077 把 Resolver procedure 置于家庭治理下，但大多数家庭成员无法审计算法、验证数据集、隐私证明或专业标准。要求技术理解会让治理不可访问；把它缩成厂商摘要和 checkbox 又会让治理成为虚构。让专家决定一切只是转移隐性权力。

既有 Authority、Evidence Standing、disclosure、procedure-fulfilment、deliberation 与内容绑定规则足以支持分层 assurance，无需新增 comprehension 或 consent 原语。

## 决定

1. 分离 technical assurance 与 household reliance choice；reviewer 只建立有作用域 finding，获准家庭主体决定是否在命名用途下依赖精确 procedure。
2. 按预期用途要求语义／conformance、实证适用性、不确定性／abstention、隐私、偏差／伤害、受影响 population、安全及领域／专业 review coverage；缺失轴保持可见。
3. 每份 review 绑定精确 procedure 内容、方法、证据、范围、population、时间、reviewer standing、限制和实质利益冲突；凭证或厂商身份不创造通用 authority 或 independence。
4. 允许有限 technical review delegation；除非另有精确 Authority grant，它不转移家庭依赖决定。
5. 提供绑定精确 procedure 与 review-set digest、适合目标 audience 的 household brief；说明用途、具体后果、受影响数据／人、假阳／假阴／abstention 行为、实质未知与 dissent、替代方案（含不启用）、期限、成本／义务、暂停／退出／rollback 及查看深层证据／提问入口。
6. brief 是派生投影，不是规范 policy 或技术忠实性证明；digest mismatch、实质遗漏或错误简化使其不能用于决定。
7. 送达、打开、滚动、checkbox、沉默、timeout 和继续使用都不建立阅读、理解、acceptance 或 consent。
8. 可选精确问题澄清或 teach-back 可发现错配并触发 repair／defer；它不是心理状态证明、能力测试或强制考试，拒绝不是 incapacity。
9. 内容绑定的家庭决定只在精确范围、时间与限制下接受 reliance；它不认证算法、证据、专业合规、真相或行动安全。
10. procedure／review／后果实质变化要求新 brief 与新决定；仅 accessibility 展示修正可以生成新投影并保留同一精确 policy binding。
11. 有界 emergency suspension 可以比 activation 使用更低负担的保护路径；它阻止新使用并保留历史 receipt。
12. 对治理请求应用 interaction cooldown、batching 与 prioritization policy；重复或疲劳不能制造 acceptance。

## 后果

- 家庭控制以后果为中心，而不依赖算法素养。
- 专家 review 仍有价值，但有边界、可检查且不具主权。
- 界面可使用 progressive disclosure，而不把摘要变成 authority 或把点击变成理解。
- 30个可执行案例检验分层 review、delegation、brief 忠实性／accessibility、interaction evidence、teach-back、change 与 suspension。
