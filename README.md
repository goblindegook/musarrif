# Muṣarrif

[Muṣarrif](https://musarrif.com) is an interactive Arabic verb conjugator and drill tool.
It helps learners search roots, inspect full paradigms, and practice recognition across forms, tenses, pronouns, and nominal derivations.

## What It Is

- A reference-first Arabic verb conjugation app
- A progressive drill environment for form/root/tense/pronoun recognition
- A multilingual interface (Arabic, English, Italian, and Portuguese)
- A Progressive Web Application designed for fast lookup on desktop and mobile

## What It Is Not

- Not a full Arabic course or grammar textbook
- Not an automatic translator
- Not a conversational tutor or chat assistant
- Not a corpus-backed frequency trainer

## Who It Is For

- Independent Arabic learners who need quick, reliable conjugation lookup
- Students following a textbook/class who want fast pattern verification
- Teachers and tutors who need a compact paradigm reference during instruction

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Quality Commands

Run tests (single pass, no watch):

```bash
npm test -- --no-watch
```

Run one test file:

```bash
npm test -- --no-watch src/path/to/file.test.ts
```

Coverage and mutation:

```bash
npm run test:coverage
npm run test:mutation
```

Lint and formatting:

```bash
npm run lint
npm run lint:fix
npm run format
```

## Contributing

Contributions are welcome, especially for:

- Incorrect or incomplete conjugation behavior
- Missing verb entries and lexical metadata
- Exercise quality and distractor quality improvements
- Localization improvements (EN/IT/PT/AR UI copy)
- Accessibility and mobile usability fixes

### Contribution Workflow

1. Open an issue describing the bug/change (or use the incorrect conjugation template).
2. Create a focused branch.
3. Add or update tests first (TDD).
4. Implement the smallest change needed.
5. Run lint + tests locally before opening a PR.
6. Include lexical sources whenever changing verb data or grammar expectations.

## Verb Adding Utility

Use the interactive wizard to add or edit entries in:

- `src/data/roots.json`
- `src/locales/en.json`
- `src/locales/it.json`
- `src/locales/pt.json`

Run it with:

```bash
npm run verb
```

The wizard guides you through:

- Root and form selection (`I` to `X`)
- Form I vowel pattern
- Passive voice support (`full`, `impersonal`, `none`)
- Masdar pattern selection
- Passive participle support
- Root glosses
- Verb translations (EN/IT/PT)

It then shows a summary and writes sorted JSON updates.

### Data Expectations

Before writing changes, verify from lexical sources:

- Root
- Form
- Present vowel pattern (for Form I)
- Masdar pattern(s)
- Passive voice support
- Passive participle support

Keep locale updates atomic with verb entry changes.

## Reporting Incorrect Conjugations

Use the GitHub issue template: `Incorrect conjugation report`.
Include verb ID/root/form, tense/mood/voice, pronoun, expected output, and source references.

## License

This project is licensed under the GNU General Public License v3.0.
See [LICENSE](/Users/lrodrigues/Developer/musarrif/LICENSE).
