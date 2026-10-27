---
short_name: meta_muse_wonder
title: "Meta Muse Wonder and Muse Wonder Full — frontier models with closed weights"
speaker: null
publisher: "Meta Superintelligence Labs"
date: 2026-10-12
citation_url: "https://venturebeat.com/technology/metas-new-muse-wonder-and-muse-wonder-full-models-achieve-frontier-performance-but-only-the-weaker-one-is-available-via-api"
type: lab_publication
authority_tier: medium-high
triage: primary
fetch_method: web_search_primary_plus_press
---

## Claims

- [fact] Released **2026-10-12** by Meta Superintelligence Labs. Meta's
  **first frontier-class models**, and the company's explicit claim to have
  "caught up to the frontier."
- [fact — THE HEADLINE FOR THIS DECK] **The weights are closed.** Muse
  Wonder's parameters are not downloadable for self-hosting, private
  infrastructure, or modification. Only the smaller **Muse Glimmer** was
  released under Apache 2.0. The company that made open weights mainstream
  with Llama shipped its best model closed.
- [fact] Live on OpenRouter at **$4 / $20** per million tokens, 1M-token
  context, multimodal input, tool calling, and the ability to drive
  browsers and desktop applications.
- [fact] Two named capabilities, both aimed at long-running agentic work:
  - **Active Memory** — carries context across conversations over days,
    weeks and months, retrieving relevant details when they become needed.
  - **Active Focus** — keeps working toward a goal through blocks, trying
    alternative approaches and recovering from errors instead of stopping
    at the first failure.
- [fact] Meta reports Muse Wonder scoring higher on **MemoryBench** than
  Fable, Opus or Astra.
- [fact] Press noted that only the weaker of the two models is available
  via API, and that Meta's research blog was left empty at launch — a
  marked change from the company's prior publishing posture.

## Limitations

- MemoryBench standing is Meta's own reported result on a benchmark that
  conveniently matches its headline feature. Classic case for the deck's
  own benchmark-reading checklist — who ran it, and does the benchmark
  measure the thing they are selling?
- Primary extraction came via press coverage (VentureBeat, Engadget,
  TechCrunch, Axios) rather than a Meta research publication, because Meta
  did not publish one.

## Relevance

**The most narratively important source in this loopback.** The deck's
open-weight vs closed-model section currently presents a stable two-camp
world with Meta/Llama as a pillar of the open camp. That is no longer
accurate at the frontier: the open-weight champion went closed for its
best model in the same season that Chinese labs shipped MIT-licensed
320B MoE models (`glm53_flash_zai`). The two camps did not just compete —
they partially swapped positions.

Also feeds the agentic thread: Active Memory and Active Focus are both
attempts at the long-horizon autonomy that `metr_long_tasks` measures.
