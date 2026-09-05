import { Document, Packer, Paragraph, TextRun, PageNumber, Footer, AlignmentType, HeadingLevel } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_MD = path.join(__dirname, 'report', 'report.md');
const OUT_DOCX = path.join(__dirname, 'research-report.docx');
const SOURCES = path.join(__dirname, 'sources', 'selected-sources.json');

// The bibliography is generated from the scored source list rather than
// maintained by hand, so the report can never cite something that isn't in
// the pipeline's own triage.
const sources = JSON.parse(fs.readFileSync(SOURCES, 'utf8'))
  .slice()
  .sort((a, b) => b.composite_score - a.composite_score);

const primaryCount = sources.filter(s => s.triage === 'primary').length;

const TITLE = 'AI and AGI: A Practitioner’s Briefing';
const SUBTITLE = 'What the current evidence supports, and where it runs out';
const DATE = 'September 2026';

// ---------------------------------------------------------------------------
// Content. One source of truth, rendered to both Markdown and .docx below.
// Block types: para | bullets | note
// ---------------------------------------------------------------------------
const sections = [
  {
    heading: 'Executive summary',
    blocks: [
      { para: `Capability is accelerating on every axis that can be measured: benchmark scores, the length of task a model can complete unsupervised, adoption, and investment. At the same time the cost of a unit of that capability is collapsing. Those two facts together, rather than either alone, are what make the current moment unusual.` },
      { para: `The harder problem for most organizations is not choosing a model. It is the layer above the model: the harness, the tool access, the retrieval strategy, and the engineering discipline wrapped around an agent that can now take multi-step action on its own. That layer is moving faster than the models themselves and is where most practical decisions actually get made.` },
      { para: `On the contested questions, this briefing does not pick a side. Whether current systems constitute artificial general intelligence depends entirely on whose definition is used, and the major labs do not agree with each other. Where the evidence is thin or self-reported, it is labeled as such.` },
    ],
  },
  {
    heading: 'How this was researched',
    blocks: [
      { para: `Every claim below traces to a source that was scored before it was used. Sources were rated on relevance to the question at hand (40 percent), recency (30 percent), and authority of the publisher (30 percent), with a foundational exemption so that a landmark paper anchoring a historical claim is not penalized for its age.` },
      { para: `Each source was then extracted into a structured record: its claims, its stated limitations, and any quotable material, with every individual claim tagged as either fact or opinion. Cross-source analysis identified agreements, contradictions, and gaps. One gap-review pass sent the process back for more sources after three topics turned out to have no supporting evidence at all.` },
      { note: `${sources.length} sources were used, ${primaryCount} rated primary. The full scored list appears at the end of this report and in the repository's source manifest.` },
    ],
  },
  {
    heading: 'The pace of change is the story',
    blocks: [
      { para: `Generative AI reached roughly 53 percent population adoption within three years, faster than either the personal computer or the internet, according to Stanford's AI Index. Global corporate AI investment reached 581.7 billion dollars, up 130 percent year over year.` },
      { para: `Compressed into the last twelve months, the pattern is sharper still. Three frontier models shipped inside an eleven-day window in November 2025. April 2026 was denser again, with major releases from nearly every significant lab in a single month. In September 2026 OpenAI released GPT-6 Astra and its president opened the briefing by declaring the arrival of the AGI era.` },
      { para: `Practitioner accounts track the same curve. On a long-form interview in August 2026, the creator of Ruby on Rails identified a specific date, 24 November 2025, as his personal dividing line for agentic coding: the point at which he stopped directing an agent step by step. He is candid that work shipped this way still accumulated architectural debt that required cleanup, which is a useful corrective to the more breathless framings.` },
    ],
  },
  {
    heading: 'What is actually inside a model',
    blocks: [
      { para: `A neural network is a function that has been shown a very large number of examples and gradually adjusted until it approximates the pattern in that data. The adjustable quantities are called weights, or equivalently parameters. A weight answers exactly one question: how much does this input matter to the result. The term comes from weighted averaging.` },
      { para: `Parameter count is therefore a rough proxy for capacity, but a poor proxy for cost. The more useful question is how many parameters actually activate on a given query. Mixture of Experts architectures exploit this directly: a router selects a small subset of specialist sub-networks per token, so total parameters can be enormous while active compute stays modest.` },
      { para: `DeepSeek's V4-Flash is the clearest published example, at 284 billion total parameters with roughly 13 billion active per token. DeepSeek reports it outperforming their own larger model across the agentic benchmarks they publish, though that comparison is self-reported. Frontier closed models are widely believed to use similar techniques, but their architectures are not disclosed, and figures circulating for them should be treated as rumor.` },
    ],
  },
  {
    heading: 'The tooling layer is where the work is',
    blocks: [
      { para: `Three layers are worth separating cleanly, because conflating them causes most of the confusion in this space. The model is the trained weights alone. Inference is the act of running those weights to produce output, which is a compute and serving concern. The harness is everything wrapped around the model to make it usable: interface, memory, tool access, and the agent loop.` },
      { para: `A model knows only its training data. It has never seen an organization's runbooks, ticket history, or internal policy. As of 2026 there are three viable ways to close that gap, and they are complementary rather than competing.` },
      { bullets: [
        `Long context: place the material directly in the prompt. Simplest approach, well suited to a modest number of documents, but cost and noise both rise with volume.`,
        `Retrieval-augmented generation: search the corpus first and send only relevant excerpts. More precise, considerably cheaper at scale, and because specific source material was supplied, the answer can cite it.`,
        `Agentic retrieval: the agent fetches what it needs at runtime, increasingly through a standard tool protocol. Appropriate where the underlying data changes constantly.`,
      ]},
      { para: `The Model Context Protocol, released as an open standard in November 2024 under an MIT license, addresses the integration side of this. Rather than bespoke glue code per tool, a server exposes a capability once and any compatible client can use it. Adoption among developer-tool vendors was rapid.` },
      { note: `None of these approaches retrain the model. They change what it is shown at the moment of the request, which is why they can be deployed quickly and updated by changing documents rather than weights.` },
    ],
  },
  {
    heading: 'Reading the model landscape',
    blocks: [
      { para: `The practical division is between closed models, available only through an API, and open-weight models, whose trained parameters can be downloaded and run on infrastructure you control. Open-weight is not the same as open-source: the weights are published, but training data and code generally are not. Conflating the two is among the most common errors in discussions of this topic.` },
      { para: `Capability differences between the leading options are real but narrower than marketing suggests, and they are differences of strength rather than rank. Coding and sustained tool use, breadth and multimodality, and very long context handling are distinct competencies, and the leader in one is not automatically the leader in another.` },
      { para: `Stanford's AI Index reports that the performance gap between United States and Chinese models has effectively closed, with the lead changing hands repeatedly since early 2025.` },
    ],
  },
  {
    heading: 'Measuring capability, and its limits',
    blocks: [
      { para: `Benchmarks measure specific tasks, not general intelligence, and different benchmark families answer genuinely different questions. Static test sets such as SWE-bench measure fixed problems with known answers. Human preference platforms measure which response people prefer in blind comparison. Task-autonomy metrics measure how long a task a model can complete unsupervised.` },
      { para: `That last family is the most informative about trajectory. METR's time-horizon metric, the length of task a model completes autonomously at a 50 percent success rate, has been doubling roughly every seven months.` },
      { para: `Four questions make any published score legible: what specific capability is being measured, who ran the evaluation, what surrounding scaffold was used, and how recently. The scaffold question matters more than most readers assume. A frontier model scored near-perfectly on one reasoning benchmark using its vendor's own harness, while a separately engineered system reached comparable results on the same evaluation with a substantially weaker base model. The system around the model can account for much of a headline number.` },
      { note: `Saturation is now a live problem. Coding benchmark scores moved from roughly 60 percent to near 100 percent in a single year, which means the benchmark has stopped discriminating between top-tier models rather than that the problem is solved.` },
    ],
  },
  {
    heading: 'What "AGI" means, and why nobody agrees',
    blocks: [
      { para: `There is no field-wide definition. OpenAI's charter sets a single economic bar: highly autonomous systems that outperform humans at most economically valuable work. Google DeepMind published a five-level framework instead, separating depth of performance from breadth of generality, on the explicit reasoning that a binary label produces unproductive argument.` },
      { para: `The tension is visible inside a single announcement. Launching GPT-6 Astra, OpenAI's president opened by declaring the AGI era, said he personally believed the threshold had been reached, and in the same session acknowledged that everyone holds a different definition and that the question is a grey and fuzzy one.` },
      { para: `The reasonable position for a practitioner is that this is a definitional dispute as much as an empirical one, and that a confident answer in either direction is a signal to check what definition is being assumed.` },
    ],
  },
  {
    heading: 'Cost, governance, and footprint',
    blocks: [
      { para: `The cost trend is the most underreported good news in the field. Inference for output at a given capability level fell roughly 280-fold in two years, from about 20 dollars to about 7 cents per million tokens. Hardware costs and energy efficiency both improved substantially over the same period.` },
      { para: `The environmental picture requires holding two true facts together. Electricity demand from AI-focused data centers grew about 50 percent in 2025 against roughly 3 percent growth in overall demand, and is projected to more than double by 2030. Data centers in aggregate nonetheless remain a little over 1 percent of global electricity consumption and about 0.5 percent of emissions today. Citing the growth rate without the base rate, or the reverse, misrepresents the situation.` },
      { para: `Governance is developing along two tracks simultaneously. Laboratories operate voluntary internal frameworks that gate releases against capability thresholds and are revised frequently. Regulators are establishing binding obligations, most substantially the EU AI Act, whose transparency and general-purpose-AI duties are already in force, with higher-risk obligations phased in over subsequent years and penalties scaled to global turnover.` },
    ],
  },
  {
    heading: 'A leadership lens',
    blocks: [
      { para: `Geoff Woods argues in The AI-Driven Leader that the common failure is treating these systems as a faster assistant rather than a thinking partner, and that value accrues in three ways: more productive people, more efficient operations, and more valuable products.` },
      { para: `His four-pillar framing, strategy, execution, human talent, and technology, maps unusually well onto infrastructure and operations work. Execution means concentrating on the fraction of work that drives most of the results; technology absorbs the routine remainder so that skilled people spend their time on judgment. This is the same instinct behind automating routine operational work, and it long predates AI. Blanchard built the goal-setting method in The One Minute Manager on the same principle decades earlier.` },
      { note: `These are the author's frameworks and are presented as opinion, not as independently verified findings.` },
    ],
  },
  {
    heading: 'Contested and uncertain',
    blocks: [
      { para: `Several claims in this briefing rest on weaker ground than the rest, and are flagged here rather than buried.` },
      { bullets: [
        `Vendor-reported benchmark figures, including comparisons a laboratory publishes between its own models, have not been independently reproduced.`,
        `Architecture details for closed frontier models are not disclosed. Parameter counts in circulation are rumor and are treated as such throughout.`,
        `The relative standing of retrieval against long-context approaches is drawn largely from practitioner and vendor writing rather than peer-reviewed work. The directional consensus is consistent, but specific cost-crossover figures vary enough that none are quoted here.`,
        `Analyst placements of technologies on maturity curves are informed judgment, not measurement, and have been revised in the past.`,
        `Figures dated to 2026 describe a fast-moving field and should be re-verified before reuse.`,
      ]},
    ],
  },
];

