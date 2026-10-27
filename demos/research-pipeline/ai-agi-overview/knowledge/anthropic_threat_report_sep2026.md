---
short_name: anthropic_threat_report_sep2026
title: "Detecting and countering misuse of AI: September 2026"
publisher: "Anthropic"
date: 2026-09-10
citation_url: "https://www.anthropic.com/threat-intelligence-report-september-2026"
type: lab_publication
authority_tier: high
triage: primary
fetch_method: read_in_full_partial
---

## Claims

- [fact] Covers misuse Anthropic **disrupted between December 2025 and
  August 2026** ("the past eight months"), following prior reports from
  March, August, and November 2025. Models involved: Claude Haiku, Sonnet,
  and Opus.
- [fact] **Seven harm areas:** cyber operations, influence operations,
  surveillance operations, scams and fraud, biological misuse, conventional
  weapons development, illicit distillation.
- [fact — CASE STUDIES, NINE TOTAL IN THE INFLUENCE SECTION] Four read in
  detail:
  - **GTG-04001 (Central African Republic):** Russian-speaking actor in
    Bangui ran a daily content operation tied to Radio Lengo Songo
    (98.9 FM), linked to Politology (an Africa Corps/Wagner influence
    branch). Rated **Category Four** on Anthropic's Breakout Scale. **Also
    ran a recurring surveillance operation tracking CAR opposition
    political figures** — this case spans both the influence and
    surveillance harm areas.
  - **GTG-54002 (six continents):** ~70 fabricated news sites traced to
    LKM Company, a France-based advertising agency. *"published at least
    8,913 articles in about 20 languages."* Rated Category Two.
  - **GTG-84005 (Malaysia):** platform linked to BBS Bilisim Teknolojileri
    (Istanbul), managing roughly 1,000 fake X/Twitter accounts, marketed
    as a *"military-grade, AI-driven, real-time political operations
    ecosystem."* Rated Category Two.
  - **GTG-24015 (Russian state media):** four accounts used Claude as an
    editorial desk for Sputnik Moldova, RIA Novosti, and RT's
    English-language newsroom; in one confirmed case, output reached
    Russian airwaves.
- [fact] **Surveillance section** (introduction only confirmed; full case
  text not retrieved — see Limitations): covers *"surveillance systems
  built to identify and monitor dissidents."* Two surveillance-adjacent
  details confirmed from elsewhere on the page:
  - **GTG-20006** (Russian state-nexus espionage actor): targeted
    surveillance platforms, found authorization flaws in camera-streaming
    services' APIs, harvested tokens granting access to victims' live
    camera streams.
  - **GTG-50029** (hacktivist campaign): built a doxxing platform called
    "fafsearch," exfiltrated ~140,000 records from a political campaign
    platform, including users' political opinions.
- [fact] Stated response pattern: in all cases, Anthropic disrupted the
  activity, strengthened protections based on what was learned, and where
  appropriate shared intelligence with authorities/industry partners.

## Limitations

- **The page is 276,312 characters; only the first ~100,000 were read.**
  The dedicated "AI-enabled surveillance operations" section itself —
  beyond the introduction and the two cases found incidentally elsewhere
  on the page — was **not reached**. Five of the nine stated influence
  cases were also not reached. **Before any deliverable states "the
  surveillance section contains X," read the remainder of the page or the
  downloadable PDF.**
- One secondary source cited model names ("Claude Fable," "Mythos-class")
  in connection with this report that could not be corroborated in the
  primary text read so far — do not repeat those without separate
  verification.

## Relevance

This is the evidentiary backbone behind two of the seven policy changes —
cited **by name** in the policy announcement as the rationale for the
surveillance rewrite, and clearly the kind of activity (fake accounts,
fabricated outlets, state media ghostwriting) the new deceptive-campaigns
section targets. Having the regulation and the incident report that
prompted it in the same source set is unusually good provenance; most
policy coverage never connects the two.

The CAR case (GTG-04001) is the single most load-bearing example for a
deliverable: it is explicitly dual-category (influence *and*
surveillance), named with a Breakout Scale rating, and ties a specific
state actor to the exact harm pattern — tracking opposition political
figures — that the new surveillance clause's "without that person's
consent" language is built to prohibit.
