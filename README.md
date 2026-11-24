# Solution & AI Product Architecture Portfolio — Lokapati Bhogela

**Live site: [blpatnaik31.github.io/arch](https://blpatnaik31.github.io/arch/)** · Companions: [TPM portfolio](https://blpatnaik31.github.io/tpm/) · [FDE portfolio](https://blpatnaik31.github.io/fde/) · [All portfolios](https://blpatnaik31.github.io/)

Product Owner and Solution Architect on AI-driven catalog and marketplace platforms, with 13+ years in healthcare IT, medical devices and enterprise delivery. PMP · CSPO · CSM · MBA (University of San Diego).

The TPM portfolio shows delivery outcomes and the FDE portfolio shows runnable builds. This one shows **architecture decisions**: how a system is decomposed, where the deterministic, model-assisted and human boundaries sit, which contracts hold the parts together, and which risks the design guards against.

## Case studies

Each one uses the same architecture-review structure: context and forces → decision → alternatives considered → control boundaries → contracts → risks → scope evidence → what I'd measure next.

| # | Case study | Focus | Status |
|---|---|---|---|
| A1 | [Governed multi-agent repair for blocked catalog products](case-studies/a1-governed-multi-agent-repair.md) | Lead/worker orchestration, two-pass operating model, human gate, named stop states | Draft |
| A2 | [Metrics automation: CI vs scheduled vs manual scorers](case-studies/a2-metrics-automation-architecture.md) | Stage isolation, failure suppression, stale metrics, 12 mechanisms reviewed | Draft |
| A3 | [Designing a defensible end-to-end quality metric](case-studies/a3-quality-metric-corpus-design.md) | Corpus and answer-key design, stratification, confidence intervals | Draft |
| A4 | Reusable channel onboarding for a marketplace pipeline | RFC: shared vs channel-specific layers, per-category rollout loop | Planned |

## Decision records

Short ADRs taken from the case studies: [`decisions/`](decisions/).

## Principles

1. **Deterministic first.** Use a model only where no provably correct answer exists.
2. **Gate the risk, not the work.** Put human approval at the step where mistakes reach customers, not at every step.
3. **Contracts before code.** Every hand-off uses a shape the whole system and the audit trail can rely on.
4. **Every exit has an owner.** Cases automation can't handle end in a named state with an owner.
5. **Measure before you automate.** Know what "fixed" and "better" mean, and how you'd know if the metric is wrong.

## Public-safety note

These are public, sanitized write-ups. Product names, internal tool names, ticket keys, internal IDs, account names and third-party names are left out. Worker and state names are generic labels. Every count comes from documented, independently evidenced work, and scope counts are never presented as outcomes.

## Website

The visual portfolio is in [`site/`](site/), a dependency-free static site with the same design system and flow-diagram renderer as the FDE site. Preview it locally:

```bash
cd site && python3 -m http.server 8000
```

Case-study content on the site is written in `site/app.js`. Editing the Markdown here doesn't change the site, so update both. Publishing is described in [`SETUP.md`](SETUP.md).

Contact: blpatnaik31@gmail.com · [LinkedIn](https://linkedin.com/in/lbhogela)
