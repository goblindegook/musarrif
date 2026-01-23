import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { analyzeRoot } from '../paradigms/letters'
import { search, transliterate } from '../paradigms/verbs'
import { Heading } from './atoms/Heading'
import { Text } from './atoms/Text'
import { SuggestionsList } from './QuickPickList'
import { VerbPill } from './VerbPill'

export const RootInsights = ({ root }: { root: string }) => {
  const { t, dir, lang } = useI18n()
  const rootAnalysis = analyzeRoot(root)
  const transliteratedRoot = transliterate(root)
  const semanticMeaning = t(transliteratedRoot)
  const derivedForms = useMemo(() => search(root, { exactRoot: true }).sort((a, b) => a.form - b.form), [root])
  return (
    <>
      <RootDisplay>
        {semanticMeaning !== transliteratedRoot && (
          <Text dir={dir} lang={lang}>
            <em>
              <q>{semanticMeaning}</q>
            </em>
          </Text>
        )}
        <RootLetters dir="rtl" lang="ar">
          {Array.from(root).map((letter, index) => {
            const isWeak = rootAnalysis.weakPositions.includes(index)
            const isHamza = rootAnalysis.hamzaPositions.includes(index)
            return (
              <RootLetter key={index} weak={isWeak} hamza={isHamza}>
                {letter}
                {isWeak && <RootLetterAnnotation>{t('rootInfo.annotation.weak')}</RootLetterAnnotation>}
                {isHamza && <RootLetterAnnotation>{t('rootInfo.annotation.hamzated')}</RootLetterAnnotation>}
              </RootLetter>
            )
          })}
        </RootLetters>
      </RootDisplay>
      <Text dir={dir} lang={lang}>
        {t(`rootInfo.${rootAnalysis.type}.description`) || t('rootInfo.strong.description')}
      </Text>
      <Heading dir={dir} lang={lang}>
        {t('rootInfo.forms')}
      </Heading>
      <SuggestionsList>
        {derivedForms.map((v) => (
          <VerbPill key={v.id} verb={v} />
        ))}
      </SuggestionsList>
    </>
  )
}

const RootDisplay = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 4rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`

const RootLetters = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1.5rem;
`

const RootLetter = styled('span')<{ weak?: boolean; hamza?: boolean }>`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => (props.weak || props.hamza ? '#92400e' : '#0f172a')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-width: 3rem;
  min-height: 3rem;
  flex: 0 0 auto;
`

const RootLetterAnnotation = styled('small')`
  font-size: 0.65rem;
  color: #92400e;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  margin-top: 0.25rem;
`
