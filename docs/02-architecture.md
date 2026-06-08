## Architecture

**Stack**: Preact + TypeScript (strict), Vite, goober (CSS-in-JS), Vitest + @testing-library/preact, Biome.

**Two-layer separation**:
- `src/paradigms/` — Pure grammar functions (no DOM, no Preact). Returns `Record<PronounId, string>` for 13 pronoun forms (`1s`, `2ms`, `2fs`, `2md`, `2fd`, `2mp`, `2fp`, `3ms`, `3fs`, `3md`, `3fd`, `3mp`, `3fp`).
- `src/ui/` — Preact UI components styled with goober.

**State management**: Two context providers in `src/ui/hooks/`:
- `RoutingProvider` — Hash-based routing, synced with `hashchange`/`popstate`. Canonical paths:
  - `#/verbs`, `#/verbs/:verbId`, `#/verbs/:verbId/:voice/:tense`, `#/verbs/:verbId/:voice/present/:mood`, `#/test`
  - Deployed via Vite; routing utilities normalize base-path + hash nav.
- `I18nProvider` — Language (en/it/pt/ar), diacritics (`all`/`some`/`none`), RTL/LTR.

**Verb data**: Raw roots in `src/data/roots.json`. Fuzzy search w/ transliteration + Levenshtein in `src/paradigms/verbs.ts`.

**Paradigm structure**:
- `src/paradigms/active/` — past, present (indicative/subjunctive/jussive), future, imperative (each w/ annotation files)
- `src/paradigms/passive/` — past, present, future (each w/ annotation files)
- `src/paradigms/nominal/` — masdar, active participle, passive participle
- `src/paradigms/annotation.ts` — Morpheme annotation for grammatical breakdowns
- `src/paradigms/explanation.ts` — Grammatical explanation generation
- `src/paradigms/letters.ts` — Character/diacritic constants + utilities

**Exercise mode**: `src/exercises/` — Pure functions for multiple-choice exercises (no DOM/Preact). 14 exercise kinds. Adaptive difficulty controls tense pool, pronoun selection, diacritics display. `ExerciseMode` in `src/ui/pages/` accepts injectable `generateExercise` for testability. Keep deterministic + testable in isolation.

**Localization**: `src/ui/locales/{en,it,pt,ar}.json`. Verb translations in `en.json`, `it.json`, `pt.json` only (Arabic uses labels directly). UI strings must appear in all four locales under `strings` object.

### Directory Organization

```text
src/
  ui/
    app.tsx                 # App shell; switches between conjugation and exercise pages
    main.tsx                # Entry point; mounts RoutingProvider + I18nProvider + App
    routes.ts               # Routing configuration and AppRoute type definitions
    atoms/                  # Foundational UI primitives (Button, ArabicDisplay, Heading, Text, etc.)
    molecules/              # Composed controls (tabs, segmented control, search, share/copy/speech, Detail, etc.)
    organisms/              # Feature sections (ConjugateBox, ConjugationTable, ConjugationInsights, FormInsights, etc.)
    pages/                  # Top-level page components (Home, ConjugationMode, ExerciseMode)
    icons/                  # SVG icon components
    hooks/                  # Shared providers/hooks
      useRouting.tsx        # Routing provider (hash-based)
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
    srs.ts                  # Spaced Repetition System implementation
    dimensions.ts           # Adaptive difficulty dimensions
    exercises.ts            # Exercise interface and core logic
  paradigms/                # Core derivation and grammar rules
    active/                 # Active voice paradigms (past, present, future, imperative + annotations)
    passive/                # Passive voice paradigms (past, present, future + annotations)
    nominal/                # Nominal derivations (masdar, active participle, passive participle)
    annotation.ts           # Morpheme annotation system
    explanation.ts          # Grammatical explanation generation
    form-i-vowels.ts        # Form I vowel pattern handling
    tense.ts                # Tense type definitions
    selection.ts            # Verb selection/filtering
    conjugation.ts          # Shared conjugation types
    hamza.ts                # Hamza handling rules
    pronouns.ts             # Pronoun definitions
    roots.ts                # Root analysis
    letters.ts              # Character/diacritic manipulation constants and utilities
    verbs.ts                # Verb search via fuzzy matching
  data/                     # Canonical dataset (`roots.json`)
  primitives/               # Generic helpers (objects, strings, numbers)
  test/                     # Vitest setup and custom matchers
```