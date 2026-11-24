const REPO = "https://github.com/blpatnaik31/arch-portfolio/blob/main";

const caseStudies = [
  {
    slug: "governed-multi-agent-repair",
    number: "A1",
    file: "case-studies/a1-governed-multi-agent-repair.md",
    title: "Governed multi-agent repair for blocked catalog products",
    kicker: "Agent orchestration",
    summary: "A lead agent and eight specialised workers diagnose blocked products, assign fix mechanisms and verify repairs. Production re-drive happens only after a human approves a packaged, evidenced change.",
    headline: "8 workers · 2 passes · 3 clean runs",
    status: "Draft",
    role: "Product Owner & Solution Architect",
    engagement: "A commerce/marketplace SaaS platform · AI-driven catalog",
    period: "Jun 2026 – present",
    tags: ["Multi-agent", "Human-in-the-loop", "State machine", "Contracts"],
    context: [
      "An AI-driven catalog engine takes sellers' raw product data and lists it on e-commerce marketplaces. Across a multi-thousand-item production catalog, products get blocked: a listing fails a downstream channel or quality rule and stops flowing. Each one needs someone to find out why, choose a fix, check that the fix worked, and get the corrected product back into production.",
      "An earlier piece of my work set this up: a standalone diagnostic tool that surfaces currently-blocked items straight from production fault telemetry, with safeguards against over-crediting unverified fixes. The repair architecture builds on that lesson. \"Fixed\" has to be proven, not assumed.",
    ],
    forces: [
      ["Many causes, many mechanisms", "One generic \"fix it\" step can't cover them. Different causes need different kinds of repair."],
      ["Deterministic and judgment steps mixed", "If a model drives the whole loop, the deterministic steps become probabilistic. If everything is scripted, the ambiguous cases can't be handled."],
      ["Re-drive is the risky step", "A wrong repair that reaches a live channel costs far more than a slow one."],
      ["Not every case belongs to automation", "Without clear ownership, cases outside the system's scope quietly stall."],
      ["Every change must be auditable", "Reviewers need to see what was diagnosed, what changed, what verified it and who approved it."],
    ],
    decision: [
      "A lead agent delegates to eight specialised workers. It routes products, tracks state and writes the audit trail, but never edits a product itself.",
      "Pass 1, fix and verify, is automated and never touches production. A repair counts as verified only after three consecutive clean runs.",
      "Pass 2, approve and re-drive, packages each verified change with its evidence. A person approves it before the product is re-driven to production.",
      "Cases automation shouldn't or can't resolve end in a named stop state with an explicit owner, instead of being retried indefinitely.",
    ],
    diagram: {
      label: "Two-pass repair flow, from blocked product to human-approved production re-drive",
      stages: [
        { step: "Intake", nodes: [{ kind: "code", title: "Intake worker", detail: "Collect blocked products and normalise their block reasons" }] },
        { step: "Diagnose", nodes: [{ kind: "code", title: "Diagnoser", detail: "Map a block reason to a known fix mechanism" }], note: "No mechanism or out of scope → named stop state with an owner" },
        { step: "Resolve", nodes: [
          { kind: "llm", title: "Judgment worker", detail: "Classify ambiguous cases only" },
          { kind: "llm", title: "Resolver", detail: "Propose repair content where a rule isn't enough" },
        ], note: "Model output feeds a scripted worker. It never edits a product directly." },
        { step: "Fix", nodes: [{ kind: "code", title: "Fix applier", detail: "Apply the assigned mechanism outside production" }] },
        { step: "Verify", nodes: [{ kind: "code", title: "Verifier", detail: "Three consecutive clean runs, or UNVERIFIED" }] },
        { step: "Package", nodes: [{ kind: "output", title: "Packager", detail: "Change, diagnosis and verification evidence in one approval package" }] },
        { step: "Approve", nodes: [{ kind: "human", title: "Human approval", detail: "The only route from Pass 1 to production" }] },
        { step: "Re-drive", nodes: [{ kind: "external", title: "Production re-drive", detail: "Re-submit approved products and record the result" }] },
      ],
      caption: "Steps 1–5 are Pass 1 (automated, outside production). Steps 6–8 are Pass 2 (human-approved). Worker names are generic labels.",
    },
    roster: [
      ["1", "Intake", "1", "Scripted", "Collect blocked products and normalise block reasons"],
      ["2", "Diagnoser", "1", "Scripted", "Map a block reason to a fix mechanism, or flag it as ambiguous or out of scope"],
      ["3", "Judgment worker", "1", "Model-backed", "Classify ambiguous cases the diagnoser can't map deterministically"],
      ["4", "Resolver", "1", "Model-backed", "Propose repair content when a fix needs judgment"],
      ["5", "Fix applier", "1", "Scripted", "Apply the assigned mechanism outside production"],
      ["6", "Verifier", "1", "Scripted", "Re-run validation and enforce the three-clean-run rule"],
      ["7", "Packager", "2", "Scripted", "Bundle change, diagnosis and evidence into an approval package"],
      ["8", "Re-driver", "2", "Scripted", "Re-submit approved products to production and record the result"],
    ],
    alternatives: [
      ["One general-purpose agent for the whole loop", "Deterministic steps become probabilistic and hard to test. One failure mode hides another, and it isn't clear who owns which errors."],
      ["Fully scripted pipeline, no model", "Ambiguous diagnoses and judgment-based repairs either stall or get forced into the wrong mechanism."],
      ["Single pass: fix, verify and re-drive automatically", "Removes the human check from the highest-risk step. One bad mechanism could reach live channels at scale."],
      ["Human review of every step", "Safe but doesn't scale, and reviewers tire of approving deterministic steps that are already correct."],
      ["Single clean verification run", "Intermittent failures pass once and then fail in production."],
    ],
    boundaries: [
      ["Script vs model", "A model is used only where no deterministic answer exists. Its output goes into a scripted worker before anything changes."],
      ["Automated vs human", "Pass 1 never touches production. Only a human approval moves a package into re-drive."],
      ["In vs out of automation", "Cases with no known mechanism, or outside scope, exit through a named stop state with an owner."],
      ["Verification", "\"Fixed\" means three consecutive clean runs, not one."],
    ],
    contract: `{
  "product_ref": "opaque-id",
  "worker": "diagnoser",
  "pass": 1,
  "input_digest": "sha256:…",
  "outcome": "ROUTED | VERIFIED | PACKAGED | APPROVED | REDRIVEN | STOPPED",
  "stop_state": null,
  "owner": null,
  "evidence": [{ "kind": "validation_run", "result": "clean", "run": 1 }],
  "rationale": "Short, human-readable reason for this outcome"
}`,
    stopStates: [
      ["NO_MECHANISM", "Diagnosis finds no known fix mechanism", "Named product/data owner"],
      ["OUT_OF_SCOPE", "The cause is outside what automation may change", "Named owning team"],
      ["UNVERIFIED", "The repair fails the three-clean-run rule", "Engineering owner of that mechanism"],
      ["REJECTED", "A human declines the Pass 2 package", "Approver records the reason"],
    ],
    risks: [
      ["A model-proposed repair is plausible but wrong", "Model output only feeds a scripted applier, then three clean runs, then human approval"],
      ["A flaky repair passes once", "Three-consecutive-clean-run rule"],
      ["A bad mechanism reaches production at scale", "Re-drive happens only after human approval of a packaged, evidenced change"],
      ["Cases stall silently", "Named stop states with explicit owners"],
      ["No way to reconstruct what happened", "Same handoff envelope for every worker, with input digest, evidence and rationale"],
      ["Reviewers tire of approving", "Humans review only Pass 2 packages, not deterministic steps"],
    ],
    outcomes: [
      ["8", "worker roles, deterministic and model-assisted kept separate"],
      ["2", "workflow passes: automated verification, human-approved re-drive"],
      ["3", "consecutive clean runs before a repair counts as verified"],
      ["0", "production re-drives without a human approval"],
    ],
    measureNext: [
      "Blocked products cleared per cycle, and median time from block to re-drive",
      "First-attempt verification pass rate",
      "Share of cases closed by automation vs routed to each stop state",
      "Approval turnaround and rejection rate for Pass 2 packages",
      "Repairs that regressed after re-drive (the real test of the verification rule)",
    ],
    adrs: ["ADR-001", "ADR-002", "ADR-003", "ADR-004"],
  },
  {
    slug: "metrics-automation-architecture",
    number: "A2",
    file: "case-studies/a2-metrics-automation-architecture.md",
    title: "Metrics automation: CI vs scheduled vs manual scorers",
    kicker: "Metrics architecture",
    summary: "An assessment of all 12 scoreboard metric mechanisms, classified as automated, manual or absent, with controls for stage leakage, failure suppression and stale metrics before anything else gets automated.",
    headline: "12 mechanisms · 3 options · 3 failure patterns",
    status: "Draft",
    role: "Product Owner & Solution Architect",
    engagement: "A commerce/marketplace SaaS platform · AI-driven catalog",
    period: "Jun 2026 – present",
    tags: ["CI/CD", "Stage isolation", "Data observability", "Trade-offs"],
    context: [
      "A team scoreboard reported the quality metrics that delivery and prioritisation decisions depended on. Each metric was produced in its own way: some by CI workflows, some by scheduled jobs, some by a person running a model-backed scorer by hand, and some by nothing at all. Nobody had checked whether the number on the scoreboard was current, which environment it came from, or whether the job behind it had actually succeeded.",
      "I had seen what bad metrics cost on this engagement before: a gap between live-blocked and ever-blocked counts that had to be reconciled before prioritisation could be trusted, and a contested quality target that needed a reproducible basis. This assessment applied the same scrutiny to the scoreboard as a whole.",
    ],
    forces: [
      ["Different metrics need different mechanisms", "Deterministic counts suit automation. Judgment-based quality scores may need a model and a person."],
      ["Mechanisms fail in different ways", "A CI job, a scheduled job and a manual run each go wrong differently, and the scoreboard showed all three the same way."],
      ["Environments mix easily", "One metric can read from one stage and report as if it were another."],
      ["A green tick isn't proof", "A job that hides its own failure still looks healthy, and the scoreboard keeps showing the last value."],
      ["Old numbers look like new ones", "Without a timestamp, a months-old value reads as current."],
    ],
    decision: [
      "Before automating anything further, review all 12 scoreboard metric mechanisms and classify each as automated, manual or absent.",
      "Compare CI workflows, scheduled jobs and manual model-backed scorers against freshness, reproducibility, stage isolation, failure visibility and cost.",
      "Name the three failure patterns (stage leakage, failure suppression, stale metrics) and set one control for each.",
      "Document safe implementation choices so new and migrated metrics follow one pattern instead of each inventing its own.",
    ],
    diagram: {
      label: "Metric assessment flow, from inventory to a scoreboard value with stage, time and status",
      stages: [
        { step: "Inventory", nodes: [{ kind: "data", title: "12 metric mechanisms", detail: "Every scoreboard metric and how it is produced" }] },
        { step: "Classify", nodes: [
          { kind: "code", title: "Automated", detail: "CI workflow or scheduled job" },
          { kind: "llm", title: "Manual", detail: "Model-backed scorer run by a person" },
          { kind: "human", title: "Absent", detail: "No mechanism: build, run manually, or drop" },
        ] },
        { step: "Control", nodes: [{ kind: "code", title: "Three controls", detail: "Explicit stage · fail loudly · freshness window" }] },
        { step: "Report", nodes: [{ kind: "output", title: "Scoreboard value", detail: "Value plus stage, computed-at time and status" }] },
      ],
      caption: "Classify first, then apply the same controls to every mechanism, whatever kind it is.",
    },
    tables: [
      {
        title: "Comparing the options",
        intro: "No single mechanism wins. The decision is to match the mechanism to the metric, then apply the same controls to all of them.",
        head: ["Criterion", "CI workflow", "Scheduled job", "Manual model-backed scorer"],
        rows: [
          ["Runs when", "Code changes", "On a clock", "Someone remembers to run it"],
          ["Freshness", "Stale when data changes without a commit", "Predictable, if the job succeeds", "Least predictable"],
          ["Reproducibility", "High, versioned with the code", "High, versioned with the code", "Low unless prompt, model and sample are pinned"],
          ["Stage isolation risk", "Medium: CI context can point at the wrong environment", "Medium: one schedule can serve several stages", "High: run against whatever is configured locally"],
          ["Failure visibility", "Good, unless the failure is suppressed", "Poor by default: a failed run leaves the old value", "None: a skipped run looks like no change"],
          ["Best fit", "Deterministic checks tied to a code change", "Deterministic metrics over live data", "Judgment-based quality scores"],
        ],
      },
      {
        title: "Failure patterns and controls",
        head: ["Failure pattern", "What it looks like", "Control"],
        rows: [
          ["Stage leakage", "A metric computed against one environment stage is reported as another, or mixes data across stages", "The stage is an explicit input, written next to the value. A mismatch fails the run."],
          ["Failure suppression", "Error-swallowing patterns make a failed run look green and leave the previous value on the board", "Metric jobs fail loudly. A failed run writes a failed status instead of keeping the old value."],
          ["Stale metrics", "A value with no timestamp keeps being shown long after its mechanism stopped running", "Every value carries computed-at time, stage and mechanism. Values past their freshness window are flagged."],
        ],
        after: [
          "Manual scorers also need a pinned prompt and model version, a recorded sample, and a named runner on a stated cadence. Otherwise the metric is shown as \"manual, last run on &lt;date&gt;\", never as current.",
          "Absent metrics need a decision, not a placeholder: build a mechanism, run it manually with an owner, or remove it from the scoreboard.",
        ],
      },
    ],
    alternatives: [
      ["Automate everything in CI now", "CI runs on code change, not data change, so CI-only metrics go stale between commits. Automating first also locks in the existing stage and failure problems."],
      ["Move everything to one scheduler", "Fixes freshness but not stage leakage or hidden failures, and has no good place for judgment-based scorers."],
      ["Keep manual scorers as they are", "Not reproducible and invisible when skipped. The scoreboard can't tell \"unchanged\" from \"not run\"."],
      ["Remove judgment-based metrics", "Leaves out the quality signals the team most needed. Govern the manual runs instead of dropping them."],
    ],
    boundaries: [
      ["Stage", "Stated explicitly, never inferred. A mismatch fails the run."],
      ["Success vs failure", "A failed run is reported as failed, never shown as the last good value."],
      ["Fresh vs stale", "Each metric has a freshness window, and the scoreboard shows when it has passed."],
      ["Automated vs manual", "Manual, model-backed scoring only with pinned inputs, a named runner and a visible last-run date."],
    ],
    risks: [
      ["Decisions made on a number from the wrong environment", "Stage recorded with every value; mismatch fails the run"],
      ["A broken metric job goes unnoticed for weeks", "No failure suppression; failed status replaces the value"],
      ["Old values treated as current", "Timestamp plus freshness window; stale flag on the scoreboard"],
      ["Manual scores drift between runs", "Pinned prompt, model and sample; named runner"],
      ["Automating before metric definitions are sound", "Inventory and classify first; reconcile definitions before automating"],
    ],
    outcomes: [
      ["12", "scoreboard metric mechanisms reviewed and classified"],
      ["3", "automation options compared: CI, scheduled, manual scorer"],
      ["3", "failure patterns named, each with a control"],
      ["1", "documented pattern for new and migrated metrics"],
    ],
    measureNext: [
      "Share of scoreboard metrics with stage, timestamp and status recorded",
      "Share of metrics inside their freshness window at any given time",
      "Metric job failures detected vs previously hidden, once suppression is removed",
      "Time from a metric breaking to someone noticing",
      "Absent metrics resolved: built, made manual with an owner, or removed",
    ],
    adrs: ["ADR-005", "ADR-006", "ADR-007"],
  },
  {
    slug: "quality-metric-corpus-design",
    number: "A3",
    file: "case-studies/a3-quality-metric-corpus-design.md",
    title: "Designing a defensible end-to-end quality metric",
    kicker: "Measurement design",
    summary: "Corpus, answer-key and data-join requirements for an end-to-end quality metric across 276 candidate products, 57 product types and 17 accounts, designed so the number holds up when someone challenges it.",
    headline: "276 products · 57 types · 17 accounts",
    status: "Draft",
    role: "Product Owner & Solution Architect",
    engagement: "A commerce/marketplace SaaS platform · AI-driven catalog",
    period: "Jun 2026 – present",
    tags: ["Data architecture", "Statistics", "Answer keys", "Data joins"],
    context: [
      "The catalog engine takes sellers' raw product data and turns it into marketplace listings across several pipeline stages. The team needed one end-to-end quality number: of the products that go in, how many come out correct? I had already seen a quality target disputed on this engagement because it had no reproducible basis, so this one had to be defensible before it was built.",
      "A quality metric depends on two things: the corpus (which products are measured) and the answer key (what \"correct\" means for each one). Getting either wrong produces a precise-looking number that means nothing.",
    ],
    forces: [
      ["Product identity isn't stable by default", "The same product can appear under different identifiers across stages and re-runs. Join on the wrong key and the answer key attaches to the wrong output."],
      ["The candidate pool is wide and thin", "276 products across 57 product types averages fewer than 5 per type."],
      ["Accounts aren't evenly represented", "If a few of the 17 accounts dominate the corpus, the metric describes those sellers, not the platform."],
      ["A single number hides its uncertainty", "\"82% correct\" means very different things at n = 30 and n = 300."],
      ["Schemas drift", "Fields the answer key depends on may be missing, renamed or differently populated at different stages."],
    ],
    decision: [
      "Join the corpus, pipeline outputs and answer key on a stable product identity that survives stages and re-runs.",
      "Publish every quality figure with its sample size and 95% confidence interval.",
      "Stratify the corpus across product types, and measure and report each account's share.",
      "Close join and schema gaps, or explicitly exclude the affected products, before the metric goes live.",
    ],
    diagram: {
      label: "Corpus design flow, from candidate pool to a quality estimate with n and confidence interval",
      stages: [
        { step: "Pool", nodes: [{ kind: "data", title: "Candidate pool", detail: "276 products · 57 types · 17 accounts" }] },
        { step: "Join", nodes: [{ kind: "code", title: "Stable identity join", detail: "Corpus ↔ pipeline outputs ↔ answer key" }], note: "Unresolved identity or schema gap → fix or exclude, documented" },
        { step: "Cover", nodes: [
          { kind: "code", title: "Type strata", detail: "Span the product-type range" },
          { kind: "code", title: "Account share", detail: "Measured and reported" },
        ] },
        { step: "Key", nodes: [{ kind: "human", title: "Answer key", detail: "Expected result per corpus product" }] },
        { step: "Report", nodes: [{ kind: "output", title: "Quality metric", detail: "Estimate + n + 95% CI, no per-type scores" }] },
      ],
      caption: "Statistical coverage and join requirements are set before the metric is built, not added afterwards.",
    },
    tables: [
      {
        title: "Why the statistics shape the design",
        intro: "Worst-case 95% margin of error for a proportion (p = 0.5), by sample size. Standard arithmetic on the corpus counts.",
        head: ["Sample", "What it represents", "± margin (95%)"],
        rows: [
          ["276", "Full candidate pool", "≈ ±5.9 points"],
          ["100", "A large sub-group", "≈ ±9.8 points"],
          ["30", "A small sub-group", "≈ ±17.9 points"],
          ["~5", "Average products per type (276 ÷ 57)", "≈ ±44 points"],
        ],
        after: [
          "<strong>The headline number is usable; per-type numbers are not.</strong> Stratification makes the overall number representative. It doesn't produce 57 reliable per-type scores.",
          "<strong>A change has to be bigger than the interval to count.</strong> A 2–3 point movement on the headline is inside the margin and isn't reported as progress.",
        ],
      },
      {
        title: "Coverage requirements",
        head: ["Dimension", "Requirement", "Why"],
        rows: [
          ["Product identity", "Every corpus product resolves to one stable identity across stages", "Prevents the answer key matching the wrong output"],
          ["Product type", "Corpus spans the product-type range, not only the most common types", "Keeps the headline number representative"],
          ["Account", "Each account's share of the corpus is measured and reported", "Stops one seller's data from setting the platform score"],
          ["Sample size", "n and 95% CI reported with every figure", "Makes the uncertainty visible"],
          ["Schema", "Fields the answer key depends on are present at every stage measured", "Prevents silent drops and misjoins"],
        ],
      },
    ],
    alternatives: [
      ["Measure whatever recent products are easiest to pull", "Over-represents common types and high-volume accounts, so the number describes the biggest sellers."],
      ["Join on per-run identifiers", "Breaks when products are re-ingested or re-run, attaching expected results to the wrong outputs."],
      ["Report per-type quality scores", "At ~5 products per type the intervals are too wide to mean anything."],
      ["Report a single percentage without an interval", "Invites reading noise as progress and reopens the \"where does this number come from\" dispute."],
      ["Build the metric first, fix data gaps later", "The first published number would be wrong, and a wrong first number is hard to retract."],
    ],
    boundaries: [
      ["Identity", "Resolved to one stable identity, or excluded. Never guessed."],
      ["Precision", "Only figures whose interval supports a conclusion are reported."],
      ["Representation", "Product-type coverage and account share are checked before every run of the metric."],
      ["Launch", "No metric goes live with known join or schema gaps unresolved and undocumented."],
    ],
    risks: [
      ["Expected results attached to the wrong product", "Stable identity join; misjoins treated as gaps to fix or exclude"],
      ["Metric dominated by a few accounts", "Account share measured and reported with the metric"],
      ["Noise reported as progress", "n and CI with every figure; no per-type scores"],
      ["Products silently dropped by schema gaps", "Gaps found and resolved or explicitly excluded before launch"],
      ["The number is disputed later", "Corpus, answer key and join logic documented so the figure can be reproduced"],
    ],
    outcomes: [
      ["276", "candidate products evaluated for the corpus"],
      ["57", "product types in the stratification design"],
      ["17", "accounts checked for concentration"],
      ["±5.9", "worst-case 95% margin on the full pool (arithmetic, not a result)"],
    ],
    measureNext: [
      "Share of corpus products resolving to one stable identity across all stages measured",
      "Headline quality estimate with n and 95% CI, tracked across releases",
      "Largest single-account share, and how the metric moves without that account",
      "Join and schema gaps open vs resolved",
      "Agreement between independent reviewers on a sample of answer-key entries",
    ],
    adrs: ["ADR-008", "ADR-009", "ADR-010"],
  },
];

