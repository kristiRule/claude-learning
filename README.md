# UIGen

AI-powered React component generator with live preview.

## Prerequisites

- Node.js 18+
- npm

## Setup

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

## Running the Application

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

1. Sign up or continue as anonymous user
2. Describe the React component you want to create in the chat
3. View generated components in real-time preview
4. Switch to Code view to see and edit the generated files
5. Continue iterating with the AI to refine your components

## Features

- AI-powered component generation using Claude
- Live preview with hot reload
- Virtual file system (no files written to disk)
- Syntax highlighting and code editor
- Component persistence for registered users
- Export generated code

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma with SQLite
- Anthropic Claude AI
- Vercel AI SDK

## Demos

The [`demos/`](demos/) directory holds standalone Claude Code learning
projects, independent of the UIGen app above. Each is self-contained and
needs no API key to run.

| Demo | What it is |
|---|---|
| [`ai-overview/`](demos/ai-overview/) | A ~25 min AI/AGI lightning talk, built through a gated, source-verified research pipeline. Generates a 37-slide `.pptx` and a speaker-notes `.docx` from Node. |
| [`weather/`](demos/weather/) | Weather-modification research synthesis: source triage through Semantic Scholar, structured extraction, and a generated deck, report, and pamphlet. |
| [`dragon-con/`](demos/dragon-con/) | Event-planning collateral generation: slide deck, cheatsheet `.docx`, and client-list `.xlsx` driven by a shared style guide. |
| [`ai-fluency/`](demos/ai-fluency/) | Short reference cheatsheets on prompting and context strategies, output as `.docx` and `.pdf`. |
| [`mcp/`](demos/mcp/) | A custom MCP server exposing Google Drive upload as a tool, backed by rclone. |
| [`anki/`](demos/anki/) | Flashcard generation experiments. |

The research-pipeline slash commands these build on live in
[`.claude/commands/`](.claude/commands/).
