## Architecture

**Stack**: Preact + TypeScript (strict), Vite, goober (CSS-in-JS), Vitest + @testing-library/preact, Biome, dependency-cruiser (module boundaries, CI-gated).

**Module separation**: `src/paradigms/`, `src/exercises/`, and `src/primitives/` are pure — no DOM, no Preact, no goober. `src/ui/` is the only module that may import them. This is enforced in CI by `npm run check:boundaries` (`.dependency-cruiser.cjs`, rule `paradigms-exercises-not-to-ui`), not just convention. Conjugation functions return `Word` objects (see `word.ts` below), not raw strings — `String(word)` happens only at UI boundaries. `src/prerender/` is the one deliberate exception: a build-time-only module that *does* import `src/ui/` to mount the real app and emit static HTML (see below).

**State management**: Two context providers in `src/ui/hooks/`:
- `RoutingProvider` (`src/ui/routes.ts`) — dual-mode: `path` by default (real URLs like `/verbs/:verbId`, required for the prerendered static pages to resolve), or `hash` (`#/verbs/:verbId`) when built with `VITE_ROUTING_MODE=hash` (`npm run build:hash`, for hosts without server-side rewrite support). Canonical route segments: `verbs`, `verbs/:verbId`, `verbs/:verbId/:voice/:tense`, `verbs/:verbId/:voice/present/:mood`, `test`.
- `I18nProvider` — Language (en/it/pt/ar), diacritics (`all`/`some`/`none`), RTL/LTR.

**Verb data**: Raw roots in `src/data/roots.json`, parsed and looked up via `src/paradigms/verbs.ts` (`getVerb`, `getVerbById`, `findVerbsByRoot*`, paradigm-availability rules). Fuzzy search w/ transliteration is a separate memoized module, `src/paradigms/search.ts` (10k-entry LRU).

**Paradigm structure**:
- `src/paradigms/active/` — past, present (indicative/subjunctive/jussive), future, imperative (each w/ an `-annotation.ts` file)
- `src/paradigms/passive/` — past, present, future (each w/ an `-annotation.ts` file), plus `support.ts`
- `src/paradigms/nominal/` — `masdar.ts`, `participle.ts` (active + passive participle)
- `src/paradigms/tokens.ts` — `LetterToken`, character/diacritic constants, tokenize/detokenize
- `src/paradigms/word.ts` — `Word`/`Morpheme` model; conjugation functions return `Word`, not strings
- `src/paradigms/annotation.ts` / `annotation-types.ts` — Morpheme annotation for grammatical breakdowns
- `src/paradigms/explanation.ts` — Grammatical explanation generation
- `src/paradigms/verbs/` — per-verb generated test files (Wiktionary/Reverso/ElixirFM/Qutrub-sourced), not source

**Exercise mode**: `src/exercises/` — pure functions for multiple-choice exercises (no DOM/Preact). 14 exercise kinds (`exercise-kinds.ts`). Adaptive difficulty controls tense pool, pronoun selection, diacritics display (`dimensions.ts`). `srs.ts` (SM-2-style) now takes an optional `elapsedMs` — a correct answer under 5s grades a full point higher than a slow-but-correct one. `answer-diff.ts` does a per-letter LCS diff between typed and correct answers (consonants first, then diacritics/shadda), producing `match | error | missing` segments for precise typing feedback. `ExerciseMode` in `src/ui/pages/` accepts injectable `generateExercise` for testability. Keep deterministic + testable in isolation.

**Static verb pages**: `src/prerender/` + `scripts/prerender.mts`, run as the final step of `npm run build`. Mounts the real `App`/`RoutingProvider`/`I18nProvider` tree under `happy-dom` and snapshots each verb route into `dist/verbs/<id>/index.html`, plus `dist/sitemap.xml` and a `404.html` SPA fallback — for SEO crawlability, since path-routed verb pages are otherwise only rendered client-side.

**Localization**: `src/ui/locales/{lang}.strings.json` contains flat UI strings for all four languages; `en.strings.json` is the only one eagerly imported, the rest (`it`/`pt`/`ar`) are lazy. `src/ui/locales/{lang}.verbs.json` (all four, all lazy) contains a `roots` dictionary (root-type semantic labels) in every language, plus a `verbs` gloss dictionary in `en`/`it`/`pt` only — Arabic doesn't translate verb glosses into itself, but does carry Arabic-language root-type labels.