const planned = [
  ["A4", "Reusable channel onboarding for a marketplace pipeline", "An RFC separating shared capabilities from channel-specific mappings, classifying 11 runtime and 14 tooling artifact types, with a per-category rollout loop."],
];

const decisions = [
  { id: "ADR-001", file: "decisions/adr-001-two-pass-operating-model.md", title: "Two-pass operating model", study: "A1", body: "Separate automated fix verification from human-approved production re-drive, so human attention goes only to the step where a mistake reaches customers." },
  { id: "ADR-002", file: "decisions/adr-002-script-vs-model-boundary.md", title: "Script vs model boundary", study: "A1", body: "Scripted workers for every deterministic step. Models only for judgment and resolution, and their output never changes a product directly." },
  { id: "ADR-003", file: "decisions/adr-003-three-clean-run-verification.md", title: "Three-clean-run verification", study: "A1", body: "A repair counts as verified only after three consecutive clean runs, catching flaky fixes before packaging rather than after re-drive." },
  { id: "ADR-004", file: "decisions/adr-004-named-stop-states.md", title: "Named stop states with owners", study: "A1", body: "Every case that leaves automation ends in a named state with an owner and a reason, so nothing stalls unseen." },
  { id: "ADR-005", file: "decisions/adr-005-stage-is-explicit.md", title: "Stage is an explicit input", study: "A2", body: "Every metric job states its environment stage, records it next to the value, and fails if the configured and actual stage disagree." },
  { id: "ADR-006", file: "decisions/adr-006-metric-jobs-fail-loudly.md", title: "Metric jobs fail loudly", study: "A2", body: "No failure suppression. A failed run writes a failed status instead of leaving the last good value on the scoreboard." },
  { id: "ADR-007", file: "decisions/adr-007-freshness-is-part-of-the-metric.md", title: "Freshness is part of the metric", study: "A2", body: "Every value carries time, stage and mechanism, and is flagged once it passes its freshness window." },
  { id: "ADR-008", file: "decisions/adr-008-stable-product-identity.md", title: "Join on stable product identity", study: "A3", body: "Corpus, outputs and answer key join on an identity that survives stages and re-runs. Unresolvable products are fixed or excluded, never guessed." },
  { id: "ADR-009", file: "decisions/adr-009-report-with-confidence-intervals.md", title: "Report n and a confidence interval", study: "A3", body: "Every quality figure ships with its sample size and 95% CI. No per-type scores at a corpus this thin." },
  { id: "ADR-010", file: "decisions/adr-010-stratify-and-report-concentration.md", title: "Stratify; report account share", study: "A3", body: "Cover the product-type range and report each account's share, so the platform number isn't really a few sellers' number." },
];

