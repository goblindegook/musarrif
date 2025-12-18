# Agent Guidelines for Conjugator Codebase

This document outlines the coding standards, patterns, and practices that must be followed when working on this codebase.

## IMPORTANT

⚠️ TEST-DRIVEN DEVELOPMENT IS NON-NEGOTIABLE ⚠️

If you are changing the behaviour of the system, you MUST cover the expected behaviour with a test before you change
production code.

## Tooling

Node is available and configured for this project via Mise. Always load the Mise environment before running `node` or any `npm` scripts as you're not likely to find a globally installed Node.

- **npm scripts**: `mise exec -- npm test`
- **Node.js scripts**: `mise exec -- node script.js` or `mise exec -- node -e "console.log('code here')"`
- **Vitest**: Runs in watch mode by default. For a single, non-watching run (as in CI or ad‑hoc checks), pass `--no-watch`, e.g. `mise exec -- npm test -- --no-watch src/app.test.tsx`
- **Scripting tasks**: For file manipulation, data processing, or other scripting tasks, prefer Node over external tools like Python. Always use `mise exec --` to ensure the correct Node version is available.

## Code Style and Formatting

### TypeScript Conventions

- Use TypeScript with strict typing enabled
- Use `type` keyword for type-only imports: `import type { Verb } from './verbs'`
- Prefer explicit types over inference when it improves readability
- Use readonly arrays and objects where immutability is desired: `readonly string[]`
- Prefer nullish equality checks (`value == null` / `value != null`) over strict `undefined` or `null` comparisons when testing for absence
- When a variable is used only once, prefer inlining it unless it compromises readability.

### Formatting Rules (Biome)

- **Indentation**: 2 spaces
- **Line width**: 120 characters
- **Quotes**: Single quotes for strings
- **Semicolons**: As needed (Biome will handle this automatically)
- **Import organization**: Organize imports with external packages first, then internal imports

### Naming Conventions

- **Functions/Variables**: camelCase (`conjugateFuture`, `isDefectiveRadical`)
- **Components/Types/Interfaces**: PascalCase (`Verb`, `VerbMetaProps`)
- **Constants**: UPPER_SNAKE_CASE for module-level constants (`ALIF_HAMZA`)
- **Files**: PascalCase for components (`SpeechButton.tsx`), camelCase for utilities (`pronouns.ts`)
- **Descriptive names**: Use clear, descriptive names that explain intent

### Comments

- Do not write comments that explain WHAT the code does (code should be self-explanatory)
- Do not write comments for obvious operations
- Do write comments to explain non-obvious implementation decisions
- Do write comments to explain the reason for workarounds or special cases
- Do write comments to clarify grammatical or syntactical rules
- Do use comments with linter ignores to explain why a rule is being ignored (e.g., `// biome-ignore lint/style/noNonNullAssertion: <explanation>`)

## Project Structure

### Directory Organization

```text
src/
  components/    # Preact components and UI-related code
  paradigms/     # Rules implementing verb and nominal derivation
    active/      # Active tenses and moods (past, present indicative, subjunctive, jussive and imperative)
    nominal/     # Nominal derivations (masdar, active participle, passive participle)
  data/          # Raw verb data
  hooks/         # Shared UI hooks and provider components (i18n, routing)
  locales/       # Localization files
  primitives/    # Primitive data handling functions
  test/          # Test setup files
```

### File Organization

- **Grammar files**: Pure functions, no Preact dependencies or manipulation of the DOM tree
- **UI files**: Preact components, styled components, UI logic

## Localization

The application supports four languages: **English**, **Italian**, **European Portuguese**, and **Arabic**. Translation files are located in `src/locales/`.

### UI Strings

All UI strings must be translated into all languages. UI strings are stored in the `strings` object within each locale file.

### Verb Translations

When adding a new root to `src/data/roots.json`, you must also add translated root semantics and translations for all
the verb forms added:

