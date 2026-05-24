import pptxgen from 'pptxgenjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'weather-modification-deck.pptx');

// ── Brand ─────────────────────────────────────────────────────────────────────
const NAVY  = '1A1A2E';
const GOLD  = 'B8860B';
const WHITE = 'FFFFFF';
const GRAY  = 'CCCCCC';
const LIGHT = 'F0EDE6';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

// ── Helpers ───────────────────────────────────────────────────────────────────

function titleSlide(title, subtitle) {
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
  return s;
}

function contentSlide(title, bullets, note, citation) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  // Gold header bar
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: NAVY } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 1.1, w: 13.33, h: 0.06, fill: { color: GOLD } });
  s.addText(title, {
    x: 0.4, y: 0.08, w: 12.5, h: 0.95,
    fontSize: 24, bold: true, color: WHITE, fontFace: 'Arial', valign: 'middle',
  });
  // Bullets
  const bulletObjs = bullets.map(b => ({
    text: b, options: {
      fontSize: 17, color: NAVY, fontFace: 'Arial',
      bullet: { type: 'number', indent: 20 },
      paraSpaceAfter: 6,
    }
  }));
  s.addText(bulletObjs, { x: 0.5, y: 1.3, w: 12.3, h: 5.4, valign: 'top' });
  // Citation footer
  if (citation) {
    s.addShape(pres.ShapeType.rect, { x: 0, y: 6.9, w: 13.33, h: 0.6, fill: { color: LIGHT } });
    s.addText(citation, {
      x: 0.3, y: 6.95, w: 12.7, h: 0.45,
      fontSize: 9, color: '555555', fontFace: 'Arial', italic: true,
    });
  }
  if (note) s.addNotes(note);
  return s;
}

function splitSlide(title, leftBullets, rightBullets, leftLabel, rightLabel, note, citation) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: NAVY } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 1.1, w: 13.33, h: 0.06, fill: { color: GOLD } });
  s.addText(title, { x: 0.4, y: 0.08, w: 12.5, h: 0.95, fontSize: 24, bold: true, color: WHITE, fontFace: 'Arial', valign: 'middle' });

  // Divider
  s.addShape(pres.ShapeType.rect, { x: 6.55, y: 1.25, w: 0.04, h: 5.5, fill: { color: GRAY } });

  // Left
  s.addText(leftLabel, { x: 0.4, y: 1.3, w: 5.9, h: 0.4, fontSize: 13, bold: true, color: GOLD, fontFace: 'Arial' });
  s.addText(leftBullets.map(b => ({ text: b, options: { fontSize: 15, color: NAVY, fontFace: 'Arial', bullet: { char: '✓' }, paraSpaceAfter: 5 } })),
    { x: 0.4, y: 1.75, w: 5.9, h: 4.9, valign: 'top' });

  // Right
  s.addText(rightLabel, { x: 6.75, y: 1.3, w: 6.1, h: 0.4, fontSize: 13, bold: true, color: GOLD, fontFace: 'Arial' });
  s.addText(rightBullets.map(b => ({ text: b, options: { fontSize: 15, color: NAVY, fontFace: 'Arial', bullet: { char: '⚠' }, paraSpaceAfter: 5 } })),
    { x: 6.75, y: 1.75, w: 6.1, h: 4.9, valign: 'top' });

  if (citation) {
    s.addShape(pres.ShapeType.rect, { x: 0, y: 6.9, w: 13.33, h: 0.6, fill: { color: LIGHT } });
    s.addText(citation, { x: 0.3, y: 6.95, w: 12.7, h: 0.45, fontSize: 9, color: '555555', fontFace: 'Arial', italic: true });
  }
  if (note) s.addNotes(note);
  return s;
}

function statSlide(title, stats, note, citation) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: GOLD } });
  s.addText(title, { x: 0.4, y: 0.1, w: 12.5, h: 0.9, fontSize: 26, bold: true, color: NAVY, fontFace: 'Arial', valign: 'middle' });

  const boxW = 3.8, boxH = 2.4, gap = 0.25;
  const startX = (13.33 - 3 * boxW - 2 * gap) / 2;
  stats.forEach((st, i) => {
    const x = startX + i * (boxW + gap);
    s.addShape(pres.ShapeType.rect, { x, y: 1.5, w: boxW, h: boxH, fill: { color: '16213E' }, line: { color: GOLD, width: 1.5 } });
    s.addText(st.number, { x, y: 1.6, w: boxW, h: 1.1, fontSize: 36, bold: true, color: GOLD, fontFace: 'Arial', align: 'center', valign: 'middle' });
    s.addText(st.label, { x, y: 2.7, w: boxW, h: 0.8, fontSize: 13, color: WHITE, fontFace: 'Arial', align: 'center', valign: 'middle' });
    s.addText(st.source, { x, y: 3.5, w: boxW, h: 0.35, fontSize: 9, color: GRAY, fontFace: 'Arial', align: 'center', italic: true });
  });

  if (citation) {
    s.addText(citation, { x: 0.3, y: 6.95, w: 12.7, h: 0.45, fontSize: 9, color: GRAY, fontFace: 'Arial', italic: true });
  }
  if (note) s.addNotes(note);
  return s;
}

