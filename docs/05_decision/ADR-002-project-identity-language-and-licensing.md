# ADR-002 — Project Identity, Normative Language, and Licensing

- Status: Accepted
- Date: 2026-07-17
- Normative language: English
- Chinese mirror: [`ADR-002-project-identity-language-and-licensing.zh-CN.md`](ADR-002-project-identity-language-and-licensing.zh-CN.md)
- Source decision: accepted project identity and licensing decision.

## Context

The initiative needs a stable public identity before the website project and GitHub repository are initialized. It also needs one normative language for resolving translation differences and a license structure that supports both multi-party software implementation and broad reuse of its narrative, specifications, translations, and visual material.

The initiative is standards- and narrative-first. It must not present the current discussion draft as an adopted industry standard or a finished product.

## Decision

1. The public project name is **Home World Model**.
2. The GitHub repository owner and slug will be `lxfox/home-world-model`.
3. English is the normative language. Simplified Chinese is a required, version-matched translation. When the two versions differ in meaning, the English text controls until both versions are corrected.
4. Software source code, tools, schemas, and reference implementations are licensed under the Apache License 2.0.
5. Project-authored narrative, specifications, research documents, translations, diagrams, and visual assets are licensed under CC BY 4.0, but only to the extent the project owns the applicable rights.
6. Third-party material retains its original license. It must be listed in the appropriate notice or asset manifest.
7. Generative visual assets may be released, but each production asset must record its model/tool, date, prompt or creation brief, input material, human modifications, rights assessment, and license in `assets/PROVENANCE.md`.
8. The name is initially used as a descriptive open-source initiative name. The project must not use `™` or `®`, claim trademark registration, or claim exclusive rights in `HomeWorld` or `World Model` without a later legal decision.
9. The website team must submit a static-hosting, Aliyun DNS, HTTPS, deployment, and rollback proposal before production infrastructure is changed.

## Preliminary Name-Risk Assessment

The preliminary assessment is **medium risk: acceptable for descriptive initiative use, but weak as the project's sole defensible brand asset**.

- No exact public GitHub repository named `home-world-model` was found, and `lxfox/home-world-model` did not exist when checked on 2026-07-17.
- General web searching did not identify an exact-name smart-home open-source initiative. Linkerbot has, however, publicly used the adjacent term `3D-Home-World-Model (3D-HWM)` for household robotics.
- A live USPTO exact-phrase search for `CM:"home world model" AND LD:true` returned no result.
- A live USPTO search requiring all three terms in International Classes 009 and 042 also returned no result.
- Live USPTO records do exist for `WORLDMODEL`, `SOFTWARE WORLD MODEL`, and Gearbox's `HOMEWORLD` registrations in adjacent software classes. The component terms therefore occupy a crowded naming space.
- WIPO Global Brand Database access was blocked in the current environment. China's online trademark search has required unified authenticated access since 2025-12-19, and no user identity was used during this review.

This assessment is not a global clearance search or legal opinion. Before applying for a trademark, creating a legal entity around the name, or making substantial brand investment, the project should commission a professional search covering China, WIPO/Madrid, the EU, the United States, and other intended markets, especially Classes 009 and 042.

## Repository License Layout

The implementation repository should use the following minimum structure:

```text
LICENSE                         # Apache License 2.0
NOTICE                          # attribution and third-party notices, when applicable
LICENSES/
├── CC-BY-4.0.txt
└── ASSET-NOTICE.md
assets/
└── PROVENANCE.md
README.md                       # English, normative
README.zh-CN.md                 # Simplified Chinese mirror
```

Each public document pair must carry the same version, date, status, and license notice. Publishing must fail when a required language pair is missing or the versions differ.

## Consequences

- The website may use `Home World Model` in metadata, navigation, and social sharing material, while clearly labeling the initiative as an early public discussion.
- The future repository may be initialized as `home-world-model` after H001 passes Design Review and enters `Ready for Build`.
- English copy must be prepared before the bilingual website can ship; Chinese is not an optional later translation.
- License scope must be explicit by directory and material type. The CC license does not automatically license project names or logos as trademarks.
- A more distinctive logo or secondary identity may be developed later without renaming the underlying initiative.

## References

- [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)
- [USPTO federal trademark searching guidance](https://www.uspto.gov/trademarks/search/federal-trademark-searching)
- [China National Intellectual Property Administration trademark portal](https://sbj.cnipa.gov.cn/)

