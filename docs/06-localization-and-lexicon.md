## Localization

Supports English, Italian, European Portuguese, Arabic. Translation files in `src/ui/locales/`.

- All UI strings live in flat `*.strings.json` files for all four languages
- Verb translations live in `en.verbs.json`, `it.verbs.json`, `pt.verbs.json` only (verbs need no Arabic translation)
- Root glosses (`roots` key) live in all four: en/it/pt plus `ar.verbs.json`, which has **only** `roots` — Arabic maṣdar/abstract-noun labels, fully vocalised. Wired via `LEXICON_LOADERS` in `useI18n.tsx`
- Portuguese locale must be `pt_PT`, use pre-AO90 orthography (e.g., `acção`, `activo`, `facto`, `óptimo`, `contacto`, `directo`)
- Add `verbs` + `roots` entries to en/it/pt and the matching `roots` entry to `ar.verbs.json` by hand — no script writes locale entries
- Translate primary meaning; add secondary only when diverges significantly (e.g. `"to love, to like"`)
- Include translations in same change as verb entry


## Conjugation Rule Patterns

- **Use direct slicing/indexing** when word structure fixed/known; avoid `findIndex` + conditionals when positions deterministic.
- **Avoid redundant condition checks**: if condition implies another, don't repeat.
- **Fix paradigms via derivation rules first**, then patterns, then overrides as last resort.
- **Never hard-code root checks**: derive algorithmically from root features (e.g. hamzated initial + final weak).

## Verb Entry Workflow

Adding a new verb, root, or form — and correcting a wrong conjugated form — both use the `add-verb` skill (`.claude/skills/add-verb/`). It drives the process through `npm run add:tests -- <source> <slug>` for the reference table and `npm run add:verb -- <source> <slug>` for the `roots.json` row. The row script writes no locale entries: add `verbs`/`roots` to en/it/pt and `roots` to `ar.verbs.json` by hand, then run biome over `src/data/roots.json` and `src/ui/locales`. `npm run add:verb:wizard` is the interactive fallback for a case no source covers.

### Source Preference

Four sources exist for `npm run add:tests -- <source> <slug> [vowels]` (`wiktionary`, `elixirfm`, `qutrub`, `reverso`); the optional Form I vowel pattern (`a-u`, `a-i`, …) picks between roots that have more than one Form I conjugation. Use them in this order:

1. **Wiktionary** — the default. Fully vocalised, includes sukūn, matches the project's orthographic conventions.
2. **ElixirFM** — accurate morphology, but two known quirks to normalise before trusting a generated test: it never writes sukūn, and it renders the jussive/imperative of doubled verbs uncontracted (`يُمَادِد`) where this project contracts (`يُمَادَّ`). Its lexicon glosses are the preferred translation source; when the service is down (`quest.ms.mff.cuni.cz`), the same data is in `Elixir/Data/**.hs` in the `otakar-smrz/elixir-fm` GitHub repo.
3. **Qutrub** — Arabeyes' rule-based conjugator, fully vocalised including sukūn. Verbs only: no masdar, no participles. Four quirks the parser or the reader has to absorb — it writes a shadda ahead of its vowel (the parser normalises to NFC), it drops the sukūn on the أنتم past (`كَتَبْتُم`, restored by the parser), it leaves the jussive and imperative of doubled verbs uncontracted like ElixirFM, and when its own lexicon disagrees with `roots.json` on a Form I stem vowel it silently conjugates its own reading (`'dd-1`, `ysr-1`) — check the 3ms present before trusting a Qutrub table. It also emits nonsense for the 2fp imperative of doubled assimilated verbs (`wdd-1` → `دَّْنَ`).
4. **Reverso** — least reliable, last resort. Verified failure modes (2026-08-20): silently conjugates a *different lemma* when the query has a shadda (`تَسَابَّ` returned the hollow paradigm of `سَابَ`), leaves untransliterated placeholders like `tusaaba` in cells, and produces uncontracted doubled forms that are outright ungrammatical in the past tense (`مُودِدَ` for `مُودَّ`, masdar `مُمَادَدَة` for `مُمَادَّة`). Never accept a Reverso table without checking it against one of the other three.

`valency` is optional, exempt from source-verification, and not currently prompted for by either skill — set it only when annotating a verb on demand. It counts arguments including the subject: `1` = intransitive (subject only), `2` = transitive (subject + one object), `3` = ditransitive (subject + two objects/a recipient). Arabic has no avalent verbs. Labile verbs (multiple valid readings) get multiple values, e.g. أَكَلَ → `[1, 2]`. An omitted-but-implied object (e.g. كَتَبَ used without stating what was written) does not count as an intransitive reading — only include `1` for verbs that are genuinely usable with no object at all.
