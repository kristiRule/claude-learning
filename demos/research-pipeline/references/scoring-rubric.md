# Source Scoring Rubric — AI/AGI Overview

Adapted from `demos/research-pipeline/weather/references/scoring-rubric.md`. Academic citation
count doesn't exist for a podcast episode or a YouTube channel, so "Impact"
is replaced with "Authority" — a tiered judgment of how credible the speaker
or publisher is on the specific claim being sourced.

---

## Weights

- **40% Relevance** — how directly the source addresses a section of the talk
  (history, neural nets, harnesses/MCP, open-weight models, benchmarks, AGI,
  business framing)
- **30% Recency** — prefer sources from the last ~18 months for anything
  claiming a "current state of the field" fact; older sources are fine for
  foundational/historical claims (e.g., the 2017 transformer paper is always
  "recent enough" for a history claim)
- **30% Authority** — see tiers below

## Authority tiers

**High** — primary source, first-party:
- The AI lab itself for claims about its own models/tools (Anthropic, OpenAI,
  Google DeepMind, Meta AI) — blog posts, model cards, announcements
- Named research orgs publishing original empirical work (METR, Epoch AI,
  Stanford HAI/AI Index)

**Medium-high** — recognized practitioner/expert commentary, not first-party:
- Long-form interviews with named, credentialed guests (e.g., Lex Fridman
  podcast guests who are practitioners, not pundits)
- Channels with a specific technical specialty and track record (Two Minute
  Papers on ML research summaries, TechWorld with Nana on DevOps/infra)

**Medium** — business/practitioner books and general tech press:
- Business books with a named author and stated credentials (e.g., The
  AI-Driven Leader) — treat framing/opinion claims as opinion, not fact;
  only cite factual claims from these if independently checkable

**Low** — treat as color/anecdote only, do not use for factual claims:
- Unsourced social media, aggregator blogs with no named author,
  marketing copy

## Triage labels

- **Keep — Primary** (score ≥ 0.70): use directly, cite by name
- **Keep — Supporting** (0.45–0.69): use to corroborate a Primary source
- **Review** (0.25–0.44): needs a second source before any claim from it
  goes on a slide
- **Drop** (< 0.25): out of scope or too low-authority for this talk

## Special rule — opinion vs. fact

Podcast/interview sources especially will mix stated opinion ("I think
manual programming is going away") with checkable fact ("this tool shipped
in this month"). Tag each extracted claim as `[fact]` or `[opinion]` in the
knowledge file. Opinions are still useful — attributed, on-slide, as "X
argues..." — but never presented as settled fact.
