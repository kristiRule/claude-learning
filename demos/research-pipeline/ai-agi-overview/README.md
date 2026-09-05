# Run: AI and AGI Overview

The first run through the [research pipeline](../README.md). A ~25 minute
lightning talk for software engineers and infrastructure teams: what AI is,
what AGI is, how to use it, and how to pick a model for a given job.

## Build

```bash
node demos/research-pipeline/ai-agi-overview/gen-deck.mjs           # deck.pptx
node demos/research-pipeline/ai-agi-overview/gen-speaker-notes.mjs  # speaker-notes.docx
node demos/research-pipeline/ai-agi-overview/gen-report.mjs         # report/report.md + research-report.docx
```

Pure Node, no API key. Built `.pptx` and `.docx` are gitignored; they rebuild
in seconds. The report's Markdown form is tracked and renders on GitHub at
[`report/report.md`](report/report.md).

## What's here

| Path | |
|---|---|
| `gen-deck.mjs` | 37 slides. Source of truth for slide content. |
| `gen-speaker-notes.mjs` | Word-for-word script, ~130 wpm. Keeps its own ordered copy of every note, so it must be updated alongside the deck. |
| `gen-report.mjs` | Narrative briefing. Reads `sources/selected-sources.json` directly, so its bibliography cannot drift from the scored list. |
| `sources/` | Scored triage report and the curated source manifest. |
| `knowledge/` | One structured record per source, each claim tagged `[fact]` or `[opinion]`. |
| `report/` | Analysis, evidence matrix, content brief, verification log, and the readable report. |

## This run's numbers

24 sources, 20 primary and 4 supporting. The Gate 2a review caught three
planned sections with no source backing at all (an analyst framework,
competing definitions of AGI, and pre-2024 history) and sent the run back to
source-gathering before any slide was written.

Method, rubric, and publishing steps are shared and live in
[`../references/`](../references/).
