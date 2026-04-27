# Agent Guidelines — Muṣarrif

Muṣarrif is an interactive Arabic verb conjugator — a PWA that lets users search, browse, and drill Arabic verb conjugation tables, including active/passive voice, all tenses/moods, and nominal derivations (masdar, active/passive participles), with speech synthesis support. It also includes an exercise mode for drilling form identification and root extraction.

## Version Control

Agents must not commit or push anything. The user retains full control over releases.

## Commands

Node is managed via Mise. Always prefix `node`/`npm` commands with `mise exec --`.

```bash
mise exec -- npm run dev              # Dev server
mise exec -- npm run build            # tsc + vite build
mise exec -- npm run preview          # Preview production build
mise exec -- npm test -- --no-watch   # Run tests once (default is watch mode)
mise exec -- npm test -- --no-watch src/path/to/file.test.ts  # Single test file
mise exec -- npm run test:coverage    # Coverage report
mise exec -- npm run test:mutation    # Stryker mutation testing
mise exec -- npm run lint             # Biome lint check
mise exec -- npm run lint:fix         # Auto-fix lint issues
mise exec -- npm run format           # lint:fix + format
mise exec -- node script.js           # Node scripts (always with mise exec --)
```

Vitest runs in watch mode by default; pass `--no-watch` for single runs. Prefer Node over external tools (e.g. Python) for scripting tasks.

## Architecture

**Stack**: Preact + TypeScript (strict), Vite, goober (CSS-in-JS), Vitest + @testing-library/preact, Biome.

**Two-layer separation**:
- `src/paradigms/` — Pure grammar functions (no DOM, no Preact). Returns `Record<PronounId, string>` for all 13 pronoun forms (`1s`, `2ms`, `2fs`, `2md`, `2fd`, `2mp`, `2fp`, `3ms`, `3fs`, `3md`, `3fd`, `3mp`, `3fp`).
- `src/components/` — Preact UI components styled with goober.

**State management**: Two context providers in `src/hooks/`:
- `RoutingProvider` — Hash-based routing, synced with `hashchange`/`popstate`. Canonical paths:
  - `#/verbs`, `#/verbs/:verbId`, `#/verbs/:verbId/:voice/:tense`, `#/verbs/:verbId/:voice/present/:mood`, `#/test`
  - App is deployed under Vite `base: '/musarrif/'`; routing utilities normalize base-path and hash navigation.
- `I18nProvider` — Language (en/it/pt/ar), diacritics preference (`all`/`some`/`none`), RTL/LTR switching.

**Verb data**: Raw roots in `src/data/roots.json`. Search via fuzzy matching with transliteration and Levenshtein distance in `src/paradigms/verbs.ts`.

**Paradigm structure**:
- `src/paradigms/active/` — past, present (indicative/subjunctive/jussive), future, imperative
- `src/paradigms/passive/` — past, present, future
- `src/paradigms/nominal/` — masdar, active participle, passive participle
- `src/paradigms/letters.ts` — Character/diacritic manipulation constants and utilities

**Exercise mode**: `src/exercises/` — Pure functions for generating multiple-choice exercises (no DOM/Preact). Covers conjugation, nominal, root, form, tense, pronoun, and participle exercise kinds (see Exercise Mode section for full list). Adaptive difficulty controls tense pool, pronoun selection, and diacritics display. `ExerciseMode` component in `src/components/` accepts an injectable `generateExercise` function for testability. Keep this layer deterministic under provided inputs and testable in isolation.

**Localization**: `src/locales/{en,it,pt,ar}.json`. Verb translations go in `en.json`, `it.json`, `pt.json` only (Arabic uses labels directly). UI strings must appear in all four locales.

### Directory Organization

