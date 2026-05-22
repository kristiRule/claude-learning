#!/usr/bin/env python3
"""
Generate an Anki .apkg deck from a JSON card batch.

Usage:
    python3 create-anki-cards.py <batch.json> [output.apkg]

The batch JSON must match the format in references/example-batch.md.
If output path is omitted, the .apkg is saved alongside the batch file.
"""

import json
import sys
import os
import hashlib
import genanki

# ── Card model ────────────────────────────────────────────────────────────────

STYLE_PATH = os.path.join(os.path.dirname(__file__), '..', 'assets', 'card-styles.css')
with open(STYLE_PATH) as f:
    CSS = f.read()

def make_model(deck_name: str) -> genanki.Model:
    # Stable model ID derived from deck name so re-runs don't create duplicates
    model_id = int(hashlib.md5(f"model:{deck_name}".encode()).hexdigest()[:8], 16)
    return genanki.Model(
        model_id,
        'AI Knowledge Bits — Basic',
        fields=[
            {'name': 'Front'},
            {'name': 'Back'},
            {'name': 'Source'},
        ],
        templates=[{
            'name': 'Card',
            'qfmt': '<div class="front">{{Front}}</div>',
            'afmt': (
                '<div class="front">{{Front}}</div>'
                '<hr>'
                '<div class="back">{{Back}}</div>'
                '{{#Source}}<div class="source">{{Source}}</div>{{/Source}}'
            ),
        }],
        css=CSS,
    )

# ── Helpers ───────────────────────────────────────────────────────────────────

def detect_category(deck_name: str) -> str:
    """Extract the top-level category from a '::' separated deck name."""
    return deck_name.split('::')[0].strip()

def make_note(model: genanki.Model, card: dict, source: str) -> genanki.Note:
    # Stable note ID derived from the question text
    note_id = int(hashlib.md5(card['front'].encode()).hexdigest()[:8], 16)
    return genanki.Note(
        model=model,
        fields=[
            card.get('front', ''),
            card.get('back', ''),
            card.get('source', source),
        ],
        guid=note_id,
    )

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    batch_path = sys.argv[1]
    with open(batch_path) as f:
        batch = json.load(f)

    deck_name = batch.get('deck_name', 'AI Knowledge Bits')
    source    = batch.get('source', '')
    cards     = batch.get('cards', [])

    if not cards:
        print('No cards found in batch — nothing to generate.')
        sys.exit(0)

    category = detect_category(deck_name)
    print(f'Deck:     {deck_name}')
    print(f'Category: {category}')
    print(f'Cards:    {len(cards)}')

    model = make_model(deck_name)
    deck_id = int(hashlib.md5(deck_name.encode()).hexdigest()[:8], 16)
    deck = genanki.Deck(deck_id, deck_name)

    for card in cards:
        deck.add_note(make_note(model, card, source))

    if len(sys.argv) >= 3:
        out_path = sys.argv[2]
    else:
        base = os.path.splitext(batch_path)[0]
        out_path = base + '.apkg'

    genanki.Package(deck).write_to_file(out_path)
    print(f'Saved:    {out_path}')

if __name__ == '__main__':
    main()
