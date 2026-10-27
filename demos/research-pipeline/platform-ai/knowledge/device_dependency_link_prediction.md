---
short_name: device_dependency_link_prediction
title: "Identification of Device Dependencies Using Link Prediction"
speaker: "Lukáš Sadlek, Martin Husák, Pavel Čeleda"
publisher: "Masaryk University — IEEE/IFIP NOMS 2024 (peer-reviewed)"
date: 2024
citation_url: "https://arxiv.org/pdf/2407.03019"
type: academic_paper
authority_tier: high
triage: primary
fetch_method: read_in_full
---

## Claims

- [fact] **Peer-reviewed conference paper**, published at IEEE/IFIP NOMS
  2024 (Network Operations and Management Symposium), DOI
  10.1109/NOMS59830.2024.10575713. Real institution (Masaryk University),
  multi-author, government-funded (MSCA-fellow5_MUNI grant). **The
  strongest-authority source in the entire run**, and the only one with a
  genuine empirical evaluation.
- [fact] Method: graph-based machine learning (link prediction via
  Node2Vec-style random-walk embedding) over passively collected IP flow
  data, to infer device dependencies in a network without manual
  configuration.
- [fact — THE NUMBERS THAT ANSWER THIS RUN'S OPEN QUESTION]
  Evaluated on six real team networks from a cyber defense exercise plus
  two university campus network datasets:
  - **AUC: 0.61–0.74 across datasets, averaging 0.69**
  - **Average Precision (AP): 0.74–0.88, averaging 0.81**
  - **Accuracy: as low as 0.34, generally in the 0.40–0.55 range**
    across most test configurations (Table IV)
  - Compared against four local-similarity-index baselines; correlation
    with those baselines ranged only **0–11%** (Spearman/Kendall tau),
    meaning the learned method captures dependency structure the simpler
    heuristics miss — a genuine capability — but also that there is no
    strong agreement across methods on what "the right answer" even is.
- [fact] The authors' own conclusion: "acceptable performance with
  respect to the class imbalance" — a measured, non-triumphant framing
  from the people who built it.

## Limitations

- Evaluated on IP-flow/network-dependency data specifically, not on a
  general enterprise CMDB or multi-cloud resource graph. Extrapolating
  these numbers to "topology mapping accuracy in general" is an
  inference, not a direct claim of the paper.
- 2024 publication; methods have likely improved since. Treat as a floor
  on what unsupervised inference achieved two years ago, not a current
  state-of-the-art ceiling.
- Does not distinguish dependency *direction* automatically — a real,
  stated limitation of the specific technique.

## Relevance

**This is the single most important source in the run, and it changes
the shape of the argument.** It is the only source that actually measures
how accurate automated dependency discovery can be, and the answer is:
**modest.** An AUC of 0.69 is well above chance (0.5) but far from
reliable; accuracy in the 0.4–0.55 range means automated inference is
wrong close to half the time in several configurations.

This matters directly for Gate 2a's flagged open question — "how good is
the map, actually?" The honest answer, from the one rigorous measurement
available, is: **not good enough, on its own, for an agent to act on
unsupervised.** This does not weaken the grounding thesis — it **sharpens
it considerably.** The argument is no longer "topology maps might be
stale, so be careful." It becomes: **even state-of-the-art automated
discovery is measurably imperfect, which means a grounding layer cannot
be purely automated inference — it needs human-curated or
authoritative-source components (a real CMDB, real Terraform state, real
ownership records), with inferred topology as a supplement, not a
replacement.**

This also reframes `aiops_topology_capabilities`'s silence on accuracy:
that silence is no longer just a gap in the marketing material. There is
a real, peer-reviewed number behind the question those vendors don't
answer, and it is not flattering to the "fully automated discovery solves
this" pitch.
