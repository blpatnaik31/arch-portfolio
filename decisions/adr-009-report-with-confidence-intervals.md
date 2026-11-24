# ADR-009 — Report every quality figure with n and a confidence interval

**Status:** Accepted · **Case study:** [A3](../case-studies/a3-quality-metric-corpus-design.md)

## Context
With 276 candidate products, the worst-case 95% margin of error on the headline number is about ±6 points. Spread across 57 product types (about 5 each), per-type margins are around ±44 points. A bare percentage hides all of this.

## Decision
Every quality figure is published with its **sample size and 95% confidence interval**. Per-type scores are **not** published at this corpus size.

## Consequences
- Readers can tell real changes from noise. A shift smaller than the interval isn't reported as progress.
- The headline number is less striking but holds up when challenged.
- Per-type quality needs a larger, targeted corpus if it's ever required.
