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

  s.addNotes('Wrap up by inviting questions. Offer to share the full source list. Remind the audience that every claim in this deck comes from WMO reports, GAO audits, peer-reviewed journals, or the U.S. Senate record. Not news articles, not social media.');
  return s;
}

// ── SLIDES ────────────────────────────────────────────────────────────────────

// Slide 1: Title
titleSlide(
  'Controlling the Sky:\nGlobal Weather Modification Programs',
  'A research synthesis grounded in WMO, GAO, NOAA, and peer-reviewed science'
);

// Slide 2: By the Numbers
statSlide(
  'This Is Already Happening — By the Numbers',
  [
    { number: '56',      label: 'Countries with active weather modification programs',   source: 'WMO, 2022' },
    { number: '27',      label: 'U.S. states with active cloud seeding programs',        source: 'GAO Report GAO-11-11, 2010' },
    { number: '50,000+', label: 'Ground-based rocket launchers in China\'s program',     source: 'Yao et al., Atmos. Res. 2021' },
  ],
  'Open with these numbers to establish scale right away. Pause 3 to 5 seconds after each stat and let it land before moving on. The 50,000 rocket launchers number tends to get the biggest reaction from audiences unfamiliar with China\'s program.',
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
  'Walk through each step in about one minute total. A few terms your audience may not recognize:\n\n"Silver iodide" has a crystal structure almost identical to ice, which tricks supercooled water droplets into freezing around it. Think of it as a fake ice seed.\n\n"Hygroscopic" means moisture-attracting. Hygroscopic flares, like potassium chloride, pull water vapor together into droplets without needing ice formation at all.\n\n"Nucleation" is just the science word for the moment a crystal or droplet forms around a particle. Dust does this naturally all the time in the atmosphere.\n\nThe key constraint: target clouds must have sufficient liquid water content. You cannot seed a dry cloud. The optimal temperature window is -5 to -25 degrees Celsius, where ice-phase seeding is most effective.',
  'Sources: Xue et al. (2023) doi.org/10.1175/jamc-d-22-0132.1 | WMO (2022) library.wmo.int/records/item/60310'
);

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
  'Two things worth flagging for your audience here:\n\n"CAIPEEX" stands for Cloud Aerosol Interaction and Precipitation Enhancement Experiment. It is India\'s national cloud seeding study, and it stands out because it used a randomized design, meaning they randomly decided which clouds to seed and which to leave alone, then compared results. This is the same methodology as a clinical drug trial. Most countries do not bother with this rigor.\n\n"p < 0.05" is the standard scientific threshold for statistical significance. It means the result is unlikely to be random chance. You can say to the audience: the result passed the same bar as a published clinical trial.\n\nThe GAO (Government Accountability Office) is the nonpartisan federal watchdog that audits government programs. Their 2010 report is an official government document, not a news article.',
  'Sources: bruintjes2021 | yao2021 | prabha2023 | gao2010'
);

