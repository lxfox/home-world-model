#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=n=>JSON.parse(fs.readFileSync(path.join(here,n),"utf8"));
const shaFile=p=>crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const fail=m=>{throw new Error(m)};
function gate(f={}){
  if(!f.response)return "not_eligible";
  if(f.remediation==="indeterminate"||f.configuration_drift||f.population_change)return "indeterminate";
  if(f.remediation!=="completed")return "remediation_incomplete";
  if(f.risk_stale||!f.risk||f.risk==="not_evaluated")return "risk_reassessment_required";
  if(f.risk==="indeterminate")return "indeterminate";
  if(f.risk==="not_reduced")return "hold_required";
  if(!f.risk_acceptance)return "risk_acceptance_required";
  if(f.risk_acceptance==="not_accepted")return "hold_required";
  if(!f.proposal)return "restoration_proposal_required";
  if(f.proposal==="stale")return "indeterminate";
  if(!f.procedures||f.procedures==="pending")return "procedures_pending";
  if(f.procedures==="denied"||f.authority==="denied"||f.local_safety==="denied")return "denied";
  if(f.procedures!=="satisfied"||f.authority!=="allowed"||f.local_safety!=="clear")return "procedures_pending";
  if(f.recurrence||f.trigger_breach||f.stage==="stage_failed")return "rollback_required";
  if(f.stage==="stage_indeterminate"||f.stage==="stage_rolled_back")return "hold_required";
  if(f.stage==="stage_not_started")return "authorized_for_stage";
  if(f.stage==="stage_open")return "stage_observation_required";
  if(f.stage==="stage_passed_with_limits"){
    if(f.full_scope)return f.observation_closed&&f.duties_closed?"closure_eligible":"stage_observation_required";
    return "expand_stage_eligible";
  }
  return "indeterminate";
}
const oracle=read("restoration-cases.json");
if(oracle.cases.length!==36)fail("expected 36 restoration cases");
const results=new Set(),forbidden=new Set();
for(const c of oracle.cases){const a=gate(c.facts);if(a!==c.expected)fail(`${c.case_id}: expected ${c.expected}, got ${a}`);results.add(a);for(const x of c.must_not_infer)forbidden.add(x)}
for(const x of ["not_eligible","remediation_incomplete","risk_reassessment_required","risk_acceptance_required","restoration_proposal_required","procedures_pending","authorized_for_stage","stage_observation_required","expand_stage_eligible","hold_required","rollback_required","closure_eligible","denied","indeterminate"])if(!results.has(x))fail(`missing result ${x}`);
for(const x of ["timeout_authorizes_restoration","remediation_completion_proves_risk_reduction","risk_acceptance_is_restoration_authority","authority_allowed_overrides_local_safety","canary_pass_is_full_restoration","rollback_required_is_rollback_executed","closure_erases_incident_history","restoration_gate_grants_action_authority"])if(!forbidden.has(x))fail(`missing boundary ${x}`);
const fixture=read("example-restoration-gate.json");
const responsePath=path.resolve(here,"../../responses/v0.1/example-response-basis.json");
if(fixture.response_basis.sha256!==shaFile(responsePath))fail("response basis digest mismatch");
if(fixture.routing_result!=="authorized_for_stage"||fixture.stage.execution_status!=="stage_not_started")fail("fixture promoted beyond one stage authorization");
if(fixture.risk_disposition.scope!=="one synthetic canary stage only")fail("risk acceptance scope expanded");
if(!fixture.stage.rollback||!fixture.stage.observation_gate||!fixture.stage.exposure_budget)fail("stage contract incomplete");
for(const x of ["stage_dispatched","stage_passed","full_restoration","zero_residual_risk","universal_safety","population_transfer","long_horizon_safety","household_trust","access","action_authority"])if(!fixture.must_not_infer.includes(x))fail(`fixture boundary missing ${x}`);
console.log(`STAGED RESTORATION GOVERNANCE OK ${oracle.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("GATE SEPARATION OK remediation, reassessment, risk disposition, procedures, Authority, stage Attempt, observation, expansion, rollback, and closure remain distinct");
console.log("CANARY BOUNDARY OK one stage cannot prove another population, capability, environment, horizon, or full restoration");
console.log("RECOVERY INTEGRITY OK timeout does not restore, rollback obligation is not execution, and closure preserves incident history");
console.log("NO SAFETY OR AUTHORITY INFERENCE OK restoration routing grants no zero-risk claim, universal safety, trust, access, or action authority");
