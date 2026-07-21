# ADR-060：按作用域路由学习，不做全局自动晋升

- 状态：学习治理候选已接受
- 日期：2026-07-19
- 英文规范：[`ADR-060-route-learning-by-scope-without-global-promotion.md`](ADR-060-route-learning-by-scope-without-global-promotion.md)

## 背景

家庭部署产生 observation、correction、target result、experience、incident 和 restoration evidence，其中一部分可改进本家庭模型，一部分可能启发产品默认实验、总体研究或规范提案。把它们当成一个“学习流水线”，会导出私有数据、把一个家庭推广到所有家庭、把运营指标写成偏好，并静默替换家庭已接受的事实与 Policy。已有 Profile 已治理 contribution admission、reusable value rule、purpose-bound disclosure 与 revalidation，项目治理也负责规范变更。

## 决定

1. 学习是有作用域 candidate routing，不是自动 promotion。四个目的地保持分离：`household_instance_candidate`、`product_default_candidate`、`population_hypothesis` 和 `specification_change_proposal`。
2. 每个 Assessment 绑定精确 source digest、source population／scope、destination proposition、purpose／audience、方法、披露／training authorization、lineage、uncertainty、适用条件、排除项和 `as_of`。
3. 家庭证据只有在 provenance、standing、purpose 与 Authority 允许时，才能为同一家庭形成 candidate contribution；Admission／publication 仍走 Model Contribution Admission，Value Rule／Policy 变化仍需新 revision 与 Authority activation。新证据不改写历史 Claim、Record、Decision 或 rule state。
4. 产品默认只是面向声明 eligible population 的 prospective、可覆盖候选配置，不是家庭事实、偏好、Policy 或授权。它需要 transport／applicability evidence、Policy 要求的 holdout／外部验证、harm／distribution review、rollback 与 monitoring；每个家庭仍在自己的 disclosure／Authority 边界内接收候选。
5. population hypothesis 需要 sampling frame、unit、inclusion／exclusion、denominator／coverage、missingness、dependence／lineage、subgroup／privacy analysis、uncertainty 和 confounder limits。同一家庭、controller、fleet 或相关 lineage 内重复不构成总体支持。
6. specification proposal 需要证明问题涉及 normative semantic／interoperability contract，而不只是实现频率或产品偏好；它绑定受影响文本／artifact、反例、替代方案、兼容影响与证据限制，再进入 Specification Change Governance。经验流行度不自动定义规范语义。
7. 四个目的地不是成熟度阶梯。家庭 candidate 不必成为产品默认，总体结果不必改规范，规范澄清也不必编码产品默认；每次跨目的地都需基于精确 source 新 Assessment。
8. inference disclosure permission 不推出 logging、retention、training、model-weight release 或 onward use permission。Federated／local update、embedding、gradient 和 derived statistic 都是需审查 inference／linkage 的输出。
9. 去标识化、aggregate 或 differential-privacy 声明不自证不可识别、代表性、公平或 destination eligibility。隐私资格与科学／推广资格分轴判断。
10. withdrawal／deletion 只在 Policy 下前瞻生效，不证明从无控制副本或训练权重中移除；派生 artifact 依 lineage 重验证，不删除历史。
11. 新 global／product model 不能改写家庭已接受 World View、rule、Authority、active model artifact 或 Decision。采用必须是显式、版本绑定的本地 transition，并有 rollback 与 outcome monitoring。
12. Routing eligibility 不授予真理、产品部署、规范接受、家庭信任、访问、训练许可或行动权限。

本层不新增家庭 Core 原语或自动 online-learning 通道。

