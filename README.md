# Muṣarrif

Interactive Arabic verb conjugator. Search by Arabic root, pick derived forms, and instantly view past, present, and
future conjugations with optional speech playback.

## Features

- Arabic-aware search with diacritic stripping and autocomplete suggestions
- Derived-form selector (I–X) and radical vowel indicator
- Full conjugation tables for past plus present/future moods (indicative, subjunctive, jussive, imperative)
- Nominals: active and passive participles plus masdar
- Quick picks and “closest verbs” recommendations
- Multilingual UI (Arabic, English, Italian, Portuguese) with RTL/LTR support
- Optional speech synthesis playback where supported

## Getting Started

Requirements: Node (via Mise) and npm.

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Tests

Vitest powers the suite; tests live alongside source files.

```bash
npm test          # headless
npm run test:ui   # interactive UI runner
npm run test:coverage
```

## Linting and Formatting

Biome enforces style and formatting.

```bash
npm run lint      # check
npm run lint:fix  # check and write fixes
npm run format    # format only
```

## Localization and Speech

Translations are defined in `src/locales/*.json`; the UI toggles between RTL and LTR automatically. Speech synthesis
uses the browser `speechSynthesis` API and is available only on supporting platforms.
