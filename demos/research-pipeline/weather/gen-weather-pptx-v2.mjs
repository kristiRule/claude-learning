import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT    = path.join(__dirname, 'weather-modification-deck-v2.pptx');
const ASSETS = path.join(__dirname, 'assets');

const NAVY        = '1A1A2E';
const GOLD        = 'B8860B';
const WHITE       = 'FFFFFF';
const GRAY        = 'CCCCCC';
const LIGHT       = 'F0EDE6';
const PLACEHOLDER = 'E4E4E4';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

// ── Shared helpers ────────────────────────────────────────────────────────────

function addHeader(s, title) {
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: NAVY } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 1.1, w: 13.33, h: 0.06, fill: { color: GOLD } });
  s.addText(title, {
    x: 0.4, y: 0.08, w: 12.5, h: 0.95,
    fontSize: 24, bold: true, color: WHITE, fontFace: 'Arial', valign: 'middle',
  });
}

function addCitation(s, citation) {
  if (!citation) return;
  s.addShape(pres.ShapeType.rect, { x: 0, y: 6.9, w: 13.33, h: 0.6, fill: { color: LIGHT } });
  s.addText(citation, {
    x: 0.3, y: 6.95, w: 12.7, h: 0.45,
    fontSize: 9, color: '555555', fontFace: 'Arial', italic: true,
  });
}

// ── titleSlide ────────────────────────────────────────────────────────────────

function titleSlide(title, subtitle, note) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 5.8, w: 13.33, h: 1.7, fill: { color: GOLD } });
  s.addText(title, {
    x: 0.5, y: 1.5, w: 12.3, h: 3,
    fontSize: 44, bold: true, color: WHITE, fontFace: 'Arial',
    align: 'center', valign: 'middle', breakLine: false,
  });
  s.addText(subtitle, {
    x: 0.5, y: 4.6, w: 12.3, h: 1,
    fontSize: 18, color: LIGHT, fontFace: 'Arial', align: 'center', italic: true,
  });
  s.addText('Sources: WMO, NOAA, GAO, Peer-reviewed journals', {
    x: 0.5, y: 6.0, w: 12.3, h: 0.5,
    fontSize: 11, color: NAVY, fontFace: 'Arial', align: 'center',
  });
  if (note) s.addNotes(note);
  return s;
}

// ── contentSlide ──────────────────────────────────────────────────────────────

function contentSlide(title, bullets, note, citation) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, title);
  const bulletObjs = bullets.map(b => ({
    text: b, options: {
      fontSize: 17, color: NAVY, fontFace: 'Arial',
      bullet: { type: 'number', indent: 20 },
      paraSpaceAfter: 6,
    }
  }));
  s.addText(bulletObjs, { x: 0.5, y: 1.3, w: 12.3, h: 5.4, valign: 'top' });
  addCitation(s, citation);
  if (note) s.addNotes(note);
  return s;
}

// ── imageContentSlide — bullets left, real image or placeholder right ─────────
// imageSource: a file path string (uses real image) or placeholder label text

function imageContentSlide(title, bullets, imageSource, note, citation) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, title);

  const bulletObjs = bullets.map(b => ({
    text: b, options: {
      fontSize: 16, color: NAVY, fontFace: 'Arial',
      bullet: { type: 'number', indent: 20 },
      paraSpaceAfter: 10,
    }
  }));
  s.addText(bulletObjs, { x: 0.5, y: 1.3, w: 7.0, h: 5.4, valign: 'top' });

  const isFile = typeof imageSource === 'string' && fs.existsSync(imageSource);
  if (isFile) {
    const ext = path.extname(imageSource).slice(1).toLowerCase();
    s.addImage({ path: imageSource, x: 7.8, y: 1.4, w: 5.0, h: 5.2 });
  } else {
    s.addShape(pres.ShapeType.rect, {
      x: 7.8, y: 1.4, w: 5.0, h: 5.2,
      fill: { color: PLACEHOLDER },
      line: { color: GRAY, width: 1 },
    });
    s.addText(imageSource, {
      x: 7.8, y: 1.4, w: 5.0, h: 5.2,
      fontSize: 11, color: '777777', fontFace: 'Arial',
      align: 'center', valign: 'middle', italic: true,
    });
  }

  addCitation(s, citation);
  if (note) s.addNotes(note);
  return s;
}

// ── statSlide ─────────────────────────────────────────────────────────────────

function statSlide(title, stats, note, citation) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: GOLD } });
  s.addText(title, {
    x: 0.4, y: 0.1, w: 12.5, h: 0.9,
    fontSize: 26, bold: true, color: NAVY, fontFace: 'Arial', valign: 'middle',
  });

  const boxW = 3.8, boxH = 2.4, gap = 0.25;
  const startX = (13.33 - 3 * boxW - 2 * gap) / 2;
  stats.forEach((st, i) => {
    const x = startX + i * (boxW + gap);
    s.addShape(pres.ShapeType.rect, { x, y: 1.5, w: boxW, h: boxH, fill: { color: '16213E' }, line: { color: GOLD, width: 1.5 } });
    s.addText(st.number, { x, y: 1.6, w: boxW, h: 1.1, fontSize: 36, bold: true, color: GOLD, fontFace: 'Arial', align: 'center', valign: 'middle' });
    s.addText(st.label, { x, y: 2.7, w: boxW, h: 0.8, fontSize: 13, color: WHITE, fontFace: 'Arial', align: 'center', valign: 'middle' });
    s.addText(st.source, { x, y: 3.5, w: boxW, h: 0.35, fontSize: 9, color: GRAY, fontFace: 'Arial', align: 'center', italic: true });
  });

  if (citation) s.addText(citation, { x: 0.3, y: 6.95, w: 12.7, h: 0.45, fontSize: 9, color: GRAY, fontFace: 'Arial', italic: true });
  if (note) s.addNotes(note);
  return s;
}

// ── diagramSlide — 4-step process flow ───────────────────────────────────────

