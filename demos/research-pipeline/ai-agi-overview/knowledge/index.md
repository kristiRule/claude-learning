# Knowledge Index

**Talk:** AI/AGI Overview lightning talk
**Sources extracted:** 22 (11 original + 7 from Gate 2a loopback + 2 from
Gate 2b MoE addition + 2 added post-restructure for the "last 12 months"
recap slide: `nov_2025_frontier_triple_launch`, `apr_2026_release_density`)
**Date:** 2026-09-04
**Triage below reflects the Stage 1.5 numeric 40/30/30 rescore** — see
`sources/triage-report.md` for per-source relevance/recency/authority
scores. 17 Primary, 3 Supporting, 0 Review, 0 Drop.

| Short name | Title (truncated) | Type | Date | Triage | Fetch method |
|---|---|---|---|---|---|
| dhh_lexfridman501 | Lex Fridman #501 — DHH | podcast_episode | 2026-08-26 | primary | web_fetch_show_page |
| two_minute_papers_qwen3 | This Small AI Will Change Everything | youtube_video | 2026-08 | primary | web_search + oembed |
| ai_driven_leader_woods | The AI-Driven Leader | book | — | supporting | web_search_secondary |
| techworld_nana | TechWorld with Nana | youtube_channel | — | supporting | web_search_secondary |
| anthropic_mcp | Introducing the Model Context Protocol | lab_publication | 2024-11-25 | primary | web_fetch_primary |
| metr_long_tasks | Measuring AI Ability to Complete Long Software Tasks | lab_publication | 2025-03-19 | primary | web_search_secondary |
| stanford_ai_index_2026 | The 2026 AI Index Report | industry_report | 2026-04 | primary | web_search_secondary |
| anthropic_rsp | Anthropic's Responsible Scaling Policy (v3.4) | lab_publication | 2026-07-08 | primary | web_fetch_primary |
| lmarena_chatbot_arena | LMArena (formerly LMSYS Chatbot Arena) | industry_report | — | supporting | web_search_secondary |
| iea_energy_ai | Energy and AI | industry_report | 2026 | primary | web_search_secondary |
| eu_ai_act_2024_1689 | EU AI Act, Reg. 2024/1689 | lab_publication | 2026-07-27 | primary | web_search_secondary |
| gartner_hype_cycle_2026 | 2026 Hype Cycle for Agentic AI | industry_report | 2026-04 | primary | web_search_secondary |
| openai_charter | OpenAI Charter | lab_publication | — | primary | web_search_secondary |
| deepmind_levels_of_agi | Levels of AGI | lab_publication | 2023-11 | primary | web_search_secondary |
| gpt6_astra_agi_era | GPT-6 Astra: A new generation of intelligence | lab_publication | 2026-09-03 | primary | web_fetch_primary + press |
| attention_is_all_you_need | Attention Is All You Need | lab_publication | 2017-06-12 | primary | web_search_secondary |
| alexnet_imagenet_2012 | ImageNet Classification w/ Deep CNNs (AlexNet) | lab_publication | 2012 | primary | web_search_secondary |
| openai_chatgpt_launch | Introducing ChatGPT | lab_publication | 2022-11-30 | primary | web_search_secondary |
| mixtral_of_experts | Mixtral of Experts | lab_publication | 2024-01 | primary | web_search_secondary |
| deepseek_v4_flash | DeepSeek-V4-Flash-0731 | lab_publication | 2026-07-31 | primary | web_search_secondary |
| nov_2025_frontier_triple_launch | Nov 2025 triple launch (GPT-5.1/Gemini 3/Opus 4.5) | industry_report | 2025-11 | primary | web_search_secondary |
| apr_2026_release_density | Apr 2026 release density | industry_report | 2026-04 | primary | web_search_secondary |
| rag_lewis_2020 | Retrieval-Augmented Generation (RAG), Lewis et al. | lab_publication | 2020-05-22 | primary | web_search_secondary |
| rag_vs_longcontext_2026 | RAG vs. long context vs. agentic retrieval, 2026 | industry_report | 2026 | supporting | web_search_secondary |

## Fetch method breakdown

- Direct primary fetch: 4 (anthropic_mcp, anthropic_rsp, dhh_lexfridman501 show page, gpt6_astra_agi_era)
- Search + oEmbed: 1 (two_minute_papers_qwen3)
- Secondary summary search: 13

## Items flagged for follow-up before final slides

- **dhh_lexfridman501** — no verbatim transcript; pull direct quotes if
  the talk wants exact wording rather than paraphrase
- **two_minute_papers_qwen3** — specific benchmark numbers should be
  checked against Qwen's own model card
- **techworld_nana** — channel-level only; identify a specific video if a
  citable claim (rather than general framing) is needed
- **metr_long_tasks** — check the newer "Time Horizon 1.1" (Jan 2026)
  update for a fresher time-horizon number than the ~110 min (Mar 2025) figure
- **stanford_ai_index_2026** — verify exact investment/incident figures
  against the report itself, not just third-party summaries
- **eu_ai_act_2024_1689** — spot-check delay dates against an official EU
  source before stating as fixed on a slide
- **gpt6_astra_agi_era** — OpenAI's own page and press coverage report
  different benchmark numbers for the same evals (e.g., ARC-AGI-3 99.9%
  vs. 98.6%); verify against the official system card before quoting an
  exact figure. This is a days-old story — expect it to keep developing.
- **gartner_hype_cycle_2026** — full report is paywalled; placements are
  corroborated across 2+ secondary sources but not read from the primary
  Gartner document directly.

## Gate 2b addition (2026-09-04)

The user requested a Mixture-of-Experts (MoE) sub-topic, tied to GPT-6
Astra's rumored architecture. Added `mixtral_of_experts` and
`deepseek_v4_flash` as clean, confirmed, open-weight MoE examples (the
latter with an exact 284B-total/13B-active split — a cleaner teaching
number than Mixtral's). While researching, corrected an error in
`two_minute_papers_qwen3.md`: the video's model is Qwen3.8-27B (dense
architecture), not a generic "Qwen3-27B" — the true MoE Qwen variant is
Qwen3-30B-A3B, a different model not previously in our source set.

## Gaps closed via Gate 2a loopback (2026-09-04)

- Gartner Hype Cycle → `gartner_hype_cycle_2026`
- AGI definitions → `openai_charter`, `deepmind_levels_of_agi`,
  `gpt6_astra_agi_era` (live current example)
- Pre-2024 history → `attention_is_all_you_need`, `alexnet_imagenet_2012`,
  `openai_chatgpt_launch`

Extraction complete — ready for cross-source analysis (Stage 3).
