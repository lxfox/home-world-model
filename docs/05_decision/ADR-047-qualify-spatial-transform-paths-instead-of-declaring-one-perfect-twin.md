# ADR-047: Qualify spatial transform paths instead of declaring one perfect twin

- Status: Proposed
- Date: 2026-07-19

## Context

Household geometry arrives from BIM, drawings, phones, cameras, robots, devices, and topology models. Coordinates without frame semantics and uncertainty cannot be combined safely. Requiring one canonical global frame would hide revisions, calibration drift, local accuracy, renovation, and purposes that need only topology.

## Options

1. Normalize all geometry into one household coordinate system.
2. Let each Agent privately interpret and transform coordinates.
3. Exchange immutable Frame Definitions and evidence-bound Registrations, then qualify an explicit transform path against purpose tolerance.

## Decision

Adopt option 3 as the Spatial Registration and Localization Profile. Every metric location/pose binds exact frame revision, axes, units, scale, time, entity, method, and uncertainty. Registrations declare direction, transform type, correspondences, domain, validity, residuals, and uncertainty. A Spatial Use Assessment propagates uncertainty over the complete path and compares it with the exact use contract.

No frame or shortest/latest path is globally canonical. Topological and metric assertions remain distinct. Cycle inconsistency fails closed. Movement, AR reset, renovation, and frame identity changes append new artifacts without rewriting historical poses.

## Reason

This permits progressively constructed household spatial models: a room-level topology can support early planning, while calibrated metric poses can later support simulation and installation. Different Agents can reproduce fitness decisions without sharing one geometry engine.

## Consequences

- Spatial data carries more metadata and explicit uncertainty.
- Applications can degrade from pose to topology only when the use contract allows it.
- Calibration and anchor lifecycle become auditable dependencies.
- Spatial qualification remains separate from identity, performance, compliance, safety, and action.

Chinese mirror: [`ADR-047-qualify-spatial-transform-paths-instead-of-declaring-one-perfect-twin.zh-CN.md`](ADR-047-qualify-spatial-transform-paths-instead-of-declaring-one-perfect-twin.zh-CN.md).
