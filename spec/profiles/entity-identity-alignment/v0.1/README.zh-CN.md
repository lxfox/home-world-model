# HWM 实体身份对齐 Profile v0.1

- 状态：Profile 讨论候选
- 版本：0.1.0
- 日期：2026-07-19
- 英文规范：[`README.md`](README.md)

## 目的

本 Profile 判断两个 EntityRef 在声明实体类型、家庭、用途和时间下是否指向同一对象，同时防止物理资产、功能位置、产品型号、数字端点、空间表示、人、宠物和视觉 track 被错误合并。

结果只有：`same_entity`、`distinct_entities`、`related_not_identical`、`unresolved` 或 `integrity_conflict`。

## 类型边界

资产实现功能位置、资产暴露端点、资产属于产品型号、几何表示空间、资产替换资产、端点替代端点、组成、共址和功能可替代都是具名关系，不是同一性。跨类型输入不能得到 `same_entity`。

序列号必须带厂商／namespace 和冲突处理；Matter node/fabric ID 只在 fabric 内有意义；HA entity ID、IP／MAC、房间标签、显示名、视觉相似、位置或产品型号都不是通用物理资产身份。密钥连续性可以支持端点凭据 lineage，不能自动识别机身、功能位置、所有者或人。

同一照片、扫描、数据库或 commissioning event 派生的多个判断共享一个 Evidence Origin，不能伪装成独立佐证。

## 生命周期与主体

替换灯具会产生新 Physical Asset，即使功能位置和 Intent 保持不变。端点变化不必意味着资产变化。网络标识可被重分配，因此身份判断带时间。空间几何 revision 可以继续表示同一空间，但空间 split／merge 产生新身份和显式 lineage。

本 Profile 不标准化生物识别。视觉／语音／轨迹 observation track 不能自行升为家庭成员或宠物 subject。只有家庭 Authority 通过另一个具备同意与隐私边界的过程分配 subject handle。

对齐结果通过贡献准入追加显式关系，不静默合并索引、不改写历史主体，也不转移所有权、访问、能力、责任、证据适格性或行动权限。

Request、Evidence Bundle 与 Assessment 使用精确 SHA-256 进行内容绑定。Authority Epoch 是非负整数。intended／allowed consequence 使用封闭词汇，只允许身份评价、typed relation Claim proposal、声明用途的 reference qualification 与 dependency revalidation；wire contract 不能把属性、ownership、access、Lease 或 Authority 转移编码成 alignment 后果。`same_entity` 要求同 kind 输入和充分证据；`related_not_identical` 必须给出精确 relation。
