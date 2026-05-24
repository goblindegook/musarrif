# Agent Guidelines — Muṣarrif

This file is an index. Full guidance is split by topic under `docs/` so agents can jump directly to what they need.

## Always Read First

- Do not commit or push.
- Always use RTK commands.
- Always run Node/NPM as `rtk mise exec -- ...`.

## Topic Index

- [Project Overview and Commands](docs/01-overview.md)
- [Architecture and Directory Map](docs/02-architecture.md)
- [Design Context and UI Conventions](docs/03-design-and-ui.md)
- [Code Style and Formatting](docs/04-code-style.md)
- [Testing Standards and TDD](docs/05-testing.md)
- [Localization, Conjugation Rules, and Verb Entry Workflow](docs/06-localization-and-lexicon.md)
- [Exercise Mode Architecture](docs/07-exercise-mode.md)

## Contribution Checklist

- [ ] Tests were written **before** production code (TDD — non-negotiable)
- [ ] All tests pass
- [ ] No comments unless explaining WHY
- [ ] Biome formatting rules followed
- [ ] Types properly defined
- [ ] Linter passes without undocumented ignores
- [ ] All four locale files updated if UI text changed
- [ ] Existing UI primitives reused (no bespoke wrappers)

**If you cannot check the first item, you have violated TDD and must start over.**

## Notes

- When updating AGENTS guidance, edit the relevant file(s) in `docs/` and keep this index current; keep the checklist here in `AGENTS.md`.
