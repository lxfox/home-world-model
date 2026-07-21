#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const read=n=>JSON.parse(fs.readFileSync(path.join(here,n),"utf8"));
const sha=n=>crypto.createHash("sha256").update(fs.readFileSync(path.join(here,n))).digest("hex");
const fail=m=>{throw new Error(m)};

function decide(f={}) {
  if (f.integrity_failure||f.policy_mismatch||f.stale_revision||f.conflict_gap||f.role_gap||f.disposition_integrity_failure||f.undisposed_objection) return {conclusion:"procedurally_invalid",next_step:"repair_procedure"};
  if (f.missing_required_review||f.insufficient_participation||f.insufficient_evidence||f.dependency_pending) return {conclusion:"defer",next_step:"await_inputs"};
  if (f.blocking_unresolved||f.change_required) return {conclusion:"revise",next_step:"new_proposal_revision"};
  if (f.substantive_reject) return {conclusion:"reject",next_step:"close_rejected"};
  return {conclusion:"accept",next_step:"prepare_release_record"};
}

const oracle=read("governance-cases.json");
if(oracle.cases.length!==32) fail("expected 32 governance cases");
const outcomes=new Set(), forbidden=new Set();
for(const c of oracle.cases){const a=decide(c.facts);if(a.conclusion!==c.expected.conclusion||a.next_step!==c.expected.next_step)fail(`${c.case_id}: ${JSON.stringify(a)}`);outcomes.add(a.conclusion);for(const x of c.must_not_infer)forbidden.add(x)}
for(const x of ["accept","revise","reject","defer","procedurally_invalid"])if(!outcomes.has(x))fail(`missing outcome ${x}`);
for(const x of ["silence_is_support","majority_is_consensus","votes_override_interoperability_counterexample","independent_replication_automatically_accepts_proposal","accept_is_publication","publication_is_adoption","decision_grants_action_authority"])if(!forbidden.has(x))fail(`missing boundary ${x}`);

const proposal=read("example-proposal.json"), reviews=read("example-reviews.json"), decision=read("example-decision-record.json");
const proposalSchema=read("change-proposal.schema.json"),reviewSchema=read("review-set.schema.json");if(proposalSchema.$id!=="https://homeworldmodel.org/governance/v0.1/change-proposal.schema.json"||reviewSchema.$id!=="https://homeworldmodel.org/governance/v0.1/review-set.schema.json")fail("proposal/review schema id mismatch");for(const k of proposalSchema.required)if(!(k in proposal))fail(`proposal required field missing ${k}`);for(const k of reviewSchema.required)if(!(k in reviews))fail(`review set required field missing ${k}`);if(!proposal.affected_artifacts.length||new Set(proposal.affected_artifacts).size!==proposal.affected_artifacts.length||proposal.affected_artifacts.some(x=>x.startsWith("/")||x.split("/").includes("..")))fail("proposal affected artifacts invalid");if(!proposal.known_tradeoffs.length)fail("proposal tradeoffs missing");if(!reviews.reviews.length||new Set(reviews.reviews.map(x=>x.review_id)).size!==reviews.reviews.length)fail("review ids invalid");if(!reviews.reviews.every(x=>["support","object","abstain","no_position"].includes(x.position)&&x.reviewer_ref&&x.scope&&x.conflict_disclosure&&x.rationale&&Array.isArray(x.evidence_refs)&&Array.isArray(x.objections)))fail("review record invalid");
if(decision.proposal.sha256!==sha("example-proposal.json"))fail("proposal digest mismatch");
if(decision.review_set_sha256!==sha("example-reviews.json"))fail("review-set digest mismatch");
if(decision.policy.sha256!==sha("README.md"))fail("policy digest mismatch");
if(decision.proposal.proposal_id!==proposal.proposal_id||decision.proposal.revision!==proposal.revision)fail("proposal identity mismatch");
if(reviews.proposal_id!==proposal.proposal_id||reviews.proposal_revision!==proposal.revision)fail("review binding mismatch");
const objections=reviews.reviews.flatMap(r=>r.objections.map(o=>o.objection_id));
const dispositions=decision.objection_dispositions.map(x=>x.objection_id);
if(new Set(objections).size!==objections.length||new Set(dispositions).size!==dispositions.length||objections.sort().join()!=dispositions.sort().join())fail("objection closure mismatch");
if(!reviews.reviews.every(r=>r.conflict_disclosure&&r.rationale))fail("review disclosure incomplete");
if(decision.role_coverage.status!=="satisfied"||!decision.conflict_disclosures_complete)fail("procedure axes incomplete");
if(decision.conclusion!==decide({nonblocking_dissent:true}).conclusion||decision.next_step!=="prepare_release_record")fail("example conclusion mismatch");
if(!decision.dissent_refs.includes("review-dissent-1"))fail("dissent erased");
for(const x of ["community_consensus","standard_adoption","publication","household_trust","access","action_authority"])if(!decision.must_not_infer.includes(x))fail(`decision boundary missing ${x}`);

