---
short_name: deepseek_v4_flash
title: "DeepSeek-V4-Flash-0731"
speaker: null
publisher: "DeepSeek"
date: 2026-07-31
citation_url: "https://huggingface.co/blog/ResterChed/deepseek-v4-flash-official-release"
type: lab_publication
authority_tier: high
triage: supporting
fetch_method: web_search_secondary
---

## Claims

- [fact] DeepSeek released the official DeepSeek-V4-Flash-0731 model on
  July 31, 2026 (a preview, "V4 Flash 0423," shipped April 24, 2026),
  with open weights published on Hugging Face (166.9 GB across 48 shards)
  and API serving in public beta.
- [fact] Architecture: Sparse Mixture-of-Experts, 284B total parameters,
  only 13B activated per token — a concrete, publisher-confirmed
  total-vs-activated split, cleaner as a teaching number than Mixtral's
  (which doesn't publish as clean a headline ratio).
- [fact] Supports a 1M-token context window.
- [fact] DeepSeek states the 13B-active Flash model beats its own
  49B-active "V4-Pro" preview on all nine agentic benchmarks DeepSeek
  publishes, at a fraction of the cost to run — a direct, self-reported
  efficiency claim (smaller-active-parameter model outperforming a
  larger-active one from the same lab).

## Limitations

The "beats V4-Pro on all nine benchmarks" claim is self-reported by
DeepSeek, not independently verified — attribute it as the publisher's
own claim if used, similar to how GPT-6 Astra's benchmark numbers are
handled.

## Relevance

Primary source for the **Mixture-of-Experts sub-topic in Section 6**
— gives the MoE explanation a second, even cleaner confirmed open-weight
example alongside Mixtral, with an exact total/activated parameter count
to put next to GPT-6 Astra's unconfirmed ~10T rumor. Also reinforces the
US–China competitive dynamic already noted in [stanford_ai_index_2026]
("the US–China AI model performance gap has effectively closed") and adds
another concrete data point to the cost-collapse narrative in Section 9.

## Key Quotes

None captured verbatim — recommend citing the total/activated parameter
numbers directly rather than a quote.
