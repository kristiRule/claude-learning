import { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat,
         AlignmentType, PageNumber, Footer, ImageRun, TabStopType } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT  = path.join(__dirname, 'teaching-claude-why-cheatsheet.docx');
const LOGO = path.join(__dirname, 'assets/icon.png');

// ── Content ───────────────────────────────────────────────────────────────────

const tips = [
  {
    title: 'Prioritize Reasoning Over Demonstrations',
    quote: 'training on examples where the assistant displays admirable reasoning for its aligned behavior works better',
    action: 'Show your AI model the why behind aligned choices, not just the correct output.',
  },
  {
    title: 'Avoid Narrow Evaluation-Specific Training',
    quote: 'did not improve performance on our held-out automated alignment assessment',
    action: "Don't train directly on eval-similar prompts; behavior learned this way doesn't generalize.",
  },
  {
    title: 'Use Constitutional Documents for Broad Principles',
    quote: 'Training on high-quality constitutional documents reduced blackmail rates from 65% to 19%',
    action: 'Ground your model in written ethical principles; breadth generalizes better than narrow rules.',
  },
  {
    title: 'Leverage Out-of-Distribution Training Data',
    quote: 'despite being extremely OOD from all of our alignment evals',
    action: 'Use fictional stories or analogy-based data; broad exposure can outperform eval-matched datasets.',
  },
  {
    title: 'Design Ambiguous Scenarios, Not Obvious Traps',
    quote: 'the user faces an ethically ambiguous situation',
    action: "Train on nuanced moral dilemmas rather than obvious traps; models learn to reason, not pattern-match.",
  },
  {
    title: 'Diversify Safety Training Environments',
    quote: 'Training on a broad set of safety-relevant environments improves alignment generalization',
    action: 'Expose your model to varied contexts and tool configurations during safety training.',
  },
  {
    title: 'Curate for Efficiency Before Scaling Data',
    quote: 'achieved comparable results using only 3 million tokens instead of 85 million',
    action: 'Test smaller, higher-quality datasets before scaling; better curation often beats more tokens.',
  },
  {
    title: 'Benchmark Models on Agentic Misalignment Scenarios',
    quote: 'exhibited blackmail behavior up to 96% of the time',
    action: 'Test deployed models on agentic self-preservation scenarios; misalignment rates can be surprisingly high.',
  },
  {
    title: 'Apply Constitutional Training Before RL Fine-Tuning',
    quote: 'maintained that lead through subsequent RL training',
    action: 'Run constitutional training before RL; alignment gains tend to persist through the pipeline.',
  },
  {
    title: 'Audit Explicitly for Worst-Case Autonomous Behaviors',
    quote: 'our auditing methodology is not yet sufficient to rule out scenarios in which Claude would choose to take catastrophic autonomous action',
    action: "Build dedicated audits for catastrophic autonomous behaviors; standard evals won't catch them.",
  },
];

// ── Sizes ─────────────────────────────────────────────────────────────────────

const TITLE_SIZE   = 44; // 22pt
const BODY_SIZE    = 26; // 13pt
const QUOTE_SIZE   = 22; // 11pt
const SMALL_SIZE   = 18; // 9pt
const CONTENT_WIDTH = 9648; // DXA: 8.5" page - 2 * 0.9" margins
const LOGO_PX      = 115; // 1.2" at 96 DPI

// ── Document ──────────────────────────────────────────────────────────────────

const logoData = fs.readFileSync(LOGO);

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Arial', size: BODY_SIZE } },
    },
    paragraphStyles: [
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: 'B8860B' }, // 16pt, Knowledge Gold
        paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 1 },
      },
    ],
  },

  numbering: {
    config: [
      {
        reference: 'quote-bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '–', // en-dash
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 640, hanging: 320 } } },
        }],
      },
      {
        reference: 'action-bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '▸', // filled right-pointing triangle
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 640, hanging: 320 } } },
        }],
      },
    ],
  },

  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 }, // US Letter
        margin: { top: 1296, right: 1296, bottom: 1296, left: 1296 }, // 0.9"
      },
    },

    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'AI Knowledge Bits · aiknowledgebits.com · Page ', font: 'Arial', size: SMALL_SIZE, color: '888070' }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: SMALL_SIZE, color: '888070' }),
            new TextRun({ text: ' of ', font: 'Arial', size: SMALL_SIZE, color: '888070' }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: SMALL_SIZE, color: '888070' }),
          ],
        })],
      }),
    },

    children: [
      // ── Cover block: title left, logo right via tab stop ──
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: 'Teaching Claude Why: AI Alignment Cheat Sheet',
            font: 'Arial',
            size: TITLE_SIZE,
            bold: true,
            color: '1A1A2E',
          }),
          new TextRun({ text: '\t' }),
          new ImageRun({
            type: 'png',
            data: logoData,
            transformation: { width: LOGO_PX, height: LOGO_PX },
            altText: { title: 'AI Knowledge Bits', description: 'AI Knowledge Bits logo', name: 'logo' },
          }),
        ],
      }),

      // ── Source attribution ──
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: 'Actionable insights from: Teaching Claude Why (Anthropic Research, May 2026) — anthropic.com/research/teaching-claude-why',
          italic: true,
          font: 'Arial',
          size: SMALL_SIZE + 2,
          color: '888070',
        })],
      }),

      // ── Tips ──
      ...tips.flatMap(tip => [
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun(tip.title)],
        }),

        new Paragraph({
          numbering: { reference: 'quote-bullets', level: 0 },
          spacing: { after: 60 },
          children: [new TextRun({
            text: `“${tip.quote}”`,
            italic: true,
            font: 'Arial',
            size: QUOTE_SIZE,
            color: '888070',
          })],
        }),

        new Paragraph({
          numbering: { reference: 'action-bullets', level: 0 },
          spacing: { after: 40 },
          children: [new TextRun({
            text: tip.action,
            font: 'Arial',
            size: BODY_SIZE,
            color: '1A1A2E',
          })],
        }),
      ]),
    ],
  }],
});

// ── Save ──────────────────────────────────────────────────────────────────────

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buffer);
console.log(`Generated: ${OUT}`);
console.log(`Tips: ${tips.length}`);
