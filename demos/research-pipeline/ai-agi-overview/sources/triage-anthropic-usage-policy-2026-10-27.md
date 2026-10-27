# Loopback — Anthropic 2026 Usage Policy Update (2026-10-27)

**Trigger:** user heard Anthropic had updated its Usage Policy and asked
the pipeline to look into it. Started as a standalone run
(`demos/research-pipeline/anthropic-usage-policy/`), then folded into
this run as a loopback once it was clear the content belongs in the
existing Responsible AI section rather than as a separate deliverable —
same pattern as the Sept 2026 hardware/MoE and Oct 2026 refresh
loopbacks. All six sources below are now in this run's
`selected-sources.json`; all six knowledge files are in this run's
`knowledge/`.
**Trigger:** user heard Anthropic "recently dropped some acceptable use
policies" and wanted the research pipeline run on it directly rather than
relying on secondhand summaries.
**Status:** Gate 1. Candidates identified and scored, nothing extracted.

---

## The headline, verified against primary sources

Anthropic published a revised **Usage Policy** (formerly "Acceptable Use
Policy") on **2026-10-08**, taking effect **2026-11-12**. Anthropic's own
framing: most changes clarify existing rules for an agent that now does
"longer, more independent work," plus responses to a year of observed
misuse in influence operations, weapons development, and surveillance.

**Seven changes, by category, with Anthropic's stated rationale:**

| Category | What changed | Why (Anthropic's stated reason) |
|---|---|---|
| Deceptive activity | New consolidated section — "Do Not Engage in Deceptive Campaigns or Artificial Activity," merging rules previously scattered across elections/fraud/privacy/disinformation | State media, government propaganda offices, and commercial firms used Claude to run fake account networks and fabricated news sites |
| Elections | Renamed "Do Not Undermine Democratic Processes," **narrowed** — the blanket ban on personalized campaign/voter targeting was *removed* | The broad rule blocked legitimate civic work and policy research |
| Weapons | Now explicitly covers software/components that make weapons function, and arming drones/autonomous vehicles | Reflects attempts to use Claude for weapons guidance/control software; Anthropic says this matches existing enforcement |
| Surveillance / law enforcement | Rewritten — bars tracking people without consent (real-time or retrospective), bars Claude from recommending who to investigate/arrest/charge | Cites the Sept 2026 threat report's documentation of AI used to track political dissidents |
| High-risk use cases | Clarified scope; **new** requirements when Claude autonomously controls hardware capable of injury (qualified human observer, fail-safe state) | The August 2026 launch of the Model Hardware Standard |
| Abuse of models | **New** prohibition on "sustained and needless abusive or cruel behavior" toward Claude — explicitly excludes ordinary frustration, dark creative themes, testing/research | Not explained beyond the clause itself; model-welfare adjacent |
| Supported Regions | Clarified enforcement — covers physical location, incorporation/HQ, and majority ownership/control | Builds on the prior year's regional-access policy |

---

## Candidate sources

| # | Short name | Type | Rel | Rec | Auth | **Composite** | Triage |
|---|---|---|---|---|---|---|---|
| 1 | `anthropic_2026_usage_policy_announcement` | lab_publication | 1.00 | 1.00 | 1.00 | **1.000** | Primary |
| 2 | `anthropic_usage_policy_live_text` | lab_publication | 1.00 | 1.00 | 1.00 | **1.000** | Primary |
| 3 | `anthropic_threat_report_sep2026` | lab_publication | 0.90 | 1.00 | 1.00 | **0.970** | Primary |
| 4 | `anthropic_model_hardware_standard` | lab_publication | 0.80 | 0.90 | 1.00 | **0.890** | Primary |
| 5 | `anthropic_usage_policy_aug2025_prior` | lab_publication | 0.75 | 0.60 | 1.00 | **0.780** | Primary |
| 6 | `press_coverage_reaction_oct2026` | industry_report | 0.60 | 1.00 | 0.55 | **0.705** | Supporting |

### Notes

- **Sources 1–2 are the spine of this run** — the announcement explains
  *why*, the live policy page gives the *exact current text*. Both read in
  full already (see README's source-verification note on the URL trap).
- **`anthropic_threat_report_sep2026` is unusually strong for a
  supporting source.** It's not generic justification — it's cited *by
  name* in the policy announcement as the rationale for the surveillance
  rewrite, and it contains real, specific case studies: **GTG-04001**
  (Central African Republic, Wagner/Africa Corps-linked, included a
  recurring surveillance operation on opposition political figures),
  **GTG-54002** (~70 fabricated news sites, 8,913 articles across ~20
  languages), **GTG-84005** (~1,000 fake accounts, marketed as
  "military-grade, AI-driven, real-time political operations"),
  **GTG-24015** (Russian state media — Sputnik Moldova, RIA Novosti, RT
  — using Claude as an editorial desk), **GTG-20006** (camera-stream
  token harvesting), **GTG-50029** (doxxing platform, ~140,000 exfiltrated
  records). These are the concrete events the policy language is
  responding to — genuinely rare to get the regulation and the incident
  report that prompted it in the same source set.
- **`anthropic_model_hardware_standard`** is the direct cause of the new
  autonomous-hardware clause. Partner-reported results (e.g., a claimed
  3x speedup on dose-response experiments at Carnegie Mellon) are noted
  but explicitly flagged as unverified partner claims, not Anthropic's own.
- **`anthropic_usage_policy_aug2025_prior`** — the previous revision
  (published Aug 2025, effective Sept 2025). Useful as a baseline for a
  "what changed year over year" framing, and it's the source that was
  mistakenly served by the generic `/news/usage-policy-update` URL —
  worth keeping specifically *because* of that confusion, so the run has
  the real prior-version text on hand rather than relying on memory of it.
- **Press coverage** scored as Supporting, not Primary: useful for
  "how is this landing" framing (TechCrunch's framing as a ban on "model
  abuse and election interference" is itself a compressed, slightly
  misleading read — the election change is a *loosening*, not a new ban)
  but adds no facts beyond the primary sources.

## What this run would be positioned to produce

A short, accurate briefing on what changed, why, and what's notable —
corrected against primary sources rather than repeating the secondary
coverage's blended/dated version. Two angles stand out as worth leading
with precisely because they cut against the expected narrative:

1. **The election change is a loosening, not a tightening** — removing a
   blanket ban that was catching legitimate civic and policy work. Most
   secondary coverage frames the whole update as Anthropic "cracking
   down."
   2. **The abusive-behavior-toward-models clause is adjacent to, but not
   the same as, model welfare policy** — it's framed entirely around the
   model's conversation-ending capability as the enforcement mechanism,
   not around any claim about Claude's moral status.

**Format not yet decided** — open until after extraction, same as the
platform-ai run.

**Nothing extracted. Awaiting Gate 1 approval.**
