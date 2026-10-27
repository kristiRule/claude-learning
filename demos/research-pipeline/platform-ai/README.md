# Run: Platform-Level AI

Second run through the [research pipeline](../README.md).

**Why this run.** "Platform-level AI" and AIOps are both real,
named disciplines, and both are moving fast. This run exists to stay
current on them directly rather than at second hand — the same reason
the `ai-agi-overview/` run exists — and to build an evidenced position on
how an infrastructure-facing team participates in agentic AI rather than
just watching it arrive.

## The two fields, and the seam

| | What it is |
|---|---|
| **AI platform engineering** ("platform-level AI") | A shared control plane *for* AI: model access, agent execution, secrets, observability, policy and cost controls built once and reused across teams |
| **AIOps / topology mapping** | AI applied *to* the existing estate: automated discovery, dependency graphs, causal root-cause analysis |

**The seam is the thesis.** These are usually discussed separately. They are
the same project, because an agent cannot act safely on infrastructure it
cannot see. The industry has started naming this — "agent grounding" — and
the failure mode is specific: a stale or relationship-poor CMDB does not
make agents fail loudly, it makes them *confidently wrong, at machine speed*.

## Status

**Gate 1 (source triage) — awaiting approval.** No extraction yet. See
`sources/triage-report.md`.

## Shared pipeline config

Uses `../references/` — `pipeline-config.md`, `scoring-rubric.md` (40%
relevance / 30% recency / 30% authority), `verification-rules.md`,
`report-template.md`, `STYLE_GUIDE.md`.

One deliberate difference from the AI/AGI run: **no deck is committed to
yet.** The output format is an open question until the research is in.
