# ADR-043：组合跨 Agent 工作，但不传播权限

- 状态：提议
- 日期：2026-07-19

## 背景

家庭规划可能分别需要需求、仿真、商品检索、集成和控制 Agent。“sub-agent delegation”会混淆数据依赖、语义能力、家庭披露、责任和行动权限，也容易让完整上下文被过度分享，让工作者自报完成冒充结果验收。

## 决定

采用可选的工作组合 Profile：计划定义类型化 DAG 和逐槽最小披露；分派分别绑定能力资格、准入、披露、actor、责任主体、精确输入和必要权限；评估分离提交、验证、依赖释放和集成。

计算分包、中介、不透明转发和委托行动保持不同。依赖边不传播身份、信任、Lease、权限或责任。设备工作只产生受治理的 Proposal 候选，不直接 dispatch；不交换私有 chain-of-thought。

## 理由与后果

这样可以形成可替换的开放专长 Agent 生态，同时让安全与认知边界保持本地可检查。代价是增加显式制品和 validator，但最小披露、责任、失败、重试、重新分派和取消都变得可审计，且不会把 slot 成功误报为 Task／Intent／物理结果或权限。

英文规范：[`ADR-043-compose-cross-agent-work-without-propagating-authority.md`](ADR-043-compose-cross-agent-work-without-propagating-authority.md)。