// ---------------------------------------------------------------------------
// Markdown renderer
// ---------------------------------------------------------------------------
function toMarkdown() {
  const L = [];
  L.push(`# ${TITLE}`, '', `_${SUBTITLE}_`, '', `**${DATE}**  |  ${sources.length} sources (${primaryCount} primary)`, '');
  L.push('> Generated by `gen-report.mjs`. The bibliography is built from', '> `sources/selected-sources.json`, so it always matches the scored', '> source list the pipeline actually used.', '');
  L.push('---', '');

  for (const sec of sections) {
    L.push(`## ${sec.heading}`, '');
    for (const b of sec.blocks) {
      if (b.para) L.push(b.para, '');
      if (b.bullets) { for (const x of b.bullets) L.push(`- ${x}`); L.push(''); }
      if (b.note) L.push(`> **Note:** ${b.note}`, '');
    }
  }

  L.push('---', '', '## Sources', '', `Scored on 40 percent relevance, 30 percent recency, 30 percent authority. Sorted by composite score.`, '');
  L.push('| Score | Tier | Source | Publisher | Link |', '|---|---|---|---|---|');
  for (const s of sources) {
    const tier = s.triage === 'primary' ? 'Primary' : 'Supporting';
    L.push(`| ${s.composite_score.toFixed(2)} | ${tier} | ${s.title} | ${s.publisher ?? ''} | ${s.citation_url} |`);
  }
  L.push('');
  return L.join('\n');
}

