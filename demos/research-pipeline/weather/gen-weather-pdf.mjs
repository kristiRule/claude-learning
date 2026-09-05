import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'weather-modification-report.pdf');

// ── Colors ────────────────────────────────────────────────────────────────────
const NAVY  = rgb(26/255, 26/255, 46/255);
const GOLD  = rgb(184/255, 134/255, 11/255);
const GRAY  = rgb(136/255, 128/255, 112/255);
const WHITE = rgb(1, 1, 1);
const LIGHT = rgb(240/255, 237/255, 230/255);

// ── Layout ────────────────────────────────────────────────────────────────────
const W = 612, H = 792, M = 54;       // US Letter, 0.75" margins
const CW = W - 2 * M;

// ── Fonts ─────────────────────────────────────────────────────────────────────
const pdfDoc = await PDFDocument.create();
const bold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
const italic  = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

// ── State ─────────────────────────────────────────────────────────────────────
let page, y;
const pages = [];

function addPage() {
  page = pdfDoc.addPage([W, H]);
  pages.push(page);
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: WHITE });
  // Footer rule
  page.drawLine({ start: { x: M, y: 36 }, end: { x: W - M, y: 36 }, thickness: 0.5, color: GRAY });
  y = H - M;
}

function need(h) {
  if (y - h < 50) { addPage(); return true; }
  return false;
}

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

function drawText(text, font, size, color, x, maxW, spacing = 0) {
  const lines = wrap(text, font, size, maxW);
  for (const ln of lines) {
    need(size + 2);
    page.drawText(ln, { x, y, size, font, color });
    y -= size + spacing;
  }
  return lines.length;
}

function heading1(text) {
  need(40);
  // Navy bar
  page.drawRectangle({ x: 0, y: y - 4, width: W, height: 28, color: NAVY });
  page.drawText(text, { x: M, y: y, size: 16, font: bold, color: WHITE });
  y -= 32;
  // Gold rule
  page.drawRectangle({ x: M, y, width: CW, height: 2, color: GOLD });
  y -= 10;
}

function heading2(text) {
  need(30);
  page.drawText(text, { x: M, y, size: 13, font: bold, color: GOLD });
  y -= 18;
}

function bullet(text, indent = 16) {
  const bx = M + indent;
  const tw = CW - indent - 8;
  page.drawText('-', { x: M + indent - 10, y, size: 11, font: regular, color: NAVY });
  drawText(text, regular, 11, NAVY, bx, tw, 3);
  y -= 2;
}

function citation(text) {
  need(18);
  page.drawRectangle({ x: M, y: y - 4, width: CW, height: 14, color: LIGHT });
  const lines = wrap(text, italic, 8, CW - 8);
  page.drawText(lines[0], { x: M + 4, y: y - 1, size: 8, font: italic, color: GRAY });
  y -= 16;
}

