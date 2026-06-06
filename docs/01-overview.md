# Agent Guidelines — Muṣarrif

Muṣarrif: PWA Arabic verb conjugator. Search, browse, drill conjugation tables — active/passive voice, all tenses/moods, nominal derivations (masdar, active/passive participles), speech synthesis. Exercise mode for form ID + root extraction.


## Version Control

- Agents must not commit or push. User controls all commits + releases.


## Commands

Use RTK on this project.

Node via Mise. Prefix `node`/`npm` with `mise exec --`.

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

Vitest watch mode by default; `--no-watch` for single runs. Prefer Node over external tools (e.g. Python) for scripts.