import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'yellow-dragon-con-client-list.xlsx');

// ── Data generation ───────────────────────────────────────────────────────────

const firstNames = [
  'Alex','Jordan','Taylor','Morgan','Casey','Riley','Avery','Quinn','Skyler','Dakota',
  'Jamie','Reese','Finley','Rowan','Sage','Blake','Drew','Hayden','Parker','Emery',
  'Logan','Dylan','Peyton','Cameron','Kendall','Harley','Elliot','Ryan','Jesse','Charlie',
  'Sam','Devon','Shawn','Kai','Alexis','Aiden','Mia','Zoe','Lily','Ethan',
  'Noah','Liam','Oliver','Emma','Sophia','Ava','Lucas','Mason','Chloe','Ella',
];

const lastNames = [
  'Stormrider','Flamecrest','Goldwing','Silvermaw','Ironscale','Ashborne','Thornveil','Emberclaw',
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore',
  'Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Young','Allen',
  'King','Wright','Scott','Green','Baker','Adams','Nelson','Carter','Mitchell','Roberts',
  'Turner','Hall','Lewis','Robinson','Walker','Clark','Rodriguez','Martinez','Hernandez','Lopez',
  'Lee','Perez',
];

const states = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

const shirtSizes    = ['XS','S','M','L','XL','2XL'];
const accommodations = ['Standard Room','Deluxe Room','Suite','Shared Cabin','Day Pass'];
const swagMap       = { 1: 'Dice', 2: 'Dice Tray', 3: 'Flagon' };

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Exactly 34 Level-1, 33 Level-2, 33 Level-3 — shuffled
const levelPool = [...Array(34).fill(1), ...Array(33).fill(2), ...Array(33).fill(3)];
for (let i = levelPool.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [levelPool[i], levelPool[j]] = [levelPool[j], levelPool[i]];
}

const guests = [];
const usedNames = new Set();

for (let i = 0; i < 100; i++) {
  let first, last;
  do {
    first = pick(firstNames);
    last  = pick(lastNames);
  } while (usedNames.has(`${first} ${last}`));
  usedNames.add(`${first} ${last}`);

  guests.push({
    first,
    last,
    level:         levelPool[i],
    swag:          swagMap[levelPool[i]],
    shirtSize:     pick(shirtSizes),
    state:         pick(states),
    accommodation: pick(accommodations),
  });
}

// Sort A-Z by last name then first name
guests.sort((a, b) => a.last.localeCompare(b.last) || a.first.localeCompare(b.first));
guests.forEach((g, i) => (g.num = i + 1));

// ── Helper: auto-size columns from an aoa ────────────────────────────────────
// Measures the max character width per column and sets !cols accordingly
function autoWidth(aoa) {
  const colWidths = [];
  for (const row of aoa) {
    row.forEach((cell, c) => {
      const len = String(cell ?? '').length;
      colWidths[c] = Math.max(colWidths[c] ?? 0, len);
    });
  }
  return colWidths.map(w => ({ wch: Math.min(w + 2, 40) }));
}

// ── SHEET 1: Full Guest List (A-Z by last name) ───────────────────────────────
const HEADERS = ['#','First Name','Last Name','Dragon Raider Level','Swag','Shirt Size','State','Accommodation'];

const sheet1Data = [
  HEADERS,
  ...guests.map(g => [
    g.num, g.first, g.last, g.level, g.swag, g.shirtSize, g.state, g.accommodation,
  ]),
];

const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
ws1['!cols'] = autoWidth(sheet1Data);

// ── SHEET 2: Grouped by Dragon Raider Level ───────────────────────────────────
// Each level gets a header row, then its guests, then a blank spacer row
const sheet2Data = [];

for (const lvl of [1, 2, 3]) {
  const group = guests.filter(g => g.level === lvl);
  sheet2Data.push([`Dragon Raider Level ${lvl} — ${swagMap[lvl]} (${group.length} guests)`]);
  sheet2Data.push(HEADERS);
  for (const g of group) {
    sheet2Data.push([g.num, g.first, g.last, g.level, g.swag, g.shirtSize, g.state, g.accommodation]);
  }
  sheet2Data.push([]); // spacer between groups
}

const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
ws2['!cols'] = autoWidth(sheet2Data);

// ── SHEET 3: Swag & Logistics Summary ────────────────────────────────────────
const l1 = guests.filter(g => g.level === 1);
const l2 = guests.filter(g => g.level === 2);
const l3 = guests.filter(g => g.level === 3);

// Shirt size counts per level
function shirtCounts(group) {
  return shirtSizes.map(sz => group.filter(g => g.shirtSize === sz).length);
}

// Accommodation counts
function accCounts(group) {
  return accommodations.map(acc => group.filter(g => g.accommodation === acc).length);
}

const sheet3Data = [
  // Swag summary section
  ['SWAG SUMMARY'],
  ['Level', 'Swag Item', 'Guest Count', 'Order Qty'],
  ['Dragon Raider Level 1', 'Dice',      l1.length, l1.length],
  ['Dragon Raider Level 2', 'Dice Tray', l2.length, l2.length],
  ['Dragon Raider Level 3', 'Flagon',    l3.length, l3.length],
  ['TOTAL', '', 100, 100],
  [],

  // Shirt sizes section
  ['SHIRT SIZE BREAKDOWN'],
  ['Size', 'Level 1', 'Level 2', 'Level 3', 'Total'],
  ...shirtSizes.map(sz => {
    const c1 = l1.filter(g => g.shirtSize === sz).length;
    const c2 = l2.filter(g => g.shirtSize === sz).length;
    const c3 = l3.filter(g => g.shirtSize === sz).length;
    return [sz, c1, c2, c3, c1 + c2 + c3];
  }),
  ['TOTAL', ...shirtCounts(l1), ...[], shirtCounts(l1).reduce((a,b)=>a+b,0)],
  [],

  // Accommodation section
  ['ACCOMMODATION BREAKDOWN'],
  ['Type', 'Level 1', 'Level 2', 'Level 3', 'Total'],
  ...accommodations.map(acc => {
    const c1 = l1.filter(g => g.accommodation === acc).length;
    const c2 = l2.filter(g => g.accommodation === acc).length;
    const c3 = l3.filter(g => g.accommodation === acc).length;
    return [acc, c1, c2, c3, c1 + c2 + c3];
  }),
  [],

  // State breakdown
  ['TOP STATES BY ATTENDANCE'],
  ['State', 'Count'],
  ...Object.entries(
    guests.reduce((acc, g) => ({ ...acc, [g.state]: (acc[g.state] || 0) + 1 }), {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([state, count]) => [state, count]),
];

const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);
ws3['!cols'] = autoWidth(sheet3Data);

// ── Build workbook and save ───────────────────────────────────────────────────
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws1, 'Guest List');
XLSX.utils.book_append_sheet(wb, ws2, 'By Level');
XLSX.utils.book_append_sheet(wb, ws3, 'Swag Summary');

XLSX.writeFile(wb, OUT);

console.log(`Generated: ${OUT}`);
console.log(`Sheet 1 — Guest List:   ${guests.length} guests, sorted A-Z`);
console.log(`Sheet 2 — By Level:     L1: ${l1.length}  L2: ${l2.length}  L3: ${l3.length}`);
console.log(`Sheet 3 — Swag Summary: swag counts, shirt sizes, accommodations, top states`);
