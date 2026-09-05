# Source Triage Report — AI/AGI Overview

**Talk:** AI/AGI Overview lightning talk (~20–30 min)
**Audience:** Software engineers + tech-savvy business people
**Date:** 2026-09-04

Sources are user-supplied (podcast, YouTube, book), not literature-searched,
so triage here reflects *confirmed vs. recommended-pending-confirmation*
rather than a relevance search ranking. See `references/scoring-rubric.md`
for the authority tiers used below.

---

## Keep — Primary (5 sources — user-confirmed)

### 1. Lex Fridman Podcast #501 — DHH (2026)
- **Type:** Podcast episode
- **Speaker:** DHH (creator of Ruby on Rails, CTO of 37signals)
- **Citation:** https://lexfridman.com/dhh-2/
- **Date:** August 26, 2026
- **Authority tier:** Medium-high (named practitioner, long-form interview)
- **Why:** Best available source for the "harnesses/tools" section —
  concrete, opinionated positions on agentic coding, vibe coding vs.
  agentic engineering, AI coding tool/model choices. Mostly `[opinion]`
  claims — will need attribution, not flat statement, on any slide.

### 2. Two Minute Papers — "This Small AI Will Change Everything" (2026)
- **Type:** YouTube video (+ channel generally)
- **Publisher:** Károly Zsolnai-Fehér / Two Minute Papers
- **Citation:** https://www.youtube.com/watch?v=wMl6c_r0ubw
- **Date:** August 2026
- **Authority tier:** Medium-high (specialist channel, research-summary format)
- **Why:** Covers Qwen3-27B — a small open-weight model with outsized
  capability. Direct proof point for the open-weight/local-model section.

### 3. The AI-Driven Leader — Geoff Woods
- **Type:** Book
- **Author:** Geoff Woods (Founder, AI Leadership)
- **Citation:** https://www.amazon.com/AI-Driven-Leader-Harnessing-Smarter-Decisions/dp/B0DB8QL3ZK
- **Authority tier:** Medium (business book — opinion/framing, not empirical)
- **Why:** Bridges to the business-facing half of the room; decision-speed
  framing rather than technical depth. Treat claims as `[opinion]` unless
  independently checkable.

### 4. TechWorld with Nana
- **Type:** YouTube channel
- **Publisher:** Nana Janashia
- **Citation:** https://www.youtube.com/@TechWorldwithNana
- **Authority tier:** Medium-high (largest DevOps-education channel, named
  credentialed host — Docker Captain, AWS Container Hero)
- **Why:** DevOps/infra lens for how AI harnesses actually land in real
  engineering pipelines, not just chat UIs.

### 5. Anthropic — Introducing the Model Context Protocol
- **Type:** Lab publication (announcement)
- **Publisher:** Anthropic
- **Citation:** https://www.anthropic.com/news/model-context-protocol
- **Date:** November 2024
- **Authority tier:** High (first-party primary source)
- **Why:** Required primary source for the MCP section — open standard,
  MIT-licensed, lets models/agents call external tools/data through one
  protocol instead of bespoke integrations.

---

## Review (4 sources — Claude-recommended, pending your decision)

### 6. METR — Measuring AI Ability to Complete Long Software Tasks
- **Type:** Lab publication (empirical research)
- **Publisher:** METR
- **Citation:** https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- **Date:** March 19, 2025 (a January 2026 update, "Time Horizon 1.1,"
  should be checked for a fresher number during extraction)
- **Authority tier:** High (first-party empirical research org)
- **Why:** The single best "how fast is this moving" chart available —
  task-completion time horizon has been doubling roughly every 7 months.
  Strong candidate for the benchmarks section.