// Slide 5: Closer to Home — U.S. State Programs
imageContentSlide(
  'Closer to Home: Active U.S. State Programs',
  [
    '🤠 Texas — 5 active programs covering 31M acres (one-sixth of the state); West TX, South TX, Panhandle, Trans Pecos, and Rolling Plains regions; state-regulated since 1967',
    '🏔 Utah — 185 remote-controlled ground generators statewide; $17M in new state funding (2023); 3 to 13% snowpack increase documented; water produced at $5 to $10 per acre-foot',
    '⛷ Colorado — 7 permitted winter seeding projects on the Western Slope; administered by the Colorado Water Conservation Board; interest surging after the 2026 drought season',
    '🌲 Idaho — Active and expanding as part of Western states water coordination; targets mountain snowpack to boost spring runoff for agriculture',
    '🌵 Arizona — No active in-state program yet; Central Arizona Project co-funds seeding in Utah and Colorado; state legislature reviewing feasibility (HB2056)',
  ],
  path.join(ASSETS, 'us-states-map.png'),
  'This slide is designed to make the topic feel immediate rather than abstract.\n\nAll five of these programs are publicly funded, state-administered, and entirely legal. They are not secret. Texas has a dedicated state agency (the Texas Department of Licensing and Regulation, or TDLR) that licenses operators and tracks operations annually.\n\nThe "acre-foot" is a common water measurement in the American West — it is the volume of water needed to cover one acre to a depth of one foot, roughly 326,000 gallons. At $5 to $10 per acre-foot for cloud-seeded water, compared to roughly $3,000 per acre-foot for desalination, cloud seeding is extraordinarily cost-effective.\n\nUtah\'s $17 million investment in 2023 is notable because it represents a significant legislative commitment. The program is also co-funded by Arizona, California, and Nevada, because what falls as snowpack in Utah\'s mountains eventually feeds the Colorado River, which supplies water to all of those states.\n\nA note on Arkansas: The user may have seen news coverage of public concern about cloud seeding there, but no confirmed active state program was found in the official record. If asked, acknowledge it honestly.\n\nThe governance point to land: the GAO confirmed 27 active state programs in 2010, and there is still no federal agency with authority to coordinate or oversee them all.',
  'Sources: TDLR Texas tdlr.texas.gov/weather/summary.htm | USU Extension extension.usu.edu/climate/research/cloud-seeding-enhancing-winter-snowpack | Colorado Water Conservation Board | GAO-11-11 gao.gov/products/gao-11-11'
);

// Slide 6: Evidence — Positive
contentSlide(
  'The Evidence: It Works — Under the Right Conditions',
  [
    'WMO (2022): 5 to 30% precipitation enhancement achievable under suitable conditions',
    'India CAIPEEX: statistically significant increase confirmed in a randomized controlled trial (Prabha et al. 2023)',
    'UAE 30-year program: 10 to 15% increase in suitable cloud systems (Bruintjes et al. 2021)',
    'Karnataka, India: +24% daily rainfall in seeded target areas (Dani et al. 2019)',
    'WRF numerical model: 5 to 15% orographic enhancement confirmed computationally (Xue et al. 2023)',
  ],
  'Key terms for this slide:\n\n"WMO" is the World Meteorological Organization, the United Nations agency for global weather science. Their 2022 report is the closest thing to an official global consensus document on cloud seeding.\n\n"Randomized controlled trial" (RCT) means randomly assigning which clouds get seeded and which do not, then comparing rainfall in both groups. Same methodology as a clinical trial. It is the gold standard for proving causation rather than just correlation.\n\n"Orographic" means relating to mountain terrain. Orographic clouds form when moist air is forced upward by rising elevation. They are predictable and consistent, which is why mountain regions like the UAE show the strongest seeding results.\n\n"WRF" is the Weather Research and Forecasting model, an industry-standard numerical simulation used to test cloud seeding outcomes computationally without physically seeding anything.',
  'Sources: prabha2023 | bruintjes2021 | dani2019 | xue2023 | wmo2022'
);

