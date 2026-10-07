import { Host, HStack, VStack } from '@expo/ui/swift-ui'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { conjugate } from '../../../../../src/paradigms/conjugation'
import type { FormIPattern } from '../../../../../src/paradigms/form-i-vowels'
import { FORM_I_PATTERNS, RARE_FORM_I_PATTERNS } from '../../../../../src/paradigms/form-i-vowels'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../../../../../src/paradigms/tokens'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import { FORMS } from '../../../../../src/paradigms/verb-types'
import { getVerb } from '../../../../../src/paradigms/verbs'
import { toRoman } from '../../../../../src/primitives/numbers'
import { playKeyClick } from '../../../modules/musarrif-apple-services/src/KeyClick'
import { ChoiceButton } from '../../components/ChoiceButton'
import { Heading } from '../../components/Heading'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Sheet, SheetButton } from '../../components/Sheet'
import { getCopy, type Language } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'

type VerbBuilderProps = {
  diacriticsPreference?: DiacriticsPreference
  language?: Language
  onSelect: (verb: DisplayVerb) => void
}

const LETTERS = [
  'ء',
  'ب',
  'ت',
  'ث',
  'ج',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ك',
  'ل',
  'م',
  'ن',
  'ه',
  'و',
  'ي',
] as const

const LETTERS_PER_ROW = 7
const LETTER_KEY_HEIGHT = 56
const LETTER_GAP = 6
const LETTER_ROWS = Array.from({ length: Math.ceil(LETTERS.length / LETTERS_PER_ROW) }, (_, row) =>
  LETTERS.slice(row * LETTERS_PER_ROW, (row + 1) * LETTERS_PER_ROW).toReversed(),
)
const LETTER_GRID_HEIGHT = LETTER_ROWS.length * LETTER_KEY_HEIGHT + (LETTER_ROWS.length - 1) * LETTER_GAP

function LetterPickerSheet({
  isPresented,
  label,
  language,
  onChange,
  onDismiss,
  value,
}: {
  isPresented: boolean
  label: string
  language: Language
  onChange: (letter: string) => void
  onDismiss: () => void
  value: string
}) {
  const theme = useThemeTokens()
  const { t } = getCopy(language)

  return (
    <Sheet
      actions={<SheetButton label={t('build.closePicker')} onPress={onDismiss} systemImage="xmark" />}
      isPresented={isPresented}
      onDismiss={onDismiss}
      testID="letter-picker-sheet"
      title={label}
    >
      <Host seedColor={theme.accent} style={{ height: LETTER_GRID_HEIGHT }}>
        <VStack spacing={LETTER_GAP}>
          {LETTER_ROWS.map((row) => (
            <HStack key={row[0]} spacing={LETTER_GAP}>
              {row.map((letter) => (
                <ChoiceButton
                  accessibilityLabel={t('build.selectLetter', { letter })}
                  fontSize={22}
                  key={letter}
                  minHeight={LETTER_KEY_HEIGHT}
                  onPress={() => {
                    playKeyClick()
                    onChange(letter)
                    onDismiss()
                  }}
                  selected={value === letter}
                  testID={`letter-${letter}`}
                  text={letter}
                />
              ))}
            </HStack>
          ))}
        </VStack>
      </Host>
    </Sheet>
  )
}

