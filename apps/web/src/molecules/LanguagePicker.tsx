import { Select } from '../atoms/Select'
import { LANGUAGE_OPTIONS, useI18n } from '../hooks/useI18n'

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
