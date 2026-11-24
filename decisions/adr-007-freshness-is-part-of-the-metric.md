# ADR-007 — Freshness is part of the metric

**Status:** Accepted · **Case study:** [A2](../case-studies/a2-metrics-automation-architecture.md)

## Context
Values had no timestamps. A metric whose mechanism had stopped running, or a manual scorer nobody had re-run, looked the same as one computed that morning.

## Decision
Every value carries its **computed-at time, source stage and mechanism**. Each metric has a **freshness window**, and the scoreboard flags any value older than it. A manual metric is labelled "manual — last run on <date>".

## Consequences
- Readers can tell current numbers from old ones at a glance.
- Manual scorers need a stated cadence and a named runner.
- Absent metrics become visible gaps that need a decision: build, make manual, or remove.
