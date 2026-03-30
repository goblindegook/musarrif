import { styled } from 'goober'
import { LANGUAGE_OPTIONS, useI18n } from '../../hooks/i18n'

const Select = styled('select')`
  border-radius: 0.9rem;
  border: 1px solid #cbd5f5;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  background: #f8fafc;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  min-height: 36px;
  height: 36px;
  width: 100%;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;

  &:hover {
    background: #fff;
    border-color: #cbd5f5;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
  }

  &:focus {
    outline: 3px solid #fde68a;
    border-color: #facc15;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.12);
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
