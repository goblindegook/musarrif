---
name: add-verb
description: Use when adding an Arabic verb entry, root, or verb form to the dataset and locale files, or when a conjugated form is wrong and the derivation needs correcting.
argument-hint: "[root, verb ID, conjugated form, or problem, e.g. رمى or ktb-1 or رمي past 3fs]"
---

# Add or Correct an Arabic Verb

One flow covers both jobs: generate the reference test, then make it pass. Adding a verb and fixing a wrong conjugation differ only in what turns out to be at fault: the dataset row, or the derivation code.

## Quick Flow

1. Identify the target root and form from `$ARGUMENTS`.
2. Generate the test file:

```bash
rtk mise exec -- npm run add:tests -- wiktionary <verb-id> [<vowels>]
```

Both scripts take `<source> <verb-id> [<vowels>]`. For a Form I triliteral verb, pass the vowel pattern (`a-u`, `a-i`, `i-a`, …) as the third argument whenever the root has more than one Form I conjugation. It selects the Wiktionary table, the ElixirFM lexeme, and the Qutrub reading, and overrides the dataset entry when one already exists. The script rejects a vowel pattern for any other form.

3. Run the generated test and confirm it fails before changing production data/code.
4. Generate the `src/data/roots.json` row from the **same source and arguments**:

```bash
rtk mise exec -- npm run add:verb -- wiktionary <verb-id> [<vowels>]
```

5. Add the translations and glosses by hand, since the script writes no locale entries. Skip this step when correcting a verb that is already in the dataset:

- `en.verbs.json`, `it.verbs.json`, `pt.verbs.json`: `verbs["<verb-id>"]` (infinitive, e.g. `to write` / `scrivere` / `escrever`) and, for a new root, `roots["<root>"]` (nominal gloss, e.g. `writing`).
- `ar.verbs.json`: `roots["<root>"]` only, fully vocalised. This is the **semantic meaning of the root**, not the verb: an abstract noun for the shared sense of the root, never a conjugated form. A maṣdar is fine when it carries that sense (`$rb` → `شُرْب`), and so is a noun from another form (`$rk` → `مُشارَكَة`). Separate distinct senses with `، ` (`$wr` → `إِشارَة، اِسْتِشارَة`).

6. Format the data and locale files:

```bash
rtk mise exec -- npm run format
```

7. Verify with the full gate:

```bash
rtk mise exec -- npm run check:all
```

8. Decide whether the generated test earns a place. It exists to drive the red-green loop, not to be kept per verb: the suite covers **patterns**, not the whole dataset. Keep it only when its root shape (sound, hollow, doubled, assimilated, defective, hamzated) × form × Form I vowel class is not already covered by an existing `src/paradigms/verbs/*.test.ts`, or if it was added to correct a conjugation. Otherwise delete it and keep the dataset row and locale entries alone.

## What the Row Script Derives

`npm run add:verb` reads the source paradigms and writes `root`, `form`, `masdars`, `lexicalMasdars`, and `passive`. It also writes `vowels`, but only for a triliteral Form I verb; every other form has none. The row is upserted by root, form and vowels. Masdar patterns come from matching each fetched maṣdar against the derivation of every known pattern; anything unmatched is recorded as a lexicalized maṣdar. Fields no source can describe (`valency`, `hollowContraction`, `contractedImperative`, `lexicalActiveParticiple`, `lexicalPassiveParticiple`) are carried over from the existing row.

`passive` is `'none'` when the source has no passive past at all, and `'impersonal'` when it has only the `3ms` cell; a full passive leaves it unset. The script warns when it writes either value. A thin source looks the same as a genuinely defective verb, so confirm the value against the source before accepting it.

## Correcting a Wrong Conjugation

Same flow. Start at step 2 to get a full reference table for the verb; the generated test covers every paradigm, so it will show whether the reported cell is the only wrong one. Then step 4 to refresh the row, which also rescues a stale `masdars` or `passive`.

If cells are still wrong once the row matches the source, the derivation is at fault. Escalate in this order, and stop at the first level that fixes it:

1. **Derivation rule**: the algorithm is wrong for a class of verbs. Preferred, since it fixes every verb sharing the feature.
2. **Pattern**: the rule is right but the pattern table has the wrong shape.
3. **Override**: a per-verb field on the row (`hollowContraction`, `contractedImperative`, `lexicalActiveParticiple`, `lexicalPassiveParticiple`, `lexicalMasdars`). Last resort, and the only one that survives a later `add:verb` re-run untouched.

Derive from root features (hamzated initial, final weak, doubled…), never from root identity.

To cross-check every form of a root against ElixirFM, scope the comparison to that root:

```bash
rtk mise exec -- npm run debug:elixirfm -- --root <buckwalter-root>
```

It reports matched and mismatched cells per verb, and names any form where ElixirFM holds a different lexeme. It compares conjugations only, never glosses. Always pass `--root` (or `--sample <n>`): with no argument it walks all ~1000 verbs at about a second each.

## Non-Negotiables

- Never skip TDD: test first, confirm it fails, then change production data/code.
- Never copy test expectations from production output.
- Source order is Wiktionary → ElixirFM → Qutrub → Reverso, and `add:tests` and `add:verb` must use the same source. Fall back to `elixirfm` when Wiktionary lacks the verb (normalise: ElixirFM omits sukūn and writes doubled jussive/imperative uncontracted), then `qutrub`. `reverso` is the last resort and its output must be cross-checked: it silently returns the wrong lemma for shadda'd queries and emits ungrammatical doubled forms. Prefer ElixirFM lexicon glosses for translations, read off the ElixirFM site, since no script extracts them.
- Research is only for anything the scripts do not provide cleanly, mainly translations or missing/incomplete source cases.
- If a verb test fails, consider correcting the verb row (e.g. setting `hollowContraction`, `contractedImperative`, lexical participles) before changing production code.
- Never open a fix on a Reverso-only mismatch. Confirm it against one of the other three sources first.
- Never hard-code root identity checks in production code.
