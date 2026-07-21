import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here=path.dirname(fileURLToPath(import.meta.url));
const repo=path.resolve(here,"../../../..");
const readJson=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const shaFile=p=>"sha256:"+crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const descriptorFiles=["core.profile.json","ro-crate.profile.json","authority.profile.json"];
const descriptors=descriptorFiles.map(name=>({name,path:path.join(here,name),body:readJson(path.join(here,name))}));
const set=readJson(path.join(here,"conformance-set.json"));
const assessment=readJson(path.join(here,"composition-assessment.json"));

function evaluate(candidateSet,candidateDescriptors,{checkFiles=true}={}){
  const errors=[];
  const byKey=new Map(), byId=new Map();
  for(const d of candidateDescriptors){
    const key=`${d.body.profile_id}@${d.body.version}`;
    if(byKey.has(key)) errors.push("duplicate_descriptor");
    byKey.set(key,d); byId.set(d.body.profile_id,d);
    if(checkFiles){
      const doc=path.join(repo,d.body.normative_document_path);
      if(!fs.existsSync(doc)||shaFile(doc)!==d.body.document_digest) errors.push(`document_digest:${key}`);
      for(const ref of d.body.offline_resource_refs||[]) if(!fs.existsSync(path.join(repo,ref))) errors.push(`offline_resource:${ref}`);
      for(const a of d.body.artifacts||[]) for(const ref of a.schema_refs||[]) if(!fs.existsSync(path.join(repo,ref))) errors.push(`artifact_schema:${ref}`);
    }
  }
  const lockKeys=new Set();
  for(const lock of candidateSet.profile_locks){
    const key=`${lock.profile_id}@${lock.version}`;
    if(lockKeys.has(key)) errors.push("duplicate_lock"); lockKeys.add(key);
    const d=byKey.get(key);
    if(!d) errors.push(`missing_descriptor:${key}`);
    else if(shaFile(d.path)!==lock.descriptor_digest) errors.push(`descriptor_digest:${key}`);
  }
  const base=["https://homeworldmodel.org/spec/core/v0.1@0.1.0","https://homeworldmodel.org/spec/profiles/ro-crate/v0.1@0.1.0","https://homeworldmodel.org/spec/profiles/authority/v0.1@0.1.0"];
  for(const key of base) if(!lockKeys.has(key)) errors.push(`base_missing:${key}`);
  for(const d of candidateDescriptors) for(const dep of d.body.dependencies||[]){
    if(dep.kind==="required"&&!lockKeys.has(`${dep.profile_id}@${dep.version}`)) errors.push(`dependency_missing:${dep.profile_id}@${dep.version}`);
  }
  for(const d of candidateDescriptors) for(const inc of d.body.incompatibilities||[])
    if(lockKeys.has(`${inc.profile_id}@${inc.version}`)) errors.push(`incompatible:${d.body.profile_id}:${inc.profile_id}`);
  const visiting=new Set(), visited=new Set();
  function visit(id){
    if(visiting.has(id)){errors.push(`required_cycle:${id}`);return;}
    if(visited.has(id)) return; visiting.add(id);
    const d=byId.get(id);
    for(const dep of d?.body.dependencies||[]) if(dep.kind==="required") visit(dep.profile_id);
    visiting.delete(id);visited.add(id);
  }
  for(const id of byId.keys()) visit(id);
  const artifacts=new Set(candidateDescriptors.flatMap(d=>d.body.artifacts.map(a=>a.artifact_type)));
  for(const a of candidateSet.required_artifacts) if(!artifacts.has(a)) errors.push(`artifact_missing:${a}`);
  for(const r of candidateSet.required_roles){
    const d=byKey.get(`${r.profile_id}@${r.version}`);
    if(!d?.body.roles.includes(r.role)) errors.push(`role_missing:${r.profile_id}:${r.role}`);
  }
  return [...new Set(errors)].sort();
}

const errors=evaluate(set,descriptors);
if(errors.length) throw new Error(`base set invalid: ${errors.join(", ")}`);
if(assessment.conformance_set_ref!==shaFile(path.join(here,"conformance-set.json"))) throw new Error("assessment set digest mismatch");
if(assessment.overall!=="conformant_with_limits") throw new Error("assessment must expose current evidence limits");
for(const x of ["independent_interoperability","agent_capability","household_trust","action_authority"])
  if(!assessment.must_not_infer.includes(x)) throw new Error(`missing assessment boundary ${x}`);

const clone=x=>structuredClone(x);
const mutations=[];
{
  const x=clone(set);x.profile_locks[0].descriptor_digest="sha256:"+"0".repeat(64);mutations.push(["tampered_descriptor_lock",evaluate(x,descriptors)]);
}{
  const x=clone(set);x.profile_locks=x.profile_locks.filter(l=>!l.profile_id.endsWith("/core/v0.1"));mutations.push(["missing_core_and_dependency",evaluate(x,descriptors)]);
}{
  const x=clone(set);x.profile_locks[1].version="0.2.0";mutations.push(["version_drift",evaluate(x,descriptors)]);
}{
  const ds=clone(descriptors);ds[1].body.offline_resource_refs=["missing/offline.schema.json"];mutations.push(["missing_offline_resource",evaluate(set,ds)]);
}{
  const x=clone(set);x.profile_locks.push(clone(x.profile_locks[0]));mutations.push(["duplicate_lock",evaluate(x,descriptors)]);
}
for(const [name,result] of mutations) if(result.length===0) throw new Error(`mutation escaped: ${name}`);

console.log(`BASE EXCHANGE SET OK ${descriptors.length} exact profiles ${set.required_artifacts.length} required artifact kinds ${set.required_roles.length} semantic roles`);
console.log(`CONTENT AND CLOSURE OK document, descriptor, dependency, version, offline resource, artifact, conflict, cycle, and role checks`);
console.log(`MUTATION RESISTANCE OK ${mutations.length} invalid variants rejected`);
console.log("EVIDENCE LIMIT VISIBLE OK repository-owned conformance does not claim independent interoperability or Authority");
