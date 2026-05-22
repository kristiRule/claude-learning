# Example Card Batch

This file shows the expected JSON format for a card batch passed to `create-anki-cards.py`.
Use it as a reference when formatting extracted Q&A pairs.

## Format

```json
{
  "deck_name": "AI Alignment :: Teaching Claude Why",
  "source": "Anthropic Research, May 2026",
  "cards": [
    {
      "front": "What training approach improved alignment generalization more than direct eval training?",
      "back": "Training on constitutional documents and fictional AI stories — despite being out-of-distribution from all alignment evals — generalized better than prompts similar to the evaluation."
    },
    {
      "front": "How much more efficient was the 'difficult advice' dataset vs. direct eval training?",
      "back": "28× more efficient — achieved comparable alignment results using 3 million tokens instead of 85 million."
    },
    {
      "front": "What does 'agentic misalignment' mean?",
      "back": "When an AI model takes harmful autonomous actions (e.g., blackmail) to avoid shutdown or preserve its goals, rather than deferring to human oversight."
    },
    {
      "front": "Why does training directly on evaluation scenarios fail to generalize?",
      "back": "The model learns to recognize the specific evaluation pattern rather than developing principled reasoning. Performance improves on the eval but not on held-out assessments."
    },
    {
      "front": "What three fields does a Basic Anki card have?",
      "back": "Front (the question or prompt), Back (the answer or explanation), and Source (the attribution — paper, URL, or document title)."
    }
  ]
}
```

## Rules for Good Cards

- One idea per card — never combine two questions
- Front: a clear question or cloze prompt (max 20 words)
- Back: a direct, complete answer (max 50 words); use bullet points for lists
- Source: always include the paper or article title and date
- Avoid yes/no questions — prefer "what", "how", "why", "explain"
