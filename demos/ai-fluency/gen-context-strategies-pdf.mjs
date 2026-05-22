import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT  = path.join(__dirname, 'context-strategies-cheatsheet.pdf');
const LOGO = path.join(__dirname, 'assets/icon.png');

// ── Brand colors ──────────────────────────────────────────────────────────────

const DEEP_NAVY = rgb(26/255, 26/255, 46/255);    // #1A1A2E
const GOLD      = rgb(184/255, 134/255, 11/255);  // #B8860B
const WARM_GRAY = rgb(136/255, 128/255, 112/255); // #888070
const WHITE     = rgb(1, 1, 1);

// ── Content ───────────────────────────────────────────────────────────────────

const tips = [
  {
    title: 'Front-Load the Main Use Case',
    quote: '"after 250 characters, they truncate the descriptions for skills"',
    action: "Put your skill's primary use case in the first 250 characters of the description field.",
  },
  {
    title: 'Write Descriptions in Third Person',
    quote: '"use the third person, be pushy and use specific trigger phrases"',
    action: 'Write "processes X into Y," not "I can help you with X." Third person reads as a capability.',
  },
  {
    title: 'Include Specific Trigger Phrases',
    quote: '"use trigger phrases like categorize expenses, expense reports, transaction CSVs"',
    action: 'List 3-5 concrete trigger phrases so Claude reliably activates the skill.',
  },
  {
    title: 'Avoid Vague First-Person Language',
    quote: '"avoid vague comments and phrases like I can help you process Excel files"',
    action: 'Replace vague first-person phrases with specific third-person descriptions of outputs.',
  },
  {
    title: 'YAML Front Matter Always Loads',
    quote: '"the YML front matter of the skill... that\'s always loaded regardless of what happens"',
    action: 'Put essential identity and trigger info in YAML front matter — it is your only guaranteed context.',
  },
  {
    title: 'Skill Body Loads on Trigger Only',
    quote: '"the body of the skill.md file, that will load if ClockCode decides to trigger that skill"',
    action: 'Put workflow steps and detailed instructions in the body, not the front matter.',
  },
  {
    title: 'Scripts and Assets Load on Demand',
    quote: '"the references, the scripts and the assets, will load if ClockCode deems necessary"',
    action: 'Place heavy reference files in subdirectories — they load only when the skill needs them.',
  },
  {
    title: 'Inject Live Data with Bang Commands',
    quote: '"inside of that markdown file, you can put commands here preceded by the exclamation point"',
    action: 'Use !command in your skill.md to inject live output (git diff, file lists) at execution time.',
  },
  {
    title: 'Design Skills in Three Loading Tiers',
    quote: '"level one... level two... and finally level three"',
    action: 'Layer your skill: YAML identity first, body instructions second, supporting files third.',
  },
  {
    title: 'Pull PR Context Dynamically',
    quote: '"summarizing changes in a pull request... trigger the PR diff... trigger the comments"',
    action: 'In review skills, use !git diff and !gh pr view to pull live PR data automatically.',
  },
];

// ── Layout constants ──────────────────────────────────────────────────────────

const PAGE_W    = 612;  // US Letter
const PAGE_H    = 792;
const MARGIN    = 65;   // 0.9"
const CONTENT_W = PAGE_W - 2 * MARGIN;
const LOGO_SIZE = 86;   // 1.2" at 72 DPI

const SIZE_TITLE  = 22;
const SIZE_H2     = 14;
const SIZE_BODY   = 11;
const SIZE_QUOTE  = 10;
const SIZE_FOOTER = 8;

// ── Helpers ───────────────────────────────────────────────────────────────────

