import PptxGenJS from 'pptxgenjs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM doesn't expose __dirname — reconstruct it from the module URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG = (name) => path.join(__dirname, 'images', name);
const OUT = path.join(__dirname, 'yellow-dragon-con-swag-deck.pptx');

// ── Theme (pptxgenjs uses hex WITHOUT the # sign) ────────────────────────────
const GOLD     = 'B8860B';
const EMBER    = '1A1A2E';
const OFFWHITE = 'F0EDE6';
const MUTED    = '7A7060';

const pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9'; // 10" x 7.5"

// ── Shared helpers ────────────────────────────────────────────────────────────

function darkBg(slide) {
  slide.background = { color: EMBER };
}

// Thin gold accent bar running the full left edge — visual consistency anchor
function leftBar(slide) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 0.07, h: 7.5,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
}

function addDivider(slide, y, w = 9.2) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0.4, y, w, h: 0.03,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
}

// ── SLIDE 1: Title ────────────────────────────────────────────────────────────
const s1 = pres.addSlide();
darkBg(s1);

s1.addText('YELLOW DRAGON CON 2025', {
  x: 0.5, y: 1.6, w: 9, h: 1.4,
  fontSize: 48, bold: true, color: GOLD, fontFace: 'Calibri',
  align: 'center',
});
s1.addText('Join Your Tribe. Claim Your Loot.', {
  x: 0.5, y: 3.1, w: 9, h: 0.7,
  fontSize: 26, italic: true, color: OFFWHITE, fontFace: 'Calibri',
  align: 'center',
});
s1.addText('Legendary Loot by Dragon Raider Level', {
  x: 0.5, y: 3.95, w: 9, h: 0.5,
  fontSize: 15, color: MUTED, fontFace: 'Calibri',
  align: 'center',
});

s1.addNotes(
  'Point: This is a premium fantasy event with tier-based legendary loot.\n' +
  'Talking point: Every Dragon Raider Level was earned — and every level gets a piece of loot hand-picked for the tribe.\n' +
  'Transition: "Let\'s walk through what each level unlocks..."'
);

// ── SLIDE 2: Quest Map (Agenda) ───────────────────────────────────────────────
const s2 = pres.addSlide();
darkBg(s2);
leftBar(s2);

s2.addText("Tonight's Quest Map", {
  x: 0.4, y: 0.35, w: 9.2, h: 0.8,
  fontSize: 32, bold: true, color: GOLD, fontFace: 'Calibri',
});
addDivider(s2, 1.2);

const agendaRows = [
  { level: 'Dragon Raider Level 1', swag: 'Dice' },
  { level: 'Dragon Raider Level 2', swag: 'Dice Tray' },
  { level: 'Dragon Raider Level 3', swag: 'Flagon' },
];

agendaRows.forEach(({ level, swag }, i) => {
  const y = 1.7 + i * 1.3;
  s2.addText(`▸  ${level}`, {
    x: 1.2, y, w: 5, h: 0.55,
    fontSize: 20, bold: true, color: GOLD, fontFace: 'Calibri',
  });
  s2.addText(swag, {
    x: 1.2, y: y + 0.5, w: 5, h: 0.45,
    fontSize: 17, color: OFFWHITE, fontFace: 'Calibri',
  });
});

s2.addNotes(
  'Point: Three Dragon Raider Levels, three tiers of legendary loot.\n' +
  'Talking point: Loot is distributed at check-in — no waiting in line mid-event.\n' +
  'Transition: "Starting with our newest Raiders..."'
);

// ── Level slide builder ───────────────────────────────────────────────────────
// Layout: text block left (5"), image right (4.2") on a dark background
function addLevelSlide({ level, swag, image, bullets, notes }) {
  const slide = pres.addSlide();
  darkBg(slide);
  leftBar(slide);

  // Level label — small caps treatment via charSpacing
  slide.addText(`DRAGON RAIDER LEVEL ${level}`, {
    x: 0.4, y: 0.3, w: 5.2, h: 0.5,
    fontSize: 12, bold: true, color: GOLD, fontFace: 'Calibri',
    charSpacing: 2.5,
  });

  // Swag name — big and bold
  slide.addText(swag, {
    x: 0.4, y: 0.85, w: 5.2, h: 1.1,
    fontSize: 44, bold: true, color: OFFWHITE, fontFace: 'Calibri',
  });

  addDivider(slide, 1.95, 4.8);

  // Bullet points
  const bulletText = bullets.map(b => ({
    text: `▸  ${b}`,
    options: { breakLine: true, paraSpaceAfter: 10 },
  }));
  slide.addText(bulletText, {
    x: 0.4, y: 2.1, w: 4.9, h: 4.6,
    fontSize: 16, color: OFFWHITE, fontFace: 'Calibri',
    lineSpacingMultiple: 1.5, valign: 'top',
  });

  // Swag image — right panel
  slide.addImage({
    path: image,
    x: 5.55, y: 0.4, w: 4.1, h: 6.7,
    sizing: { type: 'contain', w: 4.1, h: 6.7 },
  });

  slide.addNotes(notes);
}