const principles = [
  ["Deterministic first", "Use a model only where no provably correct answer exists. Everything else is a plain, testable step."],
  ["Gate the risk, not the work", "Put human approval where a mistake reaches customers, not on every step."],
  ["Contracts before code", "Every hand-off uses a shape the whole system and the audit trail can rely on."],
  ["Every exit has an owner", "Cases automation can't handle end in a named state with an owner, never in a retry loop."],
  ["Measure before you automate", "Define what \"fixed\" and \"better\" mean, and how you'd know if the metric itself is wrong."],
];

const main = document.querySelector("#main-content");
const nav = document.querySelector("#site-nav");
document.querySelector("#current-year").textContent = new Date().getFullYear();

const tagList = (tags) => `<div class="tag-list">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`;
const code = (text) => `<pre class="code-block"><code>${text.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</code></pre>`;
const table = (head, rows, numCols = []) => `<div class="skills-table-wrap"><table class="skills-table eval-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${numCols.includes(i) ? ' class="num"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

const KINDS = {
  data: { label: "Data", icon: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>' },
  code: { label: "Deterministic code", icon: '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 5-4 14"/>' },
  llm: { label: "Model-backed", icon: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m12 8 1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5Z"/>' },
  human: { label: "Human decision", icon: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>' },
  output: { label: "Output", icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>' },
  external: { label: "External system", icon: '<path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>' },
};
const kindIcon = (kind) => `<svg class="dg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${KINDS[kind].icon}</svg>`;