function statBox(number, label, source, x, bw) {
  const bh = 80;
  const by = y - bh;
  page.drawRectangle({ x, y: by, width: bw, height: bh, color: NAVY });
  page.drawRectangle({ x, y: by + bh - 3, width: bw, height: 3, color: GOLD });
  const nw = bold.widthOfTextAtSize(number, 28);
  page.drawText(number, { x: x + (bw - nw) / 2, y: by + 46, size: 28, font: bold, color: GOLD });
  const labelLines = label.split('\n').flatMap(l => wrap(l, regular, 9, bw - 8));
  labelLines.forEach((ln, i) => {
    const lw = regular.widthOfTextAtSize(ln, 9);
    page.drawText(ln, { x: x + (bw - lw) / 2, y: by + 30 - i * 11, size: 9, font: regular, color: WHITE });
  });
  const sw = italic.widthOfTextAtSize(source, 7);
  page.drawText(source, { x: x + (bw - sw) / 2, y: by + 5, size: 7, font: italic, color: rgb(0.6, 0.6, 0.6) });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────────────────────────────────────

addPage();

// Cover block
page.drawRectangle({ x: 0, y: H - 130, width: W, height: 130, color: NAVY });
page.drawRectangle({ x: 0, y: H - 133, width: W, height: 3, color: GOLD });
page.drawText('Controlling the Sky', { x: M, y: H - 54, size: 30, font: bold, color: WHITE });
page.drawText('Global Weather Modification Programs: A Research Synthesis', { x: M, y: H - 80, size: 14, font: regular, color: LIGHT });
page.drawText('Sources: WMO | GAO | U.S. Senate | Peer-Reviewed Journals | 2026-05-22', { x: M, y: H - 105, size: 9, font: italic, color: GOLD });
y = H - 148;

// ── Stats ──────────────────────────────────────────────────────────────────
y -= 10;
const bw = (CW - 20) / 3;
statBox('56',    'Countries with active\nweather modification programs', 'WMO, 2022', M, bw);
statBox('27',    'U.S. states with active\ncloud seeding programs', 'GAO-11-11, 2010', M + bw + 10, bw);
statBox('50,000+', 'Ground-based rocket launchers\nin China\'s program', 'Yao et al., 2021', M + 2 * (bw + 10), bw);
y -= 92;

// ── Executive Summary ─────────────────────────────────────────────────────
y -= 12;
heading1('Executive Summary');
drawText(
  'Weather modification — primarily cloud seeding — is practiced by over 56 countries and is a fully operational, government-funded technology. Programs range from the UAE\'s 30-year cloud seeding operation to China\'s program employing 50,000+ rocket launchers, to the U.S. government\'s own documented history including the classified military program Operation Popeye. Scientific evidence supports precipitation enhancement of 5-30% under suitable conditions, though rigorous evaluation remains the exception. The most consequential emerging form — stratospheric aerosol injection — operates at a planetary scale with no international governance.',
  regular, 11, NAVY, M, CW, 4
);
y -= 8;

// ── How Cloud Seeding Works ───────────────────────────────────────────────
heading1('How Cloud Seeding Works');
[
  'Silver iodide or hygroscopic flares provide nuclei for water droplets or ice crystals to form',
  'Delivered by aircraft or ground-based generators; targets must have sufficient cloud liquid water',
  'Optimal temperature range: -5 deg C to -25 deg C for ice-phase seeding',
  'Precipitation falls earlier and more efficiently than it would naturally',
  'Orographic clouds (mountains) and tropical convective clouds respond most reliably',
].forEach(b => bullet(b));
y -= 4;
citation('Xue et al. (2023) doi.org/10.1175/jamc-d-22-0132.1 | WMO (2022) library.wmo.int/records/item/60310');

// ── Global Programs ───────────────────────────────────────────────────────
need(200);
heading1('Global Programs — Selected Case Studies');

heading2('UAE: 30-Year Operational Program');
bullet('Continuous cloud seeding operations since 1990 using hygroscopic flares');
bullet('Statistical evaluation shows 10-15% precipitation increase in suitable cloud systems');
bullet('One of the world\'s most extensively documented government weather modification programs');
citation('Bruintjes et al. (2021) Atmosphere. doi.org/10.3390/atmos12081013');
y -= 4;

heading2('China: The World\'s Largest Program');
bullet('Over 50,000 ground-based rocket launchers operating across 23 provinces');
bullet('14th Five-Year Plan (2021-2025): expand coverage to 5.5 million km2');
bullet('Annual investment exceeds $1 billion; claimed results cannot be independently verified');
citation('Yao et al. (2021) Atmospheric Research. doi.org/10.1016/j.atmosres.2020.105183');
y -= 4;

need(120);
heading2('India: Randomized Scientific Trial (CAIPEEX)');
bullet('National cloud seeding experiment using randomized crossover design across multiple monsoon seasons');
bullet('Results show statistically significant rainfall increase in seeded vs. control clouds');
bullet('One of the few national programs to apply a true experimental design');
citation('Prabha et al. (2023) BAMS. doi.org/10.1175/bams-d-21-0291.1');
y -= 4;

need(120);
heading2('United States: 27 Active State Programs');
bullet('GAO confirmed 27 states with active weather modification programs as of 2010');
bullet('Primary uses: hail suppression and agricultural water supply augmentation');
bullet('No designated federal agency has authority to oversee or coordinate all programs');
citation('GAO Report GAO-11-11 (2010). gao.gov/products/gao-11-11');

// ── Does It Work ──────────────────────────────────────────────────────────
need(180);
heading1('Scientific Evidence: What the Research Shows');

heading2('Supporting Evidence');
bullet('WMO (2022): 5-30% precipitation enhancement achievable under suitable conditions [wmo2022]');
bullet('CAIPEEX India: statistically significant increase in randomized controlled trial [prabha2023]');
bullet('UAE 30-year record: 10-15% increase in suitable cloud systems [bruintjes2021]');
bullet('Karnataka India Varshadhare program: +24% daily rainfall in target areas [dani2019]');
bullet('WRF numerical model: 5-15% orographic enhancement confirmed computationally [xue2023]');
y -= 4;

heading2('Legitimate Skepticism');
bullet('Queensland randomized trial (BAMS 2012): NO statistically significant effect detected [soderholm2012]');
bullet('China\'s claimed results far exceed what peer-reviewed science predicts [yao2021]');
bullet('Most operational programs lack randomized control group designs [korhonen2023]');
bullet('Natural rainfall variability is often too large to detect a 10-15% seeding signal');
y -= 4;
citation('soderholm2012 | korhonen2023 | wmo2022 | prabha2023 — see bibliography');

// ── Military ──────────────────────────────────────────────────────────────
need(160);
heading1('When Governments Weaponized Weather');
[
  'Operation Popeye (1967-1972): classified U.S. military cloud seeding program over Vietnam, Laos, Cambodia',
  'Objective: extend the monsoon season to flood the Ho Chi Minh Trail and disrupt North Vietnamese supply lines',
  'Conducted over 2,600 cloud seeding missions; classified until revealed in 1971',
  'The program worked — military assessments confirmed increased rainfall in target corridors',
  'Led directly to the 1978 ENMOD Convention prohibiting hostile weather modification',
  'Source: U.S. Senate Commerce Committee report, 1978 — a declassified government record',
].forEach(b => bullet(b));
y -= 4;
citation('U.S. Senate (1978). govinfo.gov/content/pkg/CPRT-95SPRT21866/pdf/CPRT-95SPRT21866.pdf');

// ── SAI ───────────────────────────────────────────────────────────────────
need(160);
heading1('The Next Frontier: Stratospheric Aerosol Injection');
[
  'SAI injects sulfate aerosols into the stratosphere to reflect sunlight — planetary scale, not local',
  'Could reduce global temperature 1-2 deg C at $2-8B/year — far cheaper than emissions reduction',
  'Side effects: altered monsoon patterns globally, ozone thinning, regional drought in some areas',
  '"Termination shock": abrupt global warming if SAI is stopped suddenly after years of deployment',
  'No international governance framework exists; a single nation or wealthy actor could deploy unilaterally',
  'Distinct from cloud seeding — affects every country\'s precipitation whether they consent or not',
].forEach(b => bullet(b));
y -= 4;
citation('Talati et al. (2022) Earth\'s Future. doi.org/10.1029/2021EF002545');

// ── Governance ────────────────────────────────────────────────────────────
need(160);
heading1('The Governance Gap');
[
  'No U.S. federal agency has authority to oversee all weather modification programs (GAO 2010)',
  'No internationally binding framework governs transboundary cloud seeding (Korhonen et al. 2023)',
  'ENMOD (1978) only prohibits military use — civilian programs are unregulated internationally',
  'WMO calls for mandatory randomized evaluation and international notification protocols (WMO 2022)',
  'China\'s 5.5M km2 program expansion may affect precipitation in neighboring nations — no legal mechanism to address this',
].forEach(b => bullet(b));
y -= 4;
citation('gao2010 | korhonen2023 | wmo2022 | senate1978');

// ── Bibliography ──────────────────────────────────────────────────────────
need(200);
heading1('Bibliography');
const refs = [
  'Bruintjes et al. (2021). The UAE Cloud Seeding Program. Atmosphere 12(8):1013. doi.org/10.3390/atmos12081013',
  'Dani et al. (2019). Rainfall Enhancement in Karnataka. Atmospheric Research 221. doi.org/10.1016/J.ATMOSRES.2018.12.020',
  'GAO (2010). Weather Modification (GAO-11-11). gao.gov/products/gao-11-11',
  'Korhonen et al. (2023). Rethinking water security. npj Climate Atmos. Sci. doi.org/10.1038/s41612-023-00503-2',
  'Prabha et al. (2023). CAIPEEX cloud seeding experiment. BAMS 104. doi.org/10.1175/bams-d-21-0291.1',
  'Soderholm et al. (2012). Queensland Cloud Seeding Research Program. BAMS 93. doi.org/10.1175/BAMS-D-11-00060.1',
  'Talati et al. (2022). Stratospheric Aerosol Injection. Earth\'s Future 10. doi.org/10.1029/2021EF002545',
  'Theisen & Todey et al. (2021). Cloud Seeding and Crop Yields. Weather Climate Soc. doi.org/10.1175/wcas-d-21-0010.1',
  'U.S. Senate (1978). Weather Modification: Programs, Problems, Policy. govinfo.gov/content/pkg/CPRT-95SPRT21866/pdf/CPRT-95SPRT21866.pdf',
  'WMO (2022). Weather and Climate Modification. library.wmo.int/records/item/60310',
  'Xue et al. (2023). Numerical Evaluation of Ground-Based Cloud Seeding. J. Appl. Meteorol. doi.org/10.1175/jamc-d-22-0132.1',
  'Yao et al. (2021). China\'s Weather Modification Activities. Atmospheric Research 250. doi.org/10.1016/j.atmosres.2020.105183',
];
refs.forEach(r => {
  need(20);
  drawText(r, regular, 9, NAVY, M + 10, CW - 10, 3);
  y -= 2;
});

// ── Page numbers ──────────────────────────────────────────────────────────
pages.forEach((pg, i) => {
  pg.drawText(`Page ${i + 1} of ${pages.length}`, {
    x: W - M - 55, y: 22, size: 8, font: regular, color: GRAY,
  });
  pg.drawText('AI Knowledge Bits — Weather Modification Research Synthesis — 2026', {
    x: M, y: 22, size: 8, font: italic, color: GRAY,
  });
});

// ── Save ──────────────────────────────────────────────────────────────────
fs.writeFileSync(OUT, await pdfDoc.save());
console.log(`Generated: ${OUT}`);
console.log(`Pages: ${pages.length}`);
