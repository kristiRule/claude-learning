import PptxGenJS from 'pptxgenjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'deck.pptx');

// Theme (pptxgenjs uses hex WITHOUT the # sign), from references/STYLE_GUIDE.md.
// Our own palette, distinct from the weather/dragon-con navy+gold house style (by request).
const SLATE   = '1E293B'; // card fill
const INK     = '0F172A'; // background (dark)
const OFFWH   = 'F8FAFC'; // headings / high-emphasis text
const LIGHT   = 'E2E8F0'; // body text on dark
const BLUE    = '2563EB'; // accent / highlight
const AMBER   = 'F59E0B'; // secondary accent (contested/rumor markers)
const GREEN   = '22C55E'; // secondary accent (confirmed/positive markers)
const MUTED   = '64748B'; // captions, citations
const FONT    = 'Arial';

const pres = new PptxGenJS();
pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches, matches weather/dragon-con convention
const FULLW = 13.33, FULLH = 7.5;
const MX = 0.55; // left/right margin
const CW = FULLW - 2 * MX; // content width

let n = 0;
function nextN() { n += 1; return n; }
let sectionN = 0;

// Shared helpers.

function darkBg(slide) { slide.background = { color: INK }; }

function pageNum(slide) {
  slide.addText(String(nextN()), {
    x: FULLW - 0.8, y: FULLH - 0.42, w: 0.5, h: 0.32,
    fontSize: 10, color: MUTED, fontFace: FONT, align: 'right',
  });
}

function kicker(slide, text) {
  slide.addText(text.toUpperCase(), {
    x: MX, y: 0.35, w: CW, h: 0.4,
    fontSize: 12, bold: true, color: BLUE, fontFace: FONT, charSpacing: 2,
  });
}

function heading(slide, text, y = 0.72) {
  slide.addText(text, {
    x: MX, y, w: CW, h: 0.85,
    fontSize: 30, bold: true, color: OFFWH, fontFace: FONT,
  });
}

function bulletsBlock(slide, bullets, opts = {}) {
  const items = bullets.map(b => ({
    text: `›  ${b}`,
    options: { breakLine: true, paraSpaceAfter: 10 },
  }));
  slide.addText(items, {
    x: opts.x ?? MX, y: opts.y ?? 2.9, w: opts.w ?? 5.6, h: opts.h ?? 3.6,
    fontSize: opts.fontSize ?? 16, color: LIGHT, fontFace: FONT,
    lineSpacingMultiple: 1.35, valign: 'top',
  });
}

function divider(phrase, notes) {
  const s = pres.addSlide(); darkBg(s);
  sectionN += 1;
  s.addText(`SECTION ${String(sectionN).padStart(2, '0')}`, {
    x: 1.0, y: 2.65, w: FULLW - 2.0, h: 0.35, fontSize: 13, bold: true, color: BLUE, fontFace: FONT, charSpacing: 3, align: 'center',
  });
  s.addText(phrase, {
    x: 1.0, y: 3.05, w: FULLW - 2.0, h: 1.1, fontSize: 40, bold: true, color: OFFWH, fontFace: FONT, align: 'center',
  });
  // A short underline below the phrase, sized to sit clear of the text
  // instead of a full-bleed bar running through its vertical center.
  s.addShape(pres.ShapeType.rect, { x: FULLW/2 - 0.6, y: 4.25, w: 1.2, h: 0.035, fill: { color: BLUE }, line: { width: 0 } });
  s.addNotes(notes);
  pageNum(s);
  return s;
}

function vocabCard(s, x, y, w, term, def) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 1.35, fill: { color: SLATE }, line: { color: BLUE, width: 0.75 }, rectRadius: 0.06 });
  s.addText(term, { x: x + 0.22, y: y + 0.1, w: w - 0.4, h: 0.4, fontSize: 15, bold: true, color: BLUE, fontFace: FONT });
  s.addText(def, { x: x + 0.22, y: y + 0.5, w: w - 0.4, h: 0.8, fontSize: 11.5, color: LIGHT, fontFace: FONT, valign: 'top' });
}

function vocabSlide(kick, title, terms) {
  const s = pres.addSlide(); darkBg(s);
  kicker(s, kick);
  heading(s, title);
  const cardW = (CW - 0.5) / 3;
  const xs = [MX, MX + cardW + 0.25, MX + 2 * (cardW + 0.25)];
  const ys = [1.85, 3.35, 4.85];
  terms.forEach(([t, d], i) => vocabCard(s, xs[i % 3], ys[Math.floor(i / 3)], cardW, t, d));
  return s;
}

// ============================================================================
// 1. TITLE
// ============================================================================
{
  const s = pres.addSlide(); darkBg(s);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 3.55, w: FULLW, h: 0.03, fill: { color: BLUE }, line: { width: 0 } });
  s.addText('AI / AGI', {
    x: 0.5, y: 2.3, w: FULLW - 1, h: 1.1, fontSize: 56, bold: true, color: OFFWH, fontFace: FONT, align: 'center',
  });
  s.addText('What it is, what it can do, and how to pick the right tool', {
    x: 0.5, y: 3.75, w: FULLW - 1, h: 0.6, fontSize: 20, italic: true, color: LIGHT, fontFace: FONT, align: 'center',
  });
  s.addText('A lightning talk for engineers and technology teams', {
    x: 0.5, y: 6.6, w: FULLW - 1, h: 0.4, fontSize: 13, color: MUTED, fontFace: FONT, align: 'center',
  });
  s.addNotes(
    "Hi everyone. Over the next twenty-five minutes or so, I want to give you enough of a grip on AI that you can hold your own in a real conversation about it and make good calls about it in your own work, whether that's writing code or running the infrastructure everything else sits on. This is going to be practical and, honestly, pretty exciting. There's a lot of good news buried under the hype headlines, and that's what I want to surface today. Let's get into it."
  );
  pageNum(s);
}

// ============================================================================
// 2. AGENDA
// ============================================================================
{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Agenda');
  heading(s, "What we're covering");
  const items = [
    'What AI is', 'What AGI is, and isn’t',
    'How to use it', 'How models are built',
    'Popular models and what they’re good at', 'Picking the right model',
    'Responsible AI', 'A business lens',
    'How to stay conversational', 'Bonus: Gartner Hype Cycle overview',
  ];
  const col1 = items.slice(0, 5), col2 = items.slice(5);
  bulletsBlock(s, col1, { x: MX, y: 1.85, w: 5.9, h: 4.7, fontSize: 16 });
  bulletsBlock(s, col2, { x: MX + 6.3, y: 1.85, w: 5.9, h: 4.7, fontSize: 16 });
  s.addNotes(
    "Here's the map. We'll start with a fast grounding in what AI and AGI actually are, then spend real time on the part that matters most day to day: how you actually use this stuff, how models are built under the hood, what the popular models are good at, and a genuinely practical way to pick the right one for a given job. Then a quick responsible-AI check-in, a business lens, how to stay conversational after today, and a short bonus section at the end on the Gartner Hype Cycle, a framework you'll hear referenced constantly."
  );
  pageNum(s);
}

// ============================================================================
// 3 and 4. VOCABULARY
// ============================================================================
{
  const s = vocabSlide('Vocabulary', 'The building blocks', [
    ['Model', 'The trained weights, the "brain," with no product wrapper'],
    ['Inference', 'Running a trained model to produce an output'],
    ['Harness', 'The software wrapped around a model: chat UI, memory, tools, agent loop'],
    ['MCP', 'Open standard letting an agent call external tools and data through one protocol'],
    ['Open-weight', 'Downloadable weights, not the same as open-source'],
    ['Weight (aka "parameter")', 'How much one input matters to the answer; a model tunes billions of these itself'],
  ]);
  s.addNotes(
    "Six terms up front, six more on the next slide, so nothing later in the talk lands as unexplained jargon. Model is just the trained weights, no chat window, no memory, nothing wrapped around it. Inference is the act of running that model to get an answer out. A harness is everything built around the model to make it usable: Claude Code, Cursor, ChatGPT the product, are all harnesses. MCP is a specific, real standard for how a harness lets an agent reach out and use external tools, and we'll see exactly what that means in a few minutes. Open-weight means you can download the weights, it does not mean open-source, and conflating those two is one of the most common mistakes people make in this space. And a weight, which you'll also hear called a parameter, is just a number representing how much a given input matters to the answer. Don't worry if that one's still fuzzy, we're going to spend a whole slide on it shortly, because everything else builds on it."
  );
  pageNum(s);
}

{
  const s = vocabSlide('Vocabulary', 'The bigger picture', [
    ['AGI', 'Artificial general intelligence: no field-wide agreed definition yet'],
    ['Mixture of Experts', 'Routes each input to a few specialist sub-networks, not the whole model'],
    ['Benchmark', 'A standardized test used to compare model capability for a specific job'],
    ['Time horizon', 'METR’s metric: task length a model can finish autonomously'],
    ['Agentic engineering', 'Structured agent loops with tests and review, vs. loose "vibe coding"'],
    ['RAG', 'Search your own content first, send the relevant bits along with the question'],
  ]);
  s.addNotes(
    "AGI we'll spend a few fun minutes on, because nobody agrees on exactly what it means yet, including the labs building toward it, and that's a genuinely interesting debate. Mixture of Experts is an architecture trick that lets a model have a huge number of parameters without a huge compute bill on every query, more on that shortly. A benchmark is a standardized test, and the useful skill is matching the right benchmark to the job you actually need done. Time horizon is a specific research metric from METR for how long a task a model can just go do on its own. Agentic engineering versus vibe coding is a live, useful distinction for how you actually work with these tools. And RAG is how you point a model at your own content: search your stuff first, then send the relevant pieces along with the question. That one gets a full slide shortly, because it's probably the most practically useful thing in this talk for anyone here."
  );
  pageNum(s);
}

// ============================================================================
// 5. COLD OPEN
// ============================================================================
{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Why this is exciting right now');
  heading(s, 'OpenAI says we’re in the AGI era');
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 1.85, w: CW, h: 1.55, fill: { color: SLATE }, line: { color: BLUE, width: 1 }, rectRadius: 0.08 });
  s.addText('"Welcome to the AGI era."', {
    x: MX + 0.3, y: 2.0, w: CW - 0.6, h: 0.7, fontSize: 26, italic: true, bold: true, color: OFFWH, fontFace: FONT,
  });
  s.addText('Greg Brockman · OpenAI President · launching GPT-6 Astra, Sept 3, 2026', {
    x: MX + 0.3, y: 2.7, w: CW - 0.6, h: 0.6, fontSize: 13, color: MUTED, fontFace: FONT,
  });
  bulletsBlock(s, [
    'A major lab just shipped a model it calls the most capable it’s built',
    'Gen-AI adoption hit 53% of the population in 3 years, faster than the PC or internet',
  ], { x: MX, y: 3.7, w: CW, h: 1.6, fontSize: 17 });
  s.addNotes(
    "Here's why I think right now is a genuinely fun moment to be paying attention: three days before I put this talk together, OpenAI launched a model called GPT-6 Astra, and their president opened the press briefing by saying we're entering the AGI era. We'll dig into whether that label actually holds up in a few minutes, and it's a more interesting question than a yes or no. But the pace itself is the real story. Stanford's own AI Index found generative AI hit fifty-three percent population adoption in three years, faster than the PC, faster than the internet. That's the speed we're working with, and it's speeding up."
  );
  pageNum(s);
}