function diagramSlide(title, steps, note, citation) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, title);

  const boxW = 2.4, boxH = 3.6, arrowW = 0.55;
  const totalW = 4 * boxW + 3 * arrowW;
  const startX = (13.33 - totalW) / 2;
  const boxY = 1.9;

  steps.forEach((step, i) => {
    const x = startX + i * (boxW + arrowW);

    s.addShape(pres.ShapeType.rect, {
      x, y: boxY, w: boxW, h: boxH,
      fill: { color: NAVY }, line: { color: GOLD, width: 2 },
    });

    s.addShape(pres.ShapeType.rect, {
      x: x + boxW / 2 - 0.3, y: boxY + 0.15, w: 0.6, h: 0.55,
      fill: { color: GOLD },
    });
    s.addText(`${i + 1}`, {
      x: x + boxW / 2 - 0.3, y: boxY + 0.15, w: 0.6, h: 0.55,
      fontSize: 16, bold: true, color: NAVY, fontFace: 'Arial', align: 'center', valign: 'middle',
    });

    s.addText(step.title, {
      x: x + 0.1, y: boxY + 0.82, w: boxW - 0.2, h: 0.55,
      fontSize: 13, bold: true, color: GOLD, fontFace: 'Arial', align: 'center', valign: 'middle',
    });

    s.addText(step.desc, {
      x: x + 0.12, y: boxY + 1.5, w: boxW - 0.24, h: 1.9,
      fontSize: 11, color: LIGHT, fontFace: 'Arial', align: 'center', valign: 'top',
    });

    if (i < steps.length - 1) {
      s.addShape(pres.ShapeType.rightArrow, {
        x: x + boxW + 0.05, y: boxY + boxH / 2 - 0.2, w: arrowW - 0.1, h: 0.4,
        fill: { color: GOLD }, line: { color: GOLD },
      });
    }
  });

  addCitation(s, citation);
  if (note) s.addNotes(note);
  return s;
}

// ── programsGridSlide — 2x2 country panels ────────────────────────────────────

function programsGridSlide(title, countries, note, citation) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, title);

  const panelW = 6.3, panelH = 2.55, gap = 0.2;
  const startX = (13.33 - 2 * panelW - gap) / 2;
  const row1Y = 1.35, row2Y = row1Y + panelH + gap;

  countries.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (panelW + gap);
    const y = row === 0 ? row1Y : row2Y;

    s.addShape(pres.ShapeType.rect, { x, y, w: panelW, h: panelH, fill: { color: NAVY } });
    s.addShape(pres.ShapeType.rect, { x, y, w: panelW, h: 0.06, fill: { color: GOLD } });

    s.addText(`${c.flag}  ${c.country}`, {
      x: x + 0.2, y: y + 0.1, w: panelW - 0.4, h: 0.45,
      fontSize: 14, bold: true, color: GOLD, fontFace: 'Arial', valign: 'middle',
    });

    s.addText(c.number, {
      x: x + 0.15, y: y + 0.55, w: 2.1, h: 1.2,
      fontSize: 34, bold: true, color: WHITE, fontFace: 'Arial', valign: 'middle',
    });

    s.addText(c.stat, {
      x: x + 2.3, y: y + 0.6, w: panelW - 2.5, h: 1.1,
      fontSize: 12, color: LIGHT, fontFace: 'Arial', valign: 'middle',
    });

    s.addText(c.source, {
      x: x + 0.15, y: y + panelH - 0.4, w: panelW - 0.3, h: 0.35,
      fontSize: 9, color: GRAY, fontFace: 'Arial', italic: true, valign: 'middle',
    });
  });

  addCitation(s, citation);
  if (note) s.addNotes(note);
  return s;
}

// ── closingSlide ──────────────────────────────────────────────────────────────

function closingSlide() {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: GOLD } });
  s.addText('Key Takeaways', {
    x: 0.4, y: 0.1, w: 12.5, h: 0.9,
    fontSize: 26, bold: true, color: NAVY, fontFace: 'Arial', valign: 'middle',
  });

  const takeaways = [
    { num: '01', text: 'Weather modification is real. 56 countries operate active programs backed by governments and peer-reviewed science.' },
    { num: '02', text: 'It works under the right conditions. 5 to 30% precipitation enhancement is achievable, strongest in tropical and mountain settings.' },
    { num: '03', text: 'Governments have weaponized it. Operation Popeye used cloud seeding militarily in Vietnam (1967 to 1972), documented in the U.S. Senate record.' },
    { num: '04', text: 'The next frontier has no rules. Stratospheric aerosol injection could cool the planet but has zero international governance.' },
    { num: '05', text: 'The governance gap is the biggest risk. Scale and capability have outpaced policy and public awareness.' },
  ];

  takeaways.forEach((t, i) => {
    const y = 1.25 + i * 1.02;
    s.addShape(pres.ShapeType.rect, { x: 0.4, y, w: 0.7, h: 0.75, fill: { color: GOLD } });
    s.addText(t.num, { x: 0.4, y, w: 0.7, h: 0.75, fontSize: 18, bold: true, color: NAVY, fontFace: 'Arial', align: 'center', valign: 'middle' });
    s.addText(t.text, { x: 1.25, y: y + 0.05, w: 11.6, h: 0.65, fontSize: 14, color: WHITE, fontFace: 'Arial', valign: 'middle' });
  });

  s.addNotes('So here is what I want you to take away. Weather modification is real — fifty-six countries, peer-reviewed science, government funding. It works under the right conditions — the strongest evidence is in tropical and mountain settings. Governments have weaponized it — Operation Popeye is in the U.S. Senate record, available to anyone with a browser. Stratospheric aerosol injection operates at a planetary scale with no rules — and the cost is low enough that it is already within reach. And the governance gap is the most urgent problem — the capability exists, the programs are running, and the international frameworks to manage them do not. I am glad to share the full source list — everything I cited comes from WMO reports, GAO audits, peer-reviewed journals, or the U.S. Senate record. Not news articles. Not social media. Primary sources. Thank you. I am happy to take any questions.');
  return s;
}

