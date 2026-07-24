# ADR-100: Establish the bilingual narrative fact source

- Status: Accepted
- Date: 2026-07-24
- Approved by: ProductOS owner in the project conversation on 2026-07-24
- Canonical language: English
- Chinese mirror: [`ADR-100-establish-the-bilingual-narrative-fact-source.zh-CN.md`](ADR-100-establish-the-bilingual-narrative-fact-source.zh-CN.md)

## Context

The public website requires a canonical English narrative and a version-matched
Simplified Chinese mirror. The repository previously contained only
`narrative-v0.1.md`, whose content was Chinese despite the unsuffixed filename.
The website correctly failed its content gate instead of inventing or relabeling
the missing English source.

The bilingual Model Thesis already controls the compact public explanation, but
the long-form website narrative needs a paired fact source with explicit
language, version, date, status, and license metadata.

## Decision

1. Preserve the existing Chinese narrative body as
   `narrative-v0.1.zh-CN.md`.
2. Publish a new English canonical candidate at `narrative-v0.1.md`.
3. Give both files `v0.1`, date `2026-07-24`, status `approval_candidate`, and
   CC BY 4.0 metadata.
4. Require the same six top-level chapters and the same controlled narrative
   anchors in both languages.
5. Keep exact Core, Profile, and Conformance Set documents authoritative for
   technical meaning; the long narrative remains explanatory.
6. Export and publish the pair only with `approved_public_source` status.
7. Add both files to the curated public projection, require the website content
   gate to verify this status, and publish through reviewed pull requests.

## Consequences

- The website `content:check` becomes eligible to pass against the public core
  repository.
- Website copy can be reviewed as a derived presentation of an explicit source.
- Future narrative changes require coordinated bilingual revision and
  Narrative Surface Contract validation.
- Acceptance does not make the narrative a technical specification, standard,
  interoperability result, or adoption claim.
