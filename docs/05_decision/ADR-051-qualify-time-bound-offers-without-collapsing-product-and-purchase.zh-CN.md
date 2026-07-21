# ADR-051：限定时效报价，不混淆产品与购买

- 状态：提议
- 日期：2026-07-19

规划比较 Product Model，购物系统返回区域 variant、商家 listing、动态 offer、bundle 和履约声明。把 listing 直接当成已选产品会隐藏电压／无线／固件差异、附件、订阅、交付风险和总成本，也会把购物／支付权限暴露给规划 Agent。

决定使用不可变 Commercial Offer Snapshot、Procurement Bundle Requirement 和 Procurement Candidate Assessment。Product Model、SKU、listing、offer、cart、order、到货物、asset 和 endpoint 分离；进入 shortlist 前检查精确区域 variant、bundle 闭包、证据、条款、交付和总成本。checkout／payment／fulfilment 仍是独立权限域。

英文规范：[`ADR-051-qualify-time-bound-offers-without-collapsing-product-and-purchase.md`](ADR-051-qualify-time-bound-offers-without-collapsing-product-and-purchase.md)。
