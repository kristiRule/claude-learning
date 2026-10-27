---
short_name: regal_deterministic_grounding
title: "REGAL: A Registry-Driven Architecture for Deterministic Grounding of Agentic AI in Enterprise Telemetry"
speaker: "Yuvraj Agrawal"
publisher: "Adobe Inc. (arXiv preprint 2603.03018)"
date: 2026-03
citation_url: "https://arxiv.org/pdf/2603.03018"
type: academic_paper
authority_tier: medium-high
triage: primary
fetch_method: read_in_full
---

## Claims

- [fact] **READ IN FULL 2026-10-17.** Core idea: ground agents on
  **deterministic, pre-computed artifacts** rather than raw telemetry or
  free-form retrieval. A declarative metrics registry compiles into
  version-controlled MCP tools; agents select from this bounded set rather
  than generating arbitrary queries (explicitly argued against Text-to-SQL
  for this reason — unbounded query surface, governance complexity).
- [fact] **Non-interference property**, stated formally: deterministic
  computation (ingestion, transformation, compilation) must not depend on
  probabilistic interpretation. Interpretation may depend on computed
  artifacts; computation must never depend on interpretation. This is the
  cleanest formal statement in the whole source set of *why* a stale map
  is dangerous — the architecture is specifically designed so that nothing
  the LLM does can corrupt the ground truth it's reasoning over.
- [fact] Explicit comparison table against RAG, Text-to-SQL, dashboard
  overlays and vendor AI platforms on four axes: determinism, token
  scaling, push capability, governance. Registry-driven MCP is the only
  one scoring "definitionally fixed" on determinism.
- [fact] Case study: "why did the iOS crash rate spike yesterday" —
  collapses a multi-step manual cross-system investigation into one bounded
  agent interaction.

## Limitations

- **CORRECTED 2026-10-17 — authority was over-scored before reading.**
  This is a **single-author arXiv preprint**, not peer-reviewed, from one
  Adobe engineer. Real corporate affiliation gives it more weight than a
  personal blog, but it is not equivalent to peer-reviewed research.
- **No quantitative evaluation exists.** The paper states this itself:
  the case study is "not statistically powered as a controlled user
  study." Latency claims ("sub-second," "effectively immediate") and
  token-scaling claims ("substantially larger," "significant qualitative
  reduction") are given with **no numbers attached**. There is no
  measurement of grounding accuracy, task success rate, or error reduction
  anywhere in the paper.
- The paper itself names its real limitations: prototype scope, small
  sample size, no comparison baseline against Text-to-SQL or GraphRAG
  under identical conditions.
- **This source answers "how should you architect grounding" and does
  not answer "does grounding work, measurably."** Treat it as a design
  pattern, not evidence.

## Relevance

Still valuable — architecture, not evidence. It gives the run a concrete,
well-reasoned answer to "what would a grounding layer actually consist of":
versioned Gold artifacts, a registry as single source of truth, a bounded
tool surface, push and pull paths sharing one semantic layer. That is a
usable reference shape.

But it cannot carry the evidentiary weight it was initially assumed to
carry. The paper that actually measures something is
`device_dependency_link_prediction`, and its numbers are considerably less
reassuring than this architecture's framing would suggest.
