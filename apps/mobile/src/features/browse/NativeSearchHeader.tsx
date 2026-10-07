import { Button, Host, HStack, Image, TextField, type TextFieldRef } from '@expo/ui/swift-ui'
import {
  accessibilityLabel,
  background,
  buttonStyle,
  clipShape,
  frame,
  glassEffect,
  padding,
  textFieldStyle,
} from '@expo/ui/swift-ui/modifiers'
import { useRef } from 'react'
import { useThemeTokens } from '../../theme/tokens'

export function NativeSearchHeader({
  width,
  placeholder,
  filterLabel,
  clearLabel,
  query = '',
  filtersActive = false,
  onChangeText,
  onFilter,
}: {
  width: number
  placeholder: string
  filterLabel: string
  clearLabel?: string
  query?: string
  filtersActive?: boolean
  onChangeText: (value: string) => void
  onFilter: () => void
}) {
  const theme = useThemeTokens()
  const inputRef = useRef<TextFieldRef>(null)
  const controlWidth = width - 32
  const textWidth = controlWidth - 124

  return (
    <Host testID="native-search-header" style={{ width: controlWidth, height: 52 }} seedColor={theme.accent}>
      <HStack
        spacing={8}
        modifiers={[
          padding({ horizontal: 16 }),
          frame({ width: controlWidth, height: 52 }),
          glassEffect({ shape: 'capsule' }),
        ]}
      >
        {query ? (
          <Button
            testID="clear-search-action"
            onPress={() => {
              void inputRef.current?.clear()
              onChangeText('')
            }}
            modifiers={[
              buttonStyle('plain'),
              accessibilityLabel(clearLabel ?? 'Clear search'),
              frame({ width: 32, height: 44 }),
            ]}
          >
            <Image testID="search-leading-symbol" systemName="xmark.circle.fill" size={20} color={theme.inkMuted} />
          </Button>
        ) : (
          <Image
            testID="search-leading-symbol"
            systemName="magnifyingglass"
            size={20}
            color={theme.ink}
            modifiers={[frame({ width: 32 })]}
          />
        )}
        <TextField
          ref={inputRef}
          testID="verb-search-field"
          placeholder={placeholder}
          onTextChange={onChangeText}
          modifiers={[textFieldStyle('plain'), frame({ width: textWidth })]}
        />
        <Button
          onPress={onFilter}
          modifiers={[buttonStyle('plain'), accessibilityLabel(filterLabel), frame({ width: 44, height: 44 })]}
        >
          <Image
            testID="filter-symbol"
            systemName="line.3.horizontal.decrease"
            size={20}
            color={filtersActive ? theme.onAccent : theme.accent}
            modifiers={[
              frame({ width: 32, height: 32 }),
              ...(filtersActive ? [background(theme.accent), clipShape('circle')] : []),
            ]}
          />
        </Button>
      </HStack>
    </Host>
  )
}
