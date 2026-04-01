import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { useI18n } from '../../hooks/i18n'
import { renderExplanation, resolveVerbExplanationLayers } from '../../paradigms/explanation'
import { applyDiacriticsPreference } from '../../paradigms/letters'
import { conjugate } from '../../paradigms/tense'
import { type DisplayVerb, synthesizeVerb, verbs } from '../../paradigms/verbs'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { SuggestionsList } from '../molecules/QuickPickList'
import { VerbPill } from '../molecules/VerbPill'

const getFormPattern = (verb: DisplayVerb): string => {
  const synthetic = verb.form === 1 ? synthesizeVerb('فعل', 1, verb.formPattern) : synthesizeVerb('فعل', verb.form)
  return [synthetic.label, conjugate(synthetic, 'active.present.indicative')['3ms']].join(' / ')
}

export const FormInsights = ({ verb }: { verb: DisplayVerb }) => {
  const { t, dir, lang } = useI18n()
  const pattern = applyDiacriticsPreference(getFormPattern(verb), 'some')
  const formExplanationParagraph = useMemo(() => {
    const { rootLetters, arabic, form, formRoot } = resolveVerbExplanationLayers(verb, 'active.past', '3ms', verb.label)
    return renderExplanation({ rootLetters, arabic, form, formRoot }, t)[0]
  }, [verb, t])

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
      {formExplanationParagraph && (
        <Text dir={dir} lang={lang}>
          {formExplanationParagraph}
        </Text>
      )}
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
