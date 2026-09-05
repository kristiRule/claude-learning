# Publishing: Building and Shipping a Run

Paths below use `<run>` for the run directory, e.g. `ai-agi-overview`.

Steps to regenerate the artifacts and get them to Google Drive.

---

## 1. Build the artifacts

Both generators are standalone; run from the repo root.

```bash
node demos/research-pipeline/ai-agi-overview/gen-deck.mjs           # -> deck.pptx
node demos/research-pipeline/ai-agi-overview/gen-speaker-notes.mjs  # -> speaker-notes.docx
node demos/research-pipeline/ai-agi-overview/gen-report.mjs         # -> report/report.md + research-report.docx
```

`gen-report.mjs` is independent: it reads `sources/selected-sources.json`
directly, so its bibliography cannot drift from the scored source list.

**Keep the deck and speaker notes in sync by hand.** `gen-speaker-notes.mjs` holds its own copy
of every `addNotes()` string, in slide order, with explicit `num:` fields.
There is no automated extraction. If you add, remove, or reorder a slide
in the pptx script, update the notes script to match and renumber.

---

## 2. Visual QA before shipping

LibreOffice renders the deck to PDF, then `pdftoppm` turns pages into PNGs
you can actually look at. This has caught real bugs (labels running off
slide edges, text hidden behind callout boxes, a diagram missing its
connecting lines) that were invisible from the source alone.

```bash
cd demos/research-pipeline/<run>
soffice --headless --convert-to pdf --outdir /tmp/deck-check deck.pptx
cd /tmp/deck-check && pdftoppm -png -r 100 ai-overview-deck.pdf slide
# renders slide-01.png, slide-02.png, ...
# single slide:  pdftoppm -png -r 100 -f 17 -l 17 ai-overview-deck.pdf s17
```

Close the `.docx`/`.pptx` in LibreOffice before committing: an open file
leaves a `.~lock.<name>#` file containing your local username and
hostname. Those are gitignored, but delete strays if you see them.

---

## 3. Upload to Google Drive

Uses `rclone` with the `gdrive:` remote. The
`claude-learning` folder is the existing convention (the weather demo
uses it too).

```bash
cd demos/research-pipeline/<run>
~/bin/rclone copy deck.pptx          gdrive:claude-learning/
~/bin/rclone copy speaker-notes.docx gdrive:claude-learning/
~/bin/rclone copy research-report.docx           gdrive:claude-learning/

# verify
~/bin/rclone lsl gdrive:claude-learning/
```

`copy` overwrites the same filename in place, so re-running after edits
updates the file rather than piling up duplicates. Byte counts in `lsl`
should match the local files exactly; if they differ, something was
converted rather than uploaded raw.

### Token expiry (this will bite you)

The OAuth consent screen sits in "Testing" mode, so **tokens expire about
every 7 days.** You'll see:

```
CRITICAL: Failed to create file system for "gdrive:":
couldn't fetch token: invalid_grant: maybe token expired?
```

Fix, which needs a real browser and cannot be automated:

```bash
~/bin/rclone config reconnect gdrive:
```

In Claude Code, prefix with `!` to run it in-session:
`! ~/bin/rclone config reconnect gdrive:`

### Why not the MCP route?

`demos/mcp/gdrive-server.mjs` wraps this same rclone call as an MCP tool,
but as of 2026-09 it is **not registered** with Claude Code (`claude mcp
list` shows only the claude.ai Google Drive connector), and its documented
registration path is stale (`~/Desktop/claude-learning/...` rather than
`~/Desktop/repos/claude-learning/...`).

The claude.ai Google Drive connector *can* create files, but it takes
content as base64 in the tool call. The deck is ~580 KB, which is ~790 KB
base64 — impractical to push through a tool call. **Use rclone directly
for binaries.**

---

## 4. Pre-publish check

This repo is public-facing, so before committing:

- **Keep examples general.** Slide content describes industry-wide
  patterns. Anything specific to a particular workplace belongs in the
  room, not in the file.
- **No stray lock/temp files** (`.~lock.*#`, `~$*`) — gitignored, but check.
- `.env` stays untracked (already gitignored at the repo root).
- No API keys, tokens, Drive folder IDs, or email addresses in tracked files.
