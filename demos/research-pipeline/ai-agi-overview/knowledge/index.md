# Knowledge Index

**Talk:** AI/AGI Overview lightning talk
**Sources extracted:** 31 (11 original + 7 from Gate 2a loopback + 2 from
Gate 2b MoE addition + 2 added post-restructure for the "last 12 months"
recap slide: `nov_2025_frontier_triple_launch`, `apr_2026_release_density`
+ 2 added 2026-09-10: `arc_agi_chollet` to close the AGI/benchmark gap and
`fireship_astra_vs_fable`, a user-supplied hands-on model comparison
+ 5 added 2026-09-16 in the hardware/MoE loopback — see
`sources/triage-hardware-moe-2026-09-16.md`)
**Date:** 2026-09-04 (last updated 2026-09-16)
**Triage below reflects the Stage 1.5 numeric 40/30/30 rescore** — see
`sources/triage-report.md` for per-source relevance/recency/authority
scores. 27 Primary, 4 Supporting, 0 Review, 0 Drop.

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
| arc_agi_chollet | ARC-AGI (Abstraction and Reasoning Corpus for AGI) | lab_publication | 2026-09-03 | primary | web_fetch_primary_multi_page |
| fireship_astra_vs_fable | I built the same game with Astra and Fable 5.1... | youtube_video | 2026-09-09 | primary | oembed + auto_caption_transcript |
| openai_broadcom_jalapeno | Jalapeño: OpenAI + Broadcom Intelligence Processor | lab_publication | 2026-08 | primary | web_search_primary_plus_trade_press |
| ieee_inference_hardware | Why AI's Inference Boom Is Forcing a Rethink of Chips | industry_report | 2026 | primary | web_fetch_primary |
| dck_inference_battleground | Inference Becomes the Next AI Chip Battleground | industry_report | 2026 | primary | web_fetch_primary |
| glm53_flash_zai | GLM-5.3-Flash — 320B-A18B multimodal MoE | lab_publication | 2026-08-26 | primary | web_search_config_verified |
| open_weight_moe_wave_2026 | Five open-weight releases in nine days | industry_report | 2026-08 | primary | web_fetch_primary |

## Fetch method breakdown

- Direct primary fetch: 4 (anthropic_mcp, anthropic_rsp, dhh_lexfridman501 show page, gpt6_astra_agi_era)
- Search + oEmbed: 1 (two_minute_papers_qwen3)
- Secondary summary search: 13
- Multi-page primary fetch: 1 (arc_agi_chollet — arcprize.org benchmark pages + 4 blog posts)
- oEmbed + auto-caption transcript: 1 (fireship_astra_vs_fable — full 7,152-char transcript pulled via youtube-transcript-api after yt-dlp and three transcript mirrors failed)

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
- **gpt6_astra_agi_era** — ~~OpenAI's own page and press coverage report
  different benchmark numbers for the same evals (e.g., ARC-AGI-3 99.9%
  vs. 98.6%)~~ **RESOLVED 2026-09-10** via `arc_agi_chollet`: ARC Prize's
  own verified testing shows both figures trace to harness choice, not a
  factual dispute — 62.7% ($26K) on the Standard harness vs. 99.9% ($19K)
  on the Provider Adapter harness, same model. Slide copy updated to use
  the verified pair. Still a days-old story — expect it to keep developing.
- **gpt6_astra_agi_era** — the press-reported NVIDIA/Claude-Opus-5
  "100% on ARC-AGI-3 over a ~30% base model" anecdote is **not
  corroborated** by ARC Prize's own write-up on Astra. Removed from slide
  copy 2026-09-10 in favor of the verified harness delta. Do not restore
  without a primary source.
- **arc_agi_chollet** — the 62.7%/99.9% pair is from a post published the
  same day as the Astra launch; re-check `arcprize.org/blog/astra` and the
  ARC-AGI-3 leaderboard shortly before the talk is delivered.
- **fireship_astra_vs_fable** — carries an unresolved lead worth chasing:
  Delaney says a **Berkeley team scored 99% on ARC-AGI months ago using
  Opus 4.8 + Fable 5, with the harness as "the real difference maker."**
  This looks like the accurate version of the garbled NVIDIA anecdote
  retired on 2026-09-10. Could not be confirmed — ARC Prize's leaderboard
  is JS-rendered and only lists systems costing under $10K to run. If
  confirmed it becomes a second independent corroboration of the harness
  thesis. **Not slide-usable as-is.**
- **openai_broadcom_jalapeno** — every Jalapeño-vs-Blackwell figure is
  **vendor-reported** on a public benchmark (SemiAnalysis InferenceX) that
  no third party has re-run. Attribute on-slide; do not state as neutral.
- **ieee_inference_hardware** — the "H100s idle 50-80% of the time" figure
  is cited to research the article does not name. Present as "reported at"
  or chase the underlying study before quoting the exact range.
- **dck_inference_battleground** — growth percentages belong to a Futurum
  Group survey; attribute to Futurum. Intel/SambaNova was reported as
  *pursuing* — confirm it closed before describing it as done.
- **open_weight_moe_wave_2026** — lowest authority in the set (0.82). Only
  GLM-5.3-Flash's numbers were verified first-party (`glm53_flash_zai`).
  Verify Hy4 / Qwen3.8-Flash / MiniMax M3 against model cards before use.
- **[SYNTHESIS, NOT SOURCED]** "MoE makes the memory bottleneck worse" is
  reasoning, not a sourced claim — IEEE Spectrum does not discuss MoE at
  all. It follows (all experts resident in memory, only ~3-6% computing, so
  arithmetic intensity falls), but it must be framed as reasoning or left
  off. **Not currently on any slide.**
- **fireship_astra_vs_fable** — his ARC figures ("Opus sitting at 30%") do
  not match any ARC-AGI-3 number in `arc_agi_chollet` and he never says
  which ARC version he means. Do not put his benchmark numbers on a slide;
  the head-to-head game test is the citable part.
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