- **Translate into**: English, Italian, and Portuguese only (not Arabic)
- **Arabic**: Arabic verbs use their Arabic labels directly and do not require translations
- **Verb translation location**: Add entries to the `verbs` object in `en.json`, `it.json`, and `pt.json`
- **Root semantics location**: Add entries to the `roots` object in `en.json`, `it.json`, and `pt.json`

### Translation Guidelines

- **Primary meaning**: Always translate the primary meaning of the verb
- **Secondary meaning**: You may add a secondary meaning if it significantly diverges from the primary one, separated by a comma (e.g., "to love, to like")
- **Format**: Use the verb ID as the key (e.g., `"0Hbb-1": "to love"`)
- **When adding verbs**: Include translations as part of the same change that adds the verb entry

## Testing Standards

### Test-Driven Development (TDD) is MANDATORY

**⚠️ TDD IS NON-NEGOTIABLE. YOU MUST ALWAYS WRITE TESTS FIRST.**

1. **Write tests first**: Before implementing any feature or fixing any bug, write the test that describes the expected behavior. **This is not optional.**
2. **Red-Green-Refactor cycle**:
   - Write a failing test and **verify it fails** (Red)
   - Write the minimum code to make it pass (Green)
   - Refactor while keeping tests green (Refactor)
3. **Test coverage**: All code must have corresponding tests. Tests should be comprehensive and cover edge cases.
4. **Test location**: Tests must be co-located with source files using the `.test.ts` or `.test.tsx` extension (e.g., `VerbMeta.tsx` → `VerbMeta.test.tsx`).

### Test Framework

- **Framework**: Vitest
- **Preact Testing**: `@testing-library/preact`
- **Test Utilities**: Use `@testing-library/jest-dom` matchers

### Test Structure

```typescript
import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, expect, test } from 'vitest'

afterEach(() => {
  cleanup()
})

test('descriptive test name', () => {
  // Arrange
  // Act
  // Assert
})
```

### Testing Best Practices

- ❌ **NEVER change the behaviour of the system before writing tests. This is a critical error.**
- ✅ **DO write descriptive test names**: Test names should clearly describe what is being tested.
- ✅ **DO group related tests**: Use `describe` blocks to group related test cases.
- ✅ **DO test edge cases**: Include tests for boundary conditions and error cases.
- ✅ **DO use clean up after tests**: Use `afterEach` to restore the testinng environment, especially for Preact components.
- ❌ **NEVER test implementation details**: Validate behavior through public APIs; never export internal helpers solely for testing.
- ❌ **NEVER reimplement production logic**: For grammar/paradigm tests, assert exported functions instead of duplicating algorithms.
- ❌ **NEVER use control flow in tests**: Avoid loops and conditionals in specs. For fixed domains (e.g., pronoun slots), assert each case explicitly.
- ❌ **NEVER test data existence**: Fixture existence should be trusted; it can be incorrect but in that case the test will fail naturally, so skip "is defined" checks on fixtures.
- ❌ **NEVER assert raw dataset fields**: Validate verb patterns via past/present conjugation functions instead of checking static `roots.json` entries directly.
- ✅ **DO prefer canonical data**: When validating grammar/paradigm behavior, use the real datasets instead of hand-rolled or filtered fixtures unless a minimal repro is required.
- ❌ **Avoid mocking**: Prefer real collaborators where feasible; only mock external boundaries or hard-to-reproduce conditions.
- ✅ **Async testing**: Use `waitFor` and proper async/await patterns for asynchronous operations.
- ❌ **Avoid negative assertions**: Don't assert on the absence of behavior. The only exception is when checking that something disappears or stops happening as a result of the user's actions.
- ✅ **Always use static imports**: Use static imports.
- ✅ **Property-based testing is welcome**: Use property-based testing (e.g., fast-check) for general rules that should hold across many inputs.
- ❌ **NEVER normalize or transform test expectations to match incorrect production output**: If tests fail due to Unicode normalization or other output format issues, fix the production code to output the correct format. Normalizing test expectations to match wrong output is a critical anti-pattern that hides bugs and makes tests meaningless.

### UI Test Best Practices

