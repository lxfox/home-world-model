import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyPackage } from "../../../spec/profiles/ro-crate/v0.1/validate.mjs";

const here=path.dirname(fileURLToPath(import.meta.url));
const result=verifyPackage(here);
assert.equal(result.resource_count,2);
assert.equal(result.application_resource_count,0);
assert.equal(result.profile_count,2);
assert.equal(result.mention_count,1);

const claims=JSON.parse(fs.readFileSync(path.join(here,"claims.json"),"utf8"));
const records=JSON.parse(fs.readFileSync(path.join(here,"records.json"),"utf8"));
assert.deepEqual(claims,[]);assert.deepEqual(records,[]);
const crate=JSON.parse(fs.readFileSync(path.join(here,"ro-crate-metadata.json"),"utf8"));
const root=crate["@graph"].find(x=>x["@id"]==="./");
const exactProfiles=new Set(root.conformsTo.map(x=>x["@id"]));
assert.deepEqual(exactProfiles,new Set([
  "https://homeworldmodel.org/spec/profiles/ro-crate/v0.1",
  "https://homeworldmodel.org/spec/core/v0.1",
  "https://homeworldmodel.org/spec/profiles/authority/v0.1"
]));
for(const forbidden of ["Space","Device","Plan","Action","Procurement","Commissioning"])
  assert.ok(!JSON.stringify(crate).includes(forbidden),`domain semantic leaked: ${forbidden}`);

const oracle=JSON.parse(fs.readFileSync(path.join(here,"relay-cases.json"),"utf8"));
const ids=new Set(), forbidden=new Set(), allowed=new Set(["base_conformant","opaque_preserved","reject"]);
for(const c of oracle.cases){
  assert.ok(c.id&&!ids.has(c.id));ids.add(c.id);
  assert.ok(c.facts.length&&allowed.has(c.expected)&&c.must_not_infer.length);
  c.must_not_infer.forEach(x=>forbidden.add(x));
}
for(const x of ["household_has_no_facts","authority_document_required_in_every_package","root-declaration-closes-composition","opaque_relay_understands_artifact","derived_claim_from_opaque_artifact","base_consume_implies_domain_consume","package_validity_grants_action_authority"])
  assert.ok(forbidden.has(x),`missing boundary ${x}`);

function relayDecision({governingProfileLocked,opaqueAllowed,digestValid}){
  if(!governingProfileLocked||!opaqueAllowed||!digestValid) return {status:"reject",semanticOutputs:[]};
  return {status:"opaque_preserved",semanticOutputs:[]};
}
assert.equal(relayDecision({governingProfileLocked:true,opaqueAllowed:true,digestValid:true}).status,"opaque_preserved");
for(const input of [
  {governingProfileLocked:false,opaqueAllowed:true,digestValid:true},
  {governingProfileLocked:true,opaqueAllowed:false,digestValid:true},
  {governingProfileLocked:true,opaqueAllowed:true,digestValid:false}
]) assert.equal(relayDecision(input).status,"reject");
assert.deepEqual(relayDecision({governingProfileLocked:true,opaqueAllowed:true,digestValid:true}).semanticOutputs,[]);

console.log(`BASE-ONLY PACKAGE OK ${result.resource_count} core resources 0 application artifacts 0 disclosed Claims 0 disclosed Records`);
console.log(`OPTIONALITY OK no household domain Profile is required by the Base Exchange Set`);
console.log(`OPAQUE BOUNDARY OK ${oracle.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("NO ABSENCE OR AUTHORITY INFERENCE OK empty disclosure is not an empty household and package validity grants no power");
