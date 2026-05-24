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

**Generator pattern**: Each exercise kind has a dedicated generator file in `src/exercises/generators/` (e.g., `conjugation.ts`, `verb-form.ts`, `masdar-form.ts`).

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

**Annotation/Explanation system**: Morpheme-level annotation of conjugations (prefix, stem, suffix with grammatical roles) and grammatical explanation generation for conjugations and nominals. Used in `ConjugationInsights.tsx`, `FormInsights.tsx`, `NominalInsights.tsx`, and `RootInsights.tsx`.
