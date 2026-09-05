# AI / AGI Overview

A ~25 minute lightning talk for software engineers and enterprise technology
teams: what AI is, what AGI is, how to actually use it, and how to pick a
model for a given job.

Built end to end with Claude Code as a demonstration of a **gated,
source-verified research pipeline** that produces a real deliverable. Every
factual claim on a slide traces back to a scored, cited source.

**Artifacts:** `ai-overview-deck.pptx` (37 slides) and
`ai-overview-speaker-notes.docx` (word-for-word script, ~130 wpm).

---

## The flow

Adapted from the four-stage research pipeline in
`.claude/commands/` (`discover-sources`, `extract-content`,
`synthesize-report`, `research-pipeline`). Those commands are hardcoded to
`demos/weather` paths and search Semantic Scholar, which doesn't fit a
source set of podcasts, videos, books, and lab blog posts — so this project
**hand-mirrors the same staged process** against its own adapted reference
docs in `references/`, rather than invoking those commands directly.

```
 Sources (user-supplied + researched)
        │
        ▼
 ┌──────────────────┐
 │ 1. TRIAGE        │  score every source 40% relevance
 │                  │  / 30% recency / 30% authority
 └──────────────────┘  → sources/triage-report.md
        │                sources/selected-sources.json
     Gate 1: human curation
        ▼
 ┌──────────────────┐
 │ 2. EXTRACT       │  one markdown file per source:
 │                  │  claims, limitations, relevance,
 │                  │  quotes. Each claim tagged
 │                  │  [fact] or [opinion].
 └──────────────────┘  → knowledge/*.md + index.md
        │
        ▼
 ┌──────────────────┐
 │ 3. ANALYZE       │  cross-source agreements,
 │                  │  contradictions, gaps
 └──────────────────┘  → report/analysis.md
        │                report/evidence-matrix.md
     Gate 2a: gap review → loop back for more sources
        ▼
 ┌──────────────────┐
 │ 4. DRAFT+VERIFY  │  section-by-section content brief,
 │                  │  then citation-integrity and
 │                  │  claim-support checks
 └──────────────────┘  → report/draft.md
        │                report/verification-log.md
     Gate 2b: human review
        ▼
 ┌──────────────────┐
 │ 5. GENERATE      │  pptx + docx from Node scripts
 └──────────────────┘  → .pptx / .docx
        │
        ▼
 ┌──────────────────┐
 │ 6. VISUAL QA     │  render every slide to PNG and
 │                  │  actually look at it
 └──────────────────┘
        │
        ▼
   Publish (see references/publishing.md)
```

The gates matter. The Gate 2a loopback caught three sections with **zero**
source backing (Gartner hype cycle, AGI definitions, pre-2024 history) and
sent the pipeline back to source-gathering before any slide was written.

Visual QA earned its place too: rendering slides to PNG caught timeline
labels running off the slide edge, a neural-network diagram missing all its
connecting lines, and body text hidden behind a callout box — none of which
were visible from the source code.

---

## Tech stack

| Layer | Tool |
|---|---|
| Runtime | Node.js 24 (ESM) |
| Deck generation | [`pptxgenjs`](https://gitbrent.github.io/PptxGenJS/) 4.0.1 |
| Speaker notes | [`docx`](https://docx.js.org/) 9.6.1 |
| Visual QA | LibreOffice `--headless` → PDF, then poppler `pdftoppm` → PNG |
| Publishing | `rclone` to Google Drive |
| Research | Claude Code with web search + fetch |

No API keys or credentials are required to build the artifacts. The
generators are pure Node and read nothing but their own source.

---

## Layout

```
demos/ai-overview/
├── gen-ai-overview-pptx.mjs     # deck generator (source of truth for slides)
├── gen-speaker-notes.mjs        # speaker-notes docx generator
├── sources/
│   ├── triage-report.md         # scored triage + rubric rationale
│   └── selected-sources.json    # 24 sources w/ per-source scores
├── knowledge/                   # one structured file per source
│   └── index.md                 # master index + follow-up flags
├── report/
│   ├── analysis.md              # agreements / contradictions / gaps
│   ├── evidence-matrix.md       # claim × source matrix
│   ├── draft.md → final.md      # section-by-section content brief
│   └── verification-log.md      # citation + claim integrity checks
└── references/
    ├── STYLE_GUIDE.md           # voice, slide rules, visual system
    ├── scoring-rubric.md        # the 40/30/30 rubric
    ├── verification-rules.md    # what "verified" means here
    ├── report-template.md
    ├── pipeline-config.md
    └── publishing.md            # build, QA, and Drive upload steps
```

---

## Build

```bash
node demos/ai-overview/gen-ai-overview-pptx.mjs
node demos/ai-overview/gen-speaker-notes.mjs
```

The two scripts are **not** coupled: `gen-speaker-notes.mjs` keeps its own
ordered copy of every speaker note. Change a slide and you must update both.

Full build, QA, and publish instructions: [`references/publishing.md`](references/publishing.md).

---

## Sourcing

24 sources: 20 primary, 4 supporting. Every one is a first-party lab
publication, an official legal/institutional text, a named practitioner
channel, or a research org report.

Scored on **40% relevance / 30% recency / 30% authority**, thresholds at
≥0.70 Primary, 0.45–0.69 Supporting. Recency applies a foundational
exemption: a 2012 or 2017 paper anchoring a history claim scores as current,
because old-and-foundational is the correct vintage for that claim.

Two conventions worth calling out:

- **Fact vs. opinion is tagged per claim.** Opinions stay attributed on the
  slide and in the notes ("DHH argues...", "Woods's framework..."), never
  restated as settled fact.
- **Unconfirmed stays labeled unconfirmed.** GPT-6 Astra's rumored ~10T MoE
  parameter count is on a slide *as a rumor*, explicitly marked as not
  confirmed by OpenAI, because the gap between leaked and confirmed specs is
  itself worth teaching.

Known soft spots are documented rather than hidden — see the follow-up flags
in `knowledge/index.md` and the limitations section of each knowledge file.
