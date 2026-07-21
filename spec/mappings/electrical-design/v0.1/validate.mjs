import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const audit = JSON.parse(fs.readFileSync(path.join(directory, "boundary-cases.json"), "utf8"));

assert.equal(audit.artifact, "hwm:ElectricalDesignBoundaryCases");
assert.equal(audit.version, "0.1.0");
assert.equal(audit.quantity_roles.length, 9, "Electrical quantity roles were collapsed or expanded without review");
assert.equal(new Set(audit.quantity_roles).size, audit.quantity_roles.length, "Duplicate electrical quantity role");
assert.equal(audit.cases.length, 10, "The electrical boundary audit must retain all ten falsification cases");
assert.equal(new Set(audit.cases.map((item) => item.case_id)).size, audit.cases.length, "Duplicate electrical boundary case");

for (const item of audit.cases) {
  assert.ok(item.facts.length > 0, `${item.case_id} has no facts`);
  assert.ok(item.must_preserve.length > 0, `${item.case_id} preserves no distinction`);
  assert.ok(item.must_not_infer.length > 0, `${item.case_id} has no forbidden inference`);
}

const forbidden = new Set(audit.cases.flatMap((item) => item.must_not_infer));
for (const inference of [
  "circuit_capacity_adequate",
  "maximum_demand_3000_w",
  "design_current_10_a",
  "conductor_ampacity_16_a",
  "installation_verified",
  "code_compliant"
]) {
  assert.ok(forbidden.has(inference), `Missing electrical overload guard: ${inference}`);
}

console.log("ELECTRICAL DESIGN BOUNDARY OK", `${audit.cases.length} cases`, `${audit.quantity_roles.length} quantity roles`, `${forbidden.size} forbidden inferences`);

