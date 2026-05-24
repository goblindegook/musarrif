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

#### Good Comment Example

```typescript
// Doubly weak (middle wāw, final yā') keeps the glide and takes kasra before yā': يَحْوِي
return `${YEH}${FATHA}${c1}${SUKOON}${c2}${KASRA}${YEH}`
```

### Function and Code Organization

- Keep functions small and focused on a single responsibility; prefer pure functions
- Use `const` for components and module-level constants; use spread operators over mutation
- Imports: external packages first, then internal type imports, then internal component/utility imports
