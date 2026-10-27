---
short_name: oct2026_hardware_wave
title: "October 2026 inference hardware wave — Maia 300, Vera Rubin shipping, OCP"
speaker: null
publisher: "OCP Global Summit / Microsoft / NVIDIA / AMD (via trade press)"
date: 2026-10
citation_url: "https://spectrum.ieee.org/inference-hardware-revolution"
type: industry_report
authority_tier: medium-high
triage: primary
fetch_method: web_search_multi_source
---

## Claims

- [fact] **NVIDIA Vera Rubin is shipping.** The Rubin GPU carries 336
  billion transistors, **288 GB of HBM4**, **22 TB/s** of bandwidth, and
  delivers 50 PFLOPS NVFP4 inference per GPU. Entered full production
  January 2026, shipping to hyperscalers and neoclouds in H2 2026.
- [fact — THE NUMBER FOR THE COST THREAD] At rack scale, the Vera Rubin
  platform is a seven-chip "AI factory" delivering 3,600 PFLOPS NVFP4 per
  rack — **5× the throughput of Blackwell at 10× lower cost per token**.
- [fact] **Microsoft unveiled Maia 300** on 2026-10-13, its **third**
  in-house accelerator. Every major cloud now builds its own inference
  silicon: AWS Trainium, Google TPU, Microsoft Maia, plus OpenAI's
  Jalapeño.
- [fact] At the **OCP Global Summit (opened 2026-10-12)**, NVIDIA handed
  its **Vera Rubin rack designs to the Open Compute Project**, and AMD
  published its **Helion open rack blueprint**. Frontier-scale rack
  designs are becoming open specifications rather than proprietary ones.
- [fact] **Jalapeño was named to TIME's Best Inventions of 2026** on
  2026-10-15. Updated detail on it: each package pairs the compute die
  with six HBM4 stacks for 216 GiB at 15.4 TB/s, co-developed with
  Broadcom **and Celestica**, and the published comparison is against
  NVIDIA's **GB300** — 700 W versus 1,400 W, up to 1.9× throughput per
  kilowatt and 3.6× lower latency.

## Limitations

- **Date discrepancy on Jalapeño, flagged:** `openai_broadcom_jalapeno`
  records the unveiling as 2026-08; some October sources date the unveiling
  to June 2026 with first published results following later. The deck does
  not state a Jalapeño date, so nothing on a slide depends on resolving
  this — but do not add one without checking.
- Vera Rubin's "5× throughput, 10× lower cost per token" is NVIDIA's own
  claim at rack scale, not an independent measurement. Attribute.
- Maia 300 specifications were not retrieved; only its existence, date and
  that it is Microsoft's third accelerator.

## Relevance

Keeps the hardware slide current, six weeks after it was built, without
needing a new slide. Three updates land in the existing speaker notes:
HBM4 moved from "in production" to **shipping in volume**; the custom-chip
trend went from "AWS does it" to **every major cloud plus OpenAI**; and
Vera Rubin's 10× cost-per-token figure gives the cost-collapse thesis its
hardware leg.

The **OCP donations are the most audience-relevant item** and are new: when
NVIDIA and AMD publish frontier rack designs as open specifications, the
question for an infrastructure team shifts from "can we buy this" to "can
we build to this spec." That is a different conversation than the one the
current slide sets up.
