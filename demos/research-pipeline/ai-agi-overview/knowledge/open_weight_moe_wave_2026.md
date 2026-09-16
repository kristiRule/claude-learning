---
short_name: open_weight_moe_wave_2026
title: "Five open-weight releases in nine days, and the collapse of the capability premium"
speaker: null
publisher: "Requesty (industry analysis)"
date: 2026-08
citation_url: "https://www.requesty.ai/blog/open-weight-frontier-august-2026-glm-qwen-hy4"
type: industry_report
authority_tier: medium
triage: primary
fetch_method: web_fetch_primary
---

## Claims

- [fact] Five open-weight releases landed in nine days in August 2026:
  | Model | Date | Params | License | Context |
  |---|---|---|---|---|
  | GLM-5.3-Flash (Z.ai) | Aug 26 | 320B total / **18B active** | MIT | 1M |
  | Qwen3.8-Flash (Alibaba) | Aug 26 | 125B + 51B N-gram | open weight | 1M |
  | Hy4 Preview (Tencent) | Aug 28 | 770B total / **49B active** | open source | 1M |
  | MiniMax M3 | Aug 24 | 428B MoE | open weight | 1M |
  | DeepSeek V4-Flash-Vision-Exp | Aug 21 | — | open weight | — |
- [fact] Pricing: GLM-5.3-Flash at **$0.15 / $0.50** per million tokens,
  Qwen3.8-Flash at $0.16 / $0.47.
- [fact] GLM-5.3-Flash "beats GLM-5.2 across every benchmark" at half the
  size. Hy4 Preview leads **SWE-bench Pro**. DeepSeek's vision variant is
  reported approaching or beating Claude Opus 4.8 on visual agent work.
- [opinion] **"The collapse of the capability premium."** Three things that
  were premium differentiators are now standard at the cheap tier: 1M
  context windows, native multimodality, and permissive open-weight
  licenses. The competition has moved to **capability per dollar**, not
  capability.
- [fact] Closed labs answered with **price cuts rather than new features** —
  the article names **GPT-5.6 Sol reduced by over 20%**.
- [opinion — excellent line for this deck] "The model is now the cheap part,
  and the expensive part is everything around it: effort settings, cache hit
  rate, provider choice and retry behaviour."

## Limitations

- **Lowest-authority source in this loopback (0.82).** Industry blog
  synthesis, not first-party and not peer-reviewed. Every per-model figure
  is independently checkable against the model cards and should be checked
  before it reaches a slide — GLM-5.3-Flash's numbers were verified
  (see `glm53_flash_zai`); the others were not.
- "Beats GLM-5.2 across every benchmark" is the vendor's framing relayed by
  a third party. Do not repeat as neutral fact.

## Relevance

Two jobs. First, it is the evidence that MoE did not just continue but
accelerated — feeding the activation-ratio point on the existing MoE slide.
Second, it explains something already sitting unexplained in this project's
own work: the GPT-5.6 Sol promotional price ($4/$20 against $5/$30 list)
noted in `copilot-model-selection-guide.md` is plausibly a **competitive
response to open-weight pressure**, not a routine discount.

The closing line also independently corroborates this deck's harness thesis
and the effort-setting finding from the Sol System work — the model is the
cheap part; the scaffolding around it is where the money goes.