// ── referencesSlide ───────────────────────────────────────────────────────────

function referencesSlide() {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: GOLD } });
  s.addText('Sources, References & Research Methodology', {
    x: 0.4, y: 0.1, w: 12.5, h: 0.9,
    fontSize: 20, bold: true, color: NAVY, fontFace: 'Arial', valign: 'middle',
  });

  // Column divider
  s.addShape(pres.ShapeType.rect, { x: 6.7, y: 1.18, w: 0.03, h: 4.3, fill: { color: GOLD } });

  const left = [
    { label: 'WMO (2022)',              detail: 'Weather Modification. library.wmo.int/records/item/60310' },
    { label: 'GAO (2010)',              detail: 'GAO-11-11. gao.gov/products/gao-11-11' },
    { label: 'U.S. Senate (1978)',      detail: 'Weather Modification Programs. govinfo.gov/content/pkg/CPRT-95SPRT21866' },
    { label: 'Prabha et al. (2023)',    detail: 'CAIPEEX. BAMS 104. doi.org/10.1175/bams-d-21-0291.1' },
    { label: 'Bruintjes et al. (2021)', detail: 'UAE Program. Atmosphere 12(8). doi.org/10.3390/atmos12081013' },
    { label: 'Yao et al. (2021)',       detail: 'China Programs. Atmos. Res. 250. doi.org/10.1016/j.atmosres.2020.105183' },
    { label: 'Talati et al. (2022)',    detail: 'SAI. Earth\'s Future 10. doi.org/10.1029/2021EF002545' },
  ];

  const right = [
    { label: 'Korhonen et al. (2023)',     detail: 'Water security. npj Clim. Atmos. Sci. doi.org/10.1038/s41612-023-00503-2' },
    { label: 'Soderholm et al. (2012)',    detail: 'Queensland trial. BAMS 93. doi.org/10.1175/BAMS-D-11-00060.1' },
    { label: 'Dani et al. (2019)',         detail: 'Karnataka. Atmos. Res. 221. doi.org/10.1016/J.ATMOSRES.2018.12.020' },
    { label: 'Xue et al. (2023)',          detail: 'Numerical eval. J. Appl. Meteorol. doi.org/10.1175/jamc-d-22-0132.1' },
    { label: 'Theisen & Todey (2021)',     detail: 'Crop yields. Weather Clim. Soc. doi.org/10.1175/wcas-d-21-0010.1' },
    { label: 'TDLR Texas',                detail: 'TX program summary. tdlr.texas.gov/weather/summary.htm' },
    { label: 'USU Extension (2025)',       detail: 'Utah cloud seeding. extension.usu.edu/climate/research/cloud-seeding' },
  ];

  const colY = 1.22, rowH = 0.62, labelW = 2.1, detailW = 4.0;

  left.forEach((ref, i) => {
    const y = colY + i * rowH;
    s.addText(ref.label, { x: 0.35, y, w: labelW, h: rowH - 0.06, fontSize: 9, bold: true, color: GOLD, fontFace: 'Arial', valign: 'top' });
    s.addText(ref.detail, { x: 0.35 + labelW + 0.08, y, w: detailW, h: rowH - 0.06, fontSize: 8, color: LIGHT, fontFace: 'Arial', valign: 'top' });
  });

  right.forEach((ref, i) => {
    const x = 6.85, y = colY + i * rowH;
    s.addText(ref.label, { x, y, w: labelW, h: rowH - 0.06, fontSize: 9, bold: true, color: GOLD, fontFace: 'Arial', valign: 'top' });
    s.addText(ref.detail, { x: x + labelW + 0.08, y, w: detailW, h: rowH - 0.06, fontSize: 8, color: LIGHT, fontFace: 'Arial', valign: 'top' });
  });

  // Research methodology bar
  const mY = 5.6;
  s.addShape(pres.ShapeType.rect, { x: 0, y: mY, w: 13.33, h: 0.04, fill: { color: GOLD } });
  s.addText('Research Methodology', {
    x: 0.35, y: mY + 0.1, w: 4.0, h: 0.35,
    fontSize: 10, bold: true, color: GOLD, fontFace: 'Arial',
  });
  s.addText('Discovery: Semantic Scholar Graph API  |  api.semanticscholar.org/graph/v1/paper/search', {
    x: 0.35, y: mY + 0.45, w: 6.0, h: 0.28,
    fontSize: 8.5, color: LIGHT, fontFace: 'Arial',
  });
  s.addText('Triage: 40/30/30 scoring rubric — 40% relevance to research question, 30% recency, 30% citation impact + source authority', {
    x: 0.35, y: mY + 0.72, w: 12.5, h: 0.28,
    fontSize: 8.5, color: LIGHT, fontFace: 'Arial',
  });
  s.addText('Authority tier: WMO / GAO / NASA / IPCC (high bonus) | AMS / AGU (medium) | Preprints (penalty)', {
    x: 0.35, y: mY + 0.98, w: 12.5, h: 0.28,
    fontSize: 8.5, color: LIGHT, fontFace: 'Arial',
  });
  s.addText('Thresholds: Primary source ≥ 0.70  |  Supporting 0.45–0.69  |  Review 0.25–0.44  |  Drop < 0.25', {
    x: 0.35, y: mY + 1.24, w: 12.5, h: 0.28,
    fontSize: 8.5, color: LIGHT, fontFace: 'Arial',
  });

  s.addNotes('This is for reference and for anyone who wants to dig deeper. Every claim in this presentation has a primary source — government reports, peer-reviewed journals, or the U.S. Senate record. None of it comes from news articles or secondary sources. The research was conducted using the Semantic Scholar API to surface papers, with a structured scoring rubric that weighted each paper by how directly it answered the research question, how recently it was published, and how widely it has been cited. Papers scoring below 0.45 were used only for supporting context. Papers scoring above 0.70 were treated as primary evidence. I am glad to share the full methodology and source list with anyone who wants it.');
  return s;
}

