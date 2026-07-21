#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=n=>JSON.parse(fs.readFileSync(path.join(here,n),"utf8"));
const shaFile=p=>crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const fail=m=>{throw new Error(m)};
function route(f={}){
  if(f.withdrawn||!f.source_use)return "not_eligible";
  if(f.standing!=="admitted")return f.standing==="not_admitted"?"quarantined":"indeterminate";
  if(f.destination==="household")return f.same_household?"household_candidate_eligible":"not_eligible";
  if(f.destination==="product"){
    if(!f.boundary||!f.training||!f.privacy)return "disclosure_required";
    if(!f.transport||!f.validation||!f.distribution||!f.rollback)return "validation_required";
    return "product_experiment_candidate_eligible";
  }
  if(f.destination==="population"){
    if(!f.boundary||!f.privacy)return "disclosure_required";
    if(!f.frame||!f.denominator||!f.dependence||!f.uncertainty)return "validation_required";
    return "population_study_candidate_eligible";
  }
  if(f.destination==="specification"){
    if(!f.public_source&&!f.boundary)return "disclosure_required";
    if(!f.normative_issue||!f.counterexample||!f.alternatives||!f.compatibility||!f.limits)return "validation_required";
    return "specification_proposal_candidate_eligible";
  }
  return "indeterminate";
}
const oracle=read("learning-cases.json");
if(oracle.cases.length!==36)fail("expected 36 learning cases");
const results=new Set(),forbidden=new Set();
for(const c of oracle.cases){const a=route(c.facts);if(a!==c.expected)fail(`${c.case_id}: expected ${c.expected}, got ${a}`);results.add(a);for(const x of c.must_not_infer)forbidden.add(x)}
for(const x of ["household_candidate_eligible","product_experiment_candidate_eligible","population_study_candidate_eligible","specification_proposal_candidate_eligible","disclosure_required","validation_required","not_eligible","quarantined"])if(!results.has(x))fail(`missing result ${x}`);
for(const x of ["one_household_fact_transfers_to_another","inference_permission_implies_training_permission","product_default_is_household_fact_or_preference","unknown_denominator_supports_prevalence","frequent_behavior_defines_normative_meaning","federated_gradient_is_non_sensitive","global_model_update_mutates_household_state","destinations_form_maturity_ladder","routing_eligibility_grants_action_authority"])if(!forbidden.has(x))fail(`missing boundary ${x}`);
const fixture=read("example-learning-routing-assessment.json");
const sourcePath=path.resolve(here,"../../outcomes/v0.1/example-usage-evidence.json");
if(fixture.sources[0].sha256!==shaFile(sourcePath))fail("source digest mismatch");
if(fixture.destination!=="household_instance_candidate"||fixture.routing_result!=="household_candidate_eligible")fail("fixture scope mismatch");
if(fixture.downstream_status!=="not_started")fail("routing promoted to downstream admission");
if(fixture.permissions.training!=="not_requested"||fixture.permissions.boundary_crossing!=="not_required")fail("local route expanded permissions");
for(const x of ["candidate_admitted","candidate_published","household_fact","rule_activated","product_default","population_support","specification_change","training_permission","model_deployed","household_trust","access","action_authority"])if(!fixture.must_not_infer.includes(x))fail(`fixture boundary missing ${x}`);
console.log(`LEARNING PROMOTION GOVERNANCE OK ${oracle.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("SCOPE ROUTING OK household candidate, product experiment, population study, and specification proposal are siblings, not a maturity ladder");
console.log("PRIVACY AND SCIENCE SEPARATION OK disclosure/training, transport, validation, dependence, distribution, and normative relevance remain distinct");
console.log("LOCAL STATE INTEGRITY OK product/global updates cannot rewrite household facts, rules, Authority, active artifacts, or history");
console.log("NO PROMOTION OR AUTHORITY INFERENCE OK routing eligibility grants no admission, deployment, specification acceptance, training, trust, access, or action authority");
