# Gate 2a — Analysis

**Run:** platform-ai · **Date:** 2026-10-17
**Status:** 13 sources extracted, all three flagged unread sources now read.
**Draft not written. Awaiting review.**

---

## 1. What changed since the first pass

The three highest-scored sources at extraction time — REGAL, CAGE-1, and
the link-prediction paper — were identified by title only. All three have
now been read in full, and two of the three initial authority scores were
wrong:

| Source | Was scored as | Actually is | New authority |
|---|---|---|---|
| REGAL | academic, 1.00 | Single-author arXiv preprint, Adobe, no peer review, **no quantitative evaluation** | 0.70 |
| CAGE-1 | academic, 1.00 | **Self-published** independent report, one author, self-citing his own prior two papers, **illustrative case studies only — no real system evaluated** | 0.40 |
| Link prediction | academic, 1.00 | Correctly scored — **peer-reviewed (IEEE NOMS 2024), real institution, real measured numbers** | 1.00 (unchanged) |

This is worth stating plainly rather than quietly fixing: two sources were
promoted to the top of the triage table on the assumption that "arXiv" and
"academic_paper" meant evidentiary weight they did not have. Flagging the
correction is more useful than hiding it.

## 2. The finding that actually answers the run's open question

Gate 1 and the first analysis pass both flagged the same gap: every AIOps
source asserts automated discovery keeps topology maps current, and none
says how *accurate* those maps are. The link-prediction paper is the one
source in the entire run that measures this directly, and the honest
answer is:

> **AUC 0.61–0.74 (avg 0.69), accuracy as low as 0.34, generally
> 0.40–0.55.** Well above chance, far from reliable.

This is good news and bad news at once. It is bad news for the idea that
"fully automated discovery solves grounding" — on the only real
measurement available, it doesn't, not on its own. It is good news for the
run's thesis, because it converts "topology maps might be stale, be
careful" into something sharper and more defensible:

> **Automated topology inference is measurably imperfect even in a
> research setting with clean data. A grounding layer cannot be pure
> inference — it needs authoritative sources (a real CMDB, real
> infrastructure-as-code state, real ownership records) with inference as
> a supplement, never a replacement.**

That is a stronger, more specific claim than anything available before
this reading pass, and it is now the best-evidenced single sentence in the
run.

## 3. What the sources agree on (holds from the first pass)

The failure mode described across vendor material, the incident
postmortems, and now two independent academic/quasi-academic sources is
consistent: agents act *confidently* on bad context rather than failing
visibly. The script-vs-agent distinction (a human catches a wrong premise
in a script's output; an agent may execute six steps before anyone
notices) still stands and is unchallenged by anything read this pass.

CAGE-1, despite its weak authority, independently arrived at the same
structural dependency as the commercial AIOps sources — "the framework
will surface the weakness but cannot correct it by itself" — from a pure
governance-framework angle rather than an infrastructure angle. Two
unconnected, weak-to-moderate sources landing on the same point is mild
corroboration, not proof, but it is not nothing.

## 4. The PocketOS finding still stands, and is now the strongest artifact
in the run

Nothing in this reading pass changes the PocketOS analysis: five of six
links in the failure chain were pre-existing platform weaknesses
(credential scoping, secrets hygiene, environment boundary, backup
isolation, approval gating), and the agent's contribution was speed and
absence of hesitation rather than any new failure mode. That remains the
best single piece of evidence for the "an agent amplifies the platform
weaknesses you already have" framing.

## 5. Remaining weaknesses, honestly stated

- **The causal link between governance maturity (Deloitte/Gartner) and
  grounding specifically is still not established by any source.** It
  remains the run's central unproven claim. Nothing read this pass closes
  that gap — REGAL and CAGE-1 are both architecture/framework proposals,
  not studies of real deployments.
- **The link-prediction paper is about network dependency inference
  specifically, not general CMDB/multi-cloud resource graphs.**
  Generalizing its 0.69 AUC to "topology accuracy in general" is a
  reasonable inference but should be presented as one, not as a direct
  finding.
- **The run now has one genuinely strong empirical source and twelve
  framework/vendor/incident sources.** That is a normal shape for this
  kind of practitioner-facing research, but the draft should not
  overstate how much of the argument rests on hard data versus
  well-reasoned position.

## 6. What the draft would argue, updated

1. Agents are arriving regardless (Deloitte), and readiness is thin
   (Deloitte, Gartner).
2. The documented failures are not security failures — authorisation
   worked exactly as designed in every case (PocketOS, Replit, DataTalks).
3. They are grounding failures: correct execution against a wrong or
   incomplete map (DataTalks is the clean case; PocketOS shows the
   amplification effect).
4. **Automated topology/dependency inference, even done well, is not
   accurate enough on its own to be the sole grounding source** — this is
   now evidenced, not asserted.
5. Therefore grounding needs a deliberate architecture: authoritative
   sources plus inference as supplement, bounded agent action spaces
   (REGAL's pattern), and staged trust (CAGE-1's maturity levels, used as
   vocabulary rather than as validated fact).
6. The team that already owns the authoritative infrastructure sources is
   positioned to own this layer — a participation case built from
   evidence rather than from anyone's starting position.

## 7. Scope note (unchanged from prior pass)

This run exists to build a current, evidenced understanding of
platform-level AI and AIOps/grounding, and a position on how an
infrastructure-facing team participates in it. The output should read as
a researched position, not an explainer.

**Recommendation: ready for Gate 2a sign-off.** The one open item —
whether governance maturity and grounding are causally linked — is a
genuine evidence gap, not a research oversight, and should be stated as an
open question in the draft rather than resolved by assertion.