```text
src/
  app.tsx                   # App shell; switches between conjugation and exercise pages
  main.tsx                  # Entry point; mounts RoutingProvider + I18nProvider + App
  components/
    atoms/                  # Foundational UI primitives
    molecules/              # Composed controls (tabs, segmented control, search, share/copy/speech)
    organisms/              # Feature sections (header, conjugation table, insights, builder, stats)
    pages/                  # Top-level page components (ConjugationMode, ExerciseMode)
  exercises/                # Pure exercise generation, dimensions, SRS, and stats logic
  paradigms/                # Core derivation and grammar rules
    active/                 # Active voice paradigms
    passive/                # Passive voice paradigms + passive support rules
    nominal/                # Nominal derivations (masdar and participles)
  data/                     # Canonical dataset (`roots.json`)
  hooks/                    # Shared providers/hooks (routing, i18n, local storage, SRS, favourites, recents)
  locales/                  # i18n JSON files
  primitives/               # Generic helpers (objects, strings)
  test/                     # Vitest setup and custom matchers
```

## Design Context

### Users

Arabic self-learners studying independently, typically alongside a course or textbook. They use Muṣarrif as a reference and drill companion. The tool should reward attention without demanding it.

### Brand Personality

Elegant, minimal, and quietly authoritative. Three words: **precise, warm, scholarly**. The emotional goal is **confident calm** — users should feel capable and focused, never overwhelmed.

### Aesthetic Direction

- **Palette**: Warm parchment (`#f5f4ee`) backgrounds, white card surfaces, amber/ochre accents (`#92400e`, `#facc15`), slate text hierarchy. Semantic green/red for exercise feedback.
- **Typography**: IBM Plex Sans (UI) + Noto Sans Arabic. Uppercase tracking on labels. Generous Arabic script sizing — the language is always the visual centrepiece.
- **Layout**: Clean card-based structure, generous whitespace, rounded corners (1–1.5rem) that feel refined, not playful.
- **Theme**: Light mode today; design with future dark mode compatibility in mind.

**Anti-references**: No gamified/Duolingo aesthetics, no generic SaaS blue, no dense academic PDF, no dark terminal aesthetic.

### Design Principles

1. **Arabic script is the hero.** Always give Arabic text room to breathe at generous sizes.
2. **Clarity over decoration.** Every element earns its presence; whitespace over visual complexity.
3. **Warm restraint.** Warmth in color (parchment, amber); discipline in layout (aligned, minimal, precise).
4. **Scholarly credibility.** Typography and hierarchy should evoke a well-designed reference book — trustworthy, not cold.
5. **Progressive depth.** Simple surface, depth revealed naturally — never overwhelming at first glance.

## Code Style and Formatting

### TypeScript Conventions

- Use TypeScript with strict typing enabled
- Use `type` keyword for type-only imports: `import type { Verb } from './verbs'`
- Prefer explicit types over inference when it improves readability
- Use readonly arrays and objects where immutability is desired: `readonly string[]`
- Prefer nullish equality (`value == null` / `value != null`) over strict `undefined`/`null` checks when testing for absence
- When a variable is used only once, prefer inlining it unless it compromises readability

### Formatting Rules (Biome)

- **Indentation**: 2 spaces
- **Line width**: 120 characters
- **Quotes**: Single quotes for strings
- **Semicolons**: As needed (Biome handles this automatically)
- **Import order**: External packages first, then internal imports

### Naming Conventions

- **Functions/Variables**: camelCase (`conjugateFuture`, `isDefectiveRadical`)
- **Components/Types/Interfaces**: PascalCase (`Verb`, `VerbMetaProps`)
- **Constants**: UPPER_SNAKE_CASE for module-level constants (`ALIF_HAMZA`)
- **Files**: PascalCase for components (`SpeechButton.tsx`), camelCase for utilities (`pronouns.ts`)

### Type Definitions

