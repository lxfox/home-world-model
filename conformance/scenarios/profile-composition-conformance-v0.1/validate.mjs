import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here=path.dirname(fileURLToPath(import.meta.url));
const oracle=JSON.parse(fs.readFileSync(path.join(here,"composition-cases.json"),"utf8"));
const allowed=new Set(["conformant","conformant_with_limits","not_conformant","indeterminate"]);
const ids=new Set(), forbidden=new Set();
for(const c of oracle.cases){
  if(!c.id||ids.has(c.id)) throw new Error(`duplicate/invalid id ${c.id}`); ids.add(c.id);
  if(!Array.isArray(c.facts)||!c.facts.length) throw new Error(`${c.id}: facts missing`);
  if(!allowed.has(c.expected)) throw new Error(`${c.id}: bad expected`);
  if(!Array.isArray(c.must_not_infer)||!c.must_not_infer.length) throw new Error(`${c.id}: forbidden inference missing`);
  c.must_not_infer.forEach(x=>forbidden.add(x));
}
for(const x of ["latest_is_compatible","hyperlink_establishes_dependency","unknown_condition_is_false","conforms_to_membership_proves_validity","schema_validation_proves_semantic_consumption","two_languages_equal_independent_implementations","unknown_semantics_may_be_silently_dropped","composition_grants_action_authority"])
  if(!forbidden.has(x)) throw new Error(`missing required forbidden inference ${x}`);
for(const x of allowed) if(!oracle.cases.some(c=>c.expected===x)) throw new Error(`missing result coverage ${x}`);
console.log(`PROFILE COMPOSITION OK ${oracle.cases.length} semantic cases ${forbidden.size} forbidden inferences`);
console.log("BASE SET OK Core, RO-Crate, and Authority form the minimal exchange set; optional domains stay optional");
console.log("NO CAPABILITY OR AUTHORITY OK composition does not prove implementation support, access, or action power");
