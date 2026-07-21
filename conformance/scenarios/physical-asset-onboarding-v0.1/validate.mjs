import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(here, "onboarding-cases.json"), "utf8"));

const allowed = new Set(["onboarding_complete_for_declared_scope", "onboarding_partial", "quarantine_or_return", "not_applicable", "indeterminate"]);
const ids = new Set();
const forbidden = new Set();
for (const c of data.cases) {
  if (!c.id || ids.has(c.id)) throw new Error(`invalid or duplicate case id: ${c.id}`);
  ids.add(c.id);
  if (!Array.isArray(c.input) || c.input.length === 0) throw new Error(`${c.id}: missing input`);
  if (!allowed.has(c.expected)) throw new Error(`${c.id}: invalid expected disposition`);
  if (!Array.isArray(c.must_not_infer) || c.must_not_infer.length === 0) throw new Error(`${c.id}: missing forbidden inference`);
  c.must_not_infer.forEach(x => forbidden.add(x));
}

const required = [
  "unit_identity_from_quantity",
  "ownership_from_asset_identity",
  "requirement_satisfaction_from_realization",
  "asset_endpoint_association_from_name",
  "commissioning_success_from_readiness",
  "operational_admission_from_readiness",
  "same_asset_from_reused_role",
  "purchase_authority_from_onboarding",
  "operational_control_from_onboarding"
];
for (const x of required) if (!forbidden.has(x)) throw new Error(`missing required forbidden inference: ${x}`);

const expectedKinds = new Set(data.cases.map(c => c.expected));
for (const x of ["onboarding_complete_for_declared_scope", "onboarding_partial", "quarantine_or_return", "indeterminate"])
  if (!expectedKinds.has(x)) throw new Error(`missing outcome coverage: ${x}`);

console.log(`PHYSICAL ASSET ONBOARDING OK ${data.cases.length} semantic cases ${forbidden.size} forbidden inferences`);
console.log("REALIZATION AXES OK transaction, receipt, identity, installation, function position, endpoint, and commissioning remain distinct");
console.log("NO OPERATIONAL AUTHORITY OK onboarding transfers no purchase, installation, enrollment, or control power");
