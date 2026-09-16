---
short_name: glm53_flash_zai
title: "GLM-5.3-Flash (Z.ai) — 320B-A18B multimodal MoE"
speaker: null
publisher: "Z.ai"
date: 2026-08-26
citation_url: "https://recipes.vllm.ai/zai-org/GLM-5.3-Flash"
type: lab_publication
authority_tier: high
triage: primary
fetch_method: web_search_config_verified
---

## Claims

- [fact] Released by Z.ai on **2026-08-26** under the **MIT license**, with
  downloadable weights. Approximately **321B total parameters, ~18B active
  per token** — an activation ratio of about **5.6%**.
- [fact — THE SLIDE NUMBER] The architecture routes each token through
  **8 of 288 routed experts** (plus one shared expert), across 45 layers.
  Confirmed against the model's published `config.json`.
- [fact] For contrast, **Mixtral** — the MoE example already in this deck —
  routes each token through **2 of 8** experts. So expert-level sparsity
  moved from **25% to 2.8%** in roughly two years.
- [fact] Also carries: native FP8 weights, hybrid KDA linear-attention plus
  NoPE sparse MLA layers, multi-token prediction, a **1M-token context
  window**, and native multimodality (image and video input).

## Limitations

- Sourced from the vLLM recipes page and corroborating coverage rather than
  Z.ai's own model card page directly; the decisive detail (8 of 288, 45
  layers, one shared expert) is reported as read from the published
  `config.json`, which makes it verifiable rather than promotional.
- Benchmark standings for this model were not independently confirmed and
  are not used.

## Relevance

The first-party anchor that keeps the MoE sparsity claim off
`open_weight_moe_wave_2026`'s weaker authority. **2 of 8 versus 8 of 288**
is the cleanest single comparison available for showing where MoE has gone,
and it plugs directly into the existing MoE slide's own framing of routing
tokens to a few experts.

Also a useful counterweight to the "frontier AI is closed and expensive"
assumption: a 1M-context, natively multimodal, MIT-licensed model you can
download, at $0.15 per million input tokens.
