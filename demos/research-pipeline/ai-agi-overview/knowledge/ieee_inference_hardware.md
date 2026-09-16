---
short_name: ieee_inference_hardware
title: "Why AI's Inference Boom Is Forcing a Rethink of Chips and Memory"
speaker: null
publisher: "IEEE Spectrum"
date: 2026
citation_url: "https://spectrum.ieee.org/inference-hardware-revolution"
type: industry_report
authority_tier: high
triage: primary
fetch_method: web_fetch_primary
---

## Claims

- [fact] The industry has pivoted from training ever-larger models toward
  optimizing **inference**. Demand is driven by reasoning models that run
  multiple inference passes, agentic systems running continuously, and
  broader adoption. NVIDIA's Jensen Huang calls it the "inflection point
  of inference."
- [fact] **The core mechanism, and the most useful thing in this source.**
  Training's prefill phase is parallel and compute-bound. Token generation
  (decode) is **sequential and memory-bandwidth-bound**: for every token,
  the accelerator re-reads the model parameters — tens to hundreds of
  gigabytes — plus a growing KV cache. GPUs are architected for compute
  parallelism, so there is a structural mismatch.
- [fact] Reported consequence: **NVIDIA H100s running open-source LLMs sit
  idle 50 to 80 percent of the time** waiting on data. Quoted framing:
  organizations "greatly over-provision compute and starve on memory."
- [fact] **HBM4 is in production**, destined for NVIDIA's **Vera Rubin**
  GPU (shipping H2 2026). SK Hynix leadership says it will "decisively
  break the memory bottlenecks constraining AI inference today" by
  **doubling maximum memory bandwidth** and raising per-stack capacity.
- [fact] A new category of memory-first accelerators has appeared:
  - **d-Matrix Raptor** — stacks compute directly on DRAM, cutting data
    travel to "micrometers instead of millimeters"
  - **Majestic Labs** — proprietary copper links, up to **128 TB of DRAM
    per rack**, against NVIDIA's roughly 20 TB of HBM3E
  - **Cerebras WSE-3** — 44 GB of on-chip SRAM, holding 40–80B parameters
  - **Groq 3 LPU** — 500 MB on-die SRAM giving "seven times the memory
    bandwidth of the GPU"

## Limitations

- Specific HBM4 bandwidth figures and cost comparisons are not given.
- The 50–80% idle figure is cited to research but the underlying study is
  not named in the extracted text — verify before putting the exact range
  on a slide, or present it as "reported at."
- **This source does not discuss Mixture-of-Experts at all.** Any claim
  connecting MoE to the memory bottleneck is not supported here.

## Relevance

Supplies the *why* underneath every hardware fact in this loopback. The
compute-to-memory shift is the single explanatory idea that makes Jalapeño,
HBM4, XPU growth and the MoE sparsity trend all one story instead of four
unrelated news items.

## Key Quotes

> Nvidia H100 GPUs running open-source LLMs sit idle 50 to 80 percent of
> the time

> greatly over-provision compute and starved on memory
