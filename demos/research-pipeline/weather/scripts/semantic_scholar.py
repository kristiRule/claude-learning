#!/usr/bin/env python3
"""
Search Semantic Scholar for papers on a topic and return ranked results.

Usage:
    python3 semantic_scholar.py "weather modification cloud seeding" --limit 20 --year-from 2015
    python3 semantic_scholar.py "stratospheric aerosol injection geoengineering" --limit 20

Output: JSON array of ranked papers to stdout. Each paper includes the real
DOI/URL so citations point to the original source, not Semantic Scholar.
"""

import json
import sys
import time
import argparse
import urllib.request
import urllib.parse
import urllib.error

BASE_URL = "https://api.semanticscholar.org/graph/v1/paper/search"

FIELDS = ",".join([
    "title",
    "abstract",
    "year",
    "citationCount",
    "authors",
    "journal",
    "externalIds",      # contains DOI
    "openAccessPdf",    # free full-text URL if available
    "url",              # Semantic Scholar page (used only to resolve DOI)
    "publicationTypes",
    "publicationDate",
])

# Authoritative sources for weather modification research
AUTHORITY_SOURCES = {
    "high": ["WMO", "NOAA", "GAO", "NASA", "IPCC", "NAS", "EPA", "NCAR"],
    "medium": ["AMS", "AGU", "EGU", "Royal Meteorological Society"],
}


def search(query: str, limit: int = 20, year_from: int = None, retries: int = 3) -> list:
    params = {
        "query": query,
        "limit": min(limit, 100),
        "fields": FIELDS,
    }
    if year_from:
        params["year"] = f"{year_from}-"

    url = BASE_URL + "?" + urllib.parse.urlencode(params)

    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
                return data.get("data", [])
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = 15 * (attempt + 1)
                print(f"  Rate limited — waiting {wait}s (attempt {attempt+1}/{retries})", file=sys.stderr)
                time.sleep(wait)
            else:
                print(f"  HTTP {e.code}: {e.reason}", file=sys.stderr)
                break
        except Exception as e:
            print(f"  Error: {e}", file=sys.stderr)
            time.sleep(5)

    return []


def resolve_citation_url(paper: dict) -> str:
    """Return the best URL pointing to the original source, not Semantic Scholar."""
    ext = paper.get("externalIds") or {}

    # DOI is the gold standard for academic papers
    if ext.get("DOI"):
        return f"https://doi.org/{ext['DOI']}"

    # ArXiv is acceptable for preprints
    if ext.get("ArXiv"):
        return f"https://arxiv.org/abs/{ext['ArXiv']}"

    # PubMed for medical/health research
    if ext.get("PubMed"):
        return f"https://pubmed.ncbi.nlm.nih.gov/{ext['PubMed']}/"

    # Open access PDF as a fallback
    if paper.get("openAccessPdf") and paper["openAccessPdf"].get("url"):
        return paper["openAccessPdf"]["url"]

    # Last resort: Semantic Scholar page (caller should note this in citations)
    return paper.get("url", "")


def authority_bonus(paper: dict) -> float:
    """Return a 0.0–1.0 bonus for papers from authoritative institutions."""
    text = json.dumps(paper).upper()
    for src in AUTHORITY_SOURCES["high"]:
        if src.upper() in text:
            return 1.0
    for src in AUTHORITY_SOURCES["medium"]:
        if src.upper() in text:
            return 0.5
    return 0.0


def score(paper: dict, current_year: int = 2025) -> float:
    """
    40% relevance (citation count proxy) + 30% recency + 30% impact (authority + citations).
    """
    citations = paper.get("citationCount") or 0
    year      = paper.get("year") or 2000
    abstract  = paper.get("abstract") or ""

    # Relevance: non-zero abstract + normalized citation count
    has_abstract = 1.0 if len(abstract) > 50 else 0.0
    citation_norm = min(citations / 500, 1.0)
    relevance = 0.6 * has_abstract + 0.4 * citation_norm

    # Recency: papers from last 5 years score highest
    age = max(0, current_year - year)
    recency = max(0.0, 1.0 - age / 10)

    # Impact: authority bonus + citation count
    impact = 0.5 * authority_bonus(paper) + 0.5 * citation_norm

    return round(0.40 * relevance + 0.30 * recency + 0.30 * impact, 4)


def format_paper(paper: dict, rank: int, query_score: float) -> dict:
    authors = [a.get("name", "") for a in (paper.get("authors") or [])[:3]]
    if len(paper.get("authors") or []) > 3:
        authors.append("et al.")

    journal = ""
    if paper.get("journal"):
        journal = paper["journal"].get("name", "")

    return {
        "rank":         rank,
        "score":        query_score,
        "title":        paper.get("title", "Untitled"),
        "authors":      authors,
        "year":         paper.get("year"),
        "journal":      journal,
        "citations":    paper.get("citationCount", 0),
        "abstract":     (paper.get("abstract") or "")[:400],
        "citation_url": resolve_citation_url(paper),   # always the real source
        "doi":          (paper.get("externalIds") or {}).get("DOI"),
        "open_access":  bool(paper.get("openAccessPdf")),
        "pub_types":    paper.get("publicationTypes") or [],
    }


def main():
    parser = argparse.ArgumentParser(description="Search Semantic Scholar and rank results.")
    parser.add_argument("query",      help="Search query string")
    parser.add_argument("--limit",    type=int, default=20)
    parser.add_argument("--year-from", type=int, default=None, dest="year_from")
    parser.add_argument("--out",      default=None, help="Output JSON file (default: stdout)")
    args = parser.parse_args()

    print(f"Searching: \"{args.query}\"  limit={args.limit}", file=sys.stderr)
    raw = search(args.query, limit=args.limit, year_from=args.year_from)
    print(f"Retrieved: {len(raw)} papers", file=sys.stderr)

    scored = sorted(raw, key=lambda p: score(p), reverse=True)
    results = [format_paper(p, i + 1, score(p)) for i, p in enumerate(scored)]

    output = json.dumps(results, indent=2)
    if args.out:
        with open(args.out, "w") as f:
            f.write(output)
        print(f"Saved: {args.out}", file=sys.stderr)
    else:
        print(output)


if __name__ == "__main__":
    main()
