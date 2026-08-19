# Agent Guidelines — Muṣarrif

This file is an index. Full guidance is split by topic under `docs/` so agents can jump directly to what they need.

## Always Read First

- Do not commit or push.
- Use RTK for all commands — e.g. `rtk mise exec -- npm test`. RTK has a documented failure mode of silently not firing; if `rtk gain` shows no savings, the invocation is wrong, not the tool.

## Topic Index

- [Project Overview and Commands](docs/01-overview.md)
- [Architecture and Directory Map](docs/02-architecture.md)
- [Design Context and UI Conventions](docs/03-design-and-ui.md)
- [Code Style and Formatting](docs/04-code-style.md)
- [Testing Standards and TDD](docs/05-testing.md)
- [Localization, Conjugation Rules, and Verb Entry Workflow](docs/06-localization-and-lexicon.md)
- [Exercise Mode Architecture](docs/07-exercise-mode.md)

## Contribution Checklist

Before finishing, run the `check` skill (`.claude/skills/check/`) — it covers TDD compliance, lint, tests, build, comments, and locale files as a runnable pre-submission gate. Two things it doesn't check, so still worth a manual pass:

- [ ] Linter passes without undocumented ignores (`check` confirms lint passes, not that every ignore is explained)
- [ ] Existing UI primitives reused (no bespoke wrappers)

**If TDD was violated (tests written after production code), `check` will flag it — but the fix isn't automatic, you must start over.**

## Notes

- When updating AGENTS guidance, edit the relevant file(s) in `docs/` and keep this index current; keep the checklist here in `AGENTS.md`.
