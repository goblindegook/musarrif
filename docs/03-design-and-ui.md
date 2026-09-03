## Design Context

### Users

Arabic self-learners, typically studying alongside a course/textbook. They use Muṣarrif as reference + drill companion. The tool should reward attention without demanding it.

### Brand Personality

Elegant, minimal, quietly authoritative. Three words: **precise, warm, scholarly**. Goal: **confident calm** — users should feel capable + focused, never overwhelmed.

### Aesthetic Direction

**Rubrication**: ink on paper, ruled, with one red used where the scribe meant it. All tokens live in `src/ui/index.css` — never hardcode a color.

- **Palette**: Paper ground `#f6f3ec`, iron-gall ink text (`#1f1a17` → `#5b5147` → `#8a8076`), **one** accent — cinnabar `#a32b18` (`#e8705a` dark). Red carries emphasis, focus, active states. Semantic green/amber/red only for exercise feedback; insight colors are a coding channel, not decoration.
- **Flat surfaces**: no gradients; no shadows except `--shadow-elevated` for modals/overlays. Panels transparent, separated by hairline rules — not cards.
- **Two radii only**: `--radius` (`0.25rem`) and `--radius-pill`. No third value.
- **Borders carry structure**: 1px everywhere; hover/focus shift border to accent instead of adding depth. Border colour must hold 3:1 against the surface it sits on (WCAG 1.4.11) — it is the only affordance these controls have.
- **Typography**: `system-ui` for UI (intentional), Noto Sans Arabic (400–700) for Arabic. Uppercase + `0.08em` tracking on tabs and structural labels. Generous Arabic sizing — always the visual centrepiece. No decorative eyebrows.
- **Motion**: `180ms cubic-bezier(0.22, 1, 0.36, 1)` for state, `300ms` for collapse; every transition needs a `prefers-reduced-motion` escape.
- **Theme**: light + dark, fully tokenised (`:root` / `[data-theme="dark"]`).
- **Print**: app is expected to print; print styles strip borders, shadows, chrome.

**Anti-references**: No gamified/Duolingo, no generic SaaS blue or drop-shadowed card grids, no dense academic PDF, no dark terminal.

### Accessibility

- **WCAG 2.1 AA** required across all interfaces.
- Support `prefers-reduced-motion` for animations.
- Focus always visible: `3px` accent outline, `2px` offset — never suppressed.
- 44px touch targets on coarse pointers.
- Sufficient contrast in both themes; cinnabar must pass on paper and on dark ground.
- Test w/ screen readers; Arabic regions need `lang`/`dir` + ARIA labels.

### Design Principles

1. **Arabic script is the hero.** Give Arabic text room at generous sizes.
2. **One red, spent carefully.** A single accent carries all emphasis; each extra use dilutes the rest.
3. **Flat by rule, not by fashion.** Structure from rules, spacing, hairlines — never shadows, gradients, or soft corners. Standing constraint, not a phase.
4. **Clarity over decoration.** Every element earns its place; whitespace over complexity.
5. **Scholarly credibility.** Typography + hierarchy evoke a well-designed reference book — warmth in paper and ink, not ornament.
6. **Progressive depth.** Simple surface, depth revealed naturally — never overwhelming.


## UI Components

**No new styles when existing idioms suffice.** Extend/reuse first; new styling only when unavoidable requirement can't be met with current idioms.
**Reuse existing UI primitives.** Check `src/ui/atoms/`, `src/ui/molecules/`, `src/ui/icons/`, `Modal.tsx`, `Overlay.tsx`, `Panel.tsx` first. Never roll bespoke wrappers — use `IconButton` + SVG icon (not emoji), `Modal`/`Overlay` for modals (not custom `position: fixed` divs). Violating this causes visual inconsistency.

### Preact Component Conventions

- Functional components + hooks; TypeScript interfaces for props
- Named exports: `export const Component = (...) => { ... }`
- `goober` for styled components; define at module level
- Prefer `useCallback` for prop functions; `useRef` for DOM refs
- State local when possible; lift only when needed
