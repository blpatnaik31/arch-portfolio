# ADR-011 — Shared core, channel-specific edges

**Status:** Accepted · **Case study:** [A4](../case-studies/a4-reusable-channel-onboarding.md)

## Context
Supporting a new sales channel could be done by copying an existing channel's implementation, or by pushing every rule into shared code. Copying duplicates logic that then drifts. Generalising everything makes every channel carry every other channel's rules.

## Decision
Keep **shared capabilities in one core** and put **channel-specific mappings, transforms and operational artifacts at the edge**. The shared core changes only for something every channel needs.

## Consequences
- A fix in the shared core helps every channel at once.
- A new channel builds only its edge, not a full copy.
- Changes to the shared core need wider review, because they affect every channel.
