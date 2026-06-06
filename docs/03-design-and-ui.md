## Design Context

### Users

Arabic self-learners, typically studying alongside a course/textbook. They use Muṣarrif as reference + drill companion. The tool should reward attention without demanding it.

### Brand Personality

Elegant, minimal, quietly authoritative. Three words: **precise, warm, scholarly**. Goal: **confident calm** — users should feel capable + focused, never overwhelmed.

### Aesthetic Direction

- **Palette**: Warm parchment (`#f5f4ee`) bg, white card surfaces, amber/ochre accents (`#92400e`, `#facc15`), slate text hierarchy. Semantic green/red for feedback.
- **Typography**: `system-ui` for UI (intentional), Noto Sans Arabic for Arabic script. Uppercase tracking on labels. Generous Arabic sizing — language always visual centrepiece.
- **Layout**: Clean card structure, generous whitespace, rounded corners (1–1.5rem), refined not playful.
- **Theme**: Light + dark modes.

**Anti-references**: No gamified/Duolingo, no generic SaaS blue, no dense academic PDF, no dark terminal.

### Accessibility

- **WCAG 2.1 AA** required across all interfaces.
- Support `prefers-reduced-motion` for animations.
- Sufficient contrast for parchment/amber/slate palette.
- Test w/ screen readers; Arabic regions need ARIA labels.

### Design Principles

1. **Arabic script is the hero.** Give Arabic text room at generous sizes.
2. **Clarity over decoration.** Every element earns its place; whitespace over complexity.
3. **Warm restraint.** Warmth in color (parchment, amber); discipline in layout (aligned, minimal, precise).
4. **Scholarly credibility.** Typography + hierarchy evoke well-designed reference book — trustworthy, not cold.
5. **Progressive depth.** Simple surface, depth revealed naturally — never overwhelming.


## UI Components

**No new styles when existing idioms suffice.** Extend/reuse first; new styling only when unavoidable requirement can't be met with current idioms.
**Reuse existing UI primitives.** Check `src/ui/atoms/`, `src/ui/molecules/`, `src/ui/icons/`, `Modal.tsx`, `Overlay.tsx`, `Panel.tsx` first. Never roll bespoke wrappers — use `IconButton` + SVG icon (not emoji), `Modal`/`Overlay` for modals (not custom `position: fixed` divs). Violating this causes visual inconsistency.

### Preact Component Conventions

- Functional components + hooks; TypeScript interfaces for props
- Named exports: `export const Component = (...) => { ... }`
- `goober` for styled components; define at module level
- Prefer `useCallback` for prop functions; `useRef` for DOM refs
- State local when possible; lift only when needed
