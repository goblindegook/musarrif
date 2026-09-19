---
name: translate-verb
description: Use when a verb or root in roots.json is missing its [lang].verbs.json translations, after add-verb adds a row or when asked to translate new or untranslated verbs.
argument-hint: "[root, verb ID, or empty for a full sweep, e.g. mHq or mHq-2]"
---

# Translate a Verb Entry or Root Gloss

`add-verb` writes the `src/data/roots.json` row but no locale entries (see
[Conjugation Rules and Verb Entry Workflow](../../../docs/06-conjugation-and-lexicon.md)).
This skill fills that gap: it looks up candidate English glosses from Wiktionary and ElixirFM
programmatically, and leaves picking the translation and writing en/it/pt/ar to you.

## Quick Flow

1. Find what needs translating:

```bash
rtk mise exec -- npm run glosses -- --missing
```

Lists every verb id missing from en/it/pt.verbs.json and every root missing from en/it/pt/ar.verbs.json.
If `$ARGUMENTS` already names a root or verb id, skip this and go straight to step 2.

2. Fetch candidates for one root (all forms) or one form of it:

```bash
rtk mise exec -- npm run glosses -- <root>            # e.g. mHq
rtk mise exec -- npm run glosses -- <root> <form>      # e.g. mHq 2
```

This prints, for that root:
- The Wiktionary root-appendix note (a "related to X" line), the best root-gloss candidate.
- Any inline `Form <roman>: <lemma> ("<gloss>")` text the same appendix page carries. It is present for
  roughly half of roots and absent for the rest.
- Every ElixirFM lexicon entry nested under the root (verbs and nominals alike), each with its own
  English gloss(es). This is usually the richer and more reliable source, and it is available even when
  Wiktionary's appendix page gives no inline gloss for that form.

3. When neither source has the specific form (ElixirFM's lexicon is comprehensive but not
   exhaustive), fetch the lemma's own Wiktionary page for it, same as `add-verb`'s research step,
   e.g. via `WebFetch` or the browser tools. Use the lemma from `getVerbById('<root>-<form>')`
   (`src/paradigms/verbs.ts`) if you need it.

4. Pick the translation and write it in by hand, since the tool fetches and never writes:

- `en.verbs.json`: `verbs["<verb-id>"]`, infinitive (`to write`). One primary meaning only, by
  default. Add a second, comma-separated sense ONLY when it is a genuinely distinct meaning
  (`to help, to rescue`), never a synonym or near-synonym of the first (NOT `to indicate, to
  guide`, NOT `to infer, to conclude`: pick the one best word). Same rule for it/pt/ar below.
- `en.verbs.json` roots, `it.verbs.json`, `pt.verbs.json` (`verbs` + `roots`): infer from the
  English gloss and the Arabic root meaning, not by mechanical word-for-word translation. No `to`
  prefix in it/pt infinitives, pt uses pre-AO90 orthography (`acção`, `activo`, `facto`, `óptimo`,
  `contacto`, `directo`), and reflexive/intransitive forms take `-si`/`-se` where the source verb is
  reflexive (`trasformarsi`, `transformar-se`).
- `ar.verbs.json`: `roots["<root>"]` only, fully vocalised. It is an abstract noun for the shared sense
  of the root (a maṣdar when it carries that sense, or a noun from another form), never a
  conjugated verb. ElixirFM's nominal entries (`N`/`A` rows the tool prints) are good candidates to
  vocalise from directly. Separate distinct senses with `، `.

5. Format and verify:

```bash
rtk mise exec -- npm run format
rtk mise exec -- npm run check:all
```

## What the Tool Does and Doesn't Do

- `npm run glosses -- --missing` reads `src/paradigms/verbs.ts`'s parsed `verbs` array (not
  `roots.json` directly) so it accounts for the vowel-suffixed ids a root with more than one Form I
  reading needs (`Hlm-1-a-u`), rather than naively concatenating root and form.
- `npm run glosses -- <root> [form]` never writes to any file. Wiktionary and ElixirFM responses
  are fetched fresh each run (ElixirFM's own `postElixir` caches to `.caches/elixirfm/` for repeat
  queries, same as `add:tests`/`add:verb`).
- It surfaces candidates. It does not choose between multiple senses, decide what's "primary", or
  translate into Italian/Portuguese. Those stay human (agent) judgment calls, same as the research
  step `add-verb` already asks for.
- A verb with no ElixirFM entry and no Wiktionary inline gloss for that specific form is not an
  error. The tool prints `(none)` and step 3 (a manual lemma-page fetch) is the fallback, exactly
  as `add-verb` already documents for translations Wiktionary/ElixirFM's programmatic paths don't
  reach cleanly.

## Non-Negotiables

- Never invent a translation without a source: Wiktionary, ElixirFM, or (per `add-verb`'s source
  order) Reverso as a last resort, cross-checked.
- Include the root gloss in the same change as a new root's first verb entry; don't leave it for
  later.
- Never touch `src/data/roots.json` here, that's `add-verb`'s job. This skill only writes locale
  files.