function diagram(d) {
  const used = [...new Set(d.stages.flatMap((st) => st.nodes.map((n) => n.kind)))];
  const stages = d.stages.map((st, i) => `<li class="dg-stage">
      <span class="dg-step"><span class="dg-step-num">${String(i + 1).padStart(2, "0")}</span>${st.step}</span>
      <div class="dg-body">
        <ul class="dg-nodes" data-count="${st.nodes.length}">${st.nodes.map((n) => `<li class="dg-node dg-${n.kind}">
          <span class="dg-kind">${kindIcon(n.kind)}${KINDS[n.kind].label}</span>
          <strong>${n.title}</strong><span class="dg-detail">${n.detail}</span>
        </li>`).join("")}</ul>
        ${st.note ? `<p class="dg-note">${st.note}</p>` : ""}
      </div>
    </li>`).join("");
  return `<figure class="diagram">
    <ol class="dg-flow" aria-label="${d.label}">${stages}</ol>
    <figcaption><span class="dg-legend" aria-hidden="true">${used.map((k) => `<span class="dg-legend-item dg-${k}">${kindIcon(k)}${KINDS[k].label}</span>`).join("")}</span><span>${d.caption}</span></figcaption>
  </figure>`;
}

function studyCard(item) {
  return `<a class="work-card" href="#/case-studies/${item.slug}">
    <div class="card-top">
      <span class="card-index">${item.number} · ${item.status}</span>
      <h3>${item.title}</h3>
      <span class="card-company">${item.kicker} · ${item.period}</span>
    </div>
    <div class="card-bottom">
      <p class="card-result"><strong>${item.headline}</strong>${item.summary}</p>
      ${tagList(item.tags.slice(0, 2))}
    </div>
  </a>`;
}

