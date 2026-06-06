## Code Style and Formatting

### TypeScript Conventions

- Use TypeScript with strict typing
- Use `type` keyword for type-only imports: `import type { Verb } from './verbs'`
- Prefer explicit types over inference when it improves readability
- Use readonly arrays/objects for immutability: `readonly string[]`
- Prefer nullish equality (`value == null` / `value != null`) over strict `undefined`/`null` checks for absence
- Inline variables used only once unless it hurts readability

### Formatting Rules (Biome)

- **Indentation**: 2 spaces
- **Line width**: 120 characters
- **Quotes**: Single quotes
- **Semicolons**: As needed (Biome handles automatically)
- **Import order**: External packages first, then internal

### Naming Conventions

- **Functions/Variables**: camelCase (`conjugateFuture`, `isDefectiveRadical`)
- **Components/Types/Interfaces**: PascalCase (`Verb`, `VerbMetaProps`)
- **Constants**: UPPER_SNAKE_CASE for module-level constants (`ALIF_HAMZA`)
- **Files**: PascalCase for components (`SpeechButton.tsx`), camelCase for utilities (`pronouns.ts`)

### Type Definitions

- Define types/interfaces explicitly; prefer `interface` over `type`
- Use type aliases for complex types
- Use union types for limited values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10`
- Use type guards for narrowing: `function isLanguage(lang: unknown): lang is Language`

### Comments

- Explain WHY, not what/how
- No comments explaining what code does
- Write comments for non-obvious decisions, workarounds, or grammar rules
- Use comments with linter ignores to explain why rule is ignored

#### Good Comment Example

```typescript
// Doubly weak (middle wāw, final yā') keeps the glide and takes kasra before yā': يَحْوِي
return `${YEH}${FATHA}${c1}${SUKOON}${c2}${KASRA}${YEH}`
```

### Function and Code Organization

- Keep functions small, single responsibility; prefer pure functions
- Use `const` for components and module-level constants; use spread over mutation
- Imports: external packages first, then internal type imports, then internal component/utility imports
