# Gate 1 Triage — Hardware & MoE Loopback (2026-09-16)

**Trigger:** user asked whether there had been significant advances affecting
**hardware**, and whether **MoE models** had moved on.

**Answer to the premise: yes, and they are the same story.** These did not
turn out to be two topics. Both are consequences of one shift — the industry
moving from a training-dominated to an inference-dominated economy, which
relocates the binding constraint from **compute** to **memory bandwidth**.

**Gap this closes.** Hardware is currently near-absent from the deck. A grep
for GPU / chip / silicon / datacenter across `gen-deck.mjs` returns exactly
one substantive hit — the NVIDIA mention on the new Huang slide. For an
audience that manages on-prem and cloud infrastructure, that is the single
largest content gap in the talk.

---

## The thesis these sources support

1. Inference, not training, is now where the money and the silicon go.
   GPUs were 58% of data center compute spend in 2025, but **XPUs (ASICs and
   similar) are the growth leader in 2026 at 22%**, ahead of GPUs at 19% and
   CPUs at 14%. Framing from the trade press: *"Training AI models is a cost
   center, while inference is a profit center."*
2. Inference decode is **memory-bandwidth bound, not compute bound**. During
   token generation the accelerator re-reads the model parameters for every
   token. Reported consequence: **H100s running open LLMs sit idle 50–80% of
   the time** waiting on memory.
