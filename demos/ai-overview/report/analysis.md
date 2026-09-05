# Cross-Source Analysis — AI/AGI Overview

**Date:** 2026-09-04
**Sources analyzed:** 11 (see `knowledge/index.md`)

---

## Areas of agreement (2+ independent sources)

**AI capability is accelerating, not plateauing.**
Supported by [stanford_ai_index_2026] (explicit framing, SWE-bench Verified
60%→~100% in a year), [metr_long_tasks] (task-completion time horizon
doubling ~every 7 months), and [two_minute_papers_qwen3] (small models
gaining capability fast). Three independent, high/medium-high-authority
sources — safe to state as a headline claim.

**The harness/agent-tooling layer is where the action is right now, not
just raw model capability.**
Supported by [dhh_lexfridman501] (agentic engineering vs. vibe coding as a
live distinction in production engineering conversations), [anthropic_mcp]
(a purpose-built standard for agent-tool connections, adopted by named
dev-tool companies), and [techworld_nana] (DevOps-native audience
increasingly engaging with this tooling layer). Good grounding for
positioning Section 5 as the talk's technical center of gravity.

**Cost/efficiency per unit of capability is falling fast, even as
aggregate compute/energy use rises.**
Supported by [stanford_ai_index_2026] (~280x inference cost drop in two
years) and [two_minute_papers_qwen3] (small open-weight models closing
capability gap with much larger ones). This is a genuinely useful "yes,
and" pairing for Section 9 — capability is getting cheaper per query, but
see the tension noted below.

---

## Contradictions / contested claims

**Growing efficiency vs. growing footprint — not a source disagreement,
but a real tension worth stating explicitly on stage.**
[stanford_ai_index_2026] and [two_minute_papers_qwen3] both show cost/
efficiency per query improving dramatically. [iea_energy_ai] simultaneously
shows AI-driven data center electricity demand growing far faster than
overall grid demand (50% YoY vs. 3%). Both are true at once: efficiency
gains are being outpaced by volume growth. This should be presented as a
nuance, not resolved artificially in either direction — recommend framing
it as "getting cheaper per query, more expensive in aggregate" in Section 9.

**How bold to be on "manual programming is becoming obsolete."**
[dhh_lexfridman501] raises this as an open, opinionated question (framed
as a live debate DHH is having, not a settled claim). [ai_driven_leader_woods]
argues a softer framing — AI as a productivity/thinking-partner multiplier
for people, not a replacement narrative. Recommend the talk present DHH's
framing as one provocative, attributed viewpoint ("DHH argues...") rather
than the talk's own conclusion, and let Woods's framing carry the
audience-reassurance load in Section 10.

**Self-governance vs. external regulation — a pattern, not a
contradiction.**
[anthropic_rsp] (voluntary, lab-authored) and [eu_ai_act_2024_1689]
(binding, government-authored) represent two different governance
mechanisms operating in parallel, not conflicting claims. Good explicit
pairing for Section 9: "here's a lab policing itself; here's a government
policing everyone."

---

## Gaps — RESOLVED via Gate 2a loopback (2026-09-04)

1. **Gartner Hype Cycle** → closed by `gartner_hype_cycle_2026`. Turned out
   better than a generic explainer would have been: GenAI (Trough of
   Disillusionment) and Agentic AI (Peak of Inflated Expectations) sit at
   *two different points* on the 2026 curve simultaneously.
2. **AGI definition landscape** → closed by `openai_charter` (one-sentence
   lab definition), `deepmind_levels_of_agi` (structured 5-level
   framework), and a major bonus find: `gpt6_astra_agi_era` — OpenAI
   literally declared "the AGI era" on Sept 3, 2026, one day before this
   research pass, giving the section a live, current, contested example
   instead of a purely abstract debate.
3. **Foundational history facts** → closed by `attention_is_all_you_need`
   (2017), `alexnet_imagenet_2012` (2012), and `openai_chatgpt_launch`
   (Nov 2022) — all primary/foundational papers or lab posts, uncontested.
4. **"What is a neural network" explainer** — still no dedicated source;
   left as-is since this section is a pedagogical mental model, not a
   contested factual claim (see original note). Not re-flagged as a gap.

New cross-cutting finding from the loopback: `gpt6_astra_agi_era` now
touches **four** sections at once (cold open, benchmarks, AGI, governance)
— see its knowledge file for the full breakdown, especially the ARC-AGI-3
scoring dispute (OpenAI's own Astra number vs. a reported NVIDIA/Claude
Opus 5 counter-example showing scaffold-not-just-model drives scores),
which is an unusually clean, current illustration for "why leaderboards
can mislead" in Section 7.

## Patterns

- The source set skews toward **2025–2026 recency** (8 of 11 sources are
  from this window), which fits a talk explicitly about "the last 12
  months" but means older foundational claims (the actual history section)
  are currently the thinnest-sourced part of the talk.
- **Authority skews high on the institutional/lab side** (5 of 11 sources
  are first-party lab/institutional publications) and **medium on the
  commentary side** (podcast, book, channels) — a healthy mix for a talk
  that needs both credibility and personality.

---

## Evidence Matrix

See `report/evidence-matrix.md`.
