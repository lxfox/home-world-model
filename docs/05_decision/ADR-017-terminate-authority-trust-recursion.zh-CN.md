# ADR-017 — 以固定根 lineage 终止 Authority 信任递归

- 状态：提议
- 日期：2026-07-19
- 规范语言：英文
- 英文规范：[`ADR-017-terminate-authority-trust-recursion.md`](ADR-017-terminate-authority-trust-recursion.md)

## 背景

Minimal Authority Profile 曾把 `trust_anchors` 与 Authority Profile Document 的 proof 放在同一制品内。这适用于验证方已经信任该家庭之后，却无法建立第一次信任：一份不可信文档不能仅靠列出一把钥匙并附带相符的自签名，就让这把钥匙成为可信锚。

ADR-016 让内容绑定的 Standing Decision 在已认证 Authority 信任锚处终止。本 ADR 进一步规定递归具体终止在哪里、连续性怎样保留，以及什么情况不能自动恢复。

## 决定

1. HWM 不新增 Core 原语。可选 Authority Profile 制品 **Trust Root** 提供信任启动契约。
2. Trust Root 包含稳定的 Authority `lineage_id`、家庭和 Authority 标识、严格递增的 `root_version`、`authority_epoch_floor`、有效期、验证方法、根角色、Authority 文档角色、可选的预承诺恢复角色，以及覆盖规范化 `signed` Body 的原始 proofs。
3. Genesis Trust Root 只有在其 RFC 8785/SHA-256 `signed` 摘要被带外精确固定后才可信。制品本身、controller 字段、自签名、Agent Claim、云账号或 household 标识都不能自行创建这个 pin。
4. 正常 N→N+1 轮换必须绑定前一版精确 signed root 摘要，同时以不同验证材料而不只是不同 method 标识满足：
   - 可信根 N 声明的不同签名者阈值；
   - 候选根 N+1 声明的不同签名者阈值。
5. `root_version` 必须严格增加一。更低或相同版本属于回滚；跳号必须先取得缺失的中间根。验证方把接受的根持久保存在本地非易失状态。
6. 每次根转换都推进 `authority_epoch_floor`。Root version 与 Authority Epoch 是不同轴：策略可以在不轮换根密钥时推进 Epoch；根转换则必须淘汰更旧 Authority 状态和缓存 Lease。
7. 只有根 N 预先承诺了独立恢复方法集合和阈值时，恢复才有效。恢复转换使用旧恢复阈值加新根阈值。恢复密钥不授权普通 Authority 文档或家庭行动。
8. 如果连续性凭据全部丢失且没有预承诺恢复策略，系统无法证明延续。人工重新注册必须创建新的 `lineage_id`，不能覆盖或冒充旧 lineage。
9. 两个不同且各自有效的 N+1 后继为 `contested`。签发时间、转换类型、controller 名称或偏好恢复流程都不能自动选出胜者。
10. 已过期的当前根仍可以认证一个顺序连续且当前有效的后继。如果无法取得当前后继，过期产生 `indeterminate` 并提示可能被冻结；不证明攻击、泄露、撤销或内容为假。
11. 根角色、Authority 文档角色与恢复角色在用途和验证材料上都必须分离。同一把钥匙的别名不能形成 quorum。生产绑定使用对精确 signed 内容的独立验证结果；原始 proof 字段不得自报验证成功。
12. 接受 Trust Root 只让验证方可以验证 Authority-plane 制品；不证明法律所有权、不解决家庭争议、不授权行动、不证明物理安全、不准入证据，也不证明命题真实。
13. 如果攻击者控制配置的根阈值，恶意但正确签名的后继在本协议内部无法与合法后继区分。此时只能依赖独立且预承诺的恢复路径或带外重建；本模型不宣称可以在协议内解决。

## 标准复用与边界

- [The Update Framework Specification](https://theupdateframework.github.io/specification/latest/) 提供带外初始可信根、精确顺序版本、不同签名者阈值以及旧根加新根共同授权的成熟模式。HWM 只复用这些安全不变量，不复用 TUF 的软件仓库角色或线格式。
- [RFC 5011](https://www.rfc-editor.org/rfc/rfc5011.html) 展示经认证的信任锚轮换、后继预备、撤销问题以及当前密钥泄露后的剩余风险。HWM 不复用 DNSSEC Record 格式或定时器。
- [W3C DID Core 1.0](https://www.w3.org/TR/did-1.0/#did-recovery) 把恢复留给具体 DID Method，建议密钥用途分离，并指出不存在适用于所有 DID Method 的通用恢复机制。因此 HWM 定义显式预承诺边界，而不是通用账号找回承诺。
- [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785.html) 提供精确根 Body 摘要绑定所需的 JSON 规范化方法。

## 拒绝的替代方案

### 信任 Authority 文档自身列出的钥匙

拒绝，因为形成循环启动。

### 只允许当前根决定全部未来根钥匙

拒绝。要求新根自身阈值可以发现不完整或非预期的后继配置，也符合成熟的双向连续性模式。

### 从身份、邮箱、云账号或家庭成员关系恢复

拒绝。这些可以成为某个部署带外注册流程的信号，但 HWM 不能据此推断旧密码学 lineage 得到延续，也不能据此解决法律和社会权力问题。

### 让最新时间或最高 root version 自动胜出

拒绝，因为会允许 fast-forward 和分叉选择攻击。版本只能顺序接纳，多份有效后继保持争议。

### 承诺任何密钥丢失或泄露后都可恢复

拒绝。没有预先受信的独立路径时无法做到；连续性无法证明时建立新 lineage 才是诚实结果。

## 证据

可执行夹具包含 22 个 genesis、轮换、密钥材料分离、恢复、回滚、过期、proof 不可取得和分叉用例，以及 5 个模型边界用例。JavaScript 与 Python 独立实现共同执行 53 个禁止推断。通过夹具只证明给定 fixture proof 结果下的确定性语义兼容；不证明生产密码学、密钥保管、法律所有权、可用性或独立安全审查。

## 后果

- Evidence Standing 与全部 Authority-plane Profile 可以在本地持久保存、显式启动的根处终止验证，而不是继续依赖另一条普通 Record。
- 家庭迁移在连续性得到证明时可以保留精确 lineage；无法证明时必须暴露 lineage 断裂。
- 生产部署仍需要具体密码套件、安全本地存储、注册体验、时钟策略、密钥保管流程和外部安全评审。
