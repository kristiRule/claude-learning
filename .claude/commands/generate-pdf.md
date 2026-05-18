Generate a PDF document based on: $ARGUMENTS

## Steps

1. **Understand the request** — parse $ARGUMENTS to determine:
   - Document title and content sections
   - Any structured data (tables, lists, key-value pairs)
   - Approximate length and style (report, summary, invoice, etc.)

2. **Install the dependency** if not already present:
   ```bash
   npm list pdf-lib 2>/dev/null | grep pdf-lib || npm install pdf-lib
   ```

3. **Write a Node.js generation script** to `gen-pdf.mjs` in the project root (not `/tmp` — the ESM resolver walks up from the script's location to find `node_modules`). The script should:
   - Import from `pdf-lib` using ESM (`import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'`)
   - Create a PDFDocument and add pages as needed
   - Use `Helvetica-Bold` for headings and `Helvetica` for body text
   - Draw text with `page.drawText(...)`, using `x`/`y` coordinates and appropriate `size`
   - Handle page overflow by adding new pages when `y` drops below a margin (e.g. 50)
   - Save with `fs.writeFile` using the bytes from `await pdfDoc.save()`
   - Output file to the current working directory with a descriptive name like `output.pdf`

4. **Run the script**:
   ```bash
   node gen-pdf.mjs
   ```

5. **Confirm success** — report the file name and location, and describe the document structure (page count, sections included).

## Notes
- If the user provides specific content in $ARGUMENTS, use it exactly
- If no content is provided, generate realistic placeholder content that fits the topic
- Keep a consistent left margin (e.g. x: 50) and top start (e.g. y: 750 on letter-size 612×792)
- Section headings should use a larger font size (e.g. 16) and body text 11–12pt
- Add page numbers at the bottom of each page
