# HWM 学习 Promotion 治理 v0.1

- 状态：Discussion Candidate
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)
- 决策：[`ADR-060`](../../../docs/05_decision/ADR-060-route-learning-by-scope-without-global-promotion.zh-CN.md)
- Routing Assessment Schema：[`learning-routing-assessment.schema.json`](learning-routing-assessment.schema.json)

本契约判断精确部署证据最多支持哪种 candidate scope，但不自动改变家庭、产品、总体 Claim 或规范。它组合 Model Contribution Admission、Reusable Value Rule、Purpose-Bound Disclosure、Change Impact Revalidation、deployment outcome governance 与 Specification Change Governance，不是模型训练协议。

四个目的地是兄弟关系而非阶梯：

- `household_instance_candidate`：同一家庭／用途的带归属 candidate contribution；routing 不发布、不接纳为事实、不激活 Rule、不改变 Authority，也不部署模型。
- `product_default_candidate`：面向精确 product／version 和 eligible population 的 prospective、可覆盖默认；要求 applicability／transport、lineage、Policy 指定的独立／holdout validation、target／adverse outcome、distribution、privacy、rollback 与 monitoring，且不能覆盖本地 accepted state。
- `population_hypothesis`：面向声明总体的可检验命题；要求 sampling frame、unit、inclusion／exclusion、denominator／coverage、missingness、household／controller／product／lineage dependence、subgroup／privacy、uncertainty 和 confounder limits。没有分母的 dashboard／fleet telemetry 不是总体支持。
- `specification_change_proposal`：绑定精确 normative text／artifact、可复现反例／歧义、alternative、compatibility impact 与 evidence limit，再进入 [Specification Change Governance](../../v0.1/README.zh-CN.md)。频率、供应商偏好、单一实现限制和流行 workaround 都不自动定义规范语义。

证据可以分别针对多个目的地接受新 Assessment，但不能从较早结果静默 promotion。

Assessment 分开记录 source use、跨边界、logging、retention、training、weight／update release 与 onward disclosure permission。家庭 inference permission 不推出其他权限；local／federated gradient、embedding、statistic、prompt、label 与 model delta 都是可能泄露 membership／属性的 derived output，需要用途化披露审查。

Aggregate、pseudonymization、de-identification 和 differential privacy 只是带参数／残余风险的方法，不自动产生 eligibility。Scientific transport、privacy qualification、fairness／distribution 与 Authority 相互独立。

Product／global model revision 只有经过显式本地过程，绑定 artifact／version、purpose、semantic capability、evidence policy、privacy impact、rollback、monitoring 与 Authority Decision 后，才能在家庭 active；旧 artifact 和历史 World View 保持可寻址。Withdrawal／deletion 只按 Policy 禁止前瞻使用，不证明从无控制副本或训练权重中擦除；lineage 用于重验证、quarantine、retire 或 replacement。

Routing result 是 `household_candidate_eligible`、`product_experiment_candidate_eligible`、`population_study_candidate_eligible`、`specification_proposal_candidate_eligible`、`disclosure_required`、`validation_required`、`not_eligible`、`quarantined` 或 `indeterminate`。Eligible 只允许候选进入目的地自己的治理。

本契约不建立真理、代表性、因果、公平、训练许可、产品部署、规范接受、本地 adoption、家庭信任、访问或行动权限。