// ---------------------------------------------------------------------------
// DOCX renderer
// ---------------------------------------------------------------------------
const INK = '1E293B', ACCENT = '2563EB', GRAY = '64748B';

function docxParagraphs() {
  const out = [];
  out.push(new Paragraph({ children: [new TextRun({ text: TITLE, bold: true, size: 40, color: INK, font: 'Arial' })], spacing: { after: 60 } }));
  out.push(new Paragraph({ children: [new TextRun({ text: SUBTITLE, italics: true, size: 24, color: GRAY, font: 'Arial' })], spacing: { after: 60 } }));
  out.push(new Paragraph({
    children: [new TextRun({ text: `${DATE}   |   ${sources.length} sources (${primaryCount} primary)`, size: 20, color: GRAY, font: 'Arial' })],
    spacing: { after: 360 },
    border: { bottom: { style: 'single', size: 12, color: INK, space: 6 } },
  }));

  for (const sec of sections) {
    out.push(new Paragraph({
      children: [new TextRun({ text: sec.heading, bold: true, size: 28, color: INK, font: 'Arial' })],
      spacing: { before: 360, after: 140 },
      border: { bottom: { style: 'single', size: 6, color: ACCENT, space: 4 } },
    }));
    for (const b of sec.blocks) {
      if (b.para) out.push(new Paragraph({ children: [new TextRun({ text: b.para, size: 22, color: '222222', font: 'Arial' })], spacing: { after: 140, line: 320 } }));
      if (b.bullets) for (const x of b.bullets) out.push(new Paragraph({ children: [new TextRun({ text: x, size: 22, color: '222222', font: 'Arial' })], bullet: { level: 0 }, spacing: { after: 80, line: 300 } }));
      if (b.note) out.push(new Paragraph({
        children: [new TextRun({ text: b.note, size: 21, italics: true, color: INK, font: 'Arial' })],
        spacing: { before: 80, after: 160, line: 300 }, indent: { left: 360 },
        border: { left: { style: 'single', size: 12, color: ACCENT, space: 12 } },
      }));
    }
  }

  out.push(new Paragraph({
    children: [new TextRun({ text: 'Sources', bold: true, size: 28, color: INK, font: 'Arial' })],
    spacing: { before: 400, after: 100 },
    border: { bottom: { style: 'single', size: 6, color: ACCENT, space: 4 } },
  }));
  out.push(new Paragraph({ children: [new TextRun({ text: 'Scored on 40 percent relevance, 30 percent recency, 30 percent authority. Sorted by composite score.', size: 20, italics: true, color: GRAY, font: 'Arial' })], spacing: { after: 160 } }));
  for (const s of sources) {
    const tier = s.triage === 'primary' ? 'Primary' : 'Supporting';
    out.push(new Paragraph({
      children: [
        new TextRun({ text: `${s.composite_score.toFixed(2)}  ${tier}  `, bold: true, size: 18, color: ACCENT, font: 'Arial' }),
        new TextRun({ text: `${s.title}. `, size: 20, color: '222222', font: 'Arial' }),
        new TextRun({ text: `${s.publisher ?? ''}. `, size: 20, italics: true, color: '222222', font: 'Arial' }),
        new TextRun({ text: s.citation_url, size: 17, color: GRAY, font: 'Arial' }),
      ],
      spacing: { after: 120, line: 260 },
    }));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Write both
// ---------------------------------------------------------------------------
fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
fs.writeFileSync(OUT_MD, toMarkdown());
console.log(`Generated: ${OUT_MD}`);

const doc = new Document({
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ text: 'AI and AGI: A Practitioner’s Briefing  |  Page ', size: 16, color: GRAY, font: 'Arial' }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GRAY, font: 'Arial' }),
        ],
      })] }),
    },
    children: docxParagraphs(),
  }],
});
fs.writeFileSync(OUT_DOCX, await Packer.toBuffer(doc));
console.log(`Generated: ${OUT_DOCX}`);
console.log(`Sections: ${sections.length}  |  Sources: ${sources.length}`);