### 7. Stanford HAI — 2026 AI Index Report
- **Type:** Industry report
- **Publisher:** Stanford Institute for Human-Centered AI
- **Citation:** https://hai.stanford.edu/ai-index/2026-ai-index-report
- **Date:** April 2026
- **Authority tier:** High (first-party research org, annual fact-checked almanac)
- **Why:** Concrete, dated stats for the cold open and benchmarks sections
  (SWE-bench Verified 60%→~100% in a year; $581.7B global corporate AI
  investment, +130% YoY; gen-AI at 53% population adoption in 3 years).

### 8. Anthropic — Responsible Scaling Policy
- **Type:** Lab publication (policy document)
- **Publisher:** Anthropic
- **Citation:** https://www.anthropic.com/responsible-scaling-policy
- **Date:** Current version 3.4, effective July 8, 2026
- **Authority tier:** High (first-party primary source)
- **Why:** One concrete example of "how a lab actually gates a model
  release" instead of leaving that as a black box — optional depth for
  the AGI/safety section.

### 9b. IEA — Energy and AI
- **Type:** Industry/institutional report
- **Publisher:** International Energy Agency
- **Citation:** https://www.iea.org/reports/energy-and-ai
- **Date:** 2026 update
- **Authority tier:** High (intergovernmental energy agency, first-party data)
- **Why:** Core source for the environmental angle of the new Responsible AI
  section — AI-focused data center electricity demand grew 50% in 2025 vs.
  3% global growth; projected ~945 TWh by 2030 (more than Japan's current
  total use); but data centers are still only ~1% of global electricity
  and 0.5% of CO2 today. Cite both the growth-rate and the current-share
  numbers together so the point doesn't read as alarmist or dismissive.

### 9c. EU AI Act — Regulation (EU) 2024/1689
- **Type:** Official legal text
- **Publisher:** European Union (EUR-Lex)
- **Citation:** https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng
- **Date:** consolidated version, effective 2026-07-27
- **Authority tier:** High (primary legal source)
- **Why:** Concrete governance example — risk-tiered regulation; transparency
  and GPAI duties already in force (Aug 2, 2026); high-risk obligations
  delayed to Dec 2027 (standalone) / Aug 2028 (embedded); fines up to
  €35M or 7% global turnover.

### 9. LMArena (formerly LMSYS Chatbot Arena)
- **Type:** Industry tool / leaderboard
- **Publisher:** LMArena (UC Berkeley-founded, since independent)
- **Citation:** https://lmarena.ai
- **Authority tier:** High (widely-cited human-preference benchmark)
- **Why:** Concrete example for the benchmarks section — human head-to-head
  voting rather than a static test set. Note: this rebranded from
  chat.lmsys.org — worth naming as a live example of how fast the field's
  own infrastructure changes.

---

