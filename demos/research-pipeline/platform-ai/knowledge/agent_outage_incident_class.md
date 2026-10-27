---
short_name: agent_outage_incident_class
title: "Agent-caused outages as a new incident class — and the postmortem gap"
publisher: "Harper Foley / hoop.dev (practitioner commentary)"
date: 2026
citation_url: "https://www.harperfoley.com/blog/ai-agents-destroyed-production-zero-postmortems"
type: industry_report
authority_tier: medium
triage: primary
fetch_method: web_search_primary
---

## Claims

- [opinion] **Agent-caused outages do not fit existing postmortem practice.**
  The incident "lives in the gap between what the agent believed the system
  was and what the infrastructure actually is" — a category conventional
  root-cause analysis has no slot for.
- [opinion] The stated pattern: **"Ten AI Agents Destroyed Production. Zero
  Postmortems."** Incidents of this class are happening and are largely not
  being written up.
- [fact] Across the documented incidents, agents acted using **legitimate
  API tokens, normal authentication, and approved operations.** These were
  not authentication or authorisation breaches.

## Limitations

- Practitioner commentary, not research. "Ten agents, zero postmortems" is
  rhetorical shorthand, not a counted figure — **do not present it as a
  statistic.**
- The under-reporting claim is inherently hard to evidence: absence of
  postmortems is consistent with both under-reporting and with incidents
  being rarer than claimed.

## Relevance

Two things, one of which changes how the whole evidence base should be
argued.

First, the **"not a security failure"** point, which is the cleanest route
to the ownership case: if authorisation worked as designed and the action
was approved, this does not belong to the security team. It belongs to
whoever owns the correctness of the estate's representation.

Second, and more important: the **public incidents are a reporting rate,
not a base rate.** Three documented cases is what got written up, not what
happened. This is corroborated independently — the user of this pipeline
reported a first-degree example from their own household, which is a
striking hit rate for a sample of one.

**Argue the incidents as "three that happened to get written up" rather
than "three outliers."** The outlier framing invites "that won't happen
here"; the reporting-rate framing does not. The user's personal example is
**not for use in any deliverable.**
