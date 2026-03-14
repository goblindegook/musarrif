import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import type { FormIPattern } from '../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../paradigms/letters'
import { type DisplayVerb, type VerbForm, verbs } from '../paradigms/verbs'
import { Heading } from './atoms/Heading'
import { Text } from './atoms/Text'
import { SuggestionsList } from './QuickPickList'
import { VerbPill } from './VerbPill'

const FORM_I_PATTERNS: Record<FormIPattern, string> = {
  'fa3ala-yaf3alu': 'فَعَلَ / يَفْعَلُ',
  'fa3ala-yaf3ilu': 'فَعَلَ / يَفْعِلُ',
  'fa3ala-yaf3ulu': 'فَعَلَ / يَفْعُلُ',
  'fa3ila-yaf3alu': 'فَعِلَ / يَفْعَلُ',
  'fa3ila-yaf3ilu': 'فَعِلَ / يَفْعِلُ',
  'fa3ila-yaf3ulu': 'فَعِلَ / يَفْعُلُ',
  'fa3ula-yaf3alu': 'فَعُلَ / يَفْعَلُ',
  'fa3ula-yaf3ilu': 'فَعُلَ / يَفْعِلُ',
  'fa3ula-yaf3ulu': 'فَعُلَ / يَفْعُلُ',
}

const FORM_PATTERNS: Record<Exclude<VerbForm, 1>, string> = {
  2: 'فَعَّلَ / يُفَعِّلُ',
  3: 'فَاعَلَ / يُفَاعِلُ',
  4: 'أَفْعَلَ / يُفْعِلُ',
  5: 'تَفَعَّلَ / يَتَفَعَّلُ',
  6: 'تَفَاعَلَ / يَتَفَاعَلُ',
  7: 'اِنْفَعَلَ / يَنْفَعِلُ',
  8: 'اِفْتَعَلَ / يَفْتَعِلُ',
  9: 'اِفْعَلَّ / يَفْعَلُّ',
  10: 'اِسْتَفْعَلَ / يَسْتَفْعِلُ',
}

const getFormPattern = (verb: DisplayVerb): string =>
  verb.form === 1 ? FORM_I_PATTERNS[verb.formPattern] : FORM_PATTERNS[verb.form]

export const FormInsights = ({ verb }: { verb: DisplayVerb }) => {
  const { t, dir, lang, diacriticsPreference } = useI18n()
  const pattern = applyDiacriticsPreference(getFormPattern(verb), diacriticsPreference)

  const formInsightExamples = useMemo<DisplayVerb[]>(() => {
    const pool = verbs.filter((example) => example.form === verb.form)
    const shuffled = pool.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [verb.form])

  return (
    <>
      <SemanticAnchor data-testid="form-semantic-anchor" dir={dir} lang={lang}>
        {t(`formInfo.form${verb.form}.semantic`)}
      </SemanticAnchor>
      <PatternDisplay data-testid="form-pattern" dir="rtl" lang="ar">
        <PatternText>{pattern}</PatternText>
      </PatternDisplay>
      <Text dir={dir} lang={lang}>
        {t(`formInfo.form${verb.form}.description`)}
      </Text>
      <Text dir={dir} lang={lang}>
        {t(`formInfo.form${verb.form}.relationship`)}
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

const SemanticAnchor = styled('p')`
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  color: #92400e;
  margin: 0 0 0.75rem;
  letter-spacing: 0.01em;
`

const PatternDisplay = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`

const PatternText = styled('span')`
  font-size: 2rem;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  word-break: break-word;
`