// ── SLIDE 3: Level 1 — Dice ───────────────────────────────────────────────────
addLevelSlide({
  level: 1,
  swag: 'Dice',
  image: IMG('dice.png'),
  bullets: [
    'A full polyhedral set — ready for any campaign',
    'The foundational tool of every tabletop adventurer',
    'Roll into the tribe with the gear of the quest',
    'Includes d4, d6, d8, d10, d12, and d20',
  ],
  notes:
    'Point: Level 1 Raiders receive a full polyhedral dice set — the essential tool of the trade.\n' +
    'Talking point: These are weighted, balanced dice worthy of the Yellow Dragon Con crest — not cheap filler.\n' +
    'Transition: "Level 2 Raiders unlock something to elevate that roll..."',
});

// ── SLIDE 4: Level 2 — Dice Tray ─────────────────────────────────────────────
addLevelSlide({
  level: 2,
  swag: 'Dice Tray',
  image: IMG('dice_tray.png'),
  bullets: [
    'Keeps your rolls contained and your table respected',
    'Felt-lined interior protects every set in the tribe',
    'Built for Raiders who game with intention',
    'Pairs perfectly with your Level 1 dice',
  ],
  notes:
    'Point: Level 2 Raiders receive a premium dice tray — the mark of a seasoned adventurer.\n' +
    'Talking point: The tray is sized to hold a full dice set plus extra d6s for damage rolls.\n' +
    'Transition: "And for our most dedicated Raiders — the highest honor..."',
});

// ── SLIDE 5: Level 3 — Flagon ─────────────────────────────────────────────────
addLevelSlide({
  level: 3,
  swag: 'Flagon',
  image: IMG('gdfmug.png'),
  bullets: [
    'Raise a toast to the tribe — you\'ve earned it',
    'Custom-branded with the Yellow Dragon Con crest',
    'Built to last as long as your greatest campaign',
    'The mark of a true Dragon Raider legend',
  ],
  notes:
    'Point: Level 3 Raiders are the heart of the tribe — the flagon is a symbol of that commitment.\n' +
    'Talking point: The flagon is hand-picked to match the fantasy aesthetic of the event — not your average convention merch.\n' +
    'Transition: "Every Raider, every level — legendary loot awaits at check-in."',
});

// ── SLIDE 6: Section Divider ──────────────────────────────────────────────────
const s6 = pres.addSlide();
darkBg(s6);

s6.addText('Every Raider\nEarns Their Keep', {
  x: 0.5, y: 1.5, w: 9, h: 4,
  fontSize: 56, bold: true, color: GOLD, fontFace: 'Calibri',
  align: 'center', lineSpacingMultiple: 1.3,
});

s6.addNotes(
  'Point: Transition — reinforce that every level is valued, not just Level 3.\n' +
  'Talking point: The loot tiers exist to celebrate commitment at every stage, not to exclude.\n' +
  'Transition: "Here\'s how to claim yours..."'
);

// ── SLIDE 7: Call to Action ───────────────────────────────────────────────────
const s7 = pres.addSlide();
darkBg(s7);
leftBar(s7);

s7.addText('Claim Your Legendary Loot', {
  x: 0.4, y: 0.35, w: 9.2, h: 0.8,
  fontSize: 32, bold: true, color: GOLD, fontFace: 'Calibri',
});
addDivider(s7, 1.2);

const ctaBullets = [
  'Head to the Check-In Guild table on arrival',
  'Show your Dragon Raider Level confirmation',
  'Receive your loot and roll the dice on an adventure of a lifetime',
];
ctaBullets.forEach((b, i) => {
  s7.addText(`▸  ${b}`, {
    x: 0.8, y: 1.65 + i * 1.1, w: 8.8, h: 0.8,
    fontSize: 20, color: OFFWHITE, fontFace: 'Calibri',
  });
});

s7.addText('Yellow Dragon Con 2025  |  Join the Tribe', {
  x: 0.4, y: 6.9, w: 9.2, h: 0.4,
  fontSize: 11, color: MUTED, fontFace: 'Calibri', align: 'center',
});

s7.addNotes(
  'Point: One clear action — go to check-in and claim your loot.\n' +
  'Talking point: Guild volunteers are stationed at the entrance and will guide every Raider.\n' +
  'Transition: "See you at the table."'
);

// ── Save ──────────────────────────────────────────────────────────────────────
await pres.writeFile({ fileName: OUT });
console.log(`Generated: ${OUT}`);
console.log('Slides: 7  (title, agenda, 3x level, divider, CTA)');