### Directory Organization

```text
src/
  ui/
    app.tsx                 # App shell; switches between conjugation and exercise pages
    app-route.ts            # hasAppRoute() - is a given path/hash an in-app route
    main.tsx                # Entry point; mounts RoutingProvider + I18nProvider + App
    routes.ts               # AppRoute type + createRouting() config (path/hash dual mode)
    optical-transfer.ts     # Chunked animated-QR-code settings transfer (encode/decode frames)
    user-data.ts            # .musarrif export/import - file-open, drag-drop, getUserData/importUserData
    atoms/                  # Foundational UI primitives (Button, ArabicDisplay, Heading, Text, etc.)
    molecules/              # Composed controls (tabs, segmented control, search, share/copy/speech, Detail, etc.)
    organisms/              # Feature sections (ConjugateBox, ConjugationTable, ConjugationInsights, OpticalSend/Receive, etc.)
    pages/                  # Top-level page components (Home, ConjugationMode, ExerciseMode)
    icons/                  # SVG icon components
    hooks/                  # Shared providers/hooks
      useRouting.tsx        # Routing provider (path/hash dual mode)
      useI18n.tsx           # I18n provider (language, diacritics, RTL/LTR)
      useDimensionStore.ts  # Exercise dimension state
      useSrsStore.ts        # SRS state persistence
      useFavourites.ts      # Favourites management
      useRecent.ts          # Recent verbs tracking
      useTheme.ts           # Theme management
      useDocumentTitle.ts   # Document title updates
      useLocalStorage.ts    # Local storage abstraction
      useSpeech.ts          # Speech synthesis support
      useSpeechRecognition.ts # Speech recognition input (Web Speech API wrapper)
      useStats.ts           # Exercise streak and daily stats hook
      useTour.ts            # Product tour state
    locales/                # i18n JSON files (en, it, pt, ar)
  exercises/
    generators/             # Per-kind exercise generators (conjugation.ts, verb-form.ts, masdar-form.ts, etc.)
    mastery.ts              # Mastery tracking system
    scheduler.ts            # Exercise scheduling logic
    stats.ts                # Exercise statistics and streak tracking
    distractors.ts          # Distractor generation for multiple-choice exercises
    answer-diff.ts          # Per-letter LCS diff between typed and correct answers
    srs.ts                  # Spaced Repetition System implementation (SM-2-style, speed-aware grading)
    dimensions.ts           # Adaptive difficulty dimensions
    exercises.ts            # Exercise interface and core logic
    exercise-kinds.ts       # ExerciseKind union (14 kinds)
    root-types.ts           # Root-type classification types
    srs-types.ts            # SRS state/card types
  paradigms/                # Core derivation and grammar rules
    active/                 # Active voice paradigms (past, present, future, imperative + annotations)
    passive/                # Passive voice paradigms (past, present, future + annotations, support.ts)
    nominal/                # Nominal derivations (masdar.ts, participle.ts - active + passive)
    verbs/                  # Per-verb generated test files (Wiktionary/Reverso/ElixirFM/Qutrub), not source
    annotation.ts           # Morpheme annotation system
    annotation-types.ts     # Annotation type definitions
    explanation.ts          # Grammatical explanation generation
    form-i-vowels.ts        # Form I vowel pattern handling
    tense.ts                # Tense type definitions
    search.ts               # Memoized fuzzy verb search (10k-entry LRU)
    conjugation.ts          # Shared conjugation types
    hamza.ts                # Hamza seating rules
    pronouns.ts             # Pronoun definitions
    roots.ts                # Root analysis
    tokens.ts               # LetterToken, character/diacritic constants, tokenize/detokenize
    word.ts                 # Word/Morpheme model - conjugation functions return Word, not strings
    verb-types.ts           # Form/root type definitions (FORMS, QUADRILITERAL_FORMS, etc.)
    verbs.ts                # Verb data model, roots.json parsing, getVerb()/getVerbById() lookup
  prerender/               # Build-time static verb pages (SEO) - the one module allowed to import ui/
    pages.ts                # Page list, HTML document shell, JSON-LD structured data
    render.ts               # Mounts App into a DOM container via Preact's render() under happy-dom
    sitemap.ts              # sitemap.xml body
  data/                     # Canonical dataset (`roots.json`)
  primitives/               # Generic helpers (objects, strings, numbers, dates)
  test/                     # Vitest setup and custom matchers
```