// ── SLIDES ────────────────────────────────────────────────────────────────────

// Slide 1: Title
titleSlide(
  'Controlling the Sky:\nGlobal Weather Modification Programs',
  'A research synthesis grounded in WMO, GAO, NOAA, and peer-reviewed science',
  'Good evening everyone. I want to talk about something that most people think is a conspiracy theory but is actually documented, funded, and operational in 56 countries right now. Weather modification. Not chemtrails, not something being secretly sprayed from unmarked planes — I mean government programs, peer-reviewed science, and a 1978 UN treaty that proves someone took it seriously enough to make it illegal as a weapon. By the end of this I want you to walk out knowing that controlling the weather is not a future technology. It is happening right now, and the question is not whether it works — it is who is doing it, why, and who is watching.'
);

// Slide 2: By the Numbers
statSlide(
  'This Is Already Happening — By the Numbers',
  [
    { number: '56',      label: 'Countries with active weather modification programs',   source: 'WMO, 2022' },
    { number: '27',      label: 'U.S. states with active cloud seeding programs',        source: 'GAO Report GAO-11-11, 2010' },
    { number: '50,000+', label: 'Ground-based rocket launchers in China\'s program',     source: 'Yao et al., Atmos. Res. 2021' },
  ],
  'Let\'s start with three numbers. Fifty-six. That is the number of countries with active, government-funded weather modification programs according to the World Meteorological Organization in 2022. Not research programs — operational programs. Twenty-seven. That is the number of U.S. states with active cloud seeding programs, confirmed by the Government Accountability Office in 2010. The GAO is the nonpartisan federal watchdog — this is not a fringe source. And fifty thousand. That is the number of ground-based rocket launchers China operates across 23 provinces for weather modification. Fifty thousand rocket launchers, aimed at the sky, backed by over a billion dollars a year in government funding. This is not experimental. This is policy.',
  'Sources: WMO (2022) library.wmo.int | GAO-11-11 gao.gov/products/gao-11-11 | Yao et al. (2021) doi.org/10.1016/j.atmosres.2020.105183'
);

// Slide 3: How Cloud Seeding Works (shape diagram)
diagramSlide(
  'How Cloud Seeding Works',
  [
    { title: 'Delivery',      desc: 'Aircraft or ground-based generator carries seeding agents into or near target clouds' },
    { title: 'Dispersal',     desc: 'Silver iodide or hygroscopic flares released into the cloud at the optimal temperature window' },
    { title: 'Nucleation',    desc: 'Seeding particles become nuclei — ice crystals or water droplets form around them' },
    { title: 'Precipitation', desc: 'Rain or snow falls earlier and more efficiently than the cloud would produce naturally' },
  ],
  'So how does it actually work? Step one: a plane or a ground-based generator releases a seeding agent into or near a cloud. The most common agent is silver iodide, which has a crystal structure almost identical to ice. It gives water droplets something to freeze around — think of it as a fake ice seed. Step two: those particles disperse through the cloud. The optimal temperature window is negative five to negative twenty-five degrees Celsius, which is where ice-phase seeding works best. Step three: water droplets and ice crystals form around the particles in a process called nucleation — which just means something small becomes the seed for something bigger. Dust does this naturally in the atmosphere all the time. Step four: precipitation falls earlier and more efficiently than it would have on its own. The cloud does not produce more water than it contains. It just releases what it has, sooner, and more of it reaches the ground.',
  'Sources: Xue et al. (2023) doi.org/10.1175/jamc-d-22-0132.1 | WMO (2022) library.wmo.int/records/item/60310'
);

// Slide 3b: Cloud Seeding Process — NAWMC diagram
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 'The Orographic Cloud Seeding Process');
  s.addImage({ path: path.join(ASSETS, 'cloudseedinghowto.png'), x: 0.4, y: 1.25, w: 12.5, h: 5.6 });
  addCitation(s, 'Source: North American Weather Modification Council (NAWMC)  |  nawmc.org');
  s.addNotes('This diagram from the North American Weather Modification Council shows exactly how orographic cloud seeding works in practice. Notice the numbered steps. One: a ground-based generator at the base of the mountain emits silver iodide particles. Two: the particles are carried upward by the natural air flow as it rises over the terrain. Three: in the supercooled liquid water zone — that orange band — the silver iodide particles act as artificial ice nuclei. Four: ice crystals and snowflakes form around those particles. And the result is additional snowfall on the lee side of the mountain that would not have occurred naturally. The key terms in the legend: silver iodide is the seeding agent, supercooled liquid water or SLW is the cloud zone where temperatures are below freezing but water is still in liquid form, and ice crystals and snowflakes are the desired output. This is not experimental technology. This diagram represents decades of operational practice across the Mountain West.');
}

// Slide 4: Global Programs (2x2 grid)
programsGridSlide(
  'A Global Practice — Active Programs by Country',
  [
    {
      flag: '🇦🇪', country: 'United Arab Emirates',
      number: '10-15%',
      stat: 'Precipitation increase documented over 30 years of continuous cloud seeding operations since 1990',
      source: 'Bruintjes et al., Atmosphere 2021',
    },
    {
      flag: '🇨🇳', country: 'China',
      number: '50,000+',
      stat: 'Rocket launchers across 23 provinces; $1B+ annual investment and 5.5M km2 expansion target by 2025',
      source: 'Yao et al., Atmospheric Research 2021',
    },
    {
      flag: '🇮🇳', country: 'India (CAIPEEX)',
      number: 'p < 0.05',
      stat: 'Statistically significant rainfall increase in the national randomized cloud seeding experiment',
      source: 'Prabha et al., BAMS 2023',
    },
    {
      flag: '🇺🇸', country: 'United States',
      number: '27',
      stat: 'States with active programs for hail suppression and water supply augmentation, confirmed by federal audit',
      source: 'GAO Report GAO-11-11, 2010',
    },
  ],
  'This is happening everywhere. The UAE has been running continuous cloud seeding since 1990 — thirty-five years — and their data shows ten to fifteen percent more precipitation in targeted cloud systems. China has fifty thousand rocket launchers across twenty-three provinces and is expanding coverage to an area larger than India. India ran a program called CAIPEEX — the Cloud Aerosol Interaction and Precipitation Enhancement Experiment — which used a randomized controlled design, the same as a clinical drug trial, and found statistically significant increases in rainfall. The p value there — p less than 0.05 — just means the result was unlikely to be random chance. It passed the same bar as a published clinical trial. And the United States has twenty-seven active state programs, confirmed by a federal audit in 2010, mostly targeting hail suppression and agricultural water supply. This is not exotic technology. This is water infrastructure.',
  'Sources: bruintjes2021 | yao2021 | prabha2023 | gao2010'
);