// ============================================================================
// WHAT AI ACTUALLY IS
// ============================================================================
divider('What AI Is', 'A fast grounding: how we got here, and what’s happening inside these models.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'History');
  heading(s, 'How we got here');
  const events = [
    ['2012', 'AlexNet beats ImageNet by 10.8 points: deep learning proves itself'],
    ['2017', '"Attention Is All You Need": the Transformer architecture arrives'],
    ['2022', 'ChatGPT launches quietly, hits 1M users in 5 days'],
    ['2024', 'MCP arrives: agents get a standard way to use tools'],
    ['2026', 'GPT-6 Astra launches; OpenAI calls it the start of the AGI era'],
  ];
  const lineY = 4.1;
  const lineX0 = 1.3, lineX1 = FULLW - 1.3;
  s.addShape(pres.ShapeType.line, { x: lineX0, y: lineY, w: lineX1 - lineX0, h: 0, line: { color: MUTED, width: 2 } });
  const xs = events.map((_, i) => lineX0 + ((lineX1 - lineX0) / (events.length - 1)) * i);
  const labelW = 2.3;
  events.forEach(([yr, txt], i) => {
    const x = xs[i];
    let boxX = x - labelW / 2;
    boxX = Math.max(MX, Math.min(boxX, FULLW - MX - labelW));
    s.addShape(pres.ShapeType.ellipse, { x: x - 0.07, y: lineY - 0.07, w: 0.14, h: 0.14, fill: { color: BLUE }, line: { width: 0 } });
    s.addText(yr, { x: boxX, y: lineY - 0.6, w: labelW, h: 0.4, fontSize: 17, bold: true, color: OFFWH, fontFace: FONT, align: 'center' });
    s.addText(txt, { x: boxX, y: lineY + 0.22, w: labelW, h: 1.9, fontSize: 10.5, color: LIGHT, fontFace: FONT, align: 'center', valign: 'top' });
  });
  s.addNotes(
    "Twelve years, five moments, and the gaps between them keep shrinking. 2012: a model called AlexNet wins the ImageNet competition by ten point eight points, a gap way bigger than the usual year-over-year improvement, and that's the moment deep learning proved itself for real. 2017: a paper called Attention Is All You Need introduces the Transformer architecture, the foundation of basically every major language model since, including the one many of you used this morning. 2022: OpenAI quietly posts a short blog announcing ChatGPT, and it hits a million users in five days. 2024: MCP arrives, giving agents a standard way to reach out and use tools, we'll get hands-on with that in a few minutes. And 2026: GPT-6 Astra, where we just were. That's the whole arc in one breath."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Recent history');
  heading(s, 'The last 12 months');
  const events = [
    ['Nov 2025', '3 frontier models launch in 11 days: GPT-5.1, Gemini 3 Pro, Claude Opus 4.5'],
    ['Feb 2026', 'Agents get good enough for real production work'],
    ['Apr 2026', 'Densest release month yet: Gemma 4, Llama 4, Opus 4.7, GPT-5.5, Grok 4.3'],
    ['Summer 2026', 'Opus 5, Fable, and GPT Sol arrive: agents start setting their own direction'],
    ['Sep 2026', 'GPT-6 Astra launches; OpenAI calls it the AGI era'],
  ];
  const lineY = 4.1;
  const lineX0 = 1.3, lineX1 = FULLW - 1.3;
  s.addShape(pres.ShapeType.line, { x: lineX0, y: lineY, w: lineX1 - lineX0, h: 0, line: { color: GREEN, width: 2 } });
  const xs2 = events.map((_, i) => lineX0 + ((lineX1 - lineX0) / (events.length - 1)) * i);
  const labelW2 = 2.35;
  events.forEach(([yr, txt], i) => {
    const x = xs2[i];
    let boxX = x - labelW2 / 2;
    boxX = Math.max(MX, Math.min(boxX, FULLW - MX - labelW2));
    s.addShape(pres.ShapeType.ellipse, { x: x - 0.07, y: lineY - 0.07, w: 0.14, h: 0.14, fill: { color: GREEN }, line: { width: 0 } });
    s.addText(yr, { x: boxX, y: lineY - 0.6, w: labelW2, h: 0.4, fontSize: 15, bold: true, color: OFFWH, fontFace: FONT, align: 'center' });
    s.addText(txt, { x: boxX, y: lineY + 0.22, w: labelW2, h: 1.9, fontSize: 10, color: LIGHT, fontFace: FONT, align: 'center', valign: 'top' });
  });
  s.addNotes(
    "Here's the same story, zoomed all the way into just the last twelve months, because this is really where the pace becomes obvious. November 2025: three frontier models ship within eleven days of each other, GPT-5.1, Gemini 3 Pro, and Claude Opus 4.5. I'm pulling the personal-account color here from DHH, who called November 24th, the day Opus 4.5 shipped, his own dividing line for agentic coding, before that he was directing every step, after it he wasn't. Honestly, that tracks with my own experience too, that's roughly when this stopped feeling like autocomplete and started feeling like delegating. By February 2026, he says agents were already good enough that his own company, 37signals, shipped Basecamp 5 leaning on them, though he's honest that some of the unguided vibe-coded parts needed architectural cleanup afterward, a good reminder that this stuff still needs real engineering discipline. April 2026 was probably the single densest release month yet, Gemma 4, Llama 4, Claude Opus 4.7, GPT-5.5, Grok 4.3, practically every major lab shipped something. And by this summer, with Opus 5, Fable, and GPT Sol, he describes a further shift: agents that set their own direction on a problem instead of being told each step. That brings us right back to September, and Astra. Twelve months, and the gaps between releases are now measured in weeks, not years."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'The basics');
  heading(s, 'How a neural network works');
  const layerX = [2.0, 5.1, 8.2, 11.3];
  const counts = [3, 4, 4, 2];
  const r = 0.16;
  const nodes = layerX.map((x, li) => {
    const cnt = counts[li];
    return Array.from({ length: cnt }, (_, i) => ({
      x, y: 2.1 + i * (3.5 / (cnt - 1 || 1)),
    }));
  });
  for (let li = 0; li < nodes.length - 1; li++) {
    for (const a of nodes[li]) {
      for (const b of nodes[li + 1]) {
        s.addShape(pres.ShapeType.line, {
          x: a.x, y: a.y + r, w: b.x - a.x, h: (b.y + r) - (a.y + r),
          line: { color: MUTED, width: 0.5 },
        });
      }
    }
  }
  nodes.forEach((layer, li) => {
    layer.forEach(({ x, y }) => {
      s.addShape(pres.ShapeType.ellipse, { x: x - r, y, w: r * 2, h: r * 2, fill: { color: li === 3 ? GREEN : BLUE }, line: { width: 0 } });
    });
  });
  s.addText('inputs', { x: 1.2, y: 5.85, w: 1.6, h: 0.4, fontSize: 12, color: MUTED, fontFace: FONT, align: 'center' });
  s.addText('every line carries a "weight": how much that signal matters', { x: 3.2, y: 5.85, w: 6.0, h: 0.4, fontSize: 12, color: MUTED, fontFace: FONT, align: 'center' });
  s.addText('output', { x: 10.6, y: 5.85, w: 1.4, h: 0.4, fontSize: 12, color: MUTED, fontFace: FONT, align: 'center' });
  s.addNotes(
    "Here's the whole mental model, and it fits in one breath: a neural network is a function that's been shown a huge number of examples and gradually adjusted (the technical word is trained) until it gets good at approximating the pattern in that data. Now look at the lines on this screen. Every single one carries a number that says how much that signal matters on its way to the next dot. Those numbers are the weights, and we'll unpack exactly what that means in a couple of slides. A bigger, more capable model usually just means more of these connections, tuned on more examples. That's it, that's the whole idea underneath everything we're about to talk about."
  );
  pageNum(s);
}

// ============================================================================
// WHAT AGI IS, AND ISN'T
// ============================================================================
divider('What AGI Is, and Isn’t', 'Nobody agrees on this one, and that’s a more interesting story than a clean definition would be.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'No agreed definition');
  heading(s, 'Three different definitions');
  const cards = [
    ['OpenAI’s Charter', '"Highly autonomous systems that outperform humans at most economically valuable work."'],
    ['DeepMind’s "Levels of AGI"', 'Five levels: Emerging, Competent, Expert, Virtuoso, Superhuman. A ladder, not a line.'],
    ['Brockman, live, Sept 2026', '"Everyone has a different definition of AGI... it’s a much more gray, fuzzy thing."'],
  ];
  const cw = (CW - 0.6) / 3;
  cards.forEach(([label, quote], i) => {
    const x = MX + i * (cw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.85, w: cw, h: 4.2, fill: { color: SLATE }, line: { color: BLUE, width: 1 }, rectRadius: 0.08 });
    s.addText(label, { x: x + 0.22, y: 2.05, w: cw - 0.44, h: 0.8, fontSize: 14, bold: true, color: BLUE, fontFace: FONT });
    s.addText(quote, { x: x + 0.22, y: 2.85, w: cw - 0.44, h: 3.0, fontSize: 12.5, italic: true, color: LIGHT, fontFace: FONT, valign: 'top' });
  });
  s.addNotes(
    "So, is Astra AGI? Here's the fun, honest answer: it depends entirely on whose definition you're using, and three very serious groups define it three different ways. OpenAI's own charter sets a clean one-line bar: highly autonomous systems that outperform humans at most economically valuable work. Google DeepMind published a different framework entirely, a five-level ladder from Emerging to Superhuman, specifically because a single yes-or-no label creates unproductive arguments. And Brockman himself, days ago, said in the same breath that we're in the AGI era and that everyone has a different definition of it. I love this as a talk moment because it means you get to have an informed opinion here, there isn't a hidden right answer you're missing."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Two declarations, six days apart');
  heading(s, 'Notice who is doing the declaring');

  const claims = [
    ['Greg Brockman', 'President, OpenAI  ·  Sept 3', AMBER,
     '“Welcome to the AGI era.”',
     'Sells: the model being called AGI.'],
    ['Jensen Huang', 'CEO, NVIDIA  ·  Sept 8', GREEN,
     '“AGI has arrived. Congratulations, OpenAI team.”',
     'Sells: the 100,000+ GPUs it was trained on, with 400,000 more coming. He said so in the same post.'],
  ];
  const cw2 = (CW - 0.4) / 2;
  claims.forEach(([who, role, accent, quote, stake], i) => {
    const x = MX + i * (cw2 + 0.4);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.8, w: cw2, h: 3.5, fill: { color: SLATE }, line: { color: accent, width: 1.25 }, rectRadius: 0.08 });
    s.addText(who,  { x: x + 0.25, y: 1.95, w: cw2 - 0.5, h: 0.35, fontSize: 17, bold: true, color: accent, fontFace: FONT });
    s.addText(role, { x: x + 0.25, y: 2.3,  w: cw2 - 0.5, h: 0.3,  fontSize: 11, color: MUTED, fontFace: FONT });
    s.addText(quote,{ x: x + 0.25, y: 2.75, w: cw2 - 0.5, h: 1.2,  fontSize: 15, italic: true, color: OFFWH, fontFace: FONT, valign: 'top' });
    s.addText(stake,{ x: x + 0.25, y: 4.05, w: cw2 - 0.5, h: 1.1,  fontSize: 12, color: LIGHT, fontFace: FONT, valign: 'top' });
  });

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 5.55, w: CW, h: 0.85, fill: { color: SLATE }, line: { color: BLUE, width: 1 }, rectRadius: 0.08 });
  s.addText([
    { text: 'Neither of them is lying. Both of them have a stake.', options: { color: OFFWH, bold: true } },
    { text: '  Worth asking who benefits before you accept a milestone.', options: { color: LIGHT } },
  ], { x: MX + 0.25, y: 5.67, w: CW - 0.5, h: 0.6, fontSize: 14, fontFace: FONT, valign: 'middle' });

  s.addNotes(
    "So if the definitions don't settle it, look at who's doing the declaring. Because in one week, two of the most powerful people in this industry both said the milestone had been reached. On September third, Greg Brockman, president of OpenAI, opened the Astra briefing with welcome to the AGI era. Five days later, Jensen Huang, the CEO of NVIDIA, posted on X: AGI has arrived, congratulations OpenAI team. Now, I'm not putting these up here to be cynical, and I want to be careful about that, because I don't think either of them is lying. I think they both believe it. But notice what each of them sells. Brockman is describing his own product. And Huang, in the very same post where he declared AGI had arrived, mentioned that Astra was trained on more than a hundred thousand of NVIDIA's GPUs and that another four hundred thousand were coming online soon. He disclosed his own stake in the same breath, which is honestly more than a lot of people do. So this is the skill I actually want you to take from this section. When somebody announces a milestone, that's data, but it isn't proof. Ask what they sell. It's the same muscle we're about to use on benchmarks, and it's the single most useful habit you can have in a field that moves this fast and has this much money in it."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'One group tried to make it measurable');
  heading(s, 'So what would we actually measure?');

  // Chollet's definition, as the anchor claim.
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 1.8, w: CW, h: 1.15, fill: { color: SLATE }, line: { color: GREEN, width: 1 }, rectRadius: 0.08 });
  s.addText([
    { text: 'Intelligence is ', options: { color: LIGHT } },
    { text: '“skill-acquisition efficiency over a scope of tasks.”', options: { color: OFFWH, bold: true } },
    { text: '   François Chollet, ARC-AGI', options: { color: MUTED, italic: true } },
  ], { x: MX + 0.25, y: 1.95, w: CW - 0.5, h: 0.85, fontSize: 15, fontFace: FONT, valign: 'middle' });

  bulletsBlock(s, [
    'Not what a model knows. How fast it picks up something new',
    'Puzzles built to be easy for humans, hard for AI',
    'ARC-AGI-3 gives an agent no instructions, rules, or goals',
  ], { x: MX, y: 3.15, w: CW, h: 1.5, fontSize: 15.5 });

  // The six-month arc on ARC-AGI-3.
  const marks = [
    ['Mar 2026', 'Benchmark launches', '0.51%', 'best AI'],
    ['May 2026', 'GPT-5.5 / Opus 4.7', '0.43%', 'still near zero'],
    ['Sep 2026', 'GPT-6 Astra', '62.7%', 'verified run'],
  ];
  const mw = (CW - 0.6) / 3;
  marks.forEach(([when, what, num, cap], i) => {
    const x = MX + i * (mw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.85, w: mw, h: 1.65, fill: { color: SLATE }, line: { color: i === 2 ? GREEN : BLUE, width: 1 }, rectRadius: 0.08 });
    s.addText(when, { x: x + 0.2, y: 4.98, w: mw - 0.4, h: 0.3, fontSize: 11.5, bold: true, color: BLUE, fontFace: FONT, charSpacing: 1 });
    s.addText(num, { x: x + 0.2, y: 5.26, w: mw - 0.4, h: 0.6, fontSize: 27, bold: true, color: i === 2 ? GREEN : OFFWH, fontFace: FONT });
    s.addText(`${what} · ${cap}`, { x: x + 0.2, y: 5.88, w: mw - 0.4, h: 0.5, fontSize: 10.5, color: LIGHT, fontFace: FONT, valign: 'top' });
  });
  s.addText('Human baseline on the same benchmark: 100%.', {
    x: MX, y: 6.62, w: CW, h: 0.35, fontSize: 12.5, italic: true, color: MUTED, fontFace: FONT,
  });

  s.addNotes(
    "Now, if you find that unsatisfying, that nobody agrees, one group did try to make it measurable, and it's worth knowing about because it's the only serious attempt to turn AGI from a vibe into a score. François Chollet, who wrote the Keras deep learning library, proposed this definition back in 2019: intelligence is skill-acquisition efficiency over a scope of tasks. Read that again, because the important word is efficiency. It is deliberately not measuring what a model already knows. It's measuring how fast it picks up something it has never seen. So he built a benchmark around that called ARC-AGI, and the tasks are designed to be easy for humans and hard for AI, using only the kind of reasoning a small child already has. The newest version, ARC-AGI-3, drops an agent into an interactive environment with no instructions, no rules, and no stated goals, and it has to figure out what the game even is. Now here's the part that should get your attention, and it's the single fastest-moving number I found while putting this talk together. When ARC-AGI-3 launched in March of this year, the best AI in the world scored about half of one percent. In May, GPT-5.5 got zero point four three percent and Claude Opus 4.7 got zero point one eight. Essentially zero. Six months after launch, GPT-6 Astra scored sixty-two point seven percent on an independently verified run. Humans, for reference, score one hundred percent. So: not solved, and the gap to human is still real. But zero to sixty-two in six months on the benchmark specifically built to be resistant to this is the kind of thing you want to have noticed before someone asks you about it."
  );
  pageNum(s);
}

