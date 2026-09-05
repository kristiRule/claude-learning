# Verification Rules — AI/AGI Overview

Adapted from `demos/research-pipeline/weather/references/verification-rules.md`. DOIs are
replaced with direct URLs (plus a timestamp for audio/video or a
page/chapter for the book).

---

## Rule 1 — File existence

- [ ] `demos/research-pipeline/ai-agi-overview/knowledge/index.md`
- [ ] `demos/research-pipeline/ai-agi-overview/report/analysis.md`
- [ ] `demos/research-pipeline/ai-agi-overview/report/evidence-matrix.md`
- [ ] `demos/research-pipeline/ai-agi-overview/report/draft.md`
- [ ] `demos/research-pipeline/ai-agi-overview/report/verification-log.md`

If any file is missing, note it in the verification log and attempt to
regenerate.

---

## Rule 2 — Citation integrity

For every inline citation in the report:

1. Confirm the source short-name exists in `knowledge/index.md`
2. Confirm the link is a real, direct URL — the lab's own page, the
   podcast's own episode page, the YouTube video URL, or a specific
   book citation (author, title, chapter/page) — never a secondhand
   aggregator when a primary link exists
3. Flag any citation in the report with no matching knowledge file

Log each violation as:
```
[CITATION ERROR] [source_short_name] referenced in draft.md but not found
in knowledge index
```

---

## Rule 3 — Claim coherence

- Every factual claim needs at least one supporting citation
- Claims labeled `[opinion]` in the knowledge files must stay attributed
  on the slide/script ("DHH argues...", "Woods writes...") — never
  restated as settled fact
- Claims described as "consensus" need 2+ independent supporting sources
  (per `min_consensus_citations` in pipeline-config.md)
- A specific number (a percentage, a doubling period, a benchmark score)
  must trace to one identifiable source — flag any number that can't be
  traced

Flag violations as:
```
[UNSUPPORTED CLAIM] "<claim text>" — no citation found
[UNATTRIBUTED OPINION] "<claim text>" — stated as fact, source tags it opinion
```

---

## Rule 4 — Mermaid diagram syntax

- `timeline` (history section) and `graph` (evidence map) diagrams must have
  valid node definitions
- Node labels must not contain unescaped quotes
- All nodes referenced in edges must be declared

---

## Rule 5 — Slide-readiness check (new — not in the weather version)

Before content moves from `report/final.md` into slide drafting:

- Every section has at least one concrete visual/image idea attached, not
  just a bullet list — this talk is explicitly not allowed to be a wall of
  text (see `STYLE_GUIDE.md`)
- Every technical term used in a slide appears in the vocabulary slide list

---

## Verification log format

```markdown
# Verification Log
**Date:** <today>
**Report:** draft.md
**Status:** PASS | FAIL

## Files checked
- [x] knowledge/index.md
- [x] report/analysis.md
…

## Citation checks
- Total citations: N
- Valid: N
- Flagged: N

### Flagged citations
…

## Claim checks
- Total claims checked: N
- Supported: N
- Flagged: N

### Flagged claims
…

## Slide-readiness checks
- Sections missing a visual idea: …
- Terms missing from vocabulary slide: …

## Overall result
PASS — report is ready for human review.
```
