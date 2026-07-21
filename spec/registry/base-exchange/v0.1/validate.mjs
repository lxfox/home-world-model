import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here=path.dirname(fileURLToPath(import.meta.url));
const repo=path.resolve(here,"../../../..");
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const sha=p=>crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const original=read(path.join(here,"offline-registry.json"));

function validate(registry){
  const errors=[],byUri=new Map();
  if(registry.registry_id!=="https://homeworldmodel.org/spec/registry/base-exchange/v0.1")errors.push("registry_id");
  for(const entry of registry.entries){
    let url;try{url=new URL(entry.uri);}catch{errors.push(`uri:${entry.uri}`);continue;}
    if(url.protocol!=="https:"||url.hash)errors.push(`canonical_uri:${entry.uri}`);
    if(byUri.has(entry.uri))errors.push(`duplicate_uri:${entry.uri}`);byUri.set(entry.uri,entry);
    const file=path.resolve(repo,entry.path);
    if(!(file===repo||file.startsWith(repo+path.sep)))errors.push(`path_escape:${entry.path}`);
    else if(!fs.existsSync(file))errors.push(`missing:${entry.path}`);
    else{
      if(fs.statSync(file).size!==entry.size)errors.push(`size:${entry.uri}`);
      if(sha(file)!==entry.sha256)errors.push(`digest:${entry.uri}`);
      const expectedMedia=entry.role==="normative_document"?"text/markdown":entry.role==="json_schema"?"application/schema+json":"application/json";
      if(entry.media_type!==expectedMedia)errors.push(`media:${entry.uri}`);
      if(entry.role==="json_schema"){
        let body;try{body=read(file);}catch{errors.push(`schema_json:${entry.uri}`);continue;}
        if(body["$id"]!==entry.uri)errors.push(`schema_id:${entry.uri}`);
      }
    }
  }
  const set=byUri.get("https://homeworldmodel.org/spec/conformance-sets/base-exchange/v0.1");
  if(!set||"sha256:"+set.sha256!==registry.conformance_set_ref)errors.push("conformance_set_ref");
  for(const entry of registry.entries.filter(x=>x.role==="json_schema")){
    const body=read(path.resolve(repo,entry.path));
    const refs=[];(function visit(x){if(Array.isArray(x))x.forEach(visit);else if(x&&typeof x==="object")for(const [k,v] of Object.entries(x)){if(k==="$ref"&&typeof v==="string")refs.push(v);else visit(v);}})(body);
    for(const ref of refs){const resolved=new URL(ref,entry.uri);resolved.hash="";if(resolved.origin==="https://homeworldmodel.org"&&!byUri.has(resolved.href))errors.push(`ref_unresolved:${entry.uri}:${ref}`);}
  }
  return [...new Set(errors)].sort();
}

function resolver(registry,input,base){
  const target=base?new URL(input,base):new URL(input);const fragment=target.hash;target.hash="";
  const entries=registry.entries.filter(x=>x.uri===target.href);
  if(entries.length!==1)return {status:entries.length?"reject":"unavailable"};
  const errors=validate(registry);if(errors.length)return {status:"reject",errors};
  return {status:"resolved",entry:entries[0],fragment};
}

assert.deepEqual(validate(original),[]);
assert.equal(original.entries.length,24);
const cases=read(path.join(here,"resolution-cases.json"));const forbidden=new Set();
for(const c of cases.cases){
  c.must_not_infer.forEach(x=>forbidden.add(x));
  if(c.mutation){
    const r=structuredClone(original);
    if(c.mutation==="wrong_digest")r.entries[0].sha256="0".repeat(64);
    if(c.mutation==="duplicate_uri")r.entries.push(structuredClone(r.entries[0]));
    if(c.mutation==="path_escape")r.entries[0].path="../../outside";
    if(c.mutation==="schema_id_mismatch"){const e=r.entries.find(x=>x.role==="json_schema");e.uri=e.uri.replace(".json","-other.json");}
    if(c.mutation==="wrong_media_type")r.entries.find(x=>x.role==="normative_document").media_type="application/json";
    assert.ok(validate(r).length>0,`${c.id} mutation escaped`);assert.equal(c.expected,"reject");
  }else assert.equal(resolver(original,c.input,c.base).status,c.expected,c.id);
}
for(const x of ["online_available_from_offline_resolution","relative_ref_from_working_directory","last_registry_entry_wins","registry_uri_overrides_schema_id","optional_profile_is_base_dependency","resolution_grants_action_authority"])
  assert.ok(forbidden.has(x),`missing boundary ${x}`);

console.log(`OFFLINE REGISTRY OK ${original.entries.length} content-bound canonical resources`);
console.log(`REFERENCE CLOSURE OK all HWM relative and absolute Schema refs resolve without network`);
console.log(`URI RESOLUTION ORACLE OK ${cases.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("NO PUBLICATION OR AUTHORITY INFERENCE OK offline resolution does not claim deployed HTTPS, semantics, trust, or power");
