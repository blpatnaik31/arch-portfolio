# ADR-006 — Metric jobs fail loudly

**Status:** Accepted · **Case study:** [A2](../case-studies/a2-metrics-automation-architecture.md)

## Context
Error-swallowing patterns (ignore-errors flags, catch-all handlers, continue-on-error steps) let a failed metric run finish green. The scoreboard then kept showing the previous value, so a broken metric looked healthy.

## Decision
Remove failure suppression from metric jobs. A failed run **fails visibly** and writes a **failed status** for that metric instead of leaving the last value in place.

## Consequences
- Broken metrics show up as soon as they break.
- The scoreboard will show more red at first, as failures that were already happening become visible. That is expected.
- Owners need to be reachable when a metric fails.
