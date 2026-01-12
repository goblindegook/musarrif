# Agent Guidelines for Conjugator Codebase

This document outlines the coding standards, patterns, and practices that must be followed when working on this codebase.

## IMPORTANT

⚠️ TEST-DRIVEN DEVELOPMENT IS NON-NEGOTIABLE ⚠️

When changing system behaviour, write tests covering expected behaviour before changing production code.

## Tooling

Node is configured via Mise. Always use `mise exec --` before running `node` or `npm` scripts (no global Node available).

- **npm scripts**: `mise exec -- npm test`
- **Node.js scripts**: `mise exec -- node script.js` or `mise exec -- node -e "console.log('code here')"`
- **Vitest**: Runs in watch mode by default. For single runs (CI/ad-hoc), pass `--no-watch`, e.g. `mise exec -- npm test -- --no-watch src/app.test.tsx`
- **Scripting tasks**: Prefer Node over external tools (e.g., Python). Always use `mise exec --` to ensure the correct Node version.

## Code Style and Formatting

### TypeScript Conventions

- Use TypeScript with strict typing enabled
- Use `type` keyword for type-only imports: `import type { Verb } from './verbs'`
- Prefer explicit types over inference when it improves readability
- Use readonly arrays and objects where immutability is desired: `readonly string[]`
- Prefer nullish equality (`value == null` / `value != null`) over strict `undefined`/`null` checks when testing for absence
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

### Comments

- Do not write comments explaining what code does (code should be self-explanatory)
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

Supports four languages: **English**, **Italian**, **European Portuguese**, and **Arabic**. Translation files are in `src/locales/`.

### UI Strings

All UI strings must be translated into all languages and stored in the `strings` object within each locale file.

### Verb Translations

When adding a root to `src/data/roots.json`, also add translated root semantics and translations for all verb forms:

- **Translate into**: English, Italian, and Portuguese only (not Arabic)
- **Arabic**: Uses Arabic labels directly (no translations required)
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

1. **Write tests first**: Before implementing features or fixing bugs, write tests describing expected behavior.
2. **Red-Green-Refactor cycle**:
   - Write a failing test and **verify it fails** (Red)
   - Write the minimum code to make it pass (Green)
   - Refactor while keeping tests green (Refactor)
3. **Test coverage**: All code must have comprehensive tests covering edge cases.
4. **Test location**: Co-locate tests with source files using `.test.ts` or `.test.tsx` extensions (e.g., `VerbMeta.tsx` → `VerbMeta.test.tsx`).

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

- ❌ **NEVER change system behaviour before writing tests. This is a critical error.**
- ✅ **DO write descriptive test names**: Clearly describe what is being tested.
- ✅ **DO group related tests**: Use `describe` blocks to group related test cases.
- ✅ **DO test edge cases**: Include tests for boundary conditions and error cases.
- ✅ **DO clean up after tests**: Use `afterEach` to restore the testing environment, especially for Preact components.
- ❌ **NEVER test implementation details**: Validate behavior through public APIs; don't export internal helpers solely for testing.
- ❌ **NEVER reimplement production logic**: For grammar/paradigm tests, assert exported functions instead of duplicating algorithms.
- ❌ **NEVER use control flow in tests**: Avoid loops and conditionals in specs. For fixed domains (e.g., pronoun slots), assert each case explicitly.
- ❌ **NEVER test data existence**: Trust fixture existence; if incorrect, tests will fail naturally, so skip "is defined" checks.
- ❌ **NEVER assert raw dataset fields**: Validate verb patterns via past/present conjugation functions instead of checking static `roots.json` entries directly.
- ✅ **DO prefer canonical data**: When validating grammar/paradigm behavior, use the real datasets instead of hand-rolled or filtered fixtures unless a minimal repro is required.
- ❌ **Avoid mocking**: Prefer real collaborators where feasible; only mock external boundaries or hard-to-reproduce conditions.
- ✅ **Async testing**: Use `waitFor` and proper async/await patterns for asynchronous operations.
- ❌ **Avoid negative assertions**: Don't assert on the absence of behavior. The only exception is when checking that something disappears or stops happening as a result of the user's actions.
- ✅ **Always use static imports**: Do not use dynamic imports in tests.
- ✅ **Property-based testing is welcome**: Use property-based testing (e.g., fast-check) for general rules that should hold across many inputs.
- ❌ **NEVER normalize test expectations to match incorrect production output**: If tests fail due to Unicode normalization or format issues, fix production code. Normalizing expectations to match wrong output hides bugs and makes tests meaningless.

### Conjugation Test Strategy

