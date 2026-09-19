---
name: code-review
description: >
  Use when asked to review code, a pull request, staged or uncommitted changes,
  or a commit, or asked whether a change looks right (the word "review" need
  not appear). Also use before opening a PR, before merging, or when asked to
  sanity-check a patch.
---

# Code Review

A disciplined review pass over a Git diff, in four phases: scoping fixes what
you may comment on, planning stops you from skimming, the per-file pass stops
you from reviewing only the interesting file, and the filter stops you from
shipping confident nonsense. Reviews that cry wolf get ignored, and an ignored
review is worse than no review because it cost everyone time.

## Phase 0: scope the diff

Work out what is under review before reading anything.

| User says | Diff to take |
|---|---|
| "review my changes", nothing specified | `git diff HEAD` plus untracked files |
| "review the staged changes" | `git diff --cached` |
| "review this commit", a SHA | `git show <sha>` |
| "review this PR/branch", "compare to main" | `git diff <base>...<head>` |
| a PR number or URL | `gh pr diff <n>` |

Then fix the review set: the list of files whose changed lines you are allowed
to comment on. Everything else in the repository is context you may read but
never comment on.

Also gather the business context, why this change exists. The commit messages,
PR description, or linked ticket usually carry it. A reviewer who does not
know the intent can only check syntax.

If the diff is empty, say so and stop. Do not go hunting for something to
review.

## Phase 1: plan

Before commenting, write a short plan for yourself. Do not show it to the
user unless they ask.

```
Summary: <what this change is doing and why>

Issues
1. [high] <where, what kind of problem, what it would cause>
   -> read src/foo.ts:callers of parseAmount, confirm the unit is cents
2. [medium] ...
```

Rules that make the plan worth writing:

- Only added and modified lines produce issues. Deleted lines are context.
- Sort by severity, high first.
- Each entry names the location, the nature of the problem, and the impact. An
  entry without an impact is a hunch, not an issue.
- The `->` lines are the context you still need to read. They are the point of
  the phase: they turn "this looks suspicious" into "I will go check".
- If the change carries no identifiable risk, write `(none)` and move on. Do
  not invent issues to fill the list. A clean diff is a normal outcome.

Then actually read that context. An issue you planned to verify and did not
verify is not ready to report.

## Phase 2: review

Give every file in the review set its own pass. This is the rule people break:
reviewing `verbs.ts` does not cover `verbs.test.ts`, the interfaces it
implements, or the config file that feeds it. A file being small or secondary
is not a reason to skip it.

Cross-file checks inside the review set are where the real bugs live: a
signature changed on one side and not the other, a new config key nothing
reads, an enum variant added without its switch arm, a migration without the
model change.

What to comment on:

- Correctness. Logic, boundary conditions, error and exception paths, thread
  safety and races, nil and index handling.
- Security. Injection, XSS, secrets in source or logs, authentication and
  permission checks, unsafe deserialization.
- Performance. N+1 queries, work inside loops that belongs outside, unbounded
  growth, resources never released.
- Maintainability. Names that lie, logic that contradicts the surrounding
  conventions, dead branches.
- Tests. Whether the new behavior has a test, and whether that test would
  actually fail if the behavior broke.

What not to comment on:

- Correct code. Saying "this looks good" line by line is padding.
- Unchanged code and deleted code.
- Generated files, lockfiles, and tool markers, unless asked.
- Formatting a linter already owns.

Read `AGENTS.md` and the `docs/` topics for every area the diff touches, and
enforce them. Project convention outranks your preference, and a review that
fights the house style is just noise.

## Repo rules reviews miss

`docs/` is the source of truth; these are the rules past reviews let through.
Run each block whose trigger matches a file in the review set.

**Any `*.test.ts` / `*.test.tsx`** (`docs/05-testing.md`)

- Negative assertions (`.not.toContain`, `.not.toBe`, `.not.toEqual`). Only
  allowed for something disappearing after a user action in a UI test. Ask for
  a positive assertion of what the output is.
- An `export` added to a production module that only the test imports. Tests
  go through the public API (`conjugatePast`, `conjugatePresentMood`, ...).
- Loops or conditionals in a test body.
- A `test.each` title with a param value hardcoded instead of composed from
  the params.
- A paradigm or exercise test asserting translated text. Logic tests pass
  `(key) => key` and assert the key; only UI tests assert rendered copy.
- A UI test computing its expected string with a production helper instead of
  an inline Arabic literal.
- Field-by-field `expect(obj.x)` chains where `toEqual` / `toMatchObject` on
  the whole object would do.
- An expectation that matches production output but not an authoritative
  source (Wiktionary, then ElixirFM, then Reverso).
- A production change whose only purpose is to make a test pass.

**Any source file** (`docs/04-code-style.md`, `docs/06-conjugation-and-lexicon.md`)

- New comments that narrate what the code does, or `ponytail:` markers. A
  comment explaining why the code works the way it does is fine.
