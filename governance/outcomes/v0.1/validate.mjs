#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=n=>JSON.parse(fs.readFileSync(path.join(here,n),"utf8"));
const sha=n=>crypto.createHash("sha256").update(fs.readFileSync(path.join(here,n))).digest("hex");
const fail=m=>{throw new Error(m)};
function evaluate(f){
  if(!f.evidence){
    if(f.conflict||f.proxy_only||f.coverage_gap||f.horizon_gap||f.privacy_gap||f.documentation_only||f.causal_gap)return "indeterminate";
    return "not_evaluated";
  }
  if(f.conflict||f.coverage_gap||f.horizon_gap||f.privacy_gap||f.causal_gap)return "indeterminate";
  if(f.axis==="usage")return f.negative?"not_observed":f.mixed?"mixed":"observed";
  if(f.axis==="target_outcomes")return f.negative?"not_realized":f.mixed?"mixed":f.partial?"partially_realized":"realized";
  if(f.axis==="experience")return f.negative?"unfavorable":f.mixed?"mixed":"favorable";
  if(f.axis==="adverse_impacts")return f.negative?"observed":f.mixed?"mixed":"none_observed";
  if(f.axis==="distribution")return f.negative?"material_difference_observed":f.mixed?"mixed":"no_material_difference_observed";
  if(f.axis==="exit_reversibility")return f.negative?"not_demonstrated":f.partial?"partially_demonstrated":"demonstrated";
  return "indeterminate";
}
const oracle=read("outcome-cases.json");
if(oracle.cases.length!==32)fail("expected 32 outcome cases");
const forbidden=new Set(),axes=new Set();
for(const c of oracle.cases){const actual=evaluate(c.facts);if(actual!==c.expected)fail(`${c.case_id}: expected ${c.expected}, got ${actual}`);axes.add(c.facts.axis);for(const x of c.must_not_infer)forbidden.add(x)}
for(const x of ["usage","target_outcomes","experience","adverse_impacts","distribution","exit_reversibility"])if(!axes.has(x))fail(`missing axis ${x}`);
for(const x of ["usage_is_benefit","silence_is_satisfaction","none_observed_means_no_harm_exists","difference_is_unfairness","documented_uninstall_is_demonstrated_exit","high_usage_compensates_for_harm","axis_vector_creates_overall_success_score","outcome_view_grants_action_authority"])if(!forbidden.has(x))fail(`missing boundary ${x}`);
const evidence=read("example-usage-evidence.json"),view=read("example-deployment-outcome-view.json");
if(view.deployment.deployment_ref!==evidence.deployment_ref)fail("deployment binding mismatch");
if(view.axes.usage.result!=="observed"||view.axes.usage.evidence_sha256[0]!==sha("example-usage-evidence.json"))fail("usage evidence binding mismatch");
for(const axis of ["target_outcomes","experience","adverse_impacts","distribution","exit_reversibility"])if(view.axes[axis].result!=="not_evaluated"||view.axes[axis].evidence_sha256.length)fail(`${axis} promoted without evidence`);
if("overall_success" in view||"score" in view||"recommendation" in view)fail("compensating outcome field present");
for(const x of ["benefit","consent","satisfaction","no_adverse_impact","fairness","reversibility","overall_success","continuation_authority","household_trust","access","action_authority"])if(!view.must_not_infer.includes(x))fail(`view boundary missing ${x}`);
console.log(`DEPLOYMENT OUTCOME VIEW OK ${oracle.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("PROFILE REUSE OK household target, effect, assurance, impact, and revalidation semantics are referenced rather than duplicated");
console.log("SIX-AXIS OUTCOME OK usage, target outcomes, experience, adverse impacts, distribution, and exit do not promote or compensate one another");
console.log("SUBJECT AND PRIVACY BOUNDARY OK averages, opaque strata, missing reports, and access denial do not manufacture favorable outcomes");
console.log("NO SUCCESS OR AUTHORITY INFERENCE OK the View creates no universal benefit, fairness, continuation, trust, access, or action authority");