// Slide 5: Closer to Home overview (US map)
imageContentSlide(
  'Closer to Home: Active U.S. State Programs',
  [
    'The GAO confirmed 27 states with active cloud seeding programs in 2010 — many are still running today',
    'Programs across the American West target snowpack augmentation for water supply and spring runoff',
    'Cost advantage: cloud-seeded water costs $5 to $10 per acre-foot vs. $3,000 per acre-foot for desalination',
    'No single federal agency has authority to coordinate or oversee all state programs (GAO 2010)',
    'The next five slides take a closer look at five active states',
  ],
  path.join(ASSETS, 'us-states-map.png'),
  'Let me bring this home. The twenty-seven states confirmed by the GAO in 2010 are not just numbers on a report. Many of those programs are still running today. The American West has been quietly operating weather modification infrastructure for decades, mostly targeting mountain snowpack because snowpack is how the West stores water. It melts slowly in spring and feeds the rivers and reservoirs that supply cities and farms. Cloud seeding makes that snowpack larger and more reliable. The cost comparison is striking: cloud-seeded water costs five to ten dollars per acre-foot. An acre-foot is roughly the amount of water a typical household uses in a year. Producing that same acre-foot through desalination costs about three thousand dollars. Cloud seeding is not a climate solution. But as a water supply tool in the Mountain West, it is extraordinarily cost-effective. The next few slides go state by state.',
  'Source: GAO-11-11 (2010)  |  gao.gov/products/gao-11-11'
);

// Slide 5a: Texas
imageContentSlide(
  'Texas — Agriculture & Hail Suppression',
  [
    '5 active programs: West TX, South TX, Panhandle, Trans Pecos, and Rolling Plains',
    'Combined coverage: 31 million acres — one sixth of the entire state',
    'State-regulated since 1967 via the Texas Department of Licensing and Regulation (TDLR)',
    'Primary goals: enhance rainfall for dryland agriculture and suppress hail damage to crops',
    'State contributed $13.2M in program funding between 1997 and 2004; now locally funded by water districts',
  ],
  path.join(ASSETS, 'state-texas-photo.png'),
  'Texas is the most extensive cloud seeding operation in the United States by land area. Five separate regional programs cover thirty-one million acres — that is one sixth of the entire state. Texas established its weather modification law in 1967, making it one of the earliest states to formally regulate the practice. The Texas Department of Licensing and Regulation licenses every operator and publishes annual operational reports. The programs serve two primary purposes: enhancing rainfall for dryland agriculture in the arid west and central regions, and suppressing hail. Hail causes hundreds of millions of dollars in crop and property damage across Texas every year. Cloud seeding disrupts hail formation by introducing more nucleation sites, which produces smaller ice particles that melt before reaching the ground. The state funded the program directly through 2004. Today it is sustained by underground water conservation districts — local entities that have decided cloud seeding is worth paying for.',
  'Source: TDLR Texas  |  tdlr.texas.gov/weather/summary.htm'
);

// Slide 5b: Utah
imageContentSlide(
  'Utah — Snowpack Augmentation for the Colorado River',
  [
    '185 remote-controlled ground generators operating statewide',
    '$17M state legislative investment in 2023 — largest single appropriation in program history',
    'Documented 3 to 13% snowpack increase in target areas (USU Extension)',
    'Program co-funded by Arizona, California, and Nevada — downstream Colorado River users',
    'Water produced at $5 to $10 per acre-foot vs. $3,000 per acre-foot for desalination',
  ],
  path.join(ASSETS, 'state-utah-photo.jpg'),
  'Utah\'s program is probably the most consequential cloud seeding operation in the American West, because it is not just about Utah. The snowpack that accumulates in Utah\'s Wasatch and Uinta mountains feeds the Colorado River — the primary water source for forty million people across seven states and parts of Mexico. When Utah seeds clouds to increase snowpack, the downstream beneficiaries include Phoenix, Las Vegas, Los Angeles, and the agricultural regions of California and Arizona. That is why Arizona, California, and Nevada co-fund Utah\'s program. They are buying water security upstream. The legislature\'s seventeen million dollar investment in 2023 was the largest single appropriation in the program\'s history, driven by drought and declining reservoir levels at Lake Powell and Lake Mead. A hundred and eighty-five remote-controlled ground generators are positioned across the state, operated by technicians who monitor weather conditions and activate them when clouds are seeding-ready.',
  'Source: USU Extension (2025)  |  extension.usu.edu/climate/research/cloud-seeding-enhancing-winter-snowpack'
);

