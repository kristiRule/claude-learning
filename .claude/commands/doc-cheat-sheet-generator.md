---
name: Doc Cheat Sheet Generator
description: >
  What it does: Takes in papers, URLs, or local documents and converts them
  into a structured Word document aligned with a style guide and formatting rules.
  When to use: Use this skill when the user requests a Word document cheat sheet
  out of a paper, PDF, URL, or local document.
  Key capabilities: Generates an actionable cheat sheet .docx from any source
  document; produces a functional, summarized doc that strictly follows the AI
  Knowledge Bits style and format guide; embeds the cover logo.
---

# Document Cheat Sheet Generator

## Step 1 — Load the source document

Read the document in its entirety from whatever source the user provides:
- **URL / arXiv link:** fetch and read the full content
- **Local .pdf:** extract text using `pandoc` or by unpacking
- **Local .md / .docx / .txt:** read directly

Do not summarize yet — read everything first.

## Step 2 — Load the style guide and convert

Load and strictly apply the formatting and style rules from:
`demos/ai-fluency/references/style-format-guide.md`

Then extract only the actionable insights from the source document that relate
to everyday practice. For each insight:
- Write a concise tip title (Title Case, max 8 words)
- Find a direct verbatim quote from the source that supports it (under 25 words)
- Write one plain-English action bullet in second person, present tense (max 20 words)

Target 8–12 tips. Aim for 2 pages maximum.

Use the `/docx` skill to generate the Word document. Save it to the same
directory as the source, or to `demos/ai-fluency/` if the source is a URL.
Name the file after the source paper using kebab-case + `-cheatsheet.docx`.

## Step 3 — Embed the cover logo

Place the AI Knowledge Bits logo at the top of the document:
- Source: `demos/ai-fluency/assets/icon.png`
- Position: right-aligned, top of first page
- Size: 1.2" × 1.2"
- No border, no caption

The document title sits left-aligned at the same vertical position as the logo,
creating a two-column header effect using tab stops (never a table).

## Step 4 — Output

Deliver only the `.docx` file. Include a one-sentence summary in your response
describing how many tips were extracted and the page count.
