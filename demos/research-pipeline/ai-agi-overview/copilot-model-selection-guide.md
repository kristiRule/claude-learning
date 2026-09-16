# Picking a Model in GitHub Copilot Enterprise — Research Findings

**Researched:** 2026-09-10
**Scope:** the ~22 models in a typical GitHub Copilot Enterprise offering
**Status:** spin-off from the AI/AGI talk research, **not** a talk source —
deliberately kept out of `knowledge/` so it does not enter the source set.

## Sources

| Source | What it gave | Authority |
|---|---|---|
| [GitHub Copilot supported models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) | Full roster, preview flags, 1M-context and reasoning-level support | High — first-party |
| [GitHub Copilot model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) | Per-model strengths + task-to-model mapping | High — first-party |
| [GitHub Copilot plans](https://docs.github.com/en/copilot/get-started/plans) | Credit allowances per plan | High — first-party |
| [Artificial Analysis leaderboard](https://artificialanalysis.ai/leaderboards/models) | Independent Intelligence Index, blended price, throughput, latency | Medium-high — independent third-party aggregator |

**Not obtained:** per-model credit multipliers. GitHub's billing pages
reference a "Model multipliers" table but every path to it 404'd. Also
missing: any independent benchmark for the MAI-Code models — they do not
appear on Artificial Analysis at all.

---

## Finding 1 — the picker shows less than the published catalog

GitHub Copilot's documented catalog includes these models, which are **not**
part of a typical Enterprise offering:

- **Claude Fable 5** and **Claude Fable 5.1** — Fable 5.1 is the current
  #1 on the Artificial Analysis Intelligence Index (53)
- **Kimi K3** (Moonshot) — index 44 at **3.51s latency**, the best
  latency-per-intelligence on the board
- Claude Sonnet 4.6, Claude Opus 4.8 (fast mode, preview), GPT-5.4 nano,
  Kimi K2.7 Code

Worth knowing the gap exists before assuming a model is unavailable
generally. Fable 5.1 is also the model that won the gameplay half of the
Fireship comparison in `knowledge/fireship_astra_vs_fable.md`, so that
result is not reproducible from this picker.

## Finding 2 — independent benchmark data for the available models

Artificial Analysis Intelligence Index (composite, general-purpose),
blended price per million tokens, throughput, and latency. Effort setting
in parentheses — it materially changes price and latency.

| Model | Index | $/MTok | tok/s | Latency |
|---|---|---|---|---|
| GPT-6 Astra (max) | **53** | $3.26 | 54 | 334.8s |
| GPT-6 Astra (xhigh) | **53** | $2.31 | 51 | 220.6s |
| Claude Opus 5 (max) | 51 | $5.86 | 52 | **94.9s** |
| GPT-6 Astra (high) | 51 | **$1.72** | 48 | 93.3s |
| GPT-5.6 Sol (max) | 47 | $1.99 | 64 | 140.3s |
| Grok 4.6 (high) | 44 | $1.86 | 57 | 41.4s |
| GPT-5.6 Terra (max) | 42 | $1.40 | 84 | 183.1s |
| Gemini 3.8 Flash (high) | 41 | $1.24 | **274** | 12.8s |
| Gemini 3.7 Flash (high) | 39 | $0.93 | **292** | 8.9s |
| Grok 4.5 (high) | 39 | $1.04 | 55 | 15.1s |
| GPT-5.6 Luna (max) | 38 | **$0.18** | 112 | 138.6s |
| Claude Sonnet 5 (max) | 38 | $5.09 | 79 | 197.8s |
| Gemini 3.5 Flash | 34 | — | 211 | 15.5s |
| Gemini 3.6 Flash | 34 | $0.93 | 190 | 16.4s |
| **GPT-5.3-Codex** | **33** | — | 127 | 62.0s |
| GPT-5.5 Instant | 27 | $0.69 | 132 | **1.3s** |
| Claude Haiku 4.5 | 18 | $0.21 | 85 | 22.2s |

Not on the leaderboard at all: MAI-Code-1-Flash, MAI-Code-1.1-Flash,
GPT-5.4, GPT-5.4 mini, GPT-5 mini, Claude Opus 4.7, Claude Opus 4.8.

**Read this index carefully.** It is a *general* composite, not a coding
benchmark. A coding-specialized model can rank lower here than its
real-world coding usefulness. That caveat matters most for GPT-5.3-Codex
and the MAI-Code pair. The gap is large enough to be worth testing
directly, not large enough to declare Codex bad from this table alone.

## Finding 3 — GPT-6 Astra is the value pick at the top

Astra at `xhigh` ties Fable 5.1's index of 53 at **$2.31 vs $5.98** per
MTok. Astra at `high` matches Claude Opus 5's 51 at **$1.72 vs $5.86**.

The counter-argument is latency: Opus 5 (max) reaches 51 in **94.9s**,
while Astra (max) takes **334.8s** to reach 53. For interactive work Opus 5
is the better experience; for long-horizon agentic runs where you walk
away, Astra wins on cost.

## Finding 4 — Gemini Flash is the surprise daily driver

Gemini 3.8 Flash: index **41**, $1.24, **274 tok/s**, 12.8s latency. It
scores *higher* than Claude Sonnet 5 (38) and GPT-5.6 Luna (38) while
being roughly 3.5× faster and 4× cheaper than Sonnet 5.

**This corrects the earlier recommendation** that Sonnet 5 is the balanced
daily driver. That was reasoned from Anthropic's own tier structure
(Sonnet = balanced tier), which holds within Anthropic's lineup but does
not survive contact with this specific cross-provider roster. On these
numbers Sonnet 5 (max) is the weakest value on the board: it costs more
than Opus 5's near-neighbours while scoring 13 points lower.

Caveat: Artificial Analysis measured Sonnet 5 at `max` effort, which is its
slowest and most expensive configuration.

## Finding 5 — capability gates that constrain the choice

**1M context window and configurable reasoning levels are VS Code /
Copilot CLI only**, and only on: Claude Fable 5 & 5.1, Claude Opus 4.7 /
4.8 / 5, Claude Sonnet 4.6 & 5, GPT-5.3-Codex, GPT-5.4, GPT-5.5, GPT-5.6
(Luna/Sol/Terra), GPT-6 Astra, Kimi K3.

Not available on **Gemini Flash, MAI-Code, or Haiku 4.5**. So the Gemini
Flash recommendation above applies to fast interactive work, not to
large-codebase context loading.

## Finding 6 — Opus 4.7 and 4.8 are dead entries

Prior-generation, priced identically to Opus 5 at Anthropic first-party
rates ($5/$25 per MTok, 1M context), and absent from the independent
leaderboard. No reason to select them over Opus 5 except pinning a version
for reproducibility.

## Finding 7 — plan allowance

Copilot **Enterprise: 3,900 GitHub AI Credits per user per month**
(Business is 1,900). Billing has moved from "premium requests" to AI
Credits. Per-model credit rates could not be retrieved.

---

## Recommended defaults for this roster

Merging GitHub's own task mapping with the independent numbers, limited to
models present in a typical Enterprise offering:

| Task | Pick | Why |
|---|---|---|
| Long-horizon autonomous coding | **GPT-6 Astra** | The only long-horizon-tagged model in this set; Fable 5/5.1 and Kimi K3 are not included |
| Deep reasoning / hard debugging | **Claude Opus 5** (interactive) or **GPT-5.6 Sol** (cheaper) | Opus 5 has by far the best latency at the top of the index |
| General coding + agents | **GPT-5.6 Terra** or **Grok 4.6** | Terra is GitHub's balanced pick; Grok 4.6 scores higher (44 vs 42) with far better latency |
| Fast / simple / repetitive | **Gemini 3.8 Flash** | Highest index of any fast model, 274 tok/s |
| Cheapest acceptable bulk work | **GPT-5.6 Luna** | $0.18/MTok at index 38 is the best price-per-point on the board |
| Diagrams / screenshots | **MAI-Code-1.1-Flash** or **GPT-5 mini** | The two visual-tagged models available; no independent benchmark data for MAI-Code |
| Large-codebase context | **Claude Opus 5** or **GPT-6 Astra** | 1M context is gated to the big models, VS Code / CLI only |

## Open questions worth a follow-up pass

1. Per-model AI Credit rates — the deciding factor for daily driver choice,
   and the one number this research could not get.
2. Coding-specific benchmarks (SWE-bench Verified, Terminal-Bench) per
   model. swebench.com's leaderboard is JS-rendered; Artificial Analysis's
   coding evaluation pages 404'd. Needed to fairly judge GPT-5.3-Codex and
   MAI-Code.
3. What the ⚠ warning icon shown against MAI-Code-1-Flash indicates.
4. What distinguishes GPT-5.6 Sol / Terra / Luna — GitHub describes Sol as
   deep reasoning over large codebases, Terra as balanced interactive +
   agentic, Luna as quick and cost-efficient. Confirmed as task variants,
   not a capability ladder.
