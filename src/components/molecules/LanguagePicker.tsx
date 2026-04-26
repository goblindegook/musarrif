import { styled } from 'goober'
import { LANGUAGE_OPTIONS, useI18n } from '../../hooks/useI18n'

const Select = styled('select')`
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
  flex: 1;
  min-width: 0;
  min-height: 36px;
  height: 36px;
  width: 100%;
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

export function LanguagePicker() {
  const { lang, dir, t, setLang } = useI18n()

  return (
    <Select
      value={lang}
      onChange={(event) => setLang(event.currentTarget.value)}
      dir={dir}
      lang={lang}
      aria-label={t('languagePicker.label')}
      title={t('languagePicker.label')}
    >
      {LANGUAGE_OPTIONS.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}