function plannedCard([number, title, body]) {
  return `<div class="work-card" aria-disabled="true" style="opacity:0.72">
    <div class="card-top">
      <span class="card-index">${number} · Planned</span>
      <h3>${title}</h3>
      <span class="card-company">Write-up in progress</span>
    </div>
    <div class="card-bottom"><p class="card-result">${body}</p></div>
  </div>`;
}

function metrics() {
  return `<div class="metrics-grid">
    <div class="metric"><span class="metric-value">8</span><span class="metric-label">worker roles in a governed agent architecture</span></div>
    <div class="metric"><span class="metric-value">12</span><span class="metric-label">scoreboard metric mechanisms reviewed</span></div>
    <div class="metric"><span class="metric-value">276</span><span class="metric-label">candidate products evaluated for corpus design</span></div>
    <div class="metric"><span class="metric-value">25</span><span class="metric-label">artifact types classified for channel onboarding</span></div>
  </div>`;
}

function principleGrid() {
  return `<div class="process-grid">${principles.map(([title, body], i) => `<div class="process-step"><span class="process-number">0${i + 1}</span><h3>${title}</h3><p>${body}</p></div>`).join("")}</div>`;
}

function allStudyCards() {
  return caseStudies.map(studyCard).join("") + planned.map(plannedCard).join("");
}