- Define types and interfaces explicitly; prefer `interface` over `type`
- Use type aliases for complex types
- Use union types for limited values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10`
- Use type guards for narrowing: `function isLanguage(lang: unknown): lang is Language`

### Comments

- Do not write comments explaining what code does
- Do write comments to explain non-obvious implementation decisions, workarounds, or grammatical rules
- Use comments with linter ignores to explain why a rule is being ignored

### Function and Code Organization

- Keep functions small and focused on a single responsibility; prefer pure functions
- Use `const` for components and module-level constants; use spread operators over mutation
- Imports: external packages first, then internal type imports, then internal component/utility imports

## UI Components

**Always reuse existing UI primitives before building new ones.** Check `src/components/atoms/`, `src/components/buttons/`, `src/components/icons/`, `Modal.tsx`, `Overlay.tsx`, and `Panel.tsx` first. Never roll bespoke styled wrappers for things that already exist — use `IconButton` + an SVG icon (not emoji buttons), use `Modal`/`Overlay` for modals (not custom `position: fixed` divs). Violating this causes visual inconsistency.

### Preact Component Conventions

- Use functional components with hooks; TypeScript interfaces for props
- Export components as named exports: `export const Component = (...) => { ... }`
- Use `goober` for styled components; define them at the module level
- Prefer `useCallback` for functions passed as props; use `useRef` for DOM references
- Keep state local to components when possible; lift state up only when needed

## Testing Standards

### TDD is MANDATORY ⚠️

**Never change system behaviour before writing tests.**

**Red-Green-Refactor**:
1. Write a failing test and **verify it fails** (Red)
2. Write the minimum code to make it pass (Green)
3. Refactor while keeping tests green (Refactor)

Tests are co-located with source files (`.test.ts` / `.test.tsx`). Framework: Vitest + `@testing-library/preact` + `@testing-library/jest-dom`.

```typescript
import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, expect, test } from 'vitest'

afterEach(() => {
  cleanup()
})

test('descriptive test name', () => {
  // Arrange / Act / Assert
})
```

### Testing Rules

- ✅ Descriptive test names; use `describe` to group related cases
- ✅ Test edge cases and boundary conditions
- ✅ Use `afterEach(cleanup)` for Preact component tests
- ✅ Prefer `findBy*` over `waitFor` + `getBy*` for async queries
- ✅ Use real collaborators; only mock external boundaries or hard-to-reproduce conditions
- ✅ Use static imports only in tests
- ✅ Property-based testing (e.g. fast-check) is welcome for general rules
- ✅ Unicode normalization in test expectations is acceptable when failures are due solely to combining-mark ordering
- ✅ Prefer canonical data (real datasets) over hand-rolled fixtures unless a minimal repro is needed
- ❌ Never use control flow (loops/conditionals) in test bodies — assert each case explicitly
- ❌ Never test implementation details; validate behaviour through public APIs
- ❌ Never export internal helpers solely for testing
- ❌ Never test styling (CSS classes, style tags, visual rules)
- ❌ Never reimplement production logic in tests; assert exported functions instead
- ❌ Never assert on dataset field existence — if incorrect, tests will fail naturally
- ❌ Avoid `*ByRole` queries — they introduce significant performance overhead
- ❌ Avoid negative assertions except when verifying something disappears as a result of user action

### UI Test Best Practices

- Assert on visible text inline in tests; do not call production helpers to compute expected strings
- Do not use UI tests to validate word correctness; rely on derivation functions (UI strings can change with diacritic stripping)
- Use root `/` with hash paths (e.g. `/#/verbs/ktb-1`) and assert on hash/path directly; only stub `BASE_URL` when explicitly testing base-url behaviour

### Conjugation Test Strategy

- **Pattern-first coverage**: When adding a new verb with the same form, root type, and tense as a fully-covered verb, add only a main pattern test covering all paradigms (active, passive, nominal).
- **Escalation rule**: If a main pattern test fails, write a full conjugation table test for that verb and tense/mood before touching production code.
- **Imperative rule**: If an imperative pattern test fails, write full conjugation tables for both the imperative and jussive before changing the implementation.
- **Nominals**: Active participle, passive participle, and masdar have no full-conjugation concept — keep them in table-driven pattern tests.

### Validating Test Expectations ⚠️

**Never assume production code is correct. Test expectations must reflect correct Arabic grammar from authoritative sources, not production output.**

