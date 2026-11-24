# ADR-010 — Stratify by product type; measure account concentration

**Status:** Accepted · **Case study:** [A3](../case-studies/a3-quality-metric-corpus-design.md)

## Context
The candidate pool spans 57 product types and 17 accounts. Sampling by convenience would over-represent common types and high-volume sellers, so the "platform" number would really describe a few accounts.

## Decision
Build the corpus to **cover the range of product types**, and **measure each account's share** of the corpus, reporting it with the metric.

## Consequences
- The headline number represents the platform rather than its largest sellers.
- Account concentration is visible, so a change driven by one seller can be spotted.
- Building the corpus takes more effort than pulling the latest products.
