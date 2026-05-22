---
name: Extract Content
description: >
  Reads selected-papers.json produced by the discover-sources skill and
  extracts structured knowledge from each paper into individual markdown
  files with YAML front matter. Use when user says: extract knowledge,
  extract papers, process sources, extract content, or run extraction on
  selected papers. Outputs a knowledge/ folder and index file consumed by
  the synthesize-report skill.
---

# Extract Content

Skill 2 of 4 in the research workflow. Reads the curated source list from
`demos/weather/sources/selected-papers.json` and produces one structured
markdown file per paper in `demos/weather/knowledge/`.

No human gate in this skill — runs to completion automatically if inputs
are valid. Produces structured output consumed by `synthesize-report`.

---

## Step 1 — Load and validate the input

Read `demos/weather/sources/selected-papers.json`. Verify it exists and
contains at least one paper. Report how many papers will be processed.

If the file is missing, tell the user to run `/discover-sources` first.

---

## Step 2 — Fetch paper content

For each paper, retrieve as much full content as possible using this
priority order:

1. **Open-access PDF** — if `open_access: true` and a PDF URL is available, fetch and extract the full text
2. **Abstract + TLDR** — from the Semantic Scholar API using the DOI:
   ```bash
   python3 demos/weather/scripts/semantic_scholar.py "<paper title>" --limit 1
   ```
3. **Abstract only** — use the abstract field already in the JSON
4. **Metadata only** — for manually-added papers with no API record

Flag the fetch method used in the output file's front matter.

---

## Step 3 — Extract structured sections

For each paper, extract the following sections. If a section cannot be
determined from available text, write `"Not determinable from available text."`:

| Section | Description |
|---------|-------------|
| `claims` | Key factual claims made by the paper (bullet list, max 5) |
| `methods` | Research methodology (study design, data sources, instruments) |
| `findings` | Quantitative or qualitative results (be specific — include numbers) |
| `limitations` | Stated or apparent limitations of the study |
| `relevance` | Why this paper matters to the weather modification research question |
| `quotes` | 1–3 verbatim quotes that are most citable (with page/section if available) |

---

## Step 4 — Write knowledge files

Save each paper as `demos/weather/knowledge/<citation-key>.md` where
`citation-key` is the first author's last name + year (e.g., `chen2023.md`).
For duplicate keys, append a letter: `chen2023a.md`, `chen2023b.md`.

File format:

```markdown
---
citation_key: chen2023
title: "Full paper title"
authors: ["Author One", "Author Two"]
year: 2023
journal: "Journal Name"
citation_url: "https://doi.org/10.xxxx/…"
doi: "10.xxxx/…"
citations: 142
triage: primary
fetch_method: abstract   # full_text | abstract_tldr | abstract | metadata
---

## Claims
- …

## Methods
…

## Findings
…

## Limitations
…

## Relevance
…

## Key Quotes
> "…" (Section 3.2)
```

---

## Step 5 — Write the knowledge index

Save `demos/weather/knowledge/index.md`:

```markdown
# Knowledge Index
**Research topic:** <topic>
**Papers extracted:** N
**Date:** <today>

| Citation key | Title (truncated) | Year | Journal | Triage | Fetch method |
|---|---|---|---|---|---|
| chen2023 | … | 2023 | … | primary | abstract |
```

---

## Step 6 — Report results

Print a summary:
- Total papers processed
- Fetch method breakdown (full text / abstract+TLDR / abstract / metadata)
- Any papers that could not be fetched (titles + reason)
- Path to `demos/weather/knowledge/` and `index.md`

Confirm: "Extraction complete — ready for `/synthesize-report`."