1. Consult authoritative Arabic grammar references and cross-check against multiple sources before writing expectations.
2. Run tests and note discrepancies without silently fixing expectations to match production.
3. Document uncertainty explicitly; ask for verification rather than guessing.
4. Cross-reference existing tests for similar verb patterns before writing new expectations.
5. Verify ALL pronoun forms, not just a subset.
6. **Dependency order when fixing**: for incorrect imperatives, verify/fix jussive first; for incorrect subjunctive/jussive, verify present tense first.

## Localization

Supports English, Italian, European Portuguese, and Arabic. Translation files in `src/locales/`.

- All UI strings must appear in all four locale files under `strings`
- Verb translations go in `en.json`, `it.json`, `pt.json` only (Arabic uses labels directly)
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

## Exercise Mode

**Interface** (`src/exercises/exercises.ts`):
```typescript
interface Exercise {
  kind: ExerciseKind
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: readonly string[]
  answer: number
  cardKey: string
  dimensions: readonly DimensionKey[]
  explanations?: readonly (ExplanationLayers | null)[]
}
```

**Exercise kinds**: `conjugation`, `masdarForm`, `masdarRoot`, `masdarVerb`, `participleForm`, `participleRoot`, `participleVerb`, `verbParticiple`, `verbForm`, `verbMasdar`, `verbPronoun`, `verbRoot`, `rootFormVerb`, `verbTense`.

**Adaptive dimensions** (`src/exercises/dimensions.ts`):
- `tenses` (0–5): gradually unlocks from active past to full passive set
- `pronouns` (0–3): from `3ms` to full inventory
- `diacritics` (0–2): `all` → `some` → `none`
- `forms` (0–3): form I only → all ten forms
- `rootTypes` (0–5): sound → doubled → hamzated → assimilated → hollow → defective
- `nominals` (0–2): none → participles → masdar

`recordDimensionAnswer` tracks rolling windows; `promoteDimensions` promotes/demotes via accuracy thresholds; `enforcePrerequisites` blocks invalid profiles.

**SRS and persistence**:
- `randomExercise(profile, srsStore)` prioritizes due cards filtered by unlocked dimensions
- Card identity: `cardKey` (`kind:rootType:form[:tense:pronoun]`)
- SRS state: `conjugator:srs`; daily stats: `conjugator:exercise:daily`; dimension state: `conjugator:dimensions`
- Streak goal: 10 correct answers/day

**Component pattern**: `ExerciseMode` accepts a `generateExercise` prop (defaults to `randomExercise`) for test injection. Preserve this pattern when adding exercise types.

## Examples

### Good Test Examples

```typescript
test('switches to the present-tense table via tabs', () => {
  renderWithProviders('/#/verbs/ktb-1')
  fireEvent.click(screen.getByLabelText('Present'))
  expect(screen.getByText('يَكتُبُ')).toBeInTheDocument()
})
```

```typescript
test('future prefixes seen + fatḥa to indicative present 3ms', () => {
  fc.assert(
    fc.property(fc.constantFrom(...verbs), (verb) => {
      const present = conjugatePresentMood(verb, 'indicative')['3ms']
      const future = conjugateFuture(verb)['3ms']
      expect(future).toBe(`${SEEN}${FATHA}${present}`)
    }),
  )
})
```

### Good Comment Example

```typescript
// Doubly weak (middle wāw, final yā') keeps the glide and takes kasra before yā': يَحْوِي
return `${YEH}${FATHA}${c1}${SUKOON}${c2}${KASRA}${YEH}`
```

## Pre-Submission Checklist

- [ ] Tests were written **before** production code (TDD — non-negotiable)
- [ ] All tests pass
- [ ] No comments unless explaining WHY
- [ ] Biome formatting rules followed
- [ ] Types properly defined
- [ ] Linter passes without undocumented ignores
- [ ] All four locale files updated if UI text changed
- [ ] Existing UI primitives reused (no bespoke wrappers)

**If you cannot check the first item, you have violated TDD and must start over.**
