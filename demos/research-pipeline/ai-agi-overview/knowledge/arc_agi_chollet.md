---
short_name: arc_agi_chollet
title: "ARC-AGI (Abstraction and Reasoning Corpus for AGI)"
speaker: "François Chollet"
publisher: "ARC Prize Foundation"
date: 2026-09-03
citation_url: "https://arcprize.org/arc-agi"
type: lab_publication
authority_tier: high
triage: primary
fetch_method: web_fetch_primary_multi_page
---

## Claims

- [fact] ARC-AGI was introduced by François Chollet in his 2019 paper "On
  the Measure of Intelligence." It defines intelligence as **"skill-
  acquisition efficiency over a scope of tasks"** — not what a system
  already knows, but how efficiently it picks up a genuinely new skill.
  Tasks are built only on "core knowledge priors" (cognitive building
  blocks present at birth or acquired very early) so humans and machines
  are compared without cultural or domain-specific advantage. The design
  target is deliberately "easy for humans, hard for AI."

- [fact] The series has three live versions. ARC-AGI-1 and ARC-AGI-2
  measure **passive fluid intelligence** (static puzzle grids); ARC-AGI-3,
  in ARC Prize's words, "challenges AI agents to adapt on the fly to novel
  interactive environments."

- [fact] ARC-AGI-2 (released 2025) tightened the benchmark: 120 tasks per
  evaluation set (up from 100), tasks vulnerable to brute-force search
  removed, difficulty calibrated against 400+ human testers, new task
  categories for symbolic interpretation / compositional reasoning /
  contextual rule application, and — notably — **explicit efficiency
  metrics that score cost alongside capability**. 100% of tasks were
  solved by at least 2 humans in under 2 attempts. The standing challenge
  is an 85% accuracy target. ARC Prize states "log-linear scaling is
  insufficient to beat ARC-AGI-2."

- [fact] ARC-AGI-3 launched **March 25, 2026** — the first fully
  interactive benchmark in the series. Hundreds of original turn-based
  environments across thousands of game-style levels, with "no
  instructions, no rules, and no stated goals." Agents must explore,
  infer the goal, build a world model, and adapt, without natural-language
  instruction. Human baseline: **100%**. Frontier AI at launch: **0.51%**.

- [fact] Human baseline was established empirically, not estimated: 458
  participants in blind 90-minute in-person sessions at a San Francisco
  testing center (no mention of ARC Prize or AI testing to participants),
  paid ~$130 base plus $5 per environment solved. Every environment was
  beaten by at least two independent participants.

- [fact] **The six-month arc on ARC-AGI-3 is the headline number.** Mar 25,
  2026: frontier AI 0.51%. May 1, 2026: GPT-5.5 scored **0.43%** and Claude
  Opus 4.7 scored **0.18%** (standard harness, semi-private set; ARC Prize
  analyzed 160 replays and found three recurring failure modes — local
  observations mismatching global rules, misclassifying a game by analogy
  to training data, and failing to retain lessons from already-solved
  levels). Sept 3, 2026: GPT-6 Astra scored **62.7%**.

- [fact] **Harness delta, independently verified — this resolves the
  open number discrepancy in `gpt6_astra_agi_era.md`.** ARC Prize's own
  testing of GPT-6 Astra on ARC-AGI-3 Semi-Private:
  - Standard harness: **62.7% for $26,098**
  - Provider Adapter harness: **99.9% for $18,817**

  Same model, same benchmark, same week. ARC Prize attributes the jump to
  the Provider Adapter harness preserving "opaque reasoning state between
  requests" and using compaction for longer conversations, "allowing the
  model to reuse prior work." OpenAI's marketing number (~99.9%) and the
  press number (~98.6%) are therefore **both traceable to harness choice,
  not to a factual dispute about the model.** For scale: human
  participants cost roughly **$12.78 per attempted game**.

- [fact] ARC Prize Verified (announced Nov 4, 2025) exists specifically
  because vendor self-reported scores are not comparable — differences in
  "dataset curation, prompting methods, and many other factors" make
  apples-to-apples comparison impossible. Verified results are run by the
  foundation against a hidden test set with an independent academic panel
  auditing methodology, and carry a badge on the leaderboard. Self-reported
  scores carry no such guarantee.

## Limitations

- ARC-AGI measures one specific thing — efficient adaptation to novelty —
  and its authors are explicit that it is a *necessary but not sufficient*
  signal for AGI. A high ARC-AGI score is not a declaration of AGI, and
  ARC Prize has never framed it that way.
- The 62.7% / 99.9% split is from ARC Prize's Sept 3, 2026 post, published
  the same day as the Astra launch. Very fresh; worth a re-check before the
  talk is delivered.
- ARC-AGI-3 is six months old. The 0.51% → 62.7% move is real but drawn
  from three data points; treat it as a trajectory, not a smooth curve.
- **Supersedes an uncorroborated claim.** `gpt6_astra_agi_era.md` carries a
  press-reported anecdote about an NVIDIA system scoring 100% on ARC-AGI-3
  using Claude Opus 5 over a ~30% base model. ARC Prize's own verified
  write-up on Astra does not mention NVIDIA or any such result. The Astra
  harness delta above makes the identical teaching point with a
  first-party, verified number and should replace it on-slide.

## Relevance

Touches **three sections**, and closes a real gap — the deck defines AGI
and separately discusses benchmarks, but never connects the two. ARC-AGI
is the bridge:

- **Section 8 (what AGI means)** — the natural companion to DeepMind's
  Levels of AGI, already a source here. Levels of AGI gives a taxonomy;
  ARC-AGI gives an operational definition you can actually score against.
  Chollet's "skill-acquisition efficiency" is the cleanest one-sentence
  answer to "what would we even measure?" that this talk can offer, and it
  directly counterweights Brockman's "for me personally, I do think we're
  there."
- **Section 7 (how to read a benchmark)** — the Astra harness delta is a
  near-perfect worked example of all four reading questions at once:
  *what's measured* (adaptation to novelty, not knowledge), *who ran it*
  (ARC Prize Verified vs. vendor self-report), *what scaffold* (62.7% vs
  99.9% on one model), *how fresh* (0.51% to 62.7% in six months).
- **Benchmark-selection matrix** — the missing fourth row. SWE-bench for
  coding, LMArena for chat, METR for autonomy, ARC-AGI for novel
  reasoning / adaptation.

## Key Quotes

> "skill-acquisition efficiency over a scope of tasks"
> — Chollet's definition of intelligence, On the Measure of Intelligence (2019)

> "With our Standard harness, OpenAI's Astra (max) scores 62.7% on
> ARC-AGI-3 Semi-Private for $26K. With the Provider Adapter harness,
> Astra (high) scores 99.9% for $19K."
> — ARC Prize Foundation, Sept 3, 2026

> "no instructions, no rules, and no stated goals"
> — ARC Prize, describing ARC-AGI-3 environments
