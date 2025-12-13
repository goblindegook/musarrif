import { styled } from 'goober'
import { LANGUAGE_OPTIONS, useI18n } from '../hooks/i18n'
import { useRouting } from '../hooks/routing'
import { LanguageIcon } from './icons/LanguageIcon'

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`

const Label = styled('span')`
  font-weight: 600;
  color: #1e293b;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`

const Icon = styled('span')`
  display: inline-flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.125rem;
  }
`

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
  const { lang, dir, t } = useI18n()
  const { setLang } = useRouting()

  return (
    <Wrapper>
      <Label id="language-label" aria-label={t('languagePicker.label')} title={t('languagePicker.label')}>
        <Icon aria-hidden="true">
          <LanguageIcon />
        </Icon>
      </Label>
      <Select
        value={lang}
        onChange={(event) => setLang(event.currentTarget.value)}
        dir={dir}
        lang={lang}
        aria-label={t('languagePicker.label')}
        aria-labelledby="language-label"
        title={t('languagePicker.label')}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  )
}
