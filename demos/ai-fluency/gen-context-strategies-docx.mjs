import { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat,
         AlignmentType, PageNumber, Footer, ImageRun, TabStopType } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT  = path.join(__dirname, 'context-strategies-cheatsheet.docx');
const LOGO = path.join(__dirname, 'assets/icon.png');

// ── Content ───────────────────────────────────────────────────────────────────

const tips = [
  {
    title: 'Front-Load the Main Use Case',
    quote: 'after 250 characters, they truncate the descriptions for skills',
    action: 'Put your skill\'s primary use case in the first 250 characters of the description field.',
  },
  {
    title: 'Write Descriptions in Third Person',
    quote: 'use the third person, be pushy and use specific trigger phrases',
    action: 'Write "processes X into Y," not "I can help you with X." Third person reads as a capability, not a pitch.',
  },
  {
    title: 'Include Specific Trigger Phrases',
    quote: 'use trigger phrases like categorize expenses, expense reports, transaction CSVs',
    action: 'List 3-5 concrete trigger phrases in your description so Claude reliably activates the skill.',
  },
  {
    title: 'Avoid Vague First-Person Language',
    quote: 'avoid vague comments and phrases like I can help you process Excel files',
    action: 'Replace vague first-person phrases with specific third-person descriptions of outputs and actions.',
  },
  {
    title: 'YAML Front Matter Always Loads',
    quote: 'the YML front matter of the skill... that\'s always loaded regardless of what happens',
    action: 'Put essential identity and trigger info in YAML front matter — it is your only guaranteed context.',
  },
  {
    title: 'Skill Body Loads on Trigger Only',
    quote: 'the body of the skill.md file, that will load if ClockCode decides to trigger that skill',
    action: 'Put workflow steps and detailed instructions in the body, not the front matter.',
  },
  {
    title: 'Scripts and Assets Load on Demand',
    quote: 'the references, the scripts and the assets, will load if ClockCode deems necessary',
    action: 'Place heavy reference files and scripts in subdirectories — they only load when the skill needs them.',
  },
  {
    title: 'Inject Live Data with Bang Commands',
    quote: 'inside of that markdown file, you can put commands here that are preceded by the exclamation point',
    action: 'Use !command in your skill.md to inject live output (git diff, file lists) at execution time.',
  },
  {
    title: 'Design Skills in Three Loading Tiers',
    quote: 'level one... level two... and finally level three',
    action: 'Layer your skill: YAML identity first, body instructions second, supporting files third.',
  },
  {
    title: 'Pull PR Context Dynamically',
    quote: 'summarizing changes in a pull request... trigger the PR diff... trigger the comments',
    action: 'In review skills, use !git diff and !gh pr view to pull live PR data automatically.',
  },
];

// ── Sizes ─────────────────────────────────────────────────────────────────────

const TITLE_SIZE    = 44; // 22pt
const BODY_SIZE     = 26; // 13pt
const QUOTE_SIZE    = 22; // 11pt
const SMALL_SIZE    = 18; // 9pt
const CONTENT_WIDTH = 9648; // DXA: 8.5" page - 2 * 0.9" margins
const LOGO_PX       = 115;  // 1.2" at 96 DPI

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
          text: '–',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 640, hanging: 320 } } },
        }],
      },
      {
        reference: 'action-bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '▸',
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
      // ── Cover block: title left, logo right ──
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: 'Context Strategies for Claude Code Skills',
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
          text: 'Actionable insights from: Applying Common Context Strategies — Claude Code Skills Training',
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
            text: `"${tip.quote}"`,
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
