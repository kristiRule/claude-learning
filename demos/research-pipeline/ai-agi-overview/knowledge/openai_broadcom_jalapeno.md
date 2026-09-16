---
short_name: openai_broadcom_jalapeno
title: "Jalapeño: OpenAI + Broadcom LLM-optimized Intelligence Processor"
speaker: null
publisher: "OpenAI / Broadcom"
date: 2026-08
citation_url: "https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
type: lab_publication
authority_tier: high
triage: primary
fetch_method: web_search_primary_plus_trade_press
---

## Claims

- [fact] OpenAI and Broadcom unveiled **Jalapeño**, described as OpenAI's
  first "Intelligence Processor" — a reticle-sized ASIC architected
  specifically around LLM inference, and the first accelerator in what
  OpenAI calls a multi-generation compute platform. Taken from design to
  production in a **nine-month** cycle.
- [fact] Specifications: **216 GB of HBM4**, up to **15.4 TB/s** of memory
  bandwidth, up to **3.4 MXFP8 PFLOPS** and **13.4 MXFP4 PFLOPS**, rated at
  **700 W** with measured sustained draw at or below **550 W** on the
  workloads tested.
- [fact] Scale-out: **128 accelerators per rack**, up to **2,048 per pod**,
  giving a cluster figure of up to 27 EFLOPS MXFP4, 432 TB of HBM4, and
  32 PB/s aggregate memory bandwidth.
- [fact — VENDOR-REPORTED] Measured against an NVIDIA Blackwell system on
  SemiAnalysis's public **InferenceX** benchmark, Jalapeño handled
  **1.5–1.9× more work per watt** while cutting end-to-end latency by
  **1.7–3.6×**. On Kimi, the largest public model tested, roughly 1.5×
  higher peak performance per watt and 3.4× lower end-to-end latency.
- [fact] Initial deployment targeted for **end of 2026**, expanding after.
- [fact] Per Hot Chips 2026 coverage, the accelerator was itself developed
  with AI assistance — a detail worth one line in a talk about AI capability.

## Limitations

- **Every comparative number is vendor-reported.** The benchmark
  (SemiAnalysis InferenceX) is public, but the run is OpenAI/Broadcom's own
  and has not been independently reproduced. Attribute it on-slide exactly
  the way the ARC-AGI harness figures are attributed — this deck teaches
  that skill, so it has to apply it.
- Specs are first-party and reliable; the Blackwell comparison is marketing
  until someone else runs it.
- openai.com returned 403 to direct fetch; figures assembled from OpenAI's
  own announcement text via search plus Broadcom's investor release and
  Tom's Hardware Hot Chips coverage.

## Relevance

The concrete anchor for a hardware beat. The audience manages infrastructure;
"OpenAI got impatient enough with available silicon to design its own, in
nine months, and it is memory-first" is a fact that lands with that room.
Pairs with `ieee_inference_hardware` for the why and
`dck_inference_battleground` for the market context.

## Key Quotes

> 216 GB of HBM4, up to 15.4 TB/s of bandwidth, 700 W rated

> 1.5 to 1.9 times more work per watt while cutting end-to-end latency by
> 1.7 to 3.6 times — OpenAI/Broadcom, vs. NVIDIA Blackwell on InferenceX
