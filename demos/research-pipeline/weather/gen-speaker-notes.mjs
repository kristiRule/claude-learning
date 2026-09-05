import { Document, Packer, Paragraph, TextRun, HeadingLevel, PageNumber, Footer, AlignmentType } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'conspiracon-2026-speaker-notes.docx');

const slides = [
  {
    num: 1,
    title: 'Controlling the Sky: Global Weather Modification Programs',
    note: `Good evening everyone. I want to talk about something that most people think is a conspiracy theory but is actually documented, funded, and operational in 56 countries right now. Weather modification. Not chemtrails, not something being secretly sprayed from unmarked planes — I mean government programs, peer-reviewed science, and a 1978 UN treaty that proves someone took it seriously enough to make it illegal as a weapon. By the end of this I want you to walk out knowing that controlling the weather is not a future technology. It is happening right now, and the question is not whether it works — it is who is doing it, why, and who is watching.`,
  },
  {
    num: 2,
    title: 'This Is Already Happening — By the Numbers',
    note: `Let's start with three numbers. Fifty-six. That is the number of countries with active, government-funded weather modification programs according to the World Meteorological Organization in 2022. Not research programs — operational programs. Twenty-seven. That is the number of U.S. states with active cloud seeding programs, confirmed by the Government Accountability Office in 2010. The GAO is the nonpartisan federal watchdog — this is not a fringe source. And fifty thousand. That is the number of ground-based rocket launchers China operates across 23 provinces for weather modification. Fifty thousand rocket launchers, aimed at the sky, backed by over a billion dollars a year in government funding. This is not experimental. This is policy.`,
  },
  {
    num: 3,
    title: 'How Cloud Seeding Works',
    note: `So how does it actually work? Step one: a plane or a ground-based generator releases a seeding agent into or near a cloud. The most common agent is silver iodide, which has a crystal structure almost identical to ice. It gives water droplets something to freeze around — think of it as a fake ice seed. Step two: those particles disperse through the cloud. The optimal temperature window is negative five to negative twenty-five degrees Celsius, which is where ice-phase seeding works best. Step three: water droplets and ice crystals form around the particles in a process called nucleation — which just means something small becomes the seed for something bigger. Dust does this naturally in the atmosphere all the time. Step four: precipitation falls earlier and more efficiently than it would have on its own. The cloud does not produce more water than it contains. It just releases what it has, sooner, and more of it reaches the ground.`,
  },
  {
    num: '3b',
    title: 'The Orographic Cloud Seeding Process (NAWMC Diagram)',
    note: `This diagram from the North American Weather Modification Council shows exactly how orographic cloud seeding works in practice. Notice the numbered steps. One: a ground-based generator at the base of the mountain emits silver iodide particles. Two: the particles are carried upward by the natural air flow as it rises over the terrain. Three: in the supercooled liquid water zone — that orange band — the silver iodide particles act as artificial ice nuclei. Four: ice crystals and snowflakes form around those particles. And the result is additional snowfall on the lee side of the mountain that would not have occurred naturally. The key terms in the legend: silver iodide is the seeding agent, supercooled liquid water or SLW is the cloud zone where temperatures are below freezing but water is still in liquid form, and ice crystals and snowflakes are the desired output. This is not experimental technology. This diagram represents decades of operational practice across the Mountain West.`,
  },
  {
    num: 4,
    title: 'A Global Practice — Active Programs by Country',
    note: `This is happening everywhere. The UAE has been running continuous cloud seeding since 1990 — thirty-five years — and their data shows ten to fifteen percent more precipitation in targeted cloud systems. China has fifty thousand rocket launchers across twenty-three provinces and is expanding coverage to an area larger than India. India ran a program called CAIPEEX — the Cloud Aerosol Interaction and Precipitation Enhancement Experiment — which used a randomized controlled design, the same as a clinical drug trial, and found statistically significant increases in rainfall. The p value there — p less than 0.05 — just means the result was unlikely to be random chance. It passed the same bar as a published clinical trial. And the United States has twenty-seven active state programs, confirmed by a federal audit in 2010, mostly targeting hail suppression and agricultural water supply. This is not exotic technology. This is water infrastructure.`,
  },
  {
    num: 5,
    title: 'Closer to Home: Active U.S. State Programs',
    note: `Let me bring this home. The twenty-seven states confirmed by the GAO in 2010 are not just numbers on a report. Many of those programs are still running today. The American West has been quietly operating weather modification infrastructure for decades, mostly targeting mountain snowpack because snowpack is how the West stores water. It melts slowly in spring and feeds the rivers and reservoirs that supply cities and farms. Cloud seeding makes that snowpack larger and more reliable. The cost comparison is striking: cloud-seeded water costs five to ten dollars per acre-foot. An acre-foot is roughly the amount of water a typical household uses in a year. Producing that same acre-foot through desalination costs about three thousand dollars. Cloud seeding is not a climate solution. But as a water supply tool in the Mountain West, it is extraordinarily cost-effective. The next few slides go state by state.`,
  },
  {
    num: '5a',
    title: 'Texas — Agriculture & Hail Suppression',
    note: `Texas is the most extensive cloud seeding operation in the United States by land area. Five separate regional programs cover thirty-one million acres — that is one sixth of the entire state. Texas established its weather modification law in 1967, making it one of the earliest states to formally regulate the practice. The Texas Department of Licensing and Regulation licenses every operator and publishes annual operational reports. The programs serve two primary purposes: enhancing rainfall for dryland agriculture in the arid west and central regions, and suppressing hail. Hail causes hundreds of millions of dollars in crop and property damage across Texas every year. Cloud seeding disrupts hail formation by introducing more nucleation sites, which produces smaller ice particles that melt before reaching the ground. The state funded the program directly through 2004. Today it is sustained by underground water conservation districts — local entities that have decided cloud seeding is worth paying for.`,
  },
  {
    num: '5b',
    title: 'Utah — Snowpack Augmentation for the Colorado River',
    note: `Utah's program is probably the most consequential cloud seeding operation in the American West, because it is not just about Utah. The snowpack that accumulates in Utah's Wasatch and Uinta mountains feeds the Colorado River — the primary water source for forty million people across seven states and parts of Mexico. When Utah seeds clouds to increase snowpack, the downstream beneficiaries include Phoenix, Las Vegas, Los Angeles, and the agricultural regions of California and Arizona. That is why Arizona, California, and Nevada co-fund Utah's program. They are buying water security upstream. The legislature's seventeen million dollar investment in 2023 was the largest single appropriation in the program's history, driven by drought and declining reservoir levels at Lake Powell and Lake Mead. A hundred and eighty-five remote-controlled ground generators are positioned across the state, operated by technicians who monitor weather conditions and activate them when clouds are seeding-ready.`,
  },
  {
    num: '5c',
    title: 'Colorado — Western Slope Snowpack & Ski Industry',
    note: `Colorado has seven permitted winter cloud seeding projects on the Western Slope, all administered through the Colorado Water Conservation Board. The Western Slope is the part of Colorado west of the Continental Divide, where snowpack is the primary water source for both agriculture and the Colorado River system. The target is orographic clouds — clouds that form when moisture-laden air is forced upward over the Rocky Mountains. These clouds are ideal seeding targets because the terrain forces the air upward predictably, creating consistent conditions for ice crystal formation. Colorado's program serves two intersecting interests: agricultural water supply for the farms and ranches of western Colorado, and snowpack for the ski and outdoor recreation industry, which contributes more than five billion dollars annually to the state's economy. After this year's historically bad snowpack, the Water Conservation Board received inquiries from ski resorts looking to co-fund expanded seeding operations.`,
  },
  {
    num: '5d',
    title: 'Idaho — Mountain Snowpack for Agricultural Runoff',
    note: `Idaho's cloud seeding program targets mountain snowpack in the ranges that feed the Snake River, which is the backbone of Idaho's agricultural water supply. Idaho agriculture generates more than eight billion dollars annually — potatoes, dairy, beef, barley, and trout — and virtually all of it depends on reliable spring runoff from snowpack. The timing and volume of that runoff determines how much water farmers can draw for irrigation through the summer. Cloud seeding during winter storm events increases snowpack accumulation, which translates directly to more water available when it melts in April and May. Idaho has been expanding its program in recent years as part of a coordinated effort among Western states to actively manage water supplies in the face of persistent drought. The program operates in coordination with Wyoming, Utah, and Colorado through shared basin management frameworks — because the water does not stop at state lines.`,
  },
  {
    num: '5e',
    title: 'Arizona — Upstream Investment, No In-State Program Yet',
    note: `Arizona is a case study in regional water politics. The state has no active cloud seeding program of its own — Arizona's desert climate does not produce the orographic mountain clouds that make seeding effective. But Arizona is one of the largest funders of cloud seeding in the country, because the Central Arizona Project co-funds programs in Utah and Colorado. The CAP is a massive aqueduct system that carries Colorado River water three hundred miles from Lake Havasu to Phoenix and Tucson, serving more than five million residents. When Utah and Colorado seed clouds and increase snowpack, more water flows into the Colorado River, more water reaches Lake Mead and Lake Powell, and more water is available for the CAP to deliver to Arizona cities. It is a pragmatic solution: seed where the clouds are, collect the water where the people are. The Arizona legislature is also currently reviewing HB2056, a feasibility bill that would explore direct in-state weather modification for monsoon enhancement.`,
  },
  {
    num: 6,
    title: 'The Evidence: It Works — Under the Right Conditions',
    note: `So does it actually work? The evidence says yes, under the right conditions. The World Meteorological Organization — the United Nations agency for global weather science — reviewed the full body of research in 2022 and concluded that five to thirty percent precipitation enhancement is achievable when the cloud conditions are right. India's national randomized trial confirmed statistically significant rainfall increases. The UAE's thirty-year operational record shows ten to fifteen percent more precipitation in targeted systems. A program in Karnataka, India reported twenty-four percent more daily rainfall in seeded areas. And the Weather Research and Forecasting model — an industry-standard numerical simulation — confirmed five to fifteen percent enhancement in orographic clouds, which are mountain clouds. Mountain clouds form when moist air is forced upward by terrain, which makes them predictable and consistent targets. That is why the strongest results consistently come from mountain and tropical settings.`,
  },
  {
    num: 7,
    title: 'The Evidence: Legitimate Reasons for Skepticism',
    note: `But I want to be honest with you, because this is where the science gets complicated. A rigorous randomized trial in Queensland, Australia — published in the Bulletin of the American Meteorological Society — found no statistically significant effect at all. Zero. And that is a completely valid scientific result. It tells us something important: cloud seeding does not work the same way everywhere. Subtropical maritime clouds off the Queensland coast respond very differently from tropical monsoon clouds in India or mountain clouds in the UAE. And China's claimed results — hundreds of billions of cubic meters of additional rainfall every year — far exceed anything peer-reviewed science predicts is achievable, and the data is not independently accessible. Most operational programs worldwide have never been rigorously evaluated. The core problem is this: if rainfall varies by thirty percent year to year naturally, detecting a ten percent seeding signal requires years of careful randomized data. Most programs have never done that work. So the honest answer is: it works in some places, for some cloud types, under some conditions — and for most programs, we genuinely do not know.`,
  },
  {
    num: 8,
    title: 'When Governments Weaponized Weather: Operation Popeye',
    note: `Now I want to tell you about the moment weather modification stopped being about agriculture and became a weapon. From 1967 to 1972, the United States military ran a classified program called Operation Popeye over Vietnam, Laos, and Cambodia. The objective was to extend the monsoon season — to make it rain longer, harder, and in exactly the right places to flood the Ho Chi Minh Trail and make it impassable for North Vietnamese supply lines. They flew more than twenty-six hundred cloud seeding missions. The program was classified until journalist Jack Anderson revealed it in 1971. It was confirmed by the U.S. Senate Commerce Committee in 1978 — this is a declassified government document in the Congressional Record, available at govinfo.gov right now. And the program worked well enough that in 1978, the United Nations passed the Environmental Modification Convention — a treaty specifically banning the hostile use of weather modification. Think about that. The international community decided this was dangerous enough to prohibit by treaty. The treaty covers military use only. Civilian programs are completely unregulated internationally.`,
  },
  {
    num: '8b',
    title: 'The Reality on the Ground',
    note: `I want you to sit with this for a moment. The goal of Operation Popeye was not to make it rain. The goal was to make it so miserable, so relentlessly wet, for so many extra weeks, that the supply lines moving weapons and troops through the jungle would collapse under the mud. And it worked. This is not a hypothetical. The U.S. military's own assessment confirmed that cloud seeding achieved measurable disruption of enemy logistics. The soldiers in that photo are wading through floodwater that should not have been there. That is not an act of nature. That is a weapons program. The reason this matters today is not that anyone is necessarily doing this right now. It is that we know it is possible, we know it was done, and the treaty that was supposed to prevent it — ENMOD — only covers military use. Civilian programs that cross international borders and affect another country's water supply? Completely unregulated.`,
  },
  {
    num: 9,
    title: 'The Next Frontier: Stratospheric Aerosol Injection',
    note: `Everything I have described so far is local. Cloud seeding targets specific clouds in a specific region. What I am about to describe is planetary. Stratospheric Aerosol Injection — SAI — is a proposed intervention where sulfate aerosols are injected into the stratosphere, the layer of atmosphere between twelve and fifty kilometers above Earth's surface, to reflect sunlight and cool the planet. We have a natural proof of concept: in 1991, Mount Pinatubo erupted and ejected aerosols into the stratosphere, reducing global temperatures by about half a degree Celsius for eighteen months. SAI would do that deliberately and continuously. Climate models project one to two degrees of cooling achievable at two to eight billion dollars per year — which sounds like a lot until you compare it to the cost of unchecked warming. But there are two catastrophic risks. First, side effects: disrupted monsoon patterns, regional droughts, ozone thinning. Second, termination shock: if SAI is deployed for twenty years and then stopped suddenly — due to war, political collapse, or funding failure — the warming it was masking comes back all at once, faster than anything gradual climate change would have produced. And the part that should concern everyone in this room: there is currently no international governance framework for SAI. A single nation, or a single wealthy individual, could begin deployment unilaterally with no requirement for consent from anyone else on the planet.`,
  },
  {
    num: 10,
    title: 'The Governance Gap',
    note: `So here is where we actually are. The Government Accountability Office confirmed in 2010 that no single U.S. federal agency has authority to oversee all domestic weather modification programs. That was fifteen years ago. Nothing has changed. Internationally, the only relevant treaty — the 1978 Environmental Modification Convention — only prohibits military use. A country can run cloud seeding operations whose effects drift across international borders with no legal obligation to notify neighbors, share data, or compensate for reduced rainfall downstream. China is expanding its weather modification coverage to five and a half million square kilometers — an area larger than India — and there is no legal mechanism for any neighboring country to object, demand prior notification, or seek remedy if their rainfall decreases as a result. The World Meteorological Organization has called for mandatory randomized evaluation so we actually know what works, and for international prior-notification protocols so affected countries have advance warning. No one has acted on it. The technology is real. The programs are running. The rules do not exist.`,
  },
  {
    num: 11,
    title: 'Key Takeaways',
    note: `So here is what I want you to take away. Weather modification is real — fifty-six countries, peer-reviewed science, government funding. It works under the right conditions — the strongest evidence is in tropical and mountain settings. Governments have weaponized it — Operation Popeye is in the U.S. Senate record, available to anyone with a browser. Stratospheric aerosol injection operates at a planetary scale with no rules — and the cost is low enough that it is already within reach. And the governance gap is the most urgent problem — the capability exists, the programs are running, and the international frameworks to manage them do not. I am glad to share the full source list — everything I cited comes from WMO reports, GAO audits, peer-reviewed journals, or the U.S. Senate record. Not news articles. Not social media. Primary sources. Thank you. I am happy to take any questions.`,
  },
  {
    num: 12,
    title: 'Sources, References & Research Methodology',
    note: `This is for reference and for anyone who wants to dig deeper. Every claim in this presentation has a primary source — government reports, peer-reviewed journals, or the U.S. Senate record. None of it comes from news articles or secondary sources. The research was conducted using the Semantic Scholar API to surface papers, with a structured scoring rubric that weighted each paper by how directly it answered the research question, how recently it was published, and how widely it has been cited. Papers scoring below 0.45 were used only for supporting context. Papers scoring above 0.70 were treated as primary evidence. I am glad to share the full methodology and source list with anyone who wants it.`,
  },
  {
    num: 13,
    title: 'Happy Birthday, Ryan!',
    note: `I lied. There is one more slide. Ryan, you are forty years old today, and I love you. Thank you for letting me inflict a conspiracy-adjacent weather research presentation on everyone at your birthday party. I hope the fact that it was all peer-reviewed and government-documented makes it at least slightly more acceptable. Happy birthday. Conspiracon 2026.`,
  },
];

