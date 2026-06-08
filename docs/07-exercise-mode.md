## Exercise Mode

**Interface** (`src/exercises/exercises.ts`):
```typescript
type InputMode = 'multiple-choice' | 'keyboard' | 'speech'

interface Exercise {
  kind: ExerciseKind
  word: string
  spokenWord: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: readonly string[]
  answer: number
  cardKey: string
  dimensions: readonly DimensionKey[]
  explanation?: ExplanationLayers | null
  inputModes: readonly InputMode[]
}
```

**Exercise kinds**: `conjugation`, `masdarForm`, `masdarRoot`, `masdarVerb`, `participleForm`, `participleRoot`, `participleVerb`, `verbParticiple`, `verbForm`, `verbMasdar`, `verbPronoun`, `verbRoot`, `rootFormVerb`, `verbTense`.

**Generator pattern**: Each kind has dedicated generator in `src/exercises/generators/` (e.g., `conjugation.ts`, `verb-form.ts`, `masdar-form.ts`).

**Adaptive dimensions** (`src/exercises/dimensions.ts`):
- `tenses` (0–4): unlocks active past → full passive set
- `pronouns` (0–3): `3ms` → full inventory
- `diacritics` (0–2): `all` → `some` → `none`
- `forms` (0–9): form I → all ten forms
- `rootTypes` (0–5): sound → doubled → assimilated → hollow → defective → hamzated
- `nominals` (0–2): none → participles → masdar

`recordDimensionAnswer` tracks rolling windows; `promoteDimensions` promotes/demotes via accuracy thresholds; `enforcePrerequisites` blocks invalid profiles.

**SRS and persistence**:
- `nextExercise(profile, srsStore, session, focus)` prioritizes due cards filtered by unlocked dimensions
- Card identity: `cardKey` (`kind:rootType:form[:tense:pronoun]`)
- SRS state: `conjugator:srs`; daily stats: `conjugator:exercise:daily`; dimension state: `conjugator:dimensions`
- Streak goal: 10 correct/day

**Input modes** (`ExerciseAnswerArea`): Each exercise declares which input modes it supports via `inputModes`. The answer area renders the appropriate UI:
- `multiple-choice` — grid of `ShortcutButton` options (always available)
- `keyboard` — Arabic text input with inline submit; correct answer revealed on wrong
- `speech` — Web Speech API recognition via `useSpeechRecognition('ar')`; auto-starts on mode entry; correct spoken answer auto-submits without explicit confirmation; wrong answer shows transcript and retry button; mode only offered when `supported === true`

Keyboard shortcut `t` switches to typing, `v` to speech, `c` back to multiple-choice. Mode persists across exercises until the user switches.

**Component pattern**: `ExerciseMode` accepts `generateExercise` prop (defaults to `nextExercise`) for test injection. Preserve when adding exercise types.

**Annotation/Explanation system**: Morpheme-level annotation (prefix, stem, suffix w/ grammatical roles) + explanation generation for conjugations + nominals. Used in `ConjugationInsights.tsx`, `FormInsights.tsx`, `NominalInsights.tsx`, `RootInsights.tsx`.