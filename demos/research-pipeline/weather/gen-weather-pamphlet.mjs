import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'weather-modification-pamphlet.pdf');

// ── Colors ────────────────────────────────────────────────────────────────────
const NAVY  = rgb(26/255, 26/255, 46/255);
const GOLD  = rgb(184/255, 134/255, 11/255);
const GRAY  = rgb(136/255, 128/255, 112/255);
const WHITE = rgb(1, 1, 1);
const LIGHT = rgb(240/255, 237/255, 230/255);
const DKGRAY = rgb(80/255, 80/255, 80/255);

// ── Layout ────────────────────────────────────────────────────────────────────
// Landscape Letter: 792 wide x 612 tall
// Bi-fold: two panels per page, each 396 x 612
// Print double-sided, fold down the center crease
const PW = 792, PH = 612;
const PNL = PW / 2;   // panel width = 396
const PM  = 28;        // panel margin

const pdfDoc = await PDFDocument.create();
const bold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
const italic  = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

// ── Helpers ───────────────────────────────────────────────────────────────────

function wrap(text, font, size, maxW) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) <= maxW) { line = test; }
    else { if (line) lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines;
}

// Draw text block, return total height used
function drawBlock(page, text, font, size, color, x, y, maxW, leading = 4) {
  const lines = wrap(text, font, size, maxW);
  lines.forEach((ln, i) => {
    page.drawText(ln, { x, y: y - i * (size + leading), size, font, color });
  });
  return lines.length * (size + leading);
}

function bullet(page, text, font, size, color, x, y, maxW, marker = '-') {
  page.drawText(marker, { x, y, size, font, color });
  return drawBlock(page, text, font, size, color, x + 12, y, maxW - 12, 3);
}

function hRule(page, x, y, w, color, thickness = 1) {
  page.drawLine({ start: { x, y }, end: { x: x + w, y }, thickness, color });
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 1 — Print side 1
// Left panel  = BACK of pamphlet (visible when closed, on left)
// Right panel = FRONT COVER (visible when closed, on right)
// ─────────────────────────────────────────────────────────────────────────────
const p1 = pdfDoc.addPage([PW, PH]);
p1.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: WHITE });

// ── Fold guide (light dashed center line) ─────────────────────────────────
p1.drawLine({ start: { x: PNL, y: PH }, end: { x: PNL, y: 0 }, thickness: 0.3, color: rgb(0.85, 0.85, 0.85) });

// ── RIGHT PANEL — FRONT COVER ─────────────────────────────────────────────
const cx = PNL;   // cover starts at center
// Full navy background for right panel
p1.drawRectangle({ x: cx, y: 0, width: PNL, height: PH, color: NAVY });
// Gold top bar
p1.drawRectangle({ x: cx, y: PH - 8, width: PNL, height: 8, color: GOLD });
// Gold bottom bar
p1.drawRectangle({ x: cx, y: 0, width: PNL, height: 6, color: GOLD });

// Main title
const titleLines = ['Controlling', 'the Sky'];
titleLines.forEach((ln, i) => {
  const tw = bold.widthOfTextAtSize(ln, 42);
  p1.drawText(ln, { x: cx + (PNL - tw) / 2, y: PH - 90 - i * 52, size: 42, font: bold, color: WHITE });
});

// Gold rule
p1.drawRectangle({ x: cx + PM, y: PH - 205, width: PNL - 2 * PM, height: 2, color: GOLD });

// Subtitle
const sub = 'Global Weather Modification\nPrograms & Their Effects';
['Global Weather Modification', 'Programs & Their Effects'].forEach((ln, i) => {
  const tw = regular.widthOfTextAtSize(ln, 13);
  p1.drawText(ln, { x: cx + (PNL - tw) / 2, y: PH - 228 - i * 18, size: 13, font: regular, color: LIGHT });
});