Note: the Stanford HAI 2026 AI Index Report (#7 above) also directly covers
this section — inference cost collapse (~280x in 2 years, $20 → $0.07 per
million tokens for GPT-3.5-level performance) and its responsible-AI chapter
(incident tracking, public opinion) cover the cost/efficiency and social
angles. No new source needed for those two.

## Dropped

None — no sources have been rejected yet. Epoch AI (compute-trend data) was
considered but not included pending URL verification; can be added via
loopback if wanted.

---

## Gate 1 — COMPLETE (2026-09-04)

Decision: promote all 6 Review sources (METR, Stanford AI Index, Anthropic
RSP, LMArena, IEA Energy and AI, EU AI Act) to Keep — Supporting. No
removals, no manual additions. `selected-sources.json` now holds all 11
sources (5 primary, 6 supporting). Proceeding to Stage 2 — extraction.

---

## Stage 1.5 — Numeric rescore against the 40/30/30 rubric (2026-09-04)

The primary/supporting split above (and the labels used through Gates 2a/2b)
were assigned informally — roughly "found in the first pass" vs. "added via
loopback" — not by actually running the weighted formula in
`references/scoring-rubric.md`. Per request, every one of the 20 final
sources was scored properly: **40% relevance + 30% recency + 30% authority**,
each sub-score 0–1, thresholds per the rubric (Primary ≥0.70, Supporting
0.45–0.69, Review 0.25–0.44, Drop <0.25). Recency scoring applies the
rubric's own "retain pre-2018 only if foundational" exemption — a 2012 or
2017 source anchoring a history claim is scored near 1.0, not penalized for
age, since old-and-foundational is the *correct* vintage for that claim.

| Source | Relevance | Recency | Authority | **Score** | Label |
|---|---|---|---|---|---|
| `gpt6_astra_agi_era` | 1.00 | 1.00 | 1.00 | **1.000** | Keep — Primary |
| `stanford_ai_index_2026` | 0.90 | 1.00 | 1.00 | **0.960** | Keep — Primary |
| `gartner_hype_cycle_2026` | 0.90 | 1.00 | 1.00 | **0.960** | Keep — Primary |
| `iea_energy_ai` | 0.85 | 1.00 | 1.00 | **0.940** | Keep — Primary |
| `eu_ai_act_2024_1689` | 0.85 | 1.00 | 1.00 | **0.940** | Keep — Primary |
| `openai_charter` | 0.85 | 1.00 | 1.00 | **0.940** | Keep — Primary |
| `deepseek_v4_flash` | 0.85 | 1.00 | 1.00 | **0.940** | Keep — Primary |
| `openai_chatgpt_launch` | 0.85 | 1.00 | 1.00 | **0.940** | Keep — Primary |
| `anthropic_mcp` | 1.00 | 0.75 | 1.00 | **0.925** | Keep — Primary |
| `anthropic_rsp` | 0.80 | 1.00 | 1.00 | **0.920** | Keep — Primary |
| `attention_is_all_you_need` | 0.80 | 1.00 | 1.00 | **0.920** | Keep — Primary |
| `alexnet_imagenet_2012` | 0.80 | 1.00 | 1.00 | **0.920** | Keep — Primary |
| `deepmind_levels_of_agi` | 0.85 | 0.90 | 1.00 | **0.910** | Keep — Primary |
| `metr_long_tasks` | 0.90 | 0.70 | 1.00 | **0.870** | Keep — Primary |
| `dhh_lexfridman501` | 0.85 | 1.00 | 0.70 | **0.850** | Keep — Primary |
| `two_minute_papers_qwen3` | 0.85 | 1.00 | 0.70 | **0.850** | Keep — Primary |
| `mixtral_of_experts` | 0.80 | 0.75 | 1.00 | **0.845** | Keep — Primary |
| `lmarena_chatbot_arena` | 0.75 | 0.60 | 0.70 | **0.690** | Keep — Supporting |
| `ai_driven_leader_woods` | 0.75 | 0.60 | 0.50 | **0.630** | Keep — Supporting |
| `techworld_nana` | 0.55 | 0.60 | 0.70 | **0.610** | Keep — Supporting |

**Result: 17 Primary, 3 Supporting, 0 Review, 0 Drop** — every source clears
the Keep bar, so nothing changes about *what's in the source set*. What
changes is the label: 12 sources that were informally called "supporting"
score as Primary once actually scored — mostly because this set skews
heavily toward first-party lab/institutional publications, which score
1.00 on authority. Only three sources land as genuinely Supporting, and
each for a legible reason:
- `ai_driven_leader_woods` (0.63) — opinion/framing book, medium authority tier
- `techworld_nana` (0.61) — channel-level only, no specific citable video
  (relevance capped until a specific video is identified)
- `lmarena_chatbot_arena` (0.69) — a crowdsourced tool, not first-party lab
  research; just under the Primary line

This is the authoritative triage going forward — `selected-sources.json`,
`knowledge/index.md`, and `report/final.md` have been updated to match.
Individual `knowledge/*.md` files' frontmatter `triage:` field still shows
the original informal labels from extraction time and has **not** been
bulk-edited to match — treat this table, not that field, as the source of
truth for triage tier.
