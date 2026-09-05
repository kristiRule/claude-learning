# Research Pipeline Configuration — AI/AGI Overview

Adapted from `demos/research-pipeline/weather/references/pipeline-config.md` for a mixed-media
source set (podcast, YouTube, book, lab publications) instead of academic
literature. Edit this file to change pipeline behavior without touching the
hand-mirrored process itself.

---

## Source settings

```yaml
mode: pre_curated          # sources are supplied by the researcher, not searched
search_database: none      # no Semantic Scholar / academic search — N/A for this demo
source_types_allowed:
  - podcast_episode
  - youtube_video
  - youtube_channel
  - book
  - lab_publication         # blog post / paper / announcement from an AI lab
  - industry_report
```

## Scoring weights

```yaml
relevance_weight: 0.40
recency_weight: 0.30
authority_weight: 0.30     # was "impact" in the weather demo — citation count
                            # doesn't apply here, so this scores speaker/publisher
                            # credibility instead (see scoring-rubric.md)
```

## Extraction settings

```yaml
fetch_priority:
  - full_transcript          # podcast/video transcript if available
  - official_summary          # publisher's own summary/show notes/abstract
  - secondary_summary         # reputable third-party writeup
  - metadata_only              # title/description only, flagged for follow-up
max_quotes_per_source: 3
max_claims_per_source: 5
```

## Report settings

```yaml
report_format: markdown
include_mermaid_diagrams: true     # timeline diagram for the history section,
                                    # graph diagram for the evidence map
citation_style: inline_link_plus_timestamp   # [source_short_name, mm:ss] or [source_short_name, p.N]
bibliography_sort: by_section_order
min_consensus_citations: 2         # lower than weather's 3 — smaller source pool
```

## Output paths

Relative to the run directory (`demos/research-pipeline/<run>/`).

```yaml
sources_dir: <run>/sources
knowledge_dir: <run>/knowledge
report_dir: <run>/report
references_dir: demos/research-pipeline/references  # shared
```

## Gate behavior

```yaml
gate_1_enabled: true     # human curation of the triage report
gate_2a_enabled: true    # analysis review before writing the draft
gate_2b_enabled: true    # draft review before finalization
loopback_enabled: true   # allow adding more sources if gaps found
```
