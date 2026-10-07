import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { derivationSteps } from '../../../../../src/paradigms/annotation'
import type { DerivationStep } from '../../../../../src/paradigms/annotation-types'
import { conjugate } from '../../../../../src/paradigms/conjugation'
import {
  type ExplanationKind,
  type NominalKind,
  type Paragraphs,
  renderExplanation,
  resolveNominalExplanationLayers,
  resolveVerbExplanationLayers,
  toFormDescriptor,
} from '../../../../../src/paradigms/explanation'
import { deriveMasdar } from '../../../../../src/paradigms/nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../../../../../src/paradigms/nominal/participle'
import type { PronounId } from '../../../../../src/paradigms/pronouns'
import { analyzeRoot, rootTypeLocaleKey } from '../../../../../src/paradigms/roots'
import type { VerbTense } from '../../../../../src/paradigms/tense'
import type { DiacriticsPreference } from '../../../../../src/paradigms/tokens'
import { applyDiacriticsPreference, tokenize } from '../../../../../src/paradigms/tokens'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import {
  findVerbsByRoot,
  formatFormLabel,
  getVerb,
  isTriliteralFormIDisplayVerb,
} from '../../../../../src/paradigms/verbs'
import type { Morpheme } from '../../../../../src/paradigms/word'
import { ArabicText } from '../../components/ArabicText'
import { Heading } from '../../components/Heading'
import { Sheet, SheetButton } from '../../components/Sheet'
import { getCopy, type Language } from '../../i18n/copy'
import { getLocaleDirection } from '../../i18n/direction'
import { type ThemeTokens, useThemeTokens } from '../../theme/tokens'
import { VerbRow } from './VerbRow'

export type InsightTarget = Pick<InsightsProps, 'arabic' | 'subject' | 'nominal' | 'verbTense' | 'pronoun'>

type InsightsProps = {
  verb: DisplayVerb
  arabic: string | readonly string[]
  language: string
  diacriticsPreference?: DiacriticsPreference
  verbTense?: VerbTense
  pronoun?: PronounId
  nominal?: NominalKind
  subject?: 'root' | 'form'
  isPresented: boolean
  onDismiss: () => void
  onOpenVerb?: (verb: DisplayVerb) => void
}

// Glyphs, not inline native views: iOS misplaces an inline view in a paragraph that mixes Arabic and Latin text.
const KIND_GLYPHS: Record<ExplanationKind, string> = {
  radical: '●',
  measure: '■',
  agreement: '◆',
  particle: '▲',
  elided: '−',
}

function keyed<T>(values: readonly T[], identify: (value: T) => string): { value: T; key: string }[] {
  const occurrences = new Map<string, number>()
  return values.map((value) => {
    const id = identify(value)
    const occurrence = occurrences.get(id) ?? 0
    occurrences.set(id, occurrence + 1)
    return { value, key: `${id}-${occurrence}` }
  })
}

function labelForStep(
  step: DerivationStep,
  verb: DisplayVerb,
  t: (key: string, values?: Record<string, string>) => string,
): string {
  if (step.type === 'root') return t('meta.root')
  if (step.type === 'form') return t('meta.form.withNumber', { form: formatFormLabel(step.form, verb.root) })
  if (step.type === 'pronoun') return t(`pronoun.${step.pronounId}`)
  return t(`tense.${step.tense}`)
}

function AnnotatedMorphemes({
  morphemes,
  theme,
  diacriticsPreference,
  fontSize,
  separate = false,
}: {
  morphemes: readonly Morpheme[]
  theme: ThemeTokens
  diacriticsPreference: DiacriticsPreference
  fontSize: number
  separate?: boolean
}) {
  return (
    <ArabicText locale="ar" selectable style={{ fontSize, fontWeight: '600', flexShrink: 1 }}>
      {keyed(morphemes, (morpheme) => `${morpheme.role}-${String(morpheme)}`).map(({ value: morpheme, key }, index) => (
        <Text
          key={key}
          style={{
            color: theme.insight[morpheme.role],
            textDecorationLine: morpheme.role === 'elided' ? 'line-through' : 'none',
          }}
        >
          {index > 0 && separate ? ' ' : ''}
          {applyDiacriticsPreference(String(morpheme), diacriticsPreference)}
        </Text>
      ))}
    </ArabicText>
  )
}

