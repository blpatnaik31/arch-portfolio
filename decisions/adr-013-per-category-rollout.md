# ADR-013 — Roll out one category at a time

**Status:** Accepted · **Case study:** [A4](../case-studies/a4-reusable-channel-onboarding.md)

## Context
Enabling a whole channel at once makes failures hard to trace and rollback all-or-nothing. Category-mapping work had already shown that mappings need validating against real SKUs before they go live.

## Decision
Bring a channel live through a **repeatable per-category loop**: select, map, validate (reviewed packet of real SKUs), enable, monitor, then the next category. Category classification is settled before mapping starts.

## Consequences
- Every problem traces to one category, and rollback affects only that category.
- Each loop produces the evidence (validation packet, monitoring) for the next go/no-go.
- Full channel coverage takes longer than a big-bang switch-on, in exchange for lower risk.
