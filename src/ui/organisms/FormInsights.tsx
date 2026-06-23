import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { conjugate } from '../../paradigms/conjugation'
import { renderExplanation, resolveVerbExplanationLayers, toFormDescriptor } from '../../paradigms/explanation'
import { applyDiacriticsPreference } from '../../paradigms/tokens'
import { type DisplayVerb, isTriliteralFormIDisplayVerb, synthesizeVerb, verbs } from '../../paradigms/verbs'
import { ArabicDisplay } from '../atoms/ArabicDisplay'
import { Heading } from '../atoms/Heading'
import { InlineVerbList } from '../atoms/InlineVerbList'
import { Text } from '../atoms/Text'
import { useI18n } from '../hooks/useI18n'
import { VerbPill } from '../molecules/VerbPill'

const getVowelPattern = (verb: DisplayVerb): string => {
  const templateRoot = verb.root.length > 3 ? 'فعلل' : 'فعل'
  const synthetic = isTriliteralFormIDisplayVerb(verb)
    ? synthesizeVerb(templateRoot, 1, verb.vowels)
    : synthesizeVerb(templateRoot, verb.form)
  return [synthetic.lemma, String(conjugate(synthetic, 'active.present.indicative')['3ms'])].join(' / ')
}

export const FormInsights = ({ verb }: { verb: DisplayVerb }) => {
  const { t, dir, lang } = useI18n()
  const pattern = applyDiacriticsPreference(getVowelPattern(verb), 'some')
  const formExplanationParagraph = useMemo(() => {
    const { paradigmRoots, paradigmForm, arabic, form, formRoot } = resolveVerbExplanationLayers(
      verb,
      'active.past',
      '3ms',
      verb.lemma,
    )
    return (
      renderExplanation({ category: 'verb', paradigmRoots, paradigmForm, arabic, form, formRoot }, t)[0]
        ?.map((s) => s.text)
        .join(' ') ?? ''
    )
  }, [verb, t])

  const formInsightExamples = useMemo<DisplayVerb[]>(() => {
    const pool = verbs.filter((example) => example.form === verb.form && example.root.length === verb.root.length)
    const shuffled = pool.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [verb.form, verb.root.length])

  return (
    <>
      <SemanticAnchor dir={dir} lang={lang}>
        {t(`formInfo.form${toFormDescriptor(verb)}.semantic`)}
      </SemanticAnchor>
      <ArabicDisplay>{pattern}</ArabicDisplay>
      {formExplanationParagraph && (
        <Text dir={dir} lang={lang}>
          {formExplanationParagraph}
        </Text>
      )}
      {verb.root.length === 3 && (
        <Text dir={dir} lang={lang}>
          {t(`formInfo.form${verb.form}.relationship`)}
        </Text>
      )}
      <Heading dir={dir} lang={lang}>
        {t('formInfo.examples')}
      </Heading>
      <InlineVerbList>
        {formInsightExamples.map((example) => (
          <VerbPill key={example.id} verb={example} />
        ))}
      </InlineVerbList>
    </>
  )
}

const SemanticAnchor = styled('p')`
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text-emphasis);
  margin: 0 0 0.75rem;
  letter-spacing: 0.01em;
`
