# ADR-001 — Two-pass operating model

**Status:** Accepted · **Case study:** [A1](../case-studies/a1-governed-multi-agent-repair.md)

## Context
Repairing a blocked product involves low-risk steps (diagnosis, applying a fix outside production, verification) and one high-risk step: re-driving the product to a live channel. A single automated pass would apply the same level of trust to all of them.

## Decision
Split the workflow into two passes. **Pass 1** diagnoses, fixes and verifies automatically and never touches production. **Pass 2** packages each verified change with its evidence, needs a human approval, and only then re-drives to production.

## Consequences
- Human attention goes only to the one step where a mistake reaches customers.
- Pass 1 can run often and cheaply. Pass 2 runs at the pace of the approvers.
- Approvers need a self-contained package (diagnosis, change, verification evidence), so packaging is its own worker.
- Throughput is limited by approval turnaround, so that turnaround is tracked as a metric.
