# Verification Log

**Date:** 2026-09-04
**Report:** draft.md
**Status:** PASS (with 2 minor notes, not blocking)

## Files checked
- [x] knowledge/index.md
- [x] report/analysis.md
- [x] report/evidence-matrix.md
- [x] report/draft.md

## Citation checks
- Total distinct sources cited: 18
- Valid (found in knowledge/index.md): 18
- Flagged: 0

All 18 sources in `selected-sources.json`/`knowledge/index.md` are cited
at least once in `draft.md`. No citation key appears in the draft without
a matching knowledge file.

## Claim checks
- Total factual claims checked: ~40 across 11 sections
- Supported: all — every factual claim traces to at least one knowledge
  file citation
- Opinion attribution: DHH's "manual programming" framing, Woods's
  leadership-framework claims, and Brockman's "AGI era"/"we're there"
  statements are all explicitly attributed to their speaker in draft.md
  (not restated as settled fact) — consistent with `scoring-rubric.md`'s
  opinion-vs-fact rule
- Consensus claims: "AI capability accelerating" (3 citations) and
  "cost/efficiency falling" (2 citations) both meet the
  `min_consensus_citations: 2` threshold in pipeline-config.md

### Flagged claims
None unsupported. Two items noted for the Gate 2b review rather than
treated as failures:

1. ~~**[NUMBER DISCREPANCY]** GPT-6 Astra's ARC-AGI-3/FrontierMath scores
   differ between OpenAI's own page and press coverage (99.9% vs. 98.6%,
   98% vs. 97.6%)~~ — **RESOLVED 2026-09-10.** The official system card
   (deploymentsafety.openai.com) carries only safety/alignment evaluations
   and no capability benchmark table, so it could not settle this. The
   ARC Prize Foundation could, and did: its own verified run
   (arcprize.org/blog/astra, 2026-09-03) reports **62.7% for $26,098 with
   the Standard harness and 99.9% for $18,817 with the Provider Adapter
   harness**, the latter preserving reasoning state across requests so the
   model can reuse prior work. The spread is a harness artifact, not a
   factual dispute. Slide copy now cites the verified pair; see
   `knowledge/arc_agi_chollet.md`. The FrontierMath figure (98% vs. 97.6%)
   remains unresolved and is **not** stated on any slide.

1b. **[UNCORROBORATED — REMOVED FROM SLIDES 2026-09-10]** The
   press-reported claim that an NVIDIA-built system scored 100% on
   ARC-AGI-3 using Claude Opus 5 over a ~30% base model does not appear in
   ARC Prize's own Astra write-up and could not be corroborated against a
   primary source. It has been removed from `gen-deck.mjs` and
   `report/final.md` and replaced by the verified harness delta above. Do
   not restore without a primary source.
2. **[STALE-RISK]** METR's ~110-minute time horizon figure is from March
   2025; a January 2026 update ("Time Horizon 1.1") likely has a more
   current number — already flagged in `metr_long_tasks.md` and the
   draft's Section 7 brief.

## Mermaid diagram syntax
- `graph LR` (Evidence Map): 14 nodes, all declared before or at first
  reference; no unescaped quotes inside labels — valid
- `timeline` (History Timeline): 6 entries across 5 distinct years (two
  events both dated 2026, which is valid mermaid timeline syntax — grouped
  under the same period); no syntax issues found

## Slide-readiness checks (Rule 5)
- Sections missing a visual idea: **none** — all 11 sections specify a
  concrete visual (diagram, screenshot, chart, quote-card grid), per
  STYLE_GUIDE.md's image-forward requirement
- Terms missing from vocabulary slide: **ASL (AI Safety Level)** appears
  in Section 9's content brief but isn't in the vocabulary list. Not a
  blocker — recommend spelling it out inline on that one slide ("AI
  Safety Level (ASL)") rather than adding a 11th vocabulary entry for a
  term used only once. "CRIT" and "Preparedness Framework" are named
  frameworks/proper nouns, not undefined jargon — no action needed.

## Overall result
PASS — report is ready for human review (Gate 2b).
