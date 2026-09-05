---
short_name: rag_lewis_2020
title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
speaker: "Lewis, Perez, Piktus, Petroni, Karpukhin, Goyal, Küttler, Lewis, Yih, Rocktäschel, Riedel, Kiela"
publisher: "arXiv / Facebook AI Research"
date: 2020-05-22
citation_url: "https://arxiv.org/abs/2005.11401"
type: lab_publication
authority_tier: high
triage: primary
fetch_method: web_search_secondary
---

## Claims

- [fact] This is the paper that introduced and named Retrieval-Augmented
  Generation (RAG), published May 22, 2020.
- [fact] The core architecture pairs "parametric memory" (a pre-trained
  seq2seq model, i.e. the model's own trained weights) with
  "non-parametric memory" (a dense vector index that can be searched at
  query time).
- [fact] Stated motivation: large pre-trained models store factual
  knowledge in their parameters, but their ability to access and
  precisely manipulate that knowledge is limited, and **providing
  provenance for their decisions and updating their world knowledge**
  were open problems. RAG addresses both.
- [fact] The paper reports RAG models achieving state-of-the-art results
  on knowledge-intensive NLP tasks, generating more specific and factual
  output than parametric-only (model-weights-only) approaches.

## Limitations

Extraction is from the abstract and secondary summaries, not a full read
of the paper. The 2020 architecture (dense vector index + seq2seq) is the
origin point; production RAG systems in 2026 vary widely in
implementation. Present RAG on the slide as a *pattern*, not as this
specific paper's exact architecture.

## Relevance

**Origin citation only, not the slide's framing.** This paper is what
lets us define RAG accurately and back the "that's why it can cite
sources" point (provenance was one of the paper's own stated
motivations). It is deliberately *not* the shape of the slide.

The slide it supports ("Three ways to get your data into a model") is
framed around 2026 practice, not 2020 architecture, after the user
correctly pushed back on citing a five-year-old paper inside a practical
how-to section. RAG is presented as one of three current options
alongside long-context prompting and agentic retrieval over
[[anthropic_mcp]], per [[rag_vs_longcontext_2026]]. Treat this paper as
the footnote proving the definition, not as a description of how RAG is
built today.

## Key Quotes

None pulled verbatim; the abstract's framing of provenance and knowledge
updating is paraphrased above.
