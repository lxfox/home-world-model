# HWM Spatial Registration and Localization Profile v0.1

- Status: Profile Discussion Candidate
- Version: 0.1.0
- Date: 2026-07-19
- Normative language: English
- Chinese mirror: [`README.zh-CN.md`](README.zh-CN.md)
- Schemas: [`spatial-frame-definition.schema.json`](spatial-frame-definition.schema.json), [`spatial-registration.schema.json`](spatial-registration.schema.json), [`spatial-use-assessment.schema.json`](spatial-use-assessment.schema.json)

## Purpose

This optional Profile lets Agents exchange and qualify spatial location/pose across BIM/IFC models, floor plans, phone AR sessions, camera frames, robot maps, device-local coordinates, and household topology without requiring one perfect global digital twin.

The normative chain is:

`typed entity identity + source-frame location/pose Claim + immutable Frame Definitions + evidence-bound Registrations + purpose tolerance and time -> Spatial Use Assessment -> qualified transformed location/pose candidate`

Coordinates are not meaningful without a frame, units, time, and uncertainty.

## Spatial Frame Definition

A Definition binds frame identity and revision, household/representation scope, frame kind, origin and anchor EntityRefs, axis order and direction, handedness, angular convention, linear/angular units, scale semantics, dimensionality, validity interval, creation method/Record, provenance, and proof.

Frame kinds may include `building_model`, `floor_plan`, `phone_ar_session`, `camera`, `robot_map`, `device_local`, `room_local`, and `geodetic`. A local household frame is fully valid for a bounded purpose. Geodetic coordinates are optional and do not make a frame more truthful. Frame revision is not silently the same frame when its identity basis, axes, origin, scale, or anchor changes.

## Location and pose input

A location/pose Claim binds exact entity identity, frame Definition, phenomenon time or interval, position/geometry, orientation where relevant, dimensionality, units, uncertainty representation, motion/static assumption, epistemic basis, method, Evidence Origin, and coverage. A point, bounding volume, surface, topology relation, and occupancy probability are different spatial assertions.

`inside room`, `near wall`, metric point position, and six-degree-of-freedom pose are not interchangeable. A topological assertion may be sufficient when metric precision is unnecessary. A sensor's location is not automatically the observed person's, pet's, phenomenon's, or measurement zone's location.

## Spatial Registration

An immutable Registration binds exact source and target Frame revisions, direction, transformation method and parameters or executable procedure, control-point/entity correspondences, [identity alignments](../../entity-identity-alignment/v0.1/README.md), evidence, fitting residuals, uncertainty/covariance or declared bounds, applicability domain, validity interval, calibration status, validation method, and proof.

Transform direction is explicit; inverse availability is not assumed. Rigid, similarity, affine, piecewise, non-rigid, topological, and learned transformations have distinct semantics. A visual alignment or low residual does not prove correct correspondences, scale, handedness, or out-of-domain behavior.

## Spatial Use Assessment

The Assessment binds one source assertion, target frame or topology, exact Registration path, purpose, target time, required dimensions, tolerance/clearance, uncertainty policy, topology constraints, and dependency closure. It verifies:

- entity and representation identity;
- frame revision, units, axes, handedness, scale, and time alignment;
- registration direction, path continuity, calibration/validation, and domain;
- control-point standing and independence;
- cycle-consistency where alternative paths exist;
- uncertainty propagation through every transform and source assertion;
- motion, occlusion, deformation, renovation, and anchor drift; and
- whether the resulting uncertainty fits the purpose tolerance.

The result is `qualified`, `qualified_with_limits`, `not_qualified`, or `indeterminate`. It returns transformed geometry/pose only when policy permits, together with the resulting uncertainty and limitations. A valid transform graph with excessive uncertainty is not qualified for the requested use.

## Change and graph behavior

No frame is globally canonical by default. Registrations form a versioned graph. A path is chosen by declared policy and fitness, not shortest edge count or latest timestamp alone. Inconsistent cycles remain contested/indeterminate; they are not averaged silently. Multiple valid paths may coexist for different domains and tolerances.

Moving a camera, replacing a sensor, resetting AR tracking, changing BIM origin/scale, renovating a wall, splitting/merging a Space, or discovering anchor error creates new Definitions, Registrations, Claims, or Assessments as applicable. Prior results remain historical. [Change Impact Revalidation](../../change-impact-revalidation/v0.1/README.md) follows declared geometry/identity dependencies rather than invalidating every household artifact.

## Downstream use

An [Installed Influence Model](../../installed-influence-model/v0.1/README.md), planning simulation, clearance check, sensor coverage model, or Action Proposal binds the exact Spatial Use Assessment or source/registration closure it relies on. Spatial qualification does not prove device identity, installation quality, photometric performance, code compliance, presence, causality, or action safety.

## Invariants

1. Space, spatial representation, frame, coordinates, geometry, topology, location Claim, Registration, and use qualification remain distinct.
2. Every metric coordinate/pose binds exact frame revision, axes, units, time, entity, method, and uncertainty.
3. Frame identifiers and equal numeric coordinates do not prove equal physical location.
4. Transform direction, type, domain, time, and uncertainty are explicit.
5. Registrations require admitted correspondences; geometric fit alone does not prove semantic alignment.
6. Uncertainty propagates through the complete path and is compared with purpose tolerance.
7. Topological and metric localization are not silently interchangeable.
8. Sensor location does not imply phenomenon or subject location.
9. No frame or shortest/latest path is universally canonical.
10. Cycle inconsistency, missing path, stale calibration, or out-of-domain use remains indeterminate/not-qualified.
11. Renovation and movement append new spatial artifacts and never rewrite historical poses.
12. Spatial qualification grants no identity, occupancy, requirement satisfaction, compliance, safety, or action authority.

## Conformance

The [Spatial Registration and Localization oracle](../../../../conformance/scenarios/spatial-registration-localization-v0.1/README.md) tests frames, units, axes, transform paths, direction, temporal alignment, uncertainty propagation, topology, cycle conflict, motion, renovation, and forbidden downstream inference.

```sh
node conformance/scenarios/spatial-registration-localization-v0.1/validate.mjs
python3 conformance/readers/python/reference_reader.py
```

## Non-goals

This Profile does not define a geometry kernel, SLAM algorithm, BIM format, global coordinate authority, surveying standard, AR runtime, computer-vision model, spatial database, collision engine, or universal accuracy threshold.
