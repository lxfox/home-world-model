---
version: v0.1
date: 2026-07-24
language: en
status: approved_public_source
canonical: true
translation_mirror: narrative-v0.1.zh-CN.md
license: CC-BY-4.0
---
# From connected devices to a home understood

> Open Home World Model narrative candidate v0.1  
> Status: Approved public narrative source  
> Date: 2026-07-24

This is an early public discussion, not a finished standard or product.

It begins with a question for households, developers, designers, device makers,
integrators, and researchers:

> What must an Agent know to truly understand a home?

## 1. Why today’s smart home still does not understand the home

Over the past decade, smart-home systems have solved many connection and control
problems. Lights, blinds, HVAC systems, locks, cameras, and sensors can be
networked and controlled through apps, voice interfaces, and automation rules.
Matter, KNX, Home Assistant, and other ecosystems continue to improve how
devices interoperate.

These advances have given homes more devices that software can control.
Connected does not mean understood.

Most systems know devices and their states. They may know that a lamp is on,
that an air conditioner is set to 26°C, or that a contact sensor is open. They
rarely know what those states mean in one particular home.

A system may know that a lamp belongs to the living room without knowing where
it is installed, which direction it faces, which surfaces it illuminates, or
whether the person reading on the sofa has enough light. It may detect motion
without knowing whether the source is a family member, a visitor, or a pet—or
whether that subject is passing through, resting, or preparing for an activity.
It may start hot-water circulation at 10 p.m. without knowing whether anyone is
home, who may be preparing to bathe, or how far in advance preparation is useful.

In many existing systems, space is a grouping label, a device is a callable
capability, a person is reduced to home or away, and time is only a trigger.
Real homes are not a simple collection of those isolated elements. They are
changing spatial, physical, social, and temporal worlds.

Rooms connect to one another. Light, heat, sound, air, and radio signals travel
through space. Device position, orientation, installation, and power change
real effects. Family members and pets have different roles, states, preferences,
and permissions. Time represents not only a clock value but life stages such as
waking, leaving, returning, eating, bathing, resting, traveling, or handling an
exception.

Traditional automation often bypasses understanding and links a signal directly
to an action: if A happens, do B. That can serve fixed tasks, but it becomes
fragile when habits change, furniture moves, devices are replaced, evidence is
missing, or several conditions conflict.

Language models and Agents create new possibilities. They can understand
natural language, decompose tasks, call tools, and propose what a user may want.
But stronger language ability does not automatically create spatial, physical,
social, temporal, or evidential understanding.

If an Agent does not know the structure of the home, the installed position and
actual influence of a device, the state of relevant people, or whether its
belief comes from observation or inference, it is still operating a device
system without sufficient context. As Agents become proactive, that gap becomes
a safety and accountability problem.

Understanding must also begin before move-in. While a new home is still being
designed, decisions about circuits, controls, networking, sensing, installation
positions, and replaceability already shape what future intelligence can do.

The central question is therefore no longer only how to connect more devices or
let an Agent call them. It is how an Agent can form a verifiable, correctable
understanding of a home before participating in its design, construction, and
long-term life.

## 2. What kind of world is a home?

A home is first a spatial world. It contains rooms, corridors, walls, openings,
furniture, and functional zones. These have relationships of connection,
distance, direction, containment, and obstruction. Devices, people, pets, and
environmental changes all occur within this space.

“Living room” is not only a name. It has shape, dimensions, orientation,
materials, openings, and use areas. Daylight enters from a direction; sound
travels to adjacent rooms; airflow is changed by doors and furniture; a person
at a sofa, table, or passage may need different lighting, temperature, or quiet.

An Agent needs more than one floor plan. It needs a spatial foundation that can
hold entities, relationships, coordinate frames, registrations, uncertainty,
and change. Drawings, BIM, design models, user annotations, phone cameras,
spatial scans, and site measurements may all contribute. None must be treated as
the house itself. Each is a representation with provenance, time, procedure,
and a bounded fitness for use.

