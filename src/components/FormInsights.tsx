import { useMemo } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { type Verb, verbs } from '../paradigms/verbs'
import { Heading } from './atoms/Heading'
import { Text } from './atoms/Text'
import { SuggestionsList } from './QuickPickList'
import { VerbPill } from './VerbPill'

export const FormInsights = ({ form }: { form: number }) => {
  const { t, dir, lang } = useI18n()

  const formInsightExamples = useMemo<Verb[]>(() => {
    const pool = verbs.filter((verb) => verb.form === form)
    const shuffled = pool.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [form])

  return (
    <>
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