// ============================================================================
// HOW TO ACTUALLY USE IT
// ============================================================================
divider('How to Use It', 'Genuinely useful if you touch software or infrastructure for a living.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'The three layers');
  heading(s, 'Model, inference, harness');
  const layers = [
    ['MODEL', 'The trained weights. Claude, GPT, Gemini, Llama: just the brain.', SLATE],
    ['INFERENCE', 'Running the model to actually get an output. The compute and serving step.', SLATE],
    ['HARNESS', 'Everything wrapped around it: Claude Code, Cursor, ChatGPT-the-product, an agent loop with memory and tool access.', BLUE],
  ];
  layers.forEach(([label, desc, color], i) => {
    const y = 1.8 + i * 1.5;
    s.addShape(pres.ShapeType.rect, { x: MX, y, w: CW, h: 1.28, fill: { color }, line: { width: 0 } });
    s.addText(label, { x: MX + 0.3, y: y + 0.12, w: 2.4, h: 0.5, fontSize: 18, bold: true, color: OFFWH, fontFace: FONT });
    s.addText(desc, { x: MX + 0.3, y: y + 0.6, w: CW - 0.6, h: 0.62, fontSize: 13, color: LIGHT, fontFace: FONT });
  });
  s.addNotes(
    "Three layers, and separating them cleanly is the single most useful mental upgrade in this whole talk. The model is just the weights: Claude, GPT, Gemini, Llama, whatever, with no product around it at all. Inference is the act of actually running that model to produce an output, a compute and serving problem, which for a lot of you in this room is genuinely your problem to size and budget for. And the harness is everything wrapped around the model to make it into something you'd actually use: Claude Code, Cursor, the ChatGPT app, a help desk agent with memory and tool access. The harness layer is where almost all of the interesting, fast-moving engineering work is happening right now, and it's the layer most of you will actually build on."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'The layer underneath inference');
  heading(s, 'Inference is now a hardware problem');

  const stats = [
    ['50 to 80%', AMBER, 'of the time, H100s running open models sit idle. Waiting on memory, not short of compute.'],
    ['22% vs 19%', GREEN, 'growth in 2026 for specialised chips versus GPUs. Purpose-built inference silicon is outpacing them.'],
    ['over half', BLUE,  'of tokens on AWS Bedrock already run on Amazon’s own Trainium chips, not on GPUs.'],
  ];
  const cw3 = (CW - 0.6) / 3;
  stats.forEach(([big, accent, note], i) => {
    const x = MX + i * (cw3 + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.75, w: cw3, h: 1.85, fill: { color: SLATE }, line: { color: accent, width: 1 }, rectRadius: 0.08 });
    s.addText(big,  { x: x + 0.22, y: 1.88, w: cw3 - 0.44, h: 0.6, fontSize: 26, bold: true, color: accent, fontFace: FONT });
    s.addText(note, { x: x + 0.22, y: 2.52, w: cw3 - 0.44, h: 1.0, fontSize: 11.5, color: LIGHT, fontFace: FONT, valign: 'top' });
  });

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 3.85, w: CW, h: 1.55, fill: { color: SLATE }, line: { color: AMBER, width: 1.25 }, rectRadius: 0.08 });
  s.addText('“When you deploy a GB200 or H100, you’re deploying something in the kilowatt range. The retail environment has a limited power budget and no real good cooling, so you can’t run a rack of GPUs.”', {
    x: MX + 0.3, y: 4.0, w: CW - 0.6, h: 1.25, fontSize: 15, italic: true, color: OFFWH, fontFace: FONT, valign: 'top',
  });

  bulletsBlock(s, [
    'Every token re-reads the model from memory, so decode is bandwidth-bound',
    'HBM4 is shipping, doubling peak bandwidth. OpenAI built its own chip',
  ], { x: MX, y: 5.6, w: CW, h: 1.0, fontSize: 13.5 });

  s.addNotes(
    "We just separated model, inference and harness. I want to spend one slide on what sits underneath inference, because this is the part that's actually your problem, and it changed a lot this year. Here's the mechanism, and it's worth understanding because it explains everything else. When a model generates text, it produces one token at a time, and for every single token it has to read the model's parameters back out of memory. Tens or hundreds of gigabytes, per token. That's not a compute problem, it's a memory bandwidth problem, and GPUs were designed for compute. The result is the first number on this slide: H100s running open models are reported idle somewhere between fifty and eighty percent of the time. Not because they're slow. Because they're waiting. So the whole industry is rebuilding around memory. HBM4 memory just went into production and roughly doubles peak bandwidth. OpenAI got impatient enough that they designed their own inference chip with Broadcom, called Jalapeno, from design to production in nine months, and it carries two hundred and sixteen gigabytes of HBM4. They claim one and a half to nearly two times the work per watt of NVIDIA's Blackwell, and I want to flag clearly that those numbers are their own, on a public benchmark nobody else has re-run yet. Same skepticism we applied to benchmarks earlier. The second number shows where the money is going: specialised chips are growing faster than GPUs now. And the third is the one I'd check yourself, because many of you already operate it. Amazon says more than half the tokens on Bedrock now run on their own Trainium silicon rather than GPUs. But the quote in the middle is the one I actually want you to take back to work, because it's the constraint none of the vendor announcements lead with. A GB200 or an H100 is a kilowatt-class device. Most real server rooms, branch offices and retail closets have a power budget and a cooling situation that simply cannot host a rack of those. That's not a budget problem you can buy your way out of, it's a physical one. Which is exactly why the smaller, power-efficient inference parts matter, and why this is going to land on your desk as a facilities question before it lands as a software one."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Using your own data');
  heading(s, 'Three ways to get your data into a model');
  s.addText('A model only knows its training data. It has never seen your runbooks, tickets, or policies.', {
    x: MX, y: 1.6, w: CW, h: 0.4, fontSize: 14, color: LIGHT, fontFace: FONT,
  });

  const approaches = [
    ['LONG CONTEXT', 'Paste it in', 'Simplest. Great for a handful of documents and conversation history. Cost climbs fast with volume.', BLUE],
    ['RAG', 'Search, then answer', 'Retrieve the relevant chunks first, send those. Precise, citable, far cheaper at scale.', GREEN],
    ['AGENTIC RETRIEVAL', 'Let it go look', 'The agent fetches what it needs live, often over MCP. Best when data changes constantly.', AMBER],
  ];
  const aw = (CW - 0.6) / 3;
  approaches.forEach(([label, tag, desc, color], i) => {
    const x = MX + i * (aw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.2, w: aw, h: 2.75, fill: { color: SLATE }, line: { color, width: 1 }, rectRadius: 0.08 });
    s.addText(label, { x: x + 0.25, y: 2.4, w: aw - 0.5, h: 0.35, fontSize: 12.5, bold: true, color, fontFace: FONT, charSpacing: 1.2 });
    s.addText(tag, { x: x + 0.25, y: 2.8, w: aw - 0.5, h: 0.4, fontSize: 16, bold: true, color: OFFWH, fontFace: FONT });
    s.addText(desc, { x: x + 0.25, y: 3.3, w: aw - 0.5, h: 1.5, fontSize: 12.5, color: LIGHT, fontFace: FONT, valign: 'top' });
  });

  bulletsBlock(s, [
    'None of these retrain the model; they all just change what it gets shown',
    'In practice teams combine them, and RAG is why an answer can cite its source',
  ], { x: MX, y: 5.25, w: CW, h: 1.2, fontSize: 14.5 });

  s.addNotes(
    "Here's a question you will absolutely get asked, so it's worth having a real answer to: how do we point AI at our own stuff? Because a model only knows what was in its training data. It has never seen your runbooks, your ticket history, your internal policies. In 2026 there are three viable answers, and the useful skill is knowing which one fits. First, long context. Modern models take enormous prompts, so for a handful of documents you can genuinely just paste them in. Simplest thing that works, and it's great for conversation history. The catch is cost and noise both climb as you stuff more in. Second, RAG, retrieval-augmented generation. Instead of sending everything, you search your own content first and send only the relevant chunks alongside the question. That's more precise, dramatically cheaper once you're past a large corpus, and because you handed the model specific source material, it can point back at where the answer came from. That's why enterprise AI tools can cite sources. Third, agentic retrieval, where you don't pre-fetch anything, the agent goes and looks things up live, often over MCP, which we'll cover next. That's the right call when the data changes constantly. One honest note: these are not competitors, and the 2026 reality is that most real systems blend them. The thing they all have in common is that none of them retrain the model. They just change what it gets shown at the moment you ask."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'A concrete harness');
  heading(s, 'MCP: how a harness talks to tools');
  bulletsBlock(s, [
    'Open standard, launched Nov 25, 2024, MIT-licensed',
    'One protocol instead of bespoke code per tool integration',
    'Servers expose data; clients (agents) connect to them',
    'Early adopters: Block, Apollo, Zed, Replit, Codeium, Sourcegraph',
  ], { x: MX, y: 1.95, w: CW, h: 2.5, fontSize: 16 });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 4.65, w: CW, h: 1.5, fill: { color: SLATE }, line: { color: BLUE, width: 1 }, rectRadius: 0.08 });
  s.addText('"Open technologies like MCP are the bridges that connect AI to real-world applications."', {
    x: MX + 0.3, y: 4.8, w: CW - 0.6, h: 0.8, fontSize: 15, italic: true, color: OFFWH, fontFace: FONT,
  });
  s.addText('Block CTO · at MCP’s launch', { x: MX + 0.3, y: 5.55, w: CW - 0.6, h: 0.4, fontSize: 12, color: MUTED, fontFace: FONT });
  s.addNotes(
    "Here's a concrete example of a harness feature you can go try this week, not an abstraction: the Model Context Protocol, or MCP. Before MCP, if you wanted an AI agent to use Slack, and also GitHub, and also an internal ticketing system, you wrote custom integration code for every single one of those tools. MCP standardizes that: a server exposes a tool or a data source in a standard way, and any MCP-compatible agent can connect to it without bespoke glue code. Anthropic launched it in November 2024, open source, MIT-licensed, and it was picked up fast: Block, Apollo, Zed, Replit, Codeium, and Sourcegraph were all early adopters. If your team is thinking about wiring AI into ticketing, monitoring, or deployment tooling, this is exactly the kind of standard worth building on instead of reinventing."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'A useful distinction');
  heading(s, 'Vibe coding vs. agentic engineering');
  const cols = [
    ['VIBE CODING', 'Loosely prompt the AI, accept the output with light review', MUTED],
    ['AGENTIC ENGINEERING', 'Structured agent loops: tests, review, real tool access', BLUE],
  ];
  const colW = (CW - 0.4) / 2;
  cols.forEach(([label, desc, color], i) => {
    const x = MX + i * (colW + 0.4);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.85, w: colW, h: 2.5, fill: { color: SLATE }, line: { color, width: 1.25 }, rectRadius: 0.08 });
    s.addText(label, { x: x + 0.28, y: 2.05, w: colW - 0.56, h: 0.6, fontSize: 16, bold: true, color, fontFace: FONT });
    s.addText(desc, { x: x + 0.28, y: 2.7, w: colW - 0.56, h: 1.5, fontSize: 13, color: LIGHT, fontFace: FONT, valign: 'top' });
  });
  bulletsBlock(s, [
    'This distinction is a real, useful conversation engineering teams are having right now',
    'It’s already showing up in real infrastructure pipelines, not just chat windows',
  ], { x: MX, y: 4.65, w: CW, h: 1.3, fontSize: 14 });
  s.addNotes(
    "DHH, the creator of Ruby on Rails, drew a distinction on Lex Fridman's podcast a couple weeks ago that I think is genuinely useful vocabulary for how you decide to work with these tools. Vibe coding is loosely prompting an AI and accepting what comes back with light review, great for a quick prototype. Agentic engineering is structured: agent loops with actual tests, actual review, actual tool access, treated with the same rigor as any other engineering practice, which is what you want for anything touching production. And this isn't just a chat-window phenomenon: TechWorld with Nana, the largest DevOps education channel out there, is increasingly covering exactly this kind of tooling landing in real CI/CD pipelines, which is where most of you will actually meet it."
  );
  pageNum(s);
}

