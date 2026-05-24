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
- ✅ Assert user-facing rendered text when the feature intent is localized copy
- ✅ Prefer `findBy*` over `waitFor` + `getBy*` for async queries
- ✅ Use real collaborators; only mock external boundaries or hard-to-reproduce conditions
- ✅ Use static imports only in tests
- ✅ Property-based testing (e.g. fast-check) is welcome for general rules
- ✅ Unicode normalization in test expectations is acceptable when failures are due solely to combining-mark ordering
- ✅ Prefer canonical data (real datasets) over hand-rolled fixtures unless a minimal repro is needed
- ✅ For object-returning APIs, assert the whole object with `toEqual(...)` or `toMatchObject(...)` instead of chaining field-by-field `expect(obj.field)` checks on the same object
- ❌ Never use control flow (loops/conditionals) in test bodies — assert each case explicitly
- ❌ Never test implementation details; validate behaviour through public APIs
- ❌ Never export internal helpers solely for testing
- ❌ Never test styling (CSS classes, style tags, visual rules)
- ❌ Never reimplement production logic in tests; assert exported functions instead
- ❌ Never assert on dataset field existence — if incorrect, tests will fail naturally
- ❌ Avoid `*ByRole` queries — they introduce significant performance overhead
- ❌ Avoid negative assertions except when verifying something disappears as a result of user action
- ❌ Never replace user-facing copy assertions with translation-key assertions just to make tests pass
- ❌ Never change a test’s behavioral intent as a shortcut; fix setup/data/implementation instead

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
