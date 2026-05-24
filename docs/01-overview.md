# Agent Guidelines — Muṣarrif

Muṣarrif is an interactive Arabic verb conjugator — a PWA that lets users search, browse, and drill Arabic verb conjugation tables, including active/passive voice, all tenses/moods, and nominal derivations (masdar, active/passive participles), with speech synthesis support. It also includes an exercise mode for drilling form identification and root extraction.


## Version Control

- Agents must not commit or push anything. Committing is at the user's discretion, and the user retains full control over releases.


## Commands

Always use RTK when working on this project.

Node is managed via Mise. Always prefix `node`/`npm` commands with `mise exec --`.

```bash
rtk mise exec -- npm run dev              # Dev server
rtk mise exec -- npm run build            # tsc + vite build
rtk mise exec -- npm run preview          # Preview production build
rtk mise exec -- npm test -- --no-watch   # Run tests once (default is watch mode)
rtk mise exec -- npm test -- --no-watch src/path/to/file.test.ts  # Single test file
rtk mise exec -- npm run test:coverage    # Coverage report
rtk mise exec -- npm run test:mutation    # Stryker mutation testing
rtk mise exec -- npm run lint             # Biome lint check
rtk mise exec -- npm run lint:fix         # Auto-fix lint issues
rtk mise exec -- npm run format           # lint:fix + format
rtk mise exec -- node script.js           # Node scripts (always with mise exec --)
```

Vitest runs in watch mode by default; pass `--no-watch` for single runs. Prefer Node over external tools (e.g. Python) for scripting tasks.
