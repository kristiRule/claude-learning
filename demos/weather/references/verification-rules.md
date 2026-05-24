# Verification Rules

Used by the `synthesize-report` skill to self-check the generated report
before presenting it for human review.

---

## Rule 1 — File existence

Confirm all expected output files exist before declaring the skill complete:

- [ ] `demos/weather/knowledge/index.md`
- [ ] `demos/weather/report/analysis.md`
- [ ] `demos/weather/report/evidence-matrix.md`
- [ ] `demos/weather/report/draft.md`
- [ ] `demos/weather/report/verification-log.md`

If any file is missing, note it in the verification log and attempt to regenerate.

---

## Rule 2 — Citation integrity

For every inline citation `[author_year]` in the report:

1. Confirm the citation key exists in `knowledge/index.md`
2. Confirm the `citation_url` is a real DOI, institution URL, arXiv, or PubMed link — not a Semantic Scholar URL
3. Flag any citation key in the report that has no matching knowledge file

Log each violation as:
```
[CITATION ERROR] [author2023] referenced in draft.md but not found in knowledge index
```

---

## Rule 3 — Claim coherence

For each claim in the Executive Summary and Evidence Landscape:

- At least one supporting citation must exist
- Claims described as "consensus" must have 3+ supporting citations
- Claims described as "contradicted" must cite both sides

Flag any unsupported claim as:
```
[UNSUPPORTED CLAIM] "X increases precipitation by 15%" — no citation found
```

---

## Rule 4 — Mermaid diagram syntax

Verify any Mermaid diagrams in the report:
- `graph` and `timeline` diagrams must have valid node definitions
- Node labels must not contain unescaped quotes
- All nodes referenced in edges must be declared

---

## Verification log format

Save results to `demos/weather/report/verification-log.md`:

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

## Overall result
PASS — report is ready for human review.
```
