import { Host, Picker, Text as SwiftText, Toggle } from '@expo/ui/swift-ui'
import {
  background,
  disabled,
  labelsHidden,
  pickerStyle,
  scaleEffect,
  shapes,
  tag,
  tint,
} from '@expo/ui/swift-ui/modifiers'
import * as Clipboard from 'expo-clipboard'
import { type ReactNode, useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'
import { formIVowelPattern } from '../../../../../src/paradigms/form-i-vowels'
import { deriveMasdar } from '../../../../../src/paradigms/nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../../../../../src/paradigms/nominal/participle'
import type { Mood, Tense, VerbTense, Voice } from '../../../../../src/paradigms/tense'
import type { DiacriticsPreference } from '../../../../../src/paradigms/tokens'
import { applyDiacriticsPreference } from '../../../../../src/paradigms/tokens'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import {
  findVerbsByRoot,
  formatFormLabel,
  getAvailableParadigms,
  isTriliteralFormIDisplayVerb,
  KWN_SISTERS_IDS,
  verbs,
  ZNN_SISTERS_IDS,
} from '../../../../../src/paradigms/verbs'
import {
  lookUp,
  presentEditMenu,
  translate as translateText,
} from '../../../modules/musarrif-apple-services/src/EditMenu'
import { ArabicText } from '../../components/ArabicText'
import { CAPS_TRACKING, Heading } from '../../components/Heading'
import { InfoIcon } from '../../components/InfoIcon'
import { Surface } from '../../components/Surface'
import { getCopy, type Language } from '../../i18n/copy'
import { getLocaleDirection } from '../../i18n/direction'
import { arabicSpeechOutput } from '../../speech-synthesis/arabic-speech'
import { useScaledSize } from '../../theme/dynamic-type'
import { useMotionDuration } from '../../theme/motion'
import { useThemeTokens } from '../../theme/tokens'
import { Insights, type InsightTarget } from './Insights'
import { ParadigmTable } from './ParadigmTable'
import { VerbRow } from './VerbRow'

type VerbDetailProps = {
  verb: DisplayVerb
  language: Language
  diacriticsPreference: DiacriticsPreference
  speechVoice?: string
  onOpenVerb: (verb: DisplayVerb) => void
}

const TENSES: readonly Tense[] = ['past', 'present', 'future', 'imperative']
const MOODS: readonly Mood[] = ['indicative', 'subjunctive', 'jussive']

function translate(language: Language) {
  const { t } = getCopy(language)
  return {
    passive: t('voice.passive'),
    past: t('tense.past'),
    present: t('tense.present'),
    future: t('tense.future'),
    imperative: t('mood.imperative'),
    indicative: t('mood.indicative'),
    subjunctive: t('mood.subjunctive'),
    jussive: t('mood.jussive'),
    masdar: t('meta.verbalNoun'),
    masdarPlural: t('meta.verbalNoun.plural'),
    activeParticiple: t('meta.activeParticiple'),
    passiveParticiple: t('meta.passiveParticiple'),
    root: t('meta.root'),
    form: t('meta.form'),
    rootInsights: t('insights.root.open'),
    formInsights: t('insights.form.open'),
    selectTense: t('aria.selectTense'),
    selectMood: t('aria.selectMood'),
    kana: t('verbsList.filter.kanaSisters.label'),
    zanna: t('verbsList.filter.zannaSisters.label'),
    derivedForms: t('selectDerivedForm'),
    nominals: t('exercise.unlock.dimension.nominals'),
    copy: t('verb.action.copy'),
    lookUp: t('verb.action.lookUp'),
    translate: t('verb.action.translate'),
    speak: t('verb.action.speak'),
    cancel: t('verb.action.cancel'),
  }
}

const GROUP_SPACING = 16
const LABEL_SIZE = 17
const CARD_LABEL_SIZE = 13
const VALUE_SIZE = 22

function DetailItem({
  accessibilityLabel,
  children,
  label,
  onPress,
  rtl,
}: {
  accessibilityLabel: string
  children: ReactNode
  label: string
  onPress: () => void
  rtl: boolean
}) {
  const theme = useThemeTokens()
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.fill : theme.surfaceSecondary,
        borderRadius: 16,
        flex: 1,
        gap: 6,
        padding: 14,
      })}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: rtl ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            color: theme.inkSecondary,
            fontSize: CARD_LABEL_SIZE,
            letterSpacing: CAPS_TRACKING,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Text>
        <InfoIcon />
      </View>
      <View style={{ alignItems: 'center', flexDirection: rtl ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: 8 }}>
        {children}
      </View>
    </Pressable>
  )
}

