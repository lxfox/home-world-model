import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const oracle = JSON.parse(fs.readFileSync(path.join(directory, "target-fit-cases.json"), "utf8"));
const base = {applicability:"applicable", target:"accepted", spec:"accepted", basis:"current_observed", purpose:"match", as_of:"match", availability:"available", epistemic:"accepted", freshness:"current", feature:"bedroom-a", property:"air-temperature", unit:"Cel", procedure:"bedroom-fixed-sensor", coverage:"pointwise-bedroom-a", observed:[19.5,20.5], experience:"not_evaluated"};

const aggregate = (operator, criteria) => {
  if (operator === "all_required") {
    if (criteria.includes("not_met")) return "not_satisfied";
    return criteria.every(x => x === "met") ? "satisfied" : "indeterminate";
  }
  if (operator === "any_sufficient") {
    if (criteria.includes("met")) return "satisfied";
    return criteria.every(x => x === "not_met") ? "not_satisfied" : "indeterminate";
  }
  if (criteria.includes("indeterminate")) return "indeterminate";
  if (criteria.every(x => x === "met")) return "satisfied";
  if (criteria.every(x => x === "not_met")) return "not_satisfied";
  return "partially_satisfied";
};

const evaluate = overrides => {
  const f = {...base, ...overrides};
  const unknown = reason => ({criterion:"indeterminate", result:"indeterminate", reason});
  if (f.applicability !== "applicable") return unknown(f.applicability === "not_applicable" ? "target_not_applicable" : "target_applicability_indeterminate");
  if (f.target !== "accepted") return unknown("target_not_accepted");
  if (f.spec !== "accepted") return unknown("evaluation_specification_not_accepted");
  if (f.basis !== "current_observed") return unknown("epistemic_basis_not_current_observed");
  if (f.purpose !== "match") return unknown("purpose_binding_mismatch");
  if (f.as_of !== "match") return unknown("phenomenon_time_mismatch");
  if (f.availability !== "available") return unknown(`observation_${f.availability}`);
  if (f.epistemic !== "accepted") return unknown(`observation_${f.epistemic}`);
  if (f.freshness !== "current") return unknown("observation_not_current");
  if (f.feature !== "bedroom-a") return unknown("feature_of_interest_mismatch");
  if (f.property !== "air-temperature") return unknown("observed_property_mismatch");
  if (f.unit !== "Cel") return unknown("unit_or_conversion_binding_mismatch");
  if (f.procedure !== "bedroom-fixed-sensor") return unknown("procedure_mismatch");
  if (f.coverage !== "pointwise-bedroom-a") return unknown("spatial_coverage_mismatch");
  const [lo, hi] = f.observed;
  const criterion = lo >= 19 && hi <= 21 ? "met" : hi < 19 || lo > 21 ? "not_met" : "indeterminate";
  return {criterion, result:aggregate("all_required", [criterion]), reason:criterion === "met" ? "all_required_criteria_met" : criterion === "not_met" ? "required_criterion_not_met" : "required_criterion_indeterminate"};
};

assert.equal(oracle.cases.length, 23);
assert.equal(oracle.aggregation_cases.length, 9);
for (const c of oracle.cases) assert.deepEqual(evaluate(c.facts), c.expected, c.case_id);
for (const c of oracle.aggregation_cases) assert.equal(aggregate(c.operator, c.criteria), c.expected, c.case_id);
for (const guard of ["sensor_fit_is_subjective_comfort","sensor_failure_is_household_need","fit_creates_intent","fit_authorizes_action","simulated_state_is_current_state","average_proves_pointwise_minimum","near_threshold_is_partial_satisfaction","missing_observation_is_failure","action_execution_success_equals_target_fit"]) assert.ok(oracle.must_not_infer.includes(guard), guard);
console.log("TARGET FIT OK", oracle.cases.length, "semantic cases", oracle.aggregation_cases.length, "aggregation cases", oracle.must_not_infer.length, "forbidden inferences");
console.log("MEASUREMENT BOUNDARY OK", "feature, property, procedure, unit, phenomenon time, uncertainty interval, spatial coverage, and epistemic basis remain explicit");
console.log("NO ACTION INFERENCE OK", "fit and experience create no Need, Intent, Task, Authorization, or action");
