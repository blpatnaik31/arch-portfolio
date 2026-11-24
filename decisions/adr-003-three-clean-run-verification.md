# ADR-003 — Three-clean-run verification

**Status:** Accepted · **Case study:** [A1](../case-studies/a1-governed-multi-agent-repair.md)

## Context
A repair that passes validation once may still be flaky: intermittent downstream behaviour, ordering effects or timing can make a broken fix look clean on a single run.

## Decision
A repair counts as **verified only after three consecutive clean validation runs**. Failing the rule sends the product to the `UNVERIFIED` stop state with the mechanism's engineering owner.

## Consequences
- Flaky repairs are caught before packaging, not after production re-drive.
- Verification costs roughly three times as much, which is acceptable because it happens outside production and is cheap compared with a regression.
- The threshold is a parameter. Post-re-drive regression rates are the evidence for keeping or changing it.
