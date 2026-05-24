# Source Scoring Rubric — Weather Modification Research

Used by the `discover-sources` skill to rank and triage papers.
Final score = 40% Relevance + 30% Recency + 30% Impact.

---

## Relevance (40%)

How directly does the source address the research question?

| Score | Criteria |
|-------|----------|
| 1.0 | Core topic: directly studies the mechanism, program, or policy in question |
| 0.75 | Closely related: adjacent topic with significant transferable findings |
| 0.5 | Background: useful context but not focused on the research question |
| 0.25 | Peripheral: tangentially related; useful only if the above tiers are thin |
| 0.0 | Off-topic: does not address the research question |

---

## Recency (30%)

How recent is the publication?

| Score | Criteria |
|-------|----------|
| 1.0 | Published 2022–present |
| 0.8 | Published 2018–2021 |
| 0.6 | Published 2012–2017 |
| 0.3 | Published 2000–2011 |
| 0.1 | Pre-2000 (retain only if foundational / frequently cited) |

---

## Impact (30%)

Combination of source authority and citation count.

### Source authority tier

| Tier | Examples | Authority bonus |
|------|----------|-----------------|
| High | WMO, NOAA, NASA, GAO, IPCC, NAS, EPA, NCAR | +1.0 |
| Medium | AMS, AGU, EGU, Royal Meteorological Society | +0.5 |
| Standard | Peer-reviewed journal (no institutional flag) | +0.0 |
| Preprint | arXiv, SSRN, not yet peer-reviewed | -0.1 |

### Citation count bands

| Citations | Score |
|-----------|-------|
| 500+ | 1.0 |
| 100–499 | 0.7 |
| 20–99 | 0.4 |
| 1–19 | 0.2 |
| 0 | 0.0 (new paper — do not penalize if very recent) |

---

## Citation rules

Always cite the **original source**, never Semantic Scholar:

1. **DOI link** — preferred for all peer-reviewed papers (`https://doi.org/…`)
2. **Institution page** — for WMO, NOAA, GAO, NASA reports
3. **arXiv** — only for preprints with no DOI yet
4. **PubMed** — for medical/environmental health papers
5. **Open-access PDF** — fallback if no DOI is available

Acceptable primary sources for weather modification research:
- WMO Cloud Seeding Guidelines and Technical Documents
- NOAA Weather Modification Program reports
- GAO Reports on weather modification (e.g., GAO-11-11)
- Peer-reviewed journals: *BAMS*, *JGR-Atmospheres*, *Atmospheric Research*, *npj Climate and Atmospheric Science*
- Government program documentation (UAE Rain Enhancement, China Weather Modification Bureau)

---

## Triage categories

After scoring, assign each paper one of these labels:

| Label | Score range | Action |
|-------|-------------|--------|
| **Keep — Primary** | ≥ 0.70 | Include in extraction pipeline |
| **Keep — Supporting** | 0.45–0.69 | Include if primary tier is thin |
| **Review** | 0.25–0.44 | Present to researcher for manual decision |
| **Drop** | < 0.25 | Exclude unless researcher overrides |