// ============================================================================
// POPULAR MODELS AND WHAT THEY'RE GOOD AT
// ============================================================================
divider('How Models Are Built', 'Two ideas that make everything after this easier to reason about.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'The building block');
  heading(s, 'How much does this input matter?');

  // Worked example, deliberately from ops/on-call rather than something
  // abstract: the point is that a weight is just "how much this input counts."
  s.addText('Deciding whether to page someone, by hand:', {
    x: MX, y: 1.75, w: 6.2, h: 0.35, fontSize: 14, bold: true, color: LIGHT, fontFace: FONT,
  });
  const factors = [
    ['Is it production?', '× 0.7', 'matters a lot'],
    ['Are users affected?', '× 0.4', 'matters somewhat'],
    ['Is it after hours?', '× 0.1', 'matters a little'],
  ];
  factors.forEach(([label, w, note], i) => {
    const y = 2.25 + i * 0.62;
    s.addText(label, { x: MX + 0.1, y, w: 2.6, h: 0.4, fontSize: 14, color: OFFWH, fontFace: FONT });
    s.addText(w, { x: MX + 2.8, y, w: 0.9, h: 0.4, fontSize: 15, bold: true, color: GREEN, fontFace: FONT });
    s.addText(note, { x: MX + 3.8, y, w: 2.3, h: 0.4, fontSize: 13, italic: true, color: MUTED, fontFace: FONT });
  });
  s.addShape(pres.ShapeType.line, { x: MX + 0.1, y: 4.2, w: 5.9, h: 0, line: { color: MUTED, width: 1 } });
  s.addText('add it up  →  page, or don’t', {
    x: MX + 0.1, y: 4.35, w: 5.9, h: 0.4, fontSize: 14, bold: true, color: OFFWH, fontFace: FONT,
  });
  s.addText('Those multipliers are the weights.', {
    x: MX + 0.1, y: 4.8, w: 5.9, h: 0.4, fontSize: 14, italic: true, color: GREEN, fontFace: FONT,
  });

  bulletsBlock(s, [
    'Named for "weighted average": how much weight you give something',
    'A model does this with billions of them, across many layers',
    'It tunes them itself during training; nobody sets them by hand',
    '"Parameter" and "weight" mean the same thing',
  ], { x: MX + 6.5, y: 2.2, w: 5.6, h: 3.2, fontSize: 14.5 });

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 5.55, w: CW, h: 0.75, fill: { color: SLATE }, line: { color: BLUE, width: 0.75 }, rectRadius: 0.06 });
  s.addText('This is why it’s called "open-weight": you can download the actual tuned numbers', {
    x: MX + 0.25, y: 5.7, w: CW - 0.5, h: 0.5, fontSize: 13, bold: true, color: LIGHT, fontFace: FONT, valign: 'middle',
  });

  s.addNotes(
    "This is the one term I really want to land, because everything else builds on it. A weight answers exactly one question: how much does this input matter? Here's the intuition, and it's genuinely this simple. Say you're deciding whether to page someone for an alert. You'd weigh a few things. Is it production? That matters a lot, so call it point seven. Are users affected? Matters a fair amount, point four. Is it after hours? Matters a little, point one. You multiply each input by how much it matters, add them up, and you get a score that drives the decision. Those multipliers, those how-much-does-this-matter numbers, are the weights. The name comes straight from weighted average, it's literally how much weight you give something. A neural network does exactly that, just with billions of these numbers stacked across many layers, and the crucial part is it figures the numbers out itself during training instead of you picking them by hand. Parameter and weight are two words for the same thing, you'll hear both. And this is why the term open-weight means what it does: you can download the actual tuned numbers and run the model yourself."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'How giant models stay affordable');
  heading(s, 'Mixture of Experts (MoE)');
  s.addText('Dense model: every parameter fires on every query', { x: MX, y: 1.7, w: 5.8, h: 0.4, fontSize: 13, color: LIGHT, fontFace: FONT });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    s.addShape(pres.ShapeType.rect, { x: MX + c*0.8, y: 2.2 + r*0.5, w: 0.65, h: 0.38, fill: { color: BLUE }, line: { width: 0 } });
  }
  const rightX = MX + 6.6;
  s.addText('MoE model: a router lights up just a few experts', { x: rightX, y: 1.7, w: 5.8, h: 0.4, fontSize: 13, color: LIGHT, fontFace: FONT });
  const lit = new Set(['0-1','1-3','2-0','3-5']);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    const on = lit.has(`${r}-${c}`);
    s.addShape(pres.ShapeType.rect, { x: rightX + c*0.8, y: 2.2 + r*0.5, w: 0.65, h: 0.38, fill: { color: on ? GREEN : SLATE }, line: { color: MUTED, width: 0.5 } });
  }
  bulletsBlock(s, [
    'Mixtral, 2023: each token routed to 2 of 8 experts. About 25%',
    'GLM-5.3-Flash, Aug 2026: 8 of 288 experts. About 3%, and MIT-licensed',
    'DeepSeek-V4-Flash: 284B total parameters, only 13B active per token',
    'GPT-6 Astra: rumored around 10T parameters, MoE, unconfirmed by OpenAI',
  ], { x: MX, y: 4.6, w: CW, h: 2.1, fontSize: 14 });
  s.addNotes(
    "Mixture of Experts is how the biggest models stay affordable to run. Instead of firing every parameter on every query like a dense model, an MoE model has a router that picks just a handful of specialized expert sub-networks for each input. Total parameter count can be enormous, but the active compute per query stays small. DeepSeek's V4-Flash is a great, fully confirmed example: 284 billion total parameters, but only 13 billion active on any given token, and DeepSeek reports it beats their own larger, more expensive model on every agentic benchmark they publish. Mistral's Mixtral is another fully open, fully documented MoE model. And GPT-6 Astra is rumored, key word rumored, not confirmed by OpenAI, to use something like a ten-trillion-parameter MoE setup. Now here's the part that surprised me, and it's the trend rather than any single model. When Mixtral came out it routed each token to two of its eight experts, so about a quarter of the model fired on any given token. GLM-5.3-Flash, which shipped in August of this year, routes each token to eight experts out of two hundred and eighty-eight. That's under three percent. In about two years the share of the model doing work on any one token fell by roughly a factor of ten, and that model is MIT-licensed with a million-token context window, so you can go download it. The practical takeaway: bigger isn't automatically better or more expensive, how a model uses its parameters matters just as much as how many it has. Hold onto that, because it explains a lot about the landscape we're about to walk through."
  );
  pageNum(s);
}

