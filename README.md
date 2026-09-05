# claude-learning

A working repository for learning [Claude Code](https://claude.com/claude-code) in
depth: custom slash commands, a custom MCP server, and a set of demos that
use them to produce real deliverables.

Two halves:

- **[`demos/`](demos/)**: self-contained projects that turn research into
  documents: slide decks, reports, cheatsheets, spreadsheets, flashcards.
  These are where most of the learning happened. None require an API key.
- **[UIGen](#uigen)**: the Next.js application the repo started from, an
  AI-powered React component generator with live preview.

---

## Demos

| Demo | What it is |
|---|---|
| [`research-pipeline/`](demos/research-pipeline/) | A gated, source-verified research workflow that turns a question into a slide deck, a speaker script, and a standalone report. Sources are scored before use, every claim is tagged fact or opinion, and review gates catch unsupported sections before anything is written. Worked example: a ~25 min AI/AGI talk. |
| [`weather/`](demos/weather/) | The same workflow applied to weather-modification research, sourced through the Semantic Scholar API. Produces a deck, a report, and a pamphlet. |
| [`mcp/`](demos/mcp/) | A custom MCP server exposing Google Drive upload as a tool Claude can call, backed by rclone. Includes full OAuth setup. |
| [`dragon-con/`](demos/dragon-con/) | Event collateral from a shared style guide: slide deck, cheatsheet `.docx`, and client-list `.xlsx`. |
| [`ai-fluency/`](demos/ai-fluency/) | Short reference cheatsheets on prompting and context strategies, generated to `.docx` and `.pdf`. |
| [`anki/`](demos/anki/) | Spaced-repetition flashcards generated from source material into an importable `.apkg` deck. |

### Custom slash commands

The commands in [`.claude/commands/`](.claude/commands/) are what the demos
drive. Four of them chain into a staged research workflow:

| Command | Role |
|---|---|
| `discover-sources` | Search and triage sources, score and rank them |
| `extract-content` | Turn each source into a structured knowledge record |
| `synthesize-report` | Cross-source analysis, then draft and verify |
| `research-pipeline` | Orchestrates the three above, with human gates between stages |

The rest generate artifacts: `generate-pptx`, `generate-pdf`, `generate-excel`,
`docx`, `doc-cheat-sheet-generator`, `generate-anki-cards`, plus `audit` and
`write_tests`.

### Document tooling used across demos

`pptxgenjs` for slides, `docx` for Word documents, `pdfkit` and LibreOffice
for PDFs, `exceljs` for spreadsheets, and `genanki` for flashcards.
LibreOffice headless plus poppler `pdftoppm` renders slides to images for
visual QA, which has caught layout bugs that were invisible in source.

---

## UIGen

AI-powered React component generator with live preview. This is the
application the repository was originally built around; the demos above are
independent of it.

### Prerequisites

- Node.js 18+
- npm

### Setup

1. **Optional** Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your-api-key-here
```

The project will run without an API key. Rather than using a LLM to generate components, static code will be returned instead.

2. Install dependencies and initialize database

```bash
npm run setup
```

This command will:

- Install all dependencies
- Generate Prisma client
- Run database migrations

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Usage

1. Sign up or continue as anonymous user
2. Describe the React component you want to create in the chat
3. View generated components in real-time preview
4. Switch to Code view to see and edit the generated files
5. Continue iterating with the AI to refine your components

### Features

- AI-powered component generation using Claude
- Live preview with hot reload
- Virtual file system (no files written to disk)
- Syntax highlighting and code editor
- Component persistence for registered users
- Export generated code

### Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma with SQLite
- Anthropic Claude AI
- Vercel AI SDK