export function Section({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <View style={{ gap: 8 }}>
      {title ? <Heading>{title}</Heading> : null}
      <View style={{ gap: 12 }}>{children}</View>
    </View>
  )
}

function decodeEntities(value: string): string {
  const values: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&nbsp;': '\u00a0',
  }
  return value.replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (entity) => values[entity] ?? entity)
}

function formattedInline(value: string, diacriticsPreference: DiacriticsPreference): ReactNode[] {
  const result: ReactNode[] = []
  const tags: { name: string; arabic: boolean }[] = []
  for (const { value: part, key } of keyed(value.split(/(<[^>]+>)/g), (part) => part)) {
    if (!part) continue
    if (part.startsWith('<')) {
      const match = /^<(\/)?\s*([a-z]+)/i.exec(part)
      if (!match) continue
      const name = match[2].toLowerCase()
      if (name === 'br') {
        result.push('\n')
      } else if (['span', 'strong', 'b', 'em', 'i', 'u', 'a'].includes(name)) {
        if (match[1]) tags.pop()
        else tags.push({ name, arabic: /\blang\s*=\s*["']?ar\b/i.test(part) })
      }
      continue
    }
    const arabic = tags.some((tag) => tag.arabic)
    const bold = tags.some((tag) => tag.name === 'strong' || tag.name === 'b')
    const italic = tags.some((tag) => tag.name === 'em' || tag.name === 'i')
    const underline = tags.some((tag) => tag.name === 'u' || tag.name === 'a')
    result.push(
      <Text
        key={key}
        accessibilityLanguage={arabic ? 'ar' : undefined}
        style={{
          fontWeight: bold ? '700' : undefined,
          fontStyle: italic ? 'italic' : undefined,
          textDecorationLine: underline ? 'underline' : undefined,
          writingDirection: arabic ? 'rtl' : undefined,
        }}
      >
        {applyDiacriticsPreference(decodeEntities(part), diacriticsPreference)}
      </Text>,
    )
  }
  return result
}

export function ExplanationParagraphs({
  paragraphs,
  theme,
  diacriticsPreference,
  markers = true,
}: {
  paragraphs: Paragraphs
  theme: ThemeTokens
  diacriticsPreference: DiacriticsPreference
  markers?: boolean
}) {
  return keyed(paragraphs, (paragraph) => paragraph.map((sentence) => sentence.text).join(' ')).map(
    ({ value: paragraph, key }) => (
      <Text key={key} selectable style={{ color: theme.ink, fontSize: 16, lineHeight: 28 }}>
        {keyed(paragraph, (sentence) => `${sentence.kind}-${sentence.text}`).map(
          ({ value: sentence, key: sentenceKey }, sentenceIndex) => (
            <Text key={sentenceKey}>
              {markers && (sentenceIndex === 0 || paragraph[sentenceIndex - 1]?.kind !== sentence.kind) && (
                <>
                  <Text style={{ color: theme.insight[sentence.kind], fontSize: 12 }}>
                    {KIND_GLYPHS[sentence.kind]}
                  </Text>{' '}
                </>
              )}
              {formattedInline(sentence.text, diacriticsPreference)}{' '}
            </Text>
          ),
        )}
      </Text>
    ),
  )
}

function formPattern(verb: DisplayVerb): string {
  const templateRoot = verb.root.length > 3 ? 'فعلل' : 'فعل'
  const template = isTriliteralFormIDisplayVerb(verb)
    ? getVerb(templateRoot, 1, verb.vowels)
    : getVerb(templateRoot, verb.form)
  return [template.lemma, String(conjugate(template, 'active.present.indicative')['3ms'])].join(' / ')
}

export function Insights({
  verb,
  arabic,
  language,
  diacriticsPreference = 'all',
  verbTense,
  pronoun,
  nominal,
  subject,
  isPresented,
  onDismiss,
  onOpenVerb,
}: InsightsProps) {
  const theme = useThemeTokens()
  const { t, translateRoot } = getCopy(language as Language)
  const layers = nominal
    ? resolveNominalExplanationLayers(verb, nominal, arabic)
    : verbTense && pronoun
      ? resolveVerbExplanationLayers(verb, verbTense, pronoun)
      : undefined
  const paragraphs = layers ? renderExplanation(layers, (key, params) => t(key, params)) : []
  const steps = verbTense && pronoun ? derivationSteps(verb, verbTense, pronoun) : []
  const finalStep = steps.at(-1)
  const nominalWords =
    nominal === 'masdar'
      ? deriveMasdar(verb)
      : nominal === 'activeParticiple'
        ? [deriveActiveParticiple(verb)]
        : nominal === 'passiveParticiple'
          ? [derivePassiveParticiple(verb)]
          : []
  const rootAnalysis = subject === 'root' ? analyzeRoot(tokenize(verb.root)) : undefined
  const rootGloss = subject === 'root' ? translateRoot(verb.rootId) : undefined
  const relatedVerbs = subject === 'root' ? findVerbsByRoot(verb.root).toSorted((a, b) => a.form - b.form) : []
  const formLayers = subject === 'form' ? resolveVerbExplanationLayers(verb, 'active.past', '3ms') : undefined
  const formParagraphs = formLayers
    ? renderExplanation(
        {
          category: 'verb',
          paradigmRoots: formLayers.paradigmRoots,
          paradigmForm: formLayers.paradigmForm,
          arabic: formLayers.arabic,
          form: formLayers.form,
          formRoot: formLayers.formRoot,
        },
        (key, params) => t(key, params),
      ).slice(0, 1)
    : []
  const title =
    subject === 'root'
      ? t('meta.root')
      : subject === 'form'
        ? t('meta.form')
        : nominal === 'masdar'
          ? nominalWords.length > 1
            ? t('meta.verbalNoun.plural')
            : t('meta.verbalNoun')
          : nominal === 'activeParticiple'
            ? t('meta.activeParticiple')
            : nominal === 'passiveParticiple'
              ? t('meta.passiveParticiple')
              : t('conjugationInfo.title')

  const rtl = getLocaleDirection(language) === 'rtl'
  const wordSection =
    nominalWords.length > 0 ? (
      <Section>
        <View
          style={{
            alignItems: 'center',
            flexDirection: rtl ? 'row-reverse' : 'row',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'center',
          }}
        >
          {keyed(nominalWords, String).map(({ value: word, key }, index) => (
            <View key={key} style={{ alignItems: 'center', flexDirection: rtl ? 'row-reverse' : 'row', gap: 6 }}>
              <AnnotatedMorphemes
                morphemes={word.morphemes.filter((morpheme) => morpheme.role !== 'elided')}
                theme={theme}
                diacriticsPreference={diacriticsPreference}
                fontSize={29}
              />
              {index < nominalWords.length - 1 && (
                <ArabicText locale="ar" style={{ fontSize: 29 }}>
                  ،
                </ArabicText>
              )}
            </View>
          ))}
        </View>
      </Section>
    ) : null

  const content = (
    <>
      {wordSection}

      {subject === 'root' && rootAnalysis && (
        <>
          <Section>
            <View style={{ alignItems: 'center', gap: 12 }}>
              {rootGloss && (
                <Text selectable style={{ color: theme.inkSecondary, fontSize: 16, fontStyle: 'italic' }}>
                  “{rootGloss}”
                </Text>
              )}
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', gap: 18 }}>
                {keyed(Array.from(verb.root), (letter) => letter).map(({ value: letter, key }, index) => (
                  <View key={key} style={{ alignItems: 'center', minWidth: 44 }}>
                    <ArabicText
                      locale="ar"
                      accessibilityLabel={t('verb.rootRadical', { index: String(index + 1), letter })}
                      style={{ fontSize: 32 }}
                    >
                      {letter}
                    </ArabicText>
                    {rootAnalysis.weakPositions.includes(index) && (
                      <Text style={{ color: theme.accent, fontSize: 11 }}>{t('rootInfo.annotation.weak')}</Text>
                    )}
                    {rootAnalysis.hamzaPositions.includes(index) && (
                      <Text style={{ color: theme.accent, fontSize: 11 }}>{t('rootInfo.annotation.hamzated')}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </Section>
          <Section>
            <Text selectable style={{ color: theme.ink, fontSize: 16, lineHeight: 28 }}>
              {t(`rootInfo.${rootTypeLocaleKey(rootAnalysis.type, rootAnalysis.weakLetter)}.description`)}
            </Text>
            {rootAnalysis.type.includes('biliteral') && (
              <Text selectable style={{ color: theme.ink, fontSize: 16, lineHeight: 28 }}>
                {t('rootInfo.biliteral.description')}
              </Text>
            )}
          </Section>
          {relatedVerbs.length > 0 && (
            <Section title={t('rootInfo.forms')}>
              {relatedVerbs.map((item, index) => (
                <VerbRow
                  diacriticsPreference={diacriticsPreference}
                  key={item.id}
                  language={language as Language}
                  onPress={(verbToOpen) => {
                    onDismiss()
                    onOpenVerb?.(verbToOpen)
                  }}
                  showDivider={index < relatedVerbs.length - 1}
                  testID={`root-form-${item.id}`}
                  verb={item}
                />
              ))}
            </Section>
          )}
        </>
      )}
      {subject === 'form' && (
        <>
          <Section>
            <Text selectable style={{ color: theme.accent, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
              {t(`formInfo.form${toFormDescriptor(verb)}.semantic`)}
            </Text>
            <ArabicText locale="ar" selectable style={{ fontSize: 25, textAlign: 'center' }}>
              {applyDiacriticsPreference(formPattern(verb), diacriticsPreference)}
            </ArabicText>
          </Section>
          <Section>
            <ExplanationParagraphs
              paragraphs={formParagraphs}
              theme={theme}
              diacriticsPreference={diacriticsPreference}
            />
            {verb.root.length === 3 && (
              <Text selectable style={{ color: theme.ink, fontSize: 16, lineHeight: 28 }}>
                {t(`formInfo.form${verb.form}.relationship`)}
              </Text>
            )}
          </Section>
        </>
      )}

      {steps.length > 0 && (
        <View>
          {keyed(steps, (step) => `${step.type}-${step.morphemes.map(String).join('')}`).map(
            ({ value: step, key }, index) => (
              <View
                key={key}
                style={{
                  alignItems: 'center',
                  borderColor: theme.border,
                  borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
                  flexDirection: rtl ? 'row-reverse' : 'row',
                  gap: 8,
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}
              >
                <Text style={{ color: theme.inkSecondary, fontSize: 17, flex: 1 }}>{labelForStep(step, verb, t)}</Text>
                <AnnotatedMorphemes
                  morphemes={step.morphemes}
                  theme={theme}
                  diacriticsPreference={diacriticsPreference}
                  fontSize={26}
                  separate={step.type === 'root'}
                />
              </View>
            ),
          )}
        </View>
      )}

      {paragraphs.length > 0 && (
        <Section>
          <ExplanationParagraphs paragraphs={paragraphs} theme={theme} diacriticsPreference={diacriticsPreference} />
        </Section>
      )}
    </>
  )

  return (
    <Sheet
      actions={<SheetButton label={t('build.closePicker')} onPress={onDismiss} systemImage="xmark" />}
      contentLabel={t('insights.details')}
      isPresented={isPresented}
      onDismiss={onDismiss}
      rtl={rtl}
      title={
        finalStep ? (
          <View
            accessible
            accessibilityLabel={applyDiacriticsPreference(
              finalStep.morphemes
                .filter((morpheme) => morpheme.role !== 'elided')
                .map(String)
                .join(''),
              diacriticsPreference,
            )}
            accessibilityRole="header"
            style={{ alignItems: rtl ? 'flex-end' : 'flex-start', flex: 1 }}
          >
            <AnnotatedMorphemes
              morphemes={finalStep.morphemes.filter((morpheme) => morpheme.role !== 'elided')}
              theme={theme}
              diacriticsPreference={diacriticsPreference}
              fontSize={30}
            />
          </View>
        ) : (
          title
        )
      }
    >
      {content}
    </Sheet>
  )
}