function wrapText(text, font, size, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const pdfDoc = await PDFDocument.create();
const bold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
const italic  = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

const logoImage = await pdfDoc.embedPng(fs.readFileSync(LOGO));

// State
let page, y;
let pageNum = 0;
const pages = [];

function addPage() {
  page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  pageNum++;
  pages.push(page);

  // White background
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: WHITE });

  // Footer rule
  page.drawLine({
    start: { x: MARGIN, y: MARGIN - 8 },
    end:   { x: PAGE_W - MARGIN, y: MARGIN - 8 },
    thickness: 0.5,
    color: WARM_GRAY,
  });

  // Footer text (page number added in post)
  page.drawText('AI Knowledge Bits  |  aiknowledgebits.com', {
    x: MARGIN,
    y: MARGIN - 20,
    size: SIZE_FOOTER,
    font: regular,
    color: WARM_GRAY,
  });

  y = PAGE_H - MARGIN;
}

function needsSpace(needed) {
  if (y - needed < MARGIN + 24) {
    addPage();
    return true;
  }
  return false;
}

// ── Page 1: cover block ───────────────────────────────────────────────────────

addPage();

// Logo — right-aligned, top
page.drawImage(logoImage, {
  x: PAGE_W - MARGIN - LOGO_SIZE,
  y: y - LOGO_SIZE,
  width: LOGO_SIZE,
  height: LOGO_SIZE,
});

// Title — left-aligned, vertically centered with logo
const titleLines = wrapText(
  'Context Strategies for Claude Code Skills',
  bold, SIZE_TITLE, CONTENT_W - LOGO_SIZE - 16
);
const titleBlockH = titleLines.length * (SIZE_TITLE + 4);
let titleY = y - (LOGO_SIZE - titleBlockH) / 2 - SIZE_TITLE;
for (const line of titleLines) {
  page.drawText(line, { x: MARGIN, y: titleY, size: SIZE_TITLE, font: bold, color: DEEP_NAVY });
  titleY -= SIZE_TITLE + 4;
}

y -= LOGO_SIZE + 10;

// Source attribution
page.drawText(
  'Insights from: Applying Common Context Strategies — Claude Code Skills Training',
  { x: MARGIN, y, size: SIZE_FOOTER + 1, font: italic, color: WARM_GRAY }
);
y -= 20;

// Gold rule
page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 1.5, color: GOLD });
y -= 16;

// ── Tips ──────────────────────────────────────────────────────────────────────

for (const tip of tips) {
  // Estimate space needed: heading + quote + action
  const quoteLines  = wrapText(tip.quote,   italic,  SIZE_QUOTE, CONTENT_W - 16);
  const actionLines = wrapText(tip.action,  regular, SIZE_BODY,  CONTENT_W - 16);
  const needed = (SIZE_H2 + 6) + quoteLines.length * (SIZE_QUOTE + 3) + 6
               + actionLines.length * (SIZE_BODY + 3) + 14;

  needsSpace(needed);

  // Heading
  page.drawText(tip.title, { x: MARGIN, y, size: SIZE_H2, font: bold, color: GOLD });
  y -= SIZE_H2 + 6;

  // Quote bullet
  page.drawText('–', { x: MARGIN, y, size: SIZE_QUOTE, font: regular, color: WARM_GRAY });
  for (const line of quoteLines) {
    page.drawText(line, { x: MARGIN + 14, y, size: SIZE_QUOTE, font: italic, color: WARM_GRAY });
    y -= SIZE_QUOTE + 3;
  }
  y -= 4;

  // Action bullet
  page.drawText('>', { x: MARGIN, y, size: SIZE_BODY, font: bold, color: DEEP_NAVY });
  for (const line of actionLines) {
    page.drawText(line, { x: MARGIN + 14, y, size: SIZE_BODY, font: regular, color: DEEP_NAVY });
    y -= SIZE_BODY + 3;
  }
  y -= 10;
}

// ── Page numbers ──────────────────────────────────────────────────────────────

const total = pages.length;
for (let i = 0; i < pages.length; i++) {
  pages[i].drawText(`Page ${i + 1} of ${total}`, {
    x: PAGE_W - MARGIN - 50,
    y: MARGIN - 20,
    size: SIZE_FOOTER,
    font: regular,
    color: WARM_GRAY,
  });
}

// ── Save ──────────────────────────────────────────────────────────────────────

fs.writeFileSync(OUT, await pdfDoc.save());
console.log(`Generated: ${OUT}`);
console.log(`Pages: ${total}  Tips: ${tips.length}`);