// Slide 5c: Colorado
imageContentSlide(
  'Colorado — Western Slope Snowpack & Ski Industry',
  [
    '7 permitted winter cloud seeding projects on the Western Slope',
    'Administered by the Colorado Water Conservation Board — a state agency',
    'Targets orographic clouds over the Rocky Mountains during storm events',
    'Supports both agricultural irrigation and the $5B+ ski and outdoor recreation industry',
    'Interest surged in 2026 after one of the worst snowpack seasons on record',
  ],
  path.join(ASSETS, 'state-colorado.png'),
  'Colorado has seven permitted winter cloud seeding projects on the Western Slope, all administered through the Colorado Water Conservation Board. The Western Slope is the part of Colorado west of the Continental Divide, where snowpack is the primary water source for both agriculture and the Colorado River system. The target is orographic clouds — clouds that form when moisture-laden air is forced upward over the Rocky Mountains. These clouds are ideal seeding targets because the terrain forces the air upward predictably, creating consistent conditions for ice crystal formation. Colorado\'s program serves two intersecting interests: agricultural water supply for the farms and ranches of western Colorado, and snowpack for the ski and outdoor recreation industry, which contributes more than five billion dollars annually to the state\'s economy. After this year\'s historically bad snowpack, the Water Conservation Board received inquiries from ski resorts looking to co-fund expanded seeding operations.',
  'Source: KUNC (April 2026)  |  Colorado Water Conservation Board'
);

// Slide 5d: Idaho
imageContentSlide(
  'Idaho — Mountain Snowpack for Agricultural Runoff',
  [
    'Active cloud seeding program targeting mountain snowpack for spring agricultural runoff',
    'Expanding as part of coordinated Western states water management effort',
    'Mountain snowmelt feeds the Snake River — the primary water source for Idaho agriculture',
    'Idaho agriculture generates $8B+ annually; spring runoff timing is critical for irrigation',
    'Program operates in coordination with Wyoming, Utah, and Colorado basin management',
  ],
  path.join(ASSETS, 'cloudseedmachine.jpg'),
  'Idaho\'s cloud seeding program targets mountain snowpack in the ranges that feed the Snake River, which is the backbone of Idaho\'s agricultural water supply. Idaho agriculture generates more than eight billion dollars annually — potatoes, dairy, beef, barley, and trout — and virtually all of it depends on reliable spring runoff from snowpack. The timing and volume of that runoff determines how much water farmers can draw for irrigation through the summer. Cloud seeding during winter storm events increases snowpack accumulation, which translates directly to more water available when it melts in April and May. Idaho has been expanding its program in recent years as part of a coordinated effort among Western states to actively manage water supplies in the face of persistent drought. The program operates in coordination with Wyoming, Utah, and Colorado through shared basin management frameworks — because the water does not stop at state lines.',
  'Source: GAO-11-11 (2010)  |  Western Governors\' Association'
);

// Slide 5e: Arizona
imageContentSlide(
  'Arizona — Upstream Investment, No In-State Program Yet',
  [
    'No active in-state cloud seeding program as of 2026',
    'Central Arizona Project (CAP) co-funds cloud seeding in Utah and Colorado',
    'CAP delivers Colorado River water to Phoenix and Tucson — 5M+ residents',
    'Arizona state legislature reviewing feasibility legislation (HB2056)',
    'Strategy: seed upstream where mountain clouds exist; capture the benefit downstream',
  ],
  path.join(ASSETS, 'state-arizona.png'),
  'Arizona is a case study in regional water politics. The state has no active cloud seeding program of its own — Arizona\'s desert climate does not produce the orographic mountain clouds that make seeding effective. But Arizona is one of the largest funders of cloud seeding in the country, because the Central Arizona Project co-funds programs in Utah and Colorado. The CAP is a massive aqueduct system that carries Colorado River water three hundred miles from Lake Havasu to Phoenix and Tucson, serving more than five million residents. When Utah and Colorado seed clouds and increase snowpack, more water flows into the Colorado River, more water reaches Lake Mead and Lake Powell, and more water is available for the CAP to deliver to Arizona cities. It is a pragmatic solution: seed where the clouds are, collect the water where the people are. The Arizona legislature is also currently reviewing HB2056, a feasibility bill that would explore direct in-state weather modification for monsoon enhancement.',
  'Source: Central Arizona Project  |  AZ Legislature HB2056  |  GAO-11-11 (2010)'
);

// Slide 6: Evidence — Positive (with bar chart)
imageContentSlide(
  'The Evidence: It Works — Under the Right Conditions',
  [
    'WMO (2022): 5 to 30% precipitation enhancement achievable under suitable conditions',
    'India CAIPEEX: statistically significant increase in randomized controlled trial (Prabha et al. 2023)',
    'UAE 30-year program: 10 to 15% increase in suitable cloud systems (Bruintjes et al. 2021)',
    'Karnataka, India: +24% daily rainfall in seeded target areas (Dani et al. 2019)',
    'WRF numerical model: 5 to 15% orographic enhancement confirmed computationally (Xue et al. 2023)',
  ],
  path.join(ASSETS, 'evidence-chart.png'),
  'So does it actually work? The evidence says yes, under the right conditions. The World Meteorological Organization — the United Nations agency for global weather science — reviewed the full body of research in 2022 and concluded that five to thirty percent precipitation enhancement is achievable when the cloud conditions are right. India\'s national randomized trial confirmed statistically significant rainfall increases. The UAE\'s thirty-year operational record shows ten to fifteen percent more precipitation in targeted systems. A program in Karnataka, India reported twenty-four percent more daily rainfall in seeded areas. And the Weather Research and Forecasting model — an industry-standard numerical simulation — confirmed five to fifteen percent enhancement in orographic clouds, which are mountain clouds. Mountain clouds form when moist air is forced upward by terrain, which makes them predictable and consistent targets. That is why the strongest results consistently come from mountain and tropical settings.',
  'Sources: prabha2023 | bruintjes2021 | dani2019 | xue2023 | wmo2022'
);

