## Testing Standards

### TDD is MANDATORY ⚠️

**Never change system behaviour before writing tests.**

**Red-Green-Refactor**:
1. Write failing test, **verify it fails** (Red)
2. Write minimum code to pass (Green)
3. Refactor, keep tests green (Refactor)

Tests co-located with source files (`.test.ts` / `.test.tsx`). Framework: Vitest + `@testing-library/preact` + `@testing-library/jest-dom`.

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
- ✅ Assert user-facing rendered text when feature intent is localized copy
- ✅ Prefer `findBy*` over `waitFor` + `getBy*` for async queries
- ✅ Use real collaborators; only mock external boundaries or hard-to-reproduce conditions
- ✅ Static imports only in tests
- ✅ Property-based testing (e.g. fast-check) welcome for general rules
- ✅ Unicode normalization in test expectations OK when failures due solely to combining-mark ordering
- ✅ Prefer canonical data (real datasets) over hand-rolled fixtures unless minimal repro needed
- ✅ For object-returning APIs, assert whole object with `toEqual(...)` or `toMatchObject(...)` instead of chaining field-by-field `expect(obj.field)` checks
- ❌ No control flow (loops/conditionals) in test bodies — assert each case explicitly
- ❌ No testing implementation details; validate behaviour through public APIs
- ❌ No exporting internal helpers solely for testing
- ❌ No testing styles (CSS classes, style tags, visual rules)
- ❌ No reimplementing production logic in tests; assert exported functions instead
- ❌ No asserting on dataset field existence — if incorrect, tests fail naturally
- ❌ Avoid `*ByRole` queries — significant performance overhead
- ❌ Avoid negative assertions except when verifying something disappears from user action
- ❌ No replacing user-facing copy assertions with translation-key assertions to make tests pass
- ❌ No changing test behavioral intent as shortcut; fix setup/data/implementation instead

### UI Test Best Practices

- Assert visible text inline in tests; don't call production helpers to compute expected strings
- Don't use UI tests to validate word correctness; rely on derivation functions (UI strings can change with diacritic stripping)
- Use root `/` with hash paths (e.g. `/#/verbs/ktb-1`), assert on hash/path directly; only stub `BASE_URL` when explicitly testing base-url behaviour

### Conjugation Test Strategy

- **Pattern-first coverage**: New verb with same form, root type, tense as fully-covered verb → add only main pattern test covering all paradigms (active, passive, nominal).
- **Escalation rule**: Main pattern test fails → write full conjugation table test for that verb and tense/mood before touching production code.
- **Imperative rule**: Imperative pattern test fails → write full conjugation tables for both imperative and jussive before changing implementation.
- **Nominals**: Active participle, passive participle, masdar have no full-conjugation concept — keep in table-driven pattern tests.

### Validating Test Expectations ⚠️

**Never assume production code correct. Expectations must reflect correct Arabic grammar from authoritative sources, not production output.**

1. Consult authoritative Arabic grammar references, cross-check multiple sources before writing expectations.
2. Run tests, note discrepancies — don't silently fix expectations to match production.
3. Document uncertainty explicitly; ask for verification rather than guessing.
4. Cross-reference existing tests for similar verb patterns before writing new expectations.
5. Verify ALL pronoun forms, not just subset.
6. **Dependency order when fixing**: incorrect imperatives → verify/fix jussive first; incorrect subjunctive/jussive → verify present tense first.

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