// Big stat
const stat = '56';
const sw = bold.widthOfTextAtSize(stat, 72);
p1.drawText(stat, { x: cx + (PNL - sw) / 2, y: PH - 360, size: 72, font: bold, color: GOLD });
const statLabel = 'countries with active programs';
const slw = regular.widthOfTextAtSize(statLabel, 11);
p1.drawText(statLabel, { x: cx + (PNL - slw) / 2, y: PH - 388, size: 11, font: regular, color: LIGHT });
const statSrc = 'World Meteorological Organization, 2022';
const ssw = italic.widthOfTextAtSize(statSrc, 8);
p1.drawText(statSrc, { x: cx + (PNL - ssw) / 2, y: PH - 402, size: 8, font: italic, color: GOLD });

// Bottom tagline
const tag = 'A research synthesis grounded in WMO, GAO,';
const tag2 = 'NOAA, and peer-reviewed science';
[tag, tag2].forEach((ln, i) => {
  const tw = italic.widthOfTextAtSize(ln, 9);
  p1.drawText(ln, { x: cx + (PNL - tw) / 2, y: 38 + (1 - i) * 14, size: 9, font: italic, color: GRAY });
});

// ── LEFT PANEL — BACK PANEL ───────────────────────────────────────────────
// Light background
p1.drawRectangle({ x: 0, y: 0, width: PNL, height: PH, color: LIGHT });
p1.drawRectangle({ x: 0, y: PH - 6, width: PNL, height: 6, color: GOLD });
p1.drawRectangle({ x: 0, y: 0, width: PNL, height: 4, color: NAVY });

let by = PH - PM - 6;

// Header
p1.drawText('Primary Sources', { x: PM, y: by, size: 14, font: bold, color: NAVY });
by -= 6;
hRule(p1, PM, by, PNL - 2 * PM, GOLD, 1.5);
by -= 18;

const sources = [
  { label: 'WMO (2022)', detail: 'Weather & Climate Modification', url: 'library.wmo.int/records/item/60310' },
  { label: 'GAO-11-11 (2010)', detail: 'U.S. Weather Modification Report', url: 'gao.gov/products/gao-11-11' },
  { label: 'U.S. Senate (1978)', detail: 'Operation Popeye & Program History', url: 'govinfo.gov — search CPRT-95SPRT21866' },
  { label: 'Prabha et al. (2023)', detail: 'CAIPEEX India Randomized Trial', url: 'doi.org/10.1175/bams-d-21-0291.1' },
  { label: 'Bruintjes et al. (2021)', detail: 'UAE 30-Year Program Evaluation', url: 'doi.org/10.3390/atmos12081013' },
  { label: 'Soderholm et al. (2012)', detail: 'Queensland Null Result (BAMS)', url: 'doi.org/10.1175/BAMS-D-11-00060.1' },
  { label: 'Yao et al. (2021)', detail: "China's Weather Modification Review", url: 'doi.org/10.1016/j.atmosres.2020.105183' },
  { label: 'Talati et al. (2022)', detail: 'Stratospheric Aerosol Injection', url: 'doi.org/10.1029/2021EF002545' },
  { label: 'Korhonen et al. (2023)', detail: 'Rainfall Enhancement as Policy Tool', url: 'doi.org/10.1038/s41612-023-00503-2' },
];

sources.forEach(s => {
  p1.drawText(s.label, { x: PM, y: by, size: 10, font: bold, color: NAVY });
  by -= 13;
  drawBlock(p1, s.detail, regular, 9, DKGRAY, PM + 2, by, PNL - 2 * PM - 4);
  by -= 12;
  drawBlock(p1, s.url, italic, 7.5, GRAY, PM + 2, by, PNL - 2 * PM - 4);
  by -= 16;
});