A home is also a physical world. A light may illuminate a task surface or create
glare. HVAC changes temperature, but the result depends on room volume, openings,
occupancy, furniture, and outdoor conditions. Blinds affect daylight, privacy,
and heat gain. Speakers produce sound; purifiers affect air; wireless equipment
creates coverage that varies with material space.

A device action does not merely change a state value. It produces—or fails to
produce—effects in the real environment. Device understanding must therefore
extend beyond supported commands to installed position, installation method,
reachable influence, operating conditions, uncertainty, and whether the
observed result satisfies a household target.

Manufacturer declarations can provide a starting point. Simulation can provide
a qualified prediction. Phone measurements, sensors, professional instruments,
and human feedback can calibrate installed effects. These evidence bases remain
distinct; a product specification must not silently become an installed fact.

A home is a world with living participants. Family members, pets, visitors, and
service workers are not ordinary device entities. They have identities, roles,
states, preferences, privacy interests, and authority boundaries. The same
person may have different needs while sleeping, working, exercising, resting,
or recovering.

Motion in a bedroom may be an observation. Identifying a particular person is a
different claim. Inferring that they intend to sleep is another. Predicting that
the light should dim is still another, and none of these grants permission to
act. A responsible Agent must distinguish what it observed, what was identified,
what was accepted for a purpose, what it inferred, what it predicts, and what
remains unknown.

A home is also temporal. Time includes clock values, valid intervals, freshness,
life stages, routines, exceptions, and anticipated events. These must not be
collapsed into one global `home`, `away`, `sleep`, or `guest` mode. One person
may be asleep while another works, a visitor remains, a pet moves, a quiet-hours
policy applies, and an alarm is incorrectly set. These are different claims with
different subjects, spaces, sources, and times.

Absence of a detection is not proof that a home is empty. A denied camera, an
offline sensor, and no recent event are not equivalent. A habit is not an
Intent. A Forecast is not a trigger. A Routine is not permission to perform a
device action. An Agent may use qualified knowledge to prepare a proposal or
plan, but each later transition remains separately governed.

A home is continually built and changed. It may begin as drawings, design
options, and household expectations. Construction adds circuits, networks,
lighting, HVAC, sensors, and substitutions. Commissioning tests assumptions
against reality. Later, furniture moves, rooms change use, devices are replaced,
people grow older, and household practices evolve.

The model should therefore preserve design intent, construction reality,
selection rationale, commissioning measurements, operational deviations, and
later corrections—not only the current device state.

An Agent is not an all-knowing manager of this world. It is one participant. It
observes through drawings, sensors, devices, household statements, and history;
forms attributed assessments; proposes options; acts only under applicable
authority; and then checks reports, observations, physical effects, and household
acceptance without collapsing them into one success flag.

A truly home-aware Agent is not one that is always right. It is one that knows
it may be wrong, can explain the basis and limits of its conclusions, and can
accept correction without rewriting history.

## 3. Principles for an open home world

These principles are a starting point for public discussion, not a completed
specification.

### 1. The home model belongs to the household

Whether information is entered by a person, produced by a device, proposed by an
Agent, or delivered by a professional, the household should be able to inspect,
export, correct, delete, and migrate it subject to legitimate rights and safety
constraints. A service may help operate the model but should not lock the home
into a proprietary account, format, or ecosystem.

### 2. A home should outlast devices, platforms, and AI models

The model should remain independent of one device, protocol, automation
platform, or model provider. Devices may be replaced, platforms migrated, and
Agents changed without erasing spatial knowledge, measurements, installation
history, accepted preferences, or the lineage of ongoing work.

### 3. Household effects matter more than device commands

People care whether a reading area is bright enough, a bedroom is comfortable,
hot water is ready, or a passage is safe—not only whether a command was sent or
acknowledged. Authorization, dispatch, acknowledgement, observation, physical
effect, target satisfaction, resource use, and household acceptance must remain
separate.

