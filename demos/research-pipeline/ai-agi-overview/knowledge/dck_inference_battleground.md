---
short_name: dck_inference_battleground
title: "Inference Becomes the Next AI Chip Battleground"
speaker: null
publisher: "Data Center Knowledge"
date: 2026
citation_url: "https://www.datacenterknowledge.com/data-center-chips/inference-becomes-the-next-ai-chip-battleground"
type: industry_report
authority_tier: medium-high
triage: primary
fetch_method: web_fetch_primary
---

## Claims

- [fact] Per a Futurum Group survey (Nov 2025), **GPUs were 58% of data
  center compute spending in 2025**. But in 2026 **XPUs — specialized
  processors and ASICs — lead growth at 22%**, ahead of GPUs at 19% and
  CPUs at 14%. The category is not replacing GPUs; it is growing faster
  than them.
- [opinion — widely held industry framing] "Training AI models is a cost
  center, while inference is a profit center that directly generates
  revenue." Latency and efficiency convert to revenue for anyone running
  an AI service.
- [fact] **AWS reports over 50% of tokens on its Bedrock inference service
  now run on its own Trainium silicon** — the clearest evidence that
  custom inference chips are past the pilot stage at hyperscale.
- [fact] Consolidation is rapid: NVIDIA announced **Rubin CPX** (Sept 2025)
  for massive-context inference and structured a **$20 billion licensing
  deal with Groq**; AMD acquired **Untether AI's** engineering team and
  bought **MK1** (Nov 2025); Intel is pursuing a roughly **$1.6 billion
  acquisition of SambaNova** and has added AMX accelerators to Xeon.
- [fact — MOST AUDIENCE-RELEVANT CLAIM IN THE SET] Mainstream enterprises
  hit a physical wall that hyperscalers do not: *"When you deploy a GB200
  or H100, you're deploying something in the kilowatt range. The retail
  environment has a limited power budget and no real good cooling, so you
  can't run a rack of GPUs."* This creates the opening for smaller,
  power-efficient inference parts at edge and branch locations.

## Limitations

- Trade press, not first-party. Named reporting and attributed survey data,
  but every vendor figure originates with the vendor.
- The Futurum survey is behind the citation; growth percentages should be
  attributed to Futurum rather than stated as neutral fact.
- Intel/SambaNova was reported as *pursuing* — confirm whether it closed
  before describing it as completed.

## Relevance

**The highest-relevance source in this loopback for this specific talk.**
The audience runs on-prem and cloud infrastructure across AWS, Azure, IBM
and SQL Server estates. The kilowatt-and-cooling constraint is their actual
daily problem, and almost nothing else in the 30-source set speaks to it
directly. The AWS Trainium figure also gives them something immediately
checkable inside a platform many of them already operate.

## Key Quotes

> When you deploy a GB200 or H100, you're deploying something in the
> kilowatt range. The retail environment has a limited power budget and no
> real good cooling, so you can't run a rack of GPUs.

> Training AI models is a cost center, while inference is a profit center.
