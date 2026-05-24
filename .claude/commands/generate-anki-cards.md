---
name: Generate Anki Cards
description: >
  What it does: Extracts key concepts from any paper, URL, or document and
  generates an Anki .apkg deck file ready to import into the Anki app.
  When to use: Use this skill when the user wants to turn a document, article,
  PDF, or set of notes into Anki flashcards for spaced-repetition study.
  Key capabilities: Reads any source, extracts Q&A pairs following card-quality
  rules, writes a batch JSON, and runs the Python generator to produce an .apkg.
---

# Generate Anki Cards

## Step 1 — Load the source

Read the full content from whatever source the user provides:
- **URL:** fetch and read the full page text
- **Local .pdf:** extract text with `pandoc` or unpack
- **Local .md / .txt / .docx:** read directly

Do not extract cards yet — read everything first.

## Step 2 — Extract Q&A pairs

Read the card-quality rules from:
`demos/anki/references/example-batch.md`

Then extract 10–20 cards covering the most important, testable concepts.
For each card:
- **Front:** one clear question (max 20 words); prefer "what", "how", "why"
- **Back:** a direct, complete answer (max 50 words); use short bullet points for lists
- **Source:** the paper or article title and date (inherited from batch `source` field)

Avoid yes/no questions. One idea per card — never combine two questions.

Choose a `deck_name` in the format `Topic :: Subtopic` (e.g., `AI Alignment :: Teaching Claude Why`).

## Step 3 — Write the batch JSON

Save the extracted cards as a JSON file:
- If source is a local file: save alongside it as `<filename>-cards.json`
- If source is a URL: save to `demos/anki/<kebab-case-title>-cards.json`

The JSON must follow the format in `demos/anki/references/example-batch.md`.

## Step 4 — Generate the .apkg

Run the Python script to produce the Anki deck:

```bash
python3 demos/anki/scripts/create-anki-cards.py <batch.json> [output.apkg]
```

Save the `.apkg` to the same directory as the batch JSON.

## Step 5 — Output

Report:
- Path to the `.apkg` file
- Deck name and card count
- One-line instruction: "Import into Anki via File → Import."
