## Localization

Supports English, Italian, European Portuguese, and Arabic. Translation files in `src/ui/locales/`.

- All UI strings must appear in all four locale files under `strings`
- Verb translations go in `en.json`, `it.json`, `pt.json` only (Arabic uses labels directly)
- Portuguese locale must be `pt_PT` and use pre-AO90 orthography (e.g., `acção`, `activo`, `facto`, `óptimo`, `contacto`, `directo`)
- Add entries to the `verbs` object and `roots` object in the three non-Arabic locale files
- Translate the primary meaning; add a secondary only when it diverges significantly (e.g. `"to love, to like"`)
- Include translations in the same change that adds the verb entry


## Conjugation Rule Patterns

- **Use direct slicing/indexing** when word structure is fixed and known; avoid `findIndex` and conditionals when positions are deterministic.
- **Avoid redundant condition checks**: if a condition already implies another, don't repeat it.
- **Fix paradigms via derivation rules first**, then patterns, then overrides as a last resort.
- **Never hard-code root checks**: derive algorithmically from root features (e.g. hamzated initial + final weak).


## Verb Entry Workflow (Hard Gate)

When adding or correcting verb/root entries, follow every step. Do not skip.

1. **Source availability check**: Confirm each cited source URL resolves and contains the target entry. State explicitly when switching to a fallback source.

2. **Lexical extraction checklist**: Record root, form, present vowel pattern, masdar(s), passive voice status (`full`/`impersonal`/`none`), and passive participle availability. Never assume defaults for constrained behaviour.

3. **Required `roots.json` fields gate**: Set `vowels`, `masdars`, `passiveVoice`, `noPassiveParticiple` where applicable. If a field is unknown, stop and report uncertainty.

4. **Atomic locale update**: In the same change, add/update verb translation keys and root gloss keys in `en.json`, `it.json`, `pt.json`.

5. **Final verification**: Re-open changed entries and verify field-by-field against source data. Validate JSON parsing for all modified files. Confirm no orphan/incorrect keys remain.
