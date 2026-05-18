Generate a PowerPoint presentation (.pptx) based on: $ARGUMENTS

## Style Guide

Before writing any slide content, read and apply `demos/dragon-con/STYLE_GUIDE.md`.
Key rules that must be enforced in every deck:

- **Voice:** Bold, community-first, fantasy-infused, second-person ("you"), action-oriented bullets (start with verbs)
- **Structure:** One idea per slide, max 5 bullets, max 8 words per bullet, no paragraphs on slides
- **Colors:** Titles in Dragon Gold `#B8860B`, dark background `#1A1A2E`, body text `#F0EDE6`
- **Level naming:** Always "Dragon Raider Level 1 / 2 / 3" — never abbreviate
- **Swag naming:** lowercase mid-sentence ("dice," "dice tray," "flagon")
- **Speaker notes:** every content slide needs a one-sentence point, one off-slide talking point, and a transition cue

## Steps

1. **Understand the request** — parse $ARGUMENTS to determine:
   - Presentation title and overall topic
   - Number of slides and their content (or generate a logical structure if not specified)
   - Any data to visualize (charts, tables) vs. bullet-point content

2. **Install the dependency** if not already present:
   ```bash
   npm list pptxgenjs 2>/dev/null | grep pptxgenjs || npm install pptxgenjs
   ```

3. **Write a Node.js generation script** to `gen-pptx.mjs` in the project root (not `/tmp` — the ESM resolver walks up from the script's location to find `node_modules`). The script should:
   - Import using ESM (`import PptxGenJS from 'pptxgenjs'`)
   - Create a `new PptxGenJS()` instance and set `pres.layout = 'LAYOUT_16x9'`
   - Add a title slide with `pres.addSlide()`, then use `slide.addText()` for heading and subtitle
   - Add content slides: use `slide.addText()` for the title and `slide.addText()` with bullet options for body content
   - Use `{ fontSize: 28, bold: true }` for slide titles, `{ fontSize: 18 }` for body
   - Set a consistent color theme (e.g. dark blue `'003366'` for titles, `'333333'` for body)
   - Save with `await pres.writeFile({ fileName: 'output.pptx' })` in the current working directory

4. **Run the script**:
   ```bash
   node gen-pptx.mjs
   ```

5. **Confirm success** — report the file name and location, and list the slide titles that were generated.

## Notes
- If the user provides specific content or slide titles in $ARGUMENTS, use them exactly
- If no content is provided, generate a logical 5–7 slide structure for the topic (title, agenda, 3-4 content slides, summary/next steps)
- Bullet points should be concise — 5–6 words max per bullet, 3–5 bullets per slide
- For tables or charts, use `slide.addTable()` or `slide.addChart()` as appropriate
