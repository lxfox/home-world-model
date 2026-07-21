# Home World Model Thesis v0.1

- Status: Explanatory discussion thesis
- Date: 2026-07-19
- Canonical language: English
- Chinese mirror: [`model-thesis-v0.1.zh-CN.md`](model-thesis-v0.1.zh-CN.md)
- Normative authority: none; follow the exact Core, Profile and Conformance Set documents

## The claim

The public foundation of household intelligence should not be one Agent's memory or only a device connection graph. It should be a household-controlled, portable knowledge history that different authorized Agents can read and challenge: what is claimed, on what evidence, for whom and when it applies, whether action is permitted, and what actually happened afterward.

We call the smallest architecture for that history a **Home World Model (HWM)**.

## Why connectivity is not enough

Matter, KNX, Home Assistant and Web of Things can identify endpoints, expose capabilities and carry commands. BIM, IFC, BOT and Brick can describe buildings and topology. SOSA/SSN can describe observations. PROV-O can describe provenance. These are foundations HWM should reuse, not replace.

The remaining problem appears when an Agent must cross their boundaries. A lamp can report `on` while the reading surface remains too dark. A product can claim 800 lumens while an installed room behaves differently. A camera model can propose that a person entered a space without proving identity, intent or permission to act. A device acknowledgement can arrive without a physical effect. A later correction must not disappear when the Agent or platform is replaced.

The missing shared object is therefore not another universal device protocol. It is the accountable continuity of household knowledge and decisions across design, construction, commissioning, operation, replacement and migration.

## The normal form

HWM's conceptual kernel is:

`H = (EntityRef, Claim, Record | Authority)`

- **EntityRef** is a stable handle, not proof of identity.
- **Claim** is an immutable, attributed proposition with scope, time and epistemic basis.
- **Record** is an immutable description of an observation, action, attestation, authorization, revision or deletion; it is not the physical occurrence itself.
- **Authority** is the governance context for visibility, evidence use, resolution and action. It is not ordinary household data and cannot be self-created by an Agent.

Three behavioral contracts make the kernel useful between Agents: Claim Envelope exchanges Claims and later Evidence Links; World View resolves authorized knowledge for one requester, purpose and time; Action Trace keeps authorization, dispatch, acknowledgement, observation, effect, goal, resource use and household acceptance separate. RO-Crate supplies the package binding.

Seven rules hold the model together: **referential humility**, **append-only history**, **typed non-transmutation**, **bounded resolution**, **separated action outcomes**, **exact optional composition**, and **governed evolution**. In plain language: identifiers remain humble; history is appended; derivations do not silently change type; resolution is purpose/time/Authority-bound; action outcomes stay separate; optional semantics enter through exact Profile composition; and specification evolution remains distinct from evidence, publication and adoption.

## The household loop

The model closes this loop without manufacturing truth:

`world occurrence → Record → bounded evidence decisions → Claim and Evidence Links → World View → Proposal → Authorization → Attempt and reports → Action Trace → appended correction or learning artifacts`

Each arrow may filter, aggregate or derive. Each result is a new attributed artifact with the bindings and limitations appropriate to that layer. A signature is not truth; admitted evidence is not sufficient evidence; an accepted View is not global truth; a Proposal is not permission; permission is not physical safety; acknowledgement is not observation; effect consistency is not goal satisfaction; and goal satisfaction is not household acceptance.

This is the central interoperability promise: two Agents may reason differently internally, but neither may erase these observable distinctions.

## Three-dimensional homes and learned effects

A three-dimensional representation is important, but it begins as a view or artifact—not as the house itself. Drawings, BIM, phone scans, visual localization and user annotations can contribute spatial Claims tied to coordinate frames, registrations, time, procedure and uncertainty. An Agent may ask a bounded interactive question to confirm a visible relation. Confirmation strengthens only the exact proposition asked; it does not prove every coordinate, object identity or future condition.

