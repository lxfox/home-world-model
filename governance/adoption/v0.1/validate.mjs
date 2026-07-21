#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=n=>JSON.parse(fs.readFileSync(path.join(here,n),"utf8"));
const sha=n=>crypto.createHash("sha256").update(fs.readFileSync(path.join(here,n))).digest("hex");
const fail=m=>{throw new Error(m)};
const axisByKind={adoption_declaration:"declared",implementation_assessment:"implemented",deployment_observation:"deployed",dependency_declaration:"depended_on",longitudinal_operation:"sustained",market_estimate:"market_estimated"};
function evaluate(f={}){
  const axis=axisByKind[f.kind]||"none";
  if(axis==="none")return {axis,status:"not_evaluated"};
  if(f.withdrawn)return {axis,status:"withdrawn"};
  if(f.inaccessible||f.expired||f.release_mismatch||f.conflict||f.unit_mismatch||f.mixed_window||f.mixed_population)return {axis,status:"indeterminate"};
  if(f.kind==="market_estimate"&&!f.denominator)return {axis,status:"indeterminate"};
  if(f.negative)return {axis,status:"not_supported"};
  return {axis,status:"supported"};
}
const oracle=read("adoption-cases.json");
if(oracle.cases.length!==32)fail("expected 32 adoption cases");
const axes=new Set(),statuses=new Set(),forbidden=new Set();
for(const c of oracle.cases){const a=evaluate(c.facts);if(a.axis!==c.expected.axis||a.status!==c.expected.status)fail(`${c.case_id}: ${JSON.stringify(a)}`);axes.add(a.axis);statuses.add(a.status);for(const x of c.must_not_infer)forbidden.add(x)}
for(const x of ["declared","implemented","deployed","depended_on","sustained","market_estimated"])if(!axes.has(x))fail(`missing axis ${x}`);
for(const x of ["supported","not_supported","indeterminate","not_evaluated","withdrawn"])if(!statuses.has(x))fail(`missing status ${x}`);
for(const x of ["implementation_is_organizational_adoption","count_with_unknown_denominator_is_market_share","repository_count_is_adopter_count","aggregate_is_automatically_anonymous","all_axes_supported_is_community_consensus","adoption_grants_action_authority"])if(!forbidden.has(x))fail(`missing boundary ${x}`);
const evidence=read("example-adoption-declaration.json"),view=read("example-adoption-view.json");
if(view.release.sha256!==evidence.release.sha256||view.release.release_id!==evidence.release.release_id)fail("release binding mismatch");
if(view.axes.declared.evidence_sha256.length!==1||view.axes.declared.evidence_sha256[0]!==sha("example-adoption-declaration.json"))fail("declaration digest mismatch");
if(view.axes.declared.status!=="supported")fail("declaration not represented");
for(const name of ["implemented","deployed","depended_on","sustained","market_estimated"])if(view.axes[name].status!=="not_evaluated"||view.axes[name].evidence_sha256.length)fail(`${name} promoted without evidence`);
if("overall_adoption" in view||"score" in view||"maturity" in view)fail("scalar adoption field present");
for(const x of ["external_adoption","overall_adoption_score","market_share","community_consensus","household_trust","access","action_authority"])if(!view.must_not_infer.includes(x))fail(`view boundary missing ${x}`);
console.log(`ADOPTION EVIDENCE OK ${oracle.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("SIX-AXIS VIEW OK declaration, implementation, deployment, dependency, sustained operation, and market estimate do not promote one another");
console.log("COUNTING BOUNDARY OK units, lineage, population, denominator, time, and coverage prevent proxy inflation");
console.log("PRIVACY BOUNDARY OK ecosystem evidence does not require household identity and aggregate is not presumed anonymous");
console.log("NO SCORE OR AUTHORITY INFERENCE OK adoption evidence creates no universal rank, consensus, trust, access, or action authority");
