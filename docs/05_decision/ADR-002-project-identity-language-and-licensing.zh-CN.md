# ADR-002 — 项目标识、规范语言与许可证

- 状态：已接受
- 日期：2026-07-17
- 规范语言：英文
- 英文规范文本：[`ADR-002-project-identity-language-and-licensing.md`](ADR-002-project-identity-language-and-licensing.md)
- 来源决定：已接受的项目标识与许可证决定。

## 背景

网站项目和 GitHub 仓库初始化前，需要稳定的公开标识。项目还需要指定一种用于裁决翻译差异的规范语言，并建立同时支持多方软件实现，以及叙事、规范、译文和视觉素材广泛复用的许可证结构。

本项目坚持叙事与标准先于产品，不得把当前讨论稿包装成已经采纳的行业标准或完成的产品。

## 决定

1. 项目公开名称为 **Home World Model**。
2. GitHub 仓库所有者与 slug 为 `lxfox/home-world-model`。
3. 英文是规范文本，简体中文是必须维护且版本一致的翻译。两种语言发生语义冲突时，以英文为准，直至双方同步修正。
4. 软件源代码、工具、schema 和参考实现采用 Apache License 2.0。
5. 项目原创叙事、规范、研究文档、译文、图表和视觉资产采用 CC BY 4.0，但仅许可项目实际拥有的权利。
6. 第三方素材保留原许可证，并须列入相应 NOTICE 或资产清单。
7. 允许发布生成式视觉资产，但每项生产素材必须在 `assets/PROVENANCE.md` 记录模型/工具、日期、提示词或创作说明、输入素材、人工修改、权利评估与许可证。
8. 项目名现阶段按描述性开源倡议名称使用。在后续法律决定前，不使用 `™` 或 `®`，不宣称已注册商标，也不宣称独占 `HomeWorld` 或 `World Model`。
9. 网站团队必须先提交静态托管、Aliyun DNS、HTTPS、部署和回滚方案，再变更生产基础设施。

## 初步名称风险评估

初步结论为：**中等风险；可以作为描述性倡议名称使用，但不适合成为项目唯一的强防御品牌资产。**

- 截至 2026-07-17，未发现公开 GitHub 仓库名称完全等于 `home-world-model`，`lxfox/home-world-model` 也不存在。
- 一般网页检索未发现完全同名的智能家居开源倡议；但 Linkerbot 曾在家用机器人领域公开使用相邻术语 `3D-Home-World-Model (3D-HWM)`。
- USPTO 存续商标精确检索 `CM:"home world model" AND LD:true` 无结果。
- USPTO 中要求三个词同时出现且位于国际分类 009 和 042 的存续检索也无结果。
- USPTO 的相邻软件分类中存在 `WORLDMODEL`、`SOFTWARE WORLD MODEL` 的存续申请，以及 Gearbox 的 `HOMEWORLD` 注册。组成词处于拥挤的命名空间。
- 当前环境无法访问 WIPO Global Brand Database；中国商标网上查询自 2025-12-19 起要求统一身份认证，本次评估未使用用户身份登录。

本评估不是全球清查或法律意见。在申请商标、以该名称成立组织或投入大量品牌资源前，应由专业人员补查中国、WIPO/马德里、欧盟、美国及其他目标市场，重点关注第 009 和 042 类。

## 仓库许可证布局

实现仓库至少采用以下结构：

```text
LICENSE                         # Apache License 2.0
NOTICE                          # 署名与第三方通知（如适用）
LICENSES/
├── CC-BY-4.0.txt
└── ASSET-NOTICE.md
assets/
└── PROVENANCE.md
README.md                       # 英文规范文本
README.zh-CN.md                 # 简体中文镜像
```

每组公开文档必须具有相同版本、日期、状态和许可证说明。缺少语言配对或版本不一致时，发布流程必须失败。

## 影响

- 网站可以在元数据、导航和社交分享素材中使用 `Home World Model`，同时必须清楚标注项目仍处于早期公开讨论阶段。
- H001 通过 Design Review 并进入 `Ready for Build` 后，可以把未来仓库初始化为 `home-world-model`。
- 双语网站发布前必须先完成英文文案；中文不是可选的后续翻译。
- 各目录和素材类型必须明确许可证范围。CC 许可证不会自动把项目名称或 Logo 作为商标授权。
- 未来可以增加更独特的 Logo 或次级视觉标识，无需改变底层倡议名称。

## 参考资料

- [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [知识共享署名 4.0 国际许可协议](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)
- [USPTO 联邦商标检索指南](https://www.uspto.gov/trademarks/search/federal-trademark-searching)
- [国家知识产权局商标局](https://sbj.cnipa.gov.cn/)

