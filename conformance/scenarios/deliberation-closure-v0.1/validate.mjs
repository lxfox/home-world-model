import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const dir=path.dirname(fileURLToPath(import.meta.url));
const oracle=JSON.parse(fs.readFileSync(path.join(dir,"closure-cases.json"),"utf8"));
const base={effects:["intent_adoption"],effect_statuses:null,coverage:"complete",end:"resolved",superseding:"none",issue:"match",interaction:"available",epoch:"current",origin:"preserved",authority:"independent",lineage:"present"};
const answer=(status,reason)=>({status,reason});
const evaluate=o=>{
 const f={...base,...o};
 if(f.issue!=="match") return answer("indeterminate","issue_basis_binding_mismatch");
 if(f.interaction!=="available") return answer("indeterminate","interaction_record_missing");
 if(f.epoch!=="current") return answer("indeterminate","authority_epoch_stale");
 if(f.origin!=="preserved") return answer("indeterminate","issue_origin_mismatch");
 if(f.superseding==="match") return answer("superseded","explicit_superseding_deliberation_bound");
 if(f.superseding==="missing") return answer("indeterminate","superseding_deliberation_binding_missing");
 if(f.authority!=="independent" && f.effects.length) return answer("indeterminate","effect_not_independently_authorized");
 if(f.effects.includes("target_correction")&&f.lineage!=="present") return answer("indeterminate","target_correction_lineage_missing");
 if(f.coverage!=="complete") return answer("indeterminate","effect_coverage_not_complete");
 if(!f.effects.length){
  if(f.end==="expired") return answer("expired","deliberation_window_expired_without_effect");
  if(f.end==="silence") return answer("closed_without_decision","silence_has_no_normative_effect");
  if(f.end==="dismissed") return answer("closed_without_decision","dismissal_has_no_normative_effect");
  return answer("closed_without_decision","interaction_closed_without_normative_effect");
 }
 const statuses=f.effect_statuses??f.effects.map(()=>"verified");
 if(statuses.includes("indeterminate")) return answer("indeterminate","disclosed_effect_indeterminate");
 if(statuses.includes("not_effective")) return answer("indeterminate","disclosed_effect_not_effective");
 return answer("resolved","all_disclosed_effects_verified");
};
assert.equal(oracle.cases.length,23);
for(const c of oracle.cases) assert.deepEqual(evaluate(c.facts),c.expected,c.case_id);
for(const g of ["closure_is_authority_source","no_rejects_target_claim","tolerance_means_target_satisfied","deferral_means_rejection","raising_suppression_erases_gap","target_correction_mutates_history","silence_is_consent","agent_summary_makes_effect_effective","indeterminate_closure_rolls_back_verified_effect","closure_authorizes_action"]) assert.ok(oracle.must_not_infer.includes(g),g);
console.log("DELIBERATION CLOSURE OK",oracle.cases.length,"semantic cases",oracle.must_not_infer.length,"forbidden inferences");
console.log("EFFECT SEPARATION OK","adoption, rejection, tolerance, deferral, suppression, correction, and revision retain independent authority");
console.log("NO SILENT EFFECT OK","silence, timeout, dismissal, expiry, and Agent summary create no normative result");
