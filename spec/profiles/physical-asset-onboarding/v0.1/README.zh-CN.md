# HWM 实体资产接入 Profile v0.1

- 状态：Profile Discussion Candidate
- 版本：0.1.0
- 日期：2026-07-19
- 规范文本：[英文版](README.md)
- Schemas：[`acquisition-event-record.schema.json`](acquisition-event-record.schema.json)、[`asset-onboarding-bundle.schema.json`](asset-onboarding-bundle.schema.json)、[`asset-onboarding-assessment.schema.json`](asset-onboarding-assessment.schema.json)

## 目的

本可选 Profile 把一个采购或以其他方式取得的实体单元，从交付、实例识别、家庭接纳、安装、功能位置实现、端点关联一直带到 commissioning readiness，同时禁止合并这些阶段。

规范链条是：

`Commercial Offer／其他取得依据 -> 交易与履约事件 -> 已接收单元候选 -> Physical Asset 身份 -> 安装证据 -> 功能位置实现候选 -> Digital Endpoint 关联 -> commissioning readiness -> 独立运行准入`

任何一张回执、扫码、安装报告、网络发现或用户确认都不能证明整条链。

## 事件与对象边界

不可变 Acquisition Event Record 只描述一个被断言的事件，例如下单、商家接受、支付授权／扣款、发货、送达、实体接收、验收、退货、退款或处置。各事件保持独立；交易、订单、包裹、行项、数量、参与者、单元和时间标识都限定在各自签发系统中。

订购数量不会枚举实体单元；包裹送达不证明所有行项已收到；承运人签收不证明验货、精确 variant、真伪、产权、状态、安装或 commissioning；支付不证明商家接受、交付、所有权或资产身份。

礼物、既有家电、开发商配套、租赁、借用或回收资产也可以接入。商业来源可以是 `not_applicable`；来源未知是 `indeterminate`，不能自动解释为非法或不可用。

## Asset Onboarding Bundle

Bundle 把一个候选 Physical Asset EntityRef 绑定到精确家庭与用途、Product Model／variant 候选、Commercial Offer Snapshot 或其他取得依据、事件 Records、单元标识及签发命名空间、包装与组件观测、状态验收、实体在场挑战、照片／扫码、安装位置和方式证据、预期功能位置、端点发现与 commissioning Records、证据来源、Standing Decisions、披露约束和有效时间。

来自同一条码、照片、商品页、安装表、commissioning session 或数据库的证据共享一个 origin，不能算独立佐证。包装序列号、机身序列号、控制器序列号、Matter discriminator、fabric 限定 node ID、MAC/IP、Home Assistant entity ID 和商家行项 ID 都是不同标识，除非有类型化映射证据。

Bundle 是证据输入，不是可变资产护照，也不是产权登记。

## 保留各轴的 Assessment

不可变 Assessment 分别报告 acquisition trace、收货与数量、variant 对齐、Physical Asset 身份、状态验收、安装阶段、功能位置绑定、端点关联、commissioning readiness 和运行准入。总体结果为 `onboarding_complete_for_declared_scope`、`onboarding_partial`、`quarantine_or_return`、`not_applicable` 或 `indeterminate`。

“完成”只表示声明范围要求的每个轴分别满足自己的 policy，绝不允许一个轴替另一个轴作证。精确枚举见[英文规范](README.md#axis-preserving-assessment)。

## 实现、端点与 commissioning

Physical Asset 只有通过类型化、带有效时间的关系候选，才可实现一个持久 IEC 功能位置；精确资产身份、安装证据、预期位置、相关几何和规划 revision 必须可追溯。该关系不证明需求满足、安装性能、安全、合规、commissioning 成功或产品／资产身份等价。

Digital Endpoint 关联是另一条类型化、带有效时间的关系。附近发现、同名、共用网络地址或同一次 commissioning 中出现都不能单独证明关联。一个资产可暴露多个端点，一个逻辑端点也可能代表多个资产；bridge／controller 必须声明拓扑。

`ready_for_governed_commissioning` 只说明后续过程的声明前提具备。Matter fabric 加入、HA entity 建立、厂商云注册、凭据签发、控制测试、影响模型校准、安全验收和家庭行动权限全部独立。可复用 [Entity Identity Alignment](../../entity-identity-alignment/v0.1/README.zh-CN.md)、[Installed Influence Model](../../installed-influence-model/v0.1/README.zh-CN.md)与[Household Commissioning Experiment](../../household-commissioning-experiment/v0.1/README.zh-CN.md)。

## 变化与历史

退货、退款、换货、替换、迁移、重新安装、重新接线、端点重置、控制器迁移、功能位置改派、损坏、处置或证据纠错，都追加新 Record 与 Assessment。替换单元拥有新的 Physical Asset 身份，即使功能位置、Product Model、保修工单、家庭 Intent 或端点名称延续。退回或移除的资产不被删除；旧关系以有效期结束。

## 不变量

1. Offer、订单行、包裹、收到单元、Physical Asset、功能位置与 Digital Endpoint 保持独立。
2. 支付、商家接受、发货、承运送达、家庭接收、验收、产权与退货保持独立。
3. 数量级履约不能在没有单元证据时创建单元身份。
4. 包装、机身、组件、控制器与端点标识都要类型化并限定签发方。
5. 同源证据不是独立佐证。
6. 商业来源可以不适用；来源缺失仍是未知。
7. 资产身份不证明所有权、权限、状态、安装、合规或端点关联。
8. 安装报告不能自证专业 standing 或独立验证。
9. 功能位置实现不证明需求满足或安装后性能。
10. 端点发现／commissioning 不证明机身身份、安装质量或控制权限。
11. commissioning readiness 不是 commissioning 成功或运行准入。
12. 替换不会因角色、型号、名称、订单或端点标签复用而继承资产身份。
13. 退货、移除与纠错追加历史并终止旧关系，不能改写历史。
14. onboarding 完成不授予购买、支付、所有权、安装、通电、入网或运行控制权限。

## Conformance 与非目标

[实体资产接入 oracle](../../../../conformance/scenarios/physical-asset-onboarding-v0.1/README.zh-CN.md)覆盖事件分离、数量／单元身份、标识作用域、非商业取得、安装阶段、功能位置／端点关系、commissioning 边界、替换与退货。

本 Profile 不定义支付、下单、物流、产权法、反假货、库存会计、保修裁决、电气／建筑验收、安装人员许可、Matter commissioning、设备控制、资产管理或处置法规。