// About box
if (by > 60) {
  p1.drawRectangle({ x: PM, y: 20, width: PNL - 2 * PM, height: Math.min(by - 28, 55), color: NAVY });
  p1.drawText('About This Research', { x: PM + 8, y: Math.min(by - 28, 55) + 16, size: 9, font: bold, color: GOLD });
  drawBlock(p1, 'All claims cite original journals, government reports, and institutional pages — not secondary sources.',
    regular, 8, WHITE, PM + 8, Math.min(by - 28, 55) + 3, PNL - 2 * PM - 16, 3);
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 2 — Print side 2 (flip along vertical axis for double-sided printing)
// Left panel  = INSIDE LEFT  (visible when opened)
// Right panel = INSIDE RIGHT (visible when opened)
// ─────────────────────────────────────────────────────────────────────────────
const p2 = pdfDoc.addPage([PW, PH]);
p2.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: WHITE });
p2.drawLine({ start: { x: PNL, y: PH }, end: { x: PNL, y: 0 }, thickness: 0.3, color: rgb(0.85, 0.85, 0.85) });

// ── LEFT INSIDE PANEL — Programs & Military ───────────────────────────────
p2.drawRectangle({ x: 0, y: PH - 44, width: PNL, height: 44, color: NAVY });
p2.drawRectangle({ x: 0, y: PH - 46, width: PNL, height: 2, color: GOLD });
p2.drawText('Global Programs', { x: PM, y: PH - 28, size: 16, font: bold, color: WHITE });
p2.drawText('Weather modification at national scale', { x: PM, y: PH - 42, size: 9, font: italic, color: LIGHT });

let ly = PH - 60;
const pnlW = PNL - 2 * PM;

const programs = [
  { flag: 'UAE', years: 'Since 1990', claim: '10-15% precipitation increase over 30 years of continuous operations.', src: 'Bruintjes et al., Atmosphere 2021' },
  { flag: 'China', years: 'Since 1950s', claim: '50,000+ rocket launchers across 23 provinces. 5.5M km2 target by 2025.', src: 'Yao et al., Atmos. Res. 2021' },
  { flag: 'India', years: 'CAIPEEX 2009+', claim: 'Randomized trial confirms statistically significant rainfall increase.', src: 'Prabha et al., BAMS 2023' },
  { flag: 'USA', years: '27 states active', claim: 'Hail suppression and water supply augmentation. No federal oversight body.', src: 'GAO-11-11, 2010' },
  { flag: 'Australia', years: 'Queensland RCT', claim: 'Rigorous randomized trial — no significant effect detected. Highlights limits.', src: 'Soderholm et al., BAMS 2012' },
];

programs.forEach(p => {
  p2.drawRectangle({ x: PM, y: ly - 3, width: pnlW, height: 1, color: LIGHT });
  ly -= 8;
  p2.drawText(`${p.flag}  |  ${p.years}`, { x: PM, y: ly, size: 10, font: bold, color: NAVY });
  ly -= 14;
  const h = drawBlock(p2, p.claim, regular, 9, DKGRAY, PM, ly, pnlW, 3);
  ly -= h + 2;
  drawBlock(p2, p.src, italic, 7.5, GRAY, PM, ly, pnlW, 3);
  ly -= 14;
});

// Military section
ly -= 4;
p2.drawRectangle({ x: PM, y: ly - 2, width: pnlW, height: 2, color: GOLD });
ly -= 12;
p2.drawText('When Weather Was a Weapon', { x: PM, y: ly, size: 11, font: bold, color: NAVY });
ly -= 14;
const opLines = [
  'Operation Popeye (1967-1972): Classified U.S. military program seeded clouds over Vietnam, Laos, and Cambodia to extend the monsoon and flood the Ho Chi Minh Trail.',
  'Over 2,600 missions flown. Declassified after journalist Jack Anderson revealed the program in 1971.',
  'Led to the 1978 ENMOD Convention prohibiting military weather modification.',
];
opLines.forEach(line => {
  const h = bullet(p2, line, regular, 8.5, DKGRAY, PM, ly, pnlW);
  ly -= h + 4;
});
drawBlock(p2, 'Source: U.S. Senate Commerce Committee, 1978. govinfo.gov', italic, 7.5, GRAY, PM, ly, pnlW);

