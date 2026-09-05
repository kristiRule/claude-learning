---
short_name: mixtral_of_experts
title: "Mixtral of Experts"
speaker: "Mistral AI"
publisher: "arXiv"
date: 2024-01
citation_url: "https://arxiv.org/pdf/2401.04088"
type: lab_publication
authority_tier: high
triage: supporting
fetch_method: web_search_secondary
---

## Claims

- [fact] Mixtral is a confirmed, published, open-weight Sparse
  Mixture-of-Experts (MoE) model from Mistral AI — architecture fully
  documented, unlike frontier closed-model architectures which labs
  typically don't disclose.
- [fact] Mixture-of-Experts, generally: instead of running every
  parameter on every input (a "dense" model), an MoE model routes each
  token to a small subset of specialized "expert" sub-networks via a
  router/gate. Total parameter count can be huge, but only the selected
  experts activate per token — so a trillion-parameter-class model can
  run at something closer to the compute cost of a much smaller dense
  model.
- [fact] This is the key mechanism behind how modern giant models keep
  scaling capability without a proportional increase in per-query
  compute cost — directly relevant to the cost-collapse trend in
  [stanford_ai_index_2026].

## Limitations

None significant for the general MoE mechanism (well-established,
widely documented). Specific routing details (number of experts, top-k
selection) vary model-to-model — cite Mixtral's own published numbers if
a slide states specifics, not generic MoE claims.

## Relevance

Primary source for a **new MoE sub-topic in Section 6 (model landscape)**
— the clean, citable, open-weight counter-example to GPT-6 Astra's
rumored (unconfirmed) MoE architecture: "here's a technique frontier labs
use behind closed doors, and here's an open-weight model that shows you
exactly how it works because the weights and paper are both public."

## Key Quotes

None needed — the architecture description carries the slide.
