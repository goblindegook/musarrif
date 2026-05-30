import { styled } from 'goober'

export const Select = styled('select')`
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.9rem;
  border: 1px solid var(--color-border-input);
  padding: 0.6rem 2.2rem 0.6rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-text-primary);
  background-color: var(--color-bg-surface-secondary);
  background-image:
    linear-gradient(45deg, transparent 50%, var(--color-text-muted) 50%),
    linear-gradient(135deg, var(--color-text-muted) 50%, transparent 50%);
  background-position:
    calc(100% - 1rem) 50%,
    calc(100% - 0.75rem) 50%;
  background-size:
    0.35rem 0.35rem,
    0.35rem 0.35rem;
  background-repeat: no-repeat;
  cursor: pointer;
  min-width: 0;
  min-height: 36px;
  width: 100%;
  box-sizing: border-box;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;

  &:hover {
    background-color: var(--color-bg-surface);
    border-color: var(--color-border-input);
    box-shadow: var(--shadow-interactive-hover);
  }

  &:focus {
    outline: 3px solid var(--color-focus-outline);
    border-color: var(--color-accent);
    box-shadow: var(--shadow-interactive-hover);
  }

  &[dir='rtl'] {
    padding: 0.6rem 1rem 0.6rem 2.2rem;
    background-position:
      0.75rem 50%,
      1rem 50%;
  }
`
