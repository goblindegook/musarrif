## Localization

Supports English, Italian, European Portuguese, Arabic. Translation files in `src/ui/locales/`.

- All UI strings appear in all four locale files under `strings`
- Verb translations go in `en.json`, `it.json`, `pt.json` only (Arabic does not need translation)
- Portuguese locale must be `pt_PT`, use pre-AO90 orthography (e.g., `acção`, `activo`, `facto`, `óptimo`, `contacto`, `directo`)
- Add entries to `verbs` + `roots` in three non-Arabic locale files
- Translate primary meaning; add secondary only when diverges significantly (e.g. `"to love, to like"`)
- Include translations in same change as verb entry


## Conjugation Rule Patterns

- **Use direct slicing/indexing** when word structure fixed/known; avoid `findIndex` + conditionals when positions deterministic.
- **Avoid redundant condition checks**: if condition implies another, don't repeat.
- **Fix paradigms via derivation rules first**, then patterns, then overrides as last resort.
- **Never hard-code root checks**: derive algorithmically from root features (e.g. hamzated initial + final weak).


## Verb Entry Workflow (Hard Gate)

When adding/correcting verb/root entries, follow every step. Do not skip.

1. **Source availability check**: Confirm each cited source URL resolves and contains target entry. State explicitly when switching to fallback source.

2. **Lexical extraction checklist**: Record root, form, present vowel pattern, masdar(s), passive voice status (`full`/`impersonal`/`none`), passive participle availability. Never assume defaults for constrained behaviour.

3. **Required `roots.json` fields gate**: Set `vowels`, `masdars`, `passiveVoice`, `noPassiveParticiple` where applicable. If field unknown, stop and report uncertainty.

4. **Atomic locale update**: Same change — add/update verb translation keys + root gloss keys in `en.json`, `it.json`, `pt.json`.

5. **Final verification**: Re-open changed entries, verify field-by-field against source data. Validate JSON parsing for all modified files. Confirm no orphan/incorrect keys.