// Slide 7: Evidence — Skepticism (with Queensland map)
imageContentSlide(
  'The Evidence: Legitimate Reasons for Skepticism',
  [
    'Queensland randomized trial (Australia): NO statistically significant effect detected (Soderholm et al. 2012)',
    'China\'s claimed results cannot be independently verified — no randomized controls, data not publicly accessible (Yao et al. 2021)',
    'Most programs worldwide lack randomized control group designs (Korhonen et al. 2023)',
    'Efficacy is highly dependent on cloud type and climate regime — not universal',
    'Natural rainfall variability is often too large to detect a 10 to 15% seeding signal without many years of data',
  ],
  path.join(ASSETS, 'queensland-map.png'),
  'But I want to be honest with you, because this is where the science gets complicated. A rigorous randomized trial in Queensland, Australia — published in the Bulletin of the American Meteorological Society — found no statistically significant effect at all. Zero. And that is a completely valid scientific result. It tells us something important: cloud seeding does not work the same way everywhere. Subtropical maritime clouds off the Queensland coast respond very differently from tropical monsoon clouds in India or mountain clouds in the UAE. And China\'s claimed results — hundreds of billions of cubic meters of additional rainfall every year — far exceed anything peer-reviewed science predicts is achievable, and the data is not independently accessible. Most operational programs worldwide have never been rigorously evaluated. The core problem is this: if rainfall varies by thirty percent year to year naturally, detecting a ten percent seeding signal requires years of careful randomized data. Most programs have never done that work. So the honest answer is: it works in some places, for some cloud types, under some conditions — and for most programs, we genuinely do not know.',
  'Sources: soderholm2012 | korhonen2023 | yao2021'
);

// Slide 7: Operation Popeye (image layout)
imageContentSlide(
  'When Governments Weaponized Weather: Operation Popeye',
  [
    'Classified U.S. military cloud seeding program over Vietnam, Laos, and Cambodia (1967 to 1972)',
    'Objective: extend the monsoon season to flood the Ho Chi Minh Trail and disrupt North Vietnamese supply lines',
    '2,600+ cloud seeding missions; declassified only after journalist Jack Anderson revealed the program in 1971',
    'Led directly to the 1978 ENMOD Convention — the UN treaty prohibiting hostile use of weather modification',
  ],
  path.join(ASSETS, 'popeye-aircraft.png'),
  'Now I want to tell you about the moment weather modification stopped being about agriculture and became a weapon. From 1967 to 1972, the United States military ran a classified program called Operation Popeye over Vietnam, Laos, and Cambodia. The objective was to extend the monsoon season — to make it rain longer, harder, and in exactly the right places to flood the Ho Chi Minh Trail and make it impassable for North Vietnamese supply lines. They flew more than twenty-six hundred cloud seeding missions. The program was classified until journalist Jack Anderson revealed it in 1971. It was confirmed by the U.S. Senate Commerce Committee in 1978 — this is a declassified government document in the Congressional Record, available at govinfo.gov right now. And the program worked well enough that in 1978, the United Nations passed the Environmental Modification Convention — a treaty specifically banning the hostile use of weather modification. Think about that. The international community decided this was dangerous enough to prohibit by treaty. The treaty covers military use only. Civilian programs are completely unregulated internationally.',
  'Source: U.S. Senate Committee on Commerce, Science, and Transportation (1978) govinfo.gov/content/pkg/CPRT-95SPRT21866/pdf/CPRT-95SPRT21866.pdf'
);

// Slide 8b: Operation Popeye — reality on the ground (two images + bullets)
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, 'The Reality on the Ground');

  const bulletObjs = [
    'Monsoon extension meant sustained torrential rain for weeks beyond the natural season',
    'The Ho Chi Minh Trail became a sea of mud — roads washed out, vehicles submerged, supply lines severed',
    'U.S. military assessment confirmed: the extended monsoon achieved meaningful disruption of enemy logistics',
    'The program\'s effectiveness is exactly what made it politically dangerous — and drove the 1978 treaty',
  ].map(b => ({ text: b, options: { fontSize: 15, color: NAVY, fontFace: 'Arial', bullet: { type: 'number', indent: 20 }, paraSpaceAfter: 8 } }));
  s.addText(bulletObjs, { x: 0.5, y: 1.3, w: 6.8, h: 5.4, valign: 'top' });

  // Soldiers photo (top right)
  s.addImage({ path: path.join(ASSETS, 'popeye-soldiers.png'), x: 7.6, y: 1.3, w: 5.3, h: 3.1 });
  // Newspaper clipping (bottom right)
  s.addImage({ path: path.join(ASSETS, 'popeye-newspaper.jpg'), x: 7.6, y: 4.5, w: 5.3, h: 2.1 });

  addCitation(s, 'Source: U.S. Senate Commerce Committee (1978). govinfo.gov/content/pkg/CPRT-95SPRT21866/pdf/CPRT-95SPRT21866.pdf');
  s.addNotes('I want you to sit with this for a moment. The goal of Operation Popeye was not to make it rain. The goal was to make it so miserable, so relentlessly wet, for so many extra weeks, that the supply lines moving weapons and troops through the jungle would collapse under the mud. And it worked. This is not a hypothetical. The U.S. military\'s own assessment confirmed that cloud seeding achieved measurable disruption of enemy logistics. The soldiers in that photo are wading through floodwater that should not have been there. That is not an act of nature. That is a weapons program. The reason this matters today is not that anyone is necessarily doing this right now. It is that we know it is possible, we know it was done, and the treaty that was supposed to prevent it — ENMOD — only covers military use. Civilian programs that cross international borders and affect another country\'s water supply? Completely unregulated.');
}

