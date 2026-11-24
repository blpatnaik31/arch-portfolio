# ADR-004 — Named stop states with explicit ownership

**Status:** Accepted · **Case study:** [A1](../case-studies/a1-governed-multi-agent-repair.md)

## Context
Some blocked products can't or shouldn't be fixed by automation: there's no known mechanism, the cause is outside the system's scope, the repair won't verify, or an approver rejects it. Without a defined exit, these cases loop through retries or sit unowned.

## Decision
Every case that leaves automation ends in a **named stop state** (`NO_MECHANISM`, `OUT_OF_SCOPE`, `UNVERIFIED`, `REJECTED`) recorded with an **explicit owner** and a reason in the standard handoff envelope.

## Consequences
- Every blocked product is either fixed, waiting for approval, or with a named owner, so nothing stalls unseen.
- The distribution across stop states shows where to build the next fix mechanism.
- Owners have to be agreed up front with the teams involved, which is cross-functional work, not just engineering.
