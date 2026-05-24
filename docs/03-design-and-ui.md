## Design Context

### Users

Arabic self-learners studying independently, typically alongside a course or textbook. They use Muṣarrif as a reference and drill companion. The tool should reward attention without demanding it.

### Brand Personality

Elegant, minimal, and quietly authoritative. Three words: **precise, warm, scholarly**. The emotional goal is **confident calm** — users should feel capable and focused, never overwhelmed.

### Aesthetic Direction

- **Palette**: Warm parchment (`#f5f4ee`) backgrounds, white card surfaces, amber/ochre accents (`#92400e`, `#facc15`), slate text hierarchy. Semantic green/red for exercise feedback.
- **Typography**: `system-ui` for UI (intentional choice), Noto Sans Arabic for Arabic script. Uppercase tracking on labels. Generous Arabic script sizing — the language is always the visual centrepiece.
- **Layout**: Clean card-based structure, generous whitespace, rounded corners (1–1.5rem) that feel refined, not playful.
- **Theme**: Light mode today; design with future dark mode compatibility in mind.

**Anti-references**: No gamified/Duolingo aesthetics, no generic SaaS blue, no dense academic PDF, no dark terminal aesthetic.

### Accessibility

- **WCAG 2.1 AA** compliance required across all interfaces.
- Support `prefers-reduced-motion` for animations and transitions.
- Ensure sufficient color contrast ratios for parchment/amber/slate palette.
- Test with screen readers; Arabic script regions must have appropriate ARIA labels.

### Design Principles

1. **Arabic script is the hero.** Always give Arabic text room to breathe at generous sizes.
2. **Clarity over decoration.** Every element earns its presence; whitespace over visual complexity.
3. **Warm restraint.** Warmth in color (parchment, amber); discipline in layout (aligned, minimal, precise).
4. **Scholarly credibility.** Typography and hierarchy should evoke a well-designed reference book — trustworthy, not cold.
5. **Progressive depth.** Simple surface, depth revealed naturally — never overwhelming at first glance.


## UI Components

**Do not invent new styles when existing design idioms are sufficient.** Extend or reuse established patterns first; introduce new styling only when a clear, unavoidable product requirement cannot be met with current idioms.
**Always reuse existing UI primitives before building new ones.** Check `src/ui/atoms/`, `src/ui/molecules/`, `src/ui/icons/`, `Modal.tsx`, `Overlay.tsx`, and `Panel.tsx` first. Never roll bespoke styled wrappers for things that already exist — use `IconButton` + an SVG icon (not emoji buttons), use `Modal`/`Overlay` for modals (not custom `position: fixed` divs). Violating this causes visual inconsistency.

### Preact Component Conventions

- Use functional components with hooks; TypeScript interfaces for props
- Export components as named exports: `export const Component = (...) => { ... }`
- Use `goober` for styled components; define them at the module level
- Prefer `useCallback` for functions passed as props; use `useRef` for DOM references
- Keep state local to components when possible; lift state up only when needed