function renderHome() {
  main.innerHTML = `<section class="hero"><div class="container hero-grid">
    <div>
      <span class="eyebrow">Product Owner · Solution Architect</span>
      <h1>I design where the <em>agent</em> stops and the human decides.</h1>
      <p class="lede">Architecture case studies from AI-driven catalog and marketplace platforms: how a system is decomposed, where the deterministic, model-assisted and human boundaries sit, and which contracts hold it together.</p>
      <div class="hero-actions"><a class="button button-primary" href="#/case-studies">Read the case studies <span aria-hidden="true">↗</span></a><a class="button button-quiet" href="#/decisions">Decision records <span aria-hidden="true">↓</span></a></div>
    </div>
    <aside class="hero-aside"><p>Script what has a right answer. Give the model only the judgment calls. Put the human where a mistake reaches customers. Give every exit an owner.</p><span class="signature-line"></span><span class="signature-label">Agents · Contracts · Metrics · Integration</span></aside>
  </div></section>
  <section class="section"><div class="container">${metrics()}<p style="font-size:0.78rem;color:var(--ink-faint);margin-top:0.9rem">Scope counts from documented, independently evidenced work, not outcome claims.</p></div></section>
  <section class="section"><div class="container">
    <div class="section-heading"><div><span class="eyebrow">Case studies</span><h2>Architecture decisions, with the reasoning shown.</h2></div><p>Each follows the same review structure: forces, decision, alternatives, boundaries, contracts, risks.</p></div>
    <div class="work-grid">${allStudyCards()}</div>
  </div></section>
  <section class="section"><div class="container">
    <div class="section-heading"><div><span class="eyebrow">Principles</span><h2>The rules behind the designs.</h2></div><p>The same judgment calls, applied across agents, metrics and integrations.</p></div>
    ${principleGrid()}
  </div></section>`;
}

