# ADR-005 — The environment stage is an explicit input to every metric

**Status:** Accepted · **Case study:** [A2](../case-studies/a2-metrics-automation-architecture.md)

## Context
Metric jobs ran in CI, on schedules and by hand. Each could read from one environment stage and report as if it were another, or mix data across stages, and the scoreboard couldn't show which.

## Decision
Every metric job takes its **stage as an explicit input**, writes that stage next to the value, and **fails if the configured stage and the data's stage disagree**. The stage is never inferred from the runner's context.

## Consequences
- Scoreboard readers can see which environment a number describes.
- Misconfigured jobs fail instead of quietly reporting the wrong environment.
- Each job needs a small amount of extra configuration and a stage check.
