# Muṣarrif

Interactive Arabic verb conjugator. Search and browse verbs, drill into derived forms, and view full conjugation
tables with speech playback (where supported).

## Features

- Arabic-aware search with diacritic stripping and autocomplete suggestions
- Browse verbs by form
- Derived‑form selector
- Root and form insights
- Full conjugation tables for active/passive past, present, future, and imperative
- Nominals: active/passive participles and masdar
- Multilingual UI (Arabic, English, Italian, Portuguese) with RTL/LTR support
- Diacritics toggle plus copy, share, and speech playback controls

## Getting Started

Requirements: Node and npm.

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
