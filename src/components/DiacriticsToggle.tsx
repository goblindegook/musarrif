import { styled } from 'goober'
import { useI18n } from '../hooks/i18n'
import type { DiacriticsPreference } from '../paradigms/helpers'

const DIACRITICS_OPTIONS: readonly DiacriticsPreference[] = ['all', 'some', 'none']
const DIACRITICS_ICON = '\u25cc\u064b'

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`

const Label = styled('span')`
  color: #1e293b;
  display: inline-flex;
  align-items: center;
`

const Icon = styled('span')`
  display: inline-flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  font-size: 1.75rem;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
`

const Options = styled('div')`
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 0.25rem;
  border-radius: 0.95rem;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  flex: 1;
  gap: 0.25rem;
  min-width: 0;
  width: 100%;
`

const Option = styled('button')<{ active: boolean }>`
  background: ${({ active }) => (active ? '#fff8e1' : 'transparent')};
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? '#facc15' : 'transparent')};
  box-shadow: ${({ active }) => (active ? '0 4px 14px rgba(15, 23, 42, 0.12)' : 'none')};
  color: ${({ active }) => (active ? '#92400e' : '#475569')};
  cursor: pointer;
  flex: 1;
  font-size: 0.75rem;
  font-weight: 300;
  justify-content: center;
  letter-spacing: 0.08em;
  min-width: 64px;
  padding: 0.45rem 0.75rem;
  text-transform: uppercase;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover {
    background: ${({ active }) => (active ? '#ffe58f' : '#f1f5f9')};
    border-color: ${({ active }) => (active ? '#eab308' : '#cbd5f5')};
    color: ${({ active }) => (active ? '#92400e' : '#334155')};
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
  }

  @media (min-width: 720px) {
    min-width: 96px;
    padding: 0.5rem 0.9rem;
  }
`

export function DiacriticsToggle() {
  const { diacriticsPreference: preference, setDiacriticsPreference: setPreference, t: translate } = useI18n()

  return (
    <Wrapper>
      <Label id="diacritics-label" aria-label={translate('diacritics.title')} title={translate('diacritics.title')}>
        <Icon aria-hidden="true">{DIACRITICS_ICON}</Icon>
      </Label>
      <Options role="group">
        {DIACRITICS_OPTIONS.map((option) => (
          <Option
            type="button"
            key={option}
            active={preference === option}
            aria-pressed={preference === option}
            onClick={() => setPreference(option)}
            title={`${translate('diacritics.title')}: ${translate(`diacritics.${option}`)}`}
          >
            {translate(`diacritics.${option}`)}
          </Option>
        ))}
      </Options>
    </Wrapper>
  )
}
