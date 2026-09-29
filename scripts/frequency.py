# /// script
# requires-python = ">=3.11"
# dependencies = ["camel-tools"]
# ///
"""
Counts verb lemmas in the CAMeL Lab MSA frequency list, the first of two steps building the home
verb list's "Most common" sort. Writes .caches/frequency/verb-lemmas.tsv; `npm run frequency` then
maps those lemmas to verb ids.

Usage:
  uvx --from camel-tools camel_data -i disambig-mle-calima-msa-r13   # once, about 130 MB
  uv run scripts/frequency.py <path-to-MSA_freq_lists.tsv>

Source: CAMeL Arabic Frequency Lists v1.0 and CAMeL Tools, CAMeL Lab, NYU Abu Dhabi,
https://github.com/CAMeL-Lab/Camel_Arabic_Frequency_Lists (CC BY-SA 4.0). The TSV is not committed.

Each word type is analysed on its own, without context, so a type counts wholly towards its most
likely reading: قسم goes to the noun قِسْم, يعمل to the verb عَمِل.
"""

import sys
from collections import Counter
from pathlib import Path

from camel_tools.disambig.mle import MLEDisambiguator

# Types seen at least this often cover 97.7% of the list's tokens and analyse in under a minute.
MIN_COUNT = 1000
BATCH_SIZE = 5000
OUTPUT = Path(__file__).parent.parent / ".caches/frequency/verb-lemmas.tsv"

if len(sys.argv) != 2:
    sys.exit("Usage: uv run scripts/frequency.py <path-to-MSA_freq_lists.tsv>")

disambiguator = MLEDisambiguator.pretrained()
counts: Counter[str] = Counter()


def count_verbs(batch: list[tuple[str, int]]) -> None:
    words = [word for word, _ in batch]
    for result, (_, count) in zip(disambiguator.disambiguate(words), batch):
        if result.analyses and result.analyses[0].analysis["pos"] == "verb":
            counts[result.analyses[0].analysis["lex"]] += count


batch: list[tuple[str, int]] = []
with open(sys.argv[1], encoding="utf-8") as corpus:
    for line in corpus:
        word, _, count = line.rstrip("\n").partition("\t")
        if int(count) < MIN_COUNT:
            continue
        batch.append((word, int(count)))
        if len(batch) == BATCH_SIZE:
            count_verbs(batch)
            batch.clear()
count_verbs(batch)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text("".join(f"{lemma}\t{count}\n" for lemma, count in counts.most_common()), encoding="utf-8")
print(f"Wrote {len(counts)} verb lemmas to {OUTPUT}")