function closingSlide() {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: GOLD } });
  s.addText('Key Takeaways', { x: 0.4, y: 0.1, w: 12.5, h: 0.9, fontSize: 26, bold: true, color: NAVY, fontFace: 'Arial', valign: 'middle' });

  const takeaways = [
    { num: '01', text: 'Weather modification is real — 56 countries operate active programs backed by governments and peer-reviewed science.' },
    { num: '02', text: 'It works — 5–30% precipitation enhancement is achievable, with the strongest evidence in tropical and orographic settings.' },
    { num: '03', text: 'It has been weaponized — Operation Popeye used cloud seeding militarily in Vietnam (1967–1972).' },
    { num: '04', text: 'The next frontier (SAI) has no rules — stratospheric aerosol injection could cool the planet but has no international governance.' },
    { num: '05', text: 'The governance gap is the biggest risk — scale and capability have outpaced policy and public awareness.' },
  ];

  takeaways.forEach((t, i) => {
    const y = 1.25 + i * 1.02;
    s.addShape(pres.ShapeType.rect, { x: 0.4, y, w: 0.7, h: 0.75, fill: { color: GOLD } });
    s.addText(t.num, { x: 0.4, y, w: 0.7, h: 0.75, fontSize: 18, bold: true, color: NAVY, fontFace: 'Arial', align: 'center', valign: 'middle' });
    s.addText(t.text, { x: 1.25, y: y + 0.05, w: 11.6, h: 0.65, fontSize: 14, color: WHITE, fontFace: 'Arial', valign: 'middle' });
  });

  s.addNotes('Wrap up by inviting questions. Offer to share the full source list. Remind the audience that all claims come from WMO, GAO, peer-reviewed journals, and U.S. Senate records — not secondary sources.');
  return s;
}

// ── Slides ────────────────────────────────────────────────────────────────────

// Slide 1 — Title (~0:30)
titleSlide(
  'Controlling the Sky:\nGlobal Weather Modification Programs',
  'A research synthesis grounded in WMO, GAO, NOAA, and peer-reviewed science'
);

// Slide 2 — Scale: the numbers (~1:00)
statSlide(
  'This Is Already Happening — By the Numbers',
  [
    { number: '56', label: 'Countries with active weather modification programs', source: 'WMO, 2022' },
    { number: '27', label: 'U.S. states with active cloud seeding programs', source: 'GAO Report GAO-11-11, 2010' },
    { number: '50,000+', label: 'Ground-based rocket launchers in China\'s program', source: 'Yao et al., Atmos. Res. 2021' },
  ],
  'Open with these numbers to establish scale immediately. Pause after each stat.',
  'Sources: WMO (2022) library.wmo.int | GAO-11-11 gao.gov/products/gao-11-11 | Yao et al. (2021) doi.org/10.1016/j.atmosres.2020.105183'
);

// Slide 3 — What is cloud seeding (~1:00)
contentSlide(
  'How Cloud Seeding Works',
  [
    'Silver iodide or hygroscopic flares are dispersed into clouds by aircraft or ground generators',
    'Seeding agents provide nuclei for water droplets or ice crystals to form around',
    'Target clouds must have sufficient liquid water and the right temperature (-5°C to -25°C)',
    'Precipitation falls earlier and more efficiently than it would naturally',
    'Orographic clouds (mountains) and tropical convective clouds respond most reliably',
  ],
  'Keep this brief — one minute explaining the mechanism. The audience doesn\'t need to become meteorologists. Focus on: it\'s real, it has physical mechanisms, it works under the right conditions.',
  'Sources: Xue et al. (2023) doi.org/10.1175/jamc-d-22-0132.1 | WMO (2022) library.wmo.int/records/item/60310'
);

// Slide 4 — Global programs map (~1:00)
contentSlide(
  'A Global Practice — Selected Programs',
  [
    '🇦🇪 UAE — Continuous operations since 1990; 10–15% precipitation increase documented (Bruintjes et al., Atmosphere 2021)',
    '🇨🇳 China — World\'s largest program; 23 provinces, $1B+ annual investment, 5.5M km² target by 2025 (Yao et al., 2021)',
    '🇮🇳 India — CAIPEEX randomized trials confirm statistically significant enhancement (Prabha et al., BAMS 2023)',
    '🇺🇸 United States — 27 active state programs; hail suppression and water supply augmentation (GAO 2010)',
    '🇦🇺 Australia — Queensland randomized trial published in BAMS; null result illustrates evaluation challenges (Soderholm et al., 2012)',
  ],
  'Walk through 2–3 of these depending on time. UAE and China are most striking for an audience unfamiliar with the scale.',
  'Sources: bruintjes2021 | yao2021 | prabha2023 | gao2010 | soderholm2012 — see bibliography'
);

