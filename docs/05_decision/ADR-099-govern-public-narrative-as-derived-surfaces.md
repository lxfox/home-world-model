# ADR-099: Govern public narrative as derived surfaces

- Status: Accepted
- Date: 2026-07-24
- Canonical language: English
- Chinese mirror: [`ADR-099-govern-public-narrative-as-derived-surfaces.zh-CN.md`](ADR-099-govern-public-narrative-as-derived-surfaces.zh-CN.md)

## Context

The website and GitHub README address different readers but currently diverge
in pacing, emphasis, and operational status. Copying the website verbatim into
the README would reduce repository usability; allowing both to evolve
independently would produce narrative drift. The project also has an unpaired
legacy narrative draft that cannot safely act as a bilingual fact source.

## Decision

1. Keep exact Core, Profile, and Conformance Set documents authoritative for
   technical meaning.
2. Use the bilingual Model Thesis as the canonical public explanation, without
   giving it normative authority.
3. Introduce a machine-readable Narrative Surface Contract for the public
   anchors that must appear on the website homepage and GitHub README.
4. Treat website and README as derived surfaces: shared identity and claims,
   different reading structures.
5. Require coordinated English and Simplified Chinese changes.
6. Fail validation when a required anchor, maturity statement, ecosystem
   boundary, or participation statement drifts.
7. Keep the unpaired `narrative-v0.1.md` as a historical draft until a canonical
   English file and version-matched Chinese mirror are explicitly accepted.

## Consequences

- New readers encounter one project narrative from either entry point.
- README remains useful to implementers instead of becoming a website transcript.
- Public communication cannot silently create technical meaning or maturity.
- Narrative changes now require relationship-aware review and executable checks.