- ✅ **DO use literal UI expectations**: In UI tests, assert on visible text and avoid mocking or calling production helpers to compute expectations (e.g., no `getClosestVerbs`, no `findVerbById` inside UI specs). Keep expected UI strings inline with the test that uses them instead of sharing “magical” fixtures.
- ❌ **UI text not a truth source**: Don’t use UI tests to validate word correctness; rely on derivation functions because UI strings can change (e.g., diacritic stripping).
- ✅ **Async element queries**: Prefer `findBy*` over `waitFor` + `getBy*` combinations.
- ✅ **Base-path agnostic routing**: Use root `/` with hash paths (e.g., `/#/en`) and assert on the hash/path directly; only stub `BASE_URL` when explicitly testing base-url behavior.

## Functional Programming Patterns

### Immutability

- Prefer immutable data structures
- Use `readonly` modifiers for arrays and objects that shouldn't be mutated
- Use spread operators and functional methods instead of mutations

## Preact Patterns

### Component Structure

- Use functional components with hooks
- Use TypeScript interfaces for props: `interface ComponentProps { ... }`
- Export components as named exports: `export const Component = (...) => { ... }`

### Styling

- Use `goober` for styled components
- Define styled components at the module level
- Use template literals for styled component definitions

### Hooks

- Use `useState`, `useEffect`, `useMemo` as needed
- Prefer `React.useCallback` for functions passed as props to prevent unnecessary re-renders
- Use `useRef` for DOM references and values that don't trigger re-renders

### State Management

- Keep state local to components when possible
- Lift state up when multiple components need it
- Use functional updates for state that depends on previous state

## Code Organization

### Imports Order

1. External dependencies (Preact, libraries)
2. Internal type imports
3. Internal component/utility imports
4. Relative imports

Example:

```typescript
import styled from 'goober'
import type { Verb } from './paradigms/verbs'
import { Button } from './Button'
```

### Function Organization

- Keep functions small and focused on a single responsibility
- Extract complex logic into separate functions
- Use pure functions when possible (no side effects)
- Document complex algorithms with clear variable names

## Type Safety

### Type Definitions

- Define types and interfaces explicitly, prefer `interface` over `type` whenever possible
- Use type aliases for complex types
- Use union types for limited values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10`

### Type Guards

- Use type guards for narrowing
- Create helper functions for type checking: `function isLanguage(lang: unknown): lang is Language`

## Linting and Formatting

- **Linter**: Biome (configured in `biome.json`)
- **Format on save**: Ensure Biome formatting is applied
- **Linter ignores**: Only use with explanation comments explaining WHY the rule is ignored

## Git Workflow

- Write tests first (TDD)
- Make small, focused commits
- Ensure all tests pass before committing
- Run linter before committing: `npm run lint`

## Examples

### Good Test Examples

```typescript
test('switches to the present-tense table via tabs', () => {
  renderWithProviders('/#/en/ktb-1')

  fireEvent.click(screen.getByRole('tab', { name: 'Present' }))

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
// Doubly weak (middle wāw, final yā’) keeps the glide and takes kasra before yā’: يَحْوِي
return `${YEH}${FATHA}${c1}${SUKOON}${c2}${KASRA}${YEH}`
```

### Bad Comment Example

```typescript
// ❌ BAD: Explains what the code does
// Get the verb from the URL slug
const verb = getVerbById(slug)
```

## Derivation Preferences

- Fix issues with paradigms by adjusting derivation rules first; if that is insufficient, adopt a pattern, and only fall back to an override as a last resort.

## Summary Checklist

Before submitting code, ensure:

- [ ] **Tests were written first** (TDD) - This is checked first and is non-negotiable
- [ ] All tests pass
- [ ] No production code was written before its corresponding test
- [ ] No comments unless explaining WHY
- [ ] Code follows Biome formatting rules
- [ ] Types are properly defined
- [ ] Immutability is maintained where appropriate
- [ ] Preact components are properly structured
- [ ] Imports are organized correctly
- [ ] Linter passes without errors (except documented ignores)

**If you cannot check the first item, you have violated TDD and must start over.**
