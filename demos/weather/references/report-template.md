# Research Report Template

Used by the `synthesize-report` skill to structure the final output.

---

## Report structure

```markdown
# <Topic> — Research Synthesis Report

**Prepared:** <date>
**Sources:** N papers (N primary, N supporting)
**Research question:** <question>

---

## Executive Summary
<3–5 sentences: key finding, strongest consensus, most important gap>

---

## Introduction
<Background on the topic; why this research question matters>

---

## Evidence Landscape

### Areas of Consensus
<Claims supported by 3+ papers, with inline citations [chen2023]>

### Contradictions
<Conflicting findings between papers, with both sides cited>

### Gaps
<Questions the literature does not yet answer>

---

## Methodology Comparison
<Table or narrative comparing study designs across papers>

---

## Key Findings by Theme

### Theme 1: <name>
…

### Theme 2: <name>
…

---

## Evidence Map

```mermaid
graph LR
  A[chen2023] -- supports --> B[Claim: cloud seeding increases precipitation 10-15%]
  C[smith2021] -- supports --> B
  D[jones2020] -- contradicts --> B
```

---

## Methodology Timeline

```mermaid
timeline
  2010 : First randomized cloud seeding trial [author2010]
  2018 : UAE National Center of Meteorology program launched [uae2018]
  2023 : Meta-analysis of 50 years of cloud seeding data [chen2023]
```

---

## Conclusions
<Synthesis of what the evidence supports, with confidence levels>

---

## Recommended Next Steps
<Gaps that warrant further literature review or loopback to discover-sources>

---

## Bibliography
<Full citations in Chicago author-date format, DOI links, sorted alphabetically>
```