// ============================================================================
// POPULAR MODELS AND WHAT THEY'RE GOOD AT
// ============================================================================
divider('Popular Models', 'The landscape moves fast, but the shape of it is genuinely learnable in five minutes.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Closed models');
  heading(s, 'API-only, no downloadable weights');
  const rows = [
    ['Anthropic · Claude', 'Coding, agentic tool use, long structured work'],
    ['OpenAI · GPT', 'Broad general-purpose and multimodal use'],
    ['Google DeepMind · Gemini', 'Very long context, deep Google Workspace integration'],
  ];
  rows.forEach(([label, desc], i) => {
    const y = 1.9 + i * 1.55;
    s.addShape(pres.ShapeType.rect, { x: MX, y, w: 0.08, h: 1.3, fill: { color: BLUE }, line: { width: 0 } });
    s.addText(label, { x: MX + 0.3, y, w: 5.5, h: 0.55, fontSize: 17, bold: true, color: OFFWH, fontFace: FONT });
    s.addText(desc, { x: MX + 0.3, y: y + 0.55, w: CW - 0.6, h: 0.7, fontSize: 14, color: LIGHT, fontFace: FONT });
  });
  s.addNotes(
    "Let's make this concrete instead of abstract. On the closed side, three names you'll hear constantly. Anthropic's Claude has built a strong reputation specifically for coding and agentic tool use, structured multistep work you can trust to follow instructions. OpenAI's GPT line is the broadest general-purpose and multimodal option, the one most consumers have actually used. Google DeepMind's Gemini leans into very long context windows and deep integration with Google's own Workspace tools. None of these are strictly better than the others across the board, they have different strengths, which is exactly the point we'll build on in a few minutes."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Open-weight models');
  heading(s, 'Downloadable, often self-hostable');
  const rows = [
    ['Meta · Llama', 'The most widely adopted open baseline for self-hosting'],
    ['Mistral', 'Efficient open models, strong at coding, easy to run lean'],
    ['Alibaba · Qwen', 'Strong multilingual and coding performance at low cost'],
    ['DeepSeek', 'Frontier-level open reasoning at a fraction of the usual cost'],
  ];
  rows.forEach(([label, desc], i) => {
    const y = 1.8 + i * 1.1;
    s.addShape(pres.ShapeType.rect, { x: MX, y, w: 0.08, h: 0.92, fill: { color: GREEN }, line: { width: 0 } });
    s.addText(label, { x: MX + 0.3, y, w: 5.5, h: 0.45, fontSize: 16, bold: true, color: OFFWH, fontFace: FONT });
    s.addText(desc, { x: MX + 0.3, y: y + 0.45, w: CW - 0.6, h: 0.45, fontSize: 13, color: LIGHT, fontFace: FONT });
  });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 6.3, w: CW, h: 0.5, fill: { color: '1E3A2E' }, line: { width: 0 }, rectRadius: 0.06 });
  s.addText('Open-weight is not open-source: weights are downloadable, training data and code are usually still closed', {
    x: MX + 0.25, y: 6.35, w: CW - 0.5, h: 0.4, fontSize: 12.5, bold: true, color: GREEN, fontFace: FONT, valign: 'middle',
  });
  s.addNotes(
    "On the open-weight side, and this is genuinely good news for anyone in this room managing your own compute: Meta's Llama family is the most widely adopted open baseline for self-hosting. Mistral makes efficient open models that punch above their size, especially at coding, and are easy to run lean. Alibaba's Qwen family is strong on multilingual and coding performance at low cost. And DeepSeek has been shipping frontier-level open reasoning at a fraction of the usual cost, which is exactly the Mixture of Experts trick we just walked through, 284 billion parameters total, only 13 billion firing per token. One callout worth remembering: open-weight is not open-source. You can download and run the weights, but the training data and often the training code stay closed. That distinction trips people up constantly."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Model families have a shape');
  heading(s, 'One family, four tiers');

  // Luna's orbit around Terra: the one ring that clarifies something the
  // horizontal arrangement can't say on its own (Luna orbits Terra, not Sol).
  s.addShape(pres.ShapeType.ellipse, {
    x: 4.60, y: 2.30, w: 2.00, h: 2.00,
    fill: { type: 'none' }, line: { color: SLATE, width: 1.25, dashType: 'dash' },
  });
  // Generation divider.
  s.addShape(pres.ShapeType.line, {
    x: 7.68, y: 1.95, w: 0, h: 3.35,
    line: { color: MUTED, width: 1.5, dashType: 'sysDot' },
  });
  s.addText('GPT-5.6', { x: 5.98, y: 5.50, w: 1.6, h: 0.3, fontSize: 11, bold: true, color: MUTED, fontFace: FONT, align: 'right', charSpacing: 1.5 });
  s.addText('GPT-6',   { x: 7.78, y: 5.50, w: 1.6, h: 0.3, fontSize: 11, bold: true, color: MUTED, fontFace: FONT, align: 'left',  charSpacing: 1.5 });

  // Bodies. Diameter tracks the intelligence index.
  s.addShape(pres.ShapeType.ellipse, { x: 1.50, y: 2.50, w: 1.60, h: 1.60, fill: { color: AMBER }, line: { width: 0 } });
  s.addShape(pres.ShapeType.ellipse, { x: 5.18, y: 2.88, w: 0.85, h: 0.85, fill: { color: GREEN }, line: { width: 0 } });
  s.addShape(pres.ShapeType.ellipse, { x: 5.44, y: 2.14, w: 0.34, h: 0.34, fill: { color: LIGHT }, line: { width: 0 } });
  s.addShape(pres.ShapeType.star8,   { x: 8.85, y: 2.25, w: 2.10, h: 2.10, fill: { color: BLUE },  line: { width: 0 } });

  const body = (x, name, color, role, data, y) => {
    s.addText(name, { x: x - 1.6, y, w: 3.2, h: 0.32, fontSize: 15, bold: true, color, fontFace: FONT, align: 'center', charSpacing: 1.5 });
    s.addText(role, { x: x - 1.6, y: y + 0.32, w: 3.2, h: 0.3, fontSize: 12, color: OFFWH, fontFace: FONT, align: 'center' });
    s.addText(data, { x: x - 1.6, y: y + 0.62, w: 3.2, h: 0.3, fontSize: 10.5, color: MUTED, fontFace: FONT, align: 'center' });
  };
  body(2.30, 'SOL',   AMBER, 'The mass at the centre', 'index 47  ·  $5 / $30',  4.60);
  body(5.60, 'TERRA', GREEN, 'The balanced default',   'index 42  ·  $2 / $12',  4.60);
  body(9.90, 'ASTRA', BLUE,  'Outside the system',     'index 53  ·  $10 / $50', 4.60);
  // Luna rides Terra's orbit, so its label sits above the ring.
  s.addText('LUNA', { x: 4.00, y: 1.52, w: 3.2, h: 0.3, fontSize: 13, bold: true, color: LIGHT, fontFace: FONT, align: 'center', charSpacing: 1.5 });
  s.addText('Small, quick, cheap  ·  index 38  ·  $0.20 / $1.20', { x: 3.60, y: 1.82, w: 4.0, h: 0.3, fontSize: 10.5, color: MUTED, fontFace: FONT, align: 'center' });

  s.addText('Price shown as input / output per million tokens. Disc size tracks the intelligence index.', {
    x: MX, y: 6.60, w: CW, h: 0.32, fontSize: 10.5, italic: true, color: MUTED, fontFace: FONT,
  });

  s.addNotes(
    "Here's a thing worth knowing that will save you time whenever a new family drops: model families have a shape, and once you see the shape you can navigate any of them. This is OpenAI's current one, and I like it because they named it beautifully. Sol, Terra, Luna. The sun, the earth, the moon. And it isn't just branding, OpenAI has said explicitly that the number tells you the generation while the name tells you the capability tier, and those tiers are meant to outlive the version numbers. So a future Sol will still be the heavy one. Sol is the mass at the centre, your deepest reasoning. Terra is the balanced default, where you actually do most of your work. Luna is the small fast cheap one that rides along with Terra for the simple stuff. And then Astra, off to the right, is a star rather than a planet, because it's a different generation entirely, GPT-6 rather than 5.6. Now here's the part I want you to actually take away, and it's the numbers along the bottom. Look at the intelligence scores: thirty-eight, forty-two, forty-seven, fifty-three. That's a spread of about one point four times from cheapest to best. Now look at the prices: twenty cents to ten dollars per million input tokens. That's fifty times. Capability climbs gently and price climbs like a cliff. Which means the single biggest lever on your AI bill is not which vendor you pick, it's whether you reached for the top tier on work that didn't need it. One more useful detail: all three of the 5.6 tiers have exactly the same one-million-token context window. That's deliberate. The choice between them is purely intelligence against cost, never how much you can feed it."
  );
  pageNum(s);
}

