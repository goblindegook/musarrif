## Code Style

### TypeScript Conventions

- Prefer explicit types over inference when it improves readability
- Use readonly arrays/objects for immutability: `readonly string[]`
- Prefer nullish equality (`value == null` / `value != null`) over strict `undefined`/`null` checks for absence
- Inline variables used only once unless it hurts readability

### Naming Conventions

- **Functions/Variables**: camelCase (`conjugateFuture`, `isDefectiveRadical`)
- **Components/Types/Interfaces**: PascalCase (`Verb`, `VerbMetaProps`)
- **Constants**: UPPER_SNAKE_CASE for module-level constants (`ALIF_HAMZA`)
- **Files**: PascalCase for components (`SpeechButton.tsx`), camelCase for utilities (`pronouns.ts`)

### Function and Code Organization

- Keep functions small, single responsibility; prefer pure functions
- Use spread over mutation

### Type Definitions

- Define types/interfaces explicitly; prefer `interface` over `type`
- Use type aliases for complex types
- Use union types for limited values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10`
- Use type guards for narrowing: `function isLanguage(lang: unknown): lang is Language`

### Comments

- Explain WHY, not what/how
- No comments explaining what code is obviously doing
- Write comments for non-obvious decisions, workarounds, or grammar rules
- Use comments with linter ignores to explain why a rule is ignored

#### Good Comment Example

```typescript
// Doubly weak (middle wāw, final yā') keeps the glide and takes kasra before yā': يَحْوِي
return [YEH, FATHA, c1, SUKOON, c2, KASRA, YEH]
```
