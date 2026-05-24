---
name: Synthesize Report
description: >
  Reads structured knowledge files from the knowledge/ folder produced by
  extract-content and synthesizes a research report with cross-source
  analysis, evidence maps, and inline citations. Use when user says:
  synthesize report, generate report, write report, compile findings,
  or create research summary. Outputs draft.md and final.md with a
  verification log. Feeds into the research-pipeline orchestrator.
---

# Synthesize Report

Skill 3 of 4 in the research workflow. Reads all markdown files in
`demos/weather/knowledge/`, performs cross-source analysis, and produces a
full research report using the template in `demos/weather/references/report-template.md`.

Two human checkpoints: one after analysis (Gate 2a) and one after the
first draft (Gate 2b).

---

## Step 1 — Load the knowledge base

Read every `.md` file in `demos/weather/knowledge/` (skip `index.md`).
Parse the YAML front matter for citation metadata. Report how many papers
are loaded.

If the folder is empty or missing, tell the user to run `/extract-content` first.

---

## Step 2 — Cross-source analysis

Analyze across all papers and identify:

- **Agreements** — claims supported by 2+ papers (note citation keys)
- **Contradictions** — conflicting findings between papers (cite both sides)
- **Gaps** — questions the collected literature does not answer
- **Patterns** — methodological trends, geographic distribution, time trends

Save to `demos/weather/report/analysis.md`.

Build the evidence matrix — a table showing each paper's stance on the
key claims:

```markdown
| Claim | chen2023 | smith2021 | jones2020 |
|-------|----------|-----------|-----------|
| Cloud seeding increases precipitation | Supports (+15%) | Supports (+8–12%) | Contradicts (no sig. effect) |
```

Save to `demos/weather/report/evidence-matrix.md`.

---

## Gate 2a — Analysis review

Present a summary of agreements, contradictions, and gaps. Ask:

1. Which contradictions are most important to investigate?
2. Which gaps are priorities for the report?
3. Any direction to emphasize or de-emphasize?
4. Loop back to `/discover-sources` for additional sources? (yes/no)

If the researcher says "skip" or "none," proceed directly to Step 3.

---

## Step 3 — Write the draft report

Follow the structure in `demos/weather/references/report-template.md` exactly.

Requirements:
- Every factual claim must have an inline citation `[author_year]`
- "Consensus" claims require 3+ supporting citations
- Include a Mermaid `graph` evidence map showing paper relationships
- Include a Mermaid `timeline` showing methodological evolution
- Full bibliography at the end with DOI links (never Semantic Scholar URLs)

Save to `demos/weather/report/draft.md`.

---

## Step 4 — Verify

Run the checks in `demos/weather/references/verification-rules.md`:

1. Confirm all output files exist
2. Validate every citation key against `knowledge/index.md`
3. Check every claim has at least one supporting citation
4. Check Mermaid diagram syntax

Save results to `demos/weather/report/verification-log.md`.

Report any flagged citations or unsupported claims before presenting to
the researcher.

---

## Gate 2b — Human draft review

Present the verification summary. Ask:

1. Any sections to remove or expand?
2. Any claims to add or remove?
3. Ready to finalize? (yes → Step 5)

---

## Step 5 — Finalize

Apply researcher feedback to `draft.md` and save the result as
`demos/weather/report/final.md`.

Confirm: "Final report saved to `demos/weather/report/final.md`."

---

## Output files

| File | Purpose |
|------|---------|
| `demos/weather/report/analysis.md` | Cross-source agreements, contradictions, gaps |
| `demos/weather/report/evidence-matrix.md` | Paper-vs-claim stance table |
| `demos/weather/report/draft.md` | First full report draft |
| `demos/weather/report/verification-log.md` | Citation and claim integrity log |
| `demos/weather/report/final.md` | Researcher-approved final report |
