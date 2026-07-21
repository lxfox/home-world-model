import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const audit = JSON.parse(fs.readFileSync(path.join(directory, "boundary-cases.json"), "utf8"));

assert.equal(audit.artifact, "hwm:Iec81346BoundaryCases");
assert.equal(audit.version, "0.1.0");
assert.equal(audit.cases.length, 8, "The IEC boundary audit must retain all eight falsification cases");
assert.equal(new Set(audit.cases.map((item) => item.case_id)).size, audit.cases.length, "Duplicate IEC boundary case");

for (const item of audit.cases) {
  assert.ok(item.facts.length > 0, `${item.case_id} has no input facts`);
  assert.ok(item.must_preserve.length > 0, `${item.case_id} preserves no observable distinction`);
  assert.ok(item.must_not_infer.length > 0, `${item.case_id} has no forbidden inference`);
}

const allForbidden = new Set(audit.cases.flatMap((item) => item.must_not_infer));
for (const inference of [
  "goal_satisfied",
  "realization_binding",
  "compatibility_proved",
  "reference_designation_same_as_serial_id",
  "cardinality_exactly_one"
]) {
  assert.ok(allForbidden.has(inference), `Missing semantic-overload guard: ${inference}`);
}

console.log("IEC 81346 BOUNDARY OK", `${audit.cases.length} cases`, `${allForbidden.size} forbidden inferences`);

