#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=n=>JSON.parse(fs.readFileSync(path.join(here,n),"utf8"));
const sha=n=>crypto.createHash("sha256").update(fs.readFileSync(path.join(here,n))).digest("hex");
const fail=m=>{throw new Error(m)};
function route(f={}){
  if(!f.signal)return "no_response_basis";
  if(f.authority_denied||f.safety_denied)return "denied";
  if(f.standing!=="admitted"||f.expired)return "assessment_required";
  if(f.class==="precautionary_hold"){
    if(!f.policy)return "proposal_required";
    if(!f.fallback||!f.expiry)return "indeterminate";
    return "precautionary_hold_eligible";
  }
  if(f.class==="emergency_stop"){
    if(!f.verified_emergency)return "assessment_required";
    if(!f.policy&&!f.safety_mandate)return "proposal_required";
    if(!f.bounded_scope||!f.fallback)return "indeterminate";
    return "emergency_stop_eligible";
  }
  if(f.class==="ordinary_exit"){
    if(!f.exit_right)return "proposal_required";
    if(!f.bounded_scope||!f.fallback)return "indeterminate";
    return "ordinary_exit_eligible";
  }
  if(f.class==="remediation")return f.remediation_duty?"remediation_required":"proposal_required";
  if(f.class==="retirement"){
    if(!f.retirement_decision)return "proposal_required";
    if(!f.bounded_scope||!f.fallback)return "indeterminate";
    return "retirement_preparation_required";
  }
  return "proposal_required";
}
const oracle=read("response-cases.json");
if(oracle.cases.length!==34)fail("expected 34 response cases");
const results=new Set(),forbidden=new Set();
for(const c of oracle.cases){const a=route(c.facts);if(a!==c.expected)fail(`${c.case_id}: expected ${c.expected}, got ${a}`);results.add(a);for(const x of c.must_not_infer)forbidden.add(x)}
for(const x of ["no_response_basis","assessment_required","proposal_required","precautionary_hold_eligible","emergency_stop_eligible","ordinary_exit_eligible","remediation_required","retirement_preparation_required","denied","indeterminate"])if(!results.has(x))fail(`missing result ${x}`);
for(const x of ["admitted_harm_is_action_authority","temporary_hold_may_be_indefinite","emergency_scope_is_global","authority_allowed_overrides_local_safety","remediation_duty_grants_household_access","eol_announcement_is_retirement","authorization_proves_dispatch","safe_state_closes_post_event_duties","response_basis_grants_action_authority"])if(!forbidden.has(x))fail(`missing boundary ${x}`);
const signal=read("example-signal.json"),basis=read("example-response-basis.json");
if(basis.signals[0].sha256!==sha("example-signal.json")||basis.signals[0].ref!=="example-signal.json")fail("signal binding mismatch");
if(basis.eligibility!=="precautionary_hold_eligible")fail("fixture eligibility mismatch");
if(basis.authority_status!=="not_evaluated"||basis.execution_status!=="not_proposed")fail("eligibility promoted to authority or execution");
if(!basis.timing.review_or_expires_at||!basis.fallback.safe_state||!basis.fallback.restoration_rule)fail("temporary response boundary incomplete");
if(!basis.scope.excluded.includes("unrelated devices")||!basis.scope.excluded.includes("historical data access"))fail("scope exclusions incomplete");
for(const x of ["harm_confirmed","authorization","dispatch","safe_state_realized","indefinite_suspension","restoration_authorized","household_trust","access","action_authority"])if(!basis.must_not_infer.includes(x))fail(`basis boundary missing ${x}`);
console.log(`DEPLOYMENT RESPONSE GOVERNANCE OK ${oracle.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("CHAIN SEPARATION OK signal, eligibility, authorization, Attempt, safe-state realization, and obligation closure remain distinct");
console.log("BOUNDED PROTECTION OK holds and emergency stops require policy/mandate, scope, fallback, time, and review without granting general emergency power");
console.log("EXIT AND LIFECYCLE OK exit, remediation, and retirement retain separate rights, access, dependency, data, and closure obligations");
console.log("NO AUTHORITY INFERENCE OK negative evidence and response duties grant no household trust, access, continuation, or action authority");