// ── RIGHT INSIDE PANEL — Evidence & Takeaways ─────────────────────────────
const rx = PNL;
p2.drawRectangle({ x: rx, y: PH - 44, width: PNL, height: 44, color: GOLD });
p2.drawRectangle({ x: rx, y: PH - 46, width: PNL, height: 2, color: NAVY });
p2.drawText('Does It Work?', { x: rx + PM, y: PH - 28, size: 16, font: bold, color: NAVY });
p2.drawText('What the peer-reviewed evidence shows', { x: rx + PM, y: PH - 42, size: 9, font: italic, color: NAVY });

let ry = PH - 60;

p2.drawText('Supporting Evidence', { x: rx + PM, y: ry, size: 10, font: bold, color: NAVY });
ry -= 14;
const pros = [
  '5-30% precipitation enhancement achievable under suitable conditions (WMO 2022)',
  'India CAIPEEX: statistically significant increase in controlled trial (Prabha 2023)',
  'Karnataka India: +24% daily rainfall in target areas (Dani et al. 2019)',
  'WRF model: 5-15% orographic enhancement confirmed (Xue et al. 2023)',
];
pros.forEach(line => {
  const h = bullet(p2, line, regular, 8.5, DKGRAY, rx + PM, ry, pnlW, '+');
  ry -= h + 4;
});

ry -= 6;
p2.drawText('Legitimate Questions', { x: rx + PM, y: ry, size: 10, font: bold, color: NAVY });
ry -= 14;
const cons = [
  'Queensland randomized trial: no significant effect detected (Soderholm 2012)',
  "China's claimed results cannot be independently verified (Yao et al. 2021)",
  'Most programs lack randomized control group designs (Korhonen et al. 2023)',
];
cons.forEach(line => {
  const h = bullet(p2, line, regular, 8.5, DKGRAY, rx + PM, ry, pnlW, '?');
  ry -= h + 4;
});

// SAI section
ry -= 4;
p2.drawRectangle({ x: rx + PM, y: ry - 2, width: pnlW, height: 2, color: NAVY });
ry -= 12;
p2.drawText('The Next Frontier: Stratospheric Aerosol Injection', { x: rx + PM, y: ry, size: 10, font: bold, color: NAVY });
ry -= 14;
const saiLines = [
  'Injects sulfate aerosols into the stratosphere to reflect sunlight — planetary scale.',
  'Could reduce global temp 1-2 deg C at $2-8B/year.',
  '"Termination shock": abrupt warming if stopped suddenly.',
  'No international governance framework exists.',
];
saiLines.forEach(line => {
  const h = bullet(p2, line, regular, 8.5, DKGRAY, rx + PM, ry, pnlW);
  ry -= h + 4;
});
drawBlock(p2, 'Source: Talati et al. (2022) Earth\'s Future. doi.org/10.1029/2021EF002545', italic, 7.5, GRAY, rx + PM, ry, pnlW);
ry -= 16;

// Takeaway box
const boxH = Math.max(ry - 16, 80);
p2.drawRectangle({ x: rx + PM, y: 14, width: pnlW, height: ry - 18, color: NAVY });
p2.drawRectangle({ x: rx + PM, y: ry - 20, width: pnlW, height: 3, color: GOLD });
p2.drawText('Key Takeaway', { x: rx + PM + 8, y: ry - 36, size: 10, font: bold, color: GOLD });
const takeaway = 'Weather modification is real, government-funded, and growing — but the rules have not kept up. The science supports it under the right conditions; the governance frameworks do not yet exist to manage it responsibly.';
drawBlock(p2, takeaway, regular, 8.5, WHITE, rx + PM + 8, ry - 52, pnlW - 16, 3);

// ── Save ──────────────────────────────────────────────────────────────────────
fs.writeFileSync(OUT, await pdfDoc.save());
console.log(`Generated: ${OUT}`);
console.log('Print double-sided (flip on short edge), fold in half.');