function releaseGate(f={}){return Object.values(f).some(Boolean)?"not_publishable":"publishable"}
const releaseCases=read("release-cases.json"),releaseOutcomes=new Set(),releaseForbidden=new Set();if(releaseCases.cases.length!==12)fail("expected 12 release cases");for(const c of releaseCases.cases){const outcome=releaseGate(c.facts);if(outcome!==c.expected)fail(`${c.case_id}: ${outcome}`);releaseOutcomes.add(outcome);for(const x of c.must_not_infer)releaseForbidden.add(x)}for(const x of["publishable","not_publishable"])if(!releaseOutcomes.has(x))fail(`missing release outcome ${x}`);for(const x of["accept_is_publication","publication_is_adoption","planned_uri_is_published_uri","signature_reference_is_verified_signature"])if(!releaseForbidden.has(x))fail(`missing release boundary ${x}`);
const releaseSchema=read("release-record.schema.json"),release=read("example-release-record.json"),hex=/^[0-9a-f]{64}$/;if(releaseSchema.$id!=="https://homeworldmodel.org/governance/v0.1/release-record.schema.json")fail("release schema id mismatch");if(!release.decision_bindings.length||!release.decision_bindings.every(x=>x.conclusion==="accept"&&hex.test(x.decision_record_sha256)))fail("release decision binding invalid");if(!hex.test(release.content_manifest.sha256)||!release.content_manifest.entries.length||!release.content_manifest.entries.every(x=>hex.test(x.sha256)&&x.canonical_uri.startsWith("https://")&&!x.path.startsWith("/")&&!x.path.split("/").includes("..")))fail("release content manifest invalid");if(!Object.values(release.checks).every(x=>x.status==="passed"&&x.evidence_refs.length))fail("release checks incomplete");if(release.publisher.role!=="publisher"||!release.publisher.conflict_disclosure)fail("publisher attribution incomplete");const payloadPath=path.join(here,"example-release-payload.json"),payload=read("example-release-payload.json"),signature=release.publisher_signature;if(signature.payload_ref!=="governance/v0.1/example-release-payload.json"||signature.release_payload_sha256!==sha("example-release-payload.json")||signature.verification_status!=="verified"||signature.signer_ref!==release.publisher.actor_ref||signature.algorithm!=="Ed25519"||!crypto.verify(null,fs.readFileSync(payloadPath),signature.public_key_pem,Buffer.from(signature.signature_base64,"base64")))fail("publisher signature invalid");for(const k of["release_id","release_line","decision_bindings","content_manifest","checks","publisher","released_at","limitations","must_not_infer"])if(JSON.stringify(payload[k])!==JSON.stringify(release[k]))fail(`signed payload mismatch ${k}`);if(!release.publication_receipts.length||!release.publication_receipts.every(x=>x.public_uri.startsWith("https://")&&x.content_manifest_sha256===release.content_manifest.sha256))fail("publication receipt binding invalid");for(const x of["truth","community_consensus","standard_adoption","external_adoption","household_trust","access","action_authority"])if(!release.must_not_infer.includes(x))fail(`release boundary missing ${x}`);
const chainAdoption=read("example-governance-chain-adoption-declaration.json");if(release.decision_bindings.length!==1||release.decision_bindings[0].decision_id!==decision.decision_id||release.decision_bindings[0].decision_record_sha256!==sha("example-decision-record.json"))fail("decision-to-release digest chain broken");if(chainAdoption.kind!=="adoption_declaration"||chainAdoption.release.release_id!==release.release_id||chainAdoption.release.sha256!==sha("example-release-record.json"))fail("release-to-adoption digest chain broken");if(chainAdoption.issuer_ref===release.publisher.actor_ref)fail("fixture must not collapse publisher and adopter roles");for(const x of["external_adoption","community_consensus","household_trust","access","action_authority"])if(!chainAdoption.must_not_infer.includes(x))fail(`chain adoption boundary missing ${x}`);

console.log(`SPECIFICATION GOVERNANCE OK ${oracle.cases.length} cases ${forbidden.size} forbidden inferences`);
console.log("FIVE RECORD CONTRACTS OK proposal, review, decision, release and adoption remain separately typed and content-bound");
console.log("OBJECTION CLOSURE OK every frozen objection has one disposition; blocking objections cannot be outvoted");
console.log("DISSENT PRESERVATION OK accept may retain attributed non-blocking dissent without claiming unanimity or consensus");
console.log(`RELEASE GATE OK ${releaseCases.cases.length} cases require accepted decision digests, exact content, four passed checks, publisher disclosure, verified signature and observed publication receipt`);
console.log("RELEASE RECORD FIXTURE OK exact payload bytes pass Ed25519 verification; content manifest and HTTPS receipt share digest bindings");
console.log("END-TO-END GOVERNANCE CHAIN OK proposal -> review -> decision -> release -> adoption is exact-digest bound without collapsing record effects");
console.log("RECORD SEPARATION OK decision authorizes release preparation only; publication and adoption require separate records");
console.log("NO TRUTH OR AUTHORITY INFERENCE OK valid project procedure grants no universal legitimacy, household trust, access, or action authority");
