# ADR-012 — Classify every channel artifact as runtime or tooling

**Status:** Accepted · **Case study:** [A4](../case-studies/a4-reusable-channel-onboarding.md)

## Context
A channel is made of more than code: mappings, transforms, rules, configuration, scripts, generators, fixtures and runbooks. Without a classification, nobody can say what a new channel needs to build or how much review each piece needs.

## Decision
Classify the reference implementation's artifacts as **runtime** (11 types: what the pipeline executes) or **tooling** (14 types: what engineers use to build, check and operate a channel), and as **shared** or **channel-specific**.

## Consequences
- A new channel starts from a known checklist instead of a code search.
- Review and testing effort follows risk: runtime and shared artifacts get the most.
- The classification has to be kept current as channels add artifact types.
