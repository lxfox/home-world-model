import assert from "node:assert/strict";import fs from "node:fs";import path from "node:path";import {fileURLToPath} from "node:url";
const dir=path.dirname(fileURLToPath(import.meta.url));const oracle=JSON.parse(fs.readFileSync(path.join(dir,"effect-cases.json"),"utf8"));
const base={applicability:"applicable",observation:"accepted",binding:"match",observed:"inside",criteria:null,aggregation:"all_required",causal_requested:false,design:"none",method:"none",baseline:"fit",confounders:"none",causal_result:"support",late:false};
const answer=(realization,causal,reason)=>({realization,causal,reason});
const evaluate=o=>{const f={...base,...o};
 if(f.applicability!=="applicable")return answer("not_applicable","not_assessed","effect_not_applicable");
 const obs={missing:"required_observation_missing",access_denied:"observation_access_denied",stale:"observation_not_current_for_window",contested:"observation_contested",device_ack_only:"device_ack_not_target_observation"};
 if(obs[f.observation])return answer("indeterminate","not_assessed",obs[f.observation]);
 const bind={feature_mismatch:"feature_of_interest_mismatch",property_mismatch:"observed_property_mismatch",unit_mismatch:"unit_conversion_unavailable",time_mismatch:"phenomenon_time_outside_window",coverage_mismatch:"observation_coverage_mismatch"};
 if(bind[f.binding])return answer("indeterminate","not_assessed",bind[f.binding]);
 let realization="realized",rreason=f.late?"late_evidence_updates_new_assessment":"effect_met_causality_not_requested";
 if(f.criteria){if(f.criteria.includes("indeterminate")){realization="indeterminate";rreason="required_criterion_indeterminate"}else if(f.aggregation==="partial_allowed"&&f.criteria.includes("met")&&f.criteria.includes("not_met")){realization="partially_realized";rreason="explicit_multi_criterion_partial"}}
 else if(f.observed!=="inside"){realization="not_realized";rreason="effect_not_met_causality_not_requested"}
 if(!f.causal_requested)return answer(realization,"not_assessed",rreason);
 if(f.design==="temporal_only")return answer(realization,"indeterminate","temporal_sequence_insufficient_for_contribution");
 if(f.method==="missing")return answer(realization,"indeterminate","causal_method_unavailable");
 if(f.method!=="accepted")return answer(realization,"indeterminate","causal_method_not_accepted");
 if(f.baseline==="already_realized")return answer(realization,"not_supported","effect_preexisted_attempt_under_method");
 if(f.baseline!=="fit")return answer(realization,"indeterminate","baseline_not_comparable");
 if(f.confounders==="present")return answer(realization,"indeterminate","competing_factors_present");
 if(f.confounders!=="addressed")return answer(realization,"indeterminate","competing_factors_unresolved");
 if(f.causal_result==="conflict")return answer(realization,"contested","admissible_causal_results_conflict");
 if(f.causal_result==="against")return answer(realization,"not_supported","accepted_method_evidence_against_contribution");
 return answer(realization,"supported_contribution","accepted_method_supports_contribution");};
assert.equal(oracle.cases.length,32);for(const c of oracle.cases)assert.deepEqual(evaluate(c.facts),c.expected,c.case_id);
for(const x of ["effect_realized_means_attempt_caused_it","temporal_precedence_proves_cause","prov_influence_proves_cause","missing_causal_evidence_means_not_supported","realized_means_goal_satisfied","supported_contribution_means_sole_cause"])assert.ok(oracle.must_not_infer.includes(x));
console.log("EFFECT REALIZATION AND ATTRIBUTION OK",oracle.cases.length,"semantic cases",oracle.must_not_infer.length,"forbidden inferences");
console.log("ORTHOGONALITY OK","realization does not imply causal contribution");
console.log("CAUSAL HUMILITY OK","temporal order, provenance, and acknowledgement are insufficient");