3. So the hardware is being redesigned around memory: **HBM4 in production**
   (doubling peak bandwidth, shipping in NVIDIA's Vera Rubin H2 2026), plus
   an entire new category of memory-first accelerators.
4. Meanwhile the models moved the same direction. **MoE activation ratios
   have collapsed** — Mixtral activated 2 of 8 experts (~25%); the 2026 wave
   activates **3–6%** of total parameters.
5. And the capability premium collapsed with it: 1M context, native
   multimodality and permissive licenses are now cheap-tier standard.

---

## Candidate sources, scored on the 40/30/30 rubric

| # | Short name | Type | Rel | Rec | Auth | **Composite** | Triage |
|---|---|---|---|---|---|---|---|
| 27 | `openai_broadcom_jalapeno` | lab_publication | 0.90 | 1.00 | 1.00 | **0.960** | Keep — Primary |
| 28 | `ieee_inference_hardware` | industry_report | 0.90 | 1.00 | 0.85 | **0.915** | Keep — Primary |
| 29 | `dck_inference_battleground` | industry_report | 0.95 | 1.00 | 0.75 | **0.905** | Keep — Primary |
| 30 | `open_weight_moe_wave_2026` | industry_report | 0.85 | 1.00 | 0.60 | **0.820** | Keep — Primary |
| 31 | `glm53_flash_zai` | lab_publication | 0.75 | 1.00 | 1.00 | **0.900** | Keep — Primary |

### 27. OpenAI + Broadcom — Jalapeño Intelligence Processor
First-party, and the strongest single hardware artifact available. OpenAI's
first silicon: a reticle-sized ASIC taken from design to production in nine
months. **216 GB of HBM4, up to 15.4 TB/s bandwidth, 3.4 MXFP8 PFLOPS /
13.4 MXFP4 PFLOPS at 700 W** (measured sustained at or below 550 W).
Against an NVIDIA Blackwell system on SemiAnalysis's InferenceX benchmark:
**1.5–1.9× more work per watt, 1.7–3.6× lower end-to-end latency.** Scales
128 accelerators per rack to 2,048 per pod. Deploying end of 2026.
Authority 1.00 — first-party for its own chip. Treat the *comparative*
claims as vendor-reported.

### 28. IEEE Spectrum — the inference hardware rethink
Best explanation of *why* the hardware is changing: the decode phase is
sequential and memory-bound, so compute-optimized GPUs idle. Carries the
50–80% idle figure, HBM4's status, and the competing architectures —
d-Matrix Raptor (compute stacked on DRAM), Majestic Labs (128 TB DRAM per
rack vs NVIDIA's ~20 TB HBM3E), Cerebras WSE-3, Groq 3 LPU (7× GPU memory
bandwidth via on-die SRAM). Authority 0.85: high-quality technical
journalism, not first-party.

### 29. Data Center Knowledge — inference as the chip battleground
**Highest relevance of the set for this specific audience.** Carries the XPU
vs GPU vs CPU growth split, the cost-center/profit-center framing, AWS
reporting **over 50% of Bedrock tokens now running on its own Trainium
silicon**, and the consolidation wave (Intel pursuing SambaNova ~$1.6B, AMD
buying Untether AI's team and MK1, NVIDIA's $20B Groq licensing deal).
Contains the single most audience-relevant quote in the whole source set:
*"When you deploy a GB200 or H100, you're deploying something in the
kilowatt range. The retail environment has a limited power budget and no
real good cooling, so you can't run a rack of GPUs."*
Authority 0.75 — trade press, named reporting, not first-party.

### 30. The August 2026 open-weight MoE wave
Five open-weight releases in nine days: **GLM-5.3-Flash** (320B total / 18B
active, MIT, 1M context, $0.15/$0.50), **Qwen3.8-Flash** (125B + 51B N-gram),
**Tencent Hy4 Preview** (770B / 49B active, leading SWE-bench Pro),
**MiniMax M3** (428B MoE), **DeepSeek V4-Flash-Vision-Exp**. Thesis: the
capability premium collapsed, and closed labs answered with price cuts
rather than features. Authority 0.60 — industry blog synthesis; the
underlying per-model specs are independently checkable against model cards,
and should be before anything goes on a slide.

### 31. Z.ai — GLM-5.3-Flash model card
First-party anchor for the MoE numbers so the sparsity claim does not rest
on source 30 alone. 320B total / 18B active is an **activation ratio of
5.6%**, against Mixtral's 25% — the cleanest available illustration of where
MoE has gone. Relevance 0.75: narrow, but load-bearing.

---

## Flagged before extraction

- **[SYNTHESIS — NOT YET SOURCED]** The tidy claim that *MoE makes the memory
  bottleneck worse* is my own reasoning, not something any source above
  states. It follows: an MoE must hold every expert in memory but computes
  with only 3–6% of them, so arithmetic intensity falls and the workload
  leans harder on bandwidth. IEEE Spectrum explicitly does **not** discuss
  MoE. Either find a source that states it, or present it on-slide as
  reasoning rather than as a sourced fact. **Do not state it flatly.**
- **[VENDOR-REPORTED]** Every Jalapeño-vs-Blackwell number comes from
  OpenAI/Broadcom. The benchmark is public (SemiAnalysis InferenceX) but the
  run is not independently reproduced. Same care as the ARC-AGI harness
  story — attribute it.
- **[CHECK]** The `open_weight_moe_wave_2026` per-model figures should be
  verified against each model card before slide copy is locked.
- **[CONNECTS TO EXISTING WORK]** Source 30 reports closed labs cutting
  prices in response, specifically **GPT-5.6 Sol down over 20%**. That is
  almost certainly the same promotional pricing already noted in
  `copilot-model-selection-guide.md` ($4/$20 vs $5/$30 list, through 21 Nov).
  If so, the Sol System artifact's price footnote has a competitive cause
  worth naming.

## Proposed placement, if approved

- **Section 6 (how models are built)** — extend the existing MoE slide with
  the activation-ratio collapse: 25% then, 3–6% now.
- **New hardware beat after "Model, inference, harness"** — the inference
  layer they already know, now with silicon underneath it. Memory bottleneck,
  the 50–80% idle figure, HBM4, Jalapeño.
- **One slide aimed squarely at the room** — the kilowatt/cooling constraint
  and what XPUs mean for on-prem deployment. This is the slide this audience
  will actually take back to work.

**Running totals if all five are accepted: 31 sources — 27 Primary, 4 Supporting.**
