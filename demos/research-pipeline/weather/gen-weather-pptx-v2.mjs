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
  'And some of those twenty-seven states are right here in our backyard. Texas has five active cloud seeding programs covering thirty-one million acres — one sixth of the entire state — and they have been state-regulated since 1967. Utah has a hundred and eighty-five remote-controlled ground generators operating statewide, and the legislature invested seventeen million dollars in the program in 2023 alone. Colorado has seven permitted winter seeding projects on the Western Slope, and after this year\'s record low snowpack, interest is surging. Idaho is actively expanding as part of a regional water coordination effort across the Mountain West. Arizona does not have an in-state program yet, but the Central Arizona Project co-funds seeding in Utah and Colorado — because the snowpack that falls in Utah\'s mountains feeds the Colorado River, which is Arizona\'s water supply. These programs cost five to ten dollars per acre-foot of water produced. Desalination costs about three thousand dollars per acre-foot. Cloud seeding is not just weather modification. It is the cheapest water infrastructure in the American West.',
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
  'So does it actually work? The evidence says yes, under the right conditions. The World Meteorological Organization — the United Nations agency for global weather science — reviewed the full body of research in 2022 and concluded that five to thirty percent precipitation enhancement is achievable when the cloud conditions are right. India\'s national randomized trial confirmed statistically significant rainfall increases. The UAE\'s thirty-year operational record shows ten to fifteen percent more precipitation in targeted systems. A program in Karnataka, India reported twenty-four percent more daily rainfall in seeded areas. And the Weather Research and Forecasting model — an industry-standard numerical simulation — confirmed five to fifteen percent enhancement in orographic clouds, which are mountain clouds. Mountain clouds form when moist air is forced upward by terrain, which makes them predictable and consistent targets. That is why the strongest results consistently come from mountain and tropical settings.',
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
  path.join(ASSETS, 'popeye-map.png'),
  'Now I want to tell you about the moment weather modification stopped being about agriculture and became a weapon. From 1967 to 1972, the United States military ran a classified program called Operation Popeye over Vietnam, Laos, and Cambodia. The objective was to extend the monsoon season — to make it rain longer, harder, and in exactly the right places to flood the Ho Chi Minh Trail and make it impassable for North Vietnamese supply lines. They flew more than twenty-six hundred cloud seeding missions. The program was classified until journalist Jack Anderson revealed it in 1971. It was confirmed by the U.S. Senate Commerce Committee in 1978 — this is a declassified government document in the Congressional Record, available at govinfo.gov right now. And the program worked well enough that in 1978, the United Nations passed the Environmental Modification Convention — a treaty specifically banning the hostile use of weather modification. Think about that. The international community decided this was dangerous enough to prohibit by treaty. The treaty covers military use only. Civilian programs are completely unregulated internationally.',
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

// Slide 10: Key Takeaways
closingSlide();

// ── Save ──────────────────────────────────────────────────────────────────────

await pres.writeFile({ fileName: OUT });
console.log(`Generated: ${OUT}`);
console.log(`Slides: 11  (~8 min)`);
