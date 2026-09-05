---
short_name: gpt6_astra_agi_era
title: "GPT-6 Astra: A new generation of intelligence"
speaker: "Greg Brockman (OpenAI President)"
publisher: "OpenAI"
date: 2026-09-03
citation_url: "https://openai.com/index/gpt-6-astra/"
type: lab_publication
authority_tier: high
triage: primary
fetch_method: web_fetch_primary_plus_press_corroboration
---

## Claims

- [fact] OpenAI released GPT-6 Astra on September 3, 2026 — one day before
  this talk's source-gathering — as a limited preview via its Trusted
  Access Program, with broader Plus/Pro/Business/Enterprise API rollout
  "in the coming days."
- [fact] OpenAI's own page states Astra "saturates" FrontierMath Tier 4
  (~98%) and ARC-AGI-3 (~99.9%), and scores 100% on ExploitBench. Press
  coverage (VentureBeat) reports slightly different numbers for the same
  benchmarks (ARC-AGI-3 98.6%, FrontierMath 97.6%, DeepSWE v1.1 74.1%) —
  **the discrepancy itself should be verified against OpenAI's system
  card before stating an exact number on a slide.**
- [fact] Astra is OpenAI's first model to reach the "Critical" level of
  cybersecurity capability under OpenAI's own Preparedness Framework —
  OpenAI states that, with the right tools/access, it can find previously
  unknown security flaws and develop exploits with reduced step-by-step
  human guidance. This triggered additional internal safety measures.
- [opinion] Brockman opened the model's press briefing with "Welcome to
  the AGI era," and when asked directly if Astra qualifies as AGI, said:
  "For me personally, I do think we're there. I think there's a pretty
  good argument for it" — while also acknowledging "Everyone has a
  different definition of AGI... it's a much more gray, fuzzy thing."
- [rumor — do not state as fact] Industry reporting (not OpenAI) claims
  Astra uses a Mixture-of-Experts architecture at roughly 10 trillion
  total parameters, alongside a "recurrent depth" mechanism that loops
  information through layers. **OpenAI has not confirmed Astra's
  architecture or parameter count.** If used on a slide, this must be
  explicitly labeled as unconfirmed industry speculation, not an
  official spec — a clean teaching moment in itself about the gap
  between leaked/rumored specs and confirmed ones.
- [fact] Independent/critical pushback exists on the benchmark framing:
  a parallel example was reported of an NVIDIA system scoring 100% on
  ARC-AGI-3 using Claude Opus 5 with an underlying model baseline around
  30% — illustrating that surrounding system/scaffold architecture, not
  just the base model, drives headline scores. OpenAI also did not
  release GDPval (its own real-world-task benchmark) scores for Astra,
  which several outlets noted as a conspicuous omission.

## Limitations

This happened essentially the day before this project's research pass —
treat all numbers as provisional pending the official system card
(https://deploymentsafety.openai.com/gpt-6-astra/safety-overview-gpt-6-astra)
and expect commentary/scrutiny to keep evolving fast. Good material for a
talk explicitly about "the last 12 months," but a genuinely live story,
not a settled one — flag verbally on stage that this happened days ago
and may look different by the time the talk is delivered.

## Relevance

Exceptional, extremely current source touching **three sections at once**:
- **Cold open** — "this literally happened this week" is about as strong
  a "why does this moment feel different" hook as exists
- **Section 7 (benchmarks)** — the ARC-AGI-3 methodology dispute (Astra vs.
  the NVIDIA/Claude Opus 5 counter-example) is a perfect, concrete
  illustration of "why leaderboards can mislead" — scaffold matters as
  much as the base model
- **Section 8 (AGI)** — a live, real, contested claim from a major lab's
  own president, in Brockman's own hedged words, to anchor the "nobody
  agrees, here's why" discussion instead of a purely abstract one
- **Section 9 (governance)** — OpenAI's "Preparedness Framework" gating
  Astra's cybersecurity capability is a direct parallel to Anthropic's
  RSP — worth a one-line mention that both major labs now have their own
  version of this self-gating mechanism

## Key Quotes

> "Welcome to the AGI era." — Greg Brockman

> "For me personally, I do think we're there. I think there's a pretty
> good argument for it." — Greg Brockman, on whether Astra is AGI

> "Everyone has a different definition of AGI... It's a much more gray,
> fuzzy thing." — Greg Brockman
