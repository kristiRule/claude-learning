---
short_name: cage1_agentic_governance_eval
title: "CAGE-1: Control, Assurance, and Governance Evaluation for Enterprise Agentic AI"
speaker: "Roopam W. Sure"
publisher: "Self-published independent technical report"
date: 2026-07
citation_url: "https://arxiv.org/pdf/2607.03510"
type: industry_report
authority_tier: low-medium
triage: primary
fetch_method: read_in_full
---

## Claims

- [fact] **Self-published, single-author, non-peer-reviewed.** The
  document identifies itself on its own title page as "Independent
  technical report" — not a venue submission. It is the third in a
  self-cited trilogy by the same author (GKS-5, AGL-1, CAGE-1), with the
  other two hosted on the author's personal GitHub Pages site. Treat on a
  level with the vendor blogs in this set, not above them.
- [fact] **The core distinction, and the most useful idea in the paper:**
  capability and trust are separated into five evaluation layers —
  Capability, Control, Assurance, **Prebind Assurance**, Operational
  Trust. "Most AI benchmarks focus on capability. Enterprises need all
  five." Prebind Assurance is defined as the evaluated ability to prove
  that an action was controlled *before* it became binding or
  operationally consequential.
- [fact] A 5-level maturity scale per dimension: 0-Uncontrolled,
  1-Manual, 2-Defined, 3-Enforced, 4-Assured. High-risk dimensions need
  Level 3–4 before production.
- [fact — INDEPENDENT CORROBORATION OF THIS RUN'S THESIS, FROM A
  DIFFERENT ANGLE] Stated directly in the paper's own limitations
  section: **"CAGE-1 depends on the quality of the surrounding control
  plane. If identity data is wrong, policies are ambiguous, evidence is
  incomplete, or tool permissions are poorly designed, the framework will
  surface the weakness but cannot correct it by itself."** A governance
  framework, written independently of the AIOps/grounding material in
  this run, arrives at the same structural dependency: the control layer
  is only as good as what it's built on.
- [fact] All "applied evaluation cases" in the paper (a finance payment
  agent, an HR policy agent, an IT remediation agent) are **explicitly
  labeled illustrative scenarios, not claims about a specific customer
  deployment.** No real system was evaluated. The before/after scoring
  tables are hypothetical.

## Limitations

- **CORRECTED 2026-10-17 — authority was over-scored before reading, on
  the assumption of arXiv/academic status.** This is not that. No
  empirical data anywhere in the document. No real deployment. No
  measurement. It is a proposed taxonomy and vocabulary, argued well, but
  unvalidated.
- Self-citing its own prior two papers as if they were an established
  literature is a pattern worth noting explicitly, not quietly passing
  over.

## Relevance

Demoted from "independent technical evidence" to "a second source of
vocabulary and framing," which is still a real contribution. "Prebind
Assurance" and "capability is not trust" are both genuinely useful terms
for this run, cleaner than anything in the vendor material. The
self-reported dependency on control-plane quality is worth quoting — not
because the source is authoritative, but because it is a second,
independently-arrived-at version of the exact claim `kg_missing_brain_sre_agents`
and `servicenow_cmdb_as_ai_infra` make commercially. Two unconnected
authors landing on the same structural point is mild corroboration even
when neither is strong alone.

**Do not cite the scoring tables or case studies as evidence of anything.
They are illustrations of the framework, not findings.**