// Slide 6: Evidence — Skepticism
contentSlide(
  'The Evidence: Legitimate Reasons for Skepticism',
  [
    'Queensland randomized trial (Australia): NO statistically significant effect detected (Soderholm et al. 2012)',
    'China\'s claimed results cannot be independently verified — no randomized controls, data not publicly accessible (Yao et al. 2021)',
    'Most operational programs worldwide lack randomized control group designs (Korhonen et al. 2023)',
    'Efficacy is highly dependent on cloud type and climate regime — results do not transfer across regions',
    'Natural rainfall variability is often too large to detect a 10 to 15% seeding signal without many years of data',
  ],
  'This slide is important for credibility. Acknowledge both sides honestly.\n\nA "null result" is a valid scientific finding. The Queensland study, published in the Bulletin of the American Meteorological Society, found no significant rainfall increase. That is not a failure of the science — it tells us that efficacy is climate and cloud-type dependent.\n\nThe key insight: subtropical maritime clouds off the Queensland coast respond very differently from tropical convective clouds in the Indian monsoon, or orographic mountain clouds in the UAE. Cloud seeding is not one-size-fits-all.\n\n"Natural rainfall variability" is the core statistical challenge. If rainfall in a region varies by plus or minus 30% from year to year naturally, detecting a 10% seeding signal requires many years of randomized data. Most programs have not done this work, which is exactly why the WMO is calling for mandatory evaluation protocols.',
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
  path.join(ASSETS, 'popeye-map.png'),
  'This slide tends to stop audiences cold. Emphasize the source: U.S. Senate Commerce Committee, 1978. This is a declassified government document in the Congressional Record, available at govinfo.gov. This is not a conspiracy theory — it is federal documentation.\n\n"ENMOD" stands for Environmental Modification Convention. It is a UN treaty signed in 1978 specifically because Operation Popeye demonstrated that weather modification could be weaponized at scale. The treaty prohibits military use only; civilian programs are not covered.\n\nThe Ho Chi Minh Trail was North Vietnam\'s supply route running through Laos and Cambodia. The military objective was to extend the monsoon season by 30 to 45 days to make the trail impassable with mud and flooding. The program achieved measurable results — which is precisely what prompted an international treaty banning it.',
  'Source: U.S. Senate Committee on Commerce, Science, and Transportation (1978) govinfo.gov/content/pkg/CPRT-95SPRT21866/pdf/CPRT-95SPRT21866.pdf'
);

// Slide 8: Stratospheric Aerosol Injection (image layout)
imageContentSlide(
  'The Next Frontier: Stratospheric Aerosol Injection',
  [
    'SAI injects sulfate aerosols into the stratosphere to reflect sunlight — planetary scale, not local',
    'Could reduce global temperature 1 to 2°C at $2 to 8B/year, far cheaper than emissions reduction',
    '"Termination shock" — abrupt warming occurs if SAI is stopped suddenly after years of deployment',
    'A single nation or wealthy actor could deploy unilaterally; no international governance exists',
  ],
  path.join(ASSETS, 'sai-diagram.png'),
  'Key terminology for this slide:\n\n"Stratosphere" is the atmospheric layer between roughly 12 and 50 km above Earth\'s surface. It sits above weather and commercial aviation, but below the ozone layer.\n\n"Sulfate aerosols" are tiny reflective particles similar to what large volcanoes eject. The 1991 Mount Pinatubo eruption reduced global temperatures by about 0.5 degrees Celsius for 18 months. That volcanic cooling is the natural proof of concept for SAI.\n\n"Termination shock" is the most dangerous risk. If SAI is deployed for 20 years and then stopped suddenly due to war, political collapse, or funding failure, the accumulated CO2 that was being masked would cause rapid rebound warming, potentially more damaging than gradual climate change.\n\nThe unilateral deployment risk is near-term and real: at $2 to 8 billion per year, SAI is within reach of a single wealthy nation, with no requirement for international consent from countries that would be affected.',
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
  'This is your call to action slide.\n\n"ENMOD" (Environmental Modification Convention, 1978) only prohibits military use. There is no equivalent treaty for civilian programs. A country can seed clouds that drift across international borders with no legal obligation to notify neighbors or compensate for reduced rainfall downstream.\n\n"Transboundary effects" means that one country\'s seeding can reduce rainfall in a neighboring country. China\'s stated goal of covering 5.5 million square kilometers with weather modification by 2025 is an area larger than India. There is currently no legal mechanism for affected nations to object or seek any remedy.\n\nThe GAO (Government Accountability Office) identified the domestic governance gap in 2010. Fifteen years later it has not been addressed at the federal level. The WMO\'s 2022 recommendations — mandatory randomized evaluation and prior notification protocols — represent the current scientific consensus on what good governance should look like.',
  'Sources: gao2010 | korhonen2023 | wmo2022 | senate1978'
);

// Slide 10: Key Takeaways
closingSlide();

// ── Save ──────────────────────────────────────────────────────────────────────

await pres.writeFile({ fileName: OUT });
console.log(`Generated: ${OUT}`);
console.log(`Slides: 11  (~8 min)`);