### 4. Facts, inferences, and predictions must remain distinguishable

The model should preserve source, time, scope, epistemic basis, and derivation.
An Agent must not present its inference as an observed fact. Acceptance for one
purpose and time is not a permanent global truth, and correction should append a
new attributed artifact rather than erase what was previously relied on.

### 5. Proactive service must be bounded by authority

Understanding does not grant a right to act. Actions involving safety, privacy,
health, money, shared resources, or irreversible consequences require
appropriate authority and procedure. An Agent should state its reason, evidence,
expected effect, uncertainty, and available means to prevent, reverse, or
recover.

### 6. Privacy is structural

The household should know what is collected, where it is processed, who can use
it, for which purpose, and when it is deleted. Local processing should be
preferred where proportionate. External disclosure should be purpose-bound and
limited to what the exact task requires.

### 7. The model must admit incompleteness, uncertainty, and correction

Drawings differ from sites, product information is incomplete, sensors fail,
identification can be wrong, and preferences change. The model should preserve
unknown, contested, stale, and insufficient states instead of manufacturing
completeness.

### 8. Design, construction, commissioning, and operation should share continuity

Spatial and household requirements formed during design can inform electrical,
network, sensing, and device plans. Construction results update those plans.
Commissioning calibrates predicted effects. Lived feedback then corrects earlier
assumptions through the same household-controlled history.

### 9. The model should collaborate with existing ecosystems

Matter, KNX, Zigbee, Thread, and other technologies address connectivity;
Home Assistant and similar platforms integrate devices and automation; BIM,
IFC, Brick, W3C Web of Things, SOSA/SSN, and PROV-O address buildings,
capabilities, observations, and provenance. HWM should reuse and map to this
work. It is not a replacement for Matter, KNX, or Home Assistant.

### 10. Real homes and repeatable implementations must test the proposal

Concepts should survive household cases, professional constraints, independent
implementations, and repeatable tests. Project-owned tests show internal
consistency; they do not establish community consensus, production security,
real-household validity, interoperability, or adoption.

## 4. How a home gains its own understanding

Imagine a family preparing a home that has not yet been completed. Two adults,
a child, and a cat will live there; an older relative sometimes stays. They do
not begin with protocol names or product SKUs. They begin with how they want to
live: gentle light at night, stable temperature while working, fewer false
triggers from the cat, clear physical controls for visitors, and basic operation
when the network is unavailable.

These household targets are the beginning of intelligence. An Agent may help
turn them into candidate requirements, expose conflicts and omissions, and
propose measurable criteria. It must not treat one sentence, a repeated habit,
or a plausible inference as an adopted household commitment.

The family provides drawings, design options, site photographs, budget,
privacy boundaries, offline requirements, and future plans. The Agent helps
identify decisions that become expensive to change after construction: neutral
wires, circuit boundaries, blind and ceiling power, Ethernet and PoE, wireless
coverage, sensor positions, HVAC and ventilation interfaces, equipment spaces,
backup power, and dependable physical controls.

The Agent can provide options, conflict checks, and rationale. Formal electrical
design, code compliance, review, construction, and acceptance remain the work
of qualified people under applicable rules.

When comparing devices, the Agent returns each candidate to the actual home:
whether supply and installation conditions are satisfied; whether it depends on
a cloud or gateway; what influence is predicted from the intended position;
whether it may meet the household target; and whether a replaceable path exists.
Product model, offer, order, delivered asset, installed asset, endpoint, and
commissioned function remain different identities.

As construction proceeds, actual routes, installed positions, substitutions,
reasons, and known impacts enter the household record. Information that once
disappeared with the end of a project can become part of the home’s durable
history.

After installation, the household may use phones, cameras, sensors, or
professional instruments to measure performance under different daylight,
blind, power, occupancy, and environmental conditions. Results are mapped back
to space and used to calibrate lighting, temperature, air, sound, energy, or
coverage models.

