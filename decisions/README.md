# Architecture Decision Records

Short records of the key decisions behind each case study, in the usual ADR format (context → decision → consequences). Like the case studies, they are public-safe: they record the reasoning, not internal identifiers.

| ADR | Decision | Case study | Status |
|---|---|---|---|
| [ADR-001](adr-001-two-pass-operating-model.md) | Separate automated fix verification from human-approved production re-drive | A1 | Accepted |
| [ADR-002](adr-002-script-vs-model-boundary.md) | Scripted workers for deterministic work; models only for judgment and resolution | A1 | Accepted |
| [ADR-003](adr-003-three-clean-run-verification.md) | A repair counts as verified only after three consecutive clean runs | A1 | Accepted |
| [ADR-004](adr-004-named-stop-states.md) | Cases outside automation end in named stop states with explicit owners | A1 | Accepted |
