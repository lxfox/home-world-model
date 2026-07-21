# HWM 采购报价资格 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)

本 Profile 判断一个地区和时间绑定的商业 Offer 是否可以进入家庭方案采购 shortlist，同时分离 Product Model、区域 Variant／SKU、商家 Listing、Offer、订单、到货物品、Physical Asset 和 Digital Endpoint。

报价快照绑定商家、平台记录、精确 variant、成色、数量、包含物、价格／币种、税、运费、关税、优惠条件、库存语义、配送区域、交期、不确定性、保修、退货、服务、观测时间和到期。`in_stock` 只是商家在某时刻的声明，不表示预留、真实性、送达或未来库存；显示价格也不是落地总成本。

Bundle Requirement 还包括数量、hub／bridge、mount、trim、电源、线缆、订阅、云依赖、工具／服务、备件、认证、协议版本、commissioning、交付期限和退换 contingency。协议 logo 不证明精确 capability，候选商品也不证明电路容量、合规或可安装。

购物 CLI 可作为专长 work slot，只获得最小查询；其登录、地址、历史、购物车、支付工具和下单权不得转移给规划 Agent。搜索、加购、预留、BuyAction、付款、商家接受、发货、收货、所有权、安装和 commissioning 都是不同事件。

在另行授权取得设备之后，[Physical Asset Onboarding Profile](../../physical-asset-onboarding/v0.1/README.zh-CN.md)可以把履约与单元证据接到候选 Physical Asset、安装关系、功能位置实现和端点关联；采购资格本身不提供这些事实。

结果只可能进入 shortlist／choice。报价变化生成新 Snapshot；商家替代品必须重新做身份、预测、兼容、bundle 和取舍评估，不能静默继承选择。