// ============================================================================
// PICKING THE RIGHT MODEL (BENCHMARKS)
// ============================================================================
divider('Picking the Right Model', 'A real way to reason about which model fits which job.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'A skill worth having');
  heading(s, 'How to read a benchmark score');
  bulletsBlock(s, [
    'What is it measuring? A specific task, not general intelligence',
    'Who ran it? Vendor self-reported vs. independently reproduced',
    'What scaffold was it run with? Tool access changes the number',
    'How fresh is it? A 6-month-old score can already be stale',
  ], { x: MX, y: 1.85, w: CW, h: 3.0, fontSize: 16.5 });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 5.05, w: CW, h: 1.35, fill: { color: SLATE }, line: { color: AMBER, width: 1 }, rectRadius: 0.08 });
  s.addText([
    { text: 'Same model, same benchmark, same week: ', options: { color: LIGHT } },
    { text: 'GPT-6 Astra scored 62.7% on ARC-AGI-3 with the standard harness, and 99.9% with a harness that lets it reuse its own prior work.', options: { color: OFFWH, bold: true } },
    { text: ' Independently verified by ARC Prize, not self-reported.', options: { color: LIGHT } },
  ], {
    x: MX + 0.25, y: 5.2, w: CW - 0.5, h: 1.05, fontSize: 13, fontFace: FONT, valign: 'top',
  });
  s.addNotes(
    "Before we get to which benchmark to use, a quick skill for reading any of them well. Four questions, always. What is it actually measuring? Usually one specific task, not general intelligence. Who ran it? A vendor's own reported number and an independently reproduced one deserve different levels of trust. What scaffold was it run with? Tool access and setup can matter as much as the base model. And how fresh is it? This field moves fast enough that a six-month-old score can already be out of date. Real example to make all four of those concrete at once, and it's a good one. When GPT-6 Astra came out, OpenAI's own page said it scored ninety-nine point nine percent on ARC-AGI-3. Press coverage said ninety-eight point six. If you'd been reading quickly you'd assume somebody got the number wrong. Neither did. The ARC Prize Foundation, who own that benchmark, ran the model themselves and published both numbers: with their standard harness, Astra scored sixty-two point seven percent, and it cost twenty-six thousand dollars. With what they call a provider adapter harness, one that preserves the model's reasoning state between requests so it can reuse its own prior work, the same model scored ninety-nine point nine, and it actually cost less, about nineteen thousand. Sixty-two to ninety-nine, same model, same benchmark, same week. The only thing that changed was the scaffolding around it. That's not a reason to distrust benchmarks. It's the single best argument I have for why you ask what scaffold a number came from, and why an independently verified score and a vendor's own number are different objects."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Matching the tool to the job');
  heading(s, 'Picking the right benchmark');
  const rows = [
    ['Picking a coding model?', 'Look at SWE-bench', 'Verified scores went from ~60% to ~100% in one year'],
    ['Picking a chat or writing assistant?', 'Look at LMArena', 'Blind human head-to-head voting, not a fixed test'],
    ['Picking an autonomous agent?', 'Look at METR’s time horizon', 'How long a task the model can finish unsupervised'],
    ['Need it to handle the unfamiliar?', 'Look at ARC-AGI', 'Novel problems with no instructions. Humans still win here'],
  ];
  // Four rows: tighter pitch than the earlier three-row version so the last
  // card clears the bottom margin (1.65 + 3*1.42 + 1.18 = 7.09 < 7.5).
  rows.forEach(([label, tool, stat], i) => {
    const y = 1.65 + i * 1.42;
    s.addShape(pres.ShapeType.rect, { x: MX, y, w: 0.08, h: 1.18, fill: { color: BLUE }, line: { width: 0 } });
    s.addText(label, { x: MX + 0.3, y, w: 4.4, h: 0.48, fontSize: 14.5, bold: true, color: OFFWH, fontFace: FONT });
    s.addText(tool, { x: MX + 0.3, y: y + 0.46, w: 4.4, h: 0.48, fontSize: 13.5, bold: true, color: GREEN, fontFace: FONT });
    s.addText(stat, { x: MX + 5.1, y: y + 0.08, w: 6.9, h: 0.95, fontSize: 12, italic: true, color: LIGHT, fontFace: FONT, valign: 'top' });
  });
  s.addNotes(
    "Now that you know how to read one, here's the practical payoff. Instead of asking which model is best in the abstract, ask which benchmark matches the job. Picking a coding model? Look at SWE-bench, scores went from around sixty percent to near one hundred percent in a single year, which also tells you the benchmark is close to saturated for the top tier. Picking a chat or writing assistant? Look at LMArena, formerly LMSYS Chatbot Arena, which measures blind human head-to-head preference rather than a fixed test. Picking something to run autonomously, an agent that goes and does a multistep task on its own? Look at METR's time horizon metric, which has been doubling roughly every seven months. And if what you actually need is for it to handle something genuinely unfamiliar, something not in anybody's training data, look at ARC-AGI, which is the one we just talked about in the AGI section. That's still the category where humans clearly outperform, so it's the honest one to check when somebody tells you a model will just figure it out."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'What that looks like in practice');
  heading(s, 'Same prompt, two models, same day');

  const cols = [
    ['GPT-6 Astra', AMBER, 'Finished in ~26 min', [
      'Beautiful, detailed 3D graphics',
      'Polished UI, very few mistakes',
      '“I wouldn’t describe this game as fun”',
      'UI looks like every other AI-built game',
    ]],
    ['Fable 5.1', GREEN, 'Took considerably longer', [
      '“Graphics were embarrassing by comparison”',
      'UI looked like 2013-era Bootstrap',
      '“The gameplay was far superior”',
      'Real physics, far more to tune',
    ]],
  ];
  const cw2 = (CW - 0.4) / 2;
  cols.forEach(([name, accent, timing, points], i) => {
    const x = MX + i * (cw2 + 0.4);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.75, w: cw2, h: 3.55, fill: { color: SLATE }, line: { color: accent, width: 1.25 }, rectRadius: 0.08 });
    s.addText(name, { x: x + 0.25, y: 1.9, w: cw2 - 0.5, h: 0.42, fontSize: 18, bold: true, color: accent, fontFace: FONT });
    s.addText(timing, { x: x + 0.25, y: 2.3, w: cw2 - 0.5, h: 0.3, fontSize: 11, italic: true, color: MUTED, fontFace: FONT });
    s.addText(points.map(t => ({ text: `›  ${t}`, options: { breakLine: true, paraSpaceAfter: 9 } })), {
      x: x + 0.25, y: 2.68, w: cw2 - 0.5, h: 2.5, fontSize: 12.5, color: LIGHT, fontFace: FONT, lineSpacingMultiple: 1.25, valign: 'top',
    });
  });

  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 5.5, w: CW, h: 0.85, fill: { color: SLATE }, line: { color: BLUE, width: 1 }, rectRadius: 0.08 });
  s.addText([
    { text: 'The model topping the benchmark was not the better tool for the job.', options: { color: OFFWH, bold: true } },
    { text: '  Pick for the work, not for the leaderboard.', options: { color: LIGHT } },
  ], { x: MX + 0.25, y: 5.62, w: CW - 0.5, h: 0.6, fontSize: 14, fontFace: FONT, valign: 'middle' });

  s.addText('One developer’s hands-on test, Sept 2026. A single prompt, judged subjectively. Directional, not a benchmark.', {
    x: MX, y: 6.5, w: CW, h: 0.35, fontSize: 11, italic: true, color: MUTED, fontFace: FONT,
  });

  s.addNotes(
    "I want to close this section with something concrete, because everything I just said about matching the benchmark to the job can still feel abstract. Yesterday, the developer behind the YouTube channel Fireship ran a test I like a lot for its simplicity. He asked his kids what game they wanted, they said a rocket launch simulator, and he sent that exact same prompt to GPT-6 Astra and to Claude Fable 5.1 at the same moment. Astra came back first, in about twenty-six minutes, and the result looked genuinely great. Detailed 3D graphics, a polished interface, almost no bugs. And then he played it, and his verdict was, quote, I wouldn't exactly describe this game as fun to play. He also noticed something sharper: the interface looked almost identical to a lot of other AI-generated games he'd seen, that there's an obvious formula that makes them easy to spot. Fable took a lot longer, and when it finished, the graphics were, in his words, embarrassing by comparison. The UI looked like it was built with Bootstrap, which is a library older than some of the people in this room. But when he actually played it, the gameplay was far better. More ways to customize the rocket, actual scientific calculations behind the flight, more ways to succeed or fail. One model optimized for how it looked, the other for how it worked. Now, I want to be straight with you about what this is: it's one developer, one prompt, judged by him and his two kids. It is not a benchmark and I'm not presenting it as one. But it demonstrates the thing I most want you to leave with, which is that the model at the top of the leaderboard is not automatically the right model for your job. You have to try them on your actual work. Which, conveniently, is exactly the situation many of you are in when you open the model dropdown at work and see twenty options staring back at you."
  );
  pageNum(s);
}

