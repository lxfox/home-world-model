# HWM Base Exchange Offline Registry v0.1

- Status: Registry Release Candidate
- Date: 2026-07-19
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Registry: [`offline-registry.json`](offline-registry.json)
- Schema: [`offline-registry.schema.json`](offline-registry.schema.json)

This registry resolves every normative document, JSON Schema, Profile Descriptor, Conformance Set and Composition Assessment required to interpret HWM Base Exchange v0.1 without network access.

Each entry binds one absolute canonical URI to one repository-relative path, media type, semantic role, byte size and SHA-256. JSON Schema entries additionally require their embedded `$id` to equal the registry URI. Duplicate URIs, path traversal, digest mismatch, media-type mismatch and `$id` mismatch fail closed.

URI fragments do not create new registry entries. A resolver finds the fragmentless resource first and then applies the JSON Pointer/anchor within that resource. Relative `$ref` values resolve using RFC 3986 URL resolution against the containing Schema `$id`, never against the process working directory.

The registry is an offline publication artifact, not a claim that the canonical HTTPS URI is currently deployed. Successful local resolution does not establish online availability, document adoption, Schema validity, semantic capability, package truth, trust or Authority.

```sh
node spec/registry/base-exchange/v0.1/validate.mjs
```
