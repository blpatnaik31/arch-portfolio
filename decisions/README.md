# Architecture Decision Records

Short records of the key decisions behind each case study, in the usual ADR format (context → decision → consequences). Like the case studies, they are public-safe: they record the reasoning, not internal identifiers.

| ADR | Decision | Case study | Status |
|---|---|---|---|
| [ADR-001](adr-001-two-pass-operating-model.md) | Separate automated fix verification from human-approved production re-drive | A1 | Accepted |
| [ADR-002](adr-002-script-vs-model-boundary.md) | Scripted workers for deterministic work; models only for judgment and resolution | A1 | Accepted |
| [ADR-003](adr-003-three-clean-run-verification.md) | A repair counts as verified only after three consecutive clean runs | A1 | Accepted |
| [ADR-004](adr-004-named-stop-states.md) | Cases outside automation end in named stop states with explicit owners | A1 | Accepted |
| [ADR-005](adr-005-stage-is-explicit.md) | The environment stage is an explicit input to every metric | A2 | Accepted |
| [ADR-006](adr-006-metric-jobs-fail-loudly.md) | Metric jobs fail loudly; no failure suppression | A2 | Accepted |
| [ADR-007](adr-007-freshness-is-part-of-the-metric.md) | Freshness (time, stage, mechanism) is part of every metric | A2 | Accepted |
| [ADR-008](adr-008-stable-product-identity.md) | Join corpus, outputs and answer key on stable product identity | A3 | Accepted |
| [ADR-009](adr-009-report-with-confidence-intervals.md) | Report every quality figure with n and a 95% CI; no per-type scores | A3 | Accepted |
| [ADR-010](adr-010-stratify-and-report-concentration.md) | Stratify by product type; measure and report account concentration | A3 | Accepted |
| [ADR-011](adr-011-shared-core-channel-edges.md) | Shared core, channel-specific edges | A4 | Accepted |
| [ADR-012](adr-012-classify-runtime-and-tooling.md) | Classify every channel artifact as runtime or tooling, shared or channel-specific | A4 | Accepted |
| [ADR-013](adr-013-per-category-rollout.md) | Roll a channel out one category at a time | A4 | Accepted |