export function VerbDetail({ verb, language, diacriticsPreference, speechVoice, onOpenVerb }: VerbDetailProps) {
  const theme = useThemeTokens()
  const motion = useMotionDuration(240)
  const pickerHeight = useScaledSize(44)
  const t = translate(language)
  const direction = getLocaleDirection(language)
  const [selected, setSelected] = useState<VerbTense>('active.past')
  const [insight, setInsight] = useState<InsightTarget>()
  const [insightOpen, setInsightOpen] = useState(false)
  // The target stays after dismissal so the sheet keeps its content while it animates out.
  const showInsight = (target: InsightTarget) => {
    setInsight(target)
    setInsightOpen(true)
  }

  const available = useMemo(() => new Set(getAvailableParadigms(verb)), [verb])
  const hasPassive = ['passive.past', 'passive.future', ...MOODS.map((item) => `passive.present.${item}`)].some(
    (item) => available.has(item as VerbTense),
  )
  const voice: Voice = selected.startsWith('passive.') ? 'passive' : 'active'
  const tense: Tense = selected.includes('.present.') ? 'present' : (selected.split('.').at(-1) as Tense)
  const mood: Mood = selected.includes('.present.') ? (selected.split('.').at(-1) as Mood) : 'indicative'
  const gloss = language === 'ar' || verb.synthetic ? undefined : getCopy(language).translate(verb.id)
  const valency = (verb.valency ?? [])
    .toSorted((a, b) => a - b)
    .map((value) => getCopy(language).t(`valency.${value}`))
    .join(' · ')

  const showFormActions = async (arabic: string, point: { x: number; y: number }) => {
    const text = applyDiacriticsPreference(arabic, diacriticsPreference)
    const choice = await presentEditMenu(point, [t.copy, t.lookUp, t.translate, t.speak])
    if (choice === 0) await Clipboard.setStringAsync(text)
    if (choice === 1) await lookUp(text)
    if (choice === 2) await translateText(text)
    if (choice === 3) {
      await arabicSpeechOutput
        .speakArabic(text, { ...(speechVoice ? { voiceIdentifier: speechVoice } : {}), rate: 0.7 })
        .catch(() => {})
    }
  }

  const makeTense = (nextVoice: Voice, nextTense: Tense, nextMood: Mood = mood): VerbTense | undefined => {
    if (nextTense === 'imperative') {
      return nextVoice === 'active' && available.has('active.imperative') ? 'active.imperative' : undefined
    }
    const value =
      nextTense === 'present'
        ? (`${nextVoice}.present.${nextMood}` as VerbTense)
        : (`${nextVoice}.${nextTense}` as VerbTense)
    return available.has(value) ? value : undefined
  }
  const selectVoice = (nextVoice: Voice) => {
    if (nextVoice === 'passive' && tense === 'imperative') return
    setSelected(makeTense(nextVoice, tense) ?? makeTense(nextVoice, 'past') ?? 'active.past')
  }
  const selectTense = (nextTense: Tense) => {
    setSelected(makeTense(voice, nextTense) ?? selected)
  }

  const group = KWN_SISTERS_IDS.has(verb.id) ? 'kwn' : ZNN_SISTERS_IDS.has(verb.id) ? 'znn' : undefined
  const groupVerbs = group
    ? verbs.filter((item) => (group === 'kwn' ? KWN_SISTERS_IDS : ZNN_SISTERS_IDS).has(item.id))
    : []
  const relatedForms = findVerbsByRoot(verb.root)
    .filter((item) => item.id !== verb.id)
    .toSorted((a, b) => a.form - b.form)
  const masdarValues = deriveMasdar(verb).map(String)
  const nominalForms = [
    { key: 'masdar', label: masdarValues.length > 1 ? t.masdarPlural : t.masdar, values: masdarValues, kind: 'masdar' },
    {
      key: 'active.participle',
      label: t.activeParticiple,
      values: [String(deriveActiveParticiple(verb))],
      kind: 'activeParticiple',
    },
    {
      key: 'passive.participle',
      label: t.passiveParticiple,
      values: [String(derivePassiveParticiple(verb))],
      kind: 'passiveParticiple',
    },
  ] as const
  const shownNominals = nominalForms.filter((item) => available.has(item.key) && item.values.some(Boolean))

  return (
    <Surface style={{ flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16, gap: 16 }}>
        {(valency || (gloss && gloss !== verb.id)) && (
          <View
            style={{
              alignItems: 'baseline',
              flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            {valency ? (
              <Text
                testID="verb-valency"
                style={{
                  color: theme.inkSecondary,
                  flex: 1,
                  fontSize: 14,
                  fontStyle: 'italic',
                  textAlign: direction === 'rtl' ? 'right' : 'left',
                  textTransform: 'lowercase',
                }}
              >
                {valency}
              </Text>
            ) : (
              <View style={{ flex: 1 }} />
            )}
            {gloss && gloss !== verb.id ? (
              <Text testID="verb-translation" style={{ color: theme.inkSecondary, fontSize: 18 }}>
                {gloss}
              </Text>
            ) : null}
          </View>
        )}
        <View style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row', gap: 16 }} testID="verb-meta-row">
          <DetailItem
            accessibilityLabel={t.rootInsights}
            label={t.root}
            onPress={() => showInsight({ subject: 'root', arabic: verb.root })}
            rtl={direction === 'rtl'}
          >
            <ArabicText locale="ar" style={{ fontSize: VALUE_SIZE }}>
              {Array.from(applyDiacriticsPreference(verb.root, diacriticsPreference)).join(' ')}
            </ArabicText>
          </DetailItem>
          <DetailItem
            accessibilityLabel={t.formInsights}
            label={t.form}
            onPress={() => showInsight({ subject: 'form', arabic: verb.lemma })}
            rtl={direction === 'rtl'}
          >
            <Text style={{ color: theme.ink, fontSize: VALUE_SIZE }}>{formatFormLabel(verb.form, verb.root)}</Text>
            {isTriliteralFormIDisplayVerb(verb) ? (
              <ArabicText
                style={{
                  color: theme.inkSecondary,
                  fontSize: VALUE_SIZE,
                  lineHeight: 30,
                  textAlign: 'left',
                  writingDirection: 'ltr',
                }}
              >
                {formIVowelPattern(verb)}
              </ArabicText>
            ) : null}
          </DetailItem>
        </View>
        {hasPassive && (
          <View
            style={{
              alignItems: 'center',
              alignSelf: direction === 'rtl' ? 'flex-start' : 'flex-end',
              flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
              gap: 8,
              minHeight: 44,
            }}
          >
            <Text style={{ color: theme.inkSecondary, fontSize: 15 }}>{t.passive}</Text>
            <Host seedColor={theme.accent} style={{ width: 52, height: 44 }}>
              <Toggle
                isOn={voice === 'passive'}
                label={t.passive}
                modifiers={[labelsHidden(), tint(theme.accent), scaleEffect(0.85), disabled(tense === 'imperative')]}
                onIsOnChange={(isOn) => selectVoice(isOn ? 'passive' : 'active')}
                testID="passive-switch"
              />
            </Host>
          </View>
        )}
        <Host seedColor={theme.accent} style={{ height: pickerHeight, width: '100%' }}>
          <Picker
            label={t.selectTense}
            modifiers={[
              pickerStyle('segmented'),
              labelsHidden(),
              tint(theme.accent),
              background(theme.segmentedTrack, shapes.capsule()),
            ]}
            onSelectionChange={(value) => selectTense(value as Tense)}
            selection={tense}
          >
            {TENSES.filter((item) => makeTense(voice, item)).map((item) => (
              <SwiftText key={item} modifiers={[tag(item)]}>
                {t[item]}
              </SwiftText>
            ))}
          </Picker>
        </Host>
        {tense === 'present' && (
          <Animated.View entering={FadeIn.duration(motion)} exiting={FadeOut.duration(motion)}>
            <Host seedColor={theme.accent} style={{ height: pickerHeight, width: '100%' }}>
              <Picker
                label={t.selectMood}
                modifiers={[
                  pickerStyle('segmented'),
                  labelsHidden(),
                  tint(theme.accent),
                  background(theme.segmentedTrack, shapes.capsule()),
                ]}
                onSelectionChange={(value) => {
                  const candidate = makeTense(voice, 'present', value as Mood)
                  if (candidate) setSelected(candidate)
                }}
                selection={mood}
              >
                {MOODS.filter((item) => makeTense(voice, 'present', item)).map((item) => (
                  <SwiftText key={item} modifiers={[tag(item)]}>
                    {t[item]}
                  </SwiftText>
                ))}
              </Picker>
            </Host>
          </Animated.View>
        )}

        <Animated.View layout={LinearTransition.duration(motion)}>
          <View style={{ marginTop: GROUP_SPACING }}>
            <ParadigmTable
              language={language}
              verb={verb}
              tense={selected}
              diacriticsPreference={diacriticsPreference}
              onActions={(arabic, point) => void showFormActions(arabic, point)}
              onExplain={(pronoun, arabic) => showInsight({ verbTense: selected, pronoun, arabic })}
            />
          </View>

          {shownNominals.length > 0 && (
            <View style={{ gap: 8, marginTop: GROUP_SPACING }}>
              <Heading>{t.nominals}</Heading>
              <View>
                {shownNominals.map((item, index) => (
                  <Pressable
                    key={item.key}
                    accessibilityLabel={getCopy(language).t('aria.explanation', { word: item.label })}
                    accessibilityRole="button"
                    onLongPress={(event) =>
                      void showFormActions(item.values.filter(Boolean).join('، '), {
                        x: event.nativeEvent.pageX,
                        y: event.nativeEvent.pageY,
                      })
                    }
                    onPress={() => showInsight({ nominal: item.kind, arabic: item.values })}
                    style={{
                      borderBottomWidth: index === shownNominals.length - 1 ? 0 : StyleSheet.hairlineWidth,
                      borderColor: theme.border,
                      paddingVertical: 12,
                    }}
                  >
                    <View
                      testID="nominal-form"
                      style={
                        item.values.length > 1
                          ? { gap: 4 }
                          : {
                              alignItems: 'center',
                              flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
                              gap: 12,
                              justifyContent: 'space-between',
                            }
                      }
                    >
                      <Text style={{ color: theme.inkSecondary, fontSize: LABEL_SIZE }}>{item.label}</Text>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
                          gap: 12,
                          justifyContent: item.values.length > 1 ? 'space-between' : 'flex-end',
                        }}
                      >
                        <ArabicText
                          locale="ar"
                          style={{
                            fontSize: 28,
                            lineHeight: 44,
                            ...(item.values.length > 1 ? { flex: 1 } : { flexShrink: 1 }),
                          }}
                        >
                          {item.values
                            .filter(Boolean)
                            .map((value) => applyDiacriticsPreference(value, diacriticsPreference))
                            .join('، ')}
                        </ArabicText>
                        <InfoIcon />
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {insight && (
            <Insights
              verb={verb}
              language={language}
              diacriticsPreference={diacriticsPreference}
              isPresented={insightOpen}
              onDismiss={() => setInsightOpen(false)}
              onOpenVerb={onOpenVerb}
              {...insight}
            />
          )}

          {group && (
            <View style={{ gap: 8, marginTop: GROUP_SPACING }}>
              <Heading>{group === 'kwn' ? t.kana : t.zanna}</Heading>
              {groupVerbs.map((item, index) => (
                <VerbRow
                  diacriticsPreference={diacriticsPreference}
                  includeIdInLabel
                  key={item.id}
                  language={language}
                  onPress={onOpenVerb}
                  showDivider={index < groupVerbs.length - 1}
                  testID={`group-verb-${item.id}`}
                  verb={item}
                />
              ))}
            </View>
          )}

          {relatedForms.length > 0 && (
            <View testID="related-forms" style={{ gap: 8, marginTop: GROUP_SPACING }}>
              <Heading>{t.derivedForms}</Heading>
              {relatedForms.map((item, index) => (
                <VerbRow
                  diacriticsPreference={diacriticsPreference}
                  key={item.id}
                  language={language}
                  onPress={onOpenVerb}
                  showDivider={index < relatedForms.length - 1}
                  testID={`related-form-${item.id}`}
                  verb={item}
                />
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </Surface>
  )
}
