# Research Pipeline

A gated, source-verified research workflow that turns a question into three
reviewable artifacts: a **slide deck**, a **speaker script**, and a
**standalone report**.

The point is the process, not any one output. Sources are scored before they
are used, every claim is tagged fact or opinion, gaps are caught by review
gates before anything is written, and the whole trail stays in the repo so
the reasoning is inspectable rather than asserted.

The worked example currently in this directory is a ~25 minute talk on AI and
AGI for engineers and infrastructure teams. Swap the sources and the content,
and the machinery is unchanged.

---

## Outputs

| Artifact | Built by | Format |
|---|---|---|
| Slide deck, 37 slides | `gen-deck.mjs` | `.pptx` |
| Speaker script, word for word | `gen-speaker-notes.mjs` | `.docx` |
| Standalone briefing report | `gen-report.mjs` | `.md` + `.docx` |

```bash
node demos/research-pipeline/gen-deck.mjs
node demos/research-pipeline/gen-speaker-notes.mjs
node demos/research-pipeline/gen-report.mjs
```

Pure Node, no API key required. The report renders on GitHub at
[`report/report.md`](report/report.md) and also builds a printable `.docx`.

---

## The pipeline

```
 Question + candidate sources
        │
        ▼
 ┌──────────────────┐
 │ 1. TRIAGE        │  score each source: 40% relevance,
 │                  │  30% recency, 30% authority
 └──────────────────┘  → sources/triage-report.md
        │                sources/selected-sources.json
     Gate 1: human curation
        ▼
 ┌──────────────────┐
 │ 2. EXTRACT       │  one record per source: claims,
 │                  │  limitations, relevance, quotes.
 │                  │  Every claim tagged [fact]/[opinion].
 └──────────────────┘  → knowledge/*.md + index.md
        │
        ▼
 ┌──────────────────┐
 │ 3. ANALYZE       │  agreements, contradictions, gaps
 └──────────────────┘  → report/analysis.md
        │                report/evidence-matrix.md
     Gate 2a: gap review, loop back for more sources
        ▼
 ┌──────────────────┐
 │ 4. DRAFT+VERIFY  │  content brief, then citation-integrity
 │                  │  and claim-support checks
 └──────────────────┘  → report/draft.md → final.md
        │                report/verification-log.md
     Gate 2b: human review
        ▼
 ┌──────────────────┐
 │ 5. GENERATE      │  deck + speaker notes + report
 └──────────────────┘
        │
        ▼
 ┌──────────────────┐
 │ 6. VISUAL QA     │  render every slide to PNG and look
 └──────────────────┘
```

### The gates earn their place

**Gate 2a** caught three sections of the example talk with zero source
backing (an analyst framework, competing definitions of AGI, and pre-2024
history) and sent the pipeline back to source-gathering before a single
slide existed.

**Visual QA** caught what code review could not: timeline labels running off
the slide edge, a neural-network diagram missing every connecting line, and
body text hidden behind a callout box. Rendering each slide to an image and
actually looking at it is a required step, not a nicety.

---

## Tech stack

| Layer | Tool |
|---|---|
| Runtime | Node.js 24 (ESM) |
| Deck | [`pptxgenjs`](https://gitbrent.github.io/PptxGenJS/) 4.0.1 |
| Notes and report | [`docx`](https://docx.js.org/) 9.6.1 |
| Visual QA | LibreOffice `--headless` → PDF, poppler `pdftoppm` → PNG |
| Publishing | `rclone` to Google Drive |
| Research | Claude Code with web search and fetch |

---

## Layout

```
demos/research-pipeline/
├── gen-deck.mjs             # slides (source of truth for slide content)
├── gen-speaker-notes.mjs    # word-for-word script
├── gen-report.mjs           # report.md + research-report.docx
├── sources/
│   ├── triage-report.md     # scored triage, with rationale
│   └── selected-sources.json# curated list; drives the report bibliography
├── knowledge/               # one structured record per source
│   └── index.md             # master index + follow-up flags
├── report/
│   ├── report.md            # the readable output
│   ├── analysis.md          # agreements / contradictions / gaps
│   ├── evidence-matrix.md   # claim × source matrix
│   ├── draft.md → final.md  # section-by-section content brief
│   └── verification-log.md  # citation + claim integrity checks
└── references/
    ├── STYLE_GUIDE.md       # voice, slide rules, visual system
    ├── scoring-rubric.md    # the 40/30/30 rubric
    ├── verification-rules.md
    ├── report-template.md
    ├── pipeline-config.md
    └── publishing.md        # build, visual QA, Drive upload
```

`gen-deck.mjs` and `gen-speaker-notes.mjs` are **not coupled**: the notes
script keeps its own ordered copy of every speaker note. Change a slide and
update both. `gen-report.mjs` is independent of both and reads the source
manifest directly, so its bibliography cannot drift from the scored list.

---

## Running it on a different topic

1. Replace `sources/selected-sources.json` with your own scored sources,
   using the rubric in [`references/scoring-rubric.md`](references/scoring-rubric.md).
2. Write one record per source in `knowledge/`, tagging each claim
   `[fact]` or `[opinion]`.
3. Work through `report/analysis.md` for agreements, contradictions, and
   gaps. Loop back if a planned section has no support.
4. Rewrite the content arrays in the three generator scripts.
5. Build, then run the visual QA pass in
   [`references/publishing.md`](references/publishing.md).

The four staged slash commands this workflow is modeled on live in
[`.claude/commands/`](../../.claude/commands/). They are wired to another
demo's paths and to an academic search backend, so this directory
hand-mirrors the same stages against its own reference docs instead of
invoking them directly.

---

## Sourcing conventions

The example run used 24 sources, 20 primary and 4 supporting: first-party lab
publications, official legal and institutional texts, named practitioner
channels, and research-organization reports.

- **Fact and opinion are tagged separately.** Opinions stay attributed
  wherever they appear and are never restated as settled fact.
- **Unconfirmed stays labeled unconfirmed.** A rumored frontier-model
  parameter count appears in the material *as a rumor*, because the gap
  between leaked and confirmed specifications is itself worth teaching.
- **Weak sources are scored, not hidden.** The lowest-rated source in the set
  is marked as such, and one oddly precise figure from it was deliberately
  left out of the slides.

Known soft spots are recorded in the follow-up flags in
[`knowledge/index.md`](knowledge/index.md) and in the limitations section of
each knowledge record.