The same rule applies to device influence. Manufacturer declarations, simulations, analogous installations and commissioning measurements remain different evidence bases. Installed response models can describe how a light, blind, HVAC unit or circulation system affected a bounded feature under recorded conditions. Multiple devices require explicit interaction models; effects are not assumed to add linearly. A learned local model remains versioned, purpose-qualified and revisable.

Thus the project does not choose between a digital twin and lived evidence. It lets several representations coexist and records when each is fit for one decision.

## People, pets and time

People, pets, activities, presence and routines are not universal Core classes that give an Agent permission to profile a household. They can be represented with external vocabularies, EntityRefs, scoped Claims and optional Profiles. A visual track is not a person. One detected subject does not close household occupancy. A pattern is not an Intent. A Forecast is not a trigger. A Routine is an Authority-activated task-instantiation policy, not a learned habit that acts by itself.

This still permits useful anticipation. An Agent may prepare a bounded Plan for hot-water circulation, HVAC or lighting from a qualified Forecast, response latency, decay, resource constraints and false-positive/false-negative policy. The Plan remains cancellable and separately authorized; prediction never receives implicit control power.

## Renovation and procurement

Before construction, the same model can connect household targets to design alternatives without pretending certainty. “Bright enough” remains the household target. An operationalization proposal makes measurement criteria, omissions, procedures and reviewers explicit. Product declarations and simulations become qualified predictions, not installed facts. Options can be compared as feasible, dominated, non-dominated or incomparable without a hidden household utility score.

Commercial offers are time-, region-, variant- and bundle-bound snapshots. Product model, offer, order, delivered physical asset, installed asset, endpoint and commissioned function position remain different identities. A shopping Agent may present candidates, but selection, purchase, installation acceptance and action authorization remain separate.

## What is actually open

HWM is not one monolithic ontology. It is a small Base Exchange and optional, exactly versioned Profiles. A package or Agent must name the Conformance Set, versions, semantic roles and evidence it supports. Unsupported optional semantics may be preserved opaquely or refused according to the set; they are never silently discarded or treated as understood.

The model's normal form gives optional work eight places to attach: refer/align, capture/admit, resolve/project, deliberate/plan, authorize/coordinate, attempt/assess, package/negotiate and evolve/revalidate. A successful Profile may remain optional forever. Popularity, implementation count or adoption does not promote it into Core.

## What would falsify or change this thesis

The thesis must change if an exact, recurring distinction cannot be represented through external standards, `EntityRef + Claim + Record + Authority`, existing contracts, an optional Profile, composition, an adapter, empirical validation or governance—and if leaving it out causes conforming Base implementations to exchange the same bytes with materially incompatible meaning.

Even then, a counterexample only creates a Core candidate. Acceptance, publication, independent implementation evidence and external adoption remain separate. Conversely, a new scenario that cannot fit the seven rules or eight extension positions reopens the explanatory normal form; it must not be force-fit merely to preserve elegant numbers.

Current project tests are project-owned. They show internal executable consistency, not community consensus, production security, real-household validity or independent interoperability. External disagreement is evidence to retain and classify, not a score to defeat.

## The proposed common ground

The proposed consensus is deliberately smaller than agreement on one Agent, ontology, database, home-automation platform or perfect digital twin:

1. Household knowledge should survive replacement of devices, platforms and Agents.
2. Claims, evidence, resolution, authorization and outcomes should remain distinguishable and attributable.
3. Existing standards should provide domain meaning wherever they already can.
4. Household disclosure and action remain purpose- and Authority-bound.
5. Models and predictions are useful only with visible applicability and uncertainty.
6. Optional innovation should compose without silently enlarging the shared Base.
7. The specification should be falsifiable, subtractable and corrigible without rewriting history.

If different ecosystems can agree on that ground, they do not need to agree on how an LLM reasons inside. They only need to preserve what the household can later inspect, transfer, contest and correct.