- A hard-coded root check where the behavior should derive from root features.
- A paradigm helper taking scalars (`weakLetter`, `finalLetter`, `arabic`)
  derivable from `verb + tense + pronoun` instead of taking the verb.
- A one-root masdar added as a new `MASDAR_PATTERNS` case instead of that
  root's `lexicalMasdars` in `roots.json`.
- A paradigm fixed by override where a derivation rule should change.
- Answer comparison or grading that folds hamza carriers (`أ إ آ ؤ ئ ء`).
  NFC normalization is required; folding letters is a correctness bug.
- A factually wrong grammatical model chosen to avoid a new locale key or enum
  variant.
- Wrapper code compensating for a bad pattern instead of fixing it.

**Any `src/ui/` component** (`docs/03-design-and-ui.md`)

- A bespoke wrapper where a primitive exists: `IconButton` with an SVG icon
  from `src/ui/icons/`, `Modal`, `Overlay`, `Panel`, the `atoms/` and
  `molecules/` controls.
- A hardcoded color instead of a token from `src/ui/index.css`, a third
  radius, a shadow other than `--shadow-elevated`, a gradient, or a transition
  without a `prefers-reduced-motion` escape.
- A `ref` on a goober `styled()` component created without `forwardRef` as
  its second argument. The ref silently receives Preact internals.

**Any `src/ui/locales/*`** (`docs/08-localization-and-copy.md`)

- A changed `*.strings.json` key missing from any of en, it, pt, ar.
- A new `verbs` / `roots` entry missing from en, it, pt, or its `roots` entry
  missing from `ar.verbs.json`.
- A gloss joining two synonyms (`to indicate, to guide`). A second sense must
  be a genuinely different meaning.
- Internal pronoun codes (`3fs`, `2md`) in copy.
- Terminology: *radical* not *letter* for a root letter, *the verb* not
  *stem*, *Form II* not *measure*.
- Punctuation: pt is pt_PT pre-AO90, en is en-US, `’` and `…`, no em dashes,
  `“ ”` in en and `« »` elsewhere, Arabic wrapped in `<span lang="ar">` and
  fully vocalised.
- An example verb in explanation copy that is not the verb on screen.

**`src/data/roots.json`**

- A new verb without its translations in the same change, or without a
  reference test under `src/paradigms/verbs/`.

## Phase 3: filter

Now try to kill your own comments. Default answer is keep. On most reviews
that is correct.

Remove a comment only on one of two grounds, each of which you must be able to
point at a specific diff line for:

**Ground A, wrong file.** The symbol, statement, or construct the comment
describes appears nowhere in the changed lines of the file it is filed
against. The same construct existing in a sibling file does not rescue it.

**Ground B, contradicted by the diff.** The comment asserts a concrete fact
and a diff line plainly shows the opposite. It calls an identifier unused and
the diff uses it. It says a check is missing and the diff has it. It says a
value is hardcoded and the diff reads it from a variable. The contradiction
has to be readable straight off the text. If it takes a chain of reasoning,
there is no contradiction.

**Protected subjects, never remove.** Apply this before judging correctness at
all. Keep the comment whatever you conclude, if its subject is memory safety
(allocation size, buffer length, bounds, off-by-one, use-after-free, null
dereference), concurrency (locks, atomics, races, synchronization contracts),
declaration consistency (a declaration disagreeing with its definition,
visibility, missing `extern`), a behavioral or compatibility change (a field,
status, message, or default the old code produced and the new one does not),
a parameter accepted and never used, or Arabic correctness (a conjugated
form, a hamza seat, a gloss's meaning). These are where a wrongly dropped
comment costs the most and where your confidence is least trustworthy.

**Not grounds for removal:** you find it low value, you disagree with the
recommendation, you cannot confirm it, or it quotes a slightly wrong line
while describing something real. Unverifiable is not incorrect.

## Report

```markdown
## Code Review

**Reviewed**: N files. **Found**: X critical, Y high, Z medium, W low.

<one or two sentences: what the change does, and the headline verdict>

### Critical
- **`path/to/file.ts:42-48`** [bug] Description of the problem and its impact.
  > Fix: what to do instead.

### High
...

### Medium
...
```

Severity:

- `critical`: security hole, data loss, or the feature is broken as written.
- `high`: a bug on a real path, or a contract broken for callers.
- `medium`: performance, maintainability, an edge case that will bite later.
- `low`: style and readability that the linter does not already own.

Category: `bug`, `security`, `performance`, `maintainability`, `test`,
`style`, `documentation`.

Drop empty severity sections. If nothing survived the filter, say the change
looks clean and give the one-line summary. Do not pad.

## Fixing

Review and fix are separate requests. If the user asked only to review, report
and stop, then offer. If they asked to review and fix, fix critical, high, and
medium items directly, describe the ones that need a human decision, and
follow `docs/05-testing.md`: a behavior fix starts with a test seen failing.
Run `rtk mise exec -- npm run check:all` and see it green before calling it
done. Do not commit.
