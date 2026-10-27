---
short_name: anthropic_opus_5_5
title: "Introducing Claude Opus 5.5"
speaker: null
publisher: "Anthropic"
date: 2026-09-22
citation_url: "https://www.anthropic.com/claude-opus-5-5"
type: lab_publication
authority_tier: high
triage: primary
fetch_method: web_search_primary
---

## Claims

- [fact] Released **2026-09-22**, the first model in Anthropic's 5.5 family.
  `claude-opus-5-5` is live on the Claude API, Amazon Bedrock, Google Cloud
  and Microsoft Foundry.
- [fact] **A cost release more than a capability release.** Roughly **40%
  lower cost on typical workloads than Opus 5**, with output speeds up over
  **30%**. Priced at **$4 / $20** per million tokens, against Opus 5's
  $5 / $25.
- [fact] 1M-token context, text and image input, adaptive thinking always
  on, knowledge cutoff June 2026.
- [fact] Reported to perform at the level of **Fable 5.1** on most work
  while costing substantially less to run.
- [fact] On the Artificial Analysis Intelligence Index it scores **58**,
  with Sonnet 5.5 at 56 — ahead of Gemini 4 Argon and GPT-6 Astra at
  roughly 53. **This displaces GPT-6 Astra from the top of the index**,
  where it sat when this project last ran (2026-09-16).
- [fact] Anthropic also shipped **Claude Haiku 5.5** on 2026-10-07 with a
  1M-token context.

## Limitations

- The "40% cheaper, 30% faster" figures are Anthropic's own, measured on
  "typical workloads" that are not specified. Attribute them.
- The Intelligence Index placement is Artificial Analysis's measurement,
  not Anthropic's claim, and index position moves frequently — re-check
  shortly before the talk is delivered.

## Relevance

Updates two things that are now stale in the deck. First, the deck's
implicit "Astra is the most capable model" framing no longer holds —
Opus 5.5 leads the independent index.

Second, and more interesting for this audience, it is the clearest
single data point in the **cost-collapse** thread: the headline feature of
a flagship release was that it costs 40% less than its predecessor. Pairs
with `openai_gpt61_sol` (near-Astra performance at one-fifth the price,
one month after Astra) and the Vera Rubin cost-per-token figure in
`oct2026_hardware_wave`.
