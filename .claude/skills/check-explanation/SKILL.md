---
name: check-explanation
description: Use when conjugation explanation text looks wrong, irrelevant, missing, or pronoun/tense-sensitive.
argument-hint: "[root form [vowels] paradigm [pronoun], e.g. 'كتب 1 a-u active.past 3ms']"
---

# Check Conjugation Explanation

Use the explanation debugger instead of calling internals manually. It takes positional arguments, there is no interactive prompt.

## Command

```bash
rtk mise exec -- npm run debug:explain -- <root> 1 <vowels> <paradigm> [<pronoun>]
rtk mise exec -- npm run debug:explain -- <root> <form> <paradigm> [<pronoun>]
```

- `root`: Arabic letters or transliteration (`كتب` or `ktb`)
- `form`: `1` to `10`
- `vowels`: Form I only (`a-a`, `a-i`, `a-u`, ...)
- `paradigm`: a verb tense, `active.participle`, `passive.participle` or `masdar`
- `pronoun`: required for verb tenses, omitted for participles and masdar

```bash
rtk mise exec -- npm run debug:explain -- كتب 1 a-u active.past 3ms
rtk mise exec -- npm run debug:explain -- كتب 1 a-u active.participle
rtk mise exec -- npm run debug:explain -- كتب 2 masdar
```

Run it with no arguments to print the full usage and the valid values.

## Verify

- `form` matches the verb
- `rootType` matches the phonology
- `tenseRoot` appears only when the tense/root interaction requires it
- `vowels` appears only for Form I
- passive voice text appears only for passive paradigms
- the Form I active-past base-pattern note appears only for `3ms`
- missing locale keys are not echoed raw

## If It Is Wrong

- Follow TDD: write the failing test first
- Fix `src/paradigms/explanation.ts`
