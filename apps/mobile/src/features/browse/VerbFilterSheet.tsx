import { FieldGroup, Switch } from '@expo/ui'
import { Host, Picker, Text as SwiftText } from '@expo/ui/swift-ui'
import {
  background,
  labelsHidden,
  listRowBackground,
  pickerStyle,
  scrollContentBackground,
  tag,
  tint,
} from '@expo/ui/swift-ui/modifiers'
import type { RootShape } from '../../../../../src/paradigms/roots'
import { FormSectionHeading } from '../../components/Heading'
import {
  SHEET_BODY_PADDING_BOTTOM,
  SHEET_MARGIN,
  Sheet,
  SheetButton,
  useSheetContentHeight,
} from '../../components/Sheet'
import { getCopy, type Language } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'
import { type FilterState, FORM_OPTIONS, ROOT_SHAPES } from './filter-model'

type VerbFilterSheetProps = {
  filters: FilterState
  isPresented: boolean
  language: Language
  onApply: () => void
  onChange: (filters: FilterState) => void
  onClear: () => void
  onDismiss: () => void
}

export function VerbFilterSheet({
  filters,
  isPresented,
  language,
  onApply,
  onChange,
  onClear,
  onDismiss,
}: VerbFilterSheetProps) {
  const theme = useThemeTokens()
  // A SwiftUI Form scrolls itself and has no intrinsic height, so it takes all the room the sheet has.
  const formHeight = useSheetContentHeight()
  const { t } = getCopy(language)
  const changeRootShape = (shape: RootShape, enabled: boolean) => {
    let rootShapes: readonly RootShape[]
    if (!enabled) rootShapes = filters.rootShapes.filter((current) => current !== shape)
    else if (shape === 'sound') rootShapes = ['sound']
    else rootShapes = [...filters.rootShapes.filter((current) => current !== 'sound'), shape]
    onChange({ ...filters, rootShapes })
  }

  return (
    <Sheet
      actions={
        <>
          <SheetButton label={t('browse.filters.clear')} onPress={onClear} systemImage="trash" />
          <SheetButton label={t('browse.filters.apply')} onPress={onApply} prominent systemImage="checkmark" />
        </>
      }
      isPresented={isPresented}
      onDismiss={onDismiss}
      testID="verb-filter-sheet"
      title={t('browse.filters.show')}
    >
      <Host
        seedColor={theme.accent}
        style={{ height: formHeight, marginBottom: -SHEET_BODY_PADDING_BOTTOM, marginHorizontal: -SHEET_MARGIN }}
      >
        <FieldGroup modifiers={[tint(theme.accent), scrollContentBackground('hidden'), background(theme.background)]}>
          <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
            <FieldGroup.SectionHeader>
              <FormSectionHeading>{t('verbsList.sort.title')}</FormSectionHeading>
            </FieldGroup.SectionHeader>
            <Picker
              label={t('verbsList.sort.title')}
              modifiers={[pickerStyle('inline'), labelsHidden()]}
              onSelectionChange={(sort) => onChange({ ...filters, sort: sort as FilterState['sort'] })}
              selection={filters.sort}
            >
              <SwiftText modifiers={[tag('frequency')]}>{t('verbsList.sort.frequency.label')}</SwiftText>
              <SwiftText modifiers={[tag('alphabetical')]}>{t('verbsList.sort.alphabetical.label')}</SwiftText>
            </Picker>
          </FieldGroup.Section>
          <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
            <FieldGroup.SectionHeader>
              <FormSectionHeading>{t('verbsList.filter.form.title')}</FormSectionHeading>
            </FieldGroup.SectionHeader>
            <Picker
              label={t('meta.form')}
              modifiers={[pickerStyle('menu')]}
              onSelectionChange={(form) => onChange({ ...filters, form: form || null })}
              selection={filters.form ?? ''}
            >
              <SwiftText modifiers={[tag('')]}>{t('diacritics.all')}</SwiftText>
              {FORM_OPTIONS.map((option) => (
                <SwiftText key={option.value} modifiers={[tag(option.value)]}>
                  {option.label}
                </SwiftText>
              ))}
            </Picker>
          </FieldGroup.Section>
          <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
            <FieldGroup.SectionHeader>
              <FormSectionHeading>{t('verbsList.filter.rootType.title')}</FormSectionHeading>
            </FieldGroup.SectionHeader>
            {ROOT_SHAPES.map((shape) => (
              <Switch
                key={shape}
                label={t(`verbsList.filter.rootType.${shape}.label`)}
                onValueChange={(enabled) => changeRootShape(shape, enabled)}
                testID={`filter-root-${shape}`}
                value={filters.rootShapes.includes(shape)}
              />
            ))}
          </FieldGroup.Section>
          <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
            <FieldGroup.SectionHeader>
              <FormSectionHeading>{t('verbsList.filter.other.title')}</FormSectionHeading>
            </FieldGroup.SectionHeader>
            <Picker
              label={t('verbsList.filter.other.title')}
              modifiers={[pickerStyle('inline'), labelsHidden()]}
              onSelectionChange={(group) => onChange({ ...filters, group: (group || null) as FilterState['group'] })}
              selection={filters.group ?? ''}
            >
              <SwiftText modifiers={[tag('')]}>{t('diacritics.all')}</SwiftText>
              <SwiftText modifiers={[tag('favourites')]}>{t('verbsList.filter.favourites.label')}</SwiftText>
              <SwiftText modifiers={[tag('kana')]}>{t('verbsList.filter.kanaSisters.label')}</SwiftText>
              <SwiftText modifiers={[tag('zanna')]}>{t('verbsList.filter.zannaSisters.label')}</SwiftText>
            </Picker>
          </FieldGroup.Section>
        </FieldGroup>
      </Host>
    </Sheet>
  )
}