function renderStudies() {
  main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Case studies</span><h1>Designs you can review like an architecture board would.</h1><p class="lede">Public-safe write-ups: product names, internal tools, IDs, account and third-party names are left out. Worker and state names are generic labels.</p></div></section>
  <section class="section"><div class="container"><div class="work-grid">${allStudyCards()}</div></div></section>`;
}

function renderStudy(slug) {
  const s = caseStudies.find((c) => c.slug === slug);
  if (!s) return renderNotFound();
  const adrLinks = decisions.filter((d) => s.adrs.includes(d.id));
  main.innerHTML = `<section class="detail-hero"><div class="container"><span class="eyebrow">${s.kicker} · Case study ${s.number} · ${s.status}</span><h1>${s.title}</h1><p class="lede">${s.summary}</p><div class="detail-meta"><div class="meta-item"><small>Role</small><span>${s.role}</span></div><div class="meta-item"><small>Engagement</small><span>${s.engagement}</span></div><div class="meta-item"><small>Period</small><span>${s.period}</span></div></div></div></section>
  <div class="container detail-layout"><article class="detail-content">
    <section class="detail-section"><h2>Context</h2>${s.context.map((p) => `<p>${p}</p>`).join("")}</section>
    <section class="detail-section"><h2>Forces</h2><ul>${s.forces.map(([t, b]) => `<li><strong>${t}.</strong> ${b}</li>`).join("")}</ul></section>
    <section class="detail-section"><h2>Decision</h2><ul>${s.decision.map((d) => `<li>${d}</li>`).join("")}</ul>${diagram(s.diagram)}</section>
    ${s.roster ? `<section class="detail-section"><h2>Worker roster</h2><p>Scripted workers handle deterministic work. Model-backed workers are limited to judgment and resolution.</p>${table(["#", "Worker", "Pass", "Type", "Responsibility"], s.roster, [0, 2])}</section>` : ""}
    ${(s.tables || []).map((t) => `<section class="detail-section"><h2>${t.title}</h2>${t.intro ? `<p>${t.intro}</p>` : ""}${table(t.head, t.rows)}${(t.after || []).map((a) => `<p>${a}</p>`).join("")}</section>`).join("")}
    <section class="detail-section"><h2>Alternatives considered</h2>${table(["Option", "Why not"], s.alternatives)}</section>
    <section class="detail-section"><h2>Control boundaries</h2>${table(["Boundary", "Rule"], s.boundaries)}</section>
    ${s.contract ? `<section class="detail-section"><h2>Handoff contract</h2><p>Every worker hand-off uses the same envelope, so the lead agent and the audit trail can treat all eight workers alike.</p>${code(s.contract)}<h3 style="margin-top:1.6rem">Named stop states</h3>${table(["Stop state", "Entered when", "Owner"], s.stopStates.map(([a, b, c]) => [`<code>${a}</code>`, b, c]))}<p>Each stop state is a finished result with an owner, not an error. Every blocked product is either fixed, waiting for approval, or with a named owner.</p></section>` : ""}
    <section class="detail-section"><h2>Risks and mitigations</h2>${table(["Risk", "Mitigation in the design"], s.risks)}</section>
    <section class="detail-section"><h2>Scope evidence</h2><div class="outcomes-grid">${s.outcomes.map(([v, l]) => `<div class="outcome-card"><span class="outcome-value">${v}</span><span class="outcome-label">${l}</span></div>`).join("")}</div></section>
    <section class="detail-section"><h2>What I'd measure next</h2><div class="scope-note"><strong>Scope-driven case study.</strong><br>The engagement is ongoing, so outcome metrics are being set up rather than estimated after the fact.</div><ul>${s.measureNext.map((m) => `<li>${m}</li>`).join("")}</ul></section>
    <section class="detail-section"><h2>Decision records</h2><ul>${adrLinks.map((d) => `<li><a href="${REPO}/${d.file}" target="_blank" rel="noreferrer">${d.id}: ${d.title} ↗</a></li>`).join("")}</ul><div class="button-row"><a class="button button-primary" href="${REPO}/${s.file}" target="_blank" rel="noreferrer">Full write-up on GitHub <span aria-hidden="true">↗</span></a></div></section>
  </article><aside class="detail-sidebar"><div class="side-label">Planned case studies</div><div class="side-list">${planned.map(([n, t]) => `<span>${n} · ${t}</span>`).join("")}</div><div class="side-label">Related portfolios</div><div class="side-list"><a href="https://blpatnaik31.github.io/fde/">FDE: runnable builds →</a><a href="https://blpatnaik31.github.io/tpm/">TPM: delivery outcomes →</a></div></aside></div>`;
}

function renderDecisions() {
  main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Decision records</span><h1>Context, decision, consequences.</h1><p class="lede">Short ADRs taken from the case studies. They record the reasoning, not internal identifiers.</p></div></section>
  <section class="section"><div class="container"><div class="process-grid">${decisions.map((d) => `<div class="process-step"><span class="process-number">${d.id} · ${d.study}</span><h3>${d.title}</h3><p>${d.body}</p><p><a href="${REPO}/${d.file}" target="_blank" rel="noreferrer">Read the ADR ↗</a></p></div>`).join("")}</div></div></section>`;
}

