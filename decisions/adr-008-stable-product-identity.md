# ADR-008 — Join on stable product identity

**Status:** Accepted · **Case study:** [A3](../case-studies/a3-quality-metric-corpus-design.md)

## Context
An end-to-end quality metric compares each corpus product's pipeline output with its expected result in an answer key. The same product can appear under different identifiers across pipeline stages and re-runs.

## Decision
Join the corpus, pipeline outputs and answer key on an **identity that survives stages and re-runs**, never on a per-run identifier. A product that can't be resolved to one stable identity is a **gap**: it is fixed or explicitly excluded, never guessed.

## Consequences
- The answer key always matches the right output.
- Some candidate products may be excluded until their identity can be resolved, which reduces n.
- Identity resolution becomes a requirement on the pipeline, not just on the metric.