export function VerbBuilder({ diacriticsPreference = 'all', language = 'en', onSelect }: VerbBuilderProps) {
  const theme = useThemeTokens()
  const { t } = getCopy(language)
  const insets = useSafeAreaInsets()
  const [root, setRoot] = useState<string[]>(['', '', ''])
  const [form, setForm] = useState<(typeof FORMS)[number]>(1)
  const [pattern, setPattern] = useState<FormIPattern>('a-a')
  const [activeSlot, setActiveSlot] = useState<number | null>(null)
  const rootValue = root.map((letter) => letter.normalize('NFC').replace(/\p{M}/gu, '')).join('')
  const canBuild =
    root.length === 3 &&
    root.every((letter) =>
      /^[\u0621-\u064a\u066e-\u06d3\u06fa-\u06fc\u0750-\u077f\u08a0-\u08c9]$/u.test(
        letter.normalize('NFD').replace(/\p{M}/gu, ''),
      ),
    )
  const built = (() => {
    if (!canBuild) return undefined
    try {
      return getVerb(rootValue, form, form === 1 ? pattern : undefined)
    } catch {
      // An invalid root is not a buildable verb.
      return undefined
    }
  })()
  const submitLabel = built
    ? t('build.conjugateVerb', { verb: applyDiacriticsPreference(built.lemma, diacriticsPreference) })
    : t('build.conjugate')
  const slotLabel = (slot: number) =>
    t(['build.rootSlotLabel.initial', 'build.rootSlotLabel.medial', 'build.rootSlotLabel.final'][slot])
  const patterns = FORM_I_PATTERNS.map((candidate) => {
    const sample = getVerb('فعل', 1, candidate)
    return {
      candidate,
      text: `${String(conjugate(sample, 'active.past')['3ms'])} / ${String(conjugate(sample, 'active.present.indicative')['3ms'])}`,
    }
  })

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ gap: 20, padding: 16 }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: 12 }}>
          <Heading>{t('meta.root')}</Heading>
          <Host seedColor={theme.accent} style={{ height: 80 }}>
            <HStack spacing={8}>
              {[2, 1, 0].map((slot) => (
                <ChoiceButton
                  accessibilityLabel={slotLabel(slot)}
                  fontSize={34}
                  key={slot}
                  minHeight={64}
                  onPress={() => setActiveSlot(slot)}
                  shape="capsule"
                  testID={`root-slot-${slot + 1}`}
                  text={root[slot] || '—'}
                />
              ))}
            </HStack>
          </Host>
        </View>

        <View style={{ gap: 12 }}>
          <Heading>{t('build.formLabel')}</Heading>
          <Host seedColor={theme.accent} style={{ height: 144 }}>
            <VStack spacing={8}>
              {[FORMS.slice(0, 5), FORMS.slice(5)].map((row) => (
                <HStack key={row[0]} spacing={8}>
                  {row.map((candidate) => (
                    <ChoiceButton
                      accessibilityLabel={t('meta.form.withNumber', { form: toRoman(candidate) })}
                      key={candidate}
                      minHeight={56}
                      onPress={() => setForm(candidate)}
                      selected={form === candidate}
                      shape="circle"
                      testID={`form-${candidate}`}
                      text={toRoman(candidate)}
                    />
                  ))}
                </HStack>
              ))}
            </VStack>
          </Host>
        </View>

        {form === 1 ? (
          <View style={{ gap: 12 }}>
            <Heading>{t('build.patternLabel')}</Heading>
            <Host seedColor={theme.accent} style={{ height: 196 }}>
              <VStack spacing={8}>
                {[patterns.slice(0, 3), patterns.slice(3, 6), patterns.slice(6)].map((row) => (
                  <HStack key={row[0].candidate} spacing={8}>
                    {row.map(({ candidate, text }) => (
                      <ChoiceButton
                        accessibilityLabel={t(
                          RARE_FORM_I_PATTERNS.has(candidate) ? 'build.patternOption.rare' : 'build.patternOption',
                          { pattern: candidate },
                        )}
                        dim={RARE_FORM_I_PATTERNS.has(candidate)}
                        fontSize={17}
                        key={candidate}
                        minHeight={44}
                        onPress={() => setPattern(candidate)}
                        selected={pattern === candidate}
                        shape="capsule"
                        testID={`pattern-${candidate}`}
                        text={text}
                      />
                    ))}
                  </HStack>
                ))}
              </VStack>
            </Host>
          </View>
        ) : null}
      </ScrollView>
      <View style={{ paddingBottom: insets.bottom + 8, paddingHorizontal: 16, paddingTop: 8 }}>
        <PrimaryButton
          accessibilityLabel={submitLabel}
          disabled={!built}
          onPress={() => {
            if (built) onSelect(built)
          }}
          testID="build-submit"
        >
          {submitLabel}
        </PrimaryButton>
      </View>
      <LetterPickerSheet
        isPresented={activeSlot != null}
        label={slotLabel(activeSlot ?? 0)}
        language={language}
        onChange={(letter) =>
          setRoot((current) => current.map((existing, index) => (index === activeSlot ? letter : existing)))
        }
        onDismiss={() => setActiveSlot(null)}
        value={root[activeSlot ?? 0]}
      />
    </View>
  )
}