Commissioning is no longer only “the device is online and the button works.” It
asks whether the original household target is met, under which conditions, with
which uncertainty and remaining exceptions.

After move-in, an authorized Agent continues to learn from observation and
feedback without turning patterns into commands. It distinguishes facts,
identifications, inferences, predictions, proposals, and permissions. According
to purpose and risk, it may wait, ask a bounded question, prepare a reversible
plan, or act under explicit authority.

Every action creates another opportunity to observe and correct. A household
member can say: this was an exception; that identity was wrong; the preference
changed; do not act proactively in this space; next time ask first. Corrections
are appended with their own provenance rather than silently rewriting the past.

Years later, rooms, family members, pets, devices, and Agent services may have
changed. The household can still retain spatial relationships, measurements,
constraints, installation records, permissions, and accepted preferences.
Replacement devices can be remapped; a new Agent can read a purpose-bound view
after admission; a new platform can continue to pursue household effects.

The household should not have to explain itself again whenever technology
changes.

This is not a story about an omnipotent AI but about how a home can gradually
gain a structured, household-owned understanding that begins with drawings,
absorbs construction and commissioning reality, and remains open to correction
through long-term life.

## 5. Why this must be an open collaboration

No single company can define every home. Housing, electrical practice, climate,
culture, accessibility, family structure, and device ecosystems differ across
regions and households.

Device makers understand products but not every household. AI companies
understand language and inference but may not understand architecture,
electrical work, lighting, HVAC, or site delivery. Designers understand space
and experience but may lack operational device evidence. Integrators know what
happens in the field, but that knowledge is often fragmented. Households know
their own lives, but lack tools to express that knowledge in portable,
machine-readable form.

A useful Home World Model requires these groups to work together.

This is not a completed standard. The proposal begins with a smaller claim:

> The next smart home must not merely give Agents more device control. It must
> give the household a verifiable, correctable understanding that it owns.

Many questions remain open: appropriate spatial precision; representation of
installed influence; the minimum necessary information about people and pets;
how Agents share knowledge without excessive disclosure; which semantics belong
in a shared Base; and which should remain optional Profiles or external
vocabularies.

Open collaboration means more than publishing code. A household can contribute
a lived case. A designer can test spatial expression. An engineer can challenge
installation assumptions. A device maker can provide qualified capability and
installation evidence. A platform developer can build mappings. Privacy and
safety researchers can reject unjustified assumptions. Regional contributors
can expose local differences.

A lighting influence model, a failed device replacement, a renovation
constraint, a privacy objection, or a household correction may reveal more than
another feature.

Disagreement is useful evidence. It should be retained, classified, and used to
test the proposal rather than treated as a score the project must defeat.

The current boundary is deliberate. HWM does not invent a new device
communication protocol, replace Matter, KNX, or Home Assistant, mandate how
households live, create a single-company home cloud, grant action power without
authority, or make one LLM or Agent framework part of the standard.

The goal is not to control homes. It is to let households own, inspect, transfer,
contest, and correct what their homes know about themselves.

## 6. An invitation to define the foundation together

The smart-home industry already has more devices, better connectivity, stronger
models, and more natural interfaces. The next step may be a shared understanding
of the home itself.

That understanding should begin while the home is still a drawing, gain reality
during construction and commissioning, remain accountable in daily life, and
survive replacement of devices, platforms, and AI models.

It may become an open foundation through which households preserve digital
continuity; Agents understand context before acting; design and operation remain
connected; devices are understood by installed effects rather than only feature
claims; and different ecosystems can collaborate around the same home while
respecting purpose, privacy, and authority.

We do not yet have the complete answer.

But as Agents begin to enter homes, an open model of the home itself should no
longer be missing.

This is not a product launch.

It is an invitation to define the next foundation of the smart home together.