// ============================================================================
// RESPONSIBLE AI, DONE RIGHT
// ============================================================================
divider('Responsible AI', 'The good news first, then how the industry and regulators are handling the rest of it.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Cost, people, planet');
  heading(s, 'It’s getting dramatically cheaper');
  const quads = [
    ['COST', '~280x cheaper', 'Inference cost for GPT-3.5-level output: $20 to $0.07 per million tokens in 2 years'],
    ['EFFICIENCY', 'Doing more with less', 'DeepSeek-V4-Flash beats its own larger model at a fraction of the compute'],
    ['ENVIRONMENT', 'Growing, in context', 'AI data center demand is growing fast, and still only ~1% of global electricity today'],
    ['SOCIAL', 'Tracked, not ignored', "Stanford's AI Index runs a dedicated chapter tracking incidents and public opinion"],
  ];
  const qw = (CW - 0.3) / 2;
  const pos = [[MX,1.85],[MX+qw+0.3,1.85],[MX,3.75],[MX+qw+0.3,3.75]];
  quads.forEach(([label, stat, desc], i) => {
    const [x, y] = pos[i];
    s.addShape(pres.ShapeType.roundRect, { x, y, w: qw, h: 1.7, fill: { color: SLATE }, line: { color: BLUE, width: 0.75 }, rectRadius: 0.08 });
    s.addText(label, { x: x + 0.22, y: y + 0.12, w: qw - 0.44, h: 0.35, fontSize: 12, bold: true, color: BLUE, fontFace: FONT, charSpacing: 1.5 });
    s.addText(stat, { x: x + 0.22, y: y + 0.48, w: qw - 0.44, h: 0.5, fontSize: 19, bold: true, color: OFFWH, fontFace: FONT });
    s.addText(desc, { x: x + 0.22, y: y + 1.0, w: qw - 0.44, h: 0.65, fontSize: 11, color: LIGHT, fontFace: FONT, valign: 'top' });
  });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 5.7, w: CW, h: 0.75, fill: { color: '1E3A2E' }, line: { width: 0 }, rectRadius: 0.06 });
  s.addText('A common enterprise pattern: Claude or similar piloted with a specialist group, Copilot bundled broadly through Microsoft licensing', {
    x: MX + 0.25, y: 5.85, w: CW - 0.5, h: 0.5, fontSize: 12.5, bold: true, color: GREEN, fontFace: FONT, valign: 'middle',
  });
  s.addNotes(
    "Let's lead with the actual headline, because it usually gets buried: this is getting dramatically cheaper, fast. Inference cost for GPT-3.5-level output dropped about two hundred eighty times in two years, twenty dollars down to seven cents per million tokens. That's a genuinely stunning efficiency curve, and it directly affects budgets for anyone running these workloads on your own compute. Efficiency is compounding too, we just saw DeepSeek's smaller, cheaper model beat its own larger one. On the environmental side, honestly: AI-driven data center demand is growing fast, and it's also still only about one percent of global electricity today, both of those are true at once and worth holding together. And on the social side, this isn't an unmonitored blind spot, Stanford's AI Index runs a whole chapter tracking real-world incidents and public opinion. This cost-and-capability tiering shows up constantly, and there's a pattern you'll recognize: a frontier model like Claude gets piloted with a smaller specialist group, while Copilot rides along with Microsoft licensing and reaches nearly everyone. Two tools, two tiers of need and budget. [Good spot to add a concrete example the room will recognize.]"
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Two kinds of governance');
  heading(s, 'Governance: labs and regulators, in parallel');
  const cols = [
    ['ANTHROPIC · RSP', 'v3.4, effective Jul 2026. Gates releases by AI Safety Level thresholds every ~6 months.'],
    ['OPENAI · Preparedness Framework', 'Gated Astra’s advanced cybersecurity capability before wider release.'],
    ['EU · AI Act (Reg. 2024/1689)', 'Risk-tiered law. Transparency and GPAI duties already live since Aug 2026.'],
  ];
  const cw = (CW - 0.6) / 3;
  cols.forEach(([label, desc], i) => {
    const x = MX + i * (cw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.85, w: cw, h: 3.9, fill: { color: SLATE }, line: { width: 0 }, rectRadius: 0.08 });
    s.addText(label, { x: x + 0.22, y: 2.05, w: cw - 0.44, h: 0.9, fontSize: 13.5, bold: true, color: BLUE, fontFace: FONT });
    s.addText(desc, { x: x + 0.22, y: 2.95, w: cw - 0.44, h: 2.6, fontSize: 12, color: LIGHT, fontFace: FONT, valign: 'top' });
  });
  s.addNotes(
    "The reassuring version of the governance story: this isn't a wild west, labs and regulators are actively building guardrails in parallel, and it's worth knowing both exist. Anthropic's Responsible Scaling Policy, currently version three-point-four, gates model releases by capability thresholds it calls AI Safety Levels, reassessed roughly every six months. OpenAI has its own version, the Preparedness Framework, which is exactly what triggered extra safeguards when Astra crossed into advanced cybersecurity territory before wider release. And the EU AI Act is a risk-tiered law, with transparency and general-purpose-AI duties already in force since August of this year. One industry self-governing, one government setting a floor for everyone. That's a maturing system, not an absent one."
  );
  pageNum(s);
}

// ============================================================================
// A BUSINESS LENS
// ============================================================================
divider('A Business Lens', 'For thinking about this as a decision-maker, whether that’s your team or your leadership.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'From The AI-Driven Leader');
  heading(s, 'AI as a thinking partner, not a faster assistant');
  const crit = [['C', 'Context'], ['R', 'Role'], ['I', 'Interview'], ['T', 'Task']];
  const boxW = (CW - 3*0.3) / 4;
  crit.forEach(([letter, word], i) => {
    const x = MX + i * (boxW + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.9, w: boxW, h: 1.7, fill: { color: BLUE }, line: { width: 0 }, rectRadius: 0.1 });
    s.addText(letter, { x, y: 2.0, w: boxW, h: 0.9, fontSize: 36, bold: true, color: OFFWH, fontFace: FONT, align: 'center' });
    s.addText(word, { x, y: 2.9, w: boxW, h: 0.5, fontSize: 14, color: OFFWH, fontFace: FONT, align: 'center' });
  });
  bulletsBlock(s, [
    'AI creates business value three ways: more productive people, more efficient operations, more valuable products',
    'Geoff Woods’s core argument: treat AI as a thinking partner, not just a faster assistant',
  ], { x: MX, y: 4.05, w: CW, h: 2.0, fontSize: 15 });
  s.addNotes(
    "Here's a framework from Geoff Woods's book, The AI-Driven Leader, that's genuinely useful. He calls it CRIT: Context, Role, Interview, Task, a structure for how you prompt an AI when you want real strategic thinking out of it, not just a faster typist. His broader argument is that AI creates business value exactly three ways: making people more productive, making operations more efficient, and making products or services more valuable. This is Woods's framework and his opinion, worth attributing as such, but it's a genuinely useful mental model to walk out of here with."
  );
  pageNum(s);
}

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Also from The AI-Driven Leader');
  heading(s, 'The Four Pillars: where AI fits');
  const quads = [
    ['STRATEGY', 'Sets the vision; short-term work builds toward long-term value'],
    ['EXECUTION', 'Focus on the 20% of work that drives 80% of results'],
    ['HUMAN TALENT', 'Point people at that high-impact 20%: judgment, relationships, hard problems'],
    ['TECHNOLOGY', 'AI absorbs the other 80%: routine analysis, drafts, admin work'],
  ];
  const qw = (CW - 0.3) / 2;
  const pos = [[MX,1.8],[MX+qw+0.3,1.8],[MX,3.55],[MX+qw+0.3,3.55]];
  quads.forEach(([label, desc], i) => {
    const [x, y] = pos[i];
    s.addShape(pres.ShapeType.roundRect, { x, y, w: qw, h: 1.55, fill: { color: SLATE }, line: { color: BLUE, width: 0.75 }, rectRadius: 0.08 });
    s.addText(label, { x: x + 0.22, y: y + 0.12, w: qw - 0.44, h: 0.35, fontSize: 13, bold: true, color: BLUE, fontFace: FONT, charSpacing: 1.5 });
    s.addText(desc, { x: x + 0.22, y: y + 0.52, w: qw - 0.44, h: 0.9, fontSize: 12.5, color: LIGHT, fontFace: FONT, valign: 'top' });
  });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 5.5, w: CW, h: 1.0, fill: { color: '1E3A2E' }, line: { width: 0 }, rectRadius: 0.06 });
  s.addText('Not a new idea: Blanchard built One Minute Manager goal-setting on the same 80/20 principle, decades before AI', {
    x: MX + 0.25, y: 5.68, w: CW - 0.5, h: 0.6, fontSize: 13, bold: true, color: GREEN, fontFace: FONT, valign: 'middle',
  });
  s.addNotes(
    "One more piece of Woods's framework, and I think it's the one that'll actually stick with this specific room: the Four Pillars, strategy, execution, human talent, technology. Strategy sets the vision. Execution means focusing on the twenty percent of work that drives eighty percent of your results. Human talent means pointing your best people at exactly that high-impact twenty percent, judgment calls, relationships, hard problems. And technology, meaning AI here, becomes the force multiplier that absorbs the other eighty percent, the routine analysis, the first-draft work, the administrative overhead. For a group managing infrastructure and help desk work across half a dozen platforms, that framing should feel very familiar: it's the same instinct behind automating the routine so your best people spend their time on the incidents and decisions that actually need a human. And if this rings a bell from somewhere completely different, that's not a coincidence, Blanchard built the whole goal-setting method in The One Minute Manager on this exact eighty-twenty principle, decades before anyone was talking about AI. Good operating principles don't expire."
  );
  pageNum(s);
}

// ============================================================================
// CLOSE
// ============================================================================
divider('Staying Conversational', 'How do you keep up with this after today?');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Do this by Friday');
  heading(s, 'Three habits to start this week');
  bulletsBlock(s, [
    'Read release notes and system cards directly from the labs, not just press coverage',
    'Pick one benchmark per use case and actually learn what it measures',
    'Go touch a harness yourself: an MCP-enabled tool, one agentic coding session',
  ], { x: MX, y: 2.1, w: CW, h: 3.5, fontSize: 19 });
  s.addNotes(
    "So, concretely, what do you actually do with all of this by Friday? Three things, not a reading list. One: when a model launches, go read the lab's own release notes or system card directly, at least the summary, not just the press headline about it. Two: pick one benchmark per use case, coding, chat, or autonomous agents, and actually learn what it measures, instead of chasing every leaderboard. Three, and most important: go touch a harness yourself. Try an MCP-enabled tool. Sit through one agentic coding session end to end. Reading about this stuff gets you vocabulary, using it for twenty minutes gets you actual judgment, and that's the difference between repeating a headline and holding a real conversation."
  );
  pageNum(s);
}

// ============================================================================
// BONUS: GARTNER HYPE CYCLE OVERVIEW
// ============================================================================
divider('Bonus: Gartner Hype Cycle Overview', 'A quick look at a well-known piece of analyst research that comes up constantly in AI conversations.');

