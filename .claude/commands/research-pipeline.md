---
name: Research Pipeline
description: >
  Orchestrates the full research workflow with one command: discover sources,
  extract knowledge, synthesize a report, and finalize — with human checkpoints
  at each stage. Use when user says: run research pipeline, research pipeline,
  full research on, end-to-end research, or start research workflow on any topic.
  Chains discover-sources, extract-content, and synthesize-report skills.
---

# Research Pipeline

Skill 4 of 4 — the orchestrator. Chains the three research skills into a
single gated pipeline. Configuration is in
`demos/weather/references/pipeline-config.md`.

```
Research question
      │
      ▼
[discover-sources] ──► selected-papers.json
      │
   Gate 1: curate sources
      │
      ▼
[extract-content] ──► knowledge/*.md + index.md
      │
      ▼
[synthesize-report: analysis] ──► analysis.md + evidence-matrix.md
      │
   Gate 2a: analysis review (optional loopback to discover-sources)
      │
      ▼
[synthesize-report: draft] ──► draft.md + verification-log.md
      │
   Gate 2b: human draft review
      │
      ▼
[synthesize-report: finalize] ──► final.md
```

---

## Step 1 — Load configuration

Read `demos/weather/references/pipeline-config.md`. Use its settings for
paper limits, scoring weights, output paths, and gate behavior throughout
the pipeline.

---

## Stage 1 — Discover sources

Run the `/discover-sources` skill with the user's research question.

**Output:** `demos/weather/sources/selected-papers.json` and
`demos/weather/sources/triage-report.md`

---

## Gate 1 — Source curation

If `gate_1_enabled: true` in config, pause and present the triage report.
Ask the researcher:
1. Which papers to remove?
2. Which "Review" papers to promote?
3. Any papers to add manually (provide DOI or title)?

Update `selected-papers.json` with the researcher's decisions. Confirm
Gate 1 is complete before proceeding.

---

## Stage 2 — Extract content

Run the `/extract-content` skill pointing to
`demos/weather/sources/selected-papers.json`.

**Output:** `demos/weather/knowledge/*.md` and `demos/weather/knowledge/index.md`

This stage runs to completion with no gate.

---

## Stage 3 — Synthesize: analysis

Run the analysis phase of `/synthesize-report` (Steps 1–2):
cross-source analysis, evidence matrix.

**Output:** `demos/weather/report/analysis.md` and
`demos/weather/report/evidence-matrix.md`

---

## Gate 2a — Analysis review

If `gate_2a_enabled: true`, present the analysis summary. Ask:
1. Contradictions to investigate further?
2. Gaps to prioritize in the report?
3. Emphasis or direction changes?
4. Loop back to discover-sources for more sources? (triggers optional loopback)

**Optional loopback:** If the researcher requests more sources, generate
refined queries, re-run Stage 1 with those queries, append new papers to
`selected-papers.json`, re-run Stage 2 for the new papers only, then
return to Stage 3.

---

## Stage 4 — Synthesize: draft and verify

Run the drafting and verification phases of `/synthesize-report` (Steps 3–4):
write `draft.md`, run verification checks, save `verification-log.md`.

Report any flagged citations or unsupported claims.

---

## Gate 2b — Draft review

If `gate_2b_enabled: true`, present the verification summary. Ask:
1. Sections to remove or expand?
2. Claims to add or remove?
3. Approve for finalization? (yes → Stage 5)

---

## Stage 5 — Finalize

Apply Gate 2b feedback and save `demos/weather/report/final.md`.

Print the full output manifest:

```
Pipeline complete.

Outputs:
  demos/weather/sources/triage-report.md
  demos/weather/sources/selected-papers.json
  demos/weather/knowledge/index.md
  demos/weather/knowledge/<N> paper files
  demos/weather/report/analysis.md
  demos/weather/report/evidence-matrix.md
  demos/weather/report/draft.md
  demos/weather/report/verification-log.md
  demos/weather/report/final.md
```

---

## Context management note

Each stage clears its working context before loading the next skill.
Write all intermediate results to files — do not carry large paper content
in memory across stages. The JSON and markdown files are the pipeline's
shared state.
