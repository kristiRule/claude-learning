# AI/AGI Overview — Presentation Style Guide

Adapted from `demos/dragon-con/STYLE_GUIDE.md`'s structure, for a lightning
talk to software engineers and tech-savvy business people. Voice and
structure rules below are locked; visual palette is a placeholder pending a
proper design pass (`dataviz`/`artifact-design`) once content is fact-checked
and final — do not treat the colors below as final.

---

## 1. Voice & Tone

**Confident, plain-English, not dumbed down.** Explain things simply because
you understand them well, not because the audience can't handle nuance.

**Conversational goal-oriented.** Every section should leave the audience
able to use a term or make a distinction correctly in a real conversation —
that's the stated success condition for this talk.

**Honest about uncertainty.** Where the field disagrees (AGI timelines,
Gartner hype-cycle placement, benchmark validity), say so plainly instead of
picking a side to sound authoritative.

**Second person when addressing the room directly** ("you'll leave able
to..."), third person/attributed when relaying a source's claim or opinion
("DHH argues...", not "AI is making manual programming obsolete").

### Phrases to avoid

- Hedge-free absolutes about contested topics ("AGI will arrive by...")
  — attribute predictions to their source instead
- Unexplained jargon — if a term is used, it's either on the vocabulary
  slide or defined in the same breath
- Corporate filler: "leverage," "synergy," "deliverables," "unlock value"
- **Em dashes ("—"), anywhere: slide text, speaker notes, code comments.**
  Use a colon, comma, period, parentheses, or a middle dot ("·") for
  attribution lines instead, chosen for what actually reads best in
  context, not a blind find-and-replace.
- Doom/hedge-heavy framing as the default tone. Lead with what's genuinely
  useful or exciting; caveat honestly, but don't let risk-framing dominate
  the talk's overall energy (see the 2026-09-04 tone pivot in this
  project's memory for why this rule exists).

---

## 2. Slide Structure Rules

**One idea per slide.** If a slide needs two headings, it's two slides.

**Max 5 bullets per content slide. Max 8 words per bullet. No trailing
punctuation.**

**No paragraphs on slides.** Longer explanation goes in the speaker notes,
not on screen.

**Image-forward, not bullet-forward.** Default assumption for every content
slide is a visual (diagram, screenshot, chart, photo) carrying the idea,
with bullets as support, not the reverse. A slide with only text bullets and
no visual should be the exception, not the norm — flag any slide like that
for a second look before finalizing.

**Every slide has a "so what."** The audience should be able to state the
point of each slide in one sentence.

### Standard slide sequence

| # | Slide type | Purpose |
|---|---|---|
| 1 | Title | Talk title, your name, date/event |
| 2 | Agenda | What we're covering, in order |
| 3 | Vocabulary preview | Key terms we'll use today, defined in one line each |
| 4–N | Content slides | One idea each, per the outline |
| N+1 | Section dividers | Bold single phrase between major sections |
| Last | Close / how to stay conversational | Concrete next steps, not just "thanks" |

### Section divider slides

Full-bleed background. One phrase, centered, large. No bullets.

---

## 3. Visual Consistency (placeholder — finalize during design pass)

### Color palette (draft — swap during design pass)

| Role | Color | Hex |
|---|---|---|
| Primary / headings | Slate | `#1E293B` |
| Background (dark) | Near-black | `#0F172A` |
| Background (light alt) | Off-white | `#F8FAFC` |
| Body text on dark | Light slate | `#E2E8F0` |
| Body text on light | Charcoal | `#1E293B` |
| Accent / highlight | Signal blue | `#2563EB` |

### Typography

- **Slide titles:** Bold, 28–36pt
- **Body / bullets:** Regular, 18–22pt
- **Captions / labels:** Regular, 12–14pt, muted
- Avoid more than two font weights per slide

### Images

- Real diagrams over stock photography wherever a concept can be drawn
  (model/inference/harness layers, hype cycle curve, history timeline)
- Screenshots of actual tools (Claude Code, an MCP server list, a benchmark
  leaderboard) over generic AI clip art — no glowing-brain stock images
- All images at minimum 1200px wide

### Slide layout grid

```
┌─────────────────────────────────────────┐
│  [TITLE — left-aligned]                 │
│  ─────────────────────────────          │
│                                         │
│  [Image / diagram — primary focus]      │
│                                         │
│  • Supporting bullet                    │
│  • Supporting bullet                    │
│                                         │
│  [Page number — bottom right, small]    │
└─────────────────────────────────────────┘
```

---

## 4. Formatting Rules

### Capitalization

- Slide titles: Title Case
- Bullets: Sentence case (capitalize first word only)
- Product/model names: match the vendor's own casing exactly (e.g.,
  "Claude," "GPT-4," "Qwen3-27B") — verify casing per source, don't guess

### Numbers

- Spell out one through nine in prose; numerals for 10+
- Always use numerals for any benchmark score, percentage, or date

### Punctuation

- No periods at the end of bullets
- Exclamation marks: essentially never — this isn't the dragon-con voice

---

## 5. Speaker Notes Convention

Every slide with content gets full word-for-word speaker notes:

1. **The point in one sentence** — what the audience should take away
2. **The actual words to say** — first person, present tense, no coaching
   language ("emphasize this," "pause here") and no meta-instructions,
   sized to fill the slide's time slot at ~130 words/minute
3. **Transition cue** — the line that leads into the next slide

---

*Draft — visual palette and image treatment to be finalized in the design
pass once `report/final.md` is locked.*
