# ADR-011 — 将证据适格性与家庭 Authority 分离

- 状态：Proposed
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-011-separate-evidence-standing-from-household-authority.md`](ADR-011-separate-evidence-standing-from-household-authority.md)
- 相关 Profile：[`Evidence Standing Profile v0.1`](../../spec/profiles/evidence-standing/v0.1/README.zh-CN.md)

## 背景

Interactive Evidence Profile 允许家庭成员回答与精确命题绑定的问题；Minimal Authority Profile 可以授权采集、披露、行动以及确认职责。但两者都没有回答另一个问题：**某条具体 Record 是否适合在某用途下参与解析这一类命题？**

用通用的 `admin`、`owner` 或“可信用户”角色回答这个问题并不安全。家庭管理员可能有权开放摄像头，却没有资格验收电气安装；住户可以报告自己的舒适感或看到的变化，却不能据此给出照度测量值；持证专业人员只能在资质、过程、时间和司法辖区范围内确认检查结果，也不能定义另一位住户的偏好；设备应答更不能证明物理效果或用户接受。

## 决定

1. HWM 将 **Evidence Standing（证据适格性）**定义为 Profile 局部的接纳决定，绑定一条 Record、一个目标命题、一个用途、一个时间和一个 Authority 状态。
2. Evidence Standing 不是人、设备、角色或凭证的固有属性或等级。同一来源在不同谓词、空间、过程、用途和时间下可以得到不同结果。
3. 判定链必须分开回答：
   - Record 是否由所声明来源生成，以及这种绑定能否验证；
   - 是否允许采集、保留、披露和使用这条 Record；
   - 具名 standing grant 是否覆盖来源、证据类型、关系、命题、作用域、过程、用途、时间和可选资质；
   - Resolver 是否认为已接纳证据充分或相互冲突；
   - 行动是否获准以及确认 Duty 是否满足；
   - 是否还需要独立的专业或司法辖区验收。
4. 适格性结果为 `admitted`、`excluded` 或 `indeterminate`。`admitted` 只允许 Record 参与解析，不表示它真实、充分、独立、具有法律结论力或已被家庭接受。
5. standing grant 属于 Authority 治理平面。Agent 不能通过普通 Claim 或更宽泛的自然语言问题自行创建或扩大 grant。
6. grant 使用不透明的 actor 和 role 标识。Core 不定义通用家庭等级、年龄规则、投票规则或职业登记系统。
7. Profile 可以狭窄授权本人体验和本人偏好。关于自身体验的陈述不会升级成客观测量，也不会成为他人的偏好。
8. 需要专业适格性时，必须绑定凭证类型、可信颁发者、状态、有效期、司法辖区、过程、目标属性与作用域。验证凭证只能证明完整性和颁发者绑定，不能证明命题真实或持证人对所有事项普遍合格。
9. 缺少适格性时默认关闭。身份、凭证状态或更新 Authority 状态不可取得时为 `indeterminate`；已知不匹配、过期、撤销或无 grant 时为 `excluded`。
10. 多条互不兼容但均适格的 Record 继续交给 Resolver。Evidence Standing 不实现多数投票、来源评分或冲突擦除。
11. Core 不变。Evidence Standing 组合现有 Authority、Record、Evidence Link、Resolver 与 World View 契约。

## 求值顺序

基线 Profile 依次检查：

1. 已认证的 Authority 输入与 Authority Epoch；
2. 来源身份绑定；
3. 独立的“作为证据使用”权限；
4. 来源或不透明角色选择器；
5. 证据类型、Evidence Link 关系、用途、命题谓词与 subject 作用域；
6. 空间作用域、精确问题绑定、直接体验与过程约束；
7. 可选的专业资质与司法辖区；
8. grant 有效时间。

明确拒绝优先于认知接纳；缺失信息永远不能变成授权。

## 影响

- 家庭治理可以具有表达力，而无需把任何人设成全局事实权威。
- 交互确认可以安全接纳狭窄的第一手证据，并阻止作用域膨胀。
- 专业验收与住户接受可以继续独立表达。
- 实现需要在证据路径解析前增加一次策略决定，但不需要新的 Core 实体或通用信任分数。
- 即使后续 View 因 standing policy 变化而排除某条 Record，历史 Record 仍依隐私策略保留。

## 备选方案

### 把所有获准的家庭回答都当作合格证据

拒绝。回答或披露权限不等于对所有命题都具有证据适格性。

### 给每个 actor 增加全局信任或置信分数

拒绝。它会掩盖谓词、方法、用途、时间和司法辖区依赖，并制造危险的跨领域推断。

### 复用行动确认 Duty

拒绝。ODRL Duty 或 XACML Obligation 约束 Permission 行使前必须完成什么，不决定一条 attestation 是否适合证明另一个命题。

### 把专业角色放进 Core

拒绝。角色含义、执业资格、范围与司法辖区都不同，应由部署 Profile 与信任配置定义。

## 标准边界

- ODRL 提供 permission、prohibition、assignee、target、action、constraint 与 Duty 结构。
- XACML 提供基于属性的授权输入，以及 `Permit`、`Deny`、`Indeterminate` 与 `NotApplicable` 语义。
- Verifiable Credentials 可以保护身份或资质声明，但明确不证明其中 Claim 的真实性，也不替 verifier 决定每种用途下应信任谁。
- SOSA/SSN 提供 observation、procedure、feature of interest 与 observed property 语义，但不决定家庭 Resolver 是否应依赖某次观测。

HWM 的剩余行为，是在证据进入解析的边界上对这些机制进行确定性组合。

## 接受前验证

1. 两个独立实现无需全局 actor 分数即可复现 standing oracle。
2. 隐私审查确认排除原因不会泄露隐藏身份、凭证或 Record。
3. 安全审查验证生产 proof、凭证状态、Epoch 与策略分发行为。
4. 至少一位家庭安装人员和一位持证领域审查者挑战专业作用域用例。
