# Research Pipeline Configuration

Settings consumed by the `research-pipeline` orchestrator skill.
Edit this file to change pipeline behavior without modifying the skills themselves.

---

## Search settings

```yaml
database: Semantic Scholar
papers_per_query: 20
max_queries: 3
year_from: 2010
keyword_combinations: 3
rate_limit_retry_seconds: 15
```

## Scoring weights

```yaml
relevance_weight: 0.40
recency_weight: 0.30
impact_weight: 0.30
```

## Extraction settings

```yaml
fetch_priority:
  - full_text_pdf
  - abstract_tldr
  - abstract
  - metadata_only
max_quotes_per_paper: 3
max_claims_per_paper: 5
```

## Report settings

```yaml
report_format: markdown
include_mermaid_diagrams: true
citation_style: chicago_author_date
bibliography_sort: alphabetical
min_consensus_citations: 3
```

## Output paths

```yaml
sources_dir: demos/weather/sources
knowledge_dir: demos/weather/knowledge
report_dir: demos/weather/report
```

## Gate behavior

```yaml
gate_1_enabled: true     # human curation after discover-sources
gate_2a_enabled: true    # analysis review before writing draft
gate_2b_enabled: true    # draft review before finalization
loopback_enabled: true   # allow returning to discover-sources if gaps found
```
