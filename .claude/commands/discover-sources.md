---
name: Discover Sources
description: >
  Discovers and triages academic papers and institutional reports for a
  research question using Semantic Scholar. Use when user says: find papers
  on, search for research about, discover sources, triage papers, literature
  review on, or collect sources for. Outputs a ranked triage report and a
  selected-papers JSON that feeds the extract and synthesize pipeline stages.
---

# Discover Sources

Skill 1 of 4 in the research workflow. Searches Semantic Scholar to locate
sources, ranks them, and produces a structured JSON output contract for the
next pipeline stage (extract-content).

**Citation rule:** Always cite the original paper, journal, or institution
page — never Semantic Scholar. Use DOI links, WMO/NOAA/GAO pages, or the
journal's own URL.

---

## Step 1 — Accept the research question

Take the user's research question as input. Extract 3–5 search keyword
combinations from it. If the question is too broad (e.g., "weather"), suggest
a narrower focus and wait for confirmation before proceeding.

Good keyword combinations for a single query: 3–5 terms, specific and
distinct from each other (e.g., `cloud seeding efficacy rainfall`, not just
`weather`).

---

## Step 2 — Query Semantic Scholar

Run the search script for each keyword combination:

```bash
python3 demos/weather/scripts/semantic_scholar.py "<keywords>" \
  --limit 20 --year-from 2010 \
  --out demos/weather/sources/<slug>-raw.json
```

- If rate-limited (HTTP 429), the script waits and retries automatically
- If fewer than 5 results return, try alternate keyword combinations
- Run 2–3 queries with different keyword sets; merge results and deduplicate
  by title before scoring

---

## Step 3 — Score and rank

Apply the rubric in `demos/weather/references/scoring-rubric.md`:

- **40% Relevance** — how directly does the source address the question
- **30% Recency** — prefer 2018–present; retain pre-2018 only if foundational
- **30% Impact** — authority tier (WMO/NOAA/GAO/NAS = high) + citation count

Authority source bonus applies to: WMO, NOAA, NASA, GAO, IPCC, NAS, EPA,
NCAR (high tier) and AMS, AGU, EGU (medium tier).

Assign each paper a triage label:
- **Keep — Primary** (score ≥ 0.70)
- **Keep — Supporting** (0.45–0.69)
- **Review** (0.25–0.44)
- **Drop** (< 0.25)

---

## Step 4 — Write the triage report

Save a human-readable report to `demos/weather/sources/triage-report.md`:

```markdown
# Source Triage Report
**Research question:** <question>
**Queries run:** <list>
**Date:** <today>

## Keep — Primary (N papers)
### 1. <Title> (<Year>)
- **Authors:** …
- **Journal/Source:** …
- **Citation:** <DOI or institution URL — never Semantic Scholar>
- **Why:** <1-sentence relevance note>

## Keep — Supporting (N papers)
…

## Review (N papers)
…

## Dropped (N papers — titles only)
…
```

---

## Step 5 — Write the output contract JSON

Save structured data to `demos/weather/sources/selected-papers.json`.
This file is the input to the `extract-content` skill.

```json
[
  {
    "rank": 1,
    "triage": "primary",
    "title": "…",
    "authors": ["…"],
    "year": 2023,
    "journal": "…",
    "citation_url": "https://doi.org/…",
    "doi": "10.xxxx/…",
    "abstract": "…",
    "citations": 142,
    "open_access": true
  }
]
```

Include only **Keep — Primary** and **Keep — Supporting** papers. Drop and
Review papers are excluded unless the researcher overrides in Gate 1.

---

## Gate 1 — Human curation

Pause and present the triage report summary. Ask the researcher:

1. **Remove:** Any papers to exclude from `selected-papers.json`?
2. **Keep from Review:** Any "Review" papers to promote to Keep?
3. **Add:** Any specific papers, DOIs, or reports to add manually?

After receiving answers, update `selected-papers.json` accordingly, then
confirm: "Gate 1 complete — `selected-papers.json` is ready for extraction."

---

## Output files

| File | Purpose |
|------|---------|
| `demos/weather/sources/triage-report.md` | Human-readable ranked list for researcher review |
| `demos/weather/sources/selected-papers.json` | Structured output contract → input to extract-content |

## Edge cases

- **No results:** broaden keywords or remove year filter
- **All low scores:** check that the research question is specific enough
- **Duplicate titles:** keep the entry with the higher citation count and the DOI link
- **No DOI available:** use arXiv, PubMed, or open-access PDF URL; flag it in the report