function renderPrinciples() {
  main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Principles</span><h1>The rules behind the designs.</h1><p class="lede">An architecture is a set of decisions about where risk lives and who owns it. These are the ones I make every time.</p></div></section>
  <section class="section"><div class="container">${principleGrid()}</div></section>`;
}

function renderAbout() {
  main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">About</span><h1>Program leader, product owner, architect.</h1><p class="lede">Product Owner and Solution Architect on AI-driven catalog and marketplace platforms, with 13+ years in healthcare IT, medical devices and enterprise delivery.</p></div></section>
  <section class="section"><div class="container about-grid"><div><span class="eyebrow">Three lenses</span><h2>Same throughline, different evidence.</h2><p>The TPM portfolio shows quantified delivery outcomes in regulated environments. The FDE portfolio shows runnable builds with honest evaluations. This one shows the architecture decisions in between: decomposition, control boundaries, contracts and risk.</p><div class="credential-list"><span class="credential">PMP</span><span class="credential">CSPO</span><span class="credential">CSM</span><span class="credential">MBA · University of San Diego</span></div><div class="button-row"><a class="button button-primary" href="mailto:blpatnaik31@gmail.com">Get in touch <span aria-hidden="true">↗</span></a><a class="button" href="https://blpatnaik31.github.io/tpm/">TPM portfolio <span aria-hidden="true">→</span></a><a class="button" href="https://blpatnaik31.github.io/fde/">FDE portfolio <span aria-hidden="true">→</span></a></div></div><div><span class="eyebrow">Competencies</span><h2>What I architect.</h2>${tagList(["Multi-agent & AI-assisted design", "Service decomposition", "Human-in-the-loop governance", "Deterministic vs model boundaries", "CI/CD & stage isolation", "Data & quality-measurement design", "Integration & channel patterns", "RFCs, ADRs & risk registers"])}</div></div></section>`;
}

function renderNotFound() {
  main.innerHTML = `<section class="not-found container"><span class="eyebrow">404</span><h1>Named stop state: NO_ROUTE.</h1><p class="lede" style="margin-inline:auto">This page has no owner. Here is the way back.</p><div class="button-row" style="justify-content:center"><a class="button button-primary" href="#/">Return home</a></div></section>`;
}

function updateNav(page) {
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.getAttribute("href") === `#/${page}`) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function render() {
  const parts = (window.location.hash.replace(/^#/, "") || "/").split("/").filter(Boolean);
  updateNav(parts[0] || "");
  if (parts[0] === "case-studies" && parts[1]) renderStudy(parts[1]);
  else if (parts[0] === "case-studies") renderStudies();
  else if (parts[0] === "decisions") renderDecisions();
  else if (parts[0] === "principles") renderPrinciples();
  else if (parts[0] === "about") renderAbout();
  else if (parts.length === 0) renderHome();
  else renderNotFound();
  main.focus({ preventScroll: true });
  window.scrollTo(0, 0);
  nav.classList.remove("is-open");
  document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");
}

document.querySelector(".menu-toggle").addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", String(open));
});
window.addEventListener("hashchange", render);
render();