function slideBlock(slide) {
  const paragraphs = [];

  // Slide label
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `SLIDE ${slide.num}`,
          bold: true,
          size: 18,
          color: 'B8860B',
          font: 'Arial',
        }),
      ],
      spacing: { before: 320, after: 40 },
    })
  );

  // Slide title
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: slide.title,
          bold: true,
          size: 26,
          color: '1A1A2E',
          font: 'Arial',
        }),
      ],
      spacing: { after: 120 },
      border: {
        bottom: { style: 'single', size: 6, color: 'B8860B', space: 4 },
      },
    })
  );

  // Speaker note body
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: slide.note,
          size: 24,
          font: 'Arial',
          color: '222222',
        }),
      ],
      spacing: { before: 120, after: 80, line: 340 },
    })
  );

  return paragraphs;
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: 'Conspiracon 2026  |  Page ', size: 16, color: '888888', font: 'Arial' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '888888', font: 'Arial' }),
              ],
            }),
          ],
        }),
      },
      children: [
        // Cover heading
        new Paragraph({
          children: [
            new TextRun({ text: 'CONSPIRACON 2026', bold: true, size: 28, color: 'B8860B', font: 'Arial', characterSpacing: 60 }),
          ],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Controlling the Sky: Speaker Notes', bold: true, size: 40, color: '1A1A2E', font: 'Arial' }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Read word for word. ~130 words per minute. Total runtime: ~12 minutes.', size: 20, color: '666666', font: 'Arial', italics: true }),
          ],
          spacing: { after: 400 },
          border: { bottom: { style: 'single', size: 12, color: '1A1A2E', space: 6 } },
        }),

        // All slides
        ...slides.flatMap(slideBlock),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buffer);
console.log(`Generated: ${OUT}`);