// Slide 9: Stratospheric Aerosol Injection (image layout)
imageContentSlide(
  'The Next Frontier: Stratospheric Aerosol Injection',
  [
    'SAI injects sulfate aerosols into the stratosphere to reflect sunlight — planetary scale, not local',
    'Could reduce global temperature 1 to 2°C at $2 to 8B/year, far cheaper than emissions reduction',
    '"Termination shock" — abrupt warming occurs if SAI is stopped suddenly after years of deployment',
    'A single nation or wealthy actor could deploy unilaterally; no international governance exists',
  ],
  path.join(ASSETS, 'sai-photo.png'),
  'Everything I have described so far is local. Cloud seeding targets specific clouds in a specific region. What I am about to describe is planetary. Stratospheric Aerosol Injection — SAI — is a proposed intervention where sulfate aerosols are injected into the stratosphere, the layer of atmosphere between twelve and fifty kilometers above Earth\'s surface, to reflect sunlight and cool the planet. We have a natural proof of concept: in 1991, Mount Pinatubo erupted and ejected aerosols into the stratosphere, reducing global temperatures by about half a degree Celsius for eighteen months. SAI would do that deliberately and continuously. Climate models project one to two degrees of cooling achievable at two to eight billion dollars per year — which sounds like a lot until you compare it to the cost of unchecked warming. But there are two catastrophic risks. First, side effects: disrupted monsoon patterns, regional droughts, ozone thinning. Second, termination shock: if SAI is deployed for twenty years and then stopped suddenly — due to war, political collapse, or funding failure — the warming it was masking comes back all at once, faster than anything gradual climate change would have produced. And the part that should concern everyone in this room: there is currently no international governance framework for SAI. A single nation, or a single wealthy individual, could begin deployment unilaterally with no requirement for consent from anyone else on the planet.',
  'Source: Talati et al. (2022) Earth\'s Future. doi.org/10.1029/2021EF002545'
);

// Slide 9: Governance Gap (image layout)
imageContentSlide(
  'The Governance Gap',
  [
    'No U.S. federal agency has authority to oversee all weather modification programs (GAO 2010)',
    'ENMOD (1978) only bans military use — civilian transboundary cloud seeding has no international framework',
    'China\'s 5.5M km2 expansion may reduce rainfall in India, Kazakhstan, and Russia with no legal remedy',
    'WMO calls for mandatory randomized evaluation and international notification protocols (WMO 2022)',
  ],
  path.join(ASSETS, 'world-map.png'),
  'So here is where we actually are. The Government Accountability Office confirmed in 2010 that no single U.S. federal agency has authority to oversee all domestic weather modification programs. That was fifteen years ago. Nothing has changed. Internationally, the only relevant treaty — the 1978 Environmental Modification Convention — only prohibits military use. A country can run cloud seeding operations whose effects drift across international borders with no legal obligation to notify neighbors, share data, or compensate for reduced rainfall downstream. China is expanding its weather modification coverage to five and a half million square kilometers — an area larger than India — and there is no legal mechanism for any neighboring country to object, demand prior notification, or seek remedy if their rainfall decreases as a result. The World Meteorological Organization has called for mandatory randomized evaluation so we actually know what works, and for international prior-notification protocols so affected countries have advance warning. No one has acted on it. The technology is real. The programs are running. The rules do not exist.',
  'Sources: gao2010 | korhonen2023 | wmo2022 | senate1978'
);

// Slide 11: Key Takeaways
closingSlide();

// Slide 12: Sources & References
referencesSlide();

// Slide 13: Happy Birthday Ryan
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Gold bar top
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.18, fill: { color: GOLD } });
  // Gold bar bottom
  s.addShape(pres.ShapeType.rect, { x: 0, y: 7.32, w: 13.33, h: 0.18, fill: { color: GOLD } });

  // CONSPIRACON 2026 label
  s.addText('CONSPIRACON 2026', {
    x: 0.4, y: 0.25, w: 12.5, h: 0.5,
    fontSize: 14, bold: true, color: GOLD, fontFace: 'Arial',
    align: 'center', charSpacing: 4,
  });

  // Main birthday text
  s.addText('Happy Birthday,', {
    x: 0.4, y: 1.0, w: 7.8, h: 1.0,
    fontSize: 36, bold: false, color: LIGHT, fontFace: 'Arial',
    align: 'left', valign: 'middle',
  });
  s.addText('Ryan!', {
    x: 0.4, y: 1.9, w: 7.8, h: 1.6,
    fontSize: 96, bold: true, color: GOLD, fontFace: 'Arial',
    align: 'left', valign: 'middle',
  });

  // Age callout
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 3.7, w: 4.6, h: 0.75, fill: { color: GOLD } });
  s.addText('THE BIG 4-0', {
    x: 0.4, y: 3.7, w: 4.6, h: 0.75,
    fontSize: 22, bold: true, color: NAVY, fontFace: 'Arial',
    align: 'center', valign: 'middle', charSpacing: 2,
  });

  // Flavor text
  s.addText(
    'Thank you for indulging this particular rabbit hole.\nAnd for every other one before it.',
    {
      x: 0.4, y: 4.65, w: 7.4, h: 1.4,
      fontSize: 16, color: LIGHT, fontFace: 'Arial',
      align: 'left', valign: 'top',
    }
  );

  // Photo (right side) — swap path once ryan photo is in assets
  const ryanPhoto = path.join(ASSETS, 'ryan.png');
  if (fs.existsSync(ryanPhoto)) {
    s.addImage({ path: ryanPhoto, x: 8.5, y: 0.5, w: 4.5, h: 6.5 });
  } else {
    s.addShape(pres.ShapeType.rect, { x: 8.5, y: 0.5, w: 4.5, h: 6.5, fill: { color: PLACEHOLDER } });
    s.addText('[ Photo of Ryan ]', {
      x: 8.5, y: 3.0, w: 4.5, h: 1.0,
      fontSize: 14, color: '888888', fontFace: 'Arial', align: 'center', italic: true,
    });
  }

  s.addNotes('I lied. There is one more slide. Ryan, you are forty years old today, and I love you. Thank you for letting me inflict a conspiracy-adjacent weather research presentation on everyone at your birthday party. I hope the fact that it was all peer-reviewed and government-documented makes it at least slightly more acceptable. Happy birthday. Conspiracon 2026.');
}

// ── Save ──────────────────────────────────────────────────────────────────────

await pres.writeFile({ fileName: OUT });
console.log(`Generated: ${OUT}`);
console.log(`Slides: 19  (~12 min + Q&A reference)`);
