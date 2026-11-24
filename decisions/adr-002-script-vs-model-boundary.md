# ADR-002 — Script vs model boundary

**Status:** Accepted · **Case study:** [A1](../case-studies/a1-governed-multi-agent-repair.md)

## Context
Most repair steps have a provably correct answer: normalising a block reason, mapping a known cause to a mechanism, applying a mechanism, re-running validation. A few don't: ambiguous diagnoses, and repairs whose content needs judgment.

## Decision
Use **scripted workers** for every deterministic step. Limit **model-backed workers** to judgment and resolution. A model's output never changes a product directly: it is passed to a scripted worker and then goes through the same verification and approval path.

## Consequences
- Deterministic steps can be unit-tested and give the same result every time.
- Model behaviour is confined to a small, named part of the system, which makes it easier to evaluate and swap.
- Some ambiguous cases still can't be resolved. They exit through a named stop state rather than forcing a guess (see ADR-004).
