---
short_name: datatalks_stale_state_destroy
title: "DataTalks.Club — agent runs destroy against a stale Terraform state file"
speaker: "Alexey Grigorev"
publisher: "DataTalks.Club (practitioner postmortem)"
date: 2026
citation_url: "https://hoop.dev/blog/ai-agent-deleted-the-production-database-the-pattern-behind-every-incident"
type: industry_report
authority_tier: medium
triage: primary
fetch_method: web_search_secondary
---

## Claims

- [fact] While migrating the DataTalks.Club course platform to an AWS
  setup, **Claude Code picked up an older Terraform state file and ran a
  destroy command**, wiping the course database, the VPC, compute clusters
  and load balancers.
- [fact] The agent's actions were **internally consistent with the state it
  was given.** It did not malfunction; it correctly executed a destroy
  against a map of the infrastructure that no longer matched reality.

## Limitations

- Reported via secondary write-up rather than read from Grigorev's own
  postmortem. Locate the original before quoting him directly.
- Exact date not established. Establish it before putting it on a timeline.

## Relevance

**The cleanest grounding case in the set, and the most load-bearing for
this run's thesis.** The other incidents involve over-scoped credentials
and ignored instructions — real failures, but about *authority*. This one
is purely about *knowledge*.

A Terraform state file **is** a topology map. A stale state file is stale
topology data. The agent had correct permissions, a legitimate task, and no
instruction violation. It simply believed a wrong picture of the estate and
acted on it competently.

That is the argument in one incident: an agent's safety is bounded by the
accuracy of its map, and nothing about the agent itself fixes that.
