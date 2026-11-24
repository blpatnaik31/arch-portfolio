# Review before publishing

Delete this file once every item is resolved.

## A1 — Governed multi-agent repair

The workbook export confirms: lead/worker architecture, **8** workers, **2** passes, the **three-clean-run** verification rule, named stop states, explicit ownership, human-approved production re-drive, scripted workers for deterministic work and model-backed workers limited to judgment/resolution, and auditable handoff contracts.

The items below were **written to illustrate that confirmed design** and need your sign-off or correction:

1. **Worker roster** (§3): the 8 generic labels and their split (6 scripted, 2 model-backed). Rename them to genericized versions of the real roles and fix the scripted/model split if it differs.
2. **Stop-state names** (§6): `NO_MECHANISM`, `OUT_OF_SCOPE`, `UNVERIFIED`, `REJECTED`. Replace them with genericized versions of the real ones.
3. **Handoff envelope** (§6): the JSON fields are illustrative. Check that they reflect the real contract's shape without exposing its actual field names.
4. **Lead agent never edits a product** (§3): confirm.
5. **Alternatives considered** (§4): confirm these were actually weighed, or replace them with the ones that were.
6. **Client naming:** resolved. The client is described as "a commerce/marketplace SaaS platform" and never named, here or in the FDE portfolio.

7. **Context paragraph** (§1): uses two facts from the master workbook (current-engagement Project 16 and the catalog-engine description): the multi-thousand-item catalog and the blocked-items diagnostic tool with safeguards against over-crediting fixes. Confirm both are fine to publish.

> The master workbook (as of 2026-11-20) has no record of the multi-agent repair design itself. Consider adding it as a project under the current engagement so the workbook stays the source of truth.

## A2 — Metrics automation

The master workbook (Project 22) confirms: **12** scoreboard metric mechanisms reviewed and classified as automated / manual / absent; CI workflows, scheduled jobs and manual model-backed scorers compared; stage leakage, failure suppression and stale metrics identified; safe implementation choices documented.

Needs your sign-off or correction:

1. **Comparison matrix** (§3): the ratings are my framing of the usual trade-offs. Check they match what your assessment actually concluded.
2. **Controls** (§4 and ADR-005/006/007): explicit stage input, fail loudly, freshness window. Confirm these match the safe implementation choices you documented, or replace them.
3. **Classification counts:** the case study gives the total (12) but not how many were automated / manual / absent. Add the split if you want it shown.
4. **Context paragraph** (§1): references the live-blocked vs ever-blocked reconciliation (Project 10) and the contested quality target (Project 15) as background. Confirm that's fine to publish.
5. **Alternatives considered** (§5): confirm these were actually weighed.

## A3 — Quality-metric corpus design

The master workbook (Project 23) confirms: data joins and statistical coverage requirements designed (stable product identity, confidence intervals, product-type stratification, account concentration); **276** candidate products, **57** product types, **17** accounts evaluated; join and schema gaps identified.

Needs your sign-off or correction:

1. **Margin-of-error table** (§3): standard worst-case arithmetic on the confirmed counts, not figures from your work. Check you're happy showing it, and that "no per-type scores" matches what you recommended.
2. **The five requirements** (§2, §4 and ADR-008/009/010): genericized from the confirmed design elements. Confirm or correct, especially "fix or exclude" for identity gaps and reporting account share with the metric.
3. **Context** (§1): describes the catalog engine as having several pipeline stages, and mentions a previously disputed quality target (Project 15). Confirm both are fine to publish.
4. **Answer key:** the workbook doesn't say how expected results were defined (human-labelled, rule-derived, or mixed). The diagram shows it as a human step. Correct it if that's wrong.
5. **Alternatives considered** (§5): confirm these were actually weighed.

## A4

Not drafted yet. It appears on the site as a "Planned" card only, without a detail page.
