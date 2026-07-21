# ADR-049: Plan readiness from Forecast without acting on prediction

- Status: Proposed
- Date: 2026-07-19

## Context

Homes benefit from preparing hot water, temperature, air quality, charging, or lighting before anticipated demand. A Forecast-driven automation conflates predicted activity, household commitment, readiness target, start time, tradeoffs, and action authority. Forecasts also move or disappear after physical preparation begins.

## Options

1. Trigger device actions when Forecast probability crosses a threshold.
2. Treat anticipation as an ordinary fixed schedule.
3. Materialize a readiness objective and bounded preparation-window Plan, assess it under an accepted policy, and retain all downstream action gates.

## Decision

Adopt option 3 as the Anticipatory Readiness Planning Profile. Demand/Forecast, system response, and hold/decay windows remain distinct. Plans declare earliest/latest start, uncertainty, checkpoints, stop/no-return conditions, false-positive/negative consequences, resources, reversibility, cancellation, compensation, and expiry.

The result is planning eligibility only. Forecast changes affect prospective Plans/Proposals and never erase Attempts or residual effects. Readiness success and activity realization are evaluated independently.

## Reason

This preserves useful anticipation without giving a prediction implicit control authority or imposing one probability/utility policy on every household.

## Consequences

- Households explicitly govern comfort-versus-waste tradeoffs.
- Response and decay models become first-class dependencies.
- Cancellation and compensation require realistic physical semantics.
- Routine and action governance remain intact.

Chinese mirror: [`ADR-049-plan-readiness-from-forecast-without-acting-on-prediction.zh-CN.md`](ADR-049-plan-readiness-from-forecast-without-acting-on-prediction.zh-CN.md).