{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'What the research is');
  heading(s, 'Where AI sits on the Gartner curve: 2026');
  s.addText('Gartner tracks how expectations for a new technology rise, peak, crash, and mature, usually over 5 to 10 years.', {
    x: MX, y: 1.5, w: CW, h: 0.4, fontSize: 13, color: LIGHT, fontFace: FONT,
  });
  const glossary = [
    ['Peak of Inflated Expectations', 'Hype outpaces real-world results'],
    ['Trough of Disillusionment', 'Reality sets in; projects get harder to justify'],
  ];
  const gw = (CW - 0.3) / 2;
  glossary.forEach(([term, def], i) => {
    const x = MX + i * (gw + 0.3);
    s.addText(term, { x, y: 1.95, w: gw, h: 0.3, fontSize: 12, bold: true, color: BLUE, fontFace: FONT });
    s.addText(def, { x, y: 2.24, w: gw, h: 0.3, fontSize: 11, color: MUTED, fontFace: FONT });
  });
  const ox = 1.0, oy = 5.9, w = CW - 1.6, h = 2.6;
  // Axis labels, since the curve is meaningless without them.
  s.addText('Expectations', {
    x: 0.05, y: oy - h/2 - 0.15, w: 1.5, h: 0.3, fontSize: 10.5, color: MUTED, fontFace: FONT,
    rotate: 270, align: 'center',
  });
  s.addText('Time', {
    x: ox + w - 0.6, y: oy + 0.55, w: 1.2, h: 0.3, fontSize: 10.5, color: MUTED, fontFace: FONT, align: 'right',
  });
  s.addShape(pres.ShapeType.line, { x: ox, y: oy, w, h: 0, line: { color: MUTED, width: 1 } });
  s.addShape(pres.ShapeType.line, { x: ox, y: oy - h - 0.15, w: 0, h: h + 0.45, line: { color: MUTED, width: 1 } });
  const pts = [
    [ox, oy], [ox + w*0.18, oy - h*0.55], [ox + w*0.30, oy - h*0.62],
    [ox + w*0.48, oy - h*0.15], [ox + w*0.62, oy - h*0.05],
    [ox + w*0.8, oy - h*0.32], [ox + w, oy - h*0.5],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    s.addShape(pres.ShapeType.line, {
      x: pts[i][0], y: pts[i][1], w: pts[i+1][0]-pts[i][0], h: pts[i+1][1]-pts[i][1],
      line: { color: BLUE, width: 2.5 },
    });
  }
  // The five canonical phase names, along the x-axis under the curve.
  // This is the part that was missing before: without these, it's just an
  // unlabeled squiggle with two floating dots.
  const phases = [
    [0.0, 'Innovation\nTrigger'], [0.30, 'Peak of Inflated\nExpectations'],
    [0.55, 'Trough of\nDisillusionment'], [0.80, 'Slope of\nEnlightenment'],
    [1.0, 'Plateau of\nProductivity'],
  ];
  phases.forEach(([frac, label]) => {
    const x = ox + w * frac;
    s.addText(label, {
      x: x - 0.75, y: oy + 0.12, w: 1.5, h: 0.5, fontSize: 8.5, color: MUTED, fontFace: FONT, align: 'center', valign: 'top',
    });
  });
  // Dots sit exactly on the drawn curve (matching pts[2] and pts[4] above),
  // not just approximately near it.
  const peakX = ox + w*0.30, peakY = oy - h*0.62;
  const troughX = ox + w*0.62, troughY = oy - h*0.05;
  s.addShape(pres.ShapeType.ellipse, { x: peakX - 0.075, y: peakY - 0.075, w: 0.15, h: 0.15, fill: { color: AMBER }, line: { width: 0 } });
  s.addText('Agentic AI', { x: peakX - 0.75, y: peakY - 0.42, w: 1.5, h: 0.3, fontSize: 11.5, bold: true, color: AMBER, fontFace: FONT, align: 'center' });
  s.addShape(pres.ShapeType.ellipse, { x: troughX - 0.075, y: troughY - 0.075, w: 0.15, h: 0.15, fill: { color: GREEN }, line: { width: 0 } });
  s.addText('Generative AI', { x: troughX - 0.75, y: troughY - 0.42, w: 1.5, h: 0.3, fontSize: 11.5, bold: true, color: GREEN, fontFace: FONT, align: 'center' });
  s.addNotes(
    "Quick look at a piece of research you'll hear referenced constantly: Gartner's Hype Cycle. It tracks how expectations for a new technology rise, peak, crash into a trough, and then mature, usually over five to ten years. Two terms worth knowing: Peak of Inflated Expectations, where hype outpaces what the technology can actually deliver, and Trough of Disillusionment, where reality sets in and projects get harder to justify. Gartner's 2026 read: generative AI, the ChatGPT-style stuff, is now in the trough, organizations are working through the gap between pilots and production. Agentic AI is still up at the peak, only seventeen percent of organizations have deployed agents so far, and Gartner expects a good chunk of current pilots to get cancelled by 2027. Worth knowing the framework exists and where things currently sit on it."
  );
  pageNum(s);
}

// ============================================================================
// REFERENCES / METHODOLOGY
// ============================================================================
{
  const s = pres.addSlide(); darkBg(s);
  kicker(s, 'Appendix');
  heading(s, 'Sources and Research Methodology');

  const left = [
    ['DHH, Lex Fridman #501 (2026)', 'lexfridman.com/dhh-2'],
    ['Two Minute Papers, Qwen3.8-27B (2026)', 'youtube.com/watch?v=wMl6c_r0ubw'],
    ['Woods, The AI-Driven Leader', 'amazon.com/dp/B0DB8QL3ZK'],
    ['TechWorld with Nana', 'youtube.com/@TechWorldwithNana'],
    ['Anthropic, Introducing MCP (2024)', 'anthropic.com/news/model-context-protocol'],
    ['Krizhevsky et al., AlexNet (2012)', 'papers.nips.cc/paper/4824'],
    ['Vaswani et al., Attention Is All You Need (2017)', 'arxiv.org/abs/1706.03762'],
    ['OpenAI, Introducing ChatGPT (2022)', 'openai.com/index/chatgpt'],
    ['Gartner, 2026 Hype Cycle for Agentic AI', 'gartner.com/en/articles/hype-cycle-for-agentic-ai'],
    ['OpenAI Charter', 'openai.com/charter'],
    ['Lewis et al., RAG (2020)', 'arxiv.org/abs/2005.11401'],
    ['RAG vs. long context vs. agentic retrieval (2026)', 'see written report'],
    ['Nov 2025 frontier triple launch', 'see written report'],
    ['Fireship, Astra vs. Fable 5.1 (2026)', 'youtube.com/watch?v=2Xiljy4xzbc'],
    ['OpenAI/Broadcom, Jalapeño chip (2026)', 'openai.com/index/openai-broadcom-jalapeno-inference-chip'],
    ['IEEE Spectrum, Inference hardware rethink (2026)', 'spectrum.ieee.org/inference-hardware-revolution'],
  ];
  const right = [
    ['DeepMind, Levels of AGI (2023)', 'arxiv.org/abs/2311.02462'],
    ['OpenAI, GPT-6 Astra (2026)', 'openai.com/index/gpt-6-astra'],
    ['LMArena (formerly LMSYS Chatbot Arena)', 'lmarena.ai'],
    ['METR, Measuring Long-Task Ability (2025)', 'metr.org/blog/2025-03-19-...'],
    ['Stanford HAI, 2026 AI Index Report', 'hai.stanford.edu/ai-index/2026-ai-index-report'],
    ['Anthropic, Responsible Scaling Policy v3.4', 'anthropic.com/responsible-scaling-policy'],
    ['IEA, Energy and AI (2026)', 'iea.org/reports/energy-and-ai'],
    ['EU, AI Act, Reg. 2024/1689', 'eur-lex.europa.eu/eli/reg/2024/1689'],
    ['Mistral, Mixtral of Experts (2024)', 'arxiv.org/pdf/2401.04088'],
    ['DeepSeek, V4-Flash-0731 (2026)', 'huggingface.co/blog/.../deepseek-v4-flash'],
    ['Chollet / ARC Prize, ARC-AGI', 'arcprize.org/arc-agi'],
    ['ARC Prize, GPT-6 Astra on ARC-AGI-3 (2026)', 'arcprize.org/blog/astra'],
    ['Apr 2026 release density', 'see written report'],
    ['Data Center Knowledge, Inference chip battleground', 'datacenterknowledge.com'],
    ['Z.ai, GLM-5.3-Flash 320B-A18B (2026)', 'recipes.vllm.ai/zai-org/GLM-5.3-Flash'],
    ['Requesty, Open-weight frontier Aug 2026', 'requesty.ai/blog/open-weight-frontier-august-2026'],
  ];

  // 16 rows per column now: the source set grew to 31 in the 2026-09-16
  // hardware/MoE loopback.
  const colTop = 1.40, mY = 6.62;
  const rowH = (mY - colTop) / 16;
  s.addShape(pres.ShapeType.rect, { x: FULLW/2 - 0.02, y: colTop, w: 0.03, h: mY - colTop - 0.15, fill: { color: BLUE }, line: { width: 0 } });

  left.forEach((ref, i) => {
    const y = colTop + i * rowH;
    s.addText(ref[0], { x: MX, y, w: 5.9, h: rowH * 0.6, fontSize: 8.2, bold: true, color: BLUE, fontFace: FONT, valign: 'top' });
    s.addText(ref[1], { x: MX, y: y + rowH * 0.52, w: 5.9, h: rowH * 0.42, fontSize: 7, color: MUTED, fontFace: FONT, valign: 'top' });
  });
  right.forEach((ref, i) => {
    const x = FULLW/2 + 0.35, y = colTop + i * rowH;
    s.addText(ref[0], { x, y, w: 5.9, h: rowH * 0.6, fontSize: 8.2, bold: true, color: BLUE, fontFace: FONT, valign: 'top' });
    s.addText(ref[1], { x, y: y + rowH * 0.52, w: 5.9, h: rowH * 0.42, fontSize: 7, color: MUTED, fontFace: FONT, valign: 'top' });
  });

  s.addShape(pres.ShapeType.rect, { x: 0, y: mY, w: FULLW, h: 0.03, fill: { color: BLUE }, line: { width: 0 } });
  s.addText('Methodology: 31 sources triaged on a 40% relevance / 30% recency / 30% authority rubric, extracted into structured claims (fact vs. opinion tagged), cross-analyzed for agreements and gaps, gap-checked via a loopback round, then verified for citation integrity before drafting slides.', {
    x: MX, y: mY + 0.1, w: CW, h: 0.8, fontSize: 9.5, italic: true, color: LIGHT, fontFace: FONT, valign: 'top',
  });

  s.addNotes(
    "This is for anyone who wants to go deeper on any single claim. Thirty-one sources, every one of them a primary lab publication, a named podcast or channel, or an institutional report, not a random blog post. The research followed a forty percent relevance, thirty percent recency, thirty percent authority scoring rubric, with every claim tagged as fact or opinion before it made it onto a slide. Happy to share the full written report."
  );
  pageNum(s);
}

// ============================================================================
// THANK YOU
// ============================================================================
{
  const s = pres.addSlide(); darkBg(s);
  s.addText('Thanks, questions?', {
    x: 1.0, y: 2.6, w: FULLW - 2.0, h: 1.1, fontSize: 40, bold: true, color: OFFWH, fontFace: FONT, align: 'center',
  });
  s.addShape(pres.ShapeType.rect, { x: FULLW/2 - 0.6, y: 3.8, w: 1.2, h: 0.035, fill: { color: BLUE }, line: { width: 0 } });
  s.addText('Full written report and sources: demos/research-pipeline/ai-agi-overview/report/report.md', {
    x: 1.0, y: 4.05, w: FULLW - 2.0, h: 0.5, fontSize: 12, color: MUTED, fontFace: FONT, align: 'center',
  });
  s.addNotes(
    "That's the talk. What AI is, what AGI is, how to actually use it, popular models and what they're good at, a practical way to think about parameters and benchmarks when picking a model, responsible AI done right, and a business lens, with a quick Gartner Hype Cycle bonus round at the end. All twenty sources are cited on the appendix slide and in the written report. Happy to take questions on any part of this."
  );
  pageNum(s);
}

// Save.
await pres.writeFile({ fileName: OUT });
console.log(`Generated: ${OUT}`);
console.log(`Slides: ${n}`);
