---
short_name: fireship_astra_vs_fable
title: "I built the same game with Astra and Fable 5.1... only one was fun"
speaker: "Jeff Delaney (Fireship / The Code Report)"
publisher: "Fireship"
date: 2026-09-09
citation_url: "https://www.youtube.com/watch?v=2Xiljy4xzbc"
type: youtube_video
authority_tier: medium-high
triage: primary
fetch_method: oembed_metadata + auto_caption_transcript
---

## Claims

- [fact] Published 2026-09-09 (1.37M views at time of extraction), six days
  after GPT-6 Astra's launch and one day after Astra reached general
  availability to "the man willing to pay $100 for a GPT Pro membership."

- [fact] **NVIDIA CEO Jensen Huang publicly declared AGI achieved.** Posted
  on X: "AGI has arrived. Congratulations, OpenAI team." Delaney
  immediately flags the conflict of interest — in the same post Huang
  noted Astra was trained on more than 100,000 of NVIDIA's Grace Blackwell
  GPUs, with another 400,000 coming online soon. Delaney, deadpan:
  "Obviously, he has nothing to gain here."

- [opinion] The running joke that frames the whole video: if Astra is AGI,
  "every human being working in front of a computer right now is officially
  obsolete. And that's the fifth time that's happened this year."

- [fact — first-party experiment] **Head-to-head test.** Delaney sent the
  identical prompt to GPT-6 Astra and Fable 5.1 at the same time: a rocket
  launch simulator with rocket customization, a brief his kids chose.
  Astra finished in ~26 minutes; Fable took substantially longer.

- [opinion — subjective, n=1] **The result is a split along a clean axis,
  and it is the point of the video.**
  - *Astra* — "highly detailed and beautiful" 3D graphics with very few
    mistakes, beautiful UI. But: "I wouldn't exactly describe this game as
    fun to play." And a sharper observation — the UI "looks almost
    identical to a lot of other games that I've seen on Twitter. There's a
    very obvious formula being used here that makes it easy to spot
    ChatGPT generated games."
  - *Fable 5.1* — "the graphics were embarrassing by comparison," UI "looks
    like it was built with Twitter Bootstrap." But: "the gameplay was far
    superior." More rocket-customization options, "way more knobs to turn,"
    and "scientific calculations that make this feel more like a legit
    rocket simulator," plus more success/failure paths and better
    explosion animations.
  - Verdict split by his kids: the 3-year-old preferred the simpler Astra
    game, the 8-year-old preferred the more complex Fable one.

- [fact — first-party experiment] **3D generation improved sharply in ~2
  months.** In July, GPT Sol was asked for an exploded view of a mechanical
  watch and returned "a pile of useless garbage." The same prompt re-run
  2026-09-08 produced "a beautiful diagram that likely would have taken a
  3D designer hundreds of hours to produce."

- [opinion] Delaney's concern about that capability: it erases the moat
  under high-effort 3D explainer content (he names Jared Owen's channel)
  and "the rise of 3D slop is going to be the next big thing that makes
  the internet suck even more."

- [claim — SECONDARY, NEEDS PRIMARY SOURCE] On ARC: Delaney says Astra was
  "the first model to reach the top of the Arc benchmark, which was
  designed specifically as a benchmark that can't be memorized, which
  forces a model to demonstrate how well it generalizes intelligence,"
  with Anthropic's Opus "sitting at 30%." He then adds: **"a team at
  Berkeley already scored 99% on the Arc AGI benchmark several months ago.
  They did it with Opus 4.8 and Fable 5, but the real difference maker was
  the harness."** See Limitations — this is important but not yet
  independently confirmed.

## Limitations

- **Format is comedy/commentary.** The Code Report is a satirical news
  segment. Delaney's factual spine is generally sound but the delivery is
  deliberately hyperbolic ("turbo AI machine god for 3D games," "slop out
  amazing games"). Tag accordingly; never quote the jokes as assessments.
- **The head-to-head is n=1, unblinded, and subjective.** One prompt, one
  domain (browser 3D game), one evaluator plus two children. It is genuine
  first-party testing and worth citing *as* that — one developer's
  hands-on comparison — not as a general capability finding.
- **His ARC claims are imprecise about version, and that matters.** He says
  "the Arc benchmark" without distinguishing ARC-AGI-1/2 (static puzzles)
  from ARC-AGI-3 (interactive). The "Opus sitting at 30%" figure does not
  match any ARC-AGI-3 number in `arc_agi_chollet` — ARC Prize measured
  Opus 4.7 at 0.18% on ARC-AGI-3 in May 2026 — so he is likely referring
  to an earlier ARC version, or to a differently-scaffolded run. Do not
  put his ARC numbers on a slide.
- **The Berkeley/99% claim is an unresolved lead, not a usable fact.** It
  could not be confirmed: ARC Prize's public leaderboard is JS-rendered
  and did not yield entries via fetch, and it only displays systems costing
  under $10,000 to run — which would exclude the Astra runs in
  `arc_agi_chollet` ($18.8K–$26K) and possibly this one too. Notably, this
  looks like the accurate version of the garbled press anecdote retired on
  2026-09-10 (see `report/verification-log.md` item 1b), which had it as
  *NVIDIA*, *Claude Opus 5*, and *100%*. Delaney says *Berkeley*, *Opus 4.8
  and Fable 5*, and *99%*. **Do not restore either version to a slide
  without a primary source.** Worth chasing: it would be a second
  independent confirmation of the harness thesis.

## Relevance

- **Popular models / what they're good at** — this is the strongest
  material in the whole source set for the single most practical question
  the audience has: *they are not interchangeable, and the leaderboard
  leader is not automatically your pick.* Astra optimized for surface
  polish, Fable for simulation depth and logic. Same prompt, same day.
  That contrast is more useful to a working engineer than any benchmark
  table, and it generalizes directly to picking a model inside a tool like
  GitHub Copilot.
- **What AGI is / how to read a claim** — Huang's "AGI has arrived" is a
  near-perfect companion to Brockman's "welcome to the AGI era" in
  `gpt6_astra_agi_era`. Two AGI declarations in one week, both from people
  with an obvious financial stake, one of whom disclosed the stake in the
  same breath. That upgrades the AGI section from "nobody agrees" to
  "notice who is doing the declaring."
- **Benchmarks** — independent, if imprecise, corroboration of the harness
  thesis: "the real difference maker was the harness."

## Key Quotes

> "AGI has arrived. Congratulations, OpenAI team."
> — Jensen Huang, quoted by Delaney

> "Obviously, he has nothing to gain here."
> — Delaney, immediately after noting Astra trained on 100,000+ NVIDIA GPUs

> "There's a very obvious formula being used here that makes it easy to
> spot ChatGPT generated games."

> "The graphics were embarrassing by comparison... However, after actually
> playing the game for a few minutes, I quickly realized that the gameplay
> was far superior."

> "The real difference maker was the harness."
