# Agent Guidelines — Muṣarrif

This file is an index. Full guidance is split by topic under `docs/` so agents can jump directly to what they need.

## Always Read First

- Do not commit or push.
- Adding, correcting or translating a verb: use the `add-verb` and `translate-verb` skills. Per-source quirks are in [Conjugation Rules and Verb Entry Workflow](docs/06-conjugation-and-lexicon.md).
- Use RTK for all commands — e.g. `rtk mise exec -- npm test`. RTK has a documented failure mode of silently not firing; if `rtk gain` shows no savings, the invocation is wrong, not the tool.

## Topic Index

- [Project Overview and Commands](docs/01-overview.md)
- [Architecture and Directory Map](docs/02-architecture.md)
- [Design Context and UI Conventions](docs/03-design-and-ui.md)
- [Code Style](docs/04-code-style.md)
- [Testing Standards and TDD](docs/05-testing.md)
- [Conjugation Rules and Verb Entry Workflow](docs/06-conjugation-and-lexicon.md)
- [Exercise Mode Architecture](docs/07-exercise-mode.md)
- [Localization, Copy Terminology, and Punctuation](docs/08-localization-and-copy.md)

## Verification

After any change, run the checks and fix any issues before considering the task done:

```bash
rtk mise exec -- npm run check:all
```

## Notes

- When updating AGENTS guidance, edit the relevant file(s) in `docs/` and keep this index current.
