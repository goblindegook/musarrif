import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { type Verb, verbs } from '../paradigms/verbs'
import { Heading } from './atoms/Heading'
import { Text } from './atoms/Text'
import { SuggestionsList } from './QuickPickList'
import { VerbPill } from './VerbPill'

const FORM_PATTERNS: Record<number, string> = {
  1: 'فَعَلَ',
  2: 'فَعَّلَ',
  3: 'فَاعَلَ',
  4: 'أَفْعَلَ',
  5: 'تَفَعَّلَ',
  6: 'تَفَاعَلَ',
  7: 'اِنْفَعَلَ',
  8: 'اِفْتَعَلَ',
  9: 'اِفْعَلَّ',
  10: 'اِسْتَفْعَلَ',
}

export const FormInsights = ({ form }: { form: number }) => {
  const { t, dir, lang } = useI18n()
  const pattern = FORM_PATTERNS[form] ?? ''

  const formInsightExamples = useMemo<Verb[]>(() => {
    const pool = verbs.filter((verb) => verb.form === form)
    const shuffled = pool.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [form])

  return (
    <>
      <PatternDisplay dir="rtl" lang="ar">
        <PatternText>{pattern}</PatternText>
      </PatternDisplay>
      <Text dir={dir} lang={lang}>
        {t(`formInfo.form${form}.description`)}
      </Text>
      <Text dir={dir} lang={lang}>
        {t(`formInfo.form${form}.relationship`)}
      </Text>
      <Heading dir={dir} lang={lang}>
        {t('formInfo.examples')}
      </Heading>
      <SuggestionsList>
        {formInsightExamples.map((example) => (
          <VerbPill key={example.id} verb={example} />
        ))}
      </SuggestionsList>
    </>
  )
}

const PatternDisplay = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`

const PatternText = styled('span')`
  font-size: 2rem;
  font-weight: 600;
  color: #0f172a;
`
