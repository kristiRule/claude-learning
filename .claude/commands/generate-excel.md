Generate an Excel spreadsheet (.xlsx) based on: $ARGUMENTS

## Steps

1. **Understand the request** — parse $ARGUMENTS to determine:
   - What data/content the spreadsheet should contain
   - How many sheets are needed
   - Any formatting preferences (headers, totals rows, etc.)

2. **Install the dependency** if not already present:
   ```bash
   npm list xlsx 2>/dev/null | grep xlsx || npm install xlsx
   ```

3. **Write a Node.js generation script** to `gen-excel.mjs` in the project root (not `/tmp` — the ESM resolver walks up from the script's location to find `node_modules`). The script should:
   - Import `xlsx` using ESM (`import * as XLSX from 'xlsx'`)
   - Build the workbook with appropriate sheets, headers, and sample/provided data
   - Use `XLSX.utils.aoa_to_sheet` or `XLSX.utils.json_to_sheet` as appropriate
   - Save the file to the current working directory with a descriptive name like `output.xlsx`

4. **Run the script**:
   ```bash
   node gen-excel.mjs
   ```

5. **Confirm success** — report the file name and location, and describe what was generated (sheet names, row counts, any notable structure).

## Notes
- If the user provides sample data in $ARGUMENTS, use it exactly
- If no data is provided, generate realistic placeholder data that fits the topic
- Column headers should be bold-friendly (xlsx supports cell styles via the `!cols` property)
- For multiple sheets, use descriptive tab names
