## Localization

Supports English, Italian, European Portuguese, Arabic. Translation files in `src/ui/locales/`.

- All UI strings live in flat `*.strings.json` files for all four languages
- Verb translations and root glosses live in `en.verbs.json`, `it.verbs.json`, `pt.verbs.json` only (Arabic does not need translation)
- Portuguese locale must be `pt_PT`, use pre-AO90 orthography (e.g., `acção`, `activo`, `facto`, `óptimo`, `contacto`, `directo`)
- Add entries to `verbs` + `roots` in three non-Arabic locale files
- Translate primary meaning; add secondary only when diverges significantly (e.g. `"to love, to like"`)
- Include translations in same change as verb entry


## Conjugation Rule Patterns

- **Use direct slicing/indexing** when word structure fixed/known; avoid `findIndex` + conditionals when positions deterministic.
- **Avoid redundant condition checks**: if condition implies another, don't repeat.
- **Fix paradigms via derivation rules first**, then patterns, then overrides as last resort.
- **Never hard-code root checks**: derive algorithmically from root features (e.g. hamzated initial + final weak).


## Verb Entry Workflow

Adding a new verb, root, or form: use the `add-verb` skill (`.claude/skills/add-verb/`) — it drives the process through `npm run add:tests:wiktionary` and the `add:verb` wizard, which write `roots.json` and all three locale files together in one step. Correcting an existing conjugated form instead: use the `fix-conjugation` skill. Do not hand-edit `roots.json` or the locale files directly unless the wizard genuinely can't express the case — hand-editing is the fallback now, not the default.

Neither skill verifies sources for you: confirm each cited source URL resolves and actually contains the target entry, and state explicitly when falling back to a secondary source.

`valency` is optional, exempt from source-verification, and not currently prompted for by either skill — set it only when annotating a verb on demand. It counts arguments including the subject: `1` = intransitive (subject only), `2` = transitive (subject + one object), `3` = ditransitive (subject + two objects/a recipient). Arabic has no avalent verbs. Labile verbs (multiple valid readings) get multiple values, e.g. أَكَلَ → `[1, 2]`. An omitted-but-implied object (e.g. كَتَبَ used without stating what was written) does not count as an intransitive reading — only include `1` for verbs that are genuinely usable with no object at all.