// Slide 5 — Does it work? Split ~(1:00)
splitSlide(
  'Does It Work? The Scientific Evidence',
  [
    '5–30% precipitation enhancement achievable under suitable conditions (WMO 2022)',
    'India CAIPEEX: statistically significant increase in randomized trial (Prabha et al. 2023)',
    'UAE 30-year record: 10–15% increase in suitable cloud systems (Bruintjes et al. 2021)',
    'Karnataka India: +24% daily rainfall in seeded areas (Dani et al. 2019)',
    'WRF model: 5–15% orographic enhancement confirmed numerically (Xue et al. 2023)',
  ],
  [
    'Queensland randomized trial: NO significant effect detected (Soderholm et al. 2012)',
    'China\'s claimed results cannot be independently verified (Yao et al. 2021)',
    'Most operational programs lack randomized control designs (Korhonen et al. 2023)',
    'Efficacy is climate- and cloud-type dependent — not universal',
    'Natural rainfall variability often too large to detect seeding signal',
  ],
  'Positive Evidence',
  'Legitimate Skepticism',
  'This is the most important slide scientifically. Acknowledge both sides — the point isn\'t that cloud seeding always works, but that it works enough to justify billions in government investment.',
  'Sources: prabha2023 | bruintjes2021 | dani2019 | xue2023 vs. soderholm2012 | korhonen2023'
);

// Slide 6 — Military use (~1:00)
contentSlide(
  'When Governments Weaponized Weather',
  [
    'Operation Popeye (1967–1972): classified U.S. military program over Vietnam, Laos, Cambodia',
    'Objective: extend the monsoon season to flood the Ho Chi Minh Trail and disrupt enemy supply lines',
    'Conducted 2,600+ cloud seeding missions; classified until revealed by Jack Anderson in 1971',
    'Led directly to the 1978 ENMOD Convention prohibiting hostile use of weather modification',
    'Source: U.S. Senate Commerce Committee report, 1978 (declassified government record)',
  ],
  'This slide tends to get the most reaction. Emphasize that this comes from a U.S. Senate report and the Congressional Record — not speculation. The program was real, documented, and bipartisan.',
  'Source: U.S. Senate Committee on Commerce, Science, and Transportation (1978). govinfo.gov/content/pkg/CPRT-95SPRT21866/pdf/CPRT-95SPRT21866.pdf'
);

// Slide 7 — SAI / next frontier (~1:00)
contentSlide(
  'The Next Frontier: Stratospheric Aerosol Injection',
  [
    'SAI injects sulfate aerosols into the stratosphere to reflect sunlight — global scale, not local',
    'Could reduce global mean temperature by 1–2°C at costs of $2–8B/year (far cheaper than emissions cuts)',
    'Side effects: altered monsoon patterns, ozone thinning, regional drought in some areas',
    '"Termination shock" — abrupt warming if SAI is stopped suddenly after years of deployment',
    'No international governance framework exists; a single nation or wealthy actor could deploy unilaterally',
  ],
  'SAI is where this topic gets most consequential. Unlike cloud seeding (local), SAI affects the entire planet\'s precipitation. Connect it to the governance theme you\'ll close on.',
  'Source: Talati et al. (2022) Earth\'s Future. doi.org/10.1029/2021EF002545'
);

// Slide 8 — Governance gap (~0:45)
contentSlide(
  'The Governance Gap',
  [
    'No designated U.S. federal agency has authority to oversee all weather modification programs (GAO 2010)',
    'No internationally binding framework governs transboundary cloud seeding (Korhonen et al. 2023)',
    'ENMOD (1978) only prohibits military use — civilian programs are unregulated internationally',
    'WMO calls for mandatory randomized evaluation and international notification protocols (WMO 2022)',
    'China\'s 5.5M km² program expansion may affect precipitation in India, Kazakhstan, Russia — no mechanism to address this',
  ],
  'The governance gap is your call to action. The technology is real, it\'s operational, and it\'s growing — but the rules have not kept up.',
  'Sources: gao2010 | korhonen2023 | wmo2022 | senate1978'
);

// Slide 9 — Takeaways (~0:45)
closingSlide();

// ── Save ──────────────────────────────────────────────────────────────────────

await pres.writeFile({ fileName: OUT });
console.log(`Generated: ${OUT}`);
console.log(`Slides: 9  (~8 min at ~1 min per slide)`);