- **Pattern-first coverage**: When a verb form/type/tense or mood already has a full conjugation table test elsewhere, add only a main pattern test for new verbs.
- **Escalation rule**: If a main pattern test fails, write a full conjugation table test for that verb and tense/mood before changing production code. Keep these tests grouped by their type (e.g. regular, geminated, defective, etc.)
- **Imperative rule**: If an imperative pattern test fails, write full conjugation tables for both the imperative and the jussive before changing the implementation.
- **Nominals**: Active participle, passive participle, and masdar stay in the table-driven pattern tests because they are simpler.

### Validating Test Expectations

**⚠️ CRITICAL: When writing test expectations for grammar/linguistic rules, validate from authoritative sources. Do not rely on assumptions or memory.**

**⚠️ CRITICAL: Never assume production code is correct. Tests MUST reflect correct expected behavior from authoritative sources, NOT potentially incorrect production output. Writing tests based on incorrect production code validates and perpetuates bugs. Always verify expected behavior from authoritative sources first, then write tests asserting correct behavior, regardless of current production output.**

1. **Verify from authoritative sources**: Before writing test expectations for Arabic grammar rules (verb conjugations, masdar patterns, etc.):
   - Search and consult authoritative Arabic grammar references
   - Cross-check against multiple reliable sources (grammar textbooks, linguistic references, verified conjugation tables)
   - Use web search to find actual examples of verb forms being tested
   - Verify complete conjugation paradigms, not just isolated forms

2. **Run tests and note discrepancies**: After writing test expectations:
   - Run tests to see what production code produces
   - If tests fail, compare expected values against production output
   - If there's a discrepancy, add a comment noting it for review
   - **NEVER assume production code is correct.** If expectations are based on authoritative sources, keep them as-is even if they fail. Changing verified expectations to match potentially incorrect production code is a critical error
   - Don't fix production code unless explicitly instructed

3. **Document uncertainty**: If uncertain about correct grammar rules:
   - State uncertainty explicitly in comments
   - List sources consulted
   - Ask for verification rather than making assumptions
   - Check similar verbs in existing test suite for patterns

4. **Cross-reference existing tests**: Before writing new test expectations:
   - Check existing tests for similar verb patterns to understand expected behavior
   - Look for patterns in how other verbs of the same type are conjugated
   - Note inconsistencies in existing tests that might indicate areas needing correction

5. **Verify complete paradigms**: When testing verb conjugations:
   - Verify ALL pronoun forms, not just a subset
   - Ensure the pattern is consistent across all forms
   - Check that special cases (dual, plural, feminine) follow the same rules

6. **Verification order for fixing conjugations**: When fixing incorrect conjugations, verify and fix dependencies first:
   - **If imperative is incorrect**: Check (from authoritative sources) if jussive is correct, then verify and fix jussive before fixing imperative.
   - **Before fixing subjunctive or jussive**: Verify present tense is correct first, as both are derived from present tense.

### UI Test Best Practices

- ✅ **DO use literal UI expectations**: In UI tests, assert on visible text and avoid mocking or calling production helpers to compute expectations (e.g., no `getClosestVerbs`, no `findVerbById` in UI specs). Keep expected UI strings inline with tests instead of sharing "magical" fixtures.
- ❌ **UI text not a truth source**: Don’t use UI tests to validate word correctness; rely on derivation functions because UI strings can change (e.g., diacritic stripping).
- ✅ **Async element queries**: Prefer `findBy*` over `waitFor` + `getBy*` combinations.
- ✅ **Base-path agnostic routing**: Use root `/` with hash paths (e.g., `/#/en`) and assert on hash/path directly; only stub `BASE_URL` when explicitly testing base-url behavior.

## Functional Programming Patterns

### Immutability

- Prefer immutable data structures
- Use `readonly` modifiers for arrays and objects that shouldn't be mutated
- Use spread operators and functional methods instead of mutations

## Conjugation Rule Patterns

- **When word structure is fixed and known, use direct slicing/indexing instead of searching and conditionals:** If you know exact positions (e.g., "pronoun prefix is always 2 chars, Form X prefix is always 4 chars, weak letter is always at index 6"), use `word.slice(0, 6)` and `word.slice(8)` rather than `findIndex` and conditional checks.
- **Avoid redundant condition checks:** If a condition already implies another check, don't repeat it. For example, if `isFinalWeak` checks for weak letters (which includes `WAW`, `YEH` and some others), but you only want to handle `WAW` and `YEH` cases, use `c3 === WAW || c3 === YEH` **only** - don't write `isFinalWeak && (c3 === WAW || c3 === YEH)` because those specific letters are guaranteed to be weak.

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

- Keep functions small and focused on single responsibility
- Extract complex logic into separate functions
- Prefer pure functions (no side effects)
- Document complex algorithms with clear variable names

## Type Safety

### Type Definitions

- Define types and interfaces explicitly; prefer `interface` over `type`
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

- [ ] **Tests were written first** (TDD) - Non-negotiable, checked first
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
