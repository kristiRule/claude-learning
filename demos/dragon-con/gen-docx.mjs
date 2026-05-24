import { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat,
         AlignmentType, PageNumber, Footer } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'universe-of-thoughts-cheatsheet.docx');

// ── Content ───────────────────────────────────────────────────────────────────

const tips = [
  {
    title: '1. Decompose Problems into Building Blocks',
    quote: 'decompose problems into a series of intermediate steps or connected "thoughts"',
    action: 'Ask the LLM to break complex problems into individual conceptual steps first, then build toward the answer. Avoid requesting a monolithic answer in one shot.',
  },
  {
    title: '2. Borrow Solutions from Other Domains',
    quote: 'identify problems that are structurally similar but different in how they are presented',
    action: 'When stuck, prompt the LLM to find a functionally equivalent problem from a completely different field and adapt its solution to your context.',
  },
  {
    title: '3. Seek "Far-But-Apt" Analogies',
    quote: 'selecting donor thoughts that are functionally analogous but superficially distant',
    action: 'Explicitly instruct the LLM to find solutions that serve the same purpose as your current approach but come from visually or contextually distant problem spaces.',
  },
  {
    title: '4. Surface Hidden Assumptions First',
    quote: 'identify explicit and hidden rules governing the target problem domain',
    action: 'Before solving, have the LLM list all implicit constraints and unstated assumptions. Then ask which of those constraints are truly necessary.',
  },
  {
    title: '5. Mutate the Rules, Not Just the Solutions',
    quote: 'transformational creativity involves altering the presumed rules (or constraints) for the solution',
    action: 'Ask the LLM what changes if you drop or modify one core rule, then explore what new solutions become possible under those altered conditions.',
  },
  {
    title: '6. Canonicalize Before Comparing',
    quote: 'canonicalization step, where an LLM refines and standardizes the structure',
    action: 'When comparing multiple LLM-generated solutions, first have the model reformat each to a consistent structure so you evaluate ideas, not presentation style.',
  },
  {
    title: '7. Score on Feasibility, Utility, and Novelty',
    quote: 'assess creativity from three orthogonal perspectives: feasibility as constraint, and utility and novelty as metrics',
    action: 'Rate creative outputs on three dimensions: (1) Does it meet hard constraints? (2) Does it solve the problem well? (3) Is it genuinely different from known approaches?',
  },
  {
    title: '8. Expand the Idea Pool Before Recombining',
    quote: 'expanding the pool of thoughts with new, functionally equivalent thoughts that were not previously present',
    action: 'Before combining ideas, have the LLM generate fresh alternatives to each existing concept first — creating richer raw material for innovative combinations.',
  },
  {
    title: '9. Pipeline Your Reasoning Across Separate Prompts',
    quote: 'implemented as a structured pipeline of modular prompts, each corresponds to a distinct, self-contained call',
    action: 'Break multi-step reasoning into sequential, focused LLM calls rather than one long prompt. Each call handles one stage and passes its output to the next.',
  },
  {
    title: '10. Accept the Novelty-Practicality Trade-off',
    quote: 'the most abstract rule changes may be difficult to ground in a practical solution',
    action: 'When seeking creative solutions, decide upfront whether you need high novelty (harder to implement) or high practicality (less original). Rarely will you get both simultaneously.',
  },
];

// ── Document ──────────────────────────────────────────────────────────────────

const BODY_SIZE  = 28; // 14pt (half-points)
const QUOTE_SIZE = 26; // 13pt for quotes — slightly smaller, italicised
const SMALL_SIZE = 20; // 10pt for footer / source line

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Arial', size: BODY_SIZE } },
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 44, bold: true, font: 'Arial', color: '000000' }, // 22pt
        paragraph: { spacing: { before: 0, after: 200 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: '1A1A2E' }, // 16pt, deep ember
        paragraph: { spacing: { before: 300, after: 100 }, outlineLevel: 1 },
      },
    ],
  },

  // Two bullet references: one for quotes (italic), one for actions (regular)
  // Using separate references so each tip restarts visually cleanly
  numbering: {
    config: [
      {
        reference: 'quote-bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '–', // en-dash as bullet marker for quotes
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 640, hanging: 320 } } },
        }],
      },
      {
        reference: 'action-bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '▸', // filled right-pointing triangle for actions
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
        margin: { top: 1260, right: 1260, bottom: 1260, left: 1260 }, // ~0.875" margins
      },
    },

    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Page ', font: 'Arial', size: SMALL_SIZE, color: '888888' }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: SMALL_SIZE, color: '888888' }),
            new TextRun({ text: ' of ', font: 'Arial', size: SMALL_SIZE, color: '888888' }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: SMALL_SIZE, color: '888888' }),
          ],
        })],
      }),
    },

    children: [
      // ── Title ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun('Universe of Thoughts — LLM Practice Cheat Sheet')],
      }),

      // ── Source attribution ──
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({
          text: 'Actionable insights from: Universe of Thoughts: Enabling Creative Reasoning with Large Language Models (arXiv 2511.20471)',
          italic: true,
          font: 'Arial',
          size: SMALL_SIZE,
          color: '666666',
        })],
      }),

      // ── Tips ──
      ...tips.flatMap(tip => [
        // Tip heading
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun(tip.title)],
        }),

        // Quote bullet — italic, muted
        new Paragraph({
          numbering: { reference: 'quote-bullets', level: 0 },
          spacing: { after: 80 },
          children: [new TextRun({
            text: `"${tip.quote}"`,
            italic: true,
            font: 'Arial',
            size: QUOTE_SIZE,
            color: '555555',
          })],
        }),

        // Action bullet — regular weight
        new Paragraph({
          numbering: { reference: 'action-bullets', level: 0 },
          spacing: { after: 40 },
          children: [new TextRun({
            text: tip.action,
            font: 'Arial',
            size: BODY_SIZE,
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
