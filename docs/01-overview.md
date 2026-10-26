# Agent Guidelines — Muṣarrif

Muṣarrif: PWA Arabic verb conjugator. Search, browse, drill conjugation tables — active/passive voice, all tenses/moods, nominal derivations (masdar, active/passive participles), speech synthesis. Exercise mode for form ID + root extraction.


## Version Control

- Agents must not commit or push. User controls all commits + releases.


## Commands

Use RTK on this project.

Node via Mise. Prefix `node`/`npm` with `mise exec --`.

```bash
rtk mise exec -- npm run web:dev          # Web dev server
rtk mise exec -- npm run web:build        # Web: tsc + vite build + prerender
rtk mise exec -- npm run web:build:hash   # Web build with hash routing (used by the desktop app)
rtk mise exec -- npm run web:preview      # Preview production web build
rtk mise exec -- npm run web:prerender    # Re-run prerender alone against an existing path-mode apps/web/dist
rtk mise exec -- npm run desktop:dev      # Tauri desktop dev
rtk mise exec -- npm run desktop:build    # Tauri desktop bundles (regenerates icons first)
rtk mise exec -- npm run desktop:icons    # Regenerate Tauri icons
rtk mise exec -- npm test -- --no-watch   # Run shared and web tests once (default is watch mode)
rtk mise exec -- npm test -- --no-watch src/path/to/file.test.ts  # Single test file
rtk mise exec -- npm run web:test -- --run  # Run only the web app tests, once
rtk mise exec -- npm run web:typecheck    # Web app typecheck
rtk mise exec -- npm run mobile:test      # Mobile app tests
rtk mise exec -- npm run mobile:typecheck # Mobile app typecheck
rtk mise exec -- npm run test:coverage    # Coverage report
rtk mise exec -- npm run test:mutation    # Stryker mutation testing
rtk mise exec -- npm run check:lint       # Biome lint check
rtk mise exec -- npm run check:all        # Full CI gate
rtk mise exec -- npm run check:boundaries # Dependency boundaries (depcruise)
rtk mise exec -- npm run format           # Fix lint + format
rtk mise exec -- npm run add:verb -- <source> <slug> [vowels]   # Write roots.json row
rtk mise exec -- npm run add:tests -- <source> <slug> [vowels]  # Generate paradigm test file
rtk mise exec -- npm run glosses -- --missing                   # Untranslated verbs/roots
rtk mise exec -- npm run debug:elixirfm   # Compare against ElixirFM
rtk mise exec -- node script.js           # Node scripts (always with mise exec --)
```

Vitest watch mode by default; `--no-watch` (root) or `--run` (web only) for single runs. Prefer Node over external tools (e.g. Python) for scripts.
